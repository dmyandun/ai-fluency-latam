'use client'

import { INDUSTRIES } from '@/lib/industries'

interface IndustrySelectorProps {
  value: string
  onChange: (industry: string) => void
}

export default function IndustrySelector({ value, onChange }: IndustrySelectorProps) {
  return (
    <div className="w-full">
      <p className="text-sm font-medium text-slate-700 mb-3">Selecciona tu industria</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {INDUSTRIES.map((industry) => {
          const isSelected = value === industry.id
          return (
            <button
              key={industry.id}
              type="button"
              onClick={() => onChange(industry.id)}
              className={`flex flex-col items-center gap-2 p-4 rounded-xl border text-sm font-medium transition-all ${
                isSelected
                  ? 'bg-blue-600 border-blue-600 text-white shadow-md'
                  : 'bg-white border-slate-200 text-slate-600 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 shadow-sm'
              }`}
            >
              <span className="text-2xl">{industry.icon}</span>
              <span className="text-center leading-tight">{industry.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
