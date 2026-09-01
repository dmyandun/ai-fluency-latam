import type { AssessmentResult } from '@/types/assessment'
import { MODEL_LABELS } from '@/lib/recommendations'
import { resolveLocationName } from '@/lib/countries'
import { INDUSTRIES } from '@/lib/industries'

const ACCENTS: Record<string, string> = {
  automation: 'bg-indigo-500',
  agency: 'bg-violet-500',
  augmentation: 'bg-cyan-500',
  localGenAI: 'bg-emerald-500',
  apiGenAI: 'bg-amber-500',
  traditionalML: 'bg-blue-500',
}

/**
 * Distancia entre la opción ganadora y la siguiente, en puntos porcentuales.
 * Es lo que dice si el diagnóstico es una decisión clara o un empate técnico.
 */
function marginOverRunnerUp(scores: Record<string, number>) {
  const sorted = Object.values(scores).sort((a, b) => b - a)
  return Math.max(0, Math.round(sorted[0] - sorted[1]))
}

function Tile({
  label,
  value,
  detail,
  accent,
}: {
  label: string
  value: string
  detail: string
  accent?: string
}) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl px-5 py-4 shadow-sm">
      <div className="flex items-center gap-2 mb-2">
        {accent && <span className={`w-2 h-2 rounded-full shrink-0 ${accent}`} />}
        <p className="text-xs text-slate-400 font-medium uppercase tracking-wider truncate">
          {label}
        </p>
      </div>
      <p className="text-lg font-semibold text-slate-900 leading-snug">{value}</p>
      <p className="text-xs text-slate-500 mt-1 leading-relaxed">{detail}</p>
    </div>
  )
}

export default function ResultSummary({ result }: { result: AssessmentResult }) {
  const industry = INDUSTRIES.find((i) => i.id === result.industry)?.label ?? result.industry
  const interactionScore = result.interactionScores[result.interactionModel]
  const implementationScore = result.implementationScores[result.implementationType]
  const margin = marginOverRunnerUp(result.interactionScores)

  /* Un margen estrecho no invalida el diagnóstico: avisa de que hay dos caminos viables. */
  const clarity = margin >= 15 ? 'Diferencia clara' : margin >= 6 ? 'Diferencia moderada' : 'Empate técnico'

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <Tile
        label="Modelo de interacción"
        value={MODEL_LABELS[result.interactionModel] ?? result.interactionModel}
        detail={`${interactionScore}% de afinidad según tus respuestas`}
        accent={ACCENTS[result.interactionModel]}
      />
      <Tile
        label="Tipo de implementación"
        value={MODEL_LABELS[result.implementationType] ?? result.implementationType}
        detail={`${implementationScore}% de afinidad según tus respuestas`}
        accent={ACCENTS[result.implementationType]}
      />
      <Tile
        label="Claridad del diagnóstico"
        value={clarity}
        detail={`${margin} puntos sobre la segunda opción de interacción`}
      />
      <Tile
        label="Contexto evaluado"
        value={industry}
        detail={`${resolveLocationName(result.country)} · 10 preguntas respondidas`}
      />
    </div>
  )
}
