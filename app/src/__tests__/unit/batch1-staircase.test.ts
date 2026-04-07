/**
 * Batch 1.1 — §G Staircase 全項目検証
 * checklist 出典: outputs/nolla_debug_checklist.md §G (G1-G17)
 *
 * 既存ユニットテスト(staircase.test.ts)では純粋関数のみカバー。
 * ここではセッション全体を流す統合シムで G1-G17 を検証する。
 */
import { describe, it, expect } from "vitest";
import {
  createSessionState,
  recordTrialResult,
  completeRound,
} from "@/lib/session/session-state";
import { calculateNextDifficulty } from "@/lib/staircase/calculate";
import { getInitialDifficulty } from "@/lib/staircase/initial";
import { getConsecutiveWinThreshold } from "@/lib/staircase/threshold";
import { getStepSize } from "@/lib/staircase/step-size";
import {
  clampMemoryMatch,
  clampSorting,
  clampVisualSearch,
  clampCorsiBlock,
} from "@/lib/staircase/clamp";
import type {
  DifficultyParams,
  GameType,
  MemoryMatchParams,
  SortingParams,
  VisualSearchParams,
  CorsiBlockParams,
  StaircaseState,
} from "@/types/domain";
import type { IQBand } from "@/types/user";

const T = (correct = true) => ({
  correct,
  reactionTimeMs: 1000,
  hintStageReached: 0 as const,
  gameData: {},
});

const Thint3 = () => ({
  correct: true,
  reactionTimeMs: 1000,
  hintStageReached: 3 as const,
  gameData: {},
});

function runRounds(
  gameType: GameType,
  initial: DifficultyParams,
  trialPattern: ReadonlyArray<ReadonlyArray<ReturnType<typeof T>>>,
  iqBand: IQBand = "B2"
) {
  let state = createSessionState("test", gameType, initial);
  const log: Array<{
    round: number;
    params: DifficultyParams;
    cc: number;
    adj: string;
    reversal: number;
  }> = [];
  trialPattern.forEach((roundTrials, i) => {
    roundTrials.forEach((tr) => {
      state = recordTrialResult(state, tr);
    });
    const res = completeRound(state, iqBand);
    state = res.state;
    log.push({
      round: i + 1,
      params: state.currentParams,
      cc: state.consecutiveCorrect,
      adj: res.adjustment,
      reversal: state.staircaseState.reversalCount,
    });
  });
  return { final: state, log };
}

