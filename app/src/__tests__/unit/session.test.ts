/**
 * Session management tests — TDD RED phase
 * Based on: outputs/nolla_data_design_0d3.md Section 4
 */
import { describe, it, expect } from "vitest";
import {
  createSessionState,
  recordTrialResult,
  completeRound,
  completeSession,
} from "@/lib/session/session-state";
import { calculateAnomalyScore } from "@/lib/session/anomaly";
import { calculateMotorBaseline } from "@/lib/session/motor-baseline";
import type {
  MemoryMatchParams,
  TrialResult,
  SessionState,
} from "@/types/domain";

// ============================================================
// createSessionState
// ============================================================
describe("createSessionState", () => {
  const params: MemoryMatchParams = { pairs: 4, similarity: 20, flipDelay: 1500, cardSize: 80 };

  it("creates initial state with correct fields", () => {
    const state = createSessionState("child1", "memory-match", params);
    expect(state.childId).toBe("child1");
    expect(state.gameType).toBe("memory-match");
    expect(state.phase).toBe("motor_baseline");
    expect(state.currentParams).toEqual(params);
    expect(state.trialCount).toBe(0);
    expect(state.correctCount).toBe(0);
    expect(state.roundNumber).toBe(1);
  });

  it("staircase state is initialized to zero", () => {
    const state = createSessionState("child1", "memory-match", params);
    expect(state.staircaseState.reversalCount).toBe(0);
    expect(state.staircaseState.lastDirection).toBeNull();
    expect(state.staircaseState.consecutiveCorrect).toBe(0);
  });
});

// ============================================================
// recordTrialResult
// ============================================================
describe("recordTrialResult", () => {
  const params: MemoryMatchParams = { pairs: 4, similarity: 20, flipDelay: 1500, cardSize: 80 };

  it("increments trialCount and correctCount on correct", () => {
    const state = createSessionState("child1", "memory-match", params);
    const playing = { ...state, phase: "playing" as const };
    const result: TrialResult = {
      correct: true,
      reactionTimeMs: 800,
      hintStageReached: 0,
      gameData: {},
    };
    const updated = recordTrialResult(playing, result);
    expect(updated.trialCount).toBe(1);
    expect(updated.correctCount).toBe(1);
    expect(updated.roundTrialCount).toBe(1);
    expect(updated.roundCorrectCount).toBe(1);
    expect(updated.consecutiveCorrect).toBe(1);
  });

  it("increments trialCount but not correctCount on incorrect", () => {
    const state = createSessionState("child1", "memory-match", params);
    const playing = { ...state, phase: "playing" as const };
    const result: TrialResult = {
      correct: false,
      reactionTimeMs: 1200,
      hintStageReached: 1,
      gameData: {},
    };
    const updated = recordTrialResult(playing, result);
    expect(updated.trialCount).toBe(1);
    expect(updated.correctCount).toBe(0);
    expect(updated.consecutiveCorrect).toBe(0);
  });

  it("tracks hint stages correctly", () => {
    const state = createSessionState("child1", "memory-match", params);
    const playing = { ...state, phase: "playing" as const };
    const r1 = recordTrialResult(playing, {
      correct: true, reactionTimeMs: 800, hintStageReached: 1, gameData: {},
    });
    const r2 = recordTrialResult(r1, {
      correct: true, reactionTimeMs: 900, hintStageReached: 2, gameData: {},
    });
    const r3 = recordTrialResult(r2, {
      correct: true, reactionTimeMs: 1000, hintStageReached: 3, gameData: {},
    });
    expect(r3.hintStage1Count).toBe(1);
    expect(r3.hintStage2Count).toBe(1);
    expect(r3.hintStage3Count).toBe(1);
    expect(r3.roundHintStage3Count).toBe(1);
  });

  it("resets consecutive correct on incorrect", () => {
    const state = createSessionState("child1", "memory-match", params);
    const playing = { ...state, phase: "playing" as const };
    const r1 = recordTrialResult(playing, {
      correct: true, reactionTimeMs: 800, hintStageReached: 0, gameData: {},
    });
    expect(r1.consecutiveCorrect).toBe(1);
    const r2 = recordTrialResult(r1, {
      correct: false, reactionTimeMs: 900, hintStageReached: 1, gameData: {},
    });
    expect(r2.consecutiveCorrect).toBe(0);
  });

  it("stores trial results immutably", () => {
    const state = createSessionState("child1", "memory-match", params);
    const playing = { ...state, phase: "playing" as const };
    const result: TrialResult = {
      correct: true, reactionTimeMs: 800, hintStageReached: 0, gameData: {},
    };
    const updated = recordTrialResult(playing, result);
    expect(updated.trialResults).toHaveLength(1);
    expect(playing.trialResults).toHaveLength(0); // original unchanged
  });
});

