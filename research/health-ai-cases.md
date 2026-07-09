# Investigación: Casos de IA en Salud / Healthcare

> **Fecha:** 2026-06-14
> **Alcance:** Global con énfasis en sistemas anglosajones (EE.UU., UK) y LATAM donde hay evidencia / Horizonte 2016-2025, con énfasis en post-2022 (era LLMs clínicos)
> **Supuestos:** Se priorizan papers con DOI/PubMed/arXiv verificable. Cuando el resultado proviene de comunicado de empresa o reporte no peer-reviewed, se marca explícitamente como **[auto-reporte vendor]** o **[fuente empresarial]**. Los datos de ROI auto-reportados se señalan con ese calificador. El documento está organizado por los tres InteractionModels del sistema AI Fluency LATAM.

---

## 1. AUTOMATION — IA decide y actúa de extremo a extremo (con supervisión regulatoria, sin decisión humana por caso)

Casos donde la IA clasifica, detecta o ejecuta acciones de alto volumen sin intervención humana en cada instancia individual. El médico diseña el protocolo y audita el sistema, pero no interviene caso a caso en el flujo operativo.

---

### Caso 1.1 — Google/Verily: Detección automática de retinopatía diabética (estudio canónico, The Lancet)

- **Organización:** Google Brain / Verily Life Sciences + Aravind Eye Hospital, India
- **Pain point:** La retinopatía diabética causa el 5% de la ceguera global; el screening manual requiere oftalmólogos escasos en países de bajos recursos.
- **Solución técnica:** Red neuronal convolucional profunda entrenada sobre 128,175 imágenes de fondo de retina anotadas por 54 oftalmólogos certificados del board (EyePACS-1 + Messidor-2). El sistema genera un score de "referable DR" de forma autónoma.
- **Resultados cuantificados (paper peer-reviewed):**
  - AUC de 0.991 en EyePACS-1 y 0.990 en Messidor-2 para retinopatía referable
  - Sensibilidad de 90.3% / Especificidad de 98.1% (EyePACS-1) — superando el percentil 50 de los oftalmólogos del panel
  - Aprobado como dispositivo de diagnóstico autónomo (IDx-DR, FDA De Novo 2018)
- **Stack/Tecnología:** Inception-v3 CNN, TensorFlow, imágenes de retinografía de campo amplio
- **Fuente:** Gulshan, V., Peng, L., Coram, M., et al. (2016). Development and Validation of a Deep Learning Algorithm for Detection of Diabetic Retinopathy in Retinal Fundus Photographs. *JAMA*, 316(22), 2402–2410. PubMed ID: 27898976. DOI: 10.1001/jama.2016.17216
- **Nota:** Este es el estudio fundacional del campo. El despliegue real en clínicas rurales de India (Aravind) fue validado en un estudio prospectivo publicado en *The Lancet Digital Health* (Rajalakshmi et al., 2018).
- **Cita corta:** Gulshan et al. (2016). Development and Validation of a Deep Learning Algorithm for Detection of Diabetic Retinopathy. *JAMA*, 316(22), 2402–2410. DOI: 10.1001/jama.2016.17216

---

### Caso 1.2 — Stanford / CheXNet: Detección de neumonía en radiografía de tórax al nivel del radiólogo

- **Organización:** Stanford ML Group (Rajpurkar, Irvin, Ng et al.)
- **Pain point:** La neumonía mata ~4 millones de personas/año; el diagnóstico radiológico requiere radiólogos que escasean en entornos de urgencias y países en desarrollo.
- **Solución técnica:** DenseNet-121 de 121 capas entrenado sobre ChestX-ray14 (112,120 radiografías frontales con 14 etiquetas de enfermedad, NIH). El modelo produce una probabilidad de neumonía por imagen de forma autónoma.
- **Resultados cuantificados (paper peer-reviewed):**
  - F1-score de neumonía: 0.435 (CI 95%: 0.387–0.481) vs. promedio de 4 radiólogos: 0.387 (CI: 0.330–0.442)
  - El modelo superó estadísticamente a 3 de los 4 radiólogos evaluados en el dataset de test
- **Stack/Tecnología:** DenseNet-121 (PyTorch/Torch), ChestX-ray14 dataset (NIH)
- **Fuente:** Rajpurkar, P., Irvin, J., Ball, R. L., et al. (2017). CheXNet: Radiologist-Level Pneumonia Detection on Chest X-Rays with Deep Learning. *arXiv:1711.05225*. https://arxiv.org/abs/1711.05225
- **Nota de alcance:** Estudio seminal. Modelos derivados como Lunit INSIGHT CXR fueron validados en entornos reales con AUC 0.94, sensibilidad 90%, especificidad 89% en evaluación multicéntrica (RSNA 2023, fuente: Lunit).
- **Caso LATAM adjunto:** Hospital Albert Einstein (Brasil) firmó acuerdo de licencia con Lunit para despliegue de análisis automático de CXR. [fuente empresarial]
- **Cita corta:** Rajpurkar et al. (2017). CheXNet: Radiologist-Level Pneumonia Detection on Chest X-Rays with Deep Learning. *arXiv:1711.05225*. https://arxiv.org/abs/1711.05225

