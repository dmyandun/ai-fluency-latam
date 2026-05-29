'use client'

import type { AssessmentResult, Recommendation } from '@/types/assessment'
import { LATAM_COUNTRIES } from '@/lib/countries'
import { INDUSTRIES } from '@/lib/industries'

interface RecommendationMatrixProps {
  result: AssessmentResult
  recommendation: Recommendation
}

export default function RecommendationMatrix({
  result,
  recommendation,
}: RecommendationMatrixProps) {
  const country = LATAM_COUNTRIES.find((c) => c.code === result.country)?.name ?? result.country
  const industry = INDUSTRIES.find((i) => i.id === result.industry)?.label ?? result.industry

  return (
    <div className="bg-gray-900 border border-gray-700 rounded-2xl overflow-hidden animate-fade-in">
      {/* Header */}
      <div className="border-b border-gray-800 px-6 py-5">
        <div className="flex flex-wrap gap-2 mb-3">
          <span className="text-xs bg-gray-800 text-gray-400 px-2.5 py-1 rounded-full border border-gray-700">
            {country}
          </span>
          <span className="text-xs bg-gray-800 text-gray-400 px-2.5 py-1 rounded-full border border-gray-700">
            {industry}
          </span>
        </div>
        <h3 className="text-lg font-semibold text-white">{recommendation.title}</h3>
        <p className="text-gray-400 text-sm mt-1 leading-relaxed">{recommendation.summary}</p>
      </div>

      {/* Racional */}
      <div className="px-6 py-5 border-b border-gray-800">
        <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
          Por qué esta recomendación
        </h4>
        <p className="text-gray-300 text-sm leading-relaxed">{recommendation.rationale}</p>
      </div>

      {/* Grid de detalles */}
      <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-gray-800">
        {/* Casos de uso */}
        <div className="px-6 py-5">
          <h4 className="text-xs font-semibold text-indigo-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
            <span>✦</span> Casos de uso
          </h4>
          <ul className="space-y-2">
            {recommendation.useCases.map((uc, i) => (
              <li key={i} className="text-sm text-gray-300 flex gap-2">
                <span className="text-gray-600 mt-0.5 shrink-0">→</span>
                <span>{uc}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Quick wins */}
        <div className="px-6 py-5">
          <h4 className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
            <span>✦</span> Victorias rápidas
          </h4>
          <ul className="space-y-2">
            {recommendation.quickWins.map((qw, i) => (
              <li key={i} className="text-sm text-gray-300 flex gap-2">
                <span className="text-emerald-600 mt-0.5 shrink-0">→</span>
                <span>{qw}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Riesgos */}
        <div className="px-6 py-5">
          <h4 className="text-xs font-semibold text-amber-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
            <span>⚠</span> Riesgos a considerar
          </h4>
          <ul className="space-y-2">
            {recommendation.risks.map((risk, i) => (
              <li key={i} className="text-sm text-gray-300 flex gap-2">
                <span className="text-amber-600 mt-0.5 shrink-0">→</span>
                <span>{risk}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
