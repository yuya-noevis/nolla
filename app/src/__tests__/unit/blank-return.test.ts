import { describe, it, expect } from "vitest";
import { isBlankReturn, resetForBlankReturn } from "@/lib/session/blank-return";
import type { StaircaseState } from "@/types/domain";

describe("isBlankReturn", () => {
  it("returns false when null", () => {
    expect(isBlankReturn(null)).toBe(false);
  });

  it("returns false when played yesterday", () => {
    const yesterday = new Date(Date.now() - 1 * 24 * 60 * 60 * 1000);
    expect(isBlankReturn(yesterday.toISOString())).toBe(false);
  });

  it("returns false when played 13 days ago", () => {
    const thirteenDays = new Date(Date.now() - 13 * 24 * 60 * 60 * 1000);
    expect(isBlankReturn(thirteenDays.toISOString())).toBe(false);
  });

  it("returns true when played 14 days ago", () => {
    const fourteenDays = new Date(Date.now() - 14 * 24 * 60 * 60 * 1000);
    expect(isBlankReturn(fourteenDays.toISOString())).toBe(true);
  });

  it("returns true when played 30 days ago", () => {
    const thirtyDays = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    expect(isBlankReturn(thirtyDays.toISOString())).toBe(true);
  });
});

describe("resetForBlankReturn", () => {
  it("resets reversal count and direction", () => {
    const state: StaircaseState = {
      reversalCount: 5,
      lastDirection: "up",
      consecutiveCorrect: 3,
    };

    const result = resetForBlankReturn(state);

    expect(result.reversalCount).toBe(0);
    expect(result.lastDirection).toBeNull();
    expect(result.consecutiveCorrect).toBe(3);
  });
});
