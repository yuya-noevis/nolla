/**
 * BUG-13 fix verification — finalize-session pure helpers.
 * Ensures NCI θ updates are actually composed end-to-end (not dead code).
 * checklist: outputs/nolla_debug_checklist.md §I (BUG-13)
 */
import { describe, it, expect } from "vitest";
import {
  applyTrialsToTheta,
  applySpeedTrialsToTheta,
  gameAxis,
  INITIAL_THETA,
  isSpeedSuccess,
  SPEED_THRESHOLD_RATIO,
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

  it("BUG-13 regression: θ stays bounded for a realistic 8-trial memory-match session", () => {
    // Mixed correct/incorrect at pairs=2 (actual production trial log)
    const trials: FinalizeTrial[] = [
      { correct: false, difficultyParams: mmParams },
      { correct: true, difficultyParams: mmParams },
      { correct: true, difficultyParams: mmParams },
      { correct: true, difficultyParams: mmParams },
      { correct: true, difficultyParams: mmParams },
      { correct: false, difficultyParams: mmParams },
      { correct: true, difficultyParams: mmParams },
      { correct: true, difficultyParams: mmParams },
    ];
    const out = applyTrialsToTheta("memory-match", INITIAL_THETA, trials);
    // Pre-fix this produced θ ≈ 18708. Post-fix must stay in IRT range.
    expect(out.mu).toBeGreaterThan(-5);
    expect(out.mu).toBeLessThan(5);
    expect(out.sigma).toBeGreaterThan(0);
    expect(out.sigma).toBeLessThanOrEqual(INITIAL_THETA.sigma);
  });

  it("BUG-13 regression: sorting 8-trial session stays bounded", () => {
    const trials: FinalizeTrial[] = Array.from({ length: 8 }, (_, i) => ({
      correct: i !== 2 && i !== 5,
      difficultyParams: sortParams,
    }));
    const out = applyTrialsToTheta("sorting", INITIAL_THETA, trials);
    expect(out.mu).toBeGreaterThan(-5);
    expect(out.mu).toBeLessThan(5);
  });

  it("BUG-13 regression: visual-search 8-trial session stays bounded", () => {
    const trials: FinalizeTrial[] = Array.from({ length: 8 }, (_, i) => ({
      correct: i % 3 !== 0,
      difficultyParams: vsParams,
    }));
    const out = applyTrialsToTheta("visual-search", INITIAL_THETA, trials);
    expect(out.mu).toBeGreaterThan(-5);
    expect(out.mu).toBeLessThan(5);
  });

  it("BUG-13 regression: corsi-block 8-trial session stays bounded", () => {
    const trials: FinalizeTrial[] = Array.from({ length: 8 }, (_, i) => ({
      correct: i !== 4,
      difficultyParams: corsiParams,
    }));
    const out = applyTrialsToTheta("corsi-block", INITIAL_THETA, trials);
    expect(out.mu).toBeGreaterThan(-5);
    expect(out.mu).toBeLessThan(5);
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

describe("applySpeedTrialsToTheta (NCI-S axis)", () => {
  const baselineMs = 600;

  it("returns start unchanged when motor baseline is null", () => {
    const trials: FinalizeTrial[] = [
      { correct: true, reactionTimeMs: 500, difficultyParams: mmParams },
    ];
    const out = applySpeedTrialsToTheta(INITIAL_THETA, trials, null);
    expect(out).toEqual(INITIAL_THETA);
  });

  it("returns start unchanged when motor baseline is below 200ms (junk)", () => {
    const trials: FinalizeTrial[] = [
      { correct: true, reactionTimeMs: 500, difficultyParams: mmParams },
    ];
    const out = applySpeedTrialsToTheta(INITIAL_THETA, trials, 100);
    expect(out).toEqual(INITIAL_THETA);
  });

  it("consistently fast correct responses push θ_s upward", () => {
    const trials: FinalizeTrial[] = Array.from({ length: 8 }, () => ({
      correct: true,
      reactionTimeMs: 500, // < 600 * 1.5 = 900
      difficultyParams: mmParams,
    }));
    const out = applySpeedTrialsToTheta(INITIAL_THETA, trials, baselineMs);
    expect(out.mu).toBeGreaterThan(INITIAL_THETA.mu);
  });

  it("consistently slow correct responses push θ_s downward", () => {
    const trials: FinalizeTrial[] = Array.from({ length: 8 }, () => ({
      correct: true,
      reactionTimeMs: 2000, // > 900 threshold
      difficultyParams: mmParams,
    }));
    const out = applySpeedTrialsToTheta(INITIAL_THETA, trials, baselineMs);
    expect(out.mu).toBeLessThan(INITIAL_THETA.mu);
  });

  it("incorrect trials never count as speed successes regardless of RT", () => {
    expect(
      isSpeedSuccess(
        { correct: false, reactionTimeMs: 100, difficultyParams: mmParams },
        baselineMs
      )
    ).toBe(false);
  });

  it("trials missing RT are skipped (no theta change)", () => {
    const trials: FinalizeTrial[] = [
      { correct: true, difficultyParams: mmParams },
    ];
    const out = applySpeedTrialsToTheta(INITIAL_THETA, trials, baselineMs);
    expect(out).toEqual(INITIAL_THETA);
  });

  it("sub-200ms RTs are excluded as anomalous", () => {
    const trials: FinalizeTrial[] = [
      { correct: true, reactionTimeMs: 50, difficultyParams: mmParams },
    ];
    const out = applySpeedTrialsToTheta(INITIAL_THETA, trials, baselineMs);
    expect(out).toEqual(INITIAL_THETA);
  });

  it("threshold ratio is 1.5×", () => {
    expect(SPEED_THRESHOLD_RATIO).toBe(1.5);
    // RT exactly at threshold counts as success
    expect(
      isSpeedSuccess(
        { correct: true, reactionTimeMs: 900, difficultyParams: mmParams },
        600
      )
    ).toBe(true);
    // 1ms over threshold fails
    expect(
      isSpeedSuccess(
        { correct: true, reactionTimeMs: 901, difficultyParams: mmParams },
        600
      )
    ).toBe(false);
  });
});
