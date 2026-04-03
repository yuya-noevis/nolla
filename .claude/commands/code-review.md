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
