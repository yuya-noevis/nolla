"use server";

import { createClient } from "@/lib/supabase/server";

const REQUIRED_SESSIONS_PER_GAME = 8;
const REQUIRED_DAYS = 8;
const GAMES = [
  "memory-match",
  "sorting",
  "visual-search",
  "corsi-block",
] as const;

/**
 * After a session ends, recompute the child's baseline progress and
 * promote `baseline_established` once the design's thresholds are met.
 *
 * Conditions (per nolla_nci_algorithm_design.md §5.1):
 *   - 各ゲーム最低 8 セッション以上
 *   - 8 日間（暦日）以上経過
 *
 * Note: the schema has a single `baseline_sessions_count int`, so we store
 * the *minimum across the 4 games* there (the bottleneck count). This
 * matches the design's "all four games must reach 8" semantics with no
 * migration. Per-game counts are derived live from the sessions table.
 *
 * Wires the previously-orphaned baseline columns into the live pipeline
 * (BUG-14 fix).
 */
export async function refreshBaselineProgress(
  childId: string
): Promise<{ minSessions: number; established: boolean } | null> {
  const supabase = await createClient();

  // Per-game session counts
  const counts = await Promise.all(
    GAMES.map(async (g) => {
      const { count } = await supabase
        .from("sessions")
        .select("id", { count: "exact", head: true })
        .eq("child_id", childId)
        .eq("game_type", g)
        .not("ended_at", "is", null);
      return count ?? 0;
    })
  );
  const minSessions = Math.min(...counts);

  // Earliest session (for elapsed-days check)
  const { data: firstRow } = await supabase
    .from("sessions")
    .select("started_at")
    .eq("child_id", childId)
    .order("started_at", { ascending: true })
    .limit(1)
    .maybeSingle();

  // Current baseline state
  const { data: childRow } = await supabase
    .from("children")
    .select("baseline_established")
    .eq("id", childId)
    .maybeSingle();

  const alreadyEstablished = childRow?.baseline_established === true;

  let elapsedDays = 0;
  if (firstRow?.started_at) {
    const first = new Date(firstRow.started_at).getTime();
    elapsedDays = Math.floor((Date.now() - first) / (1000 * 60 * 60 * 24));
  }

  const meetsThreshold =
    minSessions >= REQUIRED_SESSIONS_PER_GAME && elapsedDays >= REQUIRED_DAYS;

  const update: Record<string, unknown> = {
    baseline_sessions_count: minSessions,
  };
  if (meetsThreshold && !alreadyEstablished) {
    update.baseline_established = true;
    update.baseline_established_at = new Date().toISOString();
  }

  const { error } = await supabase
    .from("children")
    .update(update)
    .eq("id", childId);

  if (error) return null;
  return {
    minSessions,
    established: meetsThreshold || alreadyEstablished,
  };
}
