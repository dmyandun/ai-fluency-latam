import type {
  AssessmentResult,
  Roadmap,
  RoadmapItem,
  RoadmapPhaseConfig,
  RoadmapPhaseId,
  RoadmapPriority,
} from '@/types/assessment'
import { MODEL_LABELS } from '@/lib/recommendations'

// 4D Framework de AI Fluency — Anthropic (Feller & Dakan)
// Delegation → Description → Discernment → Diligence
export const ROADMAP_PHASES: RoadmapPhaseConfig[] = [
  { id: '30d', label: 'D1 · Delegation',   description: 'Decidir qué delegar a la IA — 30 días',          durationDays: 30  },
  { id: '60d', label: 'D2 · Description',  description: 'Comunicarse efectivamente con la IA — 60 días',  durationDays: 60  },
  { id: '90d', label: 'D3 · Discernment',  description: 'Evaluar y refinar los outputs — 90 días',        durationDays: 90  },
  { id: '6m',  label: 'D4 · Diligence',    description: 'Uso responsable y ético — 6 meses',              durationDays: 180 },
  { id: '12m', label: 'AI Fluency',        description: 'Fluencia consolidada y escalamiento — 12 meses', durationDays: 365 },
]

function makeItem(
  id: string,
  phaseId: RoadmapPhaseId,
  title: string,
  description: string,
  priority: RoadmapPriority,
  impact: 1 | 2 | 3 | 4 | 5,
  effort: 1 | 2 | 3 | 4 | 5
): RoadmapItem {
  return {
    id, phaseId, title, description, priority, impact, effort,
    completed: false,
    source: 'system',
    createdAt: new Date().toISOString(),
  }
}

// ─── D1: DELEGATION ────────────────────────────────────────────────────────────
// Decidir si, cuándo y cómo involucrar a la IA en cada tarea
const DELEGATION_ITEMS: RoadmapItem[] = [
  makeItem('sys-d1-1', '30d',
    'Delegation · Mapear todas las tareas del equipo por tipo de delegación',
    'Clasifica cada tarea del equipo en tres categorías: Solo IA (la IA puede hacerlo de forma autónoma), Humano + IA (colaboración), Solo humano (requiere criterio humano). Esta clasificación es la base de toda la estrategia.',
    'high', 5, 2),
  makeItem('sys-d1-2', '30d',
    'Delegation · Definir criterios de cuándo usar y cuándo no usar IA',
    'Documenta las reglas de delegación: qué factores determinan si una tarea se delega a la IA (volumen, repetitividad, stakes, datos disponibles). El equipo debe poder aplicarlos sin preguntar.',
    'high', 5, 2),
  makeItem('sys-d1-3', '30d',
    'Delegation · Seleccionar el primer proyecto piloto de delegación',
    'Elige una tarea de alta frecuencia donde la delegación a IA sea razonablemente segura. Empieza con impacto bajo para aprender a delegar antes de escalar a decisiones críticas.',
    'high', 5, 1),
  makeItem('sys-d1-4', '30d',
    'Delegation · Comunicar al equipo el propósito del cambio',
    'La adopción falla cuando el equipo no entiende por qué. Explica el objetivo: no reemplazar personas sino amplificar su capacidad. Define qué cambia en el día a día de cada rol.',
    'high', 4, 2),
]

// ─── D2: DESCRIPTION ──────────────────────────────────────────────────────────
// Describir efectivamente las metas y tareas para obtener outputs útiles
const DESCRIPTION_ITEMS: RoadmapItem[] = [
  makeItem('sys-d2-1', '60d',
    'Description · Capacitar al equipo en prompt engineering básico',
    'Enseña los fundamentos: rol, contexto, instrucción, formato, restricciones. El equipo debe poder escribir prompts que produzcan outputs útiles desde la primera interacción, no solo con prueba y error.',
    'high', 5, 3),
  makeItem('sys-d2-2', '60d',
    'Description · Crear biblioteca de prompts para el caso de uso piloto',
    'Desarrolla y documenta los prompts probados para las tareas del piloto. Una biblioteca compartida evita que cada persona reinvente el mismo prompt y acelera la adopción del equipo.',
    'high', 4, 3),
  makeItem('sys-d2-3', '60d',
    'Description · Practicar el loop Descripción → Output → Refinamiento',
    'El flujo básico de trabajo con IA: describe, evalúa el output, refina la descripción, repite. El equipo debe dominar este ciclo iterativo antes de usarlo en tareas de alta importancia.',
    'high', 5, 2),
  makeItem('sys-d2-4', '60d',
    'Description · Definir plantillas de contexto para el equipo',
    'Crea templates con el contexto estándar de tu organización (industria, tono, restricciones, formato de respuesta). Reutilizar contexto base ahorra tiempo y mejora consistencia.',
    'medium', 4, 2),
]

