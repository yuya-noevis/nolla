/**
 * Staircase Engine tests — TDD RED phase
 * Based on: outputs/nolla_adaptive_difficulty_design_0d2.md
 */
import { describe, it, expect } from "vitest";
import {
  getStepSize,
  getConsecutiveWinThreshold,
  calculateNextDifficulty,
  getInitialDifficulty,
  shouldAdvanceCriterion,
} from "@/lib/staircase";
import type { IQBand } from "@/types/user";
import type {
  MemoryMatchParams,
  SortingParams,
  VisualSearchParams,
  CorsiBlockParams,
  StaircaseState,
  RoundResult,
  GameType,
} from "@/types/domain";

// ============================================================
// getStepSize
// ============================================================
describe("getStepSize", () => {
  it("returns 1.20 for reversal 0 (exploration phase)", () => {
    expect(getStepSize(0)).toBe(1.20);
  });

  it("returns 1.20 for reversal 2 (exploration phase)", () => {
    expect(getStepSize(2)).toBe(1.20);
  });

  it("returns 1.10 for reversal 3 (convergence phase)", () => {
    expect(getStepSize(3)).toBe(1.10);
  });

  it("returns 1.10 for reversal 5 (convergence phase)", () => {
    expect(getStepSize(5)).toBe(1.10);
  });

  it("returns 1.05 for reversal 6 (precision phase)", () => {
    expect(getStepSize(6)).toBe(1.05);
  });

  it("returns 1.05 for reversal 10 (precision phase)", () => {
    expect(getStepSize(10)).toBe(1.05);
  });
});

// ============================================================
// getConsecutiveWinThreshold
// ============================================================
describe("getConsecutiveWinThreshold", () => {
  it("returns 5 for IQ 21-50 (Band A-B)", () => {
    expect(getConsecutiveWinThreshold("A1")).toBe(5);
    expect(getConsecutiveWinThreshold("A2")).toBe(5);
    expect(getConsecutiveWinThreshold("B1")).toBe(5);
    expect(getConsecutiveWinThreshold("B2")).toBe(5);
  });

  it("returns 4 for IQ 51-70 (Band C-D)", () => {
    expect(getConsecutiveWinThreshold("C1")).toBe(4);
    expect(getConsecutiveWinThreshold("C2")).toBe(4);
    expect(getConsecutiveWinThreshold("D1")).toBe(4);
    expect(getConsecutiveWinThreshold("D2")).toBe(4);
  });

  it("returns 3 for IQ 71-110 (Band E-F)", () => {
    expect(getConsecutiveWinThreshold("E1")).toBe(3);
    expect(getConsecutiveWinThreshold("E2")).toBe(3);
    expect(getConsecutiveWinThreshold("F1")).toBe(3);
    expect(getConsecutiveWinThreshold("F2")).toBe(3);
    expect(getConsecutiveWinThreshold("F3")).toBe(3);
  });
});

