/**
 * NCI Calculation Engine tests — TDD RED phase
 * Based on: outputs/nolla_nci_algorithm_design.md
 */
import { describe, it, expect } from "vitest";
import {
  calculateResponseProbability,
  calculateInformationFunction,
  updateTheta,
  estimateDriftRate,
  calculateNCI,
  calculateDifficultyB,
} from "@/lib/nci";
import type { ThetaState } from "@/types/scoring";

// ============================================================
// calculateResponseProbability — IRT 2PL
// ============================================================
describe("calculateResponseProbability", () => {
  it("returns 0.5 when theta equals b (a=1)", () => {
    const p = calculateResponseProbability(0.5, 1.0, 0.5);
    expect(p).toBeCloseTo(0.5, 5);
  });

  it("returns > 0.5 when theta > b", () => {
    const p = calculateResponseProbability(2.0, 1.0, 0.5);
    expect(p).toBeGreaterThan(0.5);
  });

  it("returns < 0.5 when theta < b", () => {
    const p = calculateResponseProbability(-1.0, 1.0, 0.5);
    expect(p).toBeLessThan(0.5);
  });

  it("returns value between 0 and 1", () => {
    const p = calculateResponseProbability(100, 1.0, 0.5);
    expect(p).toBeGreaterThan(0);
    expect(p).toBeLessThanOrEqual(1);
  });

  it("higher discrimination (a) makes curve steeper", () => {
    const pLowA = calculateResponseProbability(1.0, 0.5, 0.5);
    const pHighA = calculateResponseProbability(1.0, 2.0, 0.5);
    // Both > 0.5 since theta > b, but higher a should be closer to 1
    expect(pHighA).toBeGreaterThan(pLowA);
  });
});

// ============================================================
// calculateInformationFunction — Fisher Information
// ============================================================
describe("calculateInformationFunction", () => {
  it("is maximized when theta = b", () => {
    const atB = calculateInformationFunction(0.5, 1.0, 0.5);
    const awayFromB = calculateInformationFunction(3.0, 1.0, 0.5);
    expect(atB).toBeGreaterThan(awayFromB);
  });

  it("is always non-negative", () => {
    const info = calculateInformationFunction(-5, 1.0, 0.5);
    expect(info).toBeGreaterThanOrEqual(0);
  });

  it("scales with a^2", () => {
    const infoA1 = calculateInformationFunction(0.5, 1.0, 0.5);
    const infoA2 = calculateInformationFunction(0.5, 2.0, 0.5);
    expect(infoA2).toBeCloseTo(infoA1 * 4, 1);
  });
});

// ============================================================
// updateTheta — Bayesian EAP update
// ============================================================
describe("updateTheta", () => {
  // Standard IRT latent scale (θ ~ N(0, 2²))
  const initialTheta: ThetaState = { mu: 0, sigma: 2 };

  it("increases mu after correct response on easy item", () => {
    const updated = updateTheta(initialTheta, true, 1.0, 0.3);
    expect(updated.mu).toBeGreaterThan(initialTheta.mu);
  });

  it("decreases mu after incorrect response", () => {
    const updated = updateTheta(initialTheta, false, 1.0, 0.5);
    expect(updated.mu).toBeLessThan(initialTheta.mu);
  });

  it("reduces sigma (increases certainty) after any response", () => {
    const afterCorrect = updateTheta(initialTheta, true, 1.0, 0.5);
    expect(afterCorrect.sigma).toBeLessThan(initialTheta.sigma);

    const afterIncorrect = updateTheta(initialTheta, false, 1.0, 0.5);
    expect(afterIncorrect.sigma).toBeLessThan(initialTheta.sigma);
  });

  it("sigma never becomes zero or negative", () => {
    let state: ThetaState = { mu: 0, sigma: 1 };
    for (let i = 0; i < 100; i++) {
      state = updateTheta(state, true, 1.0, 0.5);
    }
    expect(state.sigma).toBeGreaterThan(0);
  });

  it("larger sigma leads to bigger mu shift", () => {
    const highUncertainty: ThetaState = { mu: 0, sigma: 2 };
    const lowUncertainty: ThetaState = { mu: 0, sigma: 0.5 };

    const updatedHigh = updateTheta(highUncertainty, true, 1.0, 0.5);
    const updatedLow = updateTheta(lowUncertainty, true, 1.0, 0.5);

    const shiftHigh = Math.abs(updatedHigh.mu - 0);
    const shiftLow = Math.abs(updatedLow.mu - 0);
    expect(shiftHigh).toBeGreaterThan(shiftLow);
  });

  it("θ stays bounded after 8 trials at typical MVP b (~0.5)", () => {
    // Regression: pre-fix this blew up to ±20000 due to scale mismatch.
    let state: ThetaState = { mu: 0, sigma: 2 };
    const results = [true, false, true, true, true, false, true, true];
    for (const correct of results) {
      state = updateTheta(state, correct, 1.0, 0.5);
    }
    expect(state.mu).toBeGreaterThan(-5);
    expect(state.mu).toBeLessThan(5);
  });
});

