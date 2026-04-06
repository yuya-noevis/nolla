/**
 * Visual Search scene generation.
 * Based on: outputs/nolla_game_mechanics_design.md Section 2.4
 */
import type {
  VisualSearchParams,
  VisualSearchScene,
  VisualSearchItem,
  VisualSearchDifference,
} from "@/types/domain";

const SCENE_WIDTH = 800;
const SCENE_HEIGHT = 500;
const ITEM_PADDING = 40;

const SHAPE_TYPES = ["circle", "square", "triangle", "star", "diamond", "hexagon"] as const;
const COLOR_VALUES = ["#E74C3C", "#3498DB", "#2ECC71", "#F1C40F", "#9B59B6", "#E67E22"] as const;
const SIZE_VALUES = ["small", "medium", "large"] as const;

const DIFF_TYPES = ["color", "shape", "size", "position", "presence"] as const;

function shuffleArray<T>(arr: readonly T[]): T[] {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function generatePositions(
  count: number
): ReadonlyArray<{ x: number; y: number }> {
  const positions: Array<{ x: number; y: number }> = [];
  const minDist = Math.max(40, Math.min(80, 400 / Math.sqrt(count)));

  for (let i = 0; i < count; i++) {
    let attempts = 0;
    let x: number;
    let y: number;
    do {
      x = ITEM_PADDING + Math.random() * (SCENE_WIDTH - 2 * ITEM_PADDING);
      y = ITEM_PADDING + Math.random() * (SCENE_HEIGHT - 2 * ITEM_PADDING);
      attempts++;
    } while (
      attempts < 100 &&
      positions.some(
        (p) => Math.sqrt((p.x - x) ** 2 + (p.y - y) ** 2) < minDist
      )
    );
    positions.push({ x: Math.round(x), y: Math.round(y) });
  }

  return positions;
}

function selectDiffType(subtlety: number): string {
  // Lower subtlety = more obvious diffs (color), higher = more subtle (size, position)
  if (subtlety < 30) {
    return shuffleArray(["color", "presence"] as const)[0];
  }
  if (subtlety < 60) {
    return shuffleArray(["color", "shape", "size"] as const)[0];
  }
  return shuffleArray(DIFF_TYPES)[0];
}

function generateDiff(
  item: VisualSearchItem,
  subtlety: number
): VisualSearchDifference {
  const diffType = selectDiffType(subtlety);

  switch (diffType) {
    case "color": {
      const original = item.properties.color ?? COLOR_VALUES[0];
      const others = COLOR_VALUES.filter((c) => c !== original);
      return {
        itemId: item.id,
        diffType: "color",
        original,
        changed: others[Math.floor(Math.random() * others.length)],
      };
    }
    case "shape": {
      const original = item.type;
      const others = SHAPE_TYPES.filter((s) => s !== original);
      return {
        itemId: item.id,
        diffType: "shape",
        original,
        changed: others[Math.floor(Math.random() * others.length)],
      };
    }
    case "size": {
      const original = item.properties.size ?? "medium";
      const others = SIZE_VALUES.filter((s) => s !== original);
      return {
        itemId: item.id,
        diffType: "size",
        original,
        changed: others[Math.floor(Math.random() * others.length)],
      };
    }
    case "position": {
      return {
        itemId: item.id,
        diffType: "position",
        original: `${item.x},${item.y}`,
        changed: `${item.x + 20},${item.y + 15}`,
      };
    }
    case "presence":
    default: {
      return {
        itemId: item.id,
        diffType: "presence",
        original: "visible",
        changed: "hidden",
      };
    }
  }
}

export function generateVisualSearchScene(
  params: VisualSearchParams
): VisualSearchScene {
  const positions = generatePositions(params.sceneItems);

  const items: readonly VisualSearchItem[] = positions.map((pos, i) => {
    const shapeType = SHAPE_TYPES[i % SHAPE_TYPES.length];
    const color = COLOR_VALUES[i % COLOR_VALUES.length];
    const size = SIZE_VALUES[i % SIZE_VALUES.length];
    return {
      id: `vs_${i}`,
      type: shapeType,
      x: pos.x,
      y: pos.y,
      properties: { color, size },
    };
  });

  // Select unique items for differences
  const shuffledItems = shuffleArray(items);
  const diffTargets = shuffledItems.slice(0, params.diffCount);

  const differences: readonly VisualSearchDifference[] = diffTargets.map(
    (item) => generateDiff(item, params.diffSubtlety)
  );

  return { items, differences };
}
