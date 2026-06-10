import type { Question } from '@/types/assessment'

// Q1 (taskRepetitiveness), Q8 (humanJudgment) y Q9 (autonomousExecution) fueron
// eliminadas porque la clasificación de actividades diarias captura esa misma señal
// con mayor precisión (derivadas en scoring.ts → deriveFromActivities).
//
// Las preguntas están redactadas como AFIRMACIONES tipo Likert: el usuario responde
// 1 (Totalmente en desacuerdo) a 5 (Totalmente de acuerdo). En todas, "de acuerdo" (5)
// corresponde al extremo ALTO de la dimensión, para mantener la dirección del scoring.

export const QUESTIONS: Question[] = [
  {
    id: 'q2',
    dimension: 'dataMaturity',
    text: 'Nuestros datos están centralizados, actualizados y listos para usarse en análisis o automatización.',
    scale: { min: 1, max: 5, minLabel: 'Totalmente en desacuerdo', maxLabel: 'Totalmente de acuerdo' },
  },
  {
    id: 'q3',
    dimension: 'creativityRequired',
    text: 'Nuestro trabajo requiere generar ideas, propuestas, contenido o soluciones creativas de forma constante.',
    scale: { min: 1, max: 5, minLabel: 'Totalmente en desacuerdo', maxLabel: 'Totalmente de acuerdo' },
  },
  {
    id: 'q4',
    dimension: 'decisionComplexity',
    text: 'Las decisiones importantes de nuestro equipo combinan muchas variables, incertidumbre y consecuencias relevantes.',
    scale: { min: 1, max: 5, minLabel: 'Totalmente en desacuerdo', maxLabel: 'Totalmente de acuerdo' },
  },
  {
    id: 'q5',
    dimension: 'operationalVolume',
    text: 'Procesamos un alto volumen diario de solicitudes, transacciones, documentos, pedidos o eventos operativos.',
    scale: { min: 1, max: 5, minLabel: 'Totalmente en desacuerdo', maxLabel: 'Totalmente de acuerdo' },
  },
  {
    id: 'q6',
    dimension: 'dataPrivacy',
    text: 'Manejamos información sensible, confidencial o regulada que no debería exponerse sin controles estrictos.',
    scale: { min: 1, max: 5, minLabel: 'Totalmente en desacuerdo', maxLabel: 'Totalmente de acuerdo' },
  },
  {
    id: 'q7',
    dimension: 'systemsIntegration',
    text: 'Para que la IA sea útil, debe conectarse con nuestros sistemas actuales como ERP, CRM, bases de datos o APIs.',
    scale: { min: 1, max: 5, minLabel: 'Totalmente en desacuerdo', maxLabel: 'Totalmente de acuerdo' },
  },
  {
    id: 'q10',
    dimension: 'forecastingNeed',
    text: 'Necesitamos predecir eventos futuros como demanda, riesgo, fraude, fallas, churn o comportamiento de clientes.',
    scale: { min: 1, max: 5, minLabel: 'Totalmente en desacuerdo', maxLabel: 'Totalmente de acuerdo' },
  },
  {
    id: 'q11',
    dimension: 'teamTechMaturity',
    text: 'Nuestro equipo puede adoptar herramientas de datos, APIs, automatización o IA con poca fricción técnica.',
    scale: { min: 1, max: 5, minLabel: 'Totalmente en desacuerdo', maxLabel: 'Totalmente de acuerdo' },
  },
  {
    id: 'q12',
    dimension: 'regulatorySensitivity',
    text: 'Nuestra industria exige auditoría, trazabilidad, cumplimiento regulatorio o revisión formal de decisiones automatizadas.',
    scale: { min: 1, max: 5, minLabel: 'Totalmente en desacuerdo', maxLabel: 'Totalmente de acuerdo' },
  },
  {
    id: 'q13',
    dimension: 'innovationAdvantage',
    text: 'Nuestra ventaja competitiva depende de innovar rápido y producir propuestas, experiencias o contenido diferenciado.',
    scale: { min: 1, max: 5, minLabel: 'Totalmente en desacuerdo', maxLabel: 'Totalmente de acuerdo' },
  },
]
