"use client";

import { useCallback, useEffect, useRef, useState } from "react";
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
// We scale them to the render area in pixels at runtime.
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
  const [preset] = useState<ConstellationPreset>(() =>
    pickConstellation(CONSTELLATIONS, readRecentConstellations()),
  );
  const [targetPos, setTargetPos] = useState<TapPoint | null>(null);
  const [flyingStars, setFlyingStars] = useState<readonly FlyingStar[]>([]);
  const [showConstellation, setShowConstellation] = useState(false);
  const targetShownAtRef = useRef<number>(0);
  const flyingKeyRef = useRef<number>(0);
  const stageRef = useRef<HTMLDivElement>(null);

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
      setPhase("done");
      return;
    }

    const delay = MIN_DELAY_MS + Math.random() * (MAX_DELAY_MS - MIN_DELAY_MS);
    const timer = setTimeout(() => {
      const stage = stageRef.current;
      if (!stage) return;
      const rect = stage.getBoundingClientRect();
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * 140;
      setTargetPos({
        x: centerX + Math.cos(angle) * radius,
        y: centerY + Math.sin(angle) * radius,
      });
      targetShownAtRef.current = Date.now() + 300; // account for warp-in duration
      setPhase("target");
    }, delay);

    return () => clearTimeout(timer);
  }, [phase, reactionTimes.length, paused]);

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
    const slot = preset.slots[nextTimes.length - 1];
    const toX = (slot.x / NORM_WIDTH) * stage.clientWidth;
    const toY = (slot.y / NORM_HEIGHT) * (stage.clientHeight * 0.5);

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
  }, [phase, targetPos, reactionTimes, preset.slots]);

  const landedCount = reactionTimes.length;

  return (
    <div
      ref={stageRef}
      onClick={phase === "target" ? handleTap : undefined}
      className="absolute inset-0 warmup-bg"
      style={{ cursor: phase === "target" ? "pointer" : "default" }}
    >
      {/* Constellation plate: 10 slot markers in upper half */}
      <SlotPlate preset={preset} landedCount={landedCount} showLines={showConstellation} />

      {/* Flying stars animation layer */}
      {flyingStars.map((fs) => (
        <FlyingStarSprite
          key={fs.key}
          fromX={fs.fromX}
          fromY={fs.fromY}
          toX={fs.toX}
          toY={fs.toY}
          onDone={() => {
            setFlyingStars((prev) => prev.filter((x) => x.key !== fs.key));
          }}
        />
      ))}

      {/* Active target */}
      {phase === "target" && targetPos && (
        <div
          className="absolute animate-warmup-target-in"
          style={{
            left: targetPos.x,
            top: targetPos.y,
            transform: "translate(-50%, -50%)",
          }}
        >
          <TargetStar />
        </div>
      )}
    </div>
  );
}

function SlotPlate({
  preset,
  landedCount,
  showLines,
}: {
  preset: ConstellationPreset;
  landedCount: number;
  showLines: boolean;
}) {
  return (
    <div className="absolute top-0 left-0 right-0 pt-8 pointer-events-none">
      <div
        className="relative mx-auto"
        style={{ width: "80%", aspectRatio: `${NORM_WIDTH} / ${NORM_HEIGHT}` }}
      >
        {/* Line layer (shown after all 10 collected) */}
        {showLines && (
          <svg
            viewBox={`0 0 ${NORM_WIDTH} ${NORM_HEIGHT}`}
            className="absolute inset-0 w-full h-full overflow-visible"
            preserveAspectRatio="none"
          >
            {preset.lines.map(([a, b], i) => {
              const sa = preset.slots[a];
              const sb = preset.slots[b];
              return (
                <line
                  key={i}
                  x1={sa.x}
                  y1={sa.y}
                  x2={sb.x}
                  y2={sb.y}
                  stroke="rgba(255,255,255,0.85)"
                  strokeWidth={0.4}
                  strokeLinecap="round"
                  className="animate-warmup-line"
                  style={{ animationDelay: `${i * 60}ms` }}
                />
              );
            })}
          </svg>
        )}

        {/* Slot markers */}
        {preset.slots.map((slot, i) => {
          const landed = i < landedCount;
          return (
            <div
              key={i}
              className="absolute"
              style={{
                left: `${slot.x}%`,
                top: `${(slot.y / NORM_HEIGHT) * 100}%`,
                transform: "translate(-50%, -50%)",
              }}
            >
              {landed ? (
                <div
                  className={`animate-warmup-star-land ${
                    showLines ? "animate-warmup-complete" : ""
                  }`}
                  style={{ transform: "translate(-50%, -50%)" }}
                >
                  <MiniStar />
                </div>
              ) : (
                <div
                  className="animate-warmup-slot"
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: "50%",
                    border: "1px dashed rgba(255,255,255,0.4)",
                    transform: "translate(-50%, -50%)",
                  }}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function TargetStar() {
  return (
    <svg width="128" height="128" viewBox="0 0 128 128">
      <defs>
        <radialGradient id="warmup-target-grad" cx="50%" cy="45%" r="55%">
          <stop offset="0%" stopColor="#FFF8D6" />
          <stop offset="60%" stopColor="#FFD75E" />
          <stop offset="100%" stopColor="#E89B2D" />
        </radialGradient>
        <filter id="warmup-target-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <polygon
        points="64,10 77,48 118,48 85,72 97,116 64,90 31,116 43,72 10,48 51,48"
        fill="url(#warmup-target-grad)"
        stroke="#FFFFFF"
        strokeWidth="2"
        filter="url(#warmup-target-glow)"
      />
    </svg>
  );
}

function MiniStar() {
  return (
    <svg width="28" height="28" viewBox="0 0 32 32">
      <defs>
        <radialGradient id="mini-star-grad" cx="50%" cy="45%" r="55%">
          <stop offset="0%" stopColor="#FFF8D6" />
          <stop offset="100%" stopColor="#FFCE5C" />
        </radialGradient>
      </defs>
      <polygon
        points="16,3 20,12 30,12 22,18 25,28 16,22 7,28 10,18 2,12 12,12"
        fill="url(#mini-star-grad)"
        stroke="#FFFFFF"
        strokeWidth="1"
      />
    </svg>
  );
}

const FLY_DURATION_MS = 480;

function FlyingStarSprite({
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
    const timer = setTimeout(onDone, FLY_DURATION_MS + 50);
    return () => {
      cancelAnimationFrame(rAF);
      clearTimeout(timer);
    };
  }, [onDone]);

  const x = moved ? toX : fromX;
  const y = moved ? toY : fromY;

  return (
    <div
      className="absolute pointer-events-none"
      style={{
        left: 0,
        top: 0,
        transform: `translate(${x}px, ${y}px) translate(-50%, -50%)`,
        transition: `transform ${FLY_DURATION_MS}ms cubic-bezier(0.4, 0.0, 0.2, 1)`,
      }}
    >
      <MiniStar />
    </div>
  );
}
