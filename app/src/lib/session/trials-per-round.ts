/**
 * Trials-per-round derivation per game type and difficulty.
 *
 * Design source: outputs/nolla_self_verification_checklist.md 2026-04-08
 * (§ Trials per round evidence-based design, 95-point first-pass).
 *
 * Principles:
 *   - Target ≥ 6 core trials per round when a "trial unit" (board / scene /
 *     sequence) is short, to guarantee enough IRT data points per round.
 *   - Cap session trial counts within 3-8 yo ASD/ID sustained attention
 *     budget of 5-20 min (Heaton & Freeth 2016 meta-review).
 *   - At max difficulty, one unit per round is enough because the unit
 *     itself is long (e.g. pairs=24 clears ~30 trials per board).
 *
 * Cross-references (MVP first-pass, full page citations pending):
 *   - Memory match: Foerster (1991) concentration expected trials ≈ 4n/3
 *   - Sorting: Zelazo (2006) DCCS 6-12 trials; Landa & Goldberg (2005) ASD
 *   - Visual search: Wolfe (1998) 20-40 block; Gerhardstein (2001) kids 10-20
 *   - Corsi: FitzGerald & Meyer (2005) adaptive 4/level; Klingberg Cogmed 5-6
 */
import type {
  MemoryMatchParams,
  SortingParams,
  VisualSearchParams,
} from "@/types/domain";

/**
 * Memory-match: number of boards to play per round.
 *   boards_per_round = max(1, ceil(6 / pairs))
 * Ensures at least ~6 pair-match attempts per round even at low pair counts.
 */
export function memoryMatchBoardsPerRound(params: MemoryMatchParams): number {
  return Math.max(1, Math.ceil(6 / params.pairs));
}

/**
 * Sorting: number of scenes (item lists) to play per round.
 *   scenes_per_round = max(1, ceil(6 / items))
 * Ensures at least ~6 sort decisions per round even when items is small.
 */
export function sortingScenesPerRound(params: SortingParams): number {
  return Math.max(1, Math.ceil(6 / params.items));
}

/**
 * Visual search: number of scenes (images) to play per round.
 *   scenes_per_round = max(1, ceil(6 / diffCount))
 * Ensures at least ~6 difference finds per round even when diffCount=1.
 */
export function visualSearchScenesPerRound(params: VisualSearchParams): number {
  return Math.max(1, Math.ceil(6 / params.diffCount));
}

/**
 * Corsi block: fixed trial count per round.
 * FitzGerald & Meyer (2005) adaptive Corsi = 4 trials per level. Matches
 * a 12 trials/session × 8 baseline sessions = 96 total, above the NCI
 * precision target of ≥ 50 trials per axis (nolla_nci_algorithm_design.md
 * §2.3).
 */
export const CORSI_TRIALS_PER_ROUND = 4;
