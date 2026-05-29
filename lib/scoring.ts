import type {
  DimensionScore,
  InteractionModel,
  ImplementationType,
  AssessmentResult,
  WorkActivity,
} from '@/types/assessment'

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
  return Object.entries(obj).reduce((best, [key, val]) =>
    val > best[1] ? [key, val] : best,
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

  // --- Modelos de interacción ---
  // Rango teórico: [-8, +14]. Shift +8 garantiza valores >= 0
  const INTERACTION_SHIFT = 8
  const automationRaw =
    taskRepetitiveness + operationalVolume - decisionComplexity - humanJudgment + INTERACTION_SHIFT
  const agencyRaw =
    autonomousExecution + systemsIntegration + decisionComplexity - taskRepetitiveness + INTERACTION_SHIFT
  const augmentationRaw =
    humanJudgment + creativityRequired + decisionComplexity - taskRepetitiveness + INTERACTION_SHIFT

  const [automationPct, agencyPct, augmentationPct] = normalize([
    automationRaw,
    agencyRaw,
    augmentationRaw,
  ])

  const interactionScores: Record<InteractionModel, number> = {
    automation: automationPct,
    agency: agencyPct,
    augmentation: augmentationPct,
  }

  // --- Tipos de implementación ---
  // localGenAI: rango [3,15], sin shift necesario
  // apiGenAI: rango [3,16] — (6 - dataPrivacy) invierte la escala de privacidad
  // traditionalML: incluye -teamTechMaturity; shift +5 para evitar negativos
  const IMPL_SHIFT = 5
  const localGenAIRaw = dataPrivacy + regulatorySensitivity + operationalVolume
  const apiGenAIRaw = creativityRequired + teamTechMaturity + (6 - dataPrivacy) + innovationAdvantage
  const traditionalMLRaw =
    forecastingNeed + dataMaturity - teamTechMaturity + operationalVolume + IMPL_SHIFT

  const [localPct, apiPct, mlPct] = normalize([
    localGenAIRaw,
    apiGenAIRaw,
    traditionalMLRaw,
  ])

  const implementationScores: Record<ImplementationType, number> = {
    localGenAI: localPct,
    apiGenAI: apiPct,
    traditionalML: mlPct,
  }

  return {
    interactionScores,
    implementationScores,
    interactionModel: argmax(interactionScores) as InteractionModel,
    implementationType: argmax(implementationScores) as ImplementationType,
  }
}

export function buildAssessmentResult(
  dimensions: DimensionScore,
  country: string,
  industry: string,
  activities: WorkActivity[] = []
): AssessmentResult {
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
