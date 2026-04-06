/**
 * Scoring types — NCI, Theta, IRT, Motor Baseline
 * Based on: outputs/nolla_nci_algorithm_design.md
 */

export type NCIAxis = "M" | "F" | "A" | "S";

export type ThetaState = {
  readonly mu: number;     // mean estimate
  readonly sigma: number;  // standard deviation (uncertainty)
};

export type NCISnapshot = {
  readonly childId: string;
  readonly nciM: number;
  readonly nciF: number;
  readonly nciA: number;
  readonly nciS: number;
  readonly nciMSe: number;
  readonly nciFSe: number;
  readonly nciASe: number;
  readonly nciSSe: number;
  readonly thetaM: ThetaState;
  readonly thetaF: ThetaState;
  readonly thetaA: ThetaState;
  readonly thetaS: ThetaState;
  readonly totalTrialsUsed: number;
  readonly snapshotDate: string;
};

export type IRTParams = {
  readonly a: number;  // discrimination
  readonly b: number;  // difficulty
};

export type MotorBaseline = {
  readonly reactionTimes: readonly number[];
  readonly medianRt: number;
  readonly weightedBaseline: number;
};

export type AnomalyPattern =
  | "poor_health"
  | "random_play"
  | "fatigue"
  | "repeated_tap"
  | "external_factor";
