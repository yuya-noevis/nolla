"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  CONSTELLATIONS,
  pickConstellation,
  addToRecent,
  type ConstellationPreset,
} from "@/lib/warmup/constellations";
import {
  readRecentConstellations,
  writeRecentConstellations,
} from "@/lib/session/motor-baseline-client";
import { playSfx } from "@/lib/feedback/sfx";
import { vibrate } from "@/lib/feedback/haptic";

const TOTAL_TRIALS = 10;
const MIN_DELAY_MS = 800;
const MAX_DELAY_MS = 2500;
const COMPLETION_DISPLAY_MS = 3000;

// Normalized constellation coordinates are authored in a 100×60 space.
const NORM_WIDTH = 100;
const NORM_HEIGHT = 60;

type Phase = "ready" | "target" | "done";

type TapPoint = { x: number; y: number };

type FlyingStar = {
  key: number;
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
};

type Props = {
  onComplete: (reactionTimes: readonly number[]) => void;
  paused?: boolean;
};

/**
 * Warmup game (/warmup) — motor baseline measurement dressed as a
 * constellation-collecting mini-experience.
 *
 * Scientific constraints (do not change):
 * - Random delay 800–2500ms before stimulus.
 * - Single stimulus per trial.
 * - RT measured from stimulus full-visibility to child tap.
 * - 10 trials total.
 */
export function WarmupGame({ onComplete, paused = false }: Props) {
  const [phase, setPhase] = useState<Phase>("ready");
  const [reactionTimes, setReactionTimes] = useState<readonly number[]>([]);
  const [displayedLandedCount, setDisplayedLandedCount] = useState(0);
  const [preset] = useState<ConstellationPreset>(() =>
    pickConstellation(CONSTELLATIONS, readRecentConstellations()),
  );
  const [targetPos, setTargetPos] = useState<TapPoint | null>(null);
  const [flyingStars, setFlyingStars] = useState<readonly FlyingStar[]>([]);
  const [showConstellation, setShowConstellation] = useState(false);
  const targetShownAtRef = useRef<number>(0);
  const flyingKeyRef = useRef<number>(0);
  const stageRef = useRef<HTMLDivElement>(null);
  const slotRefs = useRef<Array<HTMLDivElement | null>>([]);

  // Persist the chosen preset in recent-history as soon as we mount so the
  // same constellation is not picked again the next session.
  useEffect(() => {
    const next = addToRecent(readRecentConstellations(), preset.id);
    writeRecentConstellations(next);
  }, [preset.id]);

  // Schedule the next stimulus when we're in 'ready' phase.
  useEffect(() => {
    if (phase !== "ready") return;
    if (paused) return;
    if (reactionTimes.length >= TOTAL_TRIALS) {
      // All 10 taps recorded — wait until visible stars have also landed
      // before transitioning to 'done'.
      if (displayedLandedCount >= TOTAL_TRIALS) setPhase("done");
      return;
    }

    const delay = MIN_DELAY_MS + Math.random() * (MAX_DELAY_MS - MIN_DELAY_MS);
    const timer = setTimeout(() => {
      const stage = stageRef.current;
      if (!stage) return;
      const rect = stage.getBoundingClientRect();
      // Place the target in the lower 55% of the stage (so it never overlaps
      // the constellation plate in the upper area).
      const centerX = rect.width / 2;
      const centerY = rect.height * 0.7;
      const angle = Math.random() * Math.PI * 2;
      const radius = 40 + Math.random() * 120;
      setTargetPos({
        x: centerX + Math.cos(angle) * radius,
        y: centerY + Math.sin(angle) * radius * 0.6,
      });
      targetShownAtRef.current = Date.now() + 200; // account for warp-in duration
      setPhase("target");
    }, delay);

    return () => clearTimeout(timer);
  }, [phase, reactionTimes.length, paused, displayedLandedCount]);

  // Transition to 'done' once every flying star has visually landed.
  useEffect(() => {
    if (reactionTimes.length >= TOTAL_TRIALS && displayedLandedCount >= TOTAL_TRIALS && phase !== "done") {
      setPhase("done");
    }
  }, [reactionTimes.length, displayedLandedCount, phase]);

  // Handle completion: show constellation for 3s, then hand off.
  useEffect(() => {
    if (phase !== "done") return;
    setShowConstellation(true);
    playSfx("warmup-complete");
    vibrate("warmup-complete");
    const timer = setTimeout(() => {
      onComplete(reactionTimes);
    }, COMPLETION_DISPLAY_MS);
    return () => clearTimeout(timer);
  }, [phase, reactionTimes, onComplete]);

  const handleTap = useCallback(() => {
    if (phase !== "target" || !targetPos) return;

    const rt = Math.max(0, Date.now() - targetShownAtRef.current);
    const nextTimes = [...reactionTimes, rt];

    const stage = stageRef.current;
    if (!stage) return;

    // Resolve the slot's actual on-screen position via its DOM element.
    // This makes the flying animation accurate regardless of plate layout.
    const slotIndex = nextTimes.length - 1;
    const slotEl = slotRefs.current[slotIndex];
    let toX = targetPos.x;
    let toY = targetPos.y;
    if (slotEl) {
      const slotRect = slotEl.getBoundingClientRect();
      const stageRect = stage.getBoundingClientRect();
      toX = slotRect.left - stageRect.left + slotRect.width / 2;
      toY = slotRect.top - stageRect.top + slotRect.height / 2;
    }

    const key = ++flyingKeyRef.current;
    setFlyingStars((prev) => [
      ...prev,
      { key, fromX: targetPos.x, fromY: targetPos.y, toX, toY },
    ]);

    playSfx("warmup-tap");
    vibrate("tap-success");

    setTargetPos(null);
    setReactionTimes(nextTimes);
    setPhase("ready");
  }, [phase, targetPos, reactionTimes]);

  const registerSlot = useCallback((index: number, el: HTMLDivElement | null) => {
    slotRefs.current[index] = el;
  }, []);

  return (
    <div
      ref={stageRef}
      onClick={phase === "target" ? handleTap : undefined}
      className="absolute inset-0 warmup-bg"
      style={{ cursor: phase === "target" ? "pointer" : "default" }}
    >
      <SlotPlate
        preset={preset}
        landedCount={displayedLandedCount}
        showLines={showConstellation}
        registerSlot={registerSlot}
      />

      {flyingStars.map((fs) => (
        <FlyingOrbSprite
          key={fs.key}
          fromX={fs.fromX}
          fromY={fs.fromY}
          toX={fs.toX}
          toY={fs.toY}
          onDone={() => {
            setFlyingStars((prev) => prev.filter((x) => x.key !== fs.key));
            setDisplayedLandedCount((c) => c + 1);
          }}
        />
      ))}

      {phase === "target" && targetPos && (
        <div
          className="absolute animate-warmup-target-in"
          style={{
            left: targetPos.x,
            top: targetPos.y,
            transform: "translate(-50%, -50%)",
          }}
        >
          <TargetSparkle />
        </div>
      )}
    </div>
  );
}