---

### Caso 1.3 — Mayo Clinic: Detección de fibrilación auricular subclínica con ECG y IA (The Lancet)

- **Organización:** Mayo Clinic, Rochester, MN
- **Pain point:** La FA paroxística no genera síntomas ni se detecta en ECG de sinus normal estándar, pero es la causa más prevenible de ACV. El screening masivo es inviable con lectura humana.
- **Solución técnica:** Red neuronal convolucional entrenada con ~450,000 ECGs del repositorio de Mayo Clinic. El modelo identifica la firma electrocardiográfica de FA incluso cuando el corazón está en ritmo sinusal al momento de la captura.
- **Resultados cuantificados (paper peer-reviewed):**
  - AUC 0.87 para un solo ECG; sube a AUC 0.90 combinando múltiples ECGs del mismo paciente
  - Precisión del 79% (ECG único) y 83% (múltiples) en cohorte de 36,280 pacientes
  - Dataset de validación: 3,051 pacientes con FA previamente diagnosticada entre 36,280 con ECG en ritmo sinusal
- **Stack/Tecnología:** CNN propietaria, integrada en flujo de ECG del EMR de Mayo Clinic
- **Fuente:** Attia, Z. I., Noseworthy, P. A., Lopez-Jimenez, F., et al. (2019). An artificial intelligence-enabled ECG algorithm for the identification of patients with atrial fibrillation during sinus rhythm. *The Lancet*, 394(10201), 861–867. PubMed ID: 31378392. DOI: 10.1016/S0140-6736(19)31721-0
- **Nota post-2022:** Un seguimiento publicado en *Mayo Clinic Proceedings* (2024) extendió el modelo a predicción de FA oculta en pacientes post-ACV sometidos a monitoreo cardíaco prolongado, con resultados superiores al modelo CHADS₂-VASc estándar.
- **Cita corta:** Attia et al. (2019). AI-enabled ECG algorithm for identification of patients with AF during sinus rhythm. *The Lancet*, 394(10201), 861–867. DOI: 10.1016/S0140-6736(19)31721-0

---

### Caso 1.4 — DeepMind / Google Health: Detección automática de cáncer de mama en mamografía (Nature)

- **Organización:** Google DeepMind + Cancer Research UK Imperial Centre + Northwestern University + Royal Surrey County Hospital
- **Pain point:** La doble lectura de mamografías consume recursos radiológicos escasos; los falsos negativos y falsos positivos generan tanto subdetección como sobre-diagnóstico.
- **Solución técnica:** Sistema de deep learning entrenado con más de 76,000 mamografías (UK + EE.UU.) y validado en +25,000 casos con confirmación histológica. Opera como primer lector autónomo, priorizando casos para revisión humana.
- **Resultados cuantificados (paper peer-reviewed):**
  - Reducción de falsos positivos: 5.7% (UK) / 1.2% (EE.UU.)
  - Reducción de falsos negativos: 9.4% (UK) / 2.7% (EE.UU.)
  - AUC: 0.895 (UK) y 0.739 (EE.UU.), con performance superior al radiólogo promedio en UK
- **Stack/Tecnología:** Deep learning propietario (no divulgado en detalle), pipeline de imágenes DICOM
- **Fuente:** McKinney, S. M., Sieniek, M., Godbole, V., et al. (2020). International evaluation of an AI system for breast cancer screening. *Nature*, 577, 89–94. DOI: 10.1038/s41586-019-1799-6
- **Nota:** Los resultados de EE.UU. son más modestos que los de UK, lo que refleja diferencias en protocolo de lectura (doble vs. simple). Los autores señalan la importancia de la diversidad poblacional en el training data.
- **Cita corta:** McKinney et al. (2020). International evaluation of an AI system for breast cancer screening. *Nature*, 577, 89–94. DOI: 10.1038/s41586-019-1799-6

---

### Caso 1.5 — NLP para codificación automática ICD-10/CPT en notas clínicas (JMIR 2024)

- **Organización:** Estudio multicéntrico real hospitalario (publicado en JMIR Medical Informatics, 2024)
- **Pain point:** La codificación manual de diagnósticos y procedimientos (ICD-10-CM, CPT) consume entre 10-15 minutos por alta hospitalaria; los errores de codificación cuestan a hospitales >$3,200 USD promedio por caso erróneo [estimación de la American Health Information Management Association].
- **Solución técnica:** Sistema basado en GPT-2 fine-tuned sobre notas clínicas reales de un hospital chino (aprox. 40,000 episodios) para asignación automática de categorías ICD-10-CM por Grupos Relacionados de Diagnóstico (DRG). El sistema opera sobre texto clínico no estructurado.
- **Resultados cuantificados (paper peer-reviewed):**
  - Cohen κ de ~0.714 para las Major Diagnostic Categories (MDC) principales
  - κ promedio de ~0.869 across 6 categorías MDC evaluadas
  - Tiempo de procesamiento en tiempo real por alta
