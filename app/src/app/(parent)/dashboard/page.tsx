import { getTodaysSessions, getTodaysStarTotal, getChild } from "@/lib/parent/queries";
import { createClient } from "@/lib/supabase/server";

const GAME_LABELS: Record<string, string> = {
  "memory-match": "おぼえて",
  sorting: "なかまわけ",
  "visual-search": "みつけて",
  "corsi-block": "まねして",
};

export default async function DashboardPage() {
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

  const sessions = await getTodaysSessions(child.id);
  const starTotal = await getTodaysStarTotal(child.id);

  const totalPlayTimeMs = sessions.reduce(
    (sum: number, s: { duration_ms: number | null }) =>
      sum + (s.duration_ms ?? 0),
    0
  );
  const totalPlayMin = Math.round(totalPlayTimeMs / 60000);

  // Group by game type
  const byGame = sessions.reduce(
    (acc: Record<string, { count: number; correct: number; total: number }>, s: {
      game_type: string;
      correct_count: number;
      total_trials: number;
    }) => {
      const key = s.game_type;
      const prev = acc[key] ?? { count: 0, correct: 0, total: 0 };
      return {
        ...acc,
        [key]: {
          count: prev.count + 1,
          correct: prev.correct + (s.correct_count ?? 0),
          total: prev.total + (s.total_trials ?? 0),
        },
      };
    },
    {} as Record<string, { count: number; correct: number; total: number }>
  );

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold text-nolla-text">
        {child.display_name}さんの今日の記録
      </h2>

      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-3">
        <SummaryCard label="プレイ時間" value={`${totalPlayMin}分`} />
        <SummaryCard label="ゲーム回数" value={`${sessions.length}回`} />
        <SummaryCard label="獲得スター" value={`${starTotal}`} />
      </div>

      {/* Game-by-game */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-nolla-text">
          ゲーム別の結果
        </h3>
        {Object.entries(byGame).length === 0 ? (
          <p className="text-sm" style={{ color: "var(--color-parent-tab-inactive)" }}>
            今日はまだプレイしていません
          </p>
        ) : (
          (Object.entries(byGame) as [string, { count: number; correct: number; total: number }][]).map(([gameType, stats]) => (
            <div
              key={gameType}
              className="glass-overlay p-4"
            >
              <div className="flex items-center justify-between">
                <span className="font-medium text-nolla-text">
                  {GAME_LABELS[gameType] ?? gameType}
                </span>
                <span className="text-sm" style={{ color: "var(--color-parent-tab-inactive)" }}>
                  {stats.count}回プレイ
                </span>
              </div>
              <div className="mt-1 text-sm text-nolla-text">
                {stats.total > 0
                  ? `${stats.correct}/${stats.total}問正解（${Math.round((stats.correct / stats.total) * 100)}%）`
                  : "データなし"}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function SummaryCard({
  label,
  value,
}: {
  readonly label: string;
  readonly value: string;
}) {
  return (
    <div className="glass-overlay p-4 text-center">
      <div className="text-2xl font-bold text-nolla-primary">{value}</div>
      <div className="mt-1 text-xs" style={{ color: "var(--color-parent-tab-inactive)" }}>
        {label}
      </div>
    </div>
  );
}
