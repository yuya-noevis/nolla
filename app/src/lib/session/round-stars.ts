/**
 * Per-round star award — unified evidence-based design (2026-04-08).
 *
 * Two scoring rules:
 *
 * (A) Direct-response games (sorting / visual-search / corsi-block)
 *     Each trial is an independent right/wrong judgment. Under the
 *     adaptive staircase target of 80 % success rate, the expected
 *     miss rate at equilibrium is ~20 %.  We use two trial-count-scaled
 *     thresholds so the expected reward per round lands on 2★:
 *       3★: misses ≤ floor(trials × 0.15)   // top ~15 % performance
 *       2★: misses ≤ floor(trials × 0.40)   // ≈ 2× equilibrium miss rate
 *       1★: otherwise
 *     At low trial counts this collapses to the previous simple rule
 *     (trials=4: 0 mistakes=3★, 1 mistake=2★). At higher counts it
 *     becomes more generous, matching the principle that more trials
 *     give more tolerance for individual errors.
 *
 * (B) Memory-match (Concentration, exploration-learning)
 *     Early blind flips are necessary information gathering, not errors,
 *     so the rule layers two principles:
 *       1. Max-unlucky baseline per board (Yuya spec 2026-04-08):
 *            pairs:    2 3 4 5 6
 *            misses:   1 2 2 2 3
 *          — the most an IQ 130 adult could miss from sheer luck on
 *          opening flips before a pigeonhole-forced match.
 *       2. For pairs ≥ 7, extrapolate at ~70 % of pairs as the
 *          per-board 3★ allowance (ID-child accommodation: target
 *          user is intellectually disabled, not an IQ 130 adult).
 *     Per-board thresholds scale linearly with boards_per_round
 *     (see trials-per-round.ts for boards derivation).
 *
 *       3★: misses ≤ boards × allow3_per_board(pairs)
 *       2★: misses ≤ boards × pairs           (up to 100 % extra trials)
 *       1★: otherwise
 */
import type {
  GameType,
  DifficultyParams,
  MemoryMatchParams,
} from "@/types/domain";
import { memoryMatchBoardsPerRound } from "./trials-per-round";

// ============================================================
// Direct-response thresholds — used by sorting, visual-search, corsi.
// ============================================================

export function directResponseAllowance3Star(trials: number): number {
  return Math.floor(trials * 0.15);
}

export function directResponseAllowance2Star(trials: number): number {
  return Math.floor(trials * 0.4);
}

function directResponseStars(totalTrials: number, correctCount: number): number {
  const misses = totalTrials - correctCount;
  if (misses <= directResponseAllowance3Star(totalTrials)) return 3;
  if (misses <= directResponseAllowance2Star(totalTrials)) return 2;
  return 1;
}

// ============================================================
// Memory-match per-board allowance (Yuya spec 2026-04-08).
// ============================================================

const MAX_UNLUCKY_SMALL_N: Record<number, number> = {
  2: 1,
  3: 2,
  4: 2,
  5: 2,
  6: 3,
};

/** 3★ allowance *per board* — before scaling by boardsPerRound. */
export function memoryMatchAllowance3StarPerBoard(pairs: number): number {
  if (pairs <= 6) return MAX_UNLUCKY_SMALL_N[pairs] ?? 1;
  return Math.floor(pairs * 0.7);
}

/** 3★ allowance for a whole round (accounting for boardsPerRound). */
export function memoryMatchAllowance3Star(params: MemoryMatchParams): number {
  const boards = memoryMatchBoardsPerRound(params);
  return boards * memoryMatchAllowance3StarPerBoard(params.pairs);
}

/** 2★ allowance for a whole round. */
export function memoryMatchAllowance2Star(params: MemoryMatchParams): number {
  const boards = memoryMatchBoardsPerRound(params);
  // Up to 100 % extra trials: misses ≤ total expected matches per round.
  return Math.max(
    boards * params.pairs,
    memoryMatchAllowance3Star(params) + 1
  );
}

function memoryMatchStars(
  totalTrials: number,
  params: MemoryMatchParams
): number {
  const boards = memoryMatchBoardsPerRound(params);
  const expectedMatches = boards * params.pairs;
  const misses = Math.max(0, totalTrials - expectedMatches);
  const allow3 = memoryMatchAllowance3Star(params);
  const allow2 = memoryMatchAllowance2Star(params);

  if (misses <= allow3) return 3;
  if (misses <= allow2) return 2;
  return 1;
}

// ============================================================
// Public entry point
// ============================================================

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
  return directResponseStars(totalTrials, correctCount);
}
