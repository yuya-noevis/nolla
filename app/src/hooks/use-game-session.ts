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
import { shouldAdvanceCriterion } from "@/lib/staircase/criterion";
import type { SortingParams, SortingCriterion } from "@/types/domain";
import {
  persistSessionStart,
  persistRound,
  persistTrial,
  persistSessionEnd,
  persistMotorBaseline,
  persistStars,
} from "@/lib/session/persist";
import { finalizeSessionNci, type FinalizeTrial } from "@/lib/nci/finalize-session";
import { refreshBaselineProgress } from "@/lib/session/baseline-progress";
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

const LAST_PARAMS_KEY = (childId: string, gameType: GameType) =>
  `nolla_last_params_${childId}_${gameType}`;

const SORTING_HISTORY_KEY = (childId: string) =>
  `nolla_sorting_history_${childId}`;

const SORTING_CRITERIA_ORDER: readonly SortingCriterion[] = [
  "color",
  "shape",
  "size",
  "category",
  "multi",
];

type SortingSessionRecord = {
  readonly accuracy: number;
  readonly hintStage3Rate: number;
  readonly criterion: SortingCriterion;
};

function loadSortingHistory(childId: string): readonly SortingSessionRecord[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(SORTING_HISTORY_KEY(childId));
    if (!raw) return [];
    return JSON.parse(raw) as SortingSessionRecord[];
  } catch {
    return [];
  }
}

function saveSortingHistory(
  childId: string,
  history: readonly SortingSessionRecord[]
): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(SORTING_HISTORY_KEY(childId), JSON.stringify(history));
  } catch {
    // ignore
  }
}

function nextCriterion(current: SortingCriterion): SortingCriterion {
  const idx = SORTING_CRITERIA_ORDER.indexOf(current);
  if (idx < 0 || idx >= SORTING_CRITERIA_ORDER.length - 1) return current;
  return SORTING_CRITERIA_ORDER[idx + 1];
}

function loadLastParams(
  childId: string,
  gameType: GameType
): DifficultyParams | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(LAST_PARAMS_KEY(childId, gameType));
    if (!raw) return null;
    return JSON.parse(raw) as DifficultyParams;
  } catch {
    return null;
  }
}

