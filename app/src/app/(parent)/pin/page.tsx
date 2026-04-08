"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";

const PIN_LENGTH = 4;

type PinPhase = "enter" | "set_new" | "confirm_new";

export default function PinPage() {
  const router = useRouter();
  const [pin, setPin] = useState("");
  const [phase, setPhase] = useState<PinPhase>("enter");
  const [newPin, setNewPin] = useState("");
  const [error, setError] = useState("");

  const handleDigit = useCallback(
    (digit: string) => {
      if (pin.length >= PIN_LENGTH) return;
      const next = pin + digit;
      setPin(next);
      setError("");

      if (next.length === PIN_LENGTH) {
        handlePinComplete(next);
      }
    },
    [pin, phase, newPin]
  );

  const handlePinComplete = async (completed: string) => {
    if (phase === "enter") {
      const res = await fetch("/api/parent/verify-pin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pin: completed }),
      });
      if (res.ok) {
        router.push("/dashboard");
      } else if (res.status === 404) {
        setPhase("set_new");
        setPin("");
      } else {
        setError("PINが正しくありません");
        setPin("");
      }
    } else if (phase === "set_new") {
      setNewPin(completed);
      setPhase("confirm_new");
      setPin("");
    } else if (phase === "confirm_new") {
      if (completed === newPin) {
        await fetch("/api/parent/set-pin", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ pin: completed }),
        });
        router.push("/dashboard");
      } else {
        setError("PINが一致しません。もう一度入力してください");
        setPhase("set_new");
        setNewPin("");
        setPin("");
      }
    }
  };

  const handleDelete = useCallback(() => {
    setPin((prev) => prev.slice(0, -1));
    setError("");
  }, []);

  const title =
    phase === "enter"
      ? "PINを入力してください"
      : phase === "set_new"
        ? "新しいPINを設定してください"
        : "もう一度入力してください";

  return (
    // BUG-12 fix: outer wrapper allows scrolling on smartphone landscape
    // (812×375) where the unscaled numpad just barely overflows the
    // viewport. Padding and gaps shrunk for short heights so the whole
    // pad fits in ~330px when landscape phones are used.
    <div className="h-full w-full overflow-y-auto bg-nolla-bg">
      <div className="min-h-full flex flex-col items-center justify-center px-4 py-3">
        <h1 className="mb-1 text-base sm:text-xl font-bold text-nolla-text">
          {title}
        </h1>

        {error && (
          <p className="mb-2 text-xs sm:text-sm" style={{ color: "#B8906A" }}>
            {error}
          </p>
        )}

        {/* Dot indicators */}
        <div className="mb-3 sm:mb-6 flex gap-3">
          {Array.from({ length: PIN_LENGTH }, (_, i) => (
            <div
              key={i}
              className="h-3 w-3 sm:h-4 sm:w-4 rounded-full transition-colors"
              style={{
                backgroundColor:
                  i < pin.length
                    ? "var(--color-nolla-primary)"
                    : "rgba(0,0,0,0.1)",
              }}
            />
          ))}
        </div>

        {/* Number pad */}
        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          {["1", "2", "3", "4", "5", "6", "7", "8", "9", "", "0", "del"].map(
            (key) => {
              if (key === "") return <div key="empty" />;
              if (key === "del") {
                return (
                  <button
                    key="del"
                    onClick={handleDelete}
                    className="touch-target flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-xl text-lg font-medium text-nolla-text"
                    style={{ background: "var(--color-parent-input-bg)" }}
                    aria-label="削除"
                  >
                    ←
                  </button>
                );
              }
              return (
                <button
                  key={key}
                  onClick={() => handleDigit(key)}
                  className="touch-target flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-xl text-lg sm:text-xl font-bold text-nolla-text transition-colors hover:bg-white/80"
                  style={{ background: "rgba(255,255,255,0.95)" }}
                >
                  {key}
                </button>
              );
            }
          )}
        </div>
      </div>
    </div>
  );
}