- **Stack/Tecnología:** GPT-2 fine-tuned, NLP, integración EHR
- **Fuente:** Evaluating a Natural Language Processing–Driven, AI-Assisted ICD-10-CM Coding System in a Real Hospital Environment. *JMIR Medical Informatics*, 2024. PMC: PMC11452756. DOI: 10.2196/58278
- **Contexto adicional:** Vendors como Nuance (Microsoft), 3M y Amazon Comprehend Medical ofrecen sistemas similares. Resultados auto-reportados por el sector estiman mejoras del 40-60% en productividad de codificadores, pero sin datos peer-reviewed independientes disponibles a este nivel de detalle. [auto-reporte vendor]
- **Cita corta:** (2024). Evaluating a NLP-Driven AI-Assisted ICD-10-CM Coding System in a Real Hospital Environment. *JMIR Medical Informatics*. DOI: 10.2196/58278

---

## 2. AGENCY — Sistemas multi-agente o agentes autónomos que orquestan flujos clínicos/administrativos complejos

Casos donde uno o varios agentes de IA orquestan decisiones complejas, coordinan actores (seguros, farmacias, pacientes, clínicos) y ejecutan flujos end-to-end con mínima supervisión humana por caso individual.

---

### Caso 2.1 — Google AMIE: Agente conversacional para historia clínica pre-consulta (Nature 2025)

- **Organización:** Google Research + colaboradores clínicos externos
- **Pain point:** La toma de historia clínica consume 20-30% del tiempo de la consulta médica; el acceso limitado a médicos en zonas con escasez de profesionales impide una anamnesis completa previa a la consulta.
- **Solución técnica:** AMIE (Articulate Medical Intelligence Explorer): LLM fine-tuned con diálogos médico-paciente y retroalimentación de especialistas, capaz de conducir una historia clínica completa via texto antes de la cita. Opera de forma autónoma durante todo el flujo conversacional.
- **Resultados cuantificados (paper peer-reviewed, doble ciego con actores de paciente):**
  - Los diagnósticos diferenciales de AMIE fueron calificados como más precisos, completos y apropiados que los de médicos generalistas por evaluadores especialistas (estudio cruzado randomizado doble ciego)
  - AMIE también recibió puntuaciones superiores en empatía, toma de decisiones compartida y mantenimiento del bienestar del paciente
  - Diseño: actores de paciente validados tipo OSCE; médicos evaluados vs. AMIE en escenarios de texto equivalentes
- **Stack/Tecnología:** LLM propietario (basado en PaLM 2/Gemini), fine-tuning con datos clínicos curados
- **Fuente:** Tu, T., Palepu, A., Schaekermann, M., et al. (2025). Towards conversational diagnostic artificial intelligence. *Nature*, 637, 587–594. DOI: 10.1038/s41586-025-08866-7. PMC: PMC12158756
- **Limitaciones reconocidas por los autores:** La interfaz de texto fue desventajosa para los médicos; los escenarios cubrieron un rango limitado de condiciones; se necesita validación prospectiva antes de despliegue real.
- **Nota 2026:** Un estudio de factibilidad clínica prospectivo (arXiv:2603.08448) evaluó AMIE con 100 pacientes reales en clínica ambulatoria: alta satisfacción post-interacción (p < 0.001) y actitudes positivas hacia la IA mejoraron significativamente.
- **Cita corta:** Tu et al. (2025). Towards conversational diagnostic artificial intelligence. *Nature*, 637, 587–594. DOI: 10.1038/s41586-025-08866-7

---

### Caso 2.2 — Agentes de IA en autorización previa (prior authorization): eficiencia y controversia

- **Organizaciones:** Cohere Health, Olive AI, UnitedHealth Group, Cigna (EE.UU.)
- **Pain point:** El proceso manual de prior authorization consume 14.6 horas semanales por médico de práctica (AMA, 2023); el 94% de los médicos reporta retrasos en cuidado por este proceso. Entre 2019 y 2024 el gasto en personal de PA creció 43%.
- **Solución técnica:** Agentes de IA que leen documentación clínica del EMR, cruzan con criterios de cobertura del asegurador, generan cartas de PA automáticamente y priorizan casos para revisión humana. McKinsey estima que la automatización puede cubrir 50-75% de las tareas manuales del proceso.
- **Resultados cuantificados:**
  - 84% de las grandes aseguradoras en EE.UU. ya usan IA para algún propósito operacional (NAIC, encuesta de 93 aseguradoras en 16 estados, 2024)
  - 37% usa IA para PA específicamente; 44% para adjudicación de claims; 56% para utilization management
  - [auto-reporte vendor] Cohere Health reporta aprobaciones en tiempo real vs. horas/días con el proceso manual
- **Riesgo documentado:** Un reporte del Senado de EE.UU. (2024) documentó tasas de negación de cobertura hasta 16 veces más altas con sistemas automatizados en UnitedHealthcare. La AMA reporta que el 83% de los médicos que trabajan con UHC/Cigna no vio reducción en requerimientos de PA pese a cambios declarados en 2023. Demandas judiciales en curso (2024-2025).
- **Fuente peer-reviewed:** The AI Arms Race In Health Insurance Utilization Review. *Health Affairs*, 2025. DOI: 10.1377/hlthaff.2025.00897. Adicionalmente: AI-Generated Prior Authorization Letters. *arXiv:2603.29366* (2026).
- **Fuente regulatoria:** AMA Prior Authorization Survey 2023; Senate Finance Committee Report on AI in Insurance, 2024.
- **Cita corta:** (2025). The AI Arms Race in Health Insurance Utilization Review. *Health Affairs*. DOI: 10.1377/hlthaff.2025.00897

