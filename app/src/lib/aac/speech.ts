export interface SpeechSynthesizer {
  speak(text: string, options?: SpeechOptions): void;
  stop(): void;
}

export interface SpeechOptions {
  rate?: number;
  pitch?: number;
  volume?: number;
}

export class WebSpeechSynthesizer implements SpeechSynthesizer {
  private language: string;

  constructor(language: string = 'ja-JP') {
    this.language = language;
  }

  speak(text: string, options?: SpeechOptions): void {
    // Stop any ongoing speech before starting new utterance
    if (typeof speechSynthesis !== 'undefined') {
      speechSynthesis.cancel();
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = this.language;

    if (options?.rate !== undefined) {
      utterance.rate = options.rate;
    }
    if (options?.pitch !== undefined) {
      utterance.pitch = options.pitch;
    }
    if (options?.volume !== undefined) {
      utterance.volume = options.volume;
    }

    if (typeof speechSynthesis !== 'undefined') {
      speechSynthesis.speak(utterance);
    }
  }

  stop(): void {
    if (typeof speechSynthesis !== 'undefined') {
      speechSynthesis.cancel();
    }
  }
}

export function createSpeechSynthesizer(language?: string): SpeechSynthesizer {
  return new WebSpeechSynthesizer(language);
}
