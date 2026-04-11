export type SfxId =
  | "warmup-tap"
  | "warmup-complete"
  | "game-correct"
  | "star-gain"
  | "ui-tap"
  | "hand-demo";

// Logical "source" key per ID. Used only as a stable cache key and by tests.
// The default factory synthesizes audio via Web Audio API and ignores this.
export const SFX_SOURCES: Readonly<Record<SfxId, string>> = {
  "warmup-tap": "synth:warmup-tap",
  "warmup-complete": "synth:warmup-complete",
  "game-correct": "synth:game-correct",
  "star-gain": "synth:star-gain",
  "ui-tap": "synth:ui-tap",
  "hand-demo": "synth:hand-demo",
};

type OscType = "sine" | "triangle" | "square" | "sawtooth";

type SynthStep = {
  readonly freq: number;
  readonly freqEnd?: number;
  readonly type: OscType;
  readonly start: number;
  readonly duration: number;
  readonly gain: number;
};

type SynthRecipe = readonly SynthStep[];

const RECIPES: Readonly<Record<SfxId, SynthRecipe>> = {
  // High, clear bell — "キンッ"
  "warmup-tap": [
    { freq: 1320, freqEnd: 1760, type: "sine", start: 0, duration: 0.18, gain: 0.22 },
    { freq: 2640, type: "sine", start: 0, duration: 0.1, gain: 0.08 },
  ],
  // Rising sparkle arpeggio — "キラーン"
  "warmup-complete": [
    { freq: 523, type: "sine", start: 0.0, duration: 0.14, gain: 0.2 },
    { freq: 659, type: "sine", start: 0.08, duration: 0.14, gain: 0.2 },
    { freq: 784, type: "sine", start: 0.16, duration: 0.14, gain: 0.2 },
    { freq: 1047, type: "sine", start: 0.24, duration: 0.22, gain: 0.26 },
    { freq: 1568, type: "sine", start: 0.34, duration: 0.3, gain: 0.18 },
  ],
  // Rounded positive — "ピコッ"
  "game-correct": [
    { freq: 523, freqEnd: 784, type: "triangle", start: 0, duration: 0.22, gain: 0.22 },
    { freq: 1047, type: "sine", start: 0.02, duration: 0.16, gain: 0.1 },
  ],
  // Coin sparkle — "チャリン"
  "star-gain": [
    { freq: 1175, type: "sine", start: 0.0, duration: 0.1, gain: 0.18 },
    { freq: 1568, type: "sine", start: 0.07, duration: 0.18, gain: 0.18 },
    { freq: 2093, type: "sine", start: 0.12, duration: 0.22, gain: 0.12 },
  ],
  // Soft UI tap — "ポッ"
  "ui-tap": [
    { freq: 660, freqEnd: 440, type: "sine", start: 0, duration: 0.08, gain: 0.14 },
  ],
  // Demo hand tap (same envelope as ui-tap)
  "hand-demo": [
    { freq: 660, freqEnd: 440, type: "sine", start: 0, duration: 0.08, gain: 0.14 },
  ],
};

export interface SfxPlayer {
  play: () => void;
}

export type PlayerFactory = (src: string) => SfxPlayer;

const STORAGE_KEY = "nolla_sfx_enabled";

type AudioCtxCtor = typeof AudioContext;

function resolveAudioContextCtor(): AudioCtxCtor | null {
  if (typeof window === "undefined") return null;
  const w = window as Window & { webkitAudioContext?: AudioCtxCtor };
  const Ctor = (typeof AudioContext !== "undefined" ? AudioContext : undefined) ??
    w.webkitAudioContext;
  return Ctor ?? null;
}

// Shared AudioContext — created lazily on first play so the page satisfies
// the "AudioContext requires user gesture" rule on iOS/Safari.
let sharedCtx: AudioContext | null = null;

function getSharedAudioContext(): AudioContext | null {
  if (sharedCtx) return sharedCtx;
  const Ctor = resolveAudioContextCtor();
  if (!Ctor) return null;
  try {
    sharedCtx = new Ctor();
    return sharedCtx;
  } catch {
    return null;
  }
}

function playRecipe(ctx: AudioContext, recipe: SynthRecipe): void {
  const now = ctx.currentTime;
  for (const step of recipe) {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = step.type;
    const startAt = now + step.start;
    const endAt = startAt + step.duration;
    osc.frequency.setValueAtTime(step.freq, startAt);
    if (step.freqEnd !== undefined) {
      osc.frequency.exponentialRampToValueAtTime(
        Math.max(1, step.freqEnd),
        endAt,
      );
    }
    gain.gain.setValueAtTime(0.0001, startAt);
    gain.gain.linearRampToValueAtTime(step.gain, startAt + 0.005);
    gain.gain.exponentialRampToValueAtTime(0.0001, endAt);
    osc.connect(gain).connect(ctx.destination);
    osc.start(startAt);
    osc.stop(endAt + 0.02);
  }
}

const synthFactory: PlayerFactory = (src) => {
  // src is the stable cache key, e.g. "synth:warmup-tap". Derive the recipe.
  const id = src.replace(/^synth:/, "") as SfxId;
  const recipe = RECIPES[id];
  if (!recipe) return { play: () => {} };
  return {
    play: () => {
      const ctx = getSharedAudioContext();
      if (!ctx) return;
      if (ctx.state === "suspended") {
        void ctx.resume().catch(() => {});
      }
      try {
        playRecipe(ctx, recipe);
      } catch {
        // ignore transient audio errors
      }
    },
  };
};

let factory: PlayerFactory = synthFactory;
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
  factory = custom ?? synthFactory;
  cache.clear();
}

export function __clearSfxCacheForTests(): void {
  cache.clear();
}
