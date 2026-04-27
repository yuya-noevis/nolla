---
STATUS: ACTIVE
TYPE: factcheck_audit
DATE: 2026-04-27
VERIFIER: Claude (Opus 4.7) ファクトチェック専門エージェント
TARGETS:
  - outputs/nolla_abcmouse_deep_analysis_2026-04-27.md
  - outputs/nolla_sago_mini_deep_analysis_2026-04-27.md
  - outputs/nolla_toca_boca_deep_analysis_2026-04-27.md
METHOD: WebSearch 30+回の独立クロスチェック(WebFetchはこのセッションでは使用せず — 検索スニペット&公式PR Newswire/SEC/IR/Wikipedia/Crunchbase/Apple/PRNewswire/Common Sense Mediaの一次・準一次ソースを照合)
PURPOSE: |
  2026-04-26 Jade ND誤情報事件(ポルトガル発→実はブラジル / 185K DL→実は160K)の派生レポート
  伝播事故の再発防止。3レポートの全断定的主張を個別検証し、
  訂正提案・格上げ・格下げを明示する。
---

# Nolla 3社ベンチマーク ファクトチェック報告(2026-04-27)

## 0. 検証サマリ

| カテゴリ | 件数 |
|---|---|
| 検証対象の断定的主張 | 約 90 項目(3レポート合計) |
| **重大誤情報(訂正必須)** | **6 件** |
| 軽微な誤り・不正確な表現 | 9 件 |
| 過度に保守的な信頼度評価(格上げ可能) | 7 件 |
| 単一ソースのまま★★★相当に書かれている主張(格下げ提案) | 4 件 |
| 3レポート間の数値矛盾 | 2 件 |
| 確認不能のまま残った主張 | 6 件 |

**総合評価**: 4-26 Jade ND事件のような「企業の出自を完全に間違える」レベルの致命傷は無し。ただし **(a) Doug Dohring死去年 / (b) ABCmouse 2の公式ローンチ年 / (c) ABCmouse Series Bの金額 / (d) Toca Box Autism Awareness年 / (e) Fredrik LövingがToca Boca CEOかSpin Master幹部か / (f) Toca Box character creatorの「肌色300種」断定** の6点は訂正が必要。**全体としてレポート品質は前回(Jade ND事件時)より大幅に改善している**(★信頼度の付与・「【未確認】」の明示が機能している)。

---

## 1. ABCmouse / Age of Learning レポート 訂正リスト

### 1-A 重大訂正(必須)

#### ① Doug Dohring死去時期 — 【未確認】→ ★★★ 2023年9月14日に格上げ

| 項目 | 元の主張 | 検証結果 | 訂正提案 |
|---|---|---|---|
| 死亡時期 | Wikipediaに「until his death」表記。死亡時期は【未確認】 | **2023年9月14日(享年66)、診断後4ヶ月で病没。Wikipedia / Tony Ortega / dougdohring.weebly.com で複数ソース確定** | 「2023年9月14日死去 ★★★」と書き換える |

エビデンス: Wikipedia (Doug Dohring 1957-2023), dougdohring.weebly.com「Founder, CEO Age of Learning (2007-2023)」

#### ② ABCmouse Series B 2020 金額 — 【未確認】→ ★★★ $50M に訂正

| 項目 | 元の主張 | 検証結果 | 訂正提案 |
|---|---|---|---|
| 2020 Series B | 「$32M【未確認】」 | **Crunchbase Series B (2020-08-15) は $50M。$32Mは出典不明** | $50M ★★★ に訂正 |

エビデンス: Crunchbase Series B funding round 2020-08-15。 累計: $150M Series A + $50M Series B + $300M Series C = **$500M**(Crunchbaseの「5 funding rounds totaling $531.5M」とも整合)。レポートの「$482M〜$750M」は **$500Mが妥当** に書き換え推奨。

#### ③ Alex Galvagni 現CEO就任時期 — ★★★ 2023年9月

