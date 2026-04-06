"use server";

import { createClient } from "@/lib/supabase/server";
import type { ThetaState } from "@/types/scoring";
import { calculateNCI, type NCIInput } from "./nci-score";

type ThetaAxes = {
  readonly thetaM: ThetaState;
  readonly thetaF: ThetaState;
  readonly thetaA: ThetaState;
  readonly thetaS: ThetaState;
};

/**
 * UPSERT daily NCI snapshot after session completion.
 * One snapshot per child per day (unique constraint).
 */
export async function persistNciSnapshot(
  childId: string,
  thetas: ThetaAxes,
  totalTrialsUsed: number
): Promise<boolean> {
  const supabase = await createClient();

  const nciInput: NCIInput = {
    thetaM: thetas.thetaM,
    thetaF: thetas.thetaF,
    thetaA: thetas.thetaA,
    thetaS: thetas.thetaS,
  };
  const nci = calculateNCI(nciInput);

  const today = new Date().toISOString().split("T")[0];

  const { error } = await supabase
    .from("nci_snapshots")
    .upsert(
      {
        child_id: childId,
        snapshot_date: today,
        nci_m: nci.nciM,
        nci_f: nci.nciF,
        nci_a: nci.nciA,
        nci_s: nci.nciS,
        nci_m_se: nci.nciMSe,
        nci_f_se: nci.nciFSe,
        nci_a_se: nci.nciASe,
        nci_s_se: nci.nciSSe,
        theta_m: thetas.thetaM.mu,
        theta_f: thetas.thetaF.mu,
        theta_a: thetas.thetaA.mu,
        theta_s: thetas.thetaS.mu,
        sigma_m: thetas.thetaM.sigma,
        sigma_f: thetas.thetaF.sigma,
        sigma_a: thetas.thetaA.sigma,
        sigma_s: thetas.thetaS.sigma,
        total_trials_used: totalTrialsUsed,
      },
      { onConflict: "child_id,snapshot_date" }
    );

  return !error;
}

/**
 * Fetch latest theta state for a child (to resume from).
 */
export async function getLatestThetas(
  childId: string
): Promise<ThetaAxes | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("nci_snapshots")
    .select("theta_m, theta_f, theta_a, theta_s, sigma_m, sigma_f, sigma_a, sigma_s")
    .eq("child_id", childId)
    .order("snapshot_date", { ascending: false })
    .limit(1)
    .single();

  if (error || !data) return null;

  return {
    thetaM: { mu: data.theta_m ?? 0, sigma: data.sigma_m ?? 2 },
    thetaF: { mu: data.theta_f ?? 0, sigma: data.sigma_f ?? 2 },
    thetaA: { mu: data.theta_a ?? 0, sigma: data.sigma_a ?? 2 },
    thetaS: { mu: data.theta_s ?? 0, sigma: data.sigma_s ?? 2 },
  };
}
