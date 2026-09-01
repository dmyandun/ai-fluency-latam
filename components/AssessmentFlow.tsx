'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import type { AssessmentState } from '@/types/assessment'
import { QUESTIONS } from '@/lib/questions'
import { buildAssessmentResult } from '@/lib/scoring'
import IndustrySelector from '@/components/IndustrySelector'
import { INDUSTRIES } from '@/lib/industries'
import QuestionsTable from '@/components/QuestionsTable'
import { DEFAULT_REGION } from '@/lib/countries'
import Brandmark from '@/components/Brandmark'

const INITIAL_STATE: AssessmentState = {
  step: 'industry',
  currentQuestionIndex: 0,
  country: DEFAULT_REGION,
  industry: '',
  activities: [],
  answers: {},
}

const STEP_LABELS: Record<AssessmentState['step'], string> = {
  country: '',
  industry: 'Paso 1 de 2',
  activities: '',
  classify: '',
  questions: 'Paso 2 de 2',
  done: '',
}

export default function AssessmentFlow() {
  const router = useRouter()
  /*
   * `/explore` manda la industria ya elegida en la simulación: con ella el
   * diagnóstico arranca directamente en las preguntas en vez de repetir el paso.
   */
  const industryParam = useSearchParams().get('industry') ?? ''
  /* Una industria inventada en la URL no debe colarse hasta el resultado. */
  const presetIndustry = INDUSTRIES.some((i) => i.id === industryParam) ? industryParam : ''
  const [state, setState] = useState<AssessmentState>(() =>
    presetIndustry
      ? { ...INITIAL_STATE, industry: presetIndustry, step: 'questions' }
      : INITIAL_STATE
  )

  const allQuestionsAnswered = QUESTIONS.every((q) => state.answers[q.dimension] !== undefined)

  function handleNext() {
    if (state.step === 'industry')   { setState((p) => ({ ...p, step: 'questions' })); return }

    if (state.step === 'questions') {
      const result = buildAssessmentResult(
        state.answers as Parameters<typeof buildAssessmentResult>[0],
        state.country,
        state.industry,
        [] // Las tareas se recopilan en el flujo de agendar consultoría
      )
      localStorage.setItem('afl_result', JSON.stringify(result))
      localStorage.removeItem('afl_roadmap')
      router.push('/results')
    }
  }

  function handleBack() {
    if (state.step === 'questions')  { setState((p) => ({ ...p, step: 'industry' })); return }
  }

  const canContinue =
    (state.step === 'industry'   && state.industry !== '') ||
    (state.step === 'questions'  && allQuestionsAnswered)

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Navbar */}
      <nav className="bg-white border-b border-slate-200 px-6 py-4 sticky top-0 z-10">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <Brandmark />
        </div>
      </nav>

      <main className="flex-1 flex items-start justify-center px-6 py-12">
        <div className="w-full max-w-2xl">

          {/* Step: Industria */}
          {state.step === 'industry' && (
            <div className="animate-fade-in space-y-6">
              <div>
                <p className="text-sm text-blue-600 font-semibold mb-2">{STEP_LABELS.industry}</p>
                <h1 className="text-2xl sm:text-3xl font-semibold text-slate-900 mb-2">
                  ¿En qué industria opera tu organización?
                </h1>
                <p className="text-slate-500">
                  Cada industria tiene dinámicas distintas. Esto nos ayuda a personalizar los casos de uso y el piloto sugerido.
                </p>
              </div>
              <IndustrySelector value={state.industry} onChange={(i) => setState((p) => ({ ...p, industry: i }))} />
            </div>
          )}

          {/* Step: Preguntas — tabla única con las 10 preguntas */}
          {state.step === 'questions' && (
            <div className="animate-fade-in space-y-6">
              <div>
                <p className="text-sm text-blue-600 font-semibold mb-2">
                  {presetIndustry
                    ? INDUSTRIES.find((i) => i.id === presetIndustry)?.label
                    : STEP_LABELS.questions}
                </p>
                <h1 className="text-2xl sm:text-3xl font-semibold text-slate-900 mb-2">
                  Evalúa tu organización
                </h1>
                <p className="text-slate-500 leading-relaxed">
                  Responde las 10 preguntas en escala del <strong className="text-slate-700">1</strong> (bajo) al <strong className="text-slate-700">5</strong> (alto).
                  Puedes ajustar cualquier respuesta antes de continuar.
                </p>
              </div>
              <QuestionsTable
                questions={QUESTIONS}
                answers={state.answers}
                onAnswer={(dim, val) => setState((p) => ({ ...p, answers: { ...p.answers, [dim]: val } }))}
              />
            </div>
          )}

          {/* Navegación */}
          <div className="flex gap-3 mt-8">
            {state.step === 'questions' && !presetIndustry && (
              <button
                type="button"
                onClick={handleBack}
                className="px-6 py-3 bg-white border border-slate-300 text-slate-600 hover:text-slate-900 hover:border-slate-400 rounded-xl text-sm font-medium transition-all shadow-sm"
              >
                ← Atrás
              </button>
            )}
            <button
              type="button"
              onClick={handleNext}
              disabled={!canContinue}
              className="flex-1 sm:flex-none sm:px-8 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-200 disabled:text-slate-400 text-white font-semibold rounded-xl text-sm transition-all shadow-sm"
            >
              {state.step === 'questions' ? 'Ver mis resultados →' : 'Continuar →'}
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
