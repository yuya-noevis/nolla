"use client";

import type { AssessmentData, LdType } from "@/lib/assessment/types";

type Props = {
  data: AssessmentData;
  onChange: (partial: Partial<AssessmentData>) => void;
  onNext: () => void;
};

const LD_OPTIONS: ReadonlyArray<{ value: LdType; label: string }> = [
  { value: "dyslexia", label: "読字（ディスレクシア）" },
  { value: "dysgraphia", label: "書字" },
  { value: "dyscalculia", label: "算数" },
  { value: "other", label: "その他" },
];

export function StepLdTypes({ data, onChange, onNext }: Props) {
  const toggleLdType = (t: LdType) => {
    const current = data.ldTypes;
    const updated = current.includes(t)
      ? current.filter((v) => v !== t)
      : [...current, t];
    onChange({ ldTypes: updated });
  };

  const canProceed = data.ldTypes.length > 0;

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-xl font-bold text-nolla-text text-center">
        学習障害の種類を教えてください
      </h2>
      <p className="text-sm text-parent-tab-inactive text-center">
        複数選択できます
      </p>

      <div className="flex flex-wrap gap-3 justify-center">
        {LD_OPTIONS.map(({ value, label }) => {
          const selected = data.ldTypes.includes(value);
          return (
            <button
              key={value}
              type="button"
              onClick={() => toggleLdType(value)}
              className={`touch-target px-5 py-3 rounded-xl font-bold transition-colors ${
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
