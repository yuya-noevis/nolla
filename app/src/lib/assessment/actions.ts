"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { AssessmentData } from "./types";
import {
  calculateInitialIqBand,
  calculateGamesEnabled,
  calculateSortingStartCriterion,
} from "./flow";

export async function completeAssessment(
  data: AssessmentData,
  voiceRecognitionEnabled: boolean
) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { success: false as const, error: "Not authenticated" };
  }

  // Upsert parent record
  const { data: parent, error: parentError } = await supabase
    .from("parents")
    .upsert(
      { auth_id: user.id, email: user.email },
      { onConflict: "auth_id" }
    )
    .select("id")
    .single();

  if (parentError || !parent) {
    return { success: false as const, error: parentError?.message ?? "Failed to create parent" };
  }

  // Create child profile
  const iqBand = calculateInitialIqBand(data);
  const gamesEnabled = calculateGamesEnabled(data);
  const sortingStartCriterion = calculateSortingStartCriterion(data);

  const { error: childError } = await supabase.from("children").insert({
    parent_id: parent.id,
    display_name: data.displayName,
    birth_date: data.birthDate || null,
    diagnosis: data.diagnoses,
    intellectual_level: data.intellectualLevel,
    ld_types: data.ldTypes,
    speech_level: data.speechLevel,
    can_distinguish_colors: data.canDistinguishColors,
    can_distinguish_shapes: data.canDistinguishShapes,
    can_follow_multi_step: data.canFollowMultiStep,
    iq_band: iqBand,
    games_enabled: gamesEnabled,
    sorting_start_criterion: sortingStartCriterion,
    voice_recognition_enabled: voiceRecognitionEnabled,
  });

  if (childError) {
    return { success: false as const, error: childError.message };
  }

  redirect("/home");
}
