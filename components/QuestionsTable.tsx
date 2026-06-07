'use client'

import type { Question, DimensionKey } from '@/types/assessment'

interface QuestionsTableProps {
  questions: Question[]
  answers: Partial<Record<DimensionKey, number>>
  onAnswer: (dimension: DimensionKey, value: number) => void
}

export default function QuestionsTable({ questions, answers, onAnswer }: QuestionsTableProps) {
  const answeredCount = questions.filter((q) => answers[q.dimension] !== undefined).length

  return (
    <div className="space-y-4">
      {/* Cabecera con progreso */}
      <div className="flex items-center justify-between text-xs text-slate-500 px-1">
        <span>{answeredCount} de {questions.length} respondidas</span>
        <span className="flex gap-3 font-medium">
          <span>Bajo → Alto</span>
        </span>
      </div>

      {/* Tabla de preguntas */}
      <div className="rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        {questions.map((question, idx) => {
          const selected = answers[question.dimension]
          const isAnswered = selected !== undefined

          return (
            <div
              key={question.id}
              className={`px-5 py-4 border-b border-slate-100 last:border-0 transition-colors ${
                isAnswered ? 'bg-blue-50/40' : 'bg-white hover:bg-slate-50'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                {/* Número + pregunta + descripción */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start gap-3">
                    <span className={`shrink-0 w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center mt-0.5 ${
                      isAnswered ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-500'
                    }`}>
                      {isAnswered ? '✓' : idx + 1}
                    </span>
                    <div>
                      <p className="text-sm font-medium text-slate-800 leading-snug">
                        {question.text}
                      </p>
                      {question.helpText && (
                        <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                          {question.helpText}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Selector 1-5 con anclajes de escala alineados a los botones */}
                <div className="flex flex-col gap-1.5 shrink-0 self-start pl-9 sm:pl-0">
                  <div className="flex items-center gap-1.5">
                    {[1, 2, 3, 4, 5].map((val) => (
                      <button
                        key={val}
                        type="button"
                        onClick={() => onAnswer(question.dimension, val)}
                        className={`w-9 h-9 rounded-lg text-sm font-semibold transition-all ${
                          selected === val
                            ? 'bg-blue-600 text-white shadow-md scale-110'
                            : 'bg-white border border-slate-200 text-slate-600 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50'
                        }`}
                      >
                        {val}
                      </button>
                    ))}
                  </div>
                  <div className="flex justify-between gap-2">
                    <span className="max-w-[46%] text-[10px] text-slate-500 leading-tight text-left">
                      <span className="font-semibold text-slate-600">1</span> {question.scale.minLabel}
                    </span>
                    <span className="max-w-[46%] text-[10px] text-slate-500 leading-tight text-right">
                      <span className="font-semibold text-slate-600">5</span> {question.scale.maxLabel}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Indicador de completado */}
      {answeredCount === questions.length && (
        <p className="text-center text-sm text-blue-600 font-medium">
          ✓ Todas las preguntas respondidas — puedes ver tus resultados
        </p>
      )}
    </div>
  )
}
