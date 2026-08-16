# Nolla — CLAUDE.md

## プロジェクト概要

ニューロダイバージェントキッズ（知的・発達に課題のある子ども、3〜18歳）向けのインタラクティブエンタメプラットフォーム事業。ASD・ADHD・LD・知的障害・ダウン症・グレーゾーン・境界知能が対象。グローバル約4億人、国内約300万人の市場。

**コアミッション**: 家庭という最大の生活時間に届く、スケーラブルで効果的な成長伴走をテクノロジーで実現する。

**フェーズ**: プレMVP。課題・ビジネスモデルは確定済み。ソリューション・プロダクト仕様は検討中（インタビュー結果を踏まえて具体化予定）。

## ビジネスモデル

- **ToC（家庭）**: 発達支援ツール。保護者向け「困りごとが減る、できることが増える」
- **ToB（施設・学校）**: 支援の質の底上げ・属人性排除。学校は自治体経由（ToG）
- **ToB（研究機関）**: 将来拡張。匿名化データAPI、製薬・研究機関との共同研究

## 想定技術スタック（ソリューション確定後に正式決定）

Stack: TypeScript, Next.js 15 (App Router), Supabase, Tailwind CSS, Playwright

## フォルダ構成

```
nolla/
├── CLAUDE.md          # 本ファイル
├── .claude/           # Claude Code設定
│   ├── agents/        # 専門エージェント定義
│   ├── commands/      # カスタムコマンド
│   ├── rules/common/  # コーディング・セキュリティルール
│   ├── skills/        # スキル定義
│   └── memory/        # セッション間の記憶
├── docs/              # 作業メモ・ナレッジ
│   └── memo.md        # Cursor/Claude Codeの操作メモ
├── teams/             # チーム定義
│   ├── executive/     # 経営チーム（CEO + AI経営メンバー）
│   │   ├── README.md
│   │   ├── shared/    # 行動原則・週次レビューテンプレート
│   │   ├── coo/       # 最高執行責任者
│   │   ├── cpo/       # 最高プロダクト責任者（開発チームへの橋渡し）
│   │   ├── cmo/       # 最高マーケティング責任者
│   │   └── clinical_advisor/  # 臨床アドバイザー
│   └── content_production/    # 動画制作チーム
│       ├── README.md
│       ├── shared/    # ワークフロー・品質チェック・用語集・RACI
│       ├── 01_producer/ 〜 06_video_producer/
└── outputs/           # 生成物（リサーチ・資料・ピッチデック）
```

## ワークフロー

### 基本方針
- **Planモードを基本とする**: 3ステップ以上 or アーキテクチャに関わるタスクはPlanモードで開始
- **サブエージェント活用**: リサーチ・調査・並列分析はサブエージェントに任せ、メインコンテキストをクリーンに保つ
- **完了前に必ず検証**: 動作・品質を確認するまでタスクを完了としない
- **worktree使用禁止（CRITICAL）**: サブエージェント起動時に `isolation: "worktree"` を指定するな。Nollaはソロ開発で並列worktreeのメリットがなく、過去に未コミット作業がworktreeに孤立して `nolla_brand_concept_v1.md`（正典ファイル）が main から消失する事故が発生した。必ずメインディレクトリで実行すること。並列実行が必要な場合も同一ディレクトリで複数Agent起動で対応する。

### アウトプットのルール
- 新しい生成物は `outputs/` に配置する
- ファイル名は `nolla_` プレフィックス + 内容を表す英語名（スネークケース）
- 既存ファイルの更新時は上書きではなく、バージョン付き新規ファイルを検討する

### 品質基準
- シンプル第一：変更は最小限にとどめる
- 根本原因を見つける：一時的な修正は避ける
- エレガントさを追求しつつ過剰設計しない

## コード品質・テスト・Git・パターン（reference, do not embed）

詳細は `.claude/rules/common/` 配下の各ファイルを参照（プロジェクト指示として自動ロード済み）:

- **コード品質・イミュータブル原則・ファイル組織** → `.claude/rules/common/coding-style.md`
- **セキュリティ（シークレット・SQLi・XSS）** → `.claude/rules/common/security.md`
- **テスト戦略・TDDサイクル・カバレッジ80%** → `.claude/rules/common/testing.md`
- **Gitワークフロー・Conventional Commits・PR運用** → `.claude/rules/common/git-workflow.md`
- **APIレスポンス形式・Repository・エラーハンドリング** → `.claude/rules/common/patterns.md`
- **実行前チェック・開発QAサイクル・実機検証** → `.claude/rules/common/before-execution.md`
- **Nolla MVP固有のUI/UX設計境界** → `.claude/rules/common/nolla-mvp-design.md`
- **進捗管理（ロードマップ運用）** → `.claude/rules/common/progress-tracking.md`
- **エージェント運用** → `.claude/rules/common/agents.md`
- **パフォーマンス（モデル選択・コンテキスト管理）** → `.claude/rules/common/performance.md`

## コミュニケーション

