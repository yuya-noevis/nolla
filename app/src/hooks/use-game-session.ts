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
  endRound: () => void;
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
    },
    []
  );

  const STARS_PER_ROUND = 3;

  const completeRoundFromGame = useCallback(() => {
    roundTrialCountRef.current = 0;
    setSessionStars((s) => s + STARS_PER_ROUND);

    // Check if we've done enough rounds to complete the session
    const currentRound = state?.roundNumber ?? 1;
    if (currentRound >= MAX_ROUNDS) {
      setPhase("completed");
    } else {
      setPhase("round-intro");
    }
  }, [state?.roundNumber]);

  const endRound = useCallback(() => {
    setState((prev) => {
      if (!prev) return null;
      const { state: newState } = completeRound(prev, iqBand);
      return newState;
    });
    roundTrialCountRef.current = 0;
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
    endRound,
    endSession: endSessionFn,
  };
}
