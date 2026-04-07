# Claude Code / AIコーディングツールを使ったSNS運用自動化リサーチ

調査日: 2026-03-23

---

## 1. Claude CodeでSNS運用を自動化している具体的な事例

### 事例A: 非エンジニアによるX完全自動化（石神大輔氏）
- 朝7:00に曜日に合わせた「おはようございます」ポストを自動投稿
- 昼12:05に最新ニュースへの長文感想を自動投稿
- 午後15:00にAI活用Tipsの長文ポストを自動投稿
- **毎日4回、完全自動で投稿される仕組みを1時間で構築**
- 参考: https://note.com/gamisuke0507/n/n840e681fc0e5

### 事例B: 非エンジニアのX自動運用（新居祐介氏）
- 非エンジニアがClaude Codeを活用してXを自律運用
- AIエージェントに投稿生成・運用を任せる構成
- 参考: https://note.com/yusuke77/n/n1aefe133be43

### 事例C: Claude Code + GitHub + Vercel + Publer の完全自動SNS運用
- **Claude Code**: 司令塔（投稿企画の立案）
- **GitHub**: コードと設定を保管、ワークフロー実行
- **Vercel**: 生成コンテンツのプレビュー・ショーケース
- **Publer**: 指定した日時にSNSへ自動投稿
- **N8N / Kamui Code Workflow**: ツール間の連携
- コンテンツカレンダー自動生成 → 画像・動画自動生成 → Publer CSV連携で投稿
- 参考: https://ai-kidou.jp/claude-code-hobo-zenjido-sns-unyo-github-vercel-publer/

### 事例D: 1記事 → 7プラットフォーム自動配信パイプライン（合同会社playpark）
- Claude Code Skillsで記事1本から以下に自動配信:
  - Zenn / Qiita（記事転載）
  - X / LinkedIn / Facebook / Bluesky / Google Business Profile（SNS告知）
- Zernio CLI（$19/月〜）で一括予約投稿
- **1記事あたり1時間以上→数分に短縮**
- 参考: https://www.playpark.co.jp/blog/cross-post-pipeline-design

### 事例E: CLAUDE.mdに書くだけでXに投稿
- Pythonスクリプト（X API v2使用）を事前に作成
- CLAUDE.mdに投稿ルール・手順を記載
- Claude Codeに「投稿して」と言うだけで実行
- プレビュー → 文字数チェック → ユーザー確認 → 投稿の安全フロー
- Grokで分析した個人のポスト傾向を組み込み可能
- 参考: https://zenn.dev/gappy/articles/claude-code-x-post

### 事例F: Typefully API + Claude Code（チャエン氏推奨）
- X APIだけだと下書き保存ができない問題を解決
- TypefullyのAPIと組み合わせることで、下書き→確認→投稿が可能
- Skillとして `/x-post` と入力するだけで実行
- 手順: 参考URL貼付 → xurl APIでスレッド全文+画像取得 → 投稿生成
- 参考: https://x.com/masahirochaen/status/2033100369509888128

### 事例G: YouTube動画 → 9プラットフォーム自動配信（Blotato連携）
- YouTubeビデオからトランスクリプトを取得
- Claude Codeがプラットフォーム別に最適化されたテキスト生成
- Blotatoで複数プラットフォームへスケジュール投稿
- LinkedIn（ビジネス調）、X（カジュアル）、Instagram（ブランド統一）で文体変更
- 参考: https://www.geeky-gadgets.com/claude-code-youtube-social-posts/

### 事例H: ADK「SOCIAI」（企業向けAIエージェント）
- ADKマーケティング・ソリューションズが提供開始
- 情報収集→トレンド・炎上分析→テキスト自動生成→自動投稿→PDCA学習を一貫
- 第一弾としてヤッホーブルーイングのXアカウントで運用
- 参考: https://www.adkms.jp/news/20250710-2/

---

## 2. 使用されているMCPサーバー・API・ツール

### MCP（Model Context Protocol）サーバー

| MCP名 | 用途 | 費用 |
|--------|------|------|
| **X MCP（公式）** | X API v2を使った投稿・読み取り・DM | X API Pay-Per-Use: 投稿$0.01/件、読み取り$0.005/件 |
| **Composio Twitter MCP** | Claude Code ↔ Twitter連携（OAuth2認証） | 無料プランあり |
| **Instagram MCP** | Instagram Business/Creator連携 | Composio経由で無料プランあり |
| **n8n MCP** | n8nワークフローをClaude Codeから直接実行 | n8nは無料（セルフホスト） |

### X MCP（公式）の導入手順
1. `git clone https://github.com/xdevplatform/xmcp.git`
2. Python仮想環境構築 + `pip install -r requirements.txt`
3. `.env`ファイルに認証情報を設定:
   - `X_OAUTH_CONSUMER_KEY`
   - `X_OAUTH_CONSUMER_SECRET`
   - `X_BEARER_TOKEN`
