# Investigación: Casos de IA en Logística y Supply Chain

> **Fecha:** 2026-06-14
> **Alcance:** Global con anclaje LATAM cuando aplica / Horizonte 2022-2026
> **Supuestos:** Cifras tomadas de fuentes primarias o de medios sectoriales reputables (Supply Chain Dive, prnewswire/comunicados oficiales, BSR, About Amazon). Donde la cifra no es verificable se marca con ⚠️. Documento organizado por los tres InteractionModels del sistema AI Fluency LATAM y termina con mapeo explícito a la simulación visual de la app.

---

## Resumen ejecutivo

Logística y supply chain han sido históricamente uno de los terrenos más fértiles para la IA aplicada: optimización de rutas, predicción de demanda, automatización de bodegas y matching de cargas. El ecosistema cubre desde **Automation** clásica (ORION de UPS, brazos pickers de Amazon) hasta **Agency** más reciente (agentes negociadores de Pactum usados por Maersk, plataformas freight como Convoy/Flexport que automatizan end-to-end el booking) y **Augmentation** generativa (copilots para brokers, asistentes para planners, agentes de voz hablando con conductores). En LATAM, Rappi y Mercado Libre han incorporado ML al ruteo de last-mile en más de 9 países y 400 ciudades. Maersk ha declarado el objetivo de que la IA gestione hasta el 80% de las tareas logísticas en 5-7 años. Los casos con ROI público más sólido siguen siendo UPS ORION (USD 300-400 M/año), Amazon Robotics (-20-25% costo operativo por centro) y Pactum (negociación autónoma usada por Maersk desde 2021).

---

## Panorama IA en Logística y Supply Chain

**Principales pain points:**
1. **Ruteo subóptimo** → millas y combustible desperdiciados a escala de flota.
2. **Picking manual** → cuello de botella en bodegas con SKUs millonarios y variabilidad de forma.
3. **Negociación repetitiva con miles de proveedores/carriers** → equipos de procurement saturados.
4. **Visibilidad fragmentada** → falta de ETA confiable, exceptions reactivas.
5. **Documentación y comunicación operativa** → emails, llamadas, BoLs, manifiestos consumen horas de planners.
6. **Predicción de demanda y disrupciones** → cisnes negros (pandemia, Suez, Mar Rojo) demandan replanificación.

**Madurez:** alta en parcel/postal (UPS, FedEx, DHL), e-commerce (Amazon, Mercado Libre), shipping global (Maersk, MSC); creciente en freight broker tech (Flexport, Convoy, DAT), 3PL regionales y last-mile LATAM.

---

## 1. AUTOMATION — IA decide y actúa de extremo a extremo sin supervisión humana por transacción

---

### Caso 1.1 — UPS ORION: optimización de rutas para 55,000 conductores en EE.UU.

- **Empresa:** UPS (EE.UU., operación global)
- **Pain point:** Cada milla extra por conductor por día = USD 50 M/año en combustible y horas. Las rutas planificadas manualmente son subóptimas frente a la combinatoria real (paradas, ventanas, tráfico).
- **Solución técnica:** **ORION** (On-Road Integrated Optimization and Navigation) calcula la ruta óptima diaria por conductor cruzando paradas del día, ventanas de tiempo, rendimiento histórico y restricciones operativas. El conductor recibe la secuencia y la ejecuta — sin re-planificación humana por ruta.
- **Resultados cuantificados:**
  - Despliegue en **>70% de las 55,000 rutas** en EE.UU.
  - Reducción promedio de **6-8 millas/conductor/día**
  - **100 M de millas/año** ahorradas y **10 M de galones de combustible/año**
  - Ahorro anual proyectado a despliegue completo: **USD 300-400 M**
  - Reducción de **100,000 toneladas métricas de CO₂/año** (≈ 21,000 autos retirados)
- **Stack/Tecnología:** Algoritmos OR + ML propietarios; integración con dispositivos de los conductores
- **Fuente:** BSR Case Study — "ORION Technology Adoption at UPS"
- **Cita corta:** BSR. *Looking Under the Hood: ORION Technology Adoption at UPS.* https://www.bsr.org/en/case-studies/center-for-technology-and-sustainability-orion-technology-ups

---

### Caso 1.2 — Amazon Sparrow / Robotics: bin-picking con visión computacional

