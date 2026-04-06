/**
 * Memory Match board generation.
 * Based on: outputs/nolla_game_mechanics_design.md Section 2.4
 */
import type { MemoryMatchParams, MemoryMatchBoard } from "@/types/domain";

// Card image pools by category
const CARD_POOLS: Record<string, readonly string[]> = {
  animals: ["cat", "dog", "bird", "fish", "rabbit", "bear", "frog", "turtle", "lion", "elephant",
    "penguin", "owl", "dolphin", "horse", "butterfly"],
  fruits: ["apple", "banana", "grape", "orange", "strawberry", "cherry", "watermelon", "peach",
    "pear", "lemon", "pineapple", "kiwi", "mango", "blueberry", "melon"],
  vehicles: ["car", "bus", "train", "airplane", "boat", "bicycle", "rocket", "helicopter",
    "truck", "ambulance", "taxi", "submarine", "scooter", "tractor", "balloon"],
};

// Similar pairs within categories (for similarity parameter)
const SIMILAR_PAIRS: ReadonlyArray<readonly [string, string]> = [
  ["cat", "dog"], ["bird", "owl"], ["fish", "dolphin"], ["rabbit", "bear"],
  ["apple", "cherry"], ["banana", "pear"], ["grape", "blueberry"], ["orange", "peach"],
  ["car", "bus"], ["train", "truck"], ["airplane", "helicopter"], ["boat", "submarine"],
];

// Grid size mapping from design doc 2.4
const GRID_MAP: Record<number, readonly [number, number]> = {
  2: [2, 2], 3: [2, 3], 4: [2, 4], 5: [2, 5],
  6: [3, 4], 8: [4, 4], 10: [4, 5], 12: [4, 6],
  15: [5, 6], 18: [6, 6], 20: [5, 8], 24: [6, 8],
};

function getGridSize(pairs: number): readonly [number, number] {
  if (GRID_MAP[pairs]) return GRID_MAP[pairs];
  // Fallback for non-standard pair counts
  const total = pairs * 2;
  const cols = Math.ceil(Math.sqrt(total));
  const rows = Math.ceil(total / cols);
  return [rows, cols];
}

function shuffleArray<T>(arr: readonly T[]): T[] {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function selectCards(
  pairs: number,
  similarity: number
): ReadonlyArray<{ pairId: string; imageKey: string }> {
  const allImages = Object.values(CARD_POOLS).flat();
  const shuffled = shuffleArray(allImages);

  // Determine how many pairs should be visually similar
  const similarCount = Math.round((similarity / 100) * pairs);
  const availableSimilar = shuffleArray([...SIMILAR_PAIRS]);

  // Build similar pairs immutably
  const similarPairs = availableSimilar
    .slice(0, similarCount)
    .flatMap(([img1, img2], i) => [
      { pairId: `pair_${i}`, imageKey: img1 },
      { pairId: `pair_${i}`, imageKey: img2 },
    ]);

  const usedImages = new Set(similarPairs.map((p) => p.imageKey));

  // Fill remaining with distinct pairs
  const remaining = shuffled.filter((img) => !usedImages.has(img));
  const distinctCount = pairs - similarPairs.length / 2;
  const distinctPairs = remaining.slice(0, distinctCount).flatMap((img, i) => {
    const pairId = `pair_${similarPairs.length / 2 + i}`;
    return [
      { pairId, imageKey: img },
      { pairId, imageKey: img },
    ];
  });

  return [...similarPairs, ...distinctPairs];
}

export function generateMemoryMatchBoard(
  params: MemoryMatchParams
): MemoryMatchBoard {
  const cardData = selectCards(params.pairs, params.similarity);
  const [gridRows, gridCols] = getGridSize(params.pairs);
  const shuffled = shuffleArray(cardData);

  const cards = shuffled.map((card, index) => ({
    id: `card_${index}`,
    pairId: card.pairId,
    imageKey: card.imageKey,
    position: index,
  }));

  return { cards, gridCols, gridRows };
}
