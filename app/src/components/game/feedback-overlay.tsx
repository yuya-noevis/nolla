"use client";

import { useEffect, useState } from "react";

type FeedbackType = "correct" | "star";

type Props = {
  type: FeedbackType;
  onComplete: () => void;
};

/**
 * Correct answer feedback: green glow + scale + star particles.
 * Duration: 300ms scale + 500ms particles = 800ms total.
 */
export function FeedbackOverlay({ type, onComplete }: Props) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onComplete();
    }, 800);
    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-30 pointer-events-none flex items-center justify-center">
      {type === "correct" && <CorrectFeedback />}
      {type === "star" && <StarFeedback />}
    </div>
  );
}

function CorrectFeedback() {
  return (
    <div className="animate-correct">
      <svg width="80" height="80" viewBox="0 0 80 80">
        <circle cx="40" cy="40" r="36" fill="none" stroke="var(--color-feedback-correct)" strokeWidth="4" opacity="0.6">
          <animate attributeName="r" from="20" to="38" dur="300ms" fill="freeze" />
          <animate attributeName="opacity" from="0.8" to="0.2" dur="300ms" fill="freeze" />
        </circle>
        <polyline points="24,42 34,52 56,30" fill="none" stroke="var(--color-feedback-correct)" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round">
          <animate attributeName="stroke-dashoffset" from="60" to="0" dur="300ms" fill="freeze" />
        </polyline>
      </svg>
    </div>
  );
}

function StarFeedback() {
  return (
    <div className="flex gap-2">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="animate-star"
          style={{ animationDelay: `${i * 100}ms` }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="var(--color-nolla-reward)">
            <polygon points="12,2 15,9 22,9 16.5,14 18.5,21 12,17 5.5,21 7.5,14 2,9 9,9" />
          </svg>
        </div>
      ))}
    </div>
  );
}
