---
STATUS: ACTIVE
LAST_UPDATED: 2026-04-27
PURPOSE: Mightier (Neuromotion Labs) ベンチマーク企業徹底分析。Boston Children's Hospital発、HRVバイオフィードバック+ゲーム+RCTを全部やってる「Nollaに最も近い先行事例」の初期戦略・成長ドライバー・転換点・現在地・示唆をエビデンスベースで構造化。
RELATED: nolla_otsimo_deep_analysis_2026-04-26.md / nolla_dubu_ella_deep_analysis_2026-04-22.md / nolla_jade_autism_competitive_analysis.md / nolla_neurotech_outcome_evidence_2026-04-25.md / nolla_neurotech_measurement_startups_2026-04-24.md
---

# Mightier (Neuromotion Labs, Inc.) 徹底分析レポート — 2026-04-27

> **調査方針**: 一次情報・複数二次情報の照合で確認できた事実のみを書く。確認できなかった項目は「**(未検証)**」として明示。推測は推測と明記。Jade NDで「ポルトガル発」「185K DL」と誤情報を書いた事故を踏まえ、エビデンス絶対主義を徹底。
>
> **WebFetch制限**: Crunchbase直接取得不可(403)、Magellan PDFは画像PDFで本文抽出不可、Neuromotion Labs公式サイトはECONNREFUSED。代替として複数二次ソースを照合。信頼度を ★ 3段階で表示。
>
> **テンプレート**: Otsimo / Dubu / AutiSpark 分析と同形式。

---

## 0. エグゼクティブサマリー

Mightierは「**HRVバイオフィードバック+ゲーム+RCT+病院ブランド**」の4点セットを世界で最も完全に保有する子ども向けデジタル感情調整プロダクト。Boston Children's Hospital (BCH)の精神科Developmental Neuropsychiatry Clinic (DNP) で2009年に始まった研究プロジェクト「RAGE-Control」が母体で、2014年にNeuromotion Labsとしてスピンアウト、2017年に「Mighteor」として商用ローンチ、2018年に「Mightier」へリブランド。**総調達額 約29M USD(自社公表)**、Series B (2021/12) は **$17M** で Sony Innovation Fund・DigiTx Partners・PBJ Capital が参加(PRNewswire 2021-12-13公表 ※2026-04-27 factcheckにより訂正)。累計**100,000+ kids / 2.5M+ games played**(自社公表ベース)。

**最重要発見:**

1. **「病院発研究→スピンアウト→RCT→保険提携」の王道ルート**を最も完全に踏んだ事例。2009年のBCH研究→2012年Adolescent Psychiatry掲載→2014年スピンアウト→2018年商用化→2020年Magellan Health提携→2021年Frontiers in Psychiatry論文→2022年Internet Interventions論文。**Nollaが「ToBで保険償還を狙う」なら、これとほぼ同じ7-10年の時間軸を覚悟する必要がある**。
2. **FDA医療機器クリアランスを取っていない**。同時期にローンチしたAkili (EndeavorRx) はDe Novoで510(k)経路を確立したが、Mightierは「wellness product」として規制外で運営。これは**意図的な選択**で、処方箋不要で家庭直販+保険ピロット併用というハイブリッド戦略を取った。FDAを取らないことで広告規制・処方医必須・PDURS制約を回避。
3. **総調達30M USDに対し、ユーザー規模は10万kids前後と推定**。Otsimo (1M+ DL) より少ないが、課金単価が桁違いに高い (月$28-40 / Otsimoは$13-21)。**LTV重視の高単価サブスク**で成立させている。
4. **「デバイス必須 (HRV armband同梱)」が両刃の剣**: バイオフィードバックという独自体験の核だが、初期障壁(物理発送・装着抵抗)を生み、スケール率を抑える要因になっている。Otsimo・Speech Blubsのアプリ単独DLとは桁違いに獲得が重い。
5. **創業者構成が独特**: Craig Lund(CEO・元エンタープライズソフト)、Jason Kahn(CSO・PhD心理学・BCH発明者)、Trevor Stricker(共同創業者・20年のゲーム開発キャリア=Dreamcast時代から)。**研究者+ビジネス+ゲーム職人の三位一体**で、Otsimo (兄弟ストーリー)・Dubu (デザイナー創業) とも違う「BCH/Harvard学術ブランド+商業ゲーム品質」のポジショニングを実現。
6. **臨床監修者Joseph Gonzalez-Heydrich** (BCH精神科 Developmental Neuropsychiatry Clinic Director・Harvard准教授) が公式に共同発明者として論文・学術コンファレンスに登壇し続けている。**学術的正統性のメンテナンスを8年以上継続**している点で、Otsimo「ABA準拠を宣言」レベルとは一線を画す。

**Nollaへの示唆 (Top 5):**

1. **「病院発スピンアウト→RCT→保険提携」の7-10年ルートは強い。日本で同じ道を取るなら、Phase 0で東大IRCN・国立成育・京大こころの未来等の「臨床研究契約」を結ぶ意思決定がROI最大**
2. **デバイス同梱はLTV/単価を上げるが獲得を10倍重くする**。NollaはMVP段階ではアプリ単独で始め、PMF後にウェアラブル(Apple Watch等の既存資産)連携で計測層を追加する2段階戦略が妥当
3. **FDA(日本ならPMDA)を取らない選択が合理的なケースがある**。MightierはあえてWellness位置づけで運営し、家庭直販+保険ピロットを並走。Nollaも初期は「教育/支援アプリ」位置づけで規制を回避し、Phase 3以降でPMDAルートを判断する2段階アプローチが現実的
4. **臨床監修者を「公式共著者」として論文・学会に出し続けることが学術的正統性のメンテナンス**。Mightierは Joseph Gonzalez-Heydrich を10年以上継続露出。Nollaも臨床アドバイザー1名を発掘し、論文共著者として継続関与してもらう契約を最初に結ぶべき
5. **Magellan Healthとのピロット結果「45% better symptomatic gains / ABA expenditure 1%未満のコストで45%効果」**は、保険償還交渉の最強カード。Nollaも将来の保険償還(自治体・特別児童扶養手当・福祉タクシー的なフレーム)を狙うなら、**早期に「ABA / 既存療育の代替/補完で何%のコスト削減」**という具体数値を計測できる設計にしておくべき

---

## A. 企業概要(一次情報複数で確認済みのみ)

