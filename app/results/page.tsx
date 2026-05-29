'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import type { AssessmentResult, Roadmap } from '@/types/assessment'
import { getRecommendation, MODEL_LABELS } from '@/lib/recommendations'
import { loadOrGenerateRoadmap } from '@/lib/roadmap'
import ResultCard from '@/components/ResultCard'
import RecommendationMatrix from '@/components/RecommendationMatrix'
import RoadmapBoard from '@/components/RoadmapBoard'

export default function ResultsPage() {
  const router = useRouter()
  const [result, setResult]   = useState<AssessmentResult | null>(null)
  const [roadmap, setRoadmap] = useState<Roadmap | null>(null)
  const [activeTab, setActiveTab] = useState<'results' | 'roadmap'>('results')

  useEffect(() => {
    const raw = localStorage.getItem('afl_result')
    if (!raw) { router.replace('/assessment'); return }
    try {
      const parsed: AssessmentResult = JSON.parse(raw)
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
          <Link href="/" className="text-lg font-semibold text-slate-900 tracking-tight">
            AI Fluency <span className="text-blue-600">LATAM</span>
          </Link>
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
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ResultCard type="interactionModel"   winner={result.interactionModel}   scores={result.interactionScores} />
                <ResultCard type="implementationType" winner={result.implementationType} scores={result.implementationScores} />
              </div>

              <RecommendationMatrix result={result} recommendation={recommendation} />

              {/* Desglose de dimensiones */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                <h3 className="text-base font-semibold text-slate-900 mb-5">Desglose de tu diagnóstico</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Object.entries(result.dimensions).map(([key, value]) => {
                    const labels: Record<string, string> = {
                      taskRepetitiveness: 'Repetitividad', dataMaturity: 'Madurez de datos',
                      creativityRequired: 'Creatividad', decisionComplexity: 'Complejidad de decisión',
                      operationalVolume: 'Volumen operativo', dataPrivacy: 'Privacidad de datos',
                      systemsIntegration: 'Integración de sistemas', humanJudgment: 'Criterio humano',
                      autonomousExecution: 'Ejecución autónoma', forecastingNeed: 'Necesidad de predicción',
                      teamTechMaturity: 'Madurez tecnológica', regulatorySensitivity: 'Sensibilidad regulatoria',
                      innovationAdvantage: 'Ventaja por innovación',
                    }
                    return (
                      <div key={key} className="flex flex-col gap-1.5">
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-slate-500">{labels[key] ?? key}</span>
                          <span className="text-xs font-semibold text-slate-900 tabular-nums">{value}/5</span>
                        </div>
                        <div className="h-1 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-blue-500 rounded-full" style={{ width: `${(value / 5) * 100}%` }} />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

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
                  <a
                    href="mailto:hola@aifluencylatam.com"
                    className="bg-white border border-slate-300 hover:border-blue-400 text-slate-700 hover:text-blue-700 font-medium px-6 py-3 rounded-xl text-sm transition-all shadow-sm"
                  >
                    Contactar consultoría
                  </a>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'roadmap' && roadmap && (
            <div className="animate-fade-in">
              <RoadmapBoard roadmap={roadmap} onUpdateRoadmap={handleUpdateRoadmap} />
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
