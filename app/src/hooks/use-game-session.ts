import { useState, useCallback, useRef } from "react";
import type {
  GameType,
  DifficultyParams,
  SessionState,
  TrialResult,
  SessionSummary,
} from "@/types/domain";
import type { IQBand } from "@/types/user";
import {
  createSessionState,
  recordTrialResult,
  completeRound,
  completeSession,
} from "@/lib/session/session-state";
import { calculateMotorBaseline } from "@/lib/session/motor-baseline";
import type { MotorBaseline } from "@/types/scoring";

type SessionPhaseUI =
  | "motor-baseline"
  | "round-intro"
  | "playing"
  | "round-transition"
  | "completed";

type GameSessionHook = {
  readonly phase: SessionPhaseUI;
  readonly sessionState: SessionState | null;
  readonly currentParams: DifficultyParams;
  readonly sessionStars: number;
  readonly roundNumber: number;
  readonly motorBaseline: MotorBaseline | null;
  startSession: () => void;
  completeMotorBaseline: (reactionTimes: readonly number[]) => void;
  handleTrialResult: (result: TrialResult) => void;
  completeRoundFromGame: () => void;
  startPlaying: () => void;
  advanceRound: () => void;
  endSession: () => SessionSummary | null;
};

const MAX_ROUNDS = 3;

export function useGameSession(
  childId: string,
  gameType: GameType,
  initialParams: DifficultyParams,
  iqBand: IQBand,
  previousMotorBaseline: number | null
): GameSessionHook {
  const [state, setState] = useState<SessionState | null>(null);
  const [phase, setPhase] = useState<SessionPhaseUI>("motor-baseline");
  const [sessionStars, setSessionStars] = useState(0);
  const [motorBaseline, setMotorBaseline] = useState<MotorBaseline | null>(null);
  const roundTrialCountRef = useRef(0);
  const roundCorrectCountRef = useRef(0);

  const startSession = useCallback(() => {
    const initial = createSessionState(childId, gameType, initialParams);
    setState(initial);
    // Skip motor baseline if we already have one (from earlier today)
    if (previousMotorBaseline != null) {
      const reused: MotorBaseline = {
        reactionTimes: [],
        medianRt: previousMotorBaseline,
        weightedBaseline: previousMotorBaseline,
      };
      setMotorBaseline(reused);
      setPhase("round-intro");
    } else {
      setPhase("motor-baseline");
    }
  }, [childId, gameType, initialParams, previousMotorBaseline]);

  const completeMotorBaselineFn = useCallback(
    (reactionTimes: readonly number[]) => {
      const baseline = calculateMotorBaseline(reactionTimes, previousMotorBaseline);
      setMotorBaseline(baseline);
      setState((prev) => (prev ? { ...prev, phase: "playing" } : null));
      setPhase("round-intro");
      roundTrialCountRef.current = 0;
      roundCorrectCountRef.current = 0;
    },
    [previousMotorBaseline]
  );

  const handleTrialResult = useCallback(
    (result: TrialResult) => {
      setState((prev) => {
        if (!prev) return null;
        return recordTrialResult(prev, result);
      });

      roundTrialCountRef.current += 1;
      if (result.correct) {
        roundCorrectCountRef.current += 1;
      }
    },
    []
  );

  const completeRoundFromGame = useCallback(() => {
    // Stars based on round performance
    const totalTrials = roundTrialCountRef.current;
    const correctCount = roundCorrectCountRef.current;
    let roundStars = 1; // participation
    if (totalTrials > 0 && correctCount === totalTrials) {
      roundStars = 3; // all correct
    } else if (totalTrials > 0 && correctCount >= totalTrials * 0.5) {
      roundStars = 2; // >50% correct
    }
    setSessionStars((s) => s + roundStars);
    roundTrialCountRef.current = 0;
    roundCorrectCountRef.current = 0;

    // Check if we've done enough rounds to complete the session
    const currentRound = state?.roundNumber ?? 1;
    if (currentRound >= MAX_ROUNDS) {
      setPhase("completed");
    } else {
      setPhase("round-intro");
    }
  }, [state?.roundNumber]);

  const startPlaying = useCallback(() => {
    setPhase("playing");
  }, []);

  const advanceRound = useCallback(() => {
    setState((prev) => {
      if (!prev) return null;
      const { state: newState } = completeRound(prev, iqBand);
      return newState;
    });
    roundTrialCountRef.current = 0;
    roundCorrectCountRef.current = 0;
    setPhase("playing");
  }, [iqBand]);

  const endSessionFn = useCallback((): SessionSummary | null => {
    if (!state) return null;
    const summary = completeSession(state);
    setPhase("completed");
    return summary;
  }, [state]);

  return {
    phase,
    sessionState: state,
    currentParams: state?.currentParams ?? initialParams,
    sessionStars,
    roundNumber: state?.roundNumber ?? 1,
    motorBaseline,
    startSession,
    completeMotorBaseline: completeMotorBaselineFn,
    handleTrialResult,
    completeRoundFromGame,
    startPlaying,
    advanceRound,
    endSession: endSessionFn,
  };
}
