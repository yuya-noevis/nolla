"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect, Suspense } from "react";

function RewardContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const gameType = searchParams.get("game") ?? "memory-match";
  const stars = parseInt(searchParams.get("stars") ?? "0", 10);

  const [phase, setPhase] = useState<1 | 2 | 3>(1);
  const [displayStars, setDisplayStars] = useState(0);

  // Phase 1: star count-up animation
  useEffect(() => {
    if (phase !== 1) return;

    // Vibrate on supported devices
    if (typeof navigator !== "undefined" && navigator.vibrate) {
      navigator.vibrate(15);
    }

    // Count up animation
    const step = Math.max(1, Math.floor(stars / 15));
    const interval = setInterval(() => {
      setDisplayStars((prev) => {
        const next = prev + step;
        if (next >= stars) {
          clearInterval(interval);
          return stars;
        }
        return next;
      });
    }, 100);

    // Move to phase 3 after 1.5s (skip phase 2 for MVP)
    const timer = setTimeout(() => {
      setPhase(3);
    }, 1500);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [phase, stars]);

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-nolla-bg">
      {/* Phase 1 & 2: Star animation */}
      {phase <= 2 && (
        <div className="flex flex-col items-center gap-4">
          {/* Stars flying animation */}
          <div className="relative">
            {Array.from({ length: Math.min(stars, 5) }, (_, i) => (
              <span
                key={i}
                className="animate-star absolute text-3xl"
                style={{
                  left: `${(i - 2) * 40}px`,
                  animationDelay: `${i * 100}ms`,
                  color: "var(--color-nolla-reward)",
                }}
              >
                ★
              </span>
            ))}
          </div>

          {/* Star count */}
          <div
            className="mt-16 text-5xl font-bold"
            style={{ color: "var(--color-nolla-reward)" }}
          >
            +{displayStars}
          </div>
        </div>
      )}

      {/* Phase 3: Choice buttons */}
      {phase === 3 && (
        <div className="flex flex-col items-center gap-8">
          {/* Final star display */}
          <div
            className="text-4xl font-bold"
            style={{ color: "var(--color-nolla-reward)" }}
          >
            ★ +{stars}
          </div>

          {/* Two icon-only buttons */}
          <div className="flex gap-8">
            {/* Play again */}
            <button
              onClick={() => router.push(`/game/${gameType}`)}
              className="btn-mc touch-target-child flex h-20 w-20 items-center justify-center rounded-2xl text-3xl"
              aria-label="もう1回"
            >
              ▶
            </button>

            {/* Go home */}
            <button
              onClick={() => router.push("/home")}
              className="btn-mc touch-target-child flex h-20 w-20 items-center justify-center rounded-2xl text-3xl"
              aria-label="ホームへ"
            >
              🏠
            </button>
          </div>
        </div>
      )}
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
