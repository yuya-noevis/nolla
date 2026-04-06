/**
 * Variable step size based on reversal count.
 *
 * Phase 1 (reversal 0-2): 1.20 — exploration
 * Phase 2 (reversal 3-5): 1.10 — convergence
 * Phase 3 (reversal 6+):  1.05 — precision
 */
export function getStepSize(reversalCount: number): number {
  if (reversalCount <= 2) return 1.20;
  if (reversalCount <= 5) return 1.10;
  return 1.05;
}
