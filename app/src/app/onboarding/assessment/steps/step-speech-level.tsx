"use client";

import type { AssessmentData, SpeechLevel } from "@/lib/assessment/types";

type Props = {
  data: AssessmentData;
  onChange: (partial: Partial<AssessmentData>) => void;
  onNext: () => void;
};

const SPEECH_OPTIONS: ReadonlyArray<{ value: SpeechLevel; label: string }> = [
  { value: "nonverbal", label: "発語なし" },
  { value: "nonverbal_yes_no", label: "発語なしだがYes/Noは伝えられる" },
  { value: "words_only", label: "単語のみ" },
  { value: "partial", label: "話すが伝わりにくい" },
  { value: "verbal", label: "会話可能" },
];

export function StepSpeechLevel({ data, onChange, onNext }: Props) {
  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-xl font-bold text-nolla-text text-center">
        お子さまの発語レベル
      </h2>

      <div className="flex flex-col gap-3">
        {SPEECH_OPTIONS.map(({ value, label }) => {
          const selected = data.speechLevel === value;
          return (
            <button
              key={value}
              type="button"
              onClick={() => {
                onChange({ speechLevel: value });
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
