# NOLLA開発環境 自動セットアップ指示書

このファイルを読んだClaude Codeは、以下の全ステップを**順番に・自律的に**実行してください。

---

## STEP 1: ディレクトリ構造の作成

以下のコマンドを実行してください:

```bash
mkdir -p .claude/agents
mkdir -p .claude/commands
mkdir -p .claude/rules/common
mkdir -p .claude/skills/tdd-workflow
mkdir -p .claude/skills/verification-loop
mkdir -p .claude/skills/strategic-compact
mkdir -p .claude/skills/search-first
mkdir -p .claude/skills/security-review
mkdir -p .claude/memory
```

---

## STEP 2: CLAUDE.md の作成

ファイル `CLAUDE.md` をプロジェクトルートに以下の内容で作成してください:

```markdown
# Nolla Project Configuration

## Project Overview
Stack: TypeScript, Next.js 15 (App Router), Supabase, Tailwind CSS, Playwright

## Critical Rules

### コード品質
- ファイルサイズ: 200-400行標準、800行絶対上限
- 関数サイズ: 50行以内
- ネスト深度: 4レベル以内
- console.log はプロダクションコードに残さない
- コード・コメントに絵文字を使わない

### イミュータブル原則（CRITICAL）
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

## 利用可能なコマンド
- /plan "機能名"  — 実装計画（新機能着手前に必ず実行）
- /tdd            — TDDワークフロー（実装開始時に必ず実行）
- /code-review    — コード品質・セキュリティレビュー
- /verify         — PR前の6段階品質ゲート
- /build-fix      — ビルドエラー修正
- /security-scan  — セキュリティ脆弱性スキャン
- /learn          — セッションからパターン抽出
- /checkpoint     — 検証状態の保存
```

---

## STEP 3: Rules の作成

### ファイル: `.claude/rules/common/coding-style.md`

```markdown
# Coding Style Rules

## イミュータブル原則（CRITICAL）
ALWAYS create new objects/arrays, NEVER mutate existing ones.

WRONG:
  obj.field = value
  arr.push(item)

CORRECT:
  const newObj = { ...obj, field: value }
  const newArr = [...arr, item]

## ファイル組織
- 多数の小ファイル > 少数の大ファイル
- 標準: 200-400行、絶対上限: 800行
- 機能/ドメインで整理する（型ではなく）

## エラーハンドリング
- 全レベルでエラーを明示的に処理する
- UIコードではユーザーフレンドリーなメッセージ
- サーバーサイドでは詳細なエラーコンテキストをログに記録
- 空のcatchブロック禁止

## コード品質チェックリスト（作業完了前）
- コードが読みやすく、適切に命名されている
- 関数が50行未満
- ファイルが800行未満
- ネストが4レベル以下
- 適切なエラーハンドリング
- ハードコードされた値がない
- ミューテーションなし
```

### ファイル: `.claude/rules/common/testing.md`

```markdown
# Testing Requirements

## 最低テストカバレッジ: 80%

## テストタイプ（全て必須）
- Unit Tests     — 個別の関数、ユーティリティ
- Integration    — APIエンドポイント、データベース操作
- E2E Tests      — クリティカルなユーザーフロー（Playwright）

## TDD 必須ワークフロー
1. テストを先に書く（RED）
2. テストを実行 — 失敗することを確認
3. 最小限の実装を書く（GREEN）
4. テストを実行 — passすることを確認
5. リファクタリング（IMPROVE）
6. カバレッジを確認（80%+）
```

### ファイル: `.claude/rules/common/security.md`

```markdown
# Security Guidelines

## コミット前の必須チェック
- ハードコードされたシークレットなし
- 全ユーザー入力をバリデート済み
- SQLインジェクション防止（パラメータ化クエリ）
- XSS防止（HTMLのサニタイズ）
- 認証/認可を確認済み
- エラーメッセージが機密データを漏洩しない

## シークレット管理
- ソースコードにシークレットを絶対にハードコードしない
- 常に環境変数またはシークレットマネージャーを使用する
- 漏洩した可能性のあるシークレットをローテーションする

## セキュリティ問題発見時のプロトコル
1. 即座に停止する
2. security-reviewer エージェントを使用する
3. CRITICALな問題を修正する
4. 漏洩したシークレットをローテーションする
```

