import type { ImplementationType, InteractionModel } from '@/types/assessment'

/**
 * Contenido de la matriz interactiva del marco teórico en la landing.
 *
 * El diagnóstico recomienda un par modelo × implementación (ver lib/recommendations.ts),
 * pero una organización real suele apoyar un mismo modelo sobre varias capas técnicas.
 * Por eso aquí el aporte se describe por par y se ensambla en tiempo de render: nueve
 * fragmentos cubren las 21 combinaciones posibles sin duplicar texto.
 */

/** Iconos monocromos del explorador. Los dibuja `FrameworkIcon`. */
export type FrameworkIconName =
  | InteractionModel
  | ImplementationType

export interface InteractionModelInfo {
  id: InteractionModel
  name: string
  icon: FrameworkIconName
  tagline: string
  /** Cuándo encaja. Se lee dentro del nodo, antes de elegirlo. */
  signal: string
  dot: string
  /** Anillo del nodo activo, sobre la superficie oscura del flujograma. */
  ring: string
  /** Color del icono cuando el nodo está elegido. */
  accent: string
}

export interface ImplementationTypeInfo {
  id: ImplementationType
  name: string
  shortName: string
  /** Cuándo encaja. Se lee dentro del nodo, antes de elegirlo. */
  signal: string
  icon: FrameworkIconName
  chip: string
  activeChip: string
  bar: string
  /** Color del icono en el panel claro de la explicación. */
  accent: string
}

export const INTERACTION_MODELS: InteractionModelInfo[] = [
  {
    id: 'automation',
    name: 'Automatización',
    icon: 'automation',
    tagline: 'La máquina ejecuta, tú supervisas',
    signal: 'Alto volumen, reglas estables',
    dot: 'bg-indigo-500',
    ring: 'border-indigo-400/70 ring-indigo-400/30',
    accent: 'text-indigo-300',
  },
  {
    id: 'agency',
    name: 'Agencia',
    icon: 'agency',
    tagline: 'La IA planifica y actúa con límites',
    signal: 'Procesos multi-paso',
    dot: 'bg-violet-500',
    ring: 'border-violet-400/70 ring-violet-400/30',
    accent: 'text-violet-300',
  },
  {
    id: 'augmentation',
    name: 'Aumentación',
    icon: 'augmentation',
    tagline: 'El experto decide mejor y más rápido',
    signal: 'Criterio experto alto',
    dot: 'bg-cyan-500',
    ring: 'border-cyan-400/70 ring-cyan-400/30',
    accent: 'text-cyan-300',
  },
]

export const IMPLEMENTATION_TYPES: ImplementationTypeInfo[] = [
  {
    id: 'localGenAI',
    name: 'IA Generativa Local',
    shortName: 'Local',
    signal: 'Datos que no salen',
    icon: 'localGenAI',
    chip: 'border-white/15 bg-white/5 text-slate-300 hover:border-emerald-400/50 hover:bg-white/10',
    activeChip: 'border-emerald-400/70 bg-emerald-500/15 text-emerald-200 ring-2 ring-emerald-400/30',
    bar: 'bg-emerald-500',
    accent: 'text-emerald-600',
  },
  {
    id: 'apiGenAI',
    name: 'IA Generativa vía API',
    shortName: 'API',
    signal: 'Arranque en semanas',
    icon: 'apiGenAI',
    chip: 'border-white/15 bg-white/5 text-slate-300 hover:border-amber-400/50 hover:bg-white/10',
    activeChip: 'border-amber-400/70 bg-amber-500/15 text-amber-200 ring-2 ring-amber-400/30',
    bar: 'bg-amber-500',
    accent: 'text-amber-600',
  },
  {
    id: 'traditionalML',
    name: 'IA Tradicional / ML',
    shortName: 'ML',
    signal: 'Predicción sobre tu histórico',
    icon: 'traditionalML',
    chip: 'border-white/15 bg-white/5 text-slate-300 hover:border-blue-400/50 hover:bg-white/10',
    activeChip: 'border-blue-400/70 bg-blue-500/15 text-blue-200 ring-2 ring-blue-400/30',
    bar: 'bg-blue-500',
    accent: 'text-blue-600',
  },
]

interface CombinationNote {
  role: string
}

/** Qué aporta cada capa técnica a cada modelo de interacción. */
export const COMBINATION_NOTES: Record<string, CombinationNote> = {
  automation_localGenAI: {
    role: 'Automatiza sin sacar de casa el dato crítico.',
  },
  automation_apiGenAI: {
    role: 'Pone flujos automáticos en marcha en semanas.',
  },
  automation_traditionalML: {
    role: 'Decide de forma predecible y auditable.',
  },
  agency_localGenAI: {
    role: 'El agente toca sistemas internos sin salir de tu red.',
  },
  agency_apiGenAI: {
    role: 'Le da al agente el mejor razonamiento disponible.',
  },
  agency_traditionalML: {
    role: 'Ancla al agente en predicciones propias.',
  },
  augmentation_localGenAI: {
    role: 'Acompaña al experto donde el dato no puede salir.',
  },
  augmentation_apiGenAI: {
    role: 'Amplía el alcance creativo y analítico del equipo.',
  },
  augmentation_traditionalML: {
    role: 'Aporta señales cuantitativas al criterio experto.',
  },
}

export function getCombinationNote(
  model: InteractionModel,
  implementation: ImplementationType
): CombinationNote {
  return COMBINATION_NOTES[`${model}_${implementation}`]
}
