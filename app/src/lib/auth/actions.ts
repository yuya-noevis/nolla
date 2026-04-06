"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function signUpWithEmail(formData: FormData) {
  const supabase = await createClient();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback?next=/onboarding/assessment`,
    },
  });

  if (error) {
    return { success: false as const, error: error.message };
  }

  return { success: true as const, data: null };
}

export async function signInWithEmail(formData: FormData) {
  const supabase = await createClient();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { success: false as const, error: error.message };
  }

  // Check if child profile exists
  const destination = await getPostAuthDestination(supabase);
  redirect(destination);
}

export async function signInWithOAuth(provider: "apple" | "google") {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
    },
  });

  if (error) {
    return { success: false as const, error: error.message };
  }

  if (data.url) {
    redirect(data.url);
  }

  return { success: false as const, error: "OAuth URL not returned" };
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/onboarding");
}

async function getPostAuthDestination(
  supabase: Awaited<ReturnType<typeof createClient>>
): Promise<string> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return "/onboarding";

  // Check if parent record exists
  const { data: parent } = await supabase
    .from("parents")
    .select("id")
    .eq("auth_id", user.id)
    .single();

  if (!parent) return "/onboarding/assessment";

  // Check if any child profile exists
  const { data: children } = await supabase
    .from("children")
    .select("id")
    .eq("parent_id", parent.id)
    .limit(1);

  if (!children || children.length === 0) return "/onboarding/assessment";

  return "/home";
}