/**
 * SlotPlate — renders the constellation using a single SVG so the stars
 * and the connecting lines are in the same coordinate system (pixel-
 * perfect alignment, no drift).
 *
 * Before a star is "landed" the slot is completely invisible — the child
 * doesn't know the shape until all 10 stars are collected.
 *
 * We still need a DOM handle per slot so the flying-star animation can
 * target a screen-pixel position. We provide that via invisible
 * `foreignObject`-free tracker divs that mirror the SVG layout.
 */
function SlotPlate({
  preset,
  landedCount,
  showLines,
  registerSlot,
}: {
  preset: ConstellationPreset;
  landedCount: number;
  showLines: boolean;
  registerSlot: (index: number, el: HTMLDivElement | null) => void;
}) {
  return (
    <div className="absolute top-0 left-0 right-0 pt-8 pointer-events-none">
      <div
        className="relative mx-auto"
        style={{ width: "72%", aspectRatio: `${NORM_WIDTH} / ${NORM_HEIGHT}` }}
      >
        {/* SVG for constellation lines (aligned to slot coordinates exactly) */}
        <svg
          viewBox={`0 0 ${NORM_WIDTH} ${NORM_HEIGHT}`}
          className="absolute inset-0 w-full h-full overflow-visible"
          preserveAspectRatio="none"
        >
          {showLines &&
            preset.lines.map(([a, b], i) => {
              const sa = preset.slots[a];
              const sb = preset.slots[b];
              return (
                <line
                  key={`line-${i}`}
                  x1={sa.x}
                  y1={sa.y}
                  x2={sb.x}
                  y2={sb.y}
                  stroke="rgba(200, 225, 255, 0.7)"
                  strokeWidth={0.8}
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                  className="animate-warmup-line"
                  style={{ animationDelay: `${i * 70}ms` }}
                />
              );
            })}
        </svg>

        {/* Landed stars — rendered as HTML at exact plate-relative positions.
            Using absolute divs for the stars (not SVG) lets us reuse the
            same MiniSparkle component the flying sprite uses, so the
            visual is 100% consistent between flight and landing. */}
        {preset.slots.map((slot, i) => {
          if (i >= landedCount) return null;
          return (
            <div
              key={`star-${i}`}
              className="absolute animate-warmup-star-land"
              style={{
                left: `${slot.x}%`,
                top: `${(slot.y / NORM_HEIGHT) * 100}%`,
                transform: "translate(-50%, -50%)",
                pointerEvents: "none",
              }}
            >
              <MiniSparkle />
            </div>
          );
        })}

        {/* Invisible DOM trackers — one per slot so the flying-star
            animation can read an exact on-screen pixel position for
            each landing target. Always rendered, never visible. */}
        {preset.slots.map((slot, i) => (
          <div
            key={`tracker-${i}`}
            ref={(el) => registerSlot(i, el)}
            className="absolute"
            style={{
              left: `${slot.x}%`,
              top: `${(slot.y / NORM_HEIGHT) * 100}%`,
              width: 1,
              height: 1,
              transform: "translate(-50%, -50%)",
              pointerEvents: "none",
            }}
          />
        ))}
      </div>
    </div>
  );
}

