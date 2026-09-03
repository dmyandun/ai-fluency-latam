'use client'

import type { InteractionModel, ImplementationType } from '@/types/assessment'
import { MODEL_LABELS, MODEL_DESCRIPTIONS } from '@/lib/recommendations'

const INTERACTION_COLORS: Record<InteractionModel, { bar: string; badge: string; border: string; bg: string }> = {
  automation: { bar: 'bg-indigo-500', badge: 'bg-indigo-100 text-indigo-700', border: 'border-indigo-200', bg: 'bg-indigo-50' },
  agency:     { bar: 'bg-violet-500', badge: 'bg-violet-100 text-violet-700', border: 'border-violet-200', bg: 'bg-violet-50' },
  augmentation: { bar: 'bg-cyan-500', badge: 'bg-cyan-100 text-cyan-700',   border: 'border-cyan-200',   bg: 'bg-cyan-50'   },
}

const IMPL_COLORS: Record<ImplementationType, { bar: string; badge: string; border: string; bg: string }> = {
  localGenAI:   { bar: 'bg-emerald-500', badge: 'bg-emerald-100 text-emerald-700', border: 'border-emerald-200', bg: 'bg-emerald-50' },
  apiGenAI:     { bar: 'bg-amber-500',   badge: 'bg-amber-100 text-amber-700',     border: 'border-amber-200',   bg: 'bg-amber-50'   },
  traditionalML:{ bar: 'bg-blue-500',    badge: 'bg-blue-100 text-blue-700',       border: 'border-blue-200',    bg: 'bg-blue-50'    },
}

/**
 * 'panel' lo deja sin carcasa para convivir con otros bloques dentro de una
 * misma tarjeta; el badge, los colores y las barras no cambian.
 */
type ResultCardVariant = 'card' | 'panel'

type ResultCardProps = (
  | { type: 'interactionModel';   winner: InteractionModel;   scores: Record<InteractionModel, number> }
  | { type: 'implementationType'; winner: ImplementationType; scores: Record<ImplementationType, number> }
) & { variant?: ResultCardVariant }

export default function ResultCard(props: ResultCardProps) {
  const { type, winner, scores, variant = 'card' } = props
  const isInteraction = type === 'interactionModel'
  const label = isInteraction ? 'Modelo de interacción' : 'Tipo de implementación'
  const winnerDesc = MODEL_DESCRIPTIONS[winner] ?? ''

  const colors = isInteraction
    ? INTERACTION_COLORS[winner as InteractionModel]
    : IMPL_COLORS[winner as ImplementationType]

  const entries = Object.entries(scores) as [string, number][]
  const sorted = [...entries].sort(([, a], [, b]) => b - a)

  const shell =
    variant === 'panel'
      ? 'px-6 py-5'
      : `bg-white border rounded-2xl p-6 shadow-sm animate-fade-in ${colors.border}`

  return (
    <div className={shell}>
      <p className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-3">{label}</p>

      <span className={`inline-block text-sm font-semibold px-3 py-1.5 rounded-full mb-4 ${colors.badge}`}>
        {MODEL_LABELS[winner] ?? winner}
      </span>

      <p className="text-slate-600 text-sm leading-relaxed mb-6">{winnerDesc}</p>

      <div className="space-y-3">
        {sorted.map(([key, score]) => {
          const isWinner = key === winner
          const barColor = isInteraction
            ? INTERACTION_COLORS[key as InteractionModel]?.bar
            : IMPL_COLORS[key as ImplementationType]?.bar

          return (
            <div key={key}>
              <div className="flex justify-between items-center mb-1">
                <span className={`text-xs font-medium ${isWinner ? 'text-slate-900' : 'text-slate-400'}`}>
                  {MODEL_LABELS[key] ?? key}
                </span>
                <span className={`text-xs font-semibold tabular-nums ${isWinner ? 'text-slate-900' : 'text-slate-400'}`}>
                  {score}%
                </span>
              </div>
              <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${barColor ?? 'bg-slate-400'} ${!isWinner ? 'opacity-30' : ''}`}
                  style={{ width: `${score}%` }}
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
