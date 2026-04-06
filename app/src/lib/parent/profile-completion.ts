/**
 * Profile completion rate calculation — pure functions.
 * Based on: outputs/nolla_ux_flow_design_0d4.md Section 6.2
 *
 * 10 items total:
 * 3 initial (assessment): displayName+birthDate, diagnosis, speechLevel+cogSkills
 * 7 additional: sensory, behavioral, motor, communication, therapy, visual/memory, other
 */
import type { Child } from "@/types/user";

export type AdditionalProfile = Readonly<Record<string, unknown>>;

export type CompletionItem = {
  readonly key: string;
  readonly label: string;
  readonly completed: boolean;
};

const TOTAL_ITEMS = 10;

const ADDITIONAL_KEYS: ReadonlyArray<{ key: string; label: string }> = [
  { key: "sensory_issues", label: "感覚過敏" },
  { key: "behavioral", label: "行動特性" },
  { key: "motor_skills", label: "運動能力" },
  { key: "communication_aid", label: "コミュニケーション手段" },
  { key: "therapy_history", label: "療育歴" },
  { key: "visual_memory_detail", label: "視覚・記憶の詳細スキル" },
  { key: "other_info", label: "その他の情報" },
];

function isFieldFilled(value: unknown): boolean {
  if (value === null || value === undefined) return false;
  if (Array.isArray(value)) return value.length > 0;
  if (typeof value === "string") return value.length > 0;
  return true;
}

export function calculateProfileCompletion(
  child: Child,
  additional: AdditionalProfile
): number {
  const items = getCompletionItems(child, additional);
  const completed = items.filter((i) => i.completed).length;
  return completed / TOTAL_ITEMS;
}

export function getCompletionItems(
  child: Child,
  additional: AdditionalProfile
): readonly CompletionItem[] {
  const initialItems: readonly CompletionItem[] = [
    {
      key: "basic_info",
      label: "基本情報（名前・生年月日）",
      completed: child.displayName.length > 0,
    },
    {
      key: "diagnosis",
      label: "診断情報",
      completed: child.diagnosis.length > 0,
    },
    {
      key: "speech_cognition",
      label: "発語・認知スキル",
      completed: child.speechLevel !== null,
    },
  ];

  const additionalItems: readonly CompletionItem[] = ADDITIONAL_KEYS.map(
    ({ key, label }) => ({
      key,
      label,
      completed: isFieldFilled(additional[key]),
    })
  );

  return [...initialItems, ...additionalItems];
}
