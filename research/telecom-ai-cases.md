# Investigación: IA en Telecomunicaciones — Casos y Benchmarks

> **Fecha:** 2026-06-14
> **Alcance:** Global (operadores tier-1), con énfasis en casos post-2022 y presencia LATAM donde disponible
> **Horizonte:** 2022-2026 (era LLM + 5G SA + Open RAN)
> **Supuestos:** Los resultados de energía de Ericsson/Nokia provienen de press releases de los propios vendors (auto-reporte); los resultados de Amdocs en accuracy provienen de comunicados de prensa corporativos. Los papers arXiv no han pasado peer review formal a menos que se indique venue de conferencia o journal.

---

## 1. Resumen ejecutivo

- **Automation** domina en gestión de energía y detección de fraude: Vodafone UK + Ericsson redujeron consumo de RUs 5G hasta 33% con Cell Sleep Mode orquestado por IA; Airtel India bloqueó 48.300 millones de llamadas spam con detección ML en red.
- **Agency** está emergiendo: DNB (Malasia) y True Corporation (Tailandia) son los dos primeros operadores del mundo con validación TM Forum Level 4 para Service Assurance autónoma (2025), usando Ericsson Intent-based Operations con agentes GenAI. Amdocs aOS desplegó agentes que logran >90% de resolución en billing en carrier norteamericano.
- **Augmentation** tiene el caso LATAM más concreto: Telefônica Brasil (Vivo) implementó copiloto I.Ajuda con Azure OpenAI para 23.000 agentes, reduciendo AHT 9% para clientes individuales (2023). Vodafone SuperTOBi con Microsoft GenAI subió first-time resolution del 15% al 60%.
- **La eficiencia energética es el driver de ROI más documentado** en LATAM: Telefónica redujo consumo global 7,2% mientras el tráfico creció 6,7x; en LATAM, red de Uruguay 2G apagada redujo consumo 17% en esos sitios.
- **Papers con mayor solidez**: arXiv:2406.15638 (RCA 5G RAN con GNN+Transformer), arXiv:2408.16284 (churn ensemble 99,28%), arXiv:2407.09424 (TelecomGPT, supera GPT-4 en telecom math modeling), arXiv:2309.05557 (NetEval LLM benchmark para NetOps).

---

## 2. Panorama del dominio

### Tamaño y contexto

La industria global de telecomunicaciones genera ~USD 1,7 billones anuales en ingresos. El gasto en IA por operadores se proyecta en USD 36.700 millones para 2026 (Analysys Mason, 2023). En LATAM, el mercado telecom supera USD 200.000 millones anuales; Brasil representa el 33,2% del total regional.

### Presiones estructurales

- **ARPU plano o en declive** con CAPEX creciente para 5G y fibra.
- **Costos de energía** representan 20-40% del OPEX de una red móvil; en LATAM el costo energético es especialmente oneroso.
- **Fraude de telecomunicaciones** (IRSF, SIM box, spam) costó ~USD 38.950 millones en 2023 (GSMA Intelligence).
- **Churn** promedio de 2-3% mensual en mercados prepago LATAM.
- **Escasez de talento técnico**: Opengear (2023) reportó que el 25% de los ingenieros de red se retirarán en 5 años.

### Tendencias 2023-2026

| Tendencia | Descripción |
|-----------|-------------|
| Redes Autónomas (AN) TM Forum | Marco Level 0-5; en 2025 los primeros operadores alcanzan Level 4 validado |
| Open RAN + AI-RAN | NVIDIA AI-RAN Alliance (feb. 2024); GPU-accelerated baseband |
| LLMs para NetOps | TelecomGPT, NetEval, modelos fine-tuned en 3GPP/ITU-T specs |
| Agentes autónomos de atención | SuperTOBi (Vodafone), Aura (Telefónica), amAIz Agents (Amdocs) |
| Eficiencia energética IA | Cell Sleep Mode + AI orquestación; regulatorio ESG en operadores |

---

## 3. Top dolores / pain points

| # | Dolor | Frecuencia | Impacto económico | Fuente |
|---|-------|------------|-------------------|--------|
| 1 | Costos de energía de RAN (20-40% del OPEX) | Muy alta | USD 15-25 B anuales para top-10 operadores | GSMA, Analysys Mason 2022 |
| 2 | Fraude (IRSF, SIM box, spam, phishing) | Muy alta | USD 38.950 M anuales globales | GSMA Intelligence 2023 |
| 3 | Churn de clientes (2-3%/mes prepago LATAM) | Muy alta | 5-30% de revenue en riesgo | Industry avg. |
| 4 | MTTR elevado en incidencias de red | Alta | Pérdida de SLA + penalizaciones contractuales | TM Forum |
| 5 | Volumen de tickets NOC y saturación de alarmas | Alta | 40% tiempo ingenieros en tareas repetitivas | WWT case study |
| 6 | Costo de atención al cliente (call center) | Alta | USD 5-15 por interacción asistida vs. USD 0,10 digital | Vodafone/Amdocs |
| 7 | Planificación de CAPEX (fibra, torres) con demanda incierta | Media | Sobredimensionamiento o degradación de QoS | Ericsson/Nokia reports |
| 8 | Escasez de técnicos de campo y NOC cualificados | Alta | Costos de reclutamiento + tiempo de resolución | Opengear 2023 |

---

## 4. Benchmarking: casos por InteractionModel

---

## MODELO 1 — AUTOMATION
*La IA decide y ejecuta sin intervención humana. Bucles cerrados de extremo a extremo.*

---

### Caso A1: Vodafone UK + Ericsson — Cell Sleep AI para eficiencia energética 5G

- **Operador:** Vodafone UK | **Vendor:** Ericsson
- **Pain point:** Consumo energético excesivo de Radio Units 5G en horas de bajo tráfico.
- **Solución técnica:** Ericsson Service Continuity AI App suite con Intelligent Energy Efficiency. Tres use cases automatizados: 5G Deep Sleep (apaga la RU en silencio de tráfico), 4G Cell Sleep Mode Orchestration (coordina capas de cobertura/capacidad), y Radio Power Efficiency Heatmap. Sin intervención humana en el loop.
- **Resultados medibles:**
  - Reducción de hasta **33% en consumo diario** de 5G Radio Units en sitios piloto de Londres.
  - **5G Deep Sleep**: hasta **70% de ahorro energético** durante períodos de muy bajo tráfico.
  - Trial en sitios seleccionados de Londres; resultado publicado en press release Ericsson, marzo 2025.
- **Stack tecnológico:** Ericsson Service Continuity AI App suite, ML sobre datos de tráfico en tiempo real, integrado en Ericsson Operations Engine.
- **Nivel de confianza:** Medio (auto-reporte vendor + operador, no peer-reviewed).
- **Fuente:** Ericsson press release, 11 mar. 2025. https://www.ericsson.com/en/press-releases/3/2025/vodafone-uk-and-ericsson-trial-ai-solutions-for-improved-5g-energy-efficiency

