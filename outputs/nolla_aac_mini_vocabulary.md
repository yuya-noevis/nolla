---
STATUS: ACTIVE
LAST_UPDATED: 2026-04-10
PURPOSE: AAC Mini（Phase 1）語彙一覧・実装データ構造
RELATED: nolla_mvp_design_spec_v3.md (section 4.1A), nolla_ia_design_v3.md (building 5)
---

# Nolla AAC Mini 語彙一覧

## 概要
ASD児向けAAC（拡張代替コミュニケーション）のPhase 1 Mini版。発語が困難な児童を想定。
- **総語彙数**: 20語
- **カテゴリ**: 3分類（たべもの8語 / きもち6語 / どうさ6語）
- **実装方法**: Web Speech API（TTS）によるテキスト音声化
- **UI**: 3タブ × カード選択 → 音声出力 → 親確認（スター獲得 or サイレント再提示）

---

## 語彙テーブル

### 1. たべもの（8語）

| # | 日本語 | カテゴリ | 画像生成プロンプト | Web Speech API テキスト |
|----|--------|----------|-------------------|----------------------|
| 1 | みず | たべもの | A simple glass of clear water on a wooden table, Minecraft/Animal Crossing style, soft pastel colors | みず |
| 2 | ごはん | たべもの | A bowl of white rice, geometric style, warm beige bowl, Minecraft blocky aesthetic | ごはん |
| 3 | パン | たべもの | Sliced bread loaf on a plate, cute rounded geometric shapes, warm orange-brown tones, simple flat design | パン |
| 4 | 牛乳 | たべもの | A glass of white milk with a straw, kawaii style, light blue-white pastels, simple round shapes | 牛乳 |
| 5 | りんご | たべもの | A red apple, geometric cube-like shapes, bright red with green leaf accent, Minecraft-inspired | りんご |
| 6 | バナナ | たべもの | A yellow banana, simple curved geometric form, bright yellow with brown tip, cute proportions | バナナ |
| 7 | おかし | たべもの | Assorted cookies and sweets, colorful geometric shapes (squares, circles, triangles), pastel candy colors | おかし |
| 8 | ジュース | たべもの | A tall glass of colorful juice (orange or purple), with a straw, transparent glass, bright cheerful tone | ジュース |

### 2. きもち（6語）

| # | 日本語 | カテゴリ | 画像生成プロンプト | Web Speech API テキスト |
|----|--------|----------|-------------------|----------------------|
| 9 | うれしい | きもち | A smiling face emoji-like character, round head, big happy curved eyes, warm yellow tone, celebratory pose | うれしい |
| 10 | かなしい | きもち | A sad face with downturned mouth, blue-tinted character, small curved eyes showing sadness, slumped posture | かなしい |
| 11 | いやだ | きもち | An angry face with furrowed brow, red-tinted character, determined or frustrated expression, fisted hands | いやだ |
| 12 | すき | きもち | A heart shape with a happy face inside, pink and red pastels, sparkles around it, love/affection theme | すき |
| 13 | おこってる | きもち | An angry character with red face, steam/anger symbols, clenched fists, intense but not scary expression | おこってる |
| 14 | こわい | きもち | A nervous/scared face, slightly pale or trembling character, wide worried eyes, protective posture | こわい |

### 3. どうさ（6語）

| # | 日本語 | カテゴリ | 画像生成プロンプト | Web Speech API テキスト |
|----|--------|----------|-------------------|----------------------|
| 15 | たべる | どうさ | A character with fork and spoon, bringing food to mouth, happy eating expression, geometric shapes | たべる |
| 16 | のむ | どうさ | A character drinking from a cup or glass, tipping head back slightly, content expression, movement lines | のむ |
| 17 | いく | どうさ | A character walking or running forward, legs extended in motion, arrow or directional lines, forward momentum | いく |
| 18 | ねる | どうさ | A character sleeping on a bed, eyes closed peacefully, nighttime/moon background, restful posture | ねる |
| 19 | あそぶ | どうさ | A character playing with toys or in active motion, joyful expression, playground/game equipment suggested | あそぶ |
| 20 | トイレ | どうさ | A bathroom toilet icon or character on a toilet seat, simple geometric representation, matter-of-fact styling | トイレ |

