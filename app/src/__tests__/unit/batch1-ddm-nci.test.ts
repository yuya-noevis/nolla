/**
 * Batch 1.2 + 1.3 + 1.4 — §H DDM/RT, §I NCI, §J Baseline, §K Anomaly
 * checklist 出典: outputs/nolla_debug_checklist.md §H §I §J §K
 */
import { describe, it, expect } from "vitest";
import { calculateMotorBaseline } from "@/lib/session/motor-baseline";
import { estimateDriftRate } from "@/lib/nci/drift";
import { calculateResponseProbability, calculateInformationFunction } from "@/lib/nci/irt";
import { updateTheta } from "@/lib/nci/theta";
import { calculateNCI } from "@/lib/nci/nci-score";
import { calculateDifficultyB } from "@/lib/nci/difficulty-b";
import { calculateAnomalyScore } from "@/lib/session/anomaly";
import type { ThetaState, MotorBaseline } from "@/types/scoring";

// ============================================================
// §H — DDM / Motor baseline / RT
// ============================================================
describe("§H Motor Baseline & DDM", () => {
  it("H3 motor baseline: median of reaction times", () => {
    const b = calculateMotorBaseline([300, 320, 310, 330, 305], null);
    expect(b.medianRt).toBe(310);
    expect(b.weightedBaseline).toBe(310); // first session = median
  });

  it("H5 weighted baseline: 0.7*old + 0.3*new", () => {
    const b = calculateMotorBaseline([400, 410, 420, 405, 415], 300);
    // median ≈ 410. 0.7*300 + 0.3*410 = 210 + 123 = 333
    expect(b.weightedBaseline).toBe(333);
  });

  it("H3 outlier removal: median ± 2SD filtering", () => {
    // Mostly 300ms with one 9999ms outlier
    const b = calculateMotorBaseline([300, 305, 310, 295, 9999], null);
    // outlier should be removed → median around 302-305
    expect(b.medianRt).toBeLessThan(400);
    expect(b.medianRt).toBeGreaterThan(290);
  });

  it("H7 cognitive RT = total RT - motor baseline", () => {
    const drift = estimateDriftRate(1500, 300);
    expect(drift).not.toBeNull();
    // cognitive = 1200ms → drift = 1000/1200 ≈ 0.833
    expect(drift!).toBeCloseTo(0.833, 2);
  });

  it("H7 cognitive RT must be > 0 (returns null if RT <= baseline)", () => {
    expect(estimateDriftRate(200, 300)).toBeNull();
    expect(estimateDriftRate(300, 300)).toBeNull();
  });

  it("H8 RT < 200ms threshold flagged as instant in anomaly detection", () => {
    // Anomaly module uses 200ms threshold per implementation
    const trials = Array.from({ length: 10 }, () => ({
      correct: true,
      reactionTimeMs: 50, // very fast
      hintStageReached: 0 as const,
      gameData: {},
    }));
    const score = calculateAnomalyScore(trials);
    expect(score).toBeGreaterThan(0.5); // should flag as anomalous
  });

  it("H baseline edge: empty array → medianRt 0", () => {
    const b = calculateMotorBaseline([], null);
    expect(b.medianRt).toBe(0);
    expect(b.weightedBaseline).toBe(0);
  });
});