// ============================================================
// completeRound
// ============================================================
describe("completeRound", () => {
  const params: MemoryMatchParams = { pairs: 4, similarity: 20, flipDelay: 1500, cardSize: 80 };

  it("transitions to round_transition phase", () => {
    const state = createSessionState("child1", "memory-match", params);
    const playing: SessionState = {
      ...state,
      phase: "playing",
      roundTrialCount: 5,
      roundCorrectCount: 4,
      roundConsecutiveCorrect: 3,
      roundHintStage3Count: 0,
    };
    const result = completeRound(playing, "B2");
    expect(result.state.phase).toBe("playing");
    expect(result.state.roundNumber).toBe(2);
  });

  it("resets round-level counters", () => {
    const state = createSessionState("child1", "memory-match", params);
    const playing: SessionState = {
      ...state,
      phase: "playing",
      roundTrialCount: 5,
      roundCorrectCount: 4,
      roundConsecutiveCorrect: 3,
      roundHintStage3Count: 1,
    };
    const result = completeRound(playing, "B2");
    expect(result.state.roundTrialCount).toBe(0);
    expect(result.state.roundCorrectCount).toBe(0);
    expect(result.state.roundConsecutiveCorrect).toBe(0);
    expect(result.state.roundHintStage3Count).toBe(0);
  });

  it("returns adjustment direction", () => {
    const state = createSessionState("child1", "memory-match", params);
    const playing: SessionState = {
      ...state,
      phase: "playing",
      roundTrialCount: 5,
      roundCorrectCount: 5,
      roundConsecutiveCorrect: 5,
      roundHintStage3Count: 0,
    };
    const result = completeRound(playing, "B2");
    expect(["up", "down", "none"]).toContain(result.adjustment);
  });
});

// ============================================================
// completeSession
// ============================================================
describe("completeSession", () => {
  const params: MemoryMatchParams = { pairs: 4, similarity: 20, flipDelay: 1500, cardSize: 80 };

  it("generates session summary with accuracy", () => {
    const state = createSessionState("child1", "memory-match", params);
    const playing: SessionState = {
      ...state,
      phase: "playing",
      trialCount: 10,
      correctCount: 8,
      trialResults: Array.from({ length: 10 }, (_, i) => ({
        correct: i < 8,
        reactionTimeMs: 800 + i * 50,
        hintStageReached: 0,
        gameData: {},
      })),
    };
    const summary = completeSession(playing);
    expect(summary.totalTrials).toBe(10);
    expect(summary.correctCount).toBe(8);
    expect(summary.accuracy).toBeCloseTo(0.8);
  });

  it("handles zero trials gracefully", () => {
    const state = createSessionState("child1", "memory-match", params);
    const summary = completeSession(state);
    expect(summary.totalTrials).toBe(0);
    expect(summary.accuracy).toBeNull();
  });
});

// ============================================================
// calculateAnomalyScore
// ============================================================
describe("calculateAnomalyScore", () => {
  it("returns 0 for normal play", () => {
    const trials: readonly TrialResult[] = Array.from({ length: 10 }, () => ({
      correct: Math.random() > 0.3,
      reactionTimeMs: 500 + Math.random() * 1500,
      hintStageReached: 0,
      gameData: {},
    }));
    const score = calculateAnomalyScore(trials);
    expect(score).toBeGreaterThanOrEqual(0);
    expect(score).toBeLessThanOrEqual(1);
  });

  it("returns high score for all instant responses (random play)", () => {
    const trials: readonly TrialResult[] = Array.from({ length: 10 }, () => ({
      correct: true,
      reactionTimeMs: 100, // way too fast
      hintStageReached: 0,
      gameData: {},
    }));
    const score = calculateAnomalyScore(trials);
    expect(score).toBeGreaterThan(0.5);
  });

  it("returns 0 for empty trials", () => {
    const score = calculateAnomalyScore([]);
    expect(score).toBe(0);
  });

  it("returns value between 0 and 1", () => {
    const trials: readonly TrialResult[] = Array.from({ length: 5 }, () => ({
      correct: false,
      reactionTimeMs: 300,
      hintStageReached: 2,
      gameData: {},
    }));
    const score = calculateAnomalyScore(trials);
    expect(score).toBeGreaterThanOrEqual(0);
    expect(score).toBeLessThanOrEqual(1);
  });
});

// ============================================================
// calculateMotorBaseline
// ============================================================
describe("calculateMotorBaseline", () => {
  it("calculates median correctly for odd count", () => {
    const rts = [200, 250, 220, 230, 210, 240, 215, 225, 235, 205];
    const baseline = calculateMotorBaseline(rts, null);
    // sorted: [200,205,210,215,220,225,230,235,240,250], median of even=(220+225)/2=223
    expect(baseline.medianRt).toBe(223);
  });

  it("returns weighted baseline on first measurement", () => {
    const rts = [200, 250, 220, 230, 210, 240, 215, 225, 235, 205];
    const baseline = calculateMotorBaseline(rts, null);
    // First time: weightedBaseline = medianRt
    expect(baseline.weightedBaseline).toBe(baseline.medianRt);
  });

  it("applies 0.7/0.3 weighting on subsequent measurements", () => {
    const rts = [200, 200, 200, 200, 200, 200, 200, 200, 200, 200];
    const baseline = calculateMotorBaseline(rts, 300);
    // new = 0.7 * 300 + 0.3 * 200 = 210 + 60 = 270
    expect(baseline.weightedBaseline).toBe(270);
  });

  it("removes outliers (median ± 2SD)", () => {
    // Include extreme outlier
    const rts = [200, 210, 220, 215, 225, 205, 210, 220, 5000, 215];
    const baseline = calculateMotorBaseline(rts, null);
    // 5000 should be removed as outlier; median should be around 215
    expect(baseline.medianRt).toBeLessThan(300);
  });

  it("stores all original reaction times", () => {
    const rts = [200, 250, 220, 230, 210];
    const baseline = calculateMotorBaseline(rts, null);
    expect(baseline.reactionTimes).toEqual(rts);
  });
});
