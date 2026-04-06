import type { AssessmentData, AssessmentStep } from "./types";

/**
 * Determine the next step based on current step and assessment data.
 * Handles conditional branching (intellectual level, LD types).
 */
export function getNextStep(
  current: AssessmentStep,
  data: AssessmentData
): AssessmentStep | "complete" {
  switch (current) {
    case "basic-info":
      return "diagnosis";

    case "diagnosis": {
      if (data.diagnoses.includes("intellectual_disability")) {
        return "intellectual-level";
      }
      if (data.diagnoses.includes("ld")) {
        return "ld-types";
      }
      return "speech-level";
    }

    case "intellectual-level": {
      if (data.diagnoses.includes("ld")) {
        return "ld-types";
      }
      return "speech-level";
    }

    case "ld-types":
      return "speech-level";

    case "speech-level":
      return "cognitive-skills";

    case "cognitive-skills":
      return "consent";

    case "consent":
      return "handover";

    case "handover":
      return "voice-setting";

    case "voice-setting":
      return "complete";

    default:
      return "complete";
  }
}

/**
 * Determine the previous step (for back navigation).
 */
export function getPreviousStep(
  current: AssessmentStep,
  data: AssessmentData
): AssessmentStep | null {
  switch (current) {
    case "basic-info":
      return null;

    case "diagnosis":
      return "basic-info";

    case "intellectual-level":
      return "diagnosis";

    case "ld-types": {
      if (data.diagnoses.includes("intellectual_disability")) {
        return "intellectual-level";
      }
      return "diagnosis";
    }

    case "speech-level": {
      if (data.diagnoses.includes("ld")) return "ld-types";
      if (data.diagnoses.includes("intellectual_disability")) return "intellectual-level";
      return "diagnosis";
    }

    case "cognitive-skills":
      return "speech-level";

    case "consent":
      return "cognitive-skills";

    case "handover":
      return "consent";

    case "voice-setting":
      return "handover";

    default:
      return null;
  }
}

/**
 * Get all steps for the current assessment data (for progress bar).
 */
export function getAllSteps(data: AssessmentData): ReadonlyArray<AssessmentStep> {
  const steps: AssessmentStep[] = ["basic-info", "diagnosis"];

  if (data.diagnoses.includes("intellectual_disability")) {
    steps.push("intellectual-level");
  }
  if (data.diagnoses.includes("ld")) {
    steps.push("ld-types");
  }

  steps.push("speech-level", "cognitive-skills", "consent", "handover", "voice-setting");
  return steps;
}

/**
 * Calculate IQ band from assessment data.
 */
export function calculateInitialIqBand(data: AssessmentData): string {
  if (!data.diagnoses.includes("intellectual_disability")) {
    return "E1";
  }

  switch (data.intellectualLevel) {
    case "severe":
      return "A2";
    case "moderate":
      return "B2";
    case "mild":
      return "C2";
    default:
      return "E1";
  }
}

/**
 * Determine which games to enable based on cognitive skills assessment.
 */
export function calculateGamesEnabled(data: AssessmentData): Record<string, boolean> {
  const canColor = data.canDistinguishColors !== false;
  const canShape = data.canDistinguishShapes !== false;

  return {
    memory_match: true,
    sorting: canColor || canShape,
    visual_search: true,
    corsi_block: true,
  };
}

/**
 * Determine sorting start criterion based on assessment.
 */
export function calculateSortingStartCriterion(data: AssessmentData): string {
  if (data.canDistinguishColors === false && data.canDistinguishShapes === false) {
    return "size";
  }
  if (data.canDistinguishColors === false) {
    return "shape";
  }
  return "color";
}
