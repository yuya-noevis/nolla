"use client";

import { memo, useCallback, useEffect, useId, useState } from "react";
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
 * Text-free. Realistic demo animation loops with hand cursor
 * showing how to play. A pulsing Start button dismisses the overlay.
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
      className={`fixed inset-0 z-50 flex flex-col items-center justify-between pointer-events-auto transition-opacity duration-200 warmup-bg ${
        leaving ? "opacity-0" : "opacity-100"
      }`}
      aria-hidden={leaving}
    >
      <div className="w-full flex-1 flex items-center justify-center">
        <DemoAnimation variant={variant} />
      </div>

      <div className="pb-[2vh] flex items-center justify-center">
        <button
          type="button"
          onClick={handleStart}
          className="relative touch-target-child animate-intro-start"
          aria-label="PLAY"
          style={{ width: 72, height: 72, background: "transparent", border: "none" }}
        >
          <img
            src="/warmup/play-button.webp"
            alt=""
            width={72}
            height={72}
            draggable={false}
            style={{ display: "block", width: "100%", height: "100%" }}
          />
        </button>
      </div>
    </div>
  );
}

const DemoAnimation = memo(function DemoAnimation({
  variant,
}: {
  variant: IntroVariant;
}) {
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
});

/* ================================================================
   Shared: Hand Cursor (pointing finger image)
   ================================================================ */
function HandCursor({
  className,
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <img
      src="/warmup/hand-cursor.webp"
      alt=""
      width={40}
      height={40}
      draggable={false}
      aria-hidden="true"
      className={className}
      style={{
        filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.45))",
        pointerEvents: "none",
        ...style,
      }}
    />
  );
}

/* ================================================================
   Shared: Small gold star (for card backs)
   ================================================================ */
function GoldStar({ size = 20 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" focusable="false">
      <polygon
        points="12,2 15,9 22,9 16,14 18,22 12,17 6,22 8,14 2,9 9,9"
        fill="#FFD700"
        opacity="0.4"
      />
    </svg>
  );
}

/* ================================================================
   Shared: Mini shapes for visual-search demo
   ================================================================ */
function MiniShape({
  shape,
  color,
  size,
}: {
  shape: string;
  color: string;
  size: number;
}) {
  return (
    <svg viewBox="0 0 40 40" width={size} height={size} aria-hidden="true" focusable="false">
      {shape === "circle" && (
        <circle
          cx="20"
          cy="20"
          r="16"
          fill={color}
          stroke="rgba(0,0,0,0.2)"
          strokeWidth="2"
        />
      )}
      {shape === "square" && (
        <rect
          x="4"
          y="4"
          width="32"
          height="32"
          rx="4"
          fill={color}
          stroke="rgba(0,0,0,0.2)"
          strokeWidth="2"
        />
      )}
      {shape === "triangle" && (
        <polygon
          points="20,4 36,36 4,36"
          fill={color}
          stroke="rgba(0,0,0,0.2)"
          strokeWidth="2"
        />
      )}
    </svg>
  );
}

/* ================================================================
   Demo: Warmup (star + hand tap)
   ================================================================ */
function WarmupDemo() {
  return (
    <div className="relative" style={{ width: 280, height: 200 }}>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-demo-warmup-star">
        <DemoStar />
      </div>
      <div className="absolute left-1/2 top-1/2 animate-demo-hand">
        <HandCursor />
      </div>
    </div>
  );
}

