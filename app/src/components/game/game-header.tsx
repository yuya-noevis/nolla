"use client";

type Props = {
  sessionStars: number;
  onBack: () => void;
};

export function GameHeader({ sessionStars, onBack }: Props) {
  return (
    <header className="flex items-center justify-between px-4 h-[60px] shrink-0">
      <button
        type="button"
        onClick={onBack}
        className="touch-target-child flex items-center justify-center w-14 h-14"
        aria-label="Back"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>

      <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/20 rounded-full">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="#DAA520">
          <polygon points="12,2 15,9 22,9 16.5,14 18.5,21 12,17 5.5,21 7.5,14 2,9 9,9" />
        </svg>
        <span className="text-base font-bold text-white drop-shadow-sm">
          +{sessionStars}
        </span>
      </div>
    </header>
  );
}
