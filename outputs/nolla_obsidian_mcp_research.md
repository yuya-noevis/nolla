# Obsidian MCP サーバー × Claude 連携リサーチ

**調査日**: 2026年3月23日

---

## 1. Obsidian MCPとは何か

**MCP（Model Context Protocol）** はAnthropicが提唱したオープンプロトコルで、AIモデルと外部ツール・データソースを接続する標準規格。Obsidian MCPは、このプロトコルを使ってClaude（やその他AI）がObsidianのVault（ノート保管庫）を直接読み書き・検索できるようにするサーバー。

### 主なGitHubリポジトリ（複数の実装が存在）

| リポジトリ | 特徴 | スター |
|---|---|---|
| [iansinnott/obsidian-claude-code-mcp](https://github.com/iansinnott/obsidian-claude-code-mcp) | **Claude Code特化**。Obsidianプラグイン形式。WebSocket + HTTP/SSE対応。自動検出機能あり | 194 |
| [MarkusPfundstein/mcp-obsidian](https://github.com/MarkusPfundstein/mcp-obsidian) | **多機能**。Python製。Local REST API経由。本文検索・ノート編集・削除が可能 | - |
| [smithery-ai/mcp-obsidian](https://github.com/smithery-ai/mcp-obsidian) | **導入が最も簡単**。JS製。コマンド1行でインストール。ただし検索はタイトルのみ | - |
| [cyanheads/obsidian-mcp-server](https://github.com/cyanheads/obsidian-mcp-server) | **包括的**。読み書き・検索・タグ・フロントマター管理。REST API経由 | - |
| [jacksteamdev/obsidian-mcp-tools](https://github.com/jacksteamdev/obsidian-mcp-tools) | **セマンティック検索**対応。Templaterテンプレート連携 | - |
| [heyitsnoah/claudesidian](https://github.com/heyitsnoah/claudesidian) | Claude特化のObsidian統合 | - |

**日本語の比較記事での結論**: MarkusPfundstein版が「本文検索・ノート編集も可能」で最も多機能と評価されている。

---

## 2. 何ができるのか（具体的な機能）

### 基本機能
- **ノート検索**: 自然言語で「先月の会議メモは？」のように質問するとVault内を検索
- **ノート読み込み**: 指定したノートの全文をClaudeに渡す
- **ノート作成・編集**: Claudeが新しいノートを作成したり、既存ノートを更新
- **タグ・フロントマター管理**: メタデータの読み書き
- **Vault構造の把握**: フォルダ構造やアクティブファイルをClaudeに提供

### 実用的なユースケース
- **プロジェクト固有の回答**: 汎用的なAI回答ではなく、過去のメモ・設計方針を踏まえた具体的な回答を得る
- **自動ノート生成**: テンプレートに基づいた構造化されたノートの自動作成
- **週次ダイジェスト生成**: 散在するメモから自動で週次まとめを作成
- **関連ノートの自動発見**: AIが意味を理解して関連するノートを結びつける
- **開発計画の自動生成**: 過去のメモを参照しながら実装計画を作成

---

## 3. Claude Code / Claude Desktopとの連携方法

### Claude Desktopの場合

**方法A: smithery-ai版（最も簡単）**
```bash
npx @smithery/cli install mcp-obsidian --client claude
```
インストーラーがVaultのパスを聞いてきて、自動で設定ファイルを更新する。

**方法B: MarkusPfundstein版（多機能）**
1. Obsidianに「Local REST API」コミュニティプラグインをインストール
2. Python 3.11以上を用意
3. Claude Desktopの設定ファイル（`claude_desktop_config.json`）にMCPサーバー情報を記述
4. Claude Desktopを再起動

**方法C: obsidian-mcp-tools（プラグイン形式）**
1. Obsidianに「Local REST API」と「MCP Tools」プラグインをインストール
2. MCP Toolsを有効化すると自動セットアップが開始
3. 「サーバーバイナリをインストールしますか？」「Claude Desktop設定を変更しますか？」に「はい」
4. Claude Desktopを再起動

### Claude Codeの場合

**iansinnott版が最適**（Claude Code向けに設計されている）
1. Obsidianにプラグインをインストール（コミュニティプラグインから）
2. プラグインを有効化するとMCPサーバーが起動（デフォルトポート: 22360）
3. Claude Codeの `/ide` コマンドでObsidian Vaultを選択 → 自動接続
4. WebSocketで通信するため、追加設定は基本不要

---

## 4. SNS運用・コンテンツ生成への活用

**直接的なSNS自動投稿機能はない**が、以下のワークフローで活用できる。

### 想定ワークフロー
1. **ネタ帳としてObsidianに蓄積**: 日々のアイデア、リサーチ結果、事例をObsidianに記録
2. **Claude + MCPでコンテンツ下書き生成**: 「過去のメモを参考に、Xの投稿案を5つ作って」のように依頼
3. **Vault内の知識を活用した文脈のある投稿**: 汎用的な内容ではなく、自分の知見・データに基づいた投稿を生成
4. **テンプレートで構造化**: SNS投稿テンプレートをObsidianに用意し、Claudeがテンプレートに沿って生成

### Nollaへの応用例
- 発達支援に関するリサーチメモをObsidianに蓄積
- 「今週の保護者向けSNS投稿案を作って」→ 過去のリサーチを参照して生成
- 投稿の反応データもObsidianに記録 → 次回の投稿改善に活用

**注意**: 実際のSNS投稿にはSNSのAPIやMCP（例: Twitter/X MCP）との組み合わせが別途必要。

---

## 5. 評判・レビュー

### 好意的な評価
- **DevelopersIO**: 「自然言語でVault内を検索でき、書きためたノートをもとに文脈を理解した回答が得られる」
- **i3DESIGN Tech Blog**: 「プロジェクト固有の最適解を即実装できる。散らばった情報が自動的に繋がり、知識ネットワークを構築」
- **Future技術ブログ**: 「記録のための日記から、対話で育てる日記へ」とジャーナリング活用を紹介
- **gihyo.jp**: 2025年にObsidianが注目される理由としてAI/MCP連携を挙げている

### 注意点・課題
- **セキュリティ**: 「MCPサーバーを使った悪用事例も見受けられる」（DevelopersIO）。信頼できるソースのMCPサーバーを使うこと
- **日本語の問題**: MarkusPfundstein版で日本語が文字参照になり正常表示されない場合がある
- **セットアップの難易度**: 非エンジニアにはやや敷居が高い（特にPython環境やコマンドライン操作）
- **Obsidianアプリの起動が必要**: REST API経由の実装はObsidianが起動していないと動かない（一部実装は直接ファイルアクセスで不要）

---

## 6. 料金・制約

### Obsidian MCP サーバー自体
- **全て無料・オープンソース**（MIT / 0BSDライセンスなど）
- GitHub上の各リポジトリから自由にインストール可能

### ただし必要なもの
| 必要なもの | 料金 |
|---|---|
| **Obsidian** | 個人利用は無料（商用利用は$50/年） |
| **Claude Desktop** | 無料プランあり。ただしMCP利用時は通信制限にすぐ達する。**Pro ($20/月) 推奨** |
| **Claude Code** | Claude Pro以上のサブスクリプションが必要 |
| **Node.js / Python** | 無料 |

### 制約
- MCPはClaude Desktopアプリまたはclaude codeが必要（ブラウザ版claude.aiでは使えない）
- サーバーはローカル実行のみ（リモートからはアクセスできない）
- Vault単位でアクセス制御（指定したVaultのみアクセス可能）

---

## 7. 他のナレッジベースMCPとの比較

| 項目 | Obsidian MCP | Notion MCP | Desktop Commander |
|---|---|---|---|
| **データ保存先** | ローカル（Markdownファイル） | クラウド | ローカル |
| **プライバシー** | 高い（データは自分のPCのみ） | Notion社のサーバー経由 | 高い |
| **チーム利用** | 難しい | 最適 | 難しい |
| **セットアップ** | やや複雑 | 比較的簡単（公式MCP） | 簡単 |
| **検索機能** | タグ検索、本文検索、セマンティック検索（実装による） | 全文検索、DB検索 | ファイル検索 |
| **編集機能** | あり（実装による） | あり | あり |
| **拡張性** | 45以上の実装が存在 | 公式1本 | 1本 |
| **料金** | 無料 | Notionのプランに依存 | 無料 |
| **向いている人** | ローカル志向の個人ユーザー | チーム・組織 | 汎用的なファイル操作 |

### 選択ガイド
- **個人で使う + プライバシー重視** → Obsidian MCP
- **チームで共有したい** → Notion MCP
- **両方使いたい** → 併用可能（MCPサーバーは複数同時接続可）

---

## まとめ・Yuyaへの提案

### Obsidian MCPを使うメリット（Nolla事業の観点）
1. **リサーチ・知見の蓄積と活用**: 発達支援の調査メモをObsidianに貯め、Claudeがそれを参照して質の高いアウトプットを生成
2. **SNSコンテンツの一貫性**: 過去の投稿やリサーチを元にした、ブレない発信ができる
3. **プライバシー**: データがローカルに残るので、事業上の機密情報も安心
4. **無料で始められる**: MCPサーバー自体は無料。Claude Proがあれば即利用可能

### 現時点での推奨
- すでにClaude Codeを使っているなら、**iansinnott/obsidian-claude-code-mcp**（プラグイン形式）が最も相性が良い
- 多機能が欲しい場合は**MarkusPfundstein/mcp-obsidian**も検討
- SNS自動投稿まで含めたフルオートメーションには、別途SNS系のMCP（X API等）との組み合わせが必要

---

## Sources

- [iansinnott/obsidian-claude-code-mcp (GitHub)](https://github.com/iansinnott/obsidian-claude-code-mcp)
- [MarkusPfundstein/mcp-obsidian (GitHub)](https://github.com/MarkusPfundstein/mcp-obsidian)
- [smithery-ai/mcp-obsidian (GitHub)](https://github.com/smithery-ai/mcp-obsidian)
- [cyanheads/obsidian-mcp-server (GitHub)](https://github.com/cyanheads/obsidian-mcp-server)
- [jacksteamdev/obsidian-mcp-tools (GitHub)](https://github.com/jacksteamdev/obsidian-mcp-tools)
- [Obsidian MCPサーバーをClaude Desktopで使ってみた (DevelopersIO)](https://dev.classmethod.jp/articles/obsidian-mcp-claude-desktop-integration-hands-on/)
- [Obsidian × Claude Code × MCPで変わる開発フロー (i3DESIGN Tech Blog)](https://tech.i3design.jp/obsidian-claudecode-1/)
- [AIでObsidianを便利に！3つの連携ツールMCPを徹底比較](https://kurutto115.hatenablog.com/entry/2025/obsidian-mcps)
- [Best MCP Servers for Knowledge Bases in 2026 (Desktop Commander Blog)](https://desktopcommander.app/blog/best-mcp-servers-for-knowledge-bases-in-2026/)
- [Obsidian × Claude Codeやさしいローカル接続ガイド (Zenn)](https://zenn.dev/kalubi/articles/b696138474c488)
- [ObsidianをClaudeとMCPで連携する方法 (Zenn)](https://zenn.dev/aki_think/articles/3ed30dec9d823f)
- [なぜObsidianが2025年になって注目されているのか (gihyo.jp)](https://gihyo.jp/article/2025/05/obsidian-05)
- [記録のための日記から、対話で育てる日記へ (Future技術ブログ)](https://future-architect.github.io/articles/20260317a/)
- [Obsidian + Claude Code: The Complete Integration Guide](https://blog.starmorph.com/blog/obsidian-claude-code-integration-guide)