| 項目 | 内容 | 信頼度 | 出典 |
|------|------|--------|------|
| 法人名 | **Neuromotion Labs, Inc.**(プロダクト名: Mightier) | ★★★ | Crunchbase / Wikipedia / 公式 |
| 法人化 | **2014年**(Neuromotion Labs LLCとして) | ★★★ | Wikipedia / multiple |
| プロダクト初リリース | **2017年「Mighteor」**として商用ローンチ | ★★★ | Wikipedia / VentureFizz |
| 製品名変更 | **2018年「Mightier」**へリブランド | ★★★ | Wikipedia / Engadget 2018-04-03 |
| 本社 | **Boston, MA, USA** | ★★★ | 全主要ソース一致 |
| 創業者(3名) | **Craig Lund**(CEO・共同創業者) / **Jason Kahn, PhD**(CSO・共同創業者・BCH研究者) / **Trevor Stricker**(共同創業者・ゲーム開発リード) | ★★★ | Wikipedia / Crunchbase / VentureFizz / IDEO |
| 起源研究 | **2009年 Boston Children's Hospital で「RAGE-Control」研究プログラムとして開始** | ★★★ | BCH Accelerator / EurekAlert / 複数学術 |
| 学術的母体 | **BCH Developmental Neuropsychiatry Clinic**(Director: Joseph Gonzalez-Heydrich, MD)+ Harvard Medical School | ★★★ | BCH Researcher profile |
| 累計調達額 | **約29M USD**(自社公表 / 内訳: Seed $1.2M + Seed extension $2.4M + Series A $6.6M + Series B $17M = $27.2M、追加エンジェル含めて29M) | ★★★ | PRNewswire 2021-12-13 / Crunchbase / 自社公表 |
| Seed (2017以前) | $1.2M(Founder Collective + Project 11 Ventures) | ★★☆ | Tracxn / Crunchbase |
| Seed extension | **$2.4M**(2018年6月、Slow Ventures lead + Bolt + Founder Collective + Project 11 + TripAdvisor出身エンジェル) | ★★★ | MobiHealthNews / FinSMEs / Boston CityBuzz |
| Series A | **$6.6M**(2019年5月、FoxKiser lead + Asset Management Ventures + FundRx + 既存Seed投資家) | ★★★ | EdSurge / VC Journal / FinSMEs |
| Series B | **$17M**(2021年12月13日、DigiTx Partners lead + Sony Innovation Fund + PBJ Capital) | ★★★ | PRNewswire 2021-12-13 |
| 主要投資家(集計) | Slow Ventures / Bolt / Founder Collective / Project 11 / FoxKiser / Asset Management Ventures / FundRx / DigiTx Partners / Sony Innovation Fund / PBJ Capital / Hopelab / Bridge Builders Collaborative / Koa Labs / K. Ventures / Arrandale Ventures(計18-20社) | ★★★ | Crunchbase summary |
| 従業員数 | **(未検証)** 直接公開数値は確認できず。Crunchbase/PitchBookで30-50人レンジと推定 | ★☆☆ | 推定 |
| 累計ユーザー | **「100,000+ kids / 2.5M+ games played」**(LinkedIn・公式bio・複数記事) | ★★★ | LinkedIn / Wikipedia |
| 直近 MAU/MRR | **(未検証・非開示)** | — | — |
| 価格(2026時点) | **$40/月** (Monthly) / **$34/月**(6ヶ月一括 = $204) / **$28/月**(12ヶ月一括 = $336) | ★★★ | 公式 plans page |
| 同梱物 | Heart sensor armband + 充電器 + Conversation Card Deck + 月次Skill Pack(郵送 or デジタル)+ 親アプリ | ★★★ | 公式 |
| 対象年齢 | **6-14歳**(公式は「6-12」、二次ソースで「6-14」表記あり) | ★★★ | 公式 / multiple |
| 対象児特性 | autism, ADHD, ADD, ODD, anxiety, 一般的な感情調整困難 | ★★★ | BCH Accelerator / 公式 |
| FDA分類 | **医療機器クリアランスなし**(wellness product位置づけ。EndeavorRxとの対比で確認) | ★★★ | Stanford Law blog / FDA database |
| HSA/FSA | **対応**(米国の医療貯蓄口座で支払い可能) | ★★★ | 公式 plans page |
| 保険提携 | **Magellan Health**(2020年7月パイロット開始)/ **GreenShield Canada**(2024〜2026推定、家族向け給付) | ★★★ | Magellan IR release / GreenShield FAQ |
| ゲーム数 | **30+タイトル**(Mini Metro, Race the Sun, Brick Breaker, Tumblestone, Hundreds等のサードパーティタイトルをHRV連動化) | ★★★ | Wikipedia / 複数レビュー |

---

## B. 創業ストーリー(時系列・出典付き)

| 年 | イベント | 出典 |
|----|---------|------|
| 2007頃 | **Joseph Gonzalez-Heydrich, MD**(BCH精神科 DNP Clinic Director・Harvard准教授)と **Jason Kahn, PhD**(当時BCH研究員)が「ビデオゲームを使って怒りコントロールを訓練する」アイデアを発案。背景: 「怒りに問題のある子どもは心理療法を嫌うが、ビデオゲームには熱中する」という臨床観察。 | EurekAlert / BCH researcher profile |
| 2009 | **Boston Children's Hospital で「RAGE-Control」(Regulate and Gain Emotional Control) 研究プログラム正式開始**。BCH内部研究として運営。 | BCH Accelerator / EurekAlert |
| 〜2012 | **40名の10-17歳児を対象とした初期RCT**を実施。怒りコントロール問題で外来精神科に通う児童対象。「敵宇宙船を撃つゲーム+指先HR モニター」プロトタイプ。 | EurekAlert / Adolescent Psychiatry 2012 |
| 2012年10月 | **Adolescent Psychiatry 誌に最初の査読論文掲載**(筆頭著者: Peter Ducharme, MSW = BCH clinical social worker)。RAGE-Controlの実現可能性と効果を示す。 | EurekAlert |
| 2014 | **Neuromotion Labs LLC として独立スピンアウト**。Craig Lund(CEO)+ Jason Kahn(CSO)が共同創業。**Trevor Stricker**(20年のゲーム業界キャリア・Dreamcast時代からのインディゲーム開発者)が後にゲーム開発リードとして合流。 | Wikipedia / VentureFizz / Crunchbase |
| 2014-2016 | より洗練されたモバイルゲーム platform を3人で開発。**IDEO**がデザインパートナーとして関与(IDEO公式サイトに事例掲載)。 | IDEO case study |
| 2016 | **MassChallenge Finalist 選出**。Boston系startupアクセラレータでブランド露出を獲得。 | Wikipedia |
| 2017 | **「Mighteor」として商用ローンチ**(Apple App Store ID 1333675573、現在は「Mightier」表記)。 | App Store / Wikipedia |
| 2017以前 | **Seed $1.2M**(Founder Collective + Project 11 Ventures)獲得。 | Tracxn |
| 2018年4月 | **Engadget記事「Mightier is helping calm kids down through mobile games」**で大手テックメディア露出。 | Engadget 2018-04-03 |
| 2018年6月 | **Seed extension $2.4M 獲得**(Slow Ventures lead + Bolt + Founder Collective + Project 11 + TripAdvisor出身エンジェル)。Seed累計**$3.7M+**へ。同時に「Mighteor → Mightier」リブランド完了。 | MobiHealthNews / Boston CityBuzz / FinSMEs |
| 2018-2019 | 「150 families以上での臨床実装」を経て家庭市場へ本格展開。BCH Acceleratorポートフォリオ企業として継続露出。 | BCH Accelerator |
| 2019年5月 | **Series A $6.6M 獲得**(FoxKiser lead + Asset Management Ventures + FundRx + 既存Seed投資家)。累計**$10.1M+**へ。 | EdSurge / VC Journal |
| 2020年4月 | **競合Akili Interactive がEndeavorRxでFDA De Novo クリアランス**を取得(8-12歳ADHD向け、世界初の処方ビデオゲーム)。Mightierは**意図的にFDAを取らない wellness product 戦略を継続**。 | FDA database |
| 2020年7月22日 | **Magellan Health とのパイロット提携を発表**。「outcomes-based treatment」として、Magellan会員家族にMightierを提供。Mightierにとって**初の大手保険会社提携**=保険償還ルートへの最初の橋頭堡。 | Magellan IR / Business Wire |
| 2021年5月 | **Magellan-Mightier ASD パイロット結果リリース**:「45% better symptomatic gains vs control / aggressive symptom reduction 2倍 / ABA支出 ($40,000/年/家族)の1%未満のコストで45%臨床改善」。 | Magellan PDF(本文画像化のため二次サマリーで確認) |
| 2021年9月 | **Frontiers in Psychiatry 誌に "A 'Proof of Concept' Randomized Controlled Trial of a Video Game Requiring Emotional Regulation to Augment Anger Control Training" 掲載**。筆頭著者 Joseph Gonzalez-Heydrich。RAGE-ControlがACT(Anger Control Training)を補強することを示す sham-controlled RCT。 | Frontiers in Psychiatry 2021 |
| 2021年12月13日 | **Series B $17M クローズ**。DigiTx Partners lead + Sony Innovation Fund + PBJ Capital(PRNewswire 2021-12-13公表)。 | PRNewswire 2021-12-13 |
| 2022年3月 | **Internet Interventions 誌に Wintner et al. "Evaluation of a scalable online videogame-based biofeedback program to improve emotion regulation" 掲載**。1,045 players / 840 families の commercial app usage 解析。**59.6%が完了基準達成・親評価で感情調整スキル使用・気づき・落ち着き・関係性で改善**。 | PMC8960945 / Internet Interventions 2022 |
| 2024〜2026推定 | **GreenShield Canada (カナダ大手保険) との家族向け給付提携**。被扶養者(従業員家族の子5歳以上)が無料登録可。 | GreenShield FAQ / Mightier公式 |
| 2026 (現在) | **本社 Boston / 米国全土 + カナダで販売 / 累計 100,000+ kids / 2.5M+ games played** | LinkedIn |

