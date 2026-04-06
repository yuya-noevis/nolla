/**
 * Star calculation — pure functions.
 * Based on: outputs/nolla_ux_flow_design_0d4.md Section 4.2
 */
import { SHOP_ITEMS } from "./shop-items";

const STAR_PER_CORRECT = 1;
const SESSION_COMPLETE_BONUS = 3;
const DAILY_FIRST_BONUS = 5;

// Thresholds for unlocking items (cumulative stars needed)
const UNLOCK_THRESHOLDS = [
  30, 60, 100, 150, 200, 280, 370, 480, 600, 750,
  920, 1100, 1300, 1520, 1760, 2020, 2300, 2600, 2920, 3260,
] as const;

export type SessionStarInput = {
  readonly correctCount: number;
  readonly totalTrials: number;
  readonly isSessionComplete: boolean;
  readonly isDailyFirst: boolean;
};

export function calculateSessionStars(input: SessionStarInput): number {
  let total = input.correctCount * STAR_PER_CORRECT;

  if (input.isSessionComplete) {
    total = total + SESSION_COMPLETE_BONUS;
  }
  if (input.isDailyFirst) {
    total = total + DAILY_FIRST_BONUS;
  }

  return total;
}

export function checkItemUnlock(
  totalStars: number,
  ownedItemIds: readonly string[]
): string | null {
  const ownedSet = new Set(ownedItemIds);
  const available = SHOP_ITEMS.filter((item) => !ownedSet.has(item.id));

  if (available.length === 0) return null;

  // Find the highest threshold reached
  const unlockedCount = UNLOCK_THRESHOLDS.filter(
    (t) => totalStars >= t
  ).length;

  // Items already unlocked = ownedItemIds.length
  // If we've reached a new threshold beyond what's owned, unlock next
  if (unlockedCount > ownedItemIds.length) {
    return available[0].id;
  }

  return null;
}
