"use client";

import { useState } from "react";

type PlacedItem = {
  readonly id: string;
  readonly x: number;
  readonly y: number;
  readonly imageKey: string;
  readonly animating: boolean;
};

export function RoomTab() {
  const [items, setItems] = useState<readonly PlacedItem[]>([]);

  const handleItemTap = (itemId: string) => {
    // Trigger bounce animation on tap
    setItems((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, animating: true } : item
      )
    );
    setTimeout(() => {
      setItems((prev) =>
        prev.map((item) =>
          item.id === itemId ? { ...item, animating: false } : item
        )
      );
    }, 300);
  };

  return (
    <div
      className="relative h-full w-full overflow-hidden rounded-2xl"
      style={{
        background: "radial-gradient(ellipse at 50% 30%, #1E1550 0%, #0B0B30 70%, #0A0A2E 100%)",
      }}
    >
      {/* Ground surface (planet floor) */}
      <div
        className="absolute bottom-0 left-0 right-0 h-1/4"
        style={{ background: "linear-gradient(180deg, transparent, #1A1A4E)" }}
      />

      {/* Placed items */}
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => handleItemTap(item.id)}
          className={`touch-target-child absolute flex items-center justify-center text-3xl transition-transform ${
            item.animating ? "animate-correct" : ""
          }`}
          style={{
            left: `${item.x}%`,
            top: `${item.y}%`,
          }}
          aria-label={item.imageKey}
        >
          🧸
        </button>
      ))}

      {/* Empty state */}
      {items.length === 0 && (
        <div className="flex h-full items-center justify-center opacity-30">
          <span className="text-6xl">🏠</span>
        </div>
      )}
    </div>
  );
}
