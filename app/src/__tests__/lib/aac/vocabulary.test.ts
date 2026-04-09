import { describe, it, expect } from 'vitest';
import { AAC_MINI_VOCABULARY, AAC_MINI_CATEGORIES } from '../../../lib/aac/vocabulary';
import type { AacMiniVocabulary, AacMiniCategory } from '../../../lib/aac/vocabulary';

describe('AAC Mini Vocabulary', () => {
  describe('AAC_MINI_VOCABULARY data structure', () => {
    it('should have exactly 20 words total', () => {
      expect(AAC_MINI_VOCABULARY.length).toBe(20);
    });

    it('should have 8 food words (たべもの)', () => {
      const foodWords = AAC_MINI_VOCABULARY.filter((v) => v.category === 'たべもの');
      expect(foodWords.length).toBe(8);
    });

    it('should have 6 emotion words (きもち)', () => {
      const emotionWords = AAC_MINI_VOCABULARY.filter((v) => v.category === 'きもち');
      expect(emotionWords.length).toBe(6);
    });

    it('should have 6 action words (どうさ)', () => {
      const actionWords = AAC_MINI_VOCABULARY.filter((v) => v.category === 'どうさ');
      expect(actionWords.length).toBe(6);
    });

    it('should have unique IDs from 1 to 20', () => {
      const ids = AAC_MINI_VOCABULARY.map((v) => v.id).sort((a, b) => a - b);
      const expected = Array.from({ length: 20 }, (_, i) => i + 1);
      expect(ids).toEqual(expected);
    });

    it('should have no duplicate IDs', () => {
      const ids = AAC_MINI_VOCABULARY.map((v) => v.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(20);
    });

    it('each word should have all required fields', () => {
      AAC_MINI_VOCABULARY.forEach((vocab) => {
        expect(vocab.id).toBeDefined();
        expect(typeof vocab.id).toBe('number');
        expect(vocab.japanese).toBeDefined();
        expect(typeof vocab.japanese).toBe('string');
        expect(vocab.category).toBeDefined();
        expect(['たべもの', 'きもち', 'どうさ']).toContain(vocab.category);
        expect(vocab.imageUrl).toBeDefined();
        expect(typeof vocab.imageUrl).toBe('string');
        expect(vocab.imagePrompt).toBeDefined();
        expect(typeof vocab.imagePrompt).toBe('string');
        expect(vocab.ttsText).toBeDefined();
        expect(typeof vocab.ttsText).toBe('string');
        expect(vocab.colorHex).toBeDefined();
        expect(/^#[0-9A-Fa-f]{6}$/.test(vocab.colorHex)).toBe(true);
      });
    });

    it('each word should be non-empty string', () => {
      AAC_MINI_VOCABULARY.forEach((vocab) => {
        expect(vocab.japanese.length).toBeGreaterThan(0);
        expect(vocab.imageUrl.length).toBeGreaterThan(0);
        expect(vocab.imagePrompt.length).toBeGreaterThan(0);
        expect(vocab.ttsText.length).toBeGreaterThan(0);
      });
    });

    it('should have correct category colors', () => {
      const foodWords = AAC_MINI_VOCABULARY.filter((v) => v.category === 'たべもの');
      const emotionWords = AAC_MINI_VOCABULARY.filter((v) => v.category === 'きもち');
      const actionWords = AAC_MINI_VOCABULARY.filter((v) => v.category === 'どうさ');

      foodWords.forEach((v) => expect(v.colorHex).toBe('#E8F4F8'));
      emotionWords.forEach((v) => expect(v.colorHex).toBe('#FFF8E8'));
      actionWords.forEach((v) => expect(v.colorHex).toBe('#E8F8E8'));
    });
  });

  describe('AAC_MINI_CATEGORIES', () => {
    it('should have exactly 3 categories', () => {
      expect(AAC_MINI_CATEGORIES.length).toBe(3);
    });

    it('should have correct keys', () => {
      const keys = AAC_MINI_CATEGORIES.map((c) => c.key);
      expect(keys).toEqual(['たべもの', 'きもち', 'どうさ']);
    });

    it('should have correct word counts', () => {
      const categoriesToFind = {
        'たべもの': 8,
        'きもち': 6,
        'どうさ': 6,
      };

      AAC_MINI_CATEGORIES.forEach((cat) => {
        expect(cat.wordCount).toBe(categoriesToFind[cat.key]);
      });
    });

    it('each category should have all required fields', () => {
      AAC_MINI_CATEGORIES.forEach((cat) => {
        expect(cat.key).toBeDefined();
        expect(['たべもの', 'きもち', 'どうさ']).toContain(cat.key);
        expect(cat.label).toBeDefined();
        expect(typeof cat.label).toBe('string');
        expect(cat.colorHex).toBeDefined();
        expect(/^#[0-9A-Fa-f]{6}$/.test(cat.colorHex)).toBe(true);
        expect(cat.wordCount).toBeDefined();
        expect(typeof cat.wordCount).toBe('number');
      });
    });

    it('should have correct hex colors for each category', () => {
      const expected = {
        'たべもの': '#E8F4F8',
        'きもち': '#FFF8E8',
        'どうさ': '#E8F8E8',
      };

      AAC_MINI_CATEGORIES.forEach((cat) => {
        expect(cat.colorHex).toBe(expected[cat.key]);
      });
    });
  });
});
