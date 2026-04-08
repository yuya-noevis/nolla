/**
 * Per-round trial count derivation tests.
 * Background: outputs/nolla_self_verification_checklist.md
 * 2026-04-08 § Trials per round evidence-based design.
 *
 * Principle: across all 4 games and all difficulty levels, the session
 * trial count must stay within the target band of ~12-96 trials to
 * satisfy (a) sustained attention budget 5-20 min and (b) NCI target
 * ≥ 50 trials per axis after 8 baseline sessions.
 */
import { describe, it, expect } from "vitest";
import {
  memoryMatchBoardsPerRound,
  sortingScenesPerRound,
  visualSearchScenesPerRound,
  CORSI_TRIALS_PER_ROUND,
} from "@/lib/session/trials-per-round";

describe("memoryMatchBoardsPerRound — multi-board at low pair counts", () => {
  const cases: ReadonlyArray<[number, number]> = [
    // [pairs, expected boards]
    [2, 3],  // ceil(6/2) = 3
    [3, 2],  // ceil(6/3) = 2
    [4, 2],  // ceil(6/4) = 2
    [5, 2],  // ceil(6/5) = 2
    [6, 1],  // ceil(6/6) = 1
    [7, 1],
    [8, 1],
    [12, 1],
    [16, 1],
    [20, 1],
    [24, 1],
  ];
  for (const [pairs, expected] of cases) {
    it(`pairs=${pairs} → boards=${expected}`, () => {
      expect(
        memoryMatchBoardsPerRound({
          pairs,
          similarity: 10,
          flipDelay: 1500,
          cardSize: 80,
        })
      ).toBe(expected);
    });
  }

  it("always ≥ 1 board per round", () => {
    for (let p = 2; p <= 24; p++) {
      const b = memoryMatchBoardsPerRound({
        pairs: p,
        similarity: 10,
        flipDelay: 1500,
        cardSize: 80,
      });
      expect(b).toBeGreaterThanOrEqual(1);
    }
  });
});

describe("sortingScenesPerRound — multi-scene at low item counts", () => {
  const cases: ReadonlyArray<[number, number]> = [
    [3, 2],  // ceil(6/3) = 2
    [4, 2],  // ceil(6/4) = 2
    [5, 2],  // ceil(6/5) = 2
    [6, 1],
    [8, 1],
    [10, 1],
  ];
  for (const [items, expected] of cases) {
    it(`items=${items} → scenes=${expected}`, () => {
      expect(
        sortingScenesPerRound({
          categories: 2,
          items,
          criterion: "color",
          switching: "none",
        })
      ).toBe(expected);
    });
  }
});

describe("visualSearchScenesPerRound — multi-scene at low diffCount", () => {
  const cases: ReadonlyArray<[number, number]> = [
    [1, 6],
    [2, 3],
    [3, 2],
    [4, 2],
    [5, 2],
    [6, 1],
    [7, 1],
  ];
  for (const [diffCount, expected] of cases) {
    it(`diffCount=${diffCount} → scenes=${expected}`, () => {
      expect(
        visualSearchScenesPerRound({
          sceneItems: 6,
          diffCount,
          diffSubtlety: 30,
        })
      ).toBe(expected);
    });
  }
});

describe("Corsi fixed trials per round", () => {
  it("TRIALS_PER_ROUND = 4 (FitzGerald & Meyer 2005)", () => {
    expect(CORSI_TRIALS_PER_ROUND).toBe(4);
  });
});

describe("Session trial-count budget sanity — 3 rounds per session", () => {
  const ROUNDS = 3;

  it("memory-match session trials are always ≥ 12 (lower bound for IRT)", () => {
    // Lower bound = pairs × boards_per_round × rounds (excluding misses).
    // At pairs=2: 2×3×3 = 18 minimum expected matches. Plus misses.
    for (let p = 2; p <= 24; p++) {
      const boards = memoryMatchBoardsPerRound({
        pairs: p,
        similarity: 10,
        flipDelay: 1500,
        cardSize: 80,
      });
      const sessionTrials = p * boards * ROUNDS;
      expect(sessionTrials).toBeGreaterThanOrEqual(12);
    }
  });

  it("sorting session trials are always ≥ 12", () => {
    for (let i = 3; i <= 10; i++) {
      const scenes = sortingScenesPerRound({
        categories: 2,
        items: i,
        criterion: "color",
        switching: "none",
      });
      const sessionTrials = i * scenes * ROUNDS;
      expect(sessionTrials).toBeGreaterThanOrEqual(12);
    }
  });

  it("visual-search session trials are always ≥ 15 (lower bound)", () => {
    for (let d = 1; d <= 7; d++) {
      const scenes = visualSearchScenesPerRound({
        sceneItems: 6,
        diffCount: d,
        diffSubtlety: 30,
      });
      const sessionTrials = d * scenes * ROUNDS;
      expect(sessionTrials).toBeGreaterThanOrEqual(15);
    }
  });

  it("corsi session trials = 12 exactly", () => {
    expect(CORSI_TRIALS_PER_ROUND * ROUNDS).toBe(12);
  });
});
