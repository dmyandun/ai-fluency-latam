'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import type { AssessmentResult, Roadmap } from '@/types/assessment'
import { getRecommendation, MODEL_LABELS } from '@/lib/recommendations'
import { loadOrGenerateRoadmap } from '@/lib/roadmap'
import ResultCard from '@/components/ResultCard'
import ResultSummary from '@/components/ResultSummary'
import RegionalBenchmark from '@/components/RegionalBenchmark'
import DimensionsPanel from '@/components/DimensionsPanel'
import RecommendationMatrix from '@/components/RecommendationMatrix'
import RoadmapFlowBoard from '@/components/RoadmapFlowBoard'
import AIPolicyGenerator from '@/components/AIPolicyGenerator'
import ConsultationModal from '@/components/ConsultationModal'
import Brandmark from '@/components/Brandmark'

export default function ResultsPage() {
  const router = useRouter()
  const [result, setResult]   = useState<AssessmentResult | null>(null)
  const [roadmap, setRoadmap] = useState<Roadmap | null>(null)
  const [activeTab, setActiveTab] = useState<'results' | 'roadmap' | 'policy'>('results')
  const [scheduleOpen, setScheduleOpen] = useState(false)

  useEffect(() => {
    const raw = localStorage.getItem('afl_result')
    if (!raw) { router.replace('/assessment'); return }
    try {
      const parsed: AssessmentResult = JSON.parse(raw)
      // localStorage no existe en SSR: hidratar al montar es la única vía.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setResult(parsed)
      setRoadmap(loadOrGenerateRoadmap(parsed))
    } catch {
      router.replace('/assessment')
    }
  }, [router])

  const handleUpdateRoadmap = useCallback((updated: Roadmap) => setRoadmap(updated), [])

  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  const recommendation = getRecommendation(result)

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Navbar */}
      <nav className="bg-white border-b border-slate-200 px-6 py-4 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Brandmark />
          <Link
            href="/assessment"
            className="text-sm bg-white border border-slate-300 hover:border-blue-400 text-slate-600 hover:text-blue-700 px-4 py-2 rounded-lg transition-all shadow-sm"
          >
            Nuevo diagnóstico
          </Link>
        </div>
      </nav>

      {/* Header de resultados */}
      <div className="bg-white border-b border-slate-200 px-6 py-10">
        <div className="max-w-7xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-medium px-3 py-1.5 rounded-full mb-4">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
            Diagnóstico completado
          </div>
          <h1 className="text-3xl sm:text-4xl font-semibold text-slate-900 mb-3">
            Tu recomendación:{' '}
            <span className="text-blue-600">{MODEL_LABELS[result.interactionModel]}</span>{' '}
            <span className="text-slate-300">+</span>{' '}
            <span className="text-emerald-600">{MODEL_LABELS[result.implementationType]}</span>
          </h1>
          <p className="text-slate-500 max-w-2xl">{recommendation.summary}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-slate-200 px-6">
        <div className="max-w-7xl mx-auto flex gap-1">
          {[
            { id: 'results' as const, label: 'Diagnóstico' },
            { id: 'roadmap' as const, label: 'Roadmap 12 meses' },
            { id: 'policy'      as const, label: 'Política de IA' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-3 text-sm font-medium border-b-2 transition-all ${
                activeTab === tab.id
                  ? 'border-blue-600 text-blue-700'
                  : 'border-transparent text-slate-400 hover:text-slate-600'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <main className="flex-1 px-6 py-8">
        <div className="max-w-7xl mx-auto">

          {activeTab === 'results' && (
            <div className="space-y-8 animate-fade-in">

              {/* Aviso de coherencia actividades vs recomendación */}
              {(() => {
                const acts = result.activities ?? []
                if (acts.length === 0) return null
                const total     = acts.length
                const aiOnly    = acts.filter((a) => a.category === 'ai_only').length
                const humanAI   = acts.filter((a) => a.category === 'human_ai').length
                const humanOnly = acts.filter((a) => a.category === 'human_only').length
                const humanPct  = Math.round(((humanAI + humanOnly) / total) * 100)
                const aiPct     = Math.round((aiOnly / total) * 100)

                // Alerta: mayoría colaborativa pero recomienda automation
                if (humanPct >= 60 && result.interactionModel === 'automation') {
                  return (
                    <div className="bg-amber-50 border border-amber-200 rounded-xl px-5 py-4 flex gap-3">
                      <span className="text-amber-500 text-lg shrink-0">⚠️</span>
                      <div>
                        <p className="text-sm font-semibold text-amber-800">Posible inconsistencia en tu diagnóstico</p>
                        <p className="text-sm text-amber-700 mt-0.5">
                          El {humanPct}% de tus actividades requieren criterio humano, pero el cuestionario apunta a Automatización.
                          Revisa si tus respuestas al cuestionario reflejan correctamente tu realidad operativa.
                        </p>
                      </div>
                    </div>
                  )
                }
                // Alerta: mayoría autónoma pero recomienda augmentation
                if (aiPct >= 60 && result.interactionModel === 'augmentation') {
                  return (
                    <div className="bg-amber-50 border border-amber-200 rounded-xl px-5 py-4 flex gap-3">
                      <span className="text-amber-500 text-lg shrink-0">⚠️</span>
                      <div>
                        <p className="text-sm font-semibold text-amber-800">Posible inconsistencia en tu diagnóstico</p>
                        <p className="text-sm text-amber-700 mt-0.5">
                          El {aiPct}% de tus actividades pueden hacerlas la IA sola, pero el cuestionario apunta a Aumentación.
                          Revisa si tus respuestas al cuestionario reflejan correctamente tu contexto.
                        </p>
                      </div>
                    </div>
                  )
                }
                return null
              })()}

              <ResultSummary result={result} />

              {/* Los dos ejes y su porqué se leen de un vistazo, en la misma fila. */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <ResultCard type="interactionModel"   winner={result.interactionModel}   scores={result.interactionScores} />
                <ResultCard type="implementationType" winner={result.implementationType} scores={result.implementationScores} />
                <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm animate-fade-in md:col-span-2 lg:col-span-1">
                  <p className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-3">
                    Por qué esta recomendación
                  </p>
                  <p className="text-slate-600 text-sm leading-relaxed">{recommendation.rationale}</p>
                </div>
              </div>

              <RegionalBenchmark result={result} />

              <RecommendationMatrix result={result} recommendation={recommendation} />

              {/* Análisis de actividades diarias */}
              {result.activities && result.activities.length > 0 && (
                <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                  <h3 className="text-base font-semibold text-slate-900 mb-1">Tus actividades diarias</h3>
                  <p className="text-sm text-slate-500 mb-5">Cómo se distribuye el trabajo entre IA y humanos según tu diagnóstico.</p>

                  {/* Contadores */}
                  <div className="grid grid-cols-3 gap-3 mb-6">
                    {[
                      { key: 'ai_only',    label: 'Solo IA',      icon: '🤖', color: 'bg-violet-50 border-violet-200 text-violet-700' },
                      { key: 'human_ai',   label: 'Humano + IA',  icon: '🤝', color: 'bg-blue-50 border-blue-200 text-blue-700' },
                      { key: 'human_only', label: 'Solo humano',  icon: '👤', color: 'bg-emerald-50 border-emerald-200 text-emerald-700' },
                    ].map(({ key, label, icon, color }) => {
                      const count = result.activities.filter((a) => a.category === key).length
                      return (
                        <div key={key} className={`border rounded-xl p-3 text-center ${color}`}>
                          <div className="text-2xl mb-1">{icon}</div>
                          <div className="text-2xl font-bold">{count}</div>
                          <div className="text-xs font-medium">{label}</div>
                        </div>
                      )
                    })}
                  </div>

                  {/* Lista detallada */}
                  <div className="space-y-2">
                    {result.activities.map((act, i) => {
                      const styles: Record<string, { badge: string; dot: string }> = {
                        ai_only:    { badge: 'bg-violet-100 text-violet-700', dot: 'bg-violet-500' },
                        human_ai:   { badge: 'bg-blue-100 text-blue-700',    dot: 'bg-blue-500' },
                        human_only: { badge: 'bg-emerald-100 text-emerald-700', dot: 'bg-emerald-500' },
                      }
                      const labels: Record<string, string> = {
                        ai_only: 'Solo IA', human_ai: 'Humano + IA', human_only: 'Solo humano',
                      }
                      const s = act.category ? styles[act.category] : null
                      return (
                        <div key={i} className="flex items-center gap-3 py-2 border-b border-slate-100 last:border-0">
                          <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-500 text-xs font-bold flex items-center justify-center shrink-0">
                            {i + 1}
                          </span>
                          <span className="flex-1 text-sm text-slate-700">{act.description}</span>
                          {s && act.category && (
                            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full shrink-0 ${s.badge}`}>
                              {labels[act.category]}
                            </span>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}

              <DimensionsPanel result={result} />

              {/* CTA */}
              <div className="bg-blue-50 border border-blue-200 rounded-2xl p-8 text-center">
                <h3 className="text-xl font-semibold text-slate-900 mb-2">
                  ¿Listo para implementar tu estrategia de IA?
                </h3>
                <p className="text-slate-500 mb-6 max-w-xl mx-auto">
                  Revisa tu roadmap personalizado de 12 meses o contacta a un especialista para acompañar el proceso de adopción.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    type="button"
                    onClick={() => setActiveTab('roadmap')}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl text-sm transition-all shadow-md"
                  >
                    Ver roadmap de 12 meses →
                  </button>
                  <button
                    type="button"
                    onClick={() => setScheduleOpen(true)}
                    className="bg-white border border-slate-300 hover:border-blue-400 text-slate-700 hover:text-blue-700 font-medium px-6 py-3 rounded-xl text-sm transition-all shadow-sm"
                  >
                    Contactar consultoría
                  </button>
                  <a
                    href="https://www.linkedin.com/in/dmyandun/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-xl text-sm transition-all shadow-sm"
                  >
                    Charlemos de IA
                  </a>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'roadmap' && roadmap && (
            <div className="animate-fade-in">
              <RoadmapFlowBoard roadmap={roadmap} onUpdateRoadmap={handleUpdateRoadmap} />
            </div>
          )}

          {activeTab === 'policy' && (
            <div className="animate-fade-in max-w-4xl">
              <AIPolicyGenerator result={result} />
            </div>
          )}

        </div>
      </main>

      <ConsultationModal
        result={result}
        open={scheduleOpen}
        onClose={() => setScheduleOpen(false)}
      />
    </div>
  )
}
