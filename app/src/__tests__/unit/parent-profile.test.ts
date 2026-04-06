/**
 * Profile completion tests — TDD RED phase
 * Based on: outputs/nolla_ux_flow_design_0d4.md Section 6.2
 */
import { describe, it, expect } from "vitest";
import {
  calculateProfileCompletion,
  getCompletionItems,
} from "@/lib/parent/profile-completion";
import type { Child } from "@/types/user";

function makeChild(overrides: Partial<Child> = {}): Child {
  return {
    id: "c1",
    parentId: "p1",
    displayName: "Test",
    birthDate: "2020-01-01",
    diagnosis: ["asd"],
    intellectualLevel: null,
    ldTypes: [],
    speechLevel: "nonverbal",
    canDistinguishColors: true,
    canDistinguishShapes: true,
    canFollowMultiStep: false,
    iqBand: "B2",
    gamesEnabled: { memoryMatch: true, sorting: true, visualSearch: true, corsiBlock: true },
    sortingStartCriterion: "color",
    voiceRecognitionEnabled: false,
    avatarType: "default",
    baselineEstablished: false,
    baselineSessionsCount: 0,
    baselineEstablishedAt: null,
    ...overrides,
  };
}

describe("calculateProfileCompletion", () => {
  it("returns 0.3 (3/10) for initial assessment only", () => {
    const child = makeChild();
    const rate = calculateProfileCompletion(child, {});
    expect(rate).toBeCloseTo(0.3);
  });

  it("returns 1.0 when all fields completed", () => {
    const child = makeChild();
    const additional = {
      sensory_issues: ["auditory"],
      behavioral: ["tantrum"],
      motor_skills: "mild_difficulty",
      communication_aid: "pecs",
      therapy_history: ["ot", "st"],
      visual_memory_detail: true,
      other_info: "some notes",
    };
    const rate = calculateProfileCompletion(child, additional);
    expect(rate).toBe(1.0);
  });

  it("returns partial when some additional filled", () => {
    const child = makeChild();
    const additional = {
      sensory_issues: ["visual"],
      behavioral: ["self_injury"],
    };
    const rate = calculateProfileCompletion(child, additional);
    expect(rate).toBeGreaterThan(0.3);
    expect(rate).toBeLessThan(1.0);
  });

  it("returns 0.3 for missing birth date (still counted as initial done)", () => {
    const child = makeChild({ birthDate: null });
    // displayName exists, diagnosis exists, speechLevel exists → 3 initial items done
    const rate = calculateProfileCompletion(child, {});
    expect(rate).toBeCloseTo(0.3);
  });
});

describe("getCompletionItems", () => {
  it("returns 10 items total", () => {
    const child = makeChild();
    const items = getCompletionItems(child, {});
    expect(items).toHaveLength(10);
  });

  it("first 3 items are completed for initial assessment", () => {
    const child = makeChild();
    const items = getCompletionItems(child, {});
    expect(items[0].completed).toBe(true);
    expect(items[1].completed).toBe(true);
    expect(items[2].completed).toBe(true);
  });

  it("additional items are not completed initially", () => {
    const child = makeChild();
    const items = getCompletionItems(child, {});
    const additionalItems = items.slice(3);
    expect(additionalItems.every((i) => !i.completed)).toBe(true);
  });

  it("marks sensory_issues as complete when provided", () => {
    const child = makeChild();
    const items = getCompletionItems(child, {
      sensory_issues: ["auditory"],
    });
    const sensoryItem = items.find((i) => i.key === "sensory_issues");
    expect(sensoryItem?.completed).toBe(true);
  });

  it("each item has label and key", () => {
    const child = makeChild();
    const items = getCompletionItems(child, {});
    for (const item of items) {
      expect(item.label).toBeTruthy();
      expect(item.key).toBeTruthy();
    }
  });
});