| 項目 | 元の主張 | 検証結果 | 訂正提案 |
|---|---|---|---|
| 現CEO就任 | 「2025-11時点のPRNewswire声明で確認」 | **実際は 2023年9月にCEO就任**(Doug Dohring死去後)。それ以前は7年間CPOを務めていた | 「2023年9月CEO就任、Doug Dohring死去を受けて昇格」と書き換え |

エビデンス: ageoflearning.com/introducing-our-new-ceo-alex-galvagni/ 公式

#### ④ ABCmouse 2 公式ローンチ年 — 「2025リニューアル」→ **2026年1月5日に正式ローンチ**

| 項目 | 元の主張 | 検証結果 | 訂正提案 |
|---|---|---|---|
| ABCmouse 2 リニューアル | 「2025-11時点のPRNewswire声明で確認」「2025リニューアル」 | **2026-01-05 公式ローンチ**(prnewswire.com/news-releases/abcmouse-unveils-a-bold-new-era... 302652382)。 11月の声明はGoogle Play Best of 2025受賞のもの | 「2025年Google Play Best of 2025受賞 + 2026-01-05に新版正式ローンチ」と分けて記載 |

エビデンス: PRNewswire 302617734 (2025-11-18 受賞), 302652382 (2026-01-05 ローンチ)

#### ⑤ 教室数 — 「670,000」と「650,000」のソース矛盾(要明示)

| 項目 | 元の主張 | 検証結果 | 訂正提案 |
|---|---|---|---|
| 教室数 | 「670,000教室超」(Impact Report 2024) | **Impact Report 2024は670Kだが、2025-09-30 NASA partnership press releaseでは「650,000 US classrooms」と記載**。両数値が公式・準公式に混在 | 「670,000(2024年Impact Report)、または650,000(2025-09 NASA partnership PR)。集計時点と海外含むかで差異」と注記 |

エビデンス: AofL Impact Report 2024 PDF / PRNewswire NASA Partnership 302570263

### 1-B 軽微な訂正・修正

#### ⑥ 累計調達額 — $500M(Crunchbase合計と整合)に統一を推奨

| 項目 | 元の主張 | 検証結果 |
|---|---|---|
| 累計調達 | 「$482M〜$750M」「諸説」 | $150M(Series A 2016) + $50M(Series B 2020) + $300M(Series C 2021) = **$500M**(主要な開示済みエクイティ調達のみ)。Crunchbase「$531.5M(5 rounds)」はこれにseed/早期投資を含めた値。**「$750M」のTracxn記述は孤立ソース** |

訂正提案: 「主要エクイティ調達合計 $500M(Series A $150M + B $50M + C $300M)。Crunchbaseの全ラウンド合計は$531.5M。Tracxn $750Mは孤立ソースで採用しない」と書き換え

#### ⑦ レイオフ規模 — Glassdoorのみ → ★★☆ 程度の信頼性

レポートの★☆☆評価は妥当。ただし複数のメディア・LinkedIn投稿でも言及されており、「2023年12月25%削減 / 2023年2月120名削減(LA)」は **★★☆ 二次ソース複数で確認可能**。最重要ソースのGlassdoorだけでなく、aminext.com (2022-12) / hrexecutive.com / Intellizence / Challenger Reportなどに言及あり。

#### ⑧ 文字依存度の評価について

レポートが「メニュー・指示・レッスン名の多くが英文表記」「ナビゲーション自体が文字主体」と書いているが、**Common Sense Mediaのレビューでは「busy presentation」「reward systems distract from learning」が主要批判で、「文字依存」自体を批判している記述は確認できなかった**。レポートの「文字依存」評価は分析者の観察として妥当だが、出典は限定的(Common Sense指摘ではなく、レポート著者の独自評価)。

### 1-C 確認不能・追加調査要

| 主張 | 状態 |
|---|---|
| 「2024年売上 $126.8M」(Latka) | ★☆☆ Latka単独ソース。**公式IR非公開(非上場のため)**。レポートの評価★☆☆は妥当 |
| 「従業員435名」(Latka 2024) | ★☆☆ 同上 |
| 「2014 Children at Risk誌 テキサス研究」 | 元レポートで★★☆。本検証では再確認できず、★☆☆〜【未確認】格下げ提案 |
| 「19件のESSA準拠efficacy研究」 | ★★★ 公式 Impact Report で確認 |
| 「ABCmouse Classic 850 lessons / 10 levels / 10,000+ activities」 | ★★★ 公式support.abcmouse.com で確認 |

