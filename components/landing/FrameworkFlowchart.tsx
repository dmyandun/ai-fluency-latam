'use client'

import type { ImplementationType, InteractionModel } from '@/types/assessment'
import {
  IMPLEMENTATION_TYPES,
  INTERACTION_MODELS,
  type ImplementationTypeInfo,
  type InteractionModelInfo,
} from '@/lib/framework-matrix'
import FrameworkIcon from './FrameworkIcon'

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
      {/*
        Barra que reparte hacia cada rama. El rótulo se intercala entre dos
        tramos en lugar de taparla: sobre el degradado del panel ningún color
        sólido casaría con el fondo.
      */}
      <div
        className="absolute top-1/2 flex -translate-y-1/2 items-center"
        style={{ left: `${first}%`, right: `${100 - last}%` }}
      >
        <span className="h-px flex-1 bg-white/15" />
        <span className="px-2 text-[10px] font-semibold uppercase tracking-wider text-slate-400 whitespace-nowrap">
          {label}
        </span>
        <span className="h-px flex-1 bg-white/15" />
      </div>
      {Array.from({ length: count }, (_, index) => {
        const isActive = activeIndexes.includes(index)
        return (
          <span
            key={index}
            className={`absolute top-1/2 h-1/2 w-px -translate-x-1/2 transition-colors ${
              isActive ? activeColor : 'bg-white/15'
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
    <div className="relative h-full overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 p-6 sm:p-8">
      <div className="absolute -top-24 -left-20 w-64 h-64 rounded-full bg-blue-500/20 blur-3xl" />
      <div className="absolute -bottom-24 -right-20 w-64 h-64 rounded-full bg-indigo-500/20 blur-3xl" />

      {/* El panel derecho es más alto: el flujo se centra en vez de colgar arriba */}
      <div className="relative flex h-full flex-col justify-center">
        {/* Nodo raíz */}
        <div className="flex justify-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold text-slate-200 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
            Tu organización
          </span>
        </div>
        {/* La invitación va antes del árbol: se lee cuando aún hay que elegir */}
        <p className="mt-3 text-center text-[11px] text-slate-400">
          Elige un modelo de interacción y una o varias tecnologías
        </p>

        <Branch
          count={3}
          activeIndexes={[modelIndex]}
          activeColor="bg-white/40"
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
                    ? `bg-white/10 ring-2 ${option.ring}`
                    : 'border-white/15 bg-white/5 hover:border-white/30 hover:bg-white/10'
                }`}
              >
                <FrameworkIcon
                  name={option.icon}
                  className={`w-5 h-5 mx-auto mb-2 ${isActive ? option.accent : 'text-slate-500'}`}
                />
                <span
                  className={`block text-xs font-semibold leading-tight ${
                    isActive ? 'text-white' : 'text-slate-400'
                  }`}
                >
                  {option.name}
                </span>
                <span
                  className={`block text-[10px] leading-snug mt-1 ${
                    isActive ? 'text-slate-400' : 'text-slate-500'
                  }`}
                >
                  {option.signal}
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
                {/* El icono hereda el color del chip: acento si está activo, gris si no */}
                <FrameworkIcon name={impl.icon} className="w-5 h-5 mx-auto mb-2" />
                <span className="block text-xs font-semibold leading-tight">{impl.shortName}</span>
                {/* Hereda el color del chip y se apaga para no competir con el nombre */}
                <span className="block text-[10px] leading-snug mt-1 opacity-70">{impl.signal}</span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
