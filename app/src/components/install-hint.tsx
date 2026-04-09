"use client";

import { useEffect, useState } from "react";

const DISMISS_KEY = "nolla_install_hint_dismissed";

type Platform = "ios" | "android" | "other";

function detectPlatform(): Platform {
  if (typeof navigator === "undefined") return "other";
  const ua = navigator.userAgent;
  if (/iPhone|iPad|iPod/.test(ua)) return "ios";
  if (/Android/.test(ua)) return "android";
  return "other";
}

function isStandalone(): boolean {
  if (typeof window === "undefined") return false;
  if (window.matchMedia("(display-mode: fullscreen)").matches) return true;
  if (window.matchMedia("(display-mode: standalone)").matches) return true;
  // iOS Safari legacy
  const navAny = window.navigator as Navigator & { standalone?: boolean };
  return navAny.standalone === true;
}

export function InstallHint() {
  const [show, setShow] = useState(false);
  const [platform, setPlatform] = useState<Platform>("other");

  useEffect(() => {
    if (isStandalone()) return;
    if (localStorage.getItem(DISMISS_KEY) === "1") return;
    setPlatform(detectPlatform());
    setShow(true);
  }, []);

  if (!show) return null;

  const dismiss = () => {
    localStorage.setItem(DISMISS_KEY, "1");
    setShow(false);
  };

  const message =
    platform === "ios"
      ? "ホーム画面に追加すると全画面で遊べます。共有ボタン → 「ホーム画面に追加」"
      : platform === "android"
        ? "ホーム画面に追加すると全画面で遊べます。メニュー → 「ホーム画面に追加」"
        : "ホーム画面に追加すると全画面で遊べます。";

  return (
    <div
      role="dialog"
      aria-label="ホーム画面追加のご案内"
      className="fixed inset-x-2 bottom-2 z-40 flex items-center gap-3 rounded-2xl bg-white/95 px-4 py-3 shadow-lg ring-1 ring-black/10 backdrop-blur"
    >
      <p className="flex-1 text-sm text-nolla-text">{message}</p>
      <button
        type="button"
        onClick={dismiss}
        aria-label="閉じる"
        className="min-h-12 min-w-12 rounded-xl bg-nolla-primary px-4 text-sm font-bold text-white"
      >
        OK
      </button>
    </div>
  );
}