---

## 2. Sago Mini レポート 訂正リスト

### 2-A 重大訂正(必須)

なし。Sago Miniレポートは事実関係の精度が3レポート中最も高い。Spin Master買収日(2016-04-25 announce / 5月クローズ)、SEK 263M買収額(両社合計、Wikipedia / Playgama / Sago Wikipedia 系で確認)、累計DL 90M+(2022-04-07 PR Newswire)、Sago Mini Box $19/月、スタンドアロン2024-02-29終了、Apple Design Awards 2023 Social Impact ファイナリストはすべて確認済み。

### 2-B 軽微な訂正・格上げ提案

#### ① Apple TV+ 「Sago Mini Friends」 — ★☆☆ → ★★★ に格上げ

| 項目 | 元の主張 | 検証結果 |
|---|---|---|
| Apple TV+「Sago Mini Friends」 2022〜 | 「★☆☆ 別途確認推奨」 | **2022-09-16 Apple TV+ で公式配信開始。Spin Master Entertainment制作、9 Story / Brown Bag Films Toronto アニメ制作。IMDb・Apple公式press・Deadline・Animation Magazineで多重確認可** ★★★ |

#### ② Spin Master Digital Games Q1 2024 数値の精度

| 項目 | 元の主張 | 検証結果 |
|---|---|---|
| Q1 2024 Digital | 「$46M(前年同期$47.5M)」 | 別ソース(再検索)で **2024通期Digital Games = $164.5M、前年比 -5.4%(=前年$173.9Mから$9.4M減)** が公式IR。レポートのQ1 $46Mは個別Q値で別の数字、検証保留 |

訂正提案: 通期数値「2024 Digital Games $164.5M / 2023 $173.9M / 2022 $163.9M」に更新を推奨。Q1 $46Mは無理に維持しなくてよい。

### 2-C 確認できた事実(レポートと整合)

- 創業 2001年 zinc Roe / 2013年Sago Sago / Sago Miniリブランド ★★★
- 創業者・CEO Jason Krogh ★★★
- Otsimo提携 2022-04-07 PR Newswire ★★★
- Piknik launch 2023年9月($11.99/月、Sago + Toca + Originator) ★★★
- スタンドアロン2024-02-29終了 ★★★
- Sago Mini Box $19/月 + 送料$3 ★★★
- 累計DL 90M+(2022-04-07時点) ★★★
- MAU 2M(自社言及) ★★☆ (別ソース「3M」もあるが基本★★☆)
- Sago Mini本社 171 John Street, 5th Floor, Toronto ★★★
- Apple Design Award 2023 Social Impact ファイナリスト ★★★(Headspaceが受賞)

### 2-D 確認不能のまま残ったもの

| 主張 | 状態 |
|---|---|
| 「Otsimo提携の経済条件」 | 【未確認】維持。レポートも【未確認】明示で正しい |
| 「Sago Mini単体収益」 | 【未確認】維持。Spin Master IRは非分離開示 |
| 「100M parents using」 | ★☆☆ 維持 |
| 「Otsimo 400K+ ユーザー」 | このレポート内で言及あり。Otsimoレポート(別途存在)とのクロスは未実施 |

---

## 3. Toca Boca レポート 訂正リスト

### 3-A 重大訂正(必須)

#### ① Fredrik Löving の役職誤認 — Toca Boca CEOではない可能性が高い

