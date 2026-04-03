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
