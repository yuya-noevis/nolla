import { getChild } from "@/lib/parent/queries";
import { createClient } from "@/lib/supabase/server";
import {
  calculateProfileCompletion,
  getCompletionItems,
} from "@/lib/parent/profile-completion";
import { SignOutButton } from "./sign-out-button";
import { DebugResetWarmupButton } from "./debug-reset-warmup-button";

export default async function SettingsPage() {
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

  const additional = child.additional_profile ?? {};
  const completionRate = calculateProfileCompletion(
    {
      id: child.id,
      parentId: child.parent_id,
      displayName: child.display_name,
      birthDate: child.birth_date,
      diagnosis: child.diagnosis ?? [],
      intellectualLevel: child.intellectual_level,
      ldTypes: child.ld_types ?? [],
      speechLevel: child.speech_level,
      canDistinguishColors: child.can_distinguish_colors,
      canDistinguishShapes: child.can_distinguish_shapes,
      canFollowMultiStep: child.can_follow_multi_step,
      iqBand: child.iq_band,
      gamesEnabled: child.games_enabled ?? {
        memoryMatch: true,
        sorting: true,
        visualSearch: true,
        corsiBlock: true,
      },
      sortingStartCriterion: child.sorting_start_criterion ?? "color",
      voiceRecognitionEnabled: child.voice_recognition_enabled ?? false,
      avatarType: child.avatar_type ?? "default",
      baselineEstablished: child.baseline_established ?? false,
      baselineSessionsCount: child.baseline_sessions_count ?? 0,
      baselineEstablishedAt: child.baseline_established_at,
    },
    additional
  );

  const completionItems = getCompletionItems(
    {
      id: child.id,
      parentId: child.parent_id,
      displayName: child.display_name,
      birthDate: child.birth_date,
      diagnosis: child.diagnosis ?? [],
      intellectualLevel: child.intellectual_level,
      ldTypes: child.ld_types ?? [],
      speechLevel: child.speech_level,
      canDistinguishColors: child.can_distinguish_colors,
      canDistinguishShapes: child.can_distinguish_shapes,
      canFollowMultiStep: child.can_follow_multi_step,
      iqBand: child.iq_band,
      gamesEnabled: child.games_enabled ?? {
        memoryMatch: true,
        sorting: true,
        visualSearch: true,
        corsiBlock: true,
      },
      sortingStartCriterion: child.sorting_start_criterion ?? "color",
      voiceRecognitionEnabled: child.voice_recognition_enabled ?? false,
      avatarType: child.avatar_type ?? "default",
      baselineEstablished: child.baseline_established ?? false,
      baselineSessionsCount: child.baseline_sessions_count ?? 0,
      baselineEstablishedAt: child.baseline_established_at,
    },
    additional
  );

  const completedCount = completionItems.filter((i) => i.completed).length;
  const pct = Math.round(completionRate * 100);

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-bold text-nolla-text">設定</h2>

      {/* Profile completion */}
      <div className="glass-overlay p-5">
        <div className="flex items-center justify-between">
          <span className="font-medium text-nolla-text">プロフィール</span>
          <span className="text-sm text-nolla-primary">
            {completedCount}/10
          </span>
        </div>
        <div
          className="mt-3 h-2 overflow-hidden rounded-full"
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
        <p
          className="mt-2 text-xs"
          style={{ color: "var(--color-parent-tab-inactive)" }}
        >
          お子さまの情報が詳しいほど、より適切なサポートができます
        </p>

        {/* Completion checklist */}
        <div className="mt-4 space-y-2">
          {completionItems.map((item) => (
            <div key={item.key} className="flex items-center gap-2 text-sm">
              <span
                className="inline-block h-4 w-4 rounded-full text-center text-xs leading-4"
                style={{
                  background: item.completed
                    ? "var(--color-nolla-secondary)"
                    : "rgba(0,0,0,0.08)",
                  color: item.completed ? "#fff" : "transparent",
                }}
              >
                {item.completed ? "✓" : ""}
              </span>
              <span
                className="text-nolla-text"
                style={{
                  opacity: item.completed ? 0.6 : 1,
                }}
              >
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Settings sections */}
      <div className="space-y-3">
        <SettingsRow label="音声認識" value={child.voice_recognition_enabled ? "ON" : "OFF"} />
        <SettingsRow label="PIN変更" value="" action />
        <div className="pt-4 space-y-3">
          <DebugResetWarmupButton />
          <SignOutButton />
        </div>
      </div>
    </div>
  );
}

function SettingsRow({
  label,
  value,
  action,
}: {
  readonly label: string;
  readonly value: string;
  readonly action?: boolean;
}) {
  return (
    <div className="glass-overlay flex items-center justify-between p-4">
      <span className="text-sm font-medium text-nolla-text">{label}</span>
      {action ? (
        <span className="text-sm text-nolla-primary">変更 →</span>
      ) : (
        <span className="text-sm" style={{ color: "var(--color-parent-tab-inactive)" }}>
          {value}
        </span>
      )}
    </div>
  );
}