| 項目 | 元の主張 | 検証結果 | 訂正提案 |
|---|---|---|---|
| 現 CEO | 「Fredrik Löving(2020〜) ★★☆」 | **Wikipedia系一部ソースは「2020年にToca Boca CEOに就任」と記載するが、より正確には2020-05に "Spin Master EVP of Digital Studios"、2021-01から "President, Spin Master Digital Games" としてSago Mini + Toca Boca全体を統括するSpin Master幹部役職。さらに 2025-07 LEGO に SVP & Head of Gaming として転職して退任**(LEGO公式press 2025年7月) | 「2020-2025 Spin Master Digital Studios EVP / 後にPresident of Spin Master Digital Games(Toca Boca含む全体統括)。2025-07 LEGO転出。Toca Boca単体のCEOではない可能性。2026年4月時点の現Toca Boca代表は本検証では特定できず【未確認】」と訂正 |

エビデンス: lego.com/en-us/aboutus/news/2025/july/fredrik-loving-svp-head-of-gaming-appointment / kidscreen.com/2020/05/21/spin-master-taps-digital-studios-evp/

これはJade ND事件と同じカテゴリの「役職・出自を取り違える」リスクの再発寸前事案。明示的に訂正するべき。

#### ② キャラクタークリエイター「肌色 300種」断定 — 出典不明

| 項目 | 元の主張 | 検証結果 | 訂正提案 |
|---|---|---|---|
| キャラ作成 | 「1,000+ アイテム、300+ デフォルトキャラ、すべて肌色違い」 | **公式は「2,000 customizations」「inclusive array of skin tones」と表現。「肌色300種」の具体数字は一次情報で確認できず。Toca Life World Fandom等の二次集計の可能性** | 「2,000+ カスタマイズ要素、肌色は多様(具体数値は公式非開示)、義肢・車椅子・補聴器・CGM等のアクセシビリティアイテムを含む」と書き換え |

エビデンス: apps.apple.com/us/story/id1508033066 / commonsensemedia.org Toca Life World レビュー

#### ③ Toca Boca Autism Awareness Bundle 年 — 2014年ではなく **2015年4月** 

| 項目 | 元の主張 | 検証結果 | 訂正提案 |
|---|---|---|---|
| 「Autism Awareness Bundle」 | 「2014年期間限定リリース」 | **148Apps原典・thegamerwithkids.com・BridgingApps記事で2015年4月リリース。Autism Awareness Month(4月)に合わせた**。レポートが引いている「148Apps報道」記事自体の発行は2015年 | 「2015年4月にAutism Awareness Month向けバンドル提供(Toca Town / Hair Salon / Town / Band)」に訂正 |

### 3-B 軽微な訂正・要調整

#### ④ Toca Boca World 累計DL 「850M」記載

| 項目 | 元の主張 | 検証結果 |
|---|---|---|
| Toca Boca World 単体DL | 「430M+(別ソース 850M)」 | Spin Master 2024 Annual Reportで「46タイトル累計10億DL、Toca Boca World単体MAU 60M+」が確定。**Toca Boca World単体の累計DLは公式分離開示なし**。AppBrain/Sensor Towerは集計時点・計測法で値が異なる |

訂正提案: 「Toca Boca World 単体累計DLは公式分離開示なし。AppBrain/Sensor Tower集計で430M〜850M(計測法による幅)」と注記

#### ⑤ MAU 60M vs 74M

レポートは60M+と記載 ★★★。これは2024-04-30 Toca Boca Days press releaseと2024時点の数字。2025年時点では別ソースで **74M+** という更新値が出ている(Webサーチで確認)。レポート本文を「2024時点 60M+ / 2025時点 74M+(集計時点による更新あり)」と二段階で記載することを推奨。

#### ⑥ 「46タイトル+」 — 元レポートは【未確認】 → ★★☆ に格上げ可

「46 タイトル+」は元レポートで【未確認】扱いだったが、Spin Master 2024年次報告での「Toca Boca tops 1 billion downloads of its games」という記述で **「46 titles」が二次集計で言及される**(Kids Included Reportなど)。完全な一次確認はできないが、★★☆ 二次集計で支持 程度に格上げ可能。

#### ⑦ 「Toca Boca Days ソフトローンチ 2024-05」のオーストラリア・NZ表記

