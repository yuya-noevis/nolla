/**
 * Motor baseline calculation.
 * Based on: outputs/nolla_nci_algorithm_design.md Section 3.3
 *
 * - 10 simple reaction trials
 * - Remove outliers (median ± 2SD)
 * - Weighted average: new = 0.7 * old + 0.3 * median
 */
import type { MotorBaseline } from "@/types/scoring";

const OLD_WEIGHT = 0.7;
const NEW_WEIGHT = 0.3;

export function calculateMotorBaseline(
  reactionTimes: readonly number[],
  previousBaseline: number | null
): MotorBaseline {
  const filtered = removeOutliers(reactionTimes);
  const medianRt = median(filtered);

  const weightedBaseline =
    previousBaseline === null
      ? medianRt
      : Math.round(OLD_WEIGHT * previousBaseline + NEW_WEIGHT * medianRt);

  return {
    reactionTimes,
    medianRt,
    weightedBaseline,
  };
}

function removeOutliers(values: readonly number[]): readonly number[] {
  if (values.length < 3) return values;

  const med = median(values);
  const deviations = values.map((v) => (v - med) ** 2);
  const variance = deviations.reduce((s, v) => s + v, 0) / values.length;
  const sd = Math.sqrt(variance);

  if (sd === 0) return values;

  const lowerBound = med - 2 * sd;
  const upperBound = med + 2 * sd;

  const filtered = values.filter((v) => v >= lowerBound && v <= upperBound);
  return filtered.length > 0 ? filtered : values;
}

function median(values: readonly number[]): number {
  if (values.length === 0) return 0;

  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);

  if (sorted.length % 2 === 0) {
    return Math.round((sorted[mid - 1] + sorted[mid]) / 2);
  }
  return sorted[mid];
}
