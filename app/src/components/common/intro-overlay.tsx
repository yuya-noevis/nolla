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
          style={{ width: 130, height: 130 }}
        >
          <svg viewBox="0 0 130 130" width="130" height="130">
            <defs>
              <radialGradient id="intro-start-body" cx="42%" cy="38%" r="64%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="25%" stopColor="#C9F2FF" />
                <stop offset="55%" stopColor="#4AC6FF" />
                <stop offset="85%" stopColor="#1E6FB3" />
                <stop offset="100%" stopColor="#0A2E5F" />
              </radialGradient>
              <radialGradient id="intro-start-halo" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#7FDFFF" stopOpacity="0.55" />
                <stop offset="100%" stopColor="#4AC6FF" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="intro-start-hl" cx="38%" cy="32%" r="28%">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
                <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
              </radialGradient>
              <filter id="intro-start-halo-blur" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="7" />
              </filter>
            </defs>
            <circle cx="65" cy="65" r="60" fill="url(#intro-start-halo)" filter="url(#intro-start-halo-blur)" />
            <circle cx="65" cy="65" r="46" fill="url(#intro-start-body)" />
            <circle cx="65" cy="65" r="46" fill="url(#intro-start-hl)" />
            <polygon
              points="56,46 90,65 56,84"
              fill="#FFFFFF"
              opacity="0.95"
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
    <div className={className} style={style}>
      <svg viewBox="0 0 200 200" width="120" height="120" overflow="visible">
        <defs>
          <radialGradient id="demo-spark-halo-outer" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#E0F0FF" stopOpacity="0.55" />
            <stop offset="35%" stopColor="#6FA8F0" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#1F4A94" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="demo-spark-halo-inner" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
            <stop offset="35%" stopColor="#D0E8FF" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#6FA8F0" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="demo-spike-v" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
            <stop offset="50%" stopColor="#FFFFFF" stopOpacity="1" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="demo-spike-h" x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
            <stop offset="50%" stopColor="#FFFFFF" stopOpacity="1" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </linearGradient>
          <filter id="demo-spark-halo-blur" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="10" />
          </filter>
        </defs>
        <circle cx="100" cy="100" r="80" fill="url(#demo-spark-halo-outer)" filter="url(#demo-spark-halo-blur)" />
        <circle cx="100" cy="100" r="24" fill="url(#demo-spark-halo-inner)" />
        <ellipse cx="100" cy="100" rx="1.6" ry="95" fill="url(#demo-spike-v)" />
        <ellipse cx="100" cy="100" rx="80" ry="1.4" fill="url(#demo-spike-h)" />
        <circle cx="100" cy="100" r="5" fill="#FFFFFF" />
      </svg>
    </div>
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
