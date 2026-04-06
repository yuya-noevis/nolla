"use client";

import { useState, useCallback, useMemo, useEffect } from "react";
import type { SortingParams } from "@/types/domain";
import type { HintStage } from "@/hooks/use-errorless";
import { generateSortingRound } from "@/lib/games/sorting/generate";

type Props = {
  hintStage: HintStage;
  onTrialResult: (correct: boolean, reactionTimeMs: number) => void;
  onRoundComplete: () => void;
};

const DEFAULT_PARAMS: SortingParams = {
  categories: 2,
  items: 4,
  criterion: "color",
  switching: "none",
};

export function SortingGame({ hintStage, onTrialResult, onRoundComplete }: Props) {
  const round = useMemo(() => generateSortingRound(DEFAULT_PARAMS), []);
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [trialStart] = useState(Date.now());

  const currentItem = round.items[currentItemIndex];

  const handleCategoryTap = useCallback(
    (categoryId: string) => {
      if (!currentItem) return;

      const correctValue = currentItem.attributes[round.criterion];
      const selectedCategory = round.categories.find((c) => c.id === categoryId);
      const correct = selectedCategory?.matchValue === correctValue;
      const rt = Date.now() - trialStart;

      onTrialResult(correct, rt);

      if (correct) {
        setCurrentItemIndex((i) => i + 1);
      }
    },
    [currentItem, round, currentItemIndex, trialStart, onTrialResult]
  );

  useEffect(() => {
    if (!currentItem) {
      const timer = setTimeout(() => onRoundComplete(), 800);
      return () => clearTimeout(timer);
    }
  }, [currentItem, onRoundComplete]);

  if (!currentItem) {
    return (
      <div className="glass-overlay px-8 py-6 text-center">
        <p className="text-lg font-bold text-nolla-text">ラウンドクリア</p>
      </div>
    );
  }

  const correctCategory = round.categories.find(
    (c) => c.matchValue === currentItem.attributes[round.criterion]
  );

  return (
    <div className="flex flex-col items-center gap-8">
      {/* Current item to sort */}
      <div
        className="w-24 h-24 rounded-2xl flex items-center justify-center shadow-elevated"
        style={{ background: currentItem.attributes.color ?? "var(--color-mc-oak-light)" }}
      >
        <span className="text-3xl font-bold text-white drop-shadow-md select-none">
          {currentItem.attributes.shape?.charAt(0).toUpperCase() ?? "?"}
        </span>
      </div>

      {/* Category boxes */}
      <div className="flex gap-6">
        {round.categories.map((cat) => {
          const isHintTarget = hintStage >= 2 && cat.id === correctCategory?.id;
          const isHintGlow = hintStage >= 3 && cat.id === correctCategory?.id;

          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => handleCategoryTap(cat.id)}
              className={`touch-target-child w-28 h-28 rounded-2xl flex items-center justify-center transition-all ${
                isHintTarget ? "animate-pulse-gentle" : ""
              } ${isHintGlow ? "ring-4 ring-[var(--color-feedback-correct)]/50" : ""}`}
              style={{
                background: "linear-gradient(135deg, var(--color-mc-oak-light), var(--color-mc-oak))",
                border: "3px solid var(--color-mc-dark-oak)",
                boxShadow: "0 4px 0 var(--color-mc-dark-oak-light)",
              }}
            >
              <span className="text-sm font-bold text-white drop-shadow-sm select-none">
                {cat.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Progress */}
      <div className="flex gap-1.5">
        {round.items.map((_, i) => (
          <div
            key={i}
            className={`w-2.5 h-2.5 rounded-full ${
              i < currentItemIndex
                ? "bg-[var(--color-feedback-correct)]"
                : i === currentItemIndex
                  ? "bg-white"
                  : "bg-white/30"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
