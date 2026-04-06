/**
 * Type definitions test — RED phase
 * Verifies that domain types exist and have correct structure.
 */
import { describe, it, expect } from "vitest";

// --- domain.ts ---
import type {
  GameType,
  MemoryMatchParams,
  SortingParams,
  VisualSearchParams,
  CorsiBlockParams,
  DifficultyParams,
  Trial,
  Round,
  Session,
  StaircaseState,
  RoundResult,
} from "@/types/domain";

// --- user.ts ---
import type {
  Diagnosis,
  IntellectualLevel,
  SpeechLevel,
  IQBand,
  LDType,
  SortingCriterion,
  SwitchingMode,
  Child,
  Parent,
} from "@/types/user";

// --- scoring.ts ---
import type {
  NCIAxis,
  ThetaState,
  NCISnapshot,
  IRTParams,
  MotorBaseline,
  AnomalyPattern,
} from "@/types/scoring";

describe("domain types", () => {
  it("GameType covers all 4 games", () => {
    const types: GameType[] = [
      "memory-match",
      "sorting",
      "visual-search",
      "corsi-block",
    ];
    expect(types).toHaveLength(4);
  });

  it("MemoryMatchParams has correct fields", () => {
    const params: MemoryMatchParams = {
      pairs: 4,
      similarity: 20,
      flipDelay: 1500,
      cardSize: 80,
    };
    expect(params.pairs).toBe(4);
    expect(params.similarity).toBe(20);
    expect(params.flipDelay).toBe(1500);
    expect(params.cardSize).toBe(80);
  });

  it("SortingParams has correct fields", () => {
    const params: SortingParams = {
      categories: 3,
      items: 6,
      criterion: "color",
      switching: "none",
    };
    expect(params.categories).toBe(3);
  });

  it("VisualSearchParams has correct fields", () => {
    const params: VisualSearchParams = {
      sceneItems: 5,
      diffCount: 2,
      diffSubtlety: 30,
    };
    expect(params.sceneItems).toBe(5);
  });

  it("CorsiBlockParams has correct fields", () => {
    const params: CorsiBlockParams = {
      blocks: 6,
      seqLength: 3,
      displayMs: 1200,
    };
    expect(params.blocks).toBe(6);
  });

  it("Trial has required fields", () => {
    const trial: Trial = {
      id: "t1",
      roundId: "r1",
      sessionId: "s1",
      childId: "c1",
      trialNumber: 1,
      gameType: "memory-match",
      correct: true,
      reactionTimeMs: 1200,
      hintStageReached: 0,
      gameData: {},
      difficultyParams: { pairs: 4, similarity: 20, flipDelay: 1500, cardSize: 80 },
      irtB: 0.5,
      irtA: 1.0,
      presentedAt: "2026-04-06T00:00:00Z",
      respondedAt: "2026-04-06T00:00:01Z",
    };
    expect(trial.correct).toBe(true);
  });

  it("Round has required fields", () => {
    const round: Round = {
      id: "r1",
      sessionId: "s1",
      roundNumber: 1,
      difficultyParams: { pairs: 4, similarity: 20, flipDelay: 1500, cardSize: 80 },
      trialCount: 5,
      correctCount: 4,
      consecutiveCorrect: 3,
      hintStage3Count: 0,
      adjustmentDirection: "none",
      adjustedParam: null,
    };
    expect(round.roundNumber).toBe(1);
  });

  it("Session has required fields", () => {
    const session: Session = {
      id: "s1",
      childId: "c1",
      gameType: "memory-match",
      startedAt: "2026-04-06T00:00:00Z",
      endedAt: null,
      durationMs: null,
      totalTrials: 0,
      correctCount: 0,
      accuracy: null,
      hintStage1Count: 0,
      hintStage2Count: 0,
      hintStage3Count: 0,
      anomalyScore: null,
      anomalyWeight: 1.0,
      initialParams: { pairs: 4, similarity: 20, flipDelay: 1500, cardSize: 80 },
      finalParams: null,
      reversalCount: 0,
      lastDirection: null,
    };
    expect(session.gameType).toBe("memory-match");
  });

  it("StaircaseState has required fields", () => {
    const state: StaircaseState = {
      reversalCount: 0,
      lastDirection: null,
      consecutiveCorrect: 0,
    };
    expect(state.reversalCount).toBe(0);
  });

  it("RoundResult has required fields", () => {
    const result: RoundResult = {
      consecutiveCorrect: 3,
      hintStage3Count: 1,
      trialCount: 5,
      correctCount: 4,
    };
    expect(result.consecutiveCorrect).toBe(3);
  });
});

