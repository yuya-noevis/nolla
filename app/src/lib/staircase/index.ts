/**
 * Staircase Engine — Adaptive Difficulty Adjustment
 * Based on: outputs/nolla_adaptive_difficulty_design_0d2.md
 *
 * Pure functions only. No side effects, no UI, no DB.
 */

export { getStepSize } from "./step-size";
export { getConsecutiveWinThreshold } from "./threshold";
export { calculateNextDifficulty } from "./calculate";
export { getInitialDifficulty } from "./initial";
export { shouldAdvanceCriterion } from "./criterion";
