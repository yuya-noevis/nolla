# Nolla データ設計 — Supabaseスキーマ（0-D-3）

**作成日**: 2026-04-06
**ステータス**: CONFIRMED（2026-04-06 Yuya承認）
**参照**:
- `nolla_game_mechanics_design.md`（0-D-1）
- `nolla_adaptive_difficulty_design_0d2.md`（0-D-2）
- `nolla_nci_algorithm_design.md`（0-D-5）

---

## 0. 設計方針

```
1. 情報は可能な限り取得する（Yuya方針）
2. 取らなかったデータは後から取り直せない（0-D-5 設計原則）
3. MVPでは「取得して保存」に徹する。分析は後から載せる
4. 全試行の生データをDay1から永久保存
5. 要配慮個人情報（IQ帯、診断名）は暗号化保存
6. Supabase（PostgreSQL）+ Row Level Security（RLS）
```

---

## 1. テーブル一覧

```
認証・ユーザー系
  ├─ parents          保護者アカウント
  ├─ children         子どもプロフィール
  └─ facilities       施設（ToB、Phase 2以降）

ゲームプレイ系
  ├─ sessions         セッション（1回のプレイ）
  ├─ rounds           ラウンド（セッション内の区切り）
  ├─ trials           試行（1問ごとの記録）
  └─ difficulty_states パラメータ状態（ラウンドごと）

NCI・測定系
  ├─ nci_snapshots    NCIスナップショット（日次）
  ├─ motor_baselines  運動ベースライン
  └─ anomaly_flags    異常セッションフラグ

センサー系
  ├─ touch_dynamics   タッチダイナミクス（試行ごと）
  └─ device_motion    デバイスモーション（セッション集約）

報酬系
  ├─ stars            スター獲得履歴
  ├─ collectibles     コレクション（図鑑・アイテム）
  └─ room_items       マイルーム配置アイテム
```

---

## 2. テーブル定義

### 2.1 parents（保護者）

```sql
create table parents (
  id            uuid primary key default gen_random_uuid(),
  auth_id       uuid unique not null references auth.users(id),
  display_name  text,
  email         text,
  pin_hash      text,          -- 保護者エリアPIN（4-6桁のハッシュ）
  locale        text default 'ja',
  timezone      text default 'Asia/Tokyo',
  notification_preferences jsonb default '{}',
  created_at    timestamptz default now(),
  updated_at    timestamptz default now()
);
```

### 2.2 children（子ども）

```sql
create table children (
  id              uuid primary key default gen_random_uuid(),
  parent_id       uuid not null references parents(id) on delete cascade,
  display_name    text not null,               -- ニックネーム（ゲーム内表示）
  birth_date      date,                        -- 生年月日（精神年齢換算に使用）
  
  -- 診断情報（初期アセスメントで取得、複数選択可）
  diagnosis       text[] default '{}',
  -- 選択肢: asd, adhd, intellectual_disability, ld, down_syndrome, 
  --         borderline, other
  
  -- 知的障害の程度（diagnosis に intellectual_disability が含まれる場合のみ）
  intellectual_level text,
  -- 選択肢: severe(重度→BandA), moderate(中度→BandB), mild(軽度→BandC-D)
  
  -- LDの詳細（diagnosis に ld が含まれる場合のみ、複数選択可）
  ld_types        text[] default '{}',
  -- 選択肢: dyslexia(読字障害), dysgraphia(書字障害), 
  --         dyscalculia(算数障害), other
  
  -- 発語レベル（Otsimo参考）
  speech_level    text,
  -- 選択肢: nonverbal(発語なし), nonverbal_yes_no(発語なしだがYes/Noは伝えられる),
  --         words_only(単語のみ), partial(話すが伝わりにくい), verbal(会話可能)
  
  -- 初期アセスメント回答（ゲーム初期設定に使用）
  can_distinguish_colors boolean,     -- Q1: 色を区別できるか
  can_distinguish_shapes boolean,     -- Q2: 形を見分けられるか
  can_follow_multi_step  boolean,     -- Q3: 複数ステップの指示を実行できるか
  
  -- システムが算出するIQバンド
  iq_band         text not null default 'B2',  -- A1〜F3
  
  -- ゲーム提供設定（アセスメント結果から自動算出）
  games_enabled   jsonb default '{"memory_match": true, "sorting": true, "visual_search": true, "corsi_block": true}',
  sorting_start_criterion text default 'color', -- 'color' | 'shape' | 'size'
  
  -- 追加プロフィール（保護者が後から管理画面で入力）
  -- プロフィール完了率でカウントアップ表示して入力を促す
  additional_profile jsonb default '{}',
  -- 構造: {
  --   sensory_issues: ['auditory', 'visual', 'tactile'],  -- 感覚過敏
  --   behavioral: ['tantrum', 'self_injury', 'elopement'], -- 行動特性
  --   motor_skills: 'mild_difficulty',  -- 運動能力
  --   communication_aid: 'pecs',  -- コミュニケーション補助手段
  --   therapy_history: ['ot', 'st', 'aba'],  -- 療育歴
  --   medications: [],  -- 服薬（任意）
  --   profile_completion: 0.4  -- 完了率（0-1）
  -- }
  
  -- 音声認識設定
  voice_recognition_enabled boolean default false,
  
  -- アバター
  avatar_type     text default 'default',
  
  -- ベースライン状態
  baseline_established boolean default false,
  baseline_sessions_count int default 0,
  baseline_established_at timestamptz,
  
  created_at      timestamptz default now(),
  updated_at      timestamptz default now()
);

-- 診断情報・知的障害程度は要配慮個人情報 → カラムレベル暗号化
-- Supabase Vault または pgcrypto で暗号化
```

