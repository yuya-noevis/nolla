import type { GameType } from "@/types/domain";

export type Building = {
  readonly gameType: GameType;
  readonly name: string;
  readonly icon: string;
  readonly skyGradient: readonly [string, string];
  readonly groundColor: string;
};

/**
 * Fixed order of buildings in carousel.
 * Order never changes (predictability for ASD children).
 */
export const BUILDINGS: ReadonlyArray<Building> = [
  {
    gameType: "memory-match",
    name: "カードスート城",
    icon: "castle",
    skyGradient: ["#4A4A8A", "#2A2A5A"],
    groundColor: "#5A8A4A",
  },
  {
    gameType: "sorting",
    name: "ソーティング小屋",
    icon: "cottage",
    skyGradient: ["#E8C8A0", "#D4A878"],
    groundColor: "#7CBA5D",
  },
  {
    gameType: "visual-search",
    name: "虫めがねタワー",
    icon: "tower",
    skyGradient: ["#87CEEB", "#6BAEDB"],
    groundColor: "#8FBC8F",
  },
  {
    gameType: "corsi-block",
    name: "光るグリッド塔",
    icon: "grid-tower",
    skyGradient: ["#2A2A5A", "#1A1A3A"],
    groundColor: "#5A8A4A",
  },
];

/**
 * Filter buildings based on games_enabled setting from child profile.
 */
export function getEnabledBuildings(
  gamesEnabled: Record<string, boolean>
): ReadonlyArray<Building> {
  const keyMap: Record<GameType, string> = {
    "memory-match": "memory_match",
    "sorting": "sorting",
    "visual-search": "visual_search",
    "corsi-block": "corsi_block",
  };

  return BUILDINGS.filter((b) => gamesEnabled[keyMap[b.gameType]] !== false);
}
