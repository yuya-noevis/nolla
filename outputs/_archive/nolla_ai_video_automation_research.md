# AIを使ったSNS動画コンテンツ自動生成 & 投稿自動化リサーチ

**調査日**: 2026年3月23日

---

## 1. SNS動画コンテンツを自動生成するツール・ワークフロー

### オールインワン型（動画生成〜投稿まで一気通貫）

| ツール名 | 概要 | 無料プラン | 有料プラン | 自動投稿 |
|----------|------|------------|------------|----------|
| **AutoShorts.ai** | Faceless動画を自動生成→スケジュール→投稿 | あり（ウォーターマーク付） | $19〜$69/月 | TikTok, YouTube |
| **Clippie AI** | Reddit/Twitter URLから6〜8分で動画生成、マルチプラットフォーム配信 | なし | $19.99〜$69.99/月 | TikTok, YouTube, Instagram |
| **InVideo AI** | テキストから完全なFaceless動画を生成、テンプレート300種以上 | あり（ウォーターマーク付） | $25〜$60/月 | なし（外部ツール連携） |
| **Faceless.video** | 毎日自動で動画を生成＆TikTokに投稿 | 不明 | 不明 | TikTok |
| **AutoReels** | Facelessチャンネルの完全自動化 | 不明 | 不明 | TikTok, YouTube |
| **ClipLama** | Faceless動画を秒速で生成、TikTok/YouTubeに自動投稿 | 不明 | 不明 | TikTok, YouTube |
| **Revid AI** | アイデアから公開まで、バイラル動画の自動生成 | あり | 有料プランあり | あり |

### 長尺→ショート変換型

| ツール名 | 概要 | 価格 |
|----------|------|------|
| **Opus Clip** | 長尺動画からバイラルポテンシャルの高い部分を自動抽出、0-100のバイラルスコア付き | $15〜/月（クレジット制） |
| **Pictory** | 長編コンテンツからYouTube最適化ショートを生成 | $23〜$47/月 |

### プロフェッショナル向け

| ツール名 | 概要 | 価格 |
|----------|------|------|
| **Synthesia** | AIアバターが120言語以上で台本を読み上げる動画を生成 | $29〜$89/月 |
| **Descript** | プロ品質の編集機能、AI音声のオーバーダブ | $24〜$40/月 |

---

## 2. 動画生成から投稿までの完全自動化パイプライン

### パイプラインA: n8n + AI（最も柔軟、技術者向け）

**ワークフロー概要**:
1. Google Sheetからアイデアを取得（またはAIで自動生成）
2. OpenAI GPT-4でスクリプト・画像プロンプト生成
3. Kling AI / Google Veo3 / Flux で動画クリップ生成
4. ElevenLabs でナレーション音声生成
5. FFmpegで動画合成（キャプション、BGM追加）
6. Blotato / Upload-Post / Late 経由で各SNSに自動投稿

**n8nの主要テンプレート**:
- 「Fully automated AI video generation & multi-platform publishing」- TikTok, Instagram, YouTube, Facebook, LinkedIn同時投稿
- 「Generate & auto-post AI videos with Veo3 and Blotato」- Google Veo3 API + 毎日自動トリガー
- 「GPT-4 + Kling AI auto-post」- Instagram, TikTok, YouTube, Facebook, Threads, X, LinkedIn, Pinterest, Blueskyに対応
- 「Transform long videos into viral shorts」- Whisper + Gemini AI + FFmpeg

**コスト**: n8nはセルフホストなら無料。クラウド版は20ユーロ/月〜

### パイプラインB: Make.com + JSON2Video（ノーコード）

**ワークフロー概要**:
1. Google Sheetでコンテンツ管理
2. ChatGPT APIでスクリプト生成
3. JSON2Video APIで動画レンダリング（JSONでテンプレート指定）
4. YouTube/Instagram/TikTokに自動投稿（Airshare API経由）

**コスト**: Make.com無料プラン（1,000オペレーション/月）あり

### パイプラインC: Python + FFmpeg（完全自作、最安）

**アーキテクチャ（実績あり）**:
1. **音声抽出**: FFmpegで長尺動画から音声を分離
2. **文字起こし**: OpenAI Whisper（ローカル実行、無料）
3. **AI分析**: GPT-4-miniがベストなショート区間を選定
4. **動画カット**: FFmpegで切り出し（1分動画あたり約1分処理）
5. **エフェクト追加**: 縦型変換(1080x1920)、字幕、ぼかし、1.35倍速
6. **アップロード**: YouTube Data API v3で自動投稿

