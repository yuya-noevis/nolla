"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = [
  { href: "/dashboard", label: "今日の記録" },
  { href: "/growth", label: "成長の記録" },
  { href: "/ai-support", label: "AIサポート" },
  { href: "/settings", label: "設定" },
] as const;

export default function ParentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isPinPage = pathname === "/pin";

  if (isPinPage) {
    return <>{children}</>;
  }

  return (
    <div className="flex h-screen flex-col bg-nolla-bg">
      {/* Header */}
      <header
        className="flex items-center justify-between px-6 py-3"
        style={{ background: "rgba(255,255,255,0.95)" }}
      >
        <h1 className="text-lg font-bold text-nolla-text">保護者メニュー</h1>
        <Link
          href="/home"
          className="touch-target flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-nolla-primary"
        >
          子ども画面に戻る
        </Link>
      </header>

      {/* Content */}
      <main className="flex-1 overflow-y-auto px-6 py-4">{children}</main>

      {/* Tab Bar */}
      <nav
        className="flex border-t px-2 py-2"
        style={{
          background: "rgba(255,255,255,0.95)",
          borderColor: "var(--color-parent-card-border)",
        }}
      >
        {TABS.map((tab) => {
          const isActive = pathname === tab.href;
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`touch-target flex flex-1 flex-col items-center justify-center rounded-lg py-2 text-xs font-medium transition-colors ${
                isActive
                  ? "text-nolla-primary"
                  : "text-[var(--color-parent-tab-inactive)]"
              }`}
            >
              {tab.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
