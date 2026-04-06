/**
 * Core Staircase calculation — adjusts difficulty per round.
 * Based on: outputs/nolla_adaptive_difficulty_design_0d2.md Section 2
 *
 * Rules:
 * - UP: N consecutive correct → increase priority-1 param
 * - DOWN: hint stage 3 reached >= 2 times → decrease reverse-priority-1 param
 * - Only 1 parameter adjusted per round
 * - Clamp all values to min/max bounds
 */
import type {
  GameType,
  DifficultyParams,
  MemoryMatchParams,
  SortingParams,
  VisualSearchParams,
  CorsiBlockParams,
  StaircaseState,
  RoundResult,
  StaircaseDirection,
} from "@/types/domain";
import type { IQBand } from "@/types/user";
import { getStepSize } from "./step-size";
import { getConsecutiveWinThreshold } from "./threshold";
import {
  clampMemoryMatch,
  clampSorting,
  clampVisualSearch,
  clampCorsiBlock,
} from "./clamp";

export type StaircaseResult = {
  readonly params: DifficultyParams;
  readonly state: StaircaseState;
};

const HINT_STAGE3_DOWN_THRESHOLD = 2;

export function calculateNextDifficulty(
  gameType: GameType,
  currentParams: DifficultyParams,
  roundResult: RoundResult,
  state: StaircaseState,
  iqBand: IQBand
): StaircaseResult {
  const n = getConsecutiveWinThreshold(iqBand);
  const step = getStepSize(state.reversalCount);

  // UP condition: N consecutive correct
  if (roundResult.consecutiveCorrect >= n) {
    const newDirection: StaircaseDirection = "up";
    const reversal = state.lastDirection !== null && state.lastDirection !== newDirection;
    const newParams = adjustUp(gameType, currentParams, step);
    return {
      params: newParams,
      state: {
        reversalCount: reversal ? state.reversalCount + 1 : state.reversalCount,
        lastDirection: newDirection,
        consecutiveCorrect: 0,
      },
    };
  }

  // DOWN condition: hint stage 3 reached >= 2 times in round
  if (roundResult.hintStage3Count >= HINT_STAGE3_DOWN_THRESHOLD) {
    const newDirection: StaircaseDirection = "down";
    const reversal = state.lastDirection !== null && state.lastDirection !== newDirection;
    const newParams = adjustDown(gameType, currentParams, step);
    return {
      params: newParams,
      state: {
        reversalCount: reversal ? state.reversalCount + 1 : state.reversalCount,
        lastDirection: newDirection,
        consecutiveCorrect: 0,
      },
    };
  }

  // No adjustment
  return {
    params: currentParams,
    state: {
      ...state,
      lastDirection: state.lastDirection,
    },
  };
}

// --- UP adjusters (priority order: first param that can still increase) ---

function adjustUp(
  gameType: GameType,
  params: DifficultyParams,
  step: number
): DifficultyParams {
  switch (gameType) {
    case "memory-match":
      return adjustMemoryMatchUp(params as MemoryMatchParams, step);
    case "sorting":
      return adjustSortingUp(params as SortingParams, step);
    case "visual-search":
      return adjustVisualSearchUp(params as VisualSearchParams, step);
    case "corsi-block":
      return adjustCorsiBlockUp(params as CorsiBlockParams, step);
  }
}

function adjustDown(
  gameType: GameType,
  params: DifficultyParams,
  step: number
): DifficultyParams {
  switch (gameType) {
    case "memory-match":
      return adjustMemoryMatchDown(params as MemoryMatchParams, step);
    case "sorting":
      return adjustSortingDown(params as SortingParams, step);
    case "visual-search":
      return adjustVisualSearchDown(params as VisualSearchParams, step);
    case "corsi-block":
      return adjustCorsiBlockDown(params as CorsiBlockParams, step);
  }
}

// --- Memory Match ---
// UP priority: pairs(1) > similarity(2) > flipDelay(3) > cardSize(4)
// DOWN priority (reverse): cardSize(4) > flipDelay(3) > similarity(2) > pairs(1)

