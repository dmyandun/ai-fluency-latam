import type { InteractionModel } from '@/types/assessment'

export interface SimKPI {
  label: string
  value: string
  change: string
  positive: boolean
}

export interface SimTableRow {
  cells: string[]
  highlight?: boolean
  status?: 'ok' | 'warning' | 'critical'
}

export interface SimAIInsight {
  type: 'prediction' | 'alert' | 'recommendation' | 'automation' | 'insight'
  icon: string
  title: string
  description: string
}

export interface SimImpact {
  label: string
  before: string
  after: string
  unit: string
}

export interface SimVariant {
  actionLabel: string
  processingMessage: string
  panelTitle: string
  panelIntro: string
  insights: SimAIInsight[]
  impacts: SimImpact[]
}

export interface SimulationConfig {
  appName: string
  appIcon: string
  tagline: string
  navItems: string[]
  colorAccent: string   // Tailwind bg class for accent
  colorLight: string    // Tailwind bg class for light bg
  colorText: string     // Tailwind text class for accent
  colorBorder: string   // Tailwind border class
  kpis: SimKPI[]
  tableTitle: string
  tableHeaders: string[]
  tableRows: SimTableRow[]
  variants: Record<InteractionModel, SimVariant>
}

const SIMULATIONS: Record<string, SimulationConfig> = {

  manufacturing: {
    appName: 'InventarisAI',
    appIcon: '🏭',
    tagline: 'Control de inventario potenciado con IA',
    navItems: ['Dashboard', 'Inventario', 'Órdenes', 'Alertas', 'IA'],
    colorAccent: 'bg-indigo-600', colorLight: 'bg-indigo-50',
    colorText: 'text-indigo-700', colorBorder: 'border-indigo-200',
    kpis: [
      { label: 'SKUs activos', value: '2,847', change: '+12 esta semana', positive: true },
      { label: 'Quiebres de stock', value: '23', change: '-41% vs mes anterior', positive: true },
      { label: 'Rotación promedio', value: '18.4 días', change: '-3.2 días', positive: true },
      { label: 'Órdenes pendientes', value: '147', change: '+8 hoy', positive: false },
    ],
    tableTitle: 'Estado del inventario — Top productos',
    tableHeaders: ['Producto', 'Stock actual', 'Mínimo', 'Proveedor', 'Estado'],
    tableRows: [
      { cells: ['Tornillo M8 x 30mm', '8,420 u', '5,000 u', 'Aceros del Sur', 'OK'], status: 'ok' },
      { cells: ['Rodamiento 6205-2RS', '312 u', '500 u', 'SKF México', '⚠ Bajo'], status: 'warning', highlight: true },
      { cells: ['Banda transportadora 2m', '45 u', '20 u', 'ConveyorPro', 'OK'], status: 'ok' },
      { cells: ['Aceite hidráulico 20L', '89 u', '150 u', 'Castrol Ind.', '⚠ Bajo'], status: 'warning', highlight: true },
      { cells: ['Filtro de aire FA-220', '0 u', '30 u', 'FilterTech', '🔴 SIN STOCK'], status: 'critical', highlight: true },
      { cells: ['Cable eléctrico 4mm²', '2,100 m', '500 m', 'Conductores SA', 'OK'], status: 'ok' },
    ],
    variants: {
      automation: {
        actionLabel: '▶ Ejecutar reposición automática',
        processingMessage: 'La IA está analizando niveles de stock, histórico de consumo y tiempos de entrega...',
        panelTitle: 'IA de Automatización',
        panelIntro: 'La IA monitorea el inventario en tiempo real y genera órdenes de compra automáticamente cuando los niveles caen bajo el umbral.',
        insights: [
          { type: 'alert', icon: '🔴', title: 'Quiebre crítico detectado', description: 'Filtro FA-220 en 0 unidades. Línea de producción 3 se detiene en 6 horas si no se repone.' },
          { type: 'automation', icon: '🤖', title: 'Orden generada automáticamente', description: 'O.C. #4821 enviada a FilterTech: 120 unidades a $18.50/u. Entrega estimada: 2 días hábiles.' },
          { type: 'prediction', icon: '📊', title: 'Predicción próximos 14 días', description: 'Rodamiento 6205 alcanzará nivel crítico en 9 días. Aceite hidráulico en 5 días. Órdenes preventivas programadas.' },
          { type: 'recommendation', icon: '💡', title: 'Optimización de stock de seguridad', description: 'El modelo sugiere aumentar el mínimo del aceite hidráulico a 200 u — varianza de consumo alta en el histórico.' },
        ],
        impacts: [
          { label: 'Horas de paro por falta de insumos', before: '14.2 h/mes', after: '0.8 h/mes', unit: '' },
          { label: 'Tiempo gestión de compras', before: '8 h/semana', after: '45 min/semana', unit: '' },
          { label: 'Costo de órdenes urgentes', before: '$4,800/mes', after: '$320/mes', unit: '' },
        ],
      },
      agency: {
        actionLabel: '🤖 Activar agente de compras',
        processingMessage: 'El agente está consultando inventario, contactando proveedores y evaluando cotizaciones...',
        panelTitle: 'Agente de Compras',
        panelIntro: 'El agente de IA consulta múltiples proveedores, compara precios, negocia condiciones y ejecuta las compras dentro de los parámetros autorizados.',
        insights: [
          { type: 'automation', icon: '🤖', title: 'Agente activo — 3 acciones ejecutadas', description: 'Consultó stock de 3 proveedores para Filtro FA-220. Mejor oferta: FilterTech a $17.20/u (urgencia 24h).' },
          { type: 'recommendation', icon: '📋', title: 'Órdenes listas para aprobar', description: '2 órdenes generadas por $6,240 en total. Dentro del límite de aprobación automática ($10,000). ¿Confirmar?' },
          { type: 'prediction', icon: '📈', title: 'Oportunidad de ahorro detectada', description: 'El agente detectó que comprando 6 meses de aceite hidráulico se obtiene 12% de descuento. Ahorro proyectado: $1,870.' },
          { type: 'alert', icon: '⚠️', title: 'Proveedor alternativo identificado', description: 'SKF México tiene stock del rodamiento 6205 a mejor precio. El agente propone cambiar proveedor para esta orden.' },
        ],
        impacts: [
          { label: 'Tiempo del comprador en cotizaciones', before: '6 h/semana', after: '30 min/semana', unit: '' },
          { label: 'Precio promedio de compras', before: 'Referencia', after: '-8.3% ahorro', unit: '' },
          { label: 'Órdenes procesadas/día', before: '12 órdenes', after: '87 órdenes', unit: '' },
        ],
      },
      augmentation: {
        actionLabel: '🧠 Analizar y sugerir estrategia',
        processingMessage: 'La IA está analizando patrones de consumo, estacionalidad y proyecciones para asistir al planificador...',
        panelTitle: 'Copiloto de Planificación',
        panelIntro: 'La IA amplifica el criterio del planificador con análisis predictivo, escenarios y recomendaciones — las decisiones siguen siendo humanas.',
        insights: [
          { type: 'prediction', icon: '📊', title: 'Análisis de estacionalidad', description: 'Histórico muestra un aumento del 34% en consumo de rodamientos en Q4. Sugiero incrementar stock de seguridad para octubre.' },
          { type: 'recommendation', icon: '💡', title: '3 estrategias de optimización', description: 'A) Consolidar pedidos de 5 proveedores en 2 (+15% descuento). B) Adoptar VMI con SKF. C) Implementar kanban para consumibles.' },
          { type: 'insight', icon: '🔍', title: 'Patrón de consumo atípico', description: 'El aceite hidráulico tiene un consumo 40% mayor al histórico en los últimos 30 días. Posible fuga en línea 2. Revisar antes de reabastecer.' },
          { type: 'recommendation', icon: '🎯', title: 'Clasificación ABC actualizada', description: 'El filtro FA-220 debería reclasificarse a categoría A — afecta tiempo de paro crítico. Recomiendo mayor stock de seguridad.' },
        ],
        impacts: [
          { label: 'Precisión en planificación de demanda', before: '67%', after: '91%', unit: '' },
          { label: 'Tiempo de análisis del planificador', before: '4 h/día', after: '45 min/día', unit: '' },
          { label: 'Quiebres de stock evitados', before: '23/mes', after: '3/mes', unit: '' },
        ],
      },
    },
  },

  banking: {
    appName: 'RiskSense AI',
    appIcon: '🏦',
    tagline: 'Análisis de riesgo crediticio con IA',
    navItems: ['Dashboard', 'Solicitudes', 'Portafolio', 'Riesgo', 'IA'],
    colorAccent: 'bg-blue-700', colorLight: 'bg-blue-50',
    colorText: 'text-blue-700', colorBorder: 'border-blue-200',
    kpis: [
      { label: 'Solicitudes hoy', value: '1,247', change: '+18% vs ayer', positive: true },
      { label: 'Tasa de aprobación', value: '64.3%', change: '+2.1 pp', positive: true },
      { label: 'Mora > 90 días', value: '3.2%', change: '-0.4 pp', positive: true },
      { label: 'Tiempo promedio análisis', value: '4.2 min', change: '-68%', positive: true },
    ],
    tableTitle: 'Solicitudes de crédito en revisión',
    tableHeaders: ['ID', 'Cliente', 'Monto', 'Score actual', 'Segmento', 'Acción'],
    tableRows: [
      { cells: ['#CR-4821', 'Empresa XYZ S.A.', '$250,000', '720', 'PYME', 'Revisar'], status: 'ok' },
      { cells: ['#CR-4822', 'Juan Pérez', '$45,000', '580', 'Personal', 'Análisis IA'], status: 'warning', highlight: true },
      { cells: ['#CR-4823', 'Textiles ABC', '$890,000', '695', 'Corporativo', 'Aprobada'], status: 'ok' },
      { cells: ['#CR-4824', 'María González', '$12,000', '430', 'Personal', '🔴 Alto riesgo'], status: 'critical', highlight: true },
      { cells: ['#CR-4825', 'Constructora DEF', '$1,200,000', '750', 'Corporativo', 'Revisar'], status: 'ok' },
    ],
    variants: {
      automation: {
        actionLabel: '▶ Procesar solicitudes automáticamente',
        processingMessage: 'La IA está calculando scores de riesgo, verificando buró y aplicando políticas de crédito...',
        panelTitle: 'Motor de Decisión Automática',
        panelIntro: 'La IA aplica las políticas de crédito automáticamente a solicitudes estándar, liberando al analista para casos complejos.',
        insights: [
          { type: 'automation', icon: '✅', title: '1,089 solicitudes procesadas automáticamente', description: '87.3% del volumen resuelto sin intervención humana en < 2 minutos. Decisiones trazables y auditables.' },
          { type: 'alert', icon: '🔴', title: '158 casos requieren revisión humana', description: 'Perfil atípico, inconsistencia en datos o monto fuera de política. Asignados al equipo de analistas.' },
          { type: 'prediction', icon: '📊', title: 'Score alternativo calculado para CR-4822', description: 'Datos transaccionales sugieren score real de 640 (vs 580 en buró). Modelo recomienda aprobación condicional con menor monto.' },
          { type: 'recommendation', icon: '💡', title: 'Optimización de política detectada', description: 'El modelo sugiere ampliar el segmento de aprobación automática para PYMEs con > 24 meses de historial. +$4.2M en cartera sin aumentar mora.' },
        ],
        impacts: [
          { label: 'Tiempo promedio de resolución', before: '3.2 días', after: '18 minutos', unit: '' },
          { label: 'Costo por solicitud procesada', before: '$28', after: '$3.40', unit: '' },
          { label: 'Solicitudes procesadas por analista/día', before: '25', after: '180', unit: '' },
        ],
      },
      agency: {
        actionLabel: '🤖 Activar agente de análisis crediticio',
        processingMessage: 'El agente está recopilando datos de múltiples fuentes, calculando ratios y preparando el expediente...',
        panelTitle: 'Agente de Análisis',
        panelIntro: 'El agente consulta buró, estados financieros, historial interno y redes de relaciones para construir el expediente crediticio completo.',
        insights: [
          { type: 'automation', icon: '🤖', title: 'Expediente CR-4825 completado en 90 segundos', description: 'El agente recopiló: estados financieros 3 años, consulta buró, análisis de industria (construcción) y verificación de garantías.' },
          { type: 'prediction', icon: '📈', title: 'Scoring multivariable calculado', description: 'Score compuesto 762: Financiero 78/100, Sectorial 71/100, Comportamental 85/100. Riesgo: BAJO. Recomendación: Aprobar.' },
          { type: 'alert', icon: '⚠️', title: 'Señal de alerta en red de relaciones', description: 'El agente detectó que un director de Constructora DEF tiene deuda vencida en otra institución. Escalar para revisión senior.' },
          { type: 'recommendation', icon: '💡', title: 'Condiciones óptimas calculadas', description: 'Tasa sugerida: 9.8%. Plazo: 48 meses. Garantía: hipotecaria. Reduce la mora esperada en 2.3 pp vs política estándar.' },
        ],
        impacts: [
          { label: 'Tiempo de análisis por expediente', before: '4.5 horas', after: '8 minutos', unit: '' },
          { label: 'Cobertura de verificación de datos', before: '3 fuentes', after: '11 fuentes', unit: '' },
          { label: 'Alertas de fraude detectadas', before: '12/mes', after: '67/mes', unit: '' },
        ],
      },
      augmentation: {
        actionLabel: '🧠 Asistir al analista senior',
        processingMessage: 'La IA está preparando el briefing de análisis para el analista...',
        panelTitle: 'Copiloto del Analista',
        panelIntro: 'La IA provee contexto profundo, señales de riesgo y comparables de mercado para que el analista tome la mejor decisión en menos tiempo.',
        insights: [
          { type: 'insight', icon: '🔍', title: 'Contexto sectorial — Construcción', description: 'El sector construcción en México creció 6.8% en Q3. Sin embargo, la empresa opera en el segmento residencial que mostró señales de desaceleración.' },
          { type: 'prediction', icon: '📊', title: 'Comparación con cartera similar', description: 'De 47 empresas similares en portafolio, 89% cumplieron sin atrasos. El perfil de Constructora DEF es mejor que el promedio del segmento.' },
          { type: 'recommendation', icon: '💡', title: '3 condiciones que reducen el riesgo', description: '1) Cláusula de revisión anual, 2) Reportes trimestrales de avance de obra, 3) Cuenta de resultados vinculada. El analista decide cuáles aplicar.' },
          { type: 'alert', icon: '⚠️', title: 'Pregunta sugerida para el comité', description: '¿La garantía hipotecaria está libre de cargas? El expediente no lo confirma. Solicitar certificado registral antes de aprobar.' },
        ],
        impacts: [
          { label: 'Tiempo de preparación del analista', before: '3.5 horas', after: '25 minutos', unit: '' },
          { label: 'Calidad de decisiones (tasa de mora)', before: '3.8%', after: '2.1%', unit: '' },
          { label: 'Satisfacción del equipo analista', before: '6.2/10', after: '8.7/10', unit: '' },
        ],
      },
    },
  },

  retail: {
    appName: 'RetailMind',
    appIcon: '🛍️',
    tagline: 'Demand forecasting y gestión con IA',
    navItems: ['Dashboard', 'Productos', 'Ventas', 'Demanda', 'IA'],
    colorAccent: 'bg-amber-500', colorLight: 'bg-amber-50',
    colorText: 'text-amber-700', colorBorder: 'border-amber-200',
    kpis: [
      { label: 'Ventas del día', value: '$184,230', change: '+8.4% vs ayer', positive: true },
      { label: 'Productos agotados', value: '34', change: '-52% vs semana pasada', positive: true },
      { label: 'Precisión de forecast', value: '87.3%', change: '+12 pp con IA', positive: true },
      { label: 'Margen bruto', value: '42.1%', change: '+1.8 pp', positive: true },
    ],
    tableTitle: 'Productos — Predicción de demanda próximas 2 semanas',
    tableHeaders: ['Producto', 'Stock', 'Forecast 14d', 'Días hasta agotamiento', 'Tendencia'],
    tableRows: [
      { cells: ['Zapatilla Running X200', '245 u', '312 u', '11 días', '📈 +24%'], status: 'warning', highlight: true },
      { cells: ['Camiseta Polo Classic', '1,840 u', '980 u', '26 días', '→ Estable'], status: 'ok' },
      { cells: ['Short Deportivo L', '12 u', '89 u', '2 días', '🔴 Urgente'], status: 'critical', highlight: true },
      { cells: ['Medias Deportivas x3', '3,200 u', '1,100 u', '41 días', '📉 -8%'], status: 'ok' },
      { cells: ['Mochila Trail 30L', '67 u', '145 u', '7 días', '📈 +31%'], status: 'warning', highlight: true },
    ],
    variants: {
      automation: {
        actionLabel: '▶ Actualizar órdenes de reposición',
        processingMessage: 'La IA está calculando demanda futura, ajustando por estacionalidad y generando órdenes de reposición optimizadas...',
        panelTitle: 'Motor de Reposición Automática',
        panelIntro: 'La IA recalcula diariamente las órdenes de compra basándose en ventas en tiempo real, tendencias y eventos del calendario.',
        insights: [
          { type: 'alert', icon: '🔴', title: 'Orden urgente: Short Deportivo L', description: '12 unidades en stock vs 89 proyectadas en 14 días. O.C. automática por 200 u enviada a proveedor. Llegada: 3 días.' },
          { type: 'automation', icon: '🤖', title: '8 órdenes de reposición generadas', description: 'Total: $47,820 en mercancía. 6 dentro del límite automático, 2 requieren aprobación del comprador (>$10,000).' },
          { type: 'prediction', icon: '📊', title: 'Pico de demanda detectado', description: 'El modelo detecta un aumento del 34% en zapatillas running en los próximos 10 días — correlación con maratón local del 15/6.' },
          { type: 'recommendation', icon: '💡', title: 'Oportunidad: liquidar Medias Deportivas', description: 'Stock de 3,200 u con tendencia negativa (-8%). Recomiendo descuento del 15% para liberar capital antes de fin de temporada.' },
        ],
        impacts: [
          { label: 'Productos agotados por semana', before: '71', after: '12', unit: '' },
          { label: 'Tiempo del comprador en órdenes', before: '12 h/semana', after: '1.5 h/semana', unit: '' },
          { label: 'Capital inmovilizado en exceso de stock', before: '$234,000', after: '$89,000', unit: '' },
        ],
      },
      agency: {
        actionLabel: '🤖 Activar agente de ventas omnicanal',
        processingMessage: 'El agente está analizando comportamiento de clientes, stock disponible y personalizando ofertas...',
        panelTitle: 'Agente de Ventas',
        panelIntro: 'El agente gestiona la experiencia del cliente en todos los canales: responde consultas, recomienda productos, procesa devoluciones y activa promociones.',
        insights: [
          { type: 'automation', icon: '🤖', title: 'Agente atendió 1,247 interacciones hoy', description: 'WhatsApp: 698, Web chat: 412, Instagram DM: 137. Resolución autónoma: 91%. Escalados a humano: 112.' },
          { type: 'prediction', icon: '📈', title: 'Segmento de alto valor identificado', description: '340 clientes con 3+ compras en 90 días sin compra en los últimos 30. El agente activó campaña de re-engagement personalizada.' },
          { type: 'recommendation', icon: '💡', title: 'Upsell detectado en tiempo real', description: 'Cliente consultando zapatillas Running X200: el agente recomienda también Medias Deportivas + ahorra $18 en bundle. Conversión 62%.' },
          { type: 'alert', icon: '⚠️', title: '34 devoluciones en proceso', description: 'El agente procesó 28 automáticamente (política estándar). 6 requieren criterio humano (daño reportado, cliente VIP, monto >$200).' },
        ],
        impacts: [
          { label: 'Costo de atención al cliente', before: '$4.20/interacción', after: '$0.38/interacción', unit: '' },
          { label: 'Tiempo de resolución promedio', before: '18 minutos', after: '2.3 minutos', unit: '' },
          { label: 'NPS (satisfacción del cliente)', before: '42', after: '71', unit: '' },
        ],
      },
      augmentation: {
        actionLabel: '🧠 Asistir al equipo de merchandising',
        processingMessage: 'La IA está analizando tendencias de mercado, comportamiento de compra y performance de categorías...',
        panelTitle: 'Copiloto de Merchandising',
        panelIntro: 'La IA amplifica el criterio del equipo de merchandising con análisis de tendencias, comparación competitiva y simulaciones de escenarios.',
        insights: [
          { type: 'insight', icon: '🔍', title: 'Análisis de tendencias del mercado', description: 'Trail running creció 41% en la categoría en los últimos 6 meses. Sugiero ampliar el surtido de mochilas trail antes de la temporada de senderismo.' },
          { type: 'prediction', icon: '📊', title: 'Simulación: 3 escenarios de surtido', description: 'A) Expandir zapatillas (+$18K/mes), B) Agregar accesorios trail (+$22K/mes), C) Ambos (+$34K/mes). Inversión y riesgo por escenario disponibles.' },
          { type: 'recommendation', icon: '💡', title: 'Planograma optimizado para temporada', description: 'La IA sugiere reubicar Short Deportivo a zona caliente (categoría A) y mover Medias al fondo. Incremento de visibilidad estimado: +27% en ventas.' },
          { type: 'insight', icon: '🎯', title: 'Oportunidad de marca propia', description: 'En medias deportivas, la categoría tiene 85% de penetración de marcas propias en competidores. Margen potencial: 58% vs 34% actual.' },
        ],
        impacts: [
          { label: 'Precisión en selección de surtido', before: '71%', after: '89%', unit: '' },
          { label: 'Tiempo en análisis de categoría', before: '6 h/semana', after: '45 min/semana', unit: '' },
          { label: 'Ventas por m² de sala', before: '$1,240/m²', after: '$1,680/m²', unit: '' },
        ],
      },
    },
  },

  health: {
    appName: 'MedAssist AI',
    appIcon: '🏥',
    tagline: 'Soporte clínico y gestión de pacientes con IA',
    navItems: ['Dashboard', 'Pacientes', 'Agenda', 'Clínica', 'IA'],
    colorAccent: 'bg-emerald-600', colorLight: 'bg-emerald-50',
    colorText: 'text-emerald-700', colorBorder: 'border-emerald-200',
    kpis: [
      { label: 'Pacientes hoy', value: '342', change: '+12 urgencias', positive: false },
      { label: 'Tiempo espera prom.', value: '18 min', change: '-34% con IA', positive: true },
      { label: 'Camas disponibles', value: '23 / 180', change: 'Capacidad al 87%', positive: false },
      { label: 'Readmisiones 30d', value: '4.1%', change: '-1.8 pp', positive: true },
    ],
    tableTitle: 'Pacientes en espera — Triaje IA',
    tableHeaders: ['Paciente', 'Síntoma principal', 'Prioridad IA', 'Espera', 'Acción'],
    tableRows: [
      { cells: ['M. Rodríguez, 67a', 'Dolor torácico', '🔴 CRÍTICO', '0 min', 'Atender ya'], status: 'critical', highlight: true },
      { cells: ['J. Castro, 34a', 'Fiebre 39.8°C + tos', '🟡 Urgente', '8 min', 'En espera'], status: 'warning', highlight: true },
      { cells: ['A. López, 8a', 'Dolor abdominal', '🟡 Urgente', '15 min', 'En espera'], status: 'warning' },
      { cells: ['K. Méndez, 45a', 'Consulta control', '🟢 Normal', '42 min', 'En espera'], status: 'ok' },
      { cells: ['P. Vargas, 72a', 'Mareo y náuseas', '🟡 Urgente', '22 min', 'En espera'], status: 'warning', highlight: true },
    ],
    variants: {
      automation: {
        actionLabel: '▶ Procesar triaje automático',
        processingMessage: 'La IA está analizando síntomas, signos vitales y historial para clasificar prioridad de atención...',
        panelTitle: 'Sistema de Triaje Automático',
        panelIntro: 'La IA clasifica automáticamente la urgencia de cada paciente al llegar, reduciendo el tiempo de espera y los errores de triaje.',
        insights: [
          { type: 'alert', icon: '🔴', title: 'ALERTA: M. Rodríguez requiere atención inmediata', description: 'Combinación de dolor torácico + edad + signos vitales = riesgo de evento cardíaco. Protocolo STEMI activado automáticamente. Notificado cardiólogo de guardia.' },
          { type: 'automation', icon: '🤖', title: '289 pacientes clasificados hoy automáticamente', description: 'Tiempo promedio de triaje: 90 segundos vs 8 minutos manual. Consistencia del 97.3% vs criterio de enfermera senior.' },
          { type: 'prediction', icon: '📊', title: 'Predicción de saturación en 3 horas', description: 'El modelo proyecta llegada de 45 pacientes adicionales entre 18:00 y 21:00 (patrón lunes). Recomiendo activar protocolo de contingencia a las 17:30.' },
          { type: 'recommendation', icon: '💡', title: 'Optimización de flujo de atención', description: '3 pacientes con consulta de control pueden redirigirse a consulta externa mañana, liberando 40 min de médico de urgencias esta tarde.' },
        ],
        impacts: [
          { label: 'Tiempo de triaje por paciente', before: '8.2 minutos', after: '90 segundos', unit: '' },
          { label: 'Errores de clasificación de triaje', before: '8.4%', after: '1.2%', unit: '' },
          { label: 'Tiempo hasta atención crítica', before: '12 minutos', after: '3.4 minutos', unit: '' },
        ],
      },
      agency: {
        actionLabel: '🤖 Activar agente de coordinación',
        processingMessage: 'El agente está coordinando recursos, consultando disponibilidad y programando atenciones...',
        panelTitle: 'Agente de Coordinación Clínica',
        panelIntro: 'El agente coordina camas, turnos de médicos, pedidos de laboratorio y comunicaciones con pacientes de forma autónoma.',
        insights: [
          { type: 'automation', icon: '🤖', title: 'Agenda de mañana optimizada automáticamente', description: 'El agente reprogramó 8 consultas para distribuir carga uniforme. Envió confirmaciones a pacientes por WhatsApp. Cancelaciones gestionadas.' },
          { type: 'recommendation', icon: '📋', title: 'Asignación de camas optimizada', description: 'El agente identifica que la cama 114 puede liberarse en 2 horas (alta de paciente). Pre-asignada a P. Vargas (mareo + edad = riesgo observación).' },
          { type: 'prediction', icon: '📈', title: 'Pedidos de laboratorio priorizados', description: 'El agente generó 23 pedidos de laboratorio para los pacientes en espera. Resultados urgentes (7) marcados como STAT. Tiempo estimado: 45 min.' },
          { type: 'alert', icon: '⚠️', title: 'Alerta de medicamento — J. Castro', description: 'Historial muestra alergia a amoxicilina. El agente marcó el expediente y notificó al médico antes de que ingrese al consultorio.' },
        ],
        impacts: [
          { label: 'Tiempo de coordinación de camas', before: '35 min', after: '4 min', unit: '' },
          { label: 'No-shows por falta de recordatorio', before: '22%', after: '6%', unit: '' },
          { label: 'Utilización de médicos especialistas', before: '68%', after: '87%', unit: '' },
        ],
      },
      augmentation: {
        actionLabel: '🧠 Asistir al médico en consulta',
        processingMessage: 'La IA está preparando el briefing clínico del paciente y sugiriendo diagnósticos diferenciales...',
        panelTitle: 'Copiloto Clínico',
        panelIntro: 'La IA amplifica el criterio del médico con contexto del historial, evidencia clínica actualizada y alertas de interacciones — el médico siempre decide.',
        insights: [
          { type: 'insight', icon: '🔍', title: 'Resumen de historial — J. Castro', description: 'Última visita: hace 8 meses por infección respiratoria. Sin alergias documentadas. Vacunación COVID al día. HTA controlada con losartán 50mg.' },
          { type: 'prediction', icon: '📊', title: 'Diagnósticos diferenciales sugeridos', description: '1) Influenza (82% prob.) — síntomas + epidemiología local. 2) COVID-19 (61%) — descartar. 3) Neumonía atípica (34%) — si persiste > 5 días.' },
          { type: 'recommendation', icon: '💡', title: 'Protocolo sugerido basado en evidencia', description: 'Guías 2024: PCR influenza + COVID si fiebre > 3 días. Oseltamivir dentro de 48h si gripe confirmada. El médico revisa y decide.' },
          { type: 'alert', icon: '⚠️', title: 'Interacción medicamentosa detectada', description: 'Si el médico prescribe ibuprofeno: interacción moderada con losartán (reduce efecto antihipertensivo). Alternativa: paracetamol.' },
        ],
        impacts: [
          { label: 'Tiempo de consulta promedio', before: '18 minutos', after: '11 minutos', unit: '' },
          { label: 'Alertas de interacciones detectadas', before: '2.1/semana', after: '14.8/semana', unit: '' },
          { label: 'Adherencia a guías clínicas', before: '71%', after: '94%', unit: '' },
        ],
      },
    },
  },

  logistics: {
    appName: 'LogiAI Route',
    appIcon: '🚚',
    tagline: 'Optimización de rutas y flota con IA',
    navItems: ['Dashboard', 'Rutas', 'Flota', 'Entregas', 'IA'],
    colorAccent: 'bg-orange-500', colorLight: 'bg-orange-50',
    colorText: 'text-orange-700', colorBorder: 'border-orange-200',
    kpis: [
      { label: 'Entregas hoy', value: '1,847', change: '94.2% a tiempo', positive: true },
      { label: 'Distancia recorrida', value: '18,420 km', change: '-22% optimizado', positive: true },
      { label: 'Costo combustible', value: '$4,210', change: '-18% vs sin IA', positive: true },
      { label: 'Incidentes reportados', value: '3', change: '-67% vs promedio', positive: true },
    ],
    tableTitle: 'Rutas activas — Estado en tiempo real',
    tableHeaders: ['Ruta', 'Conductor', 'Entregas', 'Estado', 'ETA'],
    tableRows: [
      { cells: ['Ruta Sur-01', 'Carlos Mendez', '24/28', 'En curso', 'A tiempo'], status: 'ok' },
      { cells: ['Ruta Norte-03', 'Ana Torres', '8/31', 'Retraso 45min', 'Tarde'], status: 'critical', highlight: true },
      { cells: ['Ruta Centro-07', 'Luis Pérez', '18/22', 'En curso', 'A tiempo'], status: 'ok' },
      { cells: ['Ruta Oriente-02', 'Martha López', '15/25', 'En pausa', 'Incierto'], status: 'warning', highlight: true },
      { cells: ['Ruta Express-01', 'Pedro Vega', '12/12', 'Completada', '✓ Finalizada'], status: 'ok' },
    ],
    variants: {
      automation: {
        actionLabel: '▶ Reasignar rutas automáticamente',
        processingMessage: 'La IA está recalculando rutas en tiempo real considerando tráfico, retrasos y prioridades de entrega...',
        panelTitle: 'Optimizador de Rutas en Tiempo Real',
        panelIntro: 'La IA recalcula automáticamente las rutas cuando hay retrasos, cambios de tráfico o nuevas solicitudes de entrega.',
        insights: [
          { type: 'alert', icon: '🔴', title: 'Ruta Norte-03: desvío automático activado', description: 'Accidente detectado en Av. Principal. IA redirigió a Carlos Torres por ruta alternativa. Retraso reducido de 45 min a 12 min.' },
          { type: 'automation', icon: '🤖', title: '4 rutas de mañana ya optimizadas', description: 'IA procesó 142 pedidos nuevos y generó las rutas óptimas para mañana. Ahorro proyectado vs manual: 340 km (-19%), $186 en combustible.' },
          { type: 'prediction', icon: '📊', title: 'Predicción de congestión', description: 'El modelo predice tráfico pesado en zona industrial mañana 7-9am (patrón histórico + evento local). Rutas ya redirigidas preventivamente.' },
          { type: 'recommendation', icon: '💡', title: 'Oportunidad: consolidar 3 rutas', description: 'Los pedidos de las zonas Sur-03, Sur-04 y Sur-07 pueden consolidarse en una sola ruta. Ahorro: 1 camión, $320/día.' },
        ],
        impacts: [
          { label: 'Entregas a tiempo', before: '78%', after: '96%', unit: '' },
          { label: 'Km recorridos por entrega', before: '12.4 km', after: '8.7 km', unit: '' },
          { label: 'Costo combustible mensual', before: '$28,400', after: '$18,200', unit: '' },
        ],
      },
      agency: {
        actionLabel: '🤖 Activar agente de coordinación de flota',
        processingMessage: 'El agente está evaluando estado de la flota, contactando conductores y coordinando recursos...',
        panelTitle: 'Agente de Operaciones',
        panelIntro: 'El agente coordina la flota en tiempo real: comunica a conductores, gestiona incidentes y coordina con clientes ante retrasos.',
        insights: [
          { type: 'automation', icon: '🤖', title: 'Agente notificó a 8 clientes sobre retraso', description: 'Martha López en pausa por falla mecánica. El agente notificó a los 7 clientes afectados, ofreció reprogramación y asignó vehículo de reemplazo.' },
          { type: 'recommendation', icon: '📋', title: 'Redistribución de carga aprobada', description: 'El agente redistribuyó 10 entregas de Ruta Oriente-02 a conductores con capacidad disponible. Sin impacto en SLA de clientes.' },
          { type: 'prediction', icon: '📈', title: 'Mantenimiento preventivo programado', description: 'El agente detectó que el vehículo XT-2847 tiene 4,800 km desde el último cambio de aceite. Cita programada para pasado mañana 8am (día de menor carga).' },
          { type: 'alert', icon: '⚠️', title: 'Zona de alto riesgo detectada', description: 'Reportes de inseguridad en zona norte para esta noche. El agente reprogramó 3 entregas para mañana y notificó a los clientes.' },
        ],
        impacts: [
          { label: 'Tiempo de respuesta ante incidentes', before: '35 minutos', after: '4 minutos', unit: '' },
          { label: 'Clientes notificados proactivamente', before: '12%', after: '100%', unit: '' },
          { label: 'Disponibilidad de flota', before: '78%', after: '91%', unit: '' },
        ],
      },
      augmentation: {
        actionLabel: '🧠 Asistir al jefe de operaciones',
        processingMessage: 'La IA está preparando el análisis de operaciones y recomendaciones estratégicas...',
        panelTitle: 'Copiloto de Operaciones',
        panelIntro: 'La IA amplifica el criterio del jefe de operaciones con análisis de eficiencia, detección de patrones y simulación de escenarios.',
        insights: [
          { type: 'insight', icon: '🔍', title: 'Patrón de retrasos identificado', description: 'El 78% de los retrasos ocurren en la zona norte los días lunes. Causa probable: tráfico por mercado semanal. El jefe puede ajustar la planificación.' },
          { type: 'prediction', icon: '📊', title: 'Simulación: 3 escenarios de flota', description: 'A) Flota actual (-$0, riesgo alto en temporada alta), B) +2 camiones (+$8,400/mes, cubre demanda), C) Flota externa en pico (flexible, +$3,200/mes).' },
          { type: 'recommendation', icon: '💡', title: 'Conductor con mayor eficiencia', description: 'Carlos Mendez tiene 4.8% más entregas por km que el promedio. La IA identificó su técnica de planificación de paradas. Documentar y compartir.' },
          { type: 'insight', icon: '🎯', title: 'Cliente con mayor costo de servicio', description: 'El cliente ACME requiere 3x más intentos de entrega que el promedio (+$48/pedido). Revisar acuerdo o ajustar ventana de entrega.' },
        ],
        impacts: [
          { label: 'Tiempo del jefe en análisis operativo', before: '4 h/día', after: '45 min/día', unit: '' },
          { label: 'Precisión en planificación de rutas', before: '74%', after: '93%', unit: '' },
          { label: 'Costo operativo por entrega', before: '$18.40', after: '$12.20', unit: '' },
        ],
      },
    },
  },

  legal: {
    appName: 'LexAI',
    appIcon: '⚖️',
    tagline: 'Análisis jurídico y gestión documental con IA',
    navItems: ['Dashboard', 'Contratos', 'Casos', 'Análisis', 'IA'],
    colorAccent: 'bg-slate-700', colorLight: 'bg-slate-50',
    colorText: 'text-slate-700', colorBorder: 'border-slate-300',
    kpis: [
      { label: 'Contratos en revisión', value: '147', change: '+23 esta semana', positive: false },
      { label: 'Tiempo rev. promedio', value: '2.4 horas', change: '-71% con IA', positive: true },
      { label: 'Cláusulas de riesgo', value: '38 detectadas', change: 'En 12 contratos', positive: false },
      { label: 'Contratos aprobados', value: '89', change: '60.5% del total', positive: true },
    ],
    tableTitle: 'Contratos en proceso — Análisis IA',
    tableHeaders: ['Contrato', 'Tipo', 'Páginas', 'Riesgo IA', 'Estado'],
    tableRows: [
      { cells: ['Contrato Suministro-2847', 'B2B Servicios', '48 pág', '🔴 Alto', 'Revisar'], status: 'critical', highlight: true },
      { cells: ['NDA Tech Partners', 'Confidencialidad', '12 pág', '🟢 Bajo', 'Listo para firma'], status: 'ok' },
      { cells: ['Arrendamiento Oficinas-3', 'Inmueble', '34 pág', '🟡 Medio', 'En revisión'], status: 'warning', highlight: true },
      { cells: ['Contrato Laboral Masivo', 'RRHH x50', '8 pág c/u', '🟢 Bajo', 'Aprobado'], status: 'ok' },
      { cells: ['Acuerdo Distribución MX', 'Comercial', '67 pág', '🔴 Alto', 'Escalado'], status: 'critical', highlight: true },
    ],
    variants: {
      automation: {
        actionLabel: '▶ Analizar contratos automáticamente',
        processingMessage: 'La IA está extrayendo cláusulas, identificando riesgos y comparando con plantillas estándar...',
        panelTitle: 'Motor de Análisis Automático',
        panelIntro: 'La IA analiza automáticamente contratos estándar, extrae cláusulas clave, detecta riesgos y genera el resumen ejecutivo.',
        insights: [
          { type: 'alert', icon: '🔴', title: 'Riesgo alto en Contrato Suministro-2847', description: '3 cláusulas críticas: penalidad por retraso asimétrica (5x mayor para nosotros), renuncia implícita a arbitraje, jurisdicción desfavorable (Delaware).' },
          { type: 'automation', icon: '🤖', title: '89 contratos estándar procesados automáticamente', description: 'NDA, contratos laborales y acuerdos de confidencialidad estándar procesados sin intervención. Resúmenes ejecutivos generados en 3 minutos.' },
          { type: 'recommendation', icon: '💡', title: 'Redacción alternativa sugerida', description: 'Para la cláusula de penalidad del Suministro-2847, la IA generó 3 redacciones alternativas que protegen nuestros intereses. Abogado revisa y selecciona.' },
          { type: 'prediction', icon: '📊', title: 'Comparación con contratos similares', description: 'El Acuerdo Distribución MX tiene condiciones 34% más onerosas que los 12 contratos de distribución firmados en 2024. Margen de negociación: estimado en 20%.' },
        ],
        impacts: [
          { label: 'Tiempo de revisión por contrato', before: '8.4 horas', after: '2.4 horas', unit: '' },
          { label: 'Cláusulas de riesgo detectadas', before: '67%', after: '98%', unit: '' },
          { label: 'Contratos procesados por abogado/mes', before: '18', after: '67', unit: '' },
        ],
      },
      agency: {
        actionLabel: '🤖 Activar agente de gestión contractual',
        processingMessage: 'El agente está coordinando revisiones, enviando recordatorios y gestionando el flujo de aprobaciones...',
        panelTitle: 'Agente de Gestión Contractual',
        panelIntro: 'El agente gestiona todo el ciclo de vida del contrato: coordina revisores, envía recordatorios, actualiza el estado y gestiona firmas digitales.',
        insights: [
          { type: 'automation', icon: '🤖', title: 'Flujo de aprobación coordinado automáticamente', description: 'El agente envió el Contrato Suministro-2847 a los 3 revisores necesarios (legal, comercial, finanzas) con deadline y checklist específico para cada uno.' },
          { type: 'recommendation', icon: '📋', title: 'Negociación asistida en curso', description: 'El agente redactó la contrapropuesta para Acuerdo Distribución MX con las 4 modificaciones solicitadas por el equipo. Lista para envío con un clic.' },
          { type: 'prediction', icon: '📈', title: 'Alertas de vencimiento próximo', description: 'El agente detectó 8 contratos que vencen en los próximos 30 días. Notificó a los responsables y agendó reuniones de renovación automáticamente.' },
          { type: 'alert', icon: '⚠️', title: 'SLA de revisión en riesgo', description: '3 contratos llevan > 5 días sin movimiento. El agente escaló con el socio senior y programó recordatorios diarios hasta cierre.' },
        ],
        impacts: [
          { label: 'Ciclo de aprobación de contratos', before: '18 días', after: '6 días', unit: '' },
          { label: 'Contratos vencidos sin renovar', before: '12%', after: '1.4%', unit: '' },
          { label: 'Horas admin del equipo legal', before: '22 h/semana', after: '4 h/semana', unit: '' },
        ],
      },
      augmentation: {
        actionLabel: '🧠 Asistir al abogado senior',
        processingMessage: 'La IA está preparando el análisis jurídico y los precedentes relevantes para el abogado...',
        panelTitle: 'Copiloto Jurídico',
        panelIntro: 'La IA amplifica el criterio del abogado con análisis de precedentes, comparación de cláusulas y redacción de alternativas — el abogado siempre decide.',
        insights: [
          { type: 'insight', icon: '🔍', title: 'Análisis de precedentes — Suministro-2847', description: 'En 3 litigios similares de 2021-2023, la cláusula de penalidad asimétrica fue declarada abusiva en 2 casos. El abogado puede citar jurisprudencia.' },
          { type: 'prediction', icon: '📊', title: 'Evaluación de riesgo litigioso', description: 'Bajo las condiciones actuales del contrato, el riesgo de litigio se estima en 23% en los próximos 24 meses. Con las modificaciones sugeridas: 4%.' },
          { type: 'recommendation', icon: '💡', title: 'Cláusulas de protección sugeridas', description: 'Para el Acuerdo Distribución MX, la IA sugiere agregar: cláusula de cambio material, limitación de responsabilidad y mecanismo de resolución escalonada.' },
          { type: 'insight', icon: '🎯', title: 'Inconsistencia detectada', description: 'El plazo de entrega en la cláusula 4.2 (30 días) contradice el definido en el Anexo B (45 días). Requiere corrección antes de la firma.' },
        ],
        impacts: [
          { label: 'Tiempo del abogado en investigación', before: '4.5 h/contrato', after: '35 min/contrato', unit: '' },
          { label: 'Riesgos detectados antes de firma', before: '72%', after: '97%', unit: '' },
          { label: 'Horas facturables del abogado', before: '5.2 h/día', after: '7.8 h/día', unit: '' },
        ],
      },
    },
  },

  government: {
    appName: 'GovFlow AI',
    appIcon: '🏛️',
    tagline: 'Gestión documental y atención ciudadana con IA',
    navItems: ['Dashboard', 'Trámites', 'Documentos', 'Ciudadanos', 'IA'],
    colorAccent: 'bg-blue-800', colorLight: 'bg-blue-50',
    colorText: 'text-blue-800', colorBorder: 'border-blue-200',
    kpis: [
      { label: 'Trámites en proceso', value: '4,821', change: '-31% tiempo promedio', positive: true },
      { label: 'Tiempo resolución prom.', value: '3.2 días', change: '-68% con IA', positive: true },
      { label: 'Documentos procesados', value: '12,847/mes', change: '+340% capacidad', positive: true },
      { label: 'Satisfacción ciudadana', value: '7.8/10', change: '+2.1 pts', positive: true },
    ],
    tableTitle: 'Trámites en revisión — Clasificación IA',
    tableHeaders: ['ID', 'Tipo de trámite', 'Ciudadano', 'Documentos', 'Estado IA'],
    tableRows: [
      { cells: ['T-48291', 'Licencia comercial', 'J. Martínez', '7/7 ✓', '🟢 Listo para aprobar'], status: 'ok' },
      { cells: ['T-48292', 'Permiso construcción', 'A. González', '4/8 ⚠', '🟡 Incompleto'], status: 'warning', highlight: true },
      { cells: ['T-48293', 'Certificado nacimiento', 'M. Castro', '2/2 ✓', '🟢 Listo para aprobar'], status: 'ok' },
      { cells: ['T-48294', 'Subsidio PYME', 'Tech Startup SRL', '6/9 ⚠', '🟡 En revisión'], status: 'warning', highlight: true },
      { cells: ['T-48295', 'Habilitación sanitaria', 'Restaurante ABC', '9/9 ✓', '🔴 Requiere inspección'], status: 'critical', highlight: true },
    ],
    variants: {
      automation: {
        actionLabel: '▶ Procesar trámites automáticamente',
        processingMessage: 'La IA está verificando documentos, validando requisitos y clasificando trámites por estado de completitud...',
        panelTitle: 'Procesador Automático de Trámites',
        panelIntro: 'La IA verifica automáticamente la completitud de los expedientes, clasifica los trámites y aprueba los que cumplen todos los requisitos sin intervención humana.',
        insights: [
          { type: 'automation', icon: '✅', title: '1,247 trámites resueltos automáticamente hoy', description: '73% del volumen total procesado sin intervención humana. Certificados, renovaciones y trámites estándar con documentación completa.' },
          { type: 'alert', icon: '⚠️', title: 'T-48292: documentos faltantes detectados', description: 'La IA identificó que faltan planos firmados por arquitecto y certificado de uso de suelo. Notificación enviada automáticamente al ciudadano con lista de pendientes.' },
          { type: 'recommendation', icon: '💡', title: 'Cuello de botella identificado', description: 'El 34% de los retrasos en permisos de construcción se deben a verificación manual de planos. La IA puede automatizar la verificación de formato en 94% de los casos.' },
          { type: 'prediction', icon: '📊', title: 'Predicción de demanda de trámites', description: 'El modelo predice un aumento del 45% en solicitudes de habilitaciones sanitarias en las próximas 3 semanas (fin de restricciones estacionales).' },
        ],
        impacts: [
          { label: 'Tiempo promedio de resolución', before: '10.4 días', after: '3.2 días', unit: '' },
          { label: 'Trámites resueltos sin visita presencial', before: '23%', after: '78%', unit: '' },
          { label: 'Costo por trámite procesado', before: '$42', after: '$8.60', unit: '' },
        ],
      },
      agency: {
        actionLabel: '🤖 Activar agente de atención ciudadana',
        processingMessage: 'El agente está procesando consultas, verificando estados de trámites y coordinando con áreas...',
        panelTitle: 'Agente de Atención Ciudadana',
        panelIntro: 'El agente atiende consultas de ciudadanos 24/7, verifica el estado de sus trámites, solicita documentos faltantes y coordina citas cuando se requiere inspección.',
        insights: [
          { type: 'automation', icon: '🤖', title: 'Agente atendió 2,847 consultas esta semana', description: 'WhatsApp: 1,240, Web: 987, Teléfono: 620. Resolución sin derivar: 89%. Tiempo promedio de respuesta: 38 segundos vs 4.2 horas anterior.' },
          { type: 'recommendation', icon: '📋', title: 'Seguimiento proactivo de T-48294', description: 'El agente contactó a Tech Startup SRL para solicitar los 3 documentos faltantes del subsidio. Plazo: 5 días hábiles. Recordatorio programado.' },
          { type: 'prediction', icon: '📈', title: 'Agendamiento automático de inspecciones', description: 'El agente coordinó 23 inspecciones de habilitaciones sanitarias con el equipo de campo para la próxima semana, optimizando rutas geográficas.' },
          { type: 'alert', icon: '⚠️', title: 'Ciudadano con trámite vencido', description: 'T-48290 tiene 15 días sin respuesta del ciudadano. El agente envió último aviso de vencimiento. Si no responde en 48h, se archivará automáticamente.' },
        ],
        impacts: [
          { label: 'Costo de atención ciudadana', before: '$8.40/consulta', after: '$0.60/consulta', unit: '' },
          { label: 'Disponibilidad horaria', before: '8 horas/día', after: '24 horas/día', unit: '' },
          { label: 'Satisfacción del ciudadano', before: '5.7/10', after: '7.8/10', unit: '' },
        ],
      },
      augmentation: {
        actionLabel: '🧠 Asistir al funcionario revisor',
        processingMessage: 'La IA está preparando el expediente completo y los criterios de evaluación para el funcionario...',
        panelTitle: 'Copiloto del Funcionario',
        panelIntro: 'La IA amplifica el criterio del funcionario con contexto del expediente, precedentes similares y checklist de verificación — la decisión siempre es del funcionario.',
        insights: [
          { type: 'insight', icon: '🔍', title: 'Expediente T-48295 analizado', description: 'Restaurante ABC: sin antecedentes negativos en el registro, 3 años operando, sede anterior aprobada sin observaciones. Contexto favorable para la inspección.' },
          { type: 'recommendation', icon: '💡', title: 'Puntos críticos para la inspección', description: 'Basado en inspecciones anteriores del mismo tipo de local: verificar área de manipulación de alimentos (63% de observaciones en esa zona), ventilación y manejo de residuos.' },
          { type: 'prediction', icon: '📊', title: 'Comparación con trámites similares', description: 'De 47 habilitaciones sanitarias similares en los últimos 6 meses, 89% fueron aprobadas. El perfil de este solicitante es mejor que el promedio del segmento.' },
          { type: 'alert', icon: '⚠️', title: 'Inconsistencia en documentación', description: 'El certificado de fumigación (anexo 6) fue emitido hace 14 meses — la normativa requiere que no supere 12 meses. El funcionario debe decidir si solicitar actualización.' },
        ],
        impacts: [
          { label: 'Tiempo de revisión por expediente', before: '2.5 horas', after: '28 minutos', unit: '' },
          { label: 'Consistencia de resoluciones similares', before: '71%', after: '94%', unit: '' },
          { label: 'Documentación previa leída', before: '40%', after: '100%', unit: '' },
        ],
      },
    },
  },
}