### ファイル: `.claude/rules/common/agents.md`

```markdown
# Agent Orchestration

## 利用可能なエージェント

| エージェント | 目的 | 使用タイミング |
|---|---|---|
| planner | 実装計画 | 複雑な機能、リファクタリング |
| tdd-guide | テスト駆動開発 | 新機能、バグ修正 |
| code-reviewer | コードレビュー | コードを書いた後 |
| security-reviewer | セキュリティ分析 | コミット前 |
| build-error-resolver | ビルドエラー修正 | ビルド失敗時 |

## 即座のエージェント使用
- 複雑な機能リクエスト → planner を使用
- コードを書いた/変更した → code-reviewer を使用
- 新機能・バグ修正 → tdd-guide を使用

## 並列タスク実行
独立した操作には常に並列タスク実行を使用する。
GOOD: 複数エージェントを同時起動
BAD: 不必要なシーケンシャル実行
```

### ファイル: `.claude/rules/common/performance.md`

```markdown
# Performance Optimization

## モデル選択戦略
- Haiku   — 軽量エージェント・頻繁な呼び出し（コスト3分の1）
- Sonnet  — メイン開発作業（デフォルト）
- Opus    — 複雑なアーキテクチャ判断・深い推論が必要な時のみ

## 推奨 settings.json 設定
{
  "model": "sonnet",
  "env": {
    "MAX_THINKING_TOKENS": "10000",
    "CLAUDE_AUTOCOMPACT_PCT_OVERRIDE": "50",
    "CLAUDE_CODE_SUBAGENT_MODEL": "haiku"
  }
}

## コンテキストウィンドウ管理
コンテキストの最後の20%では以下を避ける:
- 大規模リファクタリング
- 複数ファイルにまたがる機能実装

コンテキスト感度が低いタスク（安全）:
- 単一ファイルの編集
- ドキュメントの更新
- 単純なバグ修正
```

### ファイル: `.claude/rules/common/hooks.md`

```markdown
# Hooks System

## フックタイプ
- PreToolUse:    ツール実行前（バリデーション、ブロック）
- PostToolUse:   ツール実行後（自動フォーマット、チェック）
- Stop:          セッション終了時（最終検証）
- SessionStart:  セッション開始時（コンテキストロード）

## TodoWrite ベストプラクティス
TodoWriteツールを使用して:
- マルチステップタスクの進捗を追跡する
- 指示の理解を確認する
- リアルタイムのステアリングを可能にする
- 詳細な実装ステップを表示する
```

### ファイル: `.claude/rules/common/git-workflow.md`

```markdown
# Git Workflow

## コミットメッセージ形式
<type>: <description>
タイプ: feat, fix, refactor, docs, test, chore, perf, ci

## プルリクエストワークフロー
1. git diff [base-branch]...HEAD で全変更を確認する
2. 包括的なPRサマリーを作成する
3. TODOを含むテスト計画を記載する

## 開発プロセス（Git操作前に必ず実行）
1. /plan — 実装計画
2. /tdd — テスト駆動開発
3. /code-review — コード品質レビュー
4. /verify — 品質ゲート確認
5. Git操作（commit、push、PR作成）
```

### ファイル: `.claude/rules/common/patterns.md`

```markdown
# Common Patterns

## Repository パターン
一貫したインターフェースの背後にデータアクセスをカプセル化する:
- 標準操作: findAll, findById, create, update, delete
- ビジネスロジックは抽象インターフェースに依存する

## APIレスポンス形式
type ApiResponse<T> =
  | { success: true; data: T }
  | { success: false; error: string; code?: string }

## エラーハンドリングパターン
try {
  const result = await operation()
  return { success: true, data: result }
} catch (error) {
  logger.error('Operation failed', { error, context })
  return { success: false, error: 'User-friendly message' }
}

## Search-First 原則
新機能を実装する前に:
1. 既存のライブラリ・MCPで同等の機能がないか確認する
2. npm/PyPIで検索する
3. 既存ソリューションを採用 > ラップ > カスタム実装の順で判断する
```

---

## STEP 4: Agents の作成

### ファイル: `.claude/agents/planner.md`