**intellectual_level → IQバンドのマッピング**:

| 保護者の選択 | マッピング先 | 開始バンド |
|-------------|------------|-----------|
| 重度 | IQ 21-35 | A2 |
| 中度 | IQ 36-50 | B2 |
| 軽度 | IQ 51-70 | C2 |

**知的障害を選択しなかった場合** → Band E1（IQ 71-78）から開始。適応型アルゴリズムが自動で適切な位置に移動する（0-D-2 初期配置アルゴリズム）。

**初期アセスメントの画面フロー**:

```
S2: お子さまのお名前（ニックネーム）と生年月日
  ↓
S3: 診断を選択してください（複数選択可）
  [ASD] [ADHD] [知的障害] [学習障害(LD)] [ダウン症] [境界知能] [その他]
  ↓
  知的障害を選んだ場合 → 「程度を教えてください」[重度] [中度] [軽度]
  LDを選んだ場合 → 「種類を教えてください」[読字(ディスレクシア)] [書字] [算数] [その他]
  ↓
S4: お子さまの発語レベル
  [発語なし] [発語なしだがYes/Noは伝えられる] [単語のみ]
  [話すが伝わりにくい] [会話可能]
  ↓
S5: お子さまの認知スキル確認（ゲーム初期設定に使用、Yes/No形式）
  Q1: 「色（赤・青・黄など）を区別できますか？」
      → Noなら分類ゲームの色基準をスキップ
  Q2: 「形（丸・三角・四角）を見分けられますか？」
      → Noなら分類ゲームの形基準をスキップ、神経衰弱のカード類似度を下げる
  Q3: 「複数ステップの指示（『拾って、入れて、持ってきて』）を実行できますか？」
      → NoならCorsiのシーケンス長2から開始
  ↓
S6: 音声認識ON/OFF → ゲーム開始

【前提能力による初期ゲーム設定】
  分類: Q1=No → 色基準スキップ（形から）、Q2=No → 大きさから開始
        Q1=No & Q2=No → 分類ゲーム自体を一時的に非表示
  神経衰弱: Q2=No → カード類似度を0%で開始
  Corsi: Q3=No → シーケンス長2、ブロック4で開始
  視覚探索: アセスメント不要（適応型で自動調整）

【後から追加（プロフィール完了率方式）】
  アカウント作成後に保護者管理画面で入力を促す。
  プロフィール完了率（3/10 → 10/10）でカウントアップ表示。
  「お子さまの情報が詳しいほど、より適切なサポートができます」

  追加項目（後から入力）:
  - 感覚過敏（聴覚・視覚・触覚）
  - 行動特性（癇癪・自傷行為・多動・常同行動）
  - 運動能力（微細運動・粗大運動の困難）
  - コミュニケーション手段（PECS・サイン・AAC）
  - 療育歴（OT・ST・ABA等）
  - 服薬情報（任意）
  - 微細な違いに気づくか（視覚探索の難度調整に使用）
  - ルール変更に対応できるか（分類の基準切替タイミングに使用）
  - おもちゃを隠した場所を覚えているか（神経衰弱の初期ペア数に使用）
  - 名前を呼んだら反応するか（ST系コンテンツ準備用）

  詳細なエビデンスは outputs/nolla_game_prerequisite_skills_assessment.md を参照。
```

### 2.3 sessions（セッション）

