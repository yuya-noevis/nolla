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

  // Card dimensions: mockup ratio 140:182 ≈ 0.77
  // Scale down for smaller screens to prevent overflow
  const cardW = 140;
  const cardH = 182;

  return (
    <div
      className="grid gap-3 place-items-center"
      style={{
        gridTemplateColumns: `repeat(${board.gridCols}, min(${cardW}px, calc((100vh - 200px) / ${board.gridRows} * 0.77)))`,
      }}
    >
      {board.cards.map((card, index) => (
        <CardCell
          key={card.id}
          card={card}
          state={cardStates[index]}
          width={cardW}
          height={cardH}
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
  width: number;
  height: number;
  isHintTarget: boolean;
  isHintGlow: boolean;
  onTap: () => void;
};

function CardCell({ card, state, width, height, isHintTarget, isHintGlow, onTap }: CardCellProps) {
  const isFaceUp = state === "face-up" || state === "matched";
  const isMatched = state === "matched";

  return (
    <button
      type="button"
      onClick={onTap}
      disabled={isMatched}
      className={`relative transition-transform duration-200 active:scale-95 ${
        isHintTarget ? "animate-pulse-gentle" : ""
      } ${isHintGlow ? "ring-4 ring-[var(--color-feedback-correct)]/50" : ""}`}
      style={{
        width: "100%",
        aspectRatio: "140 / 182",
        perspective: 800,
      }}
      aria-label={`Card ${card.id}`}
    >
      <div
        className="relative w-full h-full transition-transform duration-500"
        style={{
          transformStyle: "preserve-3d",
          transform: isFaceUp ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* Card back */}
        <div
          className="absolute inset-0 flex items-center justify-center rounded-[14px] backface-hidden"
          style={{
            background: "#1E1840",
            border: "2px solid rgba(120, 90, 180, 0.3)",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
            backfaceVisibility: "hidden",
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="#FFD700" style={{ opacity: 0.4 }}>
            <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
          </svg>
        </div>
        {/* Card front */}
        <div
          className="absolute inset-0 flex items-center justify-center rounded-[14px]"
          style={{
            background: "#FFF5E6",
            border: isMatched
              ? "2px solid #5DBB5D"
              : "2px solid rgba(200, 180, 150, 0.3)",
            boxShadow: isMatched
              ? "0 0 20px rgba(93, 187, 93, 0.4), 0 4px 12px rgba(0, 0, 0, 0.2)"
              : "0 4px 12px rgba(0, 0, 0, 0.2)",
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            fontSize: 48,
          }}
        >
          {IMAGE_GLYPH[card.imageKey] ?? card.imageKey.charAt(0)}
        </div>
      </div>
    </button>
  );
}