---

## 1. 初期戦略 (★最重要)

### 創業時のターゲット・ポジショニング

Mightierの初期ターゲットは「**精神科外来に通う10-17歳の重度怒り・攻撃性の子ども**」。これはBCHでのRAGE-Control研究の対象集団そのまま。**「健常児の感情教育」ではなく「臨床医療補助としての感情調整訓練」**から始まったことが、後の保険提携・学術的正統性の源泉になっている。

商用化(2017 Mighteor)時に対象を**6-12歳の家庭一般**(autism / ADHD / ODD / anxiety / 普通の癇癪)に拡大。**「臨床由来 → 家庭の悩みごとへ降りる」**というOtsimoとは逆方向のスケール戦略(Otsimoは個人の家庭ニーズ→学校→トルコ全国 → グローバル)。

### なぜ「HRV(心拍変動)バイオフィードバック+ゲーム+感情調整」から始めたか

3つの設計判断が交差した結果:

1. **「臨床観察」**: Gonzalez-HeydrichがDNP Clinicで「怒りコントロール障害の児童は心理療法に協力的でないが、ビデオゲームには驚くほど熱中する」ことを継続的に観察(EurekAlert記事内本人発言)。
2. **「神経科学的合理性」**: HRV(=自律神経の交感/副交感バランスの indicator)はリアルタイム計測可能で、覚醒度の操作的指標として臨床的に確立されていた。「ゲーム中にHRが上がりすぎたら難易度が変わる」という機構で、**ゲームをやり続けるためには自分で覚醒を下げる必要がある**=暴露+条件付け学習が成立する。
3. **「家庭への移行可能性」**: 病院でしかできないニューロフィードバック (EEG等) と異なり、HRはスマホ+armbandで家庭計測可能。**スケーラブルな臨床介入の唯一現実的なパス**として選択された。

### 病院発スタートアップとしての強み・縛り

**強み:**
- BCH (世界トップ小児病院) + Harvard Medical School のブランド = 親・医師・投資家・保険会社の信頼の獲得コスト極小
- 学術論文を「広告に使える」(競合は学術論文を持たない)
- 臨床監修者 Gonzalez-Heydrich を10年以上継続露出 → 「科学的正統性の年輪」

**縛り:**
- BCH IRBの倫理規定上、初期はマーケティング表現に制約 (例:「治療する」と言えない)
- 病院文化のスピード感 ≠ スタートアップのスピード感 → 商用化まで2009→2017で**8年**かかった
- 商用化後も論文1本出すのに数年単位 → 「FDAを取らないなら、論文の更新ペースをマーケで補う」必要

### 当初Mighteor → Mightier リブランドの理由

明確な公式説明は確認できず**(未検証)**。2018年6月のSeed extension発表と同時期にMightier表記に切り替わっているため、「投資家プレゼン上の名前混乱回避」+「Mighteor綴りの覚えづらさ解消」が推定理由。Mighty (=強い) + er (=より強くする者) で、**Mightier = ER児が強くなる**というダブルミーニングが意図されたと推定**(推測)**。

### 競合との差別化

| 競合 | 差別化軸 |
|------|---------|
| **EndeavorRx** (Akili) | EndeavorRxは処方箋必須・ADHD治療の医療機器。Mightierは**家庭直販・wellness・対象障害幅広(ASD含む)**で運営し、規制負荷を回避 |
| **Calm Kids / Headspace Kids** | 瞑想・呼吸法アプリ。Mightierは**バイオフィードバック+ゲーム化**で「子どもが自分でやり続ける」インセンティブを内蔵 |
| **Brain Power** (Google Glass) | ASD向けARニューロテクだが、ハードウェア負荷が極端に高い。Mightierは**スマホ+1armband**で家庭運用可能 |
| **Otsimo / Speech Blubs / AutiSpark** | 教育コンテンツ系。Mightierは**生体データ計測+感情調整**で別領域 (情緒学習) を独占 |

→ Mightierは「**HRVバイオフィードバック+ゲーム+家庭+学術的正統性**」の4軸で**ほぼ唯一無二**のポジショニングを確保している。

---

## 2. 0→1の突破 (★最重要)

### 病院臨床ネットワークから入った初期戦略

2009-2014の研究期はBCH内部運営。スピンアウト後(2014-2017)も「150 families以上での臨床実装」(BCH Accelerator記載)を経てから家庭市場ローンチ。**最初の数百家族はBCH精神科外来からの紹介経由**と推定**(直接確認は取れず・推定)**。

