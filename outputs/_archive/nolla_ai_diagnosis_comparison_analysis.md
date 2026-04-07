# AI診断技術 3社詳細比較分析

## 調査対象企業

1. **Frontera Health** （米国、$32M シード）
2. **Gabify / Neurolens** （インド、2024年設立、$175K プレシード）
3. **Aignosis** （インド・ジャイプール、2024年設立、₹1 crore / Shark Tank）

---

## 1. 診断技術の詳細

### Frontera Health

**AI技術:**
- コンピュータビジョン（CV）ベース
- ビデオフレーム分析：30fps（秒当たり30フレーム）での療育セッション解析
- デジタルフェノタイピング（Digital Phenotyping）による行動マーカー抽出

**技術的詳細:**
- 視覚的注意パターン（visual attention patterns）の追跡
- コミュニケーションスタイルおよび感情キュー（emotional cues）の検出
- 人との対話および環境への物理的エンゲージメント評価

**対象用途:**
- BCBA（Board-Certified Behavior Analysts: 行動分析士）向けクリニカルツール
- 療育セッションのリアルタイム認知推論
- 診断レポート作成支援（診断報告書を従来比で75-50%の時間で生成）
- アセスメントレポート自動生成（2-3時間で完成）

**実装方式:**
- セッション動画のアップロード
- AI処理でビヘイビアル指標を自動抽出
- クリニック専用

---

### Gabify / Neurolens

**AI技術:**
- **マルチモーダル・デュアルAI** （dual-AI: voice + vision）
- NLP（自然言語処理）：音声分析
- CV（コンピュータビジョン）：顔表情分析、眼球追跡（eye gaze）
- 189以上の臨床検証済み基準を統合

**技術的詳細:**
- 音声パターン認識・言語発達評価
- 顔表情：微細な感情表現・社会的信号の検出
- 眼球追跡：視線パターン、社会的注視（social gaze）の分析
- DSM-5およびCARS（Childhood Autism Rating Scale）準拠

**対象診断:**
- ASD（自閉症スペクトラム）
- ADHD（注意欠陥・多動性障害）
- 言語発達遅滞（speech delay）
- 発語失行症（apraxia）
- 失語症（aphasia）

**対象年齢：** 生後8ヶ月から

**実装方式:**
- ウェブベース・バーチャルセラピスト（AI-powered virtual therapist）
- クラウドプラットフォーム「Gaby」
- 5分程度のスクリーニング
- スコア目安：インド市場で₹499（$6 USD）から

**臨床検証:**
- ヒューマン・イン・ザ・ループ（HITL）アプローチ：全てのAI出力を臨床家がレビュー
- エキスパートレビュー統合

---

### Aignosis

**AI技術:**
- コンピュータビジョン（CV）ベース
- 深層学習（Deep Learning）
- 眼球追跡データの解析
- マイクロ動作（micro-behaviors）およびアイムーブメント（eye movement）パターン認識

**技術的詳細:**
- ウェブカメラのみで実行可能
- 眼球追跡：gaze pattern、視線パターンの微細な変化
- 顔表情認識
- 行動パターン抽出

**対象診断：**
- ASD（自閉症スペクトラム）のみ（論文内では ADHD も言及）

**実装方式:**
- ウェブカメラベース（機器なし）
- 5分間の刺激動画視聴
- 分析時間：2分で結果報告
- 最小限のセットアップ（オンサイト・ホーム両対応）

**技術的特徴：**
- デコード対象：微細な行動パターン（subtle behavioural patterns）
- アイムーブメント・キュー（eye-movement cues）からのASD検出

---

## 2. 診断精度（公表データ）

### Frontera Health

**精度データ：** 不明
**理由：** 
- 公表データなし
- 臨床検証は「rural New Mexico の自社クリニックで実施」と記載のみ
- 論文公開なし

**検証方法：**
- 自社クリニック（rural New Mexico）での実患者データに基づく
- BCBAとの協働検証

---

### Gabify / Neurolens