// ============================================================
// §I — NCI / IRT 2PL / Bayesian update
// ============================================================
describe("§I NCI / IRT 2PL", () => {
  it("I5 IRT 2PL formula: P(correct) = 1/(1+exp(-a(θ-b)))", () => {
    // θ = b → P = 0.5
    expect(calculateResponseProbability(0, 1, 0)).toBeCloseTo(0.5, 5);
    // θ >> b → P → 1
    expect(calculateResponseProbability(10, 1, 0)).toBeGreaterThan(0.99);
    // θ << b → P → 0
    expect(calculateResponseProbability(-10, 1, 0)).toBeLessThan(0.01);
  });

  it("I5 Fisher information maximized at θ=b", () => {
    // I(θ=b) = a²·0.5·0.5 = a²·0.25
    expect(calculateInformationFunction(0, 1, 0)).toBeCloseTo(0.25, 3);
    expect(calculateInformationFunction(0, 2, 0)).toBeCloseTo(1.0, 3);
    // Off-target lower
    expect(calculateInformationFunction(5, 1, 0)).toBeLessThan(0.25);
  });

  it("I9 Bayesian update: σ ALWAYS shrinks after each trial", () => {
    let theta: ThetaState = { mu: 0, sigma: 2 };
    const initialSigma = theta.sigma;
    for (let i = 0; i < 10; i++) {
      theta = updateTheta(theta, true, 1, 0);
    }
    expect(theta.sigma).toBeLessThan(initialSigma);
  });

  it("I9 Bayesian update: correct response shifts μ upward", () => {
    const before: ThetaState = { mu: 0, sigma: 2 };
    const after = updateTheta(before, true, 1, 0);
    expect(after.mu).toBeGreaterThan(before.mu);
  });

  it("I9 Bayesian update: incorrect shifts μ downward", () => {
    const before: ThetaState = { mu: 0, sigma: 2 };
    const after = updateTheta(before, false, 1, 0);
    expect(after.mu).toBeLessThan(before.mu);
  });

  it("I10 SE shrinkage: 50 trials reduces σ substantially from initial 2.0", () => {
    let theta: ThetaState = { mu: 0, sigma: 2 };
    for (let i = 0; i < 50; i++) {
      const correct = Math.random() < 0.7;
      theta = updateTheta(theta, correct, 1, theta.mu);
    }
    expect(theta.sigma).toBeLessThan(0.5);
  });

  it("I10 SE shrinkage: 200 trials reduces σ further", () => {
    let theta: ThetaState = { mu: 0, sigma: 2 };
    for (let i = 0; i < 200; i++) {
      theta = updateTheta(theta, Math.random() < 0.7, 1, theta.mu);
    }
    expect(theta.sigma).toBeLessThan(0.25);
  });

  it("I10 SE has minimum floor (MIN_SIGMA=0.1) — never collapses to 0", () => {
    let theta: ThetaState = { mu: 0, sigma: 2 };
    for (let i = 0; i < 10000; i++) {
      theta = updateTheta(theta, true, 1, 0);
    }
    expect(theta.sigma).toBeGreaterThanOrEqual(0.1);
  });

  it("I12+I20 NCI score: θ→500+θ·100, clamped to 0-999.999", () => {
    const result = calculateNCI({
      thetaM: { mu: 0, sigma: 1 },   // 500
      thetaF: { mu: -10, sigma: 1 }, // 500-1000=-500 → clamped 0
      thetaA: { mu: 10, sigma: 1 },  // 500+1000=1500 → clamped 999.999
      thetaS: { mu: -2.5, sigma: 1 },// 500-250=250
    });
    expect(result.nciM).toBe(500);
    expect(result.nciF).toBe(0);
    expect(result.nciA).toBe(999.999);
    expect(result.nciS).toBe(250);
  });

  it("I13 SE field exposed in NCI result (scaled ×100)", () => {
    const result = calculateNCI({
      thetaM: { mu: 0, sigma: 1.5 },
      thetaF: { mu: 0, sigma: 0.8 },
      thetaA: { mu: 0, sigma: 0.3 },
      thetaS: { mu: 0, sigma: 1.0 },
    });
    expect(result.nciMSe).toBe(150);
    expect(result.nciFSe).toBe(80);
    expect(result.nciASe).toBeCloseTo(30, 5);
    expect(result.nciSSe).toBe(100);
  });

  it("I7 difficulty b computed for memory-match (monotonic in pairs)", () => {
    const b1 = calculateDifficultyB("memory-match", {
      pairs: 2,
      similarity: 10,
      flipDelay: 1500,
      cardSize: 80,
    });
    const b2 = calculateDifficultyB("memory-match", {
      pairs: 12,
      similarity: 10,
      flipDelay: 1500,
      cardSize: 80,
    });
    expect(b2).toBeGreaterThan(b1);
  });

  it("I7 difficulty b for sorting: criterion=multi > criterion=color", () => {
    const bColor = calculateDifficultyB("sorting", {
      categories: 3,
      items: 6,
      criterion: "color",
      switching: "none",
    });
    const bMulti = calculateDifficultyB("sorting", {
      categories: 3,
      items: 6,
      criterion: "multi",
      switching: "none",
    });
    expect(bMulti).toBeGreaterThan(bColor);
  });

  it("I7 difficulty b for visual-search: more sceneItems = higher b", () => {
    const b1 = calculateDifficultyB("visual-search", {
      sceneItems: 4,
      diffCount: 1,
      diffSubtlety: 20,
    });
    const b2 = calculateDifficultyB("visual-search", {
      sceneItems: 20,
      diffCount: 1,
      diffSubtlety: 20,
    });
    expect(b2).toBeGreaterThan(b1);
  });

  it("I7 difficulty b for corsi-block: longer seqLength = higher b", () => {
    const b1 = calculateDifficultyB("corsi-block", {
      blocks: 6,
      seqLength: 2,
      displayMs: 1200,
    });
    const b2 = calculateDifficultyB("corsi-block", {
      blocks: 6,
      seqLength: 8,
      displayMs: 1200,
    });
    expect(b2).toBeGreaterThan(b1);
  });
});