**Casos adicionales de eficiencia energética con IA:**
- **Far EasTone (Taiwan) + Ericsson (2023):** Service Continuity AI App logró **25% de reducción de consumo diario de RAN** (nivel conservador); proyección con nivel agresivo: 32-46%. RAN representaba el 71% de la factura eléctrica anual de FET. *Fuente: Ericsson press release abr. 2023 (auto-reporte).* https://www.ericsson.com/en/news/2023/4/ericssons-service-continuity-ai-app-delivers-25-percent-energy-savings-for-far-eastone
- **TDC NET (Dinamarca) + Ericsson (2024):** Predictive Cell Energy Management (PCEM) en producción desde mayo 2024. Redujo energía necesaria para transmitir 1 GB en ~5% en el segmento objetivo. Resultado auditado: **800 MWh ahorrados** y **135 toneladas métricas de CO2e evitadas** en 2024. Primera validación TM Forum Level 4 para escenario de Energy Efficiency (jun. 2025). *Fuente: Converge Digest / Ericsson PR jun. 2025.*

**Relevancia LATAM:** Telefónica implementó soluciones equivalentes de Power Saving Features con IA/ML en redes 4G/5G de España y Alemania. A nivel de grupo, reducción de consumo energético del **7,2% global** con tráfico creciendo **6,7x** en 6 años. En LATAM específicamente, apagado de red 2G en Uruguay resultó en **17% de reducción de consumo** en esos sitios. El CME (Centro de Monitoreo de Energía) de Telefônica Brasil monitorea >35.000 puntos de consumo. Fuente: Telefónica press release, 2022-2023.

---

### Caso A2: Bharti Airtel India — Detección automática de fraude y spam en red

- **Operador:** Bharti Airtel (India)
- **Pain point:** Llamadas spam, phishing por SMS y pérdidas financieras por fraude a clientes a escala masiva.
- **Solución técnica:** Plataforma de inteligencia multicapa basada en IA/ML que analiza tráfico de internet en tiempo real, cruza con repositorios globales de threat actors y base de datos propia, y bloquea automáticamente sitios fraudulentos antes de que el usuario complete la carga de página. Cubre SMS, email, WhatsApp, Telegram, Facebook, Instagram y browsers.
- **Resultados medibles:**
  - **48.300 millones de llamadas spam bloqueadas** desde lanzamiento del sistema de detección.
  - **320.000 enlaces fraudulentos bloqueados** en el período documentado.
  - Entre sept. 2024 y jun. 2025: **68,7% de reducción en pérdidas financieras** por fraude a clientes; **14,3% de caída** en incidentes de cibercrimen.
  - En un solo mes (cifra reportada anteriormente): **154 millones de detecciones de fraude**.
- **Stack tecnológico:** ML propio de Airtel, APIs de repositorios globales de amenazas, operando a nivel de red (sin requerir app en dispositivo del cliente).
- **Nivel de confianza:** Medio (datos de press release corporativo; metodología de cálculo no auditada externamente).
- **Fuente:** Airtel press release, 15 may. 2025. https://www.airtel.in/press-release/05-2025/airtel-launches-fraud-detection-solution-a-first-in-the-world/

---

### Caso A3: Predicción automática de churn con ML — benchmark académico

- **Referencia:** Shaikhsurab, M.A. & Magadum, P. (2024). *Enhancing Customer Churn Prediction in Telecommunications: An Adaptive Ensemble Learning Approach*. arXiv:2408.16284.
- **Pain point:** Alta tasa de churn en telecomunicaciones sin capacidad de intervención predictiva precisa.
- **Solución técnica:** Framework de ensemble adaptativo combinando XGBoost, LightGBM, LSTM, MLP y SVM con stacking y meta-feature generation para predecir churn a nivel de cliente individual.
- **Resultados medibles:**
  - **99,28% de accuracy** en dataset público de churn de telecomunicaciones.
  - Supera en precisión y recall a enfoques de modelo único.
  - Permite trigger automático de campañas de retención con anticipación suficiente.
- **Stack tecnológico:** XGBoost, LightGBM, LSTM, MLP, SVM con stacking ensemble; Python/scikit-learn.
- **Nivel de confianza:** Alto para el benchmark académico (arXiv con revisión de comunidad). El 99,28% aplica sobre el IBM Telco Dataset (público), no en producción.
- **Fuente:** arXiv:2408.16284. https://arxiv.org/abs/2408.16284
- **Paper relacionado (survey):** arXiv:2509.22654 — "A Comprehensive Analysis of Churn Prediction in Telecommunications Using Machine Learning" (2025); revisa más de 40 modelos. https://arxiv.org/abs/2509.22654

---

### Caso A4b: NTT DOCOMO + Nokia MantaRay SON — Self-Organizing Network autónoma en producción

- **Operador:** NTT DOCOMO (Japón) | **Vendor:** Nokia
- **Pain point:** La creciente complejidad de redes 5G multi-vendor hace imposible que los ingenieros gestionen manualmente la planificación, provisioning y optimización continua de parámetros de red.
- **Solución técnica:** Nokia MantaRay SON desplegado en la red LTE+5G multi-vendor de DOCOMO a través de la plataforma OREX SMO (Service Management and Orchestration). El sistema cierra el loop en: energy efficiency, parameter tuning y network optimization — todos en producción sin intervención humana. Es la primera implementación de 5G base station Nokia combinada con los sistemas de operación de DOCOMO (first-in-Japan).
- **Resultados medibles:**
  - Operaciones automatizadas en production: energy efficiency, parameter tuning y optimización de red.
  - Detección y ejecución automática de cambios de configuración 5G sin intervención humana (closed-loop operations).
  - Marco de referencia para avanzar hacia TM Forum Level 4 en dominios de RAN.
- **Stack tecnológico:** Nokia MantaRay SON, DOCOMO OREX SMO, O-RAN compatible, multi-vendor.
- **Nivel de confianza:** Medio-alto (anuncio conjunto Nokia-DOCOMO con detalles técnicos; sin métricas cuantitativas publicadas de producción).
- **Fuente:** Nokia/DOCOMO joint announcement, 2024. https://www.nokia.com/newsroom/nokia-introduces-mantaray-son-to-ntt-docomos-multi-vendor-5g-network/ | Nokia blog: https://www.nokia.com/blog/building-autonomous-ran-together-ntt-docomo-and-nokias-smo-journey/

---

### Caso A4: Root Cause Analysis automático en RAN 5G — Simba (GNN + Transformer)

