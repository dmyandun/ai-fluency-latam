import type {
  Recommendation,
  AssessmentResult,
} from '@/types/assessment'

const RECOMMENDATIONS: Record<string, Recommendation> = {
  automation_localGenAI: {
    interactionModel: 'automation',
    implementationType: 'localGenAI',
    title: 'Automatización con IA Generativa Local',
    summary:
      'Tu organización está lista para automatizar procesos repetitivos con modelos de IA instalados en tu propia infraestructura, garantizando control total sobre los datos.',
    rationale:
      'Tus operaciones presentan alto volumen de tareas repetitivas y sensibilidad de datos que requiere privacidad total. La IA generativa local te permite automatizar sin exponer información crítica a servicios externos.',
    useCases: [
      'Clasificación automática de documentos internos',
      'Generación de reportes operativos rutinarios',
      'Procesamiento de formularios y extraccón de datos',
      'Automatización de respuestas a consultas frecuentes internas',
    ],
    risks: [
      'Costo inicial de infraestructura más alto',
      'Requiere capacidad técnica interna para mantenimiento',
      'Actualizaciones de modelos más complejas',
    ],
    quickWins: [
      'Implementar clasificador de documentos en 30 días',
      'Automatizar generación de reportes semanales',
      'Crear pipeline de extracción de datos de formularios',
    ],
  },

  automation_apiGenAI: {
    interactionModel: 'automation',
    implementationType: 'apiGenAI',
    title: 'Automatización con IA Generativa vía API',
    summary:
      'Tu organización puede automatizar procesos repetitivos rápidamente usando APIs de modelos de lenguaje líderes, con implementación ágil y bajo costo inicial.',
    rationale:
      'Combinas alto volumen operativo con datos de sensibilidad moderada y un equipo con madurez técnica. Las APIs de IA generativa te permiten automatizar flujos de trabajo sin infraestructura propia.',
    useCases: [
      'Asistente de respuesta automática a clientes',
      'Generación automática de contenido y comunicaciones',
      'Clasificación y enrutamiento de solicitudes entrantes',
      'Resumen automático de documentos y reuniones',
    ],
    risks: [
      'Costos variables según volumen de uso',
      'Dependencia de disponibilidad del proveedor de API',
      'Datos enviados a terceros: revisar políticas de privacidad',
    ],
    quickWins: [
      'Bot de respuesta automática a preguntas frecuentes',
      'Pipeline de clasificación de solicitudes por API',
      'Generador automático de reportes en lenguaje natural',
    ],
  },

  automation_traditionalML: {
    interactionModel: 'automation',
    implementationType: 'traditionalML',
    title: 'Automatización con ML Tradicional en Python',
    summary:
      'Tu organización tiene las condiciones ideales para automatizar procesos con modelos de machine learning clásicos: datos estructurados de calidad y necesidades bien definidas.',
    rationale:
      'La combinación de alto volumen, buena madurez de datos y necesidades de predicción estructurada hace que los modelos de ML en Python sean la opción más eficiente, predecible y auditable.',
    useCases: [
      'Clasificación automática de transacciones o solicitudes',
      'Detección de anomalías en operaciones o datos',
      'Scoring y priorización automática de casos',
      'Automatización de decisiones basadas en reglas aprendidas',
    ],
    risks: [
      'Requiere datos históricos de calidad suficiente',
      'Modelos pueden volverse obsoletos si los patrones cambian',
      'Necesita proceso de reentrenamiento periódico',
    ],
    quickWins: [
      'Modelo de clasificación baseline en scikit-learn en 4 semanas',
      'Pipeline de detección de anomalías en datos operativos',
      'Sistema de scoring automático de prioridades',
    ],
  },

  agency_localGenAI: {
    interactionModel: 'agency',
    implementationType: 'localGenAI',
    title: 'Agentes de IA con Infraestructura Local',
    summary:
      'Tu organización está preparada para desplegar agentes que razonan y ejecutan acciones autónomas sobre tus sistemas, con total control de los datos en infraestructura propia.',
    rationale:
      'Necesitas agentes que se integren profundamente con tus sistemas internos, pero la sensibilidad regulatoria y de datos requiere que todo el procesamiento permanezca en tu infraestructura.',
    useCases: [
      'Agente que consulta ERP y genera órdenes de compra automáticas',
      'Asistente de análisis que accede a bases de datos internas',
      'Agente de soporte técnico con acceso a sistemas internos',
      'Orquestador de flujos de trabajo multi-sistema',
    ],
    risks: [
      'Alta complejidad técnica de implementación',
      'Requiere equipo con experiencia en orquestación de agentes',
      'Latencia mayor que modelos en la nube',
    ],
    quickWins: [
      'Agente piloto con acceso a una sola fuente de datos interna',
      'Automatizar consultas frecuentes al ERP via agente',
      'Implementar flujo de aprobación asistido por agente',
    ],
  },

  agency_apiGenAI: {
    interactionModel: 'agency',
    implementationType: 'apiGenAI',
    title: 'Agentes de IA vía API',
    summary:
      'Tu organización puede implementar agentes inteligentes que razonan y ejecutan acciones usando los mejores modelos de lenguaje disponibles vía API, con despliegue rápido.',
    rationale:
      'Tu disposición a la ejecución autónoma, la madurez técnica del equipo y la tolerancia a datos en la nube permiten aprovechar agentes basados en APIs de última generación con frameworks como LangChain o Claude Agent SDK.',
    useCases: [
      'Agente de investigación que consulta APIs externas y sintetiza información',
      'Asistente de ventas que gestiona CRM de forma semi-autónoma',
      'Agente de soporte que resuelve tickets de extremo a extremo',
      'Orquestador de campañas de marketing digital',
    ],
    risks: [
      'Costos pueden escalar con el uso intensivo de herramientas',
      'Requiere definición clara de límites de autonomía',
      'Datos del contexto de trabajo se envían al proveedor',
    ],
    quickWins: [
      'Agente de investigación con búsqueda web en 2 semanas',
      'Prototipo de agente de soporte con herramientas básicas',
      'Integración agente-CRM para actualización automática',
    ],
  },

  agency_traditionalML: {
    interactionModel: 'agency',
    implementationType: 'traditionalML',
    title: 'Agentes Aumentados con Modelos Predictivos',
    summary:
      'Tu organización puede construir agentes inteligentes que combinan razonamiento con modelos predictivos propios, creando sistemas altamente especializados para tu industria.',
    rationale:
      'La fortaleza de tus datos estructurados y la necesidad de predicciones precisas sugieren agentes que toman decisiones basadas en modelos ML propios, combinando lo mejor de la agencia y la predicción.',
    useCases: [
      'Agente de pricing dinámico basado en modelo de demanda propio',
      'Sistema de alertas tempranas con agente de respuesta automática',
      'Agente de recomendación personalizada con modelo ML propio',
      'Orquestador de decisiones apoyado en scoring predictivo',
    ],
    risks: [
      'Complejidad alta al integrar agentes con pipelines ML',
      'Requiere MLOps sólido para mantener modelos actualizados',
      'Debugging más difícil en sistemas híbridos',
    ],
    quickWins: [
      'Modelo de scoring que alimenta decisiones del agente piloto',
      'Integrar predicciones de demanda en flujo de compras',
      'Alertas automáticas basadas en modelos de anomalías',
    ],
  },

  augmentation_localGenAI: {
    interactionModel: 'augmentation',
    implementationType: 'localGenAI',
    title: 'Aumentación del Criterio Humano con IA Local',
    summary:
      'Tu organización necesita potenciar el juicio de sus expertos con IA que opera localmente, manteniendo privacidad total en contextos donde los datos son altamente sensibles.',
    rationale:
      'El criterio humano es crítico en tus decisiones y los datos son sensibles. La IA local actúa como copiloto del experto, sugiriendo, analizando y ampliando capacidades sin exponer información a terceros.',
    useCases: [
      'Copiloto de análisis legal o médico con modelos privados',
      'Asistente de auditoría interna con acceso a documentos confidenciales',
      'Herramienta de due diligence con datos financieros sensibles',
      'Asistente de estrategia que analiza información propietaria',
    ],
    risks: [
      'Costo de infraestructura para modelos de alta calidad',
      'Modelos locales pueden tener menor capacidad que APIs cloud',
      'Adopción del equipo puede ser más lenta sin interfaz intuitiva',
    ],
    quickWins: [
      'Copiloto de redacción para área legal o cumplimiento',
      'Asistente de análisis de documentos internos',
      'Herramienta de síntesis de reportes para directivos',
    ],
  },

  augmentation_apiGenAI: {
    interactionModel: 'augmentation',
    implementationType: 'apiGenAI',
    title: 'Aumentación con IA Generativa de Última Generación',
    summary:
      'Tu organización puede potenciar el criterio y la creatividad de su equipo con los modelos de lenguaje más avanzados disponibles, habilitando trabajo experto de mayor impacto.',
    rationale:
      'La combinación de alta creatividad, necesidad de criterio humano y datos de sensibilidad moderada hace que las APIs de IA generativa sean el complemento ideal para potenciar a tus mejores profesionales.',
    useCases: [
      'Copiloto de estrategia y planificación para directivos',
      'Asistente de innovación y generación de ideas para equipos creativos',
      'Herramienta de análisis y síntesis para consultores y analistas',
      'Asistente de comunicación y producción de contenido experto',
    ],
    risks: [
      'Riesgo de sobredependencia que erosione capacidades del equipo',
      'Calidad del output depende de la calidad del prompt engineering',
      'Costos pueden crecer con uso intensivo por parte del equipo',
    ],
    quickWins: [
      'Acceso a Claude o GPT-4 para el equipo de estrategia en 1 semana',
      'Taller de prompt engineering para maximizar adopción',
      'Copiloto de redacción para propuestas y presentaciones',
    ],
  },

  augmentation_traditionalML: {
    interactionModel: 'augmentation',
    implementationType: 'traditionalML',
    title: 'Aumentación Experta con Modelos Predictivos',
    summary:
      'Tu organización puede potenciar el criterio de sus expertos con modelos predictivos propios que proveen señales cuantitativas para enriquecer decisiones complejas.',
    rationale:
      'Tus expertos toman decisiones complejas y necesitan más señales, no menos criterio. Los modelos ML proveen predicciones, scores y clasificaciones que el experto integra en su razonamiento, mejorando la calidad de cada decisión.',
    useCases: [
      'Modelos de riesgo que asisten a analistas de crédito o inversión',
      'Sistemas de recomendación que apoyan decisiones médicas o técnicas',
      'Dashboards predictivos para planificación estratégica',
      'Herramientas de scoring que priorizan la agenda del experto',
    ],
    risks: [
      'Riesgo de over-reliance en predicciones que no capturan contexto',
      'Requiere explicabilidad del modelo para generar confianza del experto',
      'Datos de entrenamiento pueden no reflejar cambios recientes',
    ],
    quickWins: [
      'Modelo de scoring de prioridad para agenda del equipo experto',
      'Dashboard predictivo para equipo de planificación',
      'Integrar predicciones de riesgo en flujo de revisión humana',
    ],
  },
}

