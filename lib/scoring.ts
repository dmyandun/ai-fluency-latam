import type {
  Answers,
  DimensionId,
  ImplementationType,
  InteractionModel,
  ScoreEntry,
  ScoringResult,
} from "@/types/assessment";
import { QUESTIONS } from "@/lib/questions";

/**
 * A single weighted contribution of a dimension to a target score.
 * When `invert` is true, the dimension's value is flipped (1 - value),
 * modeling "the lower this dimension, the stronger the signal".
 */
interface Weight {
  dimension: DimensionId;
  weight: number;
  invert?: boolean;
}

/**
 * Weights for the three interaction models.
 * Each model's score is a weighted average of (possibly inverted) dimension
 * values, producing a 0..1 figure later expressed as a percentage.
 */
const MODEL_WEIGHTS: Record<InteractionModel, Weight[]> = {
  automation: [
    { dimension: "repetitiveness", weight: 1 },
    { dimension: "operationalVolume", weight: 0.8 },
    { dimension: "creativity", weight: 0.6, invert: true },
    { dimension: "humanJudgment", weight: 0.6, invert: true },
    { dimension: "decisionComplexity", weight: 0.5, invert: true },
    { dimension: "autonomousExecution", weight: 0.3 },
  ],
  agency: [
    { dimension: "autonomousExecution", weight: 1 },
    { dimension: "systemIntegration", weight: 0.9 },
    { dimension: "decisionComplexity", weight: 0.6 },
    { dimension: "techMaturity", weight: 0.6 },
    { dimension: "dataMaturity", weight: 0.4 },
    { dimension: "repetitiveness", weight: 0.3 },
  ],
  augmentation: [
    { dimension: "creativity", weight: 1 },
    { dimension: "humanJudgment", weight: 0.9 },
    { dimension: "decisionComplexity", weight: 0.8 },
    { dimension: "autonomousExecution", weight: 0.4, invert: true },
    { dimension: "repetitiveness", weight: 0.4, invert: true },
  ],
};

/** Weights for the three implementation strategies. */
const IMPLEMENTATION_WEIGHTS: Record<ImplementationType, Weight[]> = {
  localGenAI: [
    { dimension: "privacySensitivity", weight: 1 },
    { dimension: "regulatorySensitivity", weight: 0.9 },
    { dimension: "operationalVolume", weight: 0.6 },
    { dimension: "techMaturity", weight: 0.5 },
  ],
  apiGenAI: [
    { dimension: "creativity", weight: 1 },
    { dimension: "privacySensitivity", weight: 0.7, invert: true },
    { dimension: "regulatorySensitivity", weight: 0.5, invert: true },
    { dimension: "humanJudgment", weight: 0.5 },
    { dimension: "techMaturity", weight: 0.4, invert: true },
  ],
  traditionalML: [
    { dimension: "forecastingNeed", weight: 1 },
    { dimension: "dataMaturity", weight: 0.8 },
    { dimension: "decisionComplexity", weight: 0.4 },
    { dimension: "creativity", weight: 0.5, invert: true },
  ],
};

/** Tie-break priority when scores are equal (most specific first). */
const MODEL_PRIORITY: InteractionModel[] = ["agency", "augmentation", "automation"];
const IMPLEMENTATION_PRIORITY: ImplementationType[] = [
  "traditionalML",
  "localGenAI",
  "apiGenAI",
];

function valueFor(answers: Answers, dimension: DimensionId): number {
  const raw = answers[dimension];
  return typeof raw === "number" ? raw : 0;
}

/** Weighted average of dimension values in the 0..1 range. */
function weightedScore(answers: Answers, weights: Weight[]): number {
  const totalWeight = weights.reduce((sum, w) => sum + w.weight, 0);
  if (totalWeight === 0) return 0;
  const acc = weights.reduce((sum, w) => {
    const v = valueFor(answers, w.dimension);
    const contribution = w.invert ? 1 - v : v;
    return sum + contribution * w.weight;
  }, 0);
  return acc / totalWeight;
}

function toPercent(value: number): number {
  return Math.round(value * 100);
}

function rank<T extends string>(
  weights: Record<T, Weight[]>,
  answers: Answers,
  priority: T[],
): { entries: ScoreEntry<T>[]; top: T } {
  const entries = (Object.keys(weights) as T[]).map((id) => ({
    id,
    score: toPercent(weightedScore(answers, weights[id])),
  }));
  entries.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return priority.indexOf(a.id) - priority.indexOf(b.id);
  });
  return { entries, top: entries[0].id };
}

/**
 * Run the full scoring engine over a set of normalized answers.
 * Pure and deterministic: same answers always yield the same result.
 */
export function scoreAssessment(answers: Answers): ScoringResult {
  const models = rank(MODEL_WEIGHTS, answers, MODEL_PRIORITY);
  const implementations = rank(
    IMPLEMENTATION_WEIGHTS,
    answers,
    IMPLEMENTATION_PRIORITY,
  );

  const dimensions: Partial<Record<DimensionId, number>> = {};
  for (const q of QUESTIONS) {
    dimensions[q.dimension] = toPercent(valueFor(answers, q.dimension));
  }

  return {
    models: models.entries,
    implementations: implementations.entries,
    primaryModel: models.top,
    primaryImplementation: implementations.top,
    dimensions,
  };
}
