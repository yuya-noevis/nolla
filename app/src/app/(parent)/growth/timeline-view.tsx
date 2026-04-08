"use client";

import { useMemo, useState } from "react";

type NciSnapshot = {
  readonly snapshot_date: string;
  readonly nci_m: number;
  readonly nci_f: number;
  readonly nci_a: number;
  readonly nci_s: number;
};

type Period = "week" | "month" | "year" | "all";

const PERIODS: readonly { key: Period; label: string; days: number | null }[] =
  [
    { key: "week", label: "週", days: 7 },
    { key: "month", label: "月", days: 30 },
    { key: "year", label: "年", days: 365 },
    { key: "all", label: "全期間", days: null },
  ];

const AXES = [
  { key: "nci_m" as const, label: "記憶力" },
  { key: "nci_f" as const, label: "柔軟性" },
  { key: "nci_a" as const, label: "注意力" },
  { key: "nci_s" as const, label: "処理速度" },
];

type Props = {
  readonly snapshots: readonly NciSnapshot[];
};

export function GrowthTimelineView({ snapshots }: Props) {
  const [period, setPeriod] = useState<Period>("month");

  const filtered = useMemo(() => {
    const cfg = PERIODS.find((p) => p.key === period);
    if (!cfg || cfg.days === null) return snapshots;
    const cutoff = Date.now() - cfg.days * 24 * 60 * 60 * 1000;
    return snapshots.filter(
      (s) => new Date(s.snapshot_date).getTime() >= cutoff
    );
  }, [snapshots, period]);

  const day1 = snapshots[0];
  const latest = filtered[filtered.length - 1] ?? snapshots[snapshots.length - 1];

  if (!day1 || !latest) {
    return (
      <p
        className="text-sm"
        style={{ color: "var(--color-parent-tab-inactive)" }}
      >
        データがまだありません
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {/* Period toggle */}
      <div
        className="flex gap-2"
        role="tablist"
        aria-label="期間切替"
      >
        {PERIODS.map((p) => (
          <button
            key={p.key}
            type="button"
            role="tab"
            aria-selected={period === p.key}
            onClick={() => setPeriod(p.key)}
            className="rounded-full px-4 py-2 text-sm font-medium transition-colors"
            style={{
              minHeight: 48,
              minWidth: 48,
              background:
                period === p.key
                  ? "var(--color-nolla-primary)"
                  : "rgba(0,0,0,0.05)",
              color:
                period === p.key
                  ? "#ffffff"
                  : "var(--color-parent-tab-inactive)",
            }}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Axis cards with day1 comparison */}
      <div className="space-y-3">
        {AXES.map((axis) => {
          const currentValue = Math.round(latest[axis.key] / 10);
          const day1Value = Math.round(day1[axis.key] / 10);
          const delta = currentValue - day1Value;
          const deltaLabel =
            delta > 0
              ? `+${delta} (はじめて計測した日から伸びています)`
              : delta === 0
                ? "安定しています"
                : `じっくり取り組んでいます`;
          const deltaColor =
            delta > 0
              ? "var(--color-nolla-secondary)"
              : delta === 0
                ? "var(--color-nolla-reward)"
                : "var(--color-nolla-primary)";

          // Sparkline of filtered snapshots for this axis
          const values = filtered.map((s) => s[axis.key]);
          const spark = buildSparkline(values);

          return (
            <div key={axis.key} className="glass-overlay p-4">
              <div className="flex items-center justify-between">
                <span className="font-medium text-nolla-text">
                  {axis.label}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold text-nolla-primary">
                    {currentValue}
                  </span>
                  <span className="text-xs" style={{ color: deltaColor }}>
                    {deltaLabel}
                  </span>
                </div>
              </div>
              {spark && (
                <svg
                  viewBox="0 0 100 24"
                  className="mt-2 w-full"
                  style={{ height: 24 }}
                  aria-hidden="true"
                >
                  <polyline
                    fill="none"
                    stroke="var(--color-nolla-primary)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    points={spark}
                  />
                </svg>
              )}
              <p
                className="mt-1 text-xs"
                style={{ color: "var(--color-parent-tab-inactive)" }}
              >
                はじめて計測した日: {day1Value}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function buildSparkline(values: readonly number[]): string | null {
  if (values.length < 2) return null;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  return values
    .map((v, i) => {
      const x = (i / (values.length - 1)) * 100;
      const y = 22 - ((v - min) / range) * 20;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
}