- ユーザー（Yuya）は非エンジニア。技術用語は避け、平易な日本語で説明する
- 日本語で応答する（ファイル名・コード・コマンドは英語可）
- 回答は簡潔に。冗長な説明より結論と根拠を先に出す

## 設計ドキュメント参照ルール（厳守）

設計ドキュメントは `outputs/INDEX.md` で一元管理。以下のルールに従うこと。

### MVP開発着手前の必読4ファイル（Phase 0）
1. `outputs/nolla_mvp_design_spec_v3.md` — MVP全体仕様
2. `outputs/nolla_ia_design_v3.md` — 21画面情報設計
3. `outputs/nolla_game_mechanics_design.md` — ゲームメカニクス・テスト結果
4. `outputs/nolla_nci_algorithm_design.md` — スコアリング・適応型難度

この4ファイルを読まずに実装を始めるな。

### 理論背景が必要な場合の参照先
- **UI/UX設計境界・運用目安** → `.claude/rules/common/nolla-mvp-design.md`
- **色・ビジュアル(単一の正)** → `outputs/nolla_color_regulation.md`
- **ゲーム選定の科学的根拠** → `outputs/nolla_visuospatial_cognition_research.md`
- **報酬メカニクス** → `outputs/nolla_reward_design_research.md`

### ビジュアル実装時
- **色選択** → `nolla_color_regulation.md`
- **キャラクター設計** → `nolla_design_direction.md` + `nolla_character_design_prompts.md`
- **背景デザイン** → `nolla_stage_bg_composition_rules.md` + `nolla_mario_galaxy_style_analysis.md`

### バージョニングルール
- **v3 = CURRENT**（使用）
- **v1, v2 = DEPRECATED**（`outputs/_archive/` に移動済み）
- 複数版がある場合は最新版のみを使用

### ファイル整理状況
- **ACTIVE**: `outputs/` 直下
- **DEPRECATED**: `outputs/_archive/` に移動済み
- **参照ガイド**: `outputs/INDEX.md` で全体像を把握できる

### ファイル更新時の自動運用ルール（厳守 / 同種ミス防止）

設計書・レポート類を作成・更新する時、Claudeは以下を**必ず実行**する。これを怠ると古いファイルを参照する事故が再発する。

1. **新しいバージョン(v2/v3等)を作成したら、旧版を即 `outputs/_archive/` へ移動**(`mv` or `git mv`)。元の場所に残さない
2. **同じ目的の既存ファイルを置き換える場合**、旧ファイルを即 `_archive/` へ移動。残してはいけない
3. **新規ACTIVEファイルを作成したら**、即 `outputs/INDEX.md` の該当カテゴリに1行追加
4. **日付付きレポート**(`*_review_YYYY-MM-DD.md` 等)は専用カテゴリ「単発レポート」に登録。同種の旧レポートが既存にあれば即 `_archive/` 移動
5. **一回限りの実行記録**(`COMPLETION_REPORT_*.md` `*_summary_*.md` 等の transient な記録)は最初から `outputs/_archive/reports/` に置く。`outputs/` 直下には絶対に置かない
6. **タスク完了時に必ず**: `outputs/` 直下のファイル数と `INDEX.md` の登録数が一致するか確認
7. **archive後はINDEX.mdからも該当行を削除**

これは省略不可のチェックリスト。タスク中で「設計書を更新した/新規作成した」と言ったら、その場でこのルールを実行すること。

この構造により、ドキュメント混乱による参照エラー・バージョン重複使用を防ぐ。

## このプロジェクトでよく行うタスク

1. **市場リサーチ・競合分析** — Web検索 → `outputs/` にまとめ
2. **ピッチデック・投資家向け資料の作成・更新** — Marp CLIでスライド生成可能
3. **事業戦略・ソリューション設計の壁打ち** — Planモードで構造化
4. **ドキュメント翻訳・ローカライズ** — 日英両方対応
5. **動画コンテンツ制作** — `teams/content_production/` のエージェント定義に従い制作
6. **経営会議・戦略策定** — `teams/executive/` のロール定義を使用
7. **プロダクト開発** — 下記コマンドを使用したTDD・品質管理ワークフロー

## 利用可能なコマンド

```bash
# 開発ワークフロー
/plan "機能名"  — 実装計画（新機能着手前に必ず実行）
/tdd            — TDDワークフロー（実装開始時に必ず実行）
/code-review    — コード品質・セキュリティレビュー
/verify         — PR前の6段階品質ゲート
/build-fix      — ビルドエラー修正
/security-scan  — セキュリティ脆弱性スキャン
/learn          — セッションからパターン抽出
/checkpoint     — 検証状態の保存

# スライド生成（Marp）
npx @marp-team/marp-cli outputs/nolla_pitch_deck.md -o outputs/nolla_pitch_deck.pdf
npx @marp-team/marp-cli outputs/nolla_pitch_deck.md -o outputs/nolla_pitch_deck.html

# Claude Code起動
claude --dangerously-skip-permissions
claude --dangerously-skip-permissions --channels plugin:telegram@claude-plugins-official
```
