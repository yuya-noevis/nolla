import { getChild, getLatestNciSnapshot } from "@/lib/parent/queries";
import { createClient } from "@/lib/supabase/server";

const NCI_LABELS: Record<string, string> = {
  M: "記憶力",
  F: "柔軟性",
  A: "注意力",
  S: "処理速度",
};

const TREND_CONFIG = {
  up: { label: "伸びています", color: "var(--color-nolla-secondary)" },
  stable: {
    label: "安定しています",
    color: "var(--color-nolla-reward)",
  },
  down: {
    label: "じっくり取り組んでいます",
    color: "var(--color-nolla-primary)",
  },
} as const;

export default async function GrowthPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return <p className="p-6 text-nolla-text">ログインしてください</p>;
  }

  const child = await getChild(user.id);
  if (!child) {
    return <p className="p-6 text-nolla-text">お子さまの情報がありません</p>;
  }

  const snapshot = await getLatestNciSnapshot(child.id);

  // Baseline not established
  if (!child.baseline_established) {
    const progress = child.baseline_sessions_count ?? 0;
    const target = 8;
    const pct = Math.min(100, Math.round((progress / target) * 100));

    return (
      <div className="space-y-6">
        <h2 className="text-lg font-bold text-nolla-text">成長の記録</h2>
        <div className="glass-overlay p-6">
          <p className="font-medium text-nolla-text">
            お子さまのデータを計測中です
          </p>
          {/* Progress bar */}
          <div className="mt-4">
            <div
              className="h-3 overflow-hidden rounded-full"
              style={{ background: "rgba(0,0,0,0.06)" }}
            >
              <div
                className="h-full rounded-full transition-all"
                style={{
                  width: `${pct}%`,
                  background: "var(--color-nolla-primary)",
                }}
              />
            </div>
            <p className="mt-2 text-sm" style={{ color: "var(--color-parent-tab-inactive)" }}>
              {progress}/{target} セッション
            </p>
          </div>
          <p
            className="mt-4 text-sm"
            style={{ color: "var(--color-parent-tab-inactive)" }}
          >
            もう少し遊ぶと、成長の記録が見られるようになります
          </p>
        </div>
      </div>
    );
  }

  // Baseline established but no snapshot yet
  if (!snapshot) {
    return (
      <div className="space-y-6">
        <h2 className="text-lg font-bold text-nolla-text">成長の記録</h2>
        <div className="glass-overlay p-6">
          <p className="font-medium text-nolla-text">計測が始まりました</p>
          {(["M", "F", "A", "S"] as const).map((axis) => (
            <div key={axis} className="mt-3">
              <span className="text-sm text-nolla-text">
                {NCI_LABELS[axis]}:{" "}
              </span>
              <span
                className="text-sm"
                style={{ color: "var(--color-parent-tab-inactive)" }}
              >
                計測中
              </span>
            </div>
          ))}
          <p
            className="mt-4 text-sm"
            style={{ color: "var(--color-parent-tab-inactive)" }}
          >
            精度が上がるまでもう少しお待ちください
          </p>
        </div>
      </div>
    );
  }

  // NCI data available
  const axes = [
    { key: "M", value: snapshot.nci_m, se: snapshot.nci_m_se },
    { key: "F", value: snapshot.nci_f, se: snapshot.nci_f_se },
    { key: "A", value: snapshot.nci_a, se: snapshot.nci_a_se },
    { key: "S", value: snapshot.nci_s, se: snapshot.nci_s_se },
  ] as const;

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-bold text-nolla-text">成長の記録</h2>
      <div className="space-y-3">
        {axes.map((axis) => {
          const displayScore = Math.round(axis.value / 10);
          const trend = getTrend(axis.se);
          const cfg = TREND_CONFIG[trend];

          return (
            <div key={axis.key} className="glass-overlay p-4">
              <div className="flex items-center justify-between">
                <span className="font-medium text-nolla-text">
                  {NCI_LABELS[axis.key]}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold text-nolla-primary">
                    {displayScore}
                  </span>
                  <span className="text-sm" style={{ color: cfg.color }}>
                    {cfg.label}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function getTrend(se: number): "up" | "stable" | "down" {
  // High SE = still measuring, show as stable
  if (se > 30) return "stable";
  // Low SE = precise measurement available
  // For MVP, always show "stable" or "up" (never negative)
  return "up";
}
