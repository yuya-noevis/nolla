"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useRef, Suspense } from "react";

/**
 * Reward page — exact replica of mockup r1_reward.html.
 * Background: linear-gradient(180deg, #1A40A0 → #4838A0 → #8050A0)
 * Elements appear in timed sequence via CSS animations.
 * Navigation uses window.location.href (same as mockup).
 */
function RewardContent() {
  const searchParams = useSearchParams();
  const gameType = searchParams.get("game") ?? "memory-match";
  const stars = parseInt(searchParams.get("stars") ?? "0", 10);
  const screenRef = useRef<HTMLDivElement>(null);

  // Save earned stars
  useEffect(() => {
    if (stars > 0) {
      const current = parseInt(localStorage.getItem("nolla_total_stars") ?? "0", 10);
      localStorage.setItem("nolla_total_stars", String(current + stars));
    }
  }, [stars]);

  // Vibrate
  useEffect(() => {
    if (typeof navigator !== "undefined" && navigator.vibrate) {
      navigator.vibrate(15);
    }
  }, []);

  // Burst particles at 800ms (matching mockup timing)
  useEffect(() => {
    const screen = screenRef.current;
    if (!screen) return;

    const burstTimer = setTimeout(() => {
      const rect = screen.getBoundingClientRect();
      const cx = rect.width * 0.5;
      const cy = rect.height * 0.42;

      for (let i = 0; i < 16; i++) {
        const p = document.createElement("div");
        const angle = (Math.PI * 2 / 16) * i;
        const dist = 80 + Math.random() * 80;
        const size = 4 + Math.random() * 8;
        const color = Math.random() > 0.4 ? "#FFD700" : "#FFFFFF";
        p.style.cssText = `
          position: absolute; border-radius: 50%; pointer-events: none; z-index: 8;
          left: ${cx}px; top: ${cy}px;
          width: ${size}px; height: ${size}px;
          background: ${color};
          --tx: ${Math.cos(angle) * dist}px;
          --ty: ${Math.sin(angle) * dist}px;
          animation: reward-burst 1s ${Math.random() * 0.15}s ease-out forwards;
        `;
        screen.appendChild(p);
        setTimeout(() => p.remove(), 1200);
      }
    }, 800);

    // Falling mini stars at 600ms
    const fallTimer = setTimeout(() => {
      for (let i = 0; i < 8; i++) {
        const s = document.createElement("div");
        const size = 16 + Math.random() * 28;
        s.style.cssText = `
          position: absolute; pointer-events: none; z-index: 5; opacity: 0;
          width: ${size}px; height: ${size}px;
          left: ${Math.random() * 90 + 5}%;
          top: ${-50 - Math.random() * 100}px;
          background: url('/star_reward.png') center/contain no-repeat;
          animation: reward-fall ${2 + Math.random() * 2}s ${Math.random() * 1.5}s ease-in forwards;
        `;
        screen.appendChild(s);
      }
    }, 600);

    return () => {
      clearTimeout(burstTimer);
      clearTimeout(fallTimer);
    };
  }, []);

  const existingStars = Math.max(0, parseInt(localStorage.getItem("nolla_total_stars") ?? "0", 10) - stars);

  return (
    <div
      ref={screenRef}
      className="absolute inset-0 overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #1A40A0 0%, #4838A0 50%, #8050A0 100%)",
      }}
    >
      {/* Stars background */}
      {Array.from({ length: 35 }).map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            width: 1 + Math.random() * 2,
            height: 1 + Math.random() * 2,
            background: "white",
            top: `${(i * 31 + 7) % 100}%`,
            left: `${(i * 43 + 11) % 100}%`,
            opacity: 0.2 + (i % 3) * 0.15,
            animation: `twinkle ${2 + (i % 4)}s ${(i * 0.3) % 3}s ease-in-out infinite alternate`,
          }}
        />
      ))}

      {/* Star glow — scales with viewport so it never overflows iPhone landscape */}
      <div
        className="absolute z-[9]"
        style={{
          top: "34%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "clamp(180px, 55vh, 360px)",
          height: "clamp(180px, 55vh, 360px)",
          background: "radial-gradient(circle, rgba(255, 215, 0, 0.25) 0%, transparent 70%)",
          borderRadius: "50%",
          opacity: 0,
          animation: "reward-glow 1s 0.8s ease-out forwards",
        }}
      />

      {/* Main reward star + "+N" earned this session.
          Horizontal layout so both scale together and buttons below never
          collide with the star on iPhone landscape. */}
      <div
        className="absolute z-10 flex items-center"
        style={{
          top: "34%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          gap: "clamp(12px, 4vw, 28px)",
          opacity: 0,
          animation: "reward-star-appear 1.2s 0.3s ease-out forwards",
        }}
      >
        <img
          src="/star_reward.png"
          alt=""
          style={{
            width: "clamp(120px, 26vh, 220px)",
            height: "clamp(120px, 26vh, 220px)",
            objectFit: "contain",
          }}
          draggable={false}
        />
        {stars > 0 && (
          <div
            style={{
              fontSize: "clamp(48px, 12vh, 96px)",
              fontWeight: 900,
              color: "#FFD700",
              textShadow: "0 4px 16px rgba(0,0,0,0.5), 0 0 24px rgba(255,215,0,0.6)",
              lineHeight: 1,
              opacity: 0,
              animation: "reward-plus-n-pop 0.6s 1.4s ease-out forwards",
            }}
          >
            +{stars}
          </div>
        )}
      </div>

      {/* Cumulative star dots — smaller visual tally of session vs
          lifetime stars. Positioned under the main star block. */}
      <div
        className="absolute z-[15] flex items-center gap-1.5"
        style={{
          top: "62%",
          left: "50%",
          transform: "translateX(-50%)",
          opacity: 0,
          animation: "reward-count-in 0.5s 1.8s ease-out forwards",
        }}
      >
        <img src="/star_reward.png" alt="" style={{ width: 24, height: 24, objectFit: "contain" }} draggable={false} />
        <div className="flex gap-1 flex-wrap" style={{ maxWidth: 160 }}>
          {Array.from({ length: Math.min(existingStars, 12) }).map((_, i) => (
            <div
              key={`old-${i}`}
              className="rounded-full"
              style={{ width: 8, height: 8, background: "#FFD700", opacity: 0.5 }}
            />
          ))}
          {Array.from({ length: Math.min(stars, 5) }).map((_, i) => (
            <div
              key={`new-${i}`}
              className="rounded-full"
              style={{
                width: 8,
                height: 8,
                background: "#FFD700",
                opacity: 1,
                animation: `reward-dot-pop 0.3s ${2.2 + i * 0.1}s ease-out both`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Action buttons — responsive size + snug to bottom so they never
          overlap with the reward star on iPhone landscape. Minimum 88px
          keeps the tap target big enough for a child's hand. */}
      <div
        className="absolute z-20 flex"
        style={{
          bottom: "max(12px, env(safe-area-inset-bottom))",
          left: "50%",
          transform: "translateX(-50%)",
          gap: "clamp(32px, 8vw, 80px)",
          opacity: 0,
          animation: "reward-buttons-in 0.6s 2.2s ease-out forwards",
        }}
      >
        <button
          type="button"
          onClick={() => { window.location.href = `/game/${gameType}`; }}
          className="active:scale-95 transition-transform"
          style={{
            width: "clamp(88px, 20vh, 140px)",
            height: "clamp(88px, 20vh, 140px)",
            background: "url('/btn_replay.png') center/contain no-repeat",
            border: "none",
            cursor: "pointer",
          }}
          aria-label="もう1回"
        />
        <button
          type="button"
          onClick={() => { window.location.href = "/home"; }}
          className="active:scale-95 transition-transform"
          style={{
            width: "clamp(88px, 20vh, 140px)",
            height: "clamp(88px, 20vh, 140px)",
            background: "url('/btn_myroom.png') center/contain no-repeat",
            border: "none",
            cursor: "pointer",
          }}
          aria-label="ホームへ"
        />
      </div>
    </div>
  );
}

export default function RewardPage() {
  return (
    <Suspense>
      <RewardContent />
    </Suspense>
  );
}