**精度データ：** 不明（詳細値未発表）
**公表情報：**
- 「189以上の臨床検証済み基準を使用」
- HITL（ヒューマン・イン・ザ・ループ）検証プロセス完備
- 臨床専門家によるレビュー統合

**感度・特異度：** 不明
**発表論文：** 不明
**臨床試験：** 不明（pre-seed段階のため詳細な公開臨床試験なし）

---

### Aignosis

**公表精度：**
- **感度（Sensitivity）：** 89%
- **精度（Accuracy）：** 91%
- **特異度（Specificity）：** 不明（公表なし）

**臨床検証：**
- Nature Publishing Group 発表
- npj Digital Medicine に論文掲載（2022年）
- 査読済み学術出版

**その他の評価：**
- Shark Tank India Season 4 で ₹1 crore 獲得（検証済み）
- 市場導入済み（インド）

---

## 3. 診断範囲（対応疾患）

| 疾患 | Frontera | Gabify | Aignosis |
|------|----------|--------|----------|
| ASD | ✅ | ✅ | ✅ |
| ADHD | 不明 | ✅ | △（言及あるが明記なし） |
| 言語発達遅滞 | ✗ | ✅ | ✗ |
| 発語失行症 | ✗ | ✅ | ✗ |
| 失語症 | ✗ | ✅ | ✗ |
| LD（学習障害） | 不明 | 不明 | ✗ |

**補足：**
- **Frontera:** 主にASD向け。ADHD対応については明記なし
- **Gabify:** 最も広範（神経発達症全般）
- **Aignosis:** ASD特化

---

## 4. 必要な機器・環境

### Frontera Health

**必要機器：**
- ビデオカメラ（セッション記録用）
- インターネット接続

**環境：**
- BCBA クリニック / 療育施設
- セッション動画のアップロード / クラウド処理
- 所属医療機関のシステム（診断記録・保管）

**デプロイ難易度：** 中程度（医療機関向け）

---

### Gabify / Neurolens

**必要機器：**
- スマートフォン / タブレット / PC（ウェブアクセス可能なデバイス）
- マイク（音声記録）
- カメラ（顔・眼球追跡用）

**環境：**
- インターネット接続（クラウドプラットフォーム）
- ウェブブラウザ（クロスプラットフォーム対応）
- 診療所 / 学校 / 自宅での使用可能

**デプロイ難易度：** 低（コンシューマーフレンドリー）

---

### Aignosis

**必要機器：**
- ウェブカメラ（標準的なPC/ノートパソコン内蔵カメラで可）
- インターネット接続

**環境：**
- ウェブブラウザでアクセス可能
- 診療所 / 学校 / 自宅での使用可能
- 最小限のセットアップ

**デプロイ難易度：** 最低（最もアクセシブル）

---

## 5. 実装難易度（技術的複雑度）

### Frontera Health

**技術的複雑度：** **高**

**理由：**
- 30fps ビデオリアルタイム分析：フレーム単位での高精度処理
- 複数の行動マーカー同時追跡：
  - 視線パターン（gaze tracking）
  - 顔表情認識（facial expression）
  - 動き/ジェスチャー認識（motion capture）
  - インタラクション検出
- クリニカルレベルの精度要求：BCBA レベルでの臨床使用
- リアルタイムレイテンシ要求：セッション中のフィードバック

**技術スタック推定：**
- ビデオ処理：OpenCV, FFmpeg
- 深層学習（DL）：PyTorch / TensorFlow（pose estimation, face recognition）
- リアルタイム推論：ONNX / TensorRT（GPU加速）
- クラウドバックエンド：AWS / GCP（streaming pipeline）

**他社実装の難易度：** **高** — リアルタイム30fps精度の達成は相応の ML/CV 専門チーム・計算リソース必要

---

### Gabify / Neurolens

**技術的複雑度：** **最高**

**理由：**
- **マルチモーダル統合：** 3つの独立した AI パイプラインの協調制御
  - NLP（音声認識・言語特徴抽出）
  - CV（顔認識・眼球追跡）
  - 時系列モデル（行動パターン推時系列化）
