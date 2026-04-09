import { AacCategory } from './vocabulary';

export interface AacTapRecord {
  vocabularyId: number;
  category: AacCategory;
  timestamp: number;
  sessionId: string;
}

export interface TapHistoryState {
  records: AacTapRecord[];
  lastTapVocabularyId: number | null;
  lastTapTimestamp: number | null;
}

/**
 * Create a new tap record with unique session ID and current timestamp
 */
export function createTapRecord(
  vocabularyId: number,
  category: AacCategory,
): AacTapRecord {
  return {
    vocabularyId,
    category,
    timestamp: Date.now(),
    sessionId: `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
  };
}

/**
 * Add a tap record to state, returning new state without mutation
 */
export function addTapRecord(
  state: TapHistoryState,
  record: AacTapRecord,
): TapHistoryState {
  return {
    records: [...state.records, record],
    lastTapVocabularyId: record.vocabularyId,
    lastTapTimestamp: record.timestamp,
  };
}

/**
 * Get all tap records for a specific vocabulary ID
 */
export function getTapsByVocabularyId(
  state: TapHistoryState,
  vocabularyId: number,
): AacTapRecord[] {
  return state.records.filter((record) => record.vocabularyId === vocabularyId);
}

/**
 * Get all tap records for a specific category
 */
export function getTapsByCategory(
  state: TapHistoryState,
  category: AacCategory,
): AacTapRecord[] {
  return state.records.filter((record) => record.category === category);
}

/**
 * Get total number of taps across all records
 */
export function getTotalTaps(state: TapHistoryState): number {
  return state.records.length;
}

/**
 * Get the current consecutive tap streak for a vocabulary ID
 * Counts consecutive taps of the same vocabulary from the end of records
 */
export function getTapStreak(
  state: TapHistoryState,
  vocabularyId: number,
): number {
  if (state.records.length === 0) {
    return 0;
  }

  let streak = 0;

  // Count backwards from the end of records
  for (let i = state.records.length - 1; i >= 0; i--) {
    if (state.records[i].vocabularyId === vocabularyId) {
      streak++;
    } else {
      break;
    }
  }

  return streak;
}

/**
 * Clear all tap history, returning new empty state
 */
export function clearTapHistory(state: TapHistoryState): TapHistoryState {
  return {
    records: [],
    lastTapVocabularyId: null,
    lastTapTimestamp: null,
  };
}
