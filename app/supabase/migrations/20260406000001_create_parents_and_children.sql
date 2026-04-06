-- Migration: Create parents and children tables
-- Based on: outputs/nolla_data_design_0d3.md (Section 2.1, 2.2)

-- ==========================================================================
-- parents (保護者)
-- ==========================================================================
create table parents (
  id            uuid primary key default gen_random_uuid(),
  auth_id       uuid unique not null references auth.users(id),
  display_name  text,
  email         text,
  pin_hash      text,
  locale        text default 'ja',
  timezone      text default 'Asia/Tokyo',
  notification_preferences jsonb default '{}',
  created_at    timestamptz default now(),
  updated_at    timestamptz default now()
);

alter table parents enable row level security;

create policy "parents_own_select" on parents
  for select using (auth.uid() = auth_id);
create policy "parents_own_insert" on parents
  for insert with check (auth.uid() = auth_id);
create policy "parents_own_update" on parents
  for update using (auth.uid() = auth_id);

-- ==========================================================================
-- children (子ども)
-- ==========================================================================
create table children (
  id              uuid primary key default gen_random_uuid(),
  parent_id       uuid not null references parents(id) on delete cascade,
  display_name    text not null,
  birth_date      date,

  -- 診断情報（要配慮個人情報 → 暗号化対象）
  diagnosis       text[] default '{}',
  intellectual_level text,
  ld_types        text[] default '{}',
  speech_level    text,

  -- 前提能力アセスメント（S5）
  can_distinguish_colors boolean,
  can_distinguish_shapes boolean,
  can_follow_multi_step  boolean,

  -- システム算出
  iq_band         text not null default 'B2',
  games_enabled   jsonb default '{"memory_match": true, "sorting": true, "visual_search": true, "corsi_block": true}',
  sorting_start_criterion text default 'color',

  -- 追加プロフィール（後から入力）
  additional_profile jsonb default '{}',

  -- 設定
  voice_recognition_enabled boolean default false,
  avatar_type     text default 'default',

  -- ベースライン
  baseline_established boolean default false,
  baseline_sessions_count int default 0,
  baseline_established_at timestamptz,

  created_at      timestamptz default now(),
  updated_at      timestamptz default now()
);

alter table children enable row level security;

create policy "children_own_select" on children
  for select using (
    parent_id in (select id from parents where auth_id = auth.uid())
  );
create policy "children_own_insert" on children
  for insert with check (
    parent_id in (select id from parents where auth_id = auth.uid())
  );
create policy "children_own_update" on children
  for update using (
    parent_id in (select id from parents where auth_id = auth.uid())
  );
create policy "children_own_delete" on children
  for delete using (
    parent_id in (select id from parents where auth_id = auth.uid())
  );

-- updated_at auto-trigger
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger parents_updated_at
  before update on parents
  for each row execute function update_updated_at();

create trigger children_updated_at
  before update on children
  for each row execute function update_updated_at();
