---
STATUS: ACTIVE
LAST_UPDATED: 2026-04-07
PURPOSE: 開発ロードマップ・進捗管理
RELATED: nolla_mvp_design_spec_v3.md,nolla_ia_design_v3.md,nolla_nci_algorithm_design.md
---

# Nolla MVP 開発ロードマップ

**最終更新**: 2026-04-06
**更新者**: Claude（開発リード）
**参照仕様**: outputs/nolla_ia_design_v3.md, outputs/nolla_mvp_design_spec_v3.md
**必読**: outputs/nolla_nci_algorithm_design.md（NCIスコアリングシステム）— データ設計・適応型難度調整・保護者画面の設計前に必ず読むこと

---

## 現在地: Phase 1 コア実装 DONE → 全ゲームデバッグ完了 → Phase 2へ

```
Phase 0: 設計 ............................ DONE（0-A〜0-D 全完了）
Phase 1: コア実装 ........................ DONE
  1-A. プロジェクト基盤 .................. DONE
    1-A-1. Next.js 15 再初期化 ........... DONE（2026-04-06）
    1-A-2. デザインシステム構築 ........... DONE（2026-04-06）
    1-A-3. Supabaseスキーマ作成 ........... DONE（2026-04-06）
    1-A-4. 認証フロー .................... DONE（2026-04-06）— Supabase SSR + middleware + OAuth + email
    1-A-5. テスト環境 .................... DONE（2026-04-06）
  1-D（部分）エンジン類 .................. DONE（ターミナルB並行）
    1-D-5. Staircaseエンジン .............. DONE — 29テスト pass、カバレッジ94%+
    1-D-6. NCI計算エンジン ............... DONE — 25テスト pass、カバレッジ100%
    1-D-7. TypeScript型定義 .............. DONE — domain/user/scoring
    1-D-8. ゲームコンテンツ生成 .......... DONE — 4ゲーム31テスト pass
    1-D-9. セッション管理サービス ........ DONE — session-state/anomaly/motor-baseline 21テスト pass
  1-B. 初回起動フロー .................... DONE（2026-04-06）— S1〜S6全画面、29テスト
  1-C. メイン画面 ........................ DONE（2026-04-06）— M1カルーセル+M3チュートリアル+M4ゲームフレーム
  1-D. 4ゲーム実装 ....................... DONE（2026-04-06）— 全4ゲームUI+共通フィードバック+エラーレス学習
  1-E. 報酬系 ............................ DONE（2026-04-06）— R1演出+R2マイルーム+star-calc+shop+actions
  1-F. 親向け画面 ........................ DONE（2026-04-06）— P1-P5全5画面+layout+queries
  1-G. 共通UI ............................ DONE（2026-04-06）— U1休憩提案
Phase 2: コンテンツ + AI ................. NOT STARTED
Phase 3: データ + 磨き込み ............... NOT STARTED
```

### 確定済み設計方針（2026-04-05）
1. **保護者スコア**: 絶対評価（θのみ）。混合スコア廃止。見せ方でネガティブ回避
2. **循環依存**: 1つのθで測定・調整両方。bの初期値を保守的に設定
3. **DDM**: MVP簡易版（RT-運動ベースライン）。Phase 1でフルモデル。データは初日から全保存
4. **4軸独立性**: MVPは独立推定。軸間相関補正はPhase 2
5. **ベースライン期間**: NCI非表示。ゲーム結果・成績表示はOK
6. **パラメータ上限拡張**: 神経衰弱24ペア、視覚探索25アイテム/7違い。レベルMax=定型発達レベル

### 次のアクション
1. **1-C**: メイン画面（M1カルーセル、M3チュートリアル、M4ゲームフレーム）
2. **1-D（残り）**: 4ゲームのUI実装（生成ロジック+Staircaseは完了済み）

**方針変更（2026-04-05）**: ビジュアルデザイン（建物画像・モック）は後回し。
見た目はCSS/画像差し替えで後から簡単に変えられるが、操作方式・ゲームロジック・画面構造は後から変えるとコスト大。
よって中身（ゲームメカニクス・UX・データ設計）を先に固める。

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

### 0-B. デザイン方向性の確定 [IN PROGRESS]

#### 0-B-1. 建物デザインスタイル決定 [IN PROGRESS — 停止中]

**状況**: Minecraft + どうぶつの森 + Duolingo ABCの3つをミックスした世界観で方向性を探索中。最終決定はまだ。

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

**直前の作業**: v4d_castle_bgの雲を減らす微調整 → 中止済み

**次のアクション（決定待ち）**:
- [ ] 建物デザインスタイルの最終決定（Yuya判断）
- [ ] 決定したスタイルで4建物の背景画像を生成

#### 0-B-2. 全建物の背景画像生成 [NOT STARTED]

0-B-1のスタイル確定後に開始。確定4ゲームの建物:

