'use client'

import { useState } from 'react'
import type { RoadmapItem, RoadmapPhaseId, RoadmapPriority } from '@/types/assessment'

interface RoadmapItemFormProps {
  phaseId: RoadmapPhaseId
  initialData?: RoadmapItem
  onSubmit: (data: Omit<RoadmapItem, 'id' | 'createdAt' | 'source'>) => void
  onCancel: () => void
}

export default function RoadmapItemForm({
  phaseId,
  initialData,
  onSubmit,
  onCancel,
}: RoadmapItemFormProps) {
  const [title, setTitle] = useState(initialData?.title ?? '')
  const [description, setDescription] = useState(initialData?.description ?? '')
  const [priority, setPriority] = useState<RoadmapPriority>(initialData?.priority ?? 'medium')
  const [impact, setImpact] = useState<1 | 2 | 3 | 4 | 5>(initialData?.impact ?? 3)
  const [effort, setEffort] = useState<1 | 2 | 3 | 4 | 5>(initialData?.effort ?? 3)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!title.trim()) return
    onSubmit({
      phaseId,
      title: title.trim(),
      description: description.trim(),
      priority,
      impact,
      effort,
      completed: initialData?.completed ?? false,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="bg-gray-800 border border-gray-700 rounded-xl p-4 space-y-4 animate-scale-in">
      {/* Título */}
      <div>
        <label className="block text-xs font-medium text-gray-400 mb-1.5">
          Título <span className="text-red-400">*</span>
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Nombre de la iniciativa"
          className="w-full bg-gray-900 border border-gray-700 text-white text-sm rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent placeholder-gray-600"
          autoFocus
          required
        />
      </div>

      {/* Descripción */}
      <div>
        <label className="block text-xs font-medium text-gray-400 mb-1.5">Descripción</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Detalle opcional de la iniciativa"
          rows={2}
          className="w-full bg-gray-900 border border-gray-700 text-white text-sm rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent placeholder-gray-600 resize-none"
        />
      </div>

      {/* Prioridad */}
      <div>
        <label className="block text-xs font-medium text-gray-400 mb-1.5">Prioridad</label>
        <div className="flex gap-2">
          {(['high', 'medium', 'low'] as RoadmapPriority[]).map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setPriority(p)}
              className={`flex-1 text-xs py-1.5 rounded-lg border font-medium transition-all ${
                priority === p
                  ? p === 'high'
                    ? 'bg-amber-500/20 border-amber-500/50 text-amber-400'
                    : p === 'medium'
                    ? 'bg-indigo-500/20 border-indigo-500/50 text-indigo-400'
                    : 'bg-gray-500/20 border-gray-500/50 text-gray-400'
                  : 'bg-gray-900 border-gray-700 text-gray-500 hover:border-gray-600'
              }`}
            >
              {p === 'high' ? 'Alta' : p === 'medium' ? 'Media' : 'Baja'}
            </button>
          ))}
        </div>
      </div>

      {/* Impacto y Esfuerzo */}
      <div className="grid grid-cols-2 gap-4">
        {[
          { label: 'Impacto', value: impact, setter: setImpact },
          { label: 'Esfuerzo', value: effort, setter: setEffort },
        ].map(({ label, value, setter }) => (
          <div key={label}>
            <label className="block text-xs font-medium text-gray-400 mb-1.5">
              {label}: <span className="text-white">{value}/5</span>
            </label>
            <input
              type="range"
              min={1}
              max={5}
              step={1}
              value={value}
              onChange={(e) => setter(Number(e.target.value) as 1 | 2 | 3 | 4 | 5)}
              className="w-full accent-indigo-500"
            />
          </div>
        ))}
      </div>

      {/* Acciones */}
      <div className="flex gap-2 pt-1">
        <button
          type="submit"
          disabled={!title.trim()}
          className="flex-1 bg-indigo-600 hover:bg-indigo-500 disabled:bg-gray-700 disabled:text-gray-500 text-white text-sm font-medium py-2 rounded-lg transition-all"
        >
          {initialData ? 'Guardar cambios' : 'Agregar iniciativa'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-4 border border-gray-700 text-gray-400 hover:text-white text-sm rounded-lg transition-all"
        >
          Cancelar
        </button>
      </div>
    </form>
  )
}
