# Investigación: Casos de IA en Retail

> **Fecha:** 2026-06-14
> **Alcance:** Global con énfasis en LATAM / Horizonte 2022-2026
> **Supuestos:** Se priorizan casos con resultados cuantitativos publicados. Cuando no existe paper indexado, se usa fuente empresarial reputable (reporte oficial, MIT Sloan, McKinsey, BCG). Los datos de ROI auto-reportados por vendors se marcan explícitamente. El documento está organizado por los tres InteractionModels del sistema AI Fluency LATAM.

---

## 1. AUTOMATION — IA decide y actúa de extremo a extremo sin supervisión humana en el loop

Casos donde la IA toma decisiones repetitivas de alto volumen y ejecuta acciones (pricing, reposición, clasificación de catálogo, detección de fraude) sin intervención humana por transacción.

---

### Caso 1.1 — Walmart: Reposición automática de inventario con IA (Premio Franz Edelman 2023)

- **Empresa:** Walmart (EE.UU., con operación en LATAM)
- **Pain point:** Quiebres de stock y sobre-stock en cadena de miles de tiendas con demanda altamente variable estacional y promocional.
- **Solución técnica:** Sistema de forecasting con ML que genera órdenes de reposición automáticas una vez validado el pronóstico. Integra señales de inventario en tiempo real con predicciones de demanda granular por SKU y tienda. Desplegado por primera vez para la temporada navideña 2023.
- **Resultados cuantificados:**
  - Reducción de quiebres de stock del 15–25% (rango reportado según categoría)
  - Mejora del 25–40% en tiempos de ciclo de pedido
  - Eliminación de 30 millones de millas de rutas de entrega innecesarias (42,000 toneladas de CO₂ evitadas)
  - Premio Franz Edelman Award 2023 (INFORMS), el más prestigioso en investigación de operaciones
  - Proyección: 65% de tiendas servidas por automatización al cierre de FY2026; costo unitario promedio mejorado ~20%
- **Stack/Tecnología:** ML propietario + automatización de cadena de suministro en la nube
- **Fuente:** Supply Chain Dive (2024); Walmart Corporate (FY2024 Annual Report); INFORMS Franz Edelman Award 2023
- **Cita corta:** Walmart (2023). AI-powered demand forecasting and automated replenishment — Franz Edelman Award Winner. INFORMS. https://corporate.walmart.com/about/technology

---

### Caso 1.2 — Inditex/Zara: Forecasting de demanda hiperlocal con auto-asignación de producción

- **Empresa:** Inditex / Zara (España, con tiendas en LATAM)
- **Pain point:** Sobreproducción y markdown masivo característicos del fast fashion; necesidad de reaccionar a tendencias en semanas, no meses.
- **Solución técnica:** Sistema propietario "Just-In-telligent" (JIT) basado en el Inditex Data AI-Feature Store. Combina ML de forecasting hiperlocal con variables de clima, sentiment en redes sociales y densidad de tráfico peatonal. El 85% de las decisiones iniciales de asignación de producción son ejecutadas automáticamente por el sistema.
- **Resultados cuantificados:**
  - Reducción del 20% en sobrestock versus niveles de 2023 (reportado por Inditex)
  - Inversión en tech y logística: €1.8 MM para 2025-2026
  - Crecimiento de ventas del 7.1% y gross profit del 7.2% entre 2023 y 2024 (correlacionado con adopción de IA)
  - Reducción de lead times de producción del 40% (Retailnews.ai, 2026)
- **Stack/Tecnología:** ML propietario, feature store centralizada, interface de lenguaje natural para diseñadores y store managers
- **Fuente:** Michigan Journal of Economics (2025); Retailnews.ai (2026); ResearchGate — "Enabling ZARA's Operational Innovation and Value Creation with Artificial Intelligence" (2024, DOI: disponible en ResearchGate ID 380931340)
- **Cita corta:** Enabling ZARA's Operational Innovation and Value Creation with Artificial Intelligence (2024). ResearchGate ID: 380931340. https://www.researchgate.net/publication/380931340

---

### Caso 1.3 — Mercado Libre: Moderación automática de anuncios fraudulentos con ML (LATAM)

