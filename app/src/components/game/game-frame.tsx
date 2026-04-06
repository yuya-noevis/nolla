"use client";

import { useState, useCallback, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { GameHeader } from "./game-header";
import { NaviCharacter } from "./navi-character";
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
      className="h-full w-full flex flex-col relative"
      style={{
        background: `linear-gradient(180deg, ${skyGradient[0]} 0%, ${skyGradient[1]} 70%, ${groundColor} 100%)`,
      }}
    >
      <GameHeader sessionStars={sessionStars} onBack={handleBack} />

      {/* Game area: 714px on iPad */}
      <div className="flex-1 relative overflow-hidden">
        {children}
      </div>

      {/* Footer spacer (NaviCharacter hidden in MVP — no function yet) */}
      <div className="h-[40px] shrink-0" />

      {showExitDialog && (
        <ExitDialog onContinue={handleContinue} onExit={handleExit} />
      )}
    </main>
  );
}
