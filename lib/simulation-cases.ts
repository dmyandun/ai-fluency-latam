const INDUSTRY_CASES: Record<string, string[]> = {
  manufacturing: [
    'Tenemos 80 SKUs de repuestos con alta varianza en el consumo (algunos rotan 200 unidades/mes, otros 3) y 4 proveedores con lead times de 7 a 21 días. El costo de quiebre de stock es alto (línea parada $5K/hora), pero el sobrestock inmoviliza capital. ¿Cómo defino el stock de seguridad por SKU sin sobreinvertir?',
    'Nuestra línea de ensamblaje produce 1,200 unidades/día con una tasa de defectos del 4.2%, por encima del objetivo del 1.5%. Los defectos se concentran en el turno nocturno y en 2 de 8 estaciones. El reproceso cuesta $18K/mes. ¿Qué patrones analizarías y cómo priorizarías la mejora?',
    'Tenemos 3 plantas con OEE (eficiencia general) de 58%, 71% y 64%. La planta de 58% tiene paros frecuentes no planificados y mantenimiento reactivo. El presupuesto de mantenimiento es $400K/año. ¿Cómo abordarías el problema y dónde entraría IA predictiva?',
  ],
  banking: [
    'Tenemos una solicitud de crédito de una PYME textil con 4 años de operación. Facturación anual: $450K (crecimiento 12% YoY). El solicitante pide $120K a 48 meses para comprar maquinaria. Historial: 2 pagos atrasados hace 8 meses (ya regularizados), deuda actual con proveedores: $85K, cash flow positivo pero variable (oscila entre $3K-$8K/mes). ¿Cómo priorizarías el análisis de riesgo y qué variables serían críticas?',
    'Nuestro sistema flaggeó 47 transacciones sospechosas en 3 horas de una cuenta corriente activa desde hace 5 años (cliente persona física, gerente de IT). Patrón: 15 pagos internacionales a proveedores nuevos en Asia (nunca antes), montos entre $8K-$25K, seguidos de transferencias a terceros. Saldo previo: $900K. ¿Es fraude o hay un análisis más matizado? ¿Qué harías primero?',
    'Tenemos 12,000 clientes de tarjeta de crédito (cartera $85M). Rotación anual 13%, costos operativos $2.1M/año. El 28% de clientes no usa la tarjeta (dormidos), 42% usa ocasionalmente (<$500/mes), solo 30% es activo (>$1,500/mes). ROI actual 4.2% con competencia agresiva. ¿Cómo segmentarías para maximizar rentabilidad y dónde entraría la IA?',
  ],
  retail: [
    'Tengo 300 unidades de chaquetas de invierno en bodega, terminó la temporada y la demanda cayó 70%. El costo unitario fue $40, precio de lista $95. El almacenamiento cuesta $2/unidad/mes y se acerca la temporada de verano que necesita ese espacio. ¿Qué estrategia de liquidación recomiendas y a qué ritmo de descuento?',
    'Manejo 1,400 SKUs en 6 tiendas. El 20% de productos genera el 75% de las ventas, pero tengo quiebres de stock del 12% en los más vendidos y sobrestock en 380 productos de baja rotación. El capital inmovilizado es $620K. ¿Cómo rebalanceo el inventario entre tiendas y qué productos descontinúo?',
    'Mi e-commerce tiene 45K visitas/mes con tasa de conversión del 1.8% (industria: 2.5%). El abandono de carrito es 68%, concentrado en el paso de envío. Ticket promedio $52. ¿Qué analizarías para subir la conversión y dónde aplicarías personalización con IA?',
  ],
  health: [
    'Nuestra sala de urgencias atiende 220 pacientes/día con un tiempo de espera promedio de 2h40 (meta: 45 min) y picos de congestión entre 18:00 y 22:00. La UCI está al 92% de ocupación y las altas se procesan en bloque por la mañana, lo que traba la asignación de camas. ¿Cómo optimizarías el flujo de pacientes y la gestión de camas, y dónde aplicarías IA?',
    'Nuestra red de clínicas tiene 30% de no-shows en citas programadas, lo que genera $80K/año en pérdidas y listas de espera de 3 semanas. Los no-shows se concentran en horarios de la tarde y en pacientes de seguimiento crónico. ¿Qué patrones analizarías y cómo reducirías las ausencias con recordatorios y sobreagendamiento inteligente?',
    'Gestionamos un programa de 850 pacientes crónicos. 120 no asisten a sus controles agendados hace más de 6 meses y el equipo administrativo (3 personas) prioriza el seguimiento de forma manual. ¿Cómo organizarías y priorizarías la gestión de citas y recordatorios, y dónde entraría IA para optimizar la agenda y la cobertura de controles?',
  ],
  logistics: [
    'Dos rutas de entrega se cruzan en la zona norte. Un conductor terminó su ruta 90 minutos antes de lo previsto y otro lleva 50 minutos de retraso con 12 entregas pendientes y un SLA de entrega same-day en riesgo. Tengo 8 vehículos en operación. ¿Cómo rebalanceas en tiempo real y qué decisiones automatizarías?',
    'Nuestra flota de 25 camiones tiene un costo de combustible de $48K/mes y un 22% de kilómetros en vacío (sin carga). Las rutas se planifican manualmente cada mañana. El cumplimiento de ventanas horarias es del 81%. ¿Cómo optimizarías rutas y reducirías kilómetros muertos?',
    'Operamos un centro de distribución que despacha 3,500 pedidos/día. El tiempo de picking promedio es 14 min/pedido y hay congestión en 2 pasillos que concentran el 40% del volumen. El error de despacho es 1.8%. ¿Qué analizarías para acelerar el fulfillment?',
  ],
  legal: [
    'Cláusula de un contrato de suministro: "El proveedor pagará 15% del valor del contrato por cada semana de retraso, sin límite máximo." El contrato vale $500K y el proyecto típico se retrasa 2-3 semanas. ¿Qué riesgos ves para el proveedor y cómo renegociarías esta cláusula?',
    'Estamos revisando 120 contratos de arrendamiento comercial para una fusión. Necesitamos identificar cláusulas de cambio de control, penalidades por terminación anticipada y renovaciones automáticas. Tenemos 2 abogados y 5 días. ¿Cómo abordarías la revisión y dónde aplicarías IA de extracción?',
    'Un contrato de servicios tiene jurisdicción ambigua: menciona tribunales locales en una cláusula y arbitraje internacional en otra, además de leyes de dos países distintos. El monto en disputa es $200K. ¿Qué inconsistencias y riesgos jurídicos identificas?',
  ],
  government: [
    'Solicitud de habilitación sanitaria para un restaurante. Tiene 7 de 9 documentos requeridos. Faltan el certificado de fumigación y los planos actualizados de cocina. El solicitante ya esperó 3 semanas y la normativa exige resolución en 30 días. ¿Cómo procesas el trámite y qué automatizarías del flujo?',
    'Nuestra oficina procesa 600 trámites/día con un tiempo promedio de resolución de 12 días hábiles (meta: 5). El 40% se atasca por documentación incompleta que se detecta tarde. Hay 15 funcionarios. ¿Qué patrones analizarías para reducir tiempos y reprocesos?',
    'Recibimos 2,300 solicitudes de subsidio social este mes. Sospechamos duplicados y datos inconsistentes (mismo domicilio en 80 solicitudes, ingresos declarados que no cuadran). El presupuesto es limitado. ¿Cómo priorizarías la validación y dónde entraría IA de detección de anomalías?',
  ],
  education: [
    'Tenemos 30% de reprobación en matemáticas en secundaria, concentrada en 3 de 8 cursos. Los docentes reportan baja motivación y ausentismo del 18%. Las notas bajan tras el primer parcial. ¿Qué patrones analizarías y qué intervenciones pedagógicas priorizarías?',
    'Nuestra plataforma de e-learning tiene 4,200 estudiantes con una tasa de finalización de cursos del 34%. El abandono se concentra en la semana 3 de 8 y en módulos de contenido denso sin actividad práctica. ¿Cómo aumentarías la retención y dónde personalizarías con IA?',
    'En una universidad con 6,000 alumnos, 850 están en riesgo de deserción según indicadores tempranos (asistencia, notas, participación). El equipo de tutoría es de 12 personas. ¿Cómo estratificarías el riesgo y asignarías recursos de acompañamiento?',
  ],
  agro: [
    'Tengo una parcela de 50 hectáreas de soja. La última semana presentó déficit hídrico moderado y temperatura 4°C por encima del promedio. Estamos en etapa de llenado de grano, crítica para el rendimiento. El riego cuesta $120/hectárea por aplicación. ¿Cómo decides cuándo y cuánto regar para optimizar rendimiento vs costo?',
    'Manejo un hato de 400 vacas lecheras con producción promedio de 22 litros/día, por debajo del potencial de 28. El 15% muestra signos de mastitis subclínica y los costos de alimento subieron 20%. ¿Qué variables analizarías para mejorar productividad y reducir pérdidas?',
    'Tenemos 200 hectáreas de maíz con rendimiento heterogéneo: zonas de 12 ton/ha y otras de 6 ton/ha en el mismo lote. El uso de fertilizante es uniforme ($90K/temporada). ¿Cómo aplicarías agricultura de precisión para optimizar insumos por zona?',
  ],
  telecom: [
    'Una zona residencial con 200 clientes activos muestra 40% de tickets de soporte por velocidad baja en las últimas 2 semanas. La infraestructura tiene 3 años y el nodo de la zona opera al 85% de capacidad en horas pico. El churn en esa zona subió a 6%. ¿Cómo diagnosticas la causa raíz y qué priorizas?',
    'Tenemos 180,000 clientes con un churn mensual del 2.8% ($1.2M en ingresos perdidos/mes). Los que se van suelen tener 2+ tickets sin resolver y consumo decreciente en los 3 meses previos. ¿Cómo identificarías clientes en riesgo y qué acciones de retención automatizarías?',
    'Nuestro call center recibe 12,000 tickets/semana con tiempo de resolución promedio de 48 horas. El 55% son consultas repetitivas (facturación, configuración). La satisfacción es 6.2/10. ¿Cómo clasificarías y enrutarías los tickets y dónde entraría IA conversacional?',
  ],
  insurance: [
    'Solicitud de seguro de auto: conductor de 24 años, primera póliza, vehículo deportivo 2022, zona urbana de alta siniestralidad, sin historial de reclamos previo. El valor asegurado es $35K. ¿Cómo evalúas el riesgo, qué prima y qué condiciones (deducible, coberturas) recomendarías?',
    'Recibimos un reclamo de $48K por daños de un siniestro de hogar. La póliza tiene 4 meses de antigüedad, el reclamo llega justo antes del vencimiento de un plazo, y las fotos muestran inconsistencias en las fechas de los daños. ¿Cómo distingues un reclamo legítimo de un posible fraude y qué investigarías?',
    'Nuestra cartera de seguros de vida tiene 25,000 pólizas con una tasa de cancelación del 9% anual. Las cancelaciones se concentran en pólizas de 2-3 años y en clientes que nunca usaron beneficios. ¿Cómo segmentarías para retención y dónde aplicarías scoring predictivo?',
  ],
  media: [
    'Un artículo publicado hace 6 horas tiene 12K vistas pero solo 1.2% de tiempo de lectura completa y una tasa de rebote del 78%. El titular es informativo pero largo. Otros artículos similares retienen 8%. ¿Qué analizarías y qué recomendarías para aumentar el engagement?',
    'Nuestro portal tiene 800K usuarios/mes pero la suscripción de pago convierte solo al 0.9%. Los lectores consumen 2.3 artículos/sesión y abandonan en el paywall. El contenido premium no está claramente diferenciado. ¿Cómo aumentarías la conversión a suscripción?',
    'Manejamos un canal de YouTube con 320K suscriptores. El CTR de miniaturas es 4.1% y la retención promedio cae al 35% en el primer minuto. Publicamos 3 videos/semana con rendimiento muy variable. ¿Qué patrones analizarías para mejorar alcance y retención?',
  ],
  construction: [
    'Un proyecto de 18 meses lleva 9 meses ejecutados y ya consumió el 62% del presupuesto ($3.1M de $5M), pero la estructura principal está solo al 45% de avance físico. Hay 3 subcontratistas con retrasos. ¿Cómo evalúas el riesgo de sobrecosto y qué acciones correctivas priorizarías?',
    'Gestionamos 5 obras simultáneas con 120 trabajadores. El índice de accidentes es 3.2 por cada 200K horas (meta: 1.5) y se concentra en trabajos en altura y en 2 cuadrillas específicas. ¿Qué patrones de seguridad analizarías y cómo prevendrías incidentes?',
    'En una obra de vivienda, el desperdicio de materiales es del 14% ($180K en sobrecostos), concentrado en concreto y acero. Los pedidos se hacen por estimación manual del residente. ¿Cómo reducirías el desperdicio y dónde aplicarías IA de planificación?',
  ],
  energy: [
    'Una planta industrial tiene un pico de consumo los martes entre 14:00-16:00 que supera el límite contratado en 15% y genera penalizaciones de $12K/mes. El proceso de ese horario es flexible en parte. ¿Cómo analizarías el patrón y qué estrategia de gestión de demanda recomiendas?',
    'Operamos un parque solar de 20 MW con una eficiencia de generación 8% por debajo de lo esperado. La caída se concentra en 2 de 12 inversores y en horarios de alta temperatura. El mantenimiento es preventivo cada 6 meses. ¿Qué analizarías y dónde aplicarías mantenimiento predictivo?',
    'Un edificio corporativo consume $45K/mes en electricidad. El 40% es climatización que opera a full incluso en zonas desocupadas y fuera de horario. No hay sensores de ocupación. ¿Cómo identificarías oportunidades de ahorro y qué automatizarías?',
  ],
}

const FALLBACK_CASES: string[] = [
  'Tenemos un proceso operativo clave que consume mucho tiempo manual y genera errores frecuentes. El volumen es alto y el equipo está saturado. Describe cómo lo analizarías paso a paso y dónde aplicarías IA para mejorar eficiencia y calidad.',
  'Manejamos un gran volumen de datos de clientes y operaciones, pero no los aprovechamos para tomar mejores decisiones. ¿Qué patrones buscarías y qué oportunidades de automatización o predicción priorizarías?',
  'Queremos reducir costos sin afectar la calidad del servicio. Tenemos áreas con ineficiencias visibles pero no sabemos cuál atacar primero. ¿Cómo priorizarías las mejoras y dónde entraría la inteligencia artificial?',
]

export function getCases(industryId: string): string[] {
  return INDUSTRY_CASES[industryId] ?? FALLBACK_CASES
}