// ============================================================
// calculateNextDifficulty — Memory Match
// ============================================================
describe("calculateNextDifficulty — memory-match", () => {
  const baseParams: MemoryMatchParams = {
    pairs: 4,
    similarity: 20,
    flipDelay: 1500,
    cardSize: 80,
  };

  const baseState: StaircaseState = {
    reversalCount: 6,
    lastDirection: null,
    consecutiveCorrect: 0,
  };

  it("increases pairs on UP (priority 1)", () => {
    const roundResult: RoundResult = {
      consecutiveCorrect: 5,
      hintStage3Count: 0,
      trialCount: 5,
      correctCount: 5,
    };
    const result = calculateNextDifficulty(
      "memory-match", baseParams, roundResult, baseState, "B2"
    );
    expect(result.params.pairs).toBeGreaterThan(baseParams.pairs);
    expect(result.state.lastDirection).toBe("up");
  });

  it("decreases card_size on DOWN (priority 4 reversed = last to decrease)", () => {
    const roundResult: RoundResult = {
      consecutiveCorrect: 0,
      hintStage3Count: 2,
      trialCount: 5,
      correctCount: 2,
    };
    const result = calculateNextDifficulty(
      "memory-match", baseParams, roundResult, baseState, "B2"
    );
    // DOWN: reverse priority — card_size first (priority 4 reversed)
    expect(result.params.cardSize).toBeGreaterThan(baseParams.cardSize);
    expect(result.state.lastDirection).toBe("down");
  });

  it("keeps params when neither UP nor DOWN condition met", () => {
    const roundResult: RoundResult = {
      consecutiveCorrect: 2,
      hintStage3Count: 1,
      trialCount: 5,
      correctCount: 3,
    };
    const result = calculateNextDifficulty(
      "memory-match", baseParams, roundResult, baseState, "B2"
    );
    expect(result.params).toEqual(baseParams);
    expect(result.state.lastDirection).toBeNull();
  });

  it("increments reversal count on direction change", () => {
    const stateWithLastUp: StaircaseState = {
      reversalCount: 3,
      lastDirection: "up",
      consecutiveCorrect: 0,
    };
    const roundResult: RoundResult = {
      consecutiveCorrect: 0,
      hintStage3Count: 2,
      trialCount: 5,
      correctCount: 2,
    };
    const result = calculateNextDifficulty(
      "memory-match", baseParams, roundResult, stateWithLastUp, "B2"
    );
    expect(result.state.reversalCount).toBe(4);
    expect(result.state.lastDirection).toBe("down");
  });

  it("does not increment reversal count on same direction", () => {
    const stateWithLastDown: StaircaseState = {
      reversalCount: 3,
      lastDirection: "down",
      consecutiveCorrect: 0,
    };
    const roundResult: RoundResult = {
      consecutiveCorrect: 0,
      hintStage3Count: 2,
      trialCount: 5,
      correctCount: 2,
    };
    const result = calculateNextDifficulty(
      "memory-match", baseParams, roundResult, stateWithLastDown, "B2"
    );
    expect(result.state.reversalCount).toBe(3);
  });

  it("clamps pairs to MAX 24", () => {
    const maxParams: MemoryMatchParams = {
      pairs: 24,
      similarity: 100,
      flipDelay: 800,
      cardSize: 64,
    };
    const roundResult: RoundResult = {
      consecutiveCorrect: 5,
      hintStage3Count: 0,
      trialCount: 5,
      correctCount: 5,
    };
    const result = calculateNextDifficulty(
      "memory-match", maxParams, roundResult, baseState, "B2"
    );
    expect(result.params.pairs).toBeLessThanOrEqual(24);
  });

  it("clamps pairs to MIN 2", () => {
    const minParams: MemoryMatchParams = {
      pairs: 2,
      similarity: 0,
      flipDelay: 2000,
      cardSize: 96,
    };
    const roundResult: RoundResult = {
      consecutiveCorrect: 0,
      hintStage3Count: 2,
      trialCount: 5,
      correctCount: 1,
    };
    const result = calculateNextDifficulty(
      "memory-match", minParams, roundResult, baseState, "B2"
    );
    expect(result.params.pairs).toBeGreaterThanOrEqual(2);
  });
});

// ============================================================
// calculateNextDifficulty — Sorting
// ============================================================
describe("calculateNextDifficulty — sorting", () => {
  const baseParams: SortingParams = {
    categories: 3,
    items: 6,
    criterion: "color",
    switching: "none",
  };

  const baseState: StaircaseState = {
    reversalCount: 6,
    lastDirection: null,
    consecutiveCorrect: 0,
  };

  it("increases items on UP (priority 1)", () => {
    const roundResult: RoundResult = {
      consecutiveCorrect: 4,
      hintStage3Count: 0,
      trialCount: 5,
      correctCount: 5,
    };
    const result = calculateNextDifficulty(
      "sorting", baseParams, roundResult, baseState, "C1"
    );
    expect(result.params.items).toBeGreaterThan(baseParams.items);
  });
});

// ============================================================
// calculateNextDifficulty — Visual Search
// ============================================================
describe("calculateNextDifficulty — visual-search", () => {
  const baseParams: VisualSearchParams = {
    sceneItems: 5,
    diffCount: 2,
    diffSubtlety: 30,
  };

  const baseState: StaircaseState = {
    reversalCount: 6,
    lastDirection: null,
    consecutiveCorrect: 0,
  };

  it("increases scene_items on UP (priority 1)", () => {
    const roundResult: RoundResult = {
      consecutiveCorrect: 3,
      hintStage3Count: 0,
      trialCount: 5,
      correctCount: 5,
    };
    const result = calculateNextDifficulty(
      "visual-search", baseParams, roundResult, baseState, "E1"
    );
    expect(result.params.sceneItems).toBeGreaterThan(baseParams.sceneItems);
  });
});

