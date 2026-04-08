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

describe("calculateRoundStars — direct-response (unified trial-scaled rule)", () => {
  // allow3 = floor(trials × 0.15), allow2 = floor(trials × 0.40)
  //
  //  trials  allow3  allow2  (0 miss / 1 miss / 2 miss / 3 miss / 4 miss)
  //    4       0       1     (3★ / 2★ / 1★ / 1★ / 1★)
  //    5       0       2     (3★ / 2★ / 2★ / 1★ / 1★)
  //    8       1       3     (3★ / 3★ / 2★ / 2★ / 1★)
  //   10       1       4     (3★ / 3★ / 2★ / 2★ / 2★)
  //   20       3       8

  it("trials=8, 0 mistakes → 3★ (sorting)", () => {
    expect(
      calculateRoundStars({
        gameType: "sorting",
        totalTrials: 8,
        correctCount: 8,
        difficultyParams: sortP,
      })
    ).toBe(3);
  });

  it("trials=5, 1 mistake → 2★ (visual-search, floor(5×0.15)=0)", () => {
    expect(
      calculateRoundStars({
        gameType: "visual-search",
        totalTrials: 5,
        correctCount: 4,
        difficultyParams: vsP,
      })
    ).toBe(2);
  });

  it("trials=5, 2 mistakes → 2★ (corsi-block, within allow2=2)", () => {
    expect(
      calculateRoundStars({
        gameType: "corsi-block",
        totalTrials: 5,
        correctCount: 3,
        difficultyParams: corsiP,
      })
    ).toBe(2);
  });

  it("trials=5, 3 mistakes → 1★ (beyond allow2)", () => {
    expect(
      calculateRoundStars({
        gameType: "corsi-block",
        totalTrials: 5,
        correctCount: 2,
        difficultyParams: corsiP,
      })
    ).toBe(1);
  });

  it("trials=10, 1 mistake → 3★ (allow3=1)", () => {
    expect(
      calculateRoundStars({
        gameType: "sorting",
        totalTrials: 10,
        correctCount: 9,
        difficultyParams: sortP,
      })
    ).toBe(3);
  });

  it("trials=10, 4 mistakes → 2★ (allow2=4)", () => {
    expect(
      calculateRoundStars({
        gameType: "sorting",
        totalTrials: 10,
        correctCount: 6,
        difficultyParams: sortP,
      })
    ).toBe(2);
  });

  it("trials=10, 5 mistakes → 1★", () => {
    expect(
      calculateRoundStars({
        gameType: "sorting",
        totalTrials: 10,
        correctCount: 5,
        difficultyParams: sortP,
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

describe("calculateRoundStars — memory-match rule (multi-board aware)", () => {
  // With boards_per_round = max(1, ceil(6/pairs)), a round plays multiple
  // boards when pairs is small. All misses and matches aggregate across
  // those boards. totalTrials = pairs × boards_per_round + misses.
  const boardsOf = (pairs: number) => Math.max(1, Math.ceil(6 / pairs));
  const mmInput = (pairs: number, misses: number) => {
    const boards = boardsOf(pairs);
    return {
      gameType: "memory-match" as const,
      totalTrials: pairs * boards + misses,
      correctCount: pairs * boards,
      difficultyParams: mm(pairs),
    };
  };

  // Per-round spec table — derived from per-board Yuya-spec + boards_per_round.
  //   3★ allow = boards × allow3_per_board(pairs)
  //   2★ allow = boards × pairs  (up to 100 % extra trials)
  //
  //  pairs  boards  3★allow    2★allow
  //    2      3      3 ( 3×1)   6
  //    3      2      4 ( 2×2)   6
  //    4      2      4 ( 2×2)   8
  //    5      2      4 ( 2×2)  10
  //    6      1      3          6
  //    7      1      4 (⌊0.7·7⌋) 7
  //    8      1      5 (⌊0.7·8⌋) 8
  //   10      1      7 (⌊0.7·10⌋)10
  //   12      1      8          12
  //   16      1     11          16
  //   20      1     14          20
  //   24      1     16          24
  const cases: ReadonlyArray<{
    pairs: number;
    star3MaxMisses: number;
    star2MaxMisses: number;
  }> = [
    { pairs: 2, star3MaxMisses: 3, star2MaxMisses: 6 },
    { pairs: 3, star3MaxMisses: 4, star2MaxMisses: 6 },
    { pairs: 4, star3MaxMisses: 4, star2MaxMisses: 8 },
    { pairs: 5, star3MaxMisses: 4, star2MaxMisses: 10 },
    { pairs: 6, star3MaxMisses: 3, star2MaxMisses: 6 },
    { pairs: 7, star3MaxMisses: 4, star2MaxMisses: 7 },
    { pairs: 8, star3MaxMisses: 5, star2MaxMisses: 8 },
    { pairs: 10, star3MaxMisses: 7, star2MaxMisses: 10 },
    { pairs: 12, star3MaxMisses: 8, star2MaxMisses: 12 },
    { pairs: 16, star3MaxMisses: 11, star2MaxMisses: 16 },
    { pairs: 20, star3MaxMisses: 14, star2MaxMisses: 20 },
    { pairs: 24, star3MaxMisses: 16, star2MaxMisses: 24 },
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

  it("Yuya scenario A: pairs=2, 1 miss/round × 3 rounds → 9★ total", () => {
    const oneRound = calculateRoundStars(mmInput(2, 1));
    expect(oneRound).toBe(3);
    expect(oneRound * 3).toBe(9);
  });

  it("Yuya scenario B: pairs=3, 2 misses/round × 3 rounds → 9★ total", () => {
    // The 2026-04-08 reported case from production. With the prior n/3
    // formula this produced 6★ (2★/round). New table-based formula must
    // give 9★ because 2 misses ≤ max-unlucky baseline for n=3.
    const oneRound = calculateRoundStars(mmInput(3, 2));
    expect(oneRound).toBe(3);
    expect(oneRound * 3).toBe(9);
  });
});
