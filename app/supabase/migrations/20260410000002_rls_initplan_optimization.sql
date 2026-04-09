-- Migration: Wrap auth.uid() in (select auth.uid()) across all RLS policies
-- Reason: Supabase performance advisor "auth_rls_initplan" — avoid per-row re-evaluation
-- Scope: 16 policies on parents, children, sessions, rounds, trials, nci_snapshots,
--        motor_baselines, touch_dynamics, device_motion, stars, collectibles, room_items,
--        aac_taps, vowel_attempts
-- Reference: outputs/_research/nolla_quality_audit_2026-04-10.md (P1-2)

-- ==========================================================================
-- parents
-- ==========================================================================
drop policy if exists "parents_own_select" on parents;
drop policy if exists "parents_own_insert" on parents;
drop policy if exists "parents_own_update" on parents;
drop policy if exists "parents_own_delete" on parents;

create policy "parents_own_select" on parents
  for select using ((select auth.uid()) = auth_id);
create policy "parents_own_insert" on parents
  for insert with check ((select auth.uid()) = auth_id);
create policy "parents_own_update" on parents
  for update using ((select auth.uid()) = auth_id);
create policy "parents_own_delete" on parents
  for delete using ((select auth.uid()) = auth_id);

-- ==========================================================================
-- children
-- ==========================================================================
drop policy if exists "children_own_select" on children;
drop policy if exists "children_own_insert" on children;
drop policy if exists "children_own_update" on children;
drop policy if exists "children_own_delete" on children;

create policy "children_own_select" on children
  for select using (
    parent_id in (select id from parents where auth_id = (select auth.uid()))
  );
create policy "children_own_insert" on children
  for insert with check (
    parent_id in (select id from parents where auth_id = (select auth.uid()))
  );
create policy "children_own_update" on children
  for update using (
    parent_id in (select id from parents where auth_id = (select auth.uid()))
  );
create policy "children_own_delete" on children
  for delete using (
    parent_id in (select id from parents where auth_id = (select auth.uid()))
  );

-- ==========================================================================
-- sessions
-- ==========================================================================
drop policy if exists "sessions_own" on sessions;
create policy "sessions_own" on sessions
  for all using (
    child_id in (
      select c.id from children c
      join parents p on c.parent_id = p.id
      where p.auth_id = (select auth.uid())
    )
  );

-- ==========================================================================
-- rounds
-- ==========================================================================
drop policy if exists "rounds_own" on rounds;
create policy "rounds_own" on rounds
  for all using (
    session_id in (
      select s.id from sessions s
      join children c on s.child_id = c.id
      join parents p on c.parent_id = p.id
      where p.auth_id = (select auth.uid())
    )
  );

-- ==========================================================================
-- trials
-- ==========================================================================
drop policy if exists "trials_own" on trials;
create policy "trials_own" on trials
  for all using (
    child_id in (
      select c.id from children c
      join parents p on c.parent_id = p.id
      where p.auth_id = (select auth.uid())
    )
  );

-- ==========================================================================
-- nci_snapshots
-- ==========================================================================
drop policy if exists "nci_snapshots_own" on nci_snapshots;
create policy "nci_snapshots_own" on nci_snapshots
  for all using (
    child_id in (
      select c.id from children c
      join parents p on c.parent_id = p.id
      where p.auth_id = (select auth.uid())
    )
  );

-- ==========================================================================
-- motor_baselines
-- ==========================================================================
drop policy if exists "motor_baselines_own" on motor_baselines;
create policy "motor_baselines_own" on motor_baselines
  for all using (
    child_id in (
      select c.id from children c
      join parents p on c.parent_id = p.id
      where p.auth_id = (select auth.uid())
    )
  );

-- ==========================================================================
-- touch_dynamics
-- ==========================================================================
drop policy if exists "touch_dynamics_own" on touch_dynamics;
create policy "touch_dynamics_own" on touch_dynamics
  for all using (
    trial_id in (
      select t.id from trials t
      join children c on t.child_id = c.id
      join parents p on c.parent_id = p.id
      where p.auth_id = (select auth.uid())
    )
  );

-- ==========================================================================
-- device_motion
-- ==========================================================================
drop policy if exists "device_motion_own" on device_motion;
create policy "device_motion_own" on device_motion
  for all using (
    session_id in (
      select s.id from sessions s
      join children c on s.child_id = c.id
      join parents p on c.parent_id = p.id
      where p.auth_id = (select auth.uid())
    )
  );

-- ==========================================================================
-- stars
-- ==========================================================================
drop policy if exists "stars_own" on stars;
create policy "stars_own" on stars
  for all using (
    child_id in (
      select c.id from children c
      join parents p on c.parent_id = p.id
      where p.auth_id = (select auth.uid())
    )
  );

-- ==========================================================================
-- collectibles
-- ==========================================================================
drop policy if exists "collectibles_own" on collectibles;
create policy "collectibles_own" on collectibles
  for all using (
    child_id in (
      select c.id from children c
      join parents p on c.parent_id = p.id
      where p.auth_id = (select auth.uid())
    )
  );

-- ==========================================================================
-- room_items
-- ==========================================================================
drop policy if exists "room_items_own" on room_items;
create policy "room_items_own" on room_items
  for all using (
    child_id in (
      select c.id from children c
      join parents p on c.parent_id = p.id
      where p.auth_id = (select auth.uid())
    )
  );

-- ==========================================================================
-- aac_taps
-- ==========================================================================
drop policy if exists "aac_taps_own_select" on aac_taps;
drop policy if exists "aac_taps_own_insert" on aac_taps;
drop policy if exists "aac_taps_own_delete" on aac_taps;

create policy "aac_taps_own_select" on aac_taps
  for select using (
    child_id in (
      select c.id from children c
      join parents p on c.parent_id = p.id
      where p.auth_id = (select auth.uid())
    )
  );
create policy "aac_taps_own_insert" on aac_taps
  for insert with check (
    child_id in (
      select c.id from children c
      join parents p on c.parent_id = p.id
      where p.auth_id = (select auth.uid())
    )
  );
create policy "aac_taps_own_delete" on aac_taps
  for delete using (
    child_id in (
      select c.id from children c
      join parents p on c.parent_id = p.id
      where p.auth_id = (select auth.uid())
    )
  );

-- ==========================================================================
-- vowel_attempts
-- ==========================================================================
drop policy if exists "vowel_attempts_own_select" on vowel_attempts;
drop policy if exists "vowel_attempts_own_insert" on vowel_attempts;
drop policy if exists "vowel_attempts_own_delete" on vowel_attempts;

create policy "vowel_attempts_own_select" on vowel_attempts
  for select using (
    child_id in (
      select c.id from children c
      join parents p on c.parent_id = p.id
      where p.auth_id = (select auth.uid())
    )
  );
create policy "vowel_attempts_own_insert" on vowel_attempts
  for insert with check (
    child_id in (
      select c.id from children c
      join parents p on c.parent_id = p.id
      where p.auth_id = (select auth.uid())
    )
  );
create policy "vowel_attempts_own_delete" on vowel_attempts
  for delete using (
    child_id in (
      select c.id from children c
      join parents p on c.parent_id = p.id
      where p.auth_id = (select auth.uid())
    )
  );
