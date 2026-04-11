"use client";

import { useState, useCallback, useMemo, useEffect } from "react";
import type { SortingParams, SortingCriterion } from "@/types/domain";
import type { HintStage } from "@/hooks/use-errorless";
import { generateSortingRound } from "@/lib/games/sorting/generate";
import { sortingScenesPerRound } from "@/lib/session/trials-per-round";

type Props = {
  params: SortingParams;
  roundKey: number;
  hintStage: HintStage;
  onTrialResult: (
    correct: boolean,
    reactionTimeMs: number,
    gameData?: Record<string, unknown>
  ) => void;
  onRoundComplete: () => void;
  onUnitProgress?: (completedUnits: number) => void;
};

const COLOR_CSS: Record<string, string> = {
  red: "#E74C3C",
  blue: "#3498DB",
  yellow: "#F1C40F",
  green: "#2ECC71",
  purple: "#9B59B6",
};

const SIZE_PX: Record<string, number> = {
  tiny: 56,
  small: 72,
  medium: 88,
  large: 104,
  huge: 120,
};

const CATEGORY_GLYPH: Record<string, string> = {
  fruit: "🍎",
  animal: "🐶",
  vehicle: "🚗",
  clothing: "👕",
  furniture: "🛋️",
};

// Non-color criteria (shape/size/category) use a single vibrant fill so
// children see a colorful shape instead of a gray silhouette. Items and
// categories still share the SAME color so matching stays shape-based —
// the criterion is preserved, only the neutral palette is brightened.
const NEUTRAL_BG = "#F1C40F";

// Render a sorting item or category according to the active criterion.
// CRITICAL: items and categories MUST share the same visual encoding so the
// child can match by sight. The previous implementation only rendered color,
// breaking shape/size/category/multi entirely.
function SortingVisual({
  criterion,
  attributes,
  size = 88,
}: {
  criterion: SortingCriterion;
  attributes: Readonly<Record<string, string>>;
  size?: number;
}) {
  const fill =
    criterion === "color" || criterion === "multi"
      ? COLOR_CSS[attributes.color ?? ""] ?? NEUTRAL_BG
      : NEUTRAL_BG;

  const shapeName = attributes.shape ?? "circle";
  const sizePx =
    criterion === "size" ? SIZE_PX[attributes.size ?? "medium"] ?? size : size;

  if (criterion === "category") {
    return (
      <div
        className="flex items-center justify-center rounded-2xl"
        style={{
          width: size,
          height: size,
          background: "rgba(255,255,255,0.95)",
          border: "3px solid var(--color-mc-dark-oak)",
        }}
      >
        <span className="text-4xl select-none" style={{ lineHeight: 1 }}>
          {CATEGORY_GLYPH[attributes.category ?? ""] ?? "❓"}
        </span>
      </div>
    );
  }

  return (
    <div
      className="flex items-center justify-center"
      style={{ width: sizePx, height: sizePx }}
    >
      <ShapeSvg shape={shapeName} fill={fill} size={sizePx} />
    </div>
  );
}