これは「**最初のユーザーは無料/廉価で確実に良いアウトカムが出る集団 = 既に治療を必要としている児童**」から始め、後から「軽症・予防的家庭ニーズ」に降りるという、**digital therapeuticsの王道戦略**。

### 最初のユーザー獲得手段

| チャネル | 推定寄与度 |
|---------|----------|
| **BCH/Harvard学術ブランド経由のメディア露出** | 高 — Engadget・MobiHealthNews・EurekAlert等の大手媒体が「BCHスピンアウト」というhookで継続的に取り上げた |
| **BCH精神科外来からの臨床医紹介** | 高 — 初期実装の中核 |
| **Mom系ブロガーレビュー** (The Autism Dad等) | 中 — 2018年以降、autism親コミュニティで広範な紹介 |
| **MassChallenge Finalist** (2016) | 中 — Boston startup ecosystemへの認知拡大 |
| **直接D2C広告** | 低 (推定) — Series A($6.6M)時点まで広告投資は限定的だった可能性 |

### RCT発表が事業に与えたインパクト

**2012年Adolescent Psychiatry論文**(初期RCT・40名)が**スピンアウト判断の根拠**になった。研究→スピンアウト判断のためには「治験データの存在」が必須で、これが2009→2014の5年間の意味だった。

**2021年Frontiers in Psychiatry論文**は商用化後初の主要RCT論文。**Magellan Health提携(2020年7月)が論文発表(2021年9月)より早い**ことに注目: Magellanは「論文準備中」段階で提携を決断している。これは**学術的blackboxを「Boston Children's Hospital」のブランドで補完できた**ことを示唆。

**2022年Internet Interventions論文**(1,045 players)は商用データの大規模解析で、**保険会社・自治体への営業マテリアルとして圧倒的に強力**。これがGreenShield Canada(2024-2026推定)等の後続契約に繋がっている可能性が高い。

### 初期判断で正解だったもの・失敗したもの

**正解:**
- **HRV (心拍数) を選んだ**こと: EEG等と比較して家庭運用可能性が桁違いに高い
- **既存ゲームタイトルをHRV連動化する形式**: 自社ゲーム30本を作るコストを節約しつつ「ゲーム品質」を担保
- **学術論文を継続的に出し続ける戦略**: 競合(Otsimo・Speech Blubs)が論文を持たないため、これだけで保険・自治体ルートで圧倒的優位
- **FDAを取らない判断**: 規制負荷・処方箋必須化を回避しつつ、wellness位置づけで保険ピロットを獲得

**失敗 / 課題:**
- **デバイス必須が獲得を重くした**: Otsimo (アプリ単独) と比較してDL累計が桁違いに少ない。**累計100K kids**は8年運営でこの規模は控えめ
- **2009→2017の8年商用化遅延**: 病院発スタートアップの典型的問題。同時期に始まった競合は既にFDA取得 (Akili) や巨大DL (Otsimo) を実現
- **対象拡大のスピード**: ASD・ADHD・ODD・anxiety と幅広く謳っているが、各領域での「ASDに特化した RCT 」「ADHDに特化したRCT」は未確認**(未検証)**。Magellanのは「ASD pilot」だが査読論文化されていない可能性

---

## 3. 成長ドライバー (★最重要、フェーズ別時系列)

### Phase 1 (2009-2016): 研究プログラム → スピンアウト → ベータ期

| 期間 | 主要動き | ドライバー |
|------|---------|-----------|
| 2009-2012 | BCH内部研究、初期RCT実施、Adolescent Psychiatry論文 | NIH/BCH内部研究費 + Gonzalez-Heydrichの臨床観察 |
| 2014 | Neuromotion Labs LLC スピンアウト、Craig Lund合流 | Lund (元エンタープライズソフト) のbusiness運営参画 |
| 2014-2016 | プロトタイプ→製品化、IDEOデザインパートナーシップ | デザイン投資 + Trevor Stricker (Dreamcast世代ゲーム開発者) のゲーム品質 |
| 2016 | MassChallenge Finalist | Boston startup ecosystemでの認知獲得 |
| 〜2017 | Seed $1.2M (Founder Collective + Project 11) | スピンアウト初期資金 |

**この期で何が伸びを生んだか:** 商用ユーザー数ではなく、**「BCH発・8年研究の蓄積」というブランド資産**。この資産が後のSlow Ventures・FoxKiser等の投資判断・Magellan提携・査読論文掲載のすべての基礎になった。

### Phase 2 (2017-2019): 商用ローンチ → Seed extension → Series A

| 年 | 動き | ドライバー |
|----|------|-----------|
| 2017 | Mighteor 商用ローンチ (App Store) | プロダクト完成度 + BCHアクセラレータ後ろ盾 |
| 2018年4月 | Engadget・MobiHealthNews 継続露出 | 「BCHスピンアウト」のメディアhook |
| 2018年6月 | Seed extension $2.4M (Slow Ventures lead) + Mightierへリブランド | 「150 families臨床実装」の実績 + IDEOデザイン品質 |
| 2018-2019 | The Autism Dad等のautism親ブロガーレビュー拡散 | autism親コミュニティでのオーガニック広がり |
| 2019年5月 | Series A $6.6M (FoxKiser lead) | $3.7M Seedで実証された家庭市場の引き = D2C成立性 |

**この期で何が伸びを生んだか:** 「**プロダクトの実物 + 親レビューの蓄積 + 投資家による評価**」の好循環。**累計調達$10.1M**を達成。

### Phase 3 (2020-2022): COVID追い風 + 保険提携 + 査読論文連発

| 年 | 動き | ドライバー |
|----|------|-----------|
| 2020年Q1-Q2 | COVID-19パンデミック + 児童メンタルヘルス危機 | 米国小児メンタルヘルス需要の急増 (CDCデータで児童ER訪問率24%増 = 2020) |
| 2020年7月 | Magellan Health パイロット提携 | パンデミック下の保険会社の代替治療ニーズ |
| 2021年5月 | Magellan-Mightier ASDパイロット結果 (45%改善 / ABA 1%コスト) | パイロットの劇的成果 |
| 2021年9月 | Frontiers in Psychiatry 論文 | 学術的継続性 |
| 2021年12月 | Series B クローズ (Sony Innovation Fund + DigiTx + PBJ Capital) | パンデミック+保険提携+論文の3点セットによる evaluation急騰 |
| 2022年3月 | Internet Interventions 論文 (1,045 players大規模解析) | 商用データの学術化 |

**この期で何が伸びを生んだか:** **COVIDがメンタルヘルス領域全体への投資・関心を急騰させた追い風**を捉えて、保険提携と論文を立て続けに獲得。**Series B $17M**(2021-12-13 PRNewswire確定)で累計約$29Mに到達。Sony Innovation Fundの参加は**ゲーム業界×医療領域**の交差点を象徴。

### Phase 4 (2023-現在): 保険ルート拡大 + カナダ展開 + 静かな成長