// ─── D3: DISCERNMENT ──────────────────────────────────────────────────────────
// Evaluar con criterio la calidad y utilidad de los outputs de IA
const DISCERNMENT_ITEMS: RoadmapItem[] = [
  makeItem('sys-d3-1', '90d',
    'Discernment · Establecer criterios de evaluación de outputs por caso de uso',
    'Define qué significa un "buen output" para cada tarea: precisión, tono, formato, completitud, ausencia de alucinaciones. Sin criterios explícitos, la evaluación es subjetiva e inconsistente.',
    'high', 5, 2),
  makeItem('sys-d3-2', '90d',
    'Discernment · Detectar y documentar patrones de error de la IA',
    'Lleva un registro de cuándo y cómo falla el sistema: alucinaciones frecuentes, sesgos detectados, casos límite problemáticos. Este conocimiento colectivo es el activo más valioso del equipo.',
    'high', 5, 2),
  makeItem('sys-d3-3', '90d',
    'Discernment · Lanzar el piloto con revisión humana de todos los outputs',
    'En las primeras semanas, un humano revisa cada output antes de usarlo. Esto no es ineficiencia — es aprendizaje activo. Después de 30 días sabrás exactamente cuánto confiar en el sistema.',
    'high', 5, 4),
  makeItem('sys-d3-4', '90d',
    'Discernment · Calibrar niveles de supervisión basados en evidencia',
    'Con datos reales de calidad, ajusta cuánta revisión humana necesita cada tipo de output. Algunos necesitan revisión siempre; otros pueden publicarse directamente. Decide con datos, no intuición.',
    'medium', 5, 2),
]

// ─── D4: DILIGENCE ────────────────────────────────────────────────────────────
// Usar IA de manera responsable, ética y transparente
const DILIGENCE_ITEMS: RoadmapItem[] = [
  makeItem('sys-d4-1', '6m',
    'Diligence · Crear política interna de uso responsable de IA',
    'Documenta las reglas: qué datos pueden enviarse a la IA, cuándo declarar que el trabajo fue AI-assisted, quién es responsable de errores del sistema, cómo manejar información confidencial.',
    'high', 5, 3),
  makeItem('sys-d4-2', '6m',
    'Diligence · Establecer transparencia sobre trabajo AI-assisted',
    'Define cuándo y cómo se declara que un output fue producido con IA. La transparencia genera confianza interna y externa, y es un requisito ético fundamental del uso responsable.',
    'high', 4, 2),
  makeItem('sys-d4-3', '6m',
    'Diligence · Implementar proceso de accountability para errores de IA',
    'Cuando la IA produce un error con consecuencias reales, ¿quién responde? Establece el proceso: cómo se detecta, cómo se corrige, cómo se aprende y cómo se previene la recurrencia.',
    'high', 5, 2),
  makeItem('sys-d4-4', '6m',
    'Diligence · Auditar sesgos y problemas éticos del sistema en producción',
    'Revisa trimestralmente si el sistema produce outputs sesgados, inequitativos o perjudiciales para ciertos grupos. La diligencia no es un evento único — es una práctica continua.',
    'medium', 4, 3),
  makeItem('sys-d4-5', '12m',
    'AI Fluency · Evaluar madurez en los 4D y planificar el siguiente nivel',
    'Mide el progreso real en los cuatro competencies: ¿el equipo delega con criterio? ¿describe efectivamente? ¿discierne con rigor? ¿actúa con diligencia? Usa los gaps para definir la agenda del año 2.',
    'medium', 5, 2),
  makeItem('sys-d4-6', '12m',
    'AI Fluency · Construir cultura organizacional de fluencia en IA',
    'La fluencia no es dominar una herramienta — es un cambio cultural. Celebra casos de éxito, comparte aprendizajes entre equipos, integra el uso de IA en los procesos de onboarding y desarrollo profesional.',
    'medium', 4, 3),
]

