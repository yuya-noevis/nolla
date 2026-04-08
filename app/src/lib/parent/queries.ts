/**
 * Parent dashboard data queries.
 * Uses Supabase server client for server components.
 */
import { createClient } from "@/lib/supabase/server";
import { hashPin, verifyPin as verifyPinHash } from "@/lib/auth/pin";
import { decryptStringArray } from "@/lib/crypto/pii";

/**
 * Resolve the child for the given Supabase auth user id.
 * Note: `children.parent_id` is a FK to `parents.id`, NOT to `auth.users.id`.
 * We must hop through `parents.auth_id` first.
 */
export async function getChild(authUserId: string) {
  const supabase = await createClient();

  const { data: parent, error: parentError } = await supabase
    .from("parents")
    .select("id")
    .eq("auth_id", authUserId)
    .single();

  if (parentError || !parent) return null;

  const { data, error } = await supabase
    .from("children")
    .select("*")
    .eq("parent_id", parent.id)
    .order("created_at", { ascending: false })
    .limit(1)
    .single();

  if (error) return null;

  // Decrypt sensitive PII fields transparently. New rows are written via
  // encryptStringArray; legacy plaintext rows pass through untouched.
  return {
    ...data,
    diagnosis: decryptStringArray(data.diagnosis ?? []),
    ld_types: decryptStringArray(data.ld_types ?? []),
  };
}

export async function getTodaysSessions(childId: string) {
  const supabase = await createClient();
  const today = new Date().toISOString().split("T")[0];

  const { data, error } = await supabase
    .from("sessions")
    .select("*")
    .eq("child_id", childId)
    .gte("started_at", `${today}T00:00:00`)
    .lte("started_at", `${today}T23:59:59`)
    .order("started_at", { ascending: false });

  if (error) return [];
  return data ?? [];
}

export async function getTodaysStarTotal(childId: string) {
  const supabase = await createClient();
  const today = new Date().toISOString().split("T")[0];

  const { data, error } = await supabase
    .from("stars")
    .select("amount")
    .eq("child_id", childId)
    .gte("created_at", `${today}T00:00:00`)
    .lte("created_at", `${today}T23:59:59`);

  if (error) return 0;
  return (data ?? []).reduce(
    (sum: number, row: { amount: number }) => sum + row.amount,
    0
  );
}

export async function getLatestNciSnapshot(childId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("nci_snapshots")
    .select("*")
    .eq("child_id", childId)
    .order("snapshot_date", { ascending: false })
    .limit(1)
    .single();

  if (error) return null;
  return data;
}

export async function getNciSnapshotHistory(childId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("nci_snapshots")
    .select("*")
    .eq("child_id", childId)
    .order("snapshot_date", { ascending: true });

  if (error) return [];
  return data ?? [];
}

export async function verifyPin(
  parentId: string,
  inputPin: string
): Promise<boolean> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("parents")
    .select("pin_hash")
    .eq("id", parentId)
    .single();

  if (error || !data?.pin_hash) return false;
  return verifyPinHash(inputPin, data.pin_hash);
}

export async function setPin(
  parentId: string,
  newPin: string
): Promise<boolean> {
  const supabase = await createClient();
  const pinHash = await hashPin(newPin);

  const { error } = await supabase
    .from("parents")
    .update({ pin_hash: pinHash })
    .eq("id", parentId);

  return !error;
}

export async function isPinSet(parentId: string): Promise<boolean> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("parents")
    .select("pin_hash")
    .eq("id", parentId)
    .single();

  if (error) return false;
  return data?.pin_hash !== null && data?.pin_hash !== undefined;
}

