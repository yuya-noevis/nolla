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