---

### Caso 2.3 — Sistemas multi-agente para coordinación de cuidado crónico (Nature Biomedical Engineering 2025)

- **Contexto:** Revisión sistemática y marco conceptual publicado en Nature Biomedical Engineering (2025)
- **Pain point:** Los pacientes con multimorbilidad (2+ condiciones crónicas) generan costos desproporcionados por falta de coordinación entre especialistas, farmacéuticos y cuidadores; el 5% de pacientes genera el 50% del gasto en salud.
- **Solución técnica:** MASH (Multi-Agent Systems for Healthcare): redes de agentes especializados que ejecutan monitoreo remoto, triaje de síntomas, agendamiento, recordatorios de medicación, coaching de adherencia y alerta a clínicos, con memoria de interacciones previas por paciente.
- **Resultados cuantificados (revisión de literatura):**
  - Los sistemas multi-agente mejoran la personalización de planes de tratamiento y la asignación de recursos
  - Reducción de reingresos hospitalarios en modelos piloto con coordinación AI-asistida para pacientes con IC y EPOC (rango reportado en estudios incluidos: 15-30% reducción, con heterogeneidad alta entre estudios)
  - Nota: la evidencia de RCTs para MASH puro es todavía limitada (2025); la mayoría de evidencia proviene de estudios observacionales y pilotos.
- **Stack/Tecnología:** LLMs + herramientas externas (EMR APIs, calendarios, sistemas de farmacia), arquitecturas de agentes (LangGraph, AutoGen y similares en implementaciones experimentales)
- **Fuente:** Coordinated AI agents for advancing healthcare. *Nature Biomedical Engineering*, 2025. DOI: 10.1038/s41551-025-01363-2. Adicionalmente: Multiagent AI Systems in Health Care. *PMC: PMC12360800* (2025).
- **Cita corta:** (2025). Coordinated AI agents for advancing healthcare. *Nature Biomedical Engineering*. DOI: 10.1038/s41551-025-01363-2

---

### Caso 2.4 — AlphaFold (DeepMind): Agente de predicción estructural que transforma el descubrimiento de fármacos

- **Organización:** Google DeepMind + EMBL-EBI
- **Pain point:** Determinar la estructura 3D de una proteína experimentalmente tarda años y cuesta millones de dólares; sin estructura, el diseño racional de fármacos es casi imposible.
- **Solución técnica:** AlphaFold 2 (2021) predice la estructura de proteínas a partir de secuencia con precisión atómica. En 2022 se publicó la AlphaFold Protein Structure Database con >200 millones de estructuras predichas (casi todo el proteoma conocido). AlphaFold 3 (2024) extiende el modelo a interacciones proteína-ligando, habilitando drug docking computacional.
- **Resultados cuantificados (peer-reviewed + evaluación independiente):**
  - Ganó CASP14 (2020) con una mejora del doble sobre el segundo lugar en precisión estructural
  - Investigadores que usan AlphaFold 2 incrementan sus envíos de nuevas estructuras proteicas experimentales en >40% (análisis independiente citado en *Nature*, 2024)
  - +1 millón de investigadores en más de 190 países han usado la base de datos (Google DeepMind, 2024)
  - Premio Nobel de Química 2024 otorgado a David Baker, Demis Hassabis y John Jumper
  - Isomorphic Labs (spinoff de DeepMind, 2021) aplica AlphaFold 3 a drug discovery; acuerdos con Eli Lilly y Novartis anunciados en 2024
- **Stack/Tecnología:** Transformer con atención múltiple (Evoformer), entrenado sobre la Protein Data Bank (PDB); TensorFlow/JAX
- **Fuente:** Jumper, J., Evans, R., Pritzel, A., et al. (2021). Highly accurate protein structure prediction with AlphaFold. *Nature*, 596, 583–589. DOI: 10.1038/s41586-021-03819-2. AlphaFold 3: Abramson, J., et al. (2024). *Nature*, 630, 493–500. DOI: 10.1038/s41586-024-07487-w
- **Cita corta:** Jumper et al. (2021). Highly accurate protein structure prediction with AlphaFold. *Nature*, 596, 583–589. DOI: 10.1038/s41586-021-03819-2

---

## 3. AUGMENTATION — Copiloto que potencia al clínico; el humano decide

Casos donde la IA asiste al profesional de salud con información, análisis o redacción, pero la decisión final es humana. El clínico retiene la autoridad diagnóstica o terapéutica.

---

### Caso 3.1 — Microsoft Nuance DAX / Dragon Copilot: Documentación clínica ambiental (NEJM AI 2025)

