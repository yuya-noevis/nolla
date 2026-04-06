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
    <div className="flex h-full flex-col items-center justify-center bg-nolla-bg">
      <h1 className="mb-2 text-xl font-bold text-nolla-text">{title}</h1>

      {error && (
        <p className="mb-4 text-sm" style={{ color: "#B8906A" }}>
          {error}
        </p>
      )}

      {/* Dot indicators */}
      <div className="mb-8 flex gap-3">
        {Array.from({ length: PIN_LENGTH }, (_, i) => (
          <div
            key={i}
            className="h-4 w-4 rounded-full transition-colors"
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
      <div className="grid grid-cols-3 gap-3">
        {["1", "2", "3", "4", "5", "6", "7", "8", "9", "", "0", "del"].map(
          (key) => {
            if (key === "") return <div key="empty" />;
            if (key === "del") {
              return (
                <button
                  key="del"
                  onClick={handleDelete}
                  className="touch-target flex items-center justify-center rounded-xl text-lg font-medium text-nolla-text"
                  style={{ background: "var(--color-parent-input-bg)" }}
                >
                  ←
                </button>
              );
            }
            return (
              <button
                key={key}
                onClick={() => handleDigit(key)}
                className="touch-target flex h-16 w-16 items-center justify-center rounded-xl text-xl font-bold text-nolla-text transition-colors hover:bg-white/80"
                style={{ background: "rgba(255,255,255,0.95)" }}
              >
                {key}
              </button>
            );
          }
        )}
      </div>
    </div>
  );
}
