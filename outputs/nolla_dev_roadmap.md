---
STATUS: ACTIVE
LAST_UPDATED: 2026-04-10
PURPOSE: 開発ロードマップ・進捗管理
RELATED: nolla_mvp_design_spec_v3.md,nolla_ia_design_v3.md,nolla_nci_algorithm_design.md
---

# Nolla MVP 開発ロードマップ

**最終更新**: 2026-04-10
**更新者**: Claude（開発リード）
**参照仕様**: outputs/nolla_ia_design_v3.md, outputs/nolla_mvp_design_spec_v3.md
**必読**: outputs/nolla_nci_algorithm_design.md（NCIスコアリングシステム）— データ設計・適応型難度調整・保護者画面の設計前に必ず読むこと

---

## 現在地: Phase 1 残作業（1-H/1-I UI）→ Phase 2へ

```
Phase 0: 設計 ............................ DONE（0-A〜0-D 全完了）
Phase 1: コア実装 ........................ DONE（1-H/1-I UI残作業あり）
  1-A. プロジェクト基盤 .................. DONE
  1-B. 初回起動フロー .................... DONE — S1〜S6全画面
  1-C. メイン画面 ........................ DONE — M1カルーセル+M3チュートリアル+M4ゲームフレーム
  1-D. 4ゲーム実装+エンジン .............. DONE — 全4ゲームUI+Staircase+NCI+コンテンツ生成+セッション管理
  1-E. 報酬系 ............................ DONE — R1演出+R2マイルーム+star-calc+shop+actions
  1-F. 親向け画面 ........................ DONE — P1-P5全5画面+layout+queries
  1-G. 共通UI ............................ DONE — U1休憩提案+オフライン+E2E
  1-H. AACミニ ........................... IN PROGRESS — ロジック層DONE、UI未着手
  1-I. 音声模倣ミニ ...................... IN PROGRESS — ロジック層DONE、UI未着手
  1-J. Galaxy惑星テーマ反映 .............. DONE（2026-04-10）— 設計書+コード全反映、ビルド+521テスト合格
Phase 2: コンテンツ + AI ................. NOT STARTED（詳細タスク分解済み: 2-A〜2-E）
Phase 3: データ + 磨き込み ............... NOT STARTED
```

### 確定済み設計方針（2026-04-05）
1. **保護者スコア**: 絶対評価（θのみ）。混合スコア廃止。見せ方でネガティブ回避
2. **循環依存**: 1つのθで測定・調整両方。bの初期値を保守的に設定
3. **DDM**: MVP簡易版（RT-運動ベースライン）。Phase 1でフルモデル。データは初日から全保存
4. **4軸独立性**: MVPは独立推定。軸間相関補正はPhase 2
5. **ベースライン期間**: NCI非表示。ゲーム結果・成績表示はOK
6. **パラメータ上限拡張**: 神経衰弱24ペア、視覚探索25アイテム/7違い。レベルMax=定型発達レベル

### 次のアクション（2026-04-10更新）

Phase 1 コア実装は全項目DONE。デザイン方向性確定。設計ドキュメント更新DONE。

1. ~~**設計ドキュメント更新**~~ — DONE（2026-04-10）。design_direction, color_regulation, stage_bg_rulesをGalaxy惑星テーマに改訂。v4d_building_design_rulesは_archive/へ移動
2. **実装コードへのビジュアル反映（Phase 1-J）** — buildings.ts→planets.ts, globals.css, carousel.tsx, game-frame.tsxの更新 + 惑星画像配置。下記1-Jセクション参照
3. ~~**Phase 2 詳細タスク分解**~~ — DONE（2026-04-10）。下記Phase 2セクション参照

**デザイン確定事項（2026-04-10）**:
- 世界観: Mario Galaxy Movie風の宇宙テーマ（明るく鮮やか、暗すぎない）
- ゲーム選択: 建物→球体惑星（星）に変更。各星がゲーム内容を反映したユニークなデザイン
- ホーム: カルーセルで惑星を切り替え
- 遷移: ワープアニメーション（黒背景+星が高速で流れる、1.2秒）
- ゲーム中背景: シンプルなCSSグラデーション（惑星テーマカラー）
- UIアイコン: 星雲オーブ型（紫〜シアンの半透明球体）
- 全画面モック完成済み（outputs/mockups/内、全21画面）

---

## Phase 0: 設計・モック作成

### 0-A. 設計ドキュメント [DONE]

| # | 成果物 | ファイル | 状態 |
|---|--------|---------|------|
| 1 | MVP設計仕様書 v3 | `outputs/nolla_mvp_design_spec_v3.md` | DONE |
| 2 | IA設計 v3（全21画面定義） | `outputs/nolla_ia_design_v3.md` | DONE |
| 3 | カラー規定 | `outputs/nolla_color_regulation.md` | DONE |
| 4 | デザイン方向性 | `outputs/nolla_design_direction.md` | DONE |
| 5 | ASDリサーチ基盤デザインルール | `outputs/nolla_design_rules_asd_research.md` | DONE |
| 6 | 報酬設計リサーチ | `outputs/nolla_reward_design_research.md` | DONE |
| 7 | ステージ背景構成ルール | `outputs/nolla_stage_bg_composition_rules.md` | DONE |
| 8 | ビルディングデザインルール | `outputs/nolla_v4d_building_design_rules.md` | DONE |
| 9 | 視空間認知訓練リサーチ | `outputs/nolla_visuospatial_cognition_research.md` | DONE ✓ |

