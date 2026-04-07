# Nolla outputs/ ドキュメント整理レポート

**作成日**: 2026-04-05
**目的**: outputs/ 配下のファイルを分類し、矛盾修正の結果を報告

---

## Part A: 矛盾修正の実施結果

### 1. nolla_game_implementation_guide.md — 全面書き換え
- 旧3ゲーム（なかまわけ/おぼえて/みつけて=マッチ3）→ 確定4ゲーム（神経衰弱/分類ソーティング/視覚探索/Corsi Block）
- 旧ステージ制記述 → レベル制（8-12段階）に更新
- ホーム画面: 旧グリッド型3カード → カルーセル型に更新
- 建物名: 確定版（カードスート城/ソーティング小屋/虫めがねタワー/光るグリッド塔）に更新
- 実装順序: 確定前の推定日数を削除、Phase 0-D完了後に決定と記載

### 2. nolla_ia_design_v3.md — セクション修正
- セクション8: カルーセル建物一覧を旧5建物 → 確定4建物に更新。ことば/おはなしはPhase 2として分離
- セクション3: ホーム画面のドットインジケータを5→4に修正、看板例を汎用化
- セクション10: Phase 1を「4ゲーム実装」に修正、Phase 2からST系コンテンツのゲーム実装記述を削除
- 変更履歴セクションを追加

### 3. nolla_mvp_design_spec_v3.md — セクション修正
- セクション3: 「3種類」→「4種類」に更新。確定4ゲーム一覧テーブル追加
- Game 2: 「おぼえてタッチ」→「神経衰弱・メモリマッチング」に名称更新+注記追加
- Game 3: 「みつけてタッチ」（マッチ3）→「視覚探索・間違い探し型」に更新+注記追加
- Game 4: Corsi Block（光るブロック記憶）を新規セクションとして追加
- ホーム画面: 旧グリッド型に「旧版」注記追加、カルーセル型への参照を記載
- 禁止色: 「赤、黄、蛍光色、高彩度色」→「蛍光色のみ」に修正（nolla_color_regulation.md準拠）
- ST系コンテンツ: 「Phase 2」と明記
- 変更履歴セクションを追加

### 4. nolla_dev_roadmap.md — 参照更新
- 0-B-2: 旧5建物テーブル → 確定4建物テーブルに更新。Phase 2のことば/おはなし追記
- 「5建物」→「4建物」に修正
- 変更履歴に記録追加

---

## Part B: 全ファイル分類

### 現役（開発時に直接参照が必要）

| ファイル | 理由 |
|---------|------|
| nolla_mvp_design_spec_v3.md | MVP設計仕様の正式ドキュメント |
| nolla_ia_design_v3.md | 画面遷移・情報設計の正式ドキュメント |
| nolla_game_implementation_guide.md | 4ゲーム実装ガイド（今回更新済み） |
| nolla_dev_roadmap.md | 進捗管理台帳（唯一の進捗管理ファイル） |
| nolla_color_regulation.md | カラーパレット規定 |
| nolla_design_direction.md | デザイン方向性・ベンチマーク指示書 |
| nolla_v4d_building_design_rules.md | 建物画像生成の定量ルール（v4d基準） |
| nolla_stage_bg_composition_rules.md | 背景画像構成の定量ルール |
| nolla_visuospatial_cognition_research.md | Corsi Block等のUI/難度パラメータ仕様（実装時必読） |
| nolla_reward_design_research.md | 報酬メカニクス実装の根拠（実装時必読） |

### アーカイブ候補（結論反映済み・記録として保管）

| ファイル | 理由 |
|---------|------|
| nolla_game_style_research_report.md | 3スタイル比較。結論は確定事項に反映済み |
| nolla_classic_game_cognitive_research.md | クラシックゲーム研究。ゲーム選定完了 |
| nolla_evidence_based_game_candidates.md | 全候補評価。MVP4ゲーム選定完了 |
| nolla_game_design_synthesis_v1.md | Crystal Cavern設計統合。方針転換で不要 |
| nolla_cognitive_game_research.md | 認知ゲーム研究。結論は仕様書に反映済み |
| nolla_cognitive_game_summary.txt | 上記の要約版。同上 |
| nolla_design_rules_asd_research.md | ASD UI設計研究。結論はnolla-mvp-design.mdルールに反映済み |
| nolla_asd_intellectual_disability_ui_ux_research.md | UI/UXリサーチ。結論は仕様書に反映済み |
| nolla_autism_gaming_preferences_research.md | ASD児ゲーム嗜好研究。結論は仕様書に反映済み |
| nolla_onboarding_assessment_research.md | オンボーディング研究。結論はIA v3に反映済み |

