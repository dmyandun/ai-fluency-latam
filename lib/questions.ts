import type { DimensionId, Question, QuestionOption } from "@/types/assessment";

/** Standard 5-point Likert scale, normalized to 0..1. */
function likert(
  labels: [string, string, string, string, string],
): QuestionOption[] {
  return labels.map((label, index) => ({
    label,
    value: index / (labels.length - 1),
  }));
}

const AGREEMENT = likert([
  "Muy en desacuerdo",
  "En desacuerdo",
  "Neutral",
  "De acuerdo",
  "Muy de acuerdo",
]);

const FREQUENCY = likert([
  "Casi nunca",
  "Pocas veces",
  "A veces",
  "Frecuentemente",
  "Casi siempre",
]);

const LEVEL = likert(["Muy bajo", "Bajo", "Medio", "Alto", "Muy alto"]);

/**
 * Diagnostic questionnaire. Each question maps to exactly one dimension and
 * contributes a normalized 0..1 value consumed by the scoring engine.
 */
export const QUESTIONS: Question[] = [
  {
    id: "repetitiveness",
    dimension: "repetitiveness",
    title: "Repetitividad de los procesos",
    description:
      "¿Qué tan repetitivas y basadas en reglas son las tareas operativas de tu organización?",
    options: FREQUENCY,
  },
  {
    id: "dataMaturity",
    dimension: "dataMaturity",
    title: "Madurez de datos",
    description:
      "¿Qué tan estructurados, centralizados y disponibles están tus datos para análisis?",
    options: LEVEL,
  },
  {
    id: "creativity",
    dimension: "creativity",
    title: "Necesidad de creatividad",
    description:
      "¿Qué tanto dependen tus procesos de la generación de contenido, ideación o creatividad?",
    options: LEVEL,
  },
  {
    id: "decisionComplexity",
    dimension: "decisionComplexity",
    title: "Complejidad de las decisiones",
    description:
      "¿Qué tan complejas, multivariables o contextuales son las decisiones clave del negocio?",
    options: LEVEL,
  },
  {
    id: "operationalVolume",
    dimension: "operationalVolume",
    title: "Volumen operativo",
    description:
      "¿Qué tan alto es el volumen de transacciones, documentos u operaciones que procesas?",
    options: LEVEL,
  },
  {
    id: "privacySensitivity",
    dimension: "privacySensitivity",
    title: "Sensibilidad de privacidad",
    description:
      "¿Qué tan sensibles o confidenciales son los datos que maneja tu organización?",
    options: LEVEL,
  },
  {
    id: "systemIntegration",
    dimension: "systemIntegration",
    title: "Integración con sistemas",
    description:
      "Necesitamos que la IA se conecte con sistemas internos (ERP, CRM, APIs) y dispare flujos de trabajo.",
    options: AGREEMENT,
  },
  {
    id: "humanJudgment",
    dimension: "humanJudgment",
    title: "Dependencia del criterio humano",
    description:
      "Las decisiones importantes requieren juicio experto, contexto y supervisión humana.",
    options: AGREEMENT,
  },
  {
    id: "autonomousExecution",
    dimension: "autonomousExecution",
    title: "Necesidad de ejecución autónoma",
    description:
      "Queremos que la IA ejecute acciones de forma semi-autónoma, no solo que sugiera.",
    options: AGREEMENT,
  },
  {
    id: "forecastingNeed",
    dimension: "forecastingNeed",
    title: "Necesidad de predicción estructurada",
    description:
      "Necesitamos forecasting, clasificación, scoring o predicciones sobre datos estructurados.",
    options: AGREEMENT,
  },
  {
    id: "techMaturity",
    dimension: "techMaturity",
    title: "Madurez tecnológica",
    description:
      "¿Qué tan madura es tu infraestructura tecnológica y la capacidad de tu equipo técnico?",
    options: LEVEL,
  },
  {
    id: "regulatorySensitivity",
    dimension: "regulatorySensitivity",
    title: "Sensibilidad regulatoria",
    description:
      "¿Qué tan reguladas están tu industria y el tratamiento de datos en tu país?",
    options: LEVEL,
  },
];

export function getQuestion(id: DimensionId): Question | undefined {
  return QUESTIONS.find((q) => q.id === id);
}

/** Human-readable Spanish labels for each dimension (used in breakdowns). */
export const DIMENSION_LABELS: Record<DimensionId, string> = {
  repetitiveness: "Repetitividad",
  dataMaturity: "Madurez de datos",
  creativity: "Creatividad",
  decisionComplexity: "Complejidad de decisión",
  operationalVolume: "Volumen operativo",
  privacySensitivity: "Privacidad",
  systemIntegration: "Integración de sistemas",
  humanJudgment: "Criterio humano",
  autonomousExecution: "Ejecución autónoma",
  forecastingNeed: "Predicción estructurada",
  techMaturity: "Madurez tecnológica",
  regulatorySensitivity: "Sensibilidad regulatoria",
};
