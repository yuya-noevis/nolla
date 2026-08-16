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
6. **red-team-reviewer エージェントを起動する**（チェックリスト型レビューが見落とした穴を、攻撃者・カオスエンジニア視点で探す）
7. 両エージェントの findings をマージして最終レポートを出す
8. **CRITICAL/HIGH の findings が0件、または全て修正済みの場合のみ**、以下を実行してコミットブロックを解除する：
   ```bash
   rm -f .claude/.pending-review
   ```
   findingsが残っている場合はフラグを削除しない（ブロックを維持してユーザーに修正を促す）。

## 使用タイミング
コミット前に必ず実行する。コードを書いたあとレビュー未実行で `git commit` するとhookが自動的にブロックする（settings.json の PreToolUse hook）。