let sparkleIdCounter = 0;

/**
 * StarSparkle — a blue-white real-star look with long thin diffraction
 * spikes (vertical dominant), hot-white core, tight blue halo.
 * Scales via the `size` prop so ALL sparkles in the warmup scene
 * (target, flying, landed) share the same visual.
 */
function StarSparkle({ size = 200 }: { size?: number }) {
  // Unique IDs per instance so SVG defs don't collide.
  const uid = useMemo(() => `sparkle-${++sparkleIdCounter}`, []);
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" overflow="visible">
      <defs>
        <radialGradient id={`${uid}-halo-outer`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#E0F0FF" stopOpacity="0.55" />
          <stop offset="35%" stopColor="#6FA8F0" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#1F4A94" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`${uid}-halo-inner`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
          <stop offset="35%" stopColor="#D0E8FF" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#6FA8F0" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${uid}-spike-v`} x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
          <stop offset="35%" stopColor="#E8F4FF" stopOpacity="0.7" />
          <stop offset="50%" stopColor="#FFFFFF" stopOpacity="1" />
          <stop offset="65%" stopColor="#E8F4FF" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`${uid}-spike-h`} x1="0%" y1="50%" x2="100%" y2="50%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
          <stop offset="35%" stopColor="#E8F4FF" stopOpacity="0.7" />
          <stop offset="50%" stopColor="#FFFFFF" stopOpacity="1" />
          <stop offset="65%" stopColor="#E8F4FF" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </linearGradient>
        <filter id={`${uid}-halo-blur`} x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="10" />
        </filter>
      </defs>
      <circle cx="100" cy="100" r="80" fill={`url(#${uid}-halo-outer)`} filter={`url(#${uid}-halo-blur)`} />
      <circle cx="100" cy="100" r="24" fill={`url(#${uid}-halo-inner)`} />
      <ellipse cx="100" cy="100" rx="1.6" ry="95" fill={`url(#${uid}-spike-v)`} />
      <ellipse cx="100" cy="100" rx="80" ry="1.4" fill={`url(#${uid}-spike-h)`} />
      <ellipse
        cx="100" cy="100" rx="1.1" ry="50"
        fill={`url(#${uid}-spike-v)`} opacity="0.6"
        transform="rotate(45 100 100)"
      />
      <ellipse
        cx="100" cy="100" rx="1.1" ry="50"
        fill={`url(#${uid}-spike-v)`} opacity="0.6"
        transform="rotate(-45 100 100)"
      />
      <circle cx="100" cy="100" r="5" fill="#FFFFFF" />
    </svg>
  );
}

function TargetSparkle() {
  return <StarSparkle size={200} />;
}

function MiniSparkle() {
  return <StarSparkle size={70} />;
}

const FLY_DURATION_MS = 520;

function FlyingOrbSprite({
  fromX,
  fromY,
  toX,
  toY,
  onDone,
}: {
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
  onDone: () => void;
}) {
  const [moved, setMoved] = useState(false);

  useEffect(() => {
    const rAF = requestAnimationFrame(() => setMoved(true));
    const timer = setTimeout(onDone, FLY_DURATION_MS + 60);
    return () => {
      cancelAnimationFrame(rAF);
      clearTimeout(timer);
    };
  }, [onDone]);

  const x = moved ? toX : fromX;
  const y = moved ? toY : fromY;
  // Final scale matches the plate-rendered orb size so the flying sprite
  // blends cleanly into the constellation at the landing moment.
  const scale = moved ? 0.28 : 1;

  return (
    <div
      className="absolute pointer-events-none"
      style={{
        left: 0,
        top: 0,
        transform: `translate(${x}px, ${y}px) translate(-50%, -50%) scale(${scale})`,
        transition: `transform ${FLY_DURATION_MS}ms cubic-bezier(0.4, 0.0, 0.2, 1)`,
      }}
    >
      <TargetSparkle />
    </div>
  );
}
