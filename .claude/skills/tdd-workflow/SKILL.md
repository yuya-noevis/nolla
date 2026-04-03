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