```markdown
---
name: planner
description: Expert planning specialist for complex features and refactoring. Use PROACTIVELY when users request feature implementation, architectural changes, or complex refactoring.
tools: ["Read", "Grep", "Glob"]
model: opus
---

あなたは複雑な機能と実装計画の専門家です。

## 役割
- 要件を分析して詳細な実装計画を作成する
- 複雑な機能を管理可能なステップに分解する
- 依存関係と潜在的なリスクを特定する
- エッジケースとエラーシナリオを考慮する

## 計画フォーマット

# 実装計画: [機能名]

## 概要
[2-3文のサマリー]

## 要件
- [要件1]

## アーキテクチャ変更
- [変更1: ファイルパスと説明]

## 実装ステップ

### フェーズ1: [フェーズ名]
1. [ステップ名] (File: path/to/file.ts)
   - Action: 実行する具体的なアクション
   - Why: このステップの理由
   - Dependencies: なし / ステップXが必要
   - Risk: Low/Medium/High

## テスト戦略
- ユニットテスト: [テストするファイル]
- 統合テスト: [テストするフロー]
- E2Eテスト: [ユーザージャーニー]

## 成功基準
- [ ] 基準1

## ベストプラクティス
- 正確なファイルパス、関数名を使用する
- 各ステップを独立してdeliverableにする
- テスト戦略のない計画は不完全とみなす
- 変更を最小化する（書き直しより拡張を優先）
```

### ファイル: `.claude/agents/tdd-guide.md`

```markdown
---
name: tdd-guide
description: Test-Driven Development specialist. Use PROACTIVELY when writing new features, fixing bugs, or refactoring. Ensures 80%+ test coverage.
tools: ["Read", "Write", "Edit", "Bash", "Grep"]
model: sonnet
---

あなたはTDD専門家です。全てのコードがテストファーストで開発されることを保証します。

## TDD ワークフロー
1. テストを先に書く（RED）: npm test で失敗を確認
2. 最小限の実装を書く（GREEN）: npm test でpassを確認
3. リファクタリング（IMPROVE）: テストはグリーンを維持
4. カバレッジ確認: npm run test:coverage（80%+）

## 必須テストタイプ
- Unit: 個別の関数を単独でテスト（常に）
- Integration: APIエンドポイント、DB操作（常に）
- E2E: クリティカルなユーザーフロー・Playwright（クリティカルパス）

## 必須エッジケース
Null/Undefined入力、空の配列/文字列、無効な型、境界値、
エラーパス（ネットワーク失敗）、特殊文字（Unicode、SQL文字）

## Gitチェックポイント
- RED確認後: test: add reproducer for <feature>
- GREEN確認後: fix: <feature>
- リファクタリング後: refactor: clean up after <feature>

## テストアンチパターン（避けること）
- 実装の詳細をテストする（動作をテストする）
- 互いに依存するテスト（共有状態）
- 外部依存関係をモックしない
```

### ファイル: `.claude/agents/code-reviewer.md`

```markdown
---
name: code-reviewer
description: Expert code review specialist. Use immediately after writing or modifying code. MUST BE USED for all code changes.
tools: ["Read", "Grep", "Glob", "Bash"]
model: sonnet
---

あなたはシニアコードレビュアーです。

## レビュープロセス
1. git diff --staged と git diff で全変更を確認する
2. 変更されたファイルと関連する機能を特定する
3. 全ファイルを読み、インポート・依存関係を理解する
4. 以下のチェックリストを適用する（80%以上確信がある場合のみ報告）

## セキュリティ（CRITICAL）
- ハードコードされた認証情報（APIキー、パスワード、トークン）
- SQLインジェクション（文字列結合クエリ）
- XSS（エスケープされていないユーザー入力のHTML描画）
- 認証バイパス・CSRF脆弱性

## コード品質（HIGH）
- 大きな関数（>50行）→ 分割する
- 大きなファイル（>800行）→ モジュールを抽出する
- 深いネスト（>4レベル）→ 早期return・ヘルパーを使用する
- エラーハンドリングの欠如・ミューテーションパターン
- console.log文・テストの欠如・デッドコード

## React/Next.jsパターン（HIGH）
- 不完全なdeps配列のuseEffect
- Server ComponentでのuseState/useEffect使用
- リストのキーが欠如・不必要な再レンダー

## Node.js/バックエンド（HIGH）
- バリデートされていない入力・レート制限なし
- 上限のないクエリ・N+1クエリ・タイムアウトなし外部HTTPコール

## 出力フォーマット
[重要度] 問題タイトル
File: path/to/file.ts:行番号
Issue: 具体的な問題の説明
Fix: 修正方法

| 重要度 | 件数 | ステータス |
|--------|------|---------|
| CRITICAL | 0 | pass |
| HIGH | 0 | pass |

判定: APPROVED / WARNING / BLOCKED
```