// ─── Items específicos por modelo — alineados al 4D ────────────────────────────
const INTERACTION_ITEMS: Record<string, RoadmapItem[]> = {
  automation: [
    makeItem('sys-auto-d1', '30d',
      'Delegation (Automatización) · Catalogar tareas 100% delegables',
      'Identifica las tareas que pueden delegarse completamente a la IA sin revisión humana habitual: alto volumen, reglas claras, bajo riesgo de error. Estas son las candidatas inmediatas al piloto.',
      'high', 5, 1),
    makeItem('sys-auto-d2', '60d',
      'Description (Automatización) · Diseñar los prompts o reglas de automatización',
      'Para cada tarea automatizable, define la instrucción exacta que produce el output correcto de forma consistente. En automatización, la descripción debe ser determinística, no conversacional.',
      'high', 4, 3),
    makeItem('sys-auto-d3', '90d',
      'Discernment (Automatización) · Validar calidad en producción con métricas',
      'Implementa checks automáticos de calidad: comparación con outputs humanos históricos, tasa de errores, casos rechazados. El discernimiento en automatización se escala con monitoreo, no revisión manual.',
      'high', 5, 3),
    makeItem('sys-auto-d4', '6m',
      'Diligence (Automatización) · Política de notificación cuando la IA actúa sola',
      'Define cuándo el sistema debe notificar al humano que tomó una acción autónoma (emails enviados, datos modificados, pagos procesados). La transparencia es esencial incluso en automatización total.',
      'medium', 4, 2),
  ],
  agency: [
    makeItem('sys-agency-d1', '30d',
      'Delegation (Agencia) · Mapear flujos donde un agente puede actuar semi-autónomo',
      'Documenta los flujos de trabajo donde un agente podría consultar sistemas, decidir pasos intermedios y ejecutar acciones. Define explícitamente qué puede hacer sin pedir permiso y qué debe escalar.',
      'high', 5, 2),
    makeItem('sys-agency-d2', '60d',
      'Description (Agencia) · Diseñar el system prompt y las herramientas del agente',
      'El agente necesita un system prompt que describa su rol, sus límites, sus herramientas disponibles y sus criterios de decisión. Esta descripción es su "contrato de trabajo" — debe ser precisa y completa.',
      'high', 5, 4),
    makeItem('sys-agency-d3', '90d',
      'Discernment (Agencia) · Supervisar y corregir comportamiento del agente en producción',
      'Con el agente activo, revisa cada acción en las primeras semanas. Detecta patrones de error, casos donde sobre-escala o sub-escala, y decisiones que no reflejan el criterio esperado.',
      'high', 5, 5),
    makeItem('sys-agency-d4', '6m',
      'Diligence (Agencia) · Establecer gobernanza de acciones autónomas',
      'Crea el registro de auditoría de todas las acciones del agente: qué hizo, cuándo, con qué datos, con qué resultado. La trazabilidad total es un requisito no negociable para agentes en producción.',
      'high', 5, 3),
  ],
  augmentation: [
    makeItem('sys-augment-d1', '30d',
      'Delegation (Aumentación) · Identificar dónde la IA amplifica el criterio experto',
      'Mapea los momentos en el trabajo del experto donde la IA puede aportar más contexto, opciones o síntesis para mejorar sus decisiones. El experto sigue decidiendo — la IA expande su capacidad.',
      'high', 5, 1),
    makeItem('sys-augment-d2', '60d',
      'Description (Aumentación) · Diseñar los prompts del copiloto del experto',
      'El prompt del copiloto debe proveer el contexto correcto del experto (rol, dominio, tono) y solicitar exactamente el tipo de asistencia que necesita: análisis, alternativas, crítica, síntesis o borrador.',
      'high', 4, 3),
    makeItem('sys-augment-d3', '90d',
      'Discernment (Aumentación) · Calibrar cuánto confiar en las sugerencias de la IA',
      'El experto debe desarrollar criterio para saber cuándo seguir la sugerencia de la IA, cuándo modificarla y cuándo ignorarla. Este discernimiento se construye con práctica deliberada y reflexión.',
      'high', 5, 2),
    makeItem('sys-augment-d4', '6m',
      'Diligence (Aumentación) · Transparencia sobre qué es del experto y qué de la IA',
      'Define cuándo declarar que un análisis, propuesta o decisión fue apoyada por IA. La accountability del experto no disminuye por usar IA — si acaso, aumenta la exigencia de verificación.',
      'high', 4, 2),
  ],
}

