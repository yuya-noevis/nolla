-- Migration: Create gameplay tables (sessions, rounds, trials)
-- Based on: outputs/nolla_data_design_0d3.md (Section 2.3, 2.4, 2.5)

-- ==========================================================================
-- sessions (セッション)
-- ==========================================================================
create table sessions (
  id              uuid primary key default gen_random_uuid(),
  child_id        uuid not null references children(id) on delete cascade,
  game_type       text not null,

  started_at      timestamptz not null default now(),
  ended_at        timestamptz,
  duration_ms     int,

  -- 集約
  total_trials    int default 0,
  correct_count   int default 0,
  accuracy        real,

  -- エラーレス学習
  hint_stage1_count int default 0,
  hint_stage2_count int default 0,
  hint_stage3_count int default 0,

  -- 異常判定
  anomaly_score   real,
  anomaly_weight  real default 1.0,

  -- パラメータ
  initial_params  jsonb not null,
  final_params    jsonb,

  -- Staircase
  reversal_count  int default 0,
  last_direction  text,

  created_at      timestamptz default now()
);

-- game_type check
alter table sessions add constraint sessions_game_type_check
  check (game_type in ('memory-match', 'sorting', 'visual-search', 'corsi-block'));

alter table sessions enable row level security;

create policy "sessions_own" on sessions
  for all using (
    child_id in (
      select c.id from children c
      join parents p on c.parent_id = p.id
      where p.auth_id = auth.uid()
    )
  );

-- ==========================================================================
-- rounds (ラウンド)
-- ==========================================================================
create table rounds (
  id              uuid primary key default gen_random_uuid(),
  session_id      uuid not null references sessions(id) on delete cascade,
  round_number    int not null,

  difficulty_params jsonb not null,

  trial_count     int default 0,
  correct_count   int default 0,
  consecutive_correct int default 0,
  hint_stage3_count int default 0,

  adjustment_direction text,
  adjusted_param       text,

  started_at      timestamptz not null default now(),
  ended_at        timestamptz,

  created_at      timestamptz default now()
);

alter table rounds enable row level security;

create policy "rounds_own" on rounds
  for all using (
    session_id in (
      select s.id from sessions s
      join children c on s.child_id = c.id
      join parents p on c.parent_id = p.id
      where p.auth_id = auth.uid()
    )
  );

-- ==========================================================================
-- trials (試行)
-- ==========================================================================
create table trials (
  id              uuid primary key default gen_random_uuid(),
  round_id        uuid not null references rounds(id) on delete cascade,
  session_id      uuid not null references sessions(id) on delete cascade,
  child_id        uuid not null references children(id) on delete cascade,
  trial_number    int not null,

  game_type       text not null,

  correct         boolean not null,
  reaction_time_ms int,

  hint_stage_reached int default 0,

  game_data       jsonb not null default '{}',
  difficulty_params jsonb not null,

  irt_b           real,
  irt_a           real default 1.0,

  presented_at    timestamptz not null,
  responded_at    timestamptz,

  created_at      timestamptz default now()
);

-- game_type check
alter table trials add constraint trials_game_type_check
  check (game_type in ('memory-match', 'sorting', 'visual-search', 'corsi-block'));

-- NCI計算最適化インデックス
create index idx_trials_child_game on trials(child_id, game_type, created_at);

alter table trials enable row level security;

create policy "trials_own" on trials
  for all using (
    child_id in (
      select c.id from children c
      join parents p on c.parent_id = p.id
      where p.auth_id = auth.uid()
    )
  );