### ファイル: `.claude/agents/security-reviewer.md`

```markdown
---
name: security-reviewer
description: Security vulnerability detection specialist. Use PROACTIVELY after writing code that handles user input, authentication, API endpoints, or sensitive data.
tools: ["Read", "Write", "Edit", "Bash", "Grep", "Glob"]
model: sonnet
---

あなたはWebアプリの脆弱性を特定・修正するセキュリティ専門家です。

## 分析コマンド
npm audit --audit-level=high
grep -rn "sk-|api_key|password|secret" --include="*.ts" src/

## OWASP Top 10チェック
1. Injection           — クエリはパラメータ化？入力はサニタイズ？
2. Broken Auth         — パスワードはbcrypt/argon2？JWTは検証済み？
3. Sensitive Data      — HTTPSは強制？シークレットは環境変数？
4. Broken Access       — 全ルートで認証チェック？CORSは適切？
5. Misconfiguration    — デバッグモードはprodでオフ？セキュリティヘッダー設定済み？
6. XSS                 — 出力はエスケープ済み？CSP設定済み？
7. Known Vulnerabilities — npm auditはクリーン？

## 即座にフラグを立てるパターン
| パターン | 重要度 | 修正 |
|---------|--------|------|
| ハードコードシークレット | CRITICAL | process.envを使用 |
| 文字列結合SQL | CRITICAL | パラメータ化クエリ |
| innerHTML=ユーザー入力 | HIGH | DOMPurify使用 |
| 認証チェックなしルート | CRITICAL | 認証ミドルウェア追加 |
| レート制限なし | HIGH | express-rate-limit追加 |
```

### ファイル: `.claude/agents/build-error-resolver.md`

```markdown
---
name: build-error-resolver
description: Build and TypeScript error resolution specialist. Use when build fails or type errors occur. Fixes errors with minimal diffs only, no architectural edits.
tools: ["Read", "Write", "Edit", "Bash", "Grep", "Glob"]
model: sonnet
---

あなたはビルドエラー解決の専門家です。最小限の変更でビルドをpassさせることが使命です。
リファクタリングなし、アーキテクチャ変更なし、改善なし。

## 診断コマンド
npx tsc --noEmit --pretty
npm run build

## ワークフロー
1. npx tsc --noEmit --pretty で全エラーを収集する
2. エラーを分類する（型推論、欠如した型、インポート、設定）
3. 各エラーに対して最小限の修正を適用する
4. ビルドがpassするまでイテレーションする

## よくある修正
暗黙的'any'型 → 型アノテーションを追加
'undefined'の可能性 → オプショナルチェーニング ?.
プロパティが存在しない → インターフェースに追加またはオプショナル ?
モジュールが見つからない → パッケージをインストール・tsconfig paths確認
awaitがasyncの外 → async キーワードを追加

## 禁止事項
- 無関係なコードのリファクタリング
- アーキテクチャ変更
- 新機能追加
- スタイルや命名の変更
```

---

## STEP 5: Skills の作成

### ファイル: `.claude/skills/tdd-workflow/SKILL.md`

