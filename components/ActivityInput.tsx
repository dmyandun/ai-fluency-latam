'use client'

import { useState } from 'react'
import type { WorkActivity } from '@/types/assessment'

interface ActivityInputProps {
  activities: WorkActivity[]
  onChange: (activities: WorkActivity[]) => void
}

const MAX_ACTIVITIES = 5

export default function ActivityInput({ activities, onChange }: ActivityInputProps) {
  const [draft, setDraft] = useState('')

  function handleAdd() {
    const trimmed = draft.trim()
    if (!trimmed || activities.length >= MAX_ACTIVITIES) return
    onChange([...activities, { description: trimmed, category: null }])
    setDraft('')
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') { e.preventDefault(); handleAdd() }
  }

  function handleRemove(index: number) {
    onChange(activities.filter((_, i) => i !== index))
  }

  return (
    <div className="w-full space-y-4">
      {/* Lista de actividades ingresadas */}
      {activities.length > 0 && (
        <ol className="space-y-2">
          {activities.map((act, i) => (
            <li
              key={i}
              className="flex items-center gap-3 bg-white border border-slate-200 rounded-xl px-4 py-3 shadow-sm group"
            >
              <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-xs font-bold flex items-center justify-center shrink-0">
                {i + 1}
              </span>
              <span className="flex-1 text-sm text-slate-700">{act.description}</span>
              <button
                type="button"
                onClick={() => handleRemove(i)}
                className="text-slate-300 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
                aria-label="Eliminar actividad"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </li>
          ))}
        </ol>
      )}

      {/* Input para nueva actividad */}
      {activities.length < MAX_ACTIVITIES && (
        <div className="flex gap-2">
          <input
            type="text"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={
              activities.length === 0
                ? 'Ej: Revisar y responder correos electrónicos...'
                : `Actividad ${activities.length + 1} de ${MAX_ACTIVITIES}...`
            }
            className="flex-1 bg-white border border-slate-300 text-slate-900 text-sm rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-slate-400 shadow-sm"
            autoFocus={activities.length === 0}
          />
          <button
            type="button"
            onClick={handleAdd}
            disabled={!draft.trim()}
            className="px-4 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-200 disabled:text-slate-400 text-white font-medium text-sm rounded-xl transition-all shadow-sm"
          >
            + Agregar
          </button>
        </div>
      )}

      {/* Contador */}
      <p className="text-xs text-slate-400 text-right">
        {activities.length}/{MAX_ACTIVITIES} actividades
        {activities.length === MAX_ACTIVITIES && (
          <span className="ml-2 text-emerald-600 font-medium">✓ Completo</span>
        )}
      </p>
    </div>
  )
}