**注**: 9番目の視空間認知訓練リサーチは、Phase 1（コア実装）の基盤となるゲームメカニクス設計を支援。ASD+知的障害児（IQ 35-85）向けの9つのRCT検証済みゲーム、実装ガイドライン、IQ別仕様を含む。Phase 1開始前に実装チームが精読すること。

### 0-B. デザイン方向性の確定 [DONE]

#### 0-B-1. デザインスタイル決定 [DONE — 2026-04-10確定]

**確定**: Mario Galaxy Movie風の宇宙×球体惑星テーマ。MC+AC+Duo路線は不採用。

**確定した方向性**:
- 建物→球体惑星（星）に変更
- 各惑星がゲーム内容を直接反映したデザイン
- 背景: 明るいシアンブルー〜ラベンダー〜ピンクのグラデーション宇宙
- UIアイコン: 星雲オーブ型（半透明球体に光のシルエット）
- ワープ遷移: 黒背景+星が放射状に高速で流れる（1.2秒）
- 分析・プロンプト全記録: `outputs/nolla_mario_galaxy_style_analysis.md`

**旧探索履歴（参考のみ）**:

**これまでの探索履歴**:

| シリーズ | 内容 | 判定 |
|---------|------|------|
| v3_ac / v3_mc | 初期デザイン探索（AC風/MC風） | 不採用（v4dに進化） |
| v4 | MC+ACミックス第1弾 | 部分採用 → v4dに進化 |
| v4_duo | Duo ABC互換スタイル | 不採用（複雑すぎ） |
| v4d | MCブロック + ACパステル融合（5ゲーム分） | **現在の最有力候補** |
| v5 | ゲーム個別背景（3ゲーム） | 素材として保管 |
| v6 | カルーセルステージUI | UI構造として採用候補 |
| v10 | 追加建物画像（城・塔・宮殿等） | スタイル探索中 |

**生成済み建物画像（`outputs/mockups/`内）**:

| ファイル | 内容 | 用途 |
|---------|------|------|
| v4d_castle_bg.png | 城の背景 | スタイル検討 |
| v4d_kotoba_bg.png | ことば建物背景 | スタイル検討 |
| v4d_oboete_bg.png | おぼえて建物背景 | スタイル検討 |
| v4d_planetarium_bg.png | プラネタリウム背景 | スタイル検討 |
| v4d_radiotower_bg.png | ラジオタワー背景 | スタイル検討 |
| v10_cathedral_fantasy.png | 大聖堂ファンタジー | スタイル検討 |
| v10_kinkakuji.png | 金閣寺風 | スタイル検討 |
| v10_pagoda_fantasy.png | 五重塔ファンタジー | スタイル検討 |
| v10_palace_fantasy.png | 宮殿ファンタジー | スタイル検討 |
| v10_sagrada_familia.png | サグラダファミリア風 | スタイル検討 |
| v10_taj_mahal.png | タージマハル風 | スタイル検討 |

#### 0-B-2. 惑星画像生成 [DONE — 2026-04-10]

確定4ゲームの惑星（背景+惑星の合成画像、JPG）:

| # | 惑星 | ゲーム | 画像 | 状態 |
|---|------|--------|------|------|
| 1 | カード星（クリスタルガーデン+カードアート） | 神経衰弱 | planet_memory_match.jpg | DONE |
| 2 | いろわけ星（4バイオーム：砂漠/水都/火山/森林） | 分類ソーティング | planet_sorting.jpg | DONE |
| 3 | さがし星（シンメトリー緑地） | 視覚探索 | planet_visual_search.jpg | DONE |
| 4 | ひかり星（夜の街+光るブロック） | Corsi Block | planet_corsi_block.jpg | DONE |

素材格納先: `outputs/mockups/Planet/Planet and galaxy/`

#### 0-B-3. 全画面HTMLモック [DONE — 2026-04-10]

| ファイル | 画面 | 状態 |
|---------|------|------|
| s1_splash.html | S1 スプラッシュ | DONE |
| s2_auth.html | S2 アカウント作成 | DONE |
| s3_assessment.html | S3-S5 アセスメント+同意+引渡し | DONE |
| m1_galaxy_carousel.html | M1 ホームカルーセル | DONE |
| m4_memory_match.html | M4 神経衰弱 | DONE（実装と整合確認済み） |
| m4_sorting.html | M4 仲間分け | DONE（3選択肢、実装と整合確認済み） |
| m4_visual_search.html | M4 間違い探し | DONE（実装と整合確認済み） |
| m4_corsi_block.html | M4 Corsi Block | DONE（エラーレス+位置ランダム化、実装と整合確認済み） |
| r1_reward.html | R1 報酬演出 | DONE |
| r2_myroom.html | R2 マイルーム（3タブ） | DONE |
| p1_pin.html | P1 PIN認証 | DONE |
| p2_dashboard.html | P2-P5 親向け（4タブ統合） | DONE |

