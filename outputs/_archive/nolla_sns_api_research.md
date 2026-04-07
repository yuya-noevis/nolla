# SNSプラットフォームAPI制約とClaude Code/MCP連携による自動投稿の技術的実現性

調査日: 2026-03-23

---

## 1. 各SNSプラットフォームの投稿APIの現状

### X (Twitter)

| プラン | 月額 | 投稿上限 | 読み取り | 検索 |
|--------|------|----------|----------|------|
| **Free** | $0 | 月1,500ツイート（17回/24h/ユーザー） | 極めて限定的 | なし |
| **Basic** | $100 | 月3,000ツイート | 月10,000件 | 過去7日間のみ |
| **Pro** | $5,000 | 大幅に拡大 | 月1,000,000件 | フルアーカイブ |
| **Enterprise** | $42,000〜 | カスタム | カスタム | カスタム |

**認証**: OAuth 2.0 (PKCE) またはOAuth 1.0a。無料プランでもAPI Key + Secret + Access Tokenが必要。

**2026年の変化**: 2026年2月に「従量課金（Pay-As-You-Go）」が発表。読み取り・検索・書き込みそれぞれに単価が設定される新モデル。

**結論**: **無料枠で月1,500投稿は十分**。Nollaの発信用途（1日1〜3投稿程度）なら無料枠で余裕。

---

### TikTok

| 項目 | 内容 |
|------|------|
| **API名** | Content Posting API |
| **料金** | 無料（API自体に課金なし） |
| **投稿方式** | Direct Post（即時公開）/ Upload to Inbox（下書き） |
| **認証** | OAuth 2.0、`video.publish` スコープの承認が必要 |
| **必須条件** | TikTok for Developersでアプリ登録 + 審査（5〜10営業日） |
| **重要制限** | **未審査のアプリは投稿が全てプライベート表示**になる |
| **対応コンテンツ** | 動画 + 写真（2025年〜） |

**結論**: API自体は無料だが、**審査通過が必須**。審査なしだと公開投稿ができない。写真も投稿可能になったので、画像コンテンツの自動投稿にも使える。

---

### YouTube

| 項目 | 内容 |
|------|------|
| **API名** | YouTube Data API v3 |
| **料金** | 無料（Google Cloud経由） |
| **デフォルトクォータ** | 1日10,000ユニット |
| **動画アップロードのコスト** | 1動画 = 1,600ユニット |
| **1日の理論上限** | 約6動画/日（デフォルトクォータ） |
| **認証** | Google OAuth 2.0 + Google Cloud Projectのセットアップ |
| **クォータ増加** | 無料だが審査が必要（YouTube API利用規約への準拠確認） |

**追加制限**: APIクォータとは別に、YouTubeアカウント側にも1日のアップロード上限がある。

**結論**: **1日数本のアップロードなら無料枠で十分**。ただしGoogle Cloud Projectの作成とOAuth設定が必要。

---

### Instagram

| 項目 | 内容 |
|------|------|
| **API名** | Instagram Graph API（Meta/Facebook Graph APIの一部） |
| **料金** | 無料 |
| **投稿上限** | **24時間で25投稿** |
| **対応コンテンツ** | 写真、動画、リール、ストーリー、カルーセル |
| **必須条件** | **ビジネスアカウントまたはクリエイターアカウント**が必要 |
| **認証** | Meta App作成 + Instagram Businessアカウント連携 + OAuth |
| **投稿フロー** | コンテナ作成 → ステータス確認 → 公開（3ステップ） |
| **重要変更** | Basic Display APIは2024年12月に廃止済み |

**結論**: **24時間25投稿は十分すぎる枠**。ただしビジネスアカウントが必須。個人アカウントではAPI投稿不可。

---

## 2. MCP経由でSNS投稿を行うサーバー

### X/Twitter専用MCPサーバー

