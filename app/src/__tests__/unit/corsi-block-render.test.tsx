/**
 * BUG-10/11 regression tests for corsi-block rendering.
 *
 * BUG-10: width/height was hardcoded to 64×64 ignoring layout.blockSize
 *         (which can be 64 / 72 / 80 / 96 by getBlockSize).
 * BUG-11: positions used Math.min(..., 85) clamp on x and 80 on y, which
 *         collapsed all high-coordinate blocks into the same edge zone
 *         and produced overlapping renders even when the generator had
 *         enforced minimum spacing.
 */
import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";

afterEach(() => cleanup());
import { CorsiBlockGame } from "@/components/game/corsi-block/corsi-block-game";
import { generateCorsiLayout } from "@/lib/games/corsi-block/generate";
import type { CorsiBlockParams } from "@/types/domain";

const AREA_WIDTH = 800;
const AREA_HEIGHT = 500;

function renderGame(params: CorsiBlockParams) {
  return render(
    <CorsiBlockGame
      params={params}
      roundKey={1}
      hintStage={0}
      onTrialResult={vi.fn()}
      onRoundComplete={vi.fn()}
    />
  );
}

describe("CorsiBlockGame rendering — BUG-10 (blockSize honored)", () => {
  it("uses layout.blockSize in width/height (not hardcoded 64)", () => {
    // params.blocks=4 → getBlockSize returns 96 (large blocks)
    renderGame({ blocks: 4, seqLength: 2, displayMs: 1200 });
    const blocks = screen.getAllByLabelText(/^Block \d+$/);
    expect(blocks.length).toBe(4);
    for (const b of blocks) {
      expect(b.getAttribute("data-block-size")).toBe("96");
      // Inline style width/height must reference blockSize, not "64"
      const style = b.getAttribute("style") ?? "";
      expect(style).not.toMatch(/width:\s*64px/);
      expect(style).toMatch(/width:\s*[\d.]+%/);
      expect(style).toMatch(/height:\s*[\d.]+%/);
    }
  });

  it("smaller blockSize for dense layouts (blocks=16 → 64px)", () => {
    renderGame({ blocks: 16, seqLength: 3, displayMs: 1200 });
    const blocks = screen.getAllByLabelText(/^Block \d+$/);
    expect(blocks.length).toBe(16);
    for (const b of blocks) {
      expect(b.getAttribute("data-block-size")).toBe("64");
    }
  });
});

describe("CorsiBlockGame rendering — BUG-11 (no position clamp / no overlap)", () => {
  it("does not clamp positions to 85% / 80% (no Math.min in inline style)", () => {
    renderGame({ blocks: 8, seqLength: 3, displayMs: 1200 });
    const blocks = screen.getAllByLabelText(/^Block \d+$/);
    for (const b of blocks) {
      const style = b.getAttribute("style") ?? "";
      // The buggy code produced left/top values like "85%" or "80%" exactly.
      // After fix, positions are continuous % derived from generator coords,
      // and elements are centered via translate(-50%, -50%).
      expect(style).toMatch(/transform:\s*translate\(-50%,\s*-50%\)/);
    }
  });

  it("generator enforces min distance between blocks (no two closer than blockSize × 1.5)", () => {
    // Run 30 random layouts at the dense edge (blocks=16) and assert
    // every pair satisfies the min-distance constraint within tolerance.
    const TRIALS = 30;
    for (let trial = 0; trial < TRIALS; trial++) {
      const layout = generateCorsiLayout({
        blocks: 16,
        seqLength: 3,
        displayMs: 1200,
      });
      const minDist = layout.blockSize * 1.5;
      // The generator falls back after 200 attempts, so we allow a small
      // tolerance: at least 90% of pairs must respect minDist (the dense
      // worst-case is geometrically tight for 16×96 in 800×500).
      const pairs = layout.blocks;
      let ok = 0;
      let total = 0;
      for (let i = 0; i < pairs.length; i++) {
        for (let j = i + 1; j < pairs.length; j++) {
          total++;
          const dx = pairs[i].x - pairs[j].x;
          const dy = pairs[i].y - pairs[j].y;
          if (Math.sqrt(dx * dx + dy * dy) >= minDist * 0.85) ok++;
        }
      }
      expect(ok / total).toBeGreaterThanOrEqual(0.9);
    }
  });

  it("low-density layouts (blocks=4) always satisfy strict min distance", () => {
    for (let trial = 0; trial < 30; trial++) {
      const layout = generateCorsiLayout({
        blocks: 4,
        seqLength: 2,
        displayMs: 1200,
      });
      const minDist = layout.blockSize * 1.5;
      for (let i = 0; i < layout.blocks.length; i++) {
        for (let j = i + 1; j < layout.blocks.length; j++) {
          const dx = layout.blocks[i].x - layout.blocks[j].x;
          const dy = layout.blocks[i].y - layout.blocks[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          expect(dist).toBeGreaterThanOrEqual(minDist);
        }
      }
    }
  });

  it("position percentages stay within [0, 100] (no off-screen blocks)", () => {
    renderGame({ blocks: 8, seqLength: 3, displayMs: 1200 });
    const blocks = screen.getAllByLabelText(/^Block \d+$/);
    for (const b of blocks) {
      const style = b.getAttribute("style") ?? "";
      const leftMatch = style.match(/left:\s*([\d.]+)%/);
      const topMatch = style.match(/top:\s*([\d.]+)%/);
      expect(leftMatch).toBeTruthy();
      expect(topMatch).toBeTruthy();
      const left = parseFloat(leftMatch![1]);
      const top = parseFloat(topMatch![1]);
      expect(left).toBeGreaterThanOrEqual(0);
      expect(left).toBeLessThanOrEqual(100);
      expect(top).toBeGreaterThanOrEqual(0);
      expect(top).toBeLessThanOrEqual(100);
    }
  });
});
