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

function clampNCI(value: number): number {
  return Math.max(NCI_MIN, Math.min(NCI_MAX, value));
}

/**
 * Convert 4-axis theta states to NCI scores.
 * MVP: direct theta-to-NCI mapping (clamped).
 * Post-launch: scaling factor from population calibration data.
 */
export function calculateNCI(input: NCIInput): NCIResult {
  return {
    nciM: clampNCI(input.thetaM.mu),
    nciF: clampNCI(input.thetaF.mu),
    nciA: clampNCI(input.thetaA.mu),
    nciS: clampNCI(input.thetaS.mu),
    nciMSe: input.thetaM.sigma,
    nciFSe: input.thetaF.sigma,
    nciASe: input.thetaA.sigma,
    nciSSe: input.thetaS.sigma,
  };
}
