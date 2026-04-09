export type VowelType = 'a' | 'i' | 'u' | 'e' | 'o';
export type VowelPhase = 'idle' | 'showing' | 'prompting' | 'parent_confirming' | 'celebrating';

export interface VowelState {
  currentVowelIndex: number;
  phase: VowelPhase;
  startedAt: number;
}

export interface VowelSessionState {
  sessionId: string;
  state: VowelState;
  completedVowels: VowelType[];
  completionTime: number | null;
}

const VOWEL_SEQUENCE: VowelType[] = ['a', 'i', 'u', 'e', 'o'];

export function createVowelSession(sessionId: string): VowelSessionState {
  return {
    sessionId,
    state: {
      currentVowelIndex: 0,
      phase: 'idle',
      startedAt: Date.now(),
    },
    completedVowels: [],
    completionTime: null,
  };
}

export function startShowingVowel(session: VowelSessionState): VowelSessionState {
  if (session.state.phase !== 'idle') {
    return session;
  }

  return {
    ...session,
    state: {
      ...session.state,
      phase: 'showing',
    },
  };
}

export function advanceToPrompting(session: VowelSessionState): VowelSessionState {
  if (session.state.phase !== 'showing') {
    return session;
  }

  return {
    ...session,
    state: {
      ...session.state,
      phase: 'prompting',
    },
  };
}

export function advanceToParentConfirming(session: VowelSessionState): VowelSessionState {
  if (session.state.phase !== 'prompting') {
    return session;
  }

  return {
    ...session,
    state: {
      ...session.state,
      phase: 'parent_confirming',
    },
  };
}

export function confirmCompletion(session: VowelSessionState): VowelSessionState {
  if (session.state.phase !== 'parent_confirming') {
    return session;
  }

  const vowel = VOWEL_SEQUENCE[session.state.currentVowelIndex];
  const newCompleted = [...session.completedVowels, vowel];

  if (newCompleted.length === VOWEL_SEQUENCE.length) {
    return {
      ...session,
      state: {
        ...session.state,
        phase: 'celebrating',
      },
      completedVowels: newCompleted,
      completionTime: Date.now(),
    };
  }

  return {
    ...session,
    state: {
      currentVowelIndex: session.state.currentVowelIndex + 1,
      phase: 'idle',
      startedAt: Date.now(),
    },
    completedVowels: newCompleted,
  };
}

export function getCurrentVowel(session: VowelSessionState): VowelType {
  return VOWEL_SEQUENCE[session.state.currentVowelIndex];
}

export function isSessionComplete(session: VowelSessionState): boolean {
  return session.completedVowels.length === VOWEL_SEQUENCE.length && session.state.phase === 'celebrating';
}

export function getProgressPercentage(session: VowelSessionState): number {
  return (session.completedVowels.length / VOWEL_SEQUENCE.length) * 100;
}
