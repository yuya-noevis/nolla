"use client";

import { useState, useCallback, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { GameHeader } from "./game-header";
import { ExitDialog } from "./exit-dialog";

type Props = {
  skyGradient: readonly [string, string];
  groundColor: string;
  sessionStars: number;
  hintActive?: boolean;
  roundNumber?: number;
  totalRounds?: number;
  currentUnitInRound?: number;
  totalUnitsInRound?: number;
  children: ReactNode;
};

export function GameFrame({
  skyGradient,
  groundColor,
  sessionStars,
  hintActive = false,
  roundNumber = 0,
  totalRounds = 5,
  currentUnitInRound = 0,
  totalUnitsInRound = 1,
  children,
}: Props) {
  const router = useRouter();
  const [showExitDialog, setShowExitDialog] = useState(false);

  const handleBack = useCallback(() => {
    setShowExitDialog(true);
  }, []);

  const handleContinue = useCallback(() => {
    setShowExitDialog(false);
  }, []);

  const handleExit = useCallback(() => {
    router.push("/home");
  }, [router]);

  return (
    <main
      className="absolute inset-0 flex flex-col overflow-hidden"
      style={{
        background: `linear-gradient(180deg, ${skyGradient[0]} 0%, ${skyGradient[1]} 38%, ${skyGradient[1]} 58%, ${groundColor} 100%)`,
      }}
    >
      {/* Sparse stars (upper 60% only, like mockup) */}
      <div className="absolute top-0 left-0 right-0 pointer-events-none" style={{ height: "60%" }}>
        {Array.from({ length: 25 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-pulse"
            style={{
              width: 1 + Math.random() * 2,
              height: 1 + Math.random() * 2,
              background: "white",
              opacity: 0.3 + (i % 3) * 0.2,
              left: `${(i * 41 + 13) % 100}%`,
              top: `${(i * 29 + 7) % 100}%`,
              animationDuration: `${2 + (i % 4)}s`,
              animationDelay: `${(i * 0.3) % 3}s`,
            }}
          />
        ))}
      </div>

      <GameHeader
        sessionStars={sessionStars}
        onBack={handleBack}
        roundNumber={roundNumber}
        totalRounds={totalRounds}
        currentUnitInRound={currentUnitInRound}
        totalUnitsInRound={totalUnitsInRound}
      />

      {/* Game area — fill all remaining space, centered, no overflow */}
      <div className="flex-1 relative z-10 min-h-0 flex items-center justify-center overflow-hidden">
        {children}
      </div>

      {showExitDialog && (
        <ExitDialog onContinue={handleContinue} onExit={handleExit} />
      )}
    </main>
  );
}