- **Empresa:** Mercado Libre (Argentina/LATAM)
- **Pain point:** Fraude en listings a escala: millones de anuncios por semana requieren clasificación y moderación automática para evitar productos ilegales, falsificaciones y estafas.
- **Solución técnica:** Sistema de ML que analiza más de 5,000 variables por anuncio en menos de 1 segundo. Procesa imágenes, texto y señales comportamentales (vendedor, comprador, características del producto). Integrado con BigQuery + Reverse ETL para acción en tiempo real sobre sistemas operacionales. Arquitectura de scoring de riesgo en tiempo real.
- **Resultados cuantificados:**
  - Solo el 0.74% de los más de 614 millones de anuncios creados/modificados en H1 2023 fueron removidos por violación de políticas (Reporte de Transparencia Mercado Libre H1 2023)
  - El 98% de esos anuncios removidos fueron detectados automáticamente por IA/ML, sin reporte humano
  - Efecto multiplicador: por cada reporte recibido, el sistema remueve 8 veces más anuncios irregulares
  - El sistema puede pausar o eliminar anuncios en tiempo real
- **Stack/Tecnología:** ML propietario, BigQuery (Google Cloud), Reverse ETL, computer vision + NLP
- **Fuente:** Contxto (2023) — "Mercado Libre uses AI to detect fraudulent advertisements"; Google Cloud Blog — "Inside Mercado Libre's multi-faceted Spanner foundation for scale and AI"; Mercado Libre Transparency Report H1 2023
- **Cita corta:** Mercado Libre (2023). Transparency Report H1 2023: 98% of policy-violating ads detected automatically by AI/ML. https://contxto.com/en/news/mercado-libre-uses-ai-to-detect-fraudulent-advertisements/

---

### Caso 1.4 — Amazon: Pricing dinámico algorítmico y clasificación de catálogo con LLMs

- **Empresa:** Amazon (EE.UU./Global)
- **Pain point:** Optimizar precios de decenas de millones de SKUs en tiempo real frente a competidores, y mantener la calidad de un catálogo con cientos de millones de productos.
- **Solución técnica — Pricing:** Algoritmo de pricing dinámico que actualiza precios cada 10 minutos en función de demanda, competencia, inventario y comportamiento de usuarios. Totalmente automatizado, sin intervención humana por SKU.
- **Solución técnica — Catálogo:** LLMs para extracción de atributos de productos, clasificación en taxonomía y relevance labeling para búsqueda. Paper relevante: "Automated Query-Product Relevance Labeling using Large Language Models for E-commerce Search" (arXiv:2502.15990, 2025) — demuestra que LLMs igualan o superan a anotadores humanos con reducción significativa de costos.
- **Resultados cuantificados:**
  - Pricing dinámico: Amazon actualiza ~2.5 millones de precios por día (estimación industria, fuente: AI in Retail / Shopify 2026)
  - LLM para catálogo: mejoras en precision de 0.75 a 0.82, recall de 0.68 a 0.77, CTR de 0.56 a 0.63 en estudios análogos de e-commerce con LLMs (arXiv:2410.12829)
- **Stack/Tecnología:** Reinforcement learning para pricing, LLMs propietarios para catálogo, AWS
- **Fuente:** arXiv:2502.15990 (2025); arXiv:2410.12829 (2024); Shopify AI in Retail (2026); Rapidinnovation.io (2024)
- **Cita corta:** Li et al. (2025). Automated Query-Product Relevance Labeling using Large Language Models for E-commerce Search. arXiv:2502.15990. https://arxiv.org/abs/2502.15990

---

### Caso 1.5 — Retail genérico: Pricing dinámico con Q-Learning (paper canónico arXiv)

- **Empresa:** Investigación académica aplicable a retailers (no empresa específica)
- **Pain point:** Optimización de revenue en tiempo real adaptando precios a condiciones de mercado, sin requerir modelos matemáticos explícitos de demanda.
- **Solución técnica:** Framework de Reinforcement Learning (Q-Learning) para pricing dinámico en retail. El agente aprende políticas de pricing óptimas mediante interacción con el entorno de mercado, sin necesidad de un modelo paramétrico de demanda.
- **Resultados cuantificados:** El paper reporta mejoras en revenue management versus estrategias estáticas de pricing (resultados cuantitativos específicos en el paper; sin cifra única extraíble sin acceso completo).
- **Stack/Tecnología:** Q-Learning, Reinforcement Learning
- **Fuente:** arXiv:2411.18261 (2024) — "Dynamic Retail Pricing via Q-Learning: A Reinforcement Learning Framework for Enhanced Revenue Management"
- **Cita corta:** Anon. (2024). Dynamic Retail Pricing via Q-Learning: A Reinforcement Learning Framework for Enhanced Revenue Management. arXiv:2411.18261. https://arxiv.org/html/2411.18261v1