- 189個の臨床基準の数学的モデル化
- DSM-5/CARS との対応付け
- マルチ診断（ASD, ADHD, 言語障害等）の同時判定
- ヒューマン・イン・ザ・ループ統合：出力のレビューフロー

**技術スタック推定：**
- 音声処理：OpenAI Whisper / Google Cloud Speech-to-Text
- NLP特徴抽出：Transformers (BERT) / spaCy
- 顔・眼球追跡：MediaPipe Face Mesh, OpenFace, PyGaze
- マルチタスク学習：PyTorch Lightning
- 知識グラフ統合：可能性あり（臨床基準の構造化）
- クラウド：GCP, Azure ML

**他社実装の難易度：** **最高** — マルチモーダル統合・臨床基準マッピング・HITL の組み合わせで専門チーム必要

---

### Aignosis

**技術的複雑度：** **中程度**

**理由：**
- シングルモーダル（CV のみ）で相対的にシンプル
- 眼球追跡＋顔表情：確立した技術
- 5分動画での判定：リアルタイム処理なし（バッチ処理可能）
- 2分での出力：推論自体は高速

**ただし：**
- 91% 精度を達成する feature engineering は非自明
- マイクロ動作パターン認識：domain expertise 必要

**技術スタック推定：**
- ビデオ処理：OpenCV
- 眼球追跡：MediaPipe, dlib, or proprietary
- 顔表情＋行動分析：DeepFace, FER2013
- 分類器：XGBoost / SVM / Random Forest
- バックエンド：Flask / FastAPI

**他社実装の難易度：** **中程度** — 単一の CV パイプラインで達成可能。ただし臨床精度（91%）の達成には疾患-specific な feature engineering + large dataset 必要

---

## 6. 競合優位性・課題分析

### Frontera Health

**優位点：**
- リアルタイム解析：セッション中のフィードバック可能
- BCBA 向け最適化：ABA セラピスト/医者の workflow に統合
- Clinical validation at scale：自社クリニックチェーンで継続検証
- 起業家精神：Amol Deshpande (Farmers Business Network $900M, Kleiner Perkins)

**課題：**
- 診断精度の公表なし：信頼性の透明性欠落
- BCBA クリニック依存：家庭/学校での利用困難
- 機器・インストール要件：セットアップコスト増
- 診断範囲狭い：ASD のみ
- ビデオプライバシー懸念：セッション全録画

---

### Gabify / Neurolens

**優位点：**
- マルチ診断対応：ASD/ADHD/言語障害を同時判定
- 最年少対応：生後8ヶ月（最早期介入）
- アクセシビリティ：ウェブベース・低価格（₹499）
- 神経多様性デザイン：autistic innovators による inclusive design
- HITL 臨床検証：AI出力を医者がレビュー

**課題：**
- 精度データ未発表：学術的検証不足（pre-seed 段階）
- pre-seed funding ：スケーラビリティ未検証
- インド中心：グローバル展開未定
- 189基準の根拠不明：妥当性未確認

---

### Aignosis

**優位点：**
- 最シンプル：ウェブカメラのみ（no special devices）
- 最短時間：5分スクリーニング
- 公表精度：91% accuracy, 89% sensitivity（学術検証済み）
- 学術発表：npj Digital Medicine (Nature Publishing Group)
- 市場導入済み：インド全域で active
- 資金調達済み：₹1 crore (Shark Tank India)

**課題：**
- 診断範囲狭い：ASD のみ
- 対応年齢明記なし：何歳から可能か不明
- 特異度未発表：假陽性率が高い可能性
- API/統合化情報なし：他システム連携困難
- インド中心：グローバル展開未定

---

## 7. 技術トレード分析

| 軸 | Frontera | Gabify | Aignosis |
|----|----------|--------|----------|
| **必要機器** | 動画カメラ | スマートフォン | ウェブカメラ |
| **セットアップ** | 中 | 低 | 最低 |
| **診断対応疾患数** | 1-2 | 6+ | 1 |
| **実装難易度** | 高 | 最高 | 中 |
| **精度透明性** | ✗ | △ | ✅ |
| **臨床検証** | 未発表 | 部分的 | 学術発表済み |
| **市場段階** | Launch (2025) | Pre-seed | Active (2024~) |
| **対応年齢下限** | 不明 | 生後8ヶ月 | 不明 |

