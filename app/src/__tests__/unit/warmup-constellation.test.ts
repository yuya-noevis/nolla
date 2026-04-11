import { describe, it, expect } from "vitest";
import {
  CONSTELLATIONS,
  pickConstellation,
  addToRecent,
  type ConstellationPreset,
} from "@/lib/warmup/constellations";

describe("constellation presets", () => {
  it("has exactly 12 presets", () => {
    expect(CONSTELLATIONS).toHaveLength(12);
  });

  it("every preset has exactly 10 slots", () => {
    for (const p of CONSTELLATIONS) {
      expect(p.slots).toHaveLength(10);
    }
  });

  it("every preset has at least 8 lines for recognizable shape", () => {
    for (const p of CONSTELLATIONS) {
      expect(p.lines.length).toBeGreaterThanOrEqual(8);
    }
  });

  it("every line references valid slot indices (0-9)", () => {
    for (const p of CONSTELLATIONS) {
      for (const [a, b] of p.lines) {
        expect(a).toBeGreaterThanOrEqual(0);
        expect(a).toBeLessThan(10);
        expect(b).toBeGreaterThanOrEqual(0);
        expect(b).toBeLessThan(10);
        expect(a).not.toBe(b);
      }
    }
  });

  it("every slot is within normalized bounds (x: 0-100, y: 0-60)", () => {
    for (const p of CONSTELLATIONS) {
      for (const s of p.slots) {
        expect(s.x).toBeGreaterThanOrEqual(0);
        expect(s.x).toBeLessThanOrEqual(100);
        expect(s.y).toBeGreaterThanOrEqual(0);
        expect(s.y).toBeLessThanOrEqual(60);
      }
    }
  });

  it("all preset ids are unique", () => {
    const ids = CONSTELLATIONS.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("includes car and airplane for male-friendly variety", () => {
    const ids = CONSTELLATIONS.map((p) => p.id);
    expect(ids).toContain("car");
    expect(ids).toContain("airplane");
  });
});

describe("pickConstellation", () => {
  const p = (id: string): ConstellationPreset => ({
    id,
    name: id,
    slots: Array.from({ length: 10 }, () => ({ x: 0, y: 0 })),
    lines: [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 4],
      [4, 5],
      [5, 6],
      [6, 7],
      [7, 8],
    ],
  });

  const sample: readonly ConstellationPreset[] = [p("a"), p("b"), p("c"), p("d")];

  it("returns a preset from the list", () => {
    const result = pickConstellation(sample, [], () => 0);
    expect(sample).toContain(result);
  });

  it("excludes recent ids when alternatives exist", () => {
    const recent = ["a", "b"];
    // Force the RNG to 0 so it picks the first item of the filtered pool
    const result = pickConstellation(sample, recent, () => 0);
    expect(recent).not.toContain(result.id);
  });

  it("falls back to full pool when all are recent", () => {
    const recent = ["a", "b", "c", "d"];
    const result = pickConstellation(sample, recent, () => 0);
    expect(sample).toContain(result);
  });

  it("uses the injected RNG to select within the pool", () => {
    // rng() → 0 selects index 0; rng() → 0.99 selects last
    const first = pickConstellation(sample, [], () => 0);
    const last = pickConstellation(sample, [], () => 0.99);
    expect(first.id).toBe("a");
    expect(last.id).toBe("d");
  });
});

describe("addToRecent", () => {
  it("adds a new id to the front", () => {
    expect(addToRecent([], "a")).toEqual(["a"]);
  });

  it("caps history at 3 by default", () => {
    const result = addToRecent(["a", "b", "c"], "d");
    expect(result).toEqual(["d", "a", "b"]);
  });

  it("moves existing id to front without duplication", () => {
    const result = addToRecent(["a", "b", "c"], "b");
    expect(result).toEqual(["b", "a", "c"]);
  });

  it("respects custom max parameter", () => {
    const result = addToRecent(["a", "b"], "c", 2);
    expect(result).toEqual(["c", "a"]);
  });
});
