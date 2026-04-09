import { describe, it, expect, beforeEach } from 'vitest';
import {
  createTapRecord,
  addTapRecord,
  getTapsByVocabularyId,
  getTapsByCategory,
  getTotalTaps,
  getTapStreak,
  clearTapHistory,
} from '../../../lib/aac/tapHistory';
import type { AacTapRecord, TapHistoryState } from '../../../lib/aac/tapHistory';

describe('AAC Tap History Management', () => {
  describe('createTapRecord', () => {
    it('should create a valid tap record with all required fields', () => {
      const record = createTapRecord(1, 'たべもの');
      expect(record.vocabularyId).toBe(1);
      expect(record.category).toBe('たべもの');
      expect(record.timestamp).toBeDefined();
      expect(typeof record.timestamp).toBe('number');
      expect(record.sessionId).toBeDefined();
      expect(typeof record.sessionId).toBe('string');
    });

    it('should create records with unique session IDs for different calls', () => {
      const record1 = createTapRecord(1, 'たべもの');
      const record2 = createTapRecord(1, 'たべもの');
      expect(record1.sessionId).not.toBe(record2.sessionId);
    });

    it('should create records with timestamps in correct order', () => {
      const record1 = createTapRecord(1, 'たべもの');
      const record2 = createTapRecord(2, 'きもち');
      expect(record1.timestamp).toBeLessThanOrEqual(record2.timestamp);
    });
  });

  describe('TapHistoryState management', () => {
    let state: TapHistoryState;

    beforeEach(() => {
      state = {
        records: [],
        lastTapVocabularyId: null,
        lastTapTimestamp: null,
      };
    });

    describe('addTapRecord', () => {
      it('should add a record to empty state', () => {
        const record = createTapRecord(1, 'たべもの');
        const newState = addTapRecord(state, record);
        expect(newState.records.length).toBe(1);
        expect(newState.records[0]).toEqual(record);
      });

      it('should add records without mutating original state', () => {
        const record1 = createTapRecord(1, 'たべもの');
        const newState1 = addTapRecord(state, record1);
        expect(state.records.length).toBe(0);
        expect(newState1.records.length).toBe(1);

        const record2 = createTapRecord(2, 'きもち');
        const newState2 = addTapRecord(newState1, record2);
        expect(newState1.records.length).toBe(1);
        expect(newState2.records.length).toBe(2);
      });

      it('should update lastTapVocabularyId', () => {
        const record = createTapRecord(5, 'どうさ');
        const newState = addTapRecord(state, record);
        expect(newState.lastTapVocabularyId).toBe(5);
      });

      it('should update lastTapTimestamp', () => {
        const record = createTapRecord(3, 'きもち');
        const newState = addTapRecord(state, record);
        expect(newState.lastTapTimestamp).toBe(record.timestamp);
      });

      it('should add multiple records sequentially', () => {
        let currentState = state;
        for (let i = 1; i <= 5; i++) {
          const record = createTapRecord(i, 'たべもの');
          currentState = addTapRecord(currentState, record);
        }
        expect(currentState.records.length).toBe(5);
        expect(currentState.lastTapVocabularyId).toBe(5);
      });
    });

    describe('getTapsByVocabularyId', () => {
      beforeEach(() => {
        let currentState = state;
        // Add mixed vocabulary taps
        for (const vocabId of [1, 2, 1, 3, 1, 4]) {
          const record = createTapRecord(
            vocabId,
            vocabId <= 8
              ? 'たべもの'
              : vocabId <= 14
                ? 'きもち'
                : 'どうさ',
          );
          currentState = addTapRecord(currentState, record);
        }
        state = currentState;
      });

      it('should return all taps for a specific vocabulary ID', () => {
        const taps = getTapsByVocabularyId(state, 1);
        expect(taps.length).toBe(3);
        expect(taps.every((t) => t.vocabularyId === 1)).toBe(true);
      });

      it('should return empty array for vocabulary with no taps', () => {
        const taps = getTapsByVocabularyId(state, 99);
        expect(taps.length).toBe(0);
        expect(Array.isArray(taps)).toBe(true);
      });

      it('should return taps in chronological order', () => {
        const taps = getTapsByVocabularyId(state, 1);
        for (let i = 1; i < taps.length; i++) {
          expect(taps[i].timestamp).toBeGreaterThanOrEqual(
            taps[i - 1].timestamp,
          );
        }
      });
    });

    describe('getTapsByCategory', () => {
      beforeEach(() => {
        let currentState = state;
        // Add taps across categories
        const categoryTaps = [
          [1, 2, 3], // たべもの
          [9, 10], // きもち
          [15, 16, 17], // どうさ
        ];
        for (const category of categoryTaps) {
          for (const vocabId of category) {
            const catKey =
              vocabId <= 8
                ? 'たべもの'
                : vocabId <= 14
                  ? 'きもち'
                  : 'どうさ';
            const record = createTapRecord(vocabId, catKey);
            currentState = addTapRecord(currentState, record);
          }
        }
        state = currentState;
      });

      it('should return all taps for たべもの category', () => {
        const taps = getTapsByCategory(state, 'たべもの');
        expect(taps.length).toBeGreaterThan(0);
        expect(taps.every((t) => t.category === 'たべもの')).toBe(true);
      });

      it('should return all taps for きもち category', () => {
        const taps = getTapsByCategory(state, 'きもち');
        expect(taps.length).toBeGreaterThan(0);
        expect(taps.every((t) => t.category === 'きもち')).toBe(true);
      });

      it('should return all taps for どうさ category', () => {
        const taps = getTapsByCategory(state, 'どうさ');
        expect(taps.length).toBeGreaterThan(0);
        expect(taps.every((t) => t.category === 'どうさ')).toBe(true);
      });

      it('should return empty array for category with no taps', () => {
        let emptyState = { records: [], lastTapVocabularyId: null, lastTapTimestamp: null };
        const taps = getTapsByCategory(emptyState, 'たべもの');
        expect(taps.length).toBe(0);
      });
    });

    describe('getTotalTaps', () => {
      it('should return 0 for empty state', () => {
        const total = getTotalTaps(state);
        expect(total).toBe(0);
      });

      it('should return correct total for single tap', () => {
        const record = createTapRecord(1, 'たべもの');
        const newState = addTapRecord(state, record);
        expect(getTotalTaps(newState)).toBe(1);
      });

      it('should return correct total for multiple taps', () => {
        let currentState = state;
        const count = 10;
        for (let i = 0; i < count; i++) {
          const record = createTapRecord((i % 20) + 1, 'たべもの');
          currentState = addTapRecord(currentState, record);
        }
        expect(getTotalTaps(currentState)).toBe(count);
      });
    });

    describe('getTapStreak', () => {
      it('should return 0 for empty state', () => {
        const streak = getTapStreak(state, 1);
        expect(streak).toBe(0);
      });

      it('should return 1 for single tap of vocabulary', () => {
        const record = createTapRecord(1, 'たべもの');
        const newState = addTapRecord(state, record);
        const streak = getTapStreak(newState, 1);
        expect(streak).toBe(1);
      });

      it('should count consecutive taps of same vocabulary', () => {
        let currentState = state;
        for (let i = 0; i < 5; i++) {
          const record = createTapRecord(1, 'たべもの');
          currentState = addTapRecord(currentState, record);
        }
        const streak = getTapStreak(currentState, 1);
        expect(streak).toBe(5);
      });

      it('should reset streak when different vocabulary is tapped', () => {
        let currentState = state;
        // Add 3 taps of vocab 1
        for (let i = 0; i < 3; i++) {
          currentState = addTapRecord(
            currentState,
            createTapRecord(1, 'たべもの'),
          );
        }
        // Add 1 tap of vocab 2
        currentState = addTapRecord(
          currentState,
          createTapRecord(2, 'たべもの'),
        );
        // Add 2 more taps of vocab 1
        for (let i = 0; i < 2; i++) {
          currentState = addTapRecord(
            currentState,
            createTapRecord(1, 'たべもの'),
          );
        }
        // Streak should be 2 (most recent consecutive taps)
        const streak = getTapStreak(currentState, 1);
        expect(streak).toBe(2);
      });
    });

    describe('clearTapHistory', () => {
      it('should clear all records', () => {
        let currentState = state;
        for (let i = 1; i <= 5; i++) {
          const record = createTapRecord(i, 'たべもの');
          currentState = addTapRecord(currentState, record);
        }
        expect(currentState.records.length).toBe(5);

        const clearedState = clearTapHistory(currentState);
        expect(clearedState.records.length).toBe(0);
        expect(clearedState.lastTapVocabularyId).toBeNull();
        expect(clearedState.lastTapTimestamp).toBeNull();
      });

      it('should return new state without mutating original', () => {
        let currentState = state;
        const record = createTapRecord(1, 'たべもの');
        currentState = addTapRecord(currentState, record);

        const clearedState = clearTapHistory(currentState);
        expect(currentState.records.length).toBe(1);
        expect(clearedState.records.length).toBe(0);
      });
    });
  });
});
