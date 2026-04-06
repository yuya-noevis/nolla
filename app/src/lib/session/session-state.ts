/**
 * Session state machine — pure functions.
 * Based on: outputs/nolla_data_design_0d3.md Section 4
 */
import type {
  GameType,
  DifficultyParams,
  SessionState,
  SessionSummary,
  TrialResult,
  AdjustmentDirection,
  StaircaseState,
} from "@/types/domain";
import type { IQBand } from "@/types/user";
import { calculateNextDifficulty } from "@/lib/staircase";
import { calculateAnomalyScore } from "./anomaly";

export function createSessionState(
  childId: string,
  gameType: GameType,
  initialParams: DifficultyParams
): SessionState {
  return {
    childId,
    gameType,
    phase: "motor_baseline",
    currentParams: initialParams,
    staircaseState: {
      reversalCount: 0,
      lastDirection: null,
      consecutiveCorrect: 0,
    },
    roundNumber: 1,
    trialCount: 0,
    correctCount: 0,
    consecutiveCorrect: 0,
    hintStage1Count: 0,
    hintStage2Count: 0,
    hintStage3Count: 0,
    roundTrialCount: 0,
    roundCorrectCount: 0,
    roundConsecutiveCorrect: 0,
    roundHintStage3Count: 0,
    startedAt: new Date().toISOString(),
    trialResults: [],
  };
}

export function recordTrialResult(
  state: SessionState,
  result: TrialResult
): SessionState {
  const newConsecutive = result.correct
    ? state.consecutiveCorrect + 1
    : 0;
  const roundConsecutive = result.correct
    ? state.roundConsecutiveCorrect + 1
    : 0;

  return {
    ...state,
    trialCount: state.trialCount + 1,
    correctCount: state.correctCount + (result.correct ? 1 : 0),
    consecutiveCorrect: newConsecutive,
    hintStage1Count:
      state.hintStage1Count + (result.hintStageReached === 1 ? 1 : 0),
    hintStage2Count:
      state.hintStage2Count + (result.hintStageReached === 2 ? 1 : 0),
    hintStage3Count:
      state.hintStage3Count + (result.hintStageReached === 3 ? 1 : 0),
    roundTrialCount: state.roundTrialCount + 1,
    roundCorrectCount:
      state.roundCorrectCount + (result.correct ? 1 : 0),
    roundConsecutiveCorrect: roundConsecutive,
    roundHintStage3Count:
      state.roundHintStage3Count + (result.hintStageReached === 3 ? 1 : 0),
    trialResults: [...state.trialResults, result],
  };
}

export type CompleteRoundResult = {
  readonly state: SessionState;
  readonly adjustment: AdjustmentDirection;
};

export function completeRound(
  state: SessionState,
  iqBand: IQBand
): CompleteRoundResult {
  const roundResult = {
    consecutiveCorrect: state.roundConsecutiveCorrect,
    hintStage3Count: state.roundHintStage3Count,
    trialCount: state.roundTrialCount,
    correctCount: state.roundCorrectCount,
  };

  const staircaseResult = calculateNextDifficulty(
    state.gameType,
    state.currentParams,
    roundResult,
    state.staircaseState,
    iqBand
  );

  const adjustment: AdjustmentDirection =
    staircaseResult.state.lastDirection === "up"
      ? "up"
      : staircaseResult.state.lastDirection === "down"
        ? "down"
        : "none";

  const newState: SessionState = {
    ...state,
    phase: "playing",
    roundNumber: state.roundNumber + 1,
    currentParams: staircaseResult.params,
    staircaseState: staircaseResult.state,
    roundTrialCount: 0,
    roundCorrectCount: 0,
    roundConsecutiveCorrect: 0,
    roundHintStage3Count: 0,
  };

  return { state: newState, adjustment };
}

export function completeSession(state: SessionState): SessionSummary {
  const durationMs =
    new Date().getTime() - new Date(state.startedAt).getTime();

  return {
    childId: state.childId,
    gameType: state.gameType,
    totalTrials: state.trialCount,
    correctCount: state.correctCount,
    accuracy:
      state.trialCount > 0
        ? state.correctCount / state.trialCount
        : null,
    hintStage1Count: state.hintStage1Count,
    hintStage2Count: state.hintStage2Count,
    hintStage3Count: state.hintStage3Count,
    durationMs,
    finalParams: state.currentParams,
    anomalyScore: calculateAnomalyScore(state.trialResults),
    staircaseState: state.staircaseState,
  };
}
