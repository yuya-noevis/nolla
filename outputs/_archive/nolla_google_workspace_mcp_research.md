# Google Workspace MCP サーバー調査結果

調査日: 2026-03-26

---

## 結論（先に）

**最もおすすめ: Google公式 Workspace CLI（`@googleworkspace/cli`）**

理由:
- Google公式（最も安定・長期サポートが期待できる）
- npmパッケージで簡単インストール（`npm install -g @googleworkspace/cli`）
- MCP サーバーモード内蔵（`gws mcp` コマンド）
- Gmail, Sheets, Calendar 全て対応
- 対話型セットアップ（`gws auth setup`）で非エンジニアにも優しい
- Claude Code との相性が良い（JSON出力 + AI agent向け設計）

**次点: ngs/google-mcp-server**
- Homebrew一発インストール、Go製バイナリ、軽量
- Claude Code用の `claude mcp add` コマンド対応

**npmでnpx起動したい場合: @presto-ai/google-workspace-mcp**
- npxで即起動可能、設定が最もシンプル

---

## 候補一覧（5つ）

| # | 名前 | 種類 | 言語 | Gmail | Sheets | Calendar | npx対応 | おすすめ度 |
|---|------|------|------|-------|--------|----------|---------|-----------|
| 1 | @googleworkspace/cli | 公式CLI+MCP | Rust | Yes | Yes | Yes | npm -g | ★★★★★ |
| 2 | ngs/google-mcp-server | MCPサーバー | Go | Yes | Yes | Yes | No | ★★★★ |
| 3 | @presto-ai/google-workspace-mcp | MCPサーバー | Node.js | Yes | Yes | Yes | Yes | ★★★★ |
| 4 | taylorwilsdon/google_workspace_mcp | MCPサーバー | Python | Yes | Yes | Yes | No | ★★★ |
| 5 | @alanse/mcp-server-google-workspace | MCPサーバー | Node.js | Yes | Yes | Yes | Yes | ★★★ |

---

## 1. Google公式 Workspace CLI（最推奨）

- **GitHub**: https://github.com/googleworkspace/cli
- **npm**: https://www.npmjs.com/package/@googleworkspace/cli
- **特徴**: Google公式。MCP サーバーモード内蔵。40以上のAIエージェント用スキル付属

### セットアップ手順

#### Step 1: インストール
```bash
npm install -g @googleworkspace/cli
```
（Homebrew でも可: `brew install googleworkspace-cli`）

#### Step 2: Google Cloud プロジェクトの設定（対話型）
```bash
gws auth setup
```
このコマンドで以下が自動的に行われる:
- Google Cloud プロジェクトの作成
- 必要な API の有効化
- OAuth 認証情報の作成

#### Step 3: ログイン
```bash
gws auth login -s drive,gmail,sheets,calendar
```
ブラウザが開くので、Googleアカウントでログインして許可する。

> 注意: 未検証アプリはスコープ数に制限がある。`-s` で使いたいサービスだけ指定するのが安全。

#### Step 4: 動作確認
```bash
gws gmail +triage          # Gmail未読サマリー
gws calendar +agenda       # カレンダー予定表示
gws sheets spreadsheets values get --params '{"spreadsheetId": "ID", "range": "Sheet1!A1:C10"}'
```

#### Step 5: Claude Code でMCPサーバーとして使う
```bash
gws mcp
```
これでMCPサーバーモードが起動する。Claude Codeから使う場合:

```bash
claude mcp add google-workspace -- gws mcp
```

または `.claude.json` や `.mcp.json` に手動追加:
```json
{
  "mcpServers": {
    "google-workspace": {
      "command": "gws",
      "args": ["mcp"]
    }
  }
}
```

#### 環境変数（任意）
| 変数名 | 説明 |
|--------|------|
| `GOOGLE_WORKSPACE_CLI_TOKEN` | 事前取得したOAuth2トークン |
| `GOOGLE_WORKSPACE_CLI_CREDENTIALS_FILE` | OAuth認証情報JSONのパス |
| `GOOGLE_WORKSPACE_CLI_CLIENT_ID` | OAuthクライアントID |
| `GOOGLE_WORKSPACE_CLI_CLIENT_SECRET` | OAuthクライアントシークレット |
| `GOOGLE_WORKSPACE_CLI_CONFIG_DIR` | 設定ディレクトリ（デフォルト: `~/.config/gws`） |

#### 便利コマンド例
```bash
gws gmail +send --to user@example.com --subject "件名" --body "本文"
gws calendar +insert --summary "会議" --start "2026-03-27T10:00:00"
gws calendar +agenda --today
gws workflow +standup-report   # 今日の予定+タスクまとめ
```

