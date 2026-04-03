"use client";

import { GameCard } from "@/components/ui/GameCard";
import { TouchButton } from "@/components/ui/TouchButton";
import { CHARACTER_IMAGES, type GameId } from "@/lib/assets";

const GAMES: readonly GameId[] = [
  "nakamawake",
  "oboete",
  "mitsukete",
  "kotoba",
  "ohanashi",
];

export default function HomePage() {
  const handleGameSelect = (gameId: GameId) => {
    // Phase 2+ for actual navigation
    console.log(`Game selected: ${gameId}`);
  };

  const handleParentMenu = () => {
    // Phase 6 for PIN entry
    console.log("Parent menu requested");
  };

  return (
    <main className="h-dvh flex flex-col items-center justify-evenly px-6 py-6 bg-nolla-bg">
      {/* Character greeting area */}
      <div className="flex flex-col items-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={CHARACTER_IMAGES.main}
          alt=""
          width={120}
          height={120}
          className="drop-shadow-md"
        />
      </div>

      {/* Game selection grid */}
      <div className="flex flex-col items-center gap-5">
        {/* Top row: 3 cognitive games */}
        <div className="flex gap-4">
          {GAMES.slice(0, 3).map((gameId) => (
            <GameCard
              key={gameId}
              gameId={gameId}
              onSelect={handleGameSelect}
            />
          ))}
        </div>
        {/* Bottom row: 2 ST games */}
        <div className="flex gap-4">
          {GAMES.slice(3).map((gameId) => (
            <GameCard
              key={gameId}
              gameId={gameId}
              onSelect={handleGameSelect}
            />
          ))}
        </div>
      </div>

      {/* Bottom area: stars + parent menu */}
      <div className="flex flex-col items-center gap-3">
        {/* Star count */}
        <div className="flex items-center gap-2 px-5 py-2.5 bg-white/70 rounded-full shadow-sm">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="#D4A574">
            <polygon points="12,2 15,9 22,9 16.5,14 18.5,21 12,17 5.5,21 7.5,14 2,9 9,9" />
          </svg>
          <span className="text-xl font-bold text-nolla-text">0</span>
        </div>

        {/* Parent menu button */}
        <TouchButton
          onClick={handleParentMenu}
          ariaLabel="Parent menu"
          className="px-5 py-2.5 bg-white/50 rounded-full shadow-sm"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="3" width="18" height="18" rx="4" stroke="#4A7BA7" strokeWidth="2" />
            <circle cx="12" cy="10" r="3" fill="#4A7BA7" />
            <path d="M7 18 Q7 14 12 14 Q17 14 17 18" fill="#4A7BA7" />
          </svg>
        </TouchButton>
      </div>
    </main>
  );
}