- **Referencia:** Hasan, A., Boeira, C., Papry, K., Ju, Y., Zhu, Z. & Haque, I. (2024). *Root Cause Analysis of Anomalies in 5G RAN Using Graph Neural Network and Transformer*. arXiv:2406.15638.
- **Pain point:** Los ingenieros de NOC tardan horas/días en identificar la causa raíz de anomalías en RAN 5G porque los sistemas heredados para LTE no capturan dependencias espaciales y temporales de 5G.
- **Solución técnica:** Sistema Simba que combina Graph Neural Networks (captura relaciones espaciales entre celdas/gNodeBs) con Transformers (aprende patrones temporales en KPIs). Genera datos sintéticos de fallo con el simulador Simu5G para superar escasez de datos etiquetados. Opera automáticamente sobre alarmas en tiempo real.
- **Resultados medibles:** El paper reporta superioridad sobre soluciones existentes diseñadas para LTE en múltiples escenarios de fallo. Métricas numéricas específicas disponibles en el PDF completo (no en abstract).
- **Stack tecnológico:** GNN + Transformer, Simu5G para datos sintéticos, Python/PyTorch.
- **Nivel de confianza:** Alto (arXiv con DOI verificable, Computer Science - Networking).
- **Fuente:** arXiv:2406.15638, jun. 2024. https://arxiv.org/abs/2406.15638
- **Dataset relacionado:** TelecomTS (arXiv:2510.06063) — dataset de observabilidad de red 5G real para anomaly detection, root-cause analysis y razonamiento multimodal (2025). https://arxiv.org/abs/2510.06063

---

## MODELO 2 — AGENCY
*Sistemas multi-agente o agentes autónomos que orquestan decisiones complejas, coordinan sistemas y ejecutan remediación end-to-end.*

---

### Caso B1: DNB (Malasia) + Ericsson — Primera validación mundial TM Forum Level 4 Autonomy

- **Operador:** Digital Nasional Berhad (DNB, red 5G nacional de Malasia) | **Vendor:** Ericsson
- **Pain point:** Gestión de throughput 5G requería intervención manual constante de ingenieros para balancear intents conflictivos (calidad vs. eficiencia vs. cobertura) en red de cobertura nacional.
- **Solución técnica:** Ericsson Intent-based Operations (IBO) con agentes GenAI que:
  1. Reciben intents en lenguaje natural del operador.
  2. Detectan conflictos entre intents usando GenAI.
  3. Generan propuestas de resolución y las evalúan en Digital Twin simulation.
  4. Ejecutan automáticamente la decisión ganadora en la red real.
  El sistema opera como un agente end-to-end en el dominio de Service Assurance para Throughput Management, sin aprobación humana paso a paso.
- **Resultados medibles:**
  - Primera validación mundial de TM Forum Level 4 Autonomy para Service Assurance (oct. 2025).
  - Throughput Management activo en la red de DNB por 2 años antes de la validación.
  - Cobertura: >80% de áreas pobladas de Malasia.
  - Impacto económico proyectado: RM 150.000 millones en PIB + 750.000 empleos de alta calificación para 2030 (con 5G como habilitador).
- **Stack tecnológico:** Ericsson Operations Engine, Intent-based Operations, GenAI para gestión de conflictos, Digital Twin.
- **Nivel de confianza:** Alto (validación externa de TM Forum, press release conjunto operador + vendor).
- **Fuente:** Ericsson press release, oct. 2025. https://www.ericsson.com/en/press-releases/2/2025/10/dnb-and-ericsson-secure-tm-forums-world-first-validation-of-level-4-autonomy-for-5g-service-assurance | True Corporation (segunda validación, Tailandia): https://www.ericsson.com/en/press-releases/2/2025/11/true-corporation-achieves-level-4-autonomy-validation-for-5g-service-assurance-with-ericsson-ai-solutions

---

### Caso B2: Amdocs aOS — Agentes autónomos de atención y operaciones en carrier norteamericano

- **Vendor:** Amdocs | **Operador:** carrier tier-1 de Norteamérica (sin nombrar por NDA)
- **Pain point:** Centros de atención saturados con alta tasa de escalación a agentes humanos para consultas de billing y care, con AHT elevado y baja resolución en primer contacto.
- **Solución técnica:** Amdocs aOS (Agentic Operating System) con amAIz Agents desplegados sobre BSS/OSS existente. Los agentes autónomos manejan:
  - Diagnóstico de fallos de servicio.
  - Consultas y disputas de billing.
  - Cambios de plan y provisioning.
  - Escalación automática a humano cuando el agente detecta que no puede resolver.
  Construido sobre NVIDIA DGX Cloud con NIM microservices.
- **Resultados medibles (auto-reporte Amdocs, nov. 2024):**
  - **>90% de accuracy en resolución de casos de billing** en producción a escala de carrier.
  - **>96% de accuracy en interacciones de care** (atención al cliente general).
  - **>60% de reducción en Average Handling Time (AHT)**.
  - **60% de reducción en tokens consumidos** para data preprocessing (reducción de costo operativo de IA).
  - **80% de reducción en latencia** de respuesta, habilitando respuestas near-real-time.
- **Stack tecnológico:** Amdocs aOS, amAIz GenAI platform, NVIDIA DGX Cloud, NIM microservices, RAG telecom-específico.
- **Nivel de confianza:** Bajo-medio (auto-reporte corporativo; métricas no auditadas externamente. Declarado en press release de noviembre 2024).
- **Fuente:** Amdocs press release, nov. 2024. https://www.amdocs.com/news-press/amdocs-unveils-enhanced-generative-ai-capabilities-amaiz-platform-featuring | NVIDIA case study: https://www.nvidia.com/en-us/case-studies/amdocs-builds-generative-ai-agents-for-telecom/

---

### Caso B2b: NTT DOCOMO + StarHub + ServiceNow — Agente autónomo de resolución de roaming inter-carrier

- **Operadores:** NTT DOCOMO (Japón) + StarHub (Singapur) | **Vendor:** ServiceNow
- **Pain point:** Los problemas de conectividad en roaming internacional requieren coordinación manual entre equipos NOC de distintos operadores, con tiempos de resolución de horas o días por procesos manuales y falta de visibilidad cross-carrier.
- **Solución técnica:** Primer modelo operativo inter-carrier de la industria sobre ServiceNow AI Platform. Los agentes autónomos orquestan la detección y resolución de fallos de roaming en tiempo real: identifican qué red está afectada, dónde se originó el problema, y coordinan la remediación automáticamente entre los sistemas OSS/BSS de DOCOMO y StarHub. Los tickets fluyen automáticamente; la recuperación ocurre en tiempo real.
  - Antecedente: DOCOMO usa ServiceNow desde 2021 para Zero-Touch Operation (ZTO), eliminando turnos nocturnos de soporte manual con recuperación automática de fallos.
