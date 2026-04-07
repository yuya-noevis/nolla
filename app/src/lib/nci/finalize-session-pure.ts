/**
 * Pure (no "use server") helpers for session-end NCI finalization.
 * Extracted so they can be unit-tested without DB stubbing.
 */
import type { GameType, DifficultyParams } from "@/types/domain";
import type { ThetaState } from "@/types/scoring";
import { calculateDifficultyB } from "./difficulty-b";
import { updateTheta } from "./theta";

/**
 * NCI initial prior (per nolla_nci_algorithm_design.md §2.2):
 *   μ_0 = 500 (scale midpoint)
 *   σ_0 = 150 (wide uncertainty)
 */
export const INITIAL_THETA: ThetaState = { mu: 500, sigma: 150 };

/**
 * IRT discrimination — initial value for all trial types (design §2.1).
 */
export const DEFAULT_A = 1.0;

export type FinalizeTrial = {
  readonly correct: boolean;
  readonly difficultyParams: DifficultyParams;
};

/**
 * Map a game to its primary NCI axis.
 *   memory-match → M (memory)
 *   corsi-block  → M (memory: spatial WM)
 *   sorting      → F (flexibility / inhibition)
 *   visual-search→ A (attention)
 * NCI-S (speed) is computed from RTs across all games — handled separately.
 */
export function gameAxis(gameType: GameType): "M" | "F" | "A" {
  switch (gameType) {
    case "memory-match":
    case "corsi-block":
      return "M";
    case "sorting":
      return "F";
    case "visual-search":
      return "A";
  }
}

/**
 * Apply a sequence of trials to a starting theta state, updating after each
 * trial via the IRT-2PL Bayesian rule.
 */
export function applyTrialsToTheta(
  gameType: GameType,
  start: ThetaState,
  trials: readonly FinalizeTrial[]
): ThetaState {
  return trials.reduce<ThetaState>((prior, trial) => {
    const b = calculateDifficultyB(gameType, trial.difficultyParams);
    return updateTheta(prior, trial.correct, DEFAULT_A, b);
  }, start);
}