function adjustMemoryMatchUp(p: MemoryMatchParams, step: number): MemoryMatchParams {
  // Try priority 1: pairs
  const newPairs = Math.ceil(p.pairs * step);
  if (newPairs <= 24 && newPairs > p.pairs) {
    return clampMemoryMatch({ ...p, pairs: newPairs });
  }
  // Priority 2: similarity
  const stepPct = stepToPercent(step);
  const newSim = p.similarity + stepPct;
  if (newSim <= 100 && newSim > p.similarity) {
    return clampMemoryMatch({ ...p, similarity: newSim });
  }
  // Priority 3: flipDelay (decrease = harder)
  const stepMs = stepToMs(step);
  const newDelay = p.flipDelay - stepMs;
  if (newDelay >= 800 && newDelay < p.flipDelay) {
    return clampMemoryMatch({ ...p, flipDelay: newDelay });
  }
  // Priority 4: cardSize (decrease = harder)
  const newSize = p.cardSize - 4;
  if (newSize >= 64 && newSize < p.cardSize) {
    return clampMemoryMatch({ ...p, cardSize: newSize });
  }
  // All maxed out
  return p;
}

function adjustMemoryMatchDown(p: MemoryMatchParams, step: number): MemoryMatchParams {
  // Reverse priority 4: cardSize (increase = easier)
  const newSize = p.cardSize + 4;
  if (newSize <= 96 && newSize > p.cardSize) {
    return clampMemoryMatch({ ...p, cardSize: newSize });
  }
  // Reverse priority 3: flipDelay (increase = easier)
  const stepMs = stepToMs(step);
  const newDelay = p.flipDelay + stepMs;
  if (newDelay <= 2000 && newDelay > p.flipDelay) {
    return clampMemoryMatch({ ...p, flipDelay: newDelay });
  }
  // Reverse priority 2: similarity (decrease = easier)
  const stepPct = stepToPercent(step);
  const newSim = p.similarity - stepPct;
  if (newSim >= 0 && newSim < p.similarity) {
    return clampMemoryMatch({ ...p, similarity: newSim });
  }
  // Reverse priority 1: pairs (decrease = easier)
  const newPairs = Math.floor(p.pairs / step);
  if (newPairs >= 2 && newPairs < p.pairs) {
    return clampMemoryMatch({ ...p, pairs: newPairs });
  }
  // All at minimum
  return p;
}

// --- Sorting ---
// UP: items(1) > categories(2) > switching(3) > criterion(4, controlled by shouldAdvanceCriterion)
// DOWN reverse: criterion(4) > switching(3) > categories(2) > items(1)

function adjustSortingUp(p: SortingParams, step: number): SortingParams {
  const newItems = Math.ceil(p.items * step);
  if (newItems <= 15 && newItems > p.items) {
    return clampSorting({ ...p, items: newItems });
  }
  if (p.items >= 10 && p.categories < 5) {
    return clampSorting({ ...p, categories: p.categories + 1 });
  }
  const nextSwitching = advanceSwitching(p.switching);
  if (nextSwitching !== p.switching) {
    return clampSorting({ ...p, switching: nextSwitching });
  }
  // criterion is controlled by shouldAdvanceCriterion, not staircase
  return p;
}

function adjustSortingDown(p: SortingParams, step: number): SortingParams {
  const prevSwitching = regressSwitching(p.switching);
  if (prevSwitching !== p.switching) {
    return clampSorting({ ...p, switching: prevSwitching });
  }
  if (p.categories > 2) {
    return clampSorting({ ...p, categories: p.categories - 1 });
  }
  const newItems = Math.floor(p.items / step);
  if (newItems >= 3 && newItems < p.items) {
    return clampSorting({ ...p, items: newItems });
  }
  return p;
}

// --- Visual Search ---
// UP: sceneItems(1) > diffSubtlety(2) > diffCount(3)
// DOWN reverse: diffCount(3) > diffSubtlety(2) > sceneItems(1)

