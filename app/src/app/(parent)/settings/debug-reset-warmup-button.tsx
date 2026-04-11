"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { clearMotorBaseline } from "@/lib/session/motor-baseline-client";

export function DebugResetWarmupButton() {
  const router = useRouter();

  const handleClick = useCallback(() => {
    clearMotorBaseline();
    try {
      window.localStorage.removeItem("nolla_warmup_recent_constellations");
    } catch {
      // ignore
    }
    router.push("/warmup");
  }, [router]);

  return (
    <button
      type="button"
      onClick={handleClick}
      className="touch-target w-full rounded-xl py-3 text-sm font-medium"
      style={{
        background: "rgba(74, 123, 167, 0.12)",
        color: "#4A7BA7",
        border: "1px dashed rgba(74, 123, 167, 0.4)",
      }}
    >
      ウォームアップを再テスト（開発用）
    </button>
  );
}