- **Resultados medibles (ZTO, en producción desde 2021):**
  - Eliminación de turnos nocturnos de soporte (overnight support shifts).
  - "Operaciones que tomaban horas ahora toman minutos" (Rohit Batra, ServiceNow VP).
  - Proyecto inter-carrier DOCOMO+StarHub: validación técnica en curso (lanzamiento comercial esperado H2 2026).
- **Stack tecnológico:** ServiceNow AI Platform, workflows de IA multiagente, integración BSS/OSS de ambos carriers.
- **Nivel de confianza:** Medio (press release conjunto MWC 2026; métricas de ZTO son declaraciones cualitativas; datos cuantitativos del proyecto inter-carrier pendientes de producción).
- **Fuente:** ServiceNow/NTT DOCOMO/StarHub press release, mar. 2026. https://finance.yahoo.com/news/ntt-docomo-starhub-servicenow-keep-060000369.html

---

### Caso B3: Multi-agente para orquestación de slices 5G — benchmark académico (AdaSlicing)

- **Referencia:** Liu, Y., Ding, J., Zhang, Z-L. & Liu, X. (2021, canónico). *CLARA: A Constrained Reinforcement Learning Based Resource Allocation Framework for Network Slicing*. arXiv:2111.08397. | Groen, J. et al. (2023). *TRACTOR: From Classification to Optimization — Slicing and Resource Management with O-RAN*. arXiv:2312.07896. | Racedo, S. et al. (2026). *Asynchronous Multi-Agent RL for 5G Routing under Side Constraints*. arXiv:2602.00035.
- **Pain point:** Los slices de red 5G para distintos tenants (eMBB, URLLC, mMTC) tienen SLAs conflictivos; la orquestación manual no escala y viola SLAs ante picos de demanda imprevistos.
- **Solución técnica:** Agentes de RL (o MARL) que negocian asignación de Physical Resource Blocks (PRB) y potencia entre slices, minimizando violaciones de SLA y OPEX. TRACTOR combina clasificación de tráfico con RL para asignación de PRBs en O-RAN.
- **Resultados medibles:**
  - TRACTOR: mejora de consistencia (reducción de Coefficient of Variation) en asignación de recursos en O-RAN.
  - MARL asíncrono (2026): mejora de escalabilidad y robustez en routing 5G bajo restricciones laterales.
  - Reducción de violaciones de SLA frente a línea base estática en todos los papers citados.
- **Stack tecnológico:** OpenAI Gym / NS-3 para simulación, PPO/CMDP para RL, O-RAN xApps.
- **Nivel de confianza:** Alto (arXiv con revisión de comunidad; TRACTOR 2312.07896 presentado en conferencia).
- **Fuentes:** arXiv:2312.07896 (TRACTOR), arXiv:2111.08397 (CLARA), arXiv:2602.00035 (MARL asíncrono). | Framework LLM+Agentes para O-RAN 6G: arXiv:2503.11933 (2025).

---

### Caso B4: LLM para NetOps — NetEval benchmark (GPT-4 vs. modelos open-source)

- **Referencia:** Miao, Y., Bai, Y., Chen, L. et al. (2023). *An Empirical Study of NetOps Capability of Pre-Trained Large Language Models*. arXiv:2309.05557.
- **Pain point:** Ingenieros de NOC son el cuello de botella para diagnóstico y remediación: no escala con el volumen de alarmas de redes 5G/cloud-native.
- **Solución técnica:** NetEval: benchmark de 5.732 preguntas en 5 subdominios de NetOps (configuración, troubleshooting, protocolos, seguridad, diseño) para evaluar capacidad de LLMs como agentes de NetOps. Evalúa 26 LLMs públicos.
- **Resultados medibles:**
  - Solo **GPT-4 alcanza performance competitivo con humanos** en las tareas evaluadas.
  - LLaMA 2 muestra "potencial significativo" como alternativa open-source.
  - LLMs genéricos como GPT-4 y Claude dan **30-40% de respuestas incorrectas** en preguntas técnicas telecom específicas (hallazgo del GSMA Open Telco LLM Benchmark).
  - **TelecomGPT** (arXiv:2407.09424, 2024) supera a GPT-4, Llama-3 y Mistral en el benchmark Telecom Math Modeling tras fine-tuning con corpus 3GPP/ITU-T.
- **Stack tecnológico:** GPT-4, LLaMA 2, fine-tuning con continual pre-training en specs 3GPP/ITU-T/IETF (TelecomGPT). RAG sobre documentación técnica.
- **Nivel de confianza:** Alto (arXiv:2309.05557 con 2 upvotes y discusión de comunidad; arXiv:2407.09424 con DOI verificable).
- **Fuentes:** arXiv:2309.05557 (NetEval). https://arxiv.org/abs/2309.05557 | arXiv:2407.09424 (TelecomGPT). https://arxiv.org/abs/2407.09424 | GSMA Open Telco LLM Benchmark: https://www.gsma.com/solutions-and-impact/technologies/artificial-intelligence/open-telco-llm-benchmarks/

---

## MODELO 3 — AUGMENTATION
*La IA potencia al humano con contexto, sugerencias y síntesis; el humano toma la decisión final.*

---

### Caso C1: Telefônica Brasil (Vivo) — Copiloto I.Ajuda con Azure OpenAI para 23.000 agentes

- **Operador:** Telefônica Brasil (marca Vivo) | **Vendor:** Microsoft Azure OpenAI Service
- **Pain point:** 23.000 agentes de atención al cliente manejan 5,3 millones de consultas mensuales con AHT elevado por búsqueda manual de información en sistemas dispersos.
- **Solución técnica:** Iniciativa I.Ajuda (2023): plataforma de IA que centraliza el acceso a información relevante para el agente durante la llamada activa. Usa Azure OpenAI Service para síntesis de conocimiento en tiempo real, sugiriendo respuestas y próximos pasos al agente humano. El agente valida y decide; la IA no actúa directamente sobre sistemas de cliente.
- **Resultados medibles:**
  - **9% de reducción en AHT** para clientes individuales (residencial).
  - **4% de reducción en AHT** para clientes business.
  - Escala: **23.000 agentes** usando la plataforma; **5,3 millones de consultas/mes** procesadas.
  - Lanzamiento: 2023.
- **Stack tecnológico:** Microsoft Azure OpenAI Service, integración con BSS/CRM existente de Vivo.
- **Nivel de confianza:** Alto (Microsoft Customer Story con datos específicos; Telefônica Brasil es empresa pública con reporte de resultados).
- **Fuente:** Microsoft Customer Story, 2023. https://www.microsoft.com/en/customers/story/23109-telefonica-brasil-azure-open-ai-service
- **Nota LATAM:** Este es el caso de copiloto de atención al cliente más documentado de la región con métricas verificables. La plataforma Aura de Telefónica (presente en Brasil, España, Argentina, Chile, Ecuador, Colombia, Uruguay) sirve >2 millones de usuarios/mes con >6 millones de conversaciones, aunque sus métricas de reducción de AHT no están publicadas desagregadas por mercado LATAM.

