/**
 * GDPR right-to-erasure endpoint.
 * Authenticated parent can permanently delete their account and all child data.
 *
 * Cascade order:
 *   1. Verify caller is the authenticated parent (anon client)
 *   2. Verify confirmation phrase to prevent accidental calls
 *   3. Delete the parents row (FK cascades remove children, sessions,
 *      rounds, trials, nci_snapshots, stars, room_items, motor_baselines)
 *   4. Delete the auth.users row via service-role admin client
 *
 * Service role key is required; without it the route refuses to act.
 */
import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

const CONFIRM_PHRASE = "DELETE";

export async function POST(request: Request) {
  let confirm: string | null = null;
  try {
    const body = (await request.json()) as { confirm?: string };
    confirm = body.confirm ?? null;
  } catch {
    confirm = null;
  }

  if (confirm !== CONFIRM_PHRASE) {
    return NextResponse.json(
      { success: false, error: "confirmation required" },
      { status: 400 }
    );
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json(
      { success: false, error: "unauthorized" },
      { status: 401 }
    );
  }

  const admin = createAdminClient();
  if (!admin) {
    return NextResponse.json(
      {
        success: false,
        error:
          "service role key not configured; account deletion unavailable",
      },
      { status: 503 }
    );
  }

  // Step 1: delete parents row (cascades to children, sessions, etc.)
  // Use admin client so we don't depend on the parents DELETE RLS policy
  // matching the caller mid-deletion.
  const { error: parentDeleteError } = await admin
    .from("parents")
    .delete()
    .eq("auth_id", user.id);

  if (parentDeleteError) {
    return NextResponse.json(
      { success: false, error: parentDeleteError.message },
      { status: 500 }
    );
  }

  // Step 2: delete auth.users row
  const { error: authDeleteError } = await admin.auth.admin.deleteUser(
    user.id
  );

  if (authDeleteError) {
    // Parent rows are already gone — surface the partial state so the
    // caller can retry or escalate. The auth row will still be removable
    // out-of-band via Supabase dashboard.
    return NextResponse.json(
      {
        success: false,
        error: `parent data deleted but auth user removal failed: ${authDeleteError.message}`,
      },
      { status: 500 }
    );
  }

  // Sign the caller out by clearing their session cookie.
  await supabase.auth.signOut();

  return NextResponse.json({ success: true });
}
