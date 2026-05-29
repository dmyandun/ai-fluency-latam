'use client'

import { INDUSTRIES } from '@/lib/industries'

interface IndustrySelectorProps {
  value: string
  onChange: (industry: string) => void
}

export default function IndustrySelector({ value, onChange }: IndustrySelectorProps) {
  return (
    <div className="w-full">
      <p className="text-sm font-medium text-gray-300 mb-3">Selecciona tu industria</p>
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
                  ? 'bg-indigo-500/15 border-indigo-500/60 text-indigo-300 glow-brand'
                  : 'bg-gray-900 border-gray-700 text-gray-400 hover:border-gray-500 hover:text-gray-200 hover:bg-gray-800'
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
