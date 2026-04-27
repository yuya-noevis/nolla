---
STATUS: ACTIVE
LAST_UPDATED: 2026-04-27 (3社deep analysis + factcheck + 統合提案レポート追加)
PURPOSE: 設計ドキュメント・資料の索引（ACTIVE ファイル一覧）
RELATED: nolla_dev_roadmap.md
---

# Nolla 設計ドキュメント INDEX

このファイルは、Nolla MVP開発における全ACTIVE（現役）ドキュメントの索引です。
DEPRECATED（廃止済み）ファイルは `outputs/_archive/` ディレクトリに移動されています。

## カテゴリー別一覧

### 1. コア設計仕様書（必読）

| ファイル | 目的 | 最終更新 |
|---------|------|---------|
| [nolla_mvp_design_spec_v3.md](nolla_mvp_design_spec_v3.md) | MVP設計仕様書（完全版）。3-18歳ASD児向けゲーム全体像 | 2026-04-03 |
| [nolla_ia_design_v3.md](nolla_ia_design_v3.md) | 情報設計：全21画面の構造・フロー・レイアウト | 2026-04-03 |
| [nolla_game_mechanics_design.md](nolla_game_mechanics_design.md) | 4ゲームメカニクス・難度設計・テスト結果（RCT検証済み） | 2026-04-05 |
| [nolla_nci_algorithm_design.md](nolla_nci_algorithm_design.md) | NCIスコアリング・適応型難度・保護者画面データ設計 | 2026-04-05 |

**読むべき順序**: 1 → 2 → 3 → 4

---

### 2. ビジュアル・デザインルール

| ファイル | 目的 | 最終更新 |
|---------|------|---------|
| [nolla_color_regulation.md](nolla_color_regulation.md) | カラー規定の単一の正。Galaxy宇宙カラー（5レイヤー構造）。蛍光・点滅のみNG、グロウ/発光OK | 2026-04-10 |
| [nolla_design_direction.md](nolla_design_direction.md) | ビジュアル方向性・世界観・惑星デザイン・UIスタイル（Mario Galaxy Movie風） | 2026-04-10 |
| [nolla_stage_bg_composition_rules.md](nolla_stage_bg_composition_rules.md) | 惑星構図ルール（ホーム画面カルーセル + ゲーム画面の球体惑星配置） | 2026-04-10 |
| [nolla_bluey_style_guide.md](nolla_bluey_style_guide.md) | Blueyアニメーション・ビジュアルスタイルガイド | 2026-04-09 |
| [nolla_mario_galaxy_style_analysis.md](nolla_mario_galaxy_style_analysis.md) | Mario Galaxy Movie ビジュアル分析 + テーマ球体惑星デザイン + UIモックプロンプト | 2026-04-10 |
| [nolla_mario_galaxy_style_regulation.md](nolla_mario_galaxy_style_regulation.md) | Galaxy Styleデザインレギュレーション：マスタープロンプト・カラー・ライティング・質感・構図・変換ルール | 2026-04-10 |

---

### 3. デザイン理論・エビデンス

| ファイル | 目的 | 最終更新 |
|---------|------|---------|
| [nolla_solution_evidence_base.md](nolla_solution_evidence_base.md) | **事業ロジック根拠**：規模・社会コスト・コスト構造・早期介入エビデンス・年齢別効果・Nollaソリューション構造。ピッチ用コアと補足の2層構造（生成AIへの投入想定） | 2026-04-20 |
| [nolla_visuospatial_cognition_research.md](nolla_visuospatial_cognition_research.md) | 視空間認知訓練：RCT検証済み9ゲーム、IQ別仕様 | 2026-04-05 |
| [nolla_reward_design_research.md](nolla_reward_design_research.md) | 報酬設計リサーチ・スター計算・shop構成 | 2026-04-04 |

---

### 4. 実装ガイド

| ファイル | 目的 | 最終更新 |
|---------|------|---------|
| [nolla_game_implementation_guide.md](nolla_game_implementation_guide.md) | ゲーム実装ガイドライン・コンテンツ生成手順 | 2026-04-05 |
| [nolla_aac_mini_vocabulary.md](nolla_aac_mini_vocabulary.md) | AAC Mini（Phase 1）語彙一覧・実装データ構造 | 2026-04-10 |
| [nolla_warmup_and_tutorial_design.md](nolla_warmup_and_tutorial_design.md) | Phase 1-K: ウォームアップ新UI+チュートリアル+SFX/Haptic+星座プリセット10種 | 2026-04-11 |

