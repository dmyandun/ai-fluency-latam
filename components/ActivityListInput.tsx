'use client'

import { useState } from 'react'
import type { WorkActivity, ActivityCategory } from '@/types/assessment'

interface ActivityListInputProps {
  activities: WorkActivity[]
  onChange: (activities: WorkActivity[]) => void
}

const MAX_ACTIVITIES = 5

const CATEGORIES: {
  id: ActivityCategory
  label: string
  icon: string
  active: string
  idle: string
  badge: string
}[] = [
  {
    id: 'ai_only',
    label: 'Solo IA',
    icon: '🤖',
    active: 'bg-violet-600 border-violet-600 text-white shadow-sm',
    idle: 'border-slate-200 text-slate-600 hover:border-violet-300 hover:bg-violet-50',
    badge: 'bg-violet-100 text-violet-700',
  },
  {
    id: 'human_ai',
    label: 'Humano + IA',
    icon: '🤝',
    active: 'bg-blue-600 border-blue-600 text-white shadow-sm',
    idle: 'border-slate-200 text-slate-600 hover:border-blue-300 hover:bg-blue-50',
    badge: 'bg-blue-100 text-blue-700',
  },
  {
    id: 'human_only',
    label: 'Solo humano',
    icon: '👤',
    active: 'bg-emerald-600 border-emerald-600 text-white shadow-sm',
    idle: 'border-slate-200 text-slate-600 hover:border-emerald-300 hover:bg-emerald-50',
    badge: 'bg-emerald-100 text-emerald-700',
  },
]

export default function ActivityListInput({ activities, onChange }: ActivityListInputProps) {
  const [draft, setDraft] = useState('')
  const [draftCategory, setDraftCategory] = useState<ActivityCategory | null>(null)
  const isFull = activities.length >= MAX_ACTIVITIES

  function handleAdd() {
    const trimmed = draft.trim()
    if (!trimmed || !draftCategory || isFull) return
    onChange([...activities, { description: trimmed, category: draftCategory }])
    setDraft('')
    setDraftCategory(null)
  }

  function handleRemove(index: number) {
    onChange(activities.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-3">
      {/* Lista de actividades agregadas */}
      {activities.length > 0 && (
        <div className="space-y-2">
          {activities.map((act, i) => {
            const cat = CATEGORIES.find((c) => c.id === act.category)
            return (
              <div key={i} className="flex items-center gap-3 bg-white border border-slate-200 rounded-xl px-3 py-2.5">
                <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 text-xs font-bold flex items-center justify-center shrink-0">
                  {i + 1}
                </span>
                <span className="flex-1 text-sm text-slate-700 leading-snug">{act.description}</span>
                {cat && (
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full shrink-0 whitespace-nowrap ${cat.badge}`}>
                    {cat.icon} {cat.label}
                  </span>
                )}
                <button
                  type="button"
                  onClick={() => handleRemove(i)}
                  className="text-slate-300 hover:text-red-500 shrink-0 transition-colors"
                  aria-label="Eliminar actividad"
                >
                  ✕
                </button>
              </div>
            )
          })}
        </div>
      )}

      {/* Formulario de entrada: texto + tipo de automatización + agregar */}
      {!isFull && (
        <div className="border border-slate-200 rounded-xl p-3 bg-slate-50/60 space-y-2.5">
          <input
            type="text"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAdd() } }}
            placeholder={`Actividad ${activities.length + 1}: describe una tarea o proceso clave…`}
            className="w-full bg-white border border-slate-300 text-slate-900 text-sm rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-slate-400"
          />
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="flex gap-1.5 flex-1">
              {CATEGORIES.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setDraftCategory(c.id)}
                  title={c.label}
                  className={`flex-1 flex items-center justify-center gap-1 py-2 px-1 rounded-lg border text-xs font-semibold transition-all ${
                    draftCategory === c.id ? c.active : `bg-white ${c.idle}`
                  }`}
                >
                  <span>{c.icon}</span>
                  <span className="hidden sm:inline">{c.label}</span>
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={handleAdd}
              disabled={!draft.trim() || !draftCategory}
              className="shrink-0 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-200 disabled:text-slate-400 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-all"
            >
              + Agregar
            </button>
          </div>
          {draft.trim() && !draftCategory && (
            <p className="text-xs text-slate-400">Elige cómo se podría automatizar para agregarla.</p>
          )}
        </div>
      )}

      <p className="text-xs text-slate-400">{activities.length}/{MAX_ACTIVITIES} actividades</p>
    </div>
  )
}