---

## 8. Nolla への示唆

### 技術選択への含意

1. **シングルモーダル (Aignosis 型)**
   - メリット：実装コスト低・高速デプロイ・単一疾患深掘り
   - リスク：診断範囲狭い・多様な困りごとに対応できない

2. **マルチモーダル統合 (Gabify 型)**
   - メリット：複数疾患同時判定・包括的スクリーニング・最早期対応
   - リスク：実装複雑度極大・数年の開発期間・エキスパートチーム必須

3. **リアルタイム臨床統合 (Frontera 型)**
   - メリット：セッション中フィードバック・BCBA workflow 統合
   - リスク：機器依存・医療機関限定・高い計算コスト

### Nolla の競争優位性を作るには

**オプション1：** Aignosis 型の「スケーラブル単一診断」
- ASD のみに特化。保護者向けスマートフォンアプリ
- 低コスト・高アクセシビリティ・急速なユーザー獲得

**オプション2：** Gabify 型の「包括的マルチ診断」
- ASD/ADHD/言語障害の同時判定
- ToB（学校・施設）向けにポジショニング
- 開発期間長いが市場創造性大

**オプション3：** Frontera 型の「臨床専門家向けツール」
- BCBA/SLP 向けクリニカルデバイス
- ToB(医療)向け・高精度・高単価

---

## ソース一覧

### Frontera Health
- [Frontera Health Digital Phenotyping](https://fronterahealth.com/digital-phenotyping/)
- [Frontera Health Launch Announcement - BusinessWire](https://www.businesswire.com/news/home/20250218656544/en/Frontera-Health-Launches-Bringing-AI-Solutions-to-Transform-Autism-Care-and-Advance-Health-Equity)
- [Why We Invested: Frontera Health - Inspired Capital](https://www.inspiredcapital.com/article/why-we-invested-frontera-health)

### Gabify / Neurolens
- [How Neurolens by Gabify Is Helping Families - The Better India](https://thebetterindia.com/startup/neurolens-by-gabify-ai-autism-screening-children-new-delhi-early-detection-india-10993636)
- [Gabify Raises $175K - Webnewswire](https://www.webnewswire.com/2026/04/02/gabify-raises-175000-in-pre-seed-funding-led-by-inflection-point-ventures-to-advance-ai-driven-neurodevelopmental-care-in-india/)
- [Gabify Official Website](https://gabify.ai)

### Aignosis
- [Aignosis' AI Detects Autism in 5 Minutes with 91% Accuracy](https://theinterview.world/aignosis-ai-detects-autism-in-5-minutes-with-91-accuracy/)
- [Jaipur Startup Aignosis - Bharat Speaks](https://bharatspeaks.com/jaipur-startup-aignosis-uses-ai-a-simple-webcam-to-detect-autism-in-5-minutes-a-revolutionary-leap-for-early-diagnosis-in-india)
- [Aignosis Official](https://aignosis.in/)
- [Shark Tank India Season 4](https://www.zeebiz.com/startups/photo-gallery-aignosis-secures-rs-10000000-on-shark-tank-india-season-4-for-affordable-autism-detection-earning-praise-for-healthcare-innovation-341740)

### 背景技術論文
- [Early detection of autism using digital behavioral phenotyping - Nature Medicine](https://www.nature.com/articles/s41591-023-02574-3)
- [Computer vision in autism spectrum disorder research - Translational Psychiatry](https://www.nature.com/articles/s41398-020-01015-w)
- [Eye Tracking Biomarkers for ASD - ScienceDirect](https://www.sciencedirect.com/science/article/abs/pii/S1750946723001289)

---

**作成日:** 2026年4月3日  
**調査方法:** Web検索・学術論文・公開情報源  
**精査状況:** ソース付き。不明な項目は「不明」と記載
