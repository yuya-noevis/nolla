"use client";

import { useState, useCallback, useEffect, useRef, useMemo } from "react";
import type {
  MemoryMatchBoard,
  MemoryMatchCard,
  MemoryMatchParams,
} from "@/types/domain";
import type { HintStage } from "@/hooks/use-errorless";
import { generateMemoryMatchBoard } from "@/lib/games/memory-match/generate";
import { memoryMatchBoardsPerRound } from "@/lib/session/trials-per-round";

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
  params: MemoryMatchParams;
  roundKey: number;
  hintStage: HintStage;
  onTrialResult: (
    correct: boolean,
    reactionTimeMs: number,
    gameData?: Record<string, unknown>
  ) => void;
  onRoundComplete: () => void;
};

export function CardGrid({
  params,
  roundKey,
  hintStage,
  onTrialResult,
  onRoundComplete,
}: Props) {
  const boardsPerRound = useMemo(
    () => memoryMatchBoardsPerRound(params),
    [params]
  );
  const [boardIndex, setBoardIndex] = useState(0);
  // boardKey bumps whenever we regenerate the board within a round.
  const [boardKey, setBoardKey] = useState(0);
  const board: MemoryMatchBoard = useMemo(
    () => generateMemoryMatchBoard(params),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [params, roundKey, boardKey]
  );
  const [cardStates, setCardStates] = useState<ReadonlyArray<CardState>>(() =>
    board.cards.map(() => "face-down")
  );
  const [flippedIndices, setFlippedIndices] = useState<ReadonlyArray<number>>([]);
  const [locked, setLocked] = useState(false);
  const trialStartRef = useRef<number>(Date.now());

  // Reset everything when the round changes.
  useEffect(() => {
    setBoardIndex(0);
    setBoardKey(0);
    setFlippedIndices([]);
    setLocked(false);
    trialStartRef.current = Date.now();
  }, [roundKey]);

  // Reset card state whenever a new board is generated (either via round
  // change or via boardKey bump within the same round).
  useEffect(() => {
    setCardStates(board.cards.map(() => "face-down"));
    setFlippedIndices([]);
    setLocked(false);
    trialStartRef.current = Date.now();
  }, [board]);

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
            onTrialResult(true, rt, {
              tappedIndices: [first, second],
              outcome: "match",
              boardIndex,
            });
            trialStartRef.current = Date.now();

            // Check if all pairs on this board matched
            const allMatched = updatedStates.every((s) => s === "matched");
            if (allMatched) {
              setTimeout(() => {
                const nextBoardIndex = boardIndex + 1;
                if (nextBoardIndex >= boardsPerRound) {
                  // All boards in the round cleared → end round.
                  onRoundComplete();
                } else {
                  // Start the next board in the same round.
                  setBoardIndex(nextBoardIndex);
                  setBoardKey((k) => k + 1);
                }
              }, 600);
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
            onTrialResult(false, rt, {
              tappedIndices: [first, second],
              outcome: "miss",
              boardIndex,
            });
            trialStartRef.current = Date.now();
          }, params.flipDelay);
        }
      }
    },
    [
      locked,
      cardStates,
      flippedIndices,
      board.cards,
      params.flipDelay,
      onTrialResult,
      onRoundComplete,
      boardIndex,
      boardsPerRound,
    ]
  );

  return (
    <div
      className="grid gap-2 place-items-center"
      style={{
        gridTemplateColumns: `repeat(${board.gridCols}, ${params.cardSize}px)`,
      }}
    >
      {board.cards.map((card, index) => (
        <CardCell
          key={card.id}
          card={card}
          state={cardStates[index]}
          size={params.cardSize}
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
        isHintTarget ? "animate-pulse-gentle" : ""
      } ${isHintGlow ? "ring-4 ring-[var(--color-feedback-correct)]/50" : ""}`}
      style={{
        width: size,
        height: size,
        background: isFaceUp
          ? "var(--color-mc-oak-light)"
          : "linear-gradient(135deg, var(--color-mc-stone-light), var(--color-mc-stone))",
        border: "3px solid var(--color-mc-dark-oak)",
        boxShadow: "0 4px 0 var(--color-mc-dark-oak-light)",
      }}
      aria-label={`Card ${card.id}`}
    >
      {isFaceUp && (
        <div
          className="flex items-center justify-center w-full h-full"
          style={{ fontSize: Math.floor(size * 0.6) }}
        >
          {IMAGE_GLYPH[card.imageKey] ?? card.imageKey.charAt(0)}
        </div>
      )}
    </button>
  );
}