// ============================================================
// calculateNextDifficulty — Corsi Block
// ============================================================
describe("calculateNextDifficulty — corsi-block", () => {
  const baseParams: CorsiBlockParams = {
    blocks: 6,
    seqLength: 3,
    displayMs: 1200,
  };

  const baseState: StaircaseState = {
    reversalCount: 6,
    lastDirection: null,
    consecutiveCorrect: 0,
  };

  it("increases seq_length by +1 on UP (not multiplicative)", () => {
    const roundResult: RoundResult = {
      consecutiveCorrect: 3,
      hintStage3Count: 0,
      trialCount: 5,
      correctCount: 5,
    };
    const result = calculateNextDifficulty(
      "corsi-block", baseParams, roundResult, baseState, "E1"
    );
    expect(result.params.seqLength).toBe(4);
  });

  it("decreases seq_length by -1 on DOWN (reverse priority)", () => {
    const roundResult: RoundResult = {
      consecutiveCorrect: 0,
      hintStage3Count: 2,
      trialCount: 5,
      correctCount: 1,
    };
    // DOWN reversal path for corsi: displayMs first (priority 3 reversed)
    // but displayMs is already adjustable... let me check design:
    // DOWN: reverse order = displayMs(3) -> blocks(2) -> seqLength(1)
    const result = calculateNextDifficulty(
      "corsi-block", baseParams, roundResult, baseState, "E1"
    );
    expect(result.params.displayMs).toBeGreaterThan(baseParams.displayMs);
    expect(result.state.lastDirection).toBe("down");
  });

  it("clamps seq_length to MAX 9", () => {
    const maxParams: CorsiBlockParams = {
      blocks: 16,
      seqLength: 9,
      displayMs: 500,
    };
    const roundResult: RoundResult = {
      consecutiveCorrect: 3,
      hintStage3Count: 0,
      trialCount: 5,
      correctCount: 5,
    };
    const result = calculateNextDifficulty(
      "corsi-block", maxParams, roundResult, baseState, "E1"
    );
    expect(result.params.seqLength).toBeLessThanOrEqual(9);
  });
});

// ============================================================
// calculateNextDifficulty — Sorting (more coverage)
// ============================================================
describe("calculateNextDifficulty — sorting (extended)", () => {
  const baseState: StaircaseState = {
    reversalCount: 6,
    lastDirection: null,
    consecutiveCorrect: 0,
  };

  it("UP: increases categories when items >= 10 and categories < 5", () => {
    const params: SortingParams = {
      categories: 3,
      items: 15,  // at max, can't increase further
      criterion: "color",
      switching: "none",
    };
    const roundResult: RoundResult = {
      consecutiveCorrect: 4,
      hintStage3Count: 0,
      trialCount: 5,
      correctCount: 5,
    };
    const result = calculateNextDifficulty(
      "sorting", params, roundResult, baseState, "C1"
    );
    // items can't go above 15, so categories should increase
    expect(result.params.categories).toBe(4);
  });

  it("UP: advances switching when categories maxed", () => {
    const params: SortingParams = {
      categories: 5,
      items: 15,
      criterion: "color",
      switching: "none",
    };
    const roundResult: RoundResult = {
      consecutiveCorrect: 4,
      hintStage3Count: 0,
      trialCount: 5,
      correctCount: 5,
    };
    const result = calculateNextDifficulty(
      "sorting", params, roundResult, baseState, "C1"
    );
    expect(result.params.switching).toBe("between_rounds");
  });

  it("DOWN: regresses switching first", () => {
    const params: SortingParams = {
      categories: 3,
      items: 6,
      criterion: "color",
      switching: "within_round",
    };
    const roundResult: RoundResult = {
      consecutiveCorrect: 0,
      hintStage3Count: 2,
      trialCount: 5,
      correctCount: 1,
    };
    const result = calculateNextDifficulty(
      "sorting", params, roundResult, baseState, "C1"
    );
    expect(result.params.switching).toBe("between_rounds");
  });

  it("DOWN: decreases categories when switching is already none", () => {
    const params: SortingParams = {
      categories: 4,
      items: 6,
      criterion: "color",
      switching: "none",
    };
    const roundResult: RoundResult = {
      consecutiveCorrect: 0,
      hintStage3Count: 2,
      trialCount: 5,
      correctCount: 1,
    };
    const result = calculateNextDifficulty(
      "sorting", params, roundResult, baseState, "C1"
    );
    expect(result.params.categories).toBe(3);
  });

  it("DOWN: decreases items when switching=none and categories=2", () => {
    const params: SortingParams = {
      categories: 2,
      items: 8,
      criterion: "color",
      switching: "none",
    };
    const roundResult: RoundResult = {
      consecutiveCorrect: 0,
      hintStage3Count: 2,
      trialCount: 5,
      correctCount: 1,
    };
    const result = calculateNextDifficulty(
      "sorting", params, roundResult, baseState, "C1"
    );
    expect(result.params.items).toBeLessThan(8);
  });
});

