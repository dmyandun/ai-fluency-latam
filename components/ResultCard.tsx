'use client'

import type { InteractionModel, ImplementationType } from '@/types/assessment'
import { MODEL_LABELS, MODEL_DESCRIPTIONS } from '@/lib/recommendations'

const INTERACTION_COLORS: Record<InteractionModel, { bar: string; badge: string; border: string }> = {
  automation: {
    bar: 'bg-indigo-500',
    badge: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
    border: 'border-indigo-500/40',
  },
  agency: {
    bar: 'bg-violet-500',
    badge: 'bg-violet-500/10 text-violet-400 border-violet-500/20',
    border: 'border-violet-500/40',
  },
  augmentation: {
    bar: 'bg-cyan-500',
    badge: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
    border: 'border-cyan-500/40',
  },
}

const IMPL_COLORS: Record<ImplementationType, { bar: string; badge: string; border: string }> = {
  localGenAI: {
    bar: 'bg-emerald-500',
    badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    border: 'border-emerald-500/40',
  },
  apiGenAI: {
    bar: 'bg-amber-500',
    badge: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    border: 'border-amber-500/40',
  },
  traditionalML: {
    bar: 'bg-blue-500',
    badge: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    border: 'border-blue-500/40',
  },
}

type ResultCardProps =
  | {
      type: 'interactionModel'
      winner: InteractionModel
      scores: Record<InteractionModel, number>
    }
  | {
      type: 'implementationType'
      winner: ImplementationType
      scores: Record<ImplementationType, number>
    }

export default function ResultCard(props: ResultCardProps) {
  const { type, winner, scores } = props

  const isInteraction = type === 'interactionModel'
  const label = isInteraction ? 'Modelo de interacción' : 'Tipo de implementación'
  const winnerLabel = MODEL_LABELS[winner] ?? winner
  const winnerDesc = MODEL_DESCRIPTIONS[winner] ?? ''

  const colors = isInteraction
    ? INTERACTION_COLORS[winner as InteractionModel]
    : IMPL_COLORS[winner as ImplementationType]

  const entries = Object.entries(scores) as [string, number][]
  const sorted = [...entries].sort(([, a], [, b]) => b - a)

  return (
    <div className={`bg-gray-900 border rounded-2xl p-6 ${colors.border} animate-fade-in`}>
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xs text-gray-500 font-medium uppercase tracking-wider">{label}</span>
      </div>

      <div className="flex items-start gap-3 mb-6">
        <span
          className={`text-xs font-semibold px-3 py-1.5 rounded-full border ${colors.badge}`}
        >
          {winnerLabel}
        </span>
      </div>

      <p className="text-gray-300 text-sm leading-relaxed mb-6">{winnerDesc}</p>

      {/* Barras de scores */}
      <div className="space-y-3">
        {sorted.map(([key, score]) => {
          const isWinner = key === winner
          const barColor = isInteraction
            ? INTERACTION_COLORS[key as InteractionModel]?.bar
            : IMPL_COLORS[key as ImplementationType]?.bar

          return (
            <div key={key}>
              <div className="flex justify-between items-center mb-1">
                <span
                  className={`text-xs font-medium ${isWinner ? 'text-white' : 'text-gray-500'}`}
                >
                  {MODEL_LABELS[key] ?? key}
                </span>
                <span
                  className={`text-xs font-semibold tabular-nums ${isWinner ? 'text-white' : 'text-gray-600'}`}
                >
                  {score}%
                </span>
              </div>
              <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${barColor ?? 'bg-gray-500'} ${!isWinner ? 'opacity-30' : ''}`}
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
