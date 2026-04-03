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