const IMPLEMENTATION_ITEMS: Record<string, RoadmapItem[]> = {
  localGenAI: [
    makeItem('sys-local-d1', '30d',
      'Delegation (IA Local) · Evaluar qué tareas justifican infraestructura propia',
      'No toda tarea que requiere privacidad necesita IA local. Evalúa volumen, sensibilidad y frecuencia. Solo invierte en infraestructura local donde el costo-beneficio lo justifique claramente.',
      'high', 4, 2),
    makeItem('sys-local-d2', '60d',
      'Description (IA Local) · Seleccionar modelo y configurar para el caso de uso',
      'Evalúa Llama 3, Mistral, Phi-3 o Gemma. El prompt engineering para modelos locales difiere de APIs cloud — el contexto, el formato de instrucción y los parámetros requieren calibración específica.',
      'high', 5, 4),
    makeItem('sys-local-d3', '90d',
      'Discernment (IA Local) · Comparar calidad vs modelo cloud como referencia',
      'Evalúa si la calidad del modelo local es suficiente para el caso de uso. Documenta las diferencias en precisión, coherencia y manejo de casos edge respecto a modelos cloud más potentes.',
      'high', 5, 3),
  ],
  apiGenAI: [
    makeItem('sys-api-d1', '30d',
      'Delegation (API) · Seleccionar proveedor alineado al caso de uso',
      'Evalúa OpenAI GPT-4o, Anthropic Claude, Google Gemini u otros según: calidad para tu caso específico, precio por token, política de privacidad de datos y latencia requerida.',
      'high', 4, 1),
    makeItem('sys-api-d2', '60d',
      'Description (API) · Construir y probar el primer prompt de producción',
      'Itera hasta tener un prompt que produce outputs de calidad consistente. Documenta cada versión y sus resultados — el historial de iteraciones es el aprendizaje más valioso del equipo.',
      'high', 5, 3),
    makeItem('sys-api-d3', '90d',
      'Discernment (API) · Establecer proceso de revisión de outputs en producción',
      'Define el porcentaje de outputs que se revisan manualmente, los criterios de rechazo automático y el proceso de feedback para mejorar los prompts con base en errores detectados.',
      'medium', 4, 2),
  ],
  traditionalML: [
    makeItem('sys-ml-d1', '30d',
      'Delegation (ML) · Definir exactamente qué decisión tomará el modelo',
      'En ML, la "delegación" es definir qué predice el modelo y cómo se usa esa predicción. El humano puede usar la predicción como señal o dejar que el sistema actúe solo — define cuál con criterio explícito.',
      'high', 5, 2),
    makeItem('sys-ml-d2', '60d',
      'Description (ML) · Preparar datos y entrenar el modelo baseline',
      'El "prompt" del ML es el dataset y la definición de la tarea. Prepara los datos con rigor, entrena el baseline con scikit-learn o XGBoost y documenta los supuestos del modelo.',
      'high', 4, 4),
    makeItem('sys-ml-d3', '90d',
      'Discernment (ML) · Validar el modelo con criterio de negocio, no solo métricas técnicas',
      'Un modelo con buen AUC puede ser inútil o perjudicial en producción. Evalúa si las predicciones tienen sentido para el negocio, si el modelo discrimina grupos de forma injusta y cuándo falla.',
      'high', 5, 3),
  ],
}

export function generateDefaultRoadmap(result: AssessmentResult): Roadmap {
  const interactionItems    = INTERACTION_ITEMS[result.interactionModel]      ?? []
  const implementationItems = IMPLEMENTATION_ITEMS[result.implementationType] ?? []

  const allItems = [
    ...DELEGATION_ITEMS,
    ...DESCRIPTION_ITEMS,
    ...DISCERNMENT_ITEMS,
    ...DILIGENCE_ITEMS,
    ...interactionItems,
    ...implementationItems,
  ]

  return {
    items: allItems,
    generatedAt: new Date().toISOString(),
    basedOn: result,
  }
}

export function loadOrGenerateRoadmap(result: AssessmentResult): Roadmap {
  if (typeof window === 'undefined') return generateDefaultRoadmap(result)
  const stored = localStorage.getItem('afl_roadmap')
  if (stored) {
    try { return JSON.parse(stored) as Roadmap } catch { /* regenerate */ }
  }
  const roadmap = generateDefaultRoadmap(result)
  localStorage.setItem('afl_roadmap', JSON.stringify(roadmap))
  return roadmap
}

export function saveRoadmap(roadmap: Roadmap): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('afl_roadmap', JSON.stringify(roadmap))
  }
}

// ─── Export utilities ──────────────────────────────────────────────────────────

