"use client";

import { useState, useCallback } from "react";

type TutorialStep = 1 | 2 | 3 | 4;

type Props = {
  onComplete: () => void;
};

/**
 * 4-stage prompting reduction tutorial (M3).
 * No text. Animation-driven only.
 *
 * Step 1: Full guide — target glows + hand animation
 * Step 2: Reduced guide — target glows briefly
 * Step 3: Minimal guide — target flashes
 * Step 4: No guide — normal play
 *
 * Each step: child taps correct target → positive feedback → next step.
 * After Step 4 success → tutorial complete.
 */
export function TutorialOverlay({ onComplete }: Props) {
  const [step, setStep] = useState<TutorialStep>(1);

  const handleStepComplete = useCallback(() => {
    if (step < 4) {
      setStep((step + 1) as TutorialStep);
    } else {
      onComplete();
    }
  }, [step, onComplete]);

  return (
    <div className="absolute inset-0 z-40">
      {/* Darkened overlay for steps 1-2 */}
      {step <= 2 && (
        <div className="absolute inset-0 bg-black/30 pointer-events-none" />
      )}

      {/* Tutorial progress dots */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 flex gap-2">
        {[1, 2, 3, 4].map((s) => (
          <div
            key={s}
            className={`w-3 h-3 rounded-full transition-all ${
              s <= step ? "bg-white" : "bg-white/30"
            }`}
          />
        ))}
      </div>

      {/* Hand animation for step 1 */}
      {step === 1 && (
        <div className="absolute bottom-24 right-24 animate-pulse-gentle">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="white" opacity="0.9">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
            <circle cx="12" cy="12" r="4" />
          </svg>
        </div>
      )}

      {/* Invisible tap area for tutorial (game-specific target will be placed here) */}
      <button
        type="button"
        onClick={handleStepComplete}
        className="absolute inset-0 opacity-0"
        aria-label={`Tutorial step ${step}`}
      />
    </div>
  );
}