---

### Caso C2: Vodafone SuperTOBi + Microsoft GenAI — Copiloto de atención multicanal

- **Operador:** Vodafone | **Vendor:** Microsoft (Azure OpenAI / GPT-4)
- **Pain point:** TOBi, el agente virtual de Vodafone, tenía capacidad limitada de resolución para journeys críticos de cliente (reclamaciones, cambios de plan, soporte técnico complejo), escalando excesivamente a humanos.
- **Solución técnica:** SuperTOBi: evolución de TOBi con GenAI de Microsoft integrado. En el modo copiloto del call center (Sorrento, Italia), el modelo sugiere en tiempo real la respuesta óptima al agente humano mientras habla con el cliente. En el canal digital, SuperTOBi resuelve autónomamente hasta que no puede y escala. El modo augmentation aplica en contextos de alta complejidad donde el agente humano tiene la autoridad final.
- **Resultados medibles:**
  - **Primera resolución en call center (piloto Sorrento, Italia): del 15% al 60%** (+45 pp) con copiloto GenAI.
  - **70% de resolución en canal digital** en primer contacto.
  - **NPS cerca de 80** para usuarios del canal digital TOBi.
  - **20% de aumento en NPS** tras integración de GenAI en agentes virtuales.
  - **Reducción de ≥1 minuto** en duración promedio de llamadas.
  - Escala: 1 millón de chats/día en 15+ mercados.
  - Inversión declarada en SuperTOBi rollout: £140 millones.
- **Stack tecnológico:** Microsoft Azure OpenAI Service (GPT-4), partnership 10 años Vodafone-Microsoft (USD 1.500 M), integrado en plataforma TOBi existente.
- **Nivel de confianza:** Medio-alto (declaraciones de Vodafone en comunicados públicos y artículos de prensa verificados; piloto de Sorrento reportado en fuentes independientes).
- **Fuentes:** Vodafone/Microsoft partnership announcement. https://www.vodafone.com/news/corporate-and-financial/vodafone-microsoft-sign-10-year-strategic-partnership-generative-ai-digital-services-cloud | LightReading análisis: https://www.lightreading.com/ai-machine-learning/eurobites-vodafone-says-microsoft-s-ai-is-generating-huge-customer-service-benefits | TelcoTitans: https://www.telcotitans.com/vodafonewatch/vodafones-tobi-chatbot-gets-a-generative-ai-makeover-from-microsoft/8124.article

---

### Caso C3: Deutsche Telekom Ask Magenta — Copiloto conversacional para clientes B2C

- **Operador:** Deutsche Telekom (Alemania)
- **Pain point:** Volumen masivo de consultas de clientes (billing, troubleshooting, upgrades) con costo elevado de atención humana y tiempos de espera.
- **Solución técnica:** "Ask Magenta": chatbot conversacional con IA que cubre ~400 temas. Disponible en app, web y WhatsApp. Desde agosto 2024, Deutsche Telekom usa LLMs (GPT-family vía colaboración OpenAI anunciada en dic. 2025) para generar tickets de disrupciones de red automáticamente. El modelo augmentation aplica en el flujo de atención: el agente humano recibe contexto del chat de Ask Magenta antes de tomar la llamada.
- **Resultados medibles:**
  - **NPS > 40** para usuarios de Ask Magenta (métrica publicada en 2023).
  - **>5 millones de diálogos de negocios** procesados en 2023.
  - **~400 millones de interacciones por año** en total (canal digital + chatbot).
  - **~3 millones de usuarios activos por mes**.
  - Deutsche Telekom generó tickets de red con LLMs desde agosto 2024 (primer uso productivo documentado de LLMs en operaciones NOC por un operador europeo tier-1).
- **Stack tecnológico:** NLP propio + integración LLM (OpenAI); plataforma multicanal (app, web, WhatsApp).
- **Nivel de confianza:** Medio (datos de artículos de prensa y blog corporativo; NPS de fuente secundaria confiable).
- **Fuente:** TM Forum Inform, análisis 2023. https://hellodigital.com/article/the-future-of-customer-service-how-ai-redefined-customer-experience-at-telekom | Deutsche Telekom Annual Report 2024. https://report.telekom.com/annual-report-2024/management-report/group-strategy/data-ai.html

---

### Caso C4: TelecomGPT — Copiloto LLM especializado para ingenieros de red

- **Referencia:** Zou, H., Zhao, Q., Tian, Y., Bariah, L., Bader, F., Lestable, T. & Debbah, M. (2024). *TelecomGPT: A Framework to Build Telecom-Specific Large Language Models*. arXiv:2407.09424.
- **Pain point:** Los LLMs generalistas (GPT-4, Llama, Mistral) dan 30-40% de respuestas incorrectas en preguntas técnicas específicas de telecomunicaciones (estándares 3GPP, ITU-T, configuración de red), limitando su uso como copiloto confiable para ingenieros de red o técnicos de campo.
- **Solución técnica:** Pipeline completo para adaptar LLMs de propósito general al dominio telecom mediante: (1) continual pre-training en corpus 3GPP/ITU-T/IETF, (2) instruction tuning con casos de uso telecom, (3) alignment tuning. Evalúa con 3 benchmarks nuevos: Telecom Math Modeling, Telecom Open QnA, Telecom Code Tasks.
- **Resultados medibles:**
  - **Supera GPT-4, Llama-3 y Mistral** en Telecom Math Modeling benchmark (margen significativo).
  - Performance comparable a SOTA en TeleQnA, clasificación de documentos 3GPP, generación de código telecom.
  - Los LLMs genéricos alcanzan solo **60-70% de accuracy** en preguntas técnicas telecom vs. TelecomGPT (reducción del gap 30-40 pp).
- **Stack tecnológico:** Fine-tuning sobre LLaMA/Mistral base; continual pre-training con datasets 3GPP/ITU-T; benchmarks propios publicados con el paper.
- **Nivel de confianza:** Alto (arXiv con DOI verificable, DOI:10.48550/arXiv.2407.09424; publicado Technology Innovation Institute / Khalifa University).
- **Fuente:** arXiv:2407.09424, jul. 2024. https://arxiv.org/abs/2407.09424

---

### Caso C5: NVIDIA + Quantiphi — Copiloto LLM para técnicos de campo (Field Assistant)