function adjustVisualSearchUp(p: VisualSearchParams, step: number): VisualSearchParams {
  const newItems = Math.ceil(p.sceneItems * step);
  if (newItems <= 25 && newItems > p.sceneItems) {
    return clampVisualSearch({ ...p, sceneItems: newItems });
  }
  const stepPct = stepToPercent(step);
  const newSubtlety = p.diffSubtlety + stepPct;
  if (newSubtlety <= 100 && newSubtlety > p.diffSubtlety) {
    return clampVisualSearch({ ...p, diffSubtlety: newSubtlety });
  }
  if (p.diffCount < 7) {
    return clampVisualSearch({ ...p, diffCount: p.diffCount + 1 });
  }
  return p;
}

function adjustVisualSearchDown(p: VisualSearchParams, step: number): VisualSearchParams {
  if (p.diffCount > 1) {
    return clampVisualSearch({ ...p, diffCount: p.diffCount - 1 });
  }
  const stepPct = stepToPercent(step);
  const newSubtlety = p.diffSubtlety - stepPct;
  if (newSubtlety >= 0 && newSubtlety < p.diffSubtlety) {
    return clampVisualSearch({ ...p, diffSubtlety: newSubtlety });
  }
  const newItems = Math.floor(p.sceneItems / step);
  if (newItems >= 3 && newItems < p.sceneItems) {
    return clampVisualSearch({ ...p, sceneItems: newItems });
  }
  return p;
}

// --- Corsi Block ---
// UP: seqLength(1, +1) > blocks(2, multiplicative) > displayMs(3, -stepMs)
// DOWN reverse: displayMs(3, +stepMs) > blocks(2, /step) > seqLength(1, -1)

function adjustCorsiBlockUp(p: CorsiBlockParams, step: number): CorsiBlockParams {
  if (p.seqLength < 9) {
    return clampCorsiBlock({ ...p, seqLength: p.seqLength + 1 });
  }
  const newBlocks = Math.ceil(p.blocks * step);
  if (newBlocks <= 16 && newBlocks > p.blocks) {
    return clampCorsiBlock({ ...p, blocks: newBlocks });
  }
  const stepMs = stepToMs(step);
  const newMs = p.displayMs - stepMs;
  if (newMs >= 500 && newMs < p.displayMs) {
    return clampCorsiBlock({ ...p, displayMs: newMs });
  }
  return p;
}

function adjustCorsiBlockDown(p: CorsiBlockParams, step: number): CorsiBlockParams {
  const stepMs = stepToMs(step);
  const newMs = p.displayMs + stepMs;
  if (newMs <= 1500 && newMs > p.displayMs) {
    return clampCorsiBlock({ ...p, displayMs: newMs });
  }
  const newBlocks = Math.floor(p.blocks / step);
  if (newBlocks >= 4 && newBlocks < p.blocks) {
    return clampCorsiBlock({ ...p, blocks: newBlocks });
  }
  if (p.seqLength > 2) {
    return clampCorsiBlock({ ...p, seqLength: p.seqLength - 1 });
  }
  return p;
}

// --- Helpers ---

function stepToPercent(step: number): number {
  // 1.20 -> 20%, 1.10 -> 10%, 1.05 -> 5%
  return Math.round((step - 1) * 100);
}

function stepToMs(step: number): number {
  // 1.20 -> 200ms, 1.10 -> 100ms, 1.05 -> 50ms
  return Math.round((step - 1) * 1000);
}

function advanceSwitching(
  current: "none" | "between_rounds" | "within_round"
): "none" | "between_rounds" | "within_round" {
  if (current === "none") return "between_rounds";
  if (current === "between_rounds") return "within_round";
  return current;
}

function regressSwitching(
  current: "none" | "between_rounds" | "within_round"
): "none" | "between_rounds" | "within_round" {
  if (current === "within_round") return "between_rounds";
  if (current === "between_rounds") return "none";
  return current;
}
