---
STATUS: ACTIVE
LAST_UPDATED: 2026-04-07
PURPOSE: 報酬設計リサーチ・スター計算・shop
RELATED: nolla_nci_algorithm_design.md
---

# Nolla 報酬設計リサーチレポート

**作成日**: 2026-04-04
**目的**: ASD+知的障害児向けアプリの報酬システムを、科学的根拠に基づいて設計する
**注意**: このレポートはリサーチ結果の整理。設計判断は別途Yuyaと議論して決定する。

---

## 1. ASD児の報酬処理: 脳科学が示す事実

### 1A. ドーパミン報酬回路の違い

ASD児の脳は報酬を**定型発達児とは異なる方法で処理する**。

- **線条体（報酬中枢）が低活性化**: fMRI研究で、報酬の期待・受領時に線条体の活動が低下（PMC11274922, 2024）
- **社会的報酬 vs 非社会的報酬で反応が異なる**: 多施設fMRI研究（n=1,112、年齢7-64歳）で、ASD群は社会的報酬（褒め言葉・笑顔）に対する背側線条体の反応が低下。一方、**金銭的/物質的報酬に対する反応は保たれている、または強化されている**（PMC5791309）

→ **設計への示唆**: 「すごい！」「えらい！」等の言語的褒めだけでは報酬として弱い。**目に見えるアイテム・コレクション等の具体的報酬**がASD児の報酬回路を活性化させる。

### 1B. 遅延報酬への耐性

- ASD幼児は定型発達児と比較して**待機時間が短く、報酬に手を伸ばす行動が多い**（Jahromi et al., 2019, SAGE Journals）
- 努力制御（effortful control）が弱く、「今もらえる小さい報酬」を「後でもらえる大きい報酬」より選ぶ傾向（PMC4116476）

→ **設計への示唆**: 報酬は**即時**が原則。「ポイントを貯めて後で交換」は認知的に高度な操作。

### 1C. ただし、トークンエコノミーは有効

矛盾するように見えるが、**適切に設計されたトークンエコノミーはASD+ID児にも有効**。

- Matson & Boisjoli (2009)の系統的レビュー: トークンシステムはASD+知的障害児の社会的スキル向上に最も効果的な行動手法の1つ
- IQ 75-77の児童でトークンエコノミーの成功事例が文書化（PMC9744369）
- **トークンシステムの本質は「遅延耐性を段階的に育てる」こと**（最初は即時→徐々に遅延を伸ばす）

→ **設計への示唆**: 最初は即時報酬。使い慣れてきたら段階的にトークン（スター）→交換の概念を導入できる。

---

## 2. 何がASD児を「もっとやりたい」と思わせるか

### 2A. 限定的興味（Circumscribed Interests）の力

**最も強力な知見。**

- fMRI研究: ASD児の限定的興味（電車、数字、動物等）に関連する刺激は、**社会的刺激よりも報酬系を強く活性化する**（Sasson et al., 2018, PMC5791309）
- 系統的レビュー（Harrop et al., 2019）: 限定的興味を報酬として使用すると、**食べ物等の一般的な報酬よりも効果的**
- 「パワーカード戦略」: 子どもの限定的興味をシナリオに組み込むと適応行動が改善

→ **設計への示唆**: 報酬アイテムは一律ではなく、**子どもの「好きなもの」に合わせて出し分けるべき**。電車好きには電車アイテム、動物好きには動物アイテム。これはアセスメントの「好きなもの」質問と直結する。

### 2B. コレクション/完成欲求

- ASD児の25%に収集行動が見られる（Springer 2024）
- どうぶつの森研究: 自閉症プレイヤーは博物館カタログの完成に**執着的に取り組む**。報酬はBlathersの一言だけなのに、コレクション構造そのものが動機（2024年エスノグラフィック研究）
- Adopt Me!（Roblox）: ペット収集がASD児の主要な遊び方。280種以上のペット→「全部集めたい」

→ **設計への示唆**: **コレクション（図鑑/カタログ）そのものが最強の報酬**。アイテムの「使い道」以上に「集める構造」が重要。

### 2C. 反復ループの快感

- Minecraft研究（2025, Journal of Research in Special Educational Needs）: ASD児は採掘→クラフト→整理→繰り返しのループを**自己調整手段として使用**
- どうぶつの森: 毎日の釣り・水やり・虫取りルーティンが**安心感を提供**
- Adopt Me!: ペットの世話ループが反復行動欲求を満たす

→ **設計への示唆**: 報酬ループは「遊ぶ→もらう→飾る/触る→もっと欲しい→もっと遊ぶ」の**反復可能な循環**にする。

---