**コスト**: GPT-4-miniのAPI料金のみ（1動画あたり数円程度）。Whisperはローカルなので無料

### パイプラインD: Remotion（React開発者向け）

**概要**: Reactコンポーネントで動画をプログラマティックに生成
- Webの技術（CSS, Canvas, SVG, WebGL）がそのまま使える
- データ駆動の動画を大量生成可能（パーソナライズドコンテンツ等）
- MP4, HEVC, WebM, GIF出力対応
- 個人・小規模チームは無料（3人以上の企業は商用ライセンス要）

---

## 3. ツールスタック一覧

### 動画生成AI

| ツール | 用途 | 無料枠 | API提供 |
|--------|------|--------|---------|
| **Kling AI** | テキスト→動画生成 | 66クレジット/日（720p、透かし付） | あり（$0.90〜/10秒動画） |
| **Google Veo3** | 高品質動画生成 | 制限付き | あり（n8n連携可） |
| **Flux (FalAI)** | 画像生成→動画化 | 制限付き | あり |
| **Runway** | テキスト/画像→動画 | 制限付き | あり |

### 音声・ナレーション

| ツール | 用途 | 無料枠 |
|--------|------|--------|
| **ElevenLabs** | 高品質TTS、音声クローン | 20分/月 |
| **OpenAI Whisper** | 音声→テキスト（文字起こし） | ローカル実行なら無料 |
| **Edge-TTS** | Microsoftの無料TTS | 完全無料 |

### 動画編集・合成

| ツール | 用途 | 費用 |
|--------|------|------|
| **FFmpeg** | 動画カット・合成・字幕・エフェクト | 完全無料（OSS） |
| **Remotion** | React で動画をプログラム生成 | 個人無料 |
| **JSON2Video** | JSONから動画生成するAPI | 有料 |

### ワークフロー自動化

| ツール | 用途 | 無料枠 |
|--------|------|--------|
| **n8n** | ワークフロー自動化（セルフホスト可） | セルフホストなら無料 |
| **Make.com** | ノーコード自動化 | 1,000オペレーション/月 |
| **Zapier** | ノーコード自動化 | 100タスク/月 |

### SNS投稿API・中間サービス

| ツール | 対応プラットフォーム | 価格 |
|--------|----------------------|------|
| **Post Bridge** | 9プラットフォーム（Instagram, TikTok, YouTube, X, LinkedIn, Facebook, Pinterest, Threads, Bluesky） | $9〜$14/月 |
| **Blotato** | 主要SNS全般 | 有料 |
| **Upload-Post** | 主要SNS（n8n/Make連携可） | 無料プラン（2プロフィール、10投稿/月） |
| **Late** | 主要SNS | 無料プランあり（API含む） |
| **Repurpose.io** | クロスプラットフォーム転送 | 有料 |

### AI（LLM / スクリプト生成）

| ツール | 用途 | 費用目安 |
|--------|------|----------|
| **OpenAI GPT-4** | スクリプト・プロンプト生成 | API従量課金 |
| **GPT-4-mini** | 低コストのスクリプト生成 | API従量課金（非常に安い） |
| **Claude API** | スクリプト・コンテンツ分析 | API従量課金 |
| **Google Gemini** | クリップ選定・メタデータ生成 | 無料枠あり |

### MCP（Claude連携）

| ツール | 概要 |
|--------|------|
| **Post Bridge MCP** | Claude Desktop/Cursor から直接SNS投稿 |
| **Postiz MCP** | Claude/Cursor からスケジュール投稿 |
| **Twitter MCP Server** | Claude から X(Twitter) に投稿 |
| **Composio YouTube MCP** | Claude から YouTube 操作 |
| **Crosspost MCP** | Claude Desktop からマルチプラットフォーム投稿 |

---

## 4. 各プラットフォームのAPI制約と自動化の実現性

### YouTube

| 項目 | 内容 |
|------|------|
| API | YouTube Data API v3 |
| 投稿上限 | 約6本/24時間（1動画アップロード = 1,600クォータ。1日の上限10,000クォータ） |
| 認証 | OAuth 2.0 必須 |
| 自動化の実現性 | **高い**。API が成熟しており、投稿・メタデータ設定・サムネイル設定まで全自動化可能 |
| 注意点 | 新規チャンネルは段階的にウォームアップが必要 |

### TikTok

