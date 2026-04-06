import { describe, it, expect } from "vitest";
import {
  getNextStep,
  getPreviousStep,
  getAllSteps,
  calculateInitialIqBand,
  calculateGamesEnabled,
  calculateSortingStartCriterion,
} from "@/lib/assessment/flow";
import { INITIAL_ASSESSMENT } from "@/lib/assessment/types";
import type { AssessmentData } from "@/lib/assessment/types";

const withDiagnoses = (
  diagnoses: AssessmentData["diagnoses"]
): AssessmentData => ({
  ...INITIAL_ASSESSMENT,
  diagnoses,
});

describe("getNextStep", () => {
  it("basic-info -> diagnosis", () => {
    expect(getNextStep("basic-info", INITIAL_ASSESSMENT)).toBe("diagnosis");
  });

  it("diagnosis -> speech-level (no ID, no LD)", () => {
    expect(getNextStep("diagnosis", withDiagnoses(["asd"]))).toBe("speech-level");
  });

  it("diagnosis -> intellectual-level (has ID)", () => {
    expect(
      getNextStep("diagnosis", withDiagnoses(["intellectual_disability"]))
    ).toBe("intellectual-level");
  });

  it("diagnosis -> ld-types (has LD, no ID)", () => {
    expect(getNextStep("diagnosis", withDiagnoses(["ld"]))).toBe("ld-types");
  });

  it("diagnosis -> intellectual-level (has both ID and LD)", () => {
    expect(
      getNextStep("diagnosis", withDiagnoses(["intellectual_disability", "ld"]))
    ).toBe("intellectual-level");
  });

  it("intellectual-level -> ld-types (has LD)", () => {
    expect(
      getNextStep(
        "intellectual-level",
        withDiagnoses(["intellectual_disability", "ld"])
      )
    ).toBe("ld-types");
  });

  it("intellectual-level -> speech-level (no LD)", () => {
    expect(
      getNextStep(
        "intellectual-level",
        withDiagnoses(["intellectual_disability"])
      )
    ).toBe("speech-level");
  });

  it("speech-level -> cognitive-skills", () => {
    expect(getNextStep("speech-level", INITIAL_ASSESSMENT)).toBe(
      "cognitive-skills"
    );
  });

  it("cognitive-skills -> consent", () => {
    expect(getNextStep("cognitive-skills", INITIAL_ASSESSMENT)).toBe("consent");
  });

  it("consent -> handover", () => {
    expect(getNextStep("consent", INITIAL_ASSESSMENT)).toBe("handover");
  });

  it("handover -> voice-setting", () => {
    expect(getNextStep("handover", INITIAL_ASSESSMENT)).toBe("voice-setting");
  });

  it("voice-setting -> complete", () => {
    expect(getNextStep("voice-setting", INITIAL_ASSESSMENT)).toBe("complete");
  });
});

describe("getPreviousStep", () => {
  it("basic-info has no previous", () => {
    expect(getPreviousStep("basic-info", INITIAL_ASSESSMENT)).toBeNull();
  });

  it("diagnosis -> basic-info", () => {
    expect(getPreviousStep("diagnosis", INITIAL_ASSESSMENT)).toBe("basic-info");
  });

  it("speech-level -> ld-types (has LD)", () => {
    expect(getPreviousStep("speech-level", withDiagnoses(["ld"]))).toBe(
      "ld-types"
    );
  });

  it("speech-level -> intellectual-level (has ID, no LD)", () => {
    expect(
      getPreviousStep(
        "speech-level",
        withDiagnoses(["intellectual_disability"])
      )
    ).toBe("intellectual-level");
  });

  it("speech-level -> diagnosis (no ID, no LD)", () => {
    expect(getPreviousStep("speech-level", withDiagnoses(["asd"]))).toBe(
      "diagnosis"
    );
  });
});

describe("getAllSteps", () => {
  it("minimal flow (no ID, no LD)", () => {
    const steps = getAllSteps(withDiagnoses(["asd"]));
    expect(steps).toEqual([
      "basic-info",
      "diagnosis",
      "speech-level",
      "cognitive-skills",
      "consent",
      "handover",
      "voice-setting",
    ]);
  });

  it("full flow (ID + LD)", () => {
    const steps = getAllSteps(
      withDiagnoses(["intellectual_disability", "ld"])
    );
    expect(steps).toEqual([
      "basic-info",
      "diagnosis",
      "intellectual-level",
      "ld-types",
      "speech-level",
      "cognitive-skills",
      "consent",
      "handover",
      "voice-setting",
    ]);
  });
});

describe("calculateInitialIqBand", () => {
  it("returns E1 when no intellectual disability", () => {
    expect(calculateInitialIqBand(withDiagnoses(["asd"]))).toBe("E1");
  });

  it("returns A2 for severe", () => {
    const data = {
      ...withDiagnoses(["intellectual_disability"]),
      intellectualLevel: "severe" as const,
    };
    expect(calculateInitialIqBand(data)).toBe("A2");
  });

  it("returns B2 for moderate", () => {
    const data = {
      ...withDiagnoses(["intellectual_disability"]),
      intellectualLevel: "moderate" as const,
    };
    expect(calculateInitialIqBand(data)).toBe("B2");
  });

  it("returns C2 for mild", () => {
    const data = {
      ...withDiagnoses(["intellectual_disability"]),
      intellectualLevel: "mild" as const,
    };
    expect(calculateInitialIqBand(data)).toBe("C2");
  });
});

describe("calculateGamesEnabled", () => {
  it("enables all when colors and shapes OK", () => {
    const data = {
      ...INITIAL_ASSESSMENT,
      canDistinguishColors: true,
      canDistinguishShapes: true,
    };
    expect(calculateGamesEnabled(data)).toEqual({
      memory_match: true,
      sorting: true,
      visual_search: true,
      corsi_block: true,
    });
  });

  it("disables sorting when both colors and shapes are false", () => {
    const data = {
      ...INITIAL_ASSESSMENT,
      canDistinguishColors: false,
      canDistinguishShapes: false,
    };
    expect(calculateGamesEnabled(data).sorting).toBe(false);
  });

  it("enables sorting when only colors is false", () => {
    const data = {
      ...INITIAL_ASSESSMENT,
      canDistinguishColors: false,
      canDistinguishShapes: true,
    };
    expect(calculateGamesEnabled(data).sorting).toBe(true);
  });
});

describe("calculateSortingStartCriterion", () => {
  it("returns color by default", () => {
    expect(calculateSortingStartCriterion(INITIAL_ASSESSMENT)).toBe("color");
  });

  it("returns shape when colors false", () => {
    const data = { ...INITIAL_ASSESSMENT, canDistinguishColors: false };
    expect(calculateSortingStartCriterion(data)).toBe("shape");
  });

  it("returns size when both false", () => {
    const data = {
      ...INITIAL_ASSESSMENT,
      canDistinguishColors: false,
      canDistinguishShapes: false,
    };
    expect(calculateSortingStartCriterion(data)).toBe("size");
  });
});