## 3. 競合プロダクトの報酬設計

### 3A. 比較表

| プロダクト | 報酬トリガー | 報酬タイプ | 通貨 | コレクション | カスタマイズ |
|---|---|---|---|---|---|
| **Otsimo** | タスク完了 | ステッカー+アニメ | なし | ステッカー集め | なし |
| **Khan Academy Kids** | 正解 | キラキラ→トラック→プレゼント | なし | 動物フレンド | なし |
| **Toca Life World** | ログイン/探索 | 週次サプライズ | 課金のみ | 500+キャラ | 深い（服/髪/家） |
| **Minecraft** | なし（内発的） | 建築/収集自体 | なし | ブロック150+種 | 極めて深い |
| **どうぶつの森** | 採集/購入 | 博物館展示 | ベル | 魚/虫/化石/美術品 | 深い（部屋/島） |
| **Adopt Me!** | ペット入手 | ペット図鑑 | なし | 280+ペット | 中（家具配置） |
| **Prodigy Math** | クエスト完了 | ペット+装備+通貨 | 2種通貨 | 250+ペット | 中（装備） |

### 3B. 成功パターンの分析

**シンプルで成功しているもの（Otsimo、Khan Academy Kids）:**
- 通貨なし。タスク完了→即座に視覚的報酬
- コレクションは「集めるだけ」（交換・消費しない）
- ASD+ID児でも理解できる

**深くて成功しているもの（どうぶつの森、Minecraft）:**
- コレクション構造が精巧（博物館、ブロック分類）
- カスタマイズが深い（部屋/島/建築）
- ただし知的障害への配慮はない（テキスト前提）

**複雑すぎて危険なもの（Prodigy Math）:**
- 3層の報酬ループ（クエスト+ペット+装備）
- 2種通貨
- ASD児には情報過多のリスク

→ **Nollaの立ち位置**: OtsimoのシンプルさとどうぶつのMの深さの**中間**を狙う。

---

## 4. アイテムの使い道: テンプレート型 vs 自由建築

### 4A. エビデンス

- **ASD+ID児はテンプレートベースの創作を好む**（全ゲーム共通の知見）
  - Minecraft: Creative Modeでもガイド付き建築 > 白紙ワールド
  - どうぶつの森: プリデザイン家具セット+グリッド配置 > 自由造形
  - Adopt Me!: プリセット家具配置 > カスタムビルド
  - Autcraft研究: 明示的な視覚指示（大きな矢印、色分けゾーン）がないと参加できない

- **白紙キャンバスはID児を圧倒する**
  - 「何でも作れる」は選択肢が無限=決められない
  - 構造化された選択肢（「AとBどっち？」）が有効

- **ただし反復的インタラクションは強力**
  - 配置したアイテムをタップ→反応する、の繰り返しはASD児の自己調整に合致
  - Minecraft: 同じ採掘を6時間続けることが「安心」

### 4B. Minecraftレベルの建築を入れない理由

| Minecraftの建築要素 | 必要な認知能力 | ID児の対応可否 |
|---|---|---|
| 素材の採集 | 空間記憶、計画性 | 困難 |
| クラフトレシピの理解 | 抽象的因果関係 | 困難（IQ70以下） |
| 3D空間での構造設計 | 空間認知、計画性 | 困難 |
| インベントリ管理 | 分類、数量把握 | 困難 |
| テキストメニュー | 読字能力 | 不可能 |

→ Minecraftの建築は認知負荷が高すぎる。**建築の「楽しさ」だけを抽出し、「難しさ」を排除する設計**が必要。

---

## 5. 感覚フィードバック: 個人差が大きい

- ASD児の90%が非典型的な感覚処理を持つ
- マルチセンサリー環境研究（PMC10913295）: バブルチューブ（視覚+音）と電子タッチボード（触覚+音+光）が最も人気
- **ただし感覚回避傾向が強い子は触覚+音響ボードにより長い時間を費やした**→「感覚入力の強度を自分でコントロールできる」ことが重要
- 聴覚: 神経応答に遅延。触覚: 過敏。視覚+聴覚の同時処理は困難（フィルタリング問題）

→ **設計への示唆**: 報酬フィードバックの音量・振動・視覚効果は**ユーザーがコントロール可能**にすべき。一律の「ピンポン♪+キラキラ+ブルブル」は一部の子にとって感覚過負荷。

---

## 6. リサーチから導かれる設計原則（仮説段階）

以下は設計判断ではなく、リサーチから導かれる**設計原則の候補**。最終判断は議論の上で。

### 原則1: 即時性が最優先
報酬は200ms以内。遅延報酬（ポイント→交換）は段階的に導入する選択肢として残すが、初期体験は即時。