- **Empresa:** Amazon (global; centros en MX, BR)
- **Pain point:** Picking manual de SKUs heterogéneos es el cuello de botella de fulfillment; lesiones repetitivas y costo unitario crecen con volumen.
- **Solución técnica:** **Sparrow** — brazo robótico con visión computacional + IA que identifica, agarra y mueve productos individuales desde contenedores a totes. Decisiones por unidad (qué pieza, cómo agarrarla) tomadas autónomamente. Forma parte del stack Amazon Robotics junto a Sequoia y Digit.
- **Resultados cuantificados:**
  - Maneja **>200 M de SKUs únicos** (versión actual)
  - Reconoce/manipula **~65%** del catálogo (creciendo conforme mejoran los modelos)
  - Sistemas de robótica **reducen costo operativo por centro 20-25%** (estimado sectorial)
- **Stack/Tecnología:** Computer Vision, deep learning, grippers adaptativos, integración WMS
- **Fuente:** Amazon — *Amazon introduces Sparrow*
- **Cita corta:** About Amazon (2022, actualizado). *Amazon introduces Sparrow — a state-of-the-art robot that handles millions of diverse products.* https://www.aboutamazon.com/news/operations/amazon-introduces-sparrow-a-state-of-the-art-robot-that-handles-millions-of-diverse-products

---

### Caso 1.3 — DHL: ML en smart warehouses y recruiting

- **Empresa:** DHL (Deutsche Post DHL, global)
- **Pain point:** Decisiones repetitivas de fulfillment (slotting, allocation, staffing) y procesos administrativos (recruiting masivo de operarios) consumen recursos sin diferenciación competitiva.
- **Solución técnica:** Suite de aplicaciones ML para optimización de rutas, asignación de personal en bodegas, predicción de volúmenes; chatbots para servicio; matching de skills vía NLP en RR.HH. Decisiones se ejecutan automáticamente cuando superan umbrales de confianza.
- **Resultados cuantificados:**
  - **>10% de ahorro en costos de recruiting** (millones de USD según DHL)
  - Eficiencias operativas reportadas tras ROI analyses internos (sin % global publicado por DHL ⚠️)
- **Stack/Tecnología:** ML propietario, NLP, integración con sistemas WMS/HRIS
- **Fuente:** DigitalDefynd (2026) — "10 ways DHL is using AI"
- **Cita corta:** DigitalDefynd (2026). *10 ways DHL is using AI [Case Study].* https://digitaldefynd.com/IQ/dhl-using-ai-case-study/

---

## 2. AGENCY — IA ejecuta autónomamente, integra sistemas y toma decisiones complejas multi-paso

---

### Caso 2.1 — Maersk + Pactum: agentes negociadores autónomos con miles de carriers

- **Empresa:** Maersk (Dinamarca, global) — usuario; Pactum AI — proveedor
- **Pain point:** Negociar contratos rutinarios (spot trucking, suministros) con miles de proveedores es lento, inconsistente y deja valor sobre la mesa.
- **Solución técnica:** **Pactum AI** opera bots negociadores autónomos que conversan en paralelo con miles de proveedores para cerrar términos y precios bajo políticas definidas por Maersk. Cada bot ejecuta una conversación multi-paso end-to-end, ajustando estrategia según respuestas, y cierra contratos dentro del mandato. Maersk usa el sistema para **spot trucking desde 2021**.
- **Resultados cuantificados:**
  - Pactum levantó **USD 20 M** de VC con Maersk entre inversores
  - Maersk usa el sistema en producción para procurement de transporte
  - Cifras de ahorro específicas no publicadas por Maersk ⚠️
  - Objetivo declarado por Maersk: que la IA gestione **hasta el 80% de tareas logísticas** en 5-7 años
- **Stack/Tecnología:** LLMs + lógica de negociación + integración a sistemas de procurement
- **Fuente:** DigitalDefynd (2026) — "AI in shipping industry case studies"
- **Cita corta:** DigitalDefynd (2026). *How Can AI Be Used in the Shipping Industry — Maersk + Pactum.* https://digitaldefynd.com/IQ/ai-use-in-the-shipping-industry-case-studies/

---

### Caso 2.2 — Flexport Convoy Platform: marketplace freight con ejecución autónoma end-to-end