- **Vendor:** NVIDIA + Quantiphi | **Sector:** Operadores tier-1 (sin nombrar)
- **Pain point:** Los técnicos de campo dependen de manuales técnicos extensos y escalaciones a NOC para diagnosticar y resolver fallos en sitio; tiempo de resolución elevado y errores humanos frecuentes.
- **Solución técnica:** LLMs personalizados (fine-tuned sobre documentación técnica del operador) que actúan como asistentes virtuales para técnicos en campo. Presentan opciones rankeadas con razonamiento explicable para decisiones de reparación, optimización o upgrade. El técnico valida y ejecuta; la IA no actúa en la red directamente.
- **Resultados medibles:**
  - **40% de reducción en carga de trabajo manual** de técnicos/ingenieros en deployments documentados de AI-in-NOC.
  - Tiempo de resolución de incidencias reducido (MTTR) al eliminar búsqueda manual en manuales.
  - (Datos cualitativos adicionales: WWT case study reportó transformación de operaciones de red con AI, sin cifra puntual publicada de MTTR).
- **Stack tecnológico:** Custom LLMs over NVIDIA infrastructure, RAG sobre documentación técnica propietaria, accesible desde dispositivo móvil en campo.
- **Nivel de confianza:** Bajo-medio (declaraciones de Quantiphi citadas en artículo NVIDIA; sin paper ni case study con cliente nombrado).
- **Fuente:** NVIDIA use case page. https://www.nvidia.com/en-us/use-cases/network-operations-assist/ | WWT case study: https://www.wwt.com/case-study/powering-telecom-network-transformation-with-ai

---

## 5. Análisis comparativo de ROI

| Caso | InteractionModel | Inversión estimada | Tiempo a valor | ROI / Resultado reportado | Madurez | Fuente |
|------|-----------------|-------------------|----------------|--------------------------|---------|--------|
| Vodafone+Ericsson Cell Sleep AI | Automation | Media (software license) | 3-6 meses | -33% consumo diario RU 5G; -70% en deep sleep | Alta (en producción) | Ericsson PR 2025 |
| Far EasTone + Ericsson Cell Sleep AI | Automation | Media (software license) | 3-6 meses | -25% consumo diario RAN (conservador); RAN = 71% factura eléctrica | Alta (en producción) | Ericsson PR abr. 2023 |
| TDC NET + Ericsson PCEM | Automation | Media (Managed Service) | 6-12 meses | -5% energía/GB; 800 MWh ahorrados; 135 t CO2e evitadas (2024) | Alta (Level 4 validado TM Forum) | Ericsson/Converge Digest 2025 |
| Airtel AI Anti-Fraud | Automation | Media (plataforma ML propia) | 6-12 meses | -68,7% pérdidas financieras por fraude; 48B+ llamadas bloqueadas | Alta (en producción masiva) | Airtel PR 2025 |
| Churn prediction ML (research) | Automation | Baja-media (ML stack) | 2-4 meses | 99,28% accuracy en lab; 80-92% esperado en producción | Media (research → producción) | arXiv:2408.16284 |
| NTT DOCOMO + Nokia MantaRay SON | Automation | Alta (plataforma SMO) | 12-18 meses | Energy efficiency + param tuning en producción; closed-loop 5G | Alta (en producción multi-vendor) | Nokia/DOCOMO PR 2024 |
| DNB + Ericsson Level 4 AN | Agency | Alta (Operations Engine, IBO, Digital Twin) | 18-24 meses | Primer TM Forum Level 4 Service Assurance validado mundialmente | Alta (validado) | Ericsson PR oct. 2025 |
| NTT DOCOMO + StarHub + ServiceNow | Agency | Alta (integración BSS/OSS) | 12-18 meses | ZTO: elimina turnos nocturnos soporte; horas → minutos | Media (ZTO en producción; inter-carrier en validación) | ServiceNow PR mar. 2026 |
| Amdocs aOS amAIz Agents | Agency | Alta (plataforma BSS/OSS) | 12-18 meses | >90% billing resolution; >60% AHT reduction (auto-reporte) | Media-alta (PR, no auditado) | Amdocs PR nov. 2024 |
| MARL para slices 5G | Agency | Alta (investigación) | 24-36 meses | Reducción violaciones SLA vs. línea base estática; lab | Baja (research) | arXiv:2312.07896 |
| Telefônica Brasil I.Ajuda (Vivo) | Augmentation | Media (Azure OpenAI) | 3-6 meses | -9% AHT individual; -4% AHT business; 23.000 agentes | Alta (en producción) | Microsoft Customer Story 2023 |
| Vodafone SuperTOBi+Microsoft | Augmentation | Alta (£140M rollout) | 6-12 meses | 15%→60% first resolution; NPS ~80; -1 min/llamada | Alta (en producción) | Vodafone/Microsoft 2024 |
| Deutsche Telekom Ask Magenta | Augmentation | Media | 6-12 meses | NPS >40; 5M diálogos/año; 3M usuarios/mes | Alta (en producción) | DT Annual Report 2024 |
| TelecomGPT fine-tuning | Augmentation | Media (fine-tuning GPU) | 2-4 meses | Supera GPT-4 en telecom math; reduce errores 30-40pp | Media (research con benchmark) | arXiv:2407.09424 |

---

## 6. Riesgos y fracasos documentados

### 6.1 Brecha entre lab y producción en detección de fraude
Los modelos de churn y fraude muestran accuracy >95% en datasets públicos (IBM Telco Dataset) pero en producción los resultados varían significativamente por distribución de datos diferente, concept drift (los defraudadores adaptan comportamiento) y falta de datos etiquetados en tiempo real. El paper arXiv:2509.22654 documenta esta brecha.

### 6.2 Nivel 4 solo en dominios específicos, no red completa
Las validaciones TM Forum Level 4 de DNB y True Corporation aplican únicamente a Throughput Management (un escenario de Service Assurance). El 89% de los operadores aún están en Level 3 o inferior para la mayoría de sus dominios (Omdia survey 2024). Declarar "red autónoma" sin especificar el dominio es misleading.

### 6.3 LLMs genéricos no son confiables para NetOps
El benchmark GSMA Open Telco LLM y NetEval (arXiv:2309.05557) demuestran que GPT-4 y equivalentes generan 30-40% de respuestas técnicas incorrectas en contexto telecom. Desplegar LLMs sin fine-tuning en NOC o soporte a técnicos es un riesgo documentado.

### 6.4 Self-reporting de vendors como riesgo sistémico
Los resultados de Amdocs (>90% billing accuracy, >60% AHT reduction) y NVIDIA/Quantiphi (40% reducción carga manual) provienen exclusivamente de press releases corporativos sin auditoría independiente. No deben usarse como garantía contractual de ROI.

### 6.5 Integración de datos como barrera principal en LATAM
En operadores de LATAM, la fragmentación de OSS/BSS (muchos con sistemas legacy de los años 90-2000) dificulta la recolección de datos de calidad necesaria para modelos de ML/IA. Telefônica Brasil invirtió significativamente en infraestructura de datos (CME, Azure integration) antes de poder desplegar IA efectivamente.

---

## 7. Recomendaciones para desarrollo de app (AI Fluency LATAM)