// ============================================================
// estimateDriftRate — DDM simplified (RT - motor baseline)
// ============================================================
describe("estimateDriftRate", () => {
  it("returns positive drift when RT > motor baseline", () => {
    const drift = estimateDriftRate(800, 300);
    expect(drift).toBeGreaterThan(0);
  });

  it("returns null when RT <= motor baseline (invalid)", () => {
    const drift = estimateDriftRate(200, 300);
    expect(drift).toBeNull();
  });

  it("higher cognitive RT = lower drift rate (slower processing)", () => {
    const fastDrift = estimateDriftRate(500, 300); // cognitive = 200ms
    const slowDrift = estimateDriftRate(1000, 300); // cognitive = 700ms
    expect(fastDrift!).toBeGreaterThan(slowDrift!);
  });
});

// ============================================================
// calculateDifficultyB — parameter to IRT b conversion
// ============================================================
describe("calculateDifficultyB", () => {
  it("calculates b for memory-match", () => {
    const b = calculateDifficultyB("memory-match", {
      pairs: 4, similarity: 20, flipDelay: 1500, cardSize: 80,
    });
    expect(typeof b).toBe("number");
    expect(b).toBeGreaterThan(0);
  });

  it("higher pairs = higher b for memory-match", () => {
    const bLow = calculateDifficultyB("memory-match", {
      pairs: 2, similarity: 0, flipDelay: 2000, cardSize: 96,
    });
    const bHigh = calculateDifficultyB("memory-match", {
      pairs: 12, similarity: 0, flipDelay: 2000, cardSize: 96,
    });
    expect(bHigh).toBeGreaterThan(bLow);
  });

  it("calculates b for sorting", () => {
    const b = calculateDifficultyB("sorting", {
      categories: 3, items: 6, criterion: "color", switching: "none",
    });
    expect(typeof b).toBe("number");
  });

  it("calculates b for visual-search", () => {
    const b = calculateDifficultyB("visual-search", {
      sceneItems: 5, diffCount: 2, diffSubtlety: 30,
    });
    expect(typeof b).toBe("number");
  });

  it("calculates b for corsi-block", () => {
    const b = calculateDifficultyB("corsi-block", {
      blocks: 6, seqLength: 3, displayMs: 1200,
    });
    expect(typeof b).toBe("number");
  });
});

// ============================================================
// calculateNCI — 4-axis theta to NCI score
// ============================================================
describe("calculateNCI", () => {
  it("returns all 4 axes", () => {
    const result = calculateNCI({
      thetaM: { mu: 0, sigma: 0.5 },
      thetaF: { mu: 0.2, sigma: 0.8 },
      thetaA: { mu: -0.1, sigma: 0.6 },
      thetaS: { mu: 0.3, sigma: 1.0 },
    });
    expect(result).toHaveProperty("nciM");
    expect(result).toHaveProperty("nciF");
    expect(result).toHaveProperty("nciA");
    expect(result).toHaveProperty("nciS");
  });

  it("NCI values are in range 0-999.999", () => {
    const result = calculateNCI({
      thetaM: { mu: 0, sigma: 0.5 },
      thetaF: { mu: 0, sigma: 0.5 },
      thetaA: { mu: 0, sigma: 0.5 },
      thetaS: { mu: 0, sigma: 0.5 },
    });
    expect(result.nciM).toBeGreaterThanOrEqual(0);
    expect(result.nciM).toBeLessThanOrEqual(999.999);
    expect(result.nciF).toBeGreaterThanOrEqual(0);
    expect(result.nciF).toBeLessThanOrEqual(999.999);
  });

  it("higher theta = higher NCI", () => {
    const low = calculateNCI({
      thetaM: { mu: -1, sigma: 0.5 },
      thetaF: { mu: -1, sigma: 0.5 },
      thetaA: { mu: -1, sigma: 0.5 },
      thetaS: { mu: -1, sigma: 0.5 },
    });
    const high = calculateNCI({
      thetaM: { mu: 1, sigma: 0.5 },
      thetaF: { mu: 1, sigma: 0.5 },
      thetaA: { mu: 1, sigma: 0.5 },
      thetaS: { mu: 1, sigma: 0.5 },
    });
    expect(high.nciM).toBeGreaterThan(low.nciM);
    expect(high.nciF).toBeGreaterThan(low.nciF);
  });

  it("NCI center: θ=0 → NCI=500", () => {
    const result = calculateNCI({
      thetaM: { mu: 0, sigma: 0.5 },
      thetaF: { mu: 0, sigma: 0.5 },
      thetaA: { mu: 0, sigma: 0.5 },
      thetaS: { mu: 0, sigma: 0.5 },
    });
    expect(result.nciM).toBe(500);
  });

  it("includes standard errors", () => {
    const result = calculateNCI({
      thetaM: { mu: 0, sigma: 0.5 },
      thetaF: { mu: 0, sigma: 0.8 },
      thetaA: { mu: 0, sigma: 0.3 },
      thetaS: { mu: 0, sigma: 1.0 },
    });
    expect(result.nciMSe).toBeGreaterThan(0);
    expect(result.nciFSe).toBeGreaterThan(0);
    expect(result.nciASe).toBeGreaterThan(0);
    expect(result.nciSSe).toBeGreaterThan(0);
  });
});