| 項目 | 内容 |
|------|------|
| API | Content Posting API |
| 投稿上限 | クリエイターアカウント: 約15本/日。未審査クライアント: 5ユーザー/日 |
| 認証 | OAuth 2.0 + 開発者登録・審査が必要 |
| 自動化の実現性 | **中程度**。APIアクセスには審査が必要（個人開発者には少しハードルが高い） |
| 注意点 | 2025年9月のアルゴリズム更新でオリジナルコンテンツを重視、AI検出も強化 |

### X (Twitter)

| 項目 | 内容 |
|------|------|
| API | X API v2 |
| 無料枠 | 1,500ツイート/月、動画アップロード 34本/24時間（initialize上限） |
| 有料プラン | Basic $200/月、Pro $5,000/月 |
| 自動化の実現性 | **中程度**。無料枠で動画投稿は可能だが制限が厳しい。media.writeスコープが必要 |
| 注意点 | 無料枠は書き込み専用（読み取り不可）。段階的なウォームアップ推奨 |

### Instagram

| 項目 | 内容 |
|------|------|
| API | Instagram Graph API / Instagram Content Publishing API |
| 投稿上限 | 約25本/24時間 |
| 認証 | Facebook Developer + ビジネスアカウント必須 |
| 自動化の実現性 | **中程度**。Reels投稿はAPI対応。ただしストーリーズのAPI投稿は制限あり |

### 共通の注意点
- 急に大量投稿すると**アカウント制限・BANのリスク**あり
- 新規アカウントは**段階的なウォームアップ**が必要
- 各プラットフォームとも**オリジナルコンテンツ**を重視する方向に進化中

---

## 5. 無料で始める方法と課金による拡張性

### ステージ1: 完全無料でプロトタイプ（$0/月）

**最小構成**:
- **スクリプト生成**: Google Gemini（無料枠）またはChatGPT無料版
- **音声生成**: Edge-TTS（完全無料）
- **動画生成**: Kling AI（66クレジット/日、無料）+ FFmpeg（無料）
- **動画編集**: FFmpeg（無料、OSS）
- **自動化**: n8n（セルフホスト、無料）
- **投稿**: 手動 or Upload-Post無料プラン（月10本）

**制限**: 720p、ウォーターマーク付き、投稿本数制限あり

### ステージ2: 低コストで本格運用（$20〜$50/月）

- **スクリプト生成**: GPT-4-mini API（月数百円）
- **音声生成**: ElevenLabs Starter（$5/月、30分）
- **動画生成**: AutoShorts.ai Starter（$19/月、3本/月）or Kling AI有料プラン（$6.99/月）
- **自動化**: n8n セルフホスト（無料）
- **投稿**: Post Bridge Starter（$9/月）

**できること**: HD品質、ウォーターマークなし、週1〜3本の自動投稿

### ステージ3: スケールアップ（$100〜$300/月）

- **スクリプト + 分析**: Claude API or GPT-4 API
- **音声**: ElevenLabs Pro（$22/月、100分）
- **動画生成**: AutoShorts Hardcore（$69/月、14本/月）+ Opus Clip（$15/月）
- **自動化**: n8n クラウド版（20ユーロ/月）or Make.com有料プラン
- **投稿**: Post Bridge + Blotato で全プラットフォーム対応
- **分析**: 各プラットフォームのアナリティクスAPI

**できること**: 毎日投稿、マルチプラットフォーム同時配信、データ駆動の最適化

### ステージ4: フルスケール（$500+/月）

- 全ツール有料プランのフル活用
- カスタムパイプライン構築（Remotion等）
- 複数チャンネル・複数アカウント運用
- A/Bテスト自動化

---

## おすすめの始め方（Nollaの場合）

発達支援コンテンツのSNS発信を目的とするなら、以下のアプローチを推奨:

### 第1段階: 検証（1〜2週間）
1. **Claude/ChatGPT** で発達支援に関するショート動画のスクリプトを5〜10本作成
2. **Kling AI無料枠** or **InVideo AI無料枠** で動画を生成してみる
3. 手動でTikTok/YouTubeに投稿し、反応を確認

### 第2段階: 半自動化（1〜2ヶ月）
1. **AutoShorts.ai**（$19/月）でFaceless動画の自動生成を開始
2. **Post Bridge**（$9/月）で投稿を自動化
3. 週3〜5本のペースで運用

### 第3段階: 完全自動化
1. **n8n** でカスタムワークフローを構築
2. スクリプト→動画→投稿→分析の全工程を自動化
3. データに基づいてコンテンツを最適化

---

## Sources