### 原則2: コレクション構造が報酬の核
アイテムの「使い道」より「集める仕組み」が動機を生む。図鑑/カタログのデザインが報酬設計の最重要パーツ。

### 原則3: 限定的興味の活用
「好きなもの」に合わせたアイテム出し分けは、一般的報酬より強力。アセスメントの「好きなもの」データを報酬に直結させる。

### 原則4: テンプレート型の配置
自由建築ではなく、グリッドベースのプリセット配置。「AとBどっちを置く？」の構造化された選択。

### 原則5: アイテムに反応を持たせる
静的な飾りではなく、タップ→反応のインタラクション。反復行動欲求を健全に満たす手段。

### 原則6: 感覚フィードバックは調整可能に
音量・振動・視覚エフェクトの強度を親が設定で調整可能に。デフォルトは中程度。

### 原則7: 通貨システムは慎重に
即時アイテム獲得を基本とし、通貨（スター→ショップ）は上位の認知レベル向けオプションとして段階的に導入する可能性を残す。ただしMVPで必須かは要検討。

---

## 参考文献

### 脳科学・報酬処理
- [Dopamine Dysregulation in Reward and ASD - PMC](https://pmc.ncbi.nlm.nih.gov/articles/PMC11274922/) (2024)
- [Altered reward system reactivity for circumscribed interests in autism - PMC](https://pmc.ncbi.nlm.nih.gov/articles/PMC5791309/) (n=1,112)
- [Reduced delay of gratification and effortful control in young ASD children - PMC](https://pmc.ncbi.nlm.nih.gov/articles/PMC4116476/)
- [Delay of gratification in preschoolers with ASD - SAGE](https://journals.sagepub.com/doi/abs/10.1177/1362361319828678) (Jahromi et al., 2019)

### トークンエコノミー
- [Token economy for children with ID and/or autism: A review - PubMed](https://pubmed.ncbi.nlm.nih.gov/18486442/) (Matson & Boisjoli, 2009)
- [Rapid Assessment of Sensitivity to Reward Delays and Token Economy - PMC](https://pmc.ncbi.nlm.nih.gov/articles/PMC9744369/)

### 限定的興味
- [Use of circumscribed interests within interventions - ScienceDirect](https://www.sciencedirect.com/science/article/pii/S1750946718301429) (Harrop et al., 2019)

### 感覚処理
- [Patterns of equipment use for autistic children in multi-sensory environments - PMC](https://pmc.ncbi.nlm.nih.gov/articles/PMC10913295/)
- [Electrophysiological Measures of Tactile and Auditory Processing in ASD - Frontiers](https://www.frontiersin.org/journals/human-neuroscience/articles/10.3389/fnhum.2021.729270/full)

### ゲーム行動研究
- [Multiplayer gaming and autism: Social communication through repetitive behaviours](https://nasenjournals.onlinelibrary.wiley.com/doi/full/10.1111/1471-3802.70007) (2025)
- [Autcraft: Fostering Autistic Identity in Online Minecraft - PMC](https://pmc.ncbi.nlm.nih.gov/articles/PMC6538299/)
- [Therapeutically applied Minecraft groups - PMC](https://pmc.ncbi.nlm.nih.gov/articles/PMC10958151/)
- [Autistic ethnographic case study of Animal Crossing: New Horizons](https://systems.enpress-publisher.com/index.php/JGS/article/view/11616) (2024)

### 競合分析
- [Otsimo Special Education Review](https://www.educationalappstore.com/app/otsimo-special-education-aba)
- [Khan Academy Kids - Google Play](https://play.google.com/store/apps/details?id=org.khankids.android)
- [Gamification in Mobile Apps for Children With Disabilities - PMC](https://pmc.ncbi.nlm.nih.gov/articles/PMC11415723/)

---

## 7. 報酬設計: 確定事項（2026-04-04）

以下はリサーチ結果に基づき確定した設計判断。

### 7A. 報酬の獲得方式: スター通貨 → ショップ交換

- ゲームクリア → スター獲得（即時、200ms以内の視覚+音声フィードバック）
- スターでショップのアイテムと交換
- **視覚的理解の補助**: スター獲得画面の下部に「スター → シルエット+? → ショップアイコン」を図示し、通貨→アイテムの因果関係を言葉なしで伝える
- **段階的導入**: 初回は1スター=1アイテム（即時交換）。理解度に応じてアプリが自動的に必要スター数を増やす
- 根拠: ABAトークンボード導入法（視覚的近接 + 即時交換から段階的遅延）

### 7B. コレクション構造: 図鑑 + マイルーム の2層

**図鑑（カタログ）:**
- 持っているアイテム = カラー表示
- 持っていないアイテム = グレーシルエット
- グリッド型の整理された表示（ASD児のシステマイジング欲求に合致）
- カテゴリ分け（動物、乗り物、家具等）
- 進捗の視覚化（派手すぎないプログレス表示）

**マイルーム（展示・配置）:**
- 獲得アイテムをグリッドベースで配置（テンプレート型、自由建築ではない）
- 配置時に効果音（「ポトッ」）
- **配置したアイテムをタップすると反応する**（最重要）
  - 例: ぬいぐるみ→揺れる、電車→走る、花→咲く、ペット→なつく
  - ASD児の反復行動欲求を健全に満たす
  - 因果関係の学習にもなる（タップ→反応の一貫性）
- 壁紙・床の変更

根拠: 受動的コレクションだけでは不十分（行動観察研究）。能動的配置+タッチインタラクションが必要。ASD児のlining up行動は自己調整行為。

### 7C. 強化スケジュール: CRF → VR移行

- **初期（習得段階）**: CRF = 連続強化。ゲームクリアするたびに毎回スター報酬
- **中期（維持段階）**: VR3-5 = 変動比率。通常スターは毎回だが、レアアイテムは平均3-5回に1回ランダムで出現
- 行動モメンタム: 適応型難度調整（成功率75-80%維持）と連動。簡単→成功→報酬→少し難しい→成功→報酬の循環

### 7D. 将来拡張: 実世界報酬連携

- 親向け設定で「スター○個 = 実世界の報酬」を設定可能にする
- 例: スター50個→好きなおやつ、スター100個→公園に行く
- ABAの「バックアップ強化子」原理を満たす
- MVP必須ではないが、設計段階で考慮しておく

### 7E. アイテムの出し分け: 限定的興味の活用

- アセスメントの「好きなもの」回答に基づき、ショップのアイテムをパーソナライズ
- 電車好き→電車アイテム優先、動物好き→動物アイテム優先
- 根拠: fMRI研究（n=1,112）で、限定的興味に関連する刺激は汎用報酬より報酬回路を強く活性化

### 7F. ゲーム→報酬フロー（確定版）

```
ゲームプレイ
    │
    ▼
ゲーム終了 → 即座にスター獲得演出（200ms以内）
    │         ★×N ゲット！
    │         [スター → シルエット+? → ショップ] の視覚ガイド
    │
    ▼
┌─────────────────────────────────┐
│  報酬まとめ画面                    │
│                                   │
│  [もっとあそぶ] [ショップ] [マイルーム] │
└─────────────────────────────────┘
    │
    ├→ [もっとあそぶ] → ホーム（カルーセル）
    ├→ [ショップ] → アイテム交換 → 「おへやにおく？」
    └→ [マイルーム] → 配置+タップで遊ぶ → [あそびにいく]
```

循環: 遊ぶ → もらう → 飾る → 触る → もっと欲しい → もっと遊ぶ

---

## 追加参考文献

### トークンエコノミー・通貨理解
- [Token System - Vanderbilt Kennedy Center](https://vkc.vumc.org/assets/files/tipsheets/Token_System_Caregiver.pdf)
- [Using App-Based Token Economy - Springer](https://link.springer.com/article/10.1007/s40617-023-00774-4)
- [Common Practices in Token Economy Implementation - PMC](https://pmc.ncbi.nlm.nih.gov/articles/PMC10700257/)
- [Effects of Token Systems with Flexible Earning - PMC](https://pmc.ncbi.nlm.nih.gov/articles/PMC6743517/)

### コレクション行動
- [Restricted Interests in ASD - PMC](https://pmc.ncbi.nlm.nih.gov/articles/PMC9126999/)
- [Pokemon and Autism Appeal](https://www.pokebundles.ie/blogs/news/why-kids-with-autism-are-drawn-to-pokemon-cards)
- [Why Autistics Organize or Line Things Up](https://thrivewithautism.ca/2013/09/06/why-autistics-organize-or-line-things-up/)

### ABA強化スケジュール
- [Programmed Schedules of Reinforcement - PMC](https://pmc.ncbi.nlm.nih.gov/articles/PMC11904049/)
- [Behavioral Momentum in ABA - PBS Midwest](https://www.pbsmidwest.com/blog/behavioral-momentum-vs-motivation-what-s-the-key-driver-in-aba)
- [Choice-Making and Problem Behaviors - Springer](https://link.springer.com/article/10.1007/BF02110477)
- [Conditioning Reinforcers - Tandfonline](https://www.tandfonline.com/doi/full/10.1080/15021149.2020.1847953)
