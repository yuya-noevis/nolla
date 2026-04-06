"use client";

import { useState, useCallback } from "react";
import type { AssessmentData, AssessmentStep } from "@/lib/assessment/types";
import { INITIAL_ASSESSMENT } from "@/lib/assessment/types";
import { getNextStep, getPreviousStep, getAllSteps } from "@/lib/assessment/flow";
import { completeAssessment } from "@/lib/assessment/actions";
import { StepBasicInfo } from "./steps/step-basic-info";
import { StepDiagnosis } from "./steps/step-diagnosis";
import { StepIntellectualLevel } from "./steps/step-intellectual-level";
import { StepLdTypes } from "./steps/step-ld-types";
import { StepSpeechLevel } from "./steps/step-speech-level";
import { StepCognitiveSkills } from "./steps/step-cognitive-skills";
import { StepConsent } from "./steps/step-consent";
import { StepHandover } from "./steps/step-handover";
import { StepVoiceSetting } from "./steps/step-voice-setting";

export default function AssessmentPage() {
  const [step, setStep] = useState<AssessmentStep>("basic-info");
  const [data, setData] = useState<AssessmentData>(INITIAL_ASSESSMENT);
  const [error, setError] = useState<string | null>(null);

  const allSteps = getAllSteps(data);
  const currentIndex = allSteps.indexOf(step);
  const progress = allSteps.length > 0 ? (currentIndex + 1) / allSteps.length : 0;

  const updateData = useCallback((partial: Partial<AssessmentData>) => {
    setData((prev) => ({ ...prev, ...partial }));
  }, []);

  const goNext = useCallback(() => {
    const next = getNextStep(step, data);
    if (next === "complete") return;
    setStep(next);
  }, [step, data]);

  const goBack = useCallback(() => {
    const prev = getPreviousStep(step, data);
    if (prev) setStep(prev);
  }, [step, data]);

  const handleComplete = useCallback(
    async (voiceEnabled: boolean) => {
      setError(null);
      const result = await completeAssessment(data, voiceEnabled);
      if (result && !result.success) {
        setError(result.error);
      }
    },
    [data]
  );

  const canGoBack = getPreviousStep(step, data) !== null;

  return (
    <main className="h-full w-full flex flex-col bg-nolla-bg overflow-y-auto">
      {/* Progress bar */}
      <div className="px-6 pt-4 pb-2 flex items-center gap-4">
        {canGoBack && (
          <button
            type="button"
            onClick={goBack}
            className="touch-target flex items-center justify-center"
            aria-label="Back"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4A7BA7" strokeWidth="2" strokeLinecap="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
        )}
        <div className="flex-1 h-2 bg-black/5 rounded-full overflow-hidden">
          <div
            className="h-full bg-nolla-primary rounded-full transition-all duration-300"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
      </div>

      {/* Step content */}
      <div className="flex-1 flex items-center justify-center px-6">
        <div className="w-full max-w-lg">
          {step === "basic-info" && (
            <StepBasicInfo data={data} onChange={updateData} onNext={goNext} />
          )}
          {step === "diagnosis" && (
            <StepDiagnosis data={data} onChange={updateData} onNext={goNext} />
          )}
          {step === "intellectual-level" && (
            <StepIntellectualLevel data={data} onChange={updateData} onNext={goNext} />
          )}
          {step === "ld-types" && (
            <StepLdTypes data={data} onChange={updateData} onNext={goNext} />
          )}
          {step === "speech-level" && (
            <StepSpeechLevel data={data} onChange={updateData} onNext={goNext} />
          )}
          {step === "cognitive-skills" && (
            <StepCognitiveSkills data={data} onChange={updateData} onNext={goNext} />
          )}
          {step === "consent" && (
            <StepConsent onNext={goNext} />
          )}
          {step === "handover" && (
            <StepHandover onNext={goNext} />
          )}
          {step === "voice-setting" && (
            <StepVoiceSetting onComplete={handleComplete} />
          )}
          {error && (
            <p className="mt-4 text-sm text-[#B8906A] text-center">{error}</p>
          )}
        </div>
      </div>
    </main>
  );
}
