import { describe, it, expect } from 'vitest';
import {
  getVocabularyByCategory,
  getVocabularyById,
  getAllCategories,
  getVocabularyCountByCategory,
} from '../../../lib/aac/selection';
import type { AacCategory } from '../../../lib/aac/vocabulary';

describe('AAC Selection Functions', () => {
  describe('getVocabularyByCategory', () => {
    it('should return 8 words for たべもの', () => {
      const result = getVocabularyByCategory('たべもの');
      expect(result.length).toBe(8);
    });

    it('should return 6 words for きもち', () => {
      const result = getVocabularyByCategory('きもち');
      expect(result.length).toBe(6);
    });

    it('should return 6 words for どうさ', () => {
      const result = getVocabularyByCategory('どうさ');
      expect(result.length).toBe(6);
    });

    it('should return words with correct category', () => {
      const result = getVocabularyByCategory('たべもの');
      result.forEach((word) => {
        expect(word.category).toBe('たべもの');
      });
    });

    it('should return words with sequential IDs within category', () => {
      const tabeResult = getVocabularyByCategory('たべもの');
      expect(tabeResult[0].id).toBe(1);
      expect(tabeResult[tabeResult.length - 1].id).toBe(8);

      const kimResult = getVocabularyByCategory('きもち');
      expect(kimResult[0].id).toBe(9);
      expect(kimResult[kimResult.length - 1].id).toBe(14);

      const douResult = getVocabularyByCategory('どうさ');
      expect(douResult[0].id).toBe(15);
      expect(douResult[douResult.length - 1].id).toBe(20);
    });

    it('should return immutable copy', () => {
      const result1 = getVocabularyByCategory('たべもの');
      const result2 = getVocabularyByCategory('たべもの');
      expect(result1).not.toBe(result2);
      expect(result1).toEqual(result2);
    });
  });

  describe('getVocabularyById', () => {
    it('should return correct word by id', () => {
      const vocab = getVocabularyById(1);
      expect(vocab?.japanese).toBe('みず');
      expect(vocab?.category).toBe('たべもの');
    });

    it('should return last word (id 20)', () => {
      const vocab = getVocabularyById(20);
      expect(vocab?.japanese).toBe('トイレ');
      expect(vocab?.category).toBe('どうさ');
    });

    it('should return undefined for non-existent id', () => {
      const vocab = getVocabularyById(21);
      expect(vocab).toBeUndefined();
    });

    it('should return undefined for id 0', () => {
      const vocab = getVocabularyById(0);
      expect(vocab).toBeUndefined();
    });

    it('should return undefined for negative id', () => {
      const vocab = getVocabularyById(-1);
      expect(vocab).toBeUndefined();
    });

    it('should handle all valid ids 1-20', () => {
      for (let id = 1; id <= 20; id++) {
        const vocab = getVocabularyById(id);
        expect(vocab).toBeDefined();
        expect(vocab?.id).toBe(id);
      }
    });
  });

  describe('getAllCategories', () => {
    it('should return 3 categories', () => {
      const result = getAllCategories();
      expect(result.length).toBe(3);
    });

    it('should return categories in correct order', () => {
      const result = getAllCategories();
      expect(result[0].key).toBe('たべもの');
      expect(result[1].key).toBe('きもち');
      expect(result[2].key).toBe('どうさ');
    });

    it('should return categories with correct word counts', () => {
      const result = getAllCategories();
      expect(result[0].wordCount).toBe(8);
      expect(result[1].wordCount).toBe(6);
      expect(result[2].wordCount).toBe(6);
    });

    it('should return immutable copy', () => {
      const result1 = getAllCategories();
      const result2 = getAllCategories();
      expect(result1).not.toBe(result2);
      expect(result1).toEqual(result2);
    });

    it('each category should have all required fields', () => {
      const result = getAllCategories();
      result.forEach((cat) => {
        expect(cat.key).toBeDefined();
        expect(cat.label).toBeDefined();
        expect(cat.colorHex).toBeDefined();
        expect(cat.wordCount).toBeDefined();
      });
    });
  });

  describe('getVocabularyCountByCategory', () => {
    it('should return 8 for たべもの', () => {
      const count = getVocabularyCountByCategory('たべもの');
      expect(count).toBe(8);
    });

    it('should return 6 for きもち', () => {
      const count = getVocabularyCountByCategory('きもち');
      expect(count).toBe(6);
    });

    it('should return 6 for どうさ', () => {
      const count = getVocabularyCountByCategory('どうさ');
      expect(count).toBe(6);
    });

    it('should return 0 for invalid category', () => {
      const count = getVocabularyCountByCategory('invalid' as AacCategory);
      expect(count).toBe(0);
    });

    it('total count should equal 20', () => {
      const total =
        getVocabularyCountByCategory('たべもの') +
        getVocabularyCountByCategory('きもち') +
        getVocabularyCountByCategory('どうさ');
      expect(total).toBe(20);
    });
  });
});
