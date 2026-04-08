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
  /**
   * Optional for backward compatibility with test fixtures predating the
   * speed axis. Production callers (use-game-session) always provide it.
   * Speed-axis updates skip trials without RT.
   */
  readonly reactionTimeMs?: number;
  readonly difficultyParams: DifficultyParams;
};

/**
 * Speed-trial threshold: how many times the child's motor-baseline RT
 * counts as "fast enough" for a speed-axis success.
 *
 * 1.5× = the child responded within 50% over their motor-only reach time.
 * Tighter than ~1.2× would be too sensitive to single-trial noise; looser
 * than ~2.0× would saturate quickly. 1.5× is the design default and can
 * be revisited once real-user data is available.
 */
export const SPEED_THRESHOLD_RATIO = 1.5;

/**
 * Minimum motor-baseline RT in ms before we trust speed updates at all.
 * If the child's motor baseline is suspiciously low (<200ms) we skip the
 * speed axis to avoid runaway theta updates from sub-200ms taps that the
 * anomaly detector already flags as random.
 */
export const MIN_MOTOR_BASELINE_MS = 200;

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

/**
 * Decide whether a single trial counts as a speed-axis success.
 *
 * Rules:
 * - Incorrect trials are always failures (RT on a wrong answer is noise).
 * - The child must respond within `SPEED_THRESHOLD_RATIO` × motor baseline.
 * - Sub-200ms responses are excluded (handled by the anomaly detector).
 */
export function isSpeedSuccess(
  trial: FinalizeTrial,
  motorBaselineMs: number
): boolean {
  if (!trial.correct) return false;
  if (motorBaselineMs < MIN_MOTOR_BASELINE_MS) return false;
  if (trial.reactionTimeMs === undefined) return false;
  if (trial.reactionTimeMs < MIN_MOTOR_BASELINE_MS) return false;
  return trial.reactionTimeMs <= motorBaselineMs * SPEED_THRESHOLD_RATIO;
}

/**
 * Update the speed axis (theta_s) using all trials from this session.
 *
 * The speed axis is game-agnostic — it measures how quickly the child
 * produces correct responses relative to their own motor floor. We use
 * a neutral b=0 (the threshold itself is the difficulty), so successes
 * pull theta_s upward and failures pull it down by symmetric amounts.
 *
 * If no motor baseline is established, returns the start state unchanged.
 */
export function applySpeedTrialsToTheta(
  start: ThetaState,
  trials: readonly FinalizeTrial[],
  motorBaselineMs: number | null
): ThetaState {
  if (motorBaselineMs === null || motorBaselineMs < MIN_MOTOR_BASELINE_MS) {
    return start;
  }
  return trials.reduce<ThetaState>((prior, trial) => {
    // Skip trials missing RT or anomalously fast — they corrupt the signal.
    if (
      trial.reactionTimeMs === undefined ||
      trial.reactionTimeMs < MIN_MOTOR_BASELINE_MS
    ) {
      return prior;
    }
    const success = isSpeedSuccess(trial, motorBaselineMs);
    return updateTheta(prior, success, DEFAULT_A, 0);
  }, start);
}