---

## 2. AGENCY — Agentes autónomos y sistemas multi-agente que orquestan decisiones complejas

Casos donde agentes de IA (frecuentemente basados en LLMs) perciben contexto, planifican, se comunican con sistemas o usuarios y ejecutan acciones de múltiples pasos sin guión fijo. El humano puede aprobar decisiones de alto impacto, pero no interviene en cada paso.

---

### Caso 2.1 — Amazon Rufus: Agente conversacional de compras (el mayor deployment del mundo)

- **Empresa:** Amazon (EE.UU./Global)
- **Pain point:** La búsqueda por palabras clave no captura la intención compleja del comprador ("busco un regalo para mi mamá que le gusta cocinar y tiene artritis") ni reduce la carga cognitiva en decisiones de compra complejas.
- **Solución técnica:** Rufus es un agente conversacional basado en LLMs integrado en la app de Amazon (lanzado en beta en febrero 2024). Comprende consultas en lenguaje natural, recuerda contexto de la conversación, compara productos, resume reviews, hace preguntas de clarificación y guía al comprador hasta la decisión de compra. Más de 300 millones de clientes lo usaron en 2025.
- **Resultados cuantificados:**
  - Usuarios activos mensuales: crecieron 140% YoY; engagement total +400%
  - Conversión: clientes que interactúan con Rufus son 60% más propensos a completar una compra
  - Black Friday 2024: sesiones con Rufus representaron ~40% del total pero generaron ~66% de las compras; tasa de conversión 3.5x vs. sesiones sin Rufus
  - Cyber Monday: engagement con herramientas AI subió ~2,000%
  - Impacto en ventas: estimado en $10-12 billones en ventas atribuidas para 2025 (myamazonguy.com; ppc.land)
- **Stack/Tecnología:** LLMs propietarios de Amazon, integración con catálogo y reviews de Amazon
- **Fuente:** Modern Retail (2024); TechBuzz.ai; PPC.land; myamazonguy.com; Retail Technology Innovation Hub (2026)
- **Cita corta:** Amazon (2024). Rufus AI Shopping Assistant — 300M+ users, 3.5x conversion rate vs. non-Rufus sessions. Modern Retail. https://www.modernretail.co/technology/amazon-says-its-ai-shopping-assistant-is-gaining-traction-with-rufus-users-up-115/

---

### Caso 2.2 — Magalu / Magazine Luiza "Lu": Agente de ventas en WhatsApp (LATAM)

- **Empresa:** Magazine Luiza / Magalu (Brasil)
- **Pain point:** Alcanzar a los 30 millones de clientes activos con ventas asistidas personalizadas sin escalar proporcionalmente el equipo humano de ventas; aprovechar WhatsApp como canal principal de compra en Brasil.
- **Solución técnica:** "Lu", la mascota virtual de Magalu, fue transformada en un agente de ventas completo dentro de WhatsApp (lanzado noviembre 2025). Arquitectura híbrida multi-modelo: orquestador que decide qué agente entra en cada turno (Gemini Flash y Pro para visión y comparaciones complejas; modelos open source para respuestas rápidas). El agente entiende intenciones, "ve" imágenes enviadas por el usuario, sugiere y compara ítems con contexto, y cierra la venta dentro del chat. Accede a 37 millones de listings del marketplace con 300,000 vendedores.
- **Resultados cuantificados:**
  - Conversión 3x superior a la app móvil de Magalu en prueba inicial con 1 millón de clientes recurrentes
  - Meta de rollout: 30 millones de clientes activos (toda la base) al cierre de 2025
- **Stack/Tecnología:** Google Gemini (Flash + Pro), modelos open source, WhatsApp Business API, arquitectura multi-agente orquestada
- **Fuente:** Exame (2025); OpenClaw Brasil (2025); Martech Brasil (2025); eMarketer (2024)
- **Cita corta:** Magalu (2025). Lu AI Commerce: agente de ventas en WhatsApp con conversión 3x vs. app. Exame. https://exame.com/inteligencia-artificial/lu-do-magalu-ganha-cerebro-com-ia-e-vira-vendedora-dentro-do-whatsapp/

