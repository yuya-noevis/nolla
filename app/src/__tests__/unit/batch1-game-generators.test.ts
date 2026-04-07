/**
 * Batch 1.5 — §C-F game generator pure logic verification
 * checklist 出典: outputs/nolla_debug_checklist.md §C §D §E §F
 *
 * 描画層は Batch 5 で別途検証する。ここでは generate.ts の純ロジック層のみ。
 */
import { describe, it, expect } from "vitest";
import { generateMemoryMatchBoard } from "@/lib/games/memory-match/generate";
import { generateSortingRound } from "@/lib/games/sorting/generate";
import { generateVisualSearchScene } from "@/lib/games/visual-search/generate";
import { generateCorsiLayout } from "@/lib/games/corsi-block/generate";

// ============================================================
// §C — memory-match
// ============================================================
describe("§C memory-match generator", () => {
  it("C9 generates 2 cards per pair (4 cards for pairs=2)", () => {
    const board = generateMemoryMatchBoard({
      pairs: 2,
      similarity: 0,
      flipDelay: 1500,
      cardSize: 80,
    });
    expect(board.cards.length).toBe(4);
  });

  it("C9 24 pairs → 48 cards (max)", () => {
    const board = generateMemoryMatchBoard({
      pairs: 24,
      similarity: 0,
      flipDelay: 800,
      cardSize: 64,
    });
    expect(board.cards.length).toBe(48);
  });

  it("C1 each pairId appears exactly twice", () => {
    const board = generateMemoryMatchBoard({
      pairs: 6,
      similarity: 0,
      flipDelay: 1200,
      cardSize: 72,
    });
    const counts = new Map<string, number>();
    board.cards.forEach((c) => {
      counts.set(c.pairId, (counts.get(c.pairId) ?? 0) + 1);
    });
    counts.forEach((v) => expect(v).toBe(2));
  });

  it("C3 each imageKey for distinct pairs is distinct (no key collision)", () => {
    // Note: at high similarity, designed similar pairs may share categories.
    // But pairId-to-imageKey mapping must be 1:1.
    const board = generateMemoryMatchBoard({
      pairs: 8,
      similarity: 0,
      flipDelay: 1200,
      cardSize: 72,
    });
    const pairToImage = new Map<string, string>();
    board.cards.forEach((c) => {
      const existing = pairToImage.get(c.pairId);
      if (existing) {
        expect(c.imageKey).toBe(existing);
      } else {
        pairToImage.set(c.pairId, c.imageKey);
      }
    });
    // Each pairId has exactly one imageKey
    expect(pairToImage.size).toBe(8);
  });

  it("C3 imageKeys across different pairs are distinct (collision-free)", () => {
    const board = generateMemoryMatchBoard({
      pairs: 10,
      similarity: 0,
      flipDelay: 1200,
      cardSize: 72,
    });
    const pairToImage = new Map<string, string>();
    board.cards.forEach((c) => pairToImage.set(c.pairId, c.imageKey));
    const uniqueImages = new Set(pairToImage.values());
    expect(uniqueImages.size).toBe(pairToImage.size);
  });

  it("C9 grid dimensions match design table", () => {
    const cases: Array<[number, [number, number]]> = [
      [2, [2, 2]],
      [3, [2, 3]],
      [4, [2, 4]],
      [6, [3, 4]],
      [8, [4, 4]],
      [12, [4, 6]],
      [24, [6, 8]],
    ];
    cases.forEach(([pairs, [rows, cols]]) => {
      const board = generateMemoryMatchBoard({
        pairs,
        similarity: 0,
        flipDelay: 1500,
        cardSize: 80,
      });
      expect(board.gridRows).toBe(rows);
      expect(board.gridCols).toBe(cols);
    });
  });
});