// Fallback para industrias sin demo específico
const FALLBACK_SIMULATION: SimulationConfig = {
  appName: 'FlowAI',
  appIcon: '🤖',
  tagline: 'Gestión de procesos potenciada con IA',
  navItems: ['Dashboard', 'Procesos', 'Análisis', 'Equipo', 'IA'],
  colorAccent: 'bg-indigo-600', colorLight: 'bg-indigo-50',
  colorText: 'text-indigo-700', colorBorder: 'border-indigo-200',
  kpis: [
    { label: 'Tareas procesadas', value: '1,247', change: '+34% con IA', positive: true },
    { label: 'Tiempo promedio', value: '4.2 min', change: '-62%', positive: true },
    { label: 'Errores detectados', value: '12', change: '-81%', positive: true },
    { label: 'Productividad equipo', value: '+47%', change: 'vs línea base', positive: true },
  ],
  tableTitle: 'Actividades del equipo — Estado con IA',
  tableHeaders: ['Actividad', 'Responsable', 'Volumen', 'IA activa', 'Estado'],
  tableRows: [
    { cells: ['Revisión de documentos', 'Equipo A', '145/día', '✓ Activa', 'Optimizado'], status: 'ok' },
    { cells: ['Clasificación de solicitudes', 'Equipo B', '320/día', '✓ Activa', 'Optimizado'], status: 'ok' },
    { cells: ['Generación de reportes', 'Equipo C', '28/semana', '⚠ Parcial', 'En progreso'], status: 'warning', highlight: true },
    { cells: ['Atención de consultas', 'Equipo D', '89/día', '✓ Activa', 'Optimizado'], status: 'ok' },
    { cells: ['Análisis de datos', 'Equipo E', '12/día', '✗ Pendiente', 'Por configurar'], status: 'critical', highlight: true },
  ],
  variants: {
    automation: {
      actionLabel: '▶ Ejecutar automatización',
      processingMessage: 'La IA está procesando las tareas pendientes automáticamente...',
      panelTitle: 'Motor de Automatización',
      panelIntro: 'La IA automatiza las tareas repetitivas del equipo, liberando tiempo para trabajo de mayor valor.',
      insights: [
        { type: 'automation', icon: '🤖', title: '847 tareas procesadas automáticamente', description: 'La IA resolvió el 68% del volumen de trabajo del día sin intervención humana.' },
        { type: 'prediction', icon: '📊', title: 'Predicción de carga para mañana', description: 'El modelo estima 1,340 tareas para mañana — 12% más que el promedio. Recursos ajustados.' },
        { type: 'recommendation', icon: '💡', title: '2 procesos listos para automatización total', description: 'Clasificación de solicitudes y generación de reportes tienen suficientes datos para automatizarse al 95%.' },
        { type: 'alert', icon: '⚠️', title: 'Anomalía detectada en proceso', description: 'Tasa de error inusualmente alta en análisis de datos (4.8% vs 0.9% promedio). Se recomienda revisar la fuente de datos de entrada.' },
      ],
      impacts: [
        { label: 'Horas de trabajo manual por semana', before: '240 horas', after: '68 horas', unit: '' },
        { label: 'Costo operativo por unidad procesada', before: '$12.40', after: '$3.80', unit: '' },
        { label: 'Tiempo de ciclo del proceso', before: '3.2 días', after: '4.2 horas', unit: '' },
      ],
    },
    agency: {
      actionLabel: '🤖 Activar agente de procesos',
      processingMessage: 'El agente está coordinando tareas y tomando acciones en los sistemas...',
      panelTitle: 'Agente de Operaciones',
      panelIntro: 'El agente ejecuta flujos de trabajo completos de forma autónoma, coordinando sistemas y personas.',
      insights: [
        { type: 'automation', icon: '🤖', title: 'Agente ejecutó 23 flujos completos hoy', description: 'Desde la solicitud inicial hasta la resolución final, sin intervención humana en el proceso estándar.' },
        { type: 'recommendation', icon: '📋', title: 'Flujos pendientes de aprobación', description: '8 casos fuera del rango estándar esperan aprobación del supervisor. Resumen ejecutivo preparado.' },
        { type: 'prediction', icon: '📈', title: 'Optimización detectada', description: 'El agente identificó un atajo en el flujo de reportes que reduce 3 pasos redundantes. Propuesta lista para revisión.' },
        { type: 'alert', icon: '⚠️', title: 'Caso escalado al humano', description: 'El agente detectó un caso ambiguo que requiere criterio del supervisor. Briefing completo preparado para agilizar la decisión.' },
      ],
      impacts: [
        { label: 'Flujos completados sin intervención', before: '15%', after: '78%', unit: '' },
        { label: 'Tiempo de coordinación entre áreas', before: '2.4 días', after: '3.2 horas', unit: '' },
        { label: 'Capacidad de procesamiento del equipo', before: '100 casos/día', after: '480 casos/día', unit: '' },
      ],
    },
    augmentation: {
      actionLabel: '🧠 Asistir al equipo',
      processingMessage: 'La IA está preparando análisis y recomendaciones para el equipo...',
      panelTitle: 'Copiloto del Equipo',
      panelIntro: 'La IA amplifica la capacidad del equipo con análisis, sugerencias y contexto en tiempo real.',
      insights: [
        { type: 'insight', icon: '🔍', title: 'Análisis de productividad del equipo', description: 'Los miembros del equipo que usan el copiloto tienen 47% más output con 23% mejor calidad según métricas de revisión.' },
        { type: 'prediction', icon: '📊', title: '3 áreas de mejora identificadas', description: 'Análisis de datos, generación de reportes y revisión de documentos tienen el mayor potencial de mejora con asistencia de IA.' },
        { type: 'recommendation', icon: '💡', title: 'Conocimiento colectivo capturado', description: 'La IA documentó automáticamente los patrones de decisión del equipo experto para crear guías para el equipo junior.' },
        { type: 'alert', icon: '⚠️', title: 'Sobrecarga detectada en Equipo A', description: 'El análisis muestra que el Equipo A tiene 40% más carga que el promedio. La IA sugiere redistribuir 3 tipos de tareas al Equipo C.' },
      ],
      impacts: [
        { label: 'Productividad por persona', before: 'Línea base', after: '+47%', unit: '' },
        { label: 'Tiempo de onboarding de nuevos', before: '6 semanas', after: '2 semanas', unit: '' },
        { label: 'Calidad de outputs (revisiones)', before: '71%', after: '94%', unit: '' },
      ],
    },
  },
}

const INDUSTRY_MAP: Record<string, string> = {
  manufacturing: 'manufacturing',
  banking:       'banking',
  retail:        'retail',
  health:        'health',
  logistics:     'logistics',
  government:    'government',
  legal:         'legal',
  education:     'education',
  agro:          'agro',
  telecom:       'telecom',
  insurance:     'insurance',
  media:         'media',
  construction:  'construction',
  energy:        'energy',
}

export function getSimulation(industryId: string): SimulationConfig {
  return SIMULATIONS[INDUSTRY_MAP[industryId]] ?? FALLBACK_SIMULATION
}