---

### Caso 2.3 — Alibaba Accio Work: Flota de agentes para sourcing y negociación con proveedores

- **Empresa:** Alibaba International (China/Global)
- **Pain point:** Los compradores B2B (especialmente pymes) dedican decenas de horas a solicitar cotizaciones, evaluar proveedores y negociar condiciones con fabricantes en China — proceso manual, lento y fragmentado.
- **Solución técnica:** Accio Work (lanzado Q1 2026) es una plataforma de agentes de IA sobre la infraestructura B2B de Alibaba (Alibaba.com, 1688, Taobao, AliExpress). Los agentes autónomos: (1) responden RFQs (requests for quotation), (2) inician rondas tempranas de negociación con proveedores reales, (3) gestionan documentación aduanera y devoluciones de impuestos, con "approval gates" para que el comprador apruebe compromisos vinculantes. Basado en Accio (motor de sourcing IA lanzado noviembre 2024).
- **Resultados cuantificados:**
  - Accio alcanzó 500,000 usuarios en 3 meses desde su lanzamiento; 1 millón en 6 meses; 2 millones en 9 meses
  - La plataforma de agentes (Wukong) integra todo el ecosistema Alibaba (Taobao, Tmall, 1688, Alipay, Alibaba Cloud) como skills modulares
- **Stack/Tecnología:** LLMs propietarios de Alibaba (Qwen), arquitectura multi-agente "Wukong", integración con ecosistema B2B de Alibaba
- **Fuente:** TechWireAsia (2026); Digital Commerce 360 (2026); Boston Institute of Analytics (2026); TheSoftwareScout (2026)
- **Cita corta:** Alibaba (2026). Accio Work: AI agent fleets for autonomous B2B sourcing and supplier negotiation. Digital Commerce 360. https://www.digitalcommerce360.com/2026/03/24/alibaba-international-announces-ai-agent-fleets-via-accio-work/

---

### Caso 2.4 — Multi-agente para supply chain retail: Framework académico validado (arXiv)

- **Empresa/Contexto:** Investigación académica (validada en casos de inventario retail)
- **Pain point:** La optimización de demanda y inventario en supply chains de retail con IoT involucra decisiones interdependientes que un sistema centralizado no puede resolver eficientemente en tiempo real.
- **Solución técnica:** Framework de Multi-Agent Deep Reinforcement Learning (MADRL) que optimiza conjuntamente forecasting de demanda y gestión de inventario en supply chains de retail con sensores IoT, RFID y smart shelves. Múltiples agentes coordinan decisiones de reposición en nodos distribuidos de la cadena.
- **Resultados cuantificados:**
  - El framework demuestra reducción en costos de inventario y mejora en niveles de servicio versus métodos tradicionales de optimización (resultados cuantitativos detallados en el paper — sin cifra única representativa sin acceso completo)
  - Contexto análogo: organizaciones con stewardship cruzado de datos logran 42% mayor consistencia en forecasts y 37% mayor precisión en predicciones promocionales (estudio longitudinal de 120 cadenas retail, 2019-2023, WJARR 2024)
- **Stack/Tecnología:** Multi-Agent Deep Reinforcement Learning, IoT, RFID, smart shelf data
- **Fuente:** PMC/NCBI (2025) — "Multi-Agent Deep Reinforcement Learning for Integrated Demand Forecasting and Inventory Optimization in Sensor-Enabled Retail Supply Chains"; arXiv:2411.10184 (2024) — "Agentic LLMs in the Supply Chain: Towards Autonomous Multi-Agent Consensus-Seeking"
- **Cita corta:** Multi-Agent Deep Reinforcement Learning for Integrated Demand Forecasting and Inventory Optimization in Sensor-Enabled Retail Supply Chains (2025). PMC/NCBI. https://www.ncbi.nlm.nih.gov/pmc/articles/PMC12031219/ | Agentic LLMs in the Supply Chain (2024). arXiv:2411.10184. https://arxiv.org/abs/2411.10184

---

## 3. AUGMENTATION — IA como copiloto que potencia al humano; el humano decide

