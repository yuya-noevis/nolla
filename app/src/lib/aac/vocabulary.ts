export type AacCategory = 'たべもの' | 'きもち' | 'どうさ';

export interface AacMiniVocabulary {
  id: number;
  japanese: string;
  category: AacCategory;
  imageUrl: string;
  imagePrompt: string;
  ttsText: string;
  colorHex: string;
}

export interface AacMiniCategory {
  key: AacCategory;
  label: string;
  colorHex: string;
  iconEmoji?: string;
  wordCount: number;
}

export const AAC_MINI_VOCABULARY: AacMiniVocabulary[] = [
  // たべもの (8 words)
  {
    id: 1,
    japanese: 'みず',
    category: 'たべもの',
    imageUrl: '/images/aac-mini/mizu.png',
    imagePrompt:
      'A simple glass of clear water on a wooden table, Minecraft/Animal Crossing style, soft pastel colors',
    ttsText: 'みず',
    colorHex: '#E8F4F8',
  },
  {
    id: 2,
    japanese: 'ごはん',
    category: 'たべもの',
    imageUrl: '/images/aac-mini/gohan.png',
    imagePrompt:
      'A bowl of white rice, geometric style, warm beige bowl, Minecraft blocky aesthetic',
    ttsText: 'ごはん',
    colorHex: '#E8F4F8',
  },
  {
    id: 3,
    japanese: 'パン',
    category: 'たべもの',
    imageUrl: '/images/aac-mini/pan.png',
    imagePrompt:
      'Sliced bread loaf on a plate, cute rounded geometric shapes, warm orange-brown tones, simple flat design',
    ttsText: 'パン',
    colorHex: '#E8F4F8',
  },
  {
    id: 4,
    japanese: '牛乳',
    category: 'たべもの',
    imageUrl: '/images/aac-mini/gyuunyuu.png',
    imagePrompt:
      'A glass of white milk with a straw, kawaii style, light blue-white pastels, simple round shapes',
    ttsText: '牛乳',
    colorHex: '#E8F4F8',
  },
  {
    id: 5,
    japanese: 'りんご',
    category: 'たべもの',
    imageUrl: '/images/aac-mini/ringo.png',
    imagePrompt:
      'A red apple, geometric cube-like shapes, bright red with green leaf accent, Minecraft-inspired',
    ttsText: 'りんご',
    colorHex: '#E8F4F8',
  },
  {
    id: 6,
    japanese: 'バナナ',
    category: 'たべもの',
    imageUrl: '/images/aac-mini/banana.png',
    imagePrompt:
      'A yellow banana, simple curved geometric form, bright yellow with brown tip, cute proportions',
    ttsText: 'バナナ',
    colorHex: '#E8F4F8',
  },
  {
    id: 7,
    japanese: 'おかし',
    category: 'たべもの',
    imageUrl: '/images/aac-mini/okashi.png',
    imagePrompt:
      'Assorted cookies and sweets, colorful geometric shapes (squares, circles, triangles), pastel candy colors',
    ttsText: 'おかし',
    colorHex: '#E8F4F8',
  },
  {
    id: 8,
    japanese: 'ジュース',
    category: 'たべもの',
    imageUrl: '/images/aac-mini/juice.png',
    imagePrompt:
      'A tall glass of colorful juice (orange or purple), with a straw, transparent glass, bright cheerful tone',
    ttsText: 'ジュース',
    colorHex: '#E8F4F8',
  },

  // きもち (6 words)
  {
    id: 9,
    japanese: 'うれしい',
    category: 'きもち',
    imageUrl: '/images/aac-mini/ureshii.png',
    imagePrompt:
      'A smiling face emoji-like character, round head, big happy curved eyes, warm yellow tone, celebratory pose',
    ttsText: 'うれしい',
    colorHex: '#FFF8E8',
  },
  {
    id: 10,
    japanese: 'かなしい',
    category: 'きもち',
    imageUrl: '/images/aac-mini/kanashii.png',
    imagePrompt:
      'A sad face with downturned mouth, blue-tinted character, small curved eyes showing sadness, slumped posture',
    ttsText: 'かなしい',
    colorHex: '#FFF8E8',
  },
  {
    id: 11,
    japanese: 'いやだ',
    category: 'きもち',
    imageUrl: '/images/aac-mini/iyada.png',
    imagePrompt:
      'An angry face with furrowed brow, red-tinted character, determined or frustrated expression, fisted hands',
    ttsText: 'いやだ',
    colorHex: '#FFF8E8',
  },
  {
    id: 12,
    japanese: 'すき',
    category: 'きもち',
    imageUrl: '/images/aac-mini/suki.png',
    imagePrompt:
      'A heart shape with a happy face inside, pink and red pastels, sparkles around it, love/affection theme',
    ttsText: 'すき',
    colorHex: '#FFF8E8',
  },
  {
    id: 13,
    japanese: 'おこってる',
    category: 'きもち',
    imageUrl: '/images/aac-mini/okoteru.png',
    imagePrompt:
      'An angry character with red face, steam/anger symbols, clenched fists, intense but not scary expression',
    ttsText: 'おこってる',
    colorHex: '#FFF8E8',
  },
  {
    id: 14,
    japanese: 'こわい',
    category: 'きもち',
    imageUrl: '/images/aac-mini/kowai.png',
    imagePrompt:
      'A nervous/scared face, slightly pale or trembling character, wide worried eyes, protective posture',
    ttsText: 'こわい',
    colorHex: '#FFF8E8',
  },

  // どうさ (6 words)
  {
    id: 15,
    japanese: 'たべる',
    category: 'どうさ',
    imageUrl: '/images/aac-mini/taberu.png',
    imagePrompt:
      'A character with fork and spoon, bringing food to mouth, happy eating expression, geometric shapes',
    ttsText: 'たべる',
    colorHex: '#E8F8E8',
  },
  {
    id: 16,
    japanese: 'のむ',
    category: 'どうさ',
    imageUrl: '/images/aac-mini/nomu.png',
    imagePrompt:
      'A character drinking from a cup or glass, tipping head back slightly, content expression, movement lines',
    ttsText: 'のむ',
    colorHex: '#E8F8E8',
  },
  {
    id: 17,
    japanese: 'いく',
    category: 'どうさ',
    imageUrl: '/images/aac-mini/iku.png',
    imagePrompt:
      'A character walking or running forward, legs extended in motion, arrow or directional lines, forward momentum',
    ttsText: 'いく',
    colorHex: '#E8F8E8',
  },
  {
    id: 18,
    japanese: 'ねる',
    category: 'どうさ',
    imageUrl: '/images/aac-mini/neru.png',
    imagePrompt:
      'A character sleeping on a bed, eyes closed peacefully, nighttime/moon background, restful posture',
    ttsText: 'ねる',
    colorHex: '#E8F8E8',
  },
  {
    id: 19,
    japanese: 'あそぶ',
    category: 'どうさ',
    imageUrl: '/images/aac-mini/asobu.png',
    imagePrompt:
      'A character playing with toys or in active motion, joyful expression, playground/game equipment suggested',
    ttsText: 'あそぶ',
    colorHex: '#E8F8E8',
  },
  {
    id: 20,
    japanese: 'トイレ',
    category: 'どうさ',
    imageUrl: '/images/aac-mini/toilet.png',
    imagePrompt:
      'A bathroom toilet icon or character on a toilet seat, simple geometric representation, matter-of-fact styling',
    ttsText: 'トイレ',
    colorHex: '#E8F8E8',
  },
];

export const AAC_MINI_CATEGORIES: AacMiniCategory[] = [
  {
    key: 'たべもの',
    label: 'たべもの',
    colorHex: '#E8F4F8',
    iconEmoji: '🍽️',
    wordCount: 8,
  },
  {
    key: 'きもち',
    label: 'きもち',
    colorHex: '#FFF8E8',
    iconEmoji: '😊',
    wordCount: 6,
  },
  {
    key: 'どうさ',
    label: 'どうさ',
    colorHex: '#E8F8E8',
    iconEmoji: '🏃',
    wordCount: 6,
  },
];
