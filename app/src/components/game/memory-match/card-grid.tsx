"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import type { MemoryMatchBoard, MemoryMatchCard } from "@/types/domain";
import type { HintStage } from "@/hooks/use-errorless";

type CardState = "face-down" | "face-up" | "matched";

// Placeholder card art: each imageKey maps to a unique glyph until real
// illustrations are produced. Using distinct glyphs is critical — relying on
// the first letter of imageKey caused different pairs that share an initial
// (e.g. penguin/pear/pineapple all "P") to look identical, which made valid
// matches register as wrong and prevented the staircase from advancing.
const IMAGE_GLYPH: Record<string, string> = {
  cat: "🐱", dog: "🐶", bird: "🐦", fish: "🐟", rabbit: "🐰",
  bear: "🐻", frog: "🐸", turtle: "🐢", lion: "🦁", elephant: "🐘",
  penguin: "🐧", owl: "🦉", dolphin: "🐬", horse: "🐴", butterfly: "🦋",
  apple: "🍎", banana: "🍌", grape: "🍇", orange: "🍊", strawberry: "🍓",
  cherry: "🍒", watermelon: "🍉", peach: "🍑", pear: "🍐", lemon: "🍋",
  pineapple: "🍍", kiwi: "🥝", mango: "🥭", blueberry: "🫐", melon: "🍈",
  car: "🚗", bus: "🚌", train: "🚆", airplane: "✈️", boat: "⛵",
  bicycle: "🚲", rocket: "🚀", helicopter: "🚁", truck: "🚚", ambulance: "🚑",
  taxi: "🚕", submarine: "🛳️", scooter: "🛴", tractor: "🚜", balloon: "🎈",
};

type Props = {
  board: MemoryMatchBoard;
  cardSize: number;
  flipDelay: number;
  hintStage: HintStage;
  onTrialResult: (correct: boolean, reactionTimeMs: number) => void;
  onRoundComplete: () => void;
};

export function CardGrid({
  board,
  cardSize,
  flipDelay,
  hintStage,
  onTrialResult,
  onRoundComplete,
}: Props) {
  const [cardStates, setCardStates] = useState<ReadonlyArray<CardState>>(
    board.cards.map(() => "face-down")
  );
  const [flippedIndices, setFlippedIndices] = useState<ReadonlyArray<number>>([]);
  const [locked, setLocked] = useState(false);
  const trialStartRef = useRef<number>(Date.now());

  // Find correct pair target for hint stages
  const correctPairIndex = flippedIndices.length === 1
    ? board.cards.findIndex(
        (c, i) =>
          i !== flippedIndices[0] &&
          c.pairId === board.cards[flippedIndices[0]].pairId &&
          cardStates[i] === "face-down"
      )
    : -1;

  const handleCardTap = useCallback(
    (index: number) => {
      if (locked) return;
      if (cardStates[index] !== "face-down") return;
      if (flippedIndices.includes(index)) return;

      // Flip card
      const newStates = cardStates.map((s, i) =>
        i === index ? "face-up" : s
      );
      setCardStates(newStates);

      const newFlipped = [...flippedIndices, index];
      setFlippedIndices(newFlipped);

      // Two cards flipped — check match
      if (newFlipped.length === 2) {
        setLocked(true);
        const [first, second] = newFlipped;
        const isMatch =
          board.cards[first].pairId === board.cards[second].pairId;
        const rt = Date.now() - trialStartRef.current;

        if (isMatch) {
          // Match found
          setTimeout(() => {
            const updatedStates = cardStates.map((s, i) =>
              i === first || i === second ? "matched" : s
            );
            setCardStates(updatedStates);
            setFlippedIndices([]);
            setLocked(false);
            onTrialResult(true, rt);
            trialStartRef.current = Date.now();

            // Check if all pairs matched
            const allMatched = updatedStates.every((s) => s === "matched");
            if (allMatched) {
              setTimeout(() => onRoundComplete(), 600);
            }
          }, 500);
        } else {
          // No match — flip back after delay
          setTimeout(() => {
            setCardStates((prev) =>
              prev.map((s, i) =>
                i === first || i === second ? "face-down" : s
              )
            );
            setFlippedIndices([]);
            setLocked(false);
            onTrialResult(false, rt);
            trialStartRef.current = Date.now();
          }, flipDelay);
        }
      }
    },
    [locked, cardStates, flippedIndices, board.cards, flipDelay, onTrialResult, onRoundComplete]
  );

  return (
    <div
      className="grid gap-2 place-items-center"
      style={{
        gridTemplateColumns: `repeat(${board.gridCols}, ${cardSize}px)`,
      }}
    >
      {board.cards.map((card, index) => (
        <CardCell
          key={card.id}
          card={card}
          state={cardStates[index]}
          size={cardSize}
          isHintTarget={hintStage >= 2 && index === correctPairIndex}
          isHintGlow={hintStage >= 3 && index === correctPairIndex}
          onTap={() => handleCardTap(index)}
        />
      ))}
    </div>
  );
}

type CardCellProps = {
  card: MemoryMatchCard;
  state: CardState;
  size: number;
  isHintTarget: boolean;
  isHintGlow: boolean;
  onTap: () => void;
};

function CardCell({ card, state, size, isHintTarget, isHintGlow, onTap }: CardCellProps) {
  const isFaceUp = state === "face-up" || state === "matched";

  return (
    <button
      type="button"
      onClick={onTap}
      disabled={state === "matched"}
      className={`relative rounded-lg transition-transform duration-200 ${
        state === "matched" ? "opacity-40 scale-90" : "active:scale-95"
      } ${isHintTarget ? "animate-pulse-gentle" : ""} ${
        isHintGlow ? "ring-4 ring-[var(--color-feedback-correct)]/50" : ""
      }`}
      style={{ width: size, height: size }}
      aria-label={isFaceUp ? card.imageKey : "Hidden card"}
    >
      {/* Card back */}
      <div
        className={`absolute inset-0 rounded-lg flex items-center justify-center transition-opacity duration-200 ${
          isFaceUp ? "opacity-0" : "opacity-100"
        }`}
        style={{
          background: "linear-gradient(135deg, var(--color-mc-oak-light), var(--color-mc-oak))",
          border: "2px solid var(--color-mc-dark-oak)",
        }}
      >
        <div className="w-6 h-6 rounded-sm" style={{ background: "var(--color-mc-glowstone)", opacity: 0.6 }} />
      </div>

      {/* Card face */}
      <div
        aria-hidden={!isFaceUp}
        className={`absolute inset-0 rounded-lg flex items-center justify-center transition-opacity duration-200 ${
          isFaceUp ? "opacity-100" : "opacity-0"
        }`}
        style={{
          background: "rgba(255,255,255,0.95)",
          border: "2px solid var(--color-mc-stone-light)",
        }}
      >
        <span className="text-4xl select-none" style={{ lineHeight: 1 }}>
          {IMAGE_GLYPH[card.imageKey] ?? card.imageKey}
        </span>
      </div>
    </button>
  );
}