追加素材: arrow_left/right.png, star_reward.png, btn_replay/myroom.png, tab_room/shop/collection.png, item_rocket/flower/globe/lamp.png

#### 0-B-4. 画面遷移フロー [DONE — 2026-04-10]

全画面がHTML内のリンクで遷移可能。確認済みフロー:
- S1→S2→S3-S5→M1→(ワープ)→M4→R1→R2/M1
- M1→P1→P2-P5

### 0-C. モック全体レビュー・承認 [DONE — 2026-04-10]

Yuya承認済み。Galaxy惑星テーマで確定。

**完了条件**: Yuyaが全画面のモックを確認し「OK、コード実装に進んでいい」と承認

---

## Phase 1: コア実装（ビジュアルは後から載せる。UI/UX Pro Max活用でCSS/アニメーションのみで見栄え確保）

### 1-A. プロジェクト基盤

| # | タスク | 状態 | 備考 |
|---|--------|------|------|
| 1 | Next.js 15 + TypeScript + Tailwind v4 再初期化 | DONE | 既存app/を再利用。src/クリーンアップ、フォルダ構成再構築。横向き固定対応 |
| 2 | デザインシステム構築（カラー・フォント・スペーシング） | DONE | nolla_color_regulation.md全色をCSS変数化。MC素材色・建物テーマ色・フィードバック色・タッチターゲット・アニメーション定義 |
| 3 | Supabaseスキーマ作成（0-D-3準拠） | DONE | 3マイグレーション: 認証ユーザー系→ゲームプレイ系→NCI/センサー/報酬系。12テーブル+RLS+CHECK制約+インデックス |
| 4 | 認証フロー（Supabase Auth） | DONE | Supabase SSR（browser/server/middleware）+ OAuth（Apple/Google）+ email signup/signin + ルート保護 |
| 5 | テスト環境（Playwright + Vitest） | DONE | Vitest + happy-dom + @testing-library/react + Playwright。カバレッジ80%閾値設定済み |

### 1-B. 初回起動フロー（S1〜S6）

| # | タスク | 状態 | 備考 |
|---|--------|------|------|
| 1 | S1 スプラッシュ画面 | DONE | src/app/page.tsx、ロゴ+フェードイン3秒 |
| 2 | S2 アカウント作成 | DONE | Supabase Auth連携（src/app/auth/） |
| 3 | S3-a〜S3-d アセスメントフロー | DONE | onboarding/assessment/steps 9ステップ |
| 4 | S4 同意取得 | DONE | step-consent.tsx |
| 5 | S5 端末引き渡し | DONE | step-handover.tsx |
| 6 | S6 音声認識ON/OFF | DONE | step-voice-setting.tsx |

### 1-C. メイン画面（M1, M3, M4）

| # | タスク | 状態 | 備考 |
|---|--------|------|------|
| 1 | M1 ホーム画面（カルーセル） | DONE | src/app/home/carousel.tsx、4建物カルーセル |
| 2 | M3 チュートリアル（文字なし） | DONE | src/components/game/tutorial-overlay.tsx、4段階プロンプティング削減法 |
| 3 | M4 ゲームプレイ共通フレーム | DONE | src/app/game/[gameType]/game-session.tsx |

### 1-D. 4ゲーム実装

| # | タスク | 状態 | 備考 |
|---|--------|------|------|
| 1 | 神経衰弱（Memory Match） | DONE | src/components/game/memory-match/ |
| 2 | 分類ソーティング（Sorting） | DONE | src/components/game/sorting/ |
| 3 | 視覚探索（Visual Search） | DONE | src/components/game/visual-search/ |
| 4 | Corsi Block | DONE | src/components/game/corsi-block/ |
| 5 | Staircaseエンジン（共通） | DONE | 0-D-2の共通ロジック。純粋関数。29テストpass。カバレッジ94%+ |
| 6 | NCI計算エンジン（共通） | DONE | 0-D-5のIRT 2PL+ベイズ更新+DDM簡易版。25テストpass。カバレッジ100% |
| 7 | TypeScript型定義 | DONE | domain.ts/user.ts/scoring.ts。0-D-3準拠。readonly付きドメイン型 |
| 8 | ゲームコンテンツ生成 | DONE | 4ゲームのボード/シーン/レイアウト生成。31テストpass。グリッド自動算出・不規則配置・シャッフル |
| 9 | セッション管理サービス | DONE | session-state(状態マシン)/anomaly(異常検出)/motor-baseline(運動ベースライン)。21テストpass |

### 1-E. 報酬系（R1, R2）

