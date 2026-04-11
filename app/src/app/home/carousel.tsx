"use client";

import { useState, useCallback, useEffect, useRef } from "react";
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

const WARP_OVERLAY_ID = "nolla-warp-overlay";

/**
 * Launch warp animation by injecting Canvas directly into the DOM.
 * Mirrors app/public/wt.html: navigation fires at frame 70 inside the rAF loop
 * (avoids relying on setTimeout + iOS navigation quirks). Overlay id prevents
 * stacked canvases from double taps; removing the overlay re-enables warp.
 */
function launchWarpAnimation(targetUrl: string): void {
  if (typeof document === "undefined") return;
  if (document.getElementById(WARP_OVERLAY_ID)) return;

  const overlay = document.createElement("div");
  overlay.id = WARP_OVERLAY_ID;
  overlay.style.cssText =
    "position:fixed;inset:0;width:100%;height:100%;z-index:99999;background:#000;";
  document.body.appendChild(overlay);

  const canvas = document.createElement("canvas");
  canvas.width = 1194;
  canvas.height = 834;
  canvas.style.cssText = "width:100%;height:100%;display:block;";
  overlay.appendChild(canvas);

  const ctxMaybe = canvas.getContext("2d");
  if (!ctxMaybe) {
    overlay.remove();
    window.location.assign(targetUrl);
    return;
  }
  const ctx = ctxMaybe;

  const W = 1194,
    H = 834;
  const cx = W / 2,
    cy = H / 2;
  const stars: { angle: number; dist: number; speed: number; size: number; bright: number }[] = [];
  for (let i = 0; i < 200; i++) {
    stars.push({
      angle: Math.random() * Math.PI * 2,
      dist: Math.random() * 5,
      speed: 2 + Math.random() * 6,
      size: 0.5 + Math.random() * 1.5,
      bright: 0.5 + Math.random() * 0.5,
    });
  }

  let frame = 0;
  let navigated = false;
  const totalFrames = 70;
  let rafId = 0;

  const failSafeNav = window.setTimeout(() => {
    if (!navigated) {
      navigated = true;
      window.location.assign(targetUrl);
    }
  }, 3500);

  function draw() {
    try {
      ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
      ctx.fillRect(0, 0, W, H);

      const speedFrame = Math.min(frame, totalFrames);
      for (const s of stars) {
        s.dist += s.speed * (1 + speedFrame / 20);
        const x = cx + Math.cos(s.angle) * s.dist;
        const y = cy + Math.sin(s.angle) * s.dist;
        if (x < -10 || x > W + 10 || y < -10 || y > H + 10) {
          s.dist = Math.random() * 3;
          continue;
        }
        const tailLen = Math.min(s.dist * 0.3, 40);
        const tx = x - Math.cos(s.angle) * tailLen;
        const ty = y - Math.sin(s.angle) * tailLen;
        const grad = ctx.createLinearGradient(tx, ty, x, y);
        grad.addColorStop(0, "transparent");
        grad.addColorStop(1, `rgba(255,255,255,${s.bright})`);
        ctx.beginPath();
        ctx.moveTo(tx, ty);
        ctx.lineTo(x, y);
        ctx.strokeStyle = grad;
        ctx.lineWidth = s.size;
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(x, y, s.size * 0.8, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${s.bright})`;
        ctx.fill();
      }

      frame++;
      if (frame >= totalFrames && !navigated) {
        navigated = true;
        window.clearTimeout(failSafeNav);
        window.location.assign(targetUrl);
      }
      rafId = requestAnimationFrame(draw);
    } catch {
      window.clearTimeout(failSafeNav);
      cancelAnimationFrame(rafId);
      overlay.remove();
      window.location.assign(targetUrl);
    }
  }

  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, W, H);
  requestAnimationFrame(draw);
}

export function HomeCarousel({ childName, gamesEnabled, starBalance }: Props) {
  const router = useRouter();
  const planets = getEnabledPlanets(gamesEnabled);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [warmupPhase, setWarmupPhase] = useState<WarmupPhase>("checking");
  const [localStars, setLocalStars] = useState(starBalance);

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

  useEffect(() => {
    if (typeof window !== "undefined" && new URLSearchParams(window.location.search).has("reset")) {
      localStorage.removeItem("nolla_motor_baseline");
      window.history.replaceState({}, "", window.location.pathname);
    }
    setWarmupPhase(needsMotorBaseline() ? "ready" : "done");
  }, []);

  const handleWarmupStart = useCallback(() => setWarmupPhase("measuring"), []);

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

  const handlePlanetTap = useCallback((planet: Planet) => {
    try {
      localStorage.setItem(LAST_PLANET_KEY, planet.gameType);
    } catch {
      /* ignore */
    }
    const target = `/game/${planet.gameType}`;
    launchWarpAnimation(target);
  }, []);

  const current = planets[currentIndex];

  if (warmupPhase === "checking") {
    return <main className="h-dvh w-full" style={{ background: "#0B0B30" }} />;
  }

  if (warmupPhase === "ready" || warmupPhase === "measuring") {
    return (
      <main className="h-dvh w-full flex flex-col items-center justify-center relative overflow-hidden">
        <img src={current.image} alt="" className="absolute inset-0 w-full h-full object-cover" draggable={false} />
        <div className="relative z-10">
          {warmupPhase === "ready" && (
            <button type="button" onClick={handleWarmupStart} className="flex flex-col items-center gap-6">
              <div
                className="w-32 h-32 rounded-full flex items-center justify-center active:scale-95 transition-transform"
                style={{
                  background: "radial-gradient(circle, rgba(0,212,255,0.3), rgba(0,212,255,0.05))",
                  boxShadow: "0 0 40px rgba(0,212,255,0.3), inset 0 0 20px rgba(0,212,255,0.1)",
                  border: "2px solid rgba(0,212,255,0.4)",
                }}
              >
                <svg width="48" height="48" viewBox="0 0 24 24" fill="white"><polygon points="6,4 20,12 6,20" /></svg>
              </div>
            </button>
          )}
          {warmupPhase === "measuring" && <MotorBaselineMeasurement onComplete={handleBaselineComplete} />}
        </div>
      </main>
    );
  }

  return (
    <main className="h-dvh w-full flex flex-col relative overflow-hidden">
      {/* Full-screen planet backgrounds with crossfade */}
      {planets.map((planet, i) => (
        <img
          key={planet.gameType}
          src={planet.image}
          alt=""
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
          style={{ opacity: i === currentIndex ? 1 : 0 }}
          draggable={false}
        />
      ))}

      {/* Header: Stars + Parent lock */}
      <div
        className="flex items-center justify-between px-3 pt-2 shrink-0 relative z-10"
        style={{
          paddingLeft: "max(0.75rem, env(safe-area-inset-left))",
          paddingRight: "max(0.75rem, env(safe-area-inset-right))",
          paddingTop: "max(0.5rem, env(safe-area-inset-top))",
        }}
      >
        {/* Star counter with dot grid */}
        <div
          className="flex items-center gap-2 px-3 py-1.5 rounded-2xl"
          style={{ background: "rgba(0,0,0,0.15)" }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="#FFD700" style={{ filter: "drop-shadow(0 0 4px rgba(255,215,0,0.5))" }}>
            <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
          </svg>
          {/* Dot grid for star count (up to 12 dots shown, remaining as number) */}
          <div className="grid grid-cols-4 gap-[3px]">
            {Array.from({ length: Math.min(localStars, 12) }).map((_, i) => (
              <div key={i} className="w-1.5 h-1.5 rounded-full" style={{ background: "#FFD700", opacity: 0.7 }} />
            ))}
          </div>
          {localStars > 12 && (
            <span className="text-xs font-bold text-white/70">+{localStars - 12}</span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => router.push("/aac")}
            className="btn-mc px-2 py-1.5 text-lg"
            aria-label="AAC Mini"
          >
            💬
          </button>
          <button
            type="button"
            onClick={() => router.push("/vowel")}
            className="btn-mc px-2 py-1.5 text-lg"
            aria-label="Vowel Mini"
          >
            🎤
          </button>
          <button
            type="button"
            onClick={() => router.push("/pin")}
            className="touch-target flex items-center justify-center w-9 h-9"
            aria-label="Parent menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </button>
        </div>
      </div>

      {/* Center: Planet area */}
      <div className="flex-1 flex items-center justify-center relative z-10">
        {/* Left arrow — image button */}
        {planets.length > 1 && (
          <button
            type="button"
            onClick={goLeft}
            className="absolute z-10 transition-all duration-200 hover:scale-110 active:scale-95"
            style={{ left: "max(1rem, env(safe-area-inset-left))", width: 160, height: 160 }}
            aria-label="Previous"
          >
            <img src="/arrow_left.png" alt="" className="w-full h-full object-contain" style={{ opacity: 0.75 }} draggable={false} />
          </button>
        )}

        {/* Tappable planet center (full area tap target, no label) */}
        <button
          type="button"
          onClick={() => handlePlanetTap(current)}
          className="absolute inset-0 z-0"
          style={{ cursor: "pointer" }}
          aria-label={current.name}
        />

        {/* Right arrow — image button */}
        {planets.length > 1 && (
          <button
            type="button"
            onClick={goRight}
            className="absolute z-10 transition-all duration-200 hover:scale-110 active:scale-95"
            style={{ right: "max(1rem, env(safe-area-inset-right))", width: 160, height: 160 }}
            aria-label="Next"
          >
            <img src="/arrow_right.png" alt="" className="w-full h-full object-contain" style={{ opacity: 0.75 }} draggable={false} />
          </button>
        )}
      </div>

      {/* Footer */}
      <div
        className="flex items-center justify-between gap-2 px-3 pb-2 shrink-0 relative z-10"
        style={{
          paddingLeft: "max(0.75rem, env(safe-area-inset-left))",
          paddingRight: "max(0.75rem, env(safe-area-inset-right))",
          paddingBottom: "max(0.5rem, env(safe-area-inset-bottom))",
        }}
      >
        {/* Left: My Room */}
        <div className="flex gap-2 shrink-0">
          <button
            type="button"
            onClick={() => router.push("/room")}
            className="btn-mc px-3 py-1.5 text-xs"
          >
            マイルーム
          </button>
        </div>

        {/* Center: Dot indicators */}
        <div
          className="flex gap-[18px] px-5 py-2 rounded-2xl shrink-0"
          style={{ background: "rgba(0,0,0,0.15)" }}
        >
          {planets.map((_, i) => (
            <div
              key={i}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                i === currentIndex ? "bg-white" : "bg-white/25"
              }`}
            />
          ))}
        </div>

        {/* Right: Navi bubble */}
        <div className="navi-bubble px-2 py-1 max-w-36 shrink-0">
          <p className="text-xs truncate">{childName}、あそぼう！</p>
        </div>
      </div>
    </main>
  );
}
