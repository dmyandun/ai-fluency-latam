'use client'

import { useState, useEffect, useCallback } from 'react'
import type { Roadmap, RoadmapItem, RoadmapPhaseId } from '@/types/assessment'
import { ROADMAP_PHASES, saveRoadmap } from '@/lib/roadmap'
import RoadmapPhase from './RoadmapPhase'
import RoadmapItemForm from './RoadmapItemForm'

interface RoadmapBoardProps {
  roadmap: Roadmap
  onUpdateRoadmap: (updated: Roadmap) => void
}

export default function RoadmapBoard({ roadmap, onUpdateRoadmap }: RoadmapBoardProps) {
  const [editingItem, setEditingItem] = useState<RoadmapItem | null>(null)

  // Persist every time roadmap changes
  useEffect(() => {
    saveRoadmap(roadmap)
  }, [roadmap])

  const update = useCallback(
    (newItems: RoadmapItem[]) => {
      onUpdateRoadmap({ ...roadmap, items: newItems })
    },
    [roadmap, onUpdateRoadmap]
  )

  function handleAddItem(
    phaseId: RoadmapPhaseId,
    data: Omit<RoadmapItem, 'id' | 'createdAt' | 'source'>
  ) {
    const newItem: RoadmapItem = {
      ...data,
      id: crypto.randomUUID(),
      source: 'user',
      createdAt: new Date().toISOString(),
    }
    update([...roadmap.items, newItem])
  }

  function handleToggleComplete(id: string) {
    update(
      roadmap.items.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    )
  }

  function handleEditSubmit(data: Omit<RoadmapItem, 'id' | 'createdAt' | 'source'>) {
    if (!editingItem) return
    update(
      roadmap.items.map((item) =>
        item.id === editingItem.id ? { ...item, ...data } : item
      )
    )
    setEditingItem(null)
  }

  function handleDelete(id: string) {
    update(roadmap.items.filter((item) => item.id !== id))
  }

  const completedTotal = roadmap.items.filter((i) => i.completed).length
  const totalItems = roadmap.items.length

  return (
    <div>
      {/* Resumen del roadmap */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <div>
          <h2 className="text-xl font-semibold text-white">Roadmap de adopción</h2>
          <p className="text-sm text-gray-400 mt-0.5">
            {completedTotal} de {totalItems} iniciativas completadas
          </p>
        </div>
        <div className="flex-1 max-w-xs hidden sm:block">
          <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-500 rounded-full transition-all duration-700"
              style={{ width: totalItems > 0 ? `${Math.round((completedTotal / totalItems) * 100)}%` : '0%' }}
            />
          </div>
        </div>
        <div className="flex gap-3 text-xs text-gray-500">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 bg-indigo-500 rounded-full" />
            Recomendado por el sistema
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 bg-gray-600 rounded-full" />
            Agregado por ti
          </span>
        </div>
      </div>

      {/* Board de fases */}
      <div className="overflow-x-auto pb-4">
        <div className="flex gap-4" style={{ minWidth: 'max-content' }}>
          {ROADMAP_PHASES.map((phase) => {
            const phaseItems = roadmap.items.filter((item) => item.phaseId === phase.id)
            return (
              <RoadmapPhase
                key={phase.id}
                phase={phase}
                items={phaseItems}
                onAddItem={handleAddItem}
                onToggleComplete={handleToggleComplete}
                onEdit={setEditingItem}
                onDelete={handleDelete}
              />
            )
          })}
        </div>
      </div>

      {/* Modal de edición */}
      {editingItem && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 border border-gray-700 rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <h3 className="text-base font-semibold text-white mb-4">Editar iniciativa</h3>
            <RoadmapItemForm
              phaseId={editingItem.phaseId}
              initialData={editingItem}
              onSubmit={handleEditSubmit}
              onCancel={() => setEditingItem(null)}
            />
          </div>
        </div>
      )}
    </div>
  )
}
