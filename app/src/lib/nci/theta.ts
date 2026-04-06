/**
 * Bayesian EAP (Expected A Posteriori) theta update.
 * Based on: outputs/nolla_nci_algorithm_design.md Section 2.2
 *
 * Prior: theta ~ N(mu, sigma^2)
 * Likelihood from IRT 2PL response
 * Posterior via conjugate-like approximation
 */
import type { ThetaState } from "@/types/scoring";
import { calculateResponseProbability, calculateInformationFunction } from "./irt";

const MIN_SIGMA = 0.1;
const P_CLAMP_MIN = 1e-6;
const P_CLAMP_MAX = 1 - 1e-6;

/**
 * Update theta estimate after a single trial.
 * @param prior - current theta state (mu, sigma)
 * @param correct - whether the response was correct
 * @param a - IRT discrimination parameter
 * @param b - IRT difficulty parameter
 * @returns updated theta state
 */
export function updateTheta(
  prior: ThetaState,
  correct: boolean,
  a: number,
  b: number
): ThetaState {
  // Clamp p to avoid division by zero in p*(1-p)
  const pRaw = calculateResponseProbability(prior.mu, a, b);
  const p = Math.max(P_CLAMP_MIN, Math.min(P_CLAMP_MAX, pRaw));
  const info = a * a * p * (1 - p);

  // Likelihood variance (inverse of information)
  const sigmaLikelihoodSq = info > 0 ? 1 / info : 1e6;
  const priorSigmaSq = prior.sigma * prior.sigma;

  // Posterior sigma (always shrinks)
  const posteriorSigmaSq =
    (sigmaLikelihoodSq * priorSigmaSq) / (sigmaLikelihoodSq + priorSigmaSq);
  const posteriorSigma = Math.max(Math.sqrt(posteriorSigmaSq), MIN_SIGMA);

  // Update direction: correct pushes theta up, incorrect pushes down
  const residual = (correct ? 1 : 0) - p;
  const learningRate = priorSigmaSq / (sigmaLikelihoodSq + priorSigmaSq);
  const shift = learningRate * residual / (a * p * (1 - p));

  const posteriorMu = prior.mu + shift;

  return {
    mu: posteriorMu,
    sigma: posteriorSigma,
  };
}
