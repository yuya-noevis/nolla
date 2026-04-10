"use client";

import { useState, useCallback, useMemo, useEffect } from "react";
import type { CorsiBlockParams } from "@/types/domain";
import type { HintStage } from "@/hooks/use-errorless";
import { generateCorsiLayout } from "@/lib/games/corsi-block/generate";
import { CORSI_TRIALS_PER_ROUND } from "@/lib/session/trials-per-round";

type Props = {
  params: CorsiBlockParams;
  roundKey: number;
  hintStage: HintStage;
  onTrialResult: (
    correct: boolean,
    reactionTimeMs: number,
    gameData?: Record<string, unknown>
  ) => void;
  onRoundComplete: () => void;
};

type Phase = "watching" | "input" | "result";

// Corsi multi-trial per round. The constant lives in
// lib/session/trials-per-round.ts so trial counts are kept in one place
// across all games (FitzGerald & Meyer 2005 adaptive Corsi standard).
const TRIALS_PER_ROUND = CORSI_TRIALS_PER_ROUND;

export function CorsiBlockGame({ params, roundKey, hintStage, onTrialResult, onRoundComplete }: Props) {
  // trialKey changes per-trial → forces sequence regeneration via useMemo dep.
  const [trialKey, setTrialKey] = useState(0);
  const [trialIndex, setTrialIndex] = useState(0);
  const layout = useMemo(
    () => generateCorsiLayout(params),
    [params, roundKey, trialKey]
  );
  const [phase, setPhase] = useState<Phase>("watching");
  const [activeBlock, setActiveBlock] = useState<number | null>(null);
  const [seqIndex, setSeqIndex] = useState(0);
  const [inputSequence, setInputSequence] = useState<ReadonlyArray<number>>([]);
  const [trialStart, setTrialStart] = useState(Date.now());

  // Sequence playback
  useEffect(() => {
    if (phase !== "watching") return;

    if (seqIndex >= layout.sequence.length) {
      setActiveBlock(null);
      setPhase("input");
      setTrialStart(Date.now());
      return;
    }

    const showTimer = setTimeout(() => {
      setActiveBlock(layout.sequence[seqIndex]);
    }, 300);

    const hideTimer = setTimeout(() => {
      setActiveBlock(null);
      setSeqIndex((i) => i + 1);
    }, params.displayMs);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, [phase, seqIndex, layout.sequence, params.displayMs]);

  // Reset when round changes
  useEffect(() => {
    setTrialIndex(0);
    setTrialKey(0);
    setPhase("watching");
    setSeqIndex(0);
    setInputSequence([]);
    setActiveBlock(null);
    setTrialStart(Date.now());
  }, [roundKey]);

  // Reset for next trial within the same round (but not when roundKey changes)
  useEffect(() => {
    if (trialKey === 0) return;
    setPhase("watching");
    setSeqIndex(0);
    setInputSequence([]);
    setActiveBlock(null);
    setTrialStart(Date.now());
  }, [trialKey]);

  const handleBlockTap = useCallback(
    (blockId: number) => {
      if (phase !== "input") return;

      const newInput = [...inputSequence, blockId];
      setInputSequence(newInput);

      // Flash the tapped block
      setActiveBlock(blockId);
      setTimeout(() => setActiveBlock(null), 200);

      const expectedIndex = newInput.length - 1;
      const isCorrectSoFar = layout.sequence[expectedIndex] === blockId;

      if (!isCorrectSoFar) {
        const rt = Date.now() - trialStart;
        onTrialResult(false, rt, {
          targetSequence: layout.sequence,
          inputSequence: newInput,
          failedAt: expectedIndex,
          trialIndex,
        });
        setPhase("result");
        return;
      }

      if (newInput.length === layout.sequence.length) {
        const rt = Date.now() - trialStart;
        onTrialResult(true, rt, {
          targetSequence: layout.sequence,
          inputSequence: newInput,
          trialIndex,
        });
        setPhase("result");
      }
    },
    [phase, inputSequence, layout.sequence, trialStart, onTrialResult]
  );

  // After each trial's result phase, advance to the next trial or
  // complete the round once TRIALS_PER_ROUND trials have been played.
  useEffect(() => {
    if (phase !== "result") return;
    const timer = setTimeout(() => {
      const nextTrialIndex = trialIndex + 1;
      if (nextTrialIndex >= TRIALS_PER_ROUND) {
        onRoundComplete();
      } else {
        setTrialIndex(nextTrialIndex);
        setTrialKey((k) => k + 1);
      }
    }, 800);
    return () => clearTimeout(timer);
  }, [phase, trialIndex, onRoundComplete]);

  // Find the next expected block for hints
  const nextExpectedBlock =
    phase === "input" ? layout.sequence[inputSequence.length] : null;

  // Generator coordinate space (must match generate.ts AREA_WIDTH/HEIGHT)
  const AREA_WIDTH = 800;
  const AREA_HEIGHT = 500;
  // Block size — larger for accessibility. Use rectangular shape (wider than tall).
  const blockW = Math.max(layout.blockSize, 90);
  const blockH = Math.max(layout.blockSize, 90);
  const blockSizePctW = (blockW / AREA_WIDTH) * 100;
  const blockSizePctH = (blockH / AREA_HEIGHT) * 100;

  return (
    // BUG-10/11 fix round 2: use container query units (cqw / cqh) so the
    // board sizes against the *actual* parent game area, not the browser
    // viewport. The previous `100vh` reference ignored the GameFrame
    // header/footer and clipped the top/bottom rows of blocks.
    //
    // containerType: 'size' on the wrapper makes cqw/cqh refer to *its*
    // box. The inner board takes the largest rectangle that (a) fits the
    // wrapper on both axes and (b) preserves the generator's 800:500
    // aspect ratio.
    <div
      className="w-full h-full flex items-center justify-center"
      style={{ containerType: "size" }}
    >
      <div
        className="relative"
        style={{
          width: `min(100cqw, calc(100cqh * ${AREA_WIDTH} / ${AREA_HEIGHT}))`,
          aspectRatio: `${AREA_WIDTH} / ${AREA_HEIGHT}`,
          maxWidth: "100%",
          maxHeight: "100%",
        }}
        data-testid="corsi-board"
      >
        {/* Phase indicator — small, top-right corner */}
        <div className="absolute top-1 right-2 flex gap-1">
          {layout.sequence.map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full ${
                phase === "watching" && i <= seqIndex
                  ? "bg-white"
                  : phase === "input" && i < inputSequence.length
                    ? "bg-[var(--color-feedback-correct)]"
                    : "bg-white/20"
              }`}
            />
          ))}
        </div>

        {/* Blocks */}
        {layout.blocks.map((block) => {
          const isActive = activeBlock === block.id;
          const isHintTarget = hintStage >= 2 && block.id === nextExpectedBlock;
          const isHintGlow = hintStage >= 3 && block.id === nextExpectedBlock;

          return (
            <button
              key={block.id}
              type="button"
              onClick={() => handleBlockTap(block.id)}
              disabled={phase !== "input"}
              className={`absolute touch-target-child rounded-2xl transition-all duration-200 ${
                isActive ? "scale-110 brightness-150" : ""
              } ${isHintTarget ? "animate-pulse-gentle" : ""} ${
                isHintGlow ? "ring-4 ring-[var(--color-feedback-correct)]/50" : ""
              }`}
              style={{
                left: `${(block.x / AREA_WIDTH) * 100}%`,
                top: `${(block.y / AREA_HEIGHT) * 100}%`,
                width: `${blockSizePctW}%`,
                height: `${blockSizePctH}%`,
                transform: "translate(-50%, -50%)",
                background: isActive
                  ? "var(--color-mc-glowstone)"
                  : "linear-gradient(135deg, var(--color-mc-stone-light), var(--color-mc-stone))",
                border: "3px solid var(--color-mc-dark-oak)",
                boxShadow: isActive
                  ? "0 0 20px rgba(218,165,32,0.6)"
                  : "0 4px 0 var(--color-mc-dark-oak-light)",
              }}
              data-block-id={block.id}
              data-block-size={layout.blockSize}
              aria-label={`Block ${block.id}`}
            />
          );
        })}
      </div>
    </div>
  );
}
