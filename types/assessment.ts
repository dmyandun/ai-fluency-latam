/**
 * Core domain types for the AI Fluency LATAM diagnostic.
 * All identifiers are in English; user-facing copy lives in lib data files.
 */

/** The twelve evaluation dimensions captured by the questionnaire. */
export type DimensionId =
  | "repetitiveness"
  | "dataMaturity"
  | "creativity"
  | "decisionComplexity"
  | "operationalVolume"
  | "privacySensitivity"
  | "systemIntegration"
  | "humanJudgment"
  | "autonomousExecution"
  | "forecastingNeed"
  | "techMaturity"
  | "regulatorySensitivity";

/** The three AI interaction models the diagnostic recommends. */
export type InteractionModel = "automation" | "agency" | "augmentation";

/** The three implementation strategies the diagnostic recommends. */
export type ImplementationType = "localGenAI" | "apiGenAI" | "traditionalML";

/** A single selectable answer for a question (Likert-style). */
export interface QuestionOption {
  label: string;
  /** Normalized contribution in the 0..1 range. */
  value: number;
}

/** A diagnostic question bound to exactly one dimension. */
export interface Question {
  id: DimensionId;
  dimension: DimensionId;
  title: string;
  description: string;
  options: QuestionOption[];
}

/** Map of dimension -> normalized answer value (0..1). */
export type Answers = Partial<Record<DimensionId, number>>;

/** Raw inputs collected on the diagnostic page. */
export interface AssessmentInput {
  countryId: string;
  industryId: string;
  answers: Answers;
}

/** A scored item with label metadata for rendering. */
export interface ScoreEntry<T extends string> {
  id: T;
  /** Percentage in the 0..100 range. */
  score: number;
}

/** Output of the scoring engine. */
export interface ScoringResult {
  models: ScoreEntry<InteractionModel>[];
  implementations: ScoreEntry<ImplementationType>[];
  primaryModel: InteractionModel;
  primaryImplementation: ImplementationType;
  /** Normalized dimension values echoed back for the breakdown view. */
  dimensions: Partial<Record<DimensionId, number>>;
}

/** Roadmap phases, ordered. */
export type RoadmapPhaseId = "d30" | "d60" | "d90" | "m6" | "m12";

export type Priority = "low" | "medium" | "high";
export type Impact = "low" | "medium" | "high";
export type Effort = "low" | "medium" | "high";

/** Origin of a roadmap initiative for visual differentiation. */
export type InitiativeSource = "generated" | "user";

/** A single roadmap initiative. */
export interface RoadmapItem {
  id: string;
  phase: RoadmapPhaseId;
  title: string;
  description: string;
  priority: Priority;
  impact: Impact;
  effort: Effort;
  completed: boolean;
  source: InitiativeSource;
}

/** Full roadmap: a flat list of items keyed by phase at render time. */
export interface Roadmap {
  items: RoadmapItem[];
}

/** The complete, persisted result of a diagnostic run. */
export interface DiagnosticResult {
  input: AssessmentInput;
  scoring: ScoringResult;
  createdAt: string;
}
