"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  createVowelSession,
  startShowingVowel,
  advanceToPrompting,
  advanceToParentConfirming,
  confirmCompletion,
  getCurrentVowel,
  isSessionComplete,
  type VowelSessionState,
  type VowelType,
} from "@/lib/vowel/stateMachine";
import { createSpeechSynthesizer } from "@/lib/aac/speech";

const VOWEL_DISPLAY: Record<VowelType, { hiragana: string; color: string }> = {
  a: { hiragana: "あ", color: "#FF6B8A" },
  i: { hiragana: "い", color: "#5BB8F0" },
  u: { hiragana: "う", color: "#7BFF3A" },
  e: { hiragana: "え", color: "#FFB347" },
  o: { hiragana: "お", color: "#BEA0D8" },
};

const VOWEL_TTS: Record<VowelType, string> = {
  a: "あー", i: "いー", u: "うー", e: "えー", o: "おー",
};

export default function VowelMiniPage() {
  const router = useRouter();
  const [session, setSession] = useState<VowelSessionState>(() =>
    createVowelSession(`vowel-${Date.now()}`)
  );
  const synthRef = useRef(createSpeechSynthesizer());
  const [showCelebration, setShowCelebration] = useState(false);

  const currentVowel = getCurrentVowel(session);
  const vowelInfo = VOWEL_DISPLAY[currentVowel];
  const { phase } = session.state;
  const progress = session.completedVowels.length;
  const complete = isSessionComplete(session);

  // Auto-advance from idle to showing on mount and after each confirmation
  useEffect(() => {
    if (phase === "idle") {
      const timer = setTimeout(() => {
        setSession((s) => startShowingVowel(s));
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [phase]);

  // Auto-play voice when showing
  useEffect(() => {
    if (phase === "showing") {
      synthRef.current.speak(VOWEL_TTS[currentVowel], { rate: 0.7, pitch: 1.0 });

      // Auto-advance to prompting after speech
      const timer = setTimeout(() => {
        setSession((s) => advanceToPrompting(s));
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [phase, currentVowel]);

  // Auto-advance from prompting to parent_confirming after a pause
  useEffect(() => {
    if (phase === "prompting") {
      const timer = setTimeout(() => {
        setSession((s) => advanceToParentConfirming(s));
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [phase]);

  // Handle celebration
  useEffect(() => {
    if (complete) {
      setShowCelebration(true);
    }
  }, [complete]);

  const handleParentConfirm = useCallback(() => {
    setSession((s) => confirmCompletion(s));
  }, []);

  const handleReplay = useCallback(() => {
    synthRef.current.speak(VOWEL_TTS[currentVowel], { rate: 0.7, pitch: 1.0 });
  }, [currentVowel]);

  const handleBack = useCallback(() => {
    synthRef.current.stop();
    router.push("/home");
  }, [router]);

  const handleFinish = useCallback(() => {
    router.push("/home");
  }, [router]);

  // Cleanup
  useEffect(() => {
    return () => {
      synthRef.current.stop();
    };
  }, []);

  // Celebration screen
  if (showCelebration) {
    return (
      <main
        className="h-dvh w-full flex flex-col items-center justify-center relative overflow-hidden"
        style={{
          background: "radial-gradient(ellipse at 50% 30%, #1E1550 0%, #0B0B30 70%, #0A0A2E 100%)",
        }}
      >
        {/* Stars burst */}
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="absolute animate-star"
            style={{
              left: `${30 + Math.random() * 40}%`,
              top: `${20 + Math.random() * 40}%`,
              animationDelay: `${i * 100}ms`,
              fontSize: "2rem",
            }}
          >
            ⭐
          </div>
        ))}

        {/* All vowels completed display */}
        <div className="flex gap-4 mb-8">
          {(["a", "i", "u", "e", "o"] as VowelType[]).map((v) => (
            <div
              key={v}
              className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold"
              style={{
                background: VOWEL_DISPLAY[v].color,
                boxShadow: `0 0 16px ${VOWEL_DISPLAY[v].color}80`,
                color: "#FFFFFF",
              }}
            >
              {VOWEL_DISPLAY[v].hiragana}
            </div>
          ))}
        </div>

        {/* Home button */}
        <button
          type="button"
          onClick={handleFinish}
          className="btn-mc px-6 py-3 text-sm mt-4"
        >
          ⭐
        </button>
      </main>
    );
  }

  return (
    <main
      className="h-dvh w-full flex flex-col relative overflow-hidden"
      style={{
        background: "radial-gradient(ellipse at 50% 30%, #1E1550 0%, #0B0B30 70%, #0A0A2E 100%)",
      }}
    >
      {/* Stars */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: i < 3 ? 2 : 1,
              height: i < 3 ? 2 : 1,
              background: "rgba(255,255,255,0.4)",
              left: `${(i * 43 + 11) % 100}%`,
              top: `${(i * 31 + 7) % 70}%`,
            }}
          />
        ))}
      </div>

      {/* Header: Back + Progress dots */}
      <div className="flex items-center justify-between px-3 pt-2 shrink-0 relative z-10">
        <button
          type="button"
          onClick={handleBack}
          className="touch-target flex items-center justify-center w-12 h-12 rounded-full shrink-0"
          style={{ background: "rgba(0,0,0,0.25)", border: "1px solid rgba(255,255,255,0.15)" }}
          aria-label="Back to home"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2.5" strokeLinecap="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        {/* Progress: 5 vowel dots */}
        <div
          className="flex gap-2 px-3 py-2 rounded-full"
          style={{ background: "rgba(0,0,0,0.25)" }}
        >
          {(["a", "i", "u", "e", "o"] as VowelType[]).map((v, i) => (
            <div
              key={v}
              className="w-4 h-4 rounded-full transition-all duration-300"
              style={{
                background: i < progress
                  ? VOWEL_DISPLAY[v].color
                  : i === progress
                  ? `${VOWEL_DISPLAY[v].color}60`
                  : "rgba(255,255,255,0.15)",
                boxShadow: i < progress ? `0 0 6px ${VOWEL_DISPLAY[v].color}80` : "none",
                border: i === progress ? `2px solid ${VOWEL_DISPLAY[v].color}` : "none",
              }}
            />
          ))}
        </div>
      </div>

      {/* Main: Vowel display */}
      <div className="flex-1 flex flex-col items-center justify-center relative z-10">
        {/* Large vowel character */}
        <div
          className="relative flex items-center justify-center transition-all duration-500"
          style={{
            width: 160,
            height: 160,
          }}
        >
          {/* Glow ring */}
          <div
            className="absolute rounded-full"
            style={{
              width: 180,
              height: 180,
              background: `${vowelInfo.color}20`,
              filter: "blur(16px)",
              animation: phase === "showing" ? "gentle-pulse 1s ease-in-out infinite" : "none",
            }}
          />

          {/* Vowel circle */}
          <div
            className="rounded-full flex items-center justify-center transition-all duration-300"
            style={{
              width: 140,
              height: 140,
              background: `radial-gradient(circle at 40% 40%, ${vowelInfo.color}ee, ${vowelInfo.color}aa)`,
              boxShadow: `0 0 30px ${vowelInfo.color}50, inset 0 2px 8px rgba(255,255,255,0.2)`,
              border: "2px solid rgba(255,255,255,0.2)",
              transform: phase === "showing" ? "scale(1.1)" : "scale(1)",
            }}
          >
            <span className="text-6xl font-bold text-white drop-shadow-lg">
              {vowelInfo.hiragana}
            </span>
          </div>
        </div>

        {/* Phase indicator (visual, no text) */}
        <div className="flex items-center gap-3 mt-6">
          {phase === "showing" && (
            <div className="flex gap-1">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="w-3 h-3 rounded-full"
                  style={{
                    background: "#00D4FF",
                    animation: `gentle-pulse 800ms ease-in-out ${i * 200}ms infinite`,
                  }}
                />
              ))}
            </div>
          )}

          {phase === "prompting" && (
            <button
              type="button"
              onClick={handleReplay}
              className="touch-target flex items-center justify-center w-14 h-14 rounded-full"
              style={{
                background: "rgba(0,212,255,0.2)",
                border: "2px solid rgba(0,212,255,0.4)",
              }}
              aria-label="Replay sound"
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
                <polygon points="6,4 20,12 6,20" />
              </svg>
            </button>
          )}

          {phase === "parent_confirming" && (
            <button
              type="button"
              onClick={handleParentConfirm}
              className="touch-target-child flex items-center justify-center w-20 h-20 rounded-full active:scale-95 transition-transform"
              style={{
                background: `radial-gradient(circle, ${vowelInfo.color}, ${vowelInfo.color}aa)`,
                boxShadow: `0 0 24px ${vowelInfo.color}60, 0 4px 16px rgba(0,0,0,0.3)`,
                border: "3px solid rgba(255,255,255,0.3)",
              }}
              aria-label="Confirm"
            >
              <svg width="36" height="36" viewBox="0 0 24 24" fill="white">
                <polygon points="12,2 15,9 22,9 16.5,14 18.5,21 12,17 5.5,21 7.5,14 2,9 9,9" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Footer spacer */}
      <div className="h-4 shrink-0" />
    </main>
  );
}
