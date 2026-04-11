const STORAGE_KEY = "nolla_motor_baseline";
const RECENT_CONSTELLATIONS_KEY = "nolla_warmup_recent_constellations";

export function needsMotorBaseline(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return true;
    const parsed = JSON.parse(raw) as { date?: string };
    const today = new Date().toISOString().slice(0, 10);
    return parsed.date !== today;
  } catch {
    return true;
  }
}

export function saveMotorBaseline(medianRt: number): void {
  if (typeof window === "undefined") return;
  try {
    const today = new Date().toISOString().slice(0, 10);
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ value: medianRt, date: today }),
    );
  } catch {
    // ignore quota/denied
  }
}

export function clearMotorBaseline(): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}

export function readRecentConstellations(): readonly string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(RECENT_CONSTELLATIONS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((x) => typeof x === "string") : [];
  } catch {
    return [];
  }
}

export function writeRecentConstellations(ids: readonly string[]): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(RECENT_CONSTELLATIONS_KEY, JSON.stringify(ids));
  } catch {
    // ignore
  }
}