// ============================================================
// calculateNextDifficulty — Visual Search (extended)
// ============================================================
describe("calculateNextDifficulty — visual-search (extended)", () => {
  const baseState: StaircaseState = {
    reversalCount: 6,
    lastDirection: null,
    consecutiveCorrect: 0,
  };

  it("UP: increases diff_subtlety when sceneItems maxed", () => {
    const params: VisualSearchParams = {
      sceneItems: 25,
      diffCount: 2,
      diffSubtlety: 30,
    };
    const roundResult: RoundResult = {
      consecutiveCorrect: 3,
      hintStage3Count: 0,
      trialCount: 5,
      correctCount: 5,
    };
    const result = calculateNextDifficulty(
      "visual-search", params, roundResult, baseState, "E1"
    );
    expect(result.params.diffSubtlety).toBeGreaterThan(30);
  });

  it("UP: increases diff_count when sceneItems and subtlety maxed", () => {
    const params: VisualSearchParams = {
      sceneItems: 25,
      diffCount: 3,
      diffSubtlety: 100,
    };
    const roundResult: RoundResult = {
      consecutiveCorrect: 3,
      hintStage3Count: 0,
      trialCount: 5,
      correctCount: 5,
    };
    const result = calculateNextDifficulty(
      "visual-search", params, roundResult, baseState, "E1"
    );
    expect(result.params.diffCount).toBe(4);
  });

  it("DOWN: decreases diff_count first", () => {
    const params: VisualSearchParams = {
      sceneItems: 10,
      diffCount: 3,
      diffSubtlety: 50,
    };
    const roundResult: RoundResult = {
      consecutiveCorrect: 0,
      hintStage3Count: 2,
      trialCount: 5,
      correctCount: 1,
    };
    const result = calculateNextDifficulty(
      "visual-search", params, roundResult, baseState, "E1"
    );
    expect(result.params.diffCount).toBe(2);
  });

  it("DOWN: decreases subtlety when diff_count at min", () => {
    const params: VisualSearchParams = {
      sceneItems: 10,
      diffCount: 1,
      diffSubtlety: 50,
    };
    const roundResult: RoundResult = {
      consecutiveCorrect: 0,
      hintStage3Count: 2,
      trialCount: 5,
      correctCount: 1,
    };
    const result = calculateNextDifficulty(
      "visual-search", params, roundResult, baseState, "E1"
    );
    expect(result.params.diffSubtlety).toBeLessThan(50);
  });

  it("DOWN: decreases sceneItems when all else at min", () => {
    const params: VisualSearchParams = {
      sceneItems: 10,
      diffCount: 1,
      diffSubtlety: 0,
    };
    const roundResult: RoundResult = {
      consecutiveCorrect: 0,
      hintStage3Count: 2,
      trialCount: 5,
      correctCount: 1,
    };
    const result = calculateNextDifficulty(
      "visual-search", params, roundResult, baseState, "E1"
    );
    expect(result.params.sceneItems).toBeLessThan(10);
  });
});