- **Organización:** Microsoft / Nuance + UCLA Health (estudio independiente)
- **Pain point:** Los médicos dedican 1-2 horas extra/día a documentación en el EMR después de la consulta ("pajama time"); el burnout médico afecta al 50% de los profesionales en EE.UU., y la documentación es el factor #1 citado.
- **Solución técnica:** DAX Copilot (Dragon Ambient eXperience) escucha la conversación médico-paciente y genera automáticamente una nota clínica estructurada en el EMR. El médico la revisa, edita y firma. Integrado nativamente con Epic y otras plataformas.
- **Resultados cuantificados:**

  **Encuesta interna Nuance (miles de clínicos, 2023) [auto-reporte vendor]:**
  - 70% reportó reducción de burnout/fatiga
  - 50% reportó reducción del tiempo de documentación
  - 7 minutos ahorrados por encuentro; 5 citas adicionales por día de clínica

  **Ensayo aleatorizado independiente (NEJM AI, 2025 — peer-reviewed):**
  - Diseño: 238 médicos de 14 especialidades, UCLA Health; randomización 1:1:1 entre DAX, Nabla y control; Nov 2024 – Ene 2025
  - Nabla: −9.5% tiempo en nota vs. control (estadísticamente significativo)
  - DAX: −1.7% tiempo en nota vs. control (NO estadísticamente significativo)
  - Ambos grupos: mejora modesta en burnout (Mini-Z 2.0), carga de tareas y agotamiento laboral
  - Conclusión de los autores: el impacto sobre productividad es real pero más modesto que los datos auto-reportados del vendor

- **Stack/Tecnología:** LLM propietario + ASR (reconocimiento de voz), integración API con Epic/Cerner/Oracle Health
- **Fuente (peer-reviewed):** Lukac, P. J., et al. (2025). Ambient AI Scribes in Clinical Practice: A Randomized Trial. *NEJM AI*. DOI: 10.1056/AIoa2501000. PubMed ID: 40672471
- **Cita corta:** Lukac et al. (2025). Ambient AI Scribes in Clinical Practice: A Randomized Trial. *NEJM AI*. DOI: 10.1056/AIoa2501000

---

### Caso 3.2 — Aidoc: Copiloto de triage radiológico para emergencias (PE, ICH — estudios peer-reviewed)

- **Organización:** Aidoc Medical Ltd. + University Hospital of Basel + múltiples centros
- **Pain point:** El embolismo pulmonar (PE) y la hemorragia intracraneal (ICH) son emergencias tiempo-dependientes; el tiempo desde adquisición hasta lectura del radiólogo puede superar 1 hora en guardia nocturna o de fin de semana.
- **Solución técnica:** Sistema FDA-cleared de IA que analiza CTs en tiempo real y prioriza automáticamente los casos positivos en la worklist del radiólogo, notificando al equipo clínico. El radiólogo confirma o descarta; la IA no emite diagnóstico final.
- **Resultados cuantificados (peer-reviewed):**
  - **PE detection (Basel):** Sensibilidad 93%, especificidad 95% en CTPAs (CT Pulmonary Angiography)
  - **TAT reduction (estudio retrospectivo 11,252 CTPAs):** Tiempo de reporte durante horas laborables: de 68.9 min a 46.7 min (reducción de 22.2 min; p=0.004)
  - **Hospital LOS (ICH + PE):** Estudio en PMC (2022) documentó reducción estadísticamente significativa de estancia hospitalaria tras implementación del sistema
  - **Estudio FDA pivotal (11 indicaciones):** Sensibilidad media 97%, especificidad media 98%
- **Stack/Tecnología:** Deep learning propietario, integración PACS, worklist prioritization, notificaciones push al clínico
- **Fuente:** Decreased Hospital Length of Stay for ICH and PE after Adoption of an AI-Augmented Radiological Worklist Triage System. PMC: PMC9411003 (2022). DOI disponible en PubMed Central.
- **Nota regulatoria:** Aidoc recibió clearance de FDA para 11 indicaciones (stroke, PE, ICH, aorta, entre otras). En 2024 obtuvo aprobación para un modelo de foundation comprehensivo para CT abdominal.
- **Cita corta:** (2022). Decreased Hospital Length of Stay for ICH and PE after Adoption of AI-Augmented Radiological Worklist Triage System. PMC9411003. https://www.ncbi.nlm.nih.gov/pmc/articles/PMC9411003/

---

### Caso 3.3 — Med-PaLM 2 / Google: Copiloto de preguntas clínicas a nivel experto (arXiv 2023, Nature Medicine 2024)

- **Organización:** Google Research / Google Health
- **Pain point:** Los médicos necesitan acceso rápido a evidencia médica actualizada; los chatbots generales (GPT-3, etc.) cometen errores clínicos que pueden ser peligrosos.
- **Solución técnica:** Med-PaLM 2: LLM médico especializado mediante instruction tuning y ensemble refinement sobre PaLM 2. Responde preguntas tipo USMLE, preguntas de consumidores de salud y escenarios clínicos complejos "adversariales".
- **Resultados cuantificados (peer-reviewed):**
  - 86.5% en MedQA (USMLE-style) — primer modelo en alcanzar nivel "expert" en este benchmark
  - Mejora de 19+ puntos porcentuales sobre Med-PaLM 1
  - En evaluación por médicos de 1,066 preguntas de consumidores de salud: Med-PaLM 2 preferido sobre respuestas de médicos humanos en 8 de 9 ejes de utilidad clínica (p < 0.001)
  - Publicación en *Nature Medicine* (2024) confirmó que Med-PaLM 2 alcanza performance a nivel de médicos expertos en respuestas largas