Casos donde la IA provee insights, recomendaciones, resúmenes o sugerencias al empleado o cliente, quien mantiene el control de la decisión final. El objetivo es multiplicar la capacidad del humano, no reemplazarla.

---

### Caso 3.1 — Walmart "My Assistant" y "Ask Sam": Copilotos para 50,000 asociados

- **Empresa:** Walmart (EE.UU., con operación en 11 países incluyendo LATAM)
- **Pain point:** Los asociados de tienda pierden tiempo buscando ubicación de productos, consultando precios, revisando mensajes internos y redactando reportes; los empleados corporativos dedican horas a leer documentos largos y generar borradores.
- **Solución técnica:**
  - **Ask Sam:** Asistente de voz para empleados de piso. Localiza ítems en tienda, muestra mapas, consulta precios, revisa mensajes y ventas — todo por voz.
  - **My Assistant:** Herramienta GenAI para 50,000 empleados no-tienda (desktop + mobile). Acelera redacción, resume documentos, actúa como partner creativo. Expandida en 2024 a 25,000 asociados internacionales adicionales (50% de aumento en base de usuarios).
- **Resultados cuantificados:**
  - La implementación temprana (IA para inventario + liberación de tiempo para atención al cliente) contribuyó a un NPS más alto durante la temporada navideña 2023 (reportado por Walmart CIO Dive)
  - Rollout a 11 países en 2024; 50K+ usuarios activos en EE.UU.
  - Proyección de ahorro en costo unitario logístico: ~20% al cierre FY2026
- **Stack/Tecnología:** GenAI (Microsoft Azure OpenAI), integración con sistemas de inventario y HRIS de Walmart
- **Fuente:** CIO Dive (2023); Walmart Corporate (2024); Microsoft Blog (2024)
- **Cita corta:** Walmart (2024). Expanding One-Of-A-Kind Associate GenAI Tool to 11 Countries. Walmart Corporate. https://corporate.walmart.com/news/2024/01/09/walmarts-expanding-one-of-a-kind-associate-genai-tool-to-11-countries-in-2024

---

### Caso 3.2 — Sephora Visual Artist + Beauty Advisor: Copiloto de compra para el cliente

- **Empresa:** Sephora (Francia/Global, con presencia en LATAM)
- **Pain point:** Los clientes de belleza no pueden probar productos online; la tasa de devoluciones de maquillaje es alta; el tiempo de sesión en app era corto y la conversión subóptima.
- **Solución técnica:** Conjunto de herramientas de augmentation para el cliente:
  - **Virtual Artist:** AR de prueba virtual de maquillaje en tiempo real (más de 200 millones de try-ons completados)
  - **Beauty Advisor (Messenger):** Chatbot de recomendación personalizada que actúa como copiloto del comprador online
  - El humano (cliente) siempre toma la decisión de compra; la IA augmenta su criterio con prueba visual y recomendaciones contextuales
- **Resultados cuantificados:**
  - Usuarios de AR try-on: tasa de conversión hasta 90% superior vs. no usuarios
  - Clientes que usan Virtual Artist son 3x más propensos a completar una compra
  - Beauty Advisor (Messenger): +11% en conversiones
  - Reducción del 30% en devoluciones de productos de maquillaje
  - Tiempo de sesión promedio: de 3 minutos a 12 minutos tras adopción de IA
  - Crecimiento e-commerce: de $580M (2016) a más de $3B (2022) — período de adopción de IA
  - AR mirrors físicos en tienda: +31% en ventas estimadas (BrandXR Research Report)
- **Stack/Tecnología:** AR (computer vision), chatbot con NLP, integración con app iOS/Android
- **Fuente:** BrandXR Research Report; DigitalDefynd (2026); Cut The SaaS; Agentive AIQ
- **Cita corta:** Sephora (2022-2024). Virtual Artist AR + Beauty Advisor: 90% higher conversion, 30% return reduction, 3x purchase likelihood. DigitalDefynd. https://digitaldefynd.com/IQ/sephora-using-ai-case-study/

---

### Caso 3.3 — M&S / Lindex: Copiloto del store manager con GenAI

