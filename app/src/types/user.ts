/**
 * User types — Parent, Child, Profile
 * Based on: outputs/nolla_data_design_0d3.md
 */

export type Diagnosis =
  | "asd"
  | "adhd"
  | "intellectual_disability"
  | "ld"
  | "down_syndrome"
  | "borderline"
  | "other";

export type IntellectualLevel = "severe" | "moderate" | "mild";

export type LDType = "dyslexia" | "dysgraphia" | "dyscalculia" | "other";

export type SpeechLevel =
  | "nonverbal"
  | "nonverbal_yes_no"
  | "words_only"
  | "partial"
  | "verbal";

export type IQBand =
  | "A1" | "A2"
  | "B1" | "B2"
  | "C1" | "C2"
  | "D1" | "D2"
  | "E1" | "E2"
  | "F1" | "F2" | "F3";

export type SortingCriterion = "color" | "shape" | "size" | "category" | "multi";
export type SwitchingMode = "none" | "between_rounds" | "within_round";

export type GamesEnabled = {
  readonly memoryMatch: boolean;
  readonly sorting: boolean;
  readonly visualSearch: boolean;
  readonly corsiBlock: boolean;
};

export type Child = {
  readonly id: string;
  readonly parentId: string;
  readonly displayName: string;
  readonly birthDate: string | null;
  readonly diagnosis: readonly Diagnosis[];
  readonly intellectualLevel: IntellectualLevel | null;
  readonly ldTypes: readonly LDType[];
  readonly speechLevel: SpeechLevel | null;
  readonly canDistinguishColors: boolean | null;
  readonly canDistinguishShapes: boolean | null;
  readonly canFollowMultiStep: boolean | null;
  readonly iqBand: IQBand;
  readonly gamesEnabled: GamesEnabled;
  readonly sortingStartCriterion: SortingCriterion;
  readonly voiceRecognitionEnabled: boolean;
  readonly avatarType: string;
  readonly baselineEstablished: boolean;
  readonly baselineSessionsCount: number;
  readonly baselineEstablishedAt: string | null;
};

export type Parent = {
  readonly id: string;
  readonly authId: string;
  readonly displayName: string | null;
  readonly email: string | null;
  readonly locale: string;
  readonly timezone: string;
};