4. Developer Portalでコールバック URL登録: `http://127.0.0.1:8976/oauth/callback`
5. `python server.py` でサーバー起動
6. `claude mcp add --transport http xmcp http://127.0.0.1:8000/mcp`
- 参考: https://notai.jp/blog/x-api-mcp/

### Claude Code Skills

| Skill名 | 機能 | 費用 |
|----------|------|------|
| **X (Twitter) Automation** | X API v2で投稿・検索・エンゲージメント管理 | 無料 |
| **Social Media Suite** | Instagram・YouTube自動投稿（Buffer/Hootsuite代替） | 無料 |
| **Typefully Social Media Management** | X・LinkedIn・Threads・Bluesky・Mastodon対応 | Typefully有料プラン要 |
| **Instagram Automation** | メディア投稿・カルーセル作成・分析 | 無料 |
| **sns-announce** | 5プラットフォーム向け告知文自動生成 | 無料（カスタム） |

### 外部ツール・サービス

| ツール | 役割 | 費用 |
|--------|------|------|
| **Postiz** | 30+プラットフォーム対応の投稿CLI（OSS） | 無料（セルフホスト）/ $0〜 |
| **Publer** | SNSスケジュール投稿 | 無料プランあり / $12/月〜 |
| **Typefully** | X特化の下書き・スレッド管理 | 無料プランあり / $12.5/月〜 |
| **Blotato** | マルチプラットフォーム投稿スケジューリング | 有料 |
| **Zernio CLI** | 一括予約投稿 | $19/月〜 |
| **n8n** | ワークフロー自動化（OSS） | 無料（セルフホスト）/ $20/月〜 |

---

## 3. コンテンツ生成から投稿までの自動化フロー

### パターン1: 最もシンプル（CLAUDE.md方式）
```
Claude Codeに投稿を依頼
  ↓
CLAUDE.mdの投稿ルールを読み込み
  ↓
投稿文を生成
  ↓
プレビュー表示 + 文字数チェック
  ↓
ユーザー承認（y/n）
  ↓
Pythonスクリプト経由でX API v2に投稿
```
**必要なもの**: X API認証情報、Pythonスクリプト、CLAUDE.md
**費用**: X API従量課金のみ（月数ドル程度）

### パターン2: Skill + Typefully方式
```
参考URLを貼り付け
  ↓
xurl APIでコンテンツ取得
  ↓
Claude Codeが投稿文を生成
  ↓
Typefully APIで下書き保存
  ↓
Typefullyで確認・スケジュール・投稿
```
**必要なもの**: X API、Typefully API、Claude Code Skill
**費用**: Typefully $12.5/月〜

### パターン3: 完全自動化（定期実行）方式
```
cronジョブ / GitHub Actions で定時起動
  ↓
Claude Codeが情報収集（ニュース、トレンド等）
  ↓
コンテンツ生成（テキスト + 画像）
  ↓
プラットフォーム別に最適化
  ↓
Postiz / Publer / Zernio 経由で自動投稿
```
**必要なもの**: Claude Code + スケジューラー + 投稿ツール
**費用**: Claude Code利用料 + 投稿ツール料金

### パターン4: n8nワークフロー方式
```
トリガー（ブログ更新、RSS、スケジュール等）
  ↓
n8nがClaudeを呼び出し → コンテンツ生成
  ↓
プラットフォーム別に文体変換
  ↓
n8n経由で各SNSに自動投稿
  ↓
Slack/Teamsで承認通知（HITL）
```
**必要なもの**: n8n（セルフホスト可）、Claude API、各SNS API
**費用**: n8n無料（セルフホスト）+ Claude API従量課金

---

## 4. 無料で始められる方法と、課金で広がる可能性

### 無料で始められる構成（最小構成）

| 項目 | 選択肢 | 費用 |
|------|--------|------|
| **Claude Code** | Maxプラン ($100/月) が最低限必要 ※API従量課金も可 | $100/月〜 |
| **X投稿** | X API Free tier（投稿のみ、月1,500件） | 無料 |
| **投稿管理** | Postiz（セルフホスト）またはCLAUDE.md方式 | 無料 |
| **自動化基盤** | n8n（セルフホスト）またはGitHub Actions | 無料 |

**注意**: Claude Code自体にPro($20/月)またはMax($100-200/月)プランが必要。完全無料では始められないが、最安で月$20+API従量課金（月$5〜10程度）で始められる。

### 課金で広がる可能性

| レベル | 構成 | 月額目安 | できること |
|--------|------|----------|------------|
| **入門** | Claude Pro + X API Free | $20〜30 | X投稿の半自動化（確認→投稿） |
| **実用** | Claude Max + Typefully + X API | $120〜150 | X投稿の完全自動化 + 下書き管理 |
| **本格運用** | Claude Max + Postiz/Publer + n8n | $150〜200 | マルチプラットフォーム自動投稿 |
| **プロ** | Claude Max + Zernio + 各API | $200〜300 | 7+プラットフォーム一括配信 + 分析 |

