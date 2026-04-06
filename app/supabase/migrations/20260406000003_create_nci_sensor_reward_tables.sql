-- Migration: Create NCI, sensor, and reward tables
-- Based on: outputs/nolla_data_design_0d3.md (Section 2.6-2.12)

-- ==========================================================================
-- nci_snapshots (NCI日次スナップショット)
-- ==========================================================================
create table nci_snapshots (
  id              uuid primary key default gen_random_uuid(),
  child_id        uuid not null references children(id) on delete cascade,

  -- NCI 4軸 (0-999.999)
  nci_m           real,
  nci_f           real,
  nci_a           real,
  nci_s           real,

  -- 信頼区間（標準誤差）
  nci_m_se        real,
  nci_f_se        real,
  nci_a_se        real,
  nci_s_se        real,

  -- ベイズ推定の状態
  theta_m         real,
  theta_f         real,
  theta_a         real,
  theta_s         real,
  sigma_m         real,
  sigma_f         real,
  sigma_a         real,
  sigma_s         real,

  total_trials_used int,
  snapshot_date   date not null,

  created_at      timestamptz default now(),

  unique(child_id, snapshot_date)
);

alter table nci_snapshots enable row level security;

create policy "nci_snapshots_own" on nci_snapshots
  for all using (
    child_id in (
      select c.id from children c
      join parents p on c.parent_id = p.id
      where p.auth_id = auth.uid()
    )
  );

-- ==========================================================================
-- motor_baselines (運動ベースライン)
-- ==========================================================================
create table motor_baselines (
  id              uuid primary key default gen_random_uuid(),
  child_id        uuid not null references children(id) on delete cascade,
  session_id      uuid not null references sessions(id) on delete cascade,

  reaction_times  int[] not null,
  median_rt       int not null,
  weighted_baseline int not null,

  measured_at     timestamptz not null default now(),
  created_at      timestamptz default now()
);

alter table motor_baselines enable row level security;

create policy "motor_baselines_own" on motor_baselines
  for all using (
    child_id in (
      select c.id from children c
      join parents p on c.parent_id = p.id
      where p.auth_id = auth.uid()
    )
  );

-- ==========================================================================
-- touch_dynamics (タッチダイナミクス)
-- ==========================================================================
create table touch_dynamics (
  id              uuid primary key default gen_random_uuid(),
  trial_id        uuid not null references trials(id) on delete cascade,

  touch_force     real,
  touch_area      real,
  touch_duration_ms int,

  touch_trajectory jsonb,
  trajectory_straightness real,

  confidence_score real,

  created_at      timestamptz default now()
);

alter table touch_dynamics enable row level security;

create policy "touch_dynamics_own" on touch_dynamics
  for all using (
    trial_id in (
      select t.id from trials t
      join children c on t.child_id = c.id
      join parents p on c.parent_id = p.id
      where p.auth_id = auth.uid()
    )
  );

-- ==========================================================================
-- device_motion (デバイスモーション)
-- ==========================================================================
create table device_motion (
  id              uuid primary key default gen_random_uuid(),
  session_id      uuid not null references sessions(id) on delete cascade,

  gyro_variance   real,
  accel_variance  real,
  device_stability real,

  attention_duration_ms int,

  repetitive_pattern_detected boolean default false,
  repetitive_frequency real,

  raw_data_url    text,

  measured_at     timestamptz not null default now(),
  created_at      timestamptz default now()
);

alter table device_motion enable row level security;

create policy "device_motion_own" on device_motion
  for all using (
    session_id in (
      select s.id from sessions s
      join children c on s.child_id = c.id
      join parents p on c.parent_id = p.id
      where p.auth_id = auth.uid()
    )
  );

-- ==========================================================================
-- stars (スター獲得)
-- ==========================================================================
create table stars (
  id              uuid primary key default gen_random_uuid(),
  child_id        uuid not null references children(id) on delete cascade,
  session_id      uuid references sessions(id),

  amount          int not null,
  reason          text not null,

  created_at      timestamptz default now()
);

alter table stars add constraint stars_reason_check
  check (reason in ('trial_correct', 'round_complete', 'session_complete', 'daily_bonus', 'purchase'));

alter table stars enable row level security;

create policy "stars_own" on stars
  for all using (
    child_id in (
      select c.id from children c
      join parents p on c.parent_id = p.id
      where p.auth_id = auth.uid()
    )
  );

-- ==========================================================================
-- collectibles (コレクション)
-- ==========================================================================
create table collectibles (
  id              uuid primary key default gen_random_uuid(),
  child_id        uuid not null references children(id) on delete cascade,

  item_type       text not null,
  item_id         text not null,
  acquired_at     timestamptz not null default now(),

  unique(child_id, item_type, item_id)
);

alter table collectibles add constraint collectibles_item_type_check
  check (item_type in ('figure', 'furniture', 'wallpaper', 'badge'));

alter table collectibles enable row level security;

create policy "collectibles_own" on collectibles
  for all using (
    child_id in (
      select c.id from children c
      join parents p on c.parent_id = p.id
      where p.auth_id = auth.uid()
    )
  );

-- ==========================================================================
-- room_items (マイルーム配置)
-- ==========================================================================
create table room_items (
  id              uuid primary key default gen_random_uuid(),
  child_id        uuid not null references children(id) on delete cascade,
  collectible_id  uuid not null references collectibles(id),

  position_x      real not null,
  position_y      real not null,
  rotation        real default 0,
  scale           real default 1.0,

  updated_at      timestamptz default now()
);

alter table room_items enable row level security;

create policy "room_items_own" on room_items
  for all using (
    child_id in (
      select c.id from children c
      join parents p on c.parent_id = p.id
      where p.auth_id = auth.uid()
    )
  );

create trigger room_items_updated_at
  before update on room_items
  for each row execute function update_updated_at();
