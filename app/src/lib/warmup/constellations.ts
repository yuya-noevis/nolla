export type Slot = { readonly x: number; readonly y: number };

export type ConstellationPreset = {
  readonly id: string;
  readonly name: string;
  readonly slots: readonly Slot[];
  readonly lines: ReadonlyArray<readonly [number, number]>;
};

export const CONSTELLATIONS: readonly ConstellationPreset[] = [
  {
    id: "cat",
    name: "ネコ",
    slots: [
      { x: 30, y: 10 }, { x: 70, y: 10 },
      { x: 35, y: 20 }, { x: 65, y: 20 },
      { x: 40, y: 30 }, { x: 60, y: 30 },
      { x: 50, y: 38 },
      { x: 42, y: 48 }, { x: 58, y: 48 },
      { x: 50, y: 55 },
    ],
    lines: [[0, 2], [1, 3], [2, 4], [3, 5], [4, 6], [5, 6], [4, 7], [5, 8], [7, 9], [8, 9]],
  },
  {
    id: "rocket",
    name: "ロケット",
    slots: [
      { x: 50, y: 5 },
      { x: 42, y: 18 }, { x: 58, y: 18 },
      { x: 42, y: 35 }, { x: 58, y: 35 },
      { x: 30, y: 40 }, { x: 70, y: 40 },
      { x: 42, y: 48 }, { x: 58, y: 48 },
      { x: 50, y: 58 },
    ],
    lines: [[0, 1], [0, 2], [1, 3], [2, 4], [3, 5], [4, 6], [3, 7], [4, 8], [7, 9], [8, 9]],
  },
  {
    id: "fish",
    name: "魚",
    slots: [
      { x: 20, y: 28 },
      { x: 30, y: 20 }, { x: 30, y: 36 },
      { x: 55, y: 15 }, { x: 55, y: 40 },
      { x: 45, y: 28 },
      { x: 75, y: 10 }, { x: 75, y: 45 },
      { x: 85, y: 28 },
      { x: 55, y: 50 },
    ],
    lines: [[0, 1], [0, 2], [1, 3], [2, 4], [3, 6], [4, 7], [6, 8], [7, 8], [5, 3], [4, 9]],
  },
  {
    id: "flower",
    name: "花",
    slots: [
      { x: 50, y: 20 },
      { x: 50, y: 8 },
      { x: 65, y: 13 }, { x: 35, y: 13 },
      { x: 70, y: 25 }, { x: 30, y: 25 },
      { x: 65, y: 35 }, { x: 35, y: 35 },
      { x: 50, y: 45 },
      { x: 50, y: 58 },
    ],
    lines: [[0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6], [0, 7], [0, 8], [8, 9]],
  },
  {
    id: "sword",
    name: "剣",
    slots: [
      { x: 50, y: 5 },
      { x: 45, y: 15 }, { x: 55, y: 15 },
      { x: 45, y: 30 }, { x: 55, y: 30 },
      { x: 30, y: 38 }, { x: 70, y: 38 },
      { x: 45, y: 48 }, { x: 55, y: 48 },
      { x: 50, y: 58 },
    ],
    lines: [[0, 1], [0, 2], [1, 3], [2, 4], [3, 5], [4, 6], [3, 7], [4, 8], [7, 9], [8, 9]],
  },
  {
    id: "heart",
    name: "ハート",
    slots: [
      { x: 35, y: 15 }, { x: 65, y: 15 },
      { x: 25, y: 22 }, { x: 75, y: 22 },
      { x: 45, y: 25 }, { x: 55, y: 25 },
      { x: 20, y: 35 }, { x: 80, y: 35 },
      { x: 40, y: 50 }, { x: 60, y: 50 },
    ],
    lines: [[4, 0], [4, 5], [5, 1], [0, 2], [1, 3], [2, 6], [3, 7], [6, 8], [7, 9], [8, 9]],
  },
  {
    id: "crown",
    name: "王冠",
    slots: [
      { x: 20, y: 15 }, { x: 50, y: 5 }, { x: 80, y: 15 },
      { x: 35, y: 25 }, { x: 65, y: 25 },
      { x: 20, y: 35 }, { x: 80, y: 35 },
      { x: 20, y: 48 }, { x: 80, y: 48 },
      { x: 50, y: 52 },
    ],
    lines: [[0, 3], [3, 1], [1, 4], [4, 2], [0, 5], [2, 6], [5, 7], [6, 8], [7, 9], [8, 9]],
  },
  {
    id: "star",
    name: "星",
    slots: [
      { x: 50, y: 8 },
      { x: 58, y: 22 }, { x: 42, y: 22 },
      { x: 78, y: 24 }, { x: 22, y: 24 },
      { x: 65, y: 36 }, { x: 35, y: 36 },
      { x: 72, y: 55 }, { x: 28, y: 55 },
      { x: 50, y: 42 },
    ],
    lines: [[0, 1], [1, 3], [3, 5], [5, 7], [7, 9], [9, 8], [8, 6], [6, 4], [4, 2], [2, 0]],
  },
  {
    id: "butterfly",
    name: "蝶",
    slots: [
      { x: 40, y: 8 }, { x: 60, y: 8 },
      { x: 50, y: 18 },
      { x: 50, y: 30 },
      { x: 50, y: 45 },
      { x: 20, y: 20 }, { x: 80, y: 20 },
      { x: 15, y: 38 }, { x: 85, y: 38 },
      { x: 30, y: 50 },
    ],
    lines: [[0, 2], [1, 2], [2, 3], [3, 4], [3, 5], [3, 6], [5, 7], [6, 8], [7, 9], [4, 9]],
  },
  {
    id: "house",
    name: "家",
    slots: [
      { x: 50, y: 8 },
      { x: 22, y: 25 }, { x: 78, y: 25 },
      { x: 22, y: 52 }, { x: 78, y: 52 },
      { x: 40, y: 35 }, { x: 60, y: 35 },
      { x: 40, y: 45 }, { x: 60, y: 45 },
      { x: 50, y: 52 },
    ],
    lines: [[0, 1], [0, 2], [1, 3], [2, 4], [3, 9], [9, 4], [5, 6], [6, 7], [7, 8], [5, 8]],
  },
  {
    id: "car",
    name: "車",
    slots: [
      { x: 32, y: 15 }, { x: 68, y: 15 },
      { x: 25, y: 25 }, { x: 75, y: 25 },
      { x: 15, y: 32 }, { x: 85, y: 32 },
      { x: 20, y: 45 }, { x: 80, y: 45 },
      { x: 30, y: 52 }, { x: 70, y: 52 },
    ],
    lines: [[0, 1], [0, 2], [1, 3], [2, 4], [3, 5], [4, 6], [5, 7], [6, 8], [7, 9], [8, 9]],
  },
  {
    id: "airplane",
    name: "飛行機",
    slots: [
      { x: 50, y: 5 },
      { x: 50, y: 20 },
      { x: 50, y: 35 },
      { x: 15, y: 32 }, { x: 85, y: 32 },
      { x: 30, y: 38 }, { x: 70, y: 38 },
      { x: 50, y: 50 },
      { x: 35, y: 56 }, { x: 65, y: 56 },
    ],
    lines: [[0, 1], [1, 2], [2, 3], [2, 4], [3, 5], [4, 6], [2, 7], [7, 8], [7, 9], [5, 6]],
  },
] as const;

export function pickConstellation(
  presets: readonly ConstellationPreset[],
  recentIds: readonly string[],
  rng: () => number = Math.random,
): ConstellationPreset {
  if (presets.length === 0) {
    throw new Error("pickConstellation: presets must not be empty");
  }
  const available = presets.filter((p) => !recentIds.includes(p.id));
  const pool = available.length > 0 ? available : presets;
  const raw = Math.floor(rng() * pool.length);
  const index = Math.min(raw, pool.length - 1);
  return pool[index];
}

export function addToRecent(
  recentIds: readonly string[],
  newId: string,
  max: number = 3,
): readonly string[] {
  const withoutDup = recentIds.filter((id) => id !== newId);
  return [newId, ...withoutDup].slice(0, max);
}