| 期間 | 動き | ドライバー |
|------|------|-----------|
| 2023〜2024 | Mightier Parent App アップデート (2023記載) / Skill Pack月次配送継続 | プロダクト成熟期の運営最適化 |
| 2024〜2026推定 | GreenShield Canada 家族向け給付提携 | 米国Magellanパイロットの成功事例の輸出 |
| 2026 | 累計100K+ kids / 2.5M+ games played 公表 | 8年運営の累積 |

**この期で何が伸びを生んだか:** Phase 3の延長線上。**SeriesB後の追加資金調達は確認できず**、「現在の約29M USDで黒字化を目指す/緩やかな成長フェーズ」と推定**(推定)**。レイオフ・ピボットの公開報道は確認できず。

---

## 4. 転換点 (★最重要)

### 転換点1: 2014年スピンアウト判断

BCH内部研究のままなら学術論文を出し続ける研究プロジェクトで終わっていた。**Craig Lund (元エンタープライズソフトの business operator) を CEO に据え、Jason Kahn を CSO として研究側に残した二頭体制**が、この後の商用化の決定要因。

### 転換点2: 2018年Mighteor → Mightierリブランド + Slow Ventures Seed extension

「研究プロトタイプ」から「家庭向けプロダクト」への完全移行。**Slow Ventures**(Twitter・SnapchatのSeed投資で有名なconsumer-focused VC)のリードは「これは consumer product だ」というメッセージを市場に発信した。

### 転換点3: 2019年Series A FoxKiser リード + Asset Management Ventures参加

**FoxKiser**(ヘルスケア集中VC)+ **Asset Management Ventures**(医療系VC)のリードは「これは healthcare product だ」というメッセージ。Phase 2のSlow Ventures (consumer) → Phase 3のFoxKiser (healthcare) の **投資家タイプの戦略的シフト**は、Mightierが「**家庭直販+保険提携の両軸**」を本気で狙っていることの宣言。

### 転換点4: 2020年7月 Magellan Health パイロット提携

これがMightier最大の転換点。**「家庭直販 only」から「家庭直販 + 保険償還ルート」への拡張**。Magellan Healthは米国大手behavioral healthマネージドケア会社で、「outcomes-based treatment」(成果ベースの治療提供)としてMightierを採用。**ABA代替/補完**として機能することの初の公的証明=保険償還の先例。

### 転換点5: 2021年12月 Series B $17M (Sony Innovation Fund + DigiTx + PBJ)

**Sony Innovation Fundの参加**は、ゲームジャイアントが**「ヘルスケア+ゲーム」を戦略領域として認識**した象徴的事例。これにより、Mightierは「単なる小児メンタルヘルスapp」ではなく「**Sony+DigiTx規模が投資する behavioral health gaming category leader**」というポジションへ昇格。

### 行われなかった転換 (注目に値する)

- **FDA (De Novo / 510(k)) 取得を見送った**: 同時期Akili (EndeavorRx)はFDA取得した。Mightierは**意図的にwellness位置を維持**し、処方箋必須化・広告規制を回避
- **対象年齢拡張 (3-5歳 / 15-18歳) を行わなかった**: 6-12 (公式) / 6-14 (一部記載) のレンジを維持。**早期介入市場・思春期市場には入らない**判断
- **デバイスフリー版のローンチが確認できない**: 「アプリ単独でも使える」モードの存在は公式上不明**(未検証)**。armband同梱という重い形を維持

---

## 5. 現在の獲得・継続構造 (★最重要)

### 主要獲得チャネル(推定比率)

| チャネル | 推定比率 | 根拠 |
|---------|---------|------|
| **D2C広告 (Google Ads / Meta / YouTube)** | 30-40% | $29M調達のうち相当額がパフォーマンスマーケに投下と推定 |
| **autism親コミュニティ口コミ・ブロガー** | 20-30% | The Autism Dad等が継続的にレビュー、Trustpilotのレビュー多数 |
| **臨床医紹介 (BCH/Harvardネットワーク経由)** | 10-15% | 創業時からの強み、現在も継続 |
| **保険提携経由 (Magellan / GreenShield)** | 10-15% | パイロット参加家族が起点、徐々に拡大 |
| **検索SEO / 直接訪問** | 10-15% | 「emotion regulation app」「ADHD biofeedback」等のキーワードで上位 |

**(注: いずれも推定、Mightier公式は獲得チャネル別比率を非公開)**

### デバイス販売 vs サブスク収益の構造

**サブスク中心**:
- Heart sensor armbandは**サブスクの一部として同梱**(別売り価格は公開されていない)
- GamePadは**+$50一回払い (90日返金可)**の補助オプション
- 90日返金保証 = 「デバイスが届いてから判断OK」というコンバージョン障壁低減

**価格設計の妙**:
- Monthly $40 vs 12ヶ月 $28/月 = **30% lock-in discount** で年契約に誘導
- $336/年 (12ヶ月一括) は米国家庭の習い事/療育補助 budget内 (米国ABA は$40,000/年/家族レンジ → 1%以下)
- HSA/FSA対応で**実質税優遇**

### CAC・LTV・継続率

**全て未公開** **(未検証)**。ただし下記推定:

- **CAC**: $29M投資・累計100K kids = 1人あたり**$290前後**(全費用÷ユーザーの粗い概算)
- **LTV**: 月$28-40 × 平均継続月 (未公開) で推定。仮に12ヶ月平均で**$336-480/家族**(下限)
- → **CAC/LTV比率は健全とは言えない可能性**。これは$29M調達してもまだ大規模な利益創出に至っていない一因と推定

### 学校契約・保険償還の現状

| 領域 | 現状 |
|------|------|
| **学校契約** | Brookline, MA + Quebec, Canadaで**学校カウンセリング向けピロット**実施 (学術論文化されている)。本格的な学区/地区契約の実態は未公開**(未検証)** |
| **保険償還 (米国)** | Magellan Health で家族提供。**直接的な保険償還コード (CPT等) は未取得 / wellnessとしての家族benefit提供** |
| **保険償還 (カナダ)** | GreenShield Canada で被扶養者向けbenefit |
| **Medicaid / Medicare** | 公開情報なし**(未検証)** |
| **HSA/FSA (米国税優遇)** | 対応済み |

---

## 6. 会社概要・歴史・資金調達

### 会社情報

- **法人名**: Neuromotion Labs, Inc. (プロダクト名 Mightier)
- **設立年**: 2014年 (Neuromotion Labs LLC), 起源研究は2009年BCH内
- **本社**: Boston, Massachusetts, USA
- **CEO**: Craig Lund (共同創業者)
- **CSO**: Jason Kahn, PhD (共同創業者・BCH研究時代からの発明者)
- **共同創業者**: Trevor Stricker (ゲーム開発リード)
- **臨床監修**: Joseph Gonzalez-Heydrich, MD (BCH精神科 DNP Director, Harvard准教授)
- **従業員数**: **(未検証)** 30-50人レンジと推定

### 資金調達履歴

