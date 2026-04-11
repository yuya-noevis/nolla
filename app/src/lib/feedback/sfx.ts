export type SfxId =
  | "warmup-tap"
  | "warmup-complete"
  | "game-correct"
  | "star-gain"
  | "ui-tap"
  | "hand-demo";

export const SFX_SOURCES: Readonly<Record<SfxId, string>> = {
  "warmup-tap": "/sfx/sfx-01-warmup-tap.mp3",
  "warmup-complete": "/sfx/sfx-02-warmup-complete.mp3",
  "game-correct": "/sfx/sfx-03-game-correct.mp3",
  "star-gain": "/sfx/sfx-04-star-gain.mp3",
  "ui-tap": "/sfx/sfx-05-ui-tap.mp3",
  "hand-demo": "/sfx/sfx-05-ui-tap.mp3",
};

export interface SfxPlayer {
  play: () => void;
}

export type PlayerFactory = (src: string) => SfxPlayer;

const STORAGE_KEY = "nolla_sfx_enabled";

const defaultFactory: PlayerFactory = (src) => {
  if (typeof Audio === "undefined") {
    return { play: () => {} };
  }
  const audio = new Audio(src);
  audio.preload = "auto";
  return {
    play: () => {
      try {
        audio.currentTime = 0;
        const p = audio.play();
        if (p && typeof p.catch === "function") {
          p.catch(() => {});
        }
      } catch {
        // ignore — user gesture may not yet have unlocked audio
      }
    },
  };
};

let factory: PlayerFactory = defaultFactory;
const cache = new Map<SfxId, SfxPlayer>();

export function isSfxEnabled(): boolean {
  if (typeof window === "undefined") return true;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw === null ? true : raw === "1";
  } catch {
    return true;
  }
}

export function setSfxEnabled(enabled: boolean): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, enabled ? "1" : "0");
  } catch {
    // ignore
  }
}

export function playSfx(id: SfxId): void {
  if (!isSfxEnabled()) return;
  let player = cache.get(id);
  if (!player) {
    player = factory(SFX_SOURCES[id]);
    cache.set(id, player);
  }
  player.play();
}

// Test helpers — intentionally exported to allow dependency injection in tests.
export function __setPlayerFactoryForTests(custom: PlayerFactory | null): void {
  factory = custom ?? defaultFactory;
  cache.clear();
}

export function __clearSfxCacheForTests(): void {
  cache.clear();
}
