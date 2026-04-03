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