```markdown
---
name: tdd-workflow
description: TDD方法論 — テストファーストで80%以上のカバレッジを確保する
origin: Nolla
---

# Test-Driven Development ワークフロー

## アクティベーションタイミング
- 新機能を書く時
- バグを修正する時
- 既存コードをリファクタリングする時
- APIエンドポイントを追加する時

## ワークフローステップ
Step 1: テストを先に書く（RED）
Step 2: npm test で失敗を確認
Step 3: 最小限の実装を書く（GREEN）
Step 4: npm test でpassを確認
Step 5: リファクタリング（IMPROVE）
Step 6: npm run test:coverage で80%+を確認

## テストファイル配置
src/
├── components/ComponentName/
│   ├── ComponentName.tsx
│   └── ComponentName.test.tsx    # ユニットテスト
├── app/api/endpoint/
│   ├── route.ts
│   └── route.test.ts             # 統合テスト
└── e2e/
    └── feature.spec.ts           # E2Eテスト（Playwright）

## カバレッジしきい値（package.jsonに設定）
jest.coverageThresholds.global: branches=80, functions=80, lines=80, statements=80
```

### ファイル: `.claude/skills/verification-loop/SKILL.md`

```markdown
---
name: verification-loop
description: PR前の6段階品質ゲート — Build/Type/Lint/Test/Security/Diff
origin: Nolla
---

# Verification Loop

## アクティベーションタイミング
- 機能または重要なコード変更を完了した後
- PRを作成する前

## 検証フェーズ

### Phase 1: ビルド確認
npm run build 2>&1 | tail -20
→ 失敗したら停止して修正する

### Phase 2: 型チェック
npx tsc --noEmit 2>&1 | head -30
→ 全ての型エラーを報告・修正する

### Phase 3: Lintチェック
npm run lint 2>&1 | head -30

### Phase 4: テストスイート
npm run test -- --coverage 2>&1 | tail -50
→ 目標: 80%以上のカバレッジ

### Phase 5: セキュリティスキャン
grep -rn "sk-" --include="*.ts" . 2>/dev/null | head -10
grep -rn "console.log" --include="*.ts" src/ 2>/dev/null | head -10

### Phase 6: Diffレビュー
git diff --stat
git diff HEAD~1 --name-only
→ 意図しない変更・エラーハンドリングの欠如・エッジケースを確認

## 検証レポート形式
VERIFICATION REPORT
===================
Build:    [PASS/FAIL]
Types:    [PASS/FAIL] (X errors)
Lint:     [PASS/FAIL] (X warnings)
Tests:    [PASS/FAIL] (X/Y passed, Z% coverage)
Security: [PASS/FAIL] (X issues)
Diff:     [X files changed]

Overall: [READY / NOT READY] for PR
```

### ファイル: `.claude/skills/strategic-compact/SKILL.md`

```markdown
---
name: strategic-compact
description: 長時間セッションで論理的な区切りでコンテキスト圧縮を提案する
origin: Nolla
---

# Strategic Compact

## アクティベーションタイミング
- 長いセッションでコンテキスト上限に近づいている時
- マルチフェーズタスクで区切りを迎えた時

## 圧縮すべきタイミング
- リサーチ/探索の後、実装前 → リサーチコンテキストを圧縮、実装計画は保持
- マイルストーン完了後、次フェーズ開始前
- デバッグ後、機能開発継続前
- 失敗したアプローチの後、新しいアプローチ試行前

## 圧縮してはいけないタイミング
- 実装の途中（変数名、ファイルパス、部分的な状態を失う）

## 圧縮前に保存すること
重要なコンテキストをファイルや .claude/memory/ に書き出してから /compact を実行する。
/compact Focus on implementing [次のタスク] next
```

### ファイル: `.claude/skills/search-first/SKILL.md`

```markdown
---
name: search-first
description: 実装前に既存ライブラリ・MCPを調査するワークフロー
origin: Nolla
---

# Search First — 実装前に必ず調査する

## アクティベーションタイミング
- 新機能の実装開始前
- 依存関係やインテグレーションを追加する前
- 新しいユーティリティ・ヘルパーを作成しようとする前

## ワークフロー
1. 必要な機能を定義する
2. 並列で調査する（npm/PyPI、MCPサーバー、GitHub、既存skills）
3. 候補を評価する（機能性・メンテナンス性・ライセンス・依存関係）
4. 判断する: 採用 → ラップ → カスタム実装の順で検討
5. 実装する

## 判断基準
- 完全一致・メンテナンス中・MIT/Apache → 採用（カスタムコードゼロ）
- 部分一致・良い基盤 → 薄いラッパーを書く
- 何もない → カスタム実装（ただしリサーチ結果に基づいて）

## アンチパターン
- 既存チェックなしでコードに飛びつく
- 1つの小機能に巨大パッケージをインストールする
- ライブラリを過度にラップして利点を失う
```

