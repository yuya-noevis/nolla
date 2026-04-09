import { describe, it, expect } from 'vitest';
import {
  createVowelSession,
  startShowingVowel,
  advanceToPrompting,
  advanceToParentConfirming,
  confirmCompletion,
  getCurrentVowel,
  isSessionComplete,
  getProgressPercentage,
} from '../../../lib/vowel/stateMachine';

describe('Vowel State Machine', () => {
  describe('createVowelSession', () => {
    it('should create new session in idle phase', () => {
      const session = createVowelSession('session-1');

      expect(session.sessionId).toBe('session-1');
      expect(session.state.phase).toBe('idle');
      expect(session.state.currentVowelIndex).toBe(0);
      expect(session.completedVowels).toEqual([]);
      expect(session.completionTime).toBeNull();
    });

    it('should initialize startedAt with current timestamp', () => {
      const before = Date.now();
      const session = createVowelSession('session-2');
      const after = Date.now();

      expect(session.state.startedAt).toBeGreaterThanOrEqual(before);
      expect(session.state.startedAt).toBeLessThanOrEqual(after);
    });
  });

  describe('startShowingVowel', () => {
    it('should transition from idle to showing', () => {
      let session = createVowelSession('session-1');
      session = startShowingVowel(session);

      expect(session.state.phase).toBe('showing');
    });

    it('should not transition if not in idle phase', () => {
      let session = createVowelSession('session-1');
      session = startShowingVowel(session);
      const before = session.state.phase;
      session = startShowingVowel(session);

      expect(session.state.phase).toBe(before);
    });
  });

  describe('advanceToPrompting', () => {
    it('should transition from showing to prompting', () => {
      let session = createVowelSession('session-1');
      session = startShowingVowel(session);
      session = advanceToPrompting(session);

      expect(session.state.phase).toBe('prompting');
    });

    it('should not transition if not in showing phase', () => {
      let session = createVowelSession('session-1');
      const before = session.state.phase;
      session = advanceToPrompting(session);

      expect(session.state.phase).toBe(before);
    });
  });

  describe('advanceToParentConfirming', () => {
    it('should transition from prompting to parent_confirming', () => {
      let session = createVowelSession('session-1');
      session = startShowingVowel(session);
      session = advanceToPrompting(session);
      session = advanceToParentConfirming(session);

      expect(session.state.phase).toBe('parent_confirming');
    });

    it('should not transition if not in prompting phase', () => {
      let session = createVowelSession('session-1');
      const before = session.state.phase;
      session = advanceToParentConfirming(session);

      expect(session.state.phase).toBe(before);
    });
  });

  describe('confirmCompletion', () => {
    it('should transition to next vowel after confirmation', () => {
      let session = createVowelSession('session-1');
      session = startShowingVowel(session);
      session = advanceToPrompting(session);
      session = advanceToParentConfirming(session);
      const before = getCurrentVowel(session);
      session = confirmCompletion(session);

      expect(session.state.phase).toBe('idle');
      expect(session.state.currentVowelIndex).toBe(1);
      expect(getCurrentVowel(session)).not.toBe(before);
      expect(session.completedVowels).toContain('a');
    });

    it('should not transition if not in parent_confirming phase', () => {
      let session = createVowelSession('session-1');
      const before = session.state.phase;
      session = confirmCompletion(session);

      expect(session.state.phase).toBe(before);
    });

    it('should record completion of vowel', () => {
      let session = createVowelSession('session-1');
      session = startShowingVowel(session);
      session = advanceToPrompting(session);
      session = advanceToParentConfirming(session);
      session = confirmCompletion(session);

      expect(session.completedVowels).toContain('a');
      expect(session.completedVowels.length).toBe(1);
    });
  });

  describe('getCurrentVowel', () => {
    it('should return current vowel based on index', () => {
      let session = createVowelSession('session-1');

      expect(getCurrentVowel(session)).toBe('a');

      session = startShowingVowel(session);
      session = advanceToPrompting(session);
      session = advanceToParentConfirming(session);
      session = confirmCompletion(session);

      expect(getCurrentVowel(session)).toBe('i');
    });

    it('should cycle through all 5 vowels in order', () => {
      let session = createVowelSession('session-1');
      const vowels = ['a', 'i', 'u', 'e', 'o'];

      vowels.forEach((expected) => {
        expect(getCurrentVowel(session)).toBe(expected);
        session = startShowingVowel(session);
        session = advanceToPrompting(session);
        session = advanceToParentConfirming(session);
        session = confirmCompletion(session);
      });
    });
  });

  describe('isSessionComplete', () => {
    it('should return false for new session', () => {
      const session = createVowelSession('session-1');

      expect(isSessionComplete(session)).toBe(false);
    });

    it('should return false before completing all vowels', () => {
      let session = createVowelSession('session-1');
      session = startShowingVowel(session);
      session = advanceToPrompting(session);
      session = advanceToParentConfirming(session);
      session = confirmCompletion(session);

      expect(isSessionComplete(session)).toBe(false);
    });

    it('should return true after completing all 5 vowels', () => {
      let session = createVowelSession('session-1');

      for (let i = 0; i < 5; i++) {
        session = startShowingVowel(session);
        session = advanceToPrompting(session);
        session = advanceToParentConfirming(session);
        session = confirmCompletion(session);
      }

      expect(isSessionComplete(session)).toBe(true);
    });

    it('should set completionTime when session completes', () => {
      let session = createVowelSession('session-1');

      for (let i = 0; i < 5; i++) {
        session = startShowingVowel(session);
        session = advanceToPrompting(session);
        session = advanceToParentConfirming(session);
        session = confirmCompletion(session);
      }

      expect(session.completionTime).not.toBeNull();
      expect(typeof session.completionTime).toBe('number');
    });
  });

  describe('getProgressPercentage', () => {
    it('should return 0 for new session', () => {
      const session = createVowelSession('session-1');

      expect(getProgressPercentage(session)).toBe(0);
    });

    it('should return 20 after completing first vowel', () => {
      let session = createVowelSession('session-1');
      session = startShowingVowel(session);
      session = advanceToPrompting(session);
      session = advanceToParentConfirming(session);
      session = confirmCompletion(session);

      expect(getProgressPercentage(session)).toBe(20);
    });

    it('should return 100 after completing all vowels', () => {
      let session = createVowelSession('session-1');

      for (let i = 0; i < 5; i++) {
        session = startShowingVowel(session);
        session = advanceToPrompting(session);
        session = advanceToParentConfirming(session);
        session = confirmCompletion(session);
      }

      expect(getProgressPercentage(session)).toBe(100);
    });
  });

  describe('Full workflow', () => {
    it('should complete full 5-vowel session', () => {
      let session = createVowelSession('workflow-1');

      expect(isSessionComplete(session)).toBe(false);
      expect(getProgressPercentage(session)).toBe(0);

      for (let i = 0; i < 5; i++) {
        session = startShowingVowel(session);
        expect(session.state.phase).toBe('showing');

        session = advanceToPrompting(session);
        expect(session.state.phase).toBe('prompting');

        session = advanceToParentConfirming(session);
        expect(session.state.phase).toBe('parent_confirming');

        session = confirmCompletion(session);
      }

      expect(isSessionComplete(session)).toBe(true);
      expect(session.completedVowels).toEqual(['a', 'i', 'u', 'e', 'o']);
      expect(session.state.phase).toBe('celebrating');
      expect(session.completionTime).not.toBeNull();
      expect(getProgressPercentage(session)).toBe(100);
    });

    it('should maintain immutability throughout workflow', () => {
      let session = createVowelSession('immutable-1');
      const original = session;

      session = startShowingVowel(session);
      expect(session).not.toBe(original);

      session = advanceToPrompting(session);
      expect(session).not.toBe(original);

      session = advanceToParentConfirming(session);
      expect(session).not.toBe(original);

      session = confirmCompletion(session);
      expect(session).not.toBe(original);

      expect(original.state.phase).toBe('idle');
    });
  });
});
