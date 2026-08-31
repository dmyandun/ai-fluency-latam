'use client'

import { useMemo, useState } from 'react'
import type { ImplementationType, InteractionModel } from '@/types/assessment'
import {
  IMPLEMENTATION_TYPES,
  INTERACTION_MODELS,
  getCombinationNote,
} from '@/lib/framework-matrix'

export default function FrameworkExplorer() {
  const [model, setModel] = useState<InteractionModel>('augmentation')
  const [layers, setLayers] = useState<ImplementationType[]>(['apiGenAI', 'localGenAI'])

  const activeModel = INTERACTION_MODELS.find((m) => m.id === model)!
  const activeLayers = useMemo(
    () => IMPLEMENTATION_TYPES.filter((impl) => layers.includes(impl.id)),
    [layers]
  )

  /** Siempre queda al menos una capa: una combinación vacía no explica nada. */
  function toggleLayer(id: ImplementationType) {
    setLayers((current) =>
      current.includes(id)
        ? current.length > 1
          ? current.filter((layer) => layer !== id)
          : current
        : [...current, id]
    )
  }

  const combinationTitle = [
    activeModel.name,
    ...activeLayers.map((layer) => layer.shortName),
  ].join(' + ')

  return (
    <div className="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      <div className="grid lg:grid-cols-[1fr_1.15fr]">
        {/* Selectores */}
        <div className="p-6 sm:p-8 border-b lg:border-b-0 lg:border-r border-slate-200 bg-slate-50/60">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
            1 · Cómo trabaja tu gente con la IA
          </p>
          <div className="space-y-2.5 mb-8">
            {INTERACTION_MODELS.map((option) => {
              const isActive = option.id === model
              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setModel(option.id)}
                  aria-pressed={isActive}
                  className={`w-full text-left rounded-xl border p-4 transition-all ${
                    isActive
                      ? `bg-white shadow-sm ring-2 ${option.ring}`
                      : 'border-slate-200 bg-white/70 hover:border-slate-300'
                  }`}
                >
                  <span className="flex items-center gap-2.5 mb-1">
                    <span className={`w-2 h-2 rounded-full ${option.dot}`} />
                    <span className="text-sm font-semibold text-slate-900">{option.name}</span>
                  </span>
                  <span className="block text-xs text-slate-500 leading-relaxed pl-[18px]">
                    {option.tagline}
                  </span>
                </button>
              )
            })}
          </div>

          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
            2 · Sobre qué tecnología se apoya
          </p>
          <p className="text-xs text-slate-500 mb-3">
            Puedes combinar varias — la mayoría de organizaciones acaban haciéndolo.
          </p>
          <div className="flex flex-wrap gap-2">
            {IMPLEMENTATION_TYPES.map((impl) => {
              const isActive = layers.includes(impl.id)
              return (
                <button
                  key={impl.id}
                  type="button"
                  onClick={() => toggleLayer(impl.id)}
                  aria-pressed={isActive}
                  className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-xs font-semibold transition-all ${
                    isActive ? impl.activeChip : impl.chip
                  }`}
                >
                  <span>{impl.icon}</span>
                  {impl.name}
                </button>
              )
            })}
          </div>
        </div>

        {/* Resultado de la combinación */}
        <div className="p-6 sm:p-8">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
            Tu combinación
          </p>
          {/* La key reinicia la animación en cada cambio de modelo. */}
          <h3
            key={combinationTitle}
            className="text-xl sm:text-2xl font-semibold text-slate-900 tracking-tight mb-2 animate-fade-up"
          >
            {combinationTitle}
          </h3>
          <p className="text-sm text-slate-600 leading-relaxed mb-6">{activeModel.description}</p>

          <div className="space-y-3">
            {activeLayers.map((layer, index) => {
              const note = getCombinationNote(model, layer.id)
              return (
                <div
                  key={`${model}-${layer.id}`}
                  className="flex gap-3 rounded-xl border border-slate-200 bg-slate-50/70 p-4 animate-fade-up"
                  style={{ animationDelay: `${index * 70}ms` }}
                >
                  <span className={`w-1 shrink-0 rounded-full ${layer.bar}`} />
                  <div>
                    <p className="text-sm font-semibold text-slate-800 mb-1">
                      {layer.icon} {layer.name}
                    </p>
                    <p className="text-sm text-slate-600 leading-relaxed">{note.role}</p>
                    <p className="text-xs text-slate-400 leading-relaxed mt-1.5">{note.example}</p>
                  </div>
                </div>
              )
            })}
          </div>

          <p className="mt-6 border-t border-slate-100 pt-4 text-xs text-slate-500 leading-relaxed">
            El diagnóstico no te obliga a elegir todo de golpe: recomienda{' '}
            <strong className="font-semibold text-slate-600">un punto de partida</strong> — un
            modelo y una tecnología — y el roadmap incorpora las demás capas por fases.
          </p>
        </div>
      </div>
    </div>
  )
}