function saveLastParams(
  childId: string,
  gameType: GameType,
  params: DifficultyParams
): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(
      LAST_PARAMS_KEY(childId, gameType),
      JSON.stringify(params)
    );
  } catch {
    // ignore
  }
}

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
  const sessionIdRef = useRef<string | null>(null);
  // BUG-15 fix: store the in-flight persistRound promise so that trials played
  // immediately after advanceRound attach to the *new* round_id, not the
  // previous one. handleTrialResult awaits this before calling persistTrial.
  const roundIdPromiseRef = useRef<Promise<string | null>>(Promise.resolve(null));
  const trialNumberRef = useRef(0);
  const roundTrialCountRef = useRef(0);
  const roundCorrectCountRef = useRef(0);
  // Trial buffer for session-end NCI finalization (BUG-13 fix).
  // Streamed to DB per-trial; this in-memory copy is consumed once at endSession.
  const nciTrialBufferRef = useRef<FinalizeTrial[]>([]);

  const startSession = useCallback(() => {
    // 前回セッションの最終パラメータを復元
    const restored = loadLastParams(childId, gameType);
    const startParams = restored ?? initialParams;
    const initial = createSessionState(childId, gameType, startParams);
    setState(initial);
    sessionIdRef.current = null;
    roundIdPromiseRef.current = Promise.resolve(null);
    trialNumberRef.current = 0;
    nciTrialBufferRef.current = [];

    // セッションをDBに記録 + 初回ラウンドIDを promise チェーンで繋ぐ
    roundIdPromiseRef.current = persistSessionStart(
      childId,
      gameType,
      startParams
    ).then((id) => {
      sessionIdRef.current = id;
      if (!id) return null;
      return persistRound(id, 1, startParams);
    });

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

      // 運動ベースラインをDBに記録
      const sid = sessionIdRef.current;
      if (sid) {
        void persistMotorBaseline(
          childId,
          sid,
          reactionTimes,
          baseline.medianRt,
          baseline.weightedBaseline
        );
      }
    },
    [previousMotorBaseline, childId]
  );

  const currentParamsRef = useRef<DifficultyParams>(initialParams);
  const handleTrialResult = useCallback(
    (result: TrialResult) => {
      // Snapshot the params the child actually just played on (BEFORE the
      // staircase bumps for the next trial). This is what the IRT update
      // needs — the b that produced this y.
      const playedParams = currentParamsRef.current;

      setState((prev) => {
        if (!prev) return null;
        const next = recordTrialResult(prev, result);
        currentParamsRef.current = next.currentParams;
        return next;
      });

      roundTrialCountRef.current += 1;
      if (result.correct) {
        roundCorrectCountRef.current += 1;
      }

      // Buffer trial for session-end NCI finalization
      nciTrialBufferRef.current = [
        ...nciTrialBufferRef.current,
        {
          correct: result.correct,
          difficultyParams: playedParams,
        },
      ];

      // DB persistence — await the in-flight round promise so the trial
      // attaches to the *current* round_id, not a stale one (BUG-15).
      trialNumberRef.current += 1;
      const trialNumber = trialNumberRef.current;
      const presentedAt = new Date(Date.now() - result.reactionTimeMs).toISOString();
      const respondedAt = new Date().toISOString();
      const captured = {
        correct: result.correct,
        reactionTimeMs: result.reactionTimeMs,
        hintStageReached: result.hintStageReached,
        gameData: result.gameData,
      };
      void roundIdPromiseRef.current.then((rid) => {
        const sid = sessionIdRef.current;
        if (!sid || !rid) return;
        void persistTrial({
          roundId: rid,
          sessionId: sid,
          childId,
          trialNumber,
          gameType,
          correct: captured.correct,
          reactionTimeMs: captured.reactionTimeMs,
          hintStageReached: captured.hintStageReached,
          gameData: captured.gameData,
          difficultyParams: playedParams,
          irtB: null,
          presentedAt,
          respondedAt,
        });
      });
    },
    [childId, gameType]
  );

  const completeRoundFromGame = useCallback(() => {
    const totalTrials = roundTrialCountRef.current;
    const correctCount = roundCorrectCountRef.current;
    const wrongCount = totalTrials - correctCount;

    let roundStars = 1;

    if (totalTrials > 0 && correctCount === totalTrials) {
      roundStars = 3;
    } else if (totalTrials > 0 && correctCount >= totalTrials * 0.8) {
      roundStars = 2;
    }

    setSessionStars((s) => s + roundStars);
    roundTrialCountRef.current = 0;
    roundCorrectCountRef.current = 0;

    const currentRound = state?.roundNumber ?? 1;
    if (currentRound >= MAX_ROUNDS) {
      setPhase("completed");
    } else {
      setPhase("round-intro");
    }
  }, [state?.roundNumber, gameType]);

  const startPlaying = useCallback(() => {
    setPhase("playing");
  }, []);

  const advanceRound = useCallback(() => {
    // BUG-15 fix: compute the new round state synchronously *outside* setState
    // so the DB-side roundNumber/params read is reliable. Reading from a variable
    // closed over by the updater was racy — React doesn't execute updaters
    // synchronously, so persistRound saw the initial (0 / null) values and all
    // rounds got persisted as round_number = 1.
    const prev = state;
    if (!prev) return;
    const { state: newState } = completeRound(prev, iqBand);
    currentParamsRef.current = newState.currentParams;
    setState(newState);
    roundTrialCountRef.current = 0;
    roundCorrectCountRef.current = 0;
    setPhase("playing");

    const sid = sessionIdRef.current;
    if (sid) {
      // Chain onto the previous promise so trials in-flight still resolve
      // against the correct (previous) round_id before switching.
      roundIdPromiseRef.current = roundIdPromiseRef.current.then(() =>
        persistRound(sid, newState.roundNumber, newState.currentParams)
      );
    }
  }, [iqBand, state]);

  const endSessionFn = useCallback((): SessionSummary | null => {
    if (!state) return null;
    // 最終ラウンド分のStaircaseを反映してから集計
    const { state: postFinal } = completeRound(state, iqBand);
    const summary = completeSession({ ...postFinal, currentParams: postFinal.currentParams });
    setPhase("completed");

    // 最終パラメータをlocalStorageに保存(=次回セッション初期値)
    let paramsToSave: DifficultyParams = postFinal.currentParams;

    // Sorting: criterion advancement (was previously dead code — wired in here)
    if (gameType === "sorting") {
      const sp = paramsToSave as SortingParams;
      const accuracy =
        summary.totalTrials > 0
          ? summary.correctCount / summary.totalTrials
          : 0;
      const hintStage3Rate =
        summary.totalTrials > 0
          ? summary.hintStage3Count / summary.totalTrials
          : 0;
      const history = loadSortingHistory(childId);
      const updated = [
        ...history,
        { accuracy, hintStage3Rate, criterion: sp.criterion },
      ].slice(-10);

      // Only count history entries from the *current* criterion towards advance.
      const sameLevel = updated.filter((h) => h.criterion === sp.criterion);
      if (shouldAdvanceCriterion(sameLevel)) {
        const next = nextCriterion(sp.criterion);
        if (next !== sp.criterion) {
          // Reset structural params for the new criterion to its starting point.
          paramsToSave = {
            categories: 2,
            items: 4,
            criterion: next,
            switching: "none",
          } satisfies SortingParams;
        }
      }
      saveSortingHistory(childId, updated);
    }

    saveLastParams(childId, gameType, paramsToSave);

    // セッション終了をDBに記録
    const sid = sessionIdRef.current;
    if (sid) {
      void persistSessionEnd(sid, summary).then(() => {
        // BUG-13: NCI θ更新 + スナップショット永続化を駆動
        const trials = nciTrialBufferRef.current;
        if (trials.length > 0) {
          void finalizeSessionNci(childId, gameType, trials);
        }
        // BUG-14: ベースライン進捗の再計算
        void refreshBaselineProgress(childId);
      });
      if (sessionStars > 0) {
        void persistStars(childId, sid, sessionStars, "session_complete");
      }
    }

    return summary;
  }, [state, childId, gameType, sessionStars, iqBand]);

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