### ファイル: `.claude/skills/security-review/SKILL.md`

```markdown
---
name: security-review
description: コミット前のセキュリティチェックリスト
origin: Nolla
---

# Security Review Checklist

## コミット前に必ず確認

### シークレット検出
grep -rn "sk-\|api_key\|password\|secret\|token" --include="*.ts" src/
git diff --staged | grep -E "(sk-|ghp_|AKIA|password)"

### SQL インジェクション
クエリに文字列結合がないか確認する
全クエリがパラメータ化されていることを確認する

### 入力バリデーション
全APIエンドポイントの入力がZodでバリデートされているか確認する

### 認証・認可
全プロテクトルートで認証チェックがあるか確認する
RLSが有効になっているか確認する（Supabase使用時）

### セキュリティヘッダー
X-Frame-Options, X-Content-Type-Options, CSP が設定されているか確認する

## 合格基準
- シークレットが検出されない
- 全HIGHレベルの問題が解決されている
- 依存関係が最新
- セキュリティチェックリストが完了
```

---

## STEP 6: Commands の作成

### ファイル: `.claude/commands/plan.md`

```markdown
# /plan — 実装計画の策定

新機能や変更の詳細な実装計画を作成する。

## 使い方
/plan "機能名や変更の説明"

## 実行内容
1. planner エージェントを起動する
2. 要件を分析する
3. 影響するコンポーネントを特定する
4. フェーズ分けされた実装ステップを作成する
5. テスト戦略と成功基準を定義する

## 使用タイミング
新機能を実装する前に必ず実行する
```

### ファイル: `.claude/commands/tdd.md`

```markdown
# /tdd — Test-Driven Development

TDDワークフローを開始する。テストを先に書くことを強制する。

## 使い方
/tdd

## 実行内容
1. tdd-guide エージェントを起動する
2. ユーザージャーニーを定義する
3. テストケースを作成する（RED）
4. テストが失敗することを確認する
5. 最小限の実装を行う（GREEN）
6. リファクタリングする（IMPROVE）
7. カバレッジが80%以上であることを確認する

## 使用タイミング
全ての新機能実装・バグ修正時に必ず実行する
```

### ファイル: `.claude/commands/code-review.md`

```markdown
# /code-review — コード品質・セキュリティレビュー

現在の変更を包括的にレビューする。

## 使い方
/code-review

## 実行内容
1. code-reviewer エージェントを起動する
2. git diff --staged で変更を確認する
3. セキュリティ問題を検出する（CRITICAL）
4. コード品質を評価する（HIGH/MEDIUM/LOW）
5. 改善提案を提示する

## 使用タイミング
コミット前に必ず実行する
```

### ファイル: `.claude/commands/verify.md`

```markdown
# /verify — PR前の6段階品質ゲート

PRを作成する前に全品質チェックを実行する。

## 使い方
/verify

## 実行内容（順番に実行）
1. Build:    npm run build
2. Types:    npx tsc --noEmit
3. Lint:     npm run lint
4. Tests:    npm run test -- --coverage
5. Security: シークレット・console.logのスキャン
6. Diff:     git diff --stat でレビュー

## 出力
VERIFICATION REPORT（PASS/FAIL付き）
全フェーズがPASSした場合のみPR作成を推奨する

## 使用タイミング
PR作成前に必ず実行する
```

### ファイル: `.claude/commands/build-fix.md`

```markdown
# /build-fix — ビルドエラー修正

ビルドエラーや型エラーを最小限の変更で修正する。

## 使い方
/build-fix

## 実行内容
1. build-error-resolver エージェントを起動する
2. npx tsc --noEmit --pretty で全エラーを収集する
3. エラーを分類・優先順位付けする
4. 最小限の修正を適用する
5. ビルドがpassすることを確認する

## 使用タイミング
ビルドが失敗した時、型エラーが発生した時
```

### ファイル: `.claude/commands/security-scan.md`