---

## 2. ngs/google-mcp-server（次点）

- **GitHub**: https://github.com/ngs/google-mcp-server
- **特徴**: Go製バイナリ、Homebrew対応、軽量、マルチアカウント対応

### セットアップ手順

#### Step 1: インストール
```bash
brew tap ngs/tap
brew install google-mcp-server
```

#### Step 2: Google Cloud Console で OAuth 設定
1. https://console.cloud.google.com にアクセス
2. プロジェクトを作成（または既存を選択）
3. 「APIとサービス」→ 以下のAPIを有効化:
   - Google Calendar API
   - Google Drive API
   - Gmail API
   - Google Sheets API
   - Google Docs API
4. 「認証情報」→「認証情報を作成」→「OAuthクライアントID」
5. アプリの種類: 「デスクトップアプリ」を選択
6. クライアントIDとクライアントシークレットをメモ

#### Step 3: 認証情報の設定

環境変数で設定:
```bash
export GOOGLE_CLIENT_ID="あなたのクライアントID.apps.googleusercontent.com"
export GOOGLE_CLIENT_SECRET="あなたのクライアントシークレット"
```

または設定ファイル `~/.google-mcp-server/config.json`:
```json
{
  "oauth": {
    "client_id": "あなたのクライアントID.apps.googleusercontent.com",
    "client_secret": "あなたのクライアントシークレット",
    "redirect_uri": "http://localhost:8080/callback"
  },
  "services": {
    "calendar": {"enabled": true},
    "drive": {"enabled": true},
    "gmail": {"enabled": true},
    "sheets": {"enabled": true},
    "docs": {"enabled": true},
    "slides": {"enabled": true}
  }
}
```

#### Step 4: 初回認証
```bash
google-mcp-server
```
ブラウザが自動的に開くので、Googleアカウントで許可する。トークンは `~/.google-mcp-accounts/` に保存される。

#### Step 5: Claude Code に登録
```bash
# Apple Silicon Mac の場合
claude mcp add google /opt/homebrew/bin/google-mcp-server

# Intel Mac の場合
claude mcp add google /usr/local/bin/google-mcp-server
```

Claude Code を再起動すれば使える。

---

## 3. @presto-ai/google-workspace-mcp（npx派向け）

- **npm**: https://www.npmjs.com/package/@presto-ai/google-workspace-mcp
- **特徴**: npxで即起動可能、Node.js製、設定が最もシンプル

### セットアップ手順

#### Step 1: Claude Code に追加（これだけでOK）
```bash
claude mcp add google-workspace -- npx -y @presto-ai/google-workspace-mcp
```

または `.claude.json` に手動追加:
```json
{
  "mcpServers": {
    "google-workspace": {
      "command": "npx",
      "args": ["-y", "@presto-ai/google-workspace-mcp"]
    }
  }
}
```

#### Step 2: 初回起動時の認証
Claude Code を起動すると、ブラウザが開いてGoogleアカウントの認証を求められる。許可すれば完了。

#### 認証情報の保存先
- macOS: `~/.config/google-workspace-mcp/`

#### 認証リセット方法
```bash
rm -rf ~/.config/google-workspace-mcp
```
次回起動時に再認証を求められる。

#### 対応サービス
Gmail, Google Calendar, Drive, Docs, Sheets, Chat, Slides, People

---

## 4. taylorwilsdon/google_workspace_mcp

- **GitHub**: https://github.com/taylorwilsdon/google_workspace_mcp
- **PyPI**: `workspace-mcp`
- **公式サイト**: https://workspacemcp.com
- **特徴**: 最も機能が豊富（12サービス、100以上のツール）、Python製、OAuth 2.1対応

### セットアップ手順

#### Step 1: Google Cloud Console で OAuth 設定
1. https://console.cloud.google.com でプロジェクト作成
2. 必要なAPIを有効化（Gmail, Calendar, Drive, Sheets, Docs等）
3. 「認証情報」→「OAuthクライアントID」→「デスクトップアプリ」で作成
4. クライアントIDとシークレットをメモ

#### Step 2: 環境変数の設定
```bash
export GOOGLE_OAUTH_CLIENT_ID="あなたのクライアントID"
export GOOGLE_OAUTH_CLIENT_SECRET="あなたのシークレット"
export OAUTHLIB_INSECURE_TRANSPORT=1  # ローカル開発用
```

#### Step 3: 起動
```bash
# uvx で起動（推奨）
uvx workspace-mcp --tools gmail drive calendar sheets

# ツール量の調整
uvx workspace-mcp --tool-tier core       # 基本ツールのみ
uvx workspace-mcp --tool-tier extended   # 拡張
uvx workspace-mcp --tool-tier complete   # 全部
```