```sql
create table sessions (
  id              uuid primary key default gen_random_uuid(),
  child_id        uuid not null references children(id) on delete cascade,
  game_type       text not null,   -- 'memory-match' | 'sorting' | 'visual-search' | 'corsi-block'
  
  started_at      timestamptz not null default now(),
  ended_at        timestamptz,
  duration_ms     int,             -- セッション実時間
  
  -- セッション集約
  total_trials    int default 0,
  correct_count   int default 0,
  accuracy        real,            -- correct_count / total_trials
  
  -- エラーレス学習の集約
  hint_stage1_count int default 0,
  hint_stage2_count int default 0,
  hint_stage3_count int default 0,
  
  -- 異常判定（セッション終了時に算出）
  anomaly_score   real,            -- 0.0〜1.0
  anomaly_weight  real default 1.0, -- NCI更新の重み（異常時に低下）
  
  -- セッション開始時のパラメータ（復元用）
  initial_params  jsonb not null,
  -- セッション終了時のパラメータ（次回復元用）
  final_params    jsonb,
  
  -- Staircase状態
  reversal_count  int default 0,
  last_direction  text,            -- 'up' | 'down' | null
  
  created_at      timestamptz default now()
);
```

### 2.4 rounds（ラウンド）

```sql
create table rounds (
  id              uuid primary key default gen_random_uuid(),
  session_id      uuid not null references sessions(id) on delete cascade,
  round_number    int not null,
  
  -- ラウンド開始時のパラメータ
  difficulty_params jsonb not null,
  
  -- ラウンド集約
  trial_count     int default 0,
  correct_count   int default 0,
  consecutive_correct int default 0,  -- 連続正解数（Staircase判定用）
  hint_stage3_count int default 0,    -- Stage 3到達回数（DOWN判定用）
  
  -- Staircase判定結果
  adjustment_direction text,  -- 'up' | 'down' | 'none'
  adjusted_param       text,  -- 調整されたパラメータ名（nullなら調整なし）
  
  started_at      timestamptz not null default now(),
  ended_at        timestamptz,
  
  created_at      timestamptz default now()
);
```

### 2.5 trials（試行）

```sql
create table trials (
  id              uuid primary key default gen_random_uuid(),
  round_id        uuid not null references rounds(id) on delete cascade,
  session_id      uuid not null references sessions(id) on delete cascade,
  child_id        uuid not null references children(id) on delete cascade,
  trial_number    int not null,
  
  game_type       text not null,
  
  -- パフォーマンス
  correct         boolean not null,
  reaction_time_ms int,              -- タップまでの時間
  
  -- エラーレス学習
  hint_stage_reached int default 0,  -- 0=ヒントなし, 1, 2, 3
  
  -- ゲーム固有データ（柔軟に拡張可能）
  game_data       jsonb not null default '{}',
  -- 神経衰弱: { card_a: "cat", card_b: "dog", is_pair: false, positions: [3,7] }
  -- 分類:     { item: "apple", target_category: "fruit", selected_category: "fruit", criterion: "category" }
  -- 視覚探索: { target_position: {x:120,y:340}, tap_position: {x:118,y:342}, diff_type: "color" }
  -- Corsi:    { sequence: [2,5,1,4], response: [2,5,1,3], correct_length: 3 }
  
  -- 難度パラメータ（この試行時点のスナップショット）
  difficulty_params jsonb not null,
  
  -- IRT用パラメータ（NCI計算用）
  irt_b           real,  -- 難度パラメータb（difficulty_paramsから算出）
  irt_a           real default 1.0,  -- 識別力パラメータa
  
  -- タイムスタンプ
  presented_at    timestamptz not null,  -- 問題提示時刻
  responded_at    timestamptz,           -- 回答時刻
  
  created_at      timestamptz default now()
);

-- インデックス: NCI計算時のクエリ最適化
create index idx_trials_child_game on trials(child_id, game_type, created_at);
```

### 2.6 nci_snapshots（NCIスナップショット）

```sql
create table nci_snapshots (
  id              uuid primary key default gen_random_uuid(),
  child_id        uuid not null references children(id) on delete cascade,
  
  -- NCI 4軸
  nci_m           real,   -- Memory（0-999.999）
  nci_f           real,   -- Flexibility
  nci_a           real,   -- Attention
  nci_s           real,   -- Speed
  
  -- 信頼区間（標準誤差）
  nci_m_se        real,
  nci_f_se        real,
  nci_a_se        real,
  nci_s_se        real,
  
  -- ベイズ推定の状態
  theta_m         real,   -- θ推定値
  theta_f         real,
  theta_a         real,
  theta_s         real,
  sigma_m         real,   -- σ（不確実性）
  sigma_f         real,
  sigma_a         real,
  sigma_s         real,
  
  -- メタデータ
  total_trials_used int,  -- この推定に使った有効試行数
  snapshot_date   date not null,
  
  created_at      timestamptz default now(),
  
  unique(child_id, snapshot_date)
);

-- NCI値は要配慮個人情報 → カラムレベル暗号化
```