```markdown
# /security-scan — セキュリティ脆弱性スキャン

OWASP Top 10ベースのセキュリティ監査を実行する。

## 使い方
/security-scan

## 実行内容
1. security-reviewer エージェントを起動する
2. npm audit --audit-level=high を実行する
3. ハードコードされたシークレットをスキャンする
4. OWASP Top 10に基づいてコードをレビューする
5. 脆弱性レポートを生成する

## 使用タイミング
リリース前・認証コード変更後・依存関係更新後
```

### ファイル: `.claude/commands/learn.md`

```markdown
# /learn — セッションからパターン抽出

現在のセッションから再利用可能なパターンを抽出して保存する。

## 使い方
/learn

## 実行内容
1. 現在のセッションを分析する
2. 繰り返しのパターン・修正・ワークフローを特定する
3. .claude/memory/ にパターンを保存する
4. 将来のセッションで使用できるinstinctとして記録する

## 使用タイミング
長いセッションの途中・セッション終了前
```

### ファイル: `.claude/commands/checkpoint.md`

```markdown
# /checkpoint — 検証状態の保存

現在の検証状態をファイルに保存する。

## 使い方
/checkpoint

## 実行内容
1. 現在の実装状態を記録する
2. テスト結果を保存する
3. 未解決の問題をリストアップする
4. .claude/memory/checkpoint-[timestamp].md に保存する

## 使用タイミング
大きな変更を完了した後・長いセッションの節目
```

---

## STEP 7: ~/.claude/settings.json の更新

以下の設定を `~/.claude/settings.json` に追記してください（既存の設定とマージする）:

```json
{
  "model": "sonnet",
  "env": {
    "MAX_THINKING_TOKENS": "10000",
    "CLAUDE_AUTOCOMPACT_PCT_OVERRIDE": "50",
    "CLAUDE_CODE_SUBAGENT_MODEL": "haiku"
  },
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [{
          "type": "command",
          "command": "node -e \"let d='';process.stdin.on('data',c=>d+=c);process.stdin.on('end',()=>{const i=JSON.parse(d);const cmd=i.tool_input?.command||'';const devPatterns=['npm run dev','yarn dev','pnpm dev','bun dev','next dev'];if(devPatterns.some(p=>cmd.includes(p))&&!process.env.TMUX&&!process.env.ZELLIJ){console.error('[Hook] WARNING: Dev server should run in tmux to preserve logs. Run: tmux new-session -d -s dev \\\"'+cmd+'\\\"');} console.log(d)})\""
        }],
        "description": "Dev server outside tmux warning"
      },
      {
        "matcher": "Bash",
        "hooks": [{
          "type": "command",
          "command": "node -e \"let d='';process.stdin.on('data',c=>d+=c);process.stdin.on('end',()=>{const i=JSON.parse(d);const cmd=i.tool_input?.command||'';if(cmd.includes('git commit')){const secretPatterns=['sk-','ghp_','AKIA','api_key','password='];const{execSync}=require('child_process');try{const diff=execSync('git diff --staged',{encoding:'utf8'});const found=secretPatterns.filter(p=>diff.includes(p));if(found.length>0){console.error('[Hook] BLOCKED: Possible secret detected in staged changes: '+found.join(', '));console.error('[Hook] Review and remove before committing');process.exit(2);}}catch(e){}}console.log(d)})\""
        }],
        "description": "Block commits with possible secrets"
      }
    ],
    "PostToolUse": [
      {
        "matcher": "Edit",
        "hooks": [{
          "type": "command",
          "command": "node -e \"let d='';process.stdin.on('data',c=>d+=c);process.stdin.on('end',()=>{const i=JSON.parse(d);const p=i.tool_input?.file_path||'';if(/\\.(ts|tsx)$/.test(p)){const{execFileSync}=require('child_process');try{const out=execFileSync('npx',['tsc','--noEmit','--pretty'],{encoding:'utf8',stdio:'pipe'});if(out){console.error('[Hook] TypeScript: '+out.split('\\n').slice(0,5).join('\\n'));}}catch(e){if(e.stdout){console.error('[Hook] TS Errors:\\n'+e.stdout.split('\\n').slice(0,10).join('\\n'));}}} console.log(d)})\""
        }],
        "description": "TypeScript check after .ts/.tsx edits"
      },
      {
        "matcher": "Edit",
        "hooks": [{
          "type": "command",
          "command": "node -e \"let d='';process.stdin.on('data',c=>d+=c);process.stdin.on('end',()=>{const i=JSON.parse(d);const p=i.tool_input?.file_path||'';const ns=i.tool_input?.new_string||'';if(/\\.(ts|tsx|js|jsx)$/.test(p)&&/console\\.log/.test(ns)){console.error('[Hook] WARNING: console.log found in '+p+'. Remove before committing.');}console.log(d)})\""
        }],
        "description": "Warn about console.log in edited files"
      }
    ],
    "Stop": [
      {
        "hooks": [{
          "type": "command",
          "command": "node -e \"const{execSync}=require('child_process');try{const files=execSync('git diff --name-only HEAD 2>/dev/null',{encoding:'utf8'}).trim().split('\\n').filter(f=>/\\.(ts|tsx|js|jsx)$/.test(f));let found=[];files.forEach(f=>{try{const c=require('fs').readFileSync(f,'utf8');const lines=c.split('\\n');lines.forEach((l,i)=>{if(/console\\.log/.test(l))found.push(f+':'+(i+1));});}catch(e){}});if(found.length>0){console.error('[Hook] console.log found in modified files:\\n'+found.slice(0,10).join('\\n'));}}catch(e){}\" "
        }],
        "description": "Console.log audit at session end"
      }
    ]
  }
}
```

