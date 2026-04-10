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
    <div className="parent-screen flex h-full flex-col">
      {/* Header */}
      <header
        className="flex items-center justify-between py-3"
        style={{
          background: "rgba(255,255,255,0.95)",
          paddingLeft: "max(1.5rem, env(safe-area-inset-left))",
          paddingRight: "max(1.5rem, env(safe-area-inset-right))",
          paddingTop: "max(0.75rem, env(safe-area-inset-top))",
        }}
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
      <main
        className="flex-1 overflow-y-auto py-4"
        style={{
          paddingLeft: "max(1.5rem, env(safe-area-inset-left))",
          paddingRight: "max(1.5rem, env(safe-area-inset-right))",
        }}
      >
        {children}
      </main>

      {/* Tab Bar */}
      <nav
        className="flex border-t py-2"
        style={{
          background: "rgba(255,255,255,0.95)",
          borderColor: "var(--color-parent-card-border)",
          paddingLeft: "max(0.5rem, env(safe-area-inset-left))",
          paddingRight: "max(0.5rem, env(safe-area-inset-right))",
          paddingBottom: "max(0.5rem, env(safe-area-inset-bottom))",
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
