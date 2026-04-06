"use client";

import { useState, useCallback, useMemo, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import type { GameType, DifficultyParams, MemoryMatchParams, TrialResult } from "@/types/domain";
import type { IQBand } from "@/types/user";
import { GameFrame } from "@/components/game/game-frame";
import { FeedbackOverlay } from "@/components/game/feedback-overlay";
import { MotorBaselineMeasurement } from "@/components/game/motor-baseline";
import { CardGrid } from "@/components/game/memory-match/card-grid";
import { SortingGame } from "@/components/game/sorting/sorting-game";
import { VisualSearchGame } from "@/components/game/visual-search/visual-search-game";
import { CorsiBlockGame } from "@/components/game/corsi-block/corsi-block-game";
import { generateMemoryMatchBoard } from "@/lib/games/memory-match/generate";
import { useErrorless } from "@/hooks/use-errorless";
import { useGameSession } from "@/hooks/use-game-session";

type Props = {
  gameType: GameType;
  skyGradient: readonly [string, string];
  groundColor: string;
  childId: string;
  iqBand: IQBand;
  initialParams: DifficultyParams;
  previousMotorBaseline: number | null;
};

function getSavedMotorBaseline(): number | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem("nolla_motor_baseline");
    if (!raw) return null;
    const { value, date } = JSON.parse(raw);
    // Reuse if saved today
    const today = new Date().toISOString().slice(0, 10);
    return date === today ? value : null;
  } catch {
    return null;
  }
}

function saveMotorBaseline(medianRt: number): void {
  if (typeof window === "undefined") return;
  const today = new Date().toISOString().slice(0, 10);
  localStorage.setItem("nolla_motor_baseline", JSON.stringify({ value: medianRt, date: today }));
}

export function GameSession({
  gameType,
  skyGradient,
  groundColor,
  childId,
  iqBand,
  initialParams,
  previousMotorBaseline,
}: Props) {
  const router = useRouter();
  const [showFeedback, setShowFeedback] = useState<"correct" | "star" | null>(null);
  const { hintStage, recordWrong, resetTrial } = useErrorless();

  // Use saved baseline from today if available
  const effectiveBaseline = previousMotorBaseline ?? getSavedMotorBaseline();

  const session = useGameSession(
    childId,
    gameType,
    initialParams,
    iqBand,
    effectiveBaseline
  );

  // Start session on mount
  useEffect(() => {
    session.startSession();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Save motor baseline when measured
  useEffect(() => {
    if (session.motorBaseline?.medianRt) {
      saveMotorBaseline(session.motorBaseline.medianRt);
    }
  }, [session.motorBaseline]);

  const handleTrialResult = useCallback(
    (correct: boolean, reactionTimeMs: number) => {
      const result: TrialResult = {
        correct,
        reactionTimeMs,
        hintStageReached: hintStage,
        gameData: {},
      };

      session.handleTrialResult(result);

      if (correct) {
        setShowFeedback("correct");
        resetTrial();
      } else {
        recordWrong();
      }
    },
    [hintStage, session, resetTrial, recordWrong]
  );

  const handleFeedbackDone = useCallback(() => {
    setShowFeedback(null);
  }, []);

  // Track whether first round has started
  const hasPlayedRef = useRef(false);

  // Auto-advance from round intro (show "ラウンド N" then start playing)
  useEffect(() => {
    if (session.phase === "round-intro") {
      const timer = setTimeout(() => {
        if (!hasPlayedRef.current) {
          hasPlayedRef.current = true;
          session.startPlaying();
        } else {
          session.advanceRound();
        }
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [session.phase]); // eslint-disable-line react-hooks/exhaustive-deps

  // Handle session completion
  useEffect(() => {
    if (session.phase === "completed") {
      router.push(`/reward?game=${gameType}&stars=${session.sessionStars}`);
    }
  }, [session.phase, gameType, session.sessionStars, router]);

  // Generate game content based on current params
  const memoryBoard = useMemo(
    () => gameType === "memory-match"
      ? generateMemoryMatchBoard(session.currentParams as MemoryMatchParams)
      : null,
    [gameType, session.currentParams]
  );

  return (
    <GameFrame
      skyGradient={skyGradient}
      groundColor={groundColor}
      sessionStars={session.sessionStars}
      hintActive={hintStage >= 3}
    >
      <div className="h-full flex items-center justify-center">
        {/* Motor baseline phase */}
        {session.phase === "motor-baseline" && (
          <MotorBaselineMeasurement
            onComplete={session.completeMotorBaseline}
          />
        )}

        {/* Playing phase */}
        {session.phase === "playing" && (
          <>
            {gameType === "memory-match" && memoryBoard && (
              <CardGrid
                board={memoryBoard}
                cardSize={(session.currentParams as MemoryMatchParams).cardSize}
                flipDelay={(session.currentParams as MemoryMatchParams).flipDelay}
                hintStage={hintStage}
                onTrialResult={handleTrialResult}
                onRoundComplete={session.completeRoundFromGame}
              />
            )}

            {gameType === "sorting" && (
              <SortingGame
                hintStage={hintStage}
                onTrialResult={handleTrialResult}
                onRoundComplete={session.completeRoundFromGame}
              />
            )}

            {gameType === "visual-search" && (
              <VisualSearchGame
                hintStage={hintStage}
                onTrialResult={handleTrialResult}
                onRoundComplete={session.completeRoundFromGame}
              />
            )}

            {gameType === "corsi-block" && (
              <CorsiBlockGame
                hintStage={hintStage}
                onTrialResult={handleTrialResult}
                onRoundComplete={session.completeRoundFromGame}
              />
            )}
          </>
        )}

        {/* Round intro (shown before each round starts) */}
        {session.phase === "round-intro" && (
          <div className="flex gap-4">
            {Array.from({ length: 3 }, (_, i) => {
              const currentRound = hasPlayedRef.current ? session.roundNumber + 1 : session.roundNumber;
              const isDone = i < currentRound - 1;
              const isCurrent = i === currentRound - 1;
              return (
                <div
                  key={i}
                  className={`w-6 h-6 rounded-full transition-all ${
                    isCurrent ? "scale-125" : ""
                  }`}
                  style={{
                    background: isDone
                      ? "var(--color-feedback-correct)"
                      : isCurrent
                        ? "var(--color-mc-glowstone)"
                        : "rgba(255,255,255,0.3)",
                    boxShadow: isCurrent ? "0 0 16px rgba(218,165,32,0.6)" : "none",
                  }}
                />
              );
            })}
          </div>
        )}
      </div>

      {showFeedback && (
        <FeedbackOverlay type={showFeedback} onComplete={handleFeedbackDone} />
      )}
    </GameFrame>
  );
}