// ============================================================
// §D — sorting
// ============================================================
describe("§D sorting generator", () => {
  it("D8 categories=2..5 generates correct number of categories", () => {
    [2, 3, 4, 5].forEach((n) => {
      const round = generateSortingRound({
        categories: n,
        items: 6,
        criterion: "color",
        switching: "none",
      });
      expect(round.categories.length).toBe(n);
    });
  });

  it("D9 items=4..15 generates correct number of items", () => {
    [4, 6, 10, 15].forEach((n) => {
      const round = generateSortingRound({
        categories: 3,
        items: n,
        criterion: "color",
        switching: "none",
      });
      expect(round.items.length).toBe(n);
    });
  });

  it("D1 each item's criterion attribute matches one category's matchValue", () => {
    const round = generateSortingRound({
      categories: 4,
      items: 12,
      criterion: "shape",
      switching: "none",
    });
    const validValues = new Set(round.categories.map((c) => c.matchValue));
    round.items.forEach((item) => {
      expect(validValues.has(item.attributes.shape!)).toBe(true);
    });
  });

  it("D1 every category has at least one item (guaranteed)", () => {
    const round = generateSortingRound({
      categories: 5,
      items: 5, // exactly one per category
      criterion: "color",
      switching: "none",
    });
    const itemsByCategory = new Map<string, number>();
    round.items.forEach((item) => {
      const v = item.attributes[round.criterion]!;
      itemsByCategory.set(v, (itemsByCategory.get(v) ?? 0) + 1);
    });
    round.categories.forEach((cat) => {
      expect(itemsByCategory.get(cat.matchValue) ?? 0).toBeGreaterThanOrEqual(1);
    });
  });

  it("D2-D6 all 5 criteria can generate items with the criterion attribute set", () => {
    const criteria = ["color", "shape", "size", "category", "multi"] as const;
    criteria.forEach((c) => {
      const round = generateSortingRound({
        categories: 3,
        items: 6,
        criterion: c,
        switching: "none",
      });
      round.items.forEach((item) => {
        expect(item.attributes[c]).toBeDefined();
      });
    });
  });

  it("D11+B7 sorting criterion shouldAdvanceCriterion: 3 sessions all 85%+ → true", async () => {
    const { shouldAdvanceCriterion } = await import("@/lib/staircase/criterion");
    expect(
      shouldAdvanceCriterion([
        { accuracy: 0.9, hintStage3Rate: 0 },
        { accuracy: 0.85, hintStage3Rate: 0.05 },
        { accuracy: 1.0, hintStage3Rate: 0 },
      ])
    ).toBe(true);
  });

  it("D11 shouldAdvanceCriterion: any session < 85% → false", async () => {
    const { shouldAdvanceCriterion } = await import("@/lib/staircase/criterion");
    expect(
      shouldAdvanceCriterion([
        { accuracy: 0.9, hintStage3Rate: 0 },
        { accuracy: 0.84, hintStage3Rate: 0 },
        { accuracy: 0.95, hintStage3Rate: 0 },
      ])
    ).toBe(false);
  });

  it("D11 shouldAdvanceCriterion: hint3 rate > 10% → false", async () => {
    const { shouldAdvanceCriterion } = await import("@/lib/staircase/criterion");
    expect(
      shouldAdvanceCriterion([
        { accuracy: 0.9, hintStage3Rate: 0.15 },
        { accuracy: 0.9, hintStage3Rate: 0 },
        { accuracy: 0.9, hintStage3Rate: 0 },
      ])
    ).toBe(false);
  });

  it("D11 shouldAdvanceCriterion: < 3 sessions → false", async () => {
    const { shouldAdvanceCriterion } = await import("@/lib/staircase/criterion");
    expect(shouldAdvanceCriterion([{ accuracy: 1, hintStage3Rate: 0 }])).toBe(false);
  });
});

