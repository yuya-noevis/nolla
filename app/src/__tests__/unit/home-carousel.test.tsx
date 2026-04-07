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
  useRouter: () => ({ push: vi.fn() }),
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

describe("HomeCarousel arrow navigation", () => {
  const gamesEnabled = {
    memory_match: true,
    sorting: true,
    visual_search: true,
    corsi_block: true,
  };

  it("left/right arrows actually change the displayed building (no dep-array re-lock)", () => {
    render(
      <HomeCarousel
        childName="テスト"
        gamesEnabled={gamesEnabled}
        starBalance={0}
      />
    );

    // Initial building shown (name is visible text)
    const initialName = screen
      .getByText(/あそぼう/)
      .closest("main")!
      .querySelector("button > span")?.textContent;
    expect(initialName).toBeTruthy();

    // Click right arrow
    const next = screen.getByRole("button", { name: "Next" });
    fireEvent.click(next);
    const afterNextName = screen
      .getByText(/あそぼう/)
      .closest("main")!
      .querySelector("button > span")?.textContent;
    expect(afterNextName).toBeTruthy();
    expect(afterNextName).not.toBe(initialName);

    // Click right arrow again — must keep advancing (would fail if dep-array
    // bug re-snapped currentIndex back to a fixed building)
    fireEvent.click(next);
    const afterSecondName = screen
      .getByText(/あそぼう/)
      .closest("main")!
      .querySelector("button > span")?.textContent;
    expect(afterSecondName).not.toBe(afterNextName);

    // Left arrow rewinds
    const prev = screen.getByRole("button", { name: "Previous" });
    fireEvent.click(prev);
    const afterPrevName = screen
      .getByText(/あそぼう/)
      .closest("main")!
      .querySelector("button > span")?.textContent;
    expect(afterPrevName).toBe(afterNextName);
  });

});
