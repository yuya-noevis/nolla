"use client";

import { useState, useCallback, useMemo, useEffect } from "react";
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

  const session = useGameSession(
    childId,
    gameType,
    initialParams,
    iqBand,
    previousMotorBaseline
  );

  // Start session on mount
  useEffect(() => {
    session.startSession();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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

  // Auto-advance from round transition
  useEffect(() => {
    if (session.phase === "round-transition") {
      const timer = setTimeout(() => session.endRound(), 500);
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
              />
            )}

            {gameType === "sorting" && (
              <SortingGame
                hintStage={hintStage}
                onTrialResult={handleTrialResult}
              />
            )}

            {gameType === "visual-search" && (
              <VisualSearchGame
                hintStage={hintStage}
                onTrialResult={handleTrialResult}
              />
            )}

            {gameType === "corsi-block" && (
              <CorsiBlockGame
                hintStage={hintStage}
                onTrialResult={handleTrialResult}
              />
            )}
          </>
        )}

        {/* Round transition */}
        {session.phase === "round-transition" && (
          <div className="glass-overlay px-8 py-6">
            <p className="text-lg font-bold text-nolla-text">
              Round {session.roundNumber}
            </p>
          </div>
        )}
      </div>

      {showFeedback && (
        <FeedbackOverlay type={showFeedback} onComplete={handleFeedbackDone} />
      )}
    </GameFrame>
  );
}