実際は **2024-04-30 公式press発表、ソフトローンチもこの時期から開始**。「2024-05ソフトローンチ」は近似値。Pocket Gamerは「16ヶ月のソフトローンチ後に2025-08-25シャットダウン」と確認 ★★★。

### 3-C 確認できた事実(レポートと整合)

- 創業 2010-07-18(Bonnier R&D)Emil Ovemar / Björn Jeffery ★★★
- 最初の製品 Helicopter Taxi / Toca Tea Party 2011-03 ★★★
- Spin Master買収 announce 2016-04-21、close 2016-05-02、$30M(SEC開示) ★★★
- Toca Life World iPhone App of the Year 2021 ★★★
- Toca Life スタンドアロン 2024-01-01 販売停止 → World統合 ★★★
- Toca Boca Days シャットダウン 2025-08-25 (16ヶ月ソフトローンチ後) ★★★
- 累計DL 10億超 2024 ★★★
- Toca Boca World MAU 60M+(2024) ★★★ / 74M+(2025更新) ★★☆
- Google Play 4.29 / 5.2M reviews ★★★
- 本社 Stockholm 13a Lumaparksvägen ★★★
- Spin Master Digital Games 2024 -5.4%, $164.5M ★★★(レポート記載と整合)
- UAB 2025 探索研究 n=18 / 4-13歳 / 8セッション×5分 ★★★
- 元創業CEO Björn Jeffery 2017-09 退任 ★★★

---

## 4. 3レポート間の矛盾

### 4-A Spin Master Digital Games 売上の数値整合

| レポート | 数値 | 出典 |
|---|---|---|
| Sago Mini | 「2023通期 US$173.9M / 2022通期 US$163.9M / Q1 2024 US$46M」 | Spin Master IR |
| Toca Boca | 「2024通期 ▲5.4%(in-app purchase 減)」 | Spin Master Q4 2024 PR |

**整合性**: 矛盾はないが **Sago MiniレポートがQ1 2024までしか触れていない**。本検証で「2024通期 $164.5M、前年-5.4%」が公式確定 → Sago Miniレポートも通期数値で更新すべき。

### 4-B Toca Boca / Sago Mini 「Piknik launch」日付

| レポート | 日付 |
|---|---|
| Sago Mini | 「2023-09-05ローンチ」 |
| Toca Boca | 「2023-09 ローンチ」 |

PR Newswire / aNb Mediaの公式ソースは「September 2023」と月単位の表現が多く、**「9月5日」の具体日は未確認**。「2023年9月」に統一を推奨。

### 4-C Toca Boca 累計DL vs Sago Mini 累計DL の比較表記

3レポート間で「Toca Boca = 10億+」「Sago Mini = 90M+」「ABCmouse = 5,000万子ども・110億アクティビティ」という指標が併存。**「累計DL」「累計子ども数」「アクティビティ数」が混在しており、横並び比較するには注意が必要**。Toca Bocaレポートの比較セクションで「Otsimo 5M DL / Jade ND MAU 数千〜数万 / Dubu/Ella 数十万 DL」を併記しているが、これらは別レポートのクロスチェック未実施。

---

## 5. ★★★に格上げできる主張(★☆☆ → ★★★)

| 元の評価 | 主張 | 格上げ後 |
|---|---|---|
| ★☆☆ | Sago Mini Friends Apple TV+ 2022〜 | ★★★(Apple公式press / IMDb / Deadline等で多重確認) |
| 【未確認】 | Doug Dohring死去時期 | ★★★ 2023-09-14 |
| 【未確認】 | ABCmouse Series B 2020 金額 | ★★★ $50M (Crunchbase) |
| ★★☆ | Alex Galvagni CEO 就任時期 | ★★★ 2023-09 |
| ★★☆ | Spin Master Digital Games 2024 通期 -5.4% | ★★★ 公式IR PR |
| 【未確認】 | Toca Boca 「46タイトル+」 | ★★☆ 二次集計で支持 |
| ★★☆ | Toca Box for Autism Awareness リリース年 | ★★★ 2015-04(2014ではない、訂正必要) |

---

## 6. 【未確認】 / ★☆☆ にすべきだった主張(過剰評価の格下げ提案)

