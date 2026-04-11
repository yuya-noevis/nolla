export type HapticId =
  | "tap-success"
  | "warmup-complete"
  | "game-correct"
  | "star-gain";

const PATTERNS: Readonly<Record<HapticId, number | readonly number[]>> = {
  "tap-success": 30,
  "warmup-complete": [50, 100, 50],
  "game-correct": 40,
  "star-gain": [20, 50, 20],
};

const STORAGE_KEY = "nolla_haptic_enabled";

export function isHapticEnabled(): boolean {
  if (typeof window === "undefined") return true;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw === null ? true : raw === "1";
  } catch {
    return true;
  }
}

export function setHapticEnabled(enabled: boolean): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, enabled ? "1" : "0");
  } catch {
    // ignore quota/denied errors
  }
}

type VibrateFn = (pattern: number | number[] | Iterable<number>) => boolean;

export function vibrate(id: HapticId): void {
  if (typeof navigator === "undefined") return;
  const vib = (navigator as Navigator & { vibrate?: VibrateFn }).vibrate;
  if (typeof vib !== "function") return;
  if (!isHapticEnabled()) return;
  const pattern = PATTERNS[id];
  const value: number | number[] =
    typeof pattern === "number" ? pattern : [...pattern];
  vib.call(navigator, value);
}
