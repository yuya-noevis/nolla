/**
 * Sorting criterion advancement check.
 * Based on: outputs/nolla_game_mechanics_design.md Section 2.6
 *
 * Conditions for advancing to next criterion level:
 * 1. Accuracy >= 85% for last 3 consecutive sessions
 * 2. Hint Stage 3 rate <= 10% for all 3 sessions
 */
export type SessionSummary = {
  readonly accuracy: number;
  readonly hintStage3Rate: number;
};

export function shouldAdvanceCriterion(
  sessionHistory: readonly SessionSummary[]
): boolean {
  if (sessionHistory.length < 3) return false;

  const lastThree = sessionHistory.slice(-3);

  return lastThree.every(
    (s) => s.accuracy >= 0.85 && s.hintStage3Rate <= 0.10
  );
}
