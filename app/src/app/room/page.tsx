"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { RoomTab } from "@/components/reward/room-tab";
import { ShopTab } from "@/components/reward/shop-tab";
import { CollectionTab } from "@/components/reward/collection-tab";

type Tab = "room" | "shop" | "collection";

const TAB_ICONS: Record<Tab, string> = {
  room: "🏠",
  shop: "★",
  collection: "📖",
};

export default function RoomPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>("room");

  return (
    <div className="flex h-screen flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-2">
        <button
          onClick={() => router.push("/home")}
          className="btn-mc touch-target-child flex h-12 w-12 items-center justify-center rounded-xl text-xl"
          aria-label="戻る"
        >
          ←
        </button>
        <div className="flex gap-2">
          {(["room", "shop", "collection"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`touch-target-child flex h-14 w-14 items-center justify-center rounded-xl text-xl transition-all ${
                activeTab === tab
                  ? "btn-mc scale-110"
                  : "opacity-50"
              }`}
              style={
                activeTab !== tab
                  ? { background: "rgba(255,255,255,0.5)" }
                  : undefined
              }
              aria-label={tab}
            >
              {TAB_ICONS[tab]}
            </button>
          ))}
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 overflow-hidden px-4 pb-4">
        {activeTab === "room" && <RoomTab />}
        {activeTab === "shop" && <ShopTab />}
        {activeTab === "collection" && <CollectionTab />}
      </main>
    </div>
  );
}
