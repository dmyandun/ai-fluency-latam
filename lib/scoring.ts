import type {
  DimensionScore,
  InteractionModel,
  ImplementationType,
  AssessmentResult,
  WorkActivity,
} from '@/types/assessment'

// Las dimensiones taskRepetitiveness, humanJudgment y autonomousExecution ya no se
// preguntan directamente — se derivan de la clasificación de actividades del usuario.
// Si el usuario saltó ese paso se usan valores neutros (3).
export function deriveFromActivities(activities: WorkActivity[]): Pick<
  DimensionScore,
  'taskRepetitiveness' | 'humanJudgment' | 'autonomousExecution'
> {
  if (activities.length === 0) {
    return { taskRepetitiveness: 3, humanJudgment: 3, autonomousExecution: 3 }
  }

  const total     = activities.length
  const aiOnly    = activities.filter((a) => a.category === 'ai_only').length
  const humanAI   = activities.filter((a) => a.category === 'human_ai').length
  const humanOnly = activities.filter((a) => a.category === 'human_only').length

  // Mapear proporción [0,1] a escala [1,5]
  const toScale = (n: number) => Math.max(1, Math.min(5, Math.round((n / total) * 4) + 1))

  return {
    // Alto cuando muchas tareas las puede hacer la IA sola (repetitivas)
    taskRepetitiveness: toScale(aiOnly),
    // Alto cuando los humanos están presentes en la mayoría de tareas
    // — tanto "Solo humano" como "Humano+IA" requieren criterio humano
    humanJudgment: toScale(humanOnly + humanAI),
    // Alto cuando el usuario confía en ejecución autónoma (Solo IA)
    autonomousExecution: toScale(aiOnly),
  }
}

interface ScoreBreakdown {
  interactionScores: Record<InteractionModel, number>
  implementationScores: Record<ImplementationType, number>
  interactionModel: InteractionModel
  implementationType: ImplementationType
}

function normalize(values: number[]): number[] {
  const total = values.reduce((sum, v) => sum + v, 0)
  if (total === 0) return values.map(() => Math.round(100 / values.length))
  return values.map((v) => Math.round((v / total) * 100))
}

function argmax(obj: Record<string, number>): string {
  return Object.entries(obj).reduce(
    (best, [key, val]) => (val > best[1] ? [key, val] : best),
    ['', -Infinity]
  )[0]
}

export function calculateScores(dimensions: DimensionScore): ScoreBreakdown {
  const {
    taskRepetitiveness,
    dataMaturity,
    creativityRequired,
    decisionComplexity,
    operationalVolume,
    dataPrivacy,
    systemsIntegration,
    humanJudgment,
    autonomousExecution,
    forecastingNeed,
    teamTechMaturity,
    regulatorySensitivity,
    innovationAdvantage,
  } = dimensions

  // Modelos de interacción — shift +8 para evitar negativos
  const S = 8
  const automationRaw   = taskRepetitiveness + operationalVolume  - decisionComplexity - humanJudgment    + S
  const agencyRaw       = autonomousExecution + systemsIntegration + decisionComplexity - taskRepetitiveness + S
  const augmentationRaw = humanJudgment + creativityRequired + decisionComplexity - taskRepetitiveness    + S

  const [automationPct, agencyPct, augmentationPct] = normalize([automationRaw, agencyRaw, augmentationRaw])

  const interactionScores: Record<InteractionModel, number> = {
    automation:   automationPct,
    agency:       agencyPct,
    augmentation: augmentationPct,
  }

  // Tipos de implementación
  const localGenAIRaw    = dataPrivacy + regulatorySensitivity + operationalVolume
  const apiGenAIRaw      = creativityRequired + teamTechMaturity + (6 - dataPrivacy) + innovationAdvantage
  const traditionalMLRaw = forecastingNeed + dataMaturity - teamTechMaturity + operationalVolume + 5

  const [localPct, apiPct, mlPct] = normalize([localGenAIRaw, apiGenAIRaw, traditionalMLRaw])

  const implementationScores: Record<ImplementationType, number> = {
    localGenAI:    localPct,
    apiGenAI:      apiPct,
    traditionalML: mlPct,
  }

  return {
    interactionScores,
    implementationScores,
    interactionModel:   argmax(interactionScores)     as InteractionModel,
    implementationType: argmax(implementationScores)  as ImplementationType,
  }
}

export function buildAssessmentResult(
  partialDimensions: Omit<DimensionScore, 'taskRepetitiveness' | 'humanJudgment' | 'autonomousExecution'>,
  country: string,
  industry: string,
  activities: WorkActivity[] = []
): AssessmentResult {
  const derived = deriveFromActivities(activities)
  const dimensions: DimensionScore = { ...partialDimensions, ...derived }
  const scores = calculateScores(dimensions)

  return {
    dimensions,
    country,
    industry,
    activities,
    completedAt: new Date().toISOString(),
    ...scores,
  }
}
