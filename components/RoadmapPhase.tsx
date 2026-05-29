'use client'

import { useState } from 'react'
import type { RoadmapItem, RoadmapPhaseConfig, RoadmapPhaseId } from '@/types/assessment'
import RoadmapItemCard from './RoadmapItemCard'
import RoadmapItemForm from './RoadmapItemForm'

interface RoadmapPhaseProps {
  phase: RoadmapPhaseConfig
  items: RoadmapItem[]
  onAddItem: (phaseId: RoadmapPhaseId, data: Omit<RoadmapItem, 'id' | 'createdAt' | 'source'>) => void
  onToggleComplete: (id: string) => void
  onEdit: (item: RoadmapItem) => void
  onDelete: (id: string) => void
}

export default function RoadmapPhase({ phase, items, onAddItem, onToggleComplete, onEdit, onDelete }: RoadmapPhaseProps) {
  const [showForm, setShowForm] = useState(false)
  const completed = items.filter((i) => i.completed).length
  const progress  = items.length > 0 ? Math.round((completed / items.length) * 100) : 0

  return (
    <div className="min-w-[280px] w-72 flex-shrink-0 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col shadow-sm">
      <div className="px-4 py-4 border-b border-slate-200 bg-white rounded-t-2xl">
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-sm font-semibold text-slate-900">{phase.label}</h3>
          <span className="text-xs text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full border border-slate-200">
            {items.length}
          </span>
        </div>
        <p className="text-xs text-slate-400 mb-2">{phase.description}</p>
        {items.length > 0 && (
          <div className="flex items-center gap-2">
            <div className="flex-1 h-1 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-xs text-slate-400 tabular-nums">{progress}%</span>
          </div>
        )}
      </div>

      <div className="flex-1 p-3 space-y-2 overflow-y-auto max-h-[500px]">
        {items.map((item) => (
          <RoadmapItemCard
            key={item.id}
            item={item}
            onToggleComplete={onToggleComplete}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
        {showForm && (
          <RoadmapItemForm
            phaseId={phase.id}
            onSubmit={(data) => { onAddItem(phase.id, data); setShowForm(false) }}
            onCancel={() => setShowForm(false)}
          />
        )}
      </div>

      {!showForm && (
        <div className="p-3 border-t border-slate-200">
          <button
            type="button"
            onClick={() => setShowForm(true)}
            className="w-full text-xs text-slate-400 hover:text-blue-600 border border-dashed border-slate-300 hover:border-blue-300 hover:bg-blue-50 py-2 rounded-lg transition-all flex items-center justify-center gap-1.5"
          >
            <span>+</span> Agregar iniciativa
          </button>
        </div>
      )}
    </div>
  )
}
