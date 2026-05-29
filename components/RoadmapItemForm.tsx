'use client'

import { useState } from 'react'
import type { RoadmapItem, RoadmapPhaseId, RoadmapPriority } from '@/types/assessment'

interface RoadmapItemFormProps {
  phaseId: RoadmapPhaseId
  initialData?: RoadmapItem
  onSubmit: (data: Omit<RoadmapItem, 'id' | 'createdAt' | 'source'>) => void
  onCancel: () => void
}

export default function RoadmapItemForm({ phaseId, initialData, onSubmit, onCancel }: RoadmapItemFormProps) {
  const [title, setTitle]           = useState(initialData?.title ?? '')
  const [description, setDescription] = useState(initialData?.description ?? '')
  const [priority, setPriority]     = useState<RoadmapPriority>(initialData?.priority ?? 'medium')
  const [impact, setImpact]         = useState<1|2|3|4|5>(initialData?.impact ?? 3)
  const [effort, setEffort]         = useState<1|2|3|4|5>(initialData?.effort ?? 3)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!title.trim()) return
    onSubmit({ phaseId, title: title.trim(), description: description.trim(), priority, impact, effort, completed: initialData?.completed ?? false })
  }

  return (
    <form onSubmit={handleSubmit} className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-4 animate-scale-in">
      <div>
        <label className="block text-xs font-medium text-slate-600 mb-1.5">
          Título <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Nombre de la iniciativa"
          className="w-full bg-white border border-slate-300 text-slate-900 text-sm rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-slate-400 shadow-sm"
          autoFocus
          required
        />
      </div>

      <div>
        <label className="block text-xs font-medium text-slate-600 mb-1.5">Descripción</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Detalle opcional de la iniciativa"
          rows={2}
          className="w-full bg-white border border-slate-300 text-slate-900 text-sm rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-slate-400 resize-none shadow-sm"
        />
      </div>

      <div>
        <label className="block text-xs font-medium text-slate-600 mb-1.5">Prioridad</label>
        <div className="flex gap-2">
          {(['high', 'medium', 'low'] as RoadmapPriority[]).map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setPriority(p)}
              className={`flex-1 text-xs py-1.5 rounded-lg border font-medium transition-all ${
                priority === p
                  ? p === 'high'   ? 'bg-amber-100 border-amber-300 text-amber-700'
                  : p === 'medium' ? 'bg-blue-100 border-blue-300 text-blue-700'
                  :                  'bg-slate-200 border-slate-300 text-slate-700'
                  : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300'
              }`}
            >
              {p === 'high' ? 'Alta' : p === 'medium' ? 'Media' : 'Baja'}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {[
          { label: 'Impacto', value: impact, setter: setImpact },
          { label: 'Esfuerzo', value: effort, setter: setEffort },
        ].map(({ label, value, setter }) => (
          <div key={label}>
            <label className="block text-xs font-medium text-slate-600 mb-1.5">
              {label}: <span className="text-slate-900">{value}/5</span>
            </label>
            <input
              type="range" min={1} max={5} step={1} value={value}
              onChange={(e) => setter(Number(e.target.value) as 1|2|3|4|5)}
              className="w-full accent-blue-600"
            />
          </div>
        ))}
      </div>

      <div className="flex gap-2 pt-1">
        <button
          type="submit"
          disabled={!title.trim()}
          className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-200 disabled:text-slate-400 text-white text-sm font-medium py-2 rounded-lg transition-all shadow-sm"
        >
          {initialData ? 'Guardar cambios' : 'Agregar iniciativa'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-4 bg-white border border-slate-200 text-slate-600 hover:text-slate-900 text-sm rounded-lg transition-all shadow-sm"
        >
          Cancelar
        </button>
      </div>
    </form>
  )
}
