"use client";

import { useState, useCallback, useMemo, useEffect } from "react";
import type { VisualSearchParams } from "@/types/domain";
import type { HintStage } from "@/hooks/use-errorless";
import { generateVisualSearchScene } from "@/lib/games/visual-search/generate";

type Props = {
  params: VisualSearchParams;
  roundKey: number;
  hintStage: HintStage;
  onTrialResult: (correct: boolean, reactionTimeMs: number) => void;
  onRoundComplete: () => void;
};

export function VisualSearchGame({ params, roundKey, hintStage, onTrialResult, onRoundComplete }: Props) {
  const scene = useMemo(() => generateVisualSearchScene(params), [params, roundKey]);
  const [foundDiffs, setFoundDiffs] = useState<ReadonlyArray<string>>([]);
  const [trialStart, setTrialStart] = useState(Date.now());

  useEffect(() => {
    setFoundDiffs([]);
    setTrialStart(Date.now());
  }, [roundKey]);

  const handleItemTap = useCallback(
    (itemId: string) => {
      if (foundDiffs.includes(itemId)) return;

      const isDifference = scene.differences.some((d) => d.itemId === itemId);
      const rt = Date.now() - trialStart;

      if (isDifference) {
        setFoundDiffs((prev) => [...prev, itemId]);
      }

      onTrialResult(isDifference, rt);
    },
    [scene.differences, foundDiffs, trialStart, onTrialResult]
  );

  const allFound = foundDiffs.length >= scene.differences.length;

  useEffect(() => {
    if (allFound) {
      const timer = setTimeout(() => onRoundComplete(), 800);
      return () => clearTimeout(timer);
    }
  }, [allFound, onRoundComplete]);

  return (
    <div className="flex flex-col items-center gap-2 w-full h-full px-4">
      {/* Two scenes side by side */}
      <div className="flex gap-2 w-full flex-1 min-h-0">
        {/* Original scene — tapping a diff item here also counts */}
        <SceneView
          items={scene.items}
          differences={[]}
          foundDiffs={foundDiffs}
          hintStage={0}
          onItemTap={handleItemTap}
          label="original"
        />

        {/* Modified scene (with differences) */}
        <SceneView
          items={scene.items}
          differences={scene.differences}
          foundDiffs={foundDiffs}
          hintStage={hintStage}
          onItemTap={handleItemTap}
          label="modified"
        />
      </div>

      {/* Found counter */}
      <div className="flex gap-2">
        {scene.differences.map((d, i) => (
          <div
            key={d.itemId}
            className={`w-4 h-4 rounded-full ${
              foundDiffs.includes(d.itemId)
                ? "bg-[var(--color-feedback-correct)]"
                : "bg-white/30"
            }`}
          />
        ))}
      </div>

      {allFound && (
        <div className="glass-overlay px-6 py-3">
          <p className="text-lg font-bold text-nolla-text">ぜんぶみつけた</p>
        </div>
      )}
    </div>
  );
}

type SceneViewProps = {
  items: ReturnType<typeof generateVisualSearchScene>["items"];
  differences: ReturnType<typeof generateVisualSearchScene>["differences"];
  foundDiffs: ReadonlyArray<string>;
  hintStage: HintStage;
  onItemTap: (itemId: string) => void;
  label: string;
};

const SCENE_WIDTH = 800;
const SCENE_HEIGHT = 500;

function SceneView({ items, differences, foundDiffs, hintStage, onItemTap, label }: SceneViewProps) {
  return (
    <div
      className="relative rounded-xl overflow-hidden flex-1 h-full"
      style={{
        background: "rgba(255,255,255,0.1)",
        border: "2px solid rgba(255,255,255,0.2)",
      }}
    >
      {items.map((item) => {
        const diff = differences.find((d) => d.itemId === item.id);
        const isFound = foundDiffs.includes(item.id);
        const isHintTarget = hintStage >= 2 && diff && !isFound;
        const color = diff && label === "modified" ? diff.changed : item.properties.color;

        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onItemTap(item.id)}
            className={`absolute touch-target rounded-lg transition-all ${
              isFound ? "ring-2 ring-[var(--color-feedback-correct)]" : ""
            } ${isHintTarget ? "animate-pulse-gentle" : ""}`}
            style={{
              left: `${(item.x / SCENE_WIDTH) * 100}%`,
              top: `${(item.y / SCENE_HEIGHT) * 100}%`,
              width: 40,
              height: 40,
              background: color,
            }}
            aria-label={`Item ${item.id}`}
          >
            <span className="text-xs font-bold text-white drop-shadow-sm select-none">
              {item.type.charAt(0).toUpperCase()}
            </span>
          </button>
        );
      })}
    </div>
  );
}
