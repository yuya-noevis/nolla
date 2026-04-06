/**
 * DDM simplified drift rate estimation.
 * Based on: outputs/nolla_nci_algorithm_design.md Section 3
 *
 * MVP version: drift_rate = 1 / (RT - motor_baseline)
 * Higher drift = faster cognitive processing
 */

/**
 * Estimate cognitive drift rate from reaction time and motor baseline.
 * @param reactionTimeMs - total reaction time in ms
 * @param motorBaselineMs - motor baseline in ms (from simple reaction task)
 * @returns drift rate (higher = faster processing), or null if invalid
 */
export function estimateDriftRate(
  reactionTimeMs: number,
  motorBaselineMs: number
): number | null {
  const cognitiveRt = reactionTimeMs - motorBaselineMs;

  if (cognitiveRt <= 0) return null;

  // Inverse of cognitive RT as drift rate proxy
  // Scale by 1000 for readable values
  return 1000 / cognitiveRt;
}
