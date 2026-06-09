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
    text: 'Nuestros datos están centralizados, limpios y son de alta calidad.',
    helpText: 'Bases de datos estructuradas, historial confiable y pipelines de datos activos.',
    scale: { min: 1, max: 5, minLabel: 'Totalmente en desacuerdo', maxLabel: 'Totalmente de acuerdo' },
  },
  {
    id: 'q3',
    dimension: 'creativityRequired',
    text: 'El valor de nuestro producto o servicio depende en gran medida de la creatividad e innovación.',
    helpText: 'Diseño, contenido, propuestas, estrategia o comunicación diferenciada.',
    scale: { min: 1, max: 5, minLabel: 'Totalmente en desacuerdo', maxLabel: 'Totalmente de acuerdo' },
  },
  {
    id: 'q4',
    dimension: 'decisionComplexity',
    text: 'Las decisiones críticas de nuestro equipo son muy complejas y con alta incertidumbre.',
    helpText: 'Muchas variables, contexto ambiguo y consecuencias relevantes en cada decisión.',
    scale: { min: 1, max: 5, minLabel: 'Totalmente en desacuerdo', maxLabel: 'Totalmente de acuerdo' },
  },
  {
    id: 'q5',
    dimension: 'operationalVolume',
    text: 'Procesamos un alto volumen de transacciones, eventos o solicitudes cada día (miles o más).',
    helpText: 'Piensa en el volumen operativo diario de tu organización.',
    scale: { min: 1, max: 5, minLabel: 'Totalmente en desacuerdo', maxLabel: 'Totalmente de acuerdo' },
  },
  {
    id: 'q6',
    dimension: 'dataPrivacy',
    text: 'Manejamos datos altamente sensibles o confidenciales.',
    helpText: 'Datos financieros, de salud, legales, identidades personales o secretos comerciales.',
    scale: { min: 1, max: 5, minLabel: 'Totalmente en desacuerdo', maxLabel: 'Totalmente de acuerdo' },
  },
  {
    id: 'q7',
    dimension: 'systemsIntegration',
    text: 'Es crítico que la solución de IA se integre con nuestros sistemas actuales (ERP, CRM, APIs).',
    helpText: 'Qué tanto necesita conectarse con tu infraestructura existente.',
    scale: { min: 1, max: 5, minLabel: 'Totalmente en desacuerdo', maxLabel: 'Totalmente de acuerdo' },
  },
  {
    id: 'q10',
    dimension: 'forecastingNeed',
    text: 'Predecir comportamientos futuros es una necesidad crítica para nuestro negocio.',
    helpText: 'Demanda de productos, probabilidad de churn, riesgo de fraude, tendencias de mercado.',
    scale: { min: 1, max: 5, minLabel: 'Totalmente en desacuerdo', maxLabel: 'Totalmente de acuerdo' },
  },
  {
    id: 'q11',
    dimension: 'teamTechMaturity',
    text: 'Nuestro equipo tiene un nivel técnico sólido en datos, programación o IA.',
    helpText: 'Conocimientos en datos, APIs, ML o herramientas digitales avanzadas.',
    scale: { min: 1, max: 5, minLabel: 'Totalmente en desacuerdo', maxLabel: 'Totalmente de acuerdo' },
  },
  {
    id: 'q12',
    dimension: 'regulatorySensitivity',
    text: 'Operamos bajo regulaciones estrictas que controlan el uso de datos o sistemas automatizados.',
    helpText: 'Banca, salud, seguros, gobierno, sector legal o industrias con auditorías frecuentes.',
    scale: { min: 1, max: 5, minLabel: 'Totalmente en desacuerdo', maxLabel: 'Totalmente de acuerdo' },
  },
  {
    id: 'q13',
    dimension: 'innovationAdvantage',
    text: 'La innovación y la generación de contenido original son nuestra principal ventaja competitiva.',
    helpText: 'Qué tan central es generar ideas, propuestas o contenido diferenciado en tu propuesta de valor.',
    scale: { min: 1, max: 5, minLabel: 'Totalmente en desacuerdo', maxLabel: 'Totalmente de acuerdo' },
  },
]