### 2.7 motor_baselines（運動ベースライン）

```sql
create table motor_baselines (
  id              uuid primary key default gen_random_uuid(),
  child_id        uuid not null references children(id) on delete cascade,
  session_id      uuid not null references sessions(id) on delete cascade,
  
  -- 単純反応課題の結果（10回分）
  reaction_times  int[] not null,    -- 各試行のRT（ms）
  median_rt       int not null,      -- 中央値（採用値）
  
  -- 加重平均後の運動ベースライン
  -- motor_baseline_new = 0.7 * old + 0.3 * median_rt
  weighted_baseline int not null,
  
  measured_at     timestamptz not null default now(),
  created_at      timestamptz default now()
);
```

### 2.8 touch_dynamics（タッチダイナミクス）

```sql
create table touch_dynamics (
  id              uuid primary key default gen_random_uuid(),
  trial_id        uuid not null references trials(id) on delete cascade,
  
  -- タッチ情報
  touch_force     real,              -- 押圧（0.0-1.0、デバイス正規化）
  touch_area      real,              -- 接触面積
  touch_duration_ms int,             -- タッチ持続時間
  
  -- 軌跡データ（タップまでの指の動き）
  touch_trajectory jsonb,            -- [{x, y, t, force}, ...]
  trajectory_straightness real,      -- 直線性（0-1、1=完全直線）
  
  -- 確信度推定（NCI補助指標）
  confidence_score real,             -- 0-1（高=確信あり）
  
  created_at      timestamptz default now()
);
```

### 2.9 device_motion（デバイスモーション）

```sql
create table device_motion (
  id              uuid primary key default gen_random_uuid(),
  session_id      uuid not null references sessions(id) on delete cascade,
  
  -- セッション集約（生データではなく統計値）
  gyro_variance   real,              -- ジャイロ分散（揺れの大きさ）
  accel_variance  real,              -- 加速度分散
  device_stability real,             -- 1 / (gyro + accel)。高い=安定
  
  -- 注意持続時間の推定
  attention_duration_ms int,         -- 安定が閾値以下に落ちるまでの時間
  
  -- 常同行動検出（FFT結果）
  repetitive_pattern_detected boolean default false,
  repetitive_frequency real,         -- 検出された繰り返し周波数（Hz）
  
  -- 生データ参照（将来の詳細分析用）
  raw_data_url    text,              -- Supabase Storageのパス
  
  measured_at     timestamptz not null default now(),
  created_at      timestamptz default now()
);
```

### 2.10 stars（スター獲得）

```sql
create table stars (
  id              uuid primary key default gen_random_uuid(),
  child_id        uuid not null references children(id) on delete cascade,
  session_id      uuid references sessions(id),
  
  amount          int not null,      -- 獲得スター数
  reason          text not null,     -- 'trial_correct' | 'round_complete' | 'session_complete' | 'daily_bonus'
  
  created_at      timestamptz default now()
);

-- 残高はSQLで集計: SELECT SUM(amount) FROM stars WHERE child_id = ?
-- マイナスのamountで消費を記録
```

### 2.11 collectibles（コレクション）

```sql
create table collectibles (
  id              uuid primary key default gen_random_uuid(),
  child_id        uuid not null references children(id) on delete cascade,
  
  item_type       text not null,     -- 'figure' | 'furniture' | 'wallpaper' | 'badge'
  item_id         text not null,     -- マスタデータのID
  acquired_at     timestamptz not null default now(),
  
  unique(child_id, item_type, item_id)
);
```

### 2.12 room_items（マイルーム配置）

```sql
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
```

---

## 3. Row Level Security（RLS）

```sql
-- 保護者は自分のデータのみアクセス可能
alter table parents enable row level security;
create policy "parents_own" on parents
  for all using (auth.uid() = auth_id);

-- 子どもは親のみアクセス可能
alter table children enable row level security;
create policy "children_own" on children
  for all using (
    parent_id in (select id from parents where auth_id = auth.uid())
  );

-- セッション・試行・NCI等は子ども経由で保護者にのみ公開
-- （同じパターンで全テーブルに適用）
```

---

## 4. データフロー

