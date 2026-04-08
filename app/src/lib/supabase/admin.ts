/**
 * Supabase admin client (service role).
 * Bypasses RLS — only use server-side from explicitly authorized routes.
 *
 * Required env: SUPABASE_SERVICE_ROLE_KEY
 * If missing, returns null so callers can fall back / report a setup error
 * instead of crashing the whole app.
 */
import { createClient as createSupabaseClient } from "@supabase/supabase-js";

export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;

  return createSupabaseClient(url, key, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
