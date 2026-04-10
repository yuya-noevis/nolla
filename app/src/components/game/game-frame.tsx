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
  children: ReactNode;
};

export function GameFrame({
  skyGradient,
  groundColor,
  sessionStars,
  hintActive = false,
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
        background: `radial-gradient(ellipse at 50% 20%, ${skyGradient[1]} 0%, ${skyGradient[0]} 60%, #0A0A2E 100%)`,
      }}
    >
      {/* Subtle nebula overlay (dimmed for gameplay focus) */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          background: `radial-gradient(ellipse at 20% 25%, ${skyGradient[1]}60 0%, transparent 50%)`,
        }}
      />

      {/* Sparse star field */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: i < 3 ? 2 : 1,
              height: i < 3 ? 2 : 1,
              background: "rgba(255,255,255,0.35)",
              left: `${(i * 41 + 17) % 100}%`,
              top: `${(i * 29 + 11) % 60}%`,
            }}
          />
        ))}
      </div>

      {/* Ground surface (planet surface at bottom) */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{
          height: "22%",
          background: `linear-gradient(180deg, transparent 0%, ${groundColor}80 30%, ${groundColor} 100%)`,
          borderTop: "1px solid rgba(255,255,255,0.05)",
        }}
      />

      {/* Curved horizon effect */}
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: "18%",
          left: "-5%",
          right: "-5%",
          height: "8%",
          background: `radial-gradient(ellipse at 50% 100%, ${groundColor}60 0%, transparent 70%)`,
        }}
      />

      <GameHeader sessionStars={sessionStars} onBack={handleBack} />

      {/* Game area */}
      <div className="flex-1 relative overflow-hidden z-10">
        {children}
      </div>

      {/* Footer spacer */}
      <div className="h-[40px] shrink-0" />

      {showExitDialog && (
        <ExitDialog onContinue={handleContinue} onExit={handleExit} />
      )}
    </main>
  );
}
