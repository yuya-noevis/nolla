"use client";

import { useState, useCallback, useMemo, useEffect } from "react";
import type {
  VisualSearchParams,
  VisualSearchItem,
  VisualSearchDifference,
} from "@/types/domain";
import type { HintStage } from "@/hooks/use-errorless";
import { generateVisualSearchScene } from "@/lib/games/visual-search/generate";
import { visualSearchScenesPerRound } from "@/lib/session/trials-per-round";

type Props = {
  params: VisualSearchParams;
  roundKey: number;
  hintStage: HintStage;
  onTrialResult: (
    correct: boolean,
    reactionTimeMs: number,
    gameData?: Record<string, unknown>
  ) => void;
  onRoundComplete: () => void;
};

const SCENE_WIDTH = 800;
const SCENE_HEIGHT = 500;

export function VisualSearchGame({ params, roundKey, hintStage, onTrialResult, onRoundComplete }: Props) {
  // Multi-scene per round so low-difficulty rounds still deliver ≥ 6 finds.
  // See lib/session/trials-per-round.ts for the formula and evidence.
  const scenesPerRound = useMemo(
    () => visualSearchScenesPerRound(params),
    [params]
  );
  const [sceneIndex, setSceneIndex] = useState(0);
  const [sceneKey, setSceneKey] = useState(0);
  const scene = useMemo(
    () => generateVisualSearchScene(params),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [params, roundKey, sceneKey]
  );
  const [foundDiffs, setFoundDiffs] = useState<ReadonlyArray<string>>([]);
  const [trialStart, setTrialStart] = useState(Date.now());

  // Reset scene cursor on new round.
  useEffect(() => {
    setSceneIndex(0);
    setSceneKey(0);
  }, [roundKey]);

  // Reset found-diffs on new scene (round change or within-round advance).
  useEffect(() => {
    setFoundDiffs([]);
    setTrialStart(Date.now());
  }, [scene]);

  const handleItemTap = useCallback(
    (itemId: string) => {
      if (foundDiffs.includes(itemId)) return;

      const isDifference = scene.differences.some((d) => d.itemId === itemId);
      const rt = Date.now() - trialStart;

      if (isDifference) {
        setFoundDiffs((prev) => [...prev, itemId]);
      }

      onTrialResult(isDifference, rt, {
        itemId,
        isDifference,
        sceneIndex,
      });
    },
    [scene.differences, foundDiffs, trialStart, onTrialResult]
  );

  const allFound = foundDiffs.length >= scene.differences.length;

  useEffect(() => {
    if (allFound) {
      const timer = setTimeout(() => {
        const nextSceneIndex = sceneIndex + 1;
        if (nextSceneIndex >= scenesPerRound) {
          onRoundComplete();
        } else {
          setSceneIndex(nextSceneIndex);
          setSceneKey((k) => k + 1);
        }
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [allFound, onRoundComplete, sceneIndex, scenesPerRound]);

  return (
    <div className="flex flex-col items-center gap-2 w-full h-full px-4">
      <div className="flex gap-2 w-full flex-1 min-h-0">
        <SceneView
          items={scene.items}
          differences={[]}
          foundDiffs={foundDiffs}
          hintStage={0}
          onItemTap={handleItemTap}
        />
        <SceneView
          items={scene.items}
          differences={scene.differences}
          foundDiffs={foundDiffs}
          hintStage={hintStage}
          onItemTap={handleItemTap}
        />
      </div>

      <div className="flex gap-2">
        {scene.differences.map((d) => (
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
  items: readonly VisualSearchItem[];
  differences: readonly VisualSearchDifference[];
  foundDiffs: ReadonlyArray<string>;
  hintStage: HintStage;
  onItemTap: (itemId: string) => void;
};

const SIZE_PX: Record<string, number> = {
  small: 40,
  medium: 56,
  large: 72,
};

// Apply a difference to an item, returning the rendered version (modified scene).
function applyDiff(item: VisualSearchItem, diff: VisualSearchDifference | undefined) {
  if (!diff) {
    return {
      shape: item.type,
      color: item.properties.color ?? "#3498DB",
      size: item.properties.size ?? "medium",
      x: item.x,
      y: item.y,
      hidden: false,
    };
  }
  const base = {
    shape: item.type,
    color: item.properties.color ?? "#3498DB",
    size: item.properties.size ?? "medium",
    x: item.x,
    y: item.y,
    hidden: false,
  };
  switch (diff.diffType) {
    case "color":
      return { ...base, color: diff.changed };
    case "shape":
      return { ...base, shape: diff.changed };
    case "size":
      return { ...base, size: diff.changed };
    case "position": {
      // Parse "x,y"
      const parts = diff.changed.split(",").map(Number);
      return { ...base, x: parts[0] ?? base.x, y: parts[1] ?? base.y };
    }
    case "presence":
      return { ...base, hidden: true };
    default:
      return base;
  }
}

function SceneView({ items, differences, foundDiffs, hintStage, onItemTap }: SceneViewProps) {
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
        const rendered = applyDiff(item, diff);

        if (rendered.hidden) return null;

        const px = SIZE_PX[rendered.size] ?? 40;

        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onItemTap(item.id)}
            className={`absolute touch-target rounded-lg transition-all flex items-center justify-center ${
              isFound ? "ring-2 ring-[var(--color-feedback-correct)]" : ""
            } ${isHintTarget ? "animate-pulse-gentle" : ""}`}
            style={{
              left: `${(rendered.x / SCENE_WIDTH) * 100}%`,
              top: `${(rendered.y / SCENE_HEIGHT) * 100}%`,
              width: px,
              height: px,
              background: "transparent",
            }}
            aria-label={`Item ${item.id}`}
          >
            <ShapeSvg shape={rendered.shape} fill={rendered.color} size={px} />
          </button>
        );
      })}
    </div>
  );
}

function ShapeSvg({ shape, fill, size }: { shape: string; fill: string; size: number }) {
  const stroke = "rgba(0,0,0,0.3)";
  const sw = 2;
  const c = size / 2;
  const r = size / 2 - sw;
  switch (shape) {
    case "circle":
      return (
        <svg width={size} height={size}>
          <circle cx={c} cy={c} r={r} fill={fill} stroke={stroke} strokeWidth={sw} />
        </svg>
      );
    case "square":
      return (
        <svg width={size} height={size}>
          <rect x={sw} y={sw} width={size - sw * 2} height={size - sw * 2} rx={4} fill={fill} stroke={stroke} strokeWidth={sw} />
        </svg>
      );
    case "triangle":
      return (
        <svg width={size} height={size}>
          <polygon points={`${c},${sw} ${size - sw},${size - sw} ${sw},${size - sw}`} fill={fill} stroke={stroke} strokeWidth={sw} strokeLinejoin="round" />
        </svg>
      );
    case "star": {
      const points: string[] = [];
      for (let i = 0; i < 10; i++) {
        const a = (Math.PI / 5) * i - Math.PI / 2;
        const rr = i % 2 === 0 ? r : r * 0.5;
        points.push(`${c + rr * Math.cos(a)},${c + rr * Math.sin(a)}`);
      }
      return (
        <svg width={size} height={size}>
          <polygon points={points.join(" ")} fill={fill} stroke={stroke} strokeWidth={sw} strokeLinejoin="round" />
        </svg>
      );
    }
    case "diamond":
      return (
        <svg width={size} height={size}>
          <polygon points={`${c},${sw} ${size - sw},${c} ${c},${size - sw} ${sw},${c}`} fill={fill} stroke={stroke} strokeWidth={sw} strokeLinejoin="round" />
        </svg>
      );
    case "hexagon": {
      const points: string[] = [];
      for (let i = 0; i < 6; i++) {
        const a = (Math.PI / 3) * i - Math.PI / 2;
        points.push(`${c + r * Math.cos(a)},${c + r * Math.sin(a)}`);
      }
      return (
        <svg width={size} height={size}>
          <polygon points={points.join(" ")} fill={fill} stroke={stroke} strokeWidth={sw} strokeLinejoin="round" />
        </svg>
      );
    }
    default:
      return (
        <svg width={size} height={size}>
          <circle cx={c} cy={c} r={r} fill={fill} stroke={stroke} strokeWidth={sw} />
        </svg>
      );
  }
}
