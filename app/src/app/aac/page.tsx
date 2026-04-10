"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  AAC_MINI_VOCABULARY,
  AAC_MINI_CATEGORIES,
  type AacCategory,
  type AacMiniVocabulary,
} from "@/lib/aac/vocabulary";
import { getVocabularyByCategory } from "@/lib/aac/selection";
import { createSpeechSynthesizer } from "@/lib/aac/speech";

const CATEGORY_ICONS: Record<AacCategory, string> = {
  たべもの: "🍽",
  きもち: "💛",
  どうさ: "🏃",
};

// Large emoji fallbacks for vocabulary items (until AI images are generated)
const ITEM_EMOJI: Record<number, string> = {
  1: "💧", 2: "🍚", 3: "🍞", 4: "🥛", 5: "🍎", 6: "🍌", 7: "🍬", 8: "🧃",
  9: "😊", 10: "😢", 11: "😣", 12: "❤️", 13: "😠", 14: "😨",
  15: "🍽", 16: "🥤", 17: "🚶", 18: "😴", 19: "🎮", 20: "🚽",
};

export default function AacMiniPage() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState<AacCategory>("たべもの");
  const [tappedId, setTappedId] = useState<number | null>(null);
  const [speaking, setSpeaking] = useState(false);
  const synthRef = useRef(createSpeechSynthesizer());

  const items = getVocabularyByCategory(activeCategory);

  const handleCardTap = useCallback((item: AacMiniVocabulary) => {
    setTappedId(item.id);
    setSpeaking(true);

    synthRef.current.speak(item.ttsText, { rate: 0.85, pitch: 1.1 });

    // Reset visual feedback after speech duration
    setTimeout(() => {
      setTappedId(null);
      setSpeaking(false);
    }, 1200);
  }, []);

  const handleBack = useCallback(() => {
    synthRef.current.stop();
    router.push("/home");
  }, [router]);

  // Cleanup speech on unmount
  useEffect(() => {
    return () => {
      synthRef.current.stop();
    };
  }, []);

  return (
    <main
      className="h-dvh w-full flex flex-col relative overflow-hidden"
      style={{
        background: "radial-gradient(ellipse at 50% 30%, #1E1550 0%, #0B0B30 70%, #0A0A2E 100%)",
      }}
    >
      {/* Sparse stars */}
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

      {/* Header: Back + Category tabs */}
      <div className="flex items-center gap-2 px-3 pt-2 pb-1 shrink-0 relative z-10">
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

        {/* Category tabs */}
        <div className="flex gap-2 flex-1 justify-center">
          {AAC_MINI_CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.key;
            return (
              <button
                key={cat.key}
                type="button"
                onClick={() => setActiveCategory(cat.key)}
                className="touch-target flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-200"
                style={{
                  background: isActive ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)",
                  border: isActive ? "2px solid rgba(255,255,255,0.4)" : "1px solid rgba(255,255,255,0.1)",
                  transform: isActive ? "scale(1.05)" : "scale(1)",
                }}
              >
                <span className="text-xl">{CATEGORY_ICONS[cat.key]}</span>
                <span className="text-sm font-bold text-white">{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Card grid */}
      <div className="flex-1 flex items-center justify-center px-4 relative z-10">
        <div
          className="grid gap-3"
          style={{
            gridTemplateColumns: `repeat(${items.length <= 6 ? 3 : 4}, 1fr)`,
            maxWidth: items.length <= 6 ? "420px" : "560px",
          }}
        >
          {items.map((item) => {
            const isTapped = tappedId === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleCardTap(item)}
                className="touch-target-child flex flex-col items-center justify-center rounded-2xl transition-all duration-200"
                style={{
                  width: items.length <= 6 ? 120 : 110,
                  height: items.length <= 6 ? 120 : 110,
                  background: isTapped
                    ? `${item.colorHex}dd`
                    : `${item.colorHex}88`,
                  border: isTapped
                    ? "3px solid rgba(93,187,93,0.8)"
                    : "2px solid rgba(255,255,255,0.15)",
                  boxShadow: isTapped
                    ? "0 0 20px rgba(93,187,93,0.4), 0 4px 12px rgba(0,0,0,0.3)"
                    : "0 4px 12px rgba(0,0,0,0.3)",
                  transform: isTapped ? "scale(1.08)" : "scale(1)",
                }}
              >
                <span className="text-4xl">{ITEM_EMOJI[item.id] ?? "?"}</span>
                <span
                  className="text-xs font-bold mt-1"
                  style={{ color: "rgba(0,0,0,0.7)" }}
                >
                  {item.japanese}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Speaking indicator */}
      {speaking && tappedId !== null && (
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20">
          <div
            className="flex items-center gap-2 px-4 py-2 rounded-full"
            style={{
              background: "rgba(0,0,0,0.5)",
              border: "1px solid rgba(0,212,255,0.3)",
              boxShadow: "0 0 12px rgba(0,212,255,0.2)",
            }}
          >
            <div className="flex gap-1">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="w-2 h-2 rounded-full bg-cyan-400"
                  style={{
                    animation: `gentle-pulse 800ms ease-in-out ${i * 200}ms infinite`,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Footer spacer */}
      <div className="h-4 shrink-0" />
    </main>
  );
}
