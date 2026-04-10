"use client";

type Props = {
  sessionStars: number;
  onBack: () => void;
  roundNumber?: number;
  totalRounds?: number;
};

export function GameHeader({ sessionStars, onBack, roundNumber = 0, totalRounds = 5 }: Props) {
  return (
    <header
      className="flex items-center justify-between shrink-0 relative z-20"
      style={{
        padding: "8px 16px",
        paddingTop: "max(8px, env(safe-area-inset-top))",
        paddingLeft: "max(16px, env(safe-area-inset-left))",
        paddingRight: "max(16px, env(safe-area-inset-right))",
      }}
    >
      {/* Back button — arrow image */}
      <button
        type="button"
        onClick={onBack}
        className="transition-all duration-200 hover:scale-110 active:scale-95"
        style={{ width: 160, height: 160 }}
        aria-label="Back"
      >
        <img
          src="/arrow_left.png"
          alt=""
          className="w-full h-full object-contain"
          style={{ opacity: 0.75 }}
          draggable={false}
        />
      </button>

      {/* Progress dots */}
      <div
        className="flex gap-[10px] items-center px-4 py-2 rounded-2xl"
        style={{ background: "rgba(0,0,0,0.2)" }}
      >
        {Array.from({ length: totalRounds }).map((_, i) => (
          <div
            key={i}
            className="rounded-full transition-all duration-300"
            style={{
              width: 16,
              height: 16,
              background: i < roundNumber ? "#5DBB5D" : "transparent",
              border: i < roundNumber
                ? "2px solid #5DBB5D"
                : "2px solid rgba(255,255,255,0.3)",
              boxShadow: i < roundNumber ? "0 0 6px rgba(93,187,93,0.4)" : "none",
            }}
          />
        ))}
      </div>
    </header>
  );
}
