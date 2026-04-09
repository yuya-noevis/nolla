-- Migration: FK covering indexes + function search_path hardening
-- Reason: Supabase advisor P2-1 (unindexed_foreign_keys x13) and P2-2 (function_search_path_mutable)
-- Reference: outputs/_research/nolla_quality_audit_2026-04-10.md

-- P2-1: FK covering indexes (13 FKs)
create index if not exists idx_children_parent_id on public.children(parent_id);
create index if not exists idx_device_motion_session_id on public.device_motion(session_id);
create index if not exists idx_motor_baselines_child_id on public.motor_baselines(child_id);
create index if not exists idx_motor_baselines_session_id on public.motor_baselines(session_id);
create index if not exists idx_room_items_child_id on public.room_items(child_id);
create index if not exists idx_room_items_collectible_id on public.room_items(collectible_id);
create index if not exists idx_rounds_session_id on public.rounds(session_id);
create index if not exists idx_sessions_child_id on public.sessions(child_id);
create index if not exists idx_stars_child_id on public.stars(child_id);
create index if not exists idx_stars_session_id on public.stars(session_id);
create index if not exists idx_touch_dynamics_trial_id on public.touch_dynamics(trial_id);
create index if not exists idx_trials_round_id on public.trials(round_id);
create index if not exists idx_trials_session_id on public.trials(session_id);

-- P2-2: function search_path hardening
alter function public.update_updated_at() set search_path = public, pg_temp;
