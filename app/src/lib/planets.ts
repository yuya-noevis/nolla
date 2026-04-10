import type { GameType } from "@/types/domain";

export type Planet = {
  readonly gameType: GameType;
  readonly name: string;
  readonly icon: string;
  readonly image: string;
  readonly skyGradient: readonly [string, string];
  readonly groundColor: string;
  readonly nebulaColor: string;
  readonly accentGlow: string;
  readonly atmosphereColor: string;
};

/** @deprecated Use Planet instead */
export type Building = Planet;

/**
 * Fixed order of planets in carousel.
 * Order never changes (predictability for ASD children).
 *
 * Galaxy theme (2026-04-10):
 * - Each planet represents a game with unique surface/color
 * - skyGradient: deep space nebula colors (dark → medium)
 * - groundColor: planet surface color (seen during gameplay)
 */
export const PLANETS: ReadonlyArray<Planet> = [
  {
    gameType: "memory-match",
    name: "カード星",
    icon: "card-star",
    image: "/planets/planet_memory_match.jpg",
    skyGradient: ["#2860B8", "#6858B0"],
    groundColor: "#9870A8",
    nebulaColor: "#8B2A6B",
    accentGlow: "#FFD700",
    atmosphereColor: "rgba(192, 128, 224, 0.12)",
  },
  {
    gameType: "sorting",
    name: "いろわけ星",
    icon: "sorting-star",
    image: "/planets/planet_sorting.jpg",
    skyGradient: ["#1A6850", "#2A9878"],
    groundColor: "#3AAA88",
    nebulaColor: "#1B6B6B",
    accentGlow: "#FFB347",
    atmosphereColor: "rgba(255, 179, 71, 0.12)",
  },
  {
    gameType: "visual-search",
    name: "さがし星",
    icon: "search-star",
    image: "/planets/planet_visual_search.jpg",
    skyGradient: ["#1A4A7A", "#3A7AAA"],
    groundColor: "#4A9ABA",
    nebulaColor: "#00D4FF",
    accentGlow: "#FFFFFF",
    atmosphereColor: "rgba(0, 212, 255, 0.12)",
  },
  {
    gameType: "corsi-block",
    name: "ひかり星",
    icon: "light-star",
    image: "/planets/planet_corsi_block.jpg",
    skyGradient: ["#1A1A5E", "#3A3A8E"],
    groundColor: "#5050A0",
    nebulaColor: "#3A3A8A",
    accentGlow: "#00D4FF",
    atmosphereColor: "rgba(0, 212, 255, 0.12)",
  },
];

/** @deprecated Use PLANETS instead */
export const BUILDINGS = PLANETS;

/**
 * Filter planets based on games_enabled setting from child profile.
 */
export function getEnabledPlanets(
  gamesEnabled: Record<string, boolean>
): ReadonlyArray<Planet> {
  const keyMap: Record<GameType, string> = {
    "memory-match": "memory_match",
    sorting: "sorting",
    "visual-search": "visual_search",
    "corsi-block": "corsi_block",
  };

  return PLANETS.filter((p) => gamesEnabled[keyMap[p.gameType]] !== false);
}

/** @deprecated Use getEnabledPlanets instead */
export const getEnabledBuildings = getEnabledPlanets;