---

### 5. キャラクター・ビジュアル素材

| ファイル | 目的 | 最終更新 |
|---------|------|---------|
| [nolla_character_design_prompts.md](nolla_character_design_prompts.md) | キャラクター生成プロンプト集 | 2026-03-26 |
| [nolla_wagaya_image_prompts.md](nolla_wagaya_image_prompts.md) | わが家キャラ画像生成プロンプト | 2026-04-07（修正） |

---

### 6. ユーザーリサーチ・インタビュー

| ファイル | 目的 | 最終更新 |
|---------|------|---------|
| [nolla_interview_guide_v5.md](nolla_interview_guide_v5.md) | ユーザーインタビューガイド v5（汎用版）。S2「診断までの歩み」新設・H4追加・S4可視化短縮・Mom Test違反防止強化 | 2026-04-20 |
| [nolla_interview_guide_v5_heavy_multiple.md](nolla_interview_guide_v5_heavy_multiple.md) | v5重症心身障害児カスタム版（4歳ダウン症・身体障害）。診断前後・AI活用・将来不安に厚く | 2026-04-20 |
| [nolla_interview_sheet_2026-04-20.md](nolla_interview_sheet_2026-04-20.md) | 2026-04-20インタビュー進行用シート（重心児4歳）。見ながら使える簡潔版 | 2026-04-20 |

---

### 7. 動画制作・パイロット（わが家シリーズ）

| ファイル | 目的 | 最終更新 |
|---------|------|---------|
| [nolla_pilot_001_production_guide.md](nolla_pilot_001_production_guide.md) | 動画制作01パイロット：全体制作ガイド | 2026-03-24 |
| [nolla_pilot_001_storyboard.md](nolla_pilot_001_storyboard.md) | 動画制作01パイロット：ストーリーボード | 2026-03-24 |
| [nolla_pilot_001_script.md](nolla_pilot_001_script.md) | 動画制作01パイロット：スクリプト | 2026-03-24 |
| [nolla_pilot_001_sound_design.md](nolla_pilot_001_sound_design.md) | 動画制作01パイロット：サウンドデザイン | 2026-03-24 |
| [nolla_pilot_001_therapy_sheet.md](nolla_pilot_001_therapy_sheet.md) | 動画制作01パイロット：療育シート | 2026-03-24 |

---

### 8. 保護者向けコンテンツ・教育資料

| ファイル | 目的 | 最終更新 |
|---------|------|---------|
| [nolla_evidence_based_parenting_tips.md](nolla_evidence_based_parenting_tips.md) | 保護者向けTips：エビデンスベース（SNS投稿素材） | 2026-03-26 |

---

### 9. ブランド・わが家設計

| ファイル | 目的 | 最終更新 |
|---------|------|---------|
| [nolla_wagaya_account_design.md](nolla_wagaya_account_design.md) | わが家ブランド・アカウント設計 | 2026-04-07 |
| [nolla_style_guide.md](nolla_style_guide.md) | ブランドスタイルガイド | 2026-04-07 |

---

### 10. 投資家向け資料

| ファイル | 目的 | 最終更新 |
|---------|------|---------|
| [nolla_pitch_deck_outline_2026-04-18.md](nolla_pitch_deck_outline_2026-04-18.md) | 投資家向けピッチ資料骨子（単発レポート12カテゴリ参照） | 2026-04-18 |
※ 旧 nolla_investor_overview.md / nolla_pitch_deck.md / .html / .pdf（Mar22-Apr7）は `_archive/` へ移動済み（2026-04-27）

---

### 11. 進捗管理

| ファイル | 目的 | 最終更新 |
|---------|------|---------|
| [nolla_dev_roadmap.md](nolla_dev_roadmap.md) | 開発ロードマップ・進捗管理（唯一の進捗統制台帳） | 2026-04-07 |

---

### 12. 単発レポート（日付付き）