| # | タスク | 状態 | 備考 |
|---|--------|------|------|
| 1 | R1 報酬演出画面 | DONE | 3フェーズ(スターカウントアップ→選択肢)。アイコンのみ・文字なし。振動対応 |
| 2 | R2 マイルーム統合画面 | DONE | おへや/ショップ/ずかんの3タブ。タップ反応アニメ。MC風UI |
| 3 | 報酬ロジック | DONE | star-calc.ts(12テストpass)+shop-items.ts(15アイテム)+actions.ts(購入/配置/削除) |

### 1-F. 親向け画面（P1〜P5）

| # | タスク | 状態 | 備考 |
|---|--------|------|------|
| 1 | P1 PIN認証 | DONE | 4桁PIN入力/設定/確認フロー、ドットUI、数字キーパッド |
| 2 | P2 今日の記録 | DONE | プレイ時間・ゲーム回数・スター・ゲーム別正答率 |
| 3 | P3 成長の記録 | DONE | ベースライン未/確立/NCI表示の3段階UI |
| 4 | P4 AI療育サポート | DONE | MVP: 「まもなく登場」プレースホルダー |
| 5 | P5 設定 | DONE | プロフィール完了率(10項目)+チェックリスト+サインアウト |
| 6 | 共通レイアウト | DONE | タブバー4タブ+ヘッダー+子ども画面戻りボタン |
| 7 | データ取得ロジック | DONE | queries.ts(Supabase)+profile-completion.ts(純粋関数、9テストpass) |

### 1-G. 共通UI + エッジケース

| # | タスク | 状態 | 備考 |
|---|--------|------|------|
| 1 | U1 休憩提案画面 | DONE | 夜空+月のビジュアル。アイコ���のみ2ボタン。提案型（強制ロックなし） |
| 2 | オフライン対応 | DONE | use-offline.ts(フック)+queue.ts(イミュータブルキュー6テスト)+storage.ts(localStorage)+offline-banner.tsx |
| 3 | ブランク復帰処理 | DONE | src/lib/session/blank-return.ts（14日以上で反転カウンタリセット） |
| 4 | レスポンシブ対応 | DONE | iPhone横向き(max-height:500px)+大画面(min-width:1400px)+タッチターゲット維持 |
| 5 | E2Eテスト | DONE | critical-flow.spec.ts(8テスト)+responsive.spec.ts(5テスト) Playwright iPad Landscape |
| 6 | デプロイ準備 | DONE | PWA(manifest.json+sw.js+アイコン)+next.config.ts(セキュリティヘッダー)+.env.example+.gitignore+README.md |

### 1-J. Galaxy惑星テーマ ビジュアル反映 [DONE — 2026-04-10]

| # | タスク | 状態 | 影響ファイル | 備考 |
|---|--------|------|------------|------|
| 1 | globals.css: Galaxy色体系に置換 | DONE | app/src/app/globals.css | 5レイヤー宇宙カラー。btn-mc→半透明ダーク+グロウ。parent-screen override追加 |
| 2 | planets.ts 新規作成 + buildings.ts re-export | DONE | app/src/lib/planets.ts, buildings.ts | Planet型(+nebulaColor/accentGlow/atmosphereColor)。旧buildings.tsはre-export互換 |
| 3 | carousel.tsx: PlanetVisual + ワープ遷移 | DONE | app/src/app/home/carousel.tsx | CSS球体+アトモスフィアリング+星フィールド+ネビュラ雲。ワープ遷移(放射状星ストリーク1.2秒) |
| 4 | game-frame.tsx: 宇宙背景+惑星地面 | DONE | app/src/components/game/game-frame.tsx | radial-gradientネビュラ+星フィールド+地面グラデーション+湾曲地平線 |
| 5 | スプラッシュ/オンボーディング/マイルーム背景 | DONE | page.tsx, onboarding/page.tsx, room-tab.tsx | 全てGalaxy宇宙背景に統一 |
| 6 | 親向け画面: parent-screen クラス | DONE | (parent)/layout.tsx, globals.css | 白背景+glass-overlay光版でMC→Galaxy影響を遮断 |

ビルド成功、521テスト全パス（2026-04-10）

---

### 1-H. AACミニ（発語なし向け、5-7日） [IN PROGRESS — ロジック層DONE]

| # | タスク | 状態 | 備考 |
|---|--------|------|------|
| 1 | データ構造 | DONE（2026-04-10） | lib/aac/vocabulary.ts: 20語定義（たべもの8/きもち6/どうさ6）、型定義 |
| 1b | 純粋関数層 | DONE（2026-04-10） | lib/aac/selection.ts（カテゴリ/ID検索）, lib/aac/tapHistory.ts（集計）。全テストpass |
| 2 | UI: カード選択画面 | NOT STARTED | 3カテゴリタブ + 6-8個カード/タブ、タップで音声再生、視覚フィードバック（デザイン確定待ち） |
| 3 | UI: ステージ管理 | NOT STARTED | Stage 1のみ実装（1シンボルタップ → 音声出力） |
| 4 | 音声出力: Web Speech API | DONE（2026-04-10） | lib/aac/speech.ts: SpeechSynthesizer抽象+WebSpeechSynthesizer+Mock、20テストpass |
| 5 | DBマイグレーション | DONE（2026-04-10） | 20260410000001_create_st_mini_tables.sql: aac_taps テーブル+RLS |
| 6 | Repository層（Supabase I/O） | NOT STARTED | saveAacTap/getAacTapsByChild等。UI実装と同時に |
| 7 | テスト + 実機検証 | NOT STARTED | Playwright E2E（カード選択フロー、音声再生） |

