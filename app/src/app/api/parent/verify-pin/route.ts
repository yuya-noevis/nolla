import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { verifyPin } from "@/lib/auth/pin";

export async function POST(request: Request) {
  let pin: string | null = null;
  try {
    const body = (await request.json()) as { pin?: string };
    pin = body.pin ?? null;
  } catch {
    pin = null;
  }
  if (!pin) {
    return NextResponse.json({ success: false, error: "invalid pin" }, { status: 400 });
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ success: false, error: "unauthorized" }, { status: 401 });
  }

  const { data, error } = await supabase
    .from("parents")
    .select("pin_hash")
    .eq("auth_id", user.id)
    .single();

  if (error || !data?.pin_hash) {
    // No PIN set yet — front-end interprets 404 as "set new pin" flow.
    return NextResponse.json({ success: false, error: "not_set" }, { status: 404 });
  }

  const ok = await verifyPin(pin, data.pin_hash);
  if (!ok) {
    return NextResponse.json({ success: false, error: "mismatch" }, { status: 401 });
  }
  return NextResponse.json({ success: true });
}
