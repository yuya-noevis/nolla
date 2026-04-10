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
  children: ReactNode;
};

export function GameFrame({
  skyGradient,
  groundColor,
  sessionStars,
  hintActive = false,
  roundNumber = 0,
  totalRounds = 5,
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
      className="h-full w-full flex flex-col relative overflow-hidden"
      style={{
        background: `radial-gradient(ellipse at 50% 30%, ${skyGradient[1]} 0%, ${skyGradient[0]} 50%, #0B0B30 100%)`,
      }}
    >
      {/* Subtle nebula overlays */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          background: `radial-gradient(ellipse at 20% 25%, ${skyGradient[1]}60 0%, transparent 50%), radial-gradient(ellipse at 80% 70%, ${skyGradient[0]}40 0%, transparent 50%)`,
        }}
      />

      {/* Sparse star field */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: i < 5 ? 2 : 1,
              height: i < 5 ? 2 : 1,
              background: `rgba(255,255,255,${0.2 + (i % 3) * 0.15})`,
              left: `${(i * 37 + 13) % 100}%`,
              top: `${(i * 23 + 7) % 100}%`,
            }}
          />
        ))}
      </div>

      <GameHeader sessionStars={sessionStars} onBack={handleBack} roundNumber={roundNumber} totalRounds={totalRounds} />

      {/* Game area — fill all remaining space */}
      <div className="flex-1 relative overflow-hidden z-10 min-h-0">
        {children}
      </div>

      {showExitDialog && (
        <ExitDialog onContinue={handleContinue} onExit={handleExit} />
      )}
    </main>
  );
}
