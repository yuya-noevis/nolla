import { describe, it, expect, beforeEach, vi } from "vitest";
import {
  vibrate,
  setHapticEnabled,
  isHapticEnabled,
} from "@/lib/feedback/haptic";

describe("haptic feedback", () => {
  let vibrateSpy: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    window.localStorage.clear();
    vibrateSpy = vi.fn().mockReturnValue(true);
    Object.defineProperty(navigator, "vibrate", {
      value: vibrateSpy,
      configurable: true,
      writable: true,
    });
  });

  describe("isHapticEnabled", () => {
    it("defaults to true when no preference stored", () => {
      expect(isHapticEnabled()).toBe(true);
    });

    it("reflects stored preference (enabled)", () => {
      setHapticEnabled(true);
      expect(isHapticEnabled()).toBe(true);
    });

    it("reflects stored preference (disabled)", () => {
      setHapticEnabled(false);
      expect(isHapticEnabled()).toBe(false);
    });
  });

  describe("vibrate", () => {
    it("calls navigator.vibrate with single value for tap-success (30ms)", () => {
      vibrate("tap-success");
      expect(vibrateSpy).toHaveBeenCalledWith(30);
    });

    it("calls navigator.vibrate with pattern array for warmup-complete", () => {
      vibrate("warmup-complete");
      expect(vibrateSpy).toHaveBeenCalledWith([50, 100, 50]);
    });

    it("calls navigator.vibrate with 40 for game-correct", () => {
      vibrate("game-correct");
      expect(vibrateSpy).toHaveBeenCalledWith(40);
    });

    it("calls navigator.vibrate with pattern for star-gain", () => {
      vibrate("star-gain");
      expect(vibrateSpy).toHaveBeenCalledWith([20, 50, 20]);
    });

    it("does not call vibrate when disabled", () => {
      setHapticEnabled(false);
      vibrate("tap-success");
      expect(vibrateSpy).not.toHaveBeenCalled();
    });

    it("is a no-op when navigator.vibrate is unavailable", () => {
      Object.defineProperty(navigator, "vibrate", {
        value: undefined,
        configurable: true,
        writable: true,
      });
      expect(() => vibrate("tap-success")).not.toThrow();
    });
  });
});
