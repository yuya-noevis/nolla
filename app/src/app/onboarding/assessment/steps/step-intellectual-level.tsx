"use client";

import type { AssessmentData, IntellectualLevel } from "@/lib/assessment/types";

type Props = {
  data: AssessmentData;
  onChange: (partial: Partial<AssessmentData>) => void;
  onNext: () => void;
};

const LEVELS: ReadonlyArray<{ value: IntellectualLevel; label: string }> = [
  { value: "severe", label: "重度" },
  { value: "moderate", label: "中度" },
  { value: "mild", label: "軽度" },
];

export function StepIntellectualLevel({ data, onChange, onNext }: Props) {
  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-xl font-bold text-nolla-text text-center">
        知的障害の程度を教えてください
      </h2>

      <div className="flex flex-col gap-3">
        {LEVELS.map(({ value, label }) => {
          const selected = data.intellectualLevel === value;
          return (
            <button
              key={value}
              type="button"
              onClick={() => {
                onChange({ intellectualLevel: value });
                onNext();
              }}
              className={`touch-target w-full px-5 py-4 rounded-xl font-bold text-left transition-colors ${
                selected
                  ? "bg-nolla-primary text-white"
                  : "bg-white border border-[var(--color-parent-input-border)] text-nolla-text"
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
