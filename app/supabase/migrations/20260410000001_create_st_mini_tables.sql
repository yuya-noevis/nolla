-- Migration: Create ST Mini (AAC + Vowel Imitation) tables
-- Based on: outputs/nolla_mvp_design_spec_v3.md (ST Mini specification)

-- ==========================================================================
-- aac_taps (AAC語彙タップ履歴)
-- ==========================================================================
create table aac_taps (
  id              uuid primary key default gen_random_uuid(),
  child_id        uuid not null references children(id) on delete cascade,
  session_id      uuid references sessions(id) on delete set null,
  vocabulary_id   int not null check (vocabulary_id between 1 and 20),
  vocabulary_word text not null,
  category        text not null check (category in ('food', 'emotion', 'action')),
  tapped_at       timestamptz not null default now(),
  created_at      timestamptz not null default now()
);

-- Indexes for performance
create index idx_aac_taps_child_tapped on aac_taps(child_id, tapped_at desc);
create index idx_aac_taps_session on aac_taps(session_id);

alter table aac_taps enable row level security;

create policy "aac_taps_own_select" on aac_taps
  for select using (
    child_id in (
      select c.id from children c
      join parents p on c.parent_id = p.id
      where p.auth_id = auth.uid()
    )
  );

create policy "aac_taps_own_insert" on aac_taps
  for insert with check (
    child_id in (
      select c.id from children c
      join parents p on c.parent_id = p.id
      where p.auth_id = auth.uid()
    )
  );

create policy "aac_taps_own_delete" on aac_taps
  for delete using (
    child_id in (
      select c.id from children c
      join parents p on c.parent_id = p.id
      where p.auth_id = auth.uid()
    )
  );

-- ==========================================================================
-- vowel_attempts (母音模倣ミニ試行)
-- ==========================================================================
create table vowel_attempts (
  id              uuid primary key default gen_random_uuid(),
  child_id        uuid not null references children(id) on delete cascade,
  session_id      uuid references sessions(id) on delete set null,
  vowel           text not null check (vowel in ('a', 'i', 'u', 'e', 'o')),
  completed_by    text not null check (completed_by in ('parent_tap', 'auto')),
  attempted_at    timestamptz not null default now(),
  created_at      timestamptz not null default now()
);

-- Indexes for performance
create index idx_vowel_attempts_child_attempted on vowel_attempts(child_id, attempted_at desc);
create index idx_vowel_attempts_session on vowel_attempts(session_id);

alter table vowel_attempts enable row level security;

create policy "vowel_attempts_own_select" on vowel_attempts
  for select using (
    child_id in (
      select c.id from children c
      join parents p on c.parent_id = p.id
      where p.auth_id = auth.uid()
    )
  );

create policy "vowel_attempts_own_insert" on vowel_attempts
  for insert with check (
    child_id in (
      select c.id from children c
      join parents p on c.parent_id = p.id
      where p.auth_id = auth.uid()
    )
  );

create policy "vowel_attempts_own_delete" on vowel_attempts
  for delete using (
    child_id in (
      select c.id from children c
      join parents p on c.parent_id = p.id
      where p.auth_id = auth.uid()
    )
  );
