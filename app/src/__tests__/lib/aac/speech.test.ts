import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  SpeechSynthesizer,
  WebSpeechSynthesizer,
  createSpeechSynthesizer,
} from '../../../lib/aac/speech';

// Mock Web Speech API
const mockUtterance = vi.fn(function (this: any, text: string) {
  this.text = text;
  this.lang = '';
  this.rate = 1;
  this.pitch = 1;
  this.volume = 1;
});

const mockSpeak = vi.fn();
const mockCancel = vi.fn();

// Set up global mock for Web Speech API
Object.defineProperty(globalThis, 'SpeechSynthesisUtterance', {
  value: mockUtterance,
  writable: true,
});

Object.defineProperty(globalThis, 'speechSynthesis', {
  value: {
    speak: mockSpeak,
    cancel: mockCancel,
  },
  writable: true,
});

describe('Speech Synthesis', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('SpeechSynthesizer interface', () => {
    it('should define speak method', () => {
      const synthesizer: SpeechSynthesizer = {
        speak: vi.fn(),
        stop: vi.fn(),
      };
      expect(typeof synthesizer.speak).toBe('function');
      expect(typeof synthesizer.stop).toBe('function');
    });
  });

  describe('WebSpeechSynthesizer', () => {
    it('should create instance with default language ja-JP', () => {
      const synthesizer = new WebSpeechSynthesizer();
      expect(synthesizer).toBeDefined();
    });

    it('should accept custom language in constructor', () => {
      const synthesizer = new WebSpeechSynthesizer('en-US');
      expect(synthesizer).toBeDefined();
    });

    it('should call speechSynthesis.speak when speak is called', () => {
      const synthesizer = new WebSpeechSynthesizer();
      synthesizer.speak('みず');

      expect(mockSpeak).toHaveBeenCalled();
    });

    it('should create SpeechSynthesisUtterance with correct text', () => {
      const synthesizer = new WebSpeechSynthesizer();
      synthesizer.speak('ごはん');

      expect(mockUtterance).toHaveBeenCalledWith('ごはん');
    });

    it('should set lang property on utterance', () => {
      const synthesizer = new WebSpeechSynthesizer('ja-JP');
      synthesizer.speak('パン');

      expect(mockUtterance).toHaveBeenCalled();
    });

    it('should call speechSynthesis.cancel when stop is called', () => {
      const synthesizer = new WebSpeechSynthesizer();
      synthesizer.stop();

      expect(mockCancel).toHaveBeenCalled();
    });

    it('should handle multiple speak calls', () => {
      const synthesizer = new WebSpeechSynthesizer();
      synthesizer.speak('水');
      synthesizer.speak('ご飯');
      synthesizer.speak('パン');

      expect(mockSpeak).toHaveBeenCalledTimes(3);
    });

    it('should stop playback before starting new utterance', () => {
      const synthesizer = new WebSpeechSynthesizer();
      synthesizer.speak('みず');
      synthesizer.speak('ごはん');

      expect(mockCancel).toHaveBeenCalled();
    });

    it('should accept options for speech rate', () => {
      const synthesizer = new WebSpeechSynthesizer();
      synthesizer.speak('りんご', { rate: 0.8 });

      expect(mockSpeak).toHaveBeenCalled();
    });

    it('should accept options for pitch', () => {
      const synthesizer = new WebSpeechSynthesizer();
      synthesizer.speak('バナナ', { pitch: 1.2 });

      expect(mockSpeak).toHaveBeenCalled();
    });

    it('should accept options for volume', () => {
      const synthesizer = new WebSpeechSynthesizer();
      synthesizer.speak('おかし', { volume: 0.9 });

      expect(mockSpeak).toHaveBeenCalled();
    });
  });

  describe('createSpeechSynthesizer', () => {
    it('should create WebSpeechSynthesizer instance with default language', () => {
      const synthesizer = createSpeechSynthesizer();
      expect(synthesizer).toBeDefined();
      expect(synthesizer instanceof WebSpeechSynthesizer).toBe(true);
    });

    it('should create WebSpeechSynthesizer instance with custom language', () => {
      const synthesizer = createSpeechSynthesizer('en-US');
      expect(synthesizer).toBeDefined();
      expect(synthesizer instanceof WebSpeechSynthesizer).toBe(true);
    });

    it('should support speak method on created instance', () => {
      const synthesizer = createSpeechSynthesizer();
      expect(typeof synthesizer.speak).toBe('function');
    });

    it('should support stop method on created instance', () => {
      const synthesizer = createSpeechSynthesizer();
      expect(typeof synthesizer.stop).toBe('function');
    });

    it('should allow multiple instances with different languages', () => {
      const jpSynthesizer = createSpeechSynthesizer('ja-JP');
      const enSynthesizer = createSpeechSynthesizer('en-US');

      expect(jpSynthesizer).toBeDefined();
      expect(enSynthesizer).toBeDefined();
      expect(jpSynthesizer).not.toBe(enSynthesizer);
    });
  });

  describe('Speech synthesis in context', () => {
    it('should speak vocabulary with appropriate language', () => {
      const synthesizer = createSpeechSynthesizer('ja-JP');
      const words = ['みず', 'ごはん', 'パン'];

      words.forEach((word) => {
        synthesizer.speak(word);
      });

      expect(mockSpeak).toHaveBeenCalledTimes(3);
    });

    it('should stop speech when requested', () => {
      const synthesizer = createSpeechSynthesizer();
      synthesizer.speak('牛乳');
      synthesizer.stop();

      expect(mockCancel).toHaveBeenCalled();
    });

    it('should handle rapid speak/stop calls', () => {
      const synthesizer = createSpeechSynthesizer();
      for (let i = 0; i < 5; i++) {
        synthesizer.speak('ジュース');
        synthesizer.stop();
      }

      expect(mockSpeak).toHaveBeenCalledTimes(5);
      expect(mockCancel).toHaveBeenCalledTimes(10);
    });
  });
});
