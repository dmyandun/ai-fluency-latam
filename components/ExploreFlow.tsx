'use client'

import { useCallback, useMemo, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import type { AssessmentResult, DimensionKey, DimensionScore, InteractionModel, Roadmap } from '@/types/assessment'
import { QUESTIONS } from '@/lib/questions'
import { buildAssessmentResult } from '@/lib/scoring'
import { getRecommendation, MODEL_LABELS } from '@/lib/recommendations'
import { generateDefaultRoadmap, saveRoadmap } from '@/lib/roadmap'
import { getSimulation } from '@/lib/simulations'
import CountrySelector from '@/components/CountrySelector'
import IndustrySelector from '@/components/IndustrySelector'
import QuestionsTable from '@/components/QuestionsTable'
import SimulationApp from '@/components/SimulationApp'
import ResultCard from '@/components/ResultCard'
import RecommendationMatrix from '@/components/RecommendationMatrix'
import RoadmapFlowBoard from '@/components/RoadmapFlowBoard'
import AIPolicyGenerator from '@/components/AIPolicyGenerator'
import ConsultationModal from '@/components/ConsultationModal'
import Brandmark from '@/components/Brandmark'

const PREVIEW_VARIANTS: InteractionModel[] = ['automation', 'agency', 'augmentation']
const CHAT_MODEL: InteractionModel = 'agency'
const LINKEDIN_URL = 'https://www.linkedin.com/in/dmyandun/'

type ScoreInput = Omit<
  DimensionScore,
  'taskRepetitiveness' | 'humanJudgment' | 'autonomousExecution'
>

function SectionShell({
  title,
  description,
  action,
  children,
}: {
  title: string
  description: string
  action?: ReactNode
  children: ReactNode
}) {
  return (
    <section className="border-t border-slate-200 py-10 animate-fade-in">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900">{title}</h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-500">{description}</p>
        </div>
        {action && <div className="shrink-0 sm:pt-1">{action}</div>}
      </div>
      {children}
    </section>
  )
}

export default function ExploreFlow() {
  const [country, setCountry] = useState('')
  const [industry, setIndustry] = useState('')
  const [answers, setAnswers] = useState<Partial<DimensionScore>>({})
  const [result, setResult] = useState<AssessmentResult | null>(null)
  const [roadmap, setRoadmap] = useState<Roadmap | null>(null)
  const [policyUnlocked, setPolicyUnlocked] = useState(false)
  const [diagnosisUnlocked, setDiagnosisUnlocked] = useState(false)
  const [scheduleOpen, setScheduleOpen] = useState(false)

  const simulationRef = useRef<HTMLDivElement>(null)
  const diagnosisRef = useRef<HTMLDivElement>(null)
  const resultsRef = useRef<HTMLDivElement>(null)
  const roadmapRef = useRef<HTMLDivElement>(null)

  const simulationReady = Boolean(country && industry)
  const allQuestionsAnswered = QUESTIONS.every((q) => answers[q.dimension] !== undefined)
  const recommendation = result ? getRecommendation(result) : null
  const scheduleResult = useMemo(() => {
    if (result) return result
    const neutralAnswers = QUESTIONS.reduce<Partial<ScoreInput>>((acc, question) => {
      acc[question.dimension as keyof ScoreInput] = 3
      return acc
    }, {})
    return buildAssessmentResult(
      neutralAnswers as ScoreInput,
      country || 'LATAM',
      industry || 'general',
      []
    )
  }, [country, industry, result])

  const progress = useMemo(() => {
    // El recorrido no termina en el resultado: el roadmap y la política son los
    // dos pasos finales, así que el 100% se reserva para cuando ambos existen.
    if (result && roadmap && policyUnlocked) return 100
    if (result && (roadmap || policyUnlocked)) return 90
    if (result) return 80
    if (diagnosisUnlocked && allQuestionsAnswered) return 70
    if (diagnosisUnlocked) return 60
    if (simulationReady && allQuestionsAnswered) return 70
    if (simulationReady) return 50
    if (country || industry) return 25
    return 10
  }, [
    allQuestionsAnswered,
    country,
    diagnosisUnlocked,
    industry,
    policyUnlocked,
    result,
    roadmap,
    simulationReady,
  ])

  function handleCountryChange(nextCountry: string) {
    setCountry(nextCountry)
    setResult(null)
    setRoadmap(null)
    setPolicyUnlocked(false)
    setDiagnosisUnlocked(false)
  }

  function handleIndustryChange(nextIndustry: string) {
    setIndustry(nextIndustry)
    setResult(null)
    setRoadmap(null)
    setPolicyUnlocked(false)
    setDiagnosisUnlocked(false)
    window.setTimeout(() => {
      simulationRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 120)
  }

  function handleAnswer(dimension: DimensionKey, value: number) {
    setAnswers((prev) => ({ ...prev, [dimension]: value }))
    setResult(null)
    setRoadmap(null)
    setPolicyUnlocked(false)
  }

  function handleUnlockDiagnosis() {
    setDiagnosisUnlocked(true)
    window.setTimeout(() => {
      diagnosisRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 120)
  }

  function handleGenerateResult() {
    if (!country || !industry || !allQuestionsAnswered) return

    const assessmentResult = buildAssessmentResult(answers as ScoreInput, country, industry, [])
    setResult(assessmentResult)
    setRoadmap(null)
    setPolicyUnlocked(false)
    localStorage.setItem('afl_result', JSON.stringify(assessmentResult))
    localStorage.removeItem('afl_roadmap')

    window.setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 120)
  }

  function handleGenerateRoadmap() {
    if (!result) return
    const nextRoadmap = generateDefaultRoadmap(result)
    setRoadmap(nextRoadmap)
    saveRoadmap(nextRoadmap)

    window.setTimeout(() => {
      roadmapRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 120)
  }

  const handleUpdateRoadmap = useCallback((updated: Roadmap) => {
    setRoadmap(updated)
    saveRoadmap(updated)
  }, [])

  return (
    <div className="min-h-screen bg-slate-50">
      <nav className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 px-6 py-4 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <Brandmark />
          <div className="hidden min-w-[220px] items-center gap-3 sm:flex">
            <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100">
              <div className="h-full rounded-full bg-blue-600 transition-all" style={{ width: `${progress}%` }} />
            </div>
            <span className="text-xs font-semibold text-slate-500">{progress}%</span>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-7xl space-y-8 px-6 py-10">
        <header>
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-700">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
            Experiencia interactiva para descubrir oportunidades reales de IA
          </div>
          <h1 className="max-w-4xl text-4xl font-semibold leading-tight tracking-tight text-slate-900 sm:text-5xl">
            Explora una simulación con IA y genera tu ruta de adopción en una sola página
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-slate-600">
            Eliges país e industria y pruebas una simulación con agentes de IA. Si prefieres ir directo, puedes saltar al diagnóstico y de ahí al Roadmap 4D, la política de IA y la agenda de consultoría.
          </p>
        </header>

        <SectionShell
          title="Selecciona país e industria"
          description="Con esto adaptamos la visualización, los casos ficticios y el contexto del diagnóstico a la realidad de tu organización."
          action={
            simulationReady && !diagnosisUnlocked ? (
              <button
                type="button"
                onClick={handleUnlockDiagnosis}
                className="rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-600 shadow-sm transition-all hover:border-blue-400 hover:text-blue-700"
              >
                Saltar al diagnóstico →
              </button>
            ) : null
          }
        >
          <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
            <CountrySelector value={country} onChange={handleCountryChange} />
            <IndustrySelector value={industry} onChange={handleIndustryChange} />
          </div>
        </SectionShell>

        {simulationReady && (
          <div ref={simulationRef}>
            <SectionShell
              title="Explora simulaciones con IA"
              description="Esta es la primera experiencia de valor para el usuario que llega desde LinkedIn: ve agentes, visualizaciones y análisis antes de llenar el diagnóstico."
            >
              <SimulationApp
                key={`${industry}-${country}`}
                config={getSimulation(industry)}
                interactionModel={CHAT_MODEL}
                variants={PREVIEW_VARIANTS}
                industryId={industry}
                country={country}
                onSchedule={() => setScheduleOpen(true)}
              />
            </SectionShell>
          </div>
        )}

        {simulationReady && (
          <div ref={diagnosisRef}>
            <SectionShell
              title="¿Qué tipo de IA conviene implementar primero en tu organización?"
              description=""
              action={
                !diagnosisUnlocked ? (
                  <button
                    type="button"
                    onClick={handleUnlockDiagnosis}
                    className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-blue-700"
                  >
                    Diagnóstico →
                  </button>
                ) : null
              }
            >
              {!diagnosisUnlocked ? (
                <div className="h-1" />
              ) : (
                <div className="space-y-6">
                  <QuestionsTable questions={QUESTIONS} answers={answers} onAnswer={handleAnswer} />
                  <div className="flex flex-col items-start justify-between gap-3 bg-blue-50 px-5 py-4 sm:flex-row sm:items-center">
                    <div>
                      <p className="text-sm font-semibold text-slate-900">Genera tus resultados del diagnóstico</p>
                      <p className="text-xs text-slate-500">
                        Al terminar podrás generar tu Roadmap 4D y un borrador de política de IA.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={handleGenerateResult}
                      disabled={!allQuestionsAnswered}
                      className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-blue-700 disabled:bg-slate-200 disabled:text-slate-400"
                    >
                      Ver resultados →
                    </button>
                  </div>
                </div>
              )}
            </SectionShell>
          </div>
        )}

        {result && recommendation && (
          <div ref={resultsRef}>
            <SectionShell
              title="Resultados y recomendación"
              description="El diagnóstico resume qué tipo de IA conviene implementar y por qué, con una lectura práctica para pasar de la curiosidad a un primer piloto."
            >
              <div className="space-y-6">
                <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4">
                  <p className="text-sm font-semibold text-emerald-800">
                    Recomendación: {MODEL_LABELS[result.interactionModel]} + {MODEL_LABELS[result.implementationType]}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-emerald-700">{recommendation.summary}</p>
                </div>
                <div className="grid gap-6 lg:grid-cols-2">
                  <ResultCard type="interactionModel" winner={result.interactionModel} scores={result.interactionScores} />
                  <ResultCard type="implementationType" winner={result.implementationType} scores={result.implementationScores} />
                </div>
                <RecommendationMatrix result={result} recommendation={recommendation} />
              </div>
            </SectionShell>
          </div>
        )}

        {result && (
          <div ref={roadmapRef}>
            <SectionShell
              title="¿Cómo se vería tu plan de adopción de IA para los próximos 12 meses?"
              description="Un Roadmap 4D basado en Delegation, Description, Discernment y Diligence, que convierte el diagnóstico en una ruta accionable por fases. Puedes editar, agregar o eliminar iniciativas."
              action={
                !roadmap ? (
                  <button
                    type="button"
                    onClick={handleGenerateRoadmap}
                    className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-blue-700"
                  >
                    Generar Roadmap 4D →
                  </button>
                ) : null
              }
            >
              {roadmap ? (
                <RoadmapFlowBoard roadmap={roadmap} onUpdateRoadmap={handleUpdateRoadmap} />
              ) : (
                <p className="text-sm text-slate-500">
                  El roadmap se arma a partir de tu resultado y queda guardado en este navegador.
                </p>
              )}
            </SectionShell>
          </div>
        )}

        {result && (
          <SectionShell
            title="¿Qué reglas debería seguir tu equipo antes de usar IA con datos reales?"
            description="Un borrador de política interna alineado al diagnóstico y al framework 4D. Solo necesitas escribir el nombre de la empresa."
            action={
              !policyUnlocked ? (
                <button
                  type="button"
                  onClick={() => setPolicyUnlocked(true)}
                  className="rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-slate-800"
                >
                  Preparar generador de política →
                </button>
              ) : null
            }
          >
            {policyUnlocked ? (
              <AIPolicyGenerator result={result} />
            ) : (
              <p className="text-sm text-slate-500">
                Se genera a partir de tu recomendación, sin enviar datos a ningún servidor.
              </p>
            )}
          </SectionShell>
        )}

        <section className="border-t border-blue-200 py-10 text-center animate-fade-in">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-600">Contacto</p>
          <h2 className="mt-2 text-2xl font-semibold text-slate-900">¿Quieres aterrizar esto a un caso real de tu empresa?</h2>
          <p className="mx-auto mt-2 max-w-2xl text-sm leading-relaxed text-slate-500">
            Puedes agendar una consultoría o escribirme por LinkedIn en cualquier momento del recorrido.
          </p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => setScheduleOpen(true)}
              className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-blue-700"
            >
              Contactar consultoría
            </button>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl bg-white px-6 py-3 text-sm font-semibold text-blue-700 shadow-sm ring-1 ring-slate-300 transition-all hover:ring-blue-400"
            >
              Charlemos de IA
            </a>
          </div>
        </section>
      </main>

      <ConsultationModal result={scheduleResult} open={scheduleOpen} onClose={() => setScheduleOpen(false)} />
    </div>
  )
}
