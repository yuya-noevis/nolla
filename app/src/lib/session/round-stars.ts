/**
 * Per-round star award.
 *
 * Two scoring rules, by game type:
 *
 * (A) Direct-response games (sorting / visual-search / corsi-block):
 *     Each trial is an independent right/wrong judgment with no exploration
 *     cost. Mistake-count based:
 *       0 mistakes → 3★ / 1 mistake → 2★ / 2+ mistakes → 1★
 *
 * (B) Concentration-style memory-match:
 *     Exploration-learning game — early blind flips are *necessary*
 *     information gathering, not user errors. Even an IQ 130 adult with
 *     perfect memory can rack up "unlucky misses" purely from drawing
 *     never-seen cards consecutively.
 *
 *     The 3★ threshold layers two principles:
 *
 *     1. Max-unlucky baseline (Yuya's spec 2026-04-08):
 *          pairs:    2 3 4 5 6
 *          misses:   1 2 2 2 3
 *        — the most an IQ 130 adult could miss from sheer luck on opening
 *        flips, derived from "you could draw all-different pairs on the
 *        first few flips by chance" reasoning.
 *
 *     2. ID-child accommodation:
 *        The target user is intellectually disabled, not an IQ 130 adult.
 *        For pairs ≥ 7 we relax the threshold to ~70 % of pairs, growing
 *        the absolute allowance with difficulty (no room at low n where
 *        the game is short, generous at high n where the game is long).
 *
 *     Resulting table (pairs → max misses for 3★ / 2★):
 *        2 →  1 / 2     3 →  2 / 3     4 →  2 / 4     5 →  2 / 5
 *        6 →  3 / 6     7 →  4 / 7     8 →  5 / 8    10 →  7 / 10
 *       12 →  8 / 12   16 → 11 / 16   20 → 14 / 20   24 → 16 / 24
 */
import type { GameType, DifficultyParams, MemoryMatchParams } from "@/types/domain";

export type RoundStarsInput = {
  readonly gameType: GameType;
  readonly totalTrials: number;
  readonly correctCount: number;
  readonly difficultyParams: DifficultyParams;
};

export function calculateRoundStars(input: RoundStarsInput): number {
  const { gameType, totalTrials, correctCount, difficultyParams } = input;
  if (totalTrials <= 0) return 1;

  if (gameType === "memory-match") {
    return memoryMatchStars(totalTrials, difficultyParams as MemoryMatchParams);
  }

  // Direct-response games
  const wrong = totalTrials - correctCount;
  if (wrong === 0) return 3;
  if (wrong === 1) return 2;
  return 1;
}

// Yuya's "max unlucky misses for IQ 130 adult" spec (2026-04-08).
// Indexed by pair count (only n ≥ 2 is reachable per clamp.ts pairs.min=2).
const MAX_UNLUCKY_SMALL_N: Record<number, number> = {
  2: 1,
  3: 2,
  4: 2,
  5: 2,
  6: 3,
};

export function memoryMatchAllowance3Star(pairs: number): number {
  if (pairs <= 6) return MAX_UNLUCKY_SMALL_N[pairs] ?? 1;
  // ID-accommodation extrapolation: ~70% of pairs allowed as misses.
  // Grows with the difficulty of the level — generous when the game is
  // long, structurally tight when it's short.
  return Math.floor(pairs * 0.7);
}

export function memoryMatchAllowance2Star(pairs: number): number {
  // Always at least 1 above 3★ allowance, and at least equal to pairs
  // (= up to 100 % extra trials).
  return Math.max(pairs, memoryMatchAllowance3Star(pairs) + 1);
}

function memoryMatchStars(
  totalTrials: number,
  params: MemoryMatchParams
): number {
  const pairs = params.pairs;
  // A trial = one pair attempt. Minimum trials to clear = pairs.
  // misses = extra attempts beyond the minimum.
  const misses = Math.max(0, totalTrials - pairs);
  const allow3 = memoryMatchAllowance3Star(pairs);
  const allow2 = memoryMatchAllowance2Star(pairs);

  if (misses <= allow3) return 3;
  if (misses <= allow2) return 2;
  return 1;
}
