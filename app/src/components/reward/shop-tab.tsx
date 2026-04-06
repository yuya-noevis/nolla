"use client";

import { SHOP_ITEMS } from "@/lib/reward/shop-items";

const TYPE_ICONS: Record<string, string> = {
  figure: "🧸",
  furniture: "🪑",
  wallpaper: "🖼",
};

export function ShopTab() {
  return (
    <div className="grid h-full grid-cols-3 gap-3 overflow-y-auto py-2">
      {SHOP_ITEMS.map((item) => (
        <button
          key={item.id}
          className="glass-overlay touch-target-child flex flex-col items-center justify-center gap-2 rounded-xl p-3 transition-transform active:scale-95"
          aria-label={item.name}
        >
          {/* Item icon */}
          <span className="text-3xl">
            {TYPE_ICONS[item.type] ?? "📦"}
          </span>

          {/* Price */}
          <div
            className="flex items-center gap-1 text-sm font-bold"
            style={{ color: "var(--color-nolla-reward)" }}
          >
            <span>★</span>
            <span>{item.price}</span>
          </div>
        </button>
      ))}
    </div>
  );
}
