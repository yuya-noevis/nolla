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
