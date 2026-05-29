'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import type { AssessmentState, DimensionScore } from '@/types/assessment'
import { QUESTIONS } from '@/lib/questions'
import { buildAssessmentResult } from '@/lib/scoring'
import ProgressBar from '@/components/ProgressBar'
import CountrySelector from '@/components/CountrySelector'
import IndustrySelector from '@/components/IndustrySelector'
import QuestionCard from '@/components/QuestionCard'

const INITIAL_STATE: AssessmentState = {
  step: 'country',
  currentQuestionIndex: 0,
  country: '',
  industry: '',
  answers: {},
}

export default function AssessmentPage() {
  const router = useRouter()
  const [state, setState] = useState<AssessmentState>(INITIAL_STATE)

  const currentQuestion = QUESTIONS[state.currentQuestionIndex]
  const currentAnswer =
    currentQuestion ? state.answers[currentQuestion.dimension] : undefined

  function handleAnswer(dimension: keyof DimensionScore, value: number) {
    setState((prev) => ({
      ...prev,
      answers: { ...prev.answers, [dimension]: value },
    }))
  }

  function handleNext() {
    if (state.step === 'country') {
      setState((prev) => ({ ...prev, step: 'industry' }))
      return
    }

    if (state.step === 'industry') {
      setState((prev) => ({ ...prev, step: 'questions' }))
      return
    }

    if (state.step === 'questions') {
      const isLast = state.currentQuestionIndex === QUESTIONS.length - 1

      if (isLast) {
        // Calcular resultado y navegar a /results
        const result = buildAssessmentResult(
          state.answers as DimensionScore,
          state.country,
          state.industry
        )
        localStorage.setItem('afl_result', JSON.stringify(result))
        localStorage.removeItem('afl_roadmap') // limpiar roadmap anterior
        router.push('/results')
        return
      }

      setState((prev) => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex + 1,
      }))
    }
  }

  function handleBack() {
    if (state.step === 'industry') {
      setState((prev) => ({ ...prev, step: 'country' }))
      return
    }
    if (state.step === 'questions') {
      if (state.currentQuestionIndex === 0) {
        setState((prev) => ({ ...prev, step: 'industry' }))
      } else {
        setState((prev) => ({
          ...prev,
          currentQuestionIndex: prev.currentQuestionIndex - 1,
        }))
      }
    }
  }

  const canContinue =
    (state.step === 'country' && state.country !== '') ||
    (state.step === 'industry' && state.industry !== '') ||
    (state.step === 'questions' && currentAnswer !== undefined)

  const isLastQuestion =
    state.step === 'questions' && state.currentQuestionIndex === QUESTIONS.length - 1

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="border-b border-gray-800 px-6 py-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <Link href="/" className="text-lg font-semibold text-white tracking-tight">
            AI Fluency <span className="text-indigo-400">LATAM</span>
          </Link>
          {state.step === 'questions' && (
            <ProgressBar
              current={state.currentQuestionIndex + 1}
              total={QUESTIONS.length}
            />
          )}
        </div>
      </nav>

      {/* Contenido principal */}
      <main className="flex-1 flex items-start justify-center px-6 py-12">
        <div className="w-full max-w-2xl">

          {/* Step: País */}
          {state.step === 'country' && (
            <div className="animate-fade-in space-y-6">
              <div>
                <p className="text-sm text-indigo-400 font-medium mb-2">Paso 1 de 3</p>
                <h1 className="text-2xl sm:text-3xl font-semibold text-white mb-2">
                  ¿En qué país opera tu organización?
                </h1>
                <p className="text-gray-400">
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
                <p className="text-sm text-indigo-400 font-medium mb-2">Paso 2 de 3</p>
                <h1 className="text-2xl sm:text-3xl font-semibold text-white mb-2">
                  ¿En qué industria opera tu organización?
                </h1>
                <p className="text-gray-400">
                  Cada industria tiene dinámicas distintas. Esto nos ayuda a personalizar los casos de uso y el piloto sugerido.
                </p>
              </div>
              <IndustrySelector
                value={state.industry}
                onChange={(i) => setState((p) => ({ ...p, industry: i }))}
              />
            </div>
          )}

          {/* Step: Preguntas */}
          {state.step === 'questions' && currentQuestion && (
            <div className="animate-fade-in space-y-6">
              <div>
                <p className="text-sm text-indigo-400 font-medium mb-2">
                  Paso 3 de 3 · Pregunta {state.currentQuestionIndex + 1}/{QUESTIONS.length}
                </p>
              </div>
              <QuestionCard
                key={currentQuestion.id}
                question={currentQuestion}
                currentValue={currentAnswer}
                onAnswer={handleAnswer}
              />
            </div>
          )}

          {/* Navegación */}
          <div className="flex gap-3 mt-8">
            {state.step !== 'country' && (
              <button
                type="button"
                onClick={handleBack}
                className="px-6 py-3 border border-gray-700 text-gray-400 hover:text-white hover:border-gray-500 rounded-xl text-sm font-medium transition-all"
              >
                ← Atrás
              </button>
            )}
            <button
              type="button"
              onClick={handleNext}
              disabled={!canContinue}
              className="flex-1 sm:flex-none sm:px-8 py-3 bg-indigo-600 hover:bg-indigo-500 disabled:bg-gray-800 disabled:text-gray-600 text-white font-semibold rounded-xl text-sm transition-all"
            >
              {isLastQuestion ? 'Ver mis resultados →' : 'Continuar →'}
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
