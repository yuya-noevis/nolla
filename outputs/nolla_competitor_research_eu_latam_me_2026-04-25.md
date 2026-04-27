---
STATUS: ACTIVE
LAST_UPDATED: 2026-04-25
PURPOSE: 欧州・中南米・中東・アフリカ・大洋州の発達支援/ASD向け子ども向けプロダクトの徹底調査。前回のリサーチでDubuを見落とした反省を踏まえ、地域・言語・助成プログラムを横断的に網羅。
RELATED: nolla_companies_master_list_2026-04-27.md, nolla_dubu_ella_deep_analysis_2026-04-22.md, nolla_jade_autism_competitive_analysis.md
---

# Nolla 競合徹底リサーチ — 欧州・中南米・中東・アフリカ・大洋州 (2026-04-25)

## 0. 調査方針

### ハードゲート（最初に適用）
**対象製品はASD（自閉スペクトラム症）を主要ターゲット層に含むこと**を確認できた製品のみ「主要候補」として扱う。
- ADHD only / LD only / Down症 only / 定型発達向けは「ボーダー」または「除外」へ
- 多言語表記の確認: TEA (Trastorno del Espectro Autista) / TSA (Trouble du Spectre de l'Autisme) / Autismus / Autisme / Autismo / TEA (Transtorno do Espectro Autista) / РАС / TEA (Trastorn de l'Espectre Autista)
- 不明な場合はボーダー扱い

### 既知の3大ベンチマーク（再調査不要）
Jade ND, Otsimo, Dubu (詳細は `nolla_companies_master_list_2026-04-27.md` 参照)

### 調査範囲
- **欧州**: 西欧（仏、独、伊、西、葡、瑞、墺、白、蘭）+ 北欧（瑞、諾、芬、丁）+ 東欧（波、捷、洪、羅）+ 露
- **中南米**: 伯、墨、亜、智、コロンビア
- **中東**: UAE、サウジ、イスラエル
- **北アフリカ**: モロッコ、エジプト
- **その他**: 南ア、ニュージーランド、豪

### 調査ソース
Crunchbase、各国App Store/Google Play、EU Horizon Europe助成、Hub71ポートフォリオ、Start-Up Nation Central（イスラエル）、PubMed逆引き、Autism Europe、各国自閉症協会、業界誌、技術ブログ

---

## 1. エグゼクティブサマリー

### 1-1. 主要発見（前回見落とし含む 5点）

| # | 発見 | 重要度 | Nollaへの示唆 |
|---|---|---|---|
| 1 | **Genial Care（ブラジル）が$10M調達・年商$22M・150名・前年比600%成長**でASD家庭ケア領域を支配中 | ★★★★★ | ToB療法サービス+アプリ統合モデル。Nollaが「ゲーム」一本足だと劣後の可能性 |
| 2 | **BlinkLab × モロッコ政府: 600,000児/年のスクリーニング**を国家事業化（豪州発、2026-04開始） | ★★★★★ | 「測定」のスケール感が全く違う。Nollaが測定軸で勝負するなら国家規模との競合 |
| 3 | **Auticiel/AMIKEO（仏）が200,000ユーザー・300施設・€1M+調達**で仏語圏支配 | ★★★★ | LearnEnjoy/Emofaceと共に仏語圏が独自エコシステム形成。日本進出機会大 |
| 4 | **Tiimo（デンマーク）€3M調達・50万人・iPhone App of the Year 2025** | ★★★★ | Tiimoは「ADHD/ASD向け視覚的タスク管理」で勝者ポジション。Goally型のEU版 |
| 5 | **Compedia/EmotiPlay（イスラエル）+ Cambridge+Karolinska+Bar-Ilan共同RCT**でASD症状軽減 | ★★★ | 「学術コンソーシアム型エビデンス構築」モデル。Nollaが目指すべき形 |

### 1-2. 地域別「危険な競合」サマリー

| 地域 | 危険度 | 主要プレイヤー |
|---|---|---|
| ブラジル | ★★★★★ | Genial Care（家庭ケア+アプリ）、Jade ND（既知）、Tismoo、Matraquinha、Estimula AI |
| 仏語圏 | ★★★★ | Auticiel/AMIKEO、LearnEnjoy、Emoface、Kirikou、TSARA |
| スペイン | ★★★ | NeuronUP（200K user）、AbaPlanet、AutisMIND、EmoPLAY、Aprendices Visuales |
| イスラエル | ★★★ | Compedia/EmotiPlay、Alerti、Cognoa（米だがイスラエル系創業者経由ノウハウ） |
| UAE/モロッコ | ★★★★ | Jade ND（既知）、BlinkLab経由スクリーニング、Spectator/BiDiApp（テレヘルス） |
| 北欧 | ★★★ | Tiimo（デンマーク）、Toca Boca（既知、スウェーデン） |
| 英国 | ★★ | Brain in Hand（成人中心、子ども拡張可能性） |
| 伊・蘭 | ★★ | MITA/ImagiRation、Niki Talk、SAM/AutiSpark |
| 露・東欧・南ア | ★ | 主に非営利・小規模アプリのみ |

