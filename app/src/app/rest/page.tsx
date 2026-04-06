"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

function RestContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnTo = searchParams.get("returnTo") ?? "/home";

  return (
    <div
      className="flex h-full flex-col items-center justify-center"
      style={{
        background: "linear-gradient(180deg, #1A1A3A 0%, var(--color-feedback-rest) 60%, #3A3A6A 100%)",
      }}
    >
      {/* Moon */}
      <div
        className="mb-8 h-24 w-24 rounded-full animate-pulse-gentle"
        style={{
          background: "radial-gradient(circle, #F5F0E0 0%, #E8DFC0 70%, transparent 100%)",
          boxShadow: "0 0 40px rgba(245,240,224,0.4)",
        }}
      />

      {/* Stars decoration */}
      <div className="relative mb-12 h-4 w-48">
        {[0, 1, 2, 3, 4].map((i) => (
          <span
            key={i}
            className="absolute text-sm animate-pulse-gentle"
            style={{
              left: `${i * 25}%`,
              animationDelay: `${i * 300}ms`,
              color: "rgba(255,255,255,0.5)",
            }}
          >
            ✦
          </span>
        ))}
      </div>

      {/* Two icon-only buttons */}
      <div className="flex gap-8">
        {/* Continue playing */}
        <button
          onClick={() => router.push(returnTo)}
          className="btn-mc touch-target-child flex h-20 w-20 items-center justify-center rounded-2xl text-3xl"
          aria-label="続ける"
        >
          ▶
        </button>

        {/* Go home */}
        <button
          onClick={() => router.push("/home")}
          className="btn-mc touch-target-child flex h-20 w-20 items-center justify-center rounded-2xl text-3xl"
          aria-label="おしまい"
        >
          🏠
        </button>
      </div>
    </div>
  );
}

export default function RestPage() {
  return (
    <Suspense>
      <RestContent />
    </Suspense>
  );
}