```
【1回のゲームプレイのデータフロー】

1. セッション開始
   → sessions INSERT（initial_params = 前回のfinal_params）
   → motor_baselines INSERT（単純反応課題10回）

2. ラウンド開始
   → rounds INSERT（difficulty_params = 現在のパラメータ）

3. 各試行
   → trials INSERT（正誤、RT、ゲーム固有データ）
   → touch_dynamics INSERT（圧力、軌跡、確信度）
   → NCI θ のベイズ更新（端末側でリアルタイム計算）

4. ラウンド終了
   → rounds UPDATE（集約データ、Staircase判定結果）
   → Staircase ロジック実行 → 次ラウンドのパラメータ決定

5. セッション終了
   → sessions UPDATE（集約データ、final_params、anomaly_score）
   → device_motion INSERT（セッション集約）
   → stars INSERT（獲得スター）
   → nci_snapshots UPSERT（日次スナップショット）

6. 日次バッチ（サーバー側）
   → DDM推定（Phase 1以降）
   → 異常セッション再判定
   → NCI精密再計算
```

---

## 5. ストレージ見積もり

```
1ユーザー・1日あたり（1セッション想定）:

  sessions:        ~0.5 KB
  rounds:          ~1.5 KB（3ラウンド）
  trials:          ~5 KB（10試行、各0.5KB）
  touch_dynamics:  ~3 KB（10試行分）
  device_motion:   ~0.5 KB（セッション集約）
  nci_snapshots:   ~0.3 KB（日次1レコード）
  stars:           ~0.2 KB
  motor_baselines: ~0.2 KB
  ─────────────────
  合計:            ~11 KB/日

1ユーザー・1年: ~4 MB
1000ユーザー・1年: ~4 GB
10000ユーザー・1年: ~40 GB

Supabase Pro（$25/月）のDB容量: 8GB → 1000ユーザーで約2年分
Supabase Team（$599/月）: 拡張可能
→ MVPでは十分。スケーリングはユーザー増加に応じて対応
```

---

## 6. 暗号化対象

```
要配慮個人情報（Supabase Vault で暗号化）:
  children.diagnosis          診断名
  children.intellectual_level 知的障害の程度
  children.ld_types           LD詳細
  children.speech_level       発語レベル
  children.additional_profile 追加プロフィール（行動特性・療育歴等）
  nci_snapshots.*             NCI値（認知機能推定値）

通常の個人情報（RLSで保護、暗号化は任意）:
  children.birth_date         生年月日
  children.display_name       ニックネーム
  parents.email               メールアドレス
```

---

## 7. マイグレーション計画

```
MVP（Phase 0完了後）:
  1. parents, children テーブル作成
  2. sessions, rounds, trials テーブル作成
  3. nci_snapshots, motor_baselines テーブル作成
  4. touch_dynamics テーブル作成
  5. stars, collectibles, room_items テーブル作成
  6. RLS ポリシー設定
  7. 暗号化設定

Phase 1（施設対応時）:
  8. facilities テーブル追加
  9. children に facility_id カラム追加
  10. 施設スタッフ用のRLSポリシー追加

Phase 2（研究データAPI）:
  11. 匿名化ビュー作成
  12. APIアクセス権限テーブル追加
```

---

## 8. 設計判断の根拠

| 判断 | 理由 |
|------|------|
| jsonbでゲーム固有データを保存 | 4ゲームで構造が異なる。個別カラムにすると列爆発。jsonbならスキーマ変更なしで拡張可能 |
| スター残高をSUM集計で算出 | 残高カラムを持つと不整合リスク。イベントソーシング方式で信頼性確保 |
| device_motionは集約値で保存 | 生データ（10Hz × 数分 = 数千行）はStorageに保存。DBには統計値のみ |
| NCI snapshots を日次 | 試行ごとに保存するとデータ量が膨大。日次なら十分な時系列分析が可能 |
| rounds テーブルを分離 | Staircase判定はラウンド単位。trials に混ぜると集約クエリが複雑化 |

---

## 変更履歴

| 日付 | 変更内容 |
|------|---------|
| 2026-04-06 | DRAFT 作成 |
| 2026-04-06 | v2: アセスメント設計修正 — 「答えたくない」「わからない」削除、LD詳細追加、発語レベル追加、追加プロフィール(jsonb)追加、プロフィール完了率方式 |
| 2026-04-06 | v3: 前提能力アセスメント追加 — 色/形弁別・指示実行の3問をS5に追加。回答結果でゲーム初期設定を自動制御（分類の基準スキップ、ゲーム非表示等）。ST系コンテンツ準備用に発語・音声理解も網羅 |