| サーバー名 | 機能 | リンク |
|-----------|------|--------|
| **twitter-mcp** (EnesCinr) | ツイート投稿 + 検索 | [GitHub](https://github.com/EnesCinr/twitter-mcp) |
| **x-twitter-mcp-server** (rafaljanicki) | 投稿・削除・いいね・検索・トレンド・ブックマーク | [GitHub](https://github.com/rafaljanicki/x-twitter-mcp-server) |
| **x-mcp-server** (DataWhisker) | 16ツール（タイムライン・投稿・検索・エンゲージメント） | [GitHub](https://github.com/DataWhisker/x-mcp-server) |
| **Composio Twitter MCP** | 投稿・リスト管理・ブックマーク・DM | [Composio](https://composio.dev/toolkits/twitter/framework/claude-code) |

### マルチプラットフォームMCPサーバー（推奨）

| サーバー名 | 対応プラットフォーム | 特徴 |
|-----------|---------------------|------|
| **Ayrshare MCP** | 13+（X, Instagram, TikTok, YouTube, Facebook, LinkedIn, Pinterest, Reddit等） | 75+ツール。無料プランあり。分析・ハッシュタグ自動生成も可能 |
| **Post Bridge** | 9（Instagram, TikTok, YouTube, X等） | 1APIコールで複数プラットフォーム同時投稿。MCP対応 |
| **Postproxy** | 8（Instagram, TikTok, YouTube, X等） | 1APIコールで投稿。Claude/Cursorでゼロ設定 |
| **Xpoz** | 複数 | AI AgentをSNSに接続。Claude連携対応 |
| **Social Neuron** | 複数 | 52ツール。コンテンツ作成・スケジュール・分析 |

### セットアップの基本手順（Ayrshare MCPの例）

1. Python 3.10以上をインストール
2. Ayrshareアカウント作成（無料プランあり）
3. APIキーを取得
4. `.env` に認証情報を設定
5. 各SNSアカウントをAyrshareで接続
6. Claude Codeの `settings.json` にMCPサーバーを追加

---

## 3. 無料で使えるSNS自動投稿ツール・サービス

### 専用サービス

| サービス | 無料プラン | 制限 |
|---------|-----------|------|
| **Buffer** | あり（永久無料） | 3アカウント、チャネルあたり10投稿予約 |
| **Hootsuite** | なし（$199/月〜） | 30日間無料トライアルのみ |
| **Later** | あり | 限定的な機能 |

### 自動化プラットフォーム

| サービス | 無料プラン | 特徴 |
|---------|-----------|------|
| **n8n（セルフホスト）** | 完全無料（サーバー代$5〜10/月のみ） | 490+のSNS自動化テンプレート。最も柔軟 |
| **n8n Cloud** | 14日間無料トライアル | Starter €24/月（2,500実行） |
| **Make (Integromat)** | あり | 月1,000オペレーション |
| **Zapier** | あり | 月100タスク（非常に限定的） |

**おすすめ**: コストを抑えたいなら**n8nセルフホスト**が最強。VPS（$5/月程度）で無制限に自動化ワークフローを構築できる。

---

## 4. Claude Codeのhooks/cron機能を使った定期投稿

### Claude Codeの定期実行機能

Claude Code v2.1.72以降で `/loop` コマンドとcronスケジューリングが利用可能。

**基本コマンド**:
```
/loop 2h X用の投稿を作成してMCPサーバー経由で投稿して
```

**ワンタイムリマインダー**:
```
15時にInstagramに投稿して
```

### 技術詳細

| 項目 | 内容 |
|------|------|
| **ツール** | `CronCreate`, `CronList`, `CronDelete` |
| **間隔指定** | `s`（秒）, `m`（分）, `h`（時間）, `d`（日） |
| **最大タスク数** | 1セッションあたり50タスク |
| **自動有効期限** | **3日間で自動失効**（無限ループ防止） |
| **タイムゾーン** | ローカルタイムゾーン基準 |

### 重要な制限事項

- **セッション依存**: Claude Codeを閉じるとすべてのタスクが消える
- **永続性なし**: 再起動でリセットされる
- **ミス時のキャッチアップなし**: Claude処理中に時間を過ぎた場合、1回だけ実行
- **3日間で自動失効**: 長期運用には不向き

### 永続的なスケジューリングの代替手段

| 方法 | 特徴 |
|------|------|
| **Claude Code Desktop（スケジュールタスク）** | GUIで設定。アプリが開いている限り永続 |
| **GitHub Actions（scheduleトリガー）** | 無人で動作。最も堅牢 |
| **OS標準のcron（macOS/Linux）** + Claude Code CLI | `claude -p "投稿を作成して"` をcronで定期実行 |
| **n8n** + MCPサーバー | 自動化ワークフローで最も柔軟 |

### 実用的な構成例

```
[GitHub Actions / OS cron / n8n]
    ↓ 定期トリガー
[Claude Code CLI]
    ↓ コンテンツ生成
[MCP Server (Ayrshare等)]
    ↓ API経由で投稿
[X / Instagram / TikTok / YouTube]
```

---

## 5. 各プラットフォームのBot/自動投稿ポリシー

### X (Twitter)

| 許可されている | 禁止されている |
|--------------|---------------|
| サードパーティツールでの投稿予約 | 自動フォロー/アンフォロー |
| RSS連携による自動共有 | 自動いいね・リツイート・ブックマーク |
| API制限内での投稿 | 自動DM・一斉DM |
| Botアカウント（bioに明記必須） | 複数アカウントで同一内容の投稿 |
| AI生成コンテンツ（開示義務なし） | スクレイピング |

**安全ライン**: 「コンテンツの作成と予約投稿を自動化するのはOK、エンゲージメント（いいね等）の自動化はNG」

**推奨**: 1日2〜5投稿程度に抑える。50+投稿/日は警告対象。

### TikTok

- **公式APIのみ使用すること** — 非公式APIやスクレイピングは即BAN対象
- AI生成コンテンツには**AIラベルの明記が必須**（2025年9月〜）
- ラベルなしのAIコンテンツは削除対象
- 繰り返しの違反はアカウント停止

### Instagram

- **ビジネスアカウント + Graph APIのみが公式に許可**された自動投稿方法
- 自動いいね・自動コメント・自動フォローツールは**明確な規約違反**
- 非公式ツール使用はアカウント削除リスクあり
- API経由の正規投稿は問題なし

### YouTube

- **YouTube Data API v3経由のアップロードは公式に許可**
- API利用規約への準拠が必須
- スパム的な大量アップロードはアカウント停止の可能性
- コンテンツポリシー（著作権等）は通常投稿と同じルールが適用

---

## まとめ：Nollaにとっての実現性

### 結論：**技術的には十分実現可能**

| プラットフォーム | API無料 | 自動投稿 | 難易度 | 備考 |
|----------------|---------|----------|--------|------|
| **X/Twitter** | ○（月1,500件） | ○ | 低 | MCPサーバーが充実。すぐ始められる |
| **Instagram** | ○（24h/25件） | ○ | 中 | ビジネスアカウント + Meta App設定が必要 |
| **TikTok** | ○ | △ | 高 | 審査通過が必須。未審査だとプライベートのみ |
| **YouTube** | ○（6動画/日） | ○ | 中 | Google Cloud設定が必要 |

### 推奨アプローチ

**Phase 1（すぐ始める）**: X/Twitter + MCPサーバー（twitter-mcp）
- 最も簡単に始められる
- Claude Codeで文章を生成 → MCPで即投稿

**Phase 2（1〜2週間後）**: Instagram追加
- ビジネスアカウントに切り替え
- Ayrshare MCPで一括管理

**Phase 3（1ヶ月後）**: TikTok + YouTube追加
- TikTok開発者審査を申請
- 動画コンテンツの自動生成パイプラインを構築

**定期投稿の仕組み**:
- 短期テスト: Claude Codeの `/loop` で手軽に
- 本格運用: GitHub ActionsまたはOS cronでClaude Code CLIを定期実行
- 最大柔軟性: n8nセルフホスト（月$5〜10）

---

## 参考リンク

### X/Twitter API
- [X API Pricing 2026 全プラン比較](https://www.xpoz.ai/blog/guides/understanding-twitter-api-pricing-tiers-and-alternatives/)
- [X API Pricing Tiers Explained](https://www.wearefounders.uk/the-x-api-price-hike-a-blow-to-indie-hackers/)
- [X Automation Rules 2026](https://opentweet.io/blog/twitter-automation-rules-2026)
- [X公式 自動化ルール](https://help.x.com/en/rules-and-policies/x-automation)

### TikTok API
- [TikTok Content Posting API](https://developers.tiktok.com/products/content-posting-api/)
- [TikTok Content Posting API Getting Started](https://developers.tiktok.com/doc/content-posting-api-get-started)
- [TikTok Developer Guide 2026](https://www.tokportal.com/learn/tiktok-content-posting-api-developer-guide)

### YouTube API
- [YouTube Upload API Guide 2026](https://getlate.dev/blog/youtube-upload-api)
- [YouTube Data API v3 Quota](https://elfsight.com/blog/youtube-data-api-v3-limits-operations-resources-methods-etc/)
- [YouTube Quota and Compliance Audits](https://developers.google.com/youtube/v3/guides/quota_and_compliance_audits)

### Instagram API
- [Instagram Graph API Developer Guide 2026](https://elfsight.com/blog/instagram-graph-api-complete-developer-guide-for-2026/)
- [API to Post to Instagram 2026](https://zernio.com/blog/api-to-post-to-instagram)
- [Instagram API 2026 Complete Guide](https://getlate.dev/blog/instagram-api)

### MCP サーバー
- [twitter-mcp (GitHub)](https://github.com/EnesCinr/twitter-mcp)
- [x-twitter-mcp-server (GitHub)](https://github.com/rafaljanicki/x-twitter-mcp-server)
- [Ayrshare MCP (GitHub)](https://github.com/vanman2024/ayrshare-mcp)
- [Post Bridge](https://www.post-bridge.com/agents)
- [Postproxy](https://postproxy.dev/)
- [Social Media MCP Servers一覧](https://mcpmarket.com/es/categories/social-media-management)

### Claude Code スケジューリング
- [Claude Code Scheduled Tasks 公式ドキュメント](https://code.claude.com/docs/en/scheduled-tasks)
- [Claude Code Cron Automation Guide](https://smartscope.blog/en/generative-ai/claude/claude-code-cron-schedule-automation-complete-guide-2025/)

### 自動化ツール
- [n8n Social Media Workflows](https://n8n.io/workflows/categories/social-media/)
- [n8n Pricing](https://n8n.io/pricing/)
- [Buffer](https://buffer.com/)