- [AutoShorts.ai](https://autoshorts.ai/)
- [AI Video Creation Trends 2025-2026 | Clippie](https://clippie.ai/blog/ai-video-creation-trends-2025-2026)
- [Best AI Video Generators for TikTok | OverChat](https://overchat.ai/ai-hub/best-ai-tiktok-video-generators)
- [7 Best AI Video Generators for YouTube Shorts & TikTok (2026) | AIVeed](https://aiveed.io/blog/best-ai-video-generator-youtube-shorts-tiktok)
- [Revid AI](https://www.revid.ai)
- [Passive Income with AI Videos | Clippie](https://clippie.ai/blog/passive-income-with-ai-videos)
- [TikTok Algorithm 2026 | VirVid](https://virvid.ai/blog/tiktok-algorithm-2026-explained)
- [InVideo AI TikTok Generator](https://invideo.io/make/tiktok-video-editor/)
- [Best AI YouTube Shorts Generator | Minvo](https://minvo.pro/blog/best-ai-youtube-shorts-generator)
- [VideoTok](https://www.videotok.app)
- [完全自動化で動画を量産しよう | note](https://note.com/life_to_ai/n/nc1b34f9bdc3d)
- [SNS運用はAIで自動化できる | 創業手帳](https://sogyotecho.jp/sns-ai/)
- [生成AIを活用してSNS運用を効率化 | Hottolink](https://www.hottolink.co.jp/column/20260202_120317/)
- [n8n: Fully automated AI video generation workflow](https://n8n.io/workflows/3442-fully-automated-ai-video-generation-and-multi-platform-publishing/)
- [n8n: Veo3 + Blotato auto-post](https://n8n.io/workflows/5035-generate-and-auto-post-ai-videos-to-social-media-with-veo3-and-blotato/)
- [n8n: GPT-4 + Kling AI auto-post](https://n8n.io/workflows/3501-generate-and-auto-post-social-videos-to-multiple-platforms-with-gpt-4-and-kling-ai/)
- [n8n: Long videos to viral shorts](https://n8n.io/workflows/9867-transform-long-videos-into-viral-shorts-with-ai-and-schedule-to-social-media-using-whisper-and-gemini/)
- [JSON2Video + Make.com Faceless Videos](https://json2video.com/video-automation/make-com/faceless-videos-ai-agent.html)
- [TikTok Content Posting API](https://developers.tiktok.com/products/content-posting-api/)
- [API Posting Limits Guide | Repostit](https://repostit.io/api-posting-limits-youtube-instagram-facebook-tiktok/)
- [Remotion - Make videos programmatically](https://www.remotion.dev/)
- [Remotion GitHub](https://github.com/remotion-dev/remotion)
- [AI YouTube Shorts Generator Pipeline | Vitalii Honchar](https://www.vitaliihonchar.com/insights/youtube-shorts-creator)
- [AI-Youtube-Shorts-Generator | GitHub](https://github.com/SamurAIGPT/AI-Youtube-Shorts-Generator)
- [Faceless Shorts Generator | GitHub](https://github.com/SaarD00/AI-Youtube-Shorts-Generator)
- [Post Bridge - AI Agent Social Media API](https://www.post-bridge.com/agents)
- [Social Media MCP | Postiz](https://postiz.com/blog/social-media-mcp)
- [Claude Code Content Repurposing | Stormy AI](https://stormy.ai/blog/claude-code-content-repurposing-distribution-guide)
- [Crosspost MCP for Claude](https://humanwhocodes.com/blog/2025/04/post-social-media-claude-crosspost/)
- [Claude Code Twitter Posting Workaround | Medium](https://medium.com/@CodeCoup/claude-code-twitter-posting-the-workaround-that-works-e5f49d0896c7)
- [X API Pricing 2026 | Zernio](https://zernio.com/blog/twitter-api-pricing)
- [X API Rate Limits Free Tier | X Developers](https://devcommunity.x.com/t/what-are-the-rate-limits-for-media-upload-when-used-with-twitter-api-v2-free-tier/245725)
- [ElevenLabs Pricing](https://elevenlabs.io/pricing)
- [Kling AI Pricing 2026](https://aitoolanalysis.com/kling-ai-pricing/)
- [Best Faceless Video Creation Tools 2026 | Clippie](https://clippie.ai/blog/best-faceless-video-creation-tools-2026)
- [Upload-Post (Blotato Alternative)](https://www.upload-post.com/blotato-alternative/)
- [Late - Social Media API](https://getlate.dev/blog/blotato-alternative)
- [Best Social Media Automation APIs | Medium](https://medium.com/coinmonks/7-best-social-media-automation-apis-compared-features-pros-cons-fe2c05a6446a)
- [Blotato](https://www.blotato.com/)
