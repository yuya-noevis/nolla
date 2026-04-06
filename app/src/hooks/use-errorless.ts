import { useState, useCallback } from "react";

export type HintStage = 0 | 1 | 2 | 3;

type ErrorlessState = {
  readonly wrongCount: number;
  readonly hintStage: HintStage;
};

/**
 * Manages errorless learning state for a single trial.
 *
 * Stage 0: No hint (first attempt)
 * Stage 1: Element returns to position silently (300ms)
 * Stage 2: Correct answer pulses gently (500ms)
 * Stage 3: Correct answer glows + navi character points
 *
 * Reset when moving to next trial.
 */
export function useErrorless() {
  const [state, setState] = useState<ErrorlessState>({
    wrongCount: 0,
    hintStage: 0,
  });

  const recordWrong = useCallback(() => {
    setState((prev) => {
      const newCount = prev.wrongCount + 1;
      const newStage = Math.min(newCount, 3) as HintStage;
      return { wrongCount: newCount, hintStage: newStage };
    });
  }, []);

  const resetTrial = useCallback(() => {
    setState({ wrongCount: 0, hintStage: 0 });
  }, []);

  return {
    hintStage: state.hintStage,
    recordWrong,
    resetTrial,
  };
}
