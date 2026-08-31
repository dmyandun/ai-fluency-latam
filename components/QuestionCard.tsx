'use client'

import type { Question, DimensionKey } from '@/types/assessment'

interface QuestionCardProps {
  question: Question
  currentValue: number | undefined
  onAnswer: (dimension: DimensionKey, value: number) => void
}

const SCALE_VALUES = [1, 2, 3, 4, 5]
const VALUE_LABELS: Record<number, string> = {
  1: 'Muy bajo', 2: 'Bajo', 3: 'Moderado', 4: 'Alto', 5: 'Muy alto',
}

export default function QuestionCard({ question, currentValue, onAnswer }: QuestionCardProps) {
  return (
    <div className="animate-slide-in w-full">
      <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
        <p className="text-xl sm:text-2xl font-semibold text-slate-900 leading-relaxed mb-3">
          {question.text}
        </p>

        {question.helpText && (
          <p className="text-sm text-slate-500 leading-relaxed mb-8 bg-slate-50 rounded-lg px-4 py-3 border border-slate-200">
            💡 {question.helpText}
          </p>
        )}

        {!question.helpText && <div className="mb-8" />}

        <div className="space-y-3">
          <div className="flex justify-between text-xs text-slate-400 px-1">
            <span>{question.scale.minLabel}</span>
            <span>{question.scale.maxLabel}</span>
          </div>

          <div className="flex gap-2 sm:gap-3">
            {SCALE_VALUES.map((val) => {
              const isSelected = currentValue === val
              return (
                <button
                  key={val}
                  type="button"
                  aria-label={`${question.text}: ${val} de 5`}
                  aria-pressed={isSelected}
                  onClick={() => onAnswer(question.dimension, val)}
                  className={`flex-1 flex flex-col items-center gap-1.5 py-3 sm:py-4 rounded-xl border text-sm font-semibold transition-all ${
                    isSelected
                      ? 'bg-blue-600 border-blue-600 text-white shadow-md'
                      : 'bg-white border-slate-200 text-slate-600 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 shadow-sm'
                  }`}
                >
                  <span className="text-base sm:text-lg">{val}</span>
                  <span className="text-xs font-normal hidden sm:block opacity-80">
                    {VALUE_LABELS[val]}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        {currentValue !== undefined && (
          <p className="text-center text-sm text-blue-600 mt-4 animate-fade-in font-medium">
            Seleccionaste: <strong>{VALUE_LABELS[currentValue]}</strong> ({currentValue}/5)
          </p>
        )}
      </div>
    </div>
  )
}
