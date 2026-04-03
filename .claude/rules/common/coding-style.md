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
