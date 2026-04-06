/**
 * Anomaly detection for session quality.
 * Based on: outputs/nolla_nci_algorithm_design.md Section 4
 *
 * Returns 0.0-1.0 score. Higher = more anomalous.
 */
import type { TrialResult } from "@/types/domain";

const INSTANT_RT_THRESHOLD = 200; // ms — too fast to be genuine
const RAPID_RT_RATIO = 0.5; // if >50% of trials are instant → anomaly

export function calculateAnomalyScore(
  trials: readonly TrialResult[]
): number {
  if (trials.length === 0) return 0;

  const scores: number[] = [];

  // 1. Rapid/random play detection
  const instantCount = trials.filter(
    (t) => t.reactionTimeMs < INSTANT_RT_THRESHOLD
  ).length;
  const instantRatio = instantCount / trials.length;
  scores.push(instantRatio > RAPID_RT_RATIO ? 0.8 : instantRatio * 0.8);

  // 2. Repeated same answer pattern (low RT variance)
  const rts = trials.map((t) => t.reactionTimeMs);
  const rtVariance = calculateVariance(rts);
  // Very low variance with fast RTs suggests random tapping
  if (rtVariance < 100 && mean(rts) < 300) {
    scores.push(0.6);
  } else {
    scores.push(0);
  }

  // 3. Fatigue detection (accuracy drop in second half)
  if (trials.length >= 6) {
    const mid = Math.floor(trials.length / 2);
    const firstHalf = trials.slice(0, mid);
    const secondHalf = trials.slice(mid);
    const accFirst =
      firstHalf.filter((t) => t.correct).length / firstHalf.length;
    const accSecond =
      secondHalf.filter((t) => t.correct).length / secondHalf.length;
    if (accFirst - accSecond > 0.2) {
      scores.push(0.4);
    } else {
      scores.push(0);
    }
  }

  // Combine: take max signal
  const maxScore = Math.max(...scores);
  return Math.min(1, Math.max(0, maxScore));
}

function mean(values: readonly number[]): number {
  return values.reduce((sum, v) => sum + v, 0) / values.length;
}

function calculateVariance(values: readonly number[]): number {
  if (values.length < 2) return 0;
  const avg = mean(values);
  const squaredDiffs = values.map((v) => (v - avg) ** 2);
  return squaredDiffs.reduce((sum, v) => sum + v, 0) / values.length;
}
