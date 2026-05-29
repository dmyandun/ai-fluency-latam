import type {
  AssessmentResult,
  Roadmap,
  RoadmapItem,
  RoadmapPhaseConfig,
  RoadmapPhaseId,
  RoadmapPriority,
} from '@/types/assessment'
import { MODEL_LABELS } from '@/lib/recommendations'

// Las 5 fases mapean explícitamente al 4D Framework de AI Fluency
export const ROADMAP_PHASES: RoadmapPhaseConfig[] = [
  { id: '30d', label: 'D1 · Discover',  description: 'Descubrir — 30 días',   durationDays: 30  },
  { id: '60d', label: 'D2 · Design',    description: 'Diseñar — 60 días',     durationDays: 60  },
  { id: '90d', label: 'D3 · Deploy',    description: 'Desplegar — 90 días',   durationDays: 90  },
  { id: '6m',  label: 'D4 · Direct',    description: 'Dirigir — 6 meses',     durationDays: 180 },
  { id: '12m', label: 'D4 · Scale',     description: 'Escalar — 12 meses',    durationDays: 365 },
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

// ─── D1: DISCOVER ──────────────────────────────────────────────────────────────
const DISCOVER_ITEMS: RoadmapItem[] = [
  makeItem('sys-d1-1', '30d',
    'Discover · Mapear oportunidades de IA en tu organización',
    'Entrevista a los equipos clave e identifica sistemáticamente qué procesos, tareas y decisiones pueden transformarse con IA. Usa los resultados de este diagnóstico como punto de partida.',
    'high', 5, 2),
  makeItem('sys-d1-2', '30d',
    'Discover · Auditar fuentes de datos disponibles',
    'Inventaria qué datos existen en la organización, dónde están almacenados, su calidad, accesibilidad y sensibilidad. Los datos son el combustible de cualquier proyecto de IA.',
    'high', 5, 2),
  makeItem('sys-d1-3', '30d',
    'Discover · Priorizar el caso de uso piloto',
    'Selecciona UN proceso para el piloto usando los criterios: alto volumen o impacto, datos disponibles, equipo comprometido y resultado medible en 90 días.',
    'high', 5, 1),
]

// ─── D2: DESIGN ────────────────────────────────────────────────────────────────
const DESIGN_ITEMS: RoadmapItem[] = [
  makeItem('sys-d2-1', '60d',
    'Design · Diseñar la colaboración humano-IA',
    'Define exactamente cómo humanos e IA trabajarán juntos en el proceso piloto: quién decide qué, cuándo interviene el humano, qué hace la IA de forma autónoma y cuáles son los límites.',
    'high', 5, 3),
  makeItem('sys-d2-2', '60d',
    'Design · Definir métricas de éxito (KPIs)',
    'Establece qué significa éxito para el piloto antes de construirlo: tiempo ahorrado, tasa de error, adopción del equipo, costo por transacción. Sin métricas no hay aprendizaje.',
    'high', 5, 1),
  makeItem('sys-d2-3', '60d',
    'Design · Seleccionar tecnología e infraestructura',
    'Elige las herramientas, modelos y plataformas que usará el piloto, alineadas con el tipo de implementación recomendado. Considera costo, privacidad, integración y madurez del proveedor.',
    'high', 4, 3),
]

// ─── D3: DEPLOY ────────────────────────────────────────────────────────────────
const DEPLOY_ITEMS: RoadmapItem[] = [
  makeItem('sys-d3-1', '90d',
    'Deploy · Construir y lanzar el piloto',
    'Implementa el sistema de IA en el alcance definido. Empieza con un grupo pequeño de usuarios, documenta cada decisión técnica y mantén supervisión humana total en la primera semana.',
    'high', 5, 5),
  makeItem('sys-d3-2', '90d',
    'Deploy · Capacitar al equipo en uso de IA',
    'Forma a las personas que usarán o supervisarán la solución. Incluye: cómo interactuar con el sistema, cuándo intervenir y cómo reportar problemas o inconsistencias.',
    'high', 4, 3),
  makeItem('sys-d3-3', '90d',
    'Deploy · Medir resultados vs KPIs definidos',
    'Compara el rendimiento real del piloto contra las métricas de éxito establecidas en D2. Documenta aprendizajes, errores y ajustes realizados durante los primeros 90 días.',
    'high', 5, 2),
]

// ─── D4: DIRECT ────────────────────────────────────────────────────────────────
const DIRECT_ITEMS: RoadmapItem[] = [
  makeItem('sys-d4-1', '6m',
    'Direct · Establecer gobernanza del uso de IA',
    'Crea políticas internas para el uso responsable de IA: privacidad de datos, supervisión humana, criterios de intervención, auditoría de resultados y gestión de errores del sistema.',
    'high', 5, 3),
  makeItem('sys-d4-2', '6m',
    'Direct · Escalar a 3-5 procesos adicionales',
    'Aplica las lecciones del piloto para expandir la IA a nuevos procesos. Reutiliza la infraestructura, los aprendizajes de prompt engineering y el modelo de colaboración definido.',
    'medium', 5, 4),
  makeItem('sys-d4-3', '12m',
    'Direct · Evaluar ROI y definir estrategia de largo plazo',
    'Revisión formal del primer año: retorno de inversión, impacto en productividad, satisfacción del equipo y madurez tecnológica. Define el roadmap para los próximos 2-3 años.',
    'medium', 5, 2),
  makeItem('sys-d4-4', '12m',
    'Direct · Construir capacidad interna de IA',
    'Desarrolla competencias internas permanentes: al menos una persona dedicada a IA, un centro de excelencia o un equipo de innovación que mantenga y evolucione las soluciones.',
    'medium', 4, 4),
]

// ─── Items específicos por modelo de interacción ────────────────────────────────
const INTERACTION_ITEMS: Record<string, RoadmapItem[]> = {
  automation: [
    makeItem('sys-automation-d1', '30d',
      'Discover (Automatización) · Catalogar tareas por volumen y reglas',
      'Identifica y documenta los procesos repetitivos con mayor volumen. Clasifícalos por nivel de estandarización: completamente automatizables vs. requieren supervisión.',
      'high', 5, 1),
    makeItem('sys-automation-d2', '60d',
      'Design (Automatización) · Seleccionar plataforma RPA o de automatización',
      'Evalúa Power Automate, n8n, Zapier, UiPath o Make según el stack tecnológico y nivel técnico del equipo. Define el flujo del primer proceso automatizado.',
      'high', 4, 3),
    makeItem('sys-automation-d3', '90d',
      'Deploy (Automatización) · Automatizar el primer flujo completo',
      'Implementa la automatización del proceso piloto, con alertas de error, logs de ejecución y un dashboard de monitoreo para el equipo operativo.',
      'high', 5, 4),
    makeItem('sys-automation-d4', '6m',
      'Direct (Automatización) · Centro de automatización con 5+ procesos activos',
      'Escala la automatización con un catálogo de flujos activos, métricas de eficiencia por proceso y un proceso de revisión trimestral para agregar nuevos candidatos.',
      'medium', 5, 4),
  ],
  agency: [
    makeItem('sys-agency-d1', '30d',
      'Discover (Agencia) · Mapear flujos donde un agente podría actuar',
      'Documenta los flujos de trabajo donde un agente podría consultar sistemas, tomar decisiones intermedias y ejecutar acciones. Define qué necesita saber, qué puede decidir y qué debe escalar.',
      'high', 5, 2),
    makeItem('sys-agency-d2', '60d',
      'Design (Agencia) · Definir herramientas, APIs y límites del agente',
      'Mapea qué sistemas puede invocar el agente (CRM, ERP, APIs externas), define sus permisos y diseña los mecanismos de supervisión humana para las primeras semanas.',
      'high', 5, 3),
    makeItem('sys-agency-d3', '90d',
      'Deploy (Agencia) · Lanzar agente piloto con supervisión total',
      'Despliega el agente en producción con un humano revisando cada acción. Usa los primeros 30 días para validar comportamiento antes de reducir la supervisión gradualmente.',
      'high', 5, 5),
    makeItem('sys-agency-d4', '6m',
      'Direct (Agencia) · Definir política de autonomía y escalar agentes',
      'Establece criterios formales para aumentar la autonomía del agente basados en métricas de confiabilidad. Expande a nuevos flujos con el mismo modelo de supervisión progresiva.',
      'medium', 4, 3),
  ],
  augmentation: [
    makeItem('sys-augmentation-d1', '30d',
      'Discover (Aumentación) · Identificar expertos y sus cuellos de botella',
      'Entrevista a los roles clave cuyo criterio es crítico y mapea dónde la IA puede proveer más contexto, opciones o síntesis para mejorar la calidad de sus decisiones.',
      'high', 5, 1),
    makeItem('sys-augmentation-d2', '60d',
      'Design (Aumentación) · Diseñar el copiloto del experto',
      'Define el formato de asistencia: el experto ¿necesita sugerencias, análisis previo, borradores o síntesis? Diseña los prompts y la interfaz para integrarse en su flujo sin fricción.',
      'high', 4, 3),
    makeItem('sys-augmentation-d3', '90d',
      'Deploy (Aumentación) · Lanzar copiloto en el flujo diario',
      'Integra la herramienta de IA en el trabajo real de los expertos seleccionados. Mide adopción, tiempo ahorrado, calidad de outputs y satisfacción del equipo semanalmente.',
      'high', 5, 3),
    makeItem('sys-augmentation-d4', '6m',
      'Direct (Aumentación) · Escalar el copiloto a todo el equipo experto',
      'Extiende el copiloto a todos los roles similares, incorpora retroalimentación acumulada y establece un ciclo de mejora continua de los prompts y flujos de trabajo.',
      'medium', 5, 3),
  ],
}

// ─── Items específicos por tipo de implementación ───────────────────────────────
const IMPLEMENTATION_ITEMS: Record<string, RoadmapItem[]> = {
  localGenAI: [
    makeItem('sys-local-d1', '30d',
      'Discover (IA Local) · Evaluar modelos open-source disponibles',
      'Compara Llama 3, Mistral, Phi-3 y Gemma usando Ollama o LM Studio. Evalúa calidad en el caso de uso específico antes de comprometerte con infraestructura.',
      'high', 4, 2),
    makeItem('sys-local-d2', '60d',
      'Design (IA Local) · Provisionar infraestructura on-premise o VPC',
      'Diseña y provisiona el entorno de cómputo (GPU on-premise o instancia cloud privada) con los controles de seguridad requeridos por las políticas de privacidad de tu organización.',
      'high', 5, 5),
    makeItem('sys-local-d3', '90d',
      'Deploy (IA Local) · Desplegar pipeline de inferencia con monitoreo',
      'Lanza el modelo en producción con endpoint HTTP, métricas de latencia y disponibilidad, sistema de logs y alertas automáticas para el equipo de operaciones.',
      'high', 5, 4),
  ],
  apiGenAI: [
    makeItem('sys-api-d1', '30d',
      'Discover (IA vía API) · Seleccionar proveedor y modelo LLM',
      'Evalúa OpenAI GPT-4o, Anthropic Claude, Google Gemini y otros según capacidades, precio por token, latencia y políticas de privacidad de datos. Crea cuenta y prueba el caso de uso.',
      'high', 4, 1),
    makeItem('sys-api-d2', '60d',
      'Design (IA vía API) · Construir prototipo con prompt engineering',
      'Desarrolla el primer prototipo funcional del flujo de trabajo. Diseña los prompts del sistema, define el contexto óptimo y valida la calidad de outputs con usuarios reales.',
      'high', 5, 3),
    makeItem('sys-api-d3', '90d',
      'Deploy (IA vía API) · Optimizar costos, latencia y confiabilidad',
      'Implementa caché de respuestas frecuentes, manejo de errores con reintentos, monitoreo de costos por solicitud y guardrails para mantener la calidad en producción.',
      'medium', 4, 3),
  ],
  traditionalML: [
    makeItem('sys-ml-d1', '30d',
      'Discover (ML) · Auditar calidad y volumen del dataset histórico',
      'Evalúa el dataset disponible: completitud, consistencia, volumen mínimo requerido y distribución de clases o valores objetivo. Define si hay suficientes datos para entrenar un modelo útil.',
      'high', 5, 2),
    makeItem('sys-ml-d2', '60d',
      'Design (ML) · Entrenar y validar modelo baseline en Python',
      'Desarrolla el primer modelo con scikit-learn o XGBoost. Establece métricas de referencia (accuracy, AUC, RMSE), valida con datos de holdout y documenta los supuestos del modelo.',
      'high', 4, 4),
    makeItem('sys-ml-d3', '90d',
      'Deploy (ML) · Desplegar modelo y pipeline de reentrenamiento',
      'Sirve el modelo como API o integración directa. Implementa monitoreo de data drift, define la frecuencia de reentrenamiento y crea el proceso de validación antes de actualizar en producción.',
      'high', 5, 4),
  ],
}

export function generateDefaultRoadmap(result: AssessmentResult): Roadmap {
  const interactionItems    = INTERACTION_ITEMS[result.interactionModel]    ?? []
  const implementationItems = IMPLEMENTATION_ITEMS[result.implementationType] ?? []

  const allItems = [
    ...DISCOVER_ITEMS,
    ...DESIGN_ITEMS,
    ...DEPLOY_ITEMS,
    ...DIRECT_ITEMS,
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
    try {
      return JSON.parse(stored) as Roadmap
    } catch {
      // corrupted — regenerate
    }
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

  const priorityLabel = { high: 'Alta', medium: 'Media', low: 'Baja' }

  const lines: string[] = [
    '╔══════════════════════════════════════════════════════════════╗',
    '║    4D FRAMEWORK FOR AI FLUENCY — ROADMAP DE ADOPCIÓN DE IA    ║',
    '╚══════════════════════════════════════════════════════════════╝',
    '',
    `Organización: ${result.industry} · ${result.country}`,
    `Modelo recomendado: ${modelLabel} + ${implLabel}`,
    `Generado: ${new Date(roadmap.generatedAt).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}`,
    '',
    '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
    '',
  ]

  const phases = [
    { id: '30d', title: 'D1 · DISCOVER — Descubrir (30 días)'  },
    { id: '60d', title: 'D2 · DESIGN — Diseñar (60 días)'      },
    { id: '90d', title: 'D3 · DEPLOY — Desplegar (90 días)'    },
    { id: '6m',  title: 'D4 · DIRECT — Dirigir (6 meses)'      },
    { id: '12m', title: 'D4 · SCALE — Escalar (12 meses)'      },
  ]

  for (const phase of phases) {
    const items = roadmap.items.filter((i) => i.phaseId === phase.id)
    if (items.length === 0) continue

    lines.push(`▌ ${phase.title}`)
    lines.push('─'.repeat(60))

    for (const item of items) {
      const status   = item.completed ? '✓' : '○'
      const priority = priorityLabel[item.priority]
      lines.push(`  ${status}  ${item.title}`)
      lines.push(`     Prioridad: ${priority}  |  Impacto: ${item.impact}/5  |  Esfuerzo: ${item.effort}/5`)
      if (item.description) {
        lines.push(`     ${item.description}`)
      }
      lines.push('')
    }
    lines.push('')
  }

  const completed = roadmap.items.filter((i) => i.completed).length
  lines.push('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  lines.push(`Progreso: ${completed}/${roadmap.items.length} iniciativas completadas`)
  lines.push('')
  lines.push('Generado por AI Fluency LATAM · aifluencylatam.com')

  return lines.join('\n')
}

export function downloadRoadmap(roadmap: Roadmap): void {
  const text    = formatRoadmapAsText(roadmap)
  const blob    = new Blob([text], { type: 'text/plain;charset=utf-8' })
  const url     = URL.createObjectURL(blob)
  const anchor  = document.createElement('a')
  anchor.href     = url
  anchor.download = '4d-framework-ai-fluency-roadmap.txt'
  anchor.click()
  URL.revokeObjectURL(url)
}

export function buildMailtoLink(email: string, roadmap: Roadmap): string {
  const result    = roadmap.basedOn
  const modelLabel = MODEL_LABELS[result.interactionModel]    ?? result.interactionModel
  const implLabel  = MODEL_LABELS[result.implementationType] ?? result.implementationType

  const subject = encodeURIComponent(
    `4D Framework for AI Fluency — Roadmap de ${result.industry} (${result.country})`
  )

  // Versión compacta para el body del email
  const phases = [
    { id: '30d', title: 'D1 · Discover (30 días)'  },
    { id: '60d', title: 'D2 · Design (60 días)'    },
    { id: '90d', title: 'D3 · Deploy (90 días)'    },
    { id: '6m',  title: 'D4 · Direct (6 meses)'    },
    { id: '12m', title: 'D4 · Scale (12 meses)'    },
  ]

  let body = `4D FRAMEWORK FOR AI FLUENCY — ROADMAP DE ADOPCIÓN DE IA\n\n`
  body += `Modelo recomendado: ${modelLabel} + ${implLabel}\n`
  body += `Industria / País: ${result.industry} · ${result.country}\n\n`

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