### 1-3. Nollaの差別化チャンス（再確認）

3社共通脆弱性の追認: 主力アプリの**査読RCTゼロ or 主要評価項目で有意差なし**は欧州・中南米でも同様。**Nolla MVP後の独立RCTが市場で唯一の「強エビデンス勢」に立つ可能性**は維持。ただし**Compedia/EmotiPlayがCambridge+Karolinska+Bar-Ilan共同RCT**を既に出版している点には注意。

---

## 2. 【最重要】10万+ユーザー規模 (Dubuレベル)

| 企業名 | 国 | 設立 | 創業者 | プロダクト | ASD含む | ユーザー | 資金 | エビデンス | 特徴 | URL | 信頼度 |
|---|---|---|---|---|---|---|---|---|---|---|---|
| **Genial Care** | 🇧🇷ブラジル | 2020 | Kenny Laplante (元臨床医) | アプリ+対面/オンラインABA・ST・OT療法 | **YES (ASD専門)** | 不明（年商$22M、社員150名、年成長600%） | **$10M (2023, General Catalyst+Canary+Atlantico, valuation $50M)** | 開示なし、独自評価のみ | ToC月額R$6,000〜（クリニック平均R$20-25K比1/3）。アプリは進捗追跡+保護者教育コンテンツ | [genialcare.com.br](https://genialcare.com.br) | ★★★★★ |
| **Auticiel (AMIKEO)** | 🇫🇷フランス | 2011 | Stéphanie Lola Hugues | AMIKEO suite (時間割、タイマー、AAC、社会的物語、感情認識) | **YES (ASD+知的障害)** | **200,000人** (仏・白・盧・加) | **€1M+ (specialized funds)** | "87%の専門家が有効と評価、86%の子どもが目標達成"（自社調査） | iPad/Android、ESUS認定（社会連帯経済）、仏MDPH助成対象（PCH）、施設300拠点 | [auticiel.com](https://auticiel.com) | ★★★★★ |
| **Tiimo** | 🇩🇰デンマーク | 2015 | Helene Lassen Nørlem | 視覚的タスクスケジューラ、AIプランナー、感覚配慮UI | YES（ADHD/ASD/Dyslexia/Dyspraxia全般） | **500,000人+**（"over half a million users"） | **€3M seed** | エビデンスとしての査読論文は限定的。共同設計プロセスが特徴 | **iPhone App of the Year 2025**（App Store Awards） | [tiimoapp.com](https://tiimoapp.com) | ★★★★★ |
| **NeuronUP** | 🇪🇸スペイン | 2012 | Iñigo Fernández de Piérola | 神経心理リハビリ・認知刺激（ASD・ADHD・知的障害・LD・脳損傷・健康加齢） | **YES (ASD+ID含むがコアは脳損傷+加齢)** | **200,000人+ (75ヶ国)** | Moira Capital投資（額非公開、Series推定） | 神経心理学者・OT共同設計。論文支援多数 | 6,000+活動。子供向け「NeuronUP Kids」あり。施設・専門家中心（B2B） | [neuronup.us](https://neuronup.us) | ★★★★ |
| **MITA (ImagiRation)** | 🇺🇸米 (国際展開、伊語あり) | 2015頃 | Andrey Vyshedskiy (Boston Univ) | Mental Imagery Therapy、ASD早期介入 | **YES (ASDコア)** | **1.5-2M児（複数ソース）、437K+DL** | 詳細不明（学術主導） | **3年RCT n=6,454で言語スコア+120%向上** | 言語遅延+ASDに特化、PRT理論ベース、無料、伊語版あり | [imagiration.com](https://imagiration.com) | ★★★★ |
| **AVAZ AAC** | 🇮🇳印 (西/葡/伊/英展開) | 2010 | Ajit Narayanan | AAC（コミュニケーション補助） | YES (ASD含むがコアはAAC全般) | 25校500児で検証済（規模数値不明、グローバル展開） | 詳細不明 | 多言語AAC論文多数 | 西/葡/伊/独/英含む多言語、Spanish ver "Avaz Espanol AAC app" | [avazapp.com](https://avazapp.com) | ★★★ |

### 2-1. 補足: BlinkLab（豪州）— 国家事業の規模で別格

| 項目 | 内容 |
|---|---|
| 国 | 🇦🇺オーストラリア（プリンストン研究者発） |
| プロダクト | Dx1 = スマホカメラ+AI（顔反射・眼球運動・驚愕反応・姿勢・発声） |
| **モロッコ国家展開** | **Foundation Mohammed V との契約。年600,000児スクリーニング、3,000以上の公共一次医療センター展開、2026-04開始** |
| エビデンス | **Autism Research誌（2026-01）、n=536、感度91%** |
| FDA | US FDA pivotal trial 開始済 |
| Nollaへの示唆 | **「測定」をやるなら国家事業の規模感がベンチマーク**。Nollaの「測定」は介入評価軸であって、診断スクリーニングではないという棲み分けが必須 |

URL: [blinklab.org](https://blinklab.org)

---

## 3. 中規模 1万-10万ユーザー (or 強い注目度)

| 企業名 | 国 | 設立 | プロダクト | ASD | ユーザー | 資金 | 特徴 | 信頼度 |
|---|---|---|---|---|---|---|---|---|
| **LearnEnjoy** | 🇫🇷仏 | 2012頃 | 教育コンテンツ（コミュニケーション・遊び・理解・日常生活）、3レベル制 | **YES** | **40,000ユーザー、600家庭+2,000専門家研修** | Ashoka Fellow（Gaele Regnault、ASD児の母） | **査読論文あり（European Psychiatry誌等）：実行機能訓練効果** | ★★★★ |
| **Emoface** | 🇫🇷グルノーブル | 2017 | Emoface Play & Learn Emotions（3Dアバター・感情認識） | **YES** | 不明 | $80.6K Grant (2023, EU+Linksium) +インキュベーション | 3D感情訓練、創業者はルーマニア出身、Bar-Ilan/Karolinska連携の系譜 | ★★★ |
| **EmotiPlay (Compedia)** | 🇮🇱イスラエル | 2015 (Compedia創業1986) | Emotion recognition serious game | **YES** | 不明（伊・西・英・希・スウェーデン展開） | $1M seed (Israel Innovation Authority+private) | **クロスカルチャーRCT (UK+Israel+Sweden、Cambridge+Karolinska+Bar-Ilan、Eur Child Adolesc Psychiatry誌)** | ★★★★ |
| **Floreo** | 🇺🇸米 (国際展開) | 2016 | VR therapy (社会・コミュニケーション・生活スキル) | **YES** | 不明、150+モジュール | **$12.1M+ (NIMH SBIR + VC)** | **Joint Attention Module RCT、95.4%受容性** | ★★★★ |
| **Brain in Hand** | 🇬🇧英 | 2010 | デジタル自己管理+人間支援連携 | **YES (主に成人) ASD児童拡張少** | NHS導入実績（数値非公開） | NHS digital pathway採択 | **BJPsych Open RCT、不安HoNOS半減** | ★★★ |
| **Niki Talk** | 🇮🇹伊 | 2014頃 | AAC・コミュニケーションボード | YES (ASD含むがAAC全般) | 不明 | 個人開発（Alessandro La Rocca） | 伊国内有力AAC、複数バージョン（無料Lite + Pro） | ★★ |
| **AbaPlanet** | 🇪🇸スペイン | 2013頃 | ABA基盤・受容言語+マッチング、適応難度 | **YES** | 不明 | Fundación Planeta Imaginario（NGO） | 350語彙+知的システム自動難度調整 | ★★ |
| **AutisMIND** | 🇪🇸スペイン | 2017頃 | Theory of Mind・社会スキル | **YES** | 不明 | IDAPP center（クリニック発） | 心理士+SLP共同設計 | ★★ |
| **EmoPLAY** | 🇪🇸スペイン | 2017 | コンピュータビジョンで感情認識 | **YES** | 75児パイロットで効果検証 | Fundación Orange + CTIC | 無料、ウェブカメラAI | ★★ |
| **Aprendices Visuales (José Aprende)** | 🇪🇸スペイン | 2010代 | 絵カード+視覚物語・読み学習（ピクトグラム） | **YES** | 20+e-book/app、無料 | Fundación Orange + Princesa de Girona賞 | 無料・WSA Global Award winner | ★★★ |
| **Pictogram Room** | 🇪🇸スペイン | 2006 | カメラ+プロジェクター80活動（身体認識・joint attention・模倣） | **YES** | 無料配布、家庭+施設 | Fundación Orange + U. Valencia IRTIC | EU H2020助成 (Project ID 856015) | ★★★ |
| **Día a Día** | 🇪🇸スペイン | 2014頃 | 視覚日記カレンダー | **YES** | 無料Android | Fundación Orange + BJ Adaptaciones | 無料 | ★★ |
| **Tismoo.me** | 🇧🇷ブラジル | 2015 | AI Genioo + 健康記録（カルテ・遺伝子検査） | **YES** | 不明（パートナー研究n=2,247） | 1投資家（額非公開） | **世界初ASD専用パーソナル医療検査ラボ**、Genial Careと共同研究 | ★★★ |
| **Matraquinha (TalkBel)** | 🇧🇷ブラジル | 2018頃 | AAC（250カード+音声+生成AI） | **YES** | Sabará小児病院パートナー | 不明（個人開発） | 創業者Wagner Yamuto（養子のASD児が契機）、2026新版TalkBelで生成AI搭載 | ★★ |
| **Estimula AI** | 🇧🇷ブラジル | 2024頃 | AI生成パーソナライズ療育活動 | **YES** | 不明 | 個人開発（Pacheco夫妻） | 親が子の年齢・発達領域・家にある物を入力→AI活動生成 | ★★ |
| **Spectator BiDiApp (Inaya Autism)** | 🇲🇦モロッコ | 2021頃 | テレヘルス・行動アセスメント | **YES** | フェーズ2で15,000家庭目標 | Spectator Healthcare（蘭/モロッコ系） | 仏/アラビア/英多言語、ホワイトラベル可 | ★★ |
| **PictoTEA** | 🇦🇷アルゼンチン | 2014頃 | ピクトグラムAAC、6段階難度 | **YES** | 180,000+DL（複数ソース） | Velociteam（無料、寄付ベース） | 西/英/葡/伊で利用、無料 | ★★★ |

---

## 4. 早期段階 / 資金調達中

| 企業名 | 国 | プロダクト | ASD | 状態 | 信頼度 |
|---|---|---|---|---|---|
| **Kirikou et les Enfants Extraordinaires** | 🇫🇷仏 | 認知障害児向け魔法的世界アプリ（無料） | **YES** | LearnEnjoy系（Gaele Regnault） | ★★ |
| **TSARA** | 🇫🇷仏 | 自閉症学習ゲーム | **YES** | CREAI Aquitaine + Bordeaux大、Klésia Success賞 | ★★ |
| **SAM (Stress Autism Mate)** | 🇳🇱蘭 | ストレス管理 | **YES** | TNO+ASDクライアント共同開発 | ★ |
| **AutiSpark** | 🇳🇱蘭/🇮🇳印 | 教育ゲーム（絵連想・感情・音認識） | **YES** | 公開アプリ | ★ |
| **Choiceworks** | 🇨🇭瑞 | 視覚スケジュール+social stories | **YES** | 既存 | ★ |
| **Аутизм: Общение (Autism: Communication)** | 🇷🇺ロシア | AAC（150+カード、世界初の露語AAC） | **YES** | NGO主導（Solnechnymir）、2012〜 | ★★ |
| **Говори Молча (Speak Silently) / Indigo Kids** | 🇷🇺ロシア | AAC（ASD・Down・失語） | **YES** | 個人開発 | ★ |
| **Носочек Саша (Sock Sasha)** | 🇷🇺ロシア | 個人アシスタント | **YES** | NPO | ★ |
| **Когнитёнок (Kognitenok)** | 🇷🇺ロシア | ASD教育+専門家連携 | **YES** | NPO | ★ |
| **Autism&Beyond** | 🇿🇦南ア | iPhoneスクリーニング | **YES** | パイロット研究のみ | ★ |
| **Aawn** | 🇸🇦サウジ系 | アラビア語PECS+AAC（クラウド） | **YES** | 研究プロトタイプ（19被験者） | ★ |
| **Touch-to-Speak** | アラブ | アラビア語AAC（modern+方言） | **YES** | 研究段階 | ★ |
| **Alerti** | 🇮🇱イスラエル | AI感情モニタリング・行動予測 | **YES** | 早期段階 | ★★ |
| **Itay & Beyond** | 🇮🇱イスラエル | 神経精神薬剤発見プラットフォーム | **YES** | スタートアップ | ★ |
| **Hackautism** | 🇮🇱イスラエル | アクセラレータ（ASD家庭向け起業支援） | **YES** | アクセラ | - |
| **Ola Mundo Messenger** | 🇮🇱イスラエル | AAC（ASD・Down・失行） | **YES** | 2014公開 | ★ |
| **Genioo (Tismoo部品)** | 🇧🇷ブラジル | 会話AI for ASD | **YES** | Tismoo統合 | (上記参照) |
| **NDTx-01** | 🌐 | adolescent ASD向けデジタル療法 | **YES** | パイロットRCT 2024-2025 | ★★ |
| **Eggly** | 🌐 | ARニューロフィードバック | **YES** | 学術プロトタイプ | ★ |
| **AiM Project** | 🇵🇹ポルトガル | APPDA Coimbra主導の学習支援 | **YES** | 2024-開始、研究プロジェクト | ★ |
| **BeAusome** | 🇵🇹ポルトガル | 教師向け技術統合プログラム | **YES** | 研究プロジェクト | - |
| **EMPOWER (EU H2020)** | 🇪🇺EU | U. Valencia主導、教育プラットフォーム | **YES (ASD含む)** | 2022-2025進行中 | ★★ |
| **R2D2-MH (EU H2020)** | 🇪🇺EU | ADAPPT app（保護者支援） | **YES (ASD/ADHD/IDカバー)** | テスト中 | ★★ |
| **CANDY (EU H2020)** | 🇪🇺EU | ASD/ADHD/IDと身体疾患の関連 | **YES** | 完了 | ★ |
| **Pictogram (EU H2020 Project ID 856015)** | 🇪🇺EU | ASD治療管理デジタル環境 | **YES** | 研究 | ★ |
| **Inaya Autism (Spectator)** | 🇲🇦モロッコ | (上記再掲、フェーズ2拡大中) | **YES** | 進行中 | ★★ |
| **Autism Tech Accelerator 2026** | 🌐 | 10週間バーチャルアクセラ | - | 2026開始予定 | - |

---

## 5. ボーダーケース（ASD含むが主要対象でない、または年齢層・機能差大）

| 企業名 | 国 | 内容 | 除外/注意理由 |
|---|---|---|---|
| **Auticon** | 🇩🇪独/15ヶ国 | ASD成人IT雇用コンサル | 子ども向けではない（成人特化） |
| **Brainhero** | 🇦🇹ウィーン | ASDアプリ（ニューロフィードバック系） | **2025年8月倒産（破産）**。失敗事例として記録 |
| **CogniFit Kids** | 🇪🇸スペイン | 認知トレーニング（既出） | ASD特化でない汎用脳トレ。既知 |
| **Toca Boca** | 🇸🇪スウェーデン | 創作ゲーム | ASD特化でない、デザインベンチマーク（既知） |
| **Avaz AAC** | 🇮🇳印 | AAC | ASDも対象だがAAC全般、既知に近い |
| **Jellow Communicator** | 🇮🇳印 (IIT Bombay) | 16言語AAC、無料 | ASDも対象だがAAC全般。Spanish/French/German含む多言語性は注目 |
| **Cognoa (Canvas Dx)** | 🇺🇸米 | FDA認可ASD診断アプリ（1.5-6歳） | 診断専用、Nollaのスコープ外。ただし市場のスクリーニング層を担う |
| **Akili (EndeavorRx)** | 🇺🇸米 | FDA認可ADHDゲーム療法 | ADHD only、ASDではない。先行者参考 |
| **Tobii Dynavox** | 🇸🇪スウェーデン | 視線追跡AAC | AAC全般、ハードウェア依存 |
| **Invirtua** | 🇺🇸米 | アバター遠隔セラピー | ASDだが商業規模小 |
| **Autism360** | 🌐豪 | 24/7サポートマガジン+コミュニティ | サービス型、アプリではない |
| **DayMate** | 🇳🇱蘭 | 日次スケジュール | ASD特化でない一般 |
| **Choiceworks** | 🌐 | 視覚スケジュール+social stories | 既存 |
| **MeBe** | 🇺🇸米 | ABAサービス | サービス会社、子ども向けアプリでない |
| **Goally** | 🇺🇸米 | 既知（行動管理ハードウェア） | 既知 |
| **Speech Blubs** | 🇺🇸米 | 既知 | 既知 |
| **Avela Health** | 🇺🇸米 | バーチャルABA | サービス型 |
| **AnswersNow** | 🇺🇸米 | BCBAバーチャル | サービス型 |
| **Sprout** | 🇺🇸米 | ABAマッチング+治療計画 | $10M Seed、サービス型 |
| **Cortica** | 🇺🇸米 | 神経学的療法 | $175M、診療所 |
| **Elemy** | 🇺🇸米 | 在宅小児行動ケア | $323M、サービス型 |

---

## 6. 除外（誤マッチ）

| 名前 | 内容 | 除外理由 |
|---|---|---|
| Programa Vivenda | ブラジル住宅修繕プログラム | 住宅プログラム、ASD無関係 |
| Vivenda das Estrelas / Programa LADI | 質問にあったが該当データなし | 確認できず |
| Lobaki | 米Mississippi発VR教育 | ASD特化でない、米国会社 |
| Zaubereinmaleins | 独教育リソースサイト | ASD無関係（一般教育） |
| Modulta / Habilectos / Asoautism (墨) | 質問にあったが該当データなし | 確認できず |
| Ella.kids | 米AIコンテンツ生成（既知、別類型） | 親・教師向けツール、子ども向けでない（既知） |

---

## 7. 地域別深掘り

### 7-1. ブラジル（最危険地域）

ブラジルはASD関連スタートアップの最大ホットスポット。以下が確認済み主要プレイヤー:

| 企業 | フォーカス | 段階 | リスク |
|---|---|---|---|
| Genial Care | ASD家庭ケア+アプリ | $10M、年商$22M | **★★★★★ 最大競合** |
| Jade ND | ASDゲーム+教育 | 既知 | ★★★★★（既知） |
| Tismoo | ASD医療データ+AIチャット | 投資家1社 | ★★★ |
| Matraquinha/TalkBel | AAC | Sabará病院連携 | ★★ |
| Estimula AI | AI療育活動生成 | 個人 | ★★ |
| ABC Autismo | 識字ゲーム | 100K+ DL | ★★ |
| Autismo Projeto Integrar | 監視アプリ | アカデミック検証 | ★ |

**示唆**: ブラジルはJade NDだけではない。**Genial Careが「家庭ケア+アプリ統合」の事業モデルで先行**。Nollaが「ゲーム単体」だと、Genial Care型の統合プレイヤーに対して劣後する可能性。

### 7-2. 仏語圏（独自エコシステム）

仏は**フランス語圏（仏・白・盧・加魁）の200,000人ユーザー基盤**を持つAuticielがアンカー。さらに以下が補完:

- **LearnEnjoy** (ASD児母Gaele Regnault、Ashoka Fellow、40K user、査読論文)
- **Emoface** (3D感情アバター、EU+Linksium資金)
- **Kirikou** (LearnEnjoy系)
- **TSARA** (CREAI+Bordeaux大)

**示唆**: 仏語圏はNollaが日本展開後にグローバル展開する際の優先度低候補。既存プレイヤーが言語/文化的ローカライズで強い。**逆に、Auticiel/LearnEnjoyの仏語コンテンツ手法を参考にできる**。

### 7-3. スペイン（NPO主導+施設チャネル）

スペインは**Fundación Orange**が大量のNPO発無料アプリを提供:
- EmoPLAY、Aprendices Visuales、Pictogram Room、Día a Día、ComuniteCAA

商業:
- NeuronUP (200K user、75ヶ国、施設・専門家中心B2B)
- AbaPlanet、AutisMIND、iSecuencias (各NPOまたはクリニック発)
- Picaa、Soyvisual、AraSuite (オープンソース・ピクトグラム系、UAE展開可能性)

**示唆**: スペインは**NPO+大企業CSR（Fundación Orange）型エコシステム**で、商業競争密度は中程度。NeuronUPが**施設B2Bで200K user**は注目に値する。

### 7-4. UAE/中東/モロッコ（国家事業の規模）

- Jade ND（既知、Hub71）
- BlinkLab × Foundation Mohammed V（**年600,000児スクリーニング、2026-04開始**）
- Spectator/BiDiApp（モロッコ・Inaya Autism、2-3年で15,000家庭）
- Sanad Village (Dubai、ABA8年実績)
- Hub71 Anjal Z プログラム（早期幼児期イノベーションアクセラ、2026 cohort募集中）

**示唆**: 中東は**国家事業×スタートアップ**のスケール感が他地域と桁違い。**Hub71のAnjal Zプログラム**はNollaが応募検討する価値あり。BlinkLabは「測定」軸で国家規模、Nollaの「介入評価測定」とは棲み分け可能。

### 7-5. イスラエル（学術コンソーシアム強い）

- Compedia/EmotiPlay (Cambridge+Karolinska+Bar-Ilan共同RCT、Eur Child Adolesc Psychiatry誌)
- Alerti（AI行動予測）
- Hackautism（ASDアクセラ）
- Itay & Beyond（薬剤探索）
- Ola Mundo Messenger（AAC）

**示唆**: イスラエルは**「学術コンソーシアム型エビデンス構築」のモデル**。Nollaが目指すべき形態。Compedia/Bar-Ilan University Autism Lab/Cambridge ARC/Karolinska Institutetへの**学術連携アプローチ**は実装後検討に値する。

### 7-6. 北欧（Tiimoとデザイン）

- Tiimo（デンマーク、€3M、500K+、iPhone App of the Year 2025）
- Toca Boca（既知、デザインベンチマーク）

**示唆**: Tiimoは「視覚的タスク管理」でADHD+ASDをまたぐ勝者。**Goallyの欧州版**のポジション。Nollaの「ゲーム療育」とは棲み分け可能だが、保護者向けタスク管理機能を追加する場合は要警戒。

### 7-7. 露・東欧（市場小・NPO主導）

- ロシア: Аутизм: Общение（Solnechnymir）、Говори Молча（Indigo Kids）、Носочек Саша、Kognitenok等、すべてNPO/個人開発、商業化なし
- 東欧（波・捷・洪・羅）: 商業スタートアップは確認できず、教師訓練系プロジェクト中心（ASD-EAST等）

**示唆**: 露東欧は**短期的な競合脅威ゼロ**。長期的な拡張市場として位置づけ可能だが、現時点では優先度低。

### 7-8. 北米（再掲・参考）

| 名 | 段階 | コメント |
|---|---|---|
| Cognoa Canvas Dx | FDA認可、診断特化（1.5-6歳） | 診断、Nolla介入と棲み分け |
| Akili EndeavorRx | FDA認可ADHDゲーム | ADHD only、ASD除外 |
| Floreo | $12M+、VR | RCTあり、子ども向けASD VR |
| Goally | 既知 | 既知 |
| Speech Blubs | 既知 | 既知 |
| Cortica | $175M、神経学的診療所 | サービス型 |
| Sprout | $10M、ABAマッチング | サービス型 |
| Elemy | $323M、在宅小児行動ケア | サービス型、巨大資金 |
| AnswersNow | $40M、BCBAバーチャル | サービス型 |
| Avela Health | $10M、バーチャルABA | サービス型 |

**示唆**: 米はサービス型（ABAクリニック+バーチャル療法）が巨大資金を集めている。**「アプリ単体」ではなく「サービス+アプリ」の統合モデル**が米市場のメインストリーム。

---

## 8. Nolla戦略への影響と提言

### 8-1. 既存戦略の維持
- **「ASD+知的障害特化型ゲーム療育（NCI測定付き）」**のポジションは依然として独占可能
- 3大ベンチマーク（Jade/Otsimo/Dubu）+今回判明のGenial Care/Auticiel/EmotiPlay/Tiimoとも明確に差別化可能

### 8-2. 新たな注意事項

| 項目 | 詳細 | 対応 |
|---|---|---|
| **「アプリ単体」モデルの限界** | Genial Care/米サービス型は「療法サービス+アプリ統合」で巨大資金獲得 | Nollaは将来的にToB（施設）連携で「サービス連動」を視野 |
| **エビデンス勝ちのハードル** | EmotiPlay/Tiimo/MITA/LearnEnjoy/Floreo は既に査読論文を持つ | NollaのRCTは「主要評価項目で有意差を出せる設計」が必須。Dubu失敗例の反面教師 |
| **国家スクリーニング規模** | BlinkLab×モロッコ年60万児、Cognoa FDA認可 | Nollaは「診断スクリーニング」と「介入評価」の役割分離を明確に |
| **Hub71 Anjal Z** | 早期幼児期イノベーションアクセラ、2026 cohort募集中 | Nollaが応募検討する価値あり（資金+UAE展開チャネル） |
| **学術連携の重要性** | Compedia/EmotiPlayはCambridge ARC+Karolinska+Bar-Ilanとの共同RCTで圧倒的信頼性 | Nolla MVP後、東大/京大/UCL/Cambridge ARC等との連携検討 |

### 8-3. グローバル展開時の優先順位（更新）

```
高優先（言語+市場+規制で参入容易）:
  日本（コア市場）→ 韓国（DubuA/B経由）→ 台湾 → シンガポール
中優先（規模・成長性大）:
  ブラジル（Jade ND/Genial Care苦戦市場）→ UAE（Hub71経由）→ ドイツ
低優先（既存プレイヤー強い）:
  フランス語圏（Auticiel強い）→ スペイン（NPO+施設エコシステム強い）→ 北欧（Tiimo+Toca Boca）
保留:
  英米（Floreo/Goally/Cognoa強い、規制ハードル高）→ 露東欧（市場小）
```

### 8-4. 更新版「3大ベンチマーク」案

現在の3大: Jade ND / Otsimo / Dubu

**追加検討すべき4社目以降**（重要度順）:
1. **Genial Care（ブラジル）** — ToC統合モデルの脅威（年商$22M、$10M調達）
2. **EmotiPlay/Compedia（イスラエル）** — 学術コンソーシアム型エビデンスの模範
3. **Auticiel/AMIKEO（フランス）** — 仏語圏エコシステム支配（200K user、施設300、政府助成連動）
4. **Tiimo（デンマーク）** — Goally型タスク管理の欧州勝者（500K+、€3M、Apple Award）
5. **BlinkLab（豪→モロッコ）** — 国家スクリーニング規模の新興勢力

→ Nollaが「測定+ゲーム療育+保護者教育」の三位一体を主張するなら、**Genial Care+EmotiPlay+Tiimo+BlinkLab+Auticiel** を「補助ベンチマーク5社」として追加観察すべき。

---

## 9. 調査の限界と次回のフォローアップ

### 9-1. 今回確認できなかった事項
- Mexican autism startups の具体名（Modula/Habilectos等は確認できず、要追加調査）
- Israeli "Hadarisha"/"AnxietyTalk"等の具体名（確認できず）
- Vivenda das Estrelas / Programa LADI（ブラジル）— 該当情報なし
- Auticiel の正確な創業年・最新ARR
- Genial Care のアプリ単体ユーザー数（年商$22Mは把握、アプリARRは非公開）

### 9-2. 次回優先調査
1. Hub71 Anjal Z 2026 cohort 詳細応募要件
2. EU Horizon Europe R2D2-MH/EMPOWER の市場化プロジェクト
3. Genial Care の競合（Brazil ABA SaaS市場の他プレイヤー）
4. Compedia/EmotiPlay 米国/欧州拡大の最新状況
5. インドのJellow + AVAZの欧米展開状況

---

## 10. 参考リンク（主要発見のみ）

### 最重要発見
- [Genial Care](https://genialcare.com.br) / [TechCrunch記事](https://latinamericareports.com/brazilian-startup-genial-care-raises-10-million-to-help-parents-and-caregivers-of-children-with-autism/7394/)
- [Auticiel/AMIKEO](https://auticiel.com/en/)
- [Tiimo](https://www.tiimoapp.com/) / [Sifted記事](https://sifted.eu/articles/tiimo-planning-app-for-neurodivergent-people)
- [BlinkLab × Morocco](https://www.miragenews.com/ai-startup-morocco-team-up-for-fast-autism-1641858/) / [Yabiladi](https://en.yabiladi.com/articles/details/190779/autism-morocco-digital-solution-paves)
- [Compedia/EmotiPlay](https://www.emotiplay.com/) / [PubMed](https://pubmed.ncbi.nlm.nih.gov/28275895/)

### 主要中規模
- [LearnEnjoy](https://www.learnenjoy-apps.com/) / [Ashoka Fellow](https://www.ashoka.org/en-us/fellow/gaele-regnault)
- [Emoface](https://www.emoface.fr/en/) / [Crunchbase](https://www.crunchbase.com/organization/emoface)
- [NeuronUP](https://neuronup.us/)
- [Floreo](https://floreovr.com/)
- [Brain in Hand](https://www.braininhand.co.uk/) / [BJPsych Open RCT](https://www.cambridge.org/core/journals/bjpsych-open/article/psychological-and-social-impact-of-the-digital-selfsupport-system-brain-in-hand-on-autistic-people-prospective-cohort-study-in-england-and-wales/F16A0A9D47AB806B3D26DB51A2CAF8A0)
- [MITA/ImagiRation](https://imagiration.com/autism/)
- [Tismoo](https://tismoo.com.br) / [Crunchbase](https://www.crunchbase.com/organization/tismoo)

### スペイン NPO アプリ
- [Fundación Orange アプリ集](https://fundacionorange.es/)
- [AbaPlanet/iSecuencias (Planeta Imaginario)](https://lovaasfoundation.es/)
- [Aprendices Visuales](https://wsa-global.org/winner/aprendices-visuales/)

### EU 助成プロジェクト
- [R2D2-MH](https://adhdeurope.eu/r2d2-mh-project/)
- [EMPOWER](https://www.autismeurope.org/blog/what-we-do/empower-design-and-evaluation-of-technological-support-tools-to-empower-stakeholders-in-digital-education-2022-2025/)
- [Pictogram (CORDIS 856015)](https://cordis.europa.eu/project/id/856015)
- [HaDEA Autism Awareness 2026](https://hadea.ec.europa.eu/news/world-autism-awareness-day-2026-how-european-research-transforming-neurodevelopmental-care-2026-04-02_en)

### モロッコ・中東
- [BlinkLab](https://www.blinklab.org/)
- [Spectator BiDiApp Morocco](https://spectator-healthcare.com/en/Projects/Autism-Project-ready-for-phase-2-and-scale-up-in-the-regions-of-Morocco_project_207)
- [Hub71 Anjal Z](https://www.hub71.com/latest-news/press-release/eca-and-hub71-open-applications-for-anjal-z-to-accelerate-global-early-childhood-innovation-in-abu-dhabi)
- [Sanad Village Dubai](https://sanadvillage.com/)

### イスラエル系
- [Startup Nation Central - Compedia](https://finder.startupnationcentral.org/company_page/compedia)
- [Hackautism記事](https://nocamels.com/2023/09/israeli-organization-autistic-people/)
- [Cognoa](https://cognoa.com/)

### ブラジル系
- [Matraquinha](https://www.matraquinha.com.br/en/)
- [Estimula AI - Canal Autismo](https://www.canalautismo.com.br/noticia/app-com-ia-auxilia-criancas-com-atraso-no-desenvolvimento-estimula-ai/)

### 東欧・露
- [Аутизм: Общение - Sunny World](https://solnechnymir.ru/environment/autism-communication/)
- [Indigo Kids 'Говори Молча'](https://www.autism-mmc.ru/therapy/therapeutic-apps/)

### その他
- [Niki Talk](http://www.nikitalk.com/)
- [PictoTEA Velociteam](https://pictotea.soft112.com/)
- [Jellow Communicator (IIT Bombay)](https://jellow.org/)

---

**作成日**: 2026-04-25
**作成者**: Nolla リサーチチーム（前回見落とし反省を踏まえた徹底リサーチ）
**ステータス**: ACTIVE
**次のアクション**:
1. `outputs/INDEX.md` への登録
2. `nolla_companies_master_list_2026-04-27.md` に統合済（旧 competitor_matrix は _archive/ へ移動）
3. Genial Care の追加深掘り（個別レポート化検討）
