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
  description: string
  signals: string[]
  dot: string
  chip: string
  /** Anillo del nodo activo, sobre la superficie oscura del flujograma. */
  ring: string
  /** Color del icono cuando el nodo está elegido. */
  accent: string
}

export interface ImplementationTypeInfo {
  id: ImplementationType
  name: string
  shortName: string
  icon: FrameworkIconName
  description: string
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
    description:
      'Para tareas repetitivas, basadas en reglas, de alto volumen y con criterio humano acotado.',
    signals: ['Alto volumen transaccional', 'Reglas estables', 'Decisiones de baja complejidad'],
    dot: 'bg-indigo-500',
    chip: 'border-indigo-200 bg-indigo-50 text-indigo-700',
    ring: 'border-indigo-400/70 ring-indigo-400/30',
    accent: 'text-indigo-300',
  },
  {
    id: 'agency',
    name: 'Agencia',
    icon: 'agency',
    tagline: 'La IA planifica y actúa con límites',
    description:
      'Agentes que razonan, usan herramientas, se conectan a tus sistemas y ejecutan acciones semi-autónomas.',
    signals: ['Integración con sistemas', 'Procesos multi-paso', 'Ejecución autónoma acotada'],
    dot: 'bg-violet-500',
    chip: 'border-violet-200 bg-violet-50 text-violet-700',
    ring: 'border-violet-400/70 ring-violet-400/30',
    accent: 'text-violet-300',
  },
  {
    id: 'augmentation',
    name: 'Aumentación',
    icon: 'augmentation',
    tagline: 'El experto decide mejor y más rápido',
    description:
      'IA que potencia el criterio humano, la creatividad y el análisis en decisiones complejas y poco repetitivas.',
    signals: ['Criterio experto alto', 'Trabajo creativo', 'Casos poco estandarizados'],
    dot: 'bg-cyan-500',
    chip: 'border-cyan-200 bg-cyan-50 text-cyan-700',
    ring: 'border-cyan-400/70 ring-cyan-400/30',
    accent: 'text-cyan-300',
  },
]

export const IMPLEMENTATION_TYPES: ImplementationTypeInfo[] = [
  {
    id: 'localGenAI',
    name: 'IA Generativa Local',
    shortName: 'Local',
    icon: 'localGenAI',
    description: 'Modelos en tu propia infraestructura. Control total sobre los datos.',
    chip: 'border-white/15 bg-white/5 text-slate-300 hover:border-emerald-400/50 hover:bg-white/10',
    activeChip: 'border-emerald-400/70 bg-emerald-500/15 text-emerald-200 ring-2 ring-emerald-400/30',
    bar: 'bg-emerald-500',
    accent: 'text-emerald-600',
  },
  {
    id: 'apiGenAI',
    name: 'IA Generativa vía API',
    shortName: 'API',
    icon: 'apiGenAI',
    description: 'Los modelos más avanzados, sin infraestructura propia ni costo inicial alto.',
    chip: 'border-white/15 bg-white/5 text-slate-300 hover:border-amber-400/50 hover:bg-white/10',
    activeChip: 'border-amber-400/70 bg-amber-500/15 text-amber-200 ring-2 ring-amber-400/30',
    bar: 'bg-amber-500',
    accent: 'text-amber-600',
  },
  {
    id: 'traditionalML',
    name: 'IA Tradicional / ML',
    shortName: 'ML',
    icon: 'traditionalML',
    description: 'Predicción, scoring y clasificación sobre datos estructurados propios.',
    chip: 'border-white/15 bg-white/5 text-slate-300 hover:border-blue-400/50 hover:bg-white/10',
    activeChip: 'border-blue-400/70 bg-blue-500/15 text-blue-200 ring-2 ring-blue-400/30',
    bar: 'bg-blue-500',
    accent: 'text-blue-600',
  },
]

interface CombinationNote {
  role: string
  example: string
}

/** Qué aporta cada capa técnica a cada modelo de interacción. */
export const COMBINATION_NOTES: Record<string, CombinationNote> = {
  automation_localGenAI: {
    role: 'Automatiza sin sacar de casa la información crítica.',
    example: 'Clasificar documentos internos y extraer datos de formularios sensibles.',
  },
  automation_apiGenAI: {
    role: 'Pone en marcha flujos automáticos en semanas, no en trimestres.',
    example: 'Responder consultas frecuentes y redactar reportes rutinarios.',
  },
  automation_traditionalML: {
    role: 'Decide de forma predecible y auditable sobre datos estructurados.',
    example: 'Reglas de scoring y detección de anomalías en operaciones de alto volumen.',
  },
  agency_localGenAI: {
    role: 'Permite que el agente toque sistemas internos sin salir de tu red.',
    example: 'Agentes que consultan bases reguladas y ejecutan acciones acotadas.',
  },
  agency_apiGenAI: {
    role: 'Da al agente el mejor razonamiento disponible para planificar y usar herramientas.',
    example: 'Orquestar varios pasos y proveedores hasta cerrar una tarea completa.',
  },
  agency_traditionalML: {
    role: 'Ancla las decisiones del agente en predicciones propias, no en intuición.',
    example: 'El agente actúa según el score de un modelo entrenado con tu histórico.',
  },
  augmentation_localGenAI: {
    role: 'Acompaña al experto en contextos donde el dato no puede salir.',
    example: 'Copiloto sobre historiales clínicos o expedientes legales.',
  },
  augmentation_apiGenAI: {
    role: 'Amplía el alcance creativo y analítico de tus mejores profesionales.',
    example: 'Explorar alternativas, redactar y contrastar hipótesis a mayor velocidad.',
  },
  augmentation_traditionalML: {
    role: 'Aporta señales cuantitativas que el experto integra en su criterio.',
    example: 'Predicciones y clasificaciones que enriquecen una decisión compleja.',
  },
}

export function getCombinationNote(
  model: InteractionModel,
  implementation: ImplementationType
): CombinationNote {
  return COMBINATION_NOTES[`${model}_${implementation}`]
}
