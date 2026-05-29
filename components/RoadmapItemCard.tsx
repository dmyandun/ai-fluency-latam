'use client'

import type { RoadmapItem } from '@/types/assessment'

interface RoadmapItemCardProps {
  item: RoadmapItem
  onToggleComplete: (id: string) => void
  onEdit: (item: RoadmapItem) => void
  onDelete: (id: string) => void
}

const PRIORITY_STYLES = {
  high:   'bg-amber-100 text-amber-700 border-amber-200',
  medium: 'bg-blue-100 text-blue-700 border-blue-200',
  low:    'bg-slate-100 text-slate-600 border-slate-200',
}
const PRIORITY_LABELS = { high: 'Alta', medium: 'Media', low: 'Baja' }

function ScoreDots({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((dot) => (
          <div
            key={dot}
            className={`w-1.5 h-1.5 rounded-full ${dot <= value ? 'bg-blue-500' : 'bg-slate-200'}`}
          />
        ))}
      </div>
      <span className="text-xs text-slate-400">{label}</span>
    </div>
  )
}

export default function RoadmapItemCard({ item, onToggleComplete, onEdit, onDelete }: RoadmapItemCardProps) {
  return (
    <div className={`bg-white border rounded-xl p-4 transition-all group shadow-sm ${
      item.completed ? 'border-slate-200 opacity-60' : 'border-slate-200 hover:border-blue-200 hover:shadow-md'
    }`}>
      <div className="flex items-start gap-3">
        <button
          type="button"
          onClick={() => onToggleComplete(item.id)}
          className={`mt-0.5 w-4 h-4 rounded border-2 shrink-0 flex items-center justify-center transition-all ${
            item.completed ? 'bg-emerald-500 border-emerald-500' : 'border-slate-300 hover:border-emerald-400'
          }`}
          aria-label={item.completed ? 'Marcar como pendiente' : 'Marcar como completado'}
        >
          {item.completed && (
            <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          )}
        </button>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span className={`text-sm font-medium ${item.completed ? 'line-through text-slate-400' : 'text-slate-900'}`}>
              {item.title}
            </span>
            {item.source === 'system' && (
              <span className="text-xs bg-blue-50 text-blue-600 border border-blue-200 px-1.5 py-0.5 rounded-full">
                Recomendado
              </span>
            )}
          </div>

          {item.description && (
            <p className="text-xs text-slate-500 leading-relaxed mb-3">{item.description}</p>
          )}

          <div className="flex items-center gap-3 flex-wrap">
            <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${PRIORITY_STYLES[item.priority]}`}>
              {PRIORITY_LABELS[item.priority]}
            </span>
            <ScoreDots value={item.impact} label="Impacto" />
            <ScoreDots value={item.effort} label="Esfuerzo" />
          </div>
        </div>

        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
          <button
            type="button"
            onClick={() => onEdit(item)}
            className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
            aria-label="Editar iniciativa"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => onDelete(item.id)}
            className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
            aria-label="Eliminar iniciativa"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
