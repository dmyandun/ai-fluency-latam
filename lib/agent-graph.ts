export interface AgentNode {
  name: string
  icon: string
  tool: string
  completionMs: number
  finding: string
}

export interface AgentGraphConfig {
  orchestrator: string
  agents: [AgentNode, AgentNode, AgentNode]
}

const AGENT_GRAPHS: Record<string, AgentGraphConfig> = {
  manufacturing: {
    orchestrator: 'Orquestador de Producción',
    agents: [
      {
        name: 'Analizador de Demanda',
        icon: '📊',
        tool: 'demanda_analyzer',
        completionMs: 1800,
        finding: 'Varianza de consumo: 45% — requiere amortiguación',
      },
      {
        name: 'Evaluador de Proveedores',
        icon: '🤝',
        tool: 'proveedor_evaluador',
        completionMs: 3200,
        finding: 'Lead time promedio: 14 días — aceptable',
      },
      {
        name: 'Optimizador de Stock',
        icon: '📦',
        tool: 'stock_optimizer',
        completionMs: 0,
        finding: 'Recomendación en proceso...',
      },
    ],
  },
  banking: {
    orchestrator: 'Orquestador de Análisis de Riesgo',
    agents: [
      {
        name: 'Calificador de Riesgo',
        icon: '📊',
        tool: 'calificador_riesgo',
        completionMs: 1800,
        finding: 'Leverage: 45.6% — riesgo moderado',
      },
      {
        name: 'Analizador de Historial',
        icon: '🗂️',
        tool: 'analizador_historial',
        completionMs: 3200,
        finding: '2 atrasos regularizados — bandera amarilla',
      },
      {
        name: 'Evaluador de Flujo de Caja',
        icon: '💰',
        tool: 'flujo_evaluador',
        completionMs: 0,
        finding: 'Análisis en progreso...',
      },
    ],
  },
  retail: {
    orchestrator: 'Orquestador de Demanda',
    agents: [
      {
        name: 'Forecaster de Demanda',
        icon: '📈',
        tool: 'demand_forecaster',
        completionMs: 1800,
        finding: 'Tendencia: -35% estacional — esperado',
      },
      {
        name: 'Analizador de Márgenes',
        icon: '💵',
        tool: 'margen_analyzer',
        completionMs: 3200,
        finding: 'Margen actual: 28% — presión de inventory',
      },
      {
        name: 'Optimizador de Precios',
        icon: '🏷️',
        tool: 'precio_optimizer',
        completionMs: 0,
        finding: 'Estrategia en desarrollo...',
      },
    ],
  },
  health: {
    orchestrator: 'Orquestador Clínico',
    agents: [
      {
        name: 'Clasificador de Síntomas',
        icon: '🩺',
        tool: 'sintoma_clasificador',
        completionMs: 1800,
        finding: 'Presentación: cefalea vascular — crítica',
      },
      {
        name: 'Buscador de Protocolos',
        icon: '📋',
        tool: 'protocolo_buscador',
        completionMs: 3200,
        finding: 'Protocolo: ictus presumido — activar',
      },
      {
        name: 'Calificador de Prioridad',
        icon: '🚨',
        tool: 'prioridad_calificador',
        completionMs: 0,
        finding: 'Evaluación urgente en curso...',
      },
    ],
  },
  logistics: {
    orchestrator: 'Orquestador de Rutas',
    agents: [
      {
        name: 'Optimizador de Rutas',
        icon: '🗺️',
        tool: 'ruta_optimizer',
        completionMs: 1800,
        finding: 'Rebalanceo: -8min por ruta optimizada',
      },
      {
        name: 'Gestor de Flota',
        icon: '🚗',
        tool: 'flota_gestor',
        completionMs: 3200,
        finding: 'Disponibilidad: 85% — aceptable',
      },
      {
        name: 'Monitor de SLA',
        icon: '⏱️',
        tool: 'sla_monitor',
        completionMs: 0,
        finding: 'Impacto SLA calculando...',
      },
    ],
  },
  legal: {
    orchestrator: 'Orquestador Jurídico',
    agents: [
      {
        name: 'Extractor de Cláusulas',
        icon: '📄',
        tool: 'clausula_extractor',
        completionMs: 1800,
        finding: 'Cláusula penalidad: identificada',
      },
      {
        name: 'Detector de Riesgos',
        icon: '⚠️',
        tool: 'riesgo_detector',
        completionMs: 3200,
        finding: 'Riesgo exponencial: sin límite máximo',
      },
      {
        name: 'Buscador de Precedentes',
        icon: '⚖️',
        tool: 'precedente_buscador',
        completionMs: 0,
        finding: 'Jurisprudencia relevante buscando...',
      },
    ],
  },
  government: {
    orchestrator: 'Orquestador de Trámites',
    agents: [
      {
        name: 'Validador de Documentos',
        icon: '✅',
        tool: 'doc_validador',
        completionMs: 1800,
        finding: '7/9 documentos válidos — falta 2',
      },
      {
        name: 'Verificador de Cumplimiento',
        icon: '🔍',
        tool: 'cumplimiento_verificador',
        completionMs: 3200,
        finding: '2 documentos críticos: falta fumigación y planos',
      },
      {
        name: 'Enrutador de Trámites',
        icon: '📌',
        tool: 'tramite_enrutador',
        completionMs: 0,
        finding: 'Ruta de aprobación determinando...',
      },
    ],
  },
  education: {
    orchestrator: 'Orquestador Educativo',
    agents: [
      {
        name: 'Analizador de Rendimiento',
        icon: '📊',
        tool: 'rendimiento_analyzer',
        completionMs: 1800,
        finding: 'Reprobación: 30% en matemáticas — alerta',
      },
      {
        name: 'Detector de Patrones',
        icon: '🔍',
        tool: 'patron_detector',
        completionMs: 3200,
        finding: 'Patrón: motivación baja, no capacidad',
      },
      {
        name: 'Asesor Curricular',
        icon: '📚',
        tool: 'curricula_asesor',
        completionMs: 0,
        finding: 'Recomendaciones pedagógicas generando...',
      },
    ],
  },
  agro: {
    orchestrator: 'Orquestador Agrícola',
    agents: [
      {
        name: 'Analizador de Suelo',
        icon: '🌾',
        tool: 'suelo_analyzer',
        completionMs: 1800,
        finding: 'Nutrientes: adecuados para la etapa',
      },
      {
        name: 'Correlador Climático',
        icon: '🌡️',
        tool: 'clima_correlador',
        completionMs: 3200,
        finding: 'Estrés hídrico: moderado — requiere riego',
      },
      {
        name: 'Predictor de Rendimiento',
        icon: '📈',
        tool: 'rendimiento_predictor',
        completionMs: 0,
        finding: 'Proyección de cosecha estimando...',
      },
    ],
  },
  telecom: {
    orchestrator: 'Orquestador de Red',
    agents: [
      {
        name: 'Diagnóstico de Red',
        icon: '📡',
        tool: 'red_diagnostico',
        completionMs: 1800,
        finding: 'Congestión: sector norte — crítica',
      },
      {
        name: 'Predictor de Churn',
        icon: '👥',
        tool: 'churn_predictor',
        completionMs: 3200,
        finding: 'Riesgo churn: 45% — cohorte vulnerable',
      },
      {
        name: 'Clasificador de Tickets',
        icon: '🎫',
        tool: 'ticket_clasificador',
        completionMs: 0,
        finding: 'Root cause analysis en proceso...',
      },
    ],
  },
  insurance: {
    orchestrator: 'Orquestador de Suscripción',
    agents: [
      {
        name: 'Perfilador de Riesgo',
        icon: '📋',
        tool: 'riesgo_perfilador',
        completionMs: 1800,
        finding: 'Perfil: alto riesgo — edad + vehículo',
      },
      {
        name: 'Detector de Fraude',
        icon: '🚨',
        tool: 'fraude_detector',
        completionMs: 3200,
        finding: 'Señales de fraude: ninguna detectada',
      },
      {
        name: 'Calculador de Prima',
        icon: '💰',
        tool: 'prima_calculador',
        completionMs: 0,
        finding: 'Prima y cobertura calculando...',
      },
    ],
  },
  media: {
    orchestrator: 'Orquestador de Contenido',
    agents: [
      {
        name: 'Analizador de Engagement',
        icon: '📈',
        tool: 'engagement_analyzer',
        completionMs: 1800,
        finding: 'Engagement: 1.2% — muy bajo para audiencia',
      },
      {
        name: 'Segmentador de Audiencia',
        icon: '👥',
        tool: 'audiencia_segmentador',
        completionMs: 3200,
        finding: 'Audiencia: dispersa geográficamente',
      },
      {
        name: 'Optimizador de Contenido',
        icon: '✨',
        tool: 'contenido_optimizer',
        completionMs: 0,
        finding: 'Recomendaciones editoriales generando...',
      },
    ],
  },
  construction: {
    orchestrator: 'Orquestador de Proyecto',
    agents: [
      {
        name: 'Controlador de Presupuesto',
        icon: '💵',
        tool: 'presupuesto_controlador',
        completionMs: 1800,
        finding: 'Gasto actual: 62% — riesgo overrun',
      },
      {
        name: 'Analizador de Cronograma',
        icon: '📅',
        tool: 'cronograma_analyzer',
        completionMs: 3200,
        finding: 'Avance: 45% vs 50% planeado — retraso leve',
      },
      {
        name: 'Evaluador de Riesgos',
        icon: '⚠️',
        tool: 'riesgo_evaluador',
        completionMs: 0,
        finding: 'Análisis de riesgos en curso...',
      },
    ],
  },
  energy: {
    orchestrator: 'Orquestador Energético',
    agents: [
      {
        name: 'Analizador de Consumo',
        icon: '⚡',
        tool: 'consumo_analyzer',
        completionMs: 1800,
        finding: 'Patrón: pico martes 14-16h — consistente',
      },
      {
        name: 'Detector de Picos',
        icon: '📊',
        tool: 'pico_detector',
        completionMs: 3200,
        finding: 'Exceso: 15% sobre límite contratado',
      },
      {
        name: 'Optimizador de Costos',
        icon: '💰',
        tool: 'costo_optimizer',
        completionMs: 0,
        finding: 'Estrategia de eficiencia calculando...',
      },
    ],
  },
}

const FALLBACK_GRAPH: AgentGraphConfig = {
  orchestrator: 'Orquestador de Análisis',
  agents: [
    {
      name: 'Analizador de Datos',
      icon: '📊',
      tool: 'data_analyzer',
      completionMs: 1800,
      finding: 'Datos procesados y validados',
    },
    {
      name: 'Detector de Patrones',
      icon: '🔍',
      tool: 'patron_detector',
      completionMs: 3200,
      finding: 'Patrones identificados correctamente',
    },
    {
      name: 'Generador de Insights',
      icon: '💡',
      tool: 'insight_generador',
      completionMs: 0,
      finding: 'Análisis final en progreso...',
    },
  ],
}

export function getAgentGraph(industryId: string): AgentGraphConfig {
  return AGENT_GRAPHS[industryId] ?? FALLBACK_GRAPH
}
