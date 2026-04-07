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
      // 4枚スタート(2ペア)= Jade ND等の重度知的障害向け参照値
      return { pairs: 2, similarity: 10, flipDelay: 1500, cardSize: 80 };
    case "sorting":
      return { categories: 2, items: 4, criterion: "color" as const, switching: "none" as const };
    case "visual-search":
      return { sceneItems: 4, diffCount: 1, diffSubtlety: 20 };
    case "corsi-block":
      // 4ブロック開始 — 3-6歳・ID児向け改訂Corsi (Farrell Pagulayan 2006;
      // Orsini 1987)。標準Corsiは9ブロック固定だが、発達初期・重度ID向けは
      // 4から開始し staircase で 6→9 へ拡張する方が感度が高い。
      return { blocks: 4, seqLength: 2, displayMs: 1200 };
  }
}