- **Empresa:** Marks & Spencer (Reino Unido) y Lindex (Suecia)
- **Pain point:** Los store managers dedican horas a procesar datos de ventas, generar notas de reunión, construir rosters de turno y redactar handovers — tiempo robado a la gestión de equipo y atención al cliente.
- **Solución técnica:**
  - **M&S:** Desplegó 11,000 licencias de Microsoft 365 Copilot para todos los store managers y empleados de soporte central. El copiloto convierte datos en highlights y tendencias en segundos; genera notas de reunión, insights de ventas, rosters y handovers de turno automáticamente.
  - **Lindex:** Lanzó "Lindex Copilot" en junio 2023 para empleados de tienda, entrenado sobre datos de ventas y operaciones de la cadena. Provee recomendaciones personalizadas de operaciones de tienda.
- **Resultados cuantificados:**
  - M&S: 11,000 usuarios del copiloto; tiempo ahorrado en tareas administrativas (no publicado cifra exacta)
  - Lindex: primer retailer de moda en desplegar copiloto GenAI para empleados de tienda (referencia McKinsey 2024)
  - Benchmark McKinsey (2024): IA de scheduling entrega 10-20% mejora en utilización de workforce, 5-8% reducción en overtime, schedules 30% más rápidos que manual
  - Deloitte (2024): 47% de grandes retailers de EE.UU. han implementado scheduling asistido por IA en al menos una región
- **Stack/Tecnología:** Microsoft 365 Copilot (Azure OpenAI GPT-4), datos de ventas propietarios, integración con sistemas HR
- **Fuente:** M&S Press Release (2024); McKinsey — "LLM to ROI: How to scale gen AI in retail" (2024); PredictHQ (2024)
- **Cita corta:** M&S (2024). 11,000 Microsoft 365 Copilot licenses for Store Managers — AI turns data into insights in seconds. M&S Newsroom. https://corporate.marksandspencer.com/newsroom/press-releases/ms-gives-every-store-manager-and-every-store-support-centre-colleague | McKinsey (2024). LLM to ROI: How to scale gen AI in retail. https://www.mckinsey.com/industries/retail/our-insights/llm-to-roi-how-to-scale-gen-ai-in-retail

---

### Caso 3.4 — Carrefour "Hopla" y SymphonyAI Category Manager Copilot

- **Empresa:** Carrefour (Francia/Global, con presencia en LATAM) + SymphonyAI (vendor de retail AI)
- **Pain point (Hopla):** Los compradores online de supermercado tienen dificultad planificando menús y listas de compra complejas (restricciones dietéticas, presupuesto, número de comensales) — proceso cognitivamente demandante que reduce la conversión.
- **Pain point (Category Manager Copilot):** Los category managers manejan miles de SKUs y no pueden procesar toda la señal disponible (ventas, precios, tendencias, competencia) para tomar decisiones óptimas de surtido y precio.
- **Solución técnica:**
  - **Hopla (Carrefour):** Asistente GPT integrado en web y app. El cliente describe su situación ("cena para 5 personas, presupuesto €30, un vegetariano") y Hopla construye la lista de compra, sugiere productos y facilita la compra. El cliente siempre aprueba y edita.
  - **Category Manager Copilot (SymphonyAI):** Herramienta de augmentation para ejecutivos de merchandising y category managers. Provee guidance en tiempo real con analítica predictiva para optimizar performance de categoría y crecimiento rentable.
- **Resultados cuantificados:**
  - Carrefour + AI en email marketing: CTR de emails +25% (reportado junto a Best Buy y Michaels con misma plataforma, Publitas/DesignRush 2024)
  - Usuarios de herramientas AI de Carrefour: 55% más propensos a regresar dentro de los 7 días; 65% más propensos a encontrar un ítem que les guste
  - McKinsey estima que GenAI puede generar $240B–$390B en valor económico para retailers (McKinsey, 2024)
- **Stack/Tecnología:** OpenAI GPT-4 (Hopla), analítica predictiva propietaria (SymphonyAI)
- **Fuente:** Publitas Blog (2024); DesignRush (2024); SymphonyAI Category Manager Copilot datasheet; McKinsey (2024)
- **Cita corta:** Carrefour (2024). Hopla GPT-powered assistant: +55% return rate, +65% product discovery vs. non-AI sessions. Publitas. https://www.publitas.com/blog/generative-ai-in-retail-carrefour-ai-rollout/

---

## 4. Tabla resumen de ROI por caso

