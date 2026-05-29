'use client'

import type { Question, DimensionKey } from '@/types/assessment'

interface QuestionCardProps {
  question: Question
  currentValue: number | undefined
  onAnswer: (dimension: DimensionKey, value: number) => void
}

const SCALE_VALUES = [1, 2, 3, 4, 5]

const VALUE_LABELS: Record<number, string> = {
  1: 'Muy bajo',
  2: 'Bajo',
  3: 'Moderado',
  4: 'Alto',
  5: 'Muy alto',
}

export default function QuestionCard({ question, currentValue, onAnswer }: QuestionCardProps) {
  return (
    <div className="animate-slide-in w-full">
      <div className="bg-gray-900 border border-gray-700 rounded-2xl p-8">
        <p className="text-xl sm:text-2xl font-medium text-white leading-relaxed mb-3">
          {question.text}
        </p>

        {question.helpText && (
          <p className="text-sm text-gray-400 leading-relaxed mb-8 bg-gray-800/60 rounded-lg px-4 py-3 border border-gray-700/50">
            💡 {question.helpText}
          </p>
        )}

        {!question.helpText && <div className="mb-8" />}

        {/* Escala de respuesta */}
        <div className="space-y-3">
          <div className="flex justify-between text-xs text-gray-500 px-1">
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
                  onClick={() => onAnswer(question.dimension, val)}
                  className={`flex-1 flex flex-col items-center gap-1.5 py-3 sm:py-4 rounded-xl border text-sm font-semibold transition-all ${
                    isSelected
                      ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-500/20'
                      : 'bg-gray-800 border-gray-700 text-gray-400 hover:border-gray-500 hover:text-gray-200 hover:bg-gray-750'
                  }`}
                >
                  <span className="text-base sm:text-lg">{val}</span>
                  <span className="text-xs font-normal hidden sm:block text-inherit opacity-70">
                    {VALUE_LABELS[val]}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        {currentValue !== undefined && (
          <p className="text-center text-sm text-indigo-400 mt-4 animate-fade-in">
            Seleccionaste: <strong>{VALUE_LABELS[currentValue]}</strong> ({currentValue}/5)
          </p>
        )}
      </div>
    </div>
  )
}
