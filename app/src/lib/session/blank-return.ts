/**
 * Blank return detection and handling.
 * Based on: outputs/nolla_ux_flow_design_0d4.md Section 7.2
 *
 * If 14+ days since last play:
 * - Reset Staircase reversal counter (triggers large step exploration)
 * - Show "welcome back" animation (UI side)
 */
import type { StaircaseState } from "@/types/domain";

const BLANK_THRESHOLD_DAYS = 14;

export function isBlankReturn(lastPlayedAt: string | null): boolean {
  if (!lastPlayedAt) return false;

  const lastPlayed = new Date(lastPlayedAt);
  const now = new Date();
  const diffMs = now.getTime() - lastPlayed.getTime();
  const diffDays = diffMs / (1000 * 60 * 60 * 24);

  return diffDays >= BLANK_THRESHOLD_DAYS;
}

export function resetForBlankReturn(
  state: StaircaseState
): StaircaseState {
  return {
    ...state,
    reversalCount: 0,
    lastDirection: null,
  };
}