- **Stack/Tecnología:** PaLM 2 + instruction tuning con datos médicos curados + ensemble refinement
- **Fuente:** Singhal, K., Tu, T., Gottweis, J., et al. (2023). Towards Expert-Level Medical Question Answering with Large Language Models. *arXiv:2305.09617*. DOI definitivo en *Nature Medicine* (2024): 10.1038/s41591-024-03423-7
- **Cita corta:** Singhal et al. (2023/2024). Towards Expert-Level Medical Question Answering with Large Language Models. *Nature Medicine*. DOI: 10.1038/s41591-024-03423-7

---

### Caso 3.4 — OpenEvidence: Copiloto de decisión clínica basado en literatura médica (PMC 2025)

- **Organización:** OpenEvidence Inc. + Mayo Clinic (estudio independiente)
- **Pain point:** Los médicos en punto de cuidado no tienen tiempo para consultar literatura primaria; las guías clínicas quedan obsoletas antes de ser actualizadas.
- **Solución técnica:** Motor de búsqueda médico basado en IA que genera respuestas fundamentadas en evidencia (con referencias verificables) a preguntas clínicas, usable en consulta en segundos. En 2025 incorporó "Deep Consult" para análisis más profundos con mayor número de referencias.
- **Resultados cuantificados:**
  - Más de 200 millones de consultas clínicas atendidas a médicos verificados de EE.UU. (dato de adopción, mayo 2025) [fuente empresarial]
  - Estudio Mayo Clinic (SAGE Open Medicine, 2025): OpenEvidence evaluada sobre 5 casos clínicos de enfermedades crónicas comunes; los autores reportan que el sistema genera recomendaciones apropiadas alineadas con guías clínicas en la mayoría de los casos, con identificación de brechas en escenarios complejos
  - 100% en preguntas tipo USMLE multiple-choice (datos internos) [auto-reporte]
  - Estudio piloto de compleja especialidad médica (medRxiv, 2025): desempeño variable en escenarios de alta complejidad fuera de los patrones comunes de entrenamiento
- **Stack/Tecnología:** LLM + RAG (Retrieval-Augmented Generation) sobre corpus de literatura médica indexada; citas con DOI verificable por respuesta
- **Fuente:** Hurt, R. T., Stephenson, C. R., et al. (2025). The Use of an Artificial Intelligence Platform OpenEvidence to Augment Clinical Decision-Making for Primary Care Physicians. *Journal of Primary Care & Community Health* (SAGE). DOI: 10.1177/21501319251332215. PMC: PMC12033599
- **Cita corta:** Hurt et al. (2025). Use of OpenEvidence to Augment Clinical Decision-Making for Primary Care Physicians. *J Primary Care Community Health*. DOI: 10.1177/21501319251332215

---

### Caso 3.5 — Epic Sepsis Model: Copiloto de detección temprana de deterioro — caso canónico de fracaso y debate

- **Organización:** Epic Systems + University of Michigan Medical Center
- **Pain point:** La sepsis causa 270,000 muertes/año en EE.UU.; la detección temprana mejora la supervivencia. El Epic Sepsis Model (ESM) fue adoptado por cientos de hospitales con Epic EMR.
- **Solución técnica:** Score predictivo integrado en Epic EHR que alerta a enfermeras y médicos cuando un paciente hospitalizado supera cierto umbral de riesgo de sepsis. No toma decisiones autónomas; es un semáforo de alerta para el clínico.
- **Resultados cuantificados (peer-reviewed — evaluación externa independiente):**
  - AUC del ESM en validación externa: 0.63 (CI: 0.62-0.64) vs. AUC reportada por Epic: 0.76-0.83
  - El ESM no identificó 2 de cada 3 pacientes con sepsis (missed rate ~67%)
  - Generó alertas para 6,971 pacientes sobre 38,455 hospitalizados, mientras que 1,709 casos de sepsis no recibieron alerta
  - Durante COVID-19: las alertas diarias aumentaron 43% mientras el censo hospitalario bajó 35% (JAMA Network Open, 2022)
  - La Universidad de Michigan pausó las alertas ESM en abril 2020 por fatiga de alertas
- **Respuesta de Epic:** Epic disputó la metodología, argumentando que el modelo requiere calibración local antes del despliegue; acusó a los investigadores de usar una configuración subóptima.
- **Stack/Tecnología:** Regresión logística sobre variables del EMR (vitales, labs, edad, comorbilidades)
- **Fuente (peer-reviewed):** Wong, A., Otles, E., Donnelly, J. P., et al. (2021). External Validation of a Widely Implemented Proprietary Sepsis Prediction Model in Hospitalized Patients. *JAMA Internal Medicine*, 181(8), 1065–1070. DOI: 10.1001/jamainternmed.2021.2626
- **Lección para desarrollo de app:** Los modelos de augmentation deben ser validados localmente antes del despliegue; un AUC alto en datos del vendor no garantiza generalización. La calibración local es imprescindible.
- **Cita corta:** Wong et al. (2021). External Validation of a Proprietary Sepsis Prediction Model. *JAMA Internal Medicine*, 181(8), 1065–1070. DOI: 10.1001/jamainternmed.2021.2626

