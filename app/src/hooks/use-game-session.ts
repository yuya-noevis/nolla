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
  endRound: () => void;
  endSession: () => SessionSummary | null;
};

const TRIALS_PER_ROUND = 5;

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
    setPhase("motor-baseline");
  }, [childId, gameType, initialParams]);

  const completeMotorBaselineFn = useCallback(
    (reactionTimes: readonly number[]) => {
      const baseline = calculateMotorBaseline(reactionTimes, previousMotorBaseline);
      setMotorBaseline(baseline);
      setState((prev) => (prev ? { ...prev, phase: "playing" } : null));
      setPhase("playing");
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

      if (result.correct) {
        setSessionStars((s) => s + 1);
      }

      roundTrialCountRef.current += 1;

      // Auto-complete round after N trials
      if (roundTrialCountRef.current >= TRIALS_PER_ROUND) {
        setPhase("round-transition");
      }
    },
    []
  );

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
    endRound,
    endSession: endSessionFn,
  };
}
