---
STATUS: ACTIVE
LAST_UPDATED: 2026-04-27
PURPOSE: 5社(ABCmouse / Sago Mini / Toca Boca / Mightier / Khan Academy)ベンチマーク深掘りレポートに対する独立ファクトチェック。新規追記された「初期戦略・0→1・成長ドライバー・転換点」セクションと Mightier / Khan Academy 全文を重点検証
SCOPE: 各社レポートで主張されている数値・年・人物・契約・規制対応・査読論文を一次情報優先でクロスチェック
METHOD: WebSearch によるスニペット照合 + 既存ファクトチェック(`nolla_3company_factcheck_2026-04-27.md`)を補完
LIMITATION: WebFetch は 5 ファイル全体読了の中で個別 PDF・有料 DB(Crunchbase / PitchBook)直接アクセスは未実施。WebSearch スニペットによる主張一致確認が中心
---

# 5社レポート統合ファクトチェック — 2026-04-27

## サマリー

| 区分 | 件数 |
|---|---|
| 検証した重要主張 | 約 35 件 |
| 一次/準一次でクロスチェック確定 | 27 件 |
| **重大訂正必要(数値違い・誤りあり)** | **3 件** |
| 軽微な訂正/トーン修正推奨 | 4 件 |
| 確認できず(未検証フラグ維持で OK) | 4 件 |
| 訂正対象0だった既往の自己訂正(レポート内で既に正しく明示済) | 7 件 |

**総評**: 5 ファイルの主要事実関係は概ね一次情報で裏取り可能。**Mightier の調達額と Series B 金額表記**に明確な訂正が必要。それ以外は「★信頼度マーキング」が概ね適切に機能している。Jade ND/Sago Mini 過去事故(ポルトガル発・2009年Krogh設立)レベルの致命的誤情報は本5本では検出されず。

---

## 1. 重大訂正(誤情報・数値違い)

### 1-1. Mightier レポート: Series B 金額と累計調達額(★最重要訂正)

**該当箇所**: `nolla_mightier_deep_analysis_2026-04-27.md`

| レポート記述 | 一次情報による事実 | 訂正案 |
|---|---|---|
| Series B「**(金額非開示)**」「Wikipedia "$30M total raised" 表記から逆算で **20M前後と推定**」 | **Series B = $17M(2021-12-13、PRNewswire 公式)** | 「Series B = $17M(DigiTx Partners lead + Sony Innovation Fund + PBJ Capital)」と確定値で記述。「金額非開示」「20M前後と推定」の記述は削除 |
| 累計調達額「**約30M USD(≒45億円)**」「Wikipedia "$30 million in venture financing"・Crunchbase $27.7M〜$29M とほぼ一致」 | **PRNewswire 2021-12-13 リリース冒頭で「has raised $29 million in total funding to date」と Mightier 自身が公表** | 「累計調達 **$29M**(自社公表 2021-12-13 時点)」に訂正。「30M」「45億円」表記は厳密には誤り |