---

## 4. Fracasos y riesgos documentados (lecciones críticas)

### IBM Watson for Oncology — El fracaso más citado del campo

- **Organización:** IBM + MD Anderson Cancer Center (Universidad de Texas)
- **Proyecto:** 2012-2017. Costo: USD 62 millones. Objetivo: sistema de soporte a decisión oncológica capaz de recomendar tratamientos personalizados.
- **Resultado:** El contrato expiró en 2017 antes de que Watson fuera utilizado en un solo paciente real. MD Anderson devolvió el sistema.
- **Causas documentadas (auditoría interna UT + investigación periodística STAT News, 2017):**
  1. Entrenado con casos hipotéticos y datos de un único centro (Memorial Sloan Kettering), no con datos representativos del mundo real
  2. NLP incapaz de interpretar notas clínicas reales con la fidelidad necesaria
  3. Recomendaciones inseguras documentadas en auditorías internas (recomendaba tratamientos contraindicados según los propios oncólogos de MSKCC)
  4. Problemas graves de gestión de proyecto: sobrecostos, retrasos, procurement irregular
  5. Desajuste entre las capacidades reales del ML de la época y las expectativas generadas por el marketing de IBM
- **Fuente:** JNCI: M.D. Anderson Breaks With IBM Watson, Raising Questions About AI in Oncology. *Journal of the National Cancer Institute*, 2017. DOI: 10.1093/jnci/djx113. Adicionalmente: STAT News (2017) — "Watson IBM Cancer" y IEEE Spectrum (2019) — "How IBM Watson Overpromised and Underdelivered".
- **Lección:** El hype no sustituye a la validación clínica independiente. Un sistema de AI clínico entrenado con datos de un solo centro y sin validación prospectiva en el contexto de despliegue es una amenaza, no una solución.

---

### AI en prior authorization — Riesgo de automatización de denegaciones

- Ver Caso 2.2. Sistemas de agentes para PA han sido implicados en tasas de negación automática hasta 16 veces superiores al promedio humano (Senate Finance Committee, 2024), con escasa supervisión médica real sobre las decisiones del modelo.

---

### GPT-4 como copiloto clínico — Desempeño variable y riesgos

- Estudios independientes (2023-2024) muestran un desempeño heterogéneo:
  - Diagnóstico primario correcto: 38.3% en casos del NEJM (JCMA, 2024)
  - Diagnóstico dentro del top-5: 71.6% (mejora significativa si se considera el diferencial)
  - 54% de accuracy en casos de radiología del NEJM "Diagnosis Please" (NEJM AI quiz, 2024)
  - Riesgo documentado: sesgos raciales/étnicos en triage (NIH PMC11476903, 2023)
- Conclusión: GPT-4 puede ser útil como herramienta de segundo par de ojos, pero no como reemplazo del razonamiento clínico en casos complejos o inusuales sin validación supervisada.

---

## 5. Contexto LATAM

### Hospital Israelita Albert Einstein (Brasil) — Liderazgo regional en IA clínica

- Clasificado entre los 30 mejores hospitales del mundo (Newsweek 2024) y #1 en América Latina.
- Firmó acuerdo de licencia con Lunit (2023) para análisis automático de radiografías de tórax con IA [fuente empresarial / Lunit].
- Publica activamente en su revista institucional (*Einstein Journal*) sobre IA en UCI y aplicaciones de LLMs como ChatGPT y Gemini en razonamiento clínico (2024).
- Recibió grant de la Fundación Bill y Melinda Gates (2023) para aplicaciones de IA en salud global.
- **Limitación:** No se encontraron papers con resultados cuantitativos específicos de un despliegue propio de IA en flujo clínico operativo, publicados con DOI en revistas indexadas al momento de este informe.

### Hospital Italiano de Buenos Aires — Programa institucional pIASHIBA

- El Programa de Inteligencia Artificial en Salud del Hospital Italiano de Buenos Aires (pIASHIBA) se estableció formalmente en 2018 como programa traslacional institucional.
- Desarrolla algoritmos de IA sobre datos de pacientes internados en terapia intensiva e historias clínicas electrónicas propias.
- Publica en su revista institucional y en PubMed sobre aplicaciones en UCI y uso de LLMs en educación médica (2024).
- El repositorio de GitHub del programa (github.com/piashiba) está activo.
- **Limitación:** No se encontraron papers con resultados cuantitativos propios (AUC, sensibilidad, resultados clínicos) del programa publicados en revistas internacionales indexadas al momento de este informe. Los investigadores del HIBA sí participan en estudios internacionales de validación de modelos.

### Clínica Alemana de Santiago (Chile)