// ============================================================
// §E — visual-search
// ============================================================
describe("§E visual-search generator", () => {
  it("E9 sceneItems=3..25 generates correct number", () => {
    [3, 10, 25].forEach((n) => {
      const scene = generateVisualSearchScene({
        sceneItems: n,
        diffCount: 2,
        diffSubtlety: 50,
      });
      expect(scene.items.length).toBe(n);
    });
  });

  it("E10 diffCount=1..7 generates correct number of differences", () => {
    [1, 3, 7].forEach((n) => {
      const scene = generateVisualSearchScene({
        sceneItems: 15,
        diffCount: n,
        diffSubtlety: 50,
      });
      expect(scene.differences.length).toBe(n);
    });
  });

  it("E1 each difference references a real item", () => {
    const scene = generateVisualSearchScene({
      sceneItems: 10,
      diffCount: 5,
      diffSubtlety: 50,
    });
    const itemIds = new Set(scene.items.map((i) => i.id));
    scene.differences.forEach((d) => {
      expect(itemIds.has(d.itemId)).toBe(true);
    });
  });

  it("E1 differences target distinct items (no double diff on same item)", () => {
    const scene = generateVisualSearchScene({
      sceneItems: 15,
      diffCount: 5,
      diffSubtlety: 50,
    });
    const targets = scene.differences.map((d) => d.itemId);
    expect(new Set(targets).size).toBe(targets.length);
  });

  it("E3-E8 diff types are valid enum values", () => {
    const validTypes = new Set(["color", "shape", "size", "position", "presence"]);
    for (let trial = 0; trial < 50; trial++) {
      const scene = generateVisualSearchScene({
        sceneItems: 8,
        diffCount: 3,
        diffSubtlety: 80,
      });
      scene.differences.forEach((d) => {
        expect(validTypes.has(d.diffType)).toBe(true);
      });
    }
  });

  it("E low subtlety (<30) only picks color/presence (most obvious)", () => {
    for (let trial = 0; trial < 30; trial++) {
      const scene = generateVisualSearchScene({
        sceneItems: 8,
        diffCount: 3,
        diffSubtlety: 10, // very low → obvious diffs only
      });
      scene.differences.forEach((d) => {
        expect(["color", "presence"]).toContain(d.diffType);
      });
    }
  });
});

// ============================================================
// §F — corsi-block
// ============================================================
describe("§F corsi-block generator", () => {
  it("F3 blocks=4..16 generates correct number", () => {
    [4, 8, 12, 16].forEach((n) => {
      const layout = generateCorsiLayout({
        blocks: n,
        seqLength: 3,
        displayMs: 1000,
      });
      expect(layout.blocks.length).toBe(n);
    });
  });

  it("F4 seqLength=2..9 generates correct sequence length", () => {
    [2, 5, 9].forEach((n) => {
      const layout = generateCorsiLayout({
        blocks: 8,
        seqLength: n,
        displayMs: 1000,
      });
      expect(layout.sequence.length).toBe(n);
    });
  });

  it("F7 sequence has no consecutive same block", () => {
    for (let trial = 0; trial < 50; trial++) {
      const layout = generateCorsiLayout({
        blocks: 6,
        seqLength: 9,
        displayMs: 1000,
      });
      for (let i = 1; i < layout.sequence.length; i++) {
        expect(layout.sequence[i]).not.toBe(layout.sequence[i - 1]);
      }
    }
  });

  it("F7 every sequence element references a valid block id", () => {
    const layout = generateCorsiLayout({
      blocks: 8,
      seqLength: 6,
      displayMs: 1000,
    });
    const blockIds = new Set(layout.blocks.map((b) => b.id));
    layout.sequence.forEach((id) => expect(blockIds.has(id)).toBe(true));
  });

  it("F6 block positions: minimum distance >= 1.5 × blockSize for most pairs (constraint best-effort)", () => {
    const layout = generateCorsiLayout({
      blocks: 6,
      seqLength: 3,
      displayMs: 1000,
    });
    const minDist = layout.blockSize * 1.5;
    let violations = 0;
    for (let i = 0; i < layout.blocks.length; i++) {
      for (let j = i + 1; j < layout.blocks.length; j++) {
        const dx = layout.blocks[i].x - layout.blocks[j].x;
        const dy = layout.blocks[i].y - layout.blocks[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < minDist) violations++;
      }
    }
    // Best-effort placement: a few violations OK in dense layouts
    expect(violations).toBeLessThanOrEqual(2);
  });

  it("F getBlockSize scales by block count", () => {
    const small = generateCorsiLayout({
      blocks: 4,
      seqLength: 2,
      displayMs: 1000,
    });
    const large = generateCorsiLayout({
      blocks: 16,
      seqLength: 2,
      displayMs: 1000,
    });
    expect(small.blockSize).toBeGreaterThan(large.blockSize);
  });
});