function DemoStar() {
  const uid = useId();
  const o = `dsh-o-${uid}`;
  const i = `dsh-i-${uid}`;
  const v = `dsp-v-${uid}`;
  const h = `dsp-h-${uid}`;
  const b = `dsh-b-${uid}`;

  return (
    <svg viewBox="0 0 200 200" width="120" height="120" overflow="visible" aria-hidden="true" focusable="false">
      <defs>
        <radialGradient id={o} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#E0F0FF" stopOpacity="0.55" />
          <stop offset="35%" stopColor="#6FA8F0" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#1F4A94" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={i} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFF" stopOpacity="1" />
          <stop offset="35%" stopColor="#D0E8FF" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#6FA8F0" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={v} x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#FFF" stopOpacity="0" />
          <stop offset="50%" stopColor="#FFF" stopOpacity="1" />
          <stop offset="100%" stopColor="#FFF" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={h} x1="0%" y1="50%" x2="100%" y2="50%">
          <stop offset="0%" stopColor="#FFF" stopOpacity="0" />
          <stop offset="50%" stopColor="#FFF" stopOpacity="1" />
          <stop offset="100%" stopColor="#FFF" stopOpacity="0" />
        </linearGradient>
        <filter id={b} x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="10" />
        </filter>
      </defs>
      <circle cx="100" cy="100" r="80" fill={`url(#${o})`} filter={`url(#${b})`} />
      <circle cx="100" cy="100" r="24" fill={`url(#${i})`} />
      <ellipse cx="100" cy="100" rx="1.6" ry="95" fill={`url(#${v})`} />
      <ellipse cx="100" cy="100" rx="80" ry="1.4" fill={`url(#${h})`} />
      <circle cx="100" cy="100" r="5" fill="#FFF" />
    </svg>
  );
}

/* ================================================================
   Demo: Memory Match
   2x3 grid with actual card colors. Cards [1] and [4] flip to
   reveal matching emoji. Hand cursor taps each card in turn.
   ================================================================ */
function MemoryMatchCard({ index }: { index: number }) {
  const isA = index === 1;
  const isB = index === 4;
  const isFlipping = isA || isB;

  return (
    <div
      className={`rounded-xl flex items-center justify-center relative overflow-hidden ${
        isFlipping ? (isA ? "animate-demo-mm-card1" : "animate-demo-mm-card2") : ""
      }`}
      style={{
        background: "#1E1840",
        border: "2px solid rgba(120, 90, 180, 0.3)",
        boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
      }}
    >
      {isFlipping ? (
        <>
          <div className={`absolute inset-0 flex items-center justify-center ${
            isA ? "animate-demo-mm-back1" : "animate-demo-mm-back2"
          }`}>
            <GoldStar size={28} />
          </div>
          <div
            className={`absolute inset-0 flex items-center justify-center rounded-xl ${
              isA ? "animate-demo-mm-front1" : "animate-demo-mm-front2"
            }`}
            style={{ background: "#FFF5E6" }}
          >
            <span className="text-4xl">&#x1F431;</span>
          </div>
        </>
      ) : (
        <GoldStar size={28} />
      )}
    </div>
  );
}

function MemoryMatchDemo() {
  return (
    <div className="relative" style={{ width: 340, height: 240 }}>
      <div className="grid grid-cols-3 gap-2.5" style={{ height: "100%" }}>
        {Array.from({ length: 6 }).map((_, i) => (
          <MemoryMatchCard key={i} index={i} />
        ))}
      </div>
      <div className="absolute animate-demo-mm-hand">
        <HandCursor />
      </div>
    </div>
  );
}

/* ================================================================
   Demo: Sorting
   Item (red circle) at top. 3 category boxes at bottom.
   Hand taps correct box, item swoops in, box glows.
   ================================================================ */
