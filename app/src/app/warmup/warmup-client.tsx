"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { WarmupGame } from "@/components/warmup/warmup-game";
import { IntroOverlay } from "@/components/common/intro-overlay";
import {
  needsMotorBaseline,
  saveMotorBaseline,
} from "@/lib/session/motor-baseline-client";
import { calculateMotorBaseline } from "@/lib/session/motor-baseline";

export function WarmupClient() {
  const router = useRouter();
  const [showIntro, setShowIntro] = useState(true);
  const [skipCheckDone, setSkipCheckDone] = useState(false);

  // If baseline already recorded today, skip straight to /home.
  useEffect(() => {
    if (!needsMotorBaseline()) {
      router.replace("/home");
      return;
    }
    setSkipCheckDone(true);
  }, [router]);

  const handleIntroDismiss = useCallback(() => {
    setShowIntro(false);
  }, []);

  const handleComplete = useCallback(
    (reactionTimes: readonly number[]) => {
      const baseline = calculateMotorBaseline(reactionTimes, null);
      saveMotorBaseline(baseline.medianRt);
      router.replace("/home");
    },
    [router],
  );

  if (!skipCheckDone) {
    return <main className="absolute inset-0" style={{ background: "#000" }} />;
  }

  return (
    <main className="absolute inset-0 overflow-hidden">
      <WarmupGame onComplete={handleComplete} paused={showIntro} />
      {showIntro && <IntroOverlay variant="warmup" onDismiss={handleIntroDismiss} />}
    </main>
  );
}
