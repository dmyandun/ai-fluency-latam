'use client'

import { useMemo, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import Link from 'next/link'
import type { DimensionScore, InteractionModel } from '@/types/assessment'
import { QUESTIONS } from '@/lib/questions'
import { buildAssessmentResult } from '@/lib/scoring'
import { getSimulation } from '@/lib/simulations'
import { DEFAULT_REGION } from '@/lib/countries'
import IndustrySelector from '@/components/IndustrySelector'
import SimulationApp from '@/components/SimulationApp'
import ConsultationModal from '@/components/ConsultationModal'
import Brandmark from '@/components/Brandmark'

const PREVIEW_VARIANTS: InteractionModel[] = ['automation', 'agency', 'augmentation']
const CHAT_MODEL: InteractionModel = 'agency'

type ScoreInput = Omit<
  DimensionScore,
  'taskRepetitiveness' | 'humanJudgment' | 'autonomousExecution'
>

/**
 * El diagnóstico vive en `/assessment`: esta página sólo enseña la simulación.
 * La industria elegida viaja en la URL para no volver a preguntarla allí.
 */
function assessmentHref(industry: string) {
  return industry ? `/assessment?industry=${encodeURIComponent(industry)}` : '/assessment'
}

function SectionShell({
  title,
  description,
  action,
  children,
}: {
  title?: string
  description?: string
  action?: ReactNode
  children: ReactNode
}) {
  /* Una sección sin encabezado ni botón no debe reservar el hueco de la cabecera. */
  const hasHeader = Boolean(title || description || action)

  return (
    <section className="border-t border-slate-200 py-10 animate-fade-in">
      {hasHeader && (
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            {title && <h2 className="text-2xl font-semibold text-slate-900">{title}</h2>}
            {description && (
              <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-500">{description}</p>
            )}
          </div>
          {action && <div className="shrink-0 sm:pt-1">{action}</div>}
        </div>
      )}
      {children}
    </section>
  )
}

export default function ExploreFlow() {
  const [industry, setIndustry] = useState('')
  const [scheduleOpen, setScheduleOpen] = useState(false)
  const simulationRef = useRef<HTMLDivElement>(null)

  const simulationReady = Boolean(industry)

  /*
   * El modal de consultoría espera un AssessmentResult. Desde aquí nadie ha
   * respondido el diagnóstico todavía, así que se arma uno neutro sólo para
   * darle el contexto de industria.
   */
  const scheduleResult = useMemo(() => {
    const neutralAnswers = QUESTIONS.reduce<Partial<ScoreInput>>((acc, question) => {
      acc[question.dimension as keyof ScoreInput] = 3
      return acc
    }, {})
    return buildAssessmentResult(
      neutralAnswers as ScoreInput,
      DEFAULT_REGION,
      industry || 'general',
      []
    )
  }, [industry])

  function handleIndustryChange(nextIndustry: string) {
    setIndustry(nextIndustry)
    window.setTimeout(() => {
      simulationRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 120)
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <nav className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 px-6 py-4 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <Brandmark />
          <Link
            href={assessmentHref(industry)}
            className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm text-slate-600 shadow-sm transition-all hover:border-blue-400 hover:text-blue-700"
          >
            Ir al diagnóstico
          </Link>
        </div>
      </nav>

      <main className="mx-auto max-w-7xl space-y-8 px-6 py-10">
        <header>
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-700">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
            Experiencia interactiva para descubrir oportunidades reales de IA
          </div>
          <h1 className="max-w-4xl text-4xl font-semibold leading-tight tracking-tight text-slate-900 sm:text-5xl">
            Prueba una simulación con IA aplicada a tu industria
          </h1>
        </header>

        <SectionShell
          action={
            simulationReady ? (
              <Link
                href={assessmentHref(industry)}
                className="inline-block rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-600 shadow-sm transition-all hover:border-blue-400 hover:text-blue-700"
              >
                Saltar al diagnóstico →
              </Link>
            ) : null
          }
        >
          <IndustrySelector value={industry} onChange={handleIndustryChange} />
        </SectionShell>

        {simulationReady && (
          <div ref={simulationRef}>
            <SectionShell title="Explora simulaciones con IA">
              <SimulationApp
                key={industry}
                config={getSimulation(industry)}
                interactionModel={CHAT_MODEL}
                variants={PREVIEW_VARIANTS}
                industryId={industry}
                onSchedule={() => setScheduleOpen(true)}
              />
            </SectionShell>
          </div>
        )}

        <SectionShell>
          <div className="rounded-2xl border border-blue-200 bg-blue-50 p-8 text-center">
            <h2 className="mb-2 text-xl font-semibold text-slate-900">
              ¿Qué tipo de IA conviene implementar primero en tu organización?
            </h2>
            <p className="mx-auto mb-6 max-w-xl text-slate-500">
              El diagnóstico son 10 preguntas. Al terminarlas obtienes la recomendación, tu Roadmap
              4D de 12 meses y el borrador de política de IA.
            </p>
            <div className="flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href={assessmentHref(industry)}
                className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-md transition-all hover:bg-blue-700"
              >
                Hacer el diagnóstico →
              </Link>
              <button
                type="button"
                onClick={() => setScheduleOpen(true)}
                className="rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-medium text-slate-700 shadow-sm transition-all hover:border-blue-400 hover:text-blue-700"
              >
                Contactar consultoría
              </button>
            </div>
          </div>
        </SectionShell>
      </main>

      <ConsultationModal
        result={scheduleResult}
        open={scheduleOpen}
        onClose={() => setScheduleOpen(false)}
      />
    </div>
  )
}
