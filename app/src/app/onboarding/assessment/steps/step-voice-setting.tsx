"use client";

import { useState } from "react";

type Props = {
  onComplete: (voiceEnabled: boolean) => void;
};

export function StepVoiceSetting({ onComplete }: Props) {
  const [loading, setLoading] = useState(false);

  const handleSelect = async (enabled: boolean) => {
    setLoading(true);
    await onComplete(enabled);
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center gap-8">
      <h2 className="text-xl font-bold text-nolla-text text-center">
        音声認識を使いますか？
      </h2>

      <p className="text-sm text-parent-tab-inactive text-center leading-relaxed">
        ONにすると、お子さまが声で答えられるようになります。
        <br />
        OFFの場合は、画面タップで操作します。
        <br />
        あとから設定で変更できます。
      </p>

      <div className="flex gap-4 w-full max-w-sm">
        <button
          type="button"
          onClick={() => handleSelect(true)}
          disabled={loading}
          className="btn-mc flex-1 disabled:opacity-50"
        >
          ON
        </button>
        <button
          type="button"
          onClick={() => handleSelect(false)}
          disabled={loading}
          className="flex-1 touch-target py-3 rounded-xl font-bold bg-white border border-[var(--color-parent-input-border)] text-nolla-text disabled:opacity-50"
        >
          OFF
        </button>
      </div>
    </div>
  );
}
