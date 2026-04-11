"use client";

import { useCallback, useEffect, useState } from "react";
import { playSfx } from "@/lib/feedback/sfx";
import { vibrate } from "@/lib/feedback/haptic";

export type IntroVariant =
  | "warmup"
  | "memory-match"
  | "sorting"
  | "visual-search"
  | "corsi";

type Props = {
  variant: IntroVariant;
  onDismiss: () => void;
};

/**
 * IntroOverlay — shown before warmup and every game.
 * Text-free. Demo animation loops. A pulsing Start button is the only
 * tap target and dismisses the overlay.
 */
export function IntroOverlay({ variant, onDismiss }: Props) {
  const [leaving, setLeaving] = useState(false);

  const handleStart = useCallback(() => {
    if (leaving) return;
    playSfx("ui-tap");
    vibrate("tap-success");
    setLeaving(true);
  }, [leaving]);

  useEffect(() => {
    if (!leaving) return;
    const timer = setTimeout(() => onDismiss(), 220);
    return () => clearTimeout(timer);
  }, [leaving, onDismiss]);

  return (
    <div
      className={`absolute inset-0 z-50 flex flex-col items-center justify-between pointer-events-auto transition-opacity duration-200 ${
        leaving ? "opacity-0" : "opacity-100"
      }`}
      style={{ background: "rgba(0,0,0,0.55)" }}
      aria-hidden={leaving}
    >
      <div className="w-full flex-1 flex items-center justify-center pt-[6vh]">
        <DemoAnimation variant={variant} />
      </div>

      <div className="pb-[6vh] flex items-center justify-center">
        <button
          type="button"
          onClick={handleStart}
          className="relative touch-target-child animate-intro-start"
          aria-label="はじめる"
          style={{ width: 120, height: 120 }}
        >
          <svg viewBox="0 0 120 120" width="120" height="120">
            <defs>
              <radialGradient id="intro-start-grad" cx="50%" cy="45%" r="55%">
                <stop offset="0%" stopColor="#FFF8D6" />
                <stop offset="60%" stopColor="#FFD75E" />
                <stop offset="100%" stopColor="#E89B2D" />
              </radialGradient>
              <filter id="intro-start-glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <polygon
              points="60,8 73,46 113,46 81,70 93,110 60,86 27,110 39,70 7,46 47,46"
              fill="url(#intro-start-grad)"
              stroke="#FFFFFF"
              strokeWidth="2"
              filter="url(#intro-start-glow)"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

function DemoAnimation({ variant }: { variant: IntroVariant }) {
  switch (variant) {
    case "warmup":
      return <WarmupDemo />;
    case "memory-match":
      return <MemoryMatchDemo />;
    case "sorting":
      return <SortingDemo />;
    case "visual-search":
      return <VisualSearchDemo />;
    case "corsi":
      return <CorsiDemo />;
  }
}

function DemoStar({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 48 48" width="48" height="48" className={className} style={style}>
      <defs>
        <radialGradient id="demo-star-grad" cx="50%" cy="45%" r="55%">
          <stop offset="0%" stopColor="#FFF8D6" />
          <stop offset="100%" stopColor="#FFCE5C" />
        </radialGradient>
      </defs>
      <polygon
        points="24,4 30,18 45,18 33,28 38,44 24,34 10,44 15,28 3,18 18,18"
        fill="url(#demo-star-grad)"
        stroke="#FFFFFF"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function HandIcon({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 32 32" width="32" height="32" className={className} style={style}>
      <circle cx="16" cy="16" r="12" fill="#FFFFFF" opacity="0.25" />
      <circle cx="16" cy="16" r="6" fill="#FFFFFF" />
    </svg>
  );
}

function WarmupDemo() {
  return (
    <div className="relative w-[260px] h-[180px]">
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-demo-warmup-star">
        <DemoStar />
      </div>
      <div className="absolute left-1/2 top-1/2 animate-demo-hand">
        <HandIcon />
      </div>
      <div className="absolute left-1/2 -top-2 w-3 h-3 rounded-full border border-white/50" />
    </div>
  );
}

function MemoryMatchDemo() {
  return (
    <div className="relative w-[280px] h-[160px] flex items-center justify-center gap-6">
      <div className="w-20 h-24 rounded-lg bg-white/15 border border-white/30 flex items-center justify-center animate-demo-card-left">
        <DemoStar style={{ width: 32, height: 32 }} />
      </div>
      <div className="w-20 h-24 rounded-lg bg-white/15 border border-white/30 flex items-center justify-center animate-demo-card-right">
        <DemoStar style={{ width: 32, height: 32 }} />
      </div>
    </div>
  );
}

function SortingDemo() {
  return (
    <div className="relative w-[300px] h-[180px]">
      <div className="absolute left-1/2 top-0 -translate-x-1/2 animate-demo-sort-item">
        <div className="w-12 h-12 rounded-full bg-[#FFCE5C] border-2 border-white" />
      </div>
      <div className="absolute bottom-0 left-0 right-0 flex justify-around">
        <div className="w-16 h-16 rounded-lg bg-white/15 border border-white/30" />
        <div className="w-16 h-16 rounded-lg bg-white/20 border-2 border-[#5DBB5D] animate-demo-sort-target" />
        <div className="w-16 h-16 rounded-lg bg-white/15 border border-white/30" />
      </div>
    </div>
  );
}

function VisualSearchDemo() {
  return (
    <div className="relative w-[280px] h-[180px]">
      <div className="grid grid-cols-4 gap-3">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className={`w-12 h-12 rounded-md border border-white/30 ${
              i === 5
                ? "bg-[#FFCE5C] animate-demo-search-target"
                : "bg-white/15"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

function CorsiDemo() {
  return (
    <div className="relative w-[260px] h-[180px]">
      <div className="grid grid-cols-3 grid-rows-3 gap-4 w-full h-full">
        {Array.from({ length: 9 }).map((_, i) => {
          const order = i === 1 ? 1 : i === 4 ? 2 : i === 7 ? 3 : 0;
          return (
            <div
              key={i}
              className={`rounded-lg border border-white/25 bg-white/10 ${
                order > 0 ? `animate-demo-corsi-${order}` : ""
              }`}
            />
          );
        })}
      </div>
    </div>
  );
}
