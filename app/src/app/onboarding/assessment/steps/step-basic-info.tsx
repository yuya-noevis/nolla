"use client";

import type { AssessmentData } from "@/lib/assessment/types";

type Props = {
  data: AssessmentData;
  onChange: (partial: Partial<AssessmentData>) => void;
  onNext: () => void;
};

export function StepBasicInfo({ data, onChange, onNext }: Props) {
  const canProceed = data.displayName.trim().length > 0;

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-xl font-bold text-nolla-text text-center">
        お子さまについて教えてください
      </h2>

      <div className="flex flex-col gap-4">
        <label className="flex flex-col gap-1">
          <span className="text-sm text-nolla-text">ニックネーム</span>
          <input
            type="text"
            value={data.displayName}
            onChange={(e) => onChange({ displayName: e.target.value })}
            placeholder="ゲーム内で表示される名前"
            className="touch-target w-full px-4 py-3 rounded-xl border border-[var(--color-parent-input-border)] bg-[var(--color-parent-input-bg)] text-nolla-text"
          />
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-sm text-nolla-text">生年月日（任意）</span>
          <input
            type="date"
            value={data.birthDate}
            onChange={(e) => onChange({ birthDate: e.target.value })}
            className="touch-target w-full px-4 py-3 rounded-xl border border-[var(--color-parent-input-border)] bg-[var(--color-parent-input-bg)] text-nolla-text"
          />
        </label>
      </div>

      <button
        type="button"
        onClick={onNext}
        disabled={!canProceed}
        className="btn-mc w-full disabled:opacity-40"
      >
        Next
      </button>
    </div>
  );
}