| # | Empresa | Interaction Model | Inversión / Escala | Resultado clave | Madurez |
|---|---------|-------------------|-------------------|-----------------|---------|
| 1.1 | Walmart | Automation | $X MM en automatización supply chain | -15 a 25% stockouts; -20% costo unitario proyectado (FY2026) | Production (Premio Edelman 2023) |
| 1.2 | Inditex/Zara | Automation | €1.8 MM tech+logística 2025-26 | -20% sobrestock; -40% lead times | Production |
| 1.3 | Mercado Libre | Automation | Sin cifra pública | 98% detección automática de fraude; 8x efecto multiplicador | Production |
| 1.4 | Amazon | Automation | Sin cifra pública | Pricing actualizado cada 10 min; LLM: precision +0.07, CTR +0.07 | Production |
| 1.5 | Académico | Automation | N/A (paper) | Framework RL para pricing (sin cifra única) | Research |
| 2.1 | Amazon Rufus | Agency | Sin cifra pública | 3.5x conversión vs. no-Rufus; $10-12B ventas atribuidas 2025 | Production |
| 2.2 | Magalu Lu | Agency | Sin cifra pública | 3x conversión vs. app; 30M clientes objetivo | Production (LATAM) |
| 2.3 | Alibaba Accio | Agency | Sin cifra pública | 2M usuarios en 9 meses; agentes negocian con proveedores reales | Production |
| 2.4 | Académico MADRL | Agency | N/A (paper) | +42% consistencia forecast; +37% precisión promocional (contexto) | Research |
| 3.1 | Walmart Associate | Augmentation | Sin cifra pública | 50K usuarios; NPS holiday 2023 mejorado | Production |
| 3.2 | Sephora | Augmentation | Sin cifra pública | 90% mayor conversión (AR); -30% devoluciones; sesión: 3→12 min | Production |
| 3.3 | M&S / Lindex | Augmentation | 11K licencias Copilot | Horas admin reducidas; primer mover en fashion retail (Lindex) | Production |
| 3.4 | Carrefour Hopla | Augmentation | Sin cifra pública | +55% retención 7 días; +65% product discovery | Production |

---

## 5. Riesgos y fracasos documentados

### Amazon Just Walk Out: pivot estratégico (2024)
Amazon removió Just Walk Out de sus propias tiendas Fresh en 2024, aunque mantiene la tecnología para terceros (170+ ubicaciones en aeropuertos, estadios, universidades). En su pico en el estadio Lumen Field (Seattle Seahawks) logró +60% en throughput de clientes y 2x transacciones versus concesiones tradicionales (temporada 2022). El pivot no fue por falla técnica sino por costos de implementación y preferencia de clientes de supermercado por experiencias diferentes. Lección: el canal importa — el mismo sistema puede tener ROI muy distinto según el contexto de uso (supermercado vs. estadio).

### Sobreventa de ROI por vendors de AI
McKinsey (2024) reporta que solo el 3% de organizaciones han escalado un caso de uso de GenAI en operaciones. La brecha entre pilotos exitosos y escala real es el riesgo principal. Los datos de ROI auto-reportados por vendors (plataformas de recomendación, scheduling, etc.) tienden a sobrestimar resultados. Triangular siempre con fuentes independientes.

### Dependencia de calidad de datos
Un estudio de 2024 sobre 120 cadenas retail muestra que organizaciones sin gobernanza de datos cruzada entre departamentos obtienen resultados 42% menos consistentes en forecasting que las que sí la tienen. La IA amplifica la calidad (o los problemas) de los datos subyacentes.

### H&M: exceso de inventario histórico (pre-IA) como advertencia
H&M acumuló $4B en inventario obsoleto en 2018 (pre-implementación sistemática de IA). La adopción de ML de demanda permitió reducir exceso de inventario hasta 25% (reportado 2024). El caso ilustra el costo de no adoptar forecasting inteligente, más que un fracaso de IA.

---

## 6. Fuentes para contexto de mercado LATAM

- El e-commerce B2C en LATAM creció a $167B en 2023 (Latin America B2C E-Commerce Market Report 2024, PR Newswire)
- Mercado Libre es el retailer digital dominante en LATAM con más de 218M usuarios activos (Q1 2025)
- Magalu es el segundo retailer digital de Brasil con 30M clientes activos y tecnología de punta en AI commerce
- Falabella reportó inversión de $166M en infraestructura digital para 2025; Sodimac e-commerce creció 18% YoY
- WhatsApp es el canal de comunicación dominante en LATAM, lo que hace el caso Magalu Lu directamente replicable

