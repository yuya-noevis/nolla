"use client";

import { useState, useCallback, useMemo, useEffect } from "react";
import type { SortingParams } from "@/types/domain";
import type { HintStage } from "@/hooks/use-errorless";
import { generateSortingRound } from "@/lib/games/sorting/generate";

type Props = {
  params: SortingParams;
  roundKey: number;
  hintStage: HintStage;
  onTrialResult: (correct: boolean, reactionTimeMs: number) => void;
  onRoundComplete: () => void;
};

const COLOR_CSS: Record<string, string> = {
  red: "#E74C3C",
  blue: "#3498DB",
  yellow: "#F1C40F",
  green: "#2ECC71",
  purple: "#9B59B6",
};

export function SortingGame({ params, roundKey, hintStage, onTrialResult, onRoundComplete }: Props) {
  const round = useMemo(() => generateSortingRound(params), [params, roundKey]);
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [trialStart, setTrialStart] = useState(Date.now());

  useEffect(() => {
    setCurrentItemIndex(0);
    setTrialStart(Date.now());
  }, [roundKey]);

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
                background: COLOR_CSS[cat.matchValue]
                  ? COLOR_CSS[cat.matchValue]
                  : "linear-gradient(135deg, var(--color-mc-oak-light), var(--color-mc-oak))",
                border: "3px solid var(--color-mc-dark-oak)",
                boxShadow: "0 4px 0 var(--color-mc-dark-oak-light)",
              }}
              aria-label={cat.label}
            />
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
