/**
 * Sorting round generation.
 * Based on: outputs/nolla_game_mechanics_design.md Section 2.4
 */
import type {
  SortingParams,
  SortingRound,
  SortingItem,
  SortingCategory,
  SortingCriterion,
} from "@/types/domain";

const COLOR_VALUES = ["red", "blue", "yellow", "green", "purple"] as const;
const SHAPE_VALUES = ["circle", "triangle", "square", "star", "diamond"] as const;
const SIZE_VALUES = ["small", "medium", "large", "tiny", "huge"] as const;
const CATEGORY_VALUES = ["fruit", "animal", "vehicle", "clothing", "furniture"] as const;

const LABEL_JA: Record<string, string> = {
  // Colors
  red: "あか", blue: "あお", yellow: "きいろ", green: "みどり", purple: "むらさき",
  // Shapes
  circle: "まる", triangle: "さんかく", square: "しかく", star: "ほし", diamond: "ひしがた",
  // Sizes
  small: "ちいさい", medium: "ふつう", large: "おおきい", tiny: "ちっちゃい", huge: "おっきい",
  // Categories
  fruit: "くだもの", animal: "どうぶつ", vehicle: "のりもの", clothing: "ふく", furniture: "かぐ",
};

const CATEGORY_ITEMS: Record<string, readonly string[]> = {
  fruit: ["apple", "banana", "grape", "orange", "strawberry"],
  animal: ["cat", "dog", "bird", "fish", "rabbit"],
  vehicle: ["car", "bus", "train", "airplane", "boat"],
  clothing: ["shirt", "pants", "hat", "shoes", "coat"],
  furniture: ["chair", "table", "bed", "lamp", "shelf"],
};

function shuffleArray<T>(arr: readonly T[]): T[] {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function getValuesForCriterion(
  criterion: SortingCriterion,
  count: number
): readonly string[] {
  switch (criterion) {
    case "color": return shuffleArray(COLOR_VALUES).slice(0, count);
    case "shape": return shuffleArray(SHAPE_VALUES).slice(0, count);
    case "size": return shuffleArray(SIZE_VALUES).slice(0, count);
    case "category": return shuffleArray(CATEGORY_VALUES).slice(0, count);
    case "multi": return shuffleArray(COLOR_VALUES).slice(0, count);
  }
}

function buildCategories(
  criterion: SortingCriterion,
  values: readonly string[]
): readonly SortingCategory[] {
  return values.map((val, i) => ({
    id: `cat_${i}`,
    label: LABEL_JA[val] ?? val,
    matchValue: val,
  }));
}

function buildItems(
  criterion: SortingCriterion,
  categoryValues: readonly string[],
  totalItems: number
): readonly SortingItem[] {
  // Guarantee at least 1 item per category
  const guaranteed = categoryValues.map((val, i) =>
    createItem(criterion, val, i)
  );

  // Fill remaining randomly
  const remainingCount = totalItems - guaranteed.length;
  const extra = Array.from({ length: remainingCount }, (_, i) => {
    const val = categoryValues[Math.floor(Math.random() * categoryValues.length)];
    return createItem(criterion, val, guaranteed.length + i);
  });

  return shuffleArray([...guaranteed, ...extra]);
}

function createItem(
  criterion: SortingCriterion,
  value: string,
  index: number
): SortingItem {
  const attrs: Record<string, string> = {};

  if (criterion === "multi") {
    attrs.color = value;
    attrs.shape = SHAPE_VALUES[Math.floor(Math.random() * SHAPE_VALUES.length)];
    attrs.multi = value;
  } else if (criterion === "category") {
    attrs.category = value;
    const pool = CATEGORY_ITEMS[value] ?? [value];
    attrs.name = pool[Math.floor(Math.random() * pool.length)];
  } else if (criterion === "color") {
    attrs.color = value;
    attrs.shape = SHAPE_VALUES[Math.floor(Math.random() * SHAPE_VALUES.length)];
  } else if (criterion === "shape") {
    attrs.shape = value;
    attrs.color = COLOR_VALUES[Math.floor(Math.random() * COLOR_VALUES.length)];
  } else {
    attrs[criterion] = value;
  }

  return { id: `item_${index}`, attributes: attrs };
}

export function generateSortingRound(params: SortingParams): SortingRound {
  const values = getValuesForCriterion(params.criterion, params.categories);
  const categories = buildCategories(params.criterion, values);
  const items = buildItems(params.criterion, values, params.items);

  return { items, categories, criterion: params.criterion };
}
