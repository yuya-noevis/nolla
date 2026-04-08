"use server";

import type { GameType } from "@/types/domain";
import type { ThetaState } from "@/types/scoring";
import { createClient } from "@/lib/supabase/server";
import { persistNciSnapshot, getLatestThetas } from "./persist-snapshot";
import {
  applyTrialsToTheta,
  applySpeedTrialsToTheta,
  gameAxis,
  INITIAL_THETA,
  type FinalizeTrial,
} from "./finalize-session-pure";

export type { FinalizeTrial } from "./finalize-session-pure";

/**
 * Fetch the most recent motor-baseline median RT for a child.
 * Returns null if no baseline has been measured yet.
 */
async function getLatestMotorBaselineMs(
  childId: string
): Promise<number | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("motor_baselines")
    .select("median_rt")
    .eq("child_id", childId)
    .order("measured_at", { ascending: false })
    .limit(1)
    .single();

  if (error || !data) return null;
  return data.median_rt ?? null;
}

/**
 * Update the per-game theta axis with this session's trials and persist
 * a daily NCI snapshot for the child.
 *
 * Wires the previously-orphaned `updateTheta` and `persistNciSnapshot` into
 * the live session-end pipeline (BUG-13 fix).
 */
export async function finalizeSessionNci(
  childId: string,
  gameType: GameType,
  trials: readonly FinalizeTrial[]
): Promise<boolean> {
  if (trials.length === 0) return false;

  const [latest, motorBaselineMs] = await Promise.all([
    getLatestThetas(childId),
    getLatestMotorBaselineMs(childId),
  ]);
  const thetaM: ThetaState = latest?.thetaM ?? INITIAL_THETA;
  const thetaF: ThetaState = latest?.thetaF ?? INITIAL_THETA;
  const thetaA: ThetaState = latest?.thetaA ?? INITIAL_THETA;
  const thetaS: ThetaState = latest?.thetaS ?? INITIAL_THETA;

  const axis = gameAxis(gameType);
  const startTheta =
    axis === "M" ? thetaM : axis === "F" ? thetaF : thetaA;

  const updated = applyTrialsToTheta(gameType, startTheta, trials);

  // Speed axis updates from every game (not gated on gameType)
  const updatedSpeed = applySpeedTrialsToTheta(thetaS, trials, motorBaselineMs);

  const nextThetas = {
    thetaM: axis === "M" ? updated : thetaM,
    thetaF: axis === "F" ? updated : thetaF,
    thetaA: axis === "A" ? updated : thetaA,
    thetaS: updatedSpeed,
  };

  return persistNciSnapshot(childId, nextThetas, trials.length);
}