// ============================================================
// calculateNextDifficulty — Corsi Block (extended)
// ============================================================
describe("calculateNextDifficulty — corsi-block (extended)", () => {
  const baseState: StaircaseState = {
    reversalCount: 6,
    lastDirection: null,
    consecutiveCorrect: 0,
  };

  it("UP: increases blocks when seqLength maxed", () => {
    const params: CorsiBlockParams = {
      blocks: 8,
      seqLength: 9,
      displayMs: 1000,
    };
    const roundResult: RoundResult = {
      consecutiveCorrect: 3,
      hintStage3Count: 0,
      trialCount: 5,
      correctCount: 5,
    };
    const result = calculateNextDifficulty(
      "corsi-block", params, roundResult, baseState, "E1"
    );
    expect(result.params.blocks).toBeGreaterThan(8);
  });

  it("UP: decreases displayMs when seqLength and blocks maxed", () => {
    const params: CorsiBlockParams = {
      blocks: 16,
      seqLength: 9,
      displayMs: 1000,
    };
    const roundResult: RoundResult = {
      consecutiveCorrect: 3,
      hintStage3Count: 0,
      trialCount: 5,
      correctCount: 5,
    };
    const result = calculateNextDifficulty(
      "corsi-block", params, roundResult, baseState, "E1"
    );
    expect(result.params.displayMs).toBeLessThan(1000);
  });

  it("DOWN: decreases blocks when displayMs maxed", () => {
    const params: CorsiBlockParams = {
      blocks: 8,
      seqLength: 5,
      displayMs: 1500,
    };
    const roundResult: RoundResult = {
      consecutiveCorrect: 0,
      hintStage3Count: 2,
      trialCount: 5,
      correctCount: 1,
    };
    const result = calculateNextDifficulty(
      "corsi-block", params, roundResult, baseState, "E1"
    );
    expect(result.params.blocks).toBeLessThan(8);
  });

  it("DOWN: decreases seqLength when blocks and displayMs at limits", () => {
    const params: CorsiBlockParams = {
      blocks: 4,
      seqLength: 5,
      displayMs: 1500,
    };
    const roundResult: RoundResult = {
      consecutiveCorrect: 0,
      hintStage3Count: 2,
      trialCount: 5,
      correctCount: 1,
    };
    const result = calculateNextDifficulty(
      "corsi-block", params, roundResult, baseState, "E1"
    );
    expect(result.params.seqLength).toBe(4);
  });
});

// ============================================================
// calculateNextDifficulty — Memory Match (extended)
// ============================================================
describe("calculateNextDifficulty — memory-match (extended)", () => {
  const baseState: StaircaseState = {
    reversalCount: 6,
    lastDirection: null,
    consecutiveCorrect: 0,
  };

  it("UP: increases similarity when pairs maxed", () => {
    const params: MemoryMatchParams = {
      pairs: 24,
      similarity: 50,
      flipDelay: 1500,
      cardSize: 80,
    };
    const roundResult: RoundResult = {
      consecutiveCorrect: 5,
      hintStage3Count: 0,
      trialCount: 5,
      correctCount: 5,
    };
    const result = calculateNextDifficulty(
      "memory-match", params, roundResult, baseState, "B2"
    );
    expect(result.params.similarity).toBeGreaterThan(50);
  });

  it("UP: decreases flipDelay when pairs and similarity maxed", () => {
    const params: MemoryMatchParams = {
      pairs: 24,
      similarity: 100,
      flipDelay: 1500,
      cardSize: 80,
    };
    const roundResult: RoundResult = {
      consecutiveCorrect: 5,
      hintStage3Count: 0,
      trialCount: 5,
      correctCount: 5,
    };
    const result = calculateNextDifficulty(
      "memory-match", params, roundResult, baseState, "B2"
    );
    expect(result.params.flipDelay).toBeLessThan(1500);
  });

  it("UP: decreases cardSize when all else maxed", () => {
    const params: MemoryMatchParams = {
      pairs: 24,
      similarity: 100,
      flipDelay: 800,
      cardSize: 80,
    };
    const roundResult: RoundResult = {
      consecutiveCorrect: 5,
      hintStage3Count: 0,
      trialCount: 5,
      correctCount: 5,
    };
    const result = calculateNextDifficulty(
      "memory-match", params, roundResult, baseState, "B2"
    );
    expect(result.params.cardSize).toBeLessThan(80);
  });

  it("DOWN: increases flipDelay when cardSize maxed", () => {
    const params: MemoryMatchParams = {
      pairs: 4,
      similarity: 20,
      flipDelay: 1200,
      cardSize: 96,
    };
    const roundResult: RoundResult = {
      consecutiveCorrect: 0,
      hintStage3Count: 2,
      trialCount: 5,
      correctCount: 1,
    };
    const result = calculateNextDifficulty(
      "memory-match", params, roundResult, baseState, "B2"
    );
    expect(result.params.flipDelay).toBeGreaterThan(1200);
  });

  it("DOWN: decreases similarity when cardSize and flipDelay maxed", () => {
    const params: MemoryMatchParams = {
      pairs: 10,
      similarity: 50,
      flipDelay: 2000,
      cardSize: 96,
    };
    const roundResult: RoundResult = {
      consecutiveCorrect: 0,
      hintStage3Count: 2,
      trialCount: 5,
      correctCount: 1,
    };
    const result = calculateNextDifficulty(
      "memory-match", params, roundResult, baseState, "B2"
    );
    expect(result.params.similarity).toBeLessThan(50);
  });

  it("DOWN: decreases pairs when all auxiliary params at limit", () => {
    const params: MemoryMatchParams = {
      pairs: 10,
      similarity: 0,
      flipDelay: 2000,
      cardSize: 96,
    };
    const roundResult: RoundResult = {
      consecutiveCorrect: 0,
      hintStage3Count: 2,
      trialCount: 5,
      correctCount: 1,
    };
    const result = calculateNextDifficulty(
      "memory-match", params, roundResult, baseState, "B2"
    );
    expect(result.params.pairs).toBeLessThan(10);
  });
});