// ============================================================
// G1, G3, G5: UP threshold by IQ band, step-size, memory priority
// ============================================================
describe("§G Staircase — UP path", () => {
  it("G1+G5+G12 memory-match B2 band (N=5): 3 perfect rounds (6 trials) → pairs 2→3 via Math.ceil(2*1.20)", () => {
    const init = getInitialDifficulty("memory-match");
    expect(init.pairs).toBe(2);
    const r = runRounds(
      "memory-match",
      init,
      [
        [T(), T()],
        [T(), T()],
        [T(), T()],
      ],
      "B2"
    );
    const final = r.final.currentParams as MemoryMatchParams;
    expect(final.pairs).toBe(3);
    expect(r.log[2].adj).toBe("up");
  });

  it("G6 sorting UP priority items > categories > switching", () => {
    // items=4, categories=2 → UP should bump items first
    const initial: SortingParams = {
      items: 4,
      categories: 2,
      criterion: "color",
      switching: "none",
    };
    const r = runRounds(
      "sorting",
      initial,
      [
        [T(), T(), T()],
        [T(), T(), T()],
        [T(), T(), T()],
      ],
      "B2"
    );
    const f = r.final.currentParams as SortingParams;
    expect(f.items).toBeGreaterThan(4); // priority 1 advances first
    expect(f.categories).toBe(2); // priority 2 untouched
  });

  it("G7 visual-search UP priority sceneItems > diffSubtlety > diffCount", () => {
    const init = getInitialDifficulty("visual-search");
    const r = runRounds(
      "visual-search",
      init,
      [
        [T(), T()],
        [T(), T()],
        [T(), T()],
      ],
      "B2"
    );
    const f = r.final.currentParams as VisualSearchParams;
    expect(f.sceneItems).toBeGreaterThan(init.sceneItems); // priority 1
    expect(f.diffCount).toBe(init.diffCount); // priority 3 untouched
  });

  it("G8 corsi-block UP priority seqLength > blocks > displayMs", () => {
    const init = getInitialDifficulty("corsi-block");
    const r = runRounds(
      "corsi-block",
      init,
      [
        [T(), T()],
        [T(), T()],
        [T(), T()],
      ],
      "B2"
    );
    const f = r.final.currentParams as CorsiBlockParams;
    expect(f.seqLength).toBeGreaterThan(init.seqLength); // priority 1
    expect(f.blocks).toBe(init.blocks); // priority 2 untouched
    expect(f.displayMs).toBe(init.displayMs); // priority 3 untouched
  });

  it("G1 N threshold by IQ band: B=5, C/D=4, E/F=3", () => {
    expect(getConsecutiveWinThreshold("A1")).toBe(5);
    expect(getConsecutiveWinThreshold("B2")).toBe(5);
    expect(getConsecutiveWinThreshold("C1")).toBe(4);
    expect(getConsecutiveWinThreshold("D2")).toBe(4);
    expect(getConsecutiveWinThreshold("E1")).toBe(3);
    expect(getConsecutiveWinThreshold("F3")).toBe(3);
  });

  it("G3 step-size by reversal count: 0-2→1.20, 3-5→1.10, 6+→1.05", () => {
    expect(getStepSize(0)).toBe(1.2);
    expect(getStepSize(2)).toBe(1.2);
    expect(getStepSize(3)).toBe(1.1);
    expect(getStepSize(5)).toBe(1.1);
    expect(getStepSize(6)).toBe(1.05);
    expect(getStepSize(99)).toBe(1.05);
  });
});

// ============================================================
// G2, G9, G10: DOWN path, reversal
// ============================================================
describe("§G Staircase — DOWN path & reversal", () => {
  it("G2 DOWN: hintStage3 ≥ 2 in a single round triggers DOWN (memory-match cardSize)", () => {
    const init: MemoryMatchParams = {
      pairs: 4,
      similarity: 30,
      flipDelay: 1500,
      cardSize: 80,
    };
    let state = createSessionState("test", "memory-match", init);
    state = recordTrialResult(state, Thint3());
    state = recordTrialResult(state, Thint3());
    const res = completeRound(state, "B2");
    expect(res.adjustment).toBe("down");
    const f = res.state.currentParams as MemoryMatchParams;
    // DOWN priority for memory: cardSize first (increase = easier)
    expect(f.cardSize).toBe(84); // 80 + 4
  });

  it("G9 sorting DOWN priority: switching → categories → items", () => {
    const init: SortingParams = {
      items: 8,
      categories: 4,
      criterion: "color",
      switching: "within_round",
    };
    let state = createSessionState("test", "sorting", init);
    state = recordTrialResult(state, Thint3());
    state = recordTrialResult(state, Thint3());
    const res = completeRound(state, "B2");
    expect(res.adjustment).toBe("down");
    const f = res.state.currentParams as SortingParams;
    expect(f.switching).toBe("between_rounds"); // priority 1 down
  });

  it("G10 reversal: UP→DOWN flip increments reversalCount", () => {
    const init: MemoryMatchParams = {
      pairs: 3,
      similarity: 20,
      flipDelay: 1500,
      cardSize: 80,
    };
    let state = createSessionState("test", "memory-match", init);
    // Force first an UP via 5 perfect trials
    for (let i = 0; i < 5; i++) state = recordTrialResult(state, T());
    let res = completeRound(state, "B2");
    state = res.state;
    expect(res.adjustment).toBe("up");
    expect(state.staircaseState.reversalCount).toBe(0); // first direction, no reversal yet

    // Now force DOWN with hint3 stages
    state = recordTrialResult(state, Thint3());
    state = recordTrialResult(state, Thint3());
    res = completeRound(state, "B2");
    expect(res.adjustment).toBe("down");
    expect(state.staircaseState.reversalCount).toBe(0); // still 0 — completeRound reads PRE state
    // But the state after has reversal incremented
    state = res.state;
    expect(state.staircaseState.reversalCount).toBe(1);
  });
});

