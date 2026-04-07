/**
 * Pure (no "use server") helpers for session-end NCI finalization.
 * Extracted so they can be unit-tested without DB stubbing.
 */
import type { GameType, DifficultyParams } from "@/types/domain";
import type { ThetaState } from "@/types/scoring";
import { calculateDifficultyB } from "./difficulty-b";
import { updateTheta } from "./theta";

/**
 * NCI initial prior — standard IRT latent space (θ ~ N(0, 2²)).
 *
 * NOTE on scale: nolla_nci_algorithm_design.md §2.2 writes "μ_0=500, σ_0=150",
 * but this is the *displayed NCI score* range (0–999). The underlying IRT
 * latent θ must share scale with `b` (which calculateDifficultyB emits in the
 * ~0–3 range). Mixing scales makes `p` saturate and the Newton-step
 * `gradient/(1+σ²·info)` explode on a single incorrect trial.
 *
 * We therefore store θ in standard IRT space and convert to displayed NCI via
 * `calculateNCI()` (see nci-score.ts): NCI = clamp(500 + θ*100, 0, 999.999).
 */
export const INITIAL_THETA: ThetaState = { mu: 0, sigma: 2 };

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