### 1-I. 音声模倣ミニ（母音練習、3-5日） [IN PROGRESS — ロジック層DONE]

| # | タスク | 状態 | 備考 |
|---|--------|------|------|
| 1 | データ構造 + 状態機械 | DONE（2026-04-10） | lib/vowel/stateMachine.ts: 5母音（あいうえお）ステートマシン、22テストpass |
| 1b | 画像素材 | NOT STARTED | 静止画5パターン、AI生成→リファレンスサイト参照（デザイン確定待ち） |
| 2 | UI: 母音選択 + 実行画面 | NOT STARTED | 母音ボタン表示、対応画像表示、親タップボタン |
| 3 | 親タップ方式 | NOT STARTED | 音声認識なし。親がお手本再生 → 子どもが模倣 → 親がタップ判定 |
| 4 | フィードバック | NOT STARTED | 正解: スター獲得アニメ。不正解: サイレント再提示 |
| 5 | DBマイグレーション | DONE（2026-04-10） | 20260410000001_create_st_mini_tables.sql: vowel_attempts テーブル+RLS |
| 6 | Repository層（Supabase I/O） | NOT STARTED | saveVowelAttempt等。UI実装と同時に |
| 7 | テスト + 実機検証 | NOT STARTED | Playwright（親タップフロー、スター獲得確認） |

---

## Phase 2: コンテンツ + AI [NOT STARTED]

Phase 1のコア実装（4ゲーム+報酬+親画面）は完了。Phase 2はコンテンツの拡充とAI機能の導入。

### 前提条件
- Phase 1-J（Galaxy惑星テーマのビジュアル反映）が完了していること
- Phase 1-H/1-I（AAC/母音ミニのUI）が完了していること

### 2-A. コンテンツ拡充

| # | タスク | 状態 | 備考 |
|---|--------|------|------|
| 1 | ゲームコンテンツバリエーション追加 | NOT STARTED | 神経衰弱のカードアイコンセット追加（現在1セット→5セット）、分類のカテゴリセット追加、視覚探索のシーンセット追加 |
| 2 | 報酬アイテム拡充 | NOT STARTED | shop-items.ts: 15アイテム→50アイテム。カテゴリ: 家具/壁紙/ペット/乗り物。惑星テーマ連動アイテム |
| 3 | マイルーム壁紙・床セット | NOT STARTED | 各惑星テーマの壁紙（4種）+ 共通壁紙（6種）= 10種 |
| 4 | アチーブメント/図鑑システム | NOT STARTED | プレイ回数・パーフェクトクリア等でバッジ解放。図鑑UI |
| 5 | BGM・効果音セット | NOT STARTED | 宇宙テーマの穏やかなBGM（ホーム/ゲーム中/報酬）+ 効果音（タップ/正解/星獲得/ワープ） |

### 2-B. AI機能（親向け）

| # | タスク | 状態 | 備考 |
|---|--------|------|------|
| 1 | P4 AI療育サポート実装 | NOT STARTED | 現在プレースホルダー。Claude API連携。プレイデータに基づく個別アドバイス |
| 2 | AIガードレール実装 | NOT STARTED | nolla_ai_agent_guardrails_v1.md準拠。プロンプトテンプレート/ハルシネーション防止/エスカレーション |
| 3 | 週次サマリー自動生成 | NOT STARTED | 1週間のプレイデータを要約し、成長ポイント/推奨活動を提示 |
| 4 | 困りごと相談チャット | NOT STARTED | 保護者が自由文で相談→AIが回答。医療アドバイスへのガードレール必須 |

### 2-C. データ連携・分析

| # | タスク | 状態 | 備考 |
|---|--------|------|------|
| 1 | NCI表示の本実装 | NOT STARTED | ベースライン確立後のNCI値を成長グラフとして表示。P3画面更新 |
| 2 | 4軸間相関補正 | NOT STARTED | MVP独立推定→軸間相関を考慮した推定に拡張 |
| 3 | プレイデータエクスポート | NOT STARTED | 保護者がCSV/PDFでデータをダウンロードできる機能 |
| 4 | 施設向けダッシュボード（基盤） | NOT STARTED | 複数児童のデータ一覧。ToB展開の基盤 |

### 2-D. UX磨き込み