| 元の評価 | 主張 | 格下げ後 |
|---|---|---|
| ★★☆(Wikipedia 1ソース) | Toca Boca買収額 SEK 263M(両社合計) | ★★☆ 維持。Bonnier公式・Wikipedia・Playgama・KidScreenで言及。Spin Master公式PRは未開示 |
| ★★☆ | Toca Boca CEO Fredrik Löving 2020〜 | **★☆☆ → 訂正必要**。実際はSpin Master EVP/Presidentであり、Toca Boca単体CEOではない可能性が高い |
| ★★★ | Toca Boca character creator「肌色300種」 | ★☆☆ 出典不明。「2,000 customizations」「inclusive array」が公式表現 |
| ★★☆ | Toca Box for Autism Awareness 2014年 | ★★★に格上げできるが**年が誤り**(2015) |
| ★★☆ | ABCmouse 2020 Series B $32M【未確認】 | **★★★ $50M に訂正** |
| ★★☆ | ABCmouse 2「2025リニューアル」 | **2025受賞 + 2026-01-05 ローンチ** に分離記述 |

---

## 7. 検証エージェント自身の限界(正直開示)

このセッションで実施できなかったこと:

1. **WebFetch未使用**: WebSearchの結果スニペットのみで判断。一次情報PDFの全文確認(Spin Master Annual Report PDF / AofL Impact Report PDF / UAB論文 etc.)を本文展開して検証していない。**スニペットの精度に依存**
2. **PubMed網羅未実施**: UAB 2025 Lewis-Brooke探索研究 (n=18) 以外のToca Boca / Sago Mini / ABCmouse関連学術文献の体系的サーベイは未実施。Cochrane Library / WWC(What Works Clearinghouse)の「ABCmouse 19研究」の個別査読は未実施
3. **SEC 10-K原文確認未実施**: 「Toca Boca 買収 $30M」のSEC開示は二次的言及(LinkedIn業界分析)を経由しており、Spin Master 2016 SEC filing 原典は本検証で読めていない
4. **Sensor Tower / Data.ai 有料データ未参照**: 「Toca Boca World 月22M DL」「US iOS 月$5M」「Toca Boca Days ソフトローンチ国別」の精緻な数値は無料公開部分のみ
5. **App Store / Google Play レーティングの瞬間値**: 「4.29 / 5.2M reviews」は2025年時点の値だが、レビュー時点での厳密な日付特定なし。月次で変動
6. **Common Sense Media有料/詳細レビューの個別検証未実施**: 「ad-heavy registration」「busy presentation」の文言は要約済み記述で、原文の文脈確認はサンプル少
7. **UAB論文本文未読**: digitalcommons.library.uab.eduの修論PDF全文未読。「アサーション上昇」「Creative play 不変」などの結果記述は要約スニペット経由
8. **日本語報道未調査**: 国内メディア(Kidscreen Japan・ITmedia等)でのToca Boca / Sago Mini / ABCmouse言及は未調査
9. **2026年4月時点のToca Boca CEO**: Fredrik Löving 2025-07 LEGO退社後、後任CEO情報は本検証では特定できず

**信頼度評価の自己抑制**: このレポートで「★★★ 確認」と書いた項目も、上記制約により「複数の二次/準一次ソース一致」レベルが多く、SEC原典・PubMed・公式PDF全文での裏取りは限定的。**Jade ND事件のような「Wikipediaの初期記述自体が誤っているケース」を完全には防げない**ことを正直に認める。

---

## 8. 推奨アクション(優先順位順)

1. **【即時】 ABCmouseレポート4箇所の重大訂正** — Doug Dohring死去年 / Series B金額 / Alex Galvagni就任年 / ABCmouse 2 ローンチ年
2. **【即時】 Toca Bocaレポート3箇所の重大訂正** — Fredrik Löving役職 / 肌色「300種」断定 / Autism Bundle年(2014→2015)
3. **【次回】 各レポートの「ファクトチェック注意事項」テーブルを本検証結果で更新**
4. **【次回】 SEC filings / UAB論文PDF / AofL Impact Report PDF の本文展開で再検証**(WebFetch解放後)
5. **【継続】 同様の派生レポート(Otsimo / Jade ND / Dubu / AutiSpark) も同じ手順で再点検**

