/**
 * Anomaly detection for session quality.
 * Based on: outputs/nolla_nci_algorithm_design.md Section 4
 *
 * Returns 0.0-1.0 score. Higher = more anomalous.
 */
import type { TrialResult } from "@/types/domain";

const INSTANT_RT_THRESHOLD = 200; // ms — too fast to be genuine
const RAPID_RT_RATIO = 0.5; // if >50% of trials are instant → anomaly
const INTERRUPTION_RT_THRESHOLD = 30000; // ms — >30s suggests external interruption
const INTERRUPTION_RATIO = 0.15; // if ≥15% of trials were interrupted → session quality compromised

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

  // 4. Position-repeat detection (random tapping the same target)
  // Looks for a single answer key (sorting.targetCategoryId,
  // visual-search.itemId, memory-match first tap) chosen ≥80% of trials.
  // Only triggers when ≥6 trials have a usable position field.
  const positions = trials
    .map((t) => extractPositionKey(t.gameData))
    .filter((p): p is string => p !== null);
  if (positions.length >= 6) {
    const counts = new Map<string, number>();
    for (const p of positions) counts.set(p, (counts.get(p) ?? 0) + 1);
    const maxRepeat = Math.max(...counts.values());
    const repeatRatio = maxRepeat / positions.length;
    if (repeatRatio >= 0.8) {
      scores.push(0.6);
    } else if (repeatRatio >= 0.6) {
      scores.push(0.3);
    } else {
      scores.push(0);
    }
  }

  // 5. External interruption detection (very long RT outliers)
  // Indicates the child was pulled away mid-trial (parent, sibling, environment).
  // Scoring scales with the proportion of interrupted trials.
  const interruptedCount = trials.filter(
    (t) => t.reactionTimeMs > INTERRUPTION_RT_THRESHOLD
  ).length;
  const interruptedRatio = interruptedCount / trials.length;
  if (interruptedRatio >= INTERRUPTION_RATIO) {
    scores.push(0.5);
  } else if (interruptedCount > 0) {
    scores.push(Math.min(0.5, interruptedRatio * 2));
  } else {
    scores.push(0);
  }

  // Combine: take max signal
  const maxScore = Math.max(...scores);
  return Math.min(1, Math.max(0, maxScore));
}

function mean(values: readonly number[]): number {
  return values.reduce((sum, v) => sum + v, 0) / values.length;
}

/**
 * Extract a stable "answer position" key from a trial's gameData.
 * Returns null if no recognized position field is present.
 */
function extractPositionKey(
  gameData: Record<string, unknown>
): string | null {
  // sorting
  if (typeof gameData.targetCategoryId === "string") {
    return `cat:${gameData.targetCategoryId}`;
  }
  // visual-search
  if (typeof gameData.itemId === "string") {
    return `item:${gameData.itemId}`;
  }
  // memory-match
  if (Array.isArray(gameData.tappedIndices)) {
    return `pair:${(gameData.tappedIndices as number[]).join("-")}`;
  }
  // corsi-block — use first input block as the "starting position" signal
  if (Array.isArray(gameData.inputSequence)) {
    const seq = gameData.inputSequence as number[];
    if (seq.length > 0) return `corsi:${seq[0]}`;
  }
  return null;
}

function calculateVariance(values: readonly number[]): number {
  if (values.length < 2) return 0;
  const avg = mean(values);
  const squaredDiffs = values.map((v) => (v - avg) ** 2);
  return squaredDiffs.reduce((sum, v) => sum + v, 0) / values.length;
}