| # | タスク | 状態 | 備考 |
|---|--------|------|------|
| 1 | チュートリアル動画/アニメーション | NOT STARTED | 各ゲームの初回プレイ時にアニメーションで操作説明。文字なし |
| 2 | ナビキャラ本実装 | NOT STARTED | デザイン確定後。ホーム画面/褒めフィードバック/休憩提案に登場 |
| 3 | アニメーション品質向上 | NOT STARTED | Framer Motion導入。遷移/フィードバック/パーティクルの品質向上 |
| 4 | 音声認識ON時のフロー | NOT STARTED | Web Speech API連携。ことばゲーム（Phase 2追加ゲーム）で使用 |
| 5 | 多言語対応基盤 | NOT STARTED | i18n設計。日本語→英語の準備。UIテキストは親向けのみ |

### 2-E. 追加ゲーム（Phase 2拡張）

| # | タスク | 状態 | 備考 |
|---|--------|------|------|
| 1 | ことば星（語彙ゲーム） | NOT STARTED | AAC Miniの拡張版。シンボルカード→音声マッチング。Phase 1-Hの土台を活用 |
| 2 | おはなし星（ストーリーゲーム） | NOT STARTED | シンプルな3コマシーケンス。因果関係・時系列の理解 |

**将来検討メモ**: 世界観テーマ選択機能（初期設定時に選択、以降固定。PIN認証で変更可）

### Phase 2 完了条件
- 報酬アイテム50種以上
- AI療育サポートが動作し、ガードレールが機能
- NCI成長グラフが表示される
- BGM/効果音が全画面で適切に再生
- チュートリアルアニメーションが全ゲームに存在

---

## Phase 3: データ + 磨き込み [NOT STARTED]

（Phase 2完了後に詳細化）

---

## 変更履歴

