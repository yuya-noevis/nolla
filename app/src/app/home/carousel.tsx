"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getEnabledBuildings, type Building } from "@/lib/buildings";
import { MotorBaselineMeasurement } from "@/components/game/motor-baseline";
import { calculateMotorBaseline } from "@/lib/session/motor-baseline";

type Props = {
  childName: string;
  gamesEnabled: Record<string, boolean>;
  starBalance: number;
};

function needsMotorBaseline(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const raw = localStorage.getItem("nolla_motor_baseline");
    if (!raw) return true;
    const { date } = JSON.parse(raw);
    const today = new Date().toISOString().slice(0, 10);
    return date !== today;
  } catch {
    return true;
  }
}

function saveMotorBaselineFromHome(medianRt: number): void {
  if (typeof window === "undefined") return;
  const today = new Date().toISOString().slice(0, 10);
  localStorage.setItem("nolla_motor_baseline", JSON.stringify({ value: medianRt, date: today }));
}

type WarmupPhase = "checking" | "ready" | "measuring" | "done";

const LAST_BUILDING_KEY = "nolla_last_building_game_type";

export function HomeCarousel({ childName, gamesEnabled, starBalance }: Props) {
  const router = useRouter();
  const buildings = getEnabledBuildings(gamesEnabled);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [warmupPhase, setWarmupPhase] = useState<WarmupPhase>("checking");
  const [localStars, setLocalStars] = useState(starBalance);

  // Mount-only: load stars + restore last-played building index.
  // IMPORTANT: buildings is recomputed on every render, so do NOT put it
  // in the dep array — that would refire this effect on every render and
  // snap the carousel back to the last-played building, making the
  // left/right arrows look broken (they trigger a re-render which
  // re-runs this effect which resets currentIndex).
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const saved = parseInt(localStorage.getItem("nolla_total_stars") ?? "0", 10);
    if (saved > 0) setLocalStars(saved);

    const lastGame = localStorage.getItem(LAST_BUILDING_KEY);
    if (lastGame) {
      const idx = buildings.findIndex((b) => b.gameType === lastGame);
      if (idx >= 0) setCurrentIndex(idx);
    }
  }, []);

  // Check if baseline needed on mount
  useEffect(() => {
    // Allow manual reset via ?reset=1
    if (typeof window !== "undefined" && new URLSearchParams(window.location.search).has("reset")) {
      localStorage.removeItem("nolla_motor_baseline");
      window.history.replaceState({}, "", window.location.pathname);
    }
    setWarmupPhase(needsMotorBaseline() ? "ready" : "done");
  }, []);

  const handleWarmupStart = useCallback(() => {
    setWarmupPhase("measuring");
  }, []);

  const handleBaselineComplete = useCallback((reactionTimes: readonly number[]) => {
    const baseline = calculateMotorBaseline(reactionTimes, null);
    saveMotorBaselineFromHome(baseline.medianRt);
    setWarmupPhase("done");
  }, []);

  const goLeft = useCallback(() => {
    setCurrentIndex((i) => (i > 0 ? i - 1 : buildings.length - 1));
  }, [buildings.length]);

  const goRight = useCallback(() => {
    setCurrentIndex((i) => (i < buildings.length - 1 ? i + 1 : 0));
  }, [buildings.length]);

  const handleBuildingTap = useCallback(
    (building: Building) => {
      try {
        localStorage.setItem(LAST_BUILDING_KEY, building.gameType);
      } catch {
        // ignore quota / private mode
      }
      router.push(`/game/${building.gameType}`);
    },
    [router]
  );

  const current = buildings[currentIndex];

  // Show warmup overlay
  if (warmupPhase === "checking") {
    return <main className="h-dvh w-full bg-nolla-bg" />;
  }

  if (warmupPhase === "ready" || warmupPhase === "measuring") {
    return (
      <main
        className="h-dvh w-full flex flex-col items-center justify-center"
        style={{
          background: `linear-gradient(180deg, ${current.skyGradient[0]} 0%, ${current.skyGradient[1]} 60%, ${current.groundColor} 100%)`,
        }}
      >
        {warmupPhase === "ready" && (
          <button
            type="button"
            onClick={handleWarmupStart}
            className="flex flex-col items-center gap-6"
          >
            {/* Big play button */}
            <div
              className="w-32 h-32 rounded-full flex items-center justify-center active:scale-95 transition-transform"
              style={{
                background: "linear-gradient(135deg, var(--color-mc-glowstone), #C8962D)",
                boxShadow: "0 8px 0 var(--color-mc-dark-oak-light), 0 0 40px rgba(218,165,32,0.3)",
                border: "4px solid var(--color-mc-dark-oak)",
              }}
            >
              <svg width="48" height="48" viewBox="0 0 24 24" fill="white">
                <polygon points="6,4 20,12 6,20" />
              </svg>
            </div>
          </button>
        )}

        {warmupPhase === "measuring" && (
          <MotorBaselineMeasurement onComplete={handleBaselineComplete} />
        )}
      </main>
    );
  }

  return (
    // Landscape phone (812×375) fit: do NOT use sm: (width ≥ 640 px)
    // breakpoints to grow the layout — the phone crosses that breakpoint
    // sideways but has only ~340 dvh once iOS Safari's URL bar is drawn.
    // Everything is kept compact so header + building + footer fit in
    // ~330 px vertically.
    <main
      className="h-dvh w-full flex flex-col relative transition-colors duration-500"
      style={{
        background: `linear-gradient(180deg, ${current.skyGradient[0]} 0%, ${current.skyGradient[1]} 60%, ${current.groundColor} 100%)`,
      }}
    >
      {/* Header: Stars + Parent lock */}
      <div
        className="flex items-center justify-between px-3 pt-1 shrink-0"
        style={{
          paddingLeft: "max(0.75rem, env(safe-area-inset-left))",
          paddingRight: "max(0.75rem, env(safe-area-inset-right))",
          paddingTop: "max(0.25rem, env(safe-area-inset-top))",
        }}
      >
        <div className="flex items-center gap-1.5 px-3 py-1 bg-white/20 rounded-full backdrop-blur-sm">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="#DAA520">
            <polygon points="12,2 15,9 22,9 16.5,14 18.5,21 12,17 5.5,21 7.5,14 2,9 9,9" />
          </svg>
          <span className="text-base font-bold text-white drop-shadow-sm">
            {localStars}
          </span>
        </div>

        <button
          type="button"
          onClick={() => router.push("/pin")}
          className="touch-target flex items-center justify-center w-10 h-10 rounded-full bg-white/10"
          aria-label="Parent menu"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2">
            <rect x="3" y="11" width="18" height="11" rx="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
        </button>
      </div>

      {/* Main: Building carousel */}
      <div className="flex-1 flex items-center justify-center relative">
        {/* Left arrow */}
        {buildings.length > 1 && (
          <button
            type="button"
            onClick={goLeft}
            className="touch-target absolute z-10 flex items-center justify-center w-12 h-12 rounded-full btn-mc"
            style={{ left: "max(0.5rem, env(safe-area-inset-left))" }}
            aria-label="Previous"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
        )}

        {/* Building */}
        <button
          type="button"
          onClick={() => handleBuildingTap(current)}
          className="flex flex-col items-center gap-2 transition-transform duration-300 active:scale-95"
        >
          <BuildingVisual building={current} />
          <span className="text-base font-bold text-white drop-shadow-md">
            {current.name}
          </span>
        </button>

        {/* Right arrow */}
        {buildings.length > 1 && (
          <button
            type="button"
            onClick={goRight}
            className="touch-target absolute z-10 flex items-center justify-center w-12 h-12 rounded-full btn-mc"
            style={{ right: "max(0.5rem, env(safe-area-inset-right))" }}
            aria-label="Next"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        )}
      </div>

      {/* Footer: Dots + Nav character + My Room */}
      <div
        className="flex items-center justify-between gap-2 px-3 pb-1 shrink-0"
        style={{
          paddingLeft: "max(0.75rem, env(safe-area-inset-left))",
          paddingRight: "max(0.75rem, env(safe-area-inset-right))",
          paddingBottom: "max(0.25rem, env(safe-area-inset-bottom))",
        }}
      >
        {/* My Room button */}
        <button
          type="button"
          onClick={() => router.push("/room")}
          className="btn-mc px-3 py-1.5 text-xs shrink-0"
        >
          マイルーム
        </button>

        {/* Dot indicators */}
        <div className="flex gap-1.5 shrink-0">
          {buildings.map((_, i) => (
            <div
              key={i}
              className={`w-2.5 h-2.5 rounded-full transition-opacity ${
                i === currentIndex
                  ? "bg-white/90"
                  : "bg-white/30"
              }`}
            />
          ))}
        </div>

        {/* Navi character */}
        <div className="navi-bubble px-2 py-1 max-w-36 shrink-0">
          <p className="text-xs text-nolla-text truncate">
            {childName}、あそぼう！
          </p>
        </div>
      </div>
    </main>
  );
}