- **Empresa:** Flexport (EE.UU., global). *Nota: la plataforma Convoy fue acordada de venta a DAT en jul 2025; el caso sigue siendo válido como referencia de arquitectura.*
- **Pain point:** Brokers de freight manejan manualmente carrier sourcing, negociación, vetting, status updates, documentación y pago. Volumen + variabilidad = cuello de botella humano.
- **Solución técnica:** **Convoy Platform** — marketplace impulsado por IA que agrega miles de carrier owner-operators y **automatiza end-to-end load management**: matching, negociación, vetting, status, documentos y pago. ML monitorea riesgo de carrier, reduce fraude y comportamiento inseguro. Flexport probó además **agentes de voz IA** que llaman a conductores notificando cargas disponibles y confirman operativa con bodegas.
- **Resultados cuantificados:**
  - Reducción de costos operativos para brokers (sin % global publicado ⚠️)
  - Acuerdo de adquisición por **DAT (jul 2025)** valida el activo tecnológico
- **Stack/Tecnología:** ML matching, forensic data models, AI voice agents, integración TMS
- **Fuente:** PRNewswire (2024) — "Flexport Expands the Convoy Platform"
- **Cita corta:** PRNewswire (2024). *Flexport Expands the Convoy Platform, Empowering Brokers to Leverage AI to Automate Booking.* https://www.prnewswire.com/news-releases/flexport-expands-the-convoy-platform-empowering-brokers-to-leverage-ai-to-automate-booking-and-boost-productivity-302161461.html

---

### Caso 2.3 — Rappi (LATAM): orquestación de last-mile con ML en 9 países

- **Empresa:** Rappi (Colombia, operación en 9 países, +400 ciudades, decenas de millones de usuarios)
- **Pain point:** Last-mile en LATAM con tráfico caótico, direcciones imprecisas, micrologística multi-vertical (comida, mercado, farmacia, dinero, e-commerce, dark stores 10-min) demanda decisiones en segundos por pedido.
- **Solución técnica:** Plataforma con ML que **optimiza rutas, pronostica demanda y asigna recursos** (couriers, dark stores, slots). Decisiones de assignment se ejecutan autónomamente por pedido; el sistema reacciona a eventos (cancelaciones, cambios de tráfico, picos de demanda) re-planificando en vivo. La inversión de Amazon (USD 25 M en 2025) busca específicamente atacar 25% de ineficiencias operativas regionales.
- **Resultados cuantificados:**
  - Escala: **9 países, +400 ciudades, decenas de millones de usuarios**
  - Métricas internas de eficiencia no publicadas con cifras específicas ⚠️
  - Inversión Amazon-Rappi (2025): **USD 25 M** dirigidos a optimización logística LATAM
- **Stack/Tecnología:** ML propietario, integración con cloud (AWS post-inversión), pipelines en tiempo real
- **Fuente:** Ainvest (2025) — "Amazon's Strategic Entry into Latin American E-commerce Logistics via Rappi"
- **Cita corta:** Ainvest (2025). *Amazon Strategic Entry into Latin American E-commerce Logistics via Rappi.* https://www.ainvest.com/news/amazon-strategic-entry-latin-american-commerce-logistics-rappi-2509/

---

## 3. AUGMENTATION — IA propone, asiste y explica; humano decide y firma

---

### Caso 3.1 — Flexport: GenAI copilot para brokers, planners y operaciones globales

- **Empresa:** Flexport (EE.UU.)
- **Pain point:** Operadores de freight pasan horas en email, búsqueda en documentos (BoL, contratos, manifiestos), comparación de tarifas y resolución de excepciones. El know-how está distribuido y la curva de onboarding es larga.
- **Solución técnica:** Flexport lanzó **>20 aplicaciones IA** como parte de su Winter tech suite, con foco en copilots generativos para que el operador pregunte en lenguaje natural ("¿qué excepciones tengo abiertas en ruta TPEB?", "redacta el follow-up al carrier X") y reciba propuestas accionables. El humano revisa, edita y aprueba.
- **Resultados cuantificados:**
  - >20 productos IA en producción/release (Winter suite)
  - Ahorros de tiempo cualitativos reportados; sin % global publicado ⚠️
- **Stack/Tecnología:** LLMs (probable Azure OpenAI / Anthropic), RAG sobre documentación operativa, integración a TMS propio
- **Fuente:** Supply & Demand Chain Executive (2025) — "Flexport's New Tech and AI-Powered Products"
- **Cita corta:** SDCExec (2025). *Flexport's New Tech and AI-Powered Products to Transform Global Logistics.* https://www.sdcexec.com/software-technology/ai-ar/news/22934407/flexport-flexports-new-tech-and-aipowered-products-to-transform-global-logistics

---