// ============================================================
// getInitialDifficulty
// ============================================================
describe("getInitialDifficulty", () => {
  it("returns Band B2 params for memory-match", () => {
    const params = getInitialDifficulty("memory-match");
    // B2: pairs=3-4, similarity=10%, flipDelay=1500ms, cardSize=80px
    expect(params.pairs).toBeGreaterThanOrEqual(2);
    expect(params.pairs).toBeLessThanOrEqual(4);
    expect(params.similarity).toBe(10);
    expect(params.flipDelay).toBe(1500);
    expect(params.cardSize).toBe(80);
  });

  it("returns Band B2 params for sorting", () => {
    const params = getInitialDifficulty("sorting");
    expect(params.categories).toBeGreaterThanOrEqual(2);
    expect(params.items).toBeGreaterThanOrEqual(4);
  });

  it("returns Band B2 params for visual-search", () => {
    const params = getInitialDifficulty("visual-search");
    expect(params.sceneItems).toBeGreaterThanOrEqual(4);
    expect(params.diffCount).toBe(1);
  });

  it("returns Band B2 params for corsi-block", () => {
    const params = getInitialDifficulty("corsi-block");
    expect(params.blocks).toBe(6);
    expect(params.seqLength).toBeGreaterThanOrEqual(2);
    expect(params.displayMs).toBe(1200);
  });
});

// ============================================================
// shouldAdvanceCriterion (sorting-specific)
// ============================================================
describe("shouldAdvanceCriterion", () => {
  it("returns true when accuracy >= 85% for 3 consecutive sessions and stage3 rate <= 10%", () => {
    const sessionHistory = [
      { accuracy: 0.90, hintStage3Rate: 0.05 },
      { accuracy: 0.88, hintStage3Rate: 0.08 },
      { accuracy: 0.85, hintStage3Rate: 0.10 },
    ];
    expect(shouldAdvanceCriterion(sessionHistory)).toBe(true);
  });

  it("returns false when fewer than 3 sessions", () => {
    const sessionHistory = [
      { accuracy: 0.90, hintStage3Rate: 0.05 },
      { accuracy: 0.88, hintStage3Rate: 0.08 },
    ];
    expect(shouldAdvanceCriterion(sessionHistory)).toBe(false);
  });

  it("returns false when accuracy below 85% in any of last 3", () => {
    const sessionHistory = [
      { accuracy: 0.90, hintStage3Rate: 0.05 },
      { accuracy: 0.80, hintStage3Rate: 0.08 },
      { accuracy: 0.88, hintStage3Rate: 0.10 },
    ];
    expect(shouldAdvanceCriterion(sessionHistory)).toBe(false);
  });

  it("returns false when hint stage 3 rate exceeds 10%", () => {
    const sessionHistory = [
      { accuracy: 0.90, hintStage3Rate: 0.05 },
      { accuracy: 0.88, hintStage3Rate: 0.15 },
      { accuracy: 0.85, hintStage3Rate: 0.10 },
    ];
    expect(shouldAdvanceCriterion(sessionHistory)).toBe(false);
  });
});
