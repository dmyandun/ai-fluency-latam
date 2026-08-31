import type { ImplementationType, InteractionModel } from '@/types/assessment'

/**
 * Contenido de la matriz interactiva del marco teórico en la landing.
 *
 * El diagnóstico recomienda un par modelo × implementación (ver lib/recommendations.ts),
 * pero una organización real suele apoyar un mismo modelo sobre varias capas técnicas.
 * Por eso aquí el aporte se describe por par y se ensambla en tiempo de render: nueve
 * fragmentos cubren las 21 combinaciones posibles sin duplicar texto.
 */

export interface InteractionModelInfo {
  id: InteractionModel
  name: string
  icon: string
  tagline: string
  description: string
  signals: string[]
  dot: string
  chip: string
  ring: string
}

export interface ImplementationTypeInfo {
  id: ImplementationType
  name: string
  shortName: string
  icon: string
  description: string
  chip: string
  activeChip: string
  bar: string
}

export const INTERACTION_MODELS: InteractionModelInfo[] = [
  {
    id: 'automation',
    name: 'Automatización',
    icon: '⚙️',
    tagline: 'La máquina ejecuta, tú supervisas',
    description:
      'Para tareas repetitivas, basadas en reglas, de alto volumen y con criterio humano acotado.',
    signals: ['Alto volumen transaccional', 'Reglas estables', 'Decisiones de baja complejidad'],
    dot: 'bg-indigo-500',
    chip: 'border-indigo-200 bg-indigo-50 text-indigo-700',
    ring: 'border-indigo-400 ring-indigo-100',
  },
  {
    id: 'agency',
    name: 'Agencia',
    icon: '🤖',
    tagline: 'La IA planifica y actúa con límites',
    description:
      'Agentes que razonan, usan herramientas, se conectan a tus sistemas y ejecutan acciones semi-autónomas.',
    signals: ['Integración con sistemas', 'Procesos multi-paso', 'Ejecución autónoma acotada'],
    dot: 'bg-violet-500',
    chip: 'border-violet-200 bg-violet-50 text-violet-700',
    ring: 'border-violet-400 ring-violet-100',
  },
  {
    id: 'augmentation',
    name: 'Aumentación',
    icon: '🧠',
    tagline: 'El experto decide mejor y más rápido',
    description:
      'IA que potencia el criterio humano, la creatividad y el análisis en decisiones complejas y poco repetitivas.',
    signals: ['Criterio experto alto', 'Trabajo creativo', 'Casos poco estandarizados'],
    dot: 'bg-cyan-500',
    chip: 'border-cyan-200 bg-cyan-50 text-cyan-700',
    ring: 'border-cyan-400 ring-cyan-100',
  },
]

export const IMPLEMENTATION_TYPES: ImplementationTypeInfo[] = [
  {
    id: 'localGenAI',
    name: 'IA Generativa Local',
    shortName: 'Local',
    icon: '🔒',
    description: 'Modelos en tu propia infraestructura. Control total sobre los datos.',
    chip: 'border-slate-200 bg-white text-slate-600 hover:border-emerald-300',
    activeChip: 'border-emerald-400 bg-emerald-50 text-emerald-800 ring-2 ring-emerald-100',
    bar: 'bg-emerald-500',
  },
  {
    id: 'apiGenAI',
    name: 'IA Generativa vía API',
    shortName: 'API',
    icon: '⚡',
    description: 'Los modelos más avanzados, sin infraestructura propia ni costo inicial alto.',
    chip: 'border-slate-200 bg-white text-slate-600 hover:border-amber-300',
    activeChip: 'border-amber-400 bg-amber-50 text-amber-800 ring-2 ring-amber-100',
    bar: 'bg-amber-500',
  },
  {
    id: 'traditionalML',
    name: 'IA Tradicional / ML',
    shortName: 'ML',
    icon: '📊',
    description: 'Predicción, scoring y clasificación sobre datos estructurados propios.',
    chip: 'border-slate-200 bg-white text-slate-600 hover:border-blue-300',
    activeChip: 'border-blue-400 bg-blue-50 text-blue-800 ring-2 ring-blue-100',
    bar: 'bg-blue-500',
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