---

## TypeScript データ構造

### 語彙アイテムインターフェース

```typescript
interface AacMiniVocabulary {
  id: number;
  japanese: string;
  category: 'たべもの' | 'きもち' | 'どうさ';
  imageUrl: string;           // AI生成画像のURL（Firebase Storage等）
  imagePrompt: string;        // 再生成用プロンプト
  ttsText: string;            // Web Speech API入力テキスト
  colorHex: string;           // カテゴリカラー（背景色） 
}
```

### 語彙データベース（実装例）

```typescript
export const AAC_MINI_VOCABULARY: AacMiniVocabulary[] = [
  // たべもの
  {
    id: 1,
    japanese: 'みず',
    category: 'たべもの',
    imageUrl: '/images/aac-mini/mizu.png',
    imagePrompt: 'A simple glass of clear water on a wooden table, Minecraft/Animal Crossing style, soft pastel colors',
    ttsText: 'みず',
    colorHex: '#E8F4F8'  // Light blue category background
  },
  {
    id: 2,
    japanese: 'ごはん',
    category: 'たべもの',
    imageUrl: '/images/aac-mini/gohan.png',
    imagePrompt: 'A bowl of white rice, geometric style, warm beige bowl, Minecraft blocky aesthetic',
    ttsText: 'ごはん',
    colorHex: '#E8F4F8'
  },
  // ... （以下、3〜8は同様）
  
  // きもち
  {
    id: 9,
    japanese: 'うれしい',
    category: 'きもち',
    imageUrl: '/images/aac-mini/ureshii.png',
    imagePrompt: 'A smiling face emoji-like character, round head, big happy curved eyes, warm yellow tone, celebratory pose',
    ttsText: 'うれしい',
    colorHex: '#FFF8E8'  // Warm yellow category background
  },
  // ... （以下、10〜14は同様）
  
  // どうさ
  {
    id: 15,
    japanese: 'たべる',
    category: 'どうさ',
    imageUrl: '/images/aac-mini/taberu.png',
    imagePrompt: 'A character with fork and spoon, bringing food to mouth, happy eating expression, geometric shapes',
    ttsText: 'たべる',
    colorHex: '#E8F8E8'  // Light green category background
  },
  // ... （以下、16〜20は同様）
];
```

### カテゴリ設定

```typescript
interface AacMiniCategory {
  key: 'たべもの' | 'きもち' | 'どうさ';
  label: string;
  colorHex: string;      // カテゴリタブの背景色
  iconEmoji?: string;    // オプション: タブアイコン（絵文字）
  wordCount: number;
}

export const AAC_MINI_CATEGORIES: AacMiniCategory[] = [
  {
    key: 'たべもの',
    label: 'たべもの',
    colorHex: '#E8F4F8',   // Light blue
    iconEmoji: '🍽️',
    wordCount: 8
  },
  {
    key: 'きもち',
    label: 'きもち',
    colorHex: '#FFF8E8',   // Warm yellow
    iconEmoji: '😊',
    wordCount: 6
  },
  {
    key: 'どうさ',
    label: 'どうさ',
    colorHex: '#E8F8E8',   // Light green
    iconEmoji: '🏃',
    wordCount: 6
  }
];
```

### コンポーネント実装例（フロー）