### Para el widget visual de Automation (indigo)
- **Animación sugerida:** Loop de celdas de red que se "duermen" automáticamente (opacidad baja) en horas nocturnas y "despiertan" (brillo + pulso) cuando sube el tráfico. Mostrar medidor de energía descendiendo en tiempo real.
- **KPI destacado:** "Hasta 33% menos consumo energético — sin acción humana"
- **Caso âncora visible:** Vodafone UK + Ericsson (2025). Dato secundario: Airtel India 48.300 M llamadas spam bloqueadas.
- **Bibliografía sugerida:** Citar Ericsson PR 2025 + arXiv:2408.16284 para churn.

### Para el widget visual de Agency (violet)
- **Animación sugerida:** Diagrama de flujo con 3-4 agentes circulando información (flechas de colores distintos), resolviendo un "intent" que llega en texto natural. Un semáforo central pasa de rojo a verde cuando el agente orquestador aprueba la decisión.
- **KPI destacado:** "Resolución autónoma de extremo a extremo — sin escalación humana"
- **Caso âncora visible:** DNB + Ericsson TM Forum Level 4 (1er en el mundo, oct. 2025). Dato secundario: Amdocs >90% billing resolution.
- **Bibliografía sugerida:** TM Forum Level 4 framework + Ericsson PR oct. 2025.

### Para el widget visual de Augmentation (cyan)
- **Animación sugerida:** Pantalla dividida: lado izquierdo el agente humano en llamada; lado derecho el copiloto IA sugiriendo respuestas en tiempo real con iconos de confianza (%). El humano hace clic en la sugerencia correcta.
- **KPI destacado:** "First-time resolution: de 15% a 60% con copiloto IA"
- **Caso âncora LATAM:** Telefônica Brasil I.Ajuda — 23.000 agentes, -9% AHT. Es el caso más cercano al usuario LATAM.
- **Bibliografía sugerida:** Microsoft Customer Story Telefônica Brasil 2023 + Vodafone SuperTOBi.

### Recomendaciones de producto
1. **Priorizar casos LATAM en la simulación**: el caso Telefônica Brasil (Vivo) es el único con métricas verificadas y nombre conocido en la región. Usarlo como caso âncora en la pantalla de resultados LATAM.
2. **No usar % de accuracy de papers académicos como benchmark de producción**: los 99,28% de churn del paper son en dataset IBM Telco; en producción esperar 80-92%. Declararlo en la bibliografía.
3. **Incluir contexto energético como differentiator LATAM**: el costo de energía es un pain point especialmente relevante para Brasil, Colombia, Chile y México. El ahorro energético de Cell Sleep AI conecta directamente con preocupaciones de CFOs de telecos LATAM.
4. **TM Forum Level 0-5 como marco conceptual**: usar este framework en la UI para contextualizar dónde está el operador "típico LATAM" (Level 2-3) vs. dónde pueden llegar (Level 4).

---

## 8. Quick wins sugeridos (alta ROI, baja complejidad)

1. **Cell Sleep Mode con ML** (Automation): bajo costo de activación si el vendor (Ericsson/Nokia/Huawei) ya tiene el feature disponible en el SW del equipo. ROI positivo en 3-6 meses por reducción de factura eléctrica.
2. **Churn prediction con ensemble ML** (Automation): datasets internos de CDRs son suficientes; modelos como XGBoost + LightGBM son de bajo costo computacional. Quick win para fidelización prepago LATAM.
3. **Copiloto de atención con Azure OpenAI o Bedrock** (Augmentation): integrar LLM sobre base de conocimiento existente del call center. Inversión mediana, ROI documentado en 3-6 meses (caso Vivo). El más reproducible para telecos LATAM.
4. **Detección de spam/IRSF con Isolation Forest + clasificador supervisado** (Automation): datos de CDR ya disponibles; frameworks open-source. Impacto directo en revenue leakage que en LATAM puede ser 1-3% de ingresos.
5. **LLM fine-tuned sobre documentación técnica interna** (Augmentation): usar TelecomGPT approach con QLoRA para crear copiloto de técnicos de campo con docs propias. Inversión: GPU compute para fine-tuning (~USD 2.000-10.000 en cloud) + curación de datos.

---

## 9. Fuentes consultadas

| Fuente | Tipo | Confiabilidad | Link |
|--------|------|---------------|------|
| Ericsson PR — Vodafone UK 5G Energy Trial (mar. 2025) | Press release vendor | Media | https://www.ericsson.com/en/press-releases/3/2025/vodafone-uk-and-ericsson-trial-ai-solutions-for-improved-5g-energy-efficiency |
| Ericsson PR — Far EasTone 25% RAN energy savings (abr. 2023) | Press release vendor | Media | https://www.ericsson.com/en/news/2023/4/ericssons-service-continuity-ai-app-delivers-25-percent-energy-savings-for-far-eastone |
| Converge Digest — TDC NET Ericsson Level 4 Energy (2025) | Artículo periodístico | Media | https://convergedigest.com/ericsson-and-tdc-net-achieve-level-4-autonomy-certification-from-tm-forum/ |
| Nokia — NTT DOCOMO MantaRay SON newsroom (2024) | Press release vendor | Media-alta | https://www.nokia.com/newsroom/nokia-introduces-mantaray-son-to-ntt-docomos-multi-vendor-5g-network/ |
| ServiceNow/NTT DOCOMO/StarHub — Autonomous Roaming (mar. 2026) | Press release conjunto | Media | https://finance.yahoo.com/news/ntt-docomo-starhub-servicenow-keep-060000369.html |
| Ericsson PR — DNB Level 4 Autonomy (oct. 2025) | Press release vendor+operador | Media-alta | https://www.ericsson.com/en/press-releases/2/2025/10/dnb-and-ericsson |
| Ericsson PR — True Corporation Level 4 (nov. 2025) | Press release vendor+operador | Media-alta | https://www.ericsson.com/en/press-releases/2/2025/11/true-corporation |
| Airtel PR — Fraud Detection Solution (may. 2025) | Press release operador | Media | https://www.airtel.in/press-release/05-2025/ |
| Microsoft Customer Story — Telefônica Brasil Azure OpenAI (2023) | Case study verificado | Alta | https://www.microsoft.com/en/customers/story/23109-telefonica-brasil |
| Vodafone/Microsoft Partnership Announcement | Press release conjunto | Media | https://www.vodafone.com/news/corporate-and-financial/ |
| Amdocs Press Release amAIz (nov. 2024) | Press release vendor | Baja-media | https://www.amdocs.com/news-press/amdocs-unveils-enhanced-generative-ai-capabilities-amaiz |
| NVIDIA Case Study — Amdocs | Case study vendor | Baja-media | https://www.nvidia.com/en-us/case-studies/amdocs-builds-generative-ai-agents |
| Telefónica PR — Eficiencia Energética IA (2022-2023) | Press release operador | Media | https://www.telefonica.com/en/communication-room/press-room/telefonica-drives-energy-consumption-optimisation |
| Deutsche Telekom Annual Report 2024 | Reporte corporativo auditado | Alta | https://report.telekom.com/annual-report-2024 |
| TM Forum — Autonomous Networks Mission | Framework estándar industria | Alta | https://www.tmforum.org/missions/autonomous-networks |
| GSMA Open Telco LLM Benchmarks | Benchmark independiente | Alta | https://www.gsma.com/solutions-and-impact/technologies/artificial-intelligence/open-telco-llm-benchmarks/ |
| arXiv:2406.15638 — RCA 5G RAN (Hasan et al., 2024) | Paper arXiv (no peer-reviewed formal) | Alta | https://arxiv.org/abs/2406.15638 |
| arXiv:2408.16284 — Churn Ensemble (Shaikhsurab & Magadum, 2024) | Paper arXiv | Alta | https://arxiv.org/abs/2408.16284 |
| arXiv:2509.22654 — Churn Survey (2025) | Paper arXiv | Alta | https://arxiv.org/abs/2509.22654 |
| arXiv:2309.05557 — NetEval LLM NetOps (Miao et al., 2023) | Paper arXiv | Alta | https://arxiv.org/abs/2309.05557 |
| arXiv:2407.09424 — TelecomGPT (Zou et al., 2024) | Paper arXiv con DOI | Alta | https://arxiv.org/abs/2407.09424 |
| arXiv:2312.07896 — TRACTOR O-RAN (Groen et al., 2023) | Paper arXiv | Alta | https://arxiv.org/abs/2312.07896 |
| arXiv:2510.06063 — TelecomTS Dataset (Feng et al., 2025) | Paper arXiv | Alta | https://arxiv.org/abs/2510.06063 |
| arXiv:2503.11933 — LLM+Agentes 6G O-RAN (Tang et al., 2025) | Paper arXiv | Alta | https://arxiv.org/abs/2503.11933 |
| Bain & TM Forum Survey — AN Maturity (2024) | Survey independiente | Alta | https://www.bain.com/insights/accelerating-autonomous-networks-a-reality-check-for-telcos/ |
| Analysys Mason — AI Energy Reduction (nov. 2022) | Reporte consultora | Alta | https://www.analysysmason.com/contentassets/67a822de98c04de6a83bea9c974509bc/analysys_mason_ai_energy_reduction_nov2022_rma07.pdf |

