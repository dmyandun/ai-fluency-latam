'use client'

import type { WorkActivity, ActivityCategory } from '@/types/assessment'

interface ActivityClassifierProps {
  activities: WorkActivity[]
  onChange: (activities: WorkActivity[]) => void
}

const CATEGORIES: { id: ActivityCategory; label: string; sublabel: string; icon: string; style: string; activeStyle: string }[] = [
  {
    id: 'ai_only',
    label: 'Solo IA',
    sublabel: 'La IA lo puede hacer sola',
    icon: '🤖',
    style: 'border-slate-200 text-slate-600 hover:border-violet-300 hover:bg-violet-50',
    activeStyle: 'bg-violet-600 border-violet-600 text-white shadow-md',
  },
  {
    id: 'human_ai',
    label: 'Humano + IA',
    sublabel: 'Mejor hacerlo juntos',
    icon: '🤝',
    style: 'border-slate-200 text-slate-600 hover:border-blue-300 hover:bg-blue-50',
    activeStyle: 'bg-blue-600 border-blue-600 text-white shadow-md',
  },
  {
    id: 'human_only',
    label: 'Solo humano',
    sublabel: 'Requiere criterio humano',
    icon: '👤',
    style: 'border-slate-200 text-slate-600 hover:border-emerald-300 hover:bg-emerald-50',
    activeStyle: 'bg-emerald-600 border-emerald-600 text-white shadow-md',
  },
]

export default function ActivityClassifier({ activities, onChange }: ActivityClassifierProps) {
  function setCategory(index: number, category: ActivityCategory) {
    onChange(
      activities.map((act, i) => i === index ? { ...act, category } : act)
    )
  }

  return (
    <div className="w-full space-y-6">
      {activities.map((act, i) => (
        <div key={i} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
          {/* Actividad */}
          <div className="flex items-start gap-3 mb-4">
            <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
              {i + 1}
            </span>
            <p className="text-sm font-medium text-slate-800 leading-relaxed">{act.description}</p>
          </div>

          {/* Opciones de clasificación */}
          <div className="grid grid-cols-3 gap-2">
            {CATEGORIES.map((cat) => {
              const isSelected = act.category === cat.id
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setCategory(i, cat.id)}
                  className={`flex flex-col items-center gap-1.5 py-3 px-2 rounded-xl border text-center transition-all ${
                    isSelected ? cat.activeStyle : `bg-white ${cat.style}`
                  }`}
                >
                  <span className="text-xl">{cat.icon}</span>
                  <span className="text-xs font-semibold leading-tight">{cat.label}</span>
                  <span className={`text-xs leading-tight hidden sm:block ${isSelected ? 'opacity-80' : 'text-slate-400'}`}>
                    {cat.sublabel}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}
