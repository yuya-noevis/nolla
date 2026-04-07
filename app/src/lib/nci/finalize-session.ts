"use server";

import type { GameType } from "@/types/domain";
import type { ThetaState } from "@/types/scoring";
import { persistNciSnapshot, getLatestThetas } from "./persist-snapshot";
import {
  applyTrialsToTheta,
  gameAxis,
  INITIAL_THETA,
  type FinalizeTrial,
} from "./finalize-session-pure";

export type { FinalizeTrial } from "./finalize-session-pure";

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

  const latest = await getLatestThetas(childId);
  const thetaM: ThetaState = latest?.thetaM ?? INITIAL_THETA;
  const thetaF: ThetaState = latest?.thetaF ?? INITIAL_THETA;
  const thetaA: ThetaState = latest?.thetaA ?? INITIAL_THETA;
  const thetaS: ThetaState = latest?.thetaS ?? INITIAL_THETA;

  const axis = gameAxis(gameType);
  const startTheta =
    axis === "M" ? thetaM : axis === "F" ? thetaF : thetaA;

  const updated = applyTrialsToTheta(gameType, startTheta, trials);

  const nextThetas = {
    thetaM: axis === "M" ? updated : thetaM,
    thetaF: axis === "F" ? updated : thetaF,
    thetaA: axis === "A" ? updated : thetaA,
    thetaS,
  };

  return persistNciSnapshot(childId, nextThetas, trials.length);
}
