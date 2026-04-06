"use client";

import { SHOP_ITEMS } from "@/lib/reward/shop-items";

const TYPE_ICONS: Record<string, string> = {
  figure: "🧸",
  furniture: "🪑",
  wallpaper: "🖼",
};

export function CollectionTab() {
  // MVP: show all items as silhouettes (not yet connected to data)
  return (
    <div className="grid h-full grid-cols-4 gap-3 overflow-y-auto py-2">
      {SHOP_ITEMS.map((item) => (
        <div
          key={item.id}
          className="flex flex-col items-center justify-center gap-1 rounded-xl p-3"
          style={{ background: "rgba(0,0,0,0.05)" }}
        >
          {/* Silhouette (not owned) or icon (owned) */}
          <span className="text-2xl opacity-20">
            {TYPE_ICONS[item.type] ?? "📦"}
          </span>
          <span className="text-lg">❓</span>
        </div>
      ))}
    </div>
  );
}
