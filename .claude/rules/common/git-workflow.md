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
