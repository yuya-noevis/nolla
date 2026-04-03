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
