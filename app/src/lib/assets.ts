/** Game icon paths - replace files in public/assets/icons/ to update */
export const GAME_ICONS = {
  nakamawake: "/assets/icons/nakamawake.svg",
  oboete: "/assets/icons/oboete.svg",
  mitsukete: "/assets/icons/mitsukete.svg",
  kotoba: "/assets/icons/kotoba.svg",
  ohanashi: "/assets/icons/ohanashi.svg",
} as const;

/** Character image paths */
export const CHARACTER_IMAGES = {
  main: "/assets/images/character-main.svg",
} as const;

/** Sound effect paths */
export const SOUNDS = {
  tap: "/assets/sounds/tap.mp3",
  correct: "/assets/sounds/correct.mp3",
  star: "/assets/sounds/star.mp3",
} as const;

/** Game color mapping (nolla palette, no red/yellow/fluorescent) */
export const GAME_COLORS = {
  nakamawake: { bg: "#E8F0F7", border: "#4A7BA7" },
  oboete: { bg: "#E8F5EC", border: "#6BA47A" },
  mitsukete: { bg: "#F5EDE4", border: "#D4A574" },
  kotoba: { bg: "#E8F0F7", border: "#4A7BA7" },
  ohanashi: { bg: "#E8F5EC", border: "#6BA47A" },
} as const;

export type GameId = keyof typeof GAME_ICONS;
