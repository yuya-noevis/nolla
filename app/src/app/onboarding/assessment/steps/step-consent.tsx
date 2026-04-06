"use client";

import { useState } from "react";

type Props = {
  onNext: () => void;
};

export function StepConsent({ onNext }: Props) {
  const [agreed, setAgreed] = useState(false);

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-xl font-bold text-nolla-text text-center">
        ご利用にあたって
      </h2>

      <div className="bg-white rounded-xl border border-[var(--color-parent-card-border)] p-5 max-h-48 overflow-y-auto text-sm text-nolla-text leading-relaxed">
        <p className="mb-3">
          Nollaはお子さまの発達を支援するために、以下のデータを収集・利用します。
        </p>
        <ul className="list-disc pl-5 flex flex-col gap-2">
          <li>ゲームプレイの記録（正誤、反応時間）</li>
          <li>タッチ操作の特徴（押す強さ、指の動き）</li>
          <li>デバイスの傾きや動き</li>
          <li>お子さまのプロフィール情報</li>
        </ul>
        <p className="mt-3">
          データは暗号化して安全に保管し、お子さまの支援以外の目的には使用しません。
        </p>
      </div>

      <label className="flex items-start gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
          className="mt-1 w-5 h-5 accent-[var(--color-nolla-primary)]"
        />
        <span className="text-sm text-nolla-text">
          上記に同意し、データの取得・利用を許可します
        </span>
      </label>

      <button
        type="button"
        onClick={onNext}
        disabled={!agreed}
        className="btn-mc w-full disabled:opacity-40"
      >
        Next
      </button>
    </div>
  );
}