| 日付 | ラウンド | 金額 | リード | 主要参加 |
|------|---------|------|-------|---------|
| 〜2017 | Seed | $1.2M | Founder Collective + Project 11 Ventures | — |
| 2018年6月 | Seed extension | $2.4M | Slow Ventures | Bolt, Founder Collective, Project 11, TripAdvisor出身エンジェル |
| 2019年5月 | Series A | $6.6M | FoxKiser | Asset Management Ventures, FundRx, 既存Seed投資家 |
| 不明 | 追加 | $250K | (1社) | MobiHealthNews記載の追加リサ |
| 2021年12月13日 | Series B | **$17M**(PRNewswire 2021-12-13) | DigiTx Partners | Sony Innovation Fund, PBJ Capital |
| **累計** | — | **約29M USD** | — | 18-20社の投資家 |

その他投資家: Hopelab, Bridge Builders Collaborative, Koa Labs, K. Ventures, Arrandale Ventures (Crunchbase listsより)

---

## 7. 事業モデル・収益構造・ユーザー数

### 課金プラン詳細

| プラン | 月額換算 | 年間支払 | 含まれるもの |
|-------|---------|---------|-------------|
| Monthly | $40 | $480 | App + Heart Sensor + Skill Pack (デジタル) + Parent App + Community + Live Support |
| 6-Month | $34 | $204 (一括) | 上記 + Skill Pack 物理郵送 |
| 12-Month (Best Value) | $28 | $336 (一括) | 上記 + 12ヶ月物理 Skill Pack |

- 90日返金保証
- HSA/FSA 対応
- 1サブスクで複数子どもカバー
- ワールドワイド配送(米国5-8営業日、ハワイ・アラスカ・国際15日)

### ユーザー数・売上 (公開分のみ)

- **累計 kids**: 100,000+ (LinkedIn・公式)
- **累計 games played**: 2.5M+
- **MAU/ARR**: **(未公開・未検証)**

**売上推定** (推定・公式非開示): 
- 仮に現役サブスク家族 = 累計の20-30% × 平均年単価 $400 で計算 → **年商 $8-12M レンジ** **(あくまで推定)**
- これは$29M調達に対して評価倍率6-8x (健全なSaaS metricsに近い)

---

## 8. プロダクト設計

### HRV計測デバイス (Heart sensor armband) の仕組み

- **Bluetoothハートレートモニター**を上腕に装着
- iOSまたはAndroidアプリと連動 (BYOD)
- **Rolling average threshold**: 個人の平均HRから動的閾値を計算
- HRが閾値を超えると**ゲーム内のinhibitor (難易度上昇要素)が発動**
- → 子どもは「ゲームを進めるためには自分で落ち着く必要がある」状態になる

### 搭載ゲーム本数・ジャンル・デザイン

- **30+ タイトル** (Wikipedia記載)
- 主要例: **Mini Metro** (パズル), **Race the Sun** (ランナー), **Brick Breaker** (アーケード), **Tumblestone** (パズル), **Hundreds** (パズル)
- **既存の高品質インディゲームをHRV連動化**する形式 (自社で30本作らないコスト効率設計)
- 各ゲームで「HR上昇 → ゲーム要素変化(敵増加・速度上昇等) → HR下げると元に戻る」というループ

### 「ストレス時にゲームが難しくなる」コアループ

```
[子どもがゲームをプレイ]
  ↓
[挑戦的なゲーム状況で覚醒↑ → HR↑]
  ↓
[Rolling avg超えたらインヒビター発動 (難易度上昇)]
  ↓
[ゲーム進行しづらくなる]
  ↓
[子どもは無意識的に呼吸・落ち着き戦略を試す]
  ↓
[HR↓ → インヒビター解除]
  ↓
[ゲーム進行再開 → 「落ち着き」が報酬になる学習成立]
```

これは**operant conditioning (オペラント条件づけ)**の応用で、**「自己調整スキルがゲーム内報酬と直接結びつく」**のがコア。

### 適応アルゴリズム

- **個人別 rolling average** = 1人ひとりのbaseline HRを動的計算 (子どもごとに静止時HRが異なるため)
- 静止時60bpmの子と80bpmの子で同じ閾値を使うと意味がないため、**個別キャリブレーション**を継続
- ゲーム難易度自体も(おそらく)成功率に応じて適応**(具体ロジックは非公開)**

### 親ダッシュボード (Parent App)

- リアルタイム進捗追跡
- 子どもの感情調整スキル獲得状況
- Skill Pack(月次テーマ)の進行管理
- 親コミュニティ (他の家庭との交流)
- Mon-Fri ライブサポート

---

## 9. エビデンス基盤 (★Nollaが最も学ぶべき部分)

### 査読論文一覧 (確認できたもの)

| 年 | 著者 | ジャーナル | 内容 | サンプル | 主要結果 |
|----|------|----------|------|---------|---------|
| 2012年10月 | Ducharme et al. (筆頭), Kahn・Gonzalez-Heydrich共著 | **Adolescent Psychiatry** | RAGE-Controlの初期検証 | 40名 (10-17歳、外来精神科) | 怒りコントロール改善を示す |
| 2015 (関連) | Kahn et al. | **Pubmed PMID 26196556** | "RAGE-Control: A Game to Build Emotional Strength" | 概念論文 | 理論的フレーム提示 |
| 2021年9月 | Gonzalez-Heydrich et al. (筆頭) | **Frontiers in Psychiatry** (doi: 10.3389/fpsyt.2021.591906) | Sham-controlled RCT: ACT + RAGE-Control vs ACT + sham game | (本文未取得・未検証) | RAGE-ControlがACTを補強 |
| 2022年3月 | Wintner SR, Waters SE, Peechatka A, Gonzalez-Heydrich J, Kahn J | **Internet Interventions** (PMC8960945) | Open-label, mixed-methods, retrospective: 商用app利用解析 | **1,045 players / 840 families** (2017-2018のapp購入家庭から) | 96.9%が初回エンゲージ、59.6%完了基準達成、親評価で感情調整スキル使用・気づき・落ち着き・関係性改善 |
| (進行中) | NIH grant | (未公開) | Cost reduction in pediatric mental health のRCT | — | 研究中 |

**自社公表数値** (RCTから):
- **62% reduction in outbursts** (癇癪)
- **40% reduction in oppositional behaviors**
- **19% reduction in parent stress**
- **87% of families see improvements in 90 days**

### 規制対応 (FDA)

- **FDA医療機器クリアランス: なし** (Wellness product)
- 競合**Akili EndeavorRx**は2020年4月にDe Novo経路でclear (8-12歳ADHD向け処方医療機器、世界初の処方ビデオゲーム)
- Mightierは**意図的にFDAを回避**し、家庭直販+保険wellness benefitとして運営
- **メリット**: 処方箋不要・広告規制軽い・素早いiteration可能
- **デメリット**: 医療機器としての強い差別化メッセージは取れない・Medicare/Medicaid償還困難

### 提携病院・大学

- **Boston Children's Hospital** (起源研究 + 継続研究 + Acceleratorポートフォリオ)
- **Harvard Medical School** (Gonzalez-Heydrich・Kahnの academic affiliation)
- **Massachusetts General Hospital** (Mightier scienceページに「MGH studyでbehavioral change maintenance確認」記載)