---

## 10. Citas listas para bibliografía

Hasan, A., Boeira, C., Papry, K., Ju, Y., Zhu, Z. & Haque, I. (2024). Root Cause Analysis of Anomalies in 5G RAN Using Graph Neural Network and Transformer. arXiv. https://arxiv.org/abs/2406.15638

Shaikhsurab, M.A. & Magadum, P. (2024). Enhancing Customer Churn Prediction in Telecommunications: An Adaptive Ensemble Learning Approach. arXiv. https://arxiv.org/abs/2408.16284

Miao, Y., Bai, Y., Chen, L. et al. (2023). An Empirical Study of NetOps Capability of Pre-Trained Large Language Models. arXiv. https://arxiv.org/abs/2309.05557

Zou, H., Zhao, Q., Tian, Y., Bariah, L., Bader, F., Lestable, T. & Debbah, M. (2024). TelecomGPT: A Framework to Build Telecom-Specific Large Language Models. arXiv. DOI:10.48550/arXiv.2407.09424

Groen, J., Yang, Z., Muruganandham, D., Belgiovine, M., Ying, L. & Chowdhury, K. (2023). From Classification to Optimization: Slicing and Resource Management with TRACTOR. arXiv. https://arxiv.org/abs/2312.07896

Feng, A., Varvarigos, A., Panitsas, I. et al. (2025). TelecomTS: A Multi-Modal Observability Dataset for Time Series and Language Analysis. arXiv. https://arxiv.org/abs/2510.06063

Ericsson. (2025, octubre). DNB and Ericsson secure TM Forum's world-first validation of Level 4 Autonomy for 5G Service Assurance. Ericsson Press Release. https://www.ericsson.com/en/press-releases/2/2025/10/dnb-and-ericsson-secure-tm-forums-world-first-validation-of-level-4-autonomy-for-5g-service-assurance

Ericsson. (2025, marzo). Vodafone UK and Ericsson trial AI solutions for improved 5G energy efficiency. Ericsson Press Release. https://www.ericsson.com/en/press-releases/3/2025/vodafone-uk-and-ericsson-trial-ai-solutions-for-improved-5g-energy-efficiency

Ericsson. (2023, abril). Ericsson's Service Continuity AI app delivers 25 percent energy savings for Far EasTone. Ericsson Press Release. https://www.ericsson.com/en/news/2023/4/ericssons-service-continuity-ai-app-delivers-25-percent-energy-savings-for-far-eastone

Nokia. (2024). Nokia introduces MantaRay SON to NTT DOCOMO's multi-vendor 5G network. Nokia Newsroom. https://www.nokia.com/newsroom/nokia-introduces-mantaray-son-to-ntt-docomos-multi-vendor-5g-network/

ServiceNow, NTT DOCOMO & StarHub. (2026, marzo). NTT DOCOMO, StarHub, and ServiceNow keep travelers connected with autonomous roaming resolution using ServiceNow CRM. Press Release. https://finance.yahoo.com/news/ntt-docomo-starhub-servicenow-keep-060000369.html

Microsoft. (2023). Telefônica Brasil enhances its AI-powered call center assistant with Azure. Microsoft Customer Stories. https://www.microsoft.com/en/customers/story/23109-telefonica-brasil-azure-open-ai-service

---

## 11. Preguntas abiertas para próxima iteración

1. **Métricas de MTTR en producción**: ningún operador ha publicado datos auditados de reducción de MTTR atribuibles exclusivamente a IA. ¿Hay datos en reportes regulatorios (FCC, ANATEL, CRC)?
2. **Casos LATAM de automation en fraud**: Telefónica/Movistar LATAM, Claro/América Móvil y TIM Brasil tienen sistemas de gestión de fraude pero no publican métricas específicas. ¿Existen reportes internos en congresos como AHCIET o LACNIC?
3. **Adopción de Open RAN en LATAM**: ¿cuál es el estado real de adopción de O-RAN en la región? Esto determina la aplicabilidad de casos como TRACTOR y AdaSlicing.
4. **ROI de TelecomGPT en producción**: el paper es de 2024 (research); ¿hay algún operador que lo haya desplegado y publicado resultados de producción?
5. **Energía + carbono en LATAM regulatorio**: ¿los reguladores de Brasil, México, Colombia o Chile están empezando a requerir reportes de eficiencia energética de redes? Esto cambia el driver de adopción de Automation de "OPEX" a "compliance".