function BuildingVisual({ building }: { building: Building }) {
  // Compact-everywhere building visual. Landscape phone (812×375) has
  // ~340 dvh once the Safari URL bar is drawn; the header + footer +
  // building + name label must all fit vertically, which a previous
  // sm:w-48 sm:h-56 variant (192×224) did not. Fixed at 120×140 so the
  // full home screen is always visible without scrolling.
  return (
    <div className="relative flex items-end justify-center" style={{ width: 120, height: 140 }}>
      {/* Building body */}
      <div
        className="rounded-t-2xl relative overflow-hidden"
        style={{
          width: 104,
          height: 116,
          background: `linear-gradient(135deg, var(--color-mc-oak-light) 0%, var(--color-mc-oak) 100%)`,
          border: "3px solid var(--color-mc-dark-oak)",
          boxShadow: "0 6px 0 var(--color-mc-dark-oak-light)",
        }}
      >
        {/* Windows */}
        <div className="absolute top-5 left-1/2 -translate-x-1/2 flex gap-2">
          <div className="w-7 h-8 rounded-t-lg" style={{ background: "var(--color-mc-glass)" }} />
          <div className="w-7 h-8 rounded-t-lg" style={{ background: "var(--color-mc-glass)" }} />
        </div>
        {/* Door */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 rounded-t-lg"
          style={{ width: 36, height: 48, background: "var(--color-mc-dark-oak)" }}
        />
        {/* Glowstone light */}
        <div
          className="absolute top-2 right-2 w-3 h-3 rounded-sm"
          style={{ background: "var(--color-mc-glowstone)", boxShadow: "0 0 8px rgba(218,165,32,0.5)" }}
        />
      </div>
      {/* Roof */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-0 h-0"
        style={{
          borderLeft: "60px solid transparent",
          borderRight: "60px solid transparent",
          borderBottom: `36px solid var(--color-mc-stone)`,
        }}
      />
    </div>
  );
}