**一次ソース**:
- [PRNewswire 2021-12-13: Mightier Raises $17 Million](https://www.prnewswire.com/news-releases/mightier-raises-17-million-to-support-growing-number-of-kids-struggling-with-emotional-health-due-to-pandemic-301442914.html) — Series B $17M、累計$29M を明示
- [FinSMEs 2021-12 Mightier Raises $17M Series B](https://www.finsmes.com/2021/12/mightier-raises-17m-in-series-b-funding.html) — 同
- Wikipedia の「$30 million」は丸めた二次表記。一次プレスは$29M

**インパクト**: Series B 金額が「非開示」ではなく「$17M で公表済み」であることを把握できていない=リサーチ精度の問題。総額も $30M(報告値)→$29M(一次) で 1M 過大計上。LP/投資家説明資料での横展開時に修正必須。

### 1-2. Mightier レポート: Series B 後の累計表記の不一致

**該当箇所**: 同上、A 表内の「累計調達額 約30M USD」「Series B 金額非開示」とエグゼクティブサマリー「総調達額**約30M USD (≒45億円)**」の整合性

**一次情報**: $29M(2021-12-13 自社公表時点)。以降の追加ラウンドは公開なし。

**訂正案**: 「総調達額 **$29M USD(2021-12-13 時点公表値、約42億円)**」に統一。レポート全文を grep して「30M」「45億円」を「29M」「42億円」に置換。

### 1-3. ABCmouse レポート: 累計調達額の表記揺れ(軽度だが要統一)

**該当箇所**: `nolla_abcmouse_deep_analysis_2026-04-27.md` 1.1 表

| レポート記述 | 補強 / 訂正 |
|---|---|
| 「主要エクイティ調達 $500M(Series A $150M 2016 + Series B $50M 2020 + Series C $300M 2021)。Crunchbase全ラウンド合計 $531.5M。Tracxn $750M は孤立ソースで採用しない」 | **計算上 $150M + $50M + $300M = $500M** は内部整合。Crunchbase $531.5M は Seed/債務含む全ラウンド累計と推定 → 既に区別して記述しており **訂正不要**。Tracxn $750M を切り捨てる判断も妥当 |
| Series C: TPG主導 $300M / 評価額$3B(2021-06-29) | **Bloomberg / Los Angeles Business Journal で $3B 評価・TPG リード・2021-06-29 確定** ✅ | クロスチェック済 |

**結論**: ABCmouse 調達額は **訂正不要**(既存記述が正しい)。

---

## 2. 格下げ(出典不明・要慎重なもの)

### 2-1. ABCmouse レポート: 「2024年売上 $126.8M」(★☆☆ Latka)

- **状況**: 既に ★☆☆ で「Latka 単独ソース」と明示済。問題なし
- **推奨**: 数値を引用する際は必ず「Latka報告ベース、公式IRなし(非上場)」と但書を残す

### 2-2. ABCmouse レポート: 「教師無料配布 65,000教室で利用(2016)」「670,000教室(2024)」

- **状況**: ★★★ で EdSurge 2016 / 2024 Impact Report 引用済
- **推奨**: 数値そのものは公式公表。**ただし「米国K-5学校の87%で利用」は2016年公表値で、現時点(2026)の最新数値ではない** → 「2016時点」の年限を必ず併記する運用を徹底

### 2-3. Sago Mini レポート: 「100M parents using」

- **状況**: 既に ★☆☆「自社一次ソースの正確な原典は要再確認【未確認】」と明示済
- **推奨**: 投資家説明や対外発信では引用しない。「累計DL 90M+(2022/4 PR Newswire)」「MAU 約2M」のみを使用

### 2-4. Mightier レポート: 「累計100,000+ kids / 2.5M+ games played」(★★★ LinkedIn)

- **状況**: LinkedIn 自社 bio・Wikipedia で確認済だが**監査済みの数値ではない**(自社マーケ表記)
- **推奨**: 「自社公表ベース、第三者検証なし」と但書を加える

---

## 3. 格上げ(裏付け強化された主張)

### 3-1. ABCmouse: Doug Dohring 2023-09-14 死去 → Alex Galvagni CEO 昇格

- **既存表記**: ★★★(Wikipedia / dougdohring.weebly.com)
- **追加裏取り**:
  - [Age of Learning 公式 tribute ページ](https://www.ageoflearning.com/tribute/)
  - [Age of Learning 公式 New CEO Alex Galvagni](https://www.ageoflearning.com/introducing-our-new-ceo-alex-galvagni/)
  - 死因: 「private battle with cancer」(diagnosis 後 4ヶ月で死去) — レポートの「診断後4ヶ月で病没」記述と一致
- **結論**: 公式一次ソース複数で確定。**最高信頼度に格上げ**

### 3-2. Toca Boca: Toca Hair Salon 1週間無料化 → iPhone Top 10 入り(2011)

- **既存表記**: ★★☆「Vice / Medium」
- **追加裏取り**:
  - **Vice 記事原文**: 「The team made Toca Hair Salon free for a week, and it went into the top ten for iPhone」(複数二次で同文引用)
  - **Toca Hair Salon は US App Store で #4 到達**との別ソース確認
  - **Björn Jeffery 個人ブログ「2011 in review」**でも当時の動向裏取り可
- **結論**: ★★★ に格上げ可

### 3-3. Mightier: Magellan ASD パイロット結果(45%改善 / ABA 1%未満コスト)

- **既存表記**: ★★★(Magellan PDF・本文画像化のため二次サマリーで確認)
- **追加裏取り**:
  - **PRNewswire 2021-05 公式**: 「[Mightier Video Game Pilot Program with Magellan Healthcare Leads to 45% Improvement in Symptoms](https://www.prnewswire.com/news-releases/mightier-video-game-pilot-program-with-magellan-healthcare-leads-to-45-improvement-in-symptoms-for-children-with-autism-301288991.html)」
  - **詳細数値**: 「Mightier+ABA 81% 改善 vs ABA単独 55% 改善 = 相対 45%(81/55=1.47, 47%向上)」「ABA $40,000/年/家族」「3ヶ月、週1時間プレイ」
- **結論**: 一次プレス公式で完全に裏取り済。最高信頼度確定。**ただしレポートの「45% better symptomatic gains」は "improvement in symptoms" の意であって "差分45ポイント" ではない** → ニュアンス注意(現状記述は概ね正しいが、Nolla 営業資料に転載時は元プレスの言い回しを使うこと)

### 3-4. Khan Academy: Khanmigo K-12 学習者数 40K → 700K → 100万超

- **既存表記**: ★★★(K-12 Dive)
- **追加裏取り**:
  - [Khan Academy Annual Report SY24-25](https://annualreport.khanacademy.org/)
  - [K-12 Dive 2025 AI Tutoring Boom](https://www.k12dive.com/news/3-questions-for-k-12-leaders-to-consider-amid-the-ai-tutoring-boom/757314/)
  - **追加ファクト**: 「Khanmigo 全グローバルユーザー 2.0M(SY24-25)」「米国 District 770K 学生」「YoY 731%増」
- **結論**: 完全裏取り済

### 3-5. Khan Academy: Duck Duck Moose 買収 = $1(法的形式)+ Omidyar $3M 寄付

- **既存表記**: ★★★(EdSurge)
- **追加裏取り**:
  - [Fortune 2016: Donates Itself to Khan Academy](https://fortune.com/2016/08/26/khan-academy-duck-duck-moose/) — 「donates」表現確認
  - [TechCrunch 2016-08-26](https://techcrunch.com/2016/08/26/kids-app-maker-duck-duck-moose-joins-khan-academy/) — Duck Duck Moose 21アプリ・10M+ DL・Sequoia/Lightspeed/Stanford 出資ありと裏取り
  - **訂正**: レポート内「Duck Duck Moose(2008創業、Caroline Hu Flexer夫妻+Nicci Gabriel、累計53のApp Award)」の「**21 アプリ**」が他ソース。「**53 Award**」は別カウントの可能性で要再確認(★☆☆)
- **結論**: 主要事実は確定。「累計 53 App Award」の数値出典は本検証では取れず → ★☆☆ で残すこと推奨

### 3-6. Khan Academy: New Hampshire 全州契約 + Khanmigo

- **既存表記**: ★★★(NH 教育省)
- **追加裏取り**:
  - **追加ファクト**: $2.3M イニシアチブ・連邦COVID復興資金・2025-07-31 まで・**5-12年生対象**(K-2 ではない)・2025-03 時点で 50 学区・5,000 教師・40,000 学生
- **結論**: レポートの「New Hampshire 全州契約 + 全米初」表記は正しい。**ただし対象が「全教師・生徒」ではなく「5-12年生 + 教師」である点は補強推奨**

### 3-7. Mightier: RAGE-Control 2009 BCH 起源研究

- **既存表記**: ★★★
- **追加裏取り**:
  - [PubMed PMID 19745492](https://pubmed.ncbi.nlm.nih.gov/19745492/) — Kahn, Ducharme, Travers, Gonzalez-Heydrich (2009) Studies in Health Technology and Informatics 149: 335-43
  - **訂正提案**: レポート内「2012年10月 Adolescent Psychiatry 誌に最初の査読論文掲載(筆頭著者: Peter Ducharme)」 → **より初の論文は 2009年 Studies in Health Technology and Informatics(Kahn 筆頭)**である可能性が高い。Adolescent Psychiatry 2012 はその後の臨床RCT報告

---

## 4. レポート間矛盾(5社間で食い違う情報)

### 4-1. Sago Mini レポート vs Toca Boca レポート: Spin Master 買収額

| ソース | 表記 |
|---|---|
| Sago Mini レポート | 両社合計 SEK 263M(US$32M前後) |
| Toca Boca レポート | $30M 現金(SEC 推定)/ Bonnier 当初提示価格 $59M-$118M |
| 一次情報(Bloomberg/EdSurge) | **SEK 263M(両社合計)** で確定 |

- **矛盾**: 「SEK 263M ≒ US$32M(Sago Miniレポート)」 vs 「US$30M(Toca Bocaレポート)」
- **実態**: 為替レート換算の差(2016年4月時点 1 SEK ≈ $0.123 → 263M SEK ≈ $32M)。Toca Boca レポートの「$30M」は SEC 推定値、Sago Mini レポートの「$32M」は為替換算値。**両者ともに正しい範囲内**
- **訂正案**: 両レポートで「**SEK 263M(約 US$30-32M、為替換算とSEC推定の幅あり)**」と統一表記する

### 4-2. Sago Mini レポート: zincRoe 「Zimmer Twins、Stella and Sam、Nat Geo Kids」と Toca Boca/zincRoe 関係

- **既存記述**: zincRoe = 受託 Flash/Web/モバイル制作(Zimmer Twins ほか)
- **追加裏取り**: [Kidscreen 2013 / TechCrunch 2013-03-06](https://techcrunch.com/2013/03/06/kids-app-maker-toca-boca-expands-with-zinc-roe-acquisition-sets-up-studio-in-toronto/) — Tickle Tap apps を含む zincRoe IP を Toca Boca/Bonnier が買収、Sago Sago にリブランド・**5-6歳向け**ターゲットで再出発
- **微訂正**: レポートの「Sago Mini = 2-5歳の最年少向け」は最終的なポジションだが、**買収直後の Sago Sago は 5-6歳向け**だったことが TechCrunch 2013 に明記。年齢ターゲットは買収後にシフトしている
- **インパクト**: 軽微。Phase 別年齢ポジションの解像度を上げる程度

### 4-3. ABCmouse vs Khan Academy: 「米国K-5学校の87%カバー」表記

- **ABCmouse レポート**: 「米国K-5学校の87%で利用(2016時点)」 ★★☆
- **Khan Academy レポート**: 「米国K-5校の87%(2016)、全米教師700万人(2024)」
- **問題**: **「87%」は ABCmouse の指標**(EdSurge 2016)であり、Khan Academy のものではない可能性が高い → **Khan Academy レポートで Khan の指標として再引用しているなら誤転載**
- **要確認**: Khan Academy レポート 11.1 強み欄を再確認推奨

---

## 5. 検証エージェントの限界(自己評価)

| 検証項目 | 達成度 | 限界 |
|---|---|---|
| WebSearch スニペット照合 | ◎ | 一次プレスのリリース冒頭・キーフレーズ一致は確認可能 |
| WebFetch 個別記事読み込み | △ | Crunchbase/PitchBook は 403/Auth 必須でブロック。レポート自身も同様の制約と記載 |
| PubMed/Google Scholar 直接アクセス | △ | スニペット経由で論文タイトル・著者・誌名は確認できたが、**全文 PDF の本文ロジック確認は未実施**(例: Frontiers in Psychiatry 2021 の n、エフェクトサイズ、sham 設計の妥当性) |
| Crunchbase 等の有料 DB | × | 直接アクセス不可。レポート記載の数値は二次ソース(MobiHealthNews / FinSMEs / EdSurge)経由 |
| SEC 10-K 直接照合 | × | Spin Master 通期売上($2.2B-$2.3B)はプレス引用で確認、内訳セグメント詳細は未読 |
| Form 990 直接照合 | △ | Khan Academy Sal 年俸 $839,000(2019)は ProPublica Nonprofit Explorer に EIN 番号で誘導は確認したが PDF 直接読込は未実施 |
| 個別 RCT 論文の方法論評価 | × | 査読済みであることはタイトル+ジャーナル名で確認済。**プロトコル・サンプルサイズ・統計検出力の妥当性評価は本検証スコープ外** |

**総評**: 「数値・年・人物・契約事実」のレベルでは概ね一次/準一次裏取り完了。「**プロトコル・効果量・統計妥当性**」のレベルでは追加検証が必要(専門家レビューや論文全文取得が必要)。

---

## 6. 最終評価(社別品質スコア)

評価軸: ①事実誤認のなさ ②出典の質 ③信頼度マーキングの適切さ ④主張と証拠の対応

| 社 | スコア | 理由 |
|---|---|---|
| **ABCmouse** | **A-** | 事実誤認なし。Doug Dohring 死去・Galvagni CEO 昇格・FTC $10M・TPG Series C 等の主要事実は一次裏取り済。Latka 売上 $126.8M を ★☆☆ で適切に格下げ済。「教師無料配布 65,000→670,000」の年限併記運用に注意 |
| **Sago Mini** | **A-** | zincRoe 2001 / Sago Sago 2013 リブランド / Spin Master 2016 SEK 263M / Otsimo 2022 等の主要事実は一次裏取り済。「100M parents」を ★☆☆ で適切に格下げ済。Toca Boca レポートとの買収額表記の幅(SEK→USD換算差)は併記推奨 |
| **Toca Boca** | **A-** | Toca Hair Salon 無料化 → iPhone Top10、Spin Master 買収、Toca Boca World 統合、Days シャットダウン等の主要事実は一次裏取り済。「DL 10億」「MAU 60M+」も Spin Master IR で確認可。**現Toca Boca 代表が【未確認】のままなのは透明性として OK** |
| **Mightier** | **B+(訂正後 A-)** | **Series B $17M / 累計 $29M** という一次プレスで明確な数値があるのに「金額非開示」「30M」と記述している点が重大訂正対象。**訂正後は A- 相当**。RCT・Magellan・BCH 起源・FDA 非取得等は一次裏取り済 |
| **Khan Academy** | **A** | 5本中最も精度が高い。Khanmigo 学習者数推移、SAT/CB 提携、Duck Duck Moose 買収、NH 全州契約、$107.3M 売上、Sal Khan 年俸 $839K (2019) 等の主要事実は一次裏取り済。「米国K-5校 87%」(11.1) が ABCmouse の指標を Khan に転用していないか軽い再確認推奨 |

**総合評価**: 5本中 4本が **A-/A レンジ**。Mightier のみ **重大訂正後に同レンジ到達**。Jade ND「ポルトガル発」「185K DL」レベルの致命誤情報は検出されず=「過去の事故から学んだエビデンス絶対主義」が機能している証跡。

---

## 参考文献(URL一覧)

### ABCmouse
- [Bloomberg: ABCmouse Creator Valued at $3 Billion](https://www.bloomberg.com/news/articles/2021-06-29/abcmouse-creator-valued-at-3-billion-with-tpg-led-funding-round)
- [Age of Learning 公式 Series C Press](https://www.ageoflearning.com/age-of-learning-raises-300-million-in-financing-led-by-tpg/)
- [Age of Learning 公式 Tribute (Doug Dohring)](https://www.ageoflearning.com/tribute/)
- [Age of Learning 公式 Alex Galvagni CEO](https://www.ageoflearning.com/introducing-our-new-ceo-alex-galvagni/)
- [Doug Dohring Wikipedia](https://en.wikipedia.org/wiki/Doug_Dohring)
- [FTC ABCmouse Settlement 2020](https://www.ftc.gov/business-guidance/blog/2020/09/10-million-abcmouse-settlement-avoiding-auto-renewal-traps)

### Sago Mini / Toca Boca
- [PRNewswire Spin Master Acquires Toca Boca + Sago](https://www.prnewswire.com/news-releases/spin-master-announces-the-purchase-of-toca-boca-and-sago-mini-leading-global-kids-mobile-digital-app-brands-576557261.html)
- [TechCrunch 2013 zincRoe Acquisition](https://techcrunch.com/2013/03/06/kids-app-maker-toca-boca-expands-with-zinc-roe-acquisition-sets-up-studio-in-toronto/)
- [TechCrunch 2016 Toca Boca Sells to Spin Master](https://techcrunch.com/2016/04/25/top-kids-app-maker-toca-boca-sells-to-spin-master-plans-to-launch-subscription-video-service-and-toys/)
- [Kidscreen 2016 Spin Master Buys Appmakers](https://kidscreen.com/2016/04/21/spin-master-buys-appmakers-toca-boca-sago-mini/)
- [Vice: Meet Toca Boca](https://www.vice.com/en/article/meet-toca-boca-the-disney-destroyers-of-the-app-store/)
- [Toca Boca Wikipedia](https://en.wikipedia.org/wiki/Toca_Boca)
- [Sago Mini Wikipedia](https://en.wikipedia.org/wiki/Sago_Mini)
- [PRNewswire Sago Mini × Otsimo First Words 2022](https://www.prnewswire.com/news-releases/spin-masters-sago-mini-studio-collaborates-with-otsimo-on-a-new-speech-app-for-children-sago-mini-first-words-301519889.html)

### Mightier
- [PRNewswire Mightier Series B $17M 2021-12-13](https://www.prnewswire.com/news-releases/mightier-raises-17-million-to-support-growing-number-of-kids-struggling-with-emotional-health-due-to-pandemic-301442914.html)
- [FinSMEs Mightier Series B](https://www.finsmes.com/2021/12/mightier-raises-17m-in-series-b-funding.html)
- [PRNewswire Mightier-Magellan ASD Pilot 45% 2021-05](https://www.prnewswire.com/news-releases/mightier-video-game-pilot-program-with-magellan-healthcare-leads-to-45-improvement-in-symptoms-for-children-with-autism-301288991.html)
- [Magellan-Mightier ASD Pilot PDF](https://www.magellanhealthcare.com/documents/2021/05/magellan-mightier-autism-spectrum-disorder-pilot-results.pdf/)
- [PubMed PMID 19745492 RAGE-Control 2009](https://pubmed.ncbi.nlm.nih.gov/19745492/)
- [Mightier Wikipedia](https://en.wikipedia.org/wiki/Mightier)
- [Joseph Gonzalez-Heydrich BCH](https://research.childrenshospital.org/researchers/joseph-gonzalez-heydrich)

### Khan Academy
- [Khan Academy Annual Report SY24-25](https://annualreport.khanacademy.org/)
- [K-12 Dive: AI Tutoring Boom](https://www.k12dive.com/news/3-questions-for-k-12-leaders-to-consider-amid-the-ai-tutoring-boom/757314/)
- [THE Journal: Khanmigo Pilot 2023-03-14](https://thejournal.com/articles/2023/03/14/khan-academy-pilots-gpt-4-powered-tool-khanmigo-for-teachers.aspx)
- [TechCrunch 2014 Khan-College Board](https://techcrunch.com/2014/03/05/khan-academy-gets-major-partnership-to-close-rich-advantage-in-college-test-prep/)
- [EdSurge: Khan Buys Duck Duck Moose for $1](https://www.edsurge.com/news/2016-08-27-khan-academy-buys-children-s-app-developer-duck-duck-moose-for-1)
- [Fortune: Duck Duck Moose Donates Itself](https://fortune.com/2016/08/26/khan-academy-duck-duck-moose/)
- [NH Education: Khan Academy Free AI](https://www.education.nh.gov/news-and-media/khan-academy-extend-its-ai-services-no-cost-new-hampshire-educators-and-students)
- [Khan Academy Blog NH Free Khanmigo](https://blog.khanacademy.org/announcing-free-khanmigo-for-new-hampshire/)
- [ProPublica Khan Academy Form 990](https://projects.propublica.org/nonprofits/organizations/261544963)
- [College Board SAT Practice 115-Point](https://newsroom.collegeboard.org/new-data-links-20-hours-personalized-official-sat-practice-khan-academy-115-point-average-score)

---

## END
