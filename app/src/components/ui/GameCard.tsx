"use client";

import { GAME_COLORS, GAME_ICONS, type GameId } from "@/lib/assets";

type GameCardProps = {
  readonly gameId: GameId;
  readonly onSelect: (gameId: GameId) => void;
};

export function GameCard({ gameId, onSelect }: GameCardProps) {
  const colors = GAME_COLORS[gameId];
  const iconPath = GAME_ICONS[gameId];

  return (
    <button
      type="button"
      onClick={() => onSelect(gameId)}
      aria-label={gameId}
      className="
        w-[100px] h-[100px]
        flex items-center justify-center
        rounded-3xl
        transition-transform duration-100 active:scale-95
        focus:outline-none focus-visible:ring-2 focus-visible:ring-nolla-primary
        shadow-md
      "
      style={{
        backgroundColor: colors.bg,
        border: `3px solid ${colors.border}`,
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={iconPath}
        alt=""
        width={48}
        height={48}
        className="pointer-events-none"
      />
    </button>
  );
}
