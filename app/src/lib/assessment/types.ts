export type Diagnosis =
  | "asd"
  | "adhd"
  | "intellectual_disability"
  | "ld"
  | "down_syndrome"
  | "borderline"
  | "other";

export type IntellectualLevel = "severe" | "moderate" | "mild";

export type LdType = "dyslexia" | "dysgraphia" | "dyscalculia" | "other";

export type SpeechLevel =
  | "nonverbal"
  | "nonverbal_yes_no"
  | "words_only"
  | "partial"
  | "verbal";

export type AssessmentData = {
  readonly displayName: string;
  readonly birthDate: string;
  readonly diagnoses: ReadonlyArray<Diagnosis>;
  readonly intellectualLevel: IntellectualLevel | null;
  readonly ldTypes: ReadonlyArray<LdType>;
  readonly speechLevel: SpeechLevel | null;
  readonly canDistinguishColors: boolean | null;
  readonly canDistinguishShapes: boolean | null;
  readonly canFollowMultiStep: boolean | null;
};

export const INITIAL_ASSESSMENT: AssessmentData = {
  displayName: "",
  birthDate: "",
  diagnoses: [],
  intellectualLevel: null,
  ldTypes: [],
  speechLevel: null,
  canDistinguishColors: null,
  canDistinguishShapes: null,
  canFollowMultiStep: null,
};

export type AssessmentStep =
  | "basic-info"
  | "diagnosis"
  | "intellectual-level"
  | "ld-types"
  | "speech-level"
  | "cognitive-skills"
  | "consent"
  | "handover"
  | "voice-setting";
