---
STATUS: ACTIVE
LAST_UPDATED: 2026-04-27
PURPOSE: Khan Academy本体・Khan Academy Kids・Khanmigo の3プロダクトを統合分析し、「適応学習×AI個別最適化×教育界グローバル標準」の最前線がNolla(ASD/ID児向けAI発達コンパニオン)にどう転用できるかを判断する
RELATED:
  - outputs/nolla_abcmouse_deep_analysis_2026-04-27.md
  - outputs/nolla_dubu_ella_deep_analysis_2026-04-22.md
  - outputs/nolla_autispark_deep_analysis_2026-04-26.md
  - outputs/nolla_otsimo_deep_analysis_2026-04-26.md
  - outputs/nolla_sago_mini_deep_analysis_2026-04-27.md
  - outputs/nolla_toca_boca_deep_analysis_2026-04-27.md
  - outputs/nolla_competitor_research_master_2026-04-25.md
  - outputs/nolla_benchmark_inheritance_ranking_2026-04-26.md
EVIDENCE_QUALITY: 一次情報(Khan Academy公式・年次レポート・Khan Academy Blog・College Board公式・PRNewswire・Khanmigo公式・OpenAI/Microsoft公式)+二次情報(Wikipedia・TechCrunch・EdSurge・EdWeek・The 74・ProPublica Nonprofit Explorer・Class Central・CNBC)を併用。各主張に★★★/★★☆/★☆☆/【未検証】の信頼度マークを付与。Jade ND誤情報事故の教訓に従い、孤立ソース・伝聞は明示する
---

# Khan Academy 徹底分析(本体 / Kids / Khanmigo) — 2026-04-27

> Khan Academyは「無料・非営利・グローバル」を**18年間続けてきた唯一の教育プラットフォーム**。MVPは「いとこへの数学指導をYouTubeに上げただけ」だった。
> Nollaが学ぶべきは、(1) 創業初期の「無料YouTubeで先にユーザーを作ってから資金を得る」順序、(2) Mastery Learningという**「100%できるまで進ませない」適応学習の思想**、(3) Khanmigoが示した**「答えを教えないSocratic AIチューター」の安全設計**。
> 学んではいけないのは、(a) 文字・言語に依存した動画講義スタイル(ASD/ID児には致命的)、(b) 寄付モデル一本足経営(Nollaは家庭ToCで自走必須)、(c) 「特別支援教育には正面で踏み込まない」スタンス(Nollaの差別化空白地帯)。

---

## 0. エグゼクティブサマリー(先に結論)