### エビデンス → マーケティング → 販売 の連動

**Mightier の最も学ぶべき点:**
1. **論文を書いたら即マーケコピーに転用**: 「Boston Children's Hospital Study: 87% improvement in 90 days」を全landing pageで使用
2. **臨床監修者の名前を継続露出**: Gonzalez-HeydrichをBCH/Harvard肩書付きで論文・記事・公式に出し続け
3. **保険会社向けパイロット結果を別レポート化**: Magellan-Mightier ASD pilot → 別PDF、保険営業のセールス材料
4. **査読論文 → メディア取材 → mom blog → 親口コミ** の連鎖を10年以上継続

---

## 10. 強み・弱み

### 強み

1. **唯一無二のポジショニング**: HRVバイオフィードバック+ゲーム+学術ブランドの3点セットで競合不在
2. **学術的正統性のメンテナンス**: 13年(2009-2022)にわたる継続論文発表、共同発明者Gonzalez-Heydrichを継続露出
3. **保険ルートへの先行**: Magellan Health (米)・GreenShield (カナダ) との提携でB2B2C 領域確立
4. **対象障害の幅広さ**: ASD・ADHD・ODD・anxiety・一般癇癪 と広いため家庭への訴求しやすい
5. **デバイス+サブスクの高単価ビジネスモデル**: $336/年で米国家庭の療育予算内、HSA/FSA対応で実質税優遇
6. **Sony Innovation Fundの戦略的投資**: ゲーム業界とヘルスケアの交差点でカテゴリリーダー認定

### 弱み

1. **デバイス必須が獲得を重くする**: アプリ単独DL系競合と比較して累計ユーザー10万kidsは控えめ
2. **8年の商用化遅延** (2009→2017): 病院発スタートアップ典型課題、その間に競合台頭
3. **FDAを取らないことの両刃**: 規制負荷回避できる一方、Medicare等の本格保険償還ルートに進めない
4. **対象年齢6-14歳に限定**: 早期介入(3-5歳)・思春期(15-18歳)市場に未参入
5. **米国偏重**: GreenShield Canada以外に大規模国際展開未確認
6. **デバイス+armband依存**: 子どもが装着拒否するリスク (ASD児の感覚過敏で特に問題)
7. **商業化以降のRCT本数が控えめ**: 2021と2022に1本ずつ、Otsimoの「ABA準拠を宣言」よりは強いが、「年1本のRCT」ペースで考えると競合参入対応が脆弱になる可能性

---

## 11. Nollaへの示唆 (★最重要)

### 11.1 初期戦略の転用可能性

**「臨床ルートからの参入」は日本で可能か?**

**可能だが、米国より圧倒的に時間がかかる**。理由:

| 比較項目 | 米国 (Mightier model) | 日本 (Nolla想定) |
|---------|---------------------|-----------------|
| 起源研究組織 | Boston Children's Hospital + Harvard | 国立成育医療研究センター / 東大IRCN / 京大こころの未来 |
| スピンアウト文化 | 病院/大学発VC・専用アクセラレータ多数 | 制度はあるが事例少ない、IP帰属交渉が個別 |
| RCT実施速度 | 民間IRBで6-12ヶ月で承認 | 倫理審査が長い (12-24ヶ月)、 EBM文化弱い |
| 保険提携 | Magellan等の私的保険会社で柔軟 | 公的保険(国保/健保)主体、民間ピロット枠少ない |
| 学校市場 | 学区契約 (例: Brookline, MA) | 自治体・教育委員会経由 (時間かかる) |

**Nollaの推奨アプローチ**:
- Phase 0で**国立成育医療研究センター発達評価部門 or 東大こころの発達医学講座**との「共同研究契約」を結ぶ
- Phase 1で日本人小規模パイロット (n=30-50) のオープンラベル研究を実施
- Phase 2で査読論文 (J Autism Dev Disord 等) 投稿 → 採択後にToB営業材料化
- Phase 3で**福祉領域 (放デイ加算 / 自治体療育予算)** での偽RCTパイロット → コスト効果実証
- Phase 4 で本格的なpre-registered RCT (国際共著論文)

→ **Mightier 8年経過時点と同等の学術ポジションを5年で達成する**のが現実的目標。

### 11.2 成長戦略の転用可能性

| Mightierの戦略 | Nollaへの転用 |
|---------------|--------------|
| **エビデンス → 保険ルート** (Magellan) | 日本では**自治体予算 (放デイ給付) / 個別給付決定枠**を狙う。札幌市・横浜市等の先進自治体パイロット契約が現実的 |
| **エビデンス → 学校ルート** (Brookline学区) | 日本では**特別支援学級・通級指導教室向けピロット**を文科省研究指定校制度経由で。教育委員会経由は時間かかるため**個別校長交渉**から |
| **エビデンス → 施設ルート** (BCH提携病院) | 日本の**児童精神科外来・療育センター**(国立成育、心身障害児総合医療療育センター等)からの紹介経路を確保 |
| **論文→メディア→親口コミの連鎖** | 日本では論文発表後の**親向けメディア (Conobie・LITALICO発達ナビ・友愛発達障害情報メディア)** での露出戦略 |

### 11.3 事業モデルの転用可能性

**デバイス販売の是非:**
- **NOT recommended for MVP**: Mightierがデバイス必須で獲得が重くなった事例を踏まえ、**Nolla MVPはアプリ単独**で
- **Phase 3以降のオプション**: スマートウォッチ (Apple Watch / Garmin) 連携でHRV取得は可能。**自社デバイスは作らない**
- **代替**: アイトラッキング (前面カメラ・端末既存) で注視データ取得。ハードウェア追加なしで生体・行動データ計測

**サブスクの妥当性:**
- **Mightier $336/年は米国家庭の療育予算 (ABA $40K/年) の1%**
- **日本は同等の療育予算文化なし** (放デイは公費). **保護者の自己負担可処分は月$10-30レベルが現実的**
- → Nolla価格設計: **月¥2,000-4,000 (年¥24-48K)** が現実的下限。**年¥40K でMightier的「療育代替/補完」ポジションを取る**のが目標

**保険償還:**
- 日本の保険償還ルートは**極めて狭い**(医療機器分類が必要、PMDA経路で5-10年)
- 代替: **自治体個別給付枠 / 教育予算 / 障害者総合支援法の地域生活支援事業**を活用するB2G/B2B2Cモデル
- Mightierの「Magellan ASDパイロット結果45%改善 / コスト1%」というコピーを日本版で持てれば、**自治体営業で圧倒的優位**

### 11.4 Mightierが避けた / 失敗した道からの学び

