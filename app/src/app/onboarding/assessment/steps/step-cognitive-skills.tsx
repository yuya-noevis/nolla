"use client";

import { useState } from "react";
import type { AssessmentData } from "@/lib/assessment/types";

type Props = {
  data: AssessmentData;
  onChange: (partial: Partial<AssessmentData>) => void;
  onNext: () => void;
};

type Question = {
  key: keyof Pick<AssessmentData, "canDistinguishColors" | "canDistinguishShapes" | "canFollowMultiStep">;
  label: string;
};

const QUESTIONS: ReadonlyArray<Question> = [
  { key: "canDistinguishColors", label: "色（赤・青・黄など）を区別できますか？" },
  { key: "canDistinguishShapes", label: "形（丸・三角・四角）を見分けられますか？" },
  { key: "canFollowMultiStep", label: "複数ステップの指示（「拾って、入れて、持ってきて」）を実行できますか？" },
];

export function StepCognitiveSkills({ data, onChange, onNext }: Props) {
  const [questionIndex, setQuestionIndex] = useState(0);
  const current = QUESTIONS[questionIndex];

  const handleAnswer = (answer: boolean) => {
    onChange({ [current.key]: answer });

    if (questionIndex < QUESTIONS.length - 1) {
      setQuestionIndex(questionIndex + 1);
    } else {
      onNext();
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <h2 className="text-xl font-bold text-nolla-text text-center">
        お子さまの認知スキル
      </h2>

      <p className="text-sm text-parent-tab-inactive text-center">
        {questionIndex + 1} / {QUESTIONS.length}
      </p>

      <p className="text-lg text-nolla-text text-center leading-relaxed">
        {current.label}
      </p>

      <div className="flex gap-4 justify-center">
        <button
          type="button"
          onClick={() => handleAnswer(true)}
          className="touch-target-child flex-1 max-w-40 py-4 rounded-xl font-bold bg-nolla-secondary text-white"
        >
          Yes
        </button>
        <button
          type="button"
          onClick={() => handleAnswer(false)}
          className="touch-target-child flex-1 max-w-40 py-4 rounded-xl font-bold bg-white border border-[var(--color-parent-input-border)] text-nolla-text"
        >
          No
        </button>
      </div>
    </div>
  );
}