export function formatRoadmapAsText(roadmap: Roadmap): string {
  const result     = roadmap.basedOn
  const modelLabel = MODEL_LABELS[result.interactionModel]    ?? result.interactionModel
  const implLabel  = MODEL_LABELS[result.implementationType] ?? result.implementationType
  const priorityLabel: Record<string, string> = { high: 'Alta', medium: 'Media', low: 'Baja' }

  const lines: string[] = [
    '╔══════════════════════════════════════════════════════════════╗',
    '║  4D FRAMEWORK FOR AI FLUENCY — ROADMAP DE ADOPCIÓN          ║',
    '║  Delegation · Description · Discernment · Diligence         ║',
    '╚══════════════════════════════════════════════════════════════╝',
    '',
    `Organización: ${result.industry} · ${result.country}`,
    `Modelo recomendado: ${modelLabel} + ${implLabel}`,
    `Generado: ${new Date(roadmap.generatedAt).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}`,
    '',
    '─'.repeat(64),
    'Basado en el AI Fluency Framework — Anthropic (Feller & Dakan)',
    '─'.repeat(64),
    '',
  ]

  const phases = [
    { id: '30d', title: 'D1 · DELEGATION — Decidir qué delegar a la IA (30 días)' },
    { id: '60d', title: 'D2 · DESCRIPTION — Comunicarse con la IA (60 días)' },
    { id: '90d', title: 'D3 · DISCERNMENT — Evaluar outputs (90 días)' },
    { id: '6m',  title: 'D4 · DILIGENCE — Uso responsable (6 meses)' },
    { id: '12m', title: 'AI FLUENCY — Consolidar y escalar (12 meses)' },
  ]

  for (const phase of phases) {
    const items = roadmap.items.filter((i) => i.phaseId === phase.id)
    if (items.length === 0) continue
    lines.push(`▌ ${phase.title}`)
    lines.push('─'.repeat(60))
    for (const item of items) {
      const status   = item.completed ? '✓' : '○'
      lines.push(`  ${status}  ${item.title}`)
      lines.push(`     Prioridad: ${priorityLabel[item.priority]}  |  Impacto: ${item.impact}/5  |  Esfuerzo: ${item.effort}/5`)
      if (item.description) lines.push(`     ${item.description}`)
      lines.push('')
    }
    lines.push('')
  }

  const completed = roadmap.items.filter((i) => i.completed).length
  lines.push('─'.repeat(64))
  lines.push(`Progreso: ${completed}/${roadmap.items.length} iniciativas completadas`)
  lines.push('')
  lines.push('Generado por AI Fluency LATAM · aifluencylatam.com')

  return lines.join('\n')
}

export function downloadRoadmap(roadmap: Roadmap): void {
  const text   = formatRoadmapAsText(roadmap)
  const blob   = new Blob([text], { type: 'text/plain;charset=utf-8' })
  const url    = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href     = url
  anchor.download = '4d-ai-fluency-roadmap.txt'
  anchor.click()
  URL.revokeObjectURL(url)
}

export function buildMailtoLink(email: string, roadmap: Roadmap): string {
  const result     = roadmap.basedOn
  const modelLabel = MODEL_LABELS[result.interactionModel]    ?? result.interactionModel
  const implLabel  = MODEL_LABELS[result.implementationType] ?? result.implementationType

  const subject = encodeURIComponent(
    `4D AI Fluency Roadmap — ${result.industry} · ${result.country}`
  )

  const phases = [
    { id: '30d', title: 'D1 · Delegation (30 días)'  },
    { id: '60d', title: 'D2 · Description (60 días)' },
    { id: '90d', title: 'D3 · Discernment (90 días)' },
    { id: '6m',  title: 'D4 · Diligence (6 meses)'   },
    { id: '12m', title: 'AI Fluency (12 meses)'       },
  ]

  let body = `4D FRAMEWORK FOR AI FLUENCY — ROADMAP\n`
  body += `Delegation · Description · Discernment · Diligence\n\n`
  body += `Modelo: ${modelLabel} + ${implLabel}\n`
  body += `${result.industry} · ${result.country}\n\n`

  for (const phase of phases) {
    const items = roadmap.items.filter((i) => i.phaseId === phase.id)
    if (items.length === 0) continue
    body += `\n${phase.title}\n${'─'.repeat(40)}\n`
    for (const item of items) {
      body += `  ${item.completed ? '✓' : '○'} ${item.title}\n`
    }
  }

  body += `\n\nGenerado por AI Fluency LATAM`
  return `mailto:${email}?subject=${subject}&body=${encodeURIComponent(body)}`
}