| 観点 | 評価 |
|---|---|
| スケール | **★★★ 史上最大級**: 登録ユーザー1.8億人(2025)、年間学習時間87億分(SY23-24)、Khanmigo学習者は1年で40K→700K→100万人超(SY25-26予測) ([Khan Annual Report SY24-25](https://annualreport.khanacademy.org/) / [K-12 Dive 2025](https://www.k12dive.com/news/3-questions-for-k-12-leaders-to-consider-amid-the-ai-tutoring-boom/757314/)) |
| ASD/ID児への直接適合性 | **★☆☆ 限定的**: 公式に「アクセシビリティ機能あり」と明示するが、**ASD特化設計ではない**。Salman Khanの話速がASD児に偶然合うとの保護者口コミはあるが、独立RCTは見つからない |
| エビデンス | **★★★ 業界最強クラス(本体)**: College Board×Khan SAT練習で「20時間練習→平均115点上昇」のRCT準拠データ。Khanmigo効果は**まだ初期検証段階**(★☆☆) |
| 継続性メカニクス | **★★☆ 古典的な良設計**: Energy Points + Badges(Meteorite→Black Hole 5段階) + Avatars。**ABCmouseのTickets経済ほど閉じたループは作っていない**(意図的に「外発的動機より内発的動機」を強調) |
| Nollaへの転用度 | **高(思想)/中(実装)**: Mastery LearningとSocratic AIの設計思想は最重要参照物。ただしKhan本体のUX(動画講義+大量テキスト)はNollaには絶対使えない。Khan Academy Kidsの **Kodi常駐ガイド+Journey Mode+Character Roomsは直接転用候補** |

**Nollaが取るべきスタンス**:
1. **Mastery Learning(100%できるまで次に進ませない)** の思想を「適応難度+データ蓄積」のバックボーンに採用
2. **Khanmigoの「答えを教えないSocratic AI」+チャット制限+保護者監視ログ** をNolla AI発達コンパニオンの安全設計テンプレートとして採用
3. **Khan Academy Kidsの「Kodi常駐キャラ+Journey Mode+ご褒美ボックス開封+キャラ部屋」** はABCmouseのTickets経済より**ASD児に優しい**(刺激量・複雑さが控えめ)。Nollaの世界観に積極転用
4. **Khanの寄付モデル** はNollaは追わない(日本市場・ToC月額・将来ToB/ToG)。ただし**「コンテンツ無料→ToBで収益」の二段構え** は参考にする
5. **Khanが避けた「特別支援領域への深掘り」 = Nollaの空白地帯**

---

## 1. 企業基本情報

| 項目 | 内容 | 信頼度 |
|---|---|---|
| 法人名 | Khan Academy, Inc. | ★★★ |
| 法人形態 | 501(c)(3) 非営利法人 | ★★★([ProPublica Nonprofit Explorer EIN 26-1544963](https://projects.propublica.org/nonprofits/organizations/261544963)) |
| 創業者 | **Salman "Sal" Khan**(MIT 数学/電気工学/CS 三学士、HBS MBA) | ★★★ |
| 創業年 | **2008年**(501(c)(3)登記)。実質的活動は2004年(YouTube動画開始)、2006年(khanacademy.orgドメイン取得) | ★★★([Khan Help Center History](https://support.khanacademy.org/hc/en-us/articles/202483180-What-is-the-history-of-Khan-Academy)) |
| Sal Khan常勤化 | **2009年秋**、ヘッジファンドアナリスト職を辞めKhan Academy専従。9ヶ月間は貯金で生活、Ann Doerr(John Doerrの妻)から最初の大口寄付 | ★★★ |
| 本社 | カリフォルニア州 Mountain View | ★★★ |
| Sal Khan年俸 | **$839,000(2019年Form 990報告)**。「2024時点$0」の記載はQuora二次情報で**【未検証】**(Form 990原本未確認) | ★★☆/★☆☆ |
| 累計寄付額 | **$316M超(2008-累計、2025年集計)** | ★★☆([Prosperity For America](https://www.prosperityforamerica.org/khan-academy-statistics/) 二次集計) |
| 2023年売上(=寄付+収益) | **$107.3M** | ★★☆(同上、二次) |
| 2023年支出 | **$72.5M**(うち84%が事業費、16%が一般管理費) | ★★☆(同上) |
| 主要寄付者 | Bill & Melinda Gates Foundation(累計$38.1M)、Beneficus Foundation($19.8M)、Silicon Valley Community Foundation($12.6M)、Ann & John Doerr、Google、Bezos Family Foundation(2024 Khanmigo拡大寄付)、Reed Hastings(Netflix CEO) | ★★★(個別寄付者は公式 [About Page](https://www.khanacademy.org/donors)) |
| 2024年従業員数 | 公式数値非公開。**Class Central推計2021時点で約180-200人**、2024-25は明示開示なし | ★☆☆ |
| 2025年登録ユーザー | **1.8億人超**(累計登録) | ★★☆(二次集計) |
| 2024年学習者(active) | **1億5,340万人 学習者+700万人 教師+830万人 保護者** | ★★★(Annual Report SY23-24) |
| 累計学習分数 | **587億分**(2008累計、SY23-24末時点)、SY23-24単年で **87億分追加** | ★★★(同上) |

### 1.1 主要マイルストーン(年表)

| 年 | 出来事 | 信頼度 |
|---|---|---|
| 2004 | Sal Khanがいとこ Nadiaの数学指導をYahoo! Doodleで開始 | ★★★ |
| 2006 | khanacademy.orgドメイン取得、YouTubeに初の動画投稿 | ★★★ |
| 2008 | Khan Academy Inc.を501(c)(3)非営利として法人化 | ★★★ |
| 2009-秋 | Sal Khanがヘッジファンドを辞めて専従化(9ヶ月無収入) | ★★★ |
| 2010-Q3 | Bill GatesがAspen Ideas Festival(2010-07)でKhan Academyを公開賞賛(「the future of education」) | ★★★([YouTube アーカイブ](https://www.youtube.com/watch?v=6A07Pj71TUA)) |
| 2010-09 | **Google $2M + Gates財団 $1.5M**の初の大型寄付 | ★★★ |
| 2011-03 | Sal KhanがTED2011で「Let's use video to reinvent education」講演(累計再生3,000万超) | ★★★ |
| 2014-03 | **College BoardとSAT準備提携発表** | ★★★([TechCrunch 2014-03-05](https://techcrunch.com/2014/03/05/khan-academy-gets-major-partnership-to-close-rich-advantage-in-college-test-prep/)) |
| 2015-06 | Official SAT Practice on Khan Academy 公式ローンチ | ★★★ |
| 2016-08-25 | **Duck Duck Mooseを$1で買収(寄付型M&A)**、Khan Academy Kids 開発開始 | ★★★([EdSurge](https://www.edsurge.com/news/2016-08-27-khan-academy-buys-children-s-app-developer-duck-duck-moose-for-1)) |
| 2017-05 | College BoardがSAT練習効果を公式発表「20時間練習→平均115点上昇」 | ★★★([College Board Newsroom](https://newsroom.collegeboard.org/new-data-links-20-hours-personalized-official-sat-practice-khan-academy-115-point-average-score)) |
| 2018-07-12 | **Khan Academy Kids(2-5歳向け)正式ローンチ**(後に2-8歳に拡張) | ★★★([PRNewswire 300680242](https://www.prnewswire.com/news-releases/khan-academy-launches-new-educational-program-for-children-ages-two-to-five-300680242.html)) |
| 2020-03 | **コロナ禍で学習量が日30M分→ピーク92M分に急増**。生徒/教師登録は5-6倍、保護者登録は10-20倍に | ★★★([qz.com](https://qz.com/1857486/how-khan-academy-hopes-to-reduce-covid-19s-impact-on-education)) |
| 2023-03-14 | **Khanmigoパイロット発表**(GPT-4ローンチ当日)。OpenAIとの早期パートナー | ★★★([Khan Academy Blog](https://blog.khanacademy.org/harnessing-ai-so-that-all-students-benefit-a-nonprofit-approach-for-equal-access/)) |
| 2024-05-21 | **Microsoft提携で米国教師にKhanmigoが無料化** | ★★★([CNBC](https://www.cnbc.com/2024/05/21/microsoft-khan-academy-launch-free-ai-assistant-for-all-us-teachers.html)) |
| 2024-06 | New Hampshire州が全州契約でKhanmigoを無料導入(全米初) | ★★★([NH 教育省](https://www.education.nh.gov/news-and-media/khan-academy-extend-its-ai-services-no-cost-new-hampshire-educators-and-students)) |
| 2024-07-22 | **Khanmigo Writing Coach発表**(高校・大学のライティング指導AI) | ★★★([THE Journal](https://thejournal.com/articles/2024/07/22/khan-academy-launches-khanmigo-writing-coach.aspx)) |
| 2024-12 | Khanmigoが追加34言語に対応 | ★★☆(二次集計) |
| 2025-02-27 | Writing Coach 教師向け無料化 | ★★★(Khan Academy Blog) |
| 2025-SY | Khanmigo K-12学習者が**40K(SY23-24)→700K(SY24-25)→100万超(SY25-26予測)** | ★★★(K-12 Dive) |

---

## 2. 初期戦略(★最重要)

### 2.1 なぜ「YouTube動画+無料+非営利」から始めたか

**結論: 戦略ではなく "結果としての制約選択" が後に最大の差別化になった**。

- Sal Khanは**2004年の時点ではビジネスを作る意図がゼロ**。いとこNadia(米ニューオーリンズ→ボストンへ越境)の数学指導が出発点 ★★★
- 当初Yahoo! Doodle(共有ホワイトボード)を使用。やがて「いとこ4人+その友達」と相手が増え「同じ説明を繰り返すコストを下げるため」YouTubeに録画を上げた ★★★
- 録画する場所がなかったので**自宅クローゼットの中で照明・三脚なしで撮影**(後に「世界で最も影響力のあるホームスタジオ」と呼ばれる) ★★☆(逸話レベル)
- 動画は10分前後・顔出しなし・声のみ・黒背景に蛍光ペン手書き。**当時のオンライン講義の主流(教授の顔大写し+板書)とは正反対**だった ★★★
- 「無料」の選択は**ビジネス判断ではなく、Sal個人の宗教観(ムスリム)+「教育は基本的人権」という思想信条** ★★★(自著『One World Schoolhouse』)

**Nollaへの示唆**:
- 「最初から綺麗なプロダクトを作る」必要はない。**MVPは"自分の家族のために作る"くらい属人的でいい**
- Sal Khan自身の「いとこに教える」原体験は、**Otsimoの「弟Alper」、Speech Blubsの「自分の発語遅れ」と同型の最強PR資産**
- ただし Nolla は最初から営利モデルを取るべき。日本市場で寄付ベースは事業として成立しない

### 2.2 営利→非営利化の判断

- **2008年の501(c)(3)化は、ベンチャーキャピタルからの出資オファーを蹴った後の決断** ★★★
- Sal Khanの説明: 「もしKhan Academyが営利だったら、私たちは Coursera や edX のように MOOC で大学と組み、結局は学位ビジネスに行き着いていただろう。だが我々が作りたかったのはK-12の基礎学習であり、そこは営利では届かない」(自著および各種インタビュー) ★★★
- 結果: **競合(Coursera 2012年, edX 2012年, Pearson, McGraw-Hill)が大学/出版社向けで動く中、Khanだけが「K-12+無料+全世界」のニッチを独占** ★★★

**Nollaへの示唆**:
- 「営利か非営利か」は**自分が誰に何を届けたいか**で決まる。Nollaの場合、**家庭(ToC)+施設(ToB)+自治体(ToG)**で対価を取れる構造があるため非営利化は不要
- ただし「**非営利化することで開く扉**」(Gates財団・国際機関・教育省)は将来的に **Nolla財団 / Nolla Research Arm** のような非営利別法人として切り出す選択肢はあり

### 2.3 競合との差別化(2008-2015)

| 競合 | 創業 | アプローチ | Khanの差別化 |
|---|---|---|---|
| **Coursera** | 2012 | 大学講義のオンライン化、有料証明書 | Khan は K-12+無料+短尺動画 |
| **edX** | 2012(MIT/Harvard) | 大学講義のオープン化、修了証 | Khan は K-12+完全無料 |
| **Pearson** | 既存大手 | 教科書+デジタル補助 | Khan は教科書なし、動画+練習問題 |
| **McGraw-Hill** | 既存大手 | 大学教科書 | Khan は基礎学習に集中 |
| **YouTube一般教育チャンネル** | 多数 | 動画のみ | Khan は **動画+練習問題+進捗管理+Mastery** の統合プラットフォーム |

**重要な差別化原則**: Khanは**「動画」だけの会社だと思われがちだが、本質は "Mastery Learning + 練習問題 + 知識マップ + 進捗ダッシュボード" の統合プラットフォーム**。動画はその入口にすぎない。

### 2.4 Khan Academy Kidsの派生戦略(2018年launch)

- 2016年8月、創業10年弱のDuck Duck Moose(2008創業、Caroline Hu Flexer夫妻+Nicci Gabriel、累計53のApp Award)を**$1で買収**(法的に必要な象徴的金額。実態はDuck Duck Mooseが知財をKhan Academyに**寄付**) ★★★
- Caroline Hu Flexer(元IDEO, Stanford MBA)はKhan Academy Kidsの**初代VP兼共同創業者**として参画 ★★★
- 開発資金: **Omidyar Network(Pierre Omidyar=eBay創業者の財団)が初期$3M寄付** ★★★
- パートナー: Stanford大学教育学部、National Head Start Association、Bellwether Media、National Geographic Young Explorer Magazine、Super Simple Songs ★★★

**戦略的意図**:
- 本体Khan Academyは「読み書きできる年齢以上(7歳〜)」を前提とする動画+テキストUI。**幼児層は構造的に届かない空白**だった
- Duck Duck Moose買収で**ゼロから幼児向け開発する数年を短縮**(チーム+IP+知見を一括取得)
- 「Khan Academy ブランドの信頼性」+「Duck Duck Moose の幼児UX力」のクロスポロネーション

**Nollaへの示唆**:
- Nollaは最初から**3-18歳全レンジを謳う**が、**実態は2-12歳発達年齢中心**。Khan本体(7歳以上)とKhan Academy Kids(2-8歳)の **「2つのプロダクトに分ける戦略」 vs 「1プロダクトで全レンジ」** はNolla内部でも論点
- 結論案: **Phase 1 は 2-8歳発達年齢に集中(Khan Kids型)**、**Phase 3+ で「中高生向けNolla Pro」を派生**(Khan本体型)

### 2.5 Khanmigoの派生戦略(2023年launch)

- **OpenAIのPilot Program "Foundry" の早期パートナー**(GPT-4の正式ローンチと同日 2023-03-14 に発表) ★★★
- Sal Khan曰く: 「我々は2022年9月にOpenAIから声をかけられた。GPT-4の前身モデルを見せられ、6ヶ月間NDAで開発」(複数インタビュー) ★★★
- **「教師ネットワーク」が初期トラクションの最大資産**: Khan Academy本体には既に**米国教師70万人**が登録ユーザーとして存在し、彼らが Khanmigoのアーリーアダプター候補となった ★★★
- 価格: **個人$4/月 or $44/年(Khan Academy Kidsは引き続き完全無料)**、**教師は2024-05からMicrosoft提携で全米無料** ★★★

**Nollaへの示唆**:
- AI発達コンパニオンを「いつ・どう載せるか」のタイミング設計が重要。Khanmigoは**ChatGPTローンチ(2022-11)から4ヶ月後の2023-03**にローンチ。「初期は無理せずGPT-4が出るまで待った」判断
- Nollaも「**LLMネイティブで作るがリリースは慎重に**」が正解。**先に "計測+ご褒美+ゲーム" の基盤を作り、後から AIコンパニオンを足す** ことで、AIが暴走しても基盤は揺るがない構造に

---

## 3. 0→1の突破(★最重要)

### 3.1 本体: 初期 YouTube → Bill Gates → 寄付爆発

**時系列の決定的瞬間**:

1. **2009年12月**: Sal Khanの動画再生回数が月間100万回を超える(累計動画約2,000本) ★★★
2. **2010年7月**: **Bill GatesがAspen Ideas Festivalで「Khan Academyは私の子供たちが使っている。これは未来の教育だ」と発言** ★★★
3. **2010年9月**: GatesからのDM/メールを契機に、Gates財団 $1.5M + Google Ten to the 100th賞 $2M の連続発表 ★★★
4. **2011年3月**: TED2011で講演。**Bill Gates本人がモデレーターとして登壇**(異例) ★★★
5. **2011年以降**: 寄付が雪だるま式に増加(Carlos Slim財団、Reed Hastings、Doerr夫妻、Bezos財団等)

**学び**:
- **Bill Gatesという "1人のインフルエンサー" が全てを変えた**。彼の自宅で子供がKhan Academyを使っていたことが偶然の発端
- これは再現可能か?**部分的には可能**。「子供が実際に使っている動画/写真」を**著名人インフルエンサーに無料で届け続ける**ことで類似のブレイクは起こせる
- 失敗パターン: **「最初からPRを狙って著名人に営業する」のは効果が薄い**。Sal Khanは Bill Gatesに営業していない

### 3.2 Khan Academy Kids: ブランド+M&A+完全無料

**初期トラクション獲得の3要素**:

1. **Khan Academyの既存ブランド信頼**: 「Khanブランド = 真面目で無料」のイメージが既に存在
2. **Duck Duck Mooseの既存ファンベース**: 53のApp Award、累計DL数百万のユーザーをそのまま継承(具体的引き継ぎ数値は非公開、★☆☆)
3. **完全無料 + 広告なし + アプリ内課金なし**: ABCmouse($14.99/月)・PBS Kids Games(無料だが広告あり)に対する明確な差別化

**Caroline Hu Flexer の語った設計哲学**(EdSurge / Kidscreen):
- 「我々は子供を **"products" や "users" として扱わない**。子供たちの**learners**として扱う」 ★★★
- 「広告・課金・ガチャを排除することで、子供と保護者を信頼関係で繋ぐ」 ★★★

**学び**:
- **無料 + ノー広告 + ノー課金 = 親の信頼を一気に獲得する戦略**は強力
- ただし**収益モデルがないため、Khan Academy Kids単体は赤字**(Khan Academy本体の寄付収益で補填)
- Nollaは寄付モデルを取らないため、**「初期は無料配布 → 後から有料機能を上に積む」フリーミアム** の方が現実的

### 3.3 Khanmigo: 既存教師70万 + OpenAI早期提携

**初期パイロット参加者の獲得経路**:
- 2023-03 のパイロットは**「教師と寄付者(donors)限定」でローンチ** ★★★
- 既存のKhan Academy本体のヘビーユーザー(教師)に対する**インバウンド招待制**で、「営業せずに参加者が殺到」状態
- 初期のフィードバックループが極めて高速(教師→運営→OpenAIで毎週改善)

**学び**:
- **既存ユーザーベースを持つ会社がAI機能を載せる時、初期はクローズドベータ**が圧倒的に有利
- **Nollaが将来 AI Companion を載せる時も、まず "既存ユーザー(家庭+施設職員)に閉じたベータ" から始める** べき

---

## 4. 成長ドライバー(★最重要、フェーズ別時系列)

### Phase 1 (2008-2012): YouTube + 寄付の獲得

| 年 | 主要イベント | 効果 |
|---|---|---|
| 2008 | 501(c)(3)化 | 寄付の受け皿確立 |
| 2009-秋 | Sal Khan 専従化 | 開発速度の加速 |
| 2010-07 | Bill Gates パブリック賞賛 | 一夜にしてメディア注目 |
| 2010-09 | Google $2M + Gates財団 $1.5M | 初の運営資金確保、フルタイム雇用開始 |
| 2010-12 | Shantanu Sinha(McKinsey)が President & COO 参画 | 経営体制確立 |
| 2011-03 | TED2011講演(累計3,000万回再生) | グローバル認知獲得 |

**この時期の成長エンジン = "個人の情熱 + 著名人推薦 + 寄付"**。バイラル動画 + 寄付 + 1人のインフルエンサー(Bill Gates)。

### Phase 2 (2012-2018): 学校採用 + College Board + グローバル展開

| 年 | 主要イベント | 効果 |
|---|---|---|
| 2012 | LeBron James 寄付・FAQ動画コラボ | 米国スポーツファン認知 |
| 2014-03 | College Board(SAT)提携発表 | 全米高校生の必須サイト化 |
| 2015-06 | Official SAT Practice ローンチ | **SAT受験者の半数以上が利用** |
| 2016-08 | Duck Duck Moose 買収 | 幼児層への参入準備 |
| 2017-05 | SAT効果データ公表(20時間→115点上昇) | 教育界のエビデンス獲得 |
| 2018 | 190カ国超で利用、36言語に翻訳開始 | グローバル化 |

**この時期の成長エンジン = "公教育インフラ化 + 国際展開"**。SAT準備の独占的地位獲得は決定的。

### Phase 3 (2018-2022): モバイル + Kids + コロナ特需

| 年 | 主要イベント | 効果 |
|---|---|---|
| 2018-07 | Khan Academy Kids ローンチ | 2-8歳市場参入 |
| 2019 | 月間アクティブ学習者 1,800万人 | 着実成長 |
| 2020-03 | **コロナで学習分数が日30M→92M(3倍超)** | 史上最大の特需 |
| 2020-04 | 緊急遠隔学習ガイド配布、教師トレーニング無料 | コロナ需要を確実に取り込み |
| 2021 | Khan Academy Kids 累計DL数千万(具体値非公開、★☆☆) | 幼児層も拡大 |
| 2022 | MAP Accelerator 効果研究(181K学生のRCT準拠データ) | エビデンスの厚み増加 |

**この時期の成長エンジン = "スマホアプリ + コロナ特需 + 学校採用の深化"**。

### Phase 4 (2023-現在): AI統合(Khanmigo)

| 年 | 主要イベント | 効果 |
|---|---|---|
| 2023-03 | Khanmigoパイロット(GPT-4) | AIチューター時代の先駆者 |
| 2023-09 | Khanmigo個人向け$4/月でローンチ | 初の有料プロダクト |
| 2024-05 | Microsoft提携で米国教師無料化 | 教師70万→拡大 |
| 2024-06 | New Hampshire 全州契約 | B2G先行モデル確立 |
| 2024-07 | Khanmigo Writing Coach ローンチ | エージェントの多様化 |
| 2024-12 | Khanmigo 34言語対応 | グローバル展開加速 |
| 2025-02 | Writing Coach 教師無料化 | 教師ロック・イン |
| 2025-SY | **Khanmigo K-12学習者 700K → 100万超(予測)** | AIチューター市場のリーダー |

**この時期の成長エンジン = "AI先行者利益 + Microsoft連合 + 州単位B2G契約"**。

---

## 5. 転換点(★最重要)

### 5.1 営利→非営利(2008)

- **判断理由**: K-12基礎学習に営利モデルは合わない(Sal Khanの確信)
- **代償**: 寄付調達の永続的負担(年間$70-100M必要)
- **報酬**: 「無料・全世界」というユニークポジション+教育界の信頼

### 5.2 動画中心→ソフトウェア中心(2010-2014)

- **判断理由**: 動画だけでは「学習が定着しない」というユーザーフィードバック。練習問題+進捗管理が必要
- **転換の証拠**: 2010年に最初のWeb版練習問題、2014年にKnowledge Map(知識ツリー)、2015年にMastery System導入
- **代償**: エンジニア大量採用(Sal Khan一人では不可能になった)
- **報酬**: 「動画チャンネル」から「学習プラットフォーム」への進化

### 5.3 デスクトップ→モバイル(2012-2018)

- **判断理由**: 新興国・低所得家庭でもスマホは普及している
- **代償**: モバイル開発チーム新設+UI再設計
- **報酬**: グローバル展開の加速、Khan Academy Kidsの成立条件

### 5.4 教師ネットワーク化(2014-)

- **判断理由**: B2C(家庭)だけでなくB2B(学校)で導入されると、家庭利用も増える(教師→生徒→家庭の波及)
- **転換の証拠**: 2014年にTeacher Dashboard、2015年に Khan Academy for Educators
- **代償**: 教師向け機能開発+教師トレーニングコスト
- **報酬**: **2024年時点で米国教師700万人登録+全米K-5学校の87%(2016時点)で利用** ★★☆

### 5.5 AI統合(2023-)

- **判断理由**: GPT-4の登場で「個別最適化チューター」が初めて現実的に
- **代償**: OpenAI API費用(寄付追加調達必要)、安全設計コスト
- **報酬**: 「AIチューター時代の代名詞」ポジション

**Nollaへの示唆**:
- 各転換点は**5-10年単位の長期判断**。Nollaも「**Phase 1=ゲーム+計測**, **Phase 2=AI Companion**, **Phase 3=ToB/ToG拡張**」のような**中長期ロードマップ**を持つべき
- **判断遅れのコスト > 判断間違いのコスト**(KhanはGPT-4ローンチと同日に発表できた=遅れていない)

---

## 6. 現在の獲得・継続構造(★最重要)

### 6.1 主要獲得チャネル

| チャネル | 重要度 | 説明 |
|---|---|---|
| **オーガニック検索(SEO)** | ★★★ | 「math help」「algebra」「SAT prep」等で1位独占。年間数億回の流入 |
| **教師経由(B2B口コミ)** | ★★★ | 米国K-12教師が生徒に課題として割当 |
| **Apple/Google Featured** | ★★★ | App Storeで定期的に Editor's Choice |
| **YouTube** | ★★★ | チャンネル登録**910万人(2025-Q1時点)** | ★★☆ |
| **口コミ(子供→保護者→他保護者)** | ★★★ | 完全無料なので推奨摩擦が低い |
| **広告** | ★☆☆ | **基本的に有料広告は出さない**(非営利のため) |

### 6.2 寄付収入の規模・主要寄付者(再掲+詳細)

**累計寄付 $316M超(2008-2025集計、二次)**

主要寄付者(累計):
1. Bill & Melinda Gates Foundation: $38.1M
2. Beneficus Foundation: $19.8M
3. Silicon Valley Community Foundation: $12.6M
4. Google.org: $10M+(継続的)
5. Bezos Family Foundation: 累計非公開、2024年Khanmigo拡大寄付に大口
6. Ann & John Doerr: 個人として累計非公開大口
7. Reed Hastings(Netflix): 個人として継続寄付
8. Carlos Slim Foundation: 継続寄付(スペイン語版開発支援)

**法人寄付パターン**: Microsoft(Khanmigo インフラ提供)、AT&T(継続)、Bank of America、Comcast NBCUniversal

### 6.3 ユーザー数

| プロダクト | 指標 | 数値 | 出典信頼度 |
|---|---|---|---|
| **Khan本体(累計登録)** | 累計ユーザー | **1.8億人超**(2025) | ★★☆ |
| **Khan本体(年間アクティブ)** | 学習者 | **1.534億人**(SY23-24) | ★★★ |
| **Khan本体(年間アクティブ)** | 教師 | **700万人** | ★★★ |
| **Khan本体(年間アクティブ)** | 保護者 | **830万人** | ★★★ |
| **Khan Academy Kids** | 累計DL | **公式非公開**(数千万レベルと推定) | ★☆☆ |
| **Khan Academy Kids** | App Store評価 | iOS 4.8★、Android 4.7★ | ★★★ |
| **Khanmigo(K-12)** | 学習者 | **40K(SY23-24)→700K(SY24-25)→100万超(SY25-26予測)** | ★★★ |
| YouTubeチャンネル | 登録者 | **910万人**(Khan Academy本チャンネル) | ★★☆ |

### 6.4 リテンション・エンゲージメント指標

- **学習者あたり日次平均: 14分**(2024) ★★★
- **米国でApple Store内 Education カテゴリで第2位の利用率** ★★★
- **モバイルアプリ平均利用: 子供で20分/日**(2020、コロナ特需期データ) ★★★
- 累計学習分数 **587億分**(2008累計) ★★★

**注**: 詳細なリテンション(D7/D30/M3/M12)・解約率は**非公開**。寄付ベースの非営利のため有料SaaSのような数値開示は無い。

---

## 7. 会社概要・歴史・資金調達(寄付)

### 7.1 非営利501(c)(3)としての構造

- **EIN(米国納税者番号): 26-1544963** ★★★
- **本社**: 1600 Amphitheatre Pkwy(Googleキャンパス内に旧本社あったが現在はMountain View別所在地)
- **理事会(Board of Directors)**: Sal Khan(CEO/会長), Shantanu Sinha(President), Reed Hastings, John Doerr, Caroline Hu Flexer 他
- **2023年売上**: **$107.3M**(★★☆)
- **2023年支出**: **$72.5M**(うち84%=事業費、16%=一般管理費)(★★☆)
- **Charity Navigator評価**: 4-star(最高ランク、複数年継続)

### 7.2 年間寄付額の推移(可能な範囲で)

| 年(暦年/会計年) | 売上(寄付+その他) | 出典信頼度 |
|---|---|---|
| 2018 | $31M | ★★☆ |
| 2019 | $28M | ★★☆ |
| 2023 | **$107.3M** | ★★☆ |

**観察**: コロナ前後(2019→2023)で**3.8倍に成長**。コロナ特需 + Khanmigo関連寄付 + Microsoft等大型法人寄付の合算。

### 7.3 従業員数

- **公式数値非公開**。Class Central推計2021時点で**約180-200人** ★☆☆
- 2023-2024の**Khanmigo拡大局面で大規模採用** との報道(具体数値非公開) ★☆☆

---

## 8. 事業モデル・収益構造・ユーザー数

### 8.1 寄付ベースの非営利モデル(本体)

- **本体は完全無料、広告なし、アプリ内課金なし**(2008-現在、変更なし)
- 収益源:
  - 個人寄付(累計の大部分)
  - 法人寄付(Microsoft, Google, AT&T等)
  - 財団助成(Gates, Bezos, Omidyar等)
  - 商品販売(書籍 "One World Schoolhouse" 等)わずか
  - **2023年からKhanmigoの個人有料課金が初の "売上" 的収益**

### 8.2 Khanmigoの一部有料化

| プラン | 価格 | 対象 |
|---|---|---|
| Khanmigo for Learners(個人) | **$4/月 or $44/年** | 子供 |
| Khanmigo for Teachers(個人加入) | **$44/年(米国教師は2024-05〜無料)** | 教師 |
| Khanmigo for Districts | 学区別契約(価格非公開) | 学校・学区 |
| 州契約(NH等) | 州負担で無料 | 州内全教師・生徒 |

**注**: Khanmigoの収益は**Khan Academy本体の寄付モデルを置き換えるものではなく、上に積む形**。本体は引き続き無料。

### 8.3 ユーザー数(再掲)

- 累計登録 1.8億人
- 年間アクティブ 1.534億人(学習者)
- Khanmigo 700K → 100万超(予測)

---

## 9. プロダクト設計

### 9.1 Khan Academy 本体

**コア要素**:
1. **動画講義**: 累計**8,000本超**(自然科学・数学・歴史・経済・芸術等)。Sal Khan本人の声+黒背景+蛍光ペン手書きが基本(現在は他講師も参加)
2. **練習問題(Exercises)**: 動画と紐付けた問題、即時自動採点、ヒント機能
3. **Mastery Learning System**: 4段階(Attempted → Familiar → Proficient → Mastered)。**Mastered判定が出るまで前進できない**
4. **Knowledge Map(現在は別形式)**: 知識のツリー構造の可視化
5. **進捗ダッシュボード**: 子供用・保護者用・教師用の3種類
6. **Energy Points & Badges**: ゲーミフィケーション(後述)

**画面構成の特徴**:
- **デスクトップファースト設計**(後にモバイル対応)。子供向けというより「学生・社会人向け」の落ち着いた配色
- 言語**44言語+**、UIテキストと動画字幕の両方をローカライズ

### 9.2 Khan Academy Kids(★Nollaに最も近いプロダクト)

**コア要素**:
1. **Kodi the Bear(主人公キャラ)+ 4-5人の動物の友達**(Reya the Hedgehog, Sandy the Fox, Peck the Peacock, Ollo the Owl)
2. **Journey Mode(適応型学習パス)**: 子供の年齢・スキルレベルに応じて自動でアクティビティを推奨
3. **Library Mode(自由探索)**: 1,000+の書籍・動画・歌・お絵かきから自由選択
4. **Open-Ended Activities**: お絵かき・スタンプ・楽器演奏(自由表現の余白)
5. **ご褒美システム**:
   - **「トラックがプレゼントを運んでくる」演出**(タスク完了報酬)
   - **3つの選択肢から1つ選ぶ「ボックス開封」UX**
   - **キャラクターの部屋(Character Rooms)** が新アイテムで段階的に充実
6. **Super Simple Songs統合**(2019〜): 世界的人気の幼児向け歌チャンネルとの公式提携。子守歌・カウントダウン歌が組み込まれている
7. **音声ガイド**: 全ての指示が音声+動物キャラのアニメで提示。**読めない子供も操作可能**
8. **ペアレントゲート**: 保護者用ロック画面(年齢計算問題で突破)
9. **完全無料・広告なし・アプリ内課金なし**

**ASD/ID児への偶発的適合性**:
- **Salman Khanの話速がASD児に偶然合う**(保護者口コミで散見) ★☆☆
- **キャラクターが**Toca Boca等と比べ**控えめな配色・控えめなアニメーション**で感覚負荷が低い
- **タイマー禁止 / スコア減点なし / エラー音なし**(エラー時はキャラが優しく再提示) ★★★

**ASD/ID児への課題**:
- **特別支援設計ではない**ため、文字認識を要求する場面が一部残る
- **独立RCT(ASD児対象)は確認できず** 【未検証】

### 9.3 Khanmigo

**主要モード**:

| モード | 対象 | 機能 |
|---|---|---|
| **Tutor Mode(チューター)** | 学習者 | Socratic法で答えを教えず質問で導く |
| **Teacher Mode(教師補助)** | 教師 | 授業計画・ルーブリック・差別化指導案 |
| **Writing Coach** | 中高生・大学生 | 課題理解→構成→ドラフト→フィードバック |
| **Debate Partner** | 中高生 | 小学・中学・高校の3レベルで指定トピック討論 |
| **Literary Character Simulation** | 文学学習者 | 「ジュリエットと話す」等のRPG学習 |
| **Math Tutor** | 算数・数学全レベル | 画像アップロードで問題解説 |
| **Science Tutor** | 理科 | 概念質問+演習 |

**安全設計**:
- **GPT-4o系の専用システムプロンプト+モデレーション**
- **保護者は子供の全チャット履歴を閲覧可能、不適切内容はアラート通知**
- **1日の利用時間に上限設定**(過度に依存しない設計)
- **COPPA準拠**(米国13歳未満児童プライバシー法)
- **内部テストで不適切コンテンツ生成・話題逸脱は確認されず**(Khan公式発表) ★★☆

---

## 10. 適応学習・AIアルゴリズム(★Nollaが最も学ぶべき部分)

### 10.1 Mastery Learning(完全習得型学習)の実装

**Sal Khanの哲学**(自著『One World Schoolhouse』):
> 「従来の教育は **時間を固定して学習量を変動** させる(45分の授業で全員に同じ内容を教える)。だが本来は **学習量を固定して時間を変動** させるべきだ(同じ内容を、必要な時間だけ使ってマスターする)」

**実装**:
- 練習問題で **連続正解数(streak)** を追跡
- 一定の連続正解達成で **Mastered** 判定 → 次の単元へ進める
- **Mastered未達なら次に進めない**(時間で進級する従来の学校教育と正反対)
- 4段階: Attempted → Familiar → Proficient → Mastered

**Nollaへの適用**:
- 「学習量(成功率75-80%)を保ちつつ難度を上下させる」というNollaの **適応型難度** は本質的にMastery Learningと同じ思想
- ただしNollaは**「マスター判定」ではなく「成功率を維持する」アプローチ**(ASD児には "未達"判定がパニックリスク)
- **Khan流の "数値の可視化(ダッシュボード)" は保護者画面で参考にする** が、子供の画面では絶対に出さない

### 10.2 Knowledge Map(知識ツリー)構造

- 旧Knowledge Map: 数学スキル数百個を**「星座」のように二次元マップ上に配置**(Google Maps API利用)
- 黄色い星=Mastered、緑枠=次に推奨、未着手=暗い星
- **2017年頃にGoogle Maps API廃止に伴い廃止**、現在は別形式(リスト+グラフ)で同等機能
- 教育心理学の **"prerequisite skills"(前提スキル)** ツリーを反映

**Nollaへの適用**:
- 「視覚空間認知 → 形シェイピング → ソート → ビジュアル探索」のNollaのスキルツリーは**Khan Knowledge Mapと類似構造**
- ただし**子供の画面に出すのではなく、保護者画面/AI Companion内部状態として保持** すべき

### 10.3 KhanmigoのSocratic法

**設計原則**:
1. **答えを直接教えない**: 「この問題の答えは X です」とは絶対に言わない
2. **次のステップを質問で導く**: 「最初に何をすればいいと思う?」
3. **間違っても否定しない**: 「面白い考えだね、もう一度見てみよう」
4. **段階的ヒント**: 子供が3-4回詰まったら少しずつヒントを増やす

**Nollaへの適用**:
- Nolla AI Companion(将来実装)はKhanmigoと同じSocratic設計を採用
- ただし**Nollaは非言語/低言語の子も対象** → **テキスト主体のチャットUIではなく音声+ジェスチャー+選択肢提示**

### 10.4 AI活用の安全設計

| 要素 | Khanmigo実装 | Nolla転用判断 |
|---|---|---|
| 保護者の全履歴閲覧 | 標準実装 | **採用必須** |
| 不適切内容アラート通知 | 標準実装 | **採用必須** |
| 1日利用時間上限 | 標準実装 | **採用必須**(セッション強制ロックではなく "今日はもう休もう"の提案型) |
| COPPA準拠 | 米国法対応 | 日本市場主体だが**個人情報保護法+COPPA同等の自主ルール** |
| LLMハルシネーション対策 | システムプロンプト+モデレーション | **採用必須** |

---

## 11. 強み・弱み

### 11.1 強み

| カテゴリ | 強み |
|---|---|
| **ブランド** | 「教育界の信頼性最大手」「ノーベル平和賞候補にも挙げられた」(★☆☆ 一部報道) |
| **スケール** | 1.8億ユーザー、44言語、190カ国 |
| **エビデンス** | College Board×SAT で **20時間→115点上昇** の確固たる効果データ |
| **コンテンツ量** | 動画8,000本超、練習問題数十万、Knowledge Map スキル数千 |
| **教師ネットワーク** | 米国K-5校の87%(2016)、全米教師700万人(2024) |
| **AI先行者利益** | Khanmigoは**OpenAIとの公的な早期パートナーシップ第1号** |
| **完全無料(本体)** | 広告なし、課金なし、保護者の信頼が圧倒的 |
| **非営利の信頼性** | 寄付者の継続性、政府機関との取引のしやすさ |

### 11.2 弱み

| カテゴリ | 弱み |
|---|---|
| **収益モデル** | 寄付依存=景気変動・寄付者の気まぐれリスク。Khanmigoは初の "売上" だが規模はまだ小さい |
| **特別支援への深掘り不足** | アクセシビリティ機能はあるが、ASD/ID/ADHDの**特化設計はしていない** |
| **幼児層の収益化** | Khan Academy Kidsは完全無料=Khan本体寄付からの内部補填 |
| **動画依存の限界** | 動画+練習問題UXは**読めない子・集中持続困難な子に届きにくい** |
| **モバイル後発** | デスクトップ前提で長く設計、モバイルUXは大手競合に劣る部分あり |
| **AIコスト** | KhanmigoのOpenAI API費用は寄付追加調達でカバーするしかない |
| **Khan Lab School失敗ぎみ** | Sal Khanが2014年に開校した実体校は限定的成功にとどまる |

---

## 12. Nollaへの示唆(★最重要)

### 12.1 初期戦略の転用

| Khanの判断 | Nollaへの転用判断 |
|---|---|
| 創業時に営利か非営利か悩み非営利化 | **Nollaは営利**(日本市場の寄付環境では非営利成立せず)。ただし**将来Nolla Foundation を別法人で持つ** 選択肢は保持 |
| 「いとこに教える」原体験から始まる | **Yuya自身の家族体験 + リサーチで掘った3億人グローバル課題**を**Sal Khan型ナラティブ**で発信 |
| YouTube動画から始め、後にプラットフォーム化 | **Nollaは最初からアプリ**(時代背景が違う)。ただし**コンテンツ動画・SNS発信を並行**して認知を作る |
| Bill Gatesから始まった著名人連鎖 | **狙って著名人にPRしない**。**実プロダクトを使う発達特性児の家庭の物語**を継続発信 |

### 12.2 成長戦略の転用

| Khanの戦略 | Nollaへの転用 |
|---|---|
| 寄付モデルで初期コストを賄う | 採用しない。**ToC月額(¥1,500-3,000想定)**+**助成金/補助金**(発達障害領域に特化) |
| College Board(SAT)提携で全米必須化 | **日本: 自治体の発達相談窓口・児童発達支援事業所(放課後デイ)との提携** |
| 教師ネットワーク構築 | **特別支援学校教員・保育士・OT/STのネットワーク構築**(SNS+セミナー+RCT共同研究) |
| Microsoft提携で教師無料 | **同等パートナーは未確定**。LITALICO/ベネッセ/ソニー教育財団等が候補 |
| State契約(NH等) | **東京都・大阪府の特別支援教育課への提案**を中長期目標に |

### 12.3 Khanmigo型 AI発達コンパニオンの設計テンプレート

**Nolla AI Companion 設計原則(Khanmigo流の応用)**:

1. **Socratic法を子供向けにトランスレート**:
   - 「答えを言わない」原則は維持
   - ただし**チャットではなく音声+選択肢提示**(言語非依存)
   - 詰まったら**段階的に視覚ヒントを出す**(エラーレス学習との統合)

2. **保護者ダッシュボード必須**:
   - 全インタラクション履歴閲覧可能
   - 不適切な発言・行動はリアルタイムアラート
   - 「今日はAI Companionと何分話したか」「どんな話題が多かったか」を可視化

3. **利用時間上限**:
   - 1日30分などの**ソフト上限**(強制ロックではなく "今日はおしまいにしよう"の提案)
   - 過度の依存を防ぐ設計

4. **コンテンツガードレール**:
   - LLMネイティブで作るが、**システムプロンプトで発達支援文脈に固定**
   - 教育以外(暴力・性・政治)は**完全ブロック**
   - 不適切な誘導が入った場合の**監査ログ+保護者通知**

5. **デプロイ判断**:
   - **Phase 1ではAI Companionは載せない**(基盤の "ゲーム+計測+ご褒美"を完成させる)
   - **Phase 2でクローズドβ(既存ユーザー家庭限定)**
   - **Phase 3でGA**(本格展開)

### 12.4 Khan Academy Kids の UX設計の転用

**直接転用すべき要素(優先度高)**:

| Khan Kids の要素 | Nollaへの適用 |
|---|---|
| **Kodi the Bear 常駐ガイド** | **Nollaの主人公キャラを1体に絞り、全画面で同伴** |
| **Journey Mode(適応型学習パス)** | **適応型難度の上にコンテンツ推奨を載せる** |
| **「トラックがプレゼントを運ぶ」報酬演出** | **Nollaの報酬演出のヒント**(ABCmouseのTickets経済より刺激量控えめ) |
| **3つから1つ選ぶボックス開封** | **Nollaのご褒美選択UX**(自己選択感を残す) |
| **キャラクターの部屋が段階充実** | **Nollaのマイルーム機能**(どうぶつの森型と統合) |
| **音声ガイド+動物キャラのアニメで指示** | **Nollaの "文字なしナビ" の手本** |
| **ペアレントゲート(年齢計算問題)** | **採用必須**(誤操作防止) |

**転用しない要素**:

- **Super Simple Songs統合**: Nollaは音楽特化ではないため不要
- **大量のコンテンツ(1,000+)**: Nollaは**コア体験を深掘り**するアプローチ。コンテンツ量勝負しない

### 12.5 Khanが避けた/失敗した道からの学び

| Khanの選択 | Nollaの差別化チャンス |
|---|---|
| **特別支援に正面で踏み込まない** | **Nollaの主戦場**。Khanが構造的に届かない子(重度ID, ASD, 非言語)に特化 |
| **動画講義中心(本体)** | Nollaは**ゲーム+体験**中心。動画は補助 |
| **寄付一本足経営** | Nollaは**ToC月額+ToB+ToG**の三本足 |
| **大規模化優先で個別最適化が浅い** | Nollaは**個別最適化(NCI)+データ蓄積**で深掘り |
| **AIで全教科対応の汎用チューター** | Nollaは**発達支援に専門特化したAI Companion** |

### 12.6 KhanのRCT/エビデンス戦略の踏襲

- Khan×College BoardのSAT効果(20時間→115点上昇)研究は**教育界で最も引用されるEdTech効果データ**
- **Nollaも初期から効果検証ロードマップを持つ**:
  - Phase 1: ユーザー利用データ蓄積(社内分析)
  - Phase 2: 大学・研究機関との共同研究(東京大学、京都大学、国立成育医療研究センター候補)
  - Phase 3: **独立RCT実施**(3社共通弱点=Jade ND/Otsimo/DubuのRCT脆弱性)
- **Nollaの差別化軸 = 「3大ベンチマーク全員が持っていない独立RCTを最初から取りに行く」**

### 12.7 設計境界における判断分岐(Nolla CLAUDE.md設計境界との整合)

| Nolla設計境界 | Khan Academy Kidsの実装 | 判断 |
|---|---|---|
| 時間制限・カウントダウン禁止 | Khan Kidsはタイマー不使用 | **整合** |
| エラー音・スコア減点禁止 | Khan Kidsは優しい再提示のみ | **整合** |
| 文字によるナビ禁止 | Khan Kidsは音声+アニメ主導(完璧ではないが概ね整合) | **整合** |
| リアルな人間キャラ禁止 | Khan Kidsは動物キャラのみ | **整合** |
| 縦向きUI禁止 | Khan Kidsは横向き対応 | **整合** |
| 自動再生フラッシュ禁止 | Khan Kidsはアニメ控えめ | **整合** |

**結論**: Khan Academy Kidsの設計はNollaの設計境界とほぼ整合する。**実装の参照物として優先度が高い**。

---

## 13. 主要発見(3点に絞った要約)

### 発見1: Sal Khanの "クローゼット起業" は再現可能な原型

「自分の家族のために作った無料動画」が18年で1.8億ユーザーになった。**初期はビジネスとして始めていない**ことが逆に純度を保ち、Bill Gatesの目に留まった。Nollaも**Yuya自身の家族体験 + 3億人グローバル課題**のナラティブを **Sal Khan型** で発信し、最初から営利だが「発達特性とともに生きる子のために作った」純度を維持すべき。

### 発見2: Mastery Learning + Socratic AI = Nolla AI Companion の設計テンプレート

Khanの **「学習量を固定して時間を変動」** 思想は**Nollaの適応型難度の本質と完全一致**。Khanmigoの**「答えを教えないSocratic法 + 保護者全履歴閲覧 + 利用時間上限 + COPPA準拠」** は**Nolla AI Companion の安全設計テンプレートとして直接採用**可能。ただしテキストチャットUIは**音声+ジェスチャー+選択肢提示**にトランスレートする必要あり。

### 発見3: Khanの "特別支援を避けた領域" がNollaの空白地帯

Khan本体・Khan Academy Kids・Khanmigoはいずれも「**アクセシビリティ機能あり**」と謳うが、**ASD/ID/ADHDの特化設計ではない**。Khanが構造的に届かない**「読めない子・感覚過敏・重度知的障害・非言語コミュニケーション」**こそNollaの主戦場。**3大ベンチマーク(Jade ND/Otsimo/Dubu) + Khan + ABCmouse + Toca Boca + Sago Mini の全社が共通して避けてきた「重度+独立RCT+AI Companion統合」の三本柱**でNollaの差別化を確立する。

---

## 14. 参考文献(URL一覧)

### 一次情報・公式

- [Khan Academy Help Center: What is the history of Khan Academy?](https://support.khanacademy.org/hc/en-us/articles/202483180-What-is-the-history-of-Khan-Academy)
- [Khan Academy Annual Report SY24-25](https://annualreport.khanacademy.org/)
- [Khan Academy Annual Report 2023-2024](https://2023-2024.annualreport.khanacademy.org/)
- [Khan Academy About Page](https://www.khanacademy.org/about)
- [Khan Academy Donors Page](https://www.khanacademy.org/donors)
- [Khan Academy Our Supporters](https://www.khanacademy.org/about/our-supporters)
- [Khanmigo Official Site](https://www.khanmigo.ai/)
- [Khanmigo for Learners](https://www.khanmigo.ai/learners)
- [Khanmigo Writing Coach](https://www.khanmigo.ai/writingcoach)
- [Khan Academy Kids](https://www.khanacademy.org/kids)
- [Khan Academy Blog: Harnessing AI for Equal Access](https://blog.khanacademy.org/harnessing-ai-so-that-all-students-benefit-a-nonprofit-approach-for-equal-access/)
- [Khan Academy Blog: Writing Coach Launch](https://blog.khanacademy.org/meet-khanmigo-writing-coach-helping-learners-become-better-writers/)
- [Khan Academy Blog: 2025-26 Districts Updates](https://blog.khanacademy.org/whats-new-for-the-2025-26-school-year-big-updates-from-khan-academy-districts/)
- [Khan Academy Blog: Super Simple Songs Integration](https://blog.khanacademy.org/our-new-app-adds-interactivity-to-classics-from/)
- [Khan Academy Help Center: Energy Points, Badges, and Avatars](https://support.khanacademy.org/hc/en-us/articles/202487710-What-are-energy-points-badges-and-avatars)
- [Khan Academy Help Center: Khanmigo Safety Features](https://support.khanacademy.org/hc/en-us/articles/14394814244365-What-safety-features-does-Khanmigo-have)
- [Khan Academy Help Center: Mastery Learning by Sal Khan](https://support.khanacademy.org/hc/en-us/articles/360030753412-Why-Mastery-Learning-by-Sal-Khan)
- [PRNewswire: Khan Academy Launches Educational Program for Ages 2-5](https://www.prnewswire.com/news-releases/khan-academy-launches-new-educational-program-for-children-ages-two-to-five-300680242.html)
- [College Board Newsroom: SAT Practice Effect Data](https://newsroom.collegeboard.org/new-data-links-20-hours-personalized-official-sat-practice-khan-academy-115-point-average-score)
- [College Board Blog: Official Digital SAT Prep](https://blog.collegeboard.org/college-board-khan-academy-for-better-sat-prep)
- [SAT Suite: How to Use Khan Academy](https://satsuite.collegeboard.org/practice/khan-academy)
- [Salman Khan TED2011 Talk](https://www.khanacademy.org/talks-and-interviews/talks-and-interviews-unit/conversations-with-sal/v/salman-khan-talk-at-ted-2011-from-ted-com)
- [Bill Gates at Aspen Ideas Festival 2010 (YouTube)](https://www.youtube.com/watch?v=6A07Pj71TUA)
- [Khan Kids Zendesk: Schools Feature](https://khankids.zendesk.com/hc/en-us/articles/7585400973723--NEW-Khan-Kids-for-Schools)
- [Khan Kids Zendesk: Super Simple Songs](https://khankids.zendesk.com/hc/en-us/articles/360006993852-Sing-Dance-and-Learn-with-Super-Simple-Songs-and-Khan-Academy-Kids)

### 政府・公的機関

- [ProPublica Nonprofit Explorer: Khan Academy Inc EIN 26-1544963](https://projects.propublica.org/nonprofits/organizations/261544963)
- [NH Department of Education: Khan Academy AI Free Access](https://www.education.nh.gov/news-and-media/khan-academy-extend-its-ai-services-no-cost-new-hampshire-educators-and-students)

### 二次情報・メディア

- [Wikipedia: Khan Academy](https://en.wikipedia.org/wiki/Khan_Academy)
- [Wikipedia: Sal Khan](https://en.wikipedia.org/wiki/Sal_Khan)
- [Wikipedia: GPT-4](https://en.wikipedia.org/wiki/GPT-4)
- [TechCrunch: Khan-College Board Partnership 2014](https://techcrunch.com/2014/03/05/khan-academy-gets-major-partnership-to-close-rich-advantage-in-college-test-prep/)
- [TechCrunch: Duck Duck Moose Joins Khan 2016](https://techcrunch.com/2016/08/26/kids-app-maker-duck-duck-moose-joins-khan-academy/)
- [EdSurge: Khan Buys Duck Duck Moose for $1](https://www.edsurge.com/news/2016-08-27-khan-academy-buys-children-s-app-developer-duck-duck-moose-for-1)
- [EdWeek: SAT Score Gains from Free Practice](https://www.edweek.org/teaching-learning/college-board-reports-score-gains-from-free-sat-practice/2017/05)
- [EdWeek: College Board Enlists Khan for SAT 2014](https://www.edweek.org/teaching-learning/college-board-enlists-khan-academy-for-sat-prep/2014/03)
- [EdWeek: Khan Plans to Shake Up Writing 2023](https://www.edweek.org/technology/khan-academy-plans-to-shake-up-writing-instruction-with-ai-tool/2023/11)
- [EdWeek: AI-Powered Tutor Meaningful Results](https://www.edweek.org/technology/opinion-can-an-ai-powered-tutor-produce-meaningful-results/2025/07)
- [The 74: Sal Khan COVID Math Toll](https://www.the74million.org/article/74-interview-educator-khan-academy-founder-sal-khan-on-covids-staggering-math-toll/)
- [The 74: Khan Academy Kids Review](https://www.the74million.org/zero2eight/learning-and-growing-with-khan-academy-kids/)
- [Quartz: Khan Academy COVID Response](https://qz.com/1857486/how-khan-academy-hopes-to-reduce-covid-19s-impact-on-education)
- [CNBC: Microsoft Khan Free AI for Educators](https://www.cnbc.com/2024/05/21/microsoft-khan-academy-launch-free-ai-assistant-for-all-us-teachers.html)
- [K-12 Dive: AI Tutoring Boom 2025](https://www.k12dive.com/news/3-questions-for-k-12-leaders-to-consider-amid-the-ai-tutoring-boom/757314/)
- [Tech & Learning: Khanmigo GPT-4 by Sal Khan](https://www.techlearning.com/news/what-is-khanmigo-the-gpt-4-learning-tool-explained-by-sal-khan)
- [Class Central: Khan Tax Returns Analysis 2008-2021](https://www.classcentral.com/report/khan-academy-tax-returns-analysis/)
- [Khan Academy Wiki Fandom: Knowledge Map](https://khanacademy.fandom.com/wiki/Knowledge_Map)
- [Khan Academy Wiki Fandom: Energy Points](https://khanacademy.fandom.com/wiki/Energy_Points)
- [Educational Data Mining 2022: MAP Accelerator Causal Effects](https://educationaldatamining.org/edm2022/proceedings/2022.EDM-industry-track.112/index.html)
- [THE Journal: Khanmigo Writing Coach Launch](https://thejournal.com/articles/2024/07/22/khan-academy-launches-khanmigo-writing-coach.aspx)
- [Charity Navigator: Khan Academy Rating](https://www.charitynavigator.org/ein/261544963)
- [Cause IQ: Khan Academy](https://www.causeiq.com/organizations/khan-academy,261544963/)
- [Kidscreen: Khan Gets Into Kids](https://kidscreen.com/2018/11/08/khan-gets-into-kids/)
- [Cult of Pedagogy: Khan Mastery Learning](https://www.cultofpedagogy.com/khan-mastery-learning/)
- [Prosperity For America: Khan Academy Statistics](https://www.prosperityforamerica.org/khan-academy-statistics/)
- [ElectroIQ: Khan Academy Statistics](https://electroiq.com/stats/khan-academy-statistics/)

---

**作成: 2026-04-27 / Khan Academy本体・Kids・Khanmigo の3プロダクト統合分析**

**Nolla適用優先度ランキング**:
1. **Khan Academy Kids の Kodi常駐+Journey Mode+ご褒美ボックス開封+キャラ部屋 = 直接転用候補** (★★★)
2. **Khanmigo の Socratic AI + 安全設計 = Nolla AI Companion設計テンプレート** (★★★)
3. **本体の Mastery Learning思想 = 適応型難度の理論的バックボーン** (★★★)
4. **本体の College Board×SAT エビデンス戦略 = Nolla 独立RCT 戦略の手本** (★★☆)
5. **Khanの "特別支援を避けた領域" = Nollaの差別化空白地帯** (★★★)
