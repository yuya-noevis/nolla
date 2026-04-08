import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// L15: abandoned-session handler.
// Called via navigator.sendBeacon from beforeunload/visibilitychange so a
// child closing the tab mid-session still gets `sessions.ended_at` stamped.
// Only sets ended_at — no summary aggregation, because the in-memory state
// needed for that is lost with the tab. The row stays partially filled,
// which is the correct signal for "incomplete".
export async function POST(request: Request) {
  let sessionId: string | null = null;
  try {
    // sendBeacon sends Blob/text; support both JSON and form-ish payloads.
    const text = await request.text();
    if (text) {
      try {
        const parsed = JSON.parse(text) as { sessionId?: string };
        sessionId = parsed.sessionId ?? null;
      } catch {
        sessionId = null;
      }
    }
  } catch {
    sessionId = null;
  }

  if (!sessionId) {
    return NextResponse.json({ success: false, error: "missing sessionId" }, { status: 400 });
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("sessions")
    .update({ ended_at: new Date().toISOString() })
    .eq("id", sessionId)
    .is("ended_at", null);

  if (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
  return NextResponse.json({ success: true });
}
