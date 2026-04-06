"use client";

type Props = {
  onContinue: () => void;
  onExit: () => void;
};

export function ExitDialog({ onContinue, onExit }: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="glass-overlay flex gap-8 px-12 py-10">
        {/* Continue (play icon) */}
        <button
          type="button"
          onClick={onContinue}
          className="touch-target-child flex flex-col items-center gap-3"
          aria-label="Continue"
        >
          <div className="w-20 h-20 rounded-full bg-nolla-secondary flex items-center justify-center">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
              <polygon points="8,5 19,12 8,19" />
            </svg>
          </div>
        </button>

        {/* Exit (home icon) */}
        <button
          type="button"
          onClick={onExit}
          className="touch-target-child flex flex-col items-center gap-3"
          aria-label="Exit to home"
        >
          <div className="w-20 h-20 rounded-full bg-white border-2 border-[var(--color-parent-card-border)] flex items-center justify-center">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#4A7BA7" strokeWidth="2">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
          </div>
        </button>
      </div>
    </div>
  );
}
