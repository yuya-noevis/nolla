"use client";

type Props = {
  sessionStars: number;
  onBack: () => void;
  roundNumber?: number;
  totalRounds?: number;
  currentUnitInRound?: number;
  totalUnitsInRound?: number;
  hideProgress?: boolean;
};

export function GameHeader({
  sessionStars: _stars,
  onBack,
  roundNumber = 0,
  totalRounds = 5,
  currentUnitInRound = 0,
  totalUnitsInRound = 1,
  hideProgress = false,
}: Props) {
  return (
    <header
      className="flex items-start shrink-0 relative z-20"
      style={{
        padding: "4px 20px",
        paddingTop: "max(4px, env(safe-area-inset-top))",
        paddingLeft: "max(20px, env(safe-area-inset-left))",
        paddingRight: "max(20px, env(safe-area-inset-right))",
      }}
    >
      {/* Back button — in flow on the left. Responsive clamp keeps it
          touchable on iPad while never eating iPhone landscape vertical
          space. */}
      <button
        type="button"
        onClick={onBack}
        className="shrink-0 flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95"
        style={{
          width: "clamp(64px, 16vh, 160px)",
          height: "clamp(64px, 16vh, 160px)",
          flexShrink: 0,
        }}
        aria-label="Back"
      >
        <img
          src="/arrow_left.webp"
          alt=""
          className="object-contain pointer-events-none"
          style={{ width: "100%", height: "100%", opacity: 0.9 }}
          draggable={false}
        />
      </button>

      <div className={`flex-1 flex justify-center pt-1 ${hideProgress ? "invisible" : ""}`}>
        <div
          className="flex items-center gap-3 px-4 py-2 rounded-full"
          style={{
            background: "rgba(0,0,0,0.3)",
            border: "1px solid rgba(255,255,255,0.15)",
          }}
        >
          {Array.from({ length: totalRounds }).map((_, roundIdx) => {
            const isPastRound = roundIdx < roundNumber - 1;
            const isCurrentRound = roundIdx === roundNumber - 1;
            return (
              <div key={roundIdx} className="flex items-center gap-3">
                {roundIdx > 0 && (
                  <div
                    className="rounded-full"
                    style={{
                      width: 2,
                      height: 14,
                      background: "rgba(255,255,255,0.25)",
                    }}
                  />
                )}
                <div className="flex gap-[6px]">
                  {Array.from({ length: totalUnitsInRound }).map((_, unitIdx) => {
                    const isFilled =
                      isPastRound ||
                      (isCurrentRound && unitIdx < currentUnitInRound);
                    const isActive =
                      isCurrentRound && unitIdx === currentUnitInRound;
                    return (
                      <div
                        key={unitIdx}
                        className="rounded-full transition-all duration-300"
                        style={{
                          width: 10,
                          height: 10,
                          background: isFilled
                            ? "#5DBB5D"
                            : isActive
                              ? "rgba(255,255,255,0.9)"
                              : "transparent",
                          border: isFilled
                            ? "2px solid #5DBB5D"
                            : isActive
                              ? "2px solid rgba(255,255,255,0.9)"
                              : "2px solid rgba(255,255,255,0.3)",
                          boxShadow: isFilled
                            ? "0 0 6px rgba(93,187,93,0.5)"
                            : isActive
                              ? "0 0 6px rgba(255,255,255,0.6)"
                              : "none",
                        }}
                      />
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right spacer mirroring the back button so the progress row is
          visually centered in the header regardless of back button size. */}
      <div
        aria-hidden
        className="shrink-0"
        style={{ width: "clamp(64px, 16vh, 160px)", height: 1 }}
      />
    </header>
  );
}