---

## STEP 8: .env.example の作成

ファイル: `.env.example`（プロジェクトルート）

```bash
# このファイルは環境変数のテンプレートです
# 実際の値は .env.local に記載してください（.gitignoreに追加済みのこと）

# Supabase（使用する場合）
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# 外部API（使用する場合）
OPENAI_API_KEY=
ANTHROPIC_API_KEY=

# アプリケーション
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development
```

---

## STEP 9: .gitignore への追記

`.gitignore` に以下が含まれていることを確認し、なければ追記してください:

```
# 環境変数（シークレット）
.env
.env.local
.env.production
.env.*.local

# Claude Code（機密情報を含む可能性）
.claude/memory/
```

---

## STEP 10: セットアップ確認

全ファイルの作成が完了したら、以下を実行して確認してください:

```bash
# 作成されたファイルの確認
find .claude -type f | sort
echo "---"
ls -la CLAUDE.md .env.example 2>/dev/null
```

期待される出力:
```
.claude/agents/build-error-resolver.md
.claude/agents/code-reviewer.md
.claude/agents/planner.md
.claude/agents/security-reviewer.md
.claude/agents/tdd-guide.md
.claude/commands/build-fix.md
.claude/commands/checkpoint.md
.claude/commands/code-review.md
.claude/commands/learn.md
.claude/commands/plan.md
.claude/commands/security-scan.md
.claude/commands/tdd.md
.claude/commands/verify.md
.claude/rules/common/agents.md
.claude/rules/common/coding-style.md
.claude/rules/common/git-workflow.md
.claude/rules/common/hooks.md
.claude/rules/common/patterns.md
.claude/rules/common/performance.md
.claude/rules/common/security.md
.claude/rules/common/testing.md
.claude/skills/search-first/SKILL.md
.claude/skills/security-review/SKILL.md
.claude/skills/strategic-compact/SKILL.md
.claude/skills/tdd-workflow/SKILL.md
.claude/skills/verification-loop/SKILL.md
---
CLAUDE.md
.env.example
```

全ファイルが作成されていれば「Nolla開発環境のセットアップが完了しました」と報告してください。

---

## セットアップ完了後の使い方

```
新機能を実装する時:
  1. /plan "機能名"  → planner が詳細計画を作成
  2. /tdd            → tdd-guide がテストファーストを強制
  3. /code-review    → code-reviewer がコードをレビュー
  4. /verify         → 6段階品質ゲートを通過
  5. git commit & PR

ビルドが壊れた時:
  /build-fix → build-error-resolver が最小差分で修正

セキュリティチェック:
  /security-scan → security-reviewer がOWASP Top 10チェック

セッションのパターンを保存:
  /learn → セッションから再利用可能パターンを抽出
```
