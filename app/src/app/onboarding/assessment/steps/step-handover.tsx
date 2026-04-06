"use client";

type Props = {
  onNext: () => void;
};

export function StepHandover({ onNext }: Props) {
  return (
    <div className="flex flex-col items-center gap-8">
      <h2 className="text-xl font-bold text-nolla-text text-center">
        お子さまに端末をわたしてください
      </h2>

      {/* Landscape orientation illustration */}
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          {/* Device outline (landscape) */}
          <svg width="200" height="140" viewBox="0 0 200 140" fill="none">
            <rect x="10" y="10" width="180" height="120" rx="12" stroke="#4A7BA7" strokeWidth="3" fill="rgba(74,123,167,0.05)" />
            <circle cx="100" cy="70" r="20" fill="rgba(74,123,167,0.1)" stroke="#4A7BA7" strokeWidth="2" />
            <path d="M92 63 L112 70 L92 77Z" fill="#4A7BA7" />
          </svg>
        </div>
        <p className="text-sm text-parent-tab-inactive text-center">
          横向きでお使いください
        </p>
      </div>

      <button
        type="button"
        onClick={onNext}
        className="btn-mc w-full max-w-xs"
      >
        Next
      </button>
    </div>
  );
}