describe("user types", () => {
  it("Diagnosis covers all options", () => {
    const diagnoses: Diagnosis[] = [
      "asd", "adhd", "intellectual_disability", "ld",
      "down_syndrome", "borderline", "other",
    ];
    expect(diagnoses).toHaveLength(7);
  });

  it("IntellectualLevel covers all options", () => {
    const levels: IntellectualLevel[] = ["severe", "moderate", "mild"];
    expect(levels).toHaveLength(3);
  });

  it("SpeechLevel covers all options", () => {
    const levels: SpeechLevel[] = [
      "nonverbal", "nonverbal_yes_no", "words_only", "partial", "verbal",
    ];
    expect(levels).toHaveLength(5);
  });

  it("IQBand covers all 13 sub-bands", () => {
    const bands: IQBand[] = [
      "A1", "A2", "B1", "B2", "C1", "C2",
      "D1", "D2", "E1", "E2", "F1", "F2", "F3",
    ];
    expect(bands).toHaveLength(13);
  });

  it("Child has required fields", () => {
    const child: Child = {
      id: "c1",
      parentId: "p1",
      displayName: "Test",
      birthDate: null,
      diagnosis: ["asd"],
      intellectualLevel: null,
      ldTypes: [],
      speechLevel: "nonverbal",
      canDistinguishColors: true,
      canDistinguishShapes: true,
      canFollowMultiStep: false,
      iqBand: "B2",
      gamesEnabled: {
        memoryMatch: true,
        sorting: true,
        visualSearch: true,
        corsiBlock: true,
      },
      sortingStartCriterion: "color",
      voiceRecognitionEnabled: false,
      avatarType: "default",
      baselineEstablished: false,
      baselineSessionsCount: 0,
      baselineEstablishedAt: null,
    };
    expect(child.iqBand).toBe("B2");
  });

  it("Parent has required fields", () => {
    const parent: Parent = {
      id: "p1",
      authId: "auth1",
      displayName: null,
      email: null,
      locale: "ja",
      timezone: "Asia/Tokyo",
    };
    expect(parent.locale).toBe("ja");
  });
});

describe("scoring types", () => {
  it("NCIAxis covers all 4 axes", () => {
    const axes: NCIAxis[] = ["M", "F", "A", "S"];
    expect(axes).toHaveLength(4);
  });

  it("ThetaState has required fields", () => {
    const state: ThetaState = {
      mu: 500,
      sigma: 150,
    };
    expect(state.mu).toBe(500);
    expect(state.sigma).toBe(150);
  });

  it("NCISnapshot has required fields", () => {
    const snapshot: NCISnapshot = {
      childId: "c1",
      nciM: 250,
      nciF: 200,
      nciA: 220,
      nciS: 300,
      nciMSe: 5,
      nciFSe: 8,
      nciASe: 6,
      nciSSe: 10,
      thetaM: { mu: 250, sigma: 5 },
      thetaF: { mu: 200, sigma: 8 },
      thetaA: { mu: 220, sigma: 6 },
      thetaS: { mu: 300, sigma: 10 },
      totalTrialsUsed: 100,
      snapshotDate: "2026-04-06",
    };
    expect(snapshot.nciM).toBe(250);
  });

  it("IRTParams has required fields", () => {
    const params: IRTParams = {
      a: 1.0,
      b: 0.5,
    };
    expect(params.a).toBe(1.0);
  });

  it("MotorBaseline has required fields", () => {
    const baseline: MotorBaseline = {
      reactionTimes: [200, 220, 210, 230, 200, 215, 225, 210, 205, 220],
      medianRt: 212,
      weightedBaseline: 212,
    };
    expect(baseline.medianRt).toBe(212);
  });

  it("AnomalyPattern covers all patterns", () => {
    const patterns: AnomalyPattern[] = [
      "poor_health", "random_play", "fatigue", "repeated_tap", "external_factor",
    ];
    expect(patterns).toHaveLength(5);
  });
});