#### Step 4: Claude Code への登録

CLIモードでClaude Codeから直接利用可能:
```bash
workspace-mcp --cli search_gmail_messages --args '{"query": "is:unread"}'
```

> 注意: Python + uvx が必要なため、非エンジニアには少しハードルが高い

---

## 5. @alanse/mcp-server-google-workspace

- **npm**: https://www.npmjs.com/package/@alanse/mcp-server-google-workspace
- **特徴**: 130ツール（最多）、npx対応

詳細なセットアップドキュメントが確認できなかったため、推奨度は低め。npmページを直接確認のこと。

---

## Google Cloud Console での共通セットアップ手順

どのMCPサーバーを使う場合でも、以下のGoogle Cloud側の設定が必要:

### 1. プロジェクト作成
1. https://console.cloud.google.com にアクセス
2. 上部の「プロジェクトを選択」→「新しいプロジェクト」
3. プロジェクト名を入力（例: `nolla-mcp`）して作成

### 2. APIの有効化
「APIとサービス」→「ライブラリ」から以下を検索して有効化:
- **Gmail API**
- **Google Sheets API**
- **Google Calendar API**
- （必要に応じて: Google Drive API, Google Docs API）

### 3. OAuth 同意画面の設定
1. 「APIとサービス」→「OAuth同意画面」
2. ユーザーの種類: 「外部」を選択
3. アプリ名、サポートメール、連絡先を入力
4. スコープ: 必要なスコープを追加
5. テストユーザー: 自分のGmailアドレスを追加

### 4. OAuth クライアントIDの作成
1. 「APIとサービス」→「認証情報」
2. 「認証情報を作成」→「OAuthクライアントID」
3. アプリケーションの種類: **デスクトップアプリ**
4. 作成後、**クライアントID** と **クライアントシークレット** をコピー

> 重要: 「デスクトップアプリ」を選ぶこと。「ウェブアプリケーション」だとリダイレクトURIの設定が追加で必要になる。

---

## 比較まとめ

| 項目 | Google公式CLI | ngs/google-mcp-server | @presto-ai | taylorwilsdon |
|------|--------------|----------------------|------------|---------------|
| **セットアップの簡単さ** | 簡単（対話型） | 普通 | 最も簡単 | やや難しい |
| **インストール方法** | npm -g | Homebrew | npx | uvx (Python) |
| **Google Cloud設定** | 自動(gws auth setup) | 手動 | 組み込み済み? | 手動 |
| **ツール数** | 動的生成（全API） | 約50 | 不明 | 100以上 |
| **安定性・信頼性** | 最高（Google公式） | 高い | 中 | 高い |
| **マルチアカウント** | Yes | Yes | No | Yes |
| **更新頻度** | 活発 | 活発 | 普通 | 活発 |
| **非エンジニア向け** | ○ | ○ | ◎ | △ |

---

## おすすめセットアップ（Yuyaへの提案）

### まずはこれだけやれば使える（Google公式CLI）

```bash
# 1. インストール
npm install -g @googleworkspace/cli

# 2. セットアップ（ブラウザで認証）
gws auth setup
gws auth login -s gmail,calendar,sheets

# 3. Claude Code に登録
claude mcp add google-workspace -- gws mcp

# 4. Claude Code を再起動して完了
```

所要時間: 約10-15分

### もっとシンプルにしたい場合（@presto-ai）

```bash
# これだけ
claude mcp add google-workspace -- npx -y @presto-ai/google-workspace-mcp
# Claude Code 再起動 → ブラウザで認証 → 完了
```

所要時間: 約5分（ただしGoogle Cloud設定が組み込まれているか要確認）

---

## Sources

- [Google Workspace CLI (公式)](https://github.com/googleworkspace/cli)
- [taylorwilsdon/google_workspace_mcp](https://github.com/taylorwilsdon/google_workspace_mcp)
- [ngs/google-mcp-server](https://github.com/ngs/google-mcp-server)
- [@presto-ai/google-workspace-mcp (npm)](https://www.npmjs.com/package/@presto-ai/google-workspace-mcp)
- [Google Workspace MCP公式サイト](https://workspacemcp.com)
- [Claude Code MCP設定ドキュメント](https://code.claude.com/docs/en/mcp)
- [Google Cloud OAuth設定ガイド](https://developers.google.com/workspace/guides/configure-oauth-consent)
- [Google MCP サーバー公式ブログ](https://cloud.google.com/blog/products/ai-machine-learning/announcing-official-mcp-support-for-google-services)