---

## 7. Citas listas para bibliografía (formato APA-light)

**Para usar como párrafo de referencias en la simulación:**

1. Walmart (2023). AI-powered automated replenishment — Franz Edelman Award Winner. INFORMS Operations Research. https://corporate.walmart.com/about/technology

2. Inditex (2024). Enabling ZARA's Operational Innovation and Value Creation with Artificial Intelligence. ResearchGate ID: 380931340. https://www.researchgate.net/publication/380931340

3. Mercado Libre (2023). Transparency Report H1 2023: AI/ML detects 98% of fraudulent listings automatically. https://contxto.com/en/news/mercado-libre-uses-ai-to-detect-fraudulent-advertisements/

4. Li et al. (2025). Automated Query-Product Relevance Labeling using Large Language Models for E-commerce Search. arXiv:2502.15990. https://arxiv.org/abs/2502.15990

5. Anon. (2024). Dynamic Retail Pricing via Q-Learning: A Reinforcement Learning Framework for Enhanced Revenue Management. arXiv:2411.18261. https://arxiv.org/html/2411.18261v1

6. Amazon (2024). Rufus AI Shopping Assistant: 3.5x conversion, $10-12B attributed sales 2025. Modern Retail / PPC.land. https://www.modernretail.co/technology/amazon-says-its-ai-shopping-assistant-is-gaining-traction-with-rufus-users-up-115/

7. Magalu (2025). Lu AI Commerce en WhatsApp: conversión 3x vs. app, 30M clientes objetivo. Exame. https://exame.com/inteligencia-artificial/lu-do-magalu-ganha-cerebro-com-ia-e-vira-vendedora-dentro-do-whatsapp/

8. Sephora (2024). Virtual Artist AR + Beauty Advisor: 90% higher conversion, 30% return reduction. DigitalDefynd. https://digitaldefynd.com/IQ/sephora-using-ai-case-study/

9. M&S (2024). 11,000 Microsoft 365 Copilot licenses for Store Managers and Support Centre colleagues. M&S Newsroom. https://corporate.marksandspencer.com/newsroom/press-releases/ms-gives-every-store-manager-and-every-store-support-centre-colleague

10. McKinsey & Company (2024). LLM to ROI: How to scale gen AI in retail — $240B-$390B economic value potential. McKinsey Retail. https://www.mckinsey.com/industries/retail/our-insights/llm-to-roi-how-to-scale-gen-ai-in-retail

11. PMC/NCBI (2025). Multi-Agent Deep Reinforcement Learning for Integrated Demand Forecasting and Inventory Optimization in Sensor-Enabled Retail Supply Chains. https://www.ncbi.nlm.nih.gov/pmc/articles/PMC12031219/

12. Alibaba (2026). Accio Work: AI agent fleets for autonomous B2B sourcing and supplier negotiation. Digital Commerce 360. https://www.digitalcommerce360.com/2026/03/24/alibaba-international-announces-ai-agent-fleets-via-accio-work/

---

## 8. Preguntas abiertas para próxima iteración

1. **Paper con DOI verificado para Mercado Libre ML:** Los datos de transparencia están en reporte público pero no en paper académico indexado. Buscar en Google Scholar: "Mercado Libre machine learning fraud" para papers de autores internos.

2. **Resultados cuantitativos detallados de MADRL (Caso 2.4):** El paper de PMC está disponible pero requiere acceso completo para extraer métricas específicas de reducción de costos de inventario.

3. **Datos de Falabella y Liverpool con IA:** La evidencia disponible es escasa en métricas de IA. Falabella reporta KPIs de negocio pero no desagrega contribución de IA. Recomendar búsqueda directa en reportes anuales de Falabella 2024-2025.

4. **Caso de IA para fashion buyer (Augmentation en compras de moda):** H&M tiene implementación documentada de ML para trend forecasting pero no hay paper indexado con métricas de performance del comprador humano asistido. Buscar "H&M AI buyer assistant paper" en arXiv/ACM.

5. **Evolución de Amazon Just Walk Out:** Determinar si el pivot de Fresh a terceros tiene datos de ROI desagregados por tipo de venue (aeropuerto vs. estadio vs. campus) para el benchmarking de la simulación.