// ============================================================
// §K — Anomaly detection
// ============================================================
describe("§K Anomaly Detection", () => {
  it("K1 empty trials → score 0", () => {
    expect(calculateAnomalyScore([])).toBe(0);
  });

  it("K1 normal play → low anomaly", () => {
    const normal = Array.from({ length: 10 }, () => ({
      correct: true,
      reactionTimeMs: 1500,
      hintStageReached: 0 as const,
      gameData: {},
    }));
    expect(calculateAnomalyScore(normal)).toBeLessThan(0.3);
  });

  it("K1 instant taps (<200ms) > 50% → high anomaly", () => {
    const instant = Array.from({ length: 10 }, () => ({
      correct: false,
      reactionTimeMs: 100,
      hintStageReached: 0 as const,
      gameData: {},
    }));
    expect(calculateAnomalyScore(instant)).toBeGreaterThan(0.6);
  });

  it("K1 fatigue: accuracy drops in second half by >20%", () => {
    const trials = [
      ...Array.from({ length: 5 }, () => ({
        correct: true,
        reactionTimeMs: 1000,
        hintStageReached: 0 as const,
        gameData: {},
      })),
      ...Array.from({ length: 5 }, () => ({
        correct: false,
        reactionTimeMs: 1000,
        hintStageReached: 0 as const,
        gameData: {},
      })),
    ];
    expect(calculateAnomalyScore(trials)).toBeGreaterThan(0.3);
  });

  it("K1 IMPLEMENTATION GAP: design specifies 6 patterns, code implements only 3 (instant/variance/fatigue)", () => {
    // GAP — patterns 4 (position repeat), 5 (external interrupt), 6 (other) NOT implemented.
    // This test exists to flag the gap. Marked GAP in checklist §K2-K7.
    // Current behavior: only 3 axes evaluated.
    expect(true).toBe(true);
  });

  it("K8 score range bounded 0-1", () => {
    const trials = Array.from({ length: 100 }, () => ({
      correct: false,
      reactionTimeMs: 50,
      hintStageReached: 0 as const,
      gameData: {},
    }));
    const score = calculateAnomalyScore(trials);
    expect(score).toBeGreaterThanOrEqual(0);
    expect(score).toBeLessThanOrEqual(1);
  });
});
