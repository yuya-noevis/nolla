# Nolla App

ASD + 知的障害児（3-18歳）向け発達支援アプリ。

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Database**: Supabase (PostgreSQL + Auth + RLS)
- **Testing**: Vitest (unit) + Playwright (E2E)
- **Deploy**: Vercel

## Getting Started

```bash
cd app
npm install
cp .env.example .env.local
# .env.local に Supabase の URL と Anon Key を設定
npm run dev
```

http://localhost:3000 でアプリが起動します。

## Supabase Setup

### 1. Supabase プロジェクト作成

[Supabase Dashboard](https://supabase.com/dashboard) で新規プロジェクトを作成。

### 2. 環境変数の設定

`.env.local` に以下を設定:

```
NEXT_PUBLIC_SUPABASE_URL=https://<project-id>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-anon-key>
```

### 3. マイグレーション実行

```bash
# Supabase CLI にログイン
npx supabase login

# プロジェクトをリンク（<project-id> を実際のIDに置換）
npx supabase link --project-ref <project-id>

# マイグレーション実行（12テーブル + RLS）
npx supabase db push
```

マイグレーションファイル:
- `20260406000001_create_parents_and_children.sql` — 認証・ユーザー系
- `20260406000002_create_gameplay_tables.sql` — ゲームプレイ系
- `20260406000003_create_nci_sensor_reward_tables.sql` — NCI・センサー・報酬系

### 4. OAuth 設定（任意）

Supabase Dashboard > Authentication > Providers で Apple / Google を有効化。

## Scripts

```bash
npm run dev          # 開発サーバー起動
npm run build        # プロダクションビルド
npm run test         # ユニットテスト（Vitest）
npm run test:coverage # カバレッジ付きテスト
npm run test:e2e     # E2Eテスト（Playwright）
npm run lint         # ESLint
```

## Project Structure

```
app/
├── src/
│   ├── app/              # Next.js App Router pages
│   │   ├── page.tsx      # S1 Splash
│   │   ├── onboarding/   # S2-S6 Onboarding + Assessment
│   │   ├── home/         # M1 Home carousel
│   │   ├── game/         # M4 Game sessions
│   │   ├── reward/       # R1 Reward animation
│   │   ├── room/         # R2 My Room (shop/collection)
│   │   ├── rest/         # U1 Rest suggestion
│   │   └── (parent)/     # P1-P5 Parent screens
│   ├── components/       # Reusable components
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Business logic (pure functions)
│   │   ├── staircase/    # Adaptive difficulty engine
│   │   ├── nci/          # NCI scoring engine
│   │   ├── games/        # Game content generation
│   │   ├── session/      # Session state management
│   │   ├── reward/       # Star calculation + shop
│   │   └── offline/      # Offline queue
│   └── types/            # TypeScript type definitions
├── supabase/
│   ├── config.toml       # Supabase local config
│   └── migrations/       # SQL migrations (12 tables)
└── public/               # Static assets + PWA
```

## Vercel Deploy

```bash
# Vercel CLI
npx vercel

# 環境変数を Vercel Dashboard で設定:
# NEXT_PUBLIC_SUPABASE_URL
# NEXT_PUBLIC_SUPABASE_ANON_KEY
```
