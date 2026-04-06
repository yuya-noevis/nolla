/**
 * Domain types — Game, Session, Round, Trial, Difficulty
 * Based on: outputs/nolla_data_design_0d3.md
 */

// --- Game Types ---

export type GameType = "memory-match" | "sorting" | "visual-search" | "corsi-block";

// --- Difficulty Parameters (per game) ---

export type MemoryMatchParams = {
  readonly pairs: number;        // 2-24
  readonly similarity: number;   // 0-100 (%)
  readonly flipDelay: number;    // 800-2000 (ms)
  readonly cardSize: number;     // 64-96 (px)
};

export type SortingCriterion = "color" | "shape" | "size" | "category" | "multi";
export type SwitchingMode = "none" | "between_rounds" | "within_round";

export type SortingParams = {
  readonly categories: number;           // 2-5
  readonly items: number;                // 3-15
  readonly criterion: SortingCriterion;
  readonly switching: SwitchingMode;
};

export type VisualSearchParams = {
  readonly sceneItems: number;    // 3-25
  readonly diffCount: number;     // 1-7
  readonly diffSubtlety: number;  // 0-100 (%)
};

export type CorsiBlockParams = {
  readonly blocks: number;      // 4-16
  readonly seqLength: number;   // 2-9
  readonly displayMs: number;   // 500-1500 (ms)
};

export type DifficultyParams =
  | MemoryMatchParams
  | SortingParams
  | VisualSearchParams
  | CorsiBlockParams;

// --- Trial ---

export type Trial = {
  readonly id: string;
  readonly roundId: string;
  readonly sessionId: string;
  readonly childId: string;
  readonly trialNumber: number;
  readonly gameType: GameType;
  readonly correct: boolean;
  readonly reactionTimeMs: number | null;
  readonly hintStageReached: number;   // 0=none, 1, 2, 3
  readonly gameData: Record<string, unknown>;
  readonly difficultyParams: DifficultyParams;
  readonly irtB: number | null;
  readonly irtA: number;
  readonly presentedAt: string;
  readonly respondedAt: string | null;
};

// --- Round ---

export type AdjustmentDirection = "up" | "down" | "none";

export type Round = {
  readonly id: string;
  readonly sessionId: string;
  readonly roundNumber: number;
  readonly difficultyParams: DifficultyParams;
  readonly trialCount: number;
  readonly correctCount: number;
  readonly consecutiveCorrect: number;
  readonly hintStage3Count: number;
  readonly adjustmentDirection: AdjustmentDirection;
  readonly adjustedParam: string | null;
};

// --- Session ---

export type StaircaseDirection = "up" | "down";

export type Session = {
  readonly id: string;
  readonly childId: string;
  readonly gameType: GameType;
  readonly startedAt: string;
  readonly endedAt: string | null;
  readonly durationMs: number | null;
  readonly totalTrials: number;
  readonly correctCount: number;
  readonly accuracy: number | null;
  readonly hintStage1Count: number;
  readonly hintStage2Count: number;
  readonly hintStage3Count: number;
  readonly anomalyScore: number | null;
  readonly anomalyWeight: number;
  readonly initialParams: DifficultyParams;
  readonly finalParams: DifficultyParams | null;
  readonly reversalCount: number;
  readonly lastDirection: StaircaseDirection | null;
};

// --- Staircase State ---

export type StaircaseState = {
  readonly reversalCount: number;
  readonly lastDirection: StaircaseDirection | null;
  readonly consecutiveCorrect: number;
};

// --- Round Result (input to staircase) ---

export type RoundResult = {
  readonly consecutiveCorrect: number;
  readonly hintStage3Count: number;
  readonly trialCount: number;
  readonly correctCount: number;
};

// --- Game Content Generation Types ---

export type MemoryMatchCard = {
  readonly id: string;
  readonly pairId: string;
  readonly imageKey: string;
  readonly position: number;
};

export type MemoryMatchBoard = {
  readonly cards: readonly MemoryMatchCard[];
  readonly gridCols: number;
  readonly gridRows: number;
};

export type SortingItem = {
  readonly id: string;
  readonly attributes: Readonly<Record<string, string>>;
};

export type SortingCategory = {
  readonly id: string;
  readonly label: string;
  readonly matchValue: string;
};

export type SortingRound = {
  readonly items: readonly SortingItem[];
  readonly categories: readonly SortingCategory[];
  readonly criterion: SortingCriterion;
};

export type VisualSearchItem = {
  readonly id: string;
  readonly type: string;
  readonly x: number;
  readonly y: number;
  readonly properties: Readonly<Record<string, string>>;
};

export type VisualSearchDifference = {
  readonly itemId: string;
  readonly diffType: string;
  readonly original: string;
  readonly changed: string;
};

export type VisualSearchScene = {
  readonly items: readonly VisualSearchItem[];
  readonly differences: readonly VisualSearchDifference[];
};

export type CorsiBlock = {
  readonly id: number;
  readonly x: number;
  readonly y: number;
};

export type CorsiLayout = {
  readonly blocks: readonly CorsiBlock[];
  readonly sequence: readonly number[];
  readonly blockSize: number;
};

// --- Session Management Types ---

export type SessionPhase =
  | "motor_baseline"
  | "playing"
  | "round_transition"
  | "completed";

export type TrialResult = {
  readonly correct: boolean;
  readonly reactionTimeMs: number;
  readonly hintStageReached: number;
  readonly gameData: Record<string, unknown>;
};

export type SessionState = {
  readonly childId: string;
  readonly gameType: GameType;
  readonly phase: SessionPhase;
  readonly currentParams: DifficultyParams;
  readonly staircaseState: StaircaseState;
  readonly roundNumber: number;
  readonly trialCount: number;
  readonly correctCount: number;
  readonly consecutiveCorrect: number;
  readonly hintStage1Count: number;
  readonly hintStage2Count: number;
  readonly hintStage3Count: number;
  readonly roundTrialCount: number;
  readonly roundCorrectCount: number;
  readonly roundConsecutiveCorrect: number;
  readonly roundHintStage3Count: number;
  readonly startedAt: string;
  readonly trialResults: readonly TrialResult[];
};

export type SessionSummary = {
  readonly childId: string;
  readonly gameType: GameType;
  readonly totalTrials: number;
  readonly correctCount: number;
  readonly accuracy: number | null;
  readonly hintStage1Count: number;
  readonly hintStage2Count: number;
  readonly hintStage3Count: number;
  readonly durationMs: number;
  readonly finalParams: DifficultyParams;
  readonly anomalyScore: number;
  readonly staircaseState: StaircaseState;
};
