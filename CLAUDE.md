# Nolla — CLAUDE.md

## プロジェクト概要

認知機能に課題のある子ども（3〜18歳）向けの発達支援テクノロジー事業。ASD・ADHD・LD・知的障害・ダウン症・グレーゾーン・境界知能が対象。グローバル約4億人、国内約300万人の市場。

**コアミッション**: 週166時間の「支援の空白」を埋める、スケーラブルで効果的な家庭内介入手段をテクノロジーで実現する。

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

### アウトプットのルール
- 新しい生成物は `outputs/` に配置する
- ファイル名は `nolla_` プレフィックス + 内容を表す英語名（スネークケース）
- 既存ファイルの更新時は上書きではなく、バージョン付き新規ファイルを検討する

### 品質基準
- シンプル第一：変更は最小限にとどめる
- 根本原因を見つける：一時的な修正は避ける
- エレガントさを追求しつつ過剰設計しない

## コード品質（開発開始後に適用）

### Critical Rules
- ファイルサイズ: 200-400行標準、800行絶対上限
- 関数サイズ: 50行以内
- ネスト深度: 4レベル以内
- console.log はプロダクションコードに残さない
- コード・コメントに絵文字を使わない

### イミュータブル原則
WRONG: obj.field = value / arr.push(item)
CORRECT: { ...obj, field: value } / [...arr, item]

### エラーハンドリング
- 全レベルで明示的にエラーを処理する
- UIはユーザーフレンドリーなメッセージ、サーバーは詳細ログ
- 空のcatch絶対禁止
- 外部データを絶対に信頼しない

### セキュリティ
- シークレット・APIキーをソースコードにハードコードしない
- 環境変数は .env.local に保存
- SQLクエリは必ずパラメータ化
- ユーザー入力は必ずサニタイズ

## テスト戦略
- TDD必須: コードより先にテストを書く（RED → GREEN → REFACTOR）
- カバレッジ80%以上を常に維持

## Git ワークフロー
Conventional Commits: feat:, fix:, refactor:, docs:, test:, chore:, perf:
main への直接pushは禁止、必ずPR経由

## APIレスポンス統一形式
type ApiResponse<T> = { success: true; data: T } | { success: false; error: string; code?: string }

## コミュニケーション

- ユーザー（Yuya）は非エンジニア。技術用語は避け、平易な日本語で説明する
- 日本語で応答する（ファイル名・コード・コマンドは英語可）
- 回答は簡潔に。冗長な説明より結論と根拠を先に出す

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