| 日付 | 変更内容 | 理由 |
|------|---------|------|
| 2026-04-05 | ロードマップ初版作成 | 進捗管理の厳格化（Yuyaフィードバック） |
| 2026-04-05 | 全面修正: モックを「DONE」→「やり直し中」に訂正 | デザイン品質未達で最初からやり直し中だった。現在地は建物デザインスタイル決定待ち |
| 2026-04-05 | MVP 4ゲーム確定 | 神経衰弱/分類/視覚探索/Corsi Block。エビデンスベースで選定 |
| 2026-04-05 | 難易度設計確定 | ステージ制→レベル制に変更。8-12段階、適応型難度調整 |
| 2026-04-05 | ビジュアル後回し方針 | 見た目は後から変更容易。中身（メカニクス・UX・データ）を先に固める |
| 2026-04-05 | 素材分離方式確定 | 背景/地面/建物を個別生成→プログラム合成。AI画像生成で構図統��は不可能 |
| 2026-04-05 | 建物名を確定4ゲームに更新 | 旧5建物（コテージ/天文台等）→確定4建物（カードスート城/ソーティング小屋/虫めがねタワー/光るグリッド塔）。ことば/おはなしはPhase 2 |
| 2026-04-05 | 0-D-1 ゲームメカニクス設計書DRAFT作成 | 4ゲームの操作方式・画面レイアウト・レベル別パラメータ・エラーレス学習・セッション構造を設計 |
| 2026-04-05 | 0-D-1 v2: 固定レベル制→連続パラメータ制に全面変更 | IQバンド制(6バンド13参照点)導入。IQ範囲21-110。子ども側レベル選択廃止。Corsi不規則配置。基準切替を達成条件制御に変更 |
| 2026-04-05 | 0-D-5 NCI設計書DRAFT作成 | Nolla Cognitive Index: IRT 2PL+DDM+ベイズ更新による認知機能測定システム。保護者/施設向けスコアリング設計 |
| 2026-04-05 | 拡張データソース追加 | タッチダイナミクス(MVP)、デバイスモーション(MVP/Phase1)、環境データ(Phase2)をNCI+ゲームメカニクス設計書に追加 |
| 2026-04-05 | NCI設計5議題確定 | 絶対評価(θのみ)、循環依存対策(1θ+保守的b)、DDM簡易版(MVP)、4軸独立推定(MVP)、混合スコア廃止 |
| 2026-04-05 | 0-D-1/0-D-5 承認 | ゲームメカニクス+NCI設計書をCONFIRMED。パラメータ上限拡張(神経衰弱24ペア、視覚探索25/7) |
| 2026-04-06 | 0-D-2 承認 | 適応型難度調整ロジックCONFIRMED。可変ステップサイズ+IQ帯別N値+初期配置アルゴリズム |
| 2026-04-06 | 0-D-3 承認 | データ設計CONFIRMED。12テーブル+前提能力アセスメント3問+プロフィール完了率方式 |
| 2026-04-06 | 0-D-4 承認 | UXフロー設計CONFIRMED。初回起動・メインループ・報酬・ベースライン期間・エッジケース・トランジション定義 |
| 2026-04-06 | Phase 1-A 開始: 1-A-1, 1-A-2, 1-A-5 完了 | 既存app/再利用でクリーンスタート。デザインシステム（全色CSS変数化）構築。Vitest+happy-dom+Playwright設定。ビルド成功確認 |
| 2026-04-06 | 1-A-3 Supabaseスキーマ完了 | 3マイグレーション（認証/ゲームプレイ/NCI・センサー・報酬）。12テーブル+RLS+CHECK制約+updated_atトリガー。0-D-3設計書完全準拠 |
| 2026-04-06 | 1-D-5,6,7 完了: 型定義+Staircase+NCI | TypeScript型定義（domain/user/scoring）、Staircaseエンジン（可変ステップ+IQ帯��N+4ゲーム調整+クランプ）、NCI計算エンジン（IRT 2PL+ベイズ更新+DDM簡易版+b算出+4軸統合）。全97テストpass。カバレッジ95%+ |
| 2026-04-06 | 1-A-4 認証フロー完了 | Supabase SSR 3クライアント（browser/server/middleware）、OAuth（Apple/Google）、email signup/signin、ミドルウェアでルート保護、コールバックRoute。ビルド成功 |
| 2026-04-10 | ST Mini Phase 1追加決定 | AAC Mini（20語/3カテゴリ/Stage1）+母音模倣ミニ（あいうえお5音/親タップ方式）をPhase 2→Phase 1前倒し。「育つアプリ」としての保護者アピール。設計書v3・IA v3・AAC語彙データ作成 |
| 2026-04-10 | 1-H/1-I ロジック層 DONE | lib/aac/（vocabulary/selection/tapHistory/speech）、lib/vowel/stateMachine、マイグレーション20260410000001（aac_taps/vowel_attempts+RLS）。全521テストpass。UI層はデザイン確定後 |
| 2026-04-10 | staircase.test.ts 既存型エラー修正 | DifficultyParams union型の11箇所を (x as XxxParams).field パターンで修正。同ファイル内の既存パターンに統一。本体コード無変更、49/49テストpass、全521テスト回帰なし |
| 2026-04-06 | Phase 1-A 全完了 | プロジェクト基盤5タスク全てDONE。次は1-B（初回起動フロー） |
| 2026-04-06 | 1-D-8,9 完了: ゲーム生成+セッション管理 | 4ゲームコンテンツ生成（memory-match/sorting/visual-search/corsi-block）+セッション管理（状態マシン/異常検出/運動ベースライン）。全149テストpass。カバレッジ96%+ |
| 2026-04-06 | 1-F 完了: 親向け画面P1-P5 | PIN認証(4桁/設定/照合)、今日の記録(プレイ時間/スター/ゲーム別)、成長の記録(ベースライン3段階UI)、AIサポート(プレースホルダー)、設定(プロフィール完了率10項目+サインアウト)。共通layout(タブバー4タブ)。queries.ts+profile-completion.ts。全187テストpass。ビルド成功 |
| 2026-04-06 | 1-C メイン画面完了 | M1カルーセル（建物動的制御+スター表示+親ロック）、M3チュートリアル骨組み（4段階プロンプティング削減法）、M4ゲームフレーム（共通レイアウト+途中離脱ダイアログ+ナビキャラ） |
| 2026-04-06 | 1-D 4ゲームUI完了 | 神経衰弱（カードグリッド+フリップ+ペアマッチ）、分類（アイテム+カテゴリ箱+進捗）、視覚探索（2シーン並列+差分タップ）、Corsi Block（シーケンス再生+入力）。共通フィードバック+エラーレス学習3段階。全199テストpass |
| 2026-04-06 | 1-E+1-G 完了: 報酬系+共通UI | R1報酬演出(3フェーズ/スターカウントアップ/振動)、R2マイルーム(おへや/ショップ/ずかん3タブ)、U1休憩提案(夜空+月)。star-calc.ts(12テスト)+shop-items.ts(15アイテム)+actions.ts(購入/配置/削除)。全199テストpass。ビルド成功(16ルート) |
| 2026-04-06 | 1-G拡張: E2E+レスポンシブ+オフライン | E2Eテスト(critical-flow 8テスト+responsive 5テスト/Playwright)。レスポンシブCSS(iPhone横向き/大画面)。オフライン対応(use-offline.ts+queue.ts 6テスト+storage.ts+offline-banner.tsx)。全205ユニットテストpass |
| 2026-04-06 | ゲームセッション統合完了 | UI→セッション管理→Staircase難度調整→Supabase永続化を接続。運動ベースライン計測UI。useGameSession hook。persist.ts（6関数: session/round/trial/sessionEnd/motorBaseline/stars）。ビルド成功、205テストpass |
| 2026-04-06 | デプロイ準備完了 | PWA設定(manifest.json landscape固定+sw.js network-first+icon placeholder)。next.config.ts(outputFileTracingRoot+セキュリティヘッダー4種)。README.md(セットアップ+Supabaseマイグレーション手順+Vercelデプロイ手順)。.env.example+.gitignore。205テストpass |
| 2026-04-06 | オフライン+NCI日次+ブランク復帰完了 | オフライン: sync.ts（キュー→Supabase書き込み）+ persist-client.ts（クライアント側キューイング）。NCI: persist-snapshot.ts（日次UPSERT+最新θ取得）。ブランク復帰: 14日検知+Staircaseリセット（6テスト追加、211テストpass） |
| 2026-04-06 | 全ゲームデバッグ+修正完了 | レイアウト崩れ(h-screen→h-full、landscape-content)、文字化け3箇所、オンボーディング全テキスト日本語化、ゲームフロー修正(onRoundCompleteで各ゲームからラウンド完了通知)、ソーティング4問目バグ、視覚探索座標スケーリング。211テストpass |
| 2026-04-06 | UX改善 | motor baseline→ホーム画面ウォームアップに移動(1日1回/スタートボタン)、ソーティング文字なし化(色箱)、スター報酬統一(正解率ベース3/2/1)、神経衰弱スター公平化(探索コスト考慮)、ラウンド表示→ドットインジケーター(文字なし)、ナビキャラMVP非表示、スター累計localStorage保存、間違い探し左右両パネルタップ対応 |
| 2026-04-07 | 難度調整・スコアリング・データ収集の重大バグ修正 | (1)Sorting/VisualSearch/Corsiが`DEFAULT_PARAMS`をハードコードし`currentParams`を完全無視→props経由化+ラウンド毎に再生成。(2)`completeRound`が`roundConsecutiveCorrect`(毎ラウンドリセット)を使用→累積`state.consecutiveCorrect`へ変更、UP/DOWN発火時のみリセット。(3)最終ラウンドのStaircaseが呼ばれていない→`endSession`で最終`completeRound`を実行。(4)`persistSessionStart/Round/Trial/End`関数が定義済みだが**どこからも呼ばれず全データSupabase保存ゼロ**→`useGameSession`から全wire完了。(5)セッション間パラメータ復元なし→localStorage `nolla_last_params_<childId>_<gameType>`で永続化。(6)神経衰弱初期`pairs:3→2`(Jade ND等の重度向け参照値、4枚スタート)、Corsi `seqLength:3→2`。(7)`setState`updater内副作用によるReactエラー修正。Playwright実機検証で`pairs:2→3`への自動上昇を確認。211テストpass、ビルド成功 |
| 2026-04-07 | ドキュメント整理(別エージェント実施) | DEPRECATED 59ファイルを`outputs/_archive/`へ移動(git mv)、ACTIVE 26ファイルに統一YAMLヘッダ追加、`outputs/INDEX.md`新規作成(11カテゴリ+Phase 0必読4ファイル明示)、`CLAUDE.md`に参照ルール追加 |
| 2026-04-10 | ロードマップ実装状態を最新化 | 表の1-B/1-C/1-D/1-G#3 を NOT STARTED→DONE に訂正。実装は2026-04-06時点で完了済みだが表のみ古かった。実コード(src/app/, src/components/game/, src/lib/session/blank-return.ts)で全項目実在確認 |
| 2026-04-10 | 品質監査P1〜P3対応完了 | P1-1: npm audit fix(vite CVE解消)。P1-2: RLS `auth.uid()`→`(select auth.uid())`全16ポリシー書換(初期化プラン問題解消)。P2-1: FKカバリングインデックス13件追加。P2-2: update_updated_at関数 search_path固定。P3-1: Leaked Password Protection有効化(Dashboard)。P3-2: Auth DB接続をPercentage方式に変更(Dashboard)。Supabase advisor全クリーン(残INFOは新規index未使用のみ) |
| 2026-04-10 | 1-J Galaxy惑星テーマ実装反映DONE | globals.css(5レイヤー宇宙カラー+btn-mc Galaxy化+parent-screen override)、planets.ts新規(Planet型+4惑星定義+旧buildings.ts re-export互換)、carousel.tsx(PlanetVisual球体+アトモスフィア+星フィールド+ネビュラ雲+ワープ遷移)、game-frame.tsx(radial-gradientネビュラ+星+惑星地面+湾曲地平線)、splash/onboarding/room-tab背景Galaxy化、(parent)/layout parent-screenクラス。ビルド成功+521テスト全パス |
| 2026-04-10 | 設計ドキュメントGalaxy移行+Phase 2分解 | design_direction/color_regulation/stage_bg_composition_rulesをMario Galaxy惑星テーマに全面改訂。v4d_building_design_rulesを_archive/移動。INDEX.md+CLAUDE.md参照先更新。Phase 2詳細タスク分解(2-A〜2-E: コンテンツ拡充/AI機能/データ連携/UX磨き込み/追加ゲーム)。Phase 1-J(Galaxy実装反映)タスク8件追加 |
| 2026-04-07 | 設計ルール仕分け | `nolla_design_rules_asd_research.md`を`_archive/`へ移動(現運用と矛盾する旧厳格ルール多数)、`.claude/rules/common/nolla-mvp-design.md`の「絶対禁止事項」を「設計境界(必ず守る)+運用目安(状況で判断)」の2階層に再構成、白背景/6個以上情報/100%ゲージを緩和、蛍光色表現を「彩度の高い色は小面積・短時間アクセントに限定」に変更、`nolla_game_implementation_guide.md`も同様に再構成、INDEX.mdから旧ファイル削除 |
