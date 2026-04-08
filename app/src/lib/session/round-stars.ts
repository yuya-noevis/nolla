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
 *     The game is exploration-learning — early flips are *necessary*
 *     information-gathering, not errors. Penalizing any miss is wrong.
 *     We use an "expected misses under perfect memory" baseline:
 *       Foerster (1991), Frank & Gerpott (2003) — for n pairs, an
 *       optimal perfect-memory player needs ≈ 4n/3 pair attempts on
 *       average, i.e. ≈ n/3 expected misses.
 *
 *     Thresholds (scale with the current `pairs` difficulty):
 *       missesAllowed3Star = max(1, floor(pairs / 3))   // perfect memory zone
 *       missesAllowed2Star = pairs                       // up to 100% extra
 *       3★ if misses ≤ allow3
 *       2★ if misses ≤ allow2
 *       1★ otherwise
 *
 *     Scaling check (pairs → max misses for 3★ / 2★):
 *       2 → 1 / 2     4 → 1 / 4     6 → 2 / 6
 *       8 → 2 / 8    12 → 4 / 12   24 → 8 / 24
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

function memoryMatchStars(
  totalTrials: number,
  params: MemoryMatchParams
): number {
  const pairs = params.pairs;
  // A trial = one pair attempt. Minimum trials to clear = pairs.
  // misses = extra attempts beyond the minimum.
  const misses = Math.max(0, totalTrials - pairs);
  const missesAllowed3Star = Math.max(1, Math.floor(pairs / 3));
  const missesAllowed2Star = pairs;

  if (misses <= missesAllowed3Star) return 3;
  if (misses <= missesAllowed2Star) return 2;
  return 1;
}
