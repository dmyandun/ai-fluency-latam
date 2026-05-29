'use client'

import type { RoadmapItem } from '@/types/assessment'

interface RoadmapItemCardProps {
  item: RoadmapItem
  onToggleComplete: (id: string) => void
  onEdit: (item: RoadmapItem) => void
  onDelete: (id: string) => void
}

const PRIORITY_STYLES = {
  high: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  medium: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
  low: 'bg-gray-500/10 text-gray-400 border-gray-600/20',
}

const PRIORITY_LABELS = {
  high: 'Alta',
  medium: 'Media',
  low: 'Baja',
}

function ScoreDots({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((dot) => (
          <div
            key={dot}
            className={`w-1.5 h-1.5 rounded-full ${dot <= value ? 'bg-indigo-400' : 'bg-gray-700'}`}
          />
        ))}
      </div>
      <span className="text-xs text-gray-600">{label}</span>
    </div>
  )
}

export default function RoadmapItemCard({
  item,
  onToggleComplete,
  onEdit,
  onDelete,
}: RoadmapItemCardProps) {
  return (
    <div
      className={`bg-gray-900 border rounded-xl p-4 transition-all group ${
        item.completed
          ? 'border-gray-800 opacity-60'
          : 'border-gray-700 hover:border-gray-600'
      }`}
    >
      <div className="flex items-start gap-3">
        {/* Checkbox */}
        <button
          type="button"
          onClick={() => onToggleComplete(item.id)}
          className={`mt-0.5 w-4 h-4 rounded border-2 shrink-0 flex items-center justify-center transition-all ${
            item.completed
              ? 'bg-emerald-600 border-emerald-600'
              : 'border-gray-600 hover:border-emerald-500'
          }`}
          aria-label={item.completed ? 'Marcar como pendiente' : 'Marcar como completado'}
        >
          {item.completed && (
            <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          )}
        </button>

        {/* Contenido */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span
              className={`text-sm font-medium ${item.completed ? 'line-through text-gray-500' : 'text-white'}`}
            >
              {item.title}
            </span>
            {item.source === 'system' && (
              <span className="text-xs bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-1.5 py-0.5 rounded-full">
                Recomendado
              </span>
            )}
          </div>

          {item.description && (
            <p className="text-xs text-gray-500 leading-relaxed mb-3">{item.description}</p>
          )}

          {/* Metadata */}
          <div className="flex items-center gap-3 flex-wrap">
            <span
              className={`text-xs px-2 py-0.5 rounded-full border font-medium ${PRIORITY_STYLES[item.priority]}`}
            >
              {PRIORITY_LABELS[item.priority]}
            </span>
            <ScoreDots value={item.impact} label="Impacto" />
            <ScoreDots value={item.effort} label="Esfuerzo" />
          </div>
        </div>

        {/* Acciones */}
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
          <button
            type="button"
            onClick={() => onEdit(item)}
            className="p-1.5 text-gray-600 hover:text-gray-300 hover:bg-gray-800 rounded-lg transition-all"
            aria-label="Editar iniciativa"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => onDelete(item.id)}
            className="p-1.5 text-gray-600 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
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
