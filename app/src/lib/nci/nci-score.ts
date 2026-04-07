/**
 * NCI score calculation — 4-axis theta to NCI conversion.
 * Based on: outputs/nolla_nci_algorithm_design.md Section 6.2
 *
 * Internal NCI range: 0.000 - 999.999
 * For MVP: NCI = theta (direct mapping, clamped to range)
 */
import type { ThetaState } from "@/types/scoring";

export type NCIInput = {
  readonly thetaM: ThetaState;
  readonly thetaF: ThetaState;
  readonly thetaA: ThetaState;
  readonly thetaS: ThetaState;
};

export type NCIResult = {
  readonly nciM: number;
  readonly nciF: number;
  readonly nciA: number;
  readonly nciS: number;
  readonly nciMSe: number;
  readonly nciFSe: number;
  readonly nciASe: number;
  readonly nciSSe: number;
};

const NCI_MIN = 0;
const NCI_MAX = 999.999;
const NCI_CENTER = 500;
const NCI_SCALE = 100; // θ units → NCI units

function clampNCI(value: number): number {
  return Math.max(NCI_MIN, Math.min(NCI_MAX, value));
}

/**
 * θ (standard IRT latent, ~N(0, 2²)) → NCI display score (0–999.999).
 * Formula: NCI = 500 + θ·100, clamped.
 * SE is also scaled by 100 (linear transform).
 */
export function calculateNCI(input: NCIInput): NCIResult {
  return {
    nciM: clampNCI(NCI_CENTER + input.thetaM.mu * NCI_SCALE),
    nciF: clampNCI(NCI_CENTER + input.thetaF.mu * NCI_SCALE),
    nciA: clampNCI(NCI_CENTER + input.thetaA.mu * NCI_SCALE),
    nciS: clampNCI(NCI_CENTER + input.thetaS.mu * NCI_SCALE),
    nciMSe: input.thetaM.sigma * NCI_SCALE,
    nciFSe: input.thetaF.sigma * NCI_SCALE,
    nciASe: input.thetaA.sigma * NCI_SCALE,
    nciSSe: input.thetaS.sigma * NCI_SCALE,
  };
}