function ShapeSvg({
  shape,
  fill,
  size,
}: {
  shape: string;
  fill: string;
  size: number;
}) {
  const stroke = "rgba(0,0,0,0.25)";
  const strokeWidth = 3;
  const c = size / 2;
  const r = size / 2 - strokeWidth;
  switch (shape) {
    case "circle":
      return (
        <svg width={size} height={size}>
          <circle cx={c} cy={c} r={r} fill={fill} stroke={stroke} strokeWidth={strokeWidth} />
        </svg>
      );
    case "square":
      return (
        <svg width={size} height={size}>
          <rect
            x={strokeWidth}
            y={strokeWidth}
            width={size - strokeWidth * 2}
            height={size - strokeWidth * 2}
            rx={6}
            fill={fill}
            stroke={stroke}
            strokeWidth={strokeWidth}
          />
        </svg>
      );
    case "triangle":
      return (
        <svg width={size} height={size}>
          <polygon
            points={`${c},${strokeWidth} ${size - strokeWidth},${size - strokeWidth} ${strokeWidth},${size - strokeWidth}`}
            fill={fill}
            stroke={stroke}
            strokeWidth={strokeWidth}
            strokeLinejoin="round"
          />
        </svg>
      );
    case "star": {
      const points: string[] = [];
      for (let i = 0; i < 10; i++) {
        const angle = (Math.PI / 5) * i - Math.PI / 2;
        const rr = i % 2 === 0 ? r : r * 0.5;
        points.push(`${c + rr * Math.cos(angle)},${c + rr * Math.sin(angle)}`);
      }
      return (
        <svg width={size} height={size}>
          <polygon
            points={points.join(" ")}
            fill={fill}
            stroke={stroke}
            strokeWidth={strokeWidth}
            strokeLinejoin="round"
          />
        </svg>
      );
    }
    case "diamond":
      return (
        <svg width={size} height={size}>
          <polygon
            points={`${c},${strokeWidth} ${size - strokeWidth},${c} ${c},${size - strokeWidth} ${strokeWidth},${c}`}
            fill={fill}
            stroke={stroke}
            strokeWidth={strokeWidth}
            strokeLinejoin="round"
          />
        </svg>
      );
    default:
      return (
        <svg width={size} height={size}>
          <circle cx={c} cy={c} r={r} fill={fill} stroke={stroke} strokeWidth={strokeWidth} />
        </svg>
      );
  }
}

// Small visual badge at the top of the screen communicating which
// criterion the child is sorting by RIGHT NOW. Without this, a round
// change (e.g., color -> shape) can feel arbitrary — the badge announces
// the new rule visually, no text required.
function CriterionBadge({ criterion }: { criterion: SortingCriterion }) {
  const renderSamples = () => {
    switch (criterion) {
      case "color":
        return (
          <>
            <ShapeSvg shape="circle" fill="#E74C3C" size={22} />
            <ShapeSvg shape="circle" fill="#F1C40F" size={22} />
            <ShapeSvg shape="circle" fill="#3498DB" size={22} />
          </>
        );
      case "shape":
        return (
          <>
            <ShapeSvg shape="star" fill="#F1C40F" size={22} />
            <ShapeSvg shape="square" fill="#F1C40F" size={22} />
            <ShapeSvg shape="triangle" fill="#F1C40F" size={22} />
          </>
        );
      case "size":
        return (
          <>
            <ShapeSvg shape="circle" fill="#F1C40F" size={14} />
            <ShapeSvg shape="circle" fill="#F1C40F" size={20} />
            <ShapeSvg shape="circle" fill="#F1C40F" size={28} />
          </>
        );
      case "category":
        return (
          <>
            <span className="text-xl leading-none">🍎</span>
            <span className="text-xl leading-none">🐶</span>
            <span className="text-xl leading-none">🚗</span>
          </>
        );
      case "multi":
        return (
          <>
            <ShapeSvg shape="star" fill="#E74C3C" size={22} />
            <ShapeSvg shape="square" fill="#F1C40F" size={22} />
            <ShapeSvg shape="circle" fill="#3498DB" size={22} />
          </>
        );
    }
  };

  return (
    <div
      className="flex items-center gap-2 px-3 py-1 rounded-full shrink-0"
      style={{
        background: "rgba(0,0,0,0.3)",
        border: "2px solid rgba(255,255,255,0.3)",
        boxShadow: "0 0 16px rgba(255,255,255,0.15)",
      }}
      aria-label={`criterion: ${criterion}`}
    >
      {renderSamples()}
    </div>
  );
}

