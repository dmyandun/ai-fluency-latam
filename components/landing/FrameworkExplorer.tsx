'use client'

import { useMemo, useState } from 'react'
import type { ImplementationType, InteractionModel } from '@/types/assessment'
import {
  IMPLEMENTATION_TYPES,
  INTERACTION_MODELS,
  getCombinationNote,
} from '@/lib/framework-matrix'
import FrameworkFlowchart from './FrameworkFlowchart'
import FrameworkIcon from './FrameworkIcon'

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
        {/* Selectores: el recorrido se elige sobre un flujograma con ramas */}
        <div>
          <FrameworkFlowchart
            model={model}
            layers={layers}
            onSelectModel={setModel}
            onToggleLayer={toggleLayer}
            activeModelInfo={activeModel}
          />
        </div>

        {/* Resultado de la combinación */}
        <div className="flex flex-col p-6 sm:p-8">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
            Tu combinación
          </p>
          {/* La key reinicia la animación en cada cambio de modelo. */}
          <h3
            key={combinationTitle}
            className="text-xl sm:text-2xl font-semibold text-slate-900 tracking-tight mb-1.5 animate-fade-up"
          >
            {combinationTitle}
          </h3>
          <p className="text-sm text-slate-500 mb-6">{activeModel.tagline}</p>

          {/*
            Se reserva el alto de las tres capas: quitar una no debe encoger la
            sección ni desplazar lo que hay debajo. Los valores salen de medir
            las tarjetas — envuelven más cuanto más estrecha es la pantalla. Por
            debajo de 480px no se reserva: ahí el hueco sobrante pesaría más que
            el salto, y la lista queda apilada bajo el flujograma.
          */}
          <div className="space-y-3 min-[480px]:min-h-[282px] sm:min-h-[228px]">
            {activeLayers.map((layer, index) => {
              const note = getCombinationNote(model, layer.id)
              return (
                <div
                  key={`${model}-${layer.id}`}
                  className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 animate-fade-up"
                  style={{ animationDelay: `${index * 70}ms` }}
                >
                  <span className={`self-stretch w-1 shrink-0 rounded-full ${layer.bar}`} />
                  <FrameworkIcon name={layer.icon} className={`w-5 h-5 shrink-0 ${layer.accent}`} />
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-slate-800">{layer.name}</p>
                    <p className="text-sm text-slate-600">{note.role}</p>
                  </div>
                </div>
              )
            })}
          </div>

          <p className="mt-6 border-t border-slate-100 pt-4 text-xs text-slate-500">
            El diagnóstico recomienda{' '}
            <strong className="font-semibold text-slate-600">un punto de partida</strong>; el
            roadmap suma las demás capas por fases.
          </p>
        </div>
      </div>
    </div>
  )
}
