"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getEnabledPlanets, type Planet } from "@/lib/planets";
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

const LAST_PLANET_KEY = "nolla_last_planet_game_type";

export function HomeCarousel({ childName, gamesEnabled, starBalance }: Props) {
  const router = useRouter();
  const planets = getEnabledPlanets(gamesEnabled);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [warmupPhase, setWarmupPhase] = useState<WarmupPhase>("checking");
  const [localStars, setLocalStars] = useState(starBalance);
  const [isWarping, setIsWarping] = useState(false);

  // Mount-only: load stars + restore last-played planet index.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const saved = parseInt(localStorage.getItem("nolla_total_stars") ?? "0", 10);
    if (saved > 0) setLocalStars(saved);

    const lastGame = localStorage.getItem(LAST_PLANET_KEY);
    if (lastGame) {
      const idx = planets.findIndex((p) => p.gameType === lastGame);
      if (idx >= 0) setCurrentIndex(idx);
    }
  }, []);

  // Check if baseline needed on mount
  useEffect(() => {
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
    setCurrentIndex((i) => (i > 0 ? i - 1 : planets.length - 1));
  }, [planets.length]);

  const goRight = useCallback(() => {
    setCurrentIndex((i) => (i < planets.length - 1 ? i + 1 : 0));
  }, [planets.length]);

  const handlePlanetTap = useCallback(
    (planet: Planet) => {
      try {
        localStorage.setItem(LAST_PLANET_KEY, planet.gameType);
      } catch {
        // ignore quota / private mode
      }
      // Warp transition
      setIsWarping(true);
      setTimeout(() => {
        router.push(`/game/${planet.gameType}`);
      }, 1200);
    },
    [router]
  );

  const current = planets[currentIndex];

  // Show warmup overlay
  if (warmupPhase === "checking") {
    return <main className="h-dvh w-full" style={{ background: "#0B0B30" }} />;
  }

  if (warmupPhase === "ready" || warmupPhase === "measuring") {
    return (
      <main
        className="h-dvh w-full flex flex-col items-center justify-center"
        style={{
          background: `radial-gradient(ellipse at 50% 40%, ${current.skyGradient[1]} 0%, ${current.skyGradient[0]} 70%, #0A0A2E 100%)`,
        }}
      >
        {warmupPhase === "ready" && (
          <button
            type="button"
            onClick={handleWarmupStart}
            className="flex flex-col items-center gap-6"
          >
            <div
              className="w-32 h-32 rounded-full flex items-center justify-center active:scale-95 transition-transform"
              style={{
                background: "radial-gradient(circle, rgba(0,212,255,0.3), rgba(0,212,255,0.05))",
                boxShadow: "0 0 40px rgba(0,212,255,0.3), inset 0 0 20px rgba(0,212,255,0.1)",
                border: "2px solid rgba(0,212,255,0.4)",
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

  // Warp transition overlay
  if (isWarping) {
    return (
      <main className="h-dvh w-full relative overflow-hidden" style={{ background: "#000000" }}>
        {/* Radial star streaks */}
        {Array.from({ length: 60 }).map((_, i) => {
          const angle = (i / 60) * 360;
          const delay = Math.random() * 400;
          const length = 40 + Math.random() * 60;
          return (
            <div
              key={i}
              className="absolute left-1/2 top-1/2"
              style={{
                width: `${length}px`,
                height: "1.5px",
                background: `linear-gradient(90deg, transparent 0%, ${i % 3 === 0 ? "#00D4FF" : "#FFFFFF"} 50%, transparent 100%)`,
                transform: `rotate(${angle}deg) translateX(0)`,
                transformOrigin: "0 50%",
                animation: `warp-stars 1200ms ease-in ${delay}ms forwards`,
                opacity: 0,
              }}
            />
          );
        })}
        {/* Center flash */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            width: 8,
            height: 8,
            background: "#FFFFFF",
            boxShadow: "0 0 60px 20px rgba(0,212,255,0.5)",
          }}
        />
      </main>
    );
  }

  return (
    <main
      className="h-dvh w-full flex flex-col relative transition-all duration-500"
      style={{
        background: `radial-gradient(ellipse at 50% 40%, ${current.skyGradient[1]} 0%, ${current.skyGradient[0]} 70%, #0A0A2E 100%)`,
      }}
    >
      {/* Nebula cloud layer */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 25% 30%, ${current.nebulaColor}40 0%, transparent 50%),
                       radial-gradient(ellipse at 75% 70%, rgba(0,212,255,0.08) 0%, transparent 40%)`,
        }}
      />

      {/* Star field (static decorative dots) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: i < 5 ? 3 : i < 15 ? 2 : 1,
              height: i < 5 ? 3 : i < 15 ? 2 : 1,
              background: i < 3 ? "rgba(0,212,255,0.6)" : "rgba(255,255,255,0.5)",
              left: `${(i * 37 + 13) % 100}%`,
              top: `${(i * 53 + 7) % 85}%`,
              boxShadow: i < 3 ? "0 0 4px rgba(0,212,255,0.4)" : "none",
            }}
          />
        ))}
      </div>

      {/* Header: Stars + Parent lock */}
      <div
        className="flex items-center justify-between px-3 pt-1 shrink-0 relative z-10"
        style={{
          paddingLeft: "max(0.75rem, env(safe-area-inset-left))",
          paddingRight: "max(0.75rem, env(safe-area-inset-right))",
          paddingTop: "max(0.25rem, env(safe-area-inset-top))",
        }}
      >
        <div
          className="flex items-center gap-1.5 px-3 py-1 rounded-full backdrop-blur-sm"
          style={{ background: "rgba(0,0,0,0.2)" }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="#FFD700">
            <polygon points="12,2 15,9 22,9 16.5,14 18.5,21 12,17 5.5,21 7.5,14 2,9 9,9" />
          </svg>
          <span className="text-base font-bold text-white drop-shadow-sm">
            {localStars}
          </span>
        </div>

        <button
          type="button"
          onClick={() => router.push("/pin")}
          className="touch-target flex items-center justify-center w-10 h-10 rounded-full"
          style={{ background: "rgba(255,255,255,0.08)" }}
          aria-label="Parent menu"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="2">
            <rect x="3" y="11" width="18" height="11" rx="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
        </button>
      </div>

      {/* Main: Planet carousel */}
      <div className="flex-1 flex items-center justify-center relative z-10">
        {/* Left arrow */}
        {planets.length > 1 && (
          <button
            type="button"
            onClick={goLeft}
            className="touch-target absolute z-10 flex items-center justify-center w-12 h-12 rounded-full"
            style={{
              left: "max(0.5rem, env(safe-area-inset-left))",
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.15)",
            }}
            aria-label="Previous"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="2.5" strokeLinecap="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
        )}

        {/* Planet */}
        <button
          type="button"
          onClick={() => handlePlanetTap(current)}
          className="flex flex-col items-center gap-3 transition-transform duration-300 active:scale-95"
        >
          <PlanetVisual planet={current} />
          <span className="text-base font-bold text-white drop-shadow-md">
            {current.name}
          </span>
        </button>

        {/* Right arrow */}
        {planets.length > 1 && (
          <button
            type="button"
            onClick={goRight}
            className="touch-target absolute z-10 flex items-center justify-center w-12 h-12 rounded-full"
            style={{
              right: "max(0.5rem, env(safe-area-inset-right))",
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.15)",
            }}
            aria-label="Next"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="2.5" strokeLinecap="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        )}
      </div>

      {/* Footer: Dots + Nav bubble + My Room */}
      <div
        className="flex items-center justify-between gap-2 px-3 pb-1 shrink-0 relative z-10"
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
        <div
          className="flex gap-2 px-3 py-1.5 rounded-full shrink-0"
          style={{ background: "rgba(0,0,0,0.2)" }}
        >
          {planets.map((_, i) => (
            <div
              key={i}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                i === currentIndex
                  ? "bg-white scale-110"
                  : "bg-white/25"
              }`}
              style={i === currentIndex ? { boxShadow: "0 0 6px rgba(255,255,255,0.5)" } : undefined}
            />
          ))}
        </div>

        {/* Navi character */}
        <div className="navi-bubble px-2 py-1 max-w-36 shrink-0">
          <p className="text-xs truncate">
            {childName}、あそぼう！
          </p>
        </div>
      </div>
    </main>
  );
}

function PlanetVisual({ planet }: { planet: Planet }) {
  // Image includes planet + galaxy background, displayed full-bleed
  // The image is 16:9-ish with the planet centered, so we show it
  // at a size that makes the planet prominent in the carousel.
  return (
    <div className="relative flex items-center justify-center" style={{ width: 200, height: 160 }}>
      {/* Atmosphere glow behind the image */}
      <div
        className="absolute rounded-full animate-atmosphere"
        style={{
          width: 160,
          height: 160,
          background: planet.atmosphereColor,
          filter: "blur(16px)",
        }}
      />

      {/* Planet image */}
      <img
        src={planet.image}
        alt={planet.name}
        className="relative w-full h-full object-contain drop-shadow-2xl"
        draggable={false}
      />
    </div>
  );
}