### Claude Codeの費用感
- API従量課金: 平均 $6/日（90%のユーザーは$12/日以下）
- Maxプラン（定額）: $100/月 または $200/月
- SNS自動化だけなら月$100〜200程度で収まるケースが多い

---

## 5. 注目すべきツール・リソース

### Postiz Agent（オープンソース、特に注目）
- **30+プラットフォーム対応**: X, LinkedIn, Instagram, Facebook, Reddit, YouTube, TikTok, Pinterest等
- **Apache 2.0ライセンス**で完全オープンソース
- Claude Code Skillとして統合可能（SKILL.mdでコマンド学習）
- セルフホストすれば月額費用なし
- `npm install -g postiz` でインストール
- GitHub: https://github.com/gitroomhq/postiz-agent
- 公式: https://postiz.com/agent

### n8nワークフローテンプレート
- 490以上のSNS自動化テンプレートが無料で利用可能
- Claude + Postiz連携のWordPress記事→SNS自動投稿テンプレートあり
- https://n8n.io/workflows/categories/social-media/

### Claude Code Skills Hub
- SNS関連のSkillが多数公開中
- https://mcpmarket.com/ で検索可能
- https://claudeskills.info/ でも無料Skillを配布

---

## 6. 参考URL一覧

### 日本語記事
- [非エンジニアがClaude CodeでXを自動運用](https://note.com/yusuke77/n/n1aefe133be43)
- [SNSは自動化で稼ぐ時代 Claude Codeで投稿ゼロ運用](https://note.com/hei07108/n/n114e9c9d34af)
- [非エンジニアがClaude Codeだけで「X完全自動化」を1時間で作った全手順](https://note.com/gamisuke0507/n/n840e681fc0e5)
- [CLAUDE.mdに書くだけでXに投稿できる仕組み](https://zenn.dev/gappy/articles/claude-code-x-post)
- [Claude Code SkillでZenn記事公開後のX投稿を自動化](https://zenn.dev/ystknsh/articles/2026-02-25-claude-code-x-post-skill)
- [Claude Code + GitHub + Vercel + Publer 完全自動SNS運用](https://ai-kidou.jp/claude-code-hobo-zenjido-sns-unyo-github-vercel-publer/)
- [1記事→7プラットフォーム自動配信パイプライン](https://www.playpark.co.jp/blog/cross-post-pipeline-design)
- [Claude CodeのSkills機能でSNSマーケティング業務を効率化](https://note.com/riko_nft/n/n0679f6380ca3)
- [ClaudeとNotionエージェントでX運用を全自動化](https://newspicks.com/news-in-app/16267662/)
- [X APIのMCP組み込み完全ガイド](https://notai.jp/blog/x-api-mcp/)
- [n8nからSNSに自動で一括投稿する方法](https://note.com/koresugo/n/n0c65bd9eed19)
- [Claude Codeで24時間自動で稼ぐAIを作った全手順](https://note.com/taruvana/n/n88ec50942a5e)
- [Typefully API + Claude CodeでX自動化（チャエン氏）](https://x.com/masahirochaen/status/2033100369509888128)

### 英語記事
- [How to Automate Social Media Calendar with Claude Code](https://stormy.ai/blog/how-to-automate-social-media-calendar-claude-code)
- [Building an Autonomous Instagram Content Engine with Claude Code](https://stormy.ai/blog/autonomous-instagram-content-engine-claude-code-playbook)
- [Building a TikTok Content Factory with Claude Code](https://stormy.ai/blog/building-tiktok-content-factory-claude-code)
- [Claude AI Social Media Marketing Playbook 2026](https://stormy.ai/blog/claude-ai-social-media-marketing-playbook)
- [Postiz Agent - Social Media CLI for AI Agents](https://postiz.com/agent)
- [Composio Twitter MCP for Claude Code](https://composio.dev/toolkits/twitter/framework/claude-code)
- [Social Media Suite Skill (Free)](https://claudeskills.info/skill/social-media-suite/)
- [Claude Code + Blotato SNS Machine](https://www.geeky-gadgets.com/claude-code-youtube-social-posts/)
- [n8n Claude + Postiz Workflow](https://n8n.io/workflows/7046-auto-generate-platform-optimized-social-media-posts-from-wordpress-with-claude-and-postiz/)
- [12 Best AI Agents for Social Media 2026](https://www.ema.ai/additional-blogs/addition-blogs/best-social-media-ai-agents)

### 公式ドキュメント・ツール
- [Claude Code Skills公式ドキュメント](https://code.claude.com/docs/ja/skills)
- [X MCP GitHub](https://github.com/xdevplatform/xmcp)
- [Postiz Agent GitHub](https://github.com/gitroomhq/postiz-agent)
- [n8n SNSワークフロー](https://n8n.io/workflows/categories/social-media/)
- [MCP Market（Skills検索）](https://mcpmarket.com/)