---

## 9. 結論

**Jade ND事件レベルの致命傷はなし**(企業の出自・大規模な数値桁違いはない)。しかし**Doug Dohring死去年(2023)・ABCmouse 2 ローンチ年(2026)・Series B金額($50M)など、追加検索1回で確定できた事実が「【未確認】」として残されている**ことは、リサーチ深度がもう一段足りなかったサインである。**6項目の重大訂正と7項目の格上げを反映すれば、3レポートはNollaの戦略策定に十分耐える品質に到達する**。

特にToca Bocaレポートの「Fredrik Löving Toca Boca CEO」は、**Jade ND「ポルトガル発」と同じカテゴリの役職取り違えリスク**であり、優先的に訂正されたい。

---

## 10. 主要ソース URL(本検証で直接参照したもの)

### ABCmouse / Age of Learning
- https://en.wikipedia.org/wiki/Doug_Dohring (1957-2023)
- https://www.ageoflearning.com/introducing-our-new-ceo-alex-galvagni/
- https://www.crunchbase.com/funding_round/age-of-learning-series-b--ad26c0d8 ($50M Series B 2020)
- https://www.crunchbase.com/search/funding_rounds/field/organizations/funding_total/age-of-learning ($531.5M total)
- https://www.prnewswire.com/news-releases/abcmouse-unveils-a-bold-new-era-...302652382.html (2026-01-05 launch)
- https://www.prnewswire.com/news-releases/abcmouse-2-wins-google-play-best-of-2025...302617734.html
- https://www.prnewswire.com/news-releases/abcmouse-2-launches-nasa-partnership...302570263.html (650K classrooms)
- https://www.abcmouse.com/learn/wp-content/uploads/2025/01/AofL-EOY-Impact-Report-2024.pdf (670K classrooms / 50M kids / 11B activities / 19 ESSA studies)

### Sago Mini
- https://www.prnewswire.com/news-releases/spin-masters-sago-mini-studio-collaborates-with-otsimo...301519889.html (2022-04-07)
- https://www.apple.com/tv-pr/news/2022/08/apple-tv-reveals-trailer-for-sago-mini-friends/ (2022-09-16)
- https://help.sagomini.com/article/418-sago-mini-standalone-apps-removed-from-sale (2024-02-29)
- https://developer.apple.com/design/awards/2023/ (Social Impact finalist)
- https://en.wikipedia.org/wiki/Sago_Mini

### Toca Boca
- https://en.wikipedia.org/wiki/Toca_Boca
- https://www.lego.com/en-us/aboutus/news/2025/july/fredrik-loving-svp-head-of-gaming-appointment (Löving LEGO転出 2025-07)
- https://kidscreen.com/2020/05/21/spin-master-taps-digital-studios-evp/ (Löving 2020-05 EVP就任)
- https://torstensson.com/2024/12/09/toca-boca-reaches-1-billion-downloads/ (10億DL / 60M MAU)
- https://www.pocketgamer.biz/toca-boca-days-shuts-down-after-16-months-in-soft-launch/ (2025-08-25 shutdown)
- https://digitalcommons.library.uab.edu/etd-collection/6862/ (UAB 2025 n=18)
- https://insar.confex.com/insar/2025/meetingapp.cgi/Paper/51375
- https://thegamerwithkids.com/2015/04/02/toca-boca-releases-toca-box-bundle-for-autism-awareness/ (Bundle 2015年4月)
- https://www.prnewswire.com/news-releases/spin-master-reports-q4-2024...302383867.html (2024 Digital -5.4%)

### 共通(Spin Master IR)
- https://assets.ctfassets.net/r3qu44etwf9a/35uRrGBp1D1VXtlOe9fhLq/.../2024_Annual_Report.pdf
- https://www.crunchbase.com/organization/age-of-learning