export function getRecommendation(result: AssessmentResult): Recommendation {
  const key = `${result.interactionModel}_${result.implementationType}`
  return RECOMMENDATIONS[key]
}

export const MODEL_LABELS: Record<string, string> = {
  automation: 'Automatización',
  agency: 'Agencia',
  augmentation: 'Aumentación',
  localGenAI: 'IA Generativa Local',
  apiGenAI: 'IA Generativa vía API',
  traditionalML: 'IA Tradicional / ML Python',
}

export const MODEL_DESCRIPTIONS: Record<string, string> = {
  automation:
    'IA para automatizar tareas repetitivas, basadas en reglas, operativas, administrativas o transaccionales.',
  agency:
    'Agentes de IA que razonan, planifican, usan herramientas, consultan sistemas y ejecutan acciones semi-autónomas.',
  augmentation:
    'IA para potenciar el criterio humano, la creatividad, el análisis, la estrategia y el trabajo experto.',
  localGenAI:
    'Para datos sensibles, alto volumen, privacidad, restricciones regulatorias o necesidad de mayor control.',
  apiGenAI:
    'Para creatividad, implementación rápida, asistentes conversacionales, generación de contenido y prototipado.',
  traditionalML:
    'Para forecasting, clasificación, scoring, optimización, detección de anomalías y predicciones con datos estructurados.',
}
