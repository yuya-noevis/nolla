/**
 * Difficulty parameter (b) calculation from game params.
 * Based on: outputs/nolla_nci_algorithm_design.md Section 2.1
 */
import type {
  GameType,
  DifficultyParams,
  MemoryMatchParams,
  SortingParams,
  VisualSearchParams,
  CorsiBlockParams,
} from "@/types/domain";

// Criterion complexity mapping
const CRITERION_COMPLEXITY: Record<string, number> = {
  color: 0.1,
  shape: 0.3,
  size: 0.4,
  category: 0.6,
  multi: 0.9,
};

// Switching factor mapping
const SWITCHING_FACTOR: Record<string, number> = {
  none: 0,
  between_rounds: 0.3,
  within_round: 0.6,
};

// Diff count factor mapping (1-7)
const DIFF_COUNT_FACTOR: Record<number, number> = {
  1: 0.1, 2: 0.2, 3: 0.35, 4: 0.5, 5: 0.65, 6: 0.8, 7: 0.9,
};

/**
 * Calculate IRT difficulty parameter b from game-specific params.
 */
export function calculateDifficultyB(
  gameType: GameType,
  params: DifficultyParams
): number {
  switch (gameType) {
    case "memory-match":
      return calcMemoryMatchB(params as MemoryMatchParams);
    case "sorting":
      return calcSortingB(params as SortingParams);
    case "visual-search":
      return calcVisualSearchB(params as VisualSearchParams);
    case "corsi-block":
      return calcCorsiBlockB(params as CorsiBlockParams);
  }
}

function calcMemoryMatchB(p: MemoryMatchParams): number {
  return (
    0.5 * Math.log(p.pairs) +
    0.3 * (p.similarity / 100) +
    0.2 * (1 - p.flipDelay / 2000)
  );
}

function calcSortingB(p: SortingParams): number {
  const criterionC = CRITERION_COMPLEXITY[p.criterion] ?? 0.1;
  const switchingF = SWITCHING_FACTOR[p.switching] ?? 0;
  return (
    0.3 * Math.log(p.categories) +
    0.4 * Math.log(p.items) +
    0.2 * criterionC +
    0.1 * switchingF
  );
}

function calcVisualSearchB(p: VisualSearchParams): number {
  const dcf = DIFF_COUNT_FACTOR[p.diffCount] ?? 0.1;
  return (
    0.4 * Math.log(p.sceneItems) +
    0.4 * dcf +
    0.2 * (p.diffSubtlety / 100)
  );
}

function calcCorsiBlockB(p: CorsiBlockParams): number {
  return (
    0.4 * Math.log(p.blocks) +
    0.4 * (p.seqLength / 9) +
    0.2 * (1 - p.displayMs / 1500)
  );
}