```typescript
// AAC Mini フロー
// 1. 初期状態: カテゴリタブ表示（3個）
// 2. タブタップ → 選択カテゴリの語彙カード一覧表示（グリッド6-8個）
// 3. カードタップ → 画像+テキスト確認画面 → 「はい」ボタン自動表示
// 4. 「はい」タップ OR 3秒自動 → Web Speech API play
// 5. 親がスターボタンタップ → スター+1，次の語彙へ
// OR 親タップなし → サイレント修正で別の語彙へ

interface AacMiniState {
  currentCategory: 'たべもの' | 'きもち' | 'どうさ' | null;
  currentVocabularyId: number | null;
  isPlayingAudio: boolean;
  starCount: number;
  completedWordIds: number[];
}
```

---

## AI画像生成スペック（Gemini/DALL-E 3）

### 共通スタイル指示
- **スタイル**: Minecraft + Animal Crossing パステルブレンド
- **キャラクター**: 幾何学的デフォルメ（丸み+ブロック感）
- **彩度**: 自然で落ち着いた色（蛍光・ネオンNG）
- **サイズ**: 256×256px or 512×512px（高品質推奨）
- **背景**: 白またはやさしい背景（シンプル）
- **テイスト**: かわいい（kawaii）だが「赤ちゃん向け」には見えない（7-18歳向け）

### 画像生成プロンプト構造

```
[主体] + [修飾1: スタイル] + [修飾2: 色彩] + [修飾3: アプローチ] + [修飾4: 背景]
```

**例**:
> A bowl of white rice + geometric style + warm beige bowl + Minecraft blocky aesthetic + white minimalist background

---

## Phase 2へのスケーラビリティ

Phase 2（2026年Q3目標）では以下に拡張予定：

### 拡張スコープ
- 語彙数: 20語 → 50語（カテゴリ追加: 色/数字/身体部位/乗り物）
- ステージ: 1（現在） → 3（段階的難易度）
- 実装: Web Speech API → Google Cloud Speech-to-Text（音声認識）
- 評価: 親タップ → 自動音声認識（子どもの実際の発音判定）

### 既存データの互換性
- `AAC_MINI_VOCABULARY` の20語は `AAC_FULL_VOCABULARY` に完全継承
- ID 1-20は予約済み（Phase 1 core）
- ID 21-50 = Phase 2新規語彙
- `AacMiniCategory` は `AacFullCategory` に統合（新カテゴリ追加）

---

## 実装チェックリスト（Phase 1 mini）

### データ準備
- [ ] 20語の画像生成（AI外注またはGemini API経由）
- [ ] 画像URL確認（Firebase Storage等）
- [ ] TypeScript型定義完成
- [ ] データベース（Supabase `aac_vocabulary` テーブル）確認

### フロントエンド
- [ ] UIコンポーネント: AacTabSelector（3タブ）
- [ ] UIコンポーネント: AacCardGrid（語彙カード）
- [ ] UIコンポーネント: AacPlayScreen（音声再生画面）
- [ ] Web Speech API TTS実装
- [ ] タップフロー: タブ→カード→再生→確認

### バックエンド
- [ ] API: GET /api/aac-mini/vocabulary（全語彙取得）
- [ ] API: GET /api/aac-mini/category/:id（カテゴリ別取得）
- [ ] API: POST /api/aac-mini/complete（完了記録）

### テスト
- [ ] 音声出力: Chrome/Firefox/Safari互換性確認
- [ ] UI: スマホ横向き812×375で表示確認
- [ ] UI: iPad横向き1194×834で表示確認
- [ ] フロー: タブ→カード→再生→スター獲得 通しテスト
- [ ] アクセシビリティ: 視覚+聴覚的フィードバック確認

---

## 参考リンク

- **親ドキュメント**: `outputs/nolla_mvp_design_spec_v3.md` (section 4.1A)
- **IA設計**: `outputs/nolla_ia_design_v3.md` (building 5: AACの家)
- **色彩規定**: `outputs/nolla_color_regulation.md`
- **デザイン方向性**: `outputs/nolla_design_direction.md`
- **Web Speech API仕様**: https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API
