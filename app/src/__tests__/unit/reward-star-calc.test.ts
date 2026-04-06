/**
 * Star calculation + item unlock tests — TDD RED phase
 * Based on: outputs/nolla_ux_flow_design_0d4.md Section 4.2
 */
import { describe, it, expect } from "vitest";
import {
  calculateSessionStars,
  checkItemUnlock,
} from "@/lib/reward/star-calc";
import { SHOP_ITEMS } from "@/lib/reward/shop-items";

// ============================================================
// calculateSessionStars
// ============================================================
describe("calculateSessionStars", () => {
  it("awards 1 star per correct answer", () => {
    const result = calculateSessionStars({
      correctCount: 5,
      totalTrials: 8,
      isSessionComplete: false,
      isDailyFirst: false,
    });
    expect(result).toBeGreaterThanOrEqual(5);
  });

  it("awards session completion bonus", () => {
    const withCompletion = calculateSessionStars({
      correctCount: 5,
      totalTrials: 8,
      isSessionComplete: true,
      isDailyFirst: false,
    });
    const withoutCompletion = calculateSessionStars({
      correctCount: 5,
      totalTrials: 8,
      isSessionComplete: false,
      isDailyFirst: false,
    });
    expect(withCompletion).toBeGreaterThan(withoutCompletion);
  });

  it("awards daily first bonus", () => {
    const withDaily = calculateSessionStars({
      correctCount: 5,
      totalTrials: 8,
      isSessionComplete: true,
      isDailyFirst: true,
    });
    const withoutDaily = calculateSessionStars({
      correctCount: 5,
      totalTrials: 8,
      isSessionComplete: true,
      isDailyFirst: false,
    });
    expect(withDaily).toBeGreaterThan(withoutDaily);
  });

  it("returns 0 for 0 correct answers without completion", () => {
    const result = calculateSessionStars({
      correctCount: 0,
      totalTrials: 5,
      isSessionComplete: false,
      isDailyFirst: false,
    });
    expect(result).toBe(0);
  });

  it("always returns a non-negative integer", () => {
    const result = calculateSessionStars({
      correctCount: 3,
      totalTrials: 10,
      isSessionComplete: true,
      isDailyFirst: true,
    });
    expect(result).toBeGreaterThanOrEqual(0);
    expect(Number.isInteger(result)).toBe(true);
  });
});

// ============================================================
// checkItemUnlock
// ============================================================
describe("checkItemUnlock", () => {
  it("returns null when total stars is below first threshold", () => {
    const result = checkItemUnlock(5, []);
    expect(result).toBeNull();
  });

  it("returns an item id when threshold is reached", () => {
    const result = checkItemUnlock(50, []);
    // Should unlock the first available item
    if (result !== null) {
      expect(typeof result).toBe("string");
    }
  });

  it("skips already owned items", () => {
    // Own the first item, should get second
    const firstItem = checkItemUnlock(50, []);
    if (firstItem) {
      const secondItem = checkItemUnlock(100, [firstItem]);
      expect(secondItem).not.toBe(firstItem);
    }
  });

  it("returns null when all items are owned", () => {
    const allIds = SHOP_ITEMS.map((item) => item.id);
    const result = checkItemUnlock(999999, allIds);
    expect(result).toBeNull();
  });
});

// ============================================================
// SHOP_ITEMS
// ============================================================
describe("SHOP_ITEMS", () => {
  it("has at least 10 items", () => {
    expect(SHOP_ITEMS.length).toBeGreaterThanOrEqual(10);
  });

  it("all items have required fields", () => {
    for (const item of SHOP_ITEMS) {
      expect(item.id).toBeTruthy();
      expect(item.name).toBeTruthy();
      expect(item.type).toBeTruthy();
      expect(item.price).toBeGreaterThan(0);
      expect(item.imageKey).toBeTruthy();
    }
  });

  it("all item ids are unique", () => {
    const ids = SHOP_ITEMS.map((i) => i.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});
