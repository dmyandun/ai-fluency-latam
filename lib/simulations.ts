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

export type SimVisualWidget =
  | { kind: 'amlInvestigationGraph' }
  | { kind: 'agencyShowcase' }
  | { kind: 'clientCopilotSplit' }

export interface SimVariant {
  actionLabel: string
  processingMessage: string
  panelTitle: string
  panelIntro: string
  insights: SimAIInsight[]
  impacts: SimImpact[]
  visualWidget?: SimVisualWidget
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
    tableTitle: 'tableTitle: estado del inventario',
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
          { type: 'recommendation', icon: '💡', title: 'Inspección visual 100% conectada', description: 'La visión IA inspecciona el 100% de las unidades (vs muestreo 1 de 20) y re-rutea defectos a retrabajo. Patrón BMW AIQX, escalado a 30+ plantas. Los repuestos de retrabajo se descuentan del stock en tiempo real.' },
        ],
        impacts: [
          { label: 'Horas de paro por falta de insumos', before: '14.2 h/mes', after: '0.8 h/mes', unit: '' },
          { label: 'Tiempo gestión de compras', before: '8 h/semana', after: '45 min/semana', unit: '' },
          { label: 'Defectos escapados al cliente', before: 'Referencia', after: '-50%+ (rango WEF Lighthouse)', unit: '' },
        ],
      },
      agency: {
        actionLabel: '🤖 Activar agente de compras',
        processingMessage: 'El agente está consultando inventario, contactando proveedores y evaluando cotizaciones...',
        panelTitle: 'Agente de Compras',
        panelIntro: 'El agente de IA consulta múltiples proveedores, compara precios, negocia condiciones y ejecuta las compras dentro de los parámetros autorizados.',
        insights: [
          { type: 'automation', icon: '🤖', title: 'Agente activo, 3 acciones ejecutadas', description: 'Consultó stock de 3 proveedores para Filtro FA-220. Mejor oferta: FilterTech a $17.20/u (urgencia 24h).' },
          { type: 'recommendation', icon: '📋', title: 'Órdenes listas para aprobar', description: '2 órdenes generadas por $6,240 en total. Dentro del límite de aprobación automática ($10,000). ¿Confirmar?' },
          { type: 'prediction', icon: '📈', title: 'Oportunidad de ahorro detectada', description: 'El agente detectó que comprando 6 meses de aceite hidráulico se obtiene 12% de descuento. Ahorro proyectado: $1,870.' },
          { type: 'alert', icon: '⚠️', title: 'Replanificación ante retraso de proveedor', description: 'El proveedor del rodamiento avisó +5 días de lead time. El agente replanificó órdenes y producción en cadena. Patrón Unilever, cuya planificación autónoma reduce 1-2% el costo total de supply chain. En LATAM, Ternium aplica IA operacional para anticipar paros (sin cifra pública).' },
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
        panelIntro: 'La IA amplifica el criterio del planificador con análisis predictivo, escenarios y recomendaciones, las decisiones siguen siendo humanas. Patrón Siemens Industrial Copilot (~30% menos tiempo de diagnóstico) y Embraer en LATAM.',
        insights: [
          { type: 'prediction', icon: '📊', title: 'Análisis de estacionalidad', description: 'Histórico muestra un aumento del 34% en consumo de rodamientos en Q4. Sugiero incrementar stock de seguridad para octubre.' },
          { type: 'recommendation', icon: '💡', title: '3 estrategias de optimización', description: 'A) Consolidar pedidos de 5 proveedores en 2 (+15% descuento). B) Adoptar VMI con SKF. C) Implementar kanban para consumibles.' },
          { type: 'insight', icon: '🔍', title: 'Patrón de consumo atípico', description: 'El aceite hidráulico tiene un consumo 40% mayor al histórico en los últimos 30 días. Posible fuga en línea 2. Revisar antes de reabastecer.' },
          { type: 'recommendation', icon: '🎯', title: 'Clasificación ABC actualizada', description: 'El filtro FA-220 debería reclasificarse a categoría A, afecta tiempo de paro crítico. Recomiendo mayor stock de seguridad.' },
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
    appName: 'BankCore AI',
    appIcon: '🏦',
    tagline: 'tagline: operaciones bancarias con IA',
    navItems: ['Dashboard', 'Fraude', 'KYC', 'Clientes', 'IA'],
    colorAccent: 'bg-blue-700', colorLight: 'bg-blue-50',
    colorText: 'text-blue-700', colorBorder: 'border-blue-200',
    kpis: [
      { label: 'Transacciones monitoreadas', value: '2.4M', change: '+18% vs ayer', positive: true },
      { label: 'Onboardings completados', value: '1,847', change: '78% straight-through', positive: true },
      { label: 'Contención en atención', value: '87%', change: '+24 pp con IA', positive: true },
      { label: 'Pérdidas por fraude', value: '-50%', change: 'vs sistema legacy', positive: true },
    ],
    tableTitle: 'Centro de operaciones IA',
    tableHeaders: ['ID', 'Cliente', 'Monto', 'Estado', 'Acción'],
    tableRows: [
      { cells: ['#CR-4821', 'Empresa XYZ S.A.', '$250,000', 'En revisión', 'Revisar'], status: 'ok' },
    ],
    variants: {
      automation: {
        actionLabel: '🕸️ Investigar red AML',
        processingMessage: 'El motor AML mapea cuentas relacionadas, detecta patrones de structuring y construye la red de relaciones sospechosas...',
        panelTitle: 'Motor Antifraude / AML',
        panelIntro: 'Inspirado en HSBC AML AI (-60% falsos positivos, +50% sospechosas interceptadas) y JPMorgan. La IA detecta automáticamente patrones de lavado, expande la red de cuentas vinculadas y genera el reporte UAF.',
        visualWidget: { kind: 'amlInvestigationGraph' },
        insights: [
          { type: 'alert',      icon: '🔴', title: 'TX-9823 bloqueada, $14,200 a Hong Kong',  description: 'Dispositivo nuevo + geolocalización atípica + monto fuera del rango histórico. Probabilidad de fraude 96%.' },
          { type: 'automation', icon: '🤖', title: '2.4M transacciones analizadas hoy',         description: 'Decisión en <10ms cada una. 312 bloqueadas automáticamente, 18 escaladas a investigador, $1.84M en pérdidas evitadas.' },
          { type: 'prediction', icon: '📊', title: 'Nuevo patrón de smurfing detectado',         description: 'Cluster de 47 cuentas relacionadas operando justo bajo el umbral de reporte. Modelo lo aprendió en 6 días y reportó a UAF.' },
          { type: 'recommendation', icon: '💡', title: 'Optimización: reducir umbral zona X',  description: 'Backtest 90 días sugiere bajar falsos positivos 12% sin perder detecciones reales. Ahorro: 340 horas/mes de analistas.' },
        ],
        impacts: [
          { label: 'Pérdidas por fraude transaccional',  before: 'Referencia', after: '-50%',         unit: '' },
          { label: 'Falsos positivos AML',               before: 'Referencia', after: '-60%',         unit: '' },
          { label: 'Tiempo de decisión por transacción', before: 'Semanas',    after: '< 10 ms',      unit: '' },
        ],
      },
      agency: {
        actionLabel: '🤖 Desplegar agentes autónomos',
        processingMessage: 'Los agentes están resolviendo créditos y cobranza end-to-end sin intervención humana...',
        panelTitle: 'Agentes Autónomos',
        panelIntro: 'Dos escenarios reales: (1) orquestación multi-agente para underwriting de créditos comerciales (patrón JPMorgan COiN + Nubank nuFormer), y (2) agente de cobranza autónoma vía WhatsApp que negocia planes de pago (patrón Nubank + Mercado Pago).',
        visualWidget: { kind: 'agencyShowcase' },
        insights: [
          { type: 'automation', icon: '🤖', title: 'Expediente CR-4821 resuelto en 90 segundos',     description: 'Los 4 agentes consolidaron 11 fuentes de datos, simularon estrés a +400 bps, cruzaron AML/OFAC y produjeron condiciones óptimas, sin intervención humana.' },
          { type: 'alert',      icon: '⚠️', title: 'Compliance escaló alerta a Decisión',            description: 'Agente Compliance detectó deuda vencida de un director en otra institución. Agente Decisión incorporó la señal en su scoring final (-12 pts).' },
          { type: 'prediction', icon: '📈', title: 'Score compuesto: 762 / Riesgo BAJO',              description: 'Datos 78/100 · Riesgo 71/100 · Comportamental 85/100. Recomendación final: aprobar a 9.8% con garantía hipotecaria.' },
          { type: 'recommendation', icon: '💡', title: 'Auditoría completa generada automáticamente', description: 'Cada agente dejó trazabilidad en la bitácora de orquestación. La decisión es defendible ante el comité de crédito y los reguladores (SBS/CNBV/Superfinanciera).' },
        ],
        impacts: [
          { label: 'Tiempo de análisis end-to-end',          before: '4.5 horas',  after: '90 segundos', unit: '' },
          { label: 'Cobertura de verificación de datos',     before: '3 fuentes',  after: '11 fuentes',  unit: '' },
          { label: 'Expedientes procesados por analista/día', before: '6',          after: '180',         unit: '' },
        ],
      },
      augmentation: {
        actionLabel: '🧠 Activar copiloto del asesor',
        processingMessage: 'La IA consolida el historial del cliente, detecta señales de churn y prepara las sugerencias para la llamada del asesor...',
        panelTitle: 'Copiloto del Asesor',
        panelIntro: 'Patrón Bradesco BIA (87% de contención), Wells Fargo Fargo (245M interacciones) y DBS nudges (clientes ahorran 2x, invierten 5x). La IA prepara contexto y sugerencias; el asesor decide y ejecuta.',
        visualWidget: { kind: 'clientCopilotSplit' },
        insights: [
          { type: 'insight',        icon: '🔍', title: 'M. Salazar, perfil sintetizado en 2.1s', description: '8 años cliente premium, AUM $48.2K (+18% YoY), NPS 9/10, sin productos de inversión. Listo para llamada de las 11:30.' },
          { type: 'alert',          icon: '⚠️', title: 'Riesgo de churn 73% próximos 60 días',   description: '3 transferencias salientes a banco rival en últimos 30 días + consulta de hipoteca por WhatsApp. Llamada proactiva HOY.' },
          { type: 'recommendation', icon: '💡', title: 'Next-best-product: Fondo conservador',   description: 'Match perfil 94%. Sin productos de inversión activos en 8 años. Producto cumple su tolerancia al riesgo declarada.' },
          { type: 'prediction',     icon: '📊', title: 'Comparable con cohorte similar',          description: 'De 213 clientes con perfil idéntico, los que recibieron nudge proactivo: ahorran 2.1x, invierten 5x y suben NPS +6 puntos.' },
        ],
        impacts: [
          { label: 'Contención de consultas sin escalar', before: '63%',          after: '87%',          unit: '' },
          { label: 'NPS post-interacción',                before: '42',           after: '71',           unit: '' },
          { label: 'Tiempo de preparación pre-llamada',   before: '12 min',       after: '2 s',          unit: '' },
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
    tableTitle: 'tableTitle: productos',
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
          { type: 'prediction', icon: '📊', title: 'Pico de demanda detectado', description: 'El modelo detecta un aumento del 34% en zapatillas running en los próximos 10 días, correlación con maratón local del 15/6. Forecasting hiperlocal con clima y eventos, patrón Zara.' },
          { type: 'recommendation', icon: '💡', title: 'Oportunidad: liquidar Medias Deportivas', description: 'Stock de 3,200 u con tendencia negativa (-8%). Recomiendo escalera de descuentos 15% → 25% → 40% por quincena para liberar capital antes de fin de temporada.' },
        ],
        impacts: [
          { label: 'Quiebres de stock en top sellers', before: '12%', after: '9% (-25%, nivel Walmart)', unit: '' },
          { label: 'Tiempo del comprador en órdenes', before: '12 h/semana', after: '1.5 h/semana', unit: '' },
          { label: 'Capital inmovilizado en exceso de stock', before: '$234,000', after: '$187,000 (-20%, nivel Zara)', unit: '' },
        ],
      },
      agency: {
        actionLabel: '🤖 Activar agente de ventas omnicanal',
        processingMessage: 'El agente está analizando comportamiento de clientes, stock disponible y personalizando ofertas...',
        panelTitle: 'Agente de Ventas',
        panelIntro: 'El agente gestiona la experiencia del cliente en todos los canales: responde consultas, recomienda productos, procesa devoluciones y activa promociones. Patrón Magalu "Lu" (Brasil) y Amazon Rufus.',
        insights: [
          { type: 'automation', icon: '🤖', title: 'Agente atendió 1,247 interacciones hoy', description: 'WhatsApp: 698, Web chat: 412, Instagram DM: 137. Resolución autónoma: 91%. La venta asistida por WhatsApp convierte ~3x más que la app. Patrón Magalu Lu en LATAM.' },
          { type: 'prediction', icon: '📈', title: 'Segmento de alto valor identificado', description: '340 clientes con 3+ compras en 90 días sin compra en los últimos 30. El agente activó campaña de re-engagement personalizada.' },
          { type: 'recommendation', icon: '💡', title: 'Upsell detectado en tiempo real', description: 'Cliente consultando zapatillas Running X200: el agente recomienda también Medias Deportivas + ahorra $18 en bundle. Conversión 62%.' },
          { type: 'alert', icon: '⚠️', title: '34 devoluciones en proceso', description: 'El agente procesó 28 automáticamente (política estándar). 6 requieren criterio humano (daño reportado, cliente VIP, monto >$200).' },
        ],
        impacts: [
          { label: 'Costo de atención al cliente', before: '$4.20/interacción', after: '$0.38/interacción', unit: '' },
          { label: 'Conversión en canales asistidos por el agente', before: '1.8%', after: '5.4% (~3x, patrón Rufus / Magalu Lu)', unit: '' },
          { label: 'NPS (satisfacción del cliente)', before: '42', after: '71', unit: '' },
        ],
      },
      augmentation: {
        actionLabel: '🧠 Asistir al equipo de merchandising',
        processingMessage: 'La IA está analizando tendencias de mercado, comportamiento de compra y performance de categorías...',
        panelTitle: 'Copiloto de Merchandising',
        panelIntro: 'La IA amplifica el criterio del equipo de merchandising con análisis de tendencias, comparación competitiva y simulaciones de escenarios. Patrón de los copilotos de category manager y store manager (Carrefour "Hopla", M&S).',
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
    tagline: 'Gestión hospitalaria y flujo de pacientes con IA',
    navItems: ['Dashboard', 'Pacientes', 'Agenda', 'Camas', 'IA'],
    colorAccent: 'bg-emerald-600', colorLight: 'bg-emerald-50',
    colorText: 'text-emerald-700', colorBorder: 'border-emerald-200',
    kpis: [
      { label: 'Pacientes hoy', value: '342', change: '+12 urgencias', positive: false },
      { label: 'Tiempo espera prom.', value: '18 min', change: '-34% con IA', positive: true },
      { label: 'Camas disponibles', value: '23 / 180', change: 'Capacidad al 87%', positive: false },
      { label: 'Readmisiones 30d', value: '4.1%', change: '-1.8 pp', positive: true },
    ],
    tableTitle: 'tableTitle: flujo de pacientes',
    tableHeaders: ['Área', 'Ocupación', 'Espera prom.', 'Altas previstas hoy', 'Estado'],
    tableRows: [
      { cells: ['Urgencias', '112% (sobre capacidad)', '2h 40m', 'n/d', '🔴 Congestión'], status: 'critical', highlight: true },
      { cells: ['UCI', '92%', 'n/d', '2 altas', '⚠ Al límite'], status: 'warning', highlight: true },
      { cells: ['Hospitalización', '87%', '4h para asignar cama', '14 altas', '⚠ Altas en bloque AM'], status: 'warning' },
      { cells: ['Consulta externa', '71%', '3 semanas (lista)', 'n/d', '⚠ 30% no-shows'], status: 'warning', highlight: true },
      { cells: ['Quirófanos', '64%', 'n/d', 'n/d', 'OK'], status: 'ok' },
    ],
    variants: {
      automation: {
        actionLabel: '▶ Automatizar codificación y demanda',
        processingMessage: 'La IA está codificando altas (ICD-10), validando documentación administrativa y proyectando la demanda de urgencias...',
        panelTitle: 'Motor de Gestión Documental y Demanda',
        panelIntro: 'La IA codifica automáticamente las altas, valida la documentación administrativa y proyecta la demanda de urgencias. No toma decisiones clínicas por paciente.',
        insights: [
          { type: 'alert', icon: '🔴', title: 'Pico de demanda proyectado 18:00-22:00', description: 'El modelo proyecta 45 llegadas adicionales a urgencias esta tarde (patrón lunes). Refuerzo de turno y camillas programado automáticamente a las 17:30.' },
          { type: 'automation', icon: '🤖', title: '38 altas codificadas automáticamente hoy', description: 'Codificación ICD-10 en tiempo real desde la nota clínica, con concordancia κ≈0.87 validada en hospital real (JMIR 2024). 6 casos ambiguos derivados al codificador senior.' },
          { type: 'prediction', icon: '📊', title: 'Ocupación de camas proyectada a 48h', description: 'Con las 14 altas previstas y la demanda estimada, hospitalización llegará al 94% mañana. Traslados internos y limpieza de camas pre-programados.' },
          { type: 'recommendation', icon: '💡', title: 'Documentación incompleta detectada temprano', description: '12 expedientes con campos administrativos faltantes marcados antes de facturación, cada error de codificación cuesta ~$3,200 en promedio (AHIMA).' },
        ],
        impacts: [
          { label: 'Tiempo de codificación por alta', before: '10-15 min', after: 'Tiempo real (κ≈0.87)', unit: '' },
          { label: 'Errores de codificación y facturación', before: '6.8%', after: '1.9%', unit: '' },
          { label: 'Anticipación del pico de demanda', before: 'Reactiva', after: '3 h de antelación', unit: '' },
        ],
      },
      agency: {
        actionLabel: '🤖 Activar agente de coordinación',
        processingMessage: 'El agente está coordinando camas, agenda, recordatorios y comunicaciones con pacientes...',
        panelTitle: 'Agente de Coordinación de Pacientes',
        panelIntro: 'El agente coordina camas, agenda, recordatorios y seguimiento post-alta de forma autónoma. Patrón de sistemas multi-agente en salud (Nature Biomedical Engineering 2025). Las decisiones clínicas siguen siendo del equipo médico.',
        insights: [
          { type: 'automation', icon: '🤖', title: 'Agenda de mañana optimizada automáticamente', description: 'El agente reprogramó 8 consultas para distribuir carga uniforme. Envió confirmaciones a pacientes por WhatsApp. Cancelaciones gestionadas.' },
          { type: 'recommendation', icon: '📋', title: 'Asignación de camas optimizada', description: 'El agente identifica que la cama 114 se libera en 2 horas (alta ya indicada por el médico) y la pre-asigna al siguiente ingreso según el orden de espera de urgencias.' },
          { type: 'prediction', icon: '📈', title: 'Recordatorios inteligentes a 240 pacientes', description: 'Los pacientes con mayor probabilidad de no-show (modelo predictivo) recibieron recordatorio y opción de reagendar por WhatsApp. Sobreagenda del 8% aplicada en franjas de la tarde.' },
          { type: 'alert', icon: '⚠️', title: 'Seguimiento post-alta coordinado', description: 'El agente agendó controles y transporte para 9 pacientes dados de alta hoy. En pilotos con coordinación asistida por agentes, los reingresos caen 15-30% (Nature Biomed Eng 2025).' },
        ],
        impacts: [
          { label: 'Tiempo de coordinación de camas', before: '35 min', after: '4 min', unit: '' },
          { label: 'No-shows en citas programadas', before: '30%', after: '12%', unit: '' },
          { label: 'Reingresos a 30 días', before: '4.1%', after: '3.2% (rango 15-30% en pilotos)', unit: '' },
        ],
      },
      augmentation: {
        actionLabel: '🧠 Activar copiloto de documentación',
        processingMessage: 'La IA está transcribiendo la consulta y generando el borrador de nota para revisión del médico...',
        panelTitle: 'Copiloto de Documentación Ambiental',
        panelIntro: 'La IA escucha la consulta y genera el borrador de la nota en la historia clínica; el médico revisa, edita y firma. La decisión clínica es siempre humana. Patrón DAX/Nabla evaluado en RCT independiente (NEJM AI 2025).',
        insights: [
          { type: 'insight', icon: '🔍', title: 'Nota de consulta generada en 40 segundos', description: 'Borrador estructurado (motivo, evolución, plan administrativo) listo tras la consulta. El médico editó 2 campos y firmó, sin "pajama time" para esta cita.' },
          { type: 'prediction', icon: '📊', title: 'Evidencia real: verificado vs auto-reportado', description: 'Los vendors reportaban -50% de tiempo de documentación; el ensayo aleatorizado independiente midió -9.5% (NEJM AI 2025). Este panel muestra impacto verificado, no marketing.' },
          { type: 'recommendation', icon: '💡', title: 'Códigos sugeridos junto a la firma', description: 'La IA propone los códigos ICD-10 de la consulta con nivel de confianza; el médico confirma antes de enviar a facturación. Menos reproceso con el equipo de codificación.' },
          { type: 'alert', icon: '⚠️', title: 'Validar métricas localmente antes de escalar', description: 'Lección Epic Sepsis: un modelo desplegado a escala mostró desempeño mucho menor al declarado al validarse de forma independiente (JAMA IM 2021). Mide en tu propio piloto.' },
        ],
        impacts: [
          { label: 'Tiempo de documentación por nota', before: 'Referencia', after: '-9.5% (RCT NEJM AI 2025)', unit: '' },
          { label: 'Documentación fuera de horario', before: '1.5 h/día', after: '0.9 h/día', unit: '' },
          { label: 'Notas listas para facturar a la primera', before: '71%', after: '92%', unit: '' },
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
    tableTitle: 'tableTitle: rutas activas',
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
          { type: 'automation', icon: '🤖', title: '4 rutas de mañana ya optimizadas', description: 'IA procesó 142 pedidos nuevos y generó las rutas óptimas para mañana. Ahorro proyectado vs manual: 340 km (-19%), $186 en combustible, a escala, UPS ORION ahorra 6-8 millas por conductor/día y ~10% de combustible en 55,000 rutas.' },
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
        panelIntro: 'El agente coordina la flota en tiempo real: comunica a conductores, gestiona incidentes y coordina con clientes ante retrasos. El patrón de orquestación last-mile que Rappi opera con ML en 9 países de LATAM.',
        insights: [
          { type: 'automation', icon: '🤖', title: 'Agente notificó a 8 clientes sobre retraso', description: 'Martha López en pausa por falla mecánica. El agente notificó a los 7 clientes afectados, ofreció reprogramación y asignó vehículo de reemplazo.' },
          { type: 'recommendation', icon: '📋', title: 'Redistribución de carga aprobada', description: 'El agente redistribuyó 10 entregas de Ruta Oriente-02 a conductores con capacidad disponible. Sin impacto en SLA de clientes.' },
          { type: 'prediction', icon: '📈', title: 'Tarifa spot negociada por el agente', description: 'Para cubrir la falla mecánica, el agente cotizó con 3 transportistas externos y cerró a $145 el viaje (-8% vs referencia). Patrón Maersk + Pactum de negociación autónoma con carriers.' },
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
        panelIntro: 'La IA amplifica el criterio del jefe de operaciones con análisis de eficiencia, detección de patrones y simulación de escenarios. Patrón Flexport: el copiloto propone y redacta, el humano aprueba.',
        insights: [
          { type: 'insight', icon: '🔍', title: 'Patrón de retrasos identificado', description: 'El 78% de los retrasos ocurren en la zona norte los días lunes. Causa probable: tráfico por mercado semanal. El jefe puede ajustar la planificación.' },
          { type: 'prediction', icon: '📊', title: 'Simulación: 3 escenarios de flota', description: 'A) Flota actual (-$0, riesgo alto en temporada alta), B) +2 camiones (+$8,400/mes, cubre demanda), C) Flota externa en pico (flexible, +$3,200/mes).' },
          { type: 'recommendation', icon: '💡', title: 'Follow-ups de excepciones redactados', description: 'El copiloto redactó 12 correos de seguimiento para entregas retrasadas; el jefe aprobó 9 sin cambios. La tasa de aceptación típica de estos drafts es 70-80% (patrón Flexport).' },
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
    tableTitle: 'tableTitle: contratos en proceso',
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
        panelIntro: 'La IA amplifica el criterio del abogado con análisis de precedentes, comparación de cláusulas y redacción de alternativas, el abogado siempre decide.',
        insights: [
          { type: 'insight', icon: '🔍', title: 'Análisis de precedentes: Suministro-2847', description: 'En 3 litigios similares de 2021-2023, la cláusula de penalidad asimétrica fue declarada abusiva en 2 casos. El abogado puede citar jurisprudencia.' },
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
    tableTitle: 'tableTitle: trámites en revisión',
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
        panelIntro: 'La IA amplifica el criterio del funcionario con contexto del expediente, precedentes similares y checklist de verificación, la decisión siempre es del funcionario.',
        insights: [
          { type: 'insight', icon: '🔍', title: 'Expediente T-48295 analizado', description: 'Restaurante ABC: sin antecedentes negativos en el registro, 3 años operando, sede anterior aprobada sin observaciones. Contexto favorable para la inspección.' },
          { type: 'recommendation', icon: '💡', title: 'Puntos críticos para la inspección', description: 'Basado en inspecciones anteriores del mismo tipo de local: verificar área de manipulación de alimentos (63% de observaciones en esa zona), ventilación y manejo de residuos.' },
          { type: 'prediction', icon: '📊', title: 'Comparación con trámites similares', description: 'De 47 habilitaciones sanitarias similares en los últimos 6 meses, 89% fueron aprobadas. El perfil de este solicitante es mejor que el promedio del segmento.' },
          { type: 'alert', icon: '⚠️', title: 'Inconsistencia en documentación', description: 'El certificado de fumigación (anexo 6) fue emitido hace 14 meses, la normativa requiere que no supere 12 meses. El funcionario debe decidir si solicitar actualización.' },
        ],
        impacts: [
          { label: 'Tiempo de revisión por expediente', before: '2.5 horas', after: '28 minutos', unit: '' },
          { label: 'Consistencia de resoluciones similares', before: '71%', after: '94%', unit: '' },
          { label: 'Documentación previa leída', before: '40%', after: '100%', unit: '' },
        ],
      },
    },
  },

  agro: {
    appName: 'AgroVisión AI',
    appIcon: '🌾',
    tagline: 'Agricultura de precisión y ganadería con IA',
    navItems: ['Dashboard', 'Cultivos', 'Ganado', 'Clima', 'IA'],
    colorAccent: 'bg-green-600', colorLight: 'bg-green-50',
    colorText: 'text-green-700', colorBorder: 'border-green-200',
    kpis: [
      { label: 'Rinde promedio', value: '8.7 t/ha', change: '+1.4 vs temporada', positive: true },
      { label: 'Producción del hato', value: '22 L/día', change: 'potencial 28 L', positive: false },
      { label: 'Déficit hídrico', value: '+4°C', change: 'sobre promedio histórico', positive: false },
      { label: 'Ahorro de insumos', value: '$90K', change: 'con dosis variable', positive: true },
    ],
    tableTitle: 'tableTitle: lotes y hato',
    tableHeaders: ['Lote / Grupo', 'Tipo', 'Rinde / Producción', 'IA activa', 'Estado'],
    tableRows: [
      { cells: ['Lote L-1 Maíz', 'Cultivo', '12 t/ha', '✓ Dosis variable', 'Óptimo'], status: 'ok' },
      { cells: ['Lote L-3 Maíz', 'Cultivo', '6 t/ha', '⚠ Riego dirigido', 'En riesgo'], status: 'warning', highlight: true },
      { cells: ['Soja 50 ha', 'Cultivo', 'Llenado de grano', '⚠ Monitoreo', 'Crítico'], status: 'critical', highlight: true },
      { cells: ['Ordeño A', 'Hato', '24 L/día', '✓ Activa', 'Óptimo'], status: 'ok' },
      { cells: ['Enfermería', 'Hato', '16 L/día', '⚠ Sanidad', 'Mastitis 15%'], status: 'warning', highlight: true },
    ],
    variants: {
      automation: {
        actionLabel: '▶ Ejecutar plan de riego y dosis',
        processingMessage: 'La IA está cruzando humedad de suelo, clima y etapa fenológica para calcular riego y fertilización por zona...',
        panelTitle: 'Motor Agronómico Automático',
        panelIntro: 'La IA programa automáticamente el riego y la fertilización variable por zona según humedad, clima y etapa del cultivo.',
        insights: [
          { type: 'alert', icon: '🔴', title: 'Déficit hídrico en soja (etapa crítica)', description: '50 ha en llenado de grano con déficit hídrico y +4°C sobre el promedio. Riego dirigido programado: 35 mm en las próximas 48h para proteger el rendimiento.' },
          { type: 'automation', icon: '🤖', title: 'Dosis variable aplicada en 200 ha de maíz', description: 'La IA segmentó el lote en zonas de 12 y 6 t/ha y ajustó la fertilización por zona. Ahorro de insumo estimado: $90K/temporada sin perder rinde.' },
          { type: 'prediction', icon: '📊', title: 'Proyección de rinde a cosecha', description: 'Con el plan de riego activo, el modelo proyecta 8.7 t/ha promedio (+1.4 vs temporada anterior). Sin intervención: caída del 18% en zonas con déficit.' },
          { type: 'recommendation', icon: '💡', title: 'Ventana óptima de aplicación', description: 'La próxima ventana sin lluvia es martes 6-10am. La IA programó la aplicación foliar para minimizar evaporación y deriva.' },
        ],
        impacts: [
          { label: 'Uso de agua por hectárea', before: '4,200 m³/ha', after: '3,150 m³/ha', unit: '' },
          { label: 'Costo de fertilizante por temporada', before: '$540K', after: '$450K', unit: '' },
          { label: 'Rinde promedio', before: '7.3 t/ha', after: '8.7 t/ha', unit: '' },
        ],
      },
      agency: {
        actionLabel: '🤖 Activar agente de campo',
        processingMessage: 'El agente está consultando sensores, estación meteorológica y estado del hato para coordinar las labores...',
        panelTitle: 'Agente de Operaciones de Campo',
        panelIntro: 'El agente coordina riego, sanidad del hato y labores de campo de forma autónoma, dentro de los parámetros del productor.',
        insights: [
          { type: 'automation', icon: '🤖', title: 'Agente coordinó 6 labores hoy', description: 'Programó riego en 3 lotes, ordenó muestreo de suelo en L-3 y agendó la visita del veterinario para el grupo Enfermería. Cuadrillas notificadas por WhatsApp.' },
          { type: 'recommendation', icon: '📋', title: 'Plan sanitario del hato listo', description: 'El agente detectó 15% de mastitis subclínica en 60 vacas. Preparó protocolo de tratamiento y ajuste de dieta +20% para subir la producción de 22 a ~26 L/día.' },
          { type: 'prediction', icon: '📈', title: 'Compra de insumos optimizada', description: 'El agente consolidó el pedido de fertilizante para las 200 ha y consiguió 9% de descuento por volumen. Orden lista para aprobar.' },
          { type: 'alert', icon: '⚠️', title: 'Alerta climática gestionada', description: 'Pronóstico de helada en 72h. El agente adelantó la cosecha de 2 lotes y reprogramó las cuadrillas. Riesgo de pérdida mitigado.' },
        ],
        impacts: [
          { label: 'Tiempo de coordinación de labores', before: '6 h/día', after: '40 min/día', unit: '' },
          { label: 'Producción del hato', before: '22 L/día', after: '26 L/día', unit: '' },
          { label: 'Pérdidas por eventos climáticos', before: '$140K/año', after: '$32K/año', unit: '' },
        ],
      },
      augmentation: {
        actionLabel: '🧠 Asistir al ingeniero agrónomo',
        processingMessage: 'La IA está preparando el análisis agronómico y los escenarios de manejo para el ingeniero...',
        panelTitle: 'Copiloto Agronómico',
        panelIntro: 'La IA amplifica el criterio del ingeniero con análisis de suelo, clima y escenarios de manejo, la decisión agronómica sigue siendo humana.',
        insights: [
          { type: 'insight', icon: '🔍', title: 'Heterogeneidad del lote detectada', description: 'El mapa de rinde muestra zonas de 12 vs 6 t/ha en el mismo lote de maíz. Probable causa: diferencia de materia orgánica y compactación en la zona baja.' },
          { type: 'prediction', icon: '📊', title: 'Simulación: 3 estrategias de riego', description: 'A) Riego uniforme ($120/ha, +6% rinde). B) Riego dirigido a zonas críticas (+11% rinde, -30% agua). C) Diferir y arriesgar lluvia. Costo y riesgo por escenario.' },
          { type: 'recommendation', icon: '💡', title: 'Plan de sanidad para el hato', description: 'Con 15% de mastitis subclínica, la IA sugiere 3 medidas: muestreo dirigido, ajuste de la rutina de ordeño y dieta +20%. El ingeniero decide cuáles aplicar.' },
          { type: 'insight', icon: '🎯', title: 'Oportunidad de agricultura de precisión', description: 'Adoptar dosis variable en las 200 ha optimizaría $90K en fertilizante. ROI estimado del equipo de precisión: 1.4 temporadas.' },
        ],
        impacts: [
          { label: 'Tiempo del ingeniero en análisis', before: '5 h/día', after: '50 min/día', unit: '' },
          { label: 'Precisión en decisiones de manejo', before: '70%', after: '92%', unit: '' },
          { label: 'Rinde por hectárea', before: '7.3 t/ha', after: '8.7 t/ha', unit: '' },
        ],
      },
    },
  },

  telecom: {
    appName: 'NetPulse AI',
    appIcon: '📡',
    tagline: 'Operación de red y experiencia del cliente con IA',
    navItems: ['Dashboard', 'Red', 'Clientes', 'Tickets', 'IA'],
    colorAccent: 'bg-sky-600', colorLight: 'bg-sky-50',
    colorText: 'text-sky-700', colorBorder: 'border-sky-200',
    kpis: [
      { label: 'Churn mensual', value: '2.8%', change: '$1.2M ingresos perdidos/mes', positive: false },
      { label: 'Tickets/semana', value: '12K', change: '55% repetitivos', positive: false },
      { label: 'Nodo norte (pico)', value: '85%', change: 'congestión en hora pico', positive: false },
      { label: 'CSAT', value: '6.2/10', change: 'resolución 48h promedio', positive: false },
    ],
    tableTitle: 'tableTitle: red y soporte',
    tableHeaders: ['Celda / Zona', 'Carga pico', 'Churn zona', 'IA activa', 'Estado'],
    tableRows: [
      { cells: ['N-01 Norte', '85%', '6.0%', '⚠ Ampliar capacidad', 'Congestión'], status: 'critical', highlight: true },
      { cells: ['E-02 Este', '71%', '3.1%', '✓ Balanceo', 'Al límite'], status: 'warning', highlight: true },
      { cells: ['C-05 Centro', '74%', '2.6%', '✓ Monitoreo', 'Creciente'], status: 'warning' },
      { cells: ['O-04 Oeste', '62%', '1.8%', '✓ Activa', 'Estable'], status: 'ok' },
      { cells: ['S-03 Sur', '48%', '1.2%', '✓ Activa', 'Estable'], status: 'ok' },
    ],
    variants: {
      automation: {
        actionLabel: '▶ Optimizar red automáticamente',
        processingMessage: 'La IA está analizando carga por celda, tráfico en tiempo real y patrones de congestión...',
        panelTitle: 'Motor de Optimización de Red',
        panelIntro: 'La IA balancea tráfico y ajusta capacidad entre celdas automáticamente para prevenir congestión en hora pico.',
        insights: [
          { type: 'alert', icon: '🔴', title: 'Congestión en nodo Norte (N-01)', description: 'Carga al 85% en hora pico con 40% de tickets por velocidad baja en la zona. La IA balanceó tráfico hacia E-02 y programó ampliación de capacidad prioritaria.' },
          { type: 'automation', icon: '🤖', title: '6,600 tickets repetitivos resueltos por IA', description: 'De 12K tickets/semana, el 55% son consultas de facturación y configuración. La IA conversacional los resolvió sin agente. Respuesta: 38 seg vs 48h.' },
          { type: 'prediction', icon: '📊', title: 'Modo sueño nocturno en 38 celdas', description: 'Entre 1:00 y 5:00 la IA apaga portadoras con tráfico mínimo y las despierta al subir la demanda. Patrón Vodafone/Ericsson: 25-33% menos energía de RAN, con la energía pesando 20-40% del OPEX de red.' },
          { type: 'recommendation', icon: '💡', title: 'Bloqueo automático de spam y fraude', description: '4,120 llamadas y SMS fraudulentos bloqueados hoy en la red sin intervención humana. El patrón Airtel redujo 68.7% las pérdidas financieras por fraude.' },
        ],
        impacts: [
          { label: 'Tickets que requieren agente humano', before: '12K/semana', after: '5.4K/semana', unit: '' },
          { label: 'Consumo energético de la RAN', before: 'Referencia', after: '-25-33% (cell sleep con ML)', unit: '' },
          { label: 'Congestión en hora pico', before: '85%', after: '61%', unit: '' },
        ],
      },
      agency: {
        actionLabel: '🤖 Activar agente de experiencia del cliente',
        processingMessage: 'El agente está revisando tickets abiertos, estado de la red y perfiles de clientes en riesgo...',
        panelTitle: 'Agente de Experiencia del Cliente',
        panelIntro: 'El agente gestiona soporte, retención y coordinación con el área técnica de forma autónoma, 24/7. Camino al nivel 4 de autonomía del TM Forum, validado por primera vez por DNB + Ericsson (2025).',
        insights: [
          { type: 'automation', icon: '🤖', title: 'Agente atendió 8,420 interacciones hoy', description: 'WhatsApp, app y web. Resolución sin derivar: 88%. En línea con lo que Amdocs reporta para billing (>90%, cifra del vendor sin auditoría independiente). Abrió 3 órdenes de trabajo al área técnica automáticamente.' },
          { type: 'recommendation', icon: '📋', title: 'Plan de retención para 1,240 clientes', description: 'El agente segmentó a los clientes en fuga (2+ tickets, consumo a la baja) y preparó ofertas personalizadas. Retención proactiva antes del 3er ticket.' },
          { type: 'prediction', icon: '📈', title: 'Órdenes técnicas coordinadas', description: 'El agente priorizó la ampliación de N-01 y agendó la cuadrilla de campo para mañana 7am (menor tráfico). Clientes afectados notificados.' },
          { type: 'alert', icon: '⚠️', title: 'Cliente corporativo en riesgo', description: 'Una cuenta de $45K/año reportó 4 caídas en 2 semanas. El agente escaló a un ejecutivo senior con el historial completo y una propuesta de compensación.' },
        ],
        impacts: [
          { label: 'Costo de atención por interacción', before: '$4.10', after: '$0.42', unit: '' },
          { label: 'Churn mensual', before: '2.8%', after: '1.7%', unit: '' },
          { label: 'Disponibilidad de soporte', before: '12 h/día', after: '24 h/día', unit: '' },
        ],
      },
      augmentation: {
        actionLabel: '🧠 Asistir a los agentes de soporte',
        processingMessage: 'La IA está preparando el contexto del cliente y las sugerencias de respuesta para el agente en llamada...',
        panelTitle: 'Copiloto del Agente de Soporte',
        panelIntro: 'La IA sugiere respuestas, diagnósticos y próximos pasos al agente durante la llamada. Patrón Vivo I.Ajuda (Telefônica Brasil, 23,000 agentes); el agente humano decide qué aplicar.',
        insights: [
          { type: 'insight', icon: '🔍', title: 'Contexto del cliente en pantalla en 2 segundos', description: 'Historial de tickets, estado del nodo de su zona (N-01 congestionado) y facturación consolidados antes de que el agente conteste la llamada.' },
          { type: 'prediction', icon: '📊', title: 'Sugerencia con nivel de confianza', description: 'Para el reclamo de velocidad, el copiloto sugiere: informar la ampliación de N-01 + descuento temporal (confianza 87%). El agente acepta, edita o descarta.' },
          { type: 'recommendation', icon: '💡', title: 'Primera resolución en aumento', description: 'Con las sugerencias del copiloto, la primera resolución del piloto pasó de 15% a 41% en 2 meses. Vodafone SuperTOBi la llevó de 15% a 60%.' },
          { type: 'alert', icon: '⚠️', title: 'Casos técnicos: derivar con criterio', description: 'Los LLM genéricos fallan 30-40% en preguntas técnicas de red (benchmark NetEval); el copiloto responde desde la base de conocimiento interna y marca cuándo derivar al NOC.' },
        ],
        impacts: [
          { label: 'Primera resolución (FCR)', before: '15%', after: '60% (patrón Vodafone SuperTOBi)', unit: '' },
          { label: 'Tiempo medio de atención (AHT)', before: '9 min', after: '8.2 min (-9%, Vivo I.Ajuda)', unit: '' },
          { label: 'CSAT (satisfacción del cliente)', before: '6.2/10', after: '8.1/10', unit: '' },
        ],
      },
    },
  },

  construction: {
    appName: 'ObraSmart AI',
    appIcon: '🏗️',
    tagline: 'Gestión de proyectos y obra con IA',
    navItems: ['Dashboard', 'Proyectos', 'Cuadrillas', 'Costos', 'IA'],
    colorAccent: 'bg-amber-600', colorLight: 'bg-amber-50',
    colorText: 'text-amber-700', colorBorder: 'border-amber-200',
    kpis: [
      { label: 'Obras activas', value: '4', change: 'inversión total $47.1M', positive: true },
      { label: 'En plazo', value: '75%', change: '1 obra atrasada', positive: false },
      { label: 'Accidentes', value: '3.2', change: 'por 200K hrs (meta 1.5)', positive: false },
      { label: 'Desperdicio', value: '14%', change: '$180K en sobrecostos', positive: false },
    ],
    tableTitle: 'tableTitle: obras',
    tableHeaders: ['Obra', 'Ubicación', 'Avance físico', 'Presupuesto', 'Estado'],
    tableRows: [
      { cells: ['OBR-01 Torre Norte', 'Zona financiera', '45%', '62%', '🔴 Atrasado'], status: 'critical', highlight: true },
      { cells: ['OBR-02 C. Comercial Sur', 'Periferia', '70%', '68%', '🟢 En obra'], status: 'ok' },
      { cells: ['OBR-03 Hospital Regional', 'Centro', '28%', '25%', '🟢 En obra'], status: 'ok' },
      { cells: ['OBR-04 Condominio Las Lomas', 'Las Lomas', '100%', '97%', '✓ Entregado'], status: 'ok' },
      { cells: ['Seguridad, 5 obras', '120 trabajadores', '3.2 índice', 'meta 1.5', '⚠ Sobre meta'], status: 'warning', highlight: true },
    ],
    variants: {
      automation: {
        actionLabel: '▶ Recalcular costos y materiales',
        processingMessage: 'La IA está cruzando avance físico, presupuesto ejecutado y consumo de materiales para detectar desvíos...',
        panelTitle: 'Motor de Control de Obra',
        panelIntro: 'La IA monitorea costos, avance y consumo de materiales en tiempo real, alertando desvíos y generando pedidos optimizados.',
        insights: [
          { type: 'alert', icon: '🔴', title: 'Sobrecosto proyectado en OBR-01', description: 'Presupuesto ejecutado 62% vs avance físico 45%. Al ritmo actual, sobrecosto proyectado de $1.4M. Acción correctiva recomendada de inmediato.' },
          { type: 'automation', icon: '🤖', title: 'Pedidos de material optimizados', description: 'La IA recalculó las necesidades de concreto y acero por avance real, no por estimación manual. Desperdicio del 14% al 6% = $103K ahorrados.' },
          { type: 'prediction', icon: '📊', title: 'Proyección de cronograma', description: 'OBR-01 terminará con 7 semanas de retraso si no se actúa. La IA propone reforzar 2 cuadrillas en estructura para recuperar 4 semanas.' },
          { type: 'recommendation', icon: '💡', title: 'Riesgo de seguridad priorizado', description: 'Índice de accidentes 3.2 vs meta 1.5, concentrado en trabajo en altura y 2 cuadrillas. Plan de seguridad focalizado generado automáticamente.' },
        ],
        impacts: [
          { label: 'Desperdicio de materiales', before: '14%', after: '6%', unit: '' },
          { label: 'Desvío de presupuesto', before: '+17 pp', after: '+4 pp', unit: '' },
          { label: 'Detección de sobrecostos', before: 'al cierre', after: 'en tiempo real', unit: '' },
        ],
      },
      agency: {
        actionLabel: '🤖 Activar agente de gestión de obra',
        processingMessage: 'El agente está coordinando cuadrillas, proveedores y reportes de avance de las obras...',
        panelTitle: 'Agente de Gestión de Proyecto',
        panelIntro: 'El agente coordina cuadrillas, proveedores, pedidos y reportes de avance de todas las obras de forma autónoma.',
        insights: [
          { type: 'automation', icon: '🤖', title: 'Agente coordinó 4 obras hoy', description: 'Consolidó reportes de avance, detectó 3 subcontratistas con retraso en OBR-01 y reasignó frentes de trabajo. Bitácora actualizada automáticamente.' },
          { type: 'recommendation', icon: '📋', title: 'Pedidos a proveedores listos', description: 'El agente generó las órdenes de concreto y acero para las 4 obras según avance real, con entregas escalonadas para no inmovilizar capital. Listas para aprobar.' },
          { type: 'prediction', icon: '📈', title: 'Plan de recuperación de OBR-01', description: 'El agente preparó un plan de aceleración: 2 cuadrillas adicionales y turno extendido. Costo $86K, recupera 4 semanas. Decisión del director de obra.' },
          { type: 'alert', icon: '⚠️', title: 'Riesgo de seguridad escalado', description: 'El agente detectó una cuadrilla con 2 incidentes en trabajo en altura. Suspendió la tarea, notificó al jefe de seguridad y agendó capacitación obligatoria.' },
        ],
        impacts: [
          { label: 'Tiempo de coordinación entre obras', before: '3 días', after: '4 horas', unit: '' },
          { label: 'Subcontratistas con retraso sin detectar', before: '40%', after: '5%', unit: '' },
          { label: 'Capital inmovilizado en materiales', before: '$620K', after: '$240K', unit: '' },
        ],
      },
      augmentation: {
        actionLabel: '🧠 Asistir al director de obra',
        processingMessage: 'La IA está preparando el análisis de portafolio de obras y los escenarios de acción...',
        panelTitle: 'Copiloto del Director de Obra',
        panelIntro: 'La IA amplifica el criterio del director con análisis de costos, cronograma y riesgo por obra, las decisiones siguen siendo humanas.',
        insights: [
          { type: 'insight', icon: '🔍', title: 'Análisis de portafolio', description: '4 obras, $47.1M de inversión. OBR-01 (Torre Norte) es la única con desvío crítico de costo; las otras 3 están en plazo. El foco debe estar en la estructura de OBR-01.' },
          { type: 'prediction', icon: '📊', title: 'Simulación: 3 escenarios para OBR-01', description: 'A) Acelerar (+$86K, -4 sem). B) Renegociar subcontrato (riesgo legal, -2 sem). C) Mantener (sobrecosto $1.4M). Costo y riesgo por escenario.' },
          { type: 'recommendation', icon: '💡', title: 'Plan de reducción de desperdicio', description: 'Pasar de pedidos por estimación manual a planificación por modelo reduciría el desperdicio del 14% al 6% ($103K). El director decide el alcance del piloto.' },
          { type: 'alert', icon: '⚠️', title: 'Punto crítico de seguridad', description: 'El índice de accidentes (3.2) duplica la meta y se concentra en trabajo en altura. Recomendación: auditoría de seguridad en las 2 cuadrillas antes de continuar.' },
        ],
        impacts: [
          { label: 'Tiempo del director en control de obra', before: '5 h/día', after: '1 h/día', unit: '' },
          { label: 'Obras entregadas en plazo', before: '75%', after: '92%', unit: '' },
          { label: 'Sobrecostos por obra', before: '17%', after: '5%', unit: '' },
        ],
      },
    },
  },

  insurance: {
    appName: 'AseguraAI',
    appIcon: '🛡️',
    tagline: 'Suscripción y gestión de siniestros con IA',
    navItems: ['Dashboard', 'Pólizas', 'Siniestros', 'Riesgo', 'IA'],
    colorAccent: 'bg-cyan-600', colorLight: 'bg-cyan-50',
    colorText: 'text-cyan-700', colorBorder: 'border-cyan-200',
    kpis: [
      { label: 'Pólizas vigentes', value: '25,000', change: 'cancelación 9% anual', positive: false },
      { label: 'Siniestros en revisión', value: '142', change: '+18 esta semana', positive: false },
      { label: 'Loss ratio', value: '62%', change: '-3 pp con IA', positive: true },
      { label: 'Tiempo de liquidación', value: '2.4 días', change: '-71% con IA', positive: true },
    ],
    tableTitle: 'tableTitle: siniestros y pólizas',
    tableHeaders: ['ID', 'Tipo', 'Monto', 'Riesgo / Fraude IA', 'Estado'],
    tableRows: [
      { cells: ['SIN-2041', 'Auto · colisión', '$8,400', '🟡 Revisión', 'En peritaje'], status: 'warning', highlight: true },
      { cells: ['SIN-2033', 'Hogar', '$48,000', '🔴 Posible fraude', 'Investigación'], status: 'critical', highlight: true },
      { cells: ['SIN-2038', 'Auto · cristales', '$1,200', '🟢 Bajo', 'Aprobado'], status: 'ok' },
      { cells: ['POL-7720', 'Auto · nueva', '$35,000 aseg.', '🔴 Riesgo alto', 'Suscripción'], status: 'critical', highlight: true },
      { cells: ['POL-6510', 'Vida', 'Renovación', '🟡 En fuga', 'Retención'], status: 'warning' },
    ],
    variants: {
      automation: {
        actionLabel: '▶ Procesar siniestros automáticamente',
        processingMessage: 'La IA está evaluando siniestros, validando coberturas y detectando inconsistencias de fraude...',
        panelTitle: 'Motor de Siniestros Automático',
        panelIntro: 'La IA evalúa automáticamente los siniestros estándar, valida coberturas y marca los casos con señales de fraude.',
        insights: [
          { type: 'alert', icon: '🔴', title: 'Posible fraude en SIN-2033', description: 'Reclamo de $48K en póliza de hogar con solo 4 meses de antigüedad, justo antes del vencimiento de un plazo, y fotos con inconsistencias en las fechas. Marcado para investigación.' },
          { type: 'automation', icon: '🤖', title: '118 siniestros liquidados automáticamente', description: '83% del volumen estándar (cristales, choques menores) resuelto sin perito. Tiempo de liquidación: 2.4 días vs 9 días manual.' },
          { type: 'prediction', icon: '📊', title: 'Score de riesgo para POL-7720', description: 'Conductor de 24a, primera póliza, vehículo deportivo, zona de alta siniestralidad. Modelo: probabilidad de siniestro 2.3x el promedio. Prima ajustada + deducible alto sugeridos.' },
          { type: 'recommendation', icon: '💡', title: 'Retención predictiva activada', description: 'La IA detectó 2,250 pólizas de vida (2-3 años, sin uso de beneficios) con alta probabilidad de cancelación. Campaña de retención dirigida lanzada.' },
        ],
        impacts: [
          { label: 'Tiempo de liquidación de siniestros', before: '9 días', after: '2.4 días', unit: '' },
          { label: 'Fraudes detectados antes de pagar', before: '34%', after: '89%', unit: '' },
          { label: 'Costo de gestión por siniestro', before: '$120', after: '$22', unit: '' },
        ],
      },
      agency: {
        actionLabel: '🤖 Activar agente de siniestros',
        processingMessage: 'El agente está recopilando evidencia, coordinando peritos y gestionando la comunicación con el asegurado...',
        panelTitle: 'Agente de Gestión de Siniestros',
        panelIntro: 'El agente gestiona el ciclo completo del siniestro: recopila evidencia, coordina peritos, comunica al asegurado y prepara la liquidación.',
        insights: [
          { type: 'automation', icon: '🤖', title: 'Expediente de SIN-2041 completado en 3 min', description: 'El agente recopiló fotos, parte policial, datos de la póliza y estimación de daños por zona del vehículo. Peritaje preparado para revisión.' },
          { type: 'recommendation', icon: '📋', title: 'Peritaje coordinado para SIN-2033', description: 'Ante señales de fraude, el agente agendó un perito presencial, solicitó documentación adicional y pausó el pago automático. Caso listo para el investigador.' },
          { type: 'prediction', icon: '📈', title: 'Suscripción de POL-7720 procesada', description: 'El agente calculó prima, deducible y coberturas para el conductor de alto riesgo, y preparó 2 opciones de póliza. Listas para que el suscriptor apruebe.' },
          { type: 'alert', icon: '⚠️', title: 'Cliente en fuga contactado', description: 'POL-6510 mostró señales de cancelación. El agente ofreció una mejora de cobertura sin costo por 3 meses y agendó una llamada con el ejecutivo.' },
        ],
        impacts: [
          { label: 'Tiempo de gestión por siniestro', before: '4.5 horas', after: '20 minutos', unit: '' },
          { label: 'Cobertura de verificación de evidencia', before: '4 fuentes', after: '11 fuentes', unit: '' },
          { label: 'Cancelaciones evitadas', before: '12%', after: '38%', unit: '' },
        ],
      },
      augmentation: {
        actionLabel: '🧠 Asistir al suscriptor senior',
        processingMessage: 'La IA está preparando el perfil de riesgo y los comparables de mercado para el suscriptor...',
        panelTitle: 'Copiloto de Suscripción',
        panelIntro: 'La IA amplifica el criterio del suscriptor con perfiles de riesgo, comparables y detección de fraude, la decisión es siempre humana.',
        insights: [
          { type: 'insight', icon: '🔍', title: 'Perfil de riesgo: POL-7720', description: 'Conductor 24a, vehículo deportivo 2022, zona urbana de alta siniestralidad, sin historial (primera póliza). Sin antecedentes negativos, pero perfil estadísticamente más riesgoso.' },
          { type: 'prediction', icon: '📊', title: 'Comparación con cartera similar', description: 'De 320 pólizas de perfil similar, la siniestralidad fue 2.1x el promedio en el primer año. El suscriptor puede ajustar prima y deducible con base en esto.' },
          { type: 'recommendation', icon: '💡', title: '3 estructuras de póliza sugeridas', description: 'A) Prima alta + deducible estándar. B) Prima media + deducible alto + telemetría. C) Cobertura limitada el primer año. Trade-offs por opción.' },
          { type: 'alert', icon: '⚠️', title: 'Señal de fraude para revisión', description: 'En SIN-2033, las fechas de los daños en los metadatos de las fotos no coinciden con la fecha declarada del siniestro. El suscriptor decide si investigar antes de pagar.' },
        ],
        impacts: [
          { label: 'Tiempo del suscriptor por caso', before: '3 horas', after: '25 minutos', unit: '' },
          { label: 'Loss ratio (siniestralidad)', before: '67%', after: '62%', unit: '' },
          { label: 'Precisión en pricing de riesgo', before: '71%', after: '93%', unit: '' },
        ],
      },
    },
  },

  energy: {
    appName: 'EnerGrid AI',
    appIcon: '⚡',
    tagline: 'Gestión energética y eficiencia con IA',
    navItems: ['Dashboard', 'Consumo', 'Generación', 'Costos', 'IA'],
    colorAccent: 'bg-yellow-500', colorLight: 'bg-yellow-50',
    colorText: 'text-yellow-700', colorBorder: 'border-yellow-200',
    kpis: [
      { label: 'Consumo del edificio', value: '$45K/mes', change: '40% climatización', positive: false },
      { label: 'Pico de demanda', value: '+15%', change: 'penalización $12K/mes', positive: false },
      { label: 'Parque solar', value: '20 MW', change: '-8% eficiencia', positive: false },
      { label: 'Ahorro proyectado', value: '$26K/mes', change: 'con IA de demanda', positive: true },
    ],
    tableTitle: 'tableTitle: cargas y activos',
    tableHeaders: ['Carga / Activo', 'Tipo', 'Consumo / Estado', 'IA activa', 'Estado'],
    tableRows: [
      { cells: ['Proceso martes 14-16h', 'Demanda', '+15% sobre contrato', '⚠ Desplazar carga', 'Penalización'], status: 'critical', highlight: true },
      { cells: ['Climatización edificio', 'Consumo', '40% del total', '⚠ Sin sensores', 'Ineficiente'], status: 'warning', highlight: true },
      { cells: ['Inversores 3 y 7', 'Generación', 'Falla en calor', '⚠ Predictivo', 'En riesgo'], status: 'warning', highlight: true },
      { cells: ['Parque solar 20 MW', 'Generación', '-8% esperado', '✓ Monitoreo', 'Subóptimo'], status: 'warning' },
      { cells: ['Iluminación LED', 'Consumo', 'Optimizado', '✓ Activa', 'Óptimo'], status: 'ok' },
    ],
    variants: {
      automation: {
        actionLabel: '▶ Optimizar demanda automáticamente',
        processingMessage: 'La IA está analizando la curva de demanda, tarifas y cargas flexibles para evitar penalizaciones...',
        panelTitle: 'Motor de Gestión de Demanda',
        panelIntro: 'La IA desplaza cargas flexibles y ajusta la climatización automáticamente para evitar picos y reducir el costo energético.',
        insights: [
          { type: 'alert', icon: '🔴', title: 'Pico de demanda los martes 14-16h', description: 'El proceso flexible supera el límite contratado en 15%, generando $12K/mes en penalizaciones. La IA reprogramó parte de la carga a la franja 10-12h.' },
          { type: 'automation', icon: '🤖', title: 'Climatización optimizada por ocupación', description: 'La IA detectó climatización a full en zonas desocupadas (40% del consumo). Ajuste automático por horario y ocupación: -28% en ese rubro.' },
          { type: 'prediction', icon: '📊', title: 'Falla predicha en inversores', description: 'Los inversores 3 y 7 muestran caída de eficiencia con temperatura > 35°C. El modelo predice falla en 3 semanas. Mantenimiento preventivo programado.' },
          { type: 'recommendation', icon: '💡', title: 'Oportunidad de tarifa', description: 'Trasladar 1.2 MW de carga flexible a horario valle ahorraría $9K/mes adicionales sin afectar la operación.' },
        ],
        impacts: [
          { label: 'Penalización por exceso de demanda', before: '$12K/mes', after: '$0/mes', unit: '' },
          { label: 'Consumo de climatización', before: '$18K/mes', after: '$13K/mes', unit: '' },
          { label: 'Eficiencia del parque solar', before: '-8%', after: '-1.5%', unit: '' },
        ],
      },
      agency: {
        actionLabel: '🤖 Activar agente energético',
        processingMessage: 'El agente está coordinando cargas, mantenimiento de activos y compra de energía...',
        panelTitle: 'Agente de Operaciones Energéticas',
        panelIntro: 'El agente gestiona cargas, mantenimiento de activos y compra de energía de forma autónoma para minimizar costo y penalizaciones.',
        insights: [
          { type: 'automation', icon: '🤖', title: 'Agente gestionó la curva de demanda hoy', description: 'Desplazó 1.2 MW de carga flexible fuera del pico, evitando la penalización. Coordinó con producción sin afectar metas.' },
          { type: 'recommendation', icon: '📋', title: 'Mantenimiento de inversores agendado', description: 'El agente detectó la degradación de los inversores 3 y 7, generó la orden de trabajo y agendó la cuadrilla para el horario de menor generación.' },
          { type: 'prediction', icon: '📈', title: 'Compra de energía optimizada', description: 'El agente proyectó el consumo de la próxima semana y ajustó la compra en el mercado spot, asegurando 0.8 MWh a mejor precio. Ahorro: $4.2K.' },
          { type: 'alert', icon: '⚠️', title: 'Anomalía de consumo escalada', description: 'El agente detectó consumo nocturno anómalo en climatización (zona vacía). Apagó la carga y notificó a facilities para revisión.' },
        ],
        impacts: [
          { label: 'Costo energético mensual', before: '$45K', after: '$33K', unit: '' },
          { label: 'Penalizaciones por demanda', before: '$12K/mes', after: '$0/mes', unit: '' },
          { label: 'Disponibilidad de activos de generación', before: '88%', after: '97%', unit: '' },
        ],
      },
      augmentation: {
        actionLabel: '🧠 Asistir al jefe de energía',
        processingMessage: 'La IA está preparando el análisis energético y los escenarios de inversión para el equipo...',
        panelTitle: 'Copiloto de Energía',
        panelIntro: 'La IA amplifica el criterio del jefe de energía con análisis de consumo, simulaciones y detección de ineficiencias, la decisión es humana.',
        insights: [
          { type: 'insight', icon: '🔍', title: 'Mapa de consumo del edificio', description: 'La climatización representa el 40% del consumo y opera a full incluso en zonas desocupadas y fuera de horario. La mayor oportunidad de ahorro inmediato.' },
          { type: 'prediction', icon: '📊', title: 'Simulación: 3 medidas de eficiencia', description: 'A) Sensores de ocupación ($40K, -$60K/año). B) Gestión de demanda (software, -$144K/año en penalizaciones). C) Ambas. Payback por opción.' },
          { type: 'recommendation', icon: '💡', title: 'Plan de mantenimiento predictivo', description: 'Los inversores 3 y 7 explican gran parte del -8% de eficiencia. Pasar de preventivo cada 6 meses a predictivo recuperaría ~6% de generación. El jefe decide el alcance.' },
          { type: 'alert', icon: '⚠️', title: 'Riesgo de penalización recurrente', description: 'El pico de los martes se repite hace 8 semanas. Sin gestión de demanda, la penalización anual proyectada es $144K. Priorizar decisión.' },
        ],
        impacts: [
          { label: 'Tiempo del equipo en análisis energético', before: '4 h/día', after: '40 min/día', unit: '' },
          { label: 'Costo energético anual', before: '$540K', after: '$396K', unit: '' },
          { label: 'Eficiencia de generación solar', before: '-8%', after: '-1.5%', unit: '' },
        ],
      },
    },
  },

  education: {
    appName: 'EduMentor AI',
    appIcon: '🎓',
    tagline: 'Aprendizaje personalizado y retención con IA',
    navItems: ['Dashboard', 'Estudiantes', 'Cursos', 'Riesgo', 'IA'],
    colorAccent: 'bg-violet-600', colorLight: 'bg-violet-50',
    colorText: 'text-violet-700', colorBorder: 'border-violet-200',
    kpis: [
      { label: 'Estudiantes', value: '6,000', change: '850 en riesgo de deserción', positive: false },
      { label: 'Reprobación', value: '30%', change: 'en 3 de 8 cursos', positive: false },
      { label: 'Finalización de cursos', value: '34%', change: 'abandono en semana 3', positive: false },
      { label: 'Retención proyectada', value: '+22 pp', change: 'con intervención IA', positive: true },
    ],
    tableTitle: 'tableTitle: cursos y cohortes',
    tableHeaders: ['Curso / Cohorte', 'Estudiantes', 'Reprobación / Riesgo', 'IA activa', 'Estado'],
    tableRows: [
      { cells: ['Matemáticas II', '420', '38% reprobación', '⚠ Tutoría', 'Crítico'], status: 'critical', highlight: true },
      { cells: ['Física I', '380', '31% reprobación', '⚠ Refuerzo', 'En riesgo'], status: 'warning', highlight: true },
      { cells: ['E-learning · Módulo 3', '4,200', 'abandono sem. 3', '⚠ Práctica', 'En riesgo'], status: 'warning', highlight: true },
      { cells: ['850 en riesgo', 'de 6,000', 'alerta temprana', '✓ Tutoría dirigida', 'Seguimiento'], status: 'warning' },
      { cells: ['Lengua y Literatura', '410', '9% reprobación', '✓ Activa', 'Óptimo'], status: 'ok' },
    ],
    variants: {
      automation: {
        actionLabel: '▶ Activar alertas y refuerzo automático',
        processingMessage: 'La IA está analizando asistencia, notas y participación para detectar estudiantes en riesgo...',
        panelTitle: 'Motor de Alerta Temprana',
        panelIntro: 'La IA detecta estudiantes en riesgo de deserción y activa refuerzos y recordatorios automáticamente.',
        insights: [
          { type: 'alert', icon: '🔴', title: '850 estudiantes en riesgo de deserción', description: 'Indicadores tempranos (asistencia, notas, participación) marcan a 850 de 6,000 alumnos. La IA priorizó a 210 de riesgo alto y notificó a sus tutores.' },
          { type: 'automation', icon: '🤖', title: 'Refuerzo activado en 3 cursos críticos', description: 'Matemáticas II, Física I y E-learning Módulo 3 (mayor reprobación) recibieron material de práctica adaptativo y quizzes de repaso automáticos.' },
          { type: 'prediction', icon: '📊', title: 'Predicción de abandono en e-learning', description: 'El abandono se concentra en la semana 3 de 8, en módulos densos sin práctica. La IA insertó actividades interactivas en ese punto: retención proyectada +22 pp.' },
          { type: 'recommendation', icon: '💡', title: 'Recordatorios y nivelación', description: 'La IA programó recordatorios personalizados para el 18% con ausentismo y sesiones de nivelación previas al segundo parcial.' },
        ],
        impacts: [
          { label: 'Tasa de finalización de cursos', before: '34%', after: '56%', unit: '' },
          { label: 'Reprobación en cursos críticos', before: '38%', after: '21%', unit: '' },
          { label: 'Estudiantes en riesgo sin seguimiento', before: '70%', after: '8%', unit: '' },
        ],
      },
      agency: {
        actionLabel: '🤖 Activar agente de acompañamiento',
        processingMessage: 'El agente está coordinando tutorías, comunicaciones con estudiantes y material de refuerzo...',
        panelTitle: 'Agente de Acompañamiento Estudiantil',
        panelIntro: 'El agente coordina tutorías, comunica con estudiantes y familias, y asigna material de refuerzo de forma autónoma.',
        insights: [
          { type: 'automation', icon: '🤖', title: 'Agente contactó a 850 estudiantes en riesgo', description: 'Mensajes personalizados por situación, agendó 320 tutorías y envió material de refuerzo. Seguimiento automático de quienes no respondieron.' },
          { type: 'recommendation', icon: '📋', title: 'Asignación de 12 tutores optimizada', description: 'El agente distribuyó los 850 casos entre los 12 tutores por afinidad de materia y carga, priorizando los 210 de riesgo alto.' },
          { type: 'prediction', icon: '📈', title: 'Plan de nivelación coordinado', description: 'El agente agendó sesiones de nivelación en los 3 cursos críticos antes del segundo parcial y reservó aulas y recursos automáticamente.' },
          { type: 'alert', icon: '⚠️', title: 'Caso crítico escalado', description: 'Un estudiante con 4 ausencias seguidas y caída abrupta de notas fue escalado al orientador con su historial completo y posibles causas.' },
        ],
        impacts: [
          { label: 'Estudiantes contactados proactivamente', before: '15%', after: '100%', unit: '' },
          { label: 'Tiempo administrativo de tutores', before: '12 h/semana', after: '3 h/semana', unit: '' },
          { label: 'Deserción anual', before: '14%', after: '6%', unit: '' },
        ],
      },
      augmentation: {
        actionLabel: '🧠 Asistir al equipo docente',
        processingMessage: 'La IA está preparando el análisis pedagógico y las intervenciones sugeridas para los docentes...',
        panelTitle: 'Copiloto Docente',
        panelIntro: 'La IA amplifica el criterio del docente con análisis de rendimiento, patrones de aprendizaje e intervenciones sugeridas, la pedagogía la decide el docente.',
        insights: [
          { type: 'insight', icon: '🔍', title: 'Patrón de reprobación detectado', description: 'La reprobación en Matemáticas II sube tras el primer parcial y se concentra en temas sin práctica aplicada. Correlaciona con un ausentismo del 18%.' },
          { type: 'prediction', icon: '📊', title: 'Simulación: 3 intervenciones pedagógicas', description: 'A) Práctica interactiva en módulos densos (+18 pp finalización). B) Tutoría entre pares. C) Evaluación formativa continua. Impacto estimado por opción.' },
          { type: 'recommendation', icon: '💡', title: 'Material personalizado por estudiante', description: 'La IA agrupó a los alumnos en 4 perfiles de aprendizaje y sugiere material diferenciado. El docente revisa y adapta antes de asignar.' },
          { type: 'insight', icon: '🎯', title: 'Buenas prácticas capturadas', description: 'El curso de Lengua (9% reprobación) usa evaluación continua y feedback rápido. La IA documentó el patrón para compartir con el resto del claustro.' },
        ],
        impacts: [
          { label: 'Tiempo del docente en seguimiento', before: '6 h/semana', after: '1.5 h/semana', unit: '' },
          { label: 'Finalización de cursos', before: '34%', after: '56%', unit: '' },
          { label: 'Estudiantes con plan personalizado', before: '5%', after: '100%', unit: '' },
        ],
      },
    },
  },

  media: {
    appName: 'MediaPulse AI',
    appIcon: '📰',
    tagline: 'Contenido y audiencia con IA',
    navItems: ['Dashboard', 'Contenido', 'Audiencia', 'Suscripción', 'IA'],
    colorAccent: 'bg-rose-600', colorLight: 'bg-rose-50',
    colorText: 'text-rose-700', colorBorder: 'border-rose-200',
    kpis: [
      { label: 'Usuarios/mes', value: '800K', change: 'suscripción solo 0.9%', positive: false },
      { label: 'Lectura completa', value: '1.2%', change: 'vs 8% en similares', positive: false },
      { label: 'CTR de titulares', value: '4.1%', change: 'rebote 78%', positive: false },
      { label: 'Conversión proyectada', value: '+2.4 pp', change: 'con IA de contenido', positive: true },
    ],
    tableTitle: 'tableTitle: contenidos',
    tableHeaders: ['Contenido', 'Canal', 'Engagement', 'IA activa', 'Estado'],
    tableRows: [
      { cells: ['Artículo "Reforma..."', 'Web', '1.2% lectura · 78% rebote', '⚠ Reescribir titular', 'Bajo'], status: 'critical', highlight: true },
      { cells: ['Paywall · nota premium', 'Suscripción', '0.9% conversión', '⚠ Diferenciar', 'En riesgo'], status: 'warning', highlight: true },
      { cells: ['Video · entrevista', 'YouTube', '35% retención 1er min', '⚠ Miniatura/gancho', 'En riesgo'], status: 'warning', highlight: true },
      { cells: ['Newsletter diario', 'Email', 'CTR 6.2% · apertura 41%', '✓ Activa', 'Óptimo'], status: 'ok' },
      { cells: ['Especial de datos', 'Web', '8.4% lectura', '✓ Activa', 'Óptimo'], status: 'ok' },
    ],
    variants: {
      automation: {
        actionLabel: '▶ Optimizar contenido automáticamente',
        processingMessage: 'La IA está analizando engagement, titulares y comportamiento de lectura para optimizar el contenido...',
        panelTitle: 'Motor de Optimización de Contenido',
        panelIntro: 'La IA prueba titulares, miniaturas y formatos automáticamente para maximizar engagement y conversión.',
        insights: [
          { type: 'alert', icon: '🔴', title: 'Bajo engagement en artículo destacado', description: '12K vistas pero solo 1.2% de lectura completa y 78% de rebote (similares retienen 8%). Titular largo e informativo. La IA generó 3 variantes A/B.' },
          { type: 'automation', icon: '🤖', title: '40 titulares optimizados hoy', description: 'La IA reescribió y testeó titulares por sección. CTR promedio +1.8 pp. Las miniaturas de video también se rotaron automáticamente.' },
          { type: 'prediction', icon: '📊', title: 'Predicción de conversión a suscripción', description: 'Diferenciar claramente el contenido premium en el paywall subiría la conversión de 0.9% a ~3.3%. La IA reorganizó la cola de notas premium.' },
          { type: 'recommendation', icon: '💡', title: 'Optimización de retención en video', description: 'El 35% de retención cae en el primer minuto. La IA sugiere mover el gancho a los primeros 15 seg y probó 2 nuevas miniaturas.' },
        ],
        impacts: [
          { label: 'Lectura completa de artículos', before: '1.2%', after: '6.8%', unit: '' },
          { label: 'Conversión a suscripción', before: '0.9%', after: '3.3%', unit: '' },
          { label: 'CTR de titulares', before: '4.1%', after: '6.5%', unit: '' },
        ],
      },
      agency: {
        actionLabel: '🤖 Activar agente editorial',
        processingMessage: 'El agente está analizando tendencias, programando publicaciones y personalizando la distribución...',
        panelTitle: 'Agente Editorial',
        panelIntro: 'El agente gestiona la distribución de contenido en todos los canales: programa, personaliza y optimiza la difusión de forma autónoma.',
        insights: [
          { type: 'automation', icon: '🤖', title: 'Agente distribuyó 28 piezas hoy', description: 'Programó publicaciones por canal según el horario óptimo de cada audiencia, personalizó el newsletter por segmento y rotó titulares en redes.' },
          { type: 'recommendation', icon: '📋', title: 'Campaña de conversión preparada', description: 'El agente identificó a 18K lectores frecuentes no suscritos (2.3 artículos/sesión) y preparó una oferta de suscripción personalizada en el paywall.' },
          { type: 'prediction', icon: '📈', title: 'Calendario editorial optimizado', description: 'El agente detectó qué temas generan más engagement por día y hora, y reorganizó el calendario de la próxima semana para maximizar el alcance.' },
          { type: 'alert', icon: '⚠️', title: 'Tema en tendencia detectado', description: 'Un tema local está escalando en búsquedas. El agente alertó a la redacción y preparó un brief con ángulos y palabras clave. Decisión editorial humana.' },
        ],
        impacts: [
          { label: 'Tiempo de distribución de contenido', before: '5 h/día', after: '40 min/día', unit: '' },
          { label: 'Conversión a suscripción', before: '0.9%', after: '3.1%', unit: '' },
          { label: 'Alcance por pieza publicada', before: 'línea base', after: '+64%', unit: '' },
        ],
      },
      augmentation: {
        actionLabel: '🧠 Asistir al equipo editorial',
        processingMessage: 'La IA está preparando el análisis de audiencia y las recomendaciones de contenido para la redacción...',
        panelTitle: 'Copiloto Editorial',
        panelIntro: 'La IA amplifica el criterio del equipo editorial con análisis de audiencia, tendencias y rendimiento, las decisiones editoriales son humanas.',
        insights: [
          { type: 'insight', icon: '🔍', title: 'Diagnóstico de bajo engagement', description: 'El artículo destacado tiene 78% de rebote por un titular largo y primeros párrafos densos. Otros similares con titular directo retienen 8%.' },
          { type: 'prediction', icon: '📊', title: 'Simulación: 3 estrategias de suscripción', description: 'A) Paywall medido (más volumen). B) Premium diferenciado (más ARPU). C) Freemium con newsletter. Conversión y riesgo por opción.' },
          { type: 'recommendation', icon: '💡', title: 'Sugerencias de optimización', description: 'Para el video con baja retención, la IA sugiere 3 ganchos alternativos y 2 miniaturas. El editor elige cuál publicar.' },
          { type: 'insight', icon: '🎯', title: 'Contenido de alto rendimiento', description: 'El especial de datos retiene 8.4% (7x el promedio). La IA identificó el patrón (formato interactivo + visualizaciones) para replicarlo en otras secciones.' },
        ],
        impacts: [
          { label: 'Tiempo del editor en análisis', before: '4 h/día', after: '45 min/día', unit: '' },
          { label: 'Lectura completa promedio', before: '1.2%', after: '5.6%', unit: '' },
          { label: 'Conversión a suscripción', before: '0.9%', after: '3.0%', unit: '' },
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
  tableTitle: 'tableTitle: actividades del equipo',
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
        { type: 'prediction', icon: '📊', title: 'Predicción de carga para mañana', description: 'El modelo estima 1,340 tareas para mañana, 12% más que el promedio. Recursos ajustados.' },
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