function SortingDemo() {
  const boxColors = ["#E74C3C", "#3498DB", "#F1C40F"];

  return (
    <div className="relative" style={{ width: 380, height: 250 }}>
      {/* Item to sort */}
      <div
        className="absolute left-1/2 animate-demo-sort-item"
        style={{ top: 12 }}
      >
        <svg viewBox="0 0 80 80" width="64" height="64" aria-hidden="true" focusable="false">
          <circle
            cx="40"
            cy="40"
            r="34"
            fill="#E74C3C"
            stroke="rgba(0,0,0,0.25)"
            strokeWidth="3"
          />
        </svg>
      </div>

      {/* Category boxes */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-around px-6">
        {boxColors.map((color, i) => (
          <div
            key={i}
            className={`flex items-center justify-center rounded-xl ${
              i === 0 ? "animate-demo-sort-box" : ""
            }`}
            style={{
              width: 90,
              height: 90,
              background: "rgba(255,255,255,0.12)",
              border: `3px solid ${color}`,
              boxShadow: "0 4px 0 rgba(0,0,0,0.2)",
            }}
          >
            <svg viewBox="0 0 40 40" width="32" height="32" aria-hidden="true" focusable="false">
              <circle cx="20" cy="20" r="14" fill={color} opacity="0.45" />
            </svg>
          </div>
        ))}
      </div>

      {/* Hand cursor: moves to correct box and taps */}
      <div className="absolute animate-demo-sort-hand">
        <HandCursor />
      </div>
    </div>
  );
}

/* ================================================================
   Demo: Visual Search
   Left/right panels with shapes. Right panel has one different
   item. Hand cursor points to it and taps.
   ================================================================ */
function VisualSearchDemo() {
  const shapes = [
    { x: 20, y: 22, color: "#3498DB", shape: "circle" },
    { x: 60, y: 18, color: "#E74C3C", shape: "square" },
    { x: 38, y: 55, color: "#F1C40F", shape: "triangle" },
    { x: 78, y: 52, color: "#2ECC71", shape: "circle" },
    { x: 22, y: 78, color: "#9B59B6", shape: "square" },
  ];

  const DIFF_IDX = 2;

  return (
    <div
      className="relative flex gap-3"
      style={{ width: 420, height: 230 }}
    >
      {/* VS divider label */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 text-white/30 text-xs font-bold tracking-widest">
        VS
      </div>

      {/* Left panel (original) */}
      <div
        className="flex-1 relative rounded-xl overflow-hidden"
        style={{
          background: "rgba(255,255,255,0.07)",
          border: "2px solid rgba(255,255,255,0.15)",
        }}
      >
        {shapes.map((s, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              left: `${s.x}%`,
              top: `${s.y}%`,
              transform: "translate(-50%,-50%)",
            }}
          >
            <MiniShape shape={s.shape} color={s.color} size={34} />
          </div>
        ))}
      </div>

      {/* Right panel (with difference) */}
      <div
        className="flex-1 relative rounded-xl overflow-hidden"
        style={{
          background: "rgba(255,255,255,0.07)",
          border: "2px solid rgba(255,255,255,0.15)",
        }}
      >
        {shapes.map((s, i) => {
          const isDiff = i === DIFF_IDX;
          const color = isDiff ? "#E74C3C" : s.color;
          return (
            <div
              key={i}
              className={`absolute ${isDiff ? "animate-demo-vs-target" : ""}`}
              style={{
                left: `${s.x}%`,
                top: `${s.y}%`,
                transform: "translate(-50%,-50%)",
              }}
            >
              <MiniShape shape={s.shape} color={color} size={34} />
            </div>
          );
        })}
      </div>

      {/* Hand cursor points to the difference */}
      <div className="absolute animate-demo-vs-hand">
        <HandCursor />
      </div>
    </div>
  );
}

/* ================================================================
   Demo: Corsi Block
   3x3 grid of blue blocks. Blocks [0,4,8] (diagonal) light up
   in sequence (watching), then hand taps them (input).
   ================================================================ */
function CorsiDemo() {
  const SEQ = [0, 4, 8];

  return (
    <div className="relative" style={{ width: 280, height: 230 }}>
      <div className="grid grid-cols-3 gap-3 w-full h-full">
        {Array.from({ length: 9 }).map((_, i) => {
          const seqPos = SEQ.indexOf(i);
          return (
            <div
              key={i}
              className={`rounded-xl ${
                seqPos >= 0
                  ? `animate-demo-corsi-seq${seqPos + 1}`
                  : ""
              }`}
              style={{
                background: "linear-gradient(135deg, #4FC3F7, #0288D1)",
                border: "3px solid rgba(255,255,255,0.4)",
                boxShadow:
                  "0 4px 0 rgba(0,0,0,0.35), 0 0 12px rgba(79,195,247,0.4)",
              }}
            />
          );
        })}
      </div>

      {/* Hand cursor taps blocks in sequence */}
      <div className="absolute animate-demo-corsi-hand">
        <HandCursor />
      </div>
    </div>
  );
}
