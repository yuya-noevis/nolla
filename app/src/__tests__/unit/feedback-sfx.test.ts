import { describe, it, expect, beforeEach, vi } from "vitest";
import {
  playSfx,
  setSfxEnabled,
  isSfxEnabled,
  __setPlayerFactoryForTests,
  __clearSfxCacheForTests,
  SFX_SOURCES,
  type SfxId,
} from "@/lib/feedback/sfx";

describe("sfx feedback", () => {
  let playSpy: ReturnType<typeof vi.fn<() => void>>;
  let lastSrc: string | null;

  beforeEach(() => {
    window.localStorage.clear();
    __clearSfxCacheForTests();
    lastSrc = null;
    playSpy = vi.fn<() => void>();
    __setPlayerFactoryForTests((src: string) => {
      lastSrc = src;
      return { play: playSpy };
    });
  });

  describe("isSfxEnabled", () => {
    it("defaults to true", () => {
      expect(isSfxEnabled()).toBe(true);
    });

    it("reflects stored preference", () => {
      setSfxEnabled(false);
      expect(isSfxEnabled()).toBe(false);
      setSfxEnabled(true);
      expect(isSfxEnabled()).toBe(true);
    });
  });

  describe("playSfx", () => {
    const ids: readonly SfxId[] = [
      "warmup-tap",
      "warmup-complete",
      "game-correct",
      "star-gain",
      "ui-tap",
      "hand-demo",
    ];

    it.each(ids)("plays sfx for id '%s'", (id) => {
      playSfx(id);
      expect(playSpy).toHaveBeenCalledOnce();
      expect(lastSrc).toBe(SFX_SOURCES[id]);
    });

    it("does not play when disabled", () => {
      setSfxEnabled(false);
      playSfx("warmup-tap");
      expect(playSpy).not.toHaveBeenCalled();
    });

    it("reuses cached player for repeat plays of same id", () => {
      const factory = vi.fn<(src: string) => { play: () => void }>(
        (_src: string) => ({ play: playSpy }),
      );
      __setPlayerFactoryForTests(factory);
      playSfx("warmup-tap");
      playSfx("warmup-tap");
      playSfx("warmup-tap");
      expect(factory).toHaveBeenCalledTimes(1);
      expect(playSpy).toHaveBeenCalledTimes(3);
    });

    it("creates separate players for different ids", () => {
      const factory = vi.fn<(src: string) => { play: () => void }>(
        (_src: string) => ({ play: playSpy }),
      );
      __setPlayerFactoryForTests(factory);
      playSfx("warmup-tap");
      playSfx("warmup-complete");
      expect(factory).toHaveBeenCalledTimes(2);
    });
  });
});
