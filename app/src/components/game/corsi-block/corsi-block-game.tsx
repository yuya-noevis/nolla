"use client";

import { useState, useCallback, useMemo, useEffect } from "react";
import type { CorsiBlockParams } from "@/types/domain";
import type { HintStage } from "@/hooks/use-errorless";
import { generateCorsiLayout } from "@/lib/games/corsi-block/generate";

type Props = {
  hintStage: HintStage;
  onTrialResult: (correct: boolean, reactionTimeMs: number) => void;
  onRoundComplete: () => void;
};

type Phase = "watching" | "input" | "result";

const DEFAULT_PARAMS: CorsiBlockParams = {
  blocks: 6,
  seqLength: 3,
  displayMs: 1200,
};

export function CorsiBlockGame({ hintStage, onTrialResult, onRoundComplete }: Props) {
  const layout = useMemo(() => generateCorsiLayout(DEFAULT_PARAMS), []);
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
    }, DEFAULT_PARAMS.displayMs);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, [phase, seqIndex, layout.sequence]);

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
        onTrialResult(false, rt);
        setPhase("result");
        return;
      }

      if (newInput.length === layout.sequence.length) {
        const rt = Date.now() - trialStart;
        onTrialResult(true, rt);
        setPhase("result");
      }
    },
    [phase, inputSequence, layout.sequence, trialStart, onTrialResult]
  );

  // Auto-complete round when result shown
  useEffect(() => {
    if (phase === "result") {
      const timer = setTimeout(() => onRoundComplete(), 800);
      return () => clearTimeout(timer);
    }
  }, [phase, onRoundComplete]);

  // Find the next expected block for hints
  const nextExpectedBlock =
    phase === "input" ? layout.sequence[inputSequence.length] : null;

  return (
    <div className="relative w-full h-full max-w-[800px] max-h-[500px] overflow-hidden">
      {/* Phase indicator */}
      <div className="absolute top-2 left-1/2 -translate-x-1/2 flex gap-1.5">
        {layout.sequence.map((_, i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-full ${
              phase === "watching" && i <= seqIndex
                ? "bg-white"
                : phase === "input" && i < inputSequence.length
                  ? "bg-[var(--color-feedback-correct)]"
                  : "bg-white/30"
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
            className={`absolute touch-target-child rounded-xl transition-all duration-200 ${
              isActive ? "scale-110 brightness-150" : ""
            } ${isHintTarget ? "animate-pulse-gentle" : ""} ${
              isHintGlow ? "ring-4 ring-[var(--color-feedback-correct)]/50" : ""
            }`}
            style={{
              left: `${Math.min((block.x / 800) * 100, 85)}%`,
              top: `${Math.min((block.y / 500) * 100, 80)}%`,
              width: 64,
              height: 64,
              background: isActive
                ? "var(--color-mc-glowstone)"
                : "linear-gradient(135deg, var(--color-mc-stone-light), var(--color-mc-stone))",
              border: "3px solid var(--color-mc-dark-oak)",
              boxShadow: isActive
                ? "0 0 20px rgba(218,165,32,0.6)"
                : "0 4px 0 var(--color-mc-dark-oak-light)",
            }}
            aria-label={`Block ${block.id}`}
          />
        );
      })}
    </div>
  );
}
