export interface AgentNode {
  name: string
  icon: string
  tool: string
  // Un finding por caso, alineado con el índice de los casos en lib/simulation-cases.ts
  findings: [string, string, string]
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
        findings: [
          '80 SKUs: varianza 200 vs 3 u/mes, alta dispersión',
          '1,200 u/día con 4.2% defectos, sobre meta 1.5%',
          'OEE 58/71/64%, planta 1 crítica',
        ],
      },
      {
        name: 'Evaluador de Proveedores',
        icon: '🤝',
        tool: 'proveedor_evaluador',
        findings: [
          '4 proveedores, lead time 7-21 días, variable',
          'Defectos en turno nocturno + 2 de 8 estaciones',
          'Mantenimiento reactivo, paros no planificados',
        ],
      },
      {
        name: 'Optimizador de Stock',
        icon: '📦',
        tool: 'stock_optimizer',
        findings: [
          'Stock seguridad diferenciado por rotación de SKU',
          'Reproceso $18K/mes, foco en estación nocturna',
          'Mantenimiento predictivo en planta de OEE 58%',
        ],
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
        findings: [
          'Leverage total 45.6% ($205K/$450K), moderado',
          '47 operaciones en 3h, velocidad atípica',
          '28% dormidos, 42% ocasionales, cartera fría',
        ],
      },
      {
        name: 'Analizador de Historial',
        icon: '🗂️',
        tool: 'analizador_historial',
        findings: [
          '2 atrasos regularizados hace 8 meses',
          '15 destinos nuevos en Asia, sin precedente',
          'ROI actual 4.2%, bajo vs benchmark',
        ],
      },
      {
        name: 'Evaluador de Flujo de Caja',
        icon: '💰',
        tool: 'flujo_evaluador',
        findings: [
          'Cuota $2.5K vs cash flow $3-8K, ajustado',
          'Patrón de layering detectado, alta sospecha',
          'Potencial +$1.2M con segmentación dirigida',
        ],
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
        findings: [
          '300 chaquetas, demanda -70% fin de temporada',
          '20% de SKUs concentra 75% de ventas',
          '45K visitas/mes, conversión 1.8% vs 2.5%',
        ],
      },
      {
        name: 'Analizador de Márgenes',
        icon: '💵',
        tool: 'margen_analyzer',
        findings: [
          'Costo $40 vs lista $95, margen para liquidar',
          'Capital inmovilizado $620K en baja rotación',
          'Ticket promedio $52, abandono 68% en envío',
        ],
      },
      {
        name: 'Optimizador de Precios',
        icon: '🏷️',
        tool: 'precio_optimizer',
        findings: [
          'Descuento escalonado liberando espacio verano',
          'Rebalanceo entre tiendas, descontinuar 380 SKUs',
          'Personalización en checkout para subir conversión',
        ],
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
        findings: [
          'Cefalea súbita 9/10 + PA 185/115, banderas rojas',
          'No-shows 30%, concentrados en la tarde',
          '850 diabéticos, 35% HbA1c fuera de meta',
        ],
      },
      {
        name: 'Buscador de Protocolos',
        icon: '📋',
        tool: 'protocolo_buscador',
        findings: [
          'Disartria + 40min, ventana de ictus activa',
          'Patrón: crónicos de seguimiento faltan más',
          '120 pacientes sin control hace 6+ meses',
        ],
      },
      {
        name: 'Calificador de Prioridad',
        icon: '🚨',
        tool: 'prioridad_calificador',
        findings: [
          'Prioridad máxima, protocolo de ictus inmediato',
          'Recordatorios dirigidos reducirían $80K/año',
          'Estratificar riesgo: priorizar los 120 sin control',
        ],
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
        findings: [
          '2 rutas cruzadas en zona norte, reasignable',
          '22% de km en vacío, rutas no optimizadas',
          '2 pasillos concentran 40% del picking',
        ],
      },
      {
        name: 'Gestor de Flota',
        icon: '🚗',
        tool: 'flota_gestor',
        findings: [
          'Conductor libre 90min, capacidad disponible',
          'Flota 25 unidades, ventanas cumplidas 81%',
          '3,500 pedidos/día, picking 14min c/u',
        ],
      },
      {
        name: 'Monitor de SLA',
        icon: '⏱️',
        tool: 'sla_monitor',
        findings: [
          'Reasignar 12 entregas salva el SLA same-day',
          'Optimización ahorraría ~$10K/mes en combustible',
          'Rediseño de layout reduce congestión y errores',
        ],
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
        findings: [
          'Penalidad 15%/semana, sin tope, identificada',
          '120 contratos: cambio de control y renovación',
          'Jurisdicción duplicada: local vs arbitraje',
        ],
      },
      {
        name: 'Detector de Riesgos',
        icon: '⚠️',
        tool: 'riesgo_detector',
        findings: [
          'Riesgo exponencial: 45-60% del contrato en 3 sem',
          'Penalidades de terminación anticipada en 18 contratos',
          'Conflicto de leyes entre dos países, $200K en juego',
        ],
      },
      {
        name: 'Buscador de Precedentes',
        icon: '⚖️',
        tool: 'precedente_buscador',
        findings: [
          'Renegociar a tope máximo + período de gracia',
          'Extracción IA prioriza los 18 contratos críticos',
          'Definir cláusula de jurisdicción única y excluyente',
        ],
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
        findings: [
          '7/9 documentos válidos, faltan 2',
          '600 trámites/día, 40% se atasca por docs',
          '2,300 solicitudes, 80 con domicilio repetido',
        ],
      },
      {
        name: 'Verificador de Cumplimiento',
        icon: '🔍',
        tool: 'cumplimiento_verificador',
        findings: [
          'Faltan fumigación y planos, críticos',
          'Resolución 12 días vs meta de 5',
          'Ingresos declarados no cuadran en varios casos',
        ],
      },
      {
        name: 'Enrutador de Trámites',
        icon: '📌',
        tool: 'tramite_enrutador',
        findings: [
          'Notificar faltantes ahora, resolver en plazo',
          'Validación temprana de docs reduce reprocesos',
          'Detección de anomalías prioriza los sospechosos',
        ],
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
        findings: [
          'Reprobación 30% en 3 de 8 cursos',
          'Finalización 34%, abandono en semana 3',
          '850 de 6,000 en riesgo de deserción',
        ],
      },
      {
        name: 'Detector de Patrones',
        icon: '🔍',
        tool: 'patron_detector',
        findings: [
          'Baja motivación + ausentismo 18%',
          'Caída en módulos densos sin práctica',
          'Señales: asistencia, notas y participación',
        ],
      },
      {
        name: 'Asesor Curricular',
        icon: '📚',
        tool: 'curricula_asesor',
        findings: [
          'Intervención en los 3 cursos de mayor reprobación',
          'Añadir práctica interactiva en semana 3',
          'Asignar 12 tutores a los 850 de mayor riesgo',
        ],
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
        findings: [
          'Soja en llenado de grano, etapa crítica',
          'Hato 400 vacas, 22 L/día vs potencial 28',
          'Maíz: zonas de 12 vs 6 ton/ha en el mismo lote',
        ],
      },
      {
        name: 'Correlador Climático',
        icon: '🌡️',
        tool: 'clima_correlador',
        findings: [
          'Déficit hídrico + 4°C sobre promedio',
          '15% con mastitis subclínica, alimento +20%',
          'Fertilización uniforme ignora la heterogeneidad',
        ],
      },
      {
        name: 'Predictor de Rendimiento',
        icon: '📈',
        tool: 'rendimiento_predictor',
        findings: [
          'Riego dirigido ahora protege el rendimiento',
          'Foco sanitario + dieta sube producción a ~26 L',
          'Aplicación variable por zona optimiza $90K insumo',
        ],
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
        findings: [
          'Nodo zona norte al 85% en pico, congestión',
          'Churn 2.8%/mes = $1.2M en ingresos perdidos',
          '12K tickets/semana, 55% repetitivos',
        ],
      },
      {
        name: 'Predictor de Churn',
        icon: '👥',
        tool: 'churn_predictor',
        findings: [
          'Churn 6% en la zona, clientes en fuga',
          'Riesgo alto: 2+ tickets y consumo decreciente',
          'Satisfacción 6.2/10, resolución lenta (48h)',
        ],
      },
      {
        name: 'Clasificador de Tickets',
        icon: '🎫',
        tool: 'ticket_clasificador',
        findings: [
          'Ampliar capacidad del nodo prioriza la zona',
          'Retención proactiva antes del 3er ticket',
          'IA conversacional resolvería el 55% repetitivo',
        ],
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
        findings: [
          'Conductor 24a + deportivo, riesgo alto',
          'Reclamo $48K con póliza de solo 4 meses',
          '25K pólizas, cancelación 9% anual',
        ],
      },
      {
        name: 'Detector de Fraude',
        icon: '🚨',
        tool: 'fraude_detector',
        findings: [
          'Sin historial de reclamos, primera póliza',
          'Inconsistencias en fechas de los daños',
          'Cancelan pólizas de 2-3 años sin uso',
        ],
      },
      {
        name: 'Calculador de Prima',
        icon: '💰',
        tool: 'prima_calculador',
        findings: [
          'Prima elevada + deducible alto para mitigar',
          'Investigar antes de pagar, peritaje recomendado',
          'Scoring predictivo para retención dirigida',
        ],
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
        findings: [
          '1.2% de lectura vs 8% en similares',
          '800K usuarios, suscripción solo 0.9%',
          'CTR 4.1%, retención 35% en primer minuto',
        ],
      },
      {
        name: 'Segmentador de Audiencia',
        icon: '👥',
        tool: 'audiencia_segmentador',
        findings: [
          'Rebote 78%, titular largo poco atractivo',
          '2.3 artículos/sesión, abandono en paywall',
          'Rendimiento muy variable entre videos',
        ],
      },
      {
        name: 'Optimizador de Contenido',
        icon: '✨',
        tool: 'contenido_optimizer',
        findings: [
          'Reescribir titular + mejorar primeros párrafos',
          'Diferenciar contenido premium para convertir',
          'Optimizar miniaturas y gancho en primer minuto',
        ],
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
        findings: [
          '62% del presupuesto vs 45% de avance físico',
          'Accidentes 3.2/200K hrs vs meta 1.5',
          'Desperdicio 14% = $180K en sobrecostos',
        ],
      },
      {
        name: 'Analizador de Cronograma',
        icon: '📅',
        tool: 'cronograma_analyzer',
        findings: [
          '3 subcontratistas con retraso, riesgo de overrun',
          'Riesgo en altura + 2 cuadrillas específicas',
          'Concreto y acero: pedidos por estimación manual',
        ],
      },
      {
        name: 'Evaluador de Riesgos',
        icon: '⚠️',
        tool: 'riesgo_evaluador',
        findings: [
          'Proyección de sobrecosto, acción correctiva ya',
          'Plan de seguridad focalizado en trabajo en altura',
          'Planificación IA de materiales reduce desperdicio',
        ],
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
        findings: [
          'Pico martes 14-16h supera límite en 15%',
          'Parque 20MW con -8% de eficiencia',
          'Climatización = 40% del consumo del edificio',
        ],
      },
      {
        name: 'Detector de Picos',
        icon: '📊',
        tool: 'pico_detector',
        findings: [
          'Penalización $12K/mes por exceso de demanda',
          '2 de 12 inversores fallan en alta temperatura',
          'Climatización activa en zonas desocupadas',
        ],
      },
      {
        name: 'Optimizador de Costos',
        icon: '💰',
        tool: 'costo_optimizer',
        findings: [
          'Desplazar carga flexible elimina la penalización',
          'Mantenimiento predictivo en los 2 inversores',
          'Sensores de ocupación recortan gasto de climatización',
        ],
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
      findings: [
        'Datos del caso procesados y validados',
        'Variables clave identificadas',
        'Volumen y calidad de datos evaluados',
      ],
    },
    {
      name: 'Detector de Patrones',
      icon: '🔍',
      tool: 'patron_detector',
      findings: [
        'Patrones e ineficiencias detectados',
        'Correlaciones relevantes encontradas',
        'Oportunidades de mejora priorizadas',
      ],
    },
    {
      name: 'Generador de Insights',
      icon: '💡',
      tool: 'insight_generador',
      findings: [
        'Recomendaciones accionables listas',
        'Plan de acción priorizado generado',
        'Puntos de aplicación de IA definidos',
      ],
    },
  ],
}

export function getAgentGraph(industryId: string): AgentGraphConfig {
  return AGENT_GRAPHS[industryId] ?? FALLBACK_GRAPH
}