export function SortingGame({ params, roundKey, hintStage, onTrialResult, onRoundComplete, onUnitProgress }: Props) {
  // Multi-scene per round: at low items counts we play several scenes in
  // one round so every round delivers ≥ 6 sort decisions. See
  // lib/session/trials-per-round.ts for the formula and evidence.
  const scenesPerRound = useMemo(
    () => sortingScenesPerRound(params),
    [params]
  );
  const [sceneIndex, setSceneIndex] = useState(0);
  const [sceneKey, setSceneKey] = useState(0);
  const round = useMemo(
    () => generateSortingRound(params),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [params, roundKey, sceneKey]
  );
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [trialStart, setTrialStart] = useState(Date.now());

  // Reset scene cursor on new round.
  useEffect(() => {
    setSceneIndex(0);
    setSceneKey(0);
  }, [roundKey]);

  // Reset item index on new scene (whether via round change or within-round advance).
  useEffect(() => {
    setCurrentItemIndex(0);
    setTrialStart(Date.now());
  }, [round]);

  const currentItem = round.items[currentItemIndex];

  const handleCategoryTap = useCallback(
    (categoryId: string) => {
      if (!currentItem) return;

      const correctValue = currentItem.attributes[round.criterion];
      const selectedCategory = round.categories.find((c) => c.id === categoryId);
      const correct = selectedCategory?.matchValue === correctValue;
      const rt = Date.now() - trialStart;

      onTrialResult(correct, rt, {
        itemId: currentItem.id,
        targetCategoryId: categoryId,
        criterion: round.criterion,
        sceneIndex,
      });

      if (correct) {
        setCurrentItemIndex((i) => i + 1);
        setTrialStart(Date.now());
      }
    },
    [currentItem, round, trialStart, onTrialResult]
  );

  useEffect(() => {
    if (!currentItem) {
      const timer = setTimeout(() => {
        const nextSceneIndex = sceneIndex + 1;
        onUnitProgress?.(nextSceneIndex);
        if (nextSceneIndex >= scenesPerRound) {
          onRoundComplete();
        } else {
          setSceneIndex(nextSceneIndex);
          setSceneKey((k) => k + 1);
        }
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [currentItem, onRoundComplete, onUnitProgress, sceneIndex, scenesPerRound]);

  if (!currentItem) {
    // Between scenes: no clear message — progression is silent to avoid
    // text-heavy prompts that non-readers can't parse.
    return null;
  }

  const correctCategory = round.categories.find(
    (c) => c.matchValue === currentItem.attributes[round.criterion]
  );

  // Build category attribute lookup so the box visual mirrors the item visual.
  const categoryAttrs = (matchValue: string): Record<string, string> => {
    switch (round.criterion) {
      case "color":
        return { color: matchValue, shape: "circle" };
      case "shape":
        return { shape: matchValue };
      case "size":
        return { size: matchValue, shape: "circle" };
      case "category":
        return { category: matchValue };
      case "multi":
        return { color: matchValue, shape: "circle" };
    }
  };

  const catCount = round.categories.length;

  return (
    <div className="w-full h-full min-h-0 max-h-full flex flex-col items-center justify-center gap-2 px-4">
      {/* Rule hint: 3 sample items showing what the child is sorting by */}
      <CriterionBadge criterion={round.criterion} />

      {/* Current item — large and prominent */}
      <SortingVisual criterion={round.criterion} attributes={currentItem.attributes} size={110} />

      {/* Category boxes — responsive, fill width */}
      <div
        className="flex justify-center items-center w-full max-w-3xl"
        style={{ gap: catCount <= 3 ? "2rem" : "1rem" }}
      >
        {round.categories.map((cat) => {
          const isHintTarget = hintStage >= 2 && cat.id === correctCategory?.id;
          const isHintGlow = hintStage >= 3 && cat.id === correctCategory?.id;
          const boxSize = catCount <= 3 ? 160 : 130;
          const innerSize = catCount <= 3 ? 110 : 90;

          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => handleCategoryTap(cat.id)}
              className={`touch-target-child rounded-2xl flex items-center justify-center transition-all shrink-0 ${
                isHintTarget ? "animate-pulse-gentle" : ""
              } ${isHintGlow ? "ring-4 ring-[var(--color-feedback-correct)]/50" : ""}`}
              style={{
                background: "rgba(255,255,255,0.15)",
                border: "3px solid var(--color-mc-dark-oak)",
                boxShadow: "0 4px 0 var(--color-mc-dark-oak-light)",
                width: boxSize,
                height: boxSize,
              }}
              aria-label={cat.label}
            >
              <SortingVisual
                criterion={round.criterion}
                attributes={categoryAttrs(cat.matchValue)}
                size={innerSize}
              />
            </button>
          );
        })}
      </div>

      {/* In-scene item progress removed — the header gauge now shows
          both round progress and within-round scene progress unified. */}
    </div>
  );
}