### Caso 3.2 — DHL: skills graphs + asistentes generativos para workforce

- **Empresa:** DHL (global)
- **Pain point:** ~600,000 empleados globales; matching de skills a roles, contenido formativo y oportunidades internas es manual y subjetivo.
- **Solución técnica:** **Skills graphs con NLP** que matchean perfiles a roles, contenido y proyectos. El sistema **propone** matches; el manager/empleado decide. Capa generativa adicional para chatbots de servicio interno y asistencia operacional.
- **Resultados cuantificados:**
  - Aplicado a fuerza laboral global
  - Sin % cuantificado publicado para el componente de skills graph ⚠️
- **Stack/Tecnología:** NLP, knowledge graphs, integración HRIS
- **Fuente:** AIX (2024) — "DHL's AI-Powered Initiatives"
- **Cita corta:** AIX (2024). *Case Study: DHL's AI-Powered Initiatives to Enhance Operations.* https://aiexpert.network/case-study-dhls-ai-powered-initiatives-to-enhance-operations/

---

### Caso 3.3 — Maersk: Generative AI asistiendo a planners de supply chain

- **Empresa:** Maersk (Dinamarca, global)
- **Pain point:** Disrupciones globales (Mar Rojo, Suez, congestión Pacífico) exigen a planners decisiones complejas en horas, con información distribuida en sistemas.
- **Solución técnica:** Maersk integra IA generativa para **asistir** a planners y customer service: predicción de rutas, tracking automatizado y respuestas asistidas a clientes. El humano sigue al mando de decisiones críticas. Maersk declara visión a 5-7 años de que **IA maneje hasta el 80% de tareas logísticas** — escalando progresivamente de Augmentation a Agency.
- **Resultados cuantificados:**
  - Reducción reportada de downtime no planificado en flota vía mantenimiento predictivo (sin % global publicado ⚠️)
  - Visión declarada: 80% de tareas con IA en 5-7 años
- **Stack/Tecnología:** Predictive maintenance ML, generative AI para customer-facing y planning
- **Fuente:** DigitalDefynd (2026) — "AI in shipping case studies"
- **Cita corta:** DigitalDefynd (2026). *AI Use in the Shipping Industry — Maersk.* https://digitaldefynd.com/IQ/ai-use-in-the-shipping-industry-case-studies/

---

## 4. Mapeo a los 3 patrones — recomendaciones para la simulación de Logística

### Patrón → Automation
**Casos candidatos:** 1.1 UPS ORION, 1.2 Amazon Sparrow, 1.3 DHL smart warehouse.

**Caso recomendado:** **UPS ORION — optimización de rutas.**

- **Por qué ejemplifica Automation y no los otros dos:** decisiones repetitivas masivas (una ruta óptima por conductor por día, sobre 55,000 rutas), ciclo cerrado (el sistema entrega la secuencia y se ejecuta), sin humano en el loop por ruta. No es Agency porque no orquesta sistemas heterogéneos en multi-paso ni reacciona a eventos en vivo; no es Augmentation porque el conductor no co-decide la ruta.
- **Qué visualizar:**
  - Mapa con conductor + 50-80 paradas; toggle "manual vs ORION"
  - Animación de re-secuenciación con líneas que se acomodan
  - KPI en vivo: millas/día (↓ 6-8), galones (↓), CO₂ (↓), USD ahorrados/día
  - Contador acumulado: "Millones de millas ahorradas este año"
- **Inputs simulables:** array de paradas `{lat, lng, window, weight}`; algoritmo TSP simple del lado cliente para comparar baseline vs optimizado.

---

### Patrón → Agency
**Casos candidatos:** 2.1 Maersk + Pactum, 2.2 Flexport Convoy, 2.3 Rappi LATAM.

**Caso recomendado:** **Maersk + Pactum — agentes negociadores autónomos.** (LATAM secundario: Rappi para anclaje regional.)

- **Por qué ejemplifica Agency y no los otros dos:** cada bot ejecuta una conversación multi-paso autónoma con un proveedor real, negocia bajo objetivos de negocio (precio, plazo, calidad), reacciona a contraofertas y cierra contratos sin escalamiento humano por negociación. No es Automation porque cada negociación es única y de razonamiento (no clasificación repetitiva); no es Augmentation porque el humano no firma cada deal.
- **Qué visualizar:**
  - Tablero con N proveedores simultáneos; cada uno con burbuja de chat IA ↔ proveedor avanzando en paralelo
  - Marcadores de estado: "negociando", "acuerdo", "escalado al humano" (umbral excedido)
  - KPI: % cerrados autónomamente, ahorro vs precio de referencia, tiempo medio por deal
  - Log narrativo: "Bot #14 cerró 1,200 USD/contenedor con Carrier X — 8% bajo benchmark"
