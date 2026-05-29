export type DimensionKey =
  | 'taskRepetitiveness'
  | 'dataMaturity'
  | 'creativityRequired'
  | 'decisionComplexity'
  | 'operationalVolume'
  | 'dataPrivacy'
  | 'systemsIntegration'
  | 'humanJudgment'
  | 'autonomousExecution'
  | 'forecastingNeed'
  | 'teamTechMaturity'
  | 'regulatorySensitivity'
  | 'innovationAdvantage'

export type DimensionScore = Record<DimensionKey, number>

export type InteractionModel = 'automation' | 'agency' | 'augmentation'
export type ImplementationType = 'localGenAI' | 'apiGenAI' | 'traditionalML'
export type RoadmapItemSource = 'system' | 'user'
export type RoadmapPriority = 'high' | 'medium' | 'low'
export type RoadmapPhaseId = '30d' | '60d' | '90d' | '6m' | '12m'

export interface AssessmentResult {
  dimensions: DimensionScore
  interactionModel: InteractionModel
  implementationType: ImplementationType
  interactionScores: Record<InteractionModel, number>
  implementationScores: Record<ImplementationType, number>
  country: string
  industry: string
  completedAt: string
}

export interface Question {
  id: string
  dimension: DimensionKey
  text: string
  helpText?: string
  scale: {
    min: 1
    max: 5
    minLabel: string
    maxLabel: string
  }
}

export interface Recommendation {
  interactionModel: InteractionModel
  implementationType: ImplementationType
  title: string
  summary: string
  rationale: string
  useCases: string[]
  risks: string[]
  quickWins: string[]
}

export interface RoadmapItem {
  id: string
  phaseId: RoadmapPhaseId
  title: string
  description: string
  priority: RoadmapPriority
  impact: 1 | 2 | 3 | 4 | 5
  effort: 1 | 2 | 3 | 4 | 5
  completed: boolean
  source: RoadmapItemSource
  createdAt: string
}

export interface Roadmap {
  items: RoadmapItem[]
  generatedAt: string
  basedOn: AssessmentResult
}

export interface RoadmapPhaseConfig {
  id: RoadmapPhaseId
  label: string
  description: string
  durationDays: number
}

export interface AssessmentState {
  step: 'country' | 'industry' | 'questions' | 'done'
  currentQuestionIndex: number
  country: string
  industry: string
  answers: Partial<DimensionScore>
}

export interface Country {
  code: string
  name: string
}

export interface Industry {
  id: string
  label: string
  icon: string
}
