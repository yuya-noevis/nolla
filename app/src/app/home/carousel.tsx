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

export function HomeCarousel({ childName, gamesEnabled, starBalance }: Props) {
  const router = useRouter();
  const buildings = getEnabledBuildings(gamesEnabled);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [warmupPhase, setWarmupPhase] = useState<WarmupPhase>("checking");
  const [localStars, setLocalStars] = useState(starBalance);

  // Check if baseline needed on mount + load stars from localStorage
  useEffect(() => {
    const saved = parseInt(localStorage.getItem("nolla_total_stars") ?? "0", 10);
    if (saved > 0) setLocalStars(saved);
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
    <main
      className="h-dvh w-full flex flex-col relative transition-colors duration-500"
      style={{
        background: `linear-gradient(180deg, ${current.skyGradient[0]} 0%, ${current.skyGradient[1]} 60%, ${current.groundColor} 100%)`,
      }}
    >
      {/* Header: Stars + Parent lock */}
      <div className="flex items-center justify-between px-4 pt-2 shrink-0">
        <div className="flex items-center gap-2 px-4 py-2 bg-white/20 rounded-full backdrop-blur-sm">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="#DAA520">
            <polygon points="12,2 15,9 22,9 16.5,14 18.5,21 12,17 5.5,21 7.5,14 2,9 9,9" />
          </svg>
          <span className="text-lg font-bold text-white drop-shadow-sm">
            {localStars}
          </span>
        </div>

        <button
          type="button"
          onClick={() => router.push("/pin")}
          className="touch-target flex items-center justify-center w-12 h-12 rounded-full bg-white/10"
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
            className="touch-target absolute left-2 z-10 flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-full btn-mc"
            aria-label="Previous"
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
        )}

        {/* Building */}
        <button
          type="button"
          onClick={() => handleBuildingTap(current)}
          className="flex flex-col items-center gap-4 transition-transform duration-300 active:scale-95"
        >
          <BuildingVisual building={current} />
          <span className="text-lg font-bold text-white drop-shadow-md">
            {current.name}
          </span>
        </button>

        {/* Right arrow */}
        {buildings.length > 1 && (
          <button
            type="button"
            onClick={goRight}
            className="touch-target absolute right-2 z-10 flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-full btn-mc"
            aria-label="Next"
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        )}
      </div>

      {/* Footer: Dots + Nav character + My Room */}
      <div className="flex items-end justify-between px-4 pb-2 shrink-0">
        {/* My Room button */}
        <button
          type="button"
          onClick={() => router.push("/room")}
          className="btn-mc px-3 py-2 text-xs sm:px-5 sm:py-3 sm:text-sm"
        >
          マイルーム
        </button>

        {/* Dot indicators */}
        <div className="flex gap-2">
          {buildings.map((_, i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-full transition-opacity ${
                i === currentIndex
                  ? "bg-white/90"
                  : "bg-white/30"
              }`}
            />
          ))}
        </div>

        {/* Navi character */}
        <div className="navi-bubble px-3 py-1 max-w-36 sm:max-w-48">
          <p className="text-xs sm:text-sm text-nolla-text">
            {childName}、あそぼう！
          </p>
        </div>
      </div>
    </main>
  );
}

function BuildingVisual({ building }: { building: Building }) {
  // CSS-only building placeholder (images will be swapped in later)
  return (
    <div className="w-28 h-32 sm:w-48 sm:h-56 relative flex items-end justify-center">
      {/* Building body */}
      <div className="w-24 h-28 sm:w-40 sm:h-44 rounded-t-2xl relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, var(--color-mc-oak-light) 0%, var(--color-mc-oak) 100%)`,
          border: "3px solid var(--color-mc-dark-oak)",
          boxShadow: "0 8px 0 var(--color-mc-dark-oak-light)",
        }}
      >
        {/* Windows */}
        <div className="absolute top-6 left-1/2 -translate-x-1/2 flex gap-3">
          <div className="w-8 h-10 rounded-t-lg" style={{ background: "var(--color-mc-glass)" }} />
          <div className="w-8 h-10 rounded-t-lg" style={{ background: "var(--color-mc-glass)" }} />
        </div>
        {/* Door */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-16 rounded-t-lg"
          style={{ background: "var(--color-mc-dark-oak)" }}
        />
        {/* Glowstone light */}
        <div className="absolute top-2 right-3 w-4 h-4 rounded-sm"
          style={{ background: "var(--color-mc-glowstone)", boxShadow: "0 0 8px rgba(218,165,32,0.5)" }}
        />
      </div>
      {/* Roof */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0 h-0"
        style={{
          borderLeft: "88px solid transparent",
          borderRight: "88px solid transparent",
          borderBottom: `48px solid var(--color-mc-stone)`,
        }}
      />
    </div>
  );
}
