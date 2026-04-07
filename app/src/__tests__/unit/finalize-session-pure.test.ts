/**
 * BUG-13 fix verification — finalize-session pure helpers.
 * Ensures NCI θ updates are actually composed end-to-end (not dead code).
 * checklist: outputs/nolla_debug_checklist.md §I (BUG-13)
 */
import { describe, it, expect } from "vitest";
import {
  applyTrialsToTheta,
  gameAxis,
  INITIAL_THETA,
  type FinalizeTrial,
} from "@/lib/nci/finalize-session-pure";
import type {
  MemoryMatchParams,
  SortingParams,
  VisualSearchParams,
  CorsiBlockParams,
} from "@/types/domain";

const mmParams: MemoryMatchParams = {
  pairs: 4,
  similarity: 50,
  flipDelay: 1000,
  cardSize: 100,
};
const sortParams: SortingParams = {
  categories: 2,
  items: 4,
  criterion: "color",
  switching: "none",
};
const vsParams: VisualSearchParams = {
  sceneItems: 6,
  diffCount: 2,
  diffSubtlety: 50,
};
const corsiParams: CorsiBlockParams = {
  blocks: 8,
  seqLength: 4,
  displayMs: 1000,
};

describe("gameAxis mapping", () => {
  it("memory-match → M", () => expect(gameAxis("memory-match")).toBe("M"));
  it("corsi-block → M", () => expect(gameAxis("corsi-block")).toBe("M"));
  it("sorting → F", () => expect(gameAxis("sorting")).toBe("F"));
  it("visual-search → A", () => expect(gameAxis("visual-search")).toBe("A"));
});

describe("applyTrialsToTheta", () => {
  it("no trials → returns start theta unchanged", () => {
    const out = applyTrialsToTheta("memory-match", INITIAL_THETA, []);
    expect(out).toEqual(INITIAL_THETA);
  });

  it("all-correct trials push θ.mu upward", () => {
    const trials: FinalizeTrial[] = Array.from({ length: 10 }, () => ({
      correct: true,
      difficultyParams: mmParams,
    }));
    const out = applyTrialsToTheta("memory-match", INITIAL_THETA, trials);
    expect(out.mu).toBeGreaterThan(INITIAL_THETA.mu);
  });

  it("all-incorrect trials push θ.mu downward", () => {
    const trials: FinalizeTrial[] = Array.from({ length: 10 }, () => ({
      correct: false,
      difficultyParams: mmParams,
    }));
    const out = applyTrialsToTheta("memory-match", INITIAL_THETA, trials);
    expect(out.mu).toBeLessThan(INITIAL_THETA.mu);
  });

  it("σ shrinks monotonically with more trials (information accumulates)", () => {
    const trials: FinalizeTrial[] = Array.from({ length: 20 }, (_, i) => ({
      correct: i % 2 === 0,
      difficultyParams: mmParams,
    }));
    const out = applyTrialsToTheta("memory-match", INITIAL_THETA, trials);
    expect(out.sigma).toBeLessThanOrEqual(INITIAL_THETA.sigma);
  });

  it("works for all 4 game types without error", () => {
    const trial = (p: FinalizeTrial["difficultyParams"]): FinalizeTrial => ({
      correct: true,
      difficultyParams: p,
    });
    expect(() =>
      applyTrialsToTheta("memory-match", INITIAL_THETA, [trial(mmParams)])
    ).not.toThrow();
    expect(() =>
      applyTrialsToTheta("sorting", INITIAL_THETA, [trial(sortParams)])
    ).not.toThrow();
    expect(() =>
      applyTrialsToTheta("visual-search", INITIAL_THETA, [trial(vsParams)])
    ).not.toThrow();
    expect(() =>
      applyTrialsToTheta("corsi-block", INITIAL_THETA, [trial(corsiParams)])
    ).not.toThrow();
  });
});
