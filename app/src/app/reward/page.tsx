"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useRef, Suspense } from "react";

/**
 * Reward page — exact replica of mockup r1_reward.html.
 * Background: linear-gradient(180deg, #1A40A0 → #4838A0 → #8050A0)
 * Elements appear in timed sequence via CSS animations.
 * Navigation uses router.push (soft nav) so iOS Safari doesn't re-measure
 * the viewport mid-URL-bar animation and leave a dark band at the bottom
 * of the home page after a hard reload.
 */
function RewardContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
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
          background: url('/star_reward.webp') center/contain no-repeat;
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

      {/* Star glow — scales with viewport, centered so the halo frames the star */}
      <div
        className="absolute z-[9]"
        style={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "clamp(240px, 70vh, 480px)",
          height: "clamp(240px, 70vh, 480px)",
          background: "radial-gradient(circle, rgba(255, 215, 0, 0.3) 0%, transparent 70%)",
          borderRadius: "50%",
          opacity: 0,
          animation: "reward-glow 1s 0.8s ease-out forwards",
        }}
      />

      {/* Main reward star + "+N" earned this session.
          Centered vertically at 45% (above geometric center to leave room
          for buttons). Larger star + text now that the cumulative dot row
          is gone. */}
      <div
        className="absolute z-10 flex items-center"
        style={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          gap: "clamp(16px, 5vw, 40px)",
          opacity: 0,
          animation: "reward-star-appear 1.2s 0.3s ease-out forwards",
        }}
      >
        <img
          src="/star_reward.webp"
          alt=""
          style={{
            width: "clamp(160px, 42vh, 320px)",
            height: "clamp(160px, 42vh, 320px)",
            objectFit: "contain",
          }}
          draggable={false}
        />
        {stars > 0 && (
          <div
            style={{
              fontSize: "clamp(64px, 18vh, 140px)",
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
          onClick={() => router.push(`/game/${gameType}`)}
          className="active:scale-95 transition-transform"
          style={{
            width: "clamp(88px, 20vh, 140px)",
            height: "clamp(88px, 20vh, 140px)",
            background: "url('/btn_replay.webp') center/contain no-repeat",
            border: "none",
            cursor: "pointer",
          }}
          aria-label="もう1回"
        />
        <button
          type="button"
          onClick={() => router.push("/home")}
          className="active:scale-95 transition-transform"
          style={{
            width: "clamp(88px, 20vh, 140px)",
            height: "clamp(88px, 20vh, 140px)",
            background: "url('/btn_myroom.webp') center/contain no-repeat",
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
