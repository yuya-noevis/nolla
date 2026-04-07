---
STATUS: ACTIVE
LAST_UPDATED: 2026-04-07
PURPOSE: 動画制作01パイロット：ストーリーボード
RELATED: nolla_pilot_001_production_guide.md
---

# ストーリーボード — NOLLA-001「おはよう の うた」

> 台本の各セクションを映像コマで描写。AI動画生成時のシーン指示書として使用。

---

## コマ一覧

### コマ1: オープニング [0:00-0:03]

```
┌──────────────────┐
│                  │
│                  │  背景: クリームホワイト(#FFF8F0) 無地
│                  │
│     ↑            │  ノラが画面下からぴょんと登場
│    (ノラ)         │  → 中央に着地 → 手を振る
│     🎵           │
│                  │  SE: ポン（登場音）
│                  │  ナレ:「ノラと いっしょ！」
└──────────────────┘
```

**AI生成プロンプト**: Nolla character popping up from bottom of frame, waving hand, clean cream white background (#FFF8F0), cheerful gentle expression, soft entrance animation

**カメラ**: 固定（正面）
**トランジション**: なし（動画開始）

---

### コマ2: 朝の場面導入 [0:03-0:06]

```
┌──────────────────┐
│    ☀️            │  おひさま: 画面上部にゆっくり昇る
│  (おひさま)       │  丸い笑顔、光の線4本
│                  │
│ ～薄ピンク→水色～  │  背景: 朝焼けグラデーション
│                  │  #FFD4CC → #B3DAF1
│                  │
│    (ノラ)         │  ノラ: おひさまを見上げる
│     ↑見上げ       │
└──────────────────┘
```

**AI生成プロンプト**: Nolla character looking up at a round smiling sun character rising slowly, soft pink to light blue gradient sky background (#FFD4CC to #B3DAF1), warm morning atmosphere, gentle sunrise

**カメラ**: 固定
**トランジション**: クロスフェード 0.5秒（コマ1から）

---

### コマ3: テーマ提示 [0:06-0:08]

```
┌──────────────────┐
│    ☀️            │  おひさま: 画面上部で笑顔
│                  │
│                  │
│    (ノラ)         │  ノラ: 画面を見つめる（=視聴者に語りかけ）
│    口を大きく      │  口を「お」の形に大きく開ける
│    開ける         │  → スピーチモデリング
│                  │
│ 「おはよう」      │  テロップ:「おはよう」丸ゴシック
└──────────────────┘
```

**AI生成プロンプト**: Nolla character facing camera, mouth wide open in "O" shape, demonstrating speech, sun character above smiling, text "おはよう" at bottom, morning sky background

**カメラ**: ノラの顔にやや寄り（口元が見えるサイズ）
**トランジション**: カット

---

### コマ4: 歌パート1 [0:08-0:12]

```
┌──────────────────┐
│    ☀️            │  おひさま: 音符マークがふわふわ浮く
│   ♪  ♪           │
│                  │
│    (ノラ)         │  ノラ: おひさまに手を振りながら歌う
│    手振り+歌      │  口がリズムに合わせて動く
│                  │
│                  │  BGM: ウクレレ+マリンバ 95BPM
│                  │  ♪おひさま おひさま のぼったよ
└──────────────────┘
```

**AI生成プロンプト**: Nolla character waving at sun character, singing joyfully, small music notes floating, morning background, warm gentle atmosphere

**カメラ**: 固定（全身）
**トランジション**: カット

---

### コマ5: インバーバル① [0:12-0:16] ⚡重要

```
┌──────────────────┐
│    ☀️            │  おひさま: 同じ位置で待っている
│                  │
│                  │
│    (ノラ)         │  ノラ: 口を「よう」の形に大きく開けたまま
│    口開け+待ち     │  期待の表情で画面（視聴者）を見つめる
│    目キラキラ      │
│                  │  BGM: フェードダウン → ほぼ無音
│  「おは___」      │  テロップ: 空欄部分がキラキラ
└──────────────────┘
```

**AI生成プロンプト**: Nolla character with mouth open wide, expectant excited expression, looking directly at camera, waiting for response, very quiet moment, minimal animation, sun character also waiting above

**カメラ**: ノラの顔にやや寄り
**トランジション**: なし（歌からの自然な停止）
**時間**: **4秒間キープ**（短縮禁止）

---

### コマ6: 強化① [0:16-0:18]

```
┌──────────────────┐
│    ☀️ ✨         │  おひさまもキラキラ
│                  │
│   ✨    ✨        │  小さなキラキラエフェクト（控えめ）
│    (ノラ)         │
│    ジャンプ!      │  ノラ: 満面の笑顔でジャンプ
│    😊            │
│                  │  ナレ:「おはよう！じょうず！」
│                  │  SE: キラキラ音
└──────────────────┘
```

**AI生成プロンプト**: Nolla character jumping with joy, big smile, small sparkle effects around, sun character also happy, celebration moment, warm colors, gentle sparkles (not flash)

**カメラ**: 引き（全身+ジャンプの余白）
**トランジション**: なし

---

### コマ7: うさぎ登場 [0:18-0:22]

```
┌──────────────────┐
│        ☀️        │  おひさま: 画面上部
│  ～そらいろ～     │  背景: わかくさの丘 + 空
│                  │
│  (ノラ)  (うさぎ)  │  ノラ: 歩いてきて、うさぎを見つける
│   →     😪       │  うさぎ: 目を閉じて眠そう
│                  │
│ ～わかくさ～      │  地面: わかくさ色(#C8E6C9)
│                  │  ナレ:「うさぎさんが いるよ」
└──────────────────┘
```

**AI生成プロンプト**: Nolla character walking on a gentle green hill (#C8E6C9), finding a sleepy pink rabbit character (#FFD4CC) with eyes closed, light blue sky (#B3DAF1), sun above, peaceful outdoor scene

**カメラ**: 固定（2キャラが収まるサイズ）
**トランジション**: クロスフェード 0.3秒

---

### コマ8: 歌パート2 [0:22-0:24]

```
┌──────────────────┐
│        ☀️        │
│   ♪  ♪           │  音符マーク
│                  │
│  (ノラ)  (うさぎ)  │  ノラ: うさぎに向かって歌う
│   歌♪    😪       │  うさぎ: まだ眠そう
│                  │
│                  │  ♪うさぎさん うさぎさん おきてよ
└──────────────────┘
```

**AI生成プロンプト**: Nolla character singing to sleepy rabbit on green hill, music notes floating, cheerful mood, rabbit still has eyes closed

**カメラ**: 固定
**トランジション**: カット

---

### コマ9: インバーバル② [0:24-0:27] ⚡重要

```
┌──────────────────┐
│        ☀️        │
│                  │
│                  │
│  (ノラ)  (うさぎ)  │  ノラ: 口を大きく開ける（視覚プロンプト）
│  口開け→  目開き?  │  うさぎに指さし
│                  │  うさぎ: 片目が開きかけ
│                  │  BGM: フェードダウン → ほぼ無音
│  「おは___」      │  テロップ: 空欄キラキラ
└──────────────────┘
```

**AI生成プロンプト**: Nolla character with mouth wide open, pointing at rabbit, rabbit starting to open one eye, quiet expectant moment, green hill background

**カメラ**: 2キャラのミディアムショット
**トランジション**: なし
**時間**: **3秒間キープ**

---

### コマ10: 強化② [0:27-0:30]

```
┌──────────────────┐
│        ☀️        │
│                  │
│                  │
│  (ノラ)  (うさぎ)  │  うさぎ: パッと両目が開いてニコニコ！
│   😊     😊      │  ノラとうさぎが並んで笑顔
│                  │
│                  │  ナレ:「いえたね！うさぎさん おきたよ！」
│                  │  SE: ポン
└──────────────────┘
```

**AI生成プロンプト**: Rabbit character opening both eyes wide with happy smile, Nolla and rabbit side by side both smiling, green hill, cheerful moment

**カメラ**: 固定
**トランジション**: なし

---

### コマ11: くま登場 [0:30-0:36]

```
┌──────────────────┐
│     ☀️    🌳     │  小さな木1本追加
│                  │
│         (くま)    │  くま: 木のそばで座っている。おっとり
│  (ノラ)(うさぎ)→   │  ノラ+うさぎ: 歩いてきてくまを見つける
│                  │
│ ～わかくさ～      │  ナレ:「くまさんにも おはよう しよう！」
│                  │  ノラ: 手を振るジェスチャーを見せる
└──────────────────┘
```

**AI生成プロンプト**: Nolla and rabbit walking together, finding a brown bear character (#C4A882) sitting by a small tree, green hill background, Nolla waving hand as demonstration

**カメラ**: やや引き（3キャラ+木）
**トランジション**: クロスフェード 0.3秒

---

### コマ12: 歌パート3 [0:36-0:38]

```
┌──────────────────┐
│     ☀️    🌳     │
│   ♪  ♪           │
│         (くま)    │  くま: まだ座っている
│  (ノラ)(うさぎ)    │  ノラ: 手を振りながら歌う
│   歌♪+手振り      │
│                  │  ♪くまさん くまさん おはよう
└──────────────────┘
```

**カメラ**: 固定
**トランジション**: カット

---

### コマ13: インバーバル③ [0:38-0:41] ⚡重要

```
┌──────────────────┐
│     ☀️    🌳     │
│                  │
│         (くま)    │  くま: 顔を上げて待っている
│  (ノラ)(うさぎ)    │  ノラ: 手を振るだけ（口は閉じている）
│   手振りのみ      │  ジェスチャープロンプトのみ
│                  │
│                  │  BGM: フェードダウン → ほぼ無音
│  「______」       │  テロップ: 全部空欄
└──────────────────┘
```

**AI生成プロンプト**: Nolla character only waving hand (mouth closed), rabbit beside, bear looking up expectantly, quiet moment, green hill background with tree

**カメラ**: 固定
**トランジション**: なし
**時間**: **3秒間キープ**

---

### コマ14: 強化③ [0:41-0:45]

```
┌──────────────────┐
│     ☀️ ✨  🌳    │
│                  │
│      (くま)       │  くま: ガバッと立ち上がり両手を広げる
│  (ノラ)(うさぎ)    │  3キャラ並んで笑顔！
│   😊  😊  😊     │
│                  │  ナレ:「すごい！くまさんも げんきに なったよ！」
│                  │  SE: キラキラ + ポン
└──────────────────┘
```

**AI生成プロンプト**: Bear character standing up with arms wide open, all three characters (Nolla, rabbit, bear) smiling together, small sparkles, green hill with tree, joyful celebration

**カメラ**: やや引き（3キャラ全員）
**トランジション**: なし

---

### コマ15: 振り返り導入 [0:45-0:48]

```
┌──────────────────┐
│      ☀️✨        │  おひさまが明るく輝く
│                  │  背景: 明るいクリーム+光のグラデーション
│                  │
│ (ノラ)(うさぎ)(くま)│  3キャラが並んで画面を見つめる
│  😊   😊   😊    │  =視聴者に向かって
│                  │
│                  │  ナレ:「みんなに おはよう できたね」
│                  │       「さいごに いっしょに いおう」
└──────────────────┘
```

**AI生成プロンプト**: Three characters (Nolla, rabbit, bear) lined up facing camera, bright warm background with glowing sun, gentle light effects, encouraging expressions

**カメラ**: 正面（3キャラ均等配置）
**トランジション**: クロスフェード 0.3秒

---

### コマ16: インバーバル④ [0:48-0:52] ⚡最重要

```
┌──────────────────┐
│      ☀️          │
│                  │
│                  │
│ (ノラ)(うさぎ)(くま)│  3キャラ全員が口を開けて待つ
│  😮   😮   😮    │  期待の表情
│                  │
│                  │  完全な無音（BGMもSEもなし）
│                  │  テロップなし（プロンプトゼロ）
└──────────────────┘
```

**AI生成プロンプト**: Three characters with mouths open, expectant excited expressions, looking at camera, waiting for response, completely still, warm bright background

**カメラ**: 正面（コマ15と同じ）
**トランジション**: なし
**時間**: **4秒間キープ**（絶対に短縮禁止。療育の核心）

---

### コマ17: 最大強化 [0:52-0:57]

```
┌──────────────────┐
│    ☀️✨✨✨       │  おひさまキラキラ（穏やかに）
│   ✨      ✨      │  画面全体がやわらかい光
│                  │
│ (ノラ)(うさぎ)(くま)│  3キャラがジャンプ！
│  JUMP! JUMP!     │  満面の笑顔
│                  │
│                  │  ナレ:「おはよう！できたね！すごいね！」
│                  │  歌: ♪おはよう おはよう げんきだよ♪
│                  │  SE: 拍手 + キラキラ
└──────────────────┘
```

**AI生成プロンプト**: All three characters jumping with joy, biggest smiles, gentle sparkle effects all around, sun character also celebrating, warm golden light (NOT flash), happiest moment of the video

**カメラ**: やや引き（ジャンプの余白確保）
**トランジション**: なし
**注意**: 光の演出はフラッシュではなく **ゆっくりしたグラデーション変化**

---

### コマ18: エンディング [0:57-1:00]

```
┌──────────────────┐
│                  │
│                  │  背景: クリームホワイト(#FFF8F0)に戻る
│                  │  オープニングと対称
│                  │
│    (ノラ)         │  ノラ: 画面中央で手を振る
│    手振り         │  （オープニングと同じポーズ）
│                  │
│                  │  ナレ:「またね。ノラと いっしょ！」
│                  │  SE: ポン（終了音）
└──────────────────┘
```

**AI生成プロンプト**: Nolla character in center waving goodbye, clean cream white background (#FFF8F0), gentle farewell expression, same pose as opening scene

**カメラ**: 固定（オープニングと同一構図）
**トランジション**: クロスフェード 0.3秒
**ループ**: エンディング → オープニングが自然につながる設計

---

## 生成クリップ数サマリー

| クリップ# | コマ | 秒数 | 優先度 |
|---|---|---|---|
| C01 | コマ1 オープニング | 3秒 | 高（統一素材） |
| C02 | コマ2-3 朝の場面 | 5秒 | 高 |
| C03 | コマ4 歌パート1 | 4秒 | 中 |
| C04 | コマ5 インバーバル① | 4秒 | **最高**（静止でもOK） |
| C05 | コマ6 強化① | 2秒 | 中 |
| C06 | コマ7 うさぎ登場 | 4秒 | 高 |
| C07 | コマ8-9 歌+インバーバル② | 5秒 | **最高** |
| C08 | コマ10 強化② | 3秒 | 中 |
| C09 | コマ11 くま登場 | 6秒 | 高 |
| C10 | コマ12-13 歌+インバーバル③ | 5秒 | **最高** |
| C11 | コマ14 強化③ | 4秒 | 中 |
| C12 | コマ15-16 振り返り+インバーバル④ | 7秒 | **最高** |
| C13 | コマ17 最大強化 | 5秒 | 高 |
| C14 | コマ18 エンディング | 3秒 | 高（統一素材） |

**合計14クリップ / 60秒**
