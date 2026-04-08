/**
 * Round-star award rules.
 * Background: outputs/nolla_self_verification_checklist.md C5 + Yuya feedback
 * 2026-04-07: memory-match must not penalize exploration misses (Foerster 1991;
 * Frank & Gerpott 2003 — perfect-memory expected misses ≈ pairs/3).
 */
import { describe, it, expect } from "vitest";
import { calculateRoundStars } from "@/lib/session/round-stars";
import type {
  MemoryMatchParams,
  SortingParams,
  VisualSearchParams,
  CorsiBlockParams,
} from "@/types/domain";

const mm = (pairs: number): MemoryMatchParams => ({
  pairs,
  similarity: 10,
  flipDelay: 1500,
  cardSize: 80,
});

const sortP: SortingParams = {
  categories: 2,
  items: 4,
  criterion: "color",
  switching: "none",
};
const vsP: VisualSearchParams = { sceneItems: 4, diffCount: 1, diffSubtlety: 20 };
const corsiP: CorsiBlockParams = { blocks: 4, seqLength: 2, displayMs: 1200 };

describe("calculateRoundStars — direct-response games", () => {
  it("0 mistakes → 3★ (sorting)", () => {
    expect(
      calculateRoundStars({
        gameType: "sorting",
        totalTrials: 8,
        correctCount: 8,
        difficultyParams: sortP,
      })
    ).toBe(3);
  });

  it("1 mistake → 2★ (visual-search)", () => {
    expect(
      calculateRoundStars({
        gameType: "visual-search",
        totalTrials: 5,
        correctCount: 4,
        difficultyParams: vsP,
      })
    ).toBe(2);
  });

  it("2+ mistakes → 1★ (corsi-block)", () => {
    expect(
      calculateRoundStars({
        gameType: "corsi-block",
        totalTrials: 5,
        correctCount: 3,
        difficultyParams: corsiP,
      })
    ).toBe(1);
  });

  it("0 trials → 1★ floor", () => {
    expect(
      calculateRoundStars({
        gameType: "sorting",
        totalTrials: 0,
        correctCount: 0,
        difficultyParams: sortP,
      })
    ).toBe(1);
  });
});

describe("calculateRoundStars — memory-match efficiency rule", () => {
  // Helper: build input for given pairs + misses
  const mmInput = (pairs: number, misses: number) => ({
    gameType: "memory-match" as const,
    totalTrials: pairs + misses, // every pair attempt = 1 trial
    correctCount: pairs, // each pair eventually matched
    difficultyParams: mm(pairs),
  });

  // Spec table from the design discussion (must match exactly)
  // pairs → max misses for 3★ / 2★
  //   2 → 1 / 2     4 → 1 / 4     6 → 2 / 6
  //   8 → 2 / 8    12 → 4 / 12   24 → 8 / 24
  const cases: ReadonlyArray<{
    pairs: number;
    star3MaxMisses: number;
    star2MaxMisses: number;
  }> = [
    { pairs: 2, star3MaxMisses: 1, star2MaxMisses: 2 },
    { pairs: 4, star3MaxMisses: 1, star2MaxMisses: 4 },
    { pairs: 6, star3MaxMisses: 2, star2MaxMisses: 6 },
    { pairs: 8, star3MaxMisses: 2, star2MaxMisses: 8 },
    { pairs: 12, star3MaxMisses: 4, star2MaxMisses: 12 },
    { pairs: 24, star3MaxMisses: 8, star2MaxMisses: 24 },
  ];

  for (const c of cases) {
    it(`pairs=${c.pairs}: 0 misses → 3★`, () => {
      expect(calculateRoundStars(mmInput(c.pairs, 0))).toBe(3);
    });
    it(`pairs=${c.pairs}: ${c.star3MaxMisses} misses (3★ boundary) → 3★`, () => {
      expect(calculateRoundStars(mmInput(c.pairs, c.star3MaxMisses))).toBe(3);
    });
    it(`pairs=${c.pairs}: ${c.star3MaxMisses + 1} misses (just past 3★) → 2★`, () => {
      expect(calculateRoundStars(mmInput(c.pairs, c.star3MaxMisses + 1))).toBe(2);
    });
    it(`pairs=${c.pairs}: ${c.star2MaxMisses} misses (2★ boundary) → 2★`, () => {
      expect(calculateRoundStars(mmInput(c.pairs, c.star2MaxMisses))).toBe(2);
    });
    it(`pairs=${c.pairs}: ${c.star2MaxMisses + 1} misses (just past 2★) → 1★`, () => {
      expect(calculateRoundStars(mmInput(c.pairs, c.star2MaxMisses + 1))).toBe(1);
    });
  }

  it("Yuya scenario: pairs=2, 1 miss/round × 3 rounds → 9★ total", () => {
    const oneRound = calculateRoundStars(mmInput(2, 1));
    expect(oneRound).toBe(3);
    expect(oneRound * 3).toBe(9);
  });
});
