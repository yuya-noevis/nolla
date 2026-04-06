"use server";

import { createClient } from "@/lib/supabase/server";
import type { GameType, DifficultyParams, SessionSummary } from "@/types/domain";

export async function persistSessionStart(
  childId: string,
  gameType: GameType,
  initialParams: DifficultyParams
): Promise<string | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("sessions")
    .insert({
      child_id: childId,
      game_type: gameType,
      initial_params: initialParams,
    })
    .select("id")
    .single();

  if (error) return null;
  return data.id;
}

export async function persistRound(
  sessionId: string,
  roundNumber: number,
  difficultyParams: DifficultyParams
): Promise<string | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("rounds")
    .insert({
      session_id: sessionId,
      round_number: roundNumber,
      difficulty_params: difficultyParams,
    })
    .select("id")
    .single();

  if (error) return null;
  return data.id;
}

export async function persistTrial(input: {
  roundId: string;
  sessionId: string;
  childId: string;
  trialNumber: number;
  gameType: GameType;
  correct: boolean;
  reactionTimeMs: number | null;
  hintStageReached: number;
  gameData: Record<string, unknown>;
  difficultyParams: DifficultyParams;
  irtB: number | null;
  presentedAt: string;
  respondedAt: string | null;
}): Promise<string | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("trials")
    .insert({
      round_id: input.roundId,
      session_id: input.sessionId,
      child_id: input.childId,
      trial_number: input.trialNumber,
      game_type: input.gameType,
      correct: input.correct,
      reaction_time_ms: input.reactionTimeMs,
      hint_stage_reached: input.hintStageReached,
      game_data: input.gameData,
      difficulty_params: input.difficultyParams,
      irt_b: input.irtB,
      presented_at: input.presentedAt,
      responded_at: input.respondedAt,
    })
    .select("id")
    .single();

  if (error) return null;
  return data.id;
}

export async function persistSessionEnd(
  sessionId: string,
  summary: SessionSummary
): Promise<boolean> {
  const supabase = await createClient();

  const { error } = await supabase
    .from("sessions")
    .update({
      ended_at: new Date().toISOString(),
      duration_ms: summary.durationMs,
      total_trials: summary.totalTrials,
      correct_count: summary.correctCount,
      accuracy: summary.accuracy,
      hint_stage1_count: summary.hintStage1Count,
      hint_stage2_count: summary.hintStage2Count,
      hint_stage3_count: summary.hintStage3Count,
      anomaly_score: summary.anomalyScore,
      final_params: summary.finalParams,
      reversal_count: summary.staircaseState.reversalCount,
      last_direction: summary.staircaseState.lastDirection,
    })
    .eq("id", sessionId);

  return !error;
}

export async function persistMotorBaseline(
  childId: string,
  sessionId: string,
  reactionTimes: readonly number[],
  medianRt: number,
  weightedBaseline: number
): Promise<boolean> {
  const supabase = await createClient();

  const { error } = await supabase.from("motor_baselines").insert({
    child_id: childId,
    session_id: sessionId,
    reaction_times: [...reactionTimes],
    median_rt: medianRt,
    weighted_baseline: weightedBaseline,
  });

  return !error;
}

export async function persistStars(
  childId: string,
  sessionId: string,
  amount: number,
  reason: string
): Promise<boolean> {
  const supabase = await createClient();

  const { error } = await supabase.from("stars").insert({
    child_id: childId,
    session_id: sessionId,
    amount,
    reason,
  });

  return !error;
}