| 位置 | 建物 | ゲーム | 背景色調 | 画像 | 状態 |
|------|------|--------|---------|------|------|
| 1 | カードスート城 | 神経衰弱・メモリマッチング（ワーキングメモリ） | 青紫夕暮れ | - | NOT STARTED |
| 2 | ソーティング小屋 | 分類ソーティング（認知的柔軟性+抑制制御） | 暖色オレンジ | - | NOT STARTED |
| 3 | 虫めがねタワー | 視覚探索・間違い探し型（選択的注意） | 緑晴天 | - | NOT STARTED |
| 4 | 光るグリッド塔 | Corsi Block・光るブロック記憶（空間ワーキングメモリ） | ネイビー星空 | - | NOT STARTED |

**Phase 2で追加予定**: ことば/おはなし用の建物（未定）

#### 0-B-3. ゲーム選択画面（M1）モック [NOT STARTED]

確定した建物画像を使って、ホームカルーセル画面のHTMLモックを作成。

#### 0-B-4. 各画面のHTMLモック作成 [NOT STARTED]

M1のデザインが固まった後、世界観を統一して全画面のモックを作成。
既存のs1〜p5のHTMLモックはデザイン品質が基準未達のため、全てやり直し。

| カテゴリ | 画面数 | 状態 |
|---------|-------|------|
| 初回起動（S1〜S5） | 5 | やり直し必要 |
| メイン（M1, M3, M4） | 3 | やり直し必要 |
| 報酬（R1, R2） | 2 | やり直し必要 |
| 共通UI（U1, U2） | 2 | やり直し必要 |
| 親向け（P1〜P5） | 5 | やり直し必要 |

#### 0-B-5. 画面遷移フロー確認 [NOT STARTED]

全画面モック完成後、S1→S5→M1→M4→R1の一連のフローを通しで確認。

### 0-C. モック全体レビュー・承認 [NOT STARTED]

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
| 1 | S1 スプラッシュ画面 | NOT STARTED | ロゴ+ナビキャラアニメ（3秒） |
| 2 | S2 アカウント作成 | NOT STARTED | Supabase Auth連携 |
| 3 | S3-a〜S3-d アセスメントフロー | NOT STARTED | 1画面1質問、プログレスバー |
| 4 | S4 同意取得 | NOT STARTED | |
| 5 | S5 端末引き渡し | NOT STARTED | 横向き図解 |
| 6 | S6 音声認識ON/OFF | NOT STARTED | |

### 1-C. メイン画面（M1, M3, M4）

| # | タスク | 状態 | 備考 |
|---|--------|------|------|
| 1 | M1 ホーム画面（カルーセル） | NOT STARTED | 矢印+スワイプ両対応。建物はCSS/SVGで仮実装 |
| 2 | M3 チュートリアル（文字なし） | NOT STARTED | 4段階プロンプティング削減法 |
| 3 | M4 ゲームプレイ共通フレーム | NOT STARTED | ヘッダー/フッター/ナビキャラ |

### 1-D. 4ゲーム実装

| # | タスク | 状態 | 備考 |
|---|--------|------|------|
| 1 | 神経衰弱（Memory Match） | NOT STARTED | 0-D-1/0-D-2準拠 |
| 2 | 分類ソーティング（Sorting） | NOT STARTED | 前提能力チェック連動 |
| 3 | 視覚探索（Visual Search） | NOT STARTED | SVG自動生成（Band A-C） |
| 4 | Corsi Block | NOT STARTED | 不規則配置生成 |
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
| 3 | ブランク復帰処理 | NOT STARTED | 14日以上で反転カウンタリセット |
| 4 | レスポンシブ対応 | DONE | iPhone横向き(max-height:500px)+大画面(min-width:1400px)+タッチターゲット維持 |
| 5 | E2Eテスト | DONE | critical-flow.spec.ts(8テスト)+responsive.spec.ts(5テスト) Playwright iPad Landscape |
| 6 | デプロイ準備 | DONE | PWA(manifest.json+sw.js+アイコン)+next.config.ts(セキュリティヘッダー)+.env.example+.gitignore+README.md |

---

## Phase 2: コンテンツ + AI [NOT STARTED]

（Phase 1完了後に詳細化）

**将来検討メモ**: 世界観テーマ選択機能（初期設定時に選択、以降固定。PIN認証で変更可）

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
| 2026-04-07 | 設計ルール仕分け | `nolla_design_rules_asd_research.md`を`_archive/`へ移動(現運用と矛盾する旧厳格ルール多数)、`.claude/rules/common/nolla-mvp-design.md`の「絶対禁止事項」を「設計境界(必ず守る)+運用目安(状況で判断)」の2階層に再構成、白背景/6個以上情報/100%ゲージを緩和、蛍光色表現を「彩度の高い色は小面積・短時間アクセントに限定」に変更、`nolla_game_implementation_guide.md`も同様に再構成、INDEX.mdから旧ファイル削除 |
