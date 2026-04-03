# Performance Optimization

## モデル選択戦略
- Haiku   — 軽量エージェント・頻繁な呼び出し（コスト3分の1）
- Sonnet  — メイン開発作業（デフォルト）
- Opus    — 複雑なアーキテクチャ判断・深い推論が必要な時のみ

## 推奨 settings.json 設定
{
  "model": "sonnet",
  "env": {
    "MAX_THINKING_TOKENS": "10000",
    "CLAUDE_AUTOCOMPACT_PCT_OVERRIDE": "50",
    "CLAUDE_CODE_SUBAGENT_MODEL": "haiku"
  }
}

## コンテキストウィンドウ管理
コンテキストの最後の20%では以下を避ける:
- 大規模リファクタリング
- 複数ファイルにまたがる機能実装

コンテキスト感度が低いタスク（安全）:
- 単一ファイルの編集
- ドキュメントの更新
- 単純なバグ修正
