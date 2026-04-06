/**
 * Initial difficulty params — Band B2 (IQ 44-50) defaults.
 * Based on: outputs/nolla_game_mechanics_design.md Section 2.4
 */
import type { GameType } from "@/types/domain";
import type {
  MemoryMatchParams,
  SortingParams,
  VisualSearchParams,
  CorsiBlockParams,
} from "@/types/domain";

export function getInitialDifficulty(gameType: "memory-match"): MemoryMatchParams;
export function getInitialDifficulty(gameType: "sorting"): SortingParams;
export function getInitialDifficulty(gameType: "visual-search"): VisualSearchParams;
export function getInitialDifficulty(gameType: "corsi-block"): CorsiBlockParams;
export function getInitialDifficulty(gameType: GameType): MemoryMatchParams | SortingParams | VisualSearchParams | CorsiBlockParams {
  switch (gameType) {
    case "memory-match":
      return { pairs: 3, similarity: 10, flipDelay: 1500, cardSize: 80 };
    case "sorting":
      return { categories: 2, items: 5, criterion: "color" as const, switching: "none" as const };
    case "visual-search":
      return { sceneItems: 4, diffCount: 1, diffSubtlety: 20 };
    case "corsi-block":
      return { blocks: 6, seqLength: 3, displayMs: 1200 };
  }
}
