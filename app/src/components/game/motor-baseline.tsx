"use client";

import { useState, useCallback, useEffect, useRef } from "react";

const TOTAL_TRIALS = 10;
const MIN_DELAY = 800;
const MAX_DELAY = 2500;

type Props = {
  onComplete: (reactionTimes: readonly number[]) => void;
};

type Phase = "waiting" | "ready" | "target" | "done";

export function MotorBaselineMeasurement({ onComplete }: Props) {
  const [phase, setPhase] = useState<Phase>("waiting");
  const [trialIndex, setTrialIndex] = useState(0);
  const [reactionTimes, setReactionTimes] = useState<readonly number[]>([]);
  const targetShownAtRef = useRef<number>(0);

  // Start first trial after short delay
  useEffect(() => {
    if (phase === "waiting") {
      const timer = setTimeout(() => setPhase("ready"), 1000);
      return () => clearTimeout(timer);
    }
  }, [phase]);

  // Show target after random delay
  useEffect(() => {
    if (phase !== "ready") return;

    const delay = MIN_DELAY + Math.random() * (MAX_DELAY - MIN_DELAY);
    const timer = setTimeout(() => {
      targetShownAtRef.current = Date.now();
      setPhase("target");
    }, delay);

    return () => clearTimeout(timer);
  }, [phase]);

  // Check completion
  useEffect(() => {
    if (phase === "done") {
      onComplete(reactionTimes);
    }
  }, [phase, reactionTimes, onComplete]);

  const handleTap = useCallback(() => {
    if (phase !== "target") return;

    const rt = Date.now() - targetShownAtRef.current;
    const newRts = [...reactionTimes, rt];
    setReactionTimes(newRts);

    if (newRts.length >= TOTAL_TRIALS) {
      setPhase("done");
    } else {
      setTrialIndex((i) => i + 1);
      setPhase("ready");
    }
  }, [phase, reactionTimes]);

  return (
    <div className="h-full flex flex-col items-center justify-center gap-6">
      {/* Progress dots */}
      <div className="flex gap-2">
        {Array.from({ length: TOTAL_TRIALS }).map((_, i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-full ${
              i < reactionTimes.length
                ? "bg-[var(--color-feedback-correct)]"
                : "bg-white/30"
            }`}
          />
        ))}
      </div>

      {/* Target area */}
      <button
        type="button"
        onClick={handleTap}
        disabled={phase !== "target"}
        className="w-32 h-32 rounded-full transition-all duration-150"
        style={{
          background:
            phase === "target"
              ? "var(--color-mc-glowstone)"
              : "var(--color-mc-stone)",
          boxShadow:
            phase === "target"
              ? "0 0 30px rgba(218,165,32,0.6)"
              : "0 4px 0 var(--color-mc-dark-oak-light)",
          border: "4px solid var(--color-mc-dark-oak)",
          transform: phase === "target" ? "scale(1.1)" : "scale(1)",
        }}
        aria-label={phase === "target" ? "Tap now" : "Wait"}
      />
    </div>
  );
}
