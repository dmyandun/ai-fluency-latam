import type {
  AssessmentResult,
  Roadmap,
  RoadmapItem,
  RoadmapPhaseConfig,
  RoadmapPhaseId,
  RoadmapPriority,
} from '@/types/assessment'

export const ROADMAP_PHASES: RoadmapPhaseConfig[] = [
  { id: '30d', label: '30 días', description: 'Diagnóstico y bases', durationDays: 30 },
  { id: '60d', label: '60 días', description: 'Primeros experimentos', durationDays: 60 },
  { id: '90d', label: '90 días', description: 'Piloto en producción', durationDays: 90 },
  { id: '6m', label: '6 meses', description: 'Escalamiento inicial', durationDays: 180 },
  { id: '12m', label: '12 meses', description: 'Consolidación y expansión', durationDays: 365 },
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
    id,
    phaseId,
    title,
    description,
    priority,
    impact,
    effort,
    completed: false,
    source: 'system',
    createdAt: new Date().toISOString(),
  }
}

const UNIVERSAL_ITEMS: RoadmapItem[] = [
  makeItem('sys-universal-30d-1', '30d', 'Mapear procesos candidatos a IA', 'Reunión con el equipo operativo para identificar los procesos con mayor potencial de mejora con IA.', 'high', 5, 2),
  makeItem('sys-universal-30d-2', '30d', 'Auditar fuentes de datos disponibles', 'Documentar qué datos existen, dónde están almacenados, su calidad y accesibilidad para proyectos de IA.', 'high', 4, 2),
  makeItem('sys-universal-60d-1', '60d', 'Definir métricas de éxito del piloto', 'Establecer KPIs claros y medibles para evaluar el impacto del primer proyecto de IA antes de comenzar.', 'high', 5, 1),
  makeItem('sys-universal-12m-1', '12m', 'Evaluar ROI y planificar expansión', 'Revisión formal del impacto del primer año: ahorros, mejoras de calidad, velocidad y satisfacción del equipo.', 'medium', 5, 3),
]

const INTERACTION_ITEMS: Record<string, RoadmapItem[]> = {
  automation: [
    makeItem('sys-automation-30d-1', '30d', 'Identificar top 3 tareas repetitivas con mayor volumen', 'Priorizar los procesos repetitivos que más tiempo consumen y tienen mayor potencial de automatización.', 'high', 5, 1),
    makeItem('sys-automation-60d-1', '60d', 'Seleccionar herramienta de automatización', 'Evaluar y elegir entre opciones como Power Automate, n8n, Zapier o UiPath según el stack tecnológico actual.', 'high', 4, 3),
    makeItem('sys-automation-90d-1', '90d', 'Automatizar el primer flujo completo', 'Implementar la automatización del proceso seleccionado en entorno de prueba con supervisión del equipo.', 'high', 5, 4),
    makeItem('sys-automation-6m-1', '6m', 'Extender automatización a 5+ procesos críticos', 'Escalar la automatización a los procesos prioritarios identificados, midiendo impacto en cada uno.', 'medium', 5, 4),
  ],
  agency: [
    makeItem('sys-agency-30d-1', '30d', 'Documentar flujos de decisión para agentes', 'Mapear los flujos de trabajo donde un agente podría tomar decisiones o ejecutar pasos sin intervención humana.', 'high', 5, 2),
    makeItem('sys-agency-60d-1', '60d', 'Definir herramientas y APIs que el agente usará', 'Inventariar los sistemas, APIs y fuentes de datos a los que el agente necesitará acceso para operar.', 'high', 4, 2),
    makeItem('sys-agency-90d-1', '90d', 'Lanzar agente piloto con supervisión total', 'Desplegar el primer agente en producción con supervisión humana completa para validar comportamiento.', 'high', 5, 5),
    makeItem('sys-agency-6m-1', '6m', 'Reducir supervisión gradualmente', 'Ajustar los niveles de autonomía del agente basándose en métricas de confiabilidad del piloto.', 'medium', 4, 3),
  ],
  augmentation: [
    makeItem('sys-augmentation-30d-1', '30d', 'Identificar expertos clave a potenciar', 'Mapear los roles donde la IA puede multiplicar el impacto del criterio experto: analistas, estrategas, consultores.', 'high', 5, 1),
    makeItem('sys-augmentation-60d-1', '60d', 'Definir el formato de asistencia de la IA', 'Diseñar cómo la IA apoyará al experto: sugerencias, borradores, análisis previo, síntesis de información.', 'high', 4, 2),
    makeItem('sys-augmentation-90d-1', '90d', 'Lanzar copiloto en flujo de trabajo del experto', 'Integrar la herramienta de IA en el flujo diario de los expertos identificados, midiendo adopción y satisfacción.', 'high', 5, 3),
    makeItem('sys-augmentation-6m-1', '6m', 'Medir impacto en velocidad y calidad de decisión', 'Cuantificar mejoras en tiempo de decisión, calidad de outputs y satisfacción del equipo con el copiloto.', 'medium', 5, 2),
  ],
}

const IMPLEMENTATION_ITEMS: Record<string, RoadmapItem[]> = {
  localGenAI: [
    makeItem('sys-local-30d-1', '30d', 'Evaluar opciones de modelos locales', 'Comparar Ollama, LM Studio y modelos open-source (Llama, Mistral, Phi) para el caso de uso específico.', 'high', 4, 2),
    makeItem('sys-local-60d-1', '60d', 'Configurar infraestructura on-premise o VPC privada', 'Provisionar el hardware o entorno cloud privado necesario para ejecutar modelos localmente.', 'high', 5, 5),
    makeItem('sys-local-90d-1', '90d', 'Implementar pipeline de inferencia con monitoreo', 'Desplegar el modelo en producción con logs, alertas y métricas de latencia y disponibilidad.', 'high', 5, 4),
  ],
  apiGenAI: [
    makeItem('sys-api-30d-1', '30d', 'Definir proveedor de LLM y modelo objetivo', 'Evaluar y seleccionar entre OpenAI GPT-4o, Anthropic Claude, Google Gemini u otros según capacidades y costos.', 'high', 4, 1),
    makeItem('sys-api-60d-1', '60d', 'Construir prototipo funcional vía API', 'Desarrollar el primer prototipo del flujo de trabajo con prompt engineering básico y validar con usuarios.', 'high', 5, 3),
    makeItem('sys-api-90d-1', '90d', 'Optimizar costos y latencia', 'Implementar caché de prompts, estrategias de batching y ajustes de temperatura para producción.', 'medium', 4, 3),
  ],
  traditionalML: [
    makeItem('sys-ml-30d-1', '30d', 'Auditar calidad del dataset histórico', 'Evaluar completitud, consistencia y volumen de los datos disponibles para entrenamiento del modelo.', 'high', 5, 2),
    makeItem('sys-ml-60d-1', '60d', 'Entrenar modelo baseline en Python', 'Desarrollar un modelo inicial con scikit-learn o XGBoost para establecer métricas de referencia.', 'high', 4, 4),
    makeItem('sys-ml-90d-1', '90d', 'Validar modelo con datos de producción', 'Evaluar el modelo con datos reales y definir el pipeline de reentrenamiento periódico.', 'high', 5, 3),
  ],
}

export function generateDefaultRoadmap(result: AssessmentResult): Roadmap {
  const interactionItems = INTERACTION_ITEMS[result.interactionModel] ?? []
  const implementationItems = IMPLEMENTATION_ITEMS[result.implementationType] ?? []

  const allItems = [...UNIVERSAL_ITEMS, ...interactionItems, ...implementationItems]

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