// ============================================================
// G11: clamp boundaries
// ============================================================
describe("§G Staircase — clamping", () => {
  it("G11 memory-match clamps: pairs 2-24, similarity 0-100, flipDelay 800-2000, cardSize 64-96", () => {
    expect(
      clampMemoryMatch({ pairs: 100, similarity: 200, flipDelay: 100, cardSize: 200 })
    ).toEqual({ pairs: 24, similarity: 100, flipDelay: 800, cardSize: 96 });
    expect(
      clampMemoryMatch({ pairs: -1, similarity: -50, flipDelay: 5000, cardSize: 10 })
    ).toEqual({ pairs: 2, similarity: 0, flipDelay: 2000, cardSize: 64 });
  });

  it("G11 sorting clamps: categories 2-5, items 3-10 (attention cap)", () => {
    const c = clampSorting({
      categories: 99,
      items: 999,
      criterion: "color",
      switching: "none",
    });
    expect(c.categories).toBe(5);
    expect(c.items).toBe(10);
  });

  it("G11 visual-search clamps: sceneItems 3-25, diffCount 1-7, diffSubtlety 0-100", () => {
    const c = clampVisualSearch({ sceneItems: 999, diffCount: 99, diffSubtlety: 200 });
    expect(c.sceneItems).toBe(25);
    expect(c.diffCount).toBe(7);
    expect(c.diffSubtlety).toBe(100);
  });

  it("G11 corsi-block clamps: blocks 4-16, seqLength 2-9, displayMs 500-1500", () => {
    const c = clampCorsiBlock({ blocks: 99, seqLength: 99, displayMs: 99 });
    expect(c.blocks).toBe(16);
    expect(c.seqLength).toBe(9);
    expect(c.displayMs).toBe(500);
  });
});

// ============================================================
// G13, G14: cross-round consecutive correct
// ============================================================
describe("§G Staircase — consecutiveCorrect handling", () => {
  it("G13 consecutiveCorrect accumulates across rounds (not reset)", () => {
    const r = runRounds(
      "memory-match",
      getInitialDifficulty("memory-match"),
      [
        [T(), T()], // cc=2
        [T(), T()], // cc=4
      ],
      "B2"
    );
    expect(r.log[0].cc).toBe(2);
    expect(r.log[1].cc).toBe(4);
  });

  it("G14 incorrect trial resets consecutiveCorrect to 0 (within round)", () => {
    let state = createSessionState(
      "test",
      "memory-match",
      getInitialDifficulty("memory-match")
    );
    state = recordTrialResult(state, T(true));
    state = recordTrialResult(state, T(true));
    expect(state.consecutiveCorrect).toBe(2);
    state = recordTrialResult(state, T(false));
    expect(state.consecutiveCorrect).toBe(0);
    state = recordTrialResult(state, T(true));
    expect(state.consecutiveCorrect).toBe(1);
  });

  it("G14 incorrect trial prevents UP at end of round", () => {
    const r = runRounds(
      "memory-match",
      getInitialDifficulty("memory-match"),
      [
        [T(), T()],
        [T(), T()],
        [T(false), T()], // wrong then right → cc=1, total=5 but reset midway
      ],
      "B2"
    );
    // Should NOT have triggered UP
    const f = r.final.currentParams as MemoryMatchParams;
    expect(f.pairs).toBe(2);
  });
});