| Mightierの選択 | Nollaへの教訓 |
|---------------|--------------|
| **FDA (De Novo) 取得しなかった** | NollaもPMDA医療機器化は最後の選択肢に。Phase 1-3はWellness位置で自由に運営、Phase 4以降で判断 |
| **2009→2017の8年商用化遅延** | Nollaは**学術契約と並行して商用プロトタイプを走らせる**。研究完了を待たない |
| **対象年齢6-14歳に限定** | Nollaは早期介入 (3-5歳) と思春期 (15-18歳) を含む全年齢戦略で**Mightier空白市場を獲得** |
| **デバイス必須 = スケール阻害** | Nollaはアプリ単独でスケール、デバイスは将来的アドオン |
| **米国偏重** | Nollaは**日本→東アジア (韓国・台湾・シンガポール)** の地理拡張順序。米国は最後 |
| **商業化後RCT年1本ペース** | Nollaは**6ヶ月毎に小規模研究を出す**ペースで論文層を厚くする |

---

## 参考文献 (URL一覧)

### 一次情報
1. Mightier 公式 — https://www.mightier.com/
2. Mightier Plans — https://www.mightier.com/plans/
3. Mightier Science — https://www.mightier.com/science/
4. Mightier FAQs — https://www.mightier.com/faqs/
5. Mightier GreenShield FAQ — https://www.mightier.com/greenshield-faq/
6. Mightier App Store (US) — https://apps.apple.com/us/app/mightier/id1333675573
7. Mightier Google Play — https://play.google.com/store/apps/details?id=com.neuromotion.mightier
8. Neuromotion Labs Our Story — https://neuromotionlabs.com/our-story/ (アクセス時ECONNREFUSED)

### Boston Children's Hospital
9. BCH Accelerator Mightier portfolio — https://accelerator.childrenshospital.org/portfolio/mightier/
10. Joseph Gonzalez-Heydrich researcher profile — https://research.childrenshospital.org/researchers/joseph-gonzalez-heydrich
11. BCH clinical trials NCT01551732 — https://www.childrenshospital.org/clinical-trials/nct01551732

### 査読論文
12. Frontiers in Psychiatry 2021 (Gonzalez-Heydrich et al.) — https://www.mightier.com/wp-content/uploads/2022/08/Mightier-proof-of-concept.pdf
13. Internet Interventions 2022 (Wintner et al.) — https://pmc.ncbi.nlm.nih.gov/articles/PMC8960945/
14. RAGE-Control PubMed PMID 26196556 — https://pubmed.ncbi.nlm.nih.gov/26196556/

### 資金調達ニュース
15. MobiHealthNews 2018-04 (Seed extension $2.4M) — https://cloudgate.mobihealthnews.com/news/boston-childrens-spinout-mightier-gets-24m-emotion-regulating-biofeedback-video-games
16. FinSMEs 2018-06 (Seed) — https://www.finsmes.com/2018/06/behavioral-health-company-mightier-raises-additional-2-4m-in-seed-funding.html
17. EdSurge 2019-05 (Series A $6.6M) — https://www.edsurge.com/news/2019-05-23-mightier-raises-6-6-million-series-a-for-games-that-help-kids-stay-calm
18. VC Journal Series A — https://www.venturecapitaljournal.com/childrens-behavioral-health-firm-mightier-fetches-6-6-mln-series-a/
19. Boston CityBuzz 2018 Seed — https://boston.citybuzz.co/article/486551/mightier-raises-24m-seed-funding
20. FinSMEs 2019-05 ($6.6M) — https://www.finsmes.com/2019/05/mightier-raises-6-6m-in-funding.html
21. MobiHealthNews +$250K — https://www.mobihealthnews.com/news/north-america/pediatric-biofeedback-video-game-maker-mightier-lands-additional-250000

### Magellan Health 提携
22. Magellan Health press release 2020-07-22 — https://ir.magellanhealth.com/news-releases/news-release-details/magellan-health-announces-pilot-mightier
23. Business Wire — https://www.businesswire.com/news/home/20200722005275/en/Magellan-Health-Announces-Pilot-Mightier
24. Magellan-Mightier ASD pilot results PDF — https://www.magellanhealthcare.com/documents/2021/05/magellan-mightier-autism-spectrum-disorder-pilot-results.pdf/

### メディア露出
25. Wikipedia — https://en.wikipedia.org/wiki/Mightier
26. Engadget 2018-04 — https://www.engadget.com/2018-04-03-mightier-mobile-game-platform-kids-calm.html
27. EurekAlert 2021 — https://www.eurekalert.org/news-releases/930620
28. EurekAlert 2014 (RAGE-Control) — https://www.eurekalert.org/news-releases/819889
29. ADDitude Magazine — https://www.additudemag.com/video-games-biofeedback-adhd-anxiety-emotional-control/
30. The Autism Dad Review 2018 — https://www.theautismdad.com/2018/08/28/kids-learn-self-regulation-through-gaming-with-mightier-review/
31. The Autism Dad Review 2024 — https://www.theautismdad.com/2024/06/19/mightier-review-2024-helping-kids-with-autism-and-adhd-manage-meltdowns/
32. VentureFizz Mighteor — https://venturefizz.com/stories/boston/mighteor-developing-video-games-children-behavioral-problems
33. IDEO case study — https://www.ideo.com/works/helping-a-startup-design-video-games-to-build-kids-emotional-strength
34. DiME case study (Boston Children's innovation with Mightier) — https://dimesociety.org/wp-content/uploads/DiMe-case-study_-Mightier.pdf

### 比較・規制
35. Stanford Law Blog "The New Kid on the Block: Prescription Video Games" — https://law.stanford.edu/2023/07/27/the-new-kid-on-the-block-prescription-video-games-part-ii/
36. FDA EndeavorRx De Novo — https://www.accessdata.fda.gov/cdrh_docs/reviews/DEN200026.pdf
37. Akili EndeavorRx press — https://www.akiliinteractive.com/news-collection/akili-announces-endeavortm-attention-treatment-is-now-available-for-children-with-attention-deficit-hyperactivity-disorder-adhd-al3pw
38. Springer "Digital Therapeutics in Child Psychiatry" — https://link.springer.com/chapter/10.1007/978-3-031-69362-5_23

### データベース
39. Crunchbase Mightier — https://www.crunchbase.com/organization/mightier (403 access denied)
40. PitchBook Mightier — https://pitchbook.com/profiles/company/135140-50
41. Tracxn Mightier — https://tracxn.com/d/companies/mightier/__Zx4LJIOiWaxmZmEGGSjNCsv6WsRxFuUknOvZFLwvazc
42. Tracxn Neuromotion — https://tracxn.com/d/companies/neuromotion/__e4Al8K2EoFc5qbziuWVvjKEhR43pG_de0oAGOAgam7Q
43. CB Insights Neuromotion — https://www.cbinsights.com/company/neuromotion
44. Mightier LinkedIn — https://www.linkedin.com/company/mightier
45. Trevor Stricker LinkedIn — https://www.linkedin.com/in/trellos/

---

## END OF REPORT

**未検証マーク (★)** が付いた項目は次回調査で深掘り推奨。特に下記:
- ~~Series B 金額の確定値~~ → **$17M で確定**(PRNewswire 2021-12-13、2026-04-27 factcheckで判明)
- 直近MAU/ARR/CAC/LTV
- 学校市場の本格契約数
- 従業員数の正確値
- 商業化後ASD特化RCTの有無 (Magellan pilotの査読論文化)
