import type { AssessmentResult, WorkActivity } from '@/types/assessment'
import { MODEL_LABELS } from '@/lib/recommendations'

// URL del inline embed de Calendly. Reemplazar con la URL real del evento.
// (Share → Add to website → Inline Embed → copiar el valor de data-url)
export const CALENDLY_URL = 'https://calendly.com/dyandun/30min?hide_event_type_details=1&hide_gdpr_banner=1'

const DIMENSION_LABELS: Record<string, string> = {
  taskRepetitiveness: 'Repetitividad',
  dataMaturity: 'Madurez de datos',
  creativityRequired: 'Creatividad',
  decisionComplexity: 'Complejidad de decisión',
  operationalVolume: 'Volumen operativo',
  dataPrivacy: 'Privacidad de datos',
  systemsIntegration: 'Integración de sistemas',
  humanJudgment: 'Criterio humano',
  autonomousExecution: 'Ejecución autónoma',
  forecastingNeed: 'Necesidad de predicción',
  teamTechMaturity: 'Madurez tecnológica',
  regulatorySensitivity: 'Sensibilidad regulatoria',
  innovationAdvantage: 'Ventaja por innovación',
}

const ACTIVITY_CATEGORY_LABEL: Record<string, string> = {
  ai_only: 'Solo IA',
  human_ai: 'Humano + IA',
  human_only: 'Solo humano',
}

// Resumen compacto del diagnóstico para pre-llenar en la reserva de Calendly.
export function buildDiagnosisSummary(result: AssessmentResult, activities: WorkActivity[]): string {
  const interaction = MODEL_LABELS[result.interactionModel] ?? result.interactionModel
  const implementation = MODEL_LABELS[result.implementationType] ?? result.implementationType

  const lines: string[] = []
  lines.push('DIAGNÓSTICO AI FLUENCY LATAM')
  lines.push(`País: ${result.country} · Industria: ${result.industry}`)
  lines.push(`Recomendación: ${interaction} + ${implementation}`)
  lines.push('')

  lines.push('Modelo de interacción:')
  for (const [key, val] of Object.entries(result.interactionScores)) {
    lines.push(`  · ${MODEL_LABELS[key] ?? key}: ${val}%`)
  }
  lines.push('Tipo de implementación:')
  for (const [key, val] of Object.entries(result.implementationScores)) {
    lines.push(`  · ${MODEL_LABELS[key] ?? key}: ${val}%`)
  }
  lines.push('')

  // Top 5 dimensiones por puntaje
  const topDims = Object.entries(result.dimensions)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
  lines.push('Dimensiones más altas:')
  for (const [key, val] of topDims) {
    lines.push(`  · ${DIMENSION_LABELS[key] ?? key}: ${val}/5`)
  }
  lines.push('')

  if (activities.length > 0) {
    lines.push('Tareas que más tiempo consumen:')
    activities.forEach((act, i) => {
      const cat = act.category ? ` [${ACTIVITY_CATEGORY_LABEL[act.category] ?? act.category}]` : ''
      lines.push(`  ${i + 1}. ${act.description}${cat}`)
    })
  }

  return lines.join('\n')
}
