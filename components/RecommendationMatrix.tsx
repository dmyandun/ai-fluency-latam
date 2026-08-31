'use client'

import type { AssessmentResult, Recommendation } from '@/types/assessment'
import { resolveLocationName } from '@/lib/countries'
import { INDUSTRIES } from '@/lib/industries'

interface RecommendationMatrixProps {
  result: AssessmentResult
  recommendation: Recommendation
}

export default function RecommendationMatrix({ result, recommendation }: RecommendationMatrixProps) {
  const country = resolveLocationName(result.country)
  const industry = INDUSTRIES.find((i) => i.id === result.industry)?.label ?? result.industry

  return (
    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm animate-fade-in">
      <div className="border-b border-slate-100 px-6 py-5 bg-slate-50">
        <div className="flex flex-wrap gap-2 mb-3">
          <span className="text-xs bg-white text-slate-500 px-2.5 py-1 rounded-full border border-slate-200">
            {country}
          </span>
          <span className="text-xs bg-white text-slate-500 px-2.5 py-1 rounded-full border border-slate-200">
            {industry}
          </span>
        </div>
        <h3 className="text-lg font-semibold text-slate-900">{recommendation.title}</h3>
        <p className="text-slate-500 text-sm mt-1 leading-relaxed">{recommendation.summary}</p>
      </div>

      <div className="px-6 py-5 border-b border-slate-100">
        <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
          Por qué esta recomendación
        </h4>
        <p className="text-slate-600 text-sm leading-relaxed">{recommendation.rationale}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
        <div className="px-6 py-5">
          <h4 className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-3 flex items-center gap-1.5">
            <span>✦</span> Casos de uso
          </h4>
          <ul className="space-y-2">
            {recommendation.useCases.map((uc, i) => (
              <li key={i} className="text-sm text-slate-600 flex gap-2">
                <span className="text-blue-400 mt-0.5 shrink-0">→</span>
                <span>{uc}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="px-6 py-5">
          <h4 className="text-xs font-semibold text-emerald-600 uppercase tracking-wider mb-3 flex items-center gap-1.5">
            <span>✦</span> Victorias rápidas
          </h4>
          <ul className="space-y-2">
            {recommendation.quickWins.map((qw, i) => (
              <li key={i} className="text-sm text-slate-600 flex gap-2">
                <span className="text-emerald-500 mt-0.5 shrink-0">→</span>
                <span>{qw}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="px-6 py-5">
          <h4 className="text-xs font-semibold text-amber-600 uppercase tracking-wider mb-3 flex items-center gap-1.5">
            <span>⚠</span> Riesgos a considerar
          </h4>
          <ul className="space-y-2">
            {recommendation.risks.map((risk, i) => (
              <li key={i} className="text-sm text-slate-600 flex gap-2">
                <span className="text-amber-500 mt-0.5 shrink-0">→</span>
                <span>{risk}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
