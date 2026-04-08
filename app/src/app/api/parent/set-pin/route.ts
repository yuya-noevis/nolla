import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { hashPin } from "@/lib/auth/pin";

export async function POST(request: Request) {
  let pin: string | null = null;
  try {
    const body = (await request.json()) as { pin?: string };
    pin = body.pin ?? null;
  } catch {
    pin = null;
  }
  if (!pin || !/^\d{4,6}$/.test(pin)) {
    return NextResponse.json({ success: false, error: "invalid pin" }, { status: 400 });
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ success: false, error: "unauthorized" }, { status: 401 });
  }

  const pin_hash = await hashPin(pin);

  const { error } = await supabase
    .from("parents")
    .update({ pin_hash })
    .eq("auth_id", user.id);

  if (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
  return NextResponse.json({ success: true });
}
