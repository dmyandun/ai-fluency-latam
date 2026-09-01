import type { AssessmentResult, DimensionKey } from '@/types/assessment'

const DIMENSION_LABELS: Record<DimensionKey, string> = {
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

/**
 * Las tres que no se preguntan: salen de clasificar las actividades diarias.
 * Sin actividades quedan en el valor neutro, así que enseñarlas junto a las
 * respondidas haría pasar por medición lo que es un relleno.
 */
const DERIVED_DIMENSIONS: DimensionKey[] = [
  'taskRepetitiveness',
  'humanJudgment',
  'autonomousExecution',
]

function DimensionBar({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex justify-between items-center gap-2">
        <span className="text-xs text-slate-500 truncate">{label}</span>
        <span className="text-xs font-semibold text-slate-900 tabular-nums shrink-0">
          {value}/5
        </span>
      </div>
      <div className="h-1 bg-slate-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-blue-500 rounded-full transition-all duration-700"
          style={{ width: `${(value / 5) * 100}%` }}
        />
      </div>
    </div>
  )
}

export default function DimensionsPanel({ result }: { result: AssessmentResult }) {
  const hasActivities = (result.activities?.length ?? 0) > 0
  const entries = Object.entries(result.dimensions) as [DimensionKey, number][]
  const answered = entries.filter(([key]) => !DERIVED_DIMENSIONS.includes(key))
  const derived = entries.filter(([key]) => DERIVED_DIMENSIONS.includes(key))

  return (
    <section className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 mb-5">
        <h3 className="text-base font-semibold text-slate-900">Desglose de tu diagnóstico</h3>
        <p className="text-xs text-slate-400">Tus {answered.length} respuestas, en escala de 1 a 5</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4">
        {answered.map(([key, value]) => (
          <DimensionBar key={key} label={DIMENSION_LABELS[key] ?? key} value={value} />
        ))}
      </div>

      {hasActivities && (
        <div className="mt-6 border-t border-slate-100 pt-5">
          <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">
            Derivadas de tus actividades
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4">
            {derived.map(([key, value]) => (
              <DimensionBar key={key} label={DIMENSION_LABELS[key] ?? key} value={value} />
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