- **Inputs simulables:** lista de proveedores con perfiles de elasticidad simulados; el "bot" propone-acepta-rechaza según política configurable.

---

### Patrón → Augmentation
**Casos candidatos:** 3.1 Flexport copilot, 3.2 DHL skills graph, 3.3 Maersk planner GenAI.

**Caso recomendado:** **Flexport copilot para brokers.**

- **Por qué ejemplifica Augmentation y no los otros dos:** el broker pregunta en lenguaje natural, el copilot propone (resumen de excepciones, draft de email, recomendación de carrier), el broker revisa/edita/aprueba antes de ejecutar. No es Automation porque las tareas no son decisiones binarias repetitivas; no es Agency porque el copilot no actúa sin firma humana.
- **Qué visualizar:**
  - Workspace simulado: lista de shipments con excepciones + panel de chat lateral
  - Broker escribe: "dame status de los 5 embarques retrasados y redacta follow-up al cliente"
  - IA propone resumen + draft de email + acción sugerida; broker tiene botones Aceptar / Editar / Rechazar
  - KPI: tiempo medio por excepción (↓), tasa de aceptación de drafts (~70-80%), horas ahorradas/semana
- **Inputs simulables:** 4-6 prompts pre-grabados con respuestas del copiloto y métricas de ahorro de tiempo.

---

## 5. Sugerencias de visualización por patrón (resumen para diseño de widgets)

| Patrón | Widget primario | KPIs en vivo | Animación clave |
|---|---|---|---|
| Automation | Mapa con rutas optimizadas vs baseline | Millas/día, galones, USD, CO₂ | Toggle manual→ORION re-traza líneas |
| Agency | Grid de N conversaciones IA↔proveedor en paralelo | % cerrados auto, ahorro vs benchmark, t/deal | Burbujas de chat avanzando + cierre con check verde |
| Augmentation | Workspace shipments + chat lateral copiloto | Tiempo/excepción, tasa aceptación, horas/sem | Prompt → draft IA → botón "Aplicar" humano |

**Decisión de color (alineado al CLAUDE.md):**
- Automation → indigo (#6366F1)
- Agency → violet (#8B5CF6)
- Augmentation → cyan (#06B6D4)

---

## 6. Referencias

1. BSR. *Looking Under the Hood: ORION Technology Adoption at UPS.* https://www.bsr.org/en/case-studies/center-for-technology-and-sustainability-orion-technology-ups
2. About Amazon (2022, act.). *Amazon introduces Sparrow.* https://www.aboutamazon.com/news/operations/amazon-introduces-sparrow-a-state-of-the-art-robot-that-handles-millions-of-diverse-products
3. DigitalDefynd (2026). *10 ways DHL is using AI [Case Study].* https://digitaldefynd.com/IQ/dhl-using-ai-case-study/
4. DigitalDefynd (2026). *AI Use in the Shipping Industry — Maersk + Pactum.* https://digitaldefynd.com/IQ/ai-use-in-the-shipping-industry-case-studies/
5. PRNewswire (2024). *Flexport Expands the Convoy Platform.* https://www.prnewswire.com/news-releases/flexport-expands-the-convoy-platform-empowering-brokers-to-leverage-ai-to-automate-booking-and-boost-productivity-302161461.html
6. Ainvest (2025). *Amazon's Strategic Entry into Latin American E-commerce Logistics via Rappi.* https://www.ainvest.com/news/amazon-strategic-entry-latin-american-commerce-logistics-rappi-2509/
7. Supply & Demand Chain Executive (2025). *Flexport's New Tech and AI-Powered Products to Transform Global Logistics.* https://www.sdcexec.com/software-technology/ai-ar/news/22934407/flexport-flexports-new-tech-and-aipowered-products-to-transform-global-logistics
8. AIX (2024). *Case Study: DHL's AI-Powered Initiatives to Enhance Operations.* https://aiexpert.network/case-study-dhls-ai-powered-initiatives-to-enhance-operations/
9. DAT (2025). *DAT to acquire the Convoy Platform from Flexport.* https://www.dat.com/company/news-events/news-releases/dat-to-acquire-convoy-platform-from-flexport
