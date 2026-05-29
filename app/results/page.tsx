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
  const [result, setResult] = useState<AssessmentResult | null>(null)
  const [roadmap, setRoadmap] = useState<Roadmap | null>(null)
  const [activeTab, setActiveTab] = useState<'results' | 'roadmap'>('results')

  useEffect(() => {
    const raw = localStorage.getItem('afl_result')
    if (!raw) {
      router.replace('/assessment')
      return
    }
    try {
      const parsed: AssessmentResult = JSON.parse(raw)
      setResult(parsed)
      setRoadmap(loadOrGenerateRoadmap(parsed))
    } catch {
      router.replace('/assessment')
    }
  }, [router])

  const handleUpdateRoadmap = useCallback((updated: Roadmap) => {
    setRoadmap(updated)
  }, [])

  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  const recommendation = getRecommendation(result)

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="border-b border-gray-800 px-6 py-4 sticky top-0 bg-[#0A0F1E]/90 backdrop-blur-md z-10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="text-lg font-semibold text-white tracking-tight">
            AI Fluency <span className="text-indigo-400">LATAM</span>
          </Link>
          <Link
            href="/assessment"
            className="text-sm border border-gray-700 hover:border-indigo-500/50 text-gray-300 hover:text-white px-4 py-2 rounded-lg transition-all"
          >
            Nuevo diagnóstico
          </Link>
        </div>
      </nav>

      {/* Header de resultados */}
      <div className="border-b border-gray-800 px-6 py-10">
        <div className="max-w-7xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium px-3 py-1.5 rounded-full mb-4">
            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
            Diagnóstico completado
          </div>
          <h1 className="text-3xl sm:text-4xl font-semibold text-white mb-3">
            Tu recomendación:{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">
              {MODEL_LABELS[result.interactionModel]}
            </span>{' '}
            <span className="text-gray-400 text-2xl">+</span>{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
              {MODEL_LABELS[result.implementationType]}
            </span>
          </h1>
          <p className="text-gray-400 max-w-2xl">
            {recommendation.summary}
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-800 px-6">
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
                  ? 'border-indigo-500 text-white'
                  : 'border-transparent text-gray-500 hover:text-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Contenido principal */}
      <main className="flex-1 px-6 py-8">
        <div className="max-w-7xl mx-auto">

          {/* Tab: Diagnóstico */}
          {activeTab === 'results' && (
            <div className="space-y-8 animate-fade-in">
              {/* Cards de scores */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ResultCard
                  type="interactionModel"
                  winner={result.interactionModel}
                  scores={result.interactionScores}
                />
                <ResultCard
                  type="implementationType"
                  winner={result.implementationType}
                  scores={result.implementationScores}
                />
              </div>

              {/* Matriz de recomendación */}
              <RecommendationMatrix result={result} recommendation={recommendation} />

              {/* Desglose de dimensiones */}
              <div className="bg-gray-900 border border-gray-700 rounded-2xl p-6">
                <h3 className="text-base font-semibold text-white mb-5">
                  Desglose de tu diagnóstico
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Object.entries(result.dimensions).map(([key, value]) => {
                    const labels: Record<string, string> = {
                      taskRepetitiveness: 'Repetitividad',
                      dataMaturity: 'Madurez de datos',
                      creativityRequired: 'Creatividad',
                      decisionComplexity: 'Complejidad de decisión',
                      operationalVolume: 'Volumen operativo',
                      dataPrivacy: 'Privacidad de datos',
                      systemsIntegration: 'Integración de sistemas',
                      humanJudgment: 'Criterio humano',
                      autonomousExecution: 'Ejecución autónoma',
                      forecastingNeed: 'Necesidad de predicción',
                      teamTechMaturity: 'Madurez tecnológica',
                      regulatorySensitivity: 'Sensibilidad regulatoria',
                      innovationAdvantage: 'Ventaja por innovación',
                    }
                    return (
                      <div key={key} className="flex flex-col gap-1.5">
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-gray-400">{labels[key] ?? key}</span>
                          <span className="text-xs font-semibold text-white tabular-nums">
                            {value}/5
                          </span>
                        </div>
                        <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-indigo-500 rounded-full"
                            style={{ width: `${(value / 5) * 100}%` }}
                          />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* CTA de contacto */}
              <div className="bg-gradient-to-r from-indigo-600/10 to-violet-600/10 border border-indigo-500/20 rounded-2xl p-8 text-center">
                <h3 className="text-xl font-semibold text-white mb-2">
                  ¿Listo para implementar tu estrategia de IA?
                </h3>
                <p className="text-gray-400 mb-6 max-w-xl mx-auto">
                  Revisa tu roadmap personalizado de 12 meses o contacta a un especialista para
                  acompañar el proceso de adopción.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    type="button"
                    onClick={() => setActiveTab('roadmap')}
                    className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-6 py-3 rounded-xl text-sm transition-all"
                  >
                    Ver roadmap de 12 meses →
                  </button>
                  <a
                    href="mailto:hola@aifluencylatam.com"
                    className="border border-gray-700 hover:border-indigo-500/50 text-gray-300 hover:text-white font-medium px-6 py-3 rounded-xl text-sm transition-all"
                  >
                    Contactar consultoría
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* Tab: Roadmap */}
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
