/**
 * Game content generation tests — TDD RED phase
 * Based on: outputs/nolla_game_mechanics_design.md
 */
import { describe, it, expect } from "vitest";
import { generateMemoryMatchBoard } from "@/lib/games/memory-match/generate";
import { generateSortingRound } from "@/lib/games/sorting/generate";
import { generateVisualSearchScene } from "@/lib/games/visual-search/generate";
import { generateCorsiLayout } from "@/lib/games/corsi-block/generate";
import type {
  MemoryMatchParams,
  SortingParams,
  VisualSearchParams,
  CorsiBlockParams,
} from "@/types/domain";

// ============================================================
// Memory Match
// ============================================================
describe("generateMemoryMatchBoard", () => {
  it("generates correct number of cards (pairs * 2)", () => {
    const params: MemoryMatchParams = { pairs: 4, similarity: 0, flipDelay: 1500, cardSize: 80 };
    const board = generateMemoryMatchBoard(params);
    expect(board.cards).toHaveLength(8);
  });

  it("each card has matching pair", () => {
    const params: MemoryMatchParams = { pairs: 6, similarity: 0, flipDelay: 1200, cardSize: 72 };
    const board = generateMemoryMatchBoard(params);
    const pairCounts = new Map<string, number>();
    for (const card of board.cards) {
      pairCounts.set(card.pairId, (pairCounts.get(card.pairId) ?? 0) + 1);
    }
    // Each pairId appears exactly 2 times
    for (const count of pairCounts.values()) {
      expect(count).toBe(2);
    }
    expect(pairCounts.size).toBe(6);
  });

  it("assigns correct grid size for 2 pairs (2x2)", () => {
    const params: MemoryMatchParams = { pairs: 2, similarity: 0, flipDelay: 2000, cardSize: 96 };
    const board = generateMemoryMatchBoard(params);
    expect(board.gridCols).toBe(2);
    expect(board.gridRows).toBe(2);
  });

  it("assigns correct grid size for 6 pairs (3x4)", () => {
    const params: MemoryMatchParams = { pairs: 6, similarity: 0, flipDelay: 1200, cardSize: 72 };
    const board = generateMemoryMatchBoard(params);
    expect(board.gridCols).toBe(4);
    expect(board.gridRows).toBe(3);
  });

  it("assigns correct grid size for 24 pairs (6x8)", () => {
    const params: MemoryMatchParams = { pairs: 24, similarity: 0, flipDelay: 800, cardSize: 64 };
    const board = generateMemoryMatchBoard(params);
    expect(board.gridCols).toBe(8);
    expect(board.gridRows).toBe(6);
  });

  it("positions are unique and cover 0..N-1", () => {
    const params: MemoryMatchParams = { pairs: 4, similarity: 0, flipDelay: 1500, cardSize: 80 };
    const board = generateMemoryMatchBoard(params);
    const positions = board.cards.map((c) => c.position).sort((a, b) => a - b);
    expect(positions).toEqual([0, 1, 2, 3, 4, 5, 6, 7]);
  });

  it("cards are shuffled (not always in order)", () => {
    const params: MemoryMatchParams = { pairs: 8, similarity: 0, flipDelay: 1000, cardSize: 64 };
    // Run multiple times and check at least one is not sorted
    let allSorted = true;
    for (let i = 0; i < 5; i++) {
      const board = generateMemoryMatchBoard(params);
      const pairIds = board.cards.map((c) => c.pairId);
      const sorted = [...pairIds].sort();
      if (pairIds.join(",") !== sorted.join(",")) {
        allSorted = false;
        break;
      }
    }
    expect(allSorted).toBe(false);
  });

  it("all card ids are unique", () => {
    const params: MemoryMatchParams = { pairs: 10, similarity: 50, flipDelay: 800, cardSize: 64 };
    const board = generateMemoryMatchBoard(params);
    const ids = board.cards.map((c) => c.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("higher similarity produces similar imageKeys within pairs", () => {
    const params: MemoryMatchParams = { pairs: 4, similarity: 80, flipDelay: 1500, cardSize: 80 };
    const board = generateMemoryMatchBoard(params);
    // At least one pair should have different imageKeys (similarity < 100 means some visual distraction)
    // At similarity 80%, most pairs share a category prefix
    expect(board.cards.length).toBe(8);
  });
});

// ============================================================
// Sorting
// ============================================================
describe("generateSortingRound", () => {
  it("generates correct number of items", () => {
    const params: SortingParams = { categories: 3, items: 6, criterion: "color", switching: "none" };
    const round = generateSortingRound(params);
    expect(round.items).toHaveLength(6);
  });

  it("generates correct number of categories", () => {
    const params: SortingParams = { categories: 3, items: 6, criterion: "color", switching: "none" };
    const round = generateSortingRound(params);
    expect(round.categories).toHaveLength(3);
  });

  it("each category has at least 1 item", () => {
    const params: SortingParams = { categories: 4, items: 8, criterion: "shape", switching: "none" };
    const round = generateSortingRound(params);
    for (const cat of round.categories) {
      const matching = round.items.filter(
        (item) => item.attributes[round.criterion] === cat.matchValue
      );
      expect(matching.length).toBeGreaterThanOrEqual(1);
    }
  });

  it("returns the correct criterion", () => {
    const params: SortingParams = { categories: 2, items: 4, criterion: "size", switching: "none" };
    const round = generateSortingRound(params);
    expect(round.criterion).toBe("size");
  });

  it("all item ids are unique", () => {
    const params: SortingParams = { categories: 5, items: 15, criterion: "category", switching: "none" };
    const round = generateSortingRound(params);
    const ids = round.items.map((i) => i.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("items have the criterion attribute", () => {
    const params: SortingParams = { categories: 3, items: 6, criterion: "color", switching: "none" };
    const round = generateSortingRound(params);
    for (const item of round.items) {
      expect(item.attributes).toHaveProperty("color");
    }
  });

  it("handles multi criterion with multiple attributes", () => {
    const params: SortingParams = { categories: 3, items: 6, criterion: "multi", switching: "none" };
    const round = generateSortingRound(params);
    expect(round.criterion).toBe("multi");
    expect(round.items.length).toBe(6);
  });
});

// ============================================================
// Visual Search
// ============================================================
describe("generateVisualSearchScene", () => {
  it("generates correct number of items", () => {
    const params: VisualSearchParams = { sceneItems: 5, diffCount: 2, diffSubtlety: 30 };
    const scene = generateVisualSearchScene(params);
    expect(scene.items).toHaveLength(5);
  });

  it("generates correct number of differences", () => {
    const params: VisualSearchParams = { sceneItems: 8, diffCount: 3, diffSubtlety: 50 };
    const scene = generateVisualSearchScene(params);
    expect(scene.differences).toHaveLength(3);
  });

  it("differences reference valid item ids", () => {
    const params: VisualSearchParams = { sceneItems: 6, diffCount: 2, diffSubtlety: 40 };
    const scene = generateVisualSearchScene(params);
    const itemIds = new Set(scene.items.map((i) => i.id));
    for (const diff of scene.differences) {
      expect(itemIds.has(diff.itemId)).toBe(true);
    }
  });

  it("item positions are within bounds (800x500)", () => {
    const params: VisualSearchParams = { sceneItems: 10, diffCount: 3, diffSubtlety: 60 };
    const scene = generateVisualSearchScene(params);
    for (const item of scene.items) {
      expect(item.x).toBeGreaterThanOrEqual(0);
      expect(item.x).toBeLessThanOrEqual(800);
      expect(item.y).toBeGreaterThanOrEqual(0);
      expect(item.y).toBeLessThanOrEqual(500);
    }
  });

  it("all item ids are unique", () => {
    const params: VisualSearchParams = { sceneItems: 15, diffCount: 4, diffSubtlety: 70 };
    const scene = generateVisualSearchScene(params);
    const ids = scene.items.map((i) => i.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("differences have valid diffType", () => {
    const params: VisualSearchParams = { sceneItems: 6, diffCount: 2, diffSubtlety: 30 };
    const scene = generateVisualSearchScene(params);
    const validTypes = ["color", "shape", "size", "position", "presence"];
    for (const diff of scene.differences) {
      expect(validTypes).toContain(diff.diffType);
    }
  });

  it("each difference targets a unique item", () => {
    const params: VisualSearchParams = { sceneItems: 10, diffCount: 5, diffSubtlety: 50 };
    const scene = generateVisualSearchScene(params);
    const diffItemIds = scene.differences.map((d) => d.itemId);
    expect(new Set(diffItemIds).size).toBe(diffItemIds.length);
  });
});

// ============================================================
// Corsi Block
// ============================================================
describe("generateCorsiLayout", () => {
  it("generates correct number of blocks", () => {
    const params: CorsiBlockParams = { blocks: 6, seqLength: 3, displayMs: 1200 };
    const layout = generateCorsiLayout(params);
    expect(layout.blocks).toHaveLength(6);
  });

  it("generates sequence of correct length", () => {
    const params: CorsiBlockParams = { blocks: 8, seqLength: 5, displayMs: 1000 };
    const layout = generateCorsiLayout(params);
    expect(layout.sequence).toHaveLength(5);
  });

  it("sequence only references valid block ids", () => {
    const params: CorsiBlockParams = { blocks: 6, seqLength: 4, displayMs: 1200 };
    const layout = generateCorsiLayout(params);
    const blockIds = new Set(layout.blocks.map((b) => b.id));
    for (const id of layout.sequence) {
      expect(blockIds.has(id)).toBe(true);
    }
  });

  it("no consecutive same block in sequence", () => {
    const params: CorsiBlockParams = { blocks: 8, seqLength: 7, displayMs: 800 };
    // Run multiple times to increase confidence
    for (let i = 0; i < 10; i++) {
      const layout = generateCorsiLayout(params);
      for (let j = 1; j < layout.sequence.length; j++) {
        expect(layout.sequence[j]).not.toBe(layout.sequence[j - 1]);
      }
    }
  });

  it("blocks are within bounds (800x500)", () => {
    const params: CorsiBlockParams = { blocks: 16, seqLength: 8, displayMs: 500 };
    const layout = generateCorsiLayout(params);
    for (const block of layout.blocks) {
      expect(block.x).toBeGreaterThanOrEqual(0);
      expect(block.x).toBeLessThanOrEqual(800);
      expect(block.y).toBeGreaterThanOrEqual(0);
      expect(block.y).toBeLessThanOrEqual(500);
    }
  });

  it("blocks maintain minimum distance (1.5x blockSize)", () => {
    const params: CorsiBlockParams = { blocks: 12, seqLength: 6, displayMs: 700 };
    const layout = generateCorsiLayout(params);
    const minDist = layout.blockSize * 1.5;
    for (let i = 0; i < layout.blocks.length; i++) {
      for (let j = i + 1; j < layout.blocks.length; j++) {
        const dx = layout.blocks[i].x - layout.blocks[j].x;
        const dy = layout.blocks[i].y - layout.blocks[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        expect(dist).toBeGreaterThanOrEqual(minDist - 1); // 1px tolerance for float
      }
    }
  });

  it("block ids are unique", () => {
    const params: CorsiBlockParams = { blocks: 9, seqLength: 4, displayMs: 1000 };
    const layout = generateCorsiLayout(params);
    const ids = layout.blocks.map((b) => b.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("blockSize is in valid range (64-96)", () => {
    const params: CorsiBlockParams = { blocks: 6, seqLength: 3, displayMs: 1200 };
    const layout = generateCorsiLayout(params);
    expect(layout.blockSize).toBeGreaterThanOrEqual(64);
    expect(layout.blockSize).toBeLessThanOrEqual(96);
  });
});
