'use client'

import type { ImplementationType, InteractionModel } from '@/types/assessment'
import {
  IMPLEMENTATION_TYPES,
  INTERACTION_MODELS,
  type ImplementationTypeInfo,
  type InteractionModelInfo,
} from '@/lib/framework-matrix'

/**
 * Centro horizontal de la columna `index` en una rejilla de `count` columnas
 * iguales, en porcentaje. Con 3 columnas: 16.6%, 50%, 83.3%.
 */
function columnCenter(index: number, count: number) {
  return ((index + 0.5) / count) * 100
}

interface BranchProps {
  count: number
  /** Índices de las ramas que forman parte del camino elegido. */
  activeIndexes: number[]
  /** Clase de color para los tramos activos, p. ej. 'bg-violet-500'. */
  activeColor: string
  /** Desde dónde baja el tronco, en %. El flujo sale del nodo elegido arriba. */
  origin: number
  /** Rótulo del nivel; interrumpe la barra en vez de cruzarla. */
  label: string
}

/** Tronco, barra horizontal y bajada a cada rama. */
function Branch({ count, activeIndexes, activeColor, origin, label }: BranchProps) {
  const first = columnCenter(0, count)
  const last = columnCenter(count - 1, count)

  return (
    <div className="relative h-14" aria-hidden="true">
      {/* Tronco: baja desde el nodo elegido en el nivel anterior */}
      <span
        data-flow-trunk={label}
        className={`absolute top-0 h-1/2 w-px -translate-x-1/2 transition-all ${activeColor}`}
        style={{ left: `${origin}%` }}
      />
      {/* Barra que reparte hacia cada rama */}
      <span
        className="absolute top-1/2 h-px bg-slate-200"
        style={{ left: `${first}%`, right: `${100 - last}%` }}
      />
      {/* El rótulo tapa el centro de la barra con el fondo del panel */}
      <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-50 px-2 text-[10px] font-semibold uppercase tracking-wider text-slate-400 whitespace-nowrap">
        {label}
      </span>
      {Array.from({ length: count }, (_, index) => {
        const isActive = activeIndexes.includes(index)
        return (
          <span
            key={index}
            className={`absolute top-1/2 h-1/2 w-px -translate-x-1/2 transition-colors ${
              isActive ? activeColor : 'bg-slate-200'
            }`}
            style={{ left: `${columnCenter(index, count)}%` }}
          />
        )
      })}
    </div>
  )
}

interface FrameworkFlowchartProps {
  model: InteractionModel
  layers: ImplementationType[]
  onSelectModel: (model: InteractionModel) => void
  onToggleLayer: (layer: ImplementationType) => void
  activeModelInfo: InteractionModelInfo
}

export default function FrameworkFlowchart({
  model,
  layers,
  onSelectModel,
  onToggleLayer,
  activeModelInfo,
}: FrameworkFlowchartProps) {
  const modelIndex = INTERACTION_MODELS.findIndex((m) => m.id === model)
  const layerIndexes = IMPLEMENTATION_TYPES.reduce<number[]>((acc, impl, index) => {
    if (layers.includes(impl.id)) acc.push(index)
    return acc
  }, [])

  return (
    <div className="p-6 sm:p-8">
      {/* Nodo raíz */}
      <div className="flex justify-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-600 shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
          Tu organización
        </span>
      </div>

      <Branch
        count={3}
        activeIndexes={[modelIndex]}
        activeColor="bg-slate-300"
        origin={50}
        label="1 · Interacción"
      />

      <div className="grid grid-cols-3 gap-2">
        {INTERACTION_MODELS.map((option: InteractionModelInfo) => {
          const isActive = option.id === model
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => onSelectModel(option.id)}
              aria-pressed={isActive}
              aria-label={option.name}
              className={`rounded-xl border px-2 py-3 text-center transition-all ${
                isActive
                  ? `bg-white shadow-sm ring-2 ${option.ring}`
                  : 'border-slate-200 bg-white/60 hover:border-slate-300 hover:bg-white'
              }`}
            >
              <span className="block text-lg leading-none mb-1.5">{option.icon}</span>
              <span
                className={`block text-xs font-semibold leading-tight ${
                  isActive ? 'text-slate-900' : 'text-slate-500'
                }`}
              >
                {option.name}
              </span>
            </button>
          )
        })}
      </div>

      <Branch
        count={3}
        activeIndexes={layerIndexes}
        activeColor={activeModelInfo.dot}
        origin={columnCenter(modelIndex, 3)}
        label="2 · Tecnología"
      />

      <div className="grid grid-cols-3 gap-2">
        {IMPLEMENTATION_TYPES.map((impl: ImplementationTypeInfo) => {
          const isActive = layers.includes(impl.id)
          return (
            <button
              key={impl.id}
              type="button"
              onClick={() => onToggleLayer(impl.id)}
              aria-pressed={isActive}
              aria-label={impl.name}
              className={`rounded-xl border px-2 py-3 text-center transition-all ${
                isActive ? impl.activeChip : impl.chip
              }`}
            >
              <span className="block text-lg leading-none mb-1.5">{impl.icon}</span>
              <span className="block text-xs font-semibold leading-tight">{impl.shortName}</span>
            </button>
          )
        })}
      </div>

      <p className="mt-4 text-center text-[11px] text-slate-400">
        Puedes activar varias tecnologías a la vez — la mayoría de organizaciones acaba haciéndolo.
      </p>
    </div>
  )
}
