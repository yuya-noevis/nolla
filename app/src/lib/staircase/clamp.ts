/**
 * Parameter clamping utilities.
 * Based on: outputs/nolla_adaptive_difficulty_design_0d2.md Section 6.1
 */
import type {
  MemoryMatchParams,
  SortingParams,
  VisualSearchParams,
  CorsiBlockParams,
} from "@/types/domain";

type Limits = { readonly min: number; readonly max: number };

const MEMORY_MATCH_LIMITS: Record<keyof MemoryMatchParams, Limits> = {
  pairs: { min: 2, max: 24 },
  similarity: { min: 0, max: 100 },
  flipDelay: { min: 800, max: 2000 },
  cardSize: { min: 64, max: 96 },
};

const SORTING_LIMITS: Record<keyof SortingParams, Limits> = {
  categories: { min: 2, max: 5 },
  // items per round cap 10 — 3-8歳 ASD/ID児の注意持続時間 10-15分 を踏まえ、
  // 1セッション(3ラウンド)で最大30問に抑える。IRT的には 1R 10 trials でも
  // θ 推定は有効 (NCI設計 §2.3)。
  items: { min: 3, max: 10 },
  criterion: { min: 0, max: 4 },   // enum index placeholder
  switching: { min: 0, max: 2 },   // enum index placeholder
};

const VISUAL_SEARCH_LIMITS: Record<keyof VisualSearchParams, Limits> = {
  sceneItems: { min: 3, max: 25 },
  diffCount: { min: 1, max: 7 },
  diffSubtlety: { min: 0, max: 100 },
};

const CORSI_BLOCK_LIMITS: Record<keyof CorsiBlockParams, Limits> = {
  blocks: { min: 4, max: 16 },
  seqLength: { min: 2, max: 9 },
  displayMs: { min: 500, max: 1500 },
};

export function clampValue(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

export function clampMemoryMatch(params: MemoryMatchParams): MemoryMatchParams {
  return {
    pairs: clampValue(params.pairs, MEMORY_MATCH_LIMITS.pairs.min, MEMORY_MATCH_LIMITS.pairs.max),
    similarity: clampValue(params.similarity, MEMORY_MATCH_LIMITS.similarity.min, MEMORY_MATCH_LIMITS.similarity.max),
    flipDelay: clampValue(params.flipDelay, MEMORY_MATCH_LIMITS.flipDelay.min, MEMORY_MATCH_LIMITS.flipDelay.max),
    cardSize: clampValue(params.cardSize, MEMORY_MATCH_LIMITS.cardSize.min, MEMORY_MATCH_LIMITS.cardSize.max),
  };
}

export function clampSorting(params: SortingParams): SortingParams {
  return {
    categories: clampValue(params.categories, SORTING_LIMITS.categories.min, SORTING_LIMITS.categories.max),
    items: clampValue(params.items, SORTING_LIMITS.items.min, SORTING_LIMITS.items.max),
    criterion: params.criterion,
    switching: params.switching,
  };
}

export function clampVisualSearch(params: VisualSearchParams): VisualSearchParams {
  return {
    sceneItems: clampValue(params.sceneItems, VISUAL_SEARCH_LIMITS.sceneItems.min, VISUAL_SEARCH_LIMITS.sceneItems.max),
    diffCount: clampValue(params.diffCount, VISUAL_SEARCH_LIMITS.diffCount.min, VISUAL_SEARCH_LIMITS.diffCount.max),
    diffSubtlety: clampValue(params.diffSubtlety, VISUAL_SEARCH_LIMITS.diffSubtlety.min, VISUAL_SEARCH_LIMITS.diffSubtlety.max),
  };
}

export function clampCorsiBlock(params: CorsiBlockParams): CorsiBlockParams {
  return {
    blocks: clampValue(params.blocks, CORSI_BLOCK_LIMITS.blocks.min, CORSI_BLOCK_LIMITS.blocks.max),
    seqLength: clampValue(params.seqLength, CORSI_BLOCK_LIMITS.seqLength.min, CORSI_BLOCK_LIMITS.seqLength.max),
    displayMs: clampValue(params.displayMs, CORSI_BLOCK_LIMITS.displayMs.min, CORSI_BLOCK_LIMITS.displayMs.max),
  };
}