### Phase 2で再参照

| ファイル | 理由 |
|---------|------|
| nolla_game_style_comprehensive_research.md | 12スタイル網羅評価。メタゲーム（デイリーチャレンジ等）の拡張設計時に参照 |

### 統合候補

| ファイル | 統合先 | 理由 |
|---------|-------|------|
| nolla_cognitive_game_summary.txt | nolla_cognitive_game_research.md | 同一内容の要約版。別ファイルで持つ意味が薄い |
| nolla_design_rules_asd_research.md + nolla_stage_bg_composition_rules.md | nolla_v4d_building_design_rules.md | 3ファイル間で解像度・数値に矛盾あり（地面比率: 4-5% vs 3-4%、サイド建物幅: 10-12% vs 5-6%）。v4dを基準に統一推奨 |

### 削除候補

| ファイル | 理由 |
|---------|------|
| nolla_crystal_cavern_prototype.html | Crystal Cavernコンセプトは不採用。確定4ゲームと無関係 |
| nolla_next_gen_solution_concept.md | 216バイトの空ファイル同然 |
| nolla_terminal_recovery_20260324.md | ターミナル復旧ログ。開発と無関係 |
| nolla_terminal_session_recovery_full.md | 同上 |
| nolla_ia_design_v1.md | v3が最新。旧版は不要 |
| nolla_ia_design_v2.md | v3が最新。旧版は不要 |
| nolla_mvp_design_spec.md | v3が最新。旧版は不要 |
| nolla_mvp_design_spec_v2.md | v3が最新。旧版は不要 |

### HTMLモック・画像ファイル

| ファイル群 | 判定 | 理由 |
|-----------|------|------|
| nolla_app_flow_v1.html, v2.html, v1.png | **削除候補** | 旧5ゲームのグリッド型フロー。カルーセル型に変更済み |
| mockups/pattern_a〜g*.html, screenshot_*.png | **アーカイブ候補** | ホーム画面パターン検討の記録。方針確定済み |
| mockups/s1〜p5*.html | **削除候補** | ロードマップで「デザイン品質未達、全てやり直し」と明記 |
| mockups/m1_home_*.html, home_carousel.css | **削除候補** | 旧建物名（コテージ/天文台等）のモック。やり直し対象 |
| mockups/v3〜v6*.html, *.png | **アーカイブ候補** | スタイル探索の記録。方針確定後に参考程度 |
| mockups/v4d_*.html, *.png | **現役** | v4dスタイルの建物背景。現在の最有力候補 |
| mockups/v10_*.png | **アーカイブ候補** | 追加スタイル探索。最終決定待ち |
| mockups/building_*.png | **現役** | 確定4ゲームの建物画像（v1〜v3） |

### プロダクト開発と無関係のファイル（別カテゴリ）

| ファイル | 内容 | 判定 |
|---------|------|------|
| SNS系（nolla_sns_*.md, sns_research_*.md等 6ファイル） | SNS運用・コンテンツ戦略 | **現役**（マーケティング用） |
| 動画制作系（nolla_pilot_001_*.md等 5ファイル） | パイロット動画制作 | **現役**（コンテンツ制作用） |
| 事業戦略系（nolla_investor_overview.md, nolla_pitch_deck.*等） | ピッチデック・投資家資料 | **現役**（事業用） |
| リサーチ系（nolla_ai_*.md, research_output.md等） | AI技術・競合・市場調査 | **アーカイブ候補**（調査完了） |
| わが家系（nolla_wagaya_*.md） | SNSアカウント運用 | **現役**（コンテンツ制作用） |
| piapi_security_investigation.md | セキュリティ調査ログ | **削除候補** |

---

## デザインルール系ファイルの矛盾（要対応）

3ファイル間で数値に矛盾あり:

| 項目 | stage_bg | v4d | 推奨 |
|------|---------|-----|------|
| 解像度 | 2048x1152 | 1456x816 | v4dに統一 |
| 地面比率 | 4-5% | 3-4% | v4dに統一 |
| サイド建物幅 | 10-12% | 5-6% | v4dに統一 |

**推奨対応**: v4d_building_design_rules.md を基準とし、stage_bg_composition_rules.md の矛盾数値を更新するか、v4dに統合。

---

## 変更履歴

| 日付 | 内容 |
|------|------|
| 2026-04-05 | 整理レポート初版作成 |
