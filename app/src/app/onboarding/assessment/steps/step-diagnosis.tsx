"use client";

import type { AssessmentData, Diagnosis } from "@/lib/assessment/types";

type Props = {
  data: AssessmentData;
  onChange: (partial: Partial<AssessmentData>) => void;
  onNext: () => void;
};

const DIAGNOSIS_OPTIONS: ReadonlyArray<{ value: Diagnosis; label: string }> = [
  { value: "asd", label: "ASD（自閉スペクトラム症）" },
  { value: "adhd", label: "ADHD" },
  { value: "intellectual_disability", label: "知的障害" },
  { value: "ld", label: "学習障害（LD）" },
  { value: "down_syndrome", label: "ダウン症" },
  { value: "borderline", label: "境界知能" },
  { value: "other", label: "その他" },
];

export function StepDiagnosis({ data, onChange, onNext }: Props) {
  const toggleDiagnosis = (d: Diagnosis) => {
    const current = data.diagnoses;
    const updated = current.includes(d)
      ? current.filter((v) => v !== d)
      : [...current, d];
    onChange({ diagnoses: updated });
  };

  const canProceed = data.diagnoses.length > 0;

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-xl font-bold text-nolla-text text-center">
        診断を選択してください
      </h2>
      <p className="text-sm text-parent-tab-inactive text-center">
        複数選択できます
      </p>

      <div className="flex flex-wrap gap-3 justify-center">
        {DIAGNOSIS_OPTIONS.map(({ value, label }) => {
          const selected = data.diagnoses.includes(value);
          return (
            <button
              key={value}
              type="button"
              onClick={() => toggleDiagnosis(value)}
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
