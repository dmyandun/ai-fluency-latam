'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import type { AssessmentState } from '@/types/assessment'
import { QUESTIONS } from '@/lib/questions'
import { buildAssessmentResult } from '@/lib/scoring'
import CountrySelector from '@/components/CountrySelector'
import IndustrySelector from '@/components/IndustrySelector'
import QuestionsTable from '@/components/QuestionsTable'

const INITIAL_STATE: AssessmentState = {
  step: 'country',
  currentQuestionIndex: 0,
  country: '',
  industry: '',
  activities: [],
  answers: {},
}

const STEP_LABELS: Record<AssessmentState['step'], string> = {
  country: 'Paso 1 de 3',
  industry: 'Paso 2 de 3',
  activities: '',
  classify: '',
  questions: 'Paso 3 de 3',
  done: '',
}

export default function AssessmentPage() {
  const router = useRouter()
  const [state, setState] = useState<AssessmentState>(INITIAL_STATE)

  const allQuestionsAnswered = QUESTIONS.every((q) => state.answers[q.dimension] !== undefined)

  function handleNext() {
    if (state.step === 'country')    { setState((p) => ({ ...p, step: 'industry' })); return }
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
    if (state.step === 'industry')   { setState((p) => ({ ...p, step: 'country' })); return }
    if (state.step === 'questions')  { setState((p) => ({ ...p, step: 'industry' })); return }
  }

  const canContinue =
    (state.step === 'country'    && state.country !== '') ||
    (state.step === 'industry'   && state.industry !== '') ||
    (state.step === 'questions'  && allQuestionsAnswered)

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Navbar */}
      <nav className="bg-white border-b border-slate-200 px-6 py-4 sticky top-0 z-10">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <Link href="/" className="text-lg font-semibold text-slate-900 tracking-tight">
            AI Fluency <span className="text-blue-600">LATAM</span>
          </Link>
        </div>
      </nav>

      <main className="flex-1 flex items-start justify-center px-6 py-12">
        <div className="w-full max-w-2xl">

          {/* Step: País */}
          {state.step === 'country' && (
            <div className="animate-fade-in space-y-6">
              <div>
                <p className="text-sm text-blue-600 font-semibold mb-2">{STEP_LABELS.country}</p>
                <h1 className="text-2xl sm:text-3xl font-semibold text-slate-900 mb-2">
                  ¿En qué país opera tu organización?
                </h1>
                <p className="text-slate-500">
                  Usaremos esta información para contextualizar la recomendación según el ecosistema de tu país.
                </p>
              </div>
              <CountrySelector value={state.country} onChange={(c) => setState((p) => ({ ...p, country: c }))} />
            </div>
          )}

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

          {/* Step: Preguntas — tabla única con las 10 dimensiones */}
          {state.step === 'questions' && (
            <div className="animate-fade-in space-y-6">
              <div>
                <p className="text-sm text-blue-600 font-semibold mb-2">{STEP_LABELS.questions}</p>
                <h1 className="text-2xl sm:text-3xl font-semibold text-slate-900 mb-2">
                  Evalúa tu organización
                </h1>
                <p className="text-slate-500 leading-relaxed">
                  Responde las 10 dimensiones en escala del <strong className="text-slate-700">1</strong> (bajo) al <strong className="text-slate-700">5</strong> (alto).
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
            {state.step !== 'country' && (
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