| ファイル | 目的 | 最終更新 |
|---------|------|---------|
| [nolla_mentor_shiose_compatibility_2026-04-20.md](nolla_mentor_shiose_compatibility_2026-04-20.md) | 京大塩瀬隆之メンター相性評価(88/100)＋『問いのデザイン』基準での課題診断＋2026-04-21面談Q&A設問リスト | 2026-04-20 |
| [nolla_tagline_draft_2026-04-20.md](nolla_tagline_draft_2026-04-20.md) | **タグライン/サービス定義フレーズ検討中**（2026年メガ級スタートアップの型分析＋5案＋推奨）保留中、確定後に本体統合 | 2026-04-20 |
| [nolla_pitch_deck_outline_2026-04-18.md](nolla_pitch_deck_outline_2026-04-18.md) | 投資家向けピッチ資料骨子（20スライド+Appendix、ADI+55000人調査+リフレーミング統合） | 2026-04-18 |
| [nolla_product_reframing_synthesis_2026-04-12.md](nolla_product_reframing_synthesis_2026-04-12.md) | **製品リフレーミング戦略**（20検索統合分析・2023-2026事例ベース・MVP適用判断） | 2026-04-12 |
| [nolla_companies_master_list_2026-04-27.md](nolla_companies_master_list_2026-04-27.md) | **【企業マスターリスト統合版】4方面リサーチ+国内75社+ベンチマーク6社深堀+ファクトチェック訂正履歴を統合した124社網羅リスト**（国際81社+国内43社、A-Z階層構造、信頼度評価★★★/★★☆/★☆☆/【未確認】、出典付き）。旧 startup_landscape / competitor_matrix を統合し _archive/ へ移動 | 2026-04-27 |
| [nolla_dubu_ella_deep_analysis_2026-04-22.md](nolla_dubu_ella_deep_analysis_2026-04-22.md) | **Dubu(旧DoBrain)主要RCT失敗の発掘**＋**3大ベンチマーク(Jade ND/Otsimo/Dubu)のRCT脆弱性共通パターン**＋Ella.kids企業分析 | 2026-04-22 |
| [nolla_jade_autism_competitive_analysis.md](nolla_jade_autism_competitive_analysis.md) | **Jade ND(Nolla最直接競合)詳細分析** 【2026-04-26重大訂正】**ブラジル・UVV発**(旧誤記=ポルトガル・アヴェイロ) / **160K+ DL・175カ国・4,000 students・479 educators**(公式) / 8ドメイン測定/1,500ゲーム/主力アプリ独立検証論文発見できず | 2026-04-22→26 |
| [nolla_rct_protocol_draft_2026-04-22.md](nolla_rct_protocol_draft_2026-04-22.md) | **Nolla RCTプロトコル草案v0.1**（ASD児サブグループ主解析型、Dubu失敗分析反映） | 2026-04-22 |
| [nolla_neurotech_measurement_startups_2026-04-24.md](nolla_neurotech_measurement_startups_2026-04-24.md) | **パッシブ計測型ニューロテック業界マップ**：TOP10（EarliTec/Cognoa/Ellipsis他）+ 失敗事例（Akili/Kintsugi他）+ 2025年以降創業分析。10次元評価 | 2026-04-24 |
| [nolla_neurotech_outcome_evidence_2026-04-25.md](nolla_neurotech_outcome_evidence_2026-04-25.md) | **ニューロテックで発語/問題行動/IQが改善するかの臨床エビデンス監査**（tDCS/TMS/NF/BCI/VR/closed-loop×3アウトカム）。3問とも「ASD/ID児RCT証拠なし」が結論 | 2026-04-25 |
| [nolla_design_review_2026-04-07.md](nolla_design_review_2026-04-07.md) | 設計書多角的再評価(88/100、CRITICAL/HIGH/MEDIUM/LOW提案23件) | 2026-04-07 |
| [nolla_competitor_research_english_markets_2026-04-25.md](nolla_competitor_research_english_markets_2026-04-25.md) | **英語圏(US/UK/CA/AU/IE)競合徹底調査** ASD専用ハードゲート適用、35社+スクリーニング・22社詳細(AAC巨大・ABA寡占・UK NHS・AutiSpark 345Kユーザー警戒) | 2026-04-25 |
| [nolla_competitor_research_eu_latam_me_2026-04-25.md](nolla_competitor_research_eu_latam_me_2026-04-25.md) | **欧州/中南米/中東/北アフリカ/大洋州 競合徹底調査** ASD専用ハードゲート、40社+スクリーニング・主要発見=Genial Care($10M/年商$22M/年成長600%)・Auticiel(200K user)・Tiimo(500K+/€3M)・BlinkLab×Morocco(年60万児)・EmotiPlay/Compedia(Cambridge共同RCT) | 2026-04-25 |
| [nolla_competitor_research_scale_lens_2026-04-25.md](nolla_competitor_research_scale_lens_2026-04-25.md) | **スケール基準競合リサーチ** ベンチマーク3社と異質でも10万人以上のASD/ID向け製品を網羅。50製品スクリーニング・最重要発見=Speech Blubs(6M DL/3M children)・AutiSpark(3.6M DL)・Smart Tales(1M kids/IBCCES)・n2y(600K学生)・CentralReach(200K BCBA/米ABA50%)・Proloquo2Go等AAC11社 | 2026-04-25 |
| [nolla_competitor_research_asia_markets_2026-04-25.md](nolla_competitor_research_asia_markets_2026-04-25.md) | **アジア+中東 競合徹底調査** ASD専用ハードゲート、67社スクリーニング・15社詳細。最重要発見=Dami&Xiaomi(中国・$62.45M/30+都市)・ALSOLIFE(中国・27万家庭/Fortune選出)・Pinnacle Blooms(印・96K家庭/100+センター)・AutiSpark(印・3.6M DL)。新ベンチマーク7社へ拡張提言 | 2026-04-25 |
| [nolla_competitor_research_master_2026-04-25.md](nolla_competitor_research_master_2026-04-25.md) | **【統合マスター】4方面並列徹底調査の総合レポート** 192社+スクリーニング・92社+詳細。新Tier 0(Speech Blubs 6M DL/AutiSpark 3.6M DL/Smart Tales 1M+/Leeloo 1.1M)+ Tier 1(n2y/Dami&Xiaomi/ALSOLIFE/Tobii/Proloquo2Go/Pinnacle/CentralReach/Tiimo)。「3大ベンチマーク」フレームの修正必要性とNolla差別化軸の再評価提言 | 2026-04-25 |
| [nolla_benchmark_inheritance_ranking_2026-04-26.md](nolla_benchmark_inheritance_ranking_2026-04-26.md) | **【ベンチマーク戦略統括】28社過不足ない再精査+24軸踏襲要素マトリクス+ランキング** Tier S 1位Jade ND/2位Dubu/3位Otsimo、Tier A 4位CogniFit/5位Speech Blubs/6位Mightier/7位AutiSpark/8位Proloquo2Go。Yuya新方針(発語強化+AAC機能統合)評価=採用すべきだがAAC正面参入NG・SLP監修必須。3段階実装プラン(AAC Mini→Standard→発語コンテンツパック) | 2026-04-26 |
| [nolla_competitor_research_japan_domestic_2026-04-26.md](nolla_competitor_research_japan_domestic_2026-04-26.md) | **【国内競合徹底リサーチ】ASD/ID子供向けデジタル製品** 75社スクリーニング・28社詳細。最重要発見=LITALICO発達特性検査(2024年4月リリース・2,970円・3-18歳・150問・7領域)/シスメックス Gazefinderオンライン家庭版(2025年10月開始・ノートPCカメラのみで視線計測)/Almaprism(任天堂出身者起業・2026薬事申請・ASD拡張予兆)/ADDS AI-PAC+kikotto(家庭+ABA×AI三層構造)/塩野義ENDEAVORRIDE(ADHD承認・ASD未承認窓開存続)。9カテゴリ網羅+規模別ランキング+補完関係+自己評価 | 2026-04-26 |
| [nolla_smart_tales_deep_analysis_2026-04-26.md](nolla_smart_tales_deep_analysis_2026-04-26.md) | **【ベンチマーク企業分析】Smart Tales (Marshmallow Games・伊バーリ)徹底分析** 創業者Cristina Angelillo妊娠床上安静中起業(2014/8/7)・Smart Tales App Storeリリース(2019/12/8)・Series A €2M(2022/5 CDP+Sefea Impact)・累計€3.5M・IBCCES認証取得(2023/3/4)・3M+ DL/150カ国/5言語。**Mainstream STEM→Inclusive STEM後天的転換型**。IBCCES CAR認証=Nolla適用判断は「MVP後Phase 3-4米国B2B展開時に検討、プレMVP優先度低」。臨床監修シグナリング・D2C先行→B2B後段の順序は採用推奨 | 2026-04-26 |
| [nolla_speech_blubs_deep_analysis_2026-04-26.md](nolla_speech_blubs_deep_analysis_2026-04-26.md) | **【ベンチマーク企業分析】Speech Blubs (Blub Blub Inc.・スロベニア発)徹底分析** 創業者4名(Jernej Fuzir/Mitja Mavsar/Dal Rupnik/Karlo Medjugorac、2人が当事者発語遅延)・スロベニア語版2015/12→US法人化2017→Speech Blubs英語版App Storeローンチ・累計$3.89M(Speedinvest/Silicon Gardens/Pioneers/Fil Rouge)・6M+ DL/3M+ children/11,636 reviews 4.6★・**COVID 2020年5月→11月で1M→2M parents 倍増**。**Video Modeling は偶発発見**。批判=広告詐称/「drooling objects」表現。Nolla示唆10点(原体験ナラティブ最強・D2C先行→5年後B2B Pro版・小言語テスト→英語グローバル戦略・独立RCT空白は差別化チャンス・広告倫理リスク警告) | 2026-04-26 |
| [nolla_autispark_deep_analysis_2026-04-26.md](nolla_autispark_deep_analysis_2026-04-26.md) | **【ベンチマーク企業分析】AutiSpark (IDZ Digital/KidloLand・印Mumbai)徹底分析** 親会社IDZ Digital 2004年創業/Mohatta兄弟(Aditya+Nishant)/**完全bootstrap・FY25₹120Cr/215名/CAGR58%**。AutiSpark=2020/4ローンチの**KidloLand派生サブブランド**(独立スタートアップではない)・3.6M+DL/Google Play 1M+/4.6★・年$59.99サブスク+School買切$119.99・OT監修(Coventry MSc・氏名非公開)。**創業者ASD原体験は確認できず**(YourStory/Inc42記事ヒットゼロ)。**McAfee関連ブランド記載は要追加検証**。批判=非言語児accessibility不足/個別最適化弱/視覚進捗報酬不在。Nolla示唆10点(ASD専用コピー前面化・量的優位140+ゲーム必要・既存資産流用でコスト圧縮・多言語化3-5年スパン・4認証取得目標・School別SKU・bootstrap選択肢・**エビデンス層/パッシブ計測層がAutiSpark空白=Nolla差別化機会**) | 2026-04-26 |
| [nolla_benchmark_factcheck_2026-04-26.md](nolla_benchmark_factcheck_2026-04-26.md) | **【ベンチマーク6社レポート ファクトチェック】** 80+主張の独立検証・誤情報トップ10特定（最重要=Jade ND「ポルトガル・アヴェイロ大学」誤記/実態はブラジル UVV、Otsimo調達額レンジ$330K-$2M、Jade DL/国数/学校数の出典不明、Dubu/Jade 数値混同、Speech Blubs Apple Watch賞は受賞なし確定、AutiSpark McAfee 関連要追加検証）+「確認できず」16項目+6社間矛盾5件+一次URL30++検証エージェント自己評価（WebFetch拒否/PubMed網羅未実施等の限界正直開示） | 2026-04-26 |
| [nolla_abcmouse_deep_analysis_2026-04-27.md](nolla_abcmouse_deep_analysis_2026-04-27.md) | **【ベンチマーク企業分析】ABCmouse / Age of Learning (米Glendale CA)徹底分析** Doug Dohring (Neopets→Viacom $160M売却)が2007創業・2010/11/16 ABCmouseローンチ・**Dohring 2023/9/14死去→Alex Galvagni がCPOからCEO昇格【訂正済】**・主要エクイティ調達$500M(Series A $150M+B $50M+C $300M)・**評価額$3B(2021 Series C TPG主導$300M)**・現CEO Alex Galvagni・2024売上$126.8M(Latka)・**累計5,000万子ども/110億学習アクティビティ/670,000教室**(2024 Impact Report)・**ESSA準拠efficacy研究19件**・ABCmouse(2-8歳$45/年)+Adventure Academy(8-13歳)+ReadingIQ+My Math/Reading Academy(B2G)。**ABCmouse 2(2025/11 Google Play Best of 2025受賞 → 2026/1/5公式正式ローンチ【訂正済】/13,000+活動/My World 5ゾーン)**。**Tickets経済圏+Step-by-Step Learning Path+アバター/My Room/ペット/水槽の収集**が継続エンジン。**FTC $10M和解(2020)=自動更新解約困難で罰金**=反面教師。**ASD公式立場「特別支援教育プログラムではない」**だが保護者口コミは肯定多数。**ASD適合度24/35**(報酬経済・収集5/5、文字非依存・エラーレス2/5)。Nolla示唆=Tickets経済+Path+収集の三位一体は完全踏襲、コンテンツ量勝負NG・文字依存NG・ミュート不可BGM NG・解約困難設計NG。**Nollaの差別化軸=「ABCmouseが構造的に届かない子(読めない子・ASD感覚過敏・ID重度)への特化」+「FTC問題反面教師の倫理的解約フロー」** | 2026-04-27 |
| [nolla_sago_mini_deep_analysis_2026-04-27.md](nolla_sago_mini_deep_analysis_2026-04-27.md) | **【ベンチマーク企業分析】Sago Mini (カナダ・トロント / Spin Master傘下2016〜)徹底分析** 創業=Jason Krogh 2001 zinc Roe→2013 Sago Sago→2016/4/25 Spin Master買収(SEK263M両社合算)。累計DL 90M+(2022/4)/MAU約2M/40+アプリ/従業員51-200。**プロダクト構造**: Sago Mini World/School/First Words(Otsimo共同2022/4/7)+Trips++40スタンドアロン(2024/2/29販売停止→Piknik統合)+Sago Mini Box実物玩具$19/月。**Piknik統合サブスク**(2023/9/5)$6.99-11.99/月で Sago+Toca+外部9アプリ束ね。Spin Master Digital全体売上$173.9M(2023)。**Otsimo提携=共同開発型**(IPライセンスではなく)、speech pathologists/child psychologists監修主張・peer mimicking手法・Apple Design Awards 2023 Social Impactファイナリスト。**ASD親コミュニティで広く愛用**だが**ASD最適化設計ではなく汎用優しい設計**。RCT/独立効果検証ゼロ=4社共通弱点。Nolla学習10項目(キャラ常駐世界観/タイマー排除/失敗ない設計/パステル+ベタ塗り/文字なしナビ/週次プレイテスト文化/Piknik型統合バンドル/Otsimo型専門性提携/玩具×アプリクロスメディア)+回避5項目(完全Open-ended/2-5歳天井/文字排除/監修者非開示/データ不透明)。**重要訂正=依頼文「2021〜」誤記、Spin Master買収は2016年4月25日が正** | 2026-04-27 |
| [nolla_toca_boca_deep_analysis_2026-04-27.md](nolla_toca_boca_deep_analysis_2026-04-27.md) | **【ベンチマーク企業分析】Toca Boca (スウェーデン Stockholm / Bonnier 2010創業 → Spin Master 2016買収・約$30M)徹底分析** 創業者Emil Ovemar/Björn Jeffery・**Fredrik Löving=Spin Master Digital Games統括(2020-2025、Toca Boca単体CEOではない、2025/7 LEGO転出)【訂正済】**・**累計DL 10億超**(Spin Master 2024 IR)/Toca Boca World単体MAU 60M+/Google Play 4.29★/レビュー5.2M。**46タイトル+の指定数値は確認できず=公式自己申告「40+アプリ」**。**Toca Life スタンドアロン群2024/1/1販売停止→World統合**・**Toca Boca Days(初の3D マルチプレイヤー)2024/5ソフトローンチ→2025/8/25永久シャットダウン(16ヶ月失敗)**・Piknikサブスク$11.99/月(2023/9〜)。**設計哲学=「No rules/No timer/No score」「Kids first」「digital toy(ゲームと呼ばない)」「ジェンダーニュートラル」「肌色300+/義肢オプション」**。ASD研究=**UAB 2025探索研究 (n=18) が初の学術検証=自閉症児のアサーション上昇・問題行動減少・ただしCreative play向上は確認されず**・RCT不在。Spin Master Digital Games 2024通期▲5.4%(in-app purchase減)=DLCモデル限界。Nolla示唆12項目(ノースコア徹底/キャラ作成自由度/物理玩具フレーミング/1行設計原則/言語非依存/即フィードバック/ジェンダーニュートラル/パステル+差し色/単独プレイ純度/保護者画面で差別化/Autism Awareness施策/UGC余白)+回避5項目(完全オープンエンド=重度ID児に弱い/DLCガチャ/マルチプレイヤー化失敗教訓/「療育」名乗らない戦略の完全模倣NG/保護者画面の不在)。**最重要発見=Toca BocaのASD親支持はエビデンス未確立(RCT不在)=Nollaの差別化空白地帯** | 2026-04-27 |
| [nolla_3company_factcheck_2026-04-27.md](nolla_3company_factcheck_2026-04-27.md) | **【3社レポート ファクトチェック】** ABCmouse/Sago Mini/Toca Boca計90+主張の独立検証。重大訂正6件(Doug Dohring死去2023/9/14・ABCmouse Series B $50M・Galvagni就任2023/9・ABCmouse 2 公式ローンチ2026/1/5・Fredrik LövingがToca Boca単体CEOではない=Jade ND型役職取り違えリスク・Toca Boca Autism Bundle 2015年4月)+格上げ7件+格下げ4件+「肌色300種」断定削除。Sago Miniレポートが3社中最高品質。検証エージェント自身の限界(WebFetch未使用/PubMed網羅未実施)も正直開示 | 2026-04-27 |
| [nolla_mainstream_kids_app_synthesis_2026-04-27.md](nolla_mainstream_kids_app_synthesis_2026-04-27.md) | **【3社統合提案】メインストリームキッズアプリ3社(ABCmouse/Sago Mini/Toca Boca)からNollaが絶対取り入れるべき要素** ASD/ID児向けに統合分析。**3社の強み統合=「Toca Boca哲学(No rules) × ABCmouse構造(Path/Tickets) × Sago Mini文化(プレイテスト/IP)」のハイブリッド**。CRITICAL要素5(タイマー排除/Tickets経済/Path構造/キャラ常駐/文字なしナビ)+HIGH要素4(親ダッシュボード/Family Plan/30日トライアル+1タップ解約/Piknik型統合)+MEDIUM要素5(ESSA級RCT/クロスメディア/プレイテスト文化/2,000+カスタマイズ/Autism Awareness 4月施策)。反面教師11項目(FTC問題/Toca Boca Days マルチプレイ失敗/Spin Master Digital -5.4% DLC限界/コンテンツ量勝負/高密度ホーム/ミュート不可BGM/解約困難/文字依存/完全Open-ended/DLCガチャ/監修者非開示)。Nolla適合度=ABCmouse9点/Sago Mini9点/Toca Boca8点 | 2026-04-27 |
| [nolla_otsimo_deep_analysis_2026-04-26.md](nolla_otsimo_deep_analysis_2026-04-26.md) | **【ベンチマーク企業分析】Otsimo (Otsimo Bilişim A.Ş./Otsimo Inc.・トルコ Ankara→米SF)徹底分析** 創業者Hasan Zafer Elcik(弟Alper重度ASD当事者・Ashoka Fellow 2018/Obama Foundation 2022/Fortune Turkey 40 Under 40 連続)+Sercan Değirmenci(METU共同創業)・2014ハッカソン→2016/8正式設立・累計$2M調達(Teknasyon/Startup Grind/Galata Business Angels)・社員30人・**4プロダクト並列展開**(Special Education 2016/Speech Therapy 2018/School 2020/AAC 2023)・1M+DL/93カ国/MAU推定30K-100K/年商$1M(2025推定)/サブスク$20.99-13.75月+Lifetime$229.99・**トルコ教育省+Turkcell B2Gロックインで11校展開**・**RCT/独立論文ゼロ**。**「弟Alper3ヶ月で読み書き獲得」ナラティブを8年使い回し最強PR資産**。**4プロダクト=粘着性向上ではなくニーズ別並列展開で相互強化弱**。Nolla示唆10点(原体験ナラティブ最強1本に絞る・自国B2G早期獲得・1プロダクト集中で第2は MAU100K後・社会起業家アクセラレータ早期応募・累計DLよりMAU/DAU重視・Lifetime差別化・**RCT早期着手で4社共通弱点を突く**・米SFフリップはSeries A以降・Pull型メディア戦略の構造化) | 2026-04-26 |
| [nolla_ai_agent_guardrails_v1.md](nolla_ai_agent_guardrails_v1.md) | 親向けAI Agentガードレール仕様(プロンプト/ハルシネーション/エスカレーション) | 2026-04-07 |
| [nolla_legal_privacy_spec_v1.md](nolla_legal_privacy_spec_v1.md) | 法務・プライバシー仕様(COPPA/GDPR/APPI対応+ポリシー雛形) | 2026-04-07 |
| [nolla_phase1_targets_v1.md](nolla_phase1_targets_v1.md) | Phase 1数値目標(KPI)+ユーザー獲得チャネル設計 | 2026-04-07 |
| [nolla_device_compatibility_spec_v1.md](nolla_device_compatibility_spec_v1.md) | iOS/Android/PWA互換性マトリクス(Vibration/Speech/Face Tracking等) | 2026-04-07 |
| [nolla_debug_checklist.md](nolla_debug_checklist.md) | 全機能デバッグチェックシート(A〜X+Y/Zで設計書出典付き全要件・既知バグ・実装ギャップ集約) | 2026-04-07 |

---

### 13. ビジュアル方向性リサーチ（_research/）

| ファイル | 目的 | 最終更新 |
|---------|------|---------|
| [_research/nolla_design_research_games_toys.md](_research/nolla_design_research_games_toys.md) | ゲーム・おもちゃ12点の人気度分析・ビジュアル言語・Nolla適用性 | 2026-04-09 |
| [_research/nolla_design_research_apps_ip.md](_research/nolla_design_research_apps_ip.md) | アプリ・キャラクターIP（20点）の人気度分析・デザイン言語・Nolla適用性 | 2026-04-09 |
| [_research/nolla_design_research_animation_video.md](_research/nolla_design_research_animation_video.md) | アニメ・動画コンテンツ（22点）の人気度分析・演出パターン・Nolla適用性 | 2026-04-09 |
| [_research/nolla_worldview_global_ip_ranking.md](_research/nolla_worldview_global_ip_ranking.md) | グローバル×日本IP20点の3軸ランキング分析（Japan×Global人気度・年齢範囲3-18・ASD親和性） | 2026-04-09 |
| [_research/nolla_juice_feedback_research.md](_research/nolla_juice_feedback_research.md) | ゲームジュース・フィードバック設計リサーチ：Nijman理論・ASD感覚処理・Web実装技術・検証項目 | 2026-04-09 |
| [_research/nolla_quality_audit_2026-04-10.md](_research/nolla_quality_audit_2026-04-10.md) | 品質監査：Supabase advisor(2 security/30 perf)・ASD設計境界遵守(全PASS)・npm CVE(vite HIGH)・P1-P3対応リスト | 2026-04-10 |

---

## 参照ルール（CLAUDE.md記載）

### 設計ドキュメントの参照 — 絶対ルール

1. **MVP開発着手前に必読の4ファイル**（Phase 0）
   ```
   1. outputs/nolla_mvp_design_spec_v3.md
   2. outputs/nolla_ia_design_v3.md
   3. outputs/nolla_game_mechanics_design.md
   4. outputs/nolla_nci_algorithm_design.md
   ```

2. **理論的背景が必要な場合**
   - UI/UXデザイン → `.claude/rules/common/nolla-mvp-design.md` + `nolla_color_regulation.md` (現運用ルール)
   - ゲーム選定理由 → `nolla_visuospatial_cognition_research.md`
   - 報酬メカニクス → `nolla_reward_design_research.md`

3. **ビジュアル実装時**
   - 色選択 → `nolla_color_regulation.md`
   - キャラ設計 → `nolla_design_direction.md` + `nolla_character_design_prompts.md`
   - 背景デザイン → `nolla_stage_bg_composition_rules.md` + `nolla_mario_galaxy_style_analysis.md`

4. **版のバージョニング**
   - v3 = CURRENT（使用）
   - v1, v2 = DEPRECATED（_archive/ に移動済み）
   - 複数版がある場合は、最新版のみ使用

---

## アーカイブ ファイル

DEPRECATED ファイル（66個）は全て `outputs/_archive/` に移動されています。
以下の理由で非表示にされました：

- **v1/v2版**: v3が最新版のため
- **リサーチドキュメント**: Phase 0で役割終了、引継ぎ情報はv3に統合済み
- **探索段階の資料**: 最終決定版へ集約済み
- **パイロット版モック**: 最新版に更新済み
- **2026-04-27 整理分**: 旧ピッチデック (nolla_pitch_deck.md/.html/.pdf)、旧 app_flow v1 (.html/.png)、Crystal Cavern不採用プロトタイプ、cognitive_game_summary.txt（要約版重複）

必要に応じて `outputs/_archive/` から取得可能です。

---

## ファイル統計

- **ACTIVE ファイル**: 約60個（+6 research docs）+ INDEX.md
- **DEPRECATED ファイル**: 66個（_archive/）
- **その他**: mockups/, .DS_Store

**最終整理日**: 2026-04-27（旧ピッチデック3本/旧app_flow v1 2本/不採用プロトタイプ2本を _archive/ へ移動。誤情報訂正履歴を反映）
**前回整理日**: 2026-04-10（v4d_building_design_rules.md→_archive/移動、Galaxy惑星テーマに統一）
