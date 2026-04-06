/**
 * IRT 2PL Model functions.
 * Based on: outputs/nolla_nci_algorithm_design.md Section 2.1
 *
 * P(correct | theta, a, b) = 1 / (1 + exp(-a * (theta - b)))
 */

/**
 * Calculate probability of correct response under 2PL model.
 * @param theta - ability parameter
 * @param a - discrimination parameter
 * @param b - difficulty parameter
 */
export function calculateResponseProbability(
  theta: number,
  a: number,
  b: number
): number {
  return 1 / (1 + Math.exp(-a * (theta - b)));
}

/**
 * Fisher information function for 2PL model.
 * I(theta) = a^2 * P(theta) * (1 - P(theta))
 *
 * Maximized when theta = b (P = 0.5), giving I = a^2 * 0.25
 */
export function calculateInformationFunction(
  theta: number,
  a: number,
  b: number
): number {
  const p = calculateResponseProbability(theta, a, b);
  return a * a * p * (1 - p);
}
