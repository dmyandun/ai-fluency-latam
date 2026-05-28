"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ContextStep } from "@/components/diagnostic/context-step";
import { QuestionStep } from "@/components/diagnostic/question-step";
import { QUESTIONS } from "@/lib/questions";
import { scoreAssessment } from "@/lib/scoring";
import { generateRoadmap } from "@/lib/roadmap";
import { saveResult, saveRoadmap } from "@/lib/storage";
import type { Answers, DiagnosticResult } from "@/types/assessment";

/** Total steps = context step + one per question. */
const TOTAL_STEPS = QUESTIONS.length + 1;

export function DiagnosticWizard() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [countryId, setCountryId] = useState("");
  const [industryId, setIndustryId] = useState("");
  const [answers, setAnswers] = useState<Answers>({});

  const isContextStep = step === 0;
  const currentQuestion = isContextStep ? null : QUESTIONS[step - 1];

  const canAdvance = useMemo(() => {
    if (isContextStep) return Boolean(countryId && industryId);
    return currentQuestion
      ? answers[currentQuestion.dimension] !== undefined
      : false;
  }, [isContextStep, countryId, industryId, currentQuestion, answers]);

  const progress = Math.round((step / TOTAL_STEPS) * 100);
  const isLastStep = step === TOTAL_STEPS - 1;

  function handleBack() {
    setStep((s) => Math.max(0, s - 1));
  }

  function handleNext() {
    if (!canAdvance) return;
    if (isLastStep) {
      finish();
      return;
    }
    setStep((s) => s + 1);
  }

  function finish() {
    const scoring = scoreAssessment(answers);
    const result: DiagnosticResult = {
      input: { countryId, industryId, answers },
      scoring,
      createdAt: new Date().toISOString(),
    };
    saveResult(result);
    saveRoadmap(generateRoadmap(result));
    router.push("/resultados");
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <div className="mb-6">
        <div className="mb-2 flex items-center justify-between text-sm text-muted-foreground">
          <span>
            Paso {step + 1} de {TOTAL_STEPS}
          </span>
          <span>{progress}%</span>
        </div>
        <Progress value={progress} />
      </div>

      <Card>
        <CardContent className="p-6 sm:p-8">
          {isContextStep ? (
            <ContextStep
              countryId={countryId}
              industryId={industryId}
              onCountryChange={setCountryId}
              onIndustryChange={setIndustryId}
            />
          ) : currentQuestion ? (
            <QuestionStep
              question={currentQuestion}
              value={answers[currentQuestion.dimension]}
              onChange={(value) =>
                setAnswers((prev) => ({
                  ...prev,
                  [currentQuestion.dimension]: value,
                }))
              }
            />
          ) : null}

          <div className="mt-8 flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={handleBack}
              disabled={step === 0}
            >
              <ArrowLeft className="h-4 w-4" />
              Atrás
            </Button>
            <Button onClick={handleNext} disabled={!canAdvance}>
              {isLastStep ? (
                <>
                  Ver resultados
                  <CheckCircle2 className="h-4 w-4" />
                </>
              ) : (
                <>
                  Siguiente
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
