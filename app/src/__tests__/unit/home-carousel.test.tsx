/**
 * Regression test for the home carousel arrow-lock bug.
 *
 * Bug: the "restore last-played building" useEffect had `buildings` in its
 * dep array, but getEnabledBuildings returns a fresh array every render,
 * so the effect refired on every render and snapped currentIndex back —
 * pressing left/right did nothing.
 */
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { HomeCarousel } from "@/app/home/carousel";

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
  }),
}));

// Skip warmup overlay so the carousel itself is visible on first render.
beforeEach(() => {
  const today = new Date().toISOString().slice(0, 10);
  localStorage.clear();
  localStorage.setItem(
    "nolla_motor_baseline",
    JSON.stringify({ value: 300, date: today })
  );
});

/** Get the currently visible planet by finding the background img with opacity 1 */
function getVisiblePlanetSrc(container: HTMLElement): string | null {
  const imgs = container.querySelectorAll<HTMLImageElement>("main > img");
  for (const img of imgs) {
    if (img.style.opacity === "1") return img.src;
  }
  return null;
}

describe("HomeCarousel arrow navigation", () => {
  const gamesEnabled = {
    memory_match: true,
    sorting: true,
    visual_search: true,
    corsi_block: true,
  };

  it("left/right arrows actually change the displayed building (no dep-array re-lock)", () => {
    const { container } = render(
      <HomeCarousel
        childName="テスト"
        gamesEnabled={gamesEnabled}
        starBalance={0}
      />
    );

    // Initial planet shown (detected via background image opacity)
    const initialPlanet = getVisiblePlanetSrc(container);
    expect(initialPlanet).toBeTruthy();

    // Click right arrow
    const next = screen.getByRole("button", { name: "Next" });
    fireEvent.click(next);
    const afterNextPlanet = getVisiblePlanetSrc(container);
    expect(afterNextPlanet).toBeTruthy();
    expect(afterNextPlanet).not.toBe(initialPlanet);

    // Click right arrow again — must keep advancing
    fireEvent.click(next);
    const afterSecondPlanet = getVisiblePlanetSrc(container);
    expect(afterSecondPlanet).not.toBe(afterNextPlanet);

    // Left arrow rewinds
    const prev = screen.getByRole("button", { name: "Previous" });
    fireEvent.click(prev);
    const afterPrevPlanet = getVisiblePlanetSrc(container);
    expect(afterPrevPlanet).toBe(afterNextPlanet);
  });
});