- Rankeada #173 en el mundo (Newsweek World's Best Hospitals 2024) y segunda en LATAM.
- Destaca por adopción tecnológica avanzada, pero no se encontraron casos de IA con resultados cuantitativos publicados en revistas indexadas al cierre de esta investigación.

---

## 6. Recomendaciones para el widget de simulación (AI Fluency LATAM)

### Para el widget de AUTOMATION:
- Usar el caso de retinopatía diabética (Gulshan/Google) como ejemplo paradigmático: volumen alto, tarea repetitiva, imagen → clasificación binaria (referable/no referable), sin intervención humana caso a caso.
- Métricas a destacar visualmente: AUC 0.991, sensibilidad 90%, especificidad 98%.
- El caso de codificación ICD-10 por NLP es excelente para industrias que tienen EMR/HIS, dado que es aplicable directamente en LATAM.

### Para el widget de AGENCY:
- El caso AMIE (Google, Nature 2025) es el más riguroso disponible para agentes conversacionales de historia clínica.
- AlphaFold es un caso de agency científica de enorme impacto, aunque más distante del flujo clínico cotidiano.
- Para prior authorization: mostrar como caso de doble filo — eficiencia vs. riesgo de automatización de denegaciones. Añade tensión dramática útil para la simulación.

### Para el widget de AUGMENTATION:
- El caso DAX/Nabla (NEJM AI 2025) es el más robusto para mostrar resultados verificados vs. auto-reportados — excelente para enseñar a evaluar evidencia.
- Aidoc es el caso más concreto de copiloto de emergencias con resultados de tiempo cuantificados y FDA clearance.
- Epic Sepsis Model debe mencionarse como caso de advertencia: no todo lo que se implementa a escala es necesariamente válido.

---

## 7. Citas listas para bibliografía (formato APA-light)

```
Gulshan, V. et al. (2016). Development and Validation of a Deep Learning Algorithm for Detection of Diabetic Retinopathy. JAMA, 316(22), 2402–2410. DOI: 10.1001/jama.2016.17216. PubMed: 27898976.

Rajpurkar, P. et al. (2017). CheXNet: Radiologist-Level Pneumonia Detection on Chest X-Rays with Deep Learning. arXiv:1711.05225. https://arxiv.org/abs/1711.05225.

Attia, Z. I. et al. (2019). An AI-enabled ECG algorithm for identification of patients with AF during sinus rhythm. The Lancet, 394(10201), 861–867. DOI: 10.1016/S0140-6736(19)31721-0. PubMed: 31378392.

McKinney, S. M. et al. (2020). International evaluation of an AI system for breast cancer screening. Nature, 577, 89–94. DOI: 10.1038/s41586-019-1799-6.

Jumper, J. et al. (2021). Highly accurate protein structure prediction with AlphaFold. Nature, 596, 583–589. DOI: 10.1038/s41586-021-03819-2.

Wong, A. et al. (2021). External Validation of a Widely Implemented Proprietary Sepsis Prediction Model. JAMA Internal Medicine, 181(8), 1065–1070. DOI: 10.1001/jamainternmed.2021.2626.

Tu, T. et al. (2025). Towards conversational diagnostic artificial intelligence. Nature, 637, 587–594. DOI: 10.1038/s41586-025-08866-7. PMC: 12158756.

Lukac, P. J. et al. (2025). Ambient AI Scribes in Clinical Practice: A Randomized Trial. NEJM AI. DOI: 10.1056/AIoa2501000. PubMed: 40672471.

Singhal, K. et al. (2024). Towards Expert-Level Medical Question Answering with Large Language Models. Nature Medicine. DOI: 10.1038/s41591-024-03423-7. arXiv: 2305.09617.
```

---

## 8. Preguntas abiertas para próxima iteración

1. **LATAM con datos propios:** ¿Existen resultados cuantitativos publicados del Hospital Italiano de Buenos Aires (pIASHIBA) en revistas internacionales indexadas post-2022? La búsqueda no los encontró; podría requerirse acceso directo a la revista Einstein Journal o contacto con los autores.

2. **Tecsalud México / Clínica Alemana Chile:** No se encontraron papers propios de IA con resultados cuantitativos. Un paso siguiente sería buscar en bases de datos en español (SciELO, LILACS) o contactar directamente a los departamentos de innovación.

3. **Tempus AI y PathAI:** Las publicaciones encontradas son principalmente estudios de validación de biomarcadores, no estudios de impacto clínico en outcomes de pacientes. Una búsqueda dirigida en ClinicalTrials.gov (NCT06207032 para Tempus ARIES) podría arrojar resultados cuando el registro cierre.

4. **Prior authorization agents en LATAM:** El problema de autorización previa existe en sistemas de salud privados de LATAM (ISAPRES en Chile, prepagadas en Colombia, operadoras en Brasil), pero no se encontró evidencia publicada de implementaciones de IA con resultados verificados en la región.

5. **Riesgos de sesgo en modelos de salud en poblaciones latinoamericanas:** No se encontró literatura específica sobre validación de modelos de imágenes o NLP en poblaciones de LATAM. Este es un gap crítico que debería señalarse en la app.
```
