/**
 * Consecutive win threshold (N) by IQ band.
 *
 * IQ 21-50 (A-B): N=5 (~83% convergence)
 * IQ 51-70 (C-D): N=4 (~80% convergence)
 * IQ 71-110 (E-F): N=3 (~75% convergence)
 */
import type { IQBand } from "@/types/user";

const BAND_TO_N: Record<IQBand, number> = {
  A1: 5, A2: 5,
  B1: 5, B2: 5,
  C1: 4, C2: 4,
  D1: 4, D2: 4,
  E1: 3, E2: 3,
  F1: 3, F2: 3, F3: 3,
};

export function getConsecutiveWinThreshold(iqBand: IQBand): number {
  return BAND_TO_N[iqBand];
}
