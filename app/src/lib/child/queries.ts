"use server";

import { createClient } from "@/lib/supabase/server";

export async function getActiveChild() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: parent } = await supabase
    .from("parents")
    .select("id")
    .eq("auth_id", user.id)
    .single();

  if (!parent) return null;

  // MVP: single child per parent
  const { data: child } = await supabase
    .from("children")
    .select("*")
    .eq("parent_id", parent.id)
    .order("created_at", { ascending: false })
    .limit(1)
    .single();

  return child;
}

export async function getStarBalance(childId: string): Promise<number> {
  const supabase = await createClient();

  const { data } = await supabase
    .from("stars")
    .select("amount")
    .eq("child_id", childId);

  if (!data) return 0;
  return data.reduce((sum, row) => sum + (row.amount ?? 0), 0);
}

export async function getLastPlayedAt(childId: string): Promise<string | null> {
  const supabase = await createClient();

  const { data } = await supabase
    .from("sessions")
    .select("started_at")
    .eq("child_id", childId)
    .order("started_at", { ascending: false })
    .limit(1)
    .single();

  return data?.started_at ?? null;
}
