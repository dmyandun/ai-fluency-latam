# AGENTS.md — AI Fluency LATAM

## Descripción del proyecto

Herramienta de diagnóstico B2B para organizaciones de Latinoamérica que necesitan identificar qué tipo de adopción de inteligencia artificial les corresponde. Evalúa 13 dimensiones organizacionales (escala 1-5) y recomienda:

**Modelo de interacción:** `automation` (tareas repetitivas/transaccionales), `agency` (agentes semi-autónomos) o `augmentation` (potenciar criterio humano).

**Tipo de implementación:** `localGenAI` (datos sensibles/regulatorio), `apiGenAI` (creatividad/prototipado) o `traditionalML` (forecasting/datos estructurados).

Además del diagnóstico, incluye simulaciones interactivas por industria con chat de IA, generador de políticas de uso de IA y agendamiento de consultoría vía Calendly.

## Comandos de desarrollo

```bash
npm install     # Instalar dependencias (usa package-lock.json / npm ci en Docker)
npm run dev     # Servidor local en http://localhost:3000
npm run build   # Build de producción (verificar antes de deploy)
npm run start   # Servir el build de producción
npm run lint    # ESLint (next/core-web-vitals + next/typescript)
```

**No hay tests automatizados** — el proyecto no tiene framework de testing configurado. La verificación es `npm run build` + `npm run lint` + prueba manual.

## Stack tecnológico

- **Framework:** Next.js 16 (App Router) con `output: 'standalone'`
- **Lenguaje:** TypeScript 5 (strict mode), React 19
- **Estilos:** Tailwind CSS 3.4
- **Estado:** `useState` local + `localStorage` (sin base de datos, MVP sin persistencia en servidor)
- **Otras dependencias:** `react-markdown` (render de respuestas del chat)
- **Alias de imports:** `@/*` → raíz del proyecto (`tsconfig.json`)

## Variables de entorno

- `HF_TOKEN` (en `.env.local`, no commiteado) — token de Hugging Face para el endpoint `/api/chat`. Sin él, el chat devuelve error 500.

## Arquitectura y rutas

| Ruta | Archivo | Descripción |
|------|---------|-------------|
| `/` | `app/page.tsx` + `components/Hero.tsx` | Landing page |
| `/assessment` | `app/assessment/page.tsx` | Diagnóstico multi-step (país → industria → 13 preguntas) |
| `/results` | `app/results/page.tsx` | Resultados + roadmap editable |
| `/explore` | `app/explore/page.tsx` + `components/ExploreFlow.tsx` | Flujo exploratorio: scoring + simulaciones con chat + roadmap + política de IA |
| `/privacy` | `app/privacy/page.tsx` + `components/PrivacyPolicy.tsx` | Política de privacidad |
| `POST /api/chat` | `app/api/chat/route.ts` | Proxy a Hugging Face Inference Providers |

### API de chat (`app/api/chat/route.ts`)

- Endpoint OpenAI-compatible: `https://router.huggingface.co/v1/chat/completions`, modelo `openai/gpt-oss-120b:cheapest` (enruta al provider más barato disponible).
- Rate limiter en memoria por IP: 15 requests/minuto (suficiente para deploy single-instance; no compartido entre instancias).
- Validación estricta del input: máximo 10 mensajes, con límite de tamaño por mensaje.

## Convenciones de código

- **Texto visible al usuario** siempre en **español**
- **Variables, funciones y archivos** siempre en **inglés**
- No poner lógica de negocio en `page.tsx` — solo composición de componentes
- TypeScript strict: no usar `any`, no ignorar errores de tipos
- Comentarios solo cuando el WHY no es obvio (en español, como el resto del código)
- Componentes interactivos llevan `'use client'` (casi todo el flujo es client-side por el uso de localStorage)

## Organización del código

### `lib/` — lógica de negocio (sin React)

- `questions.ts` — las 13 preguntas del diagnóstico
- `scoring.ts` — algoritmo de puntuación (ver abajo)
- `recommendations.ts` — 9 combinaciones de recomendación + `MODEL_LABELS`
- `roadmap.ts` — generador de roadmap dinámico + persistencia en localStorage
- `countries.ts` / `industries.ts` — catálogos (20 países LATAM, 14 industrias)
- `country-geo.ts` / `country-shapes.ts` — datos geográficos para visualizaciones
- `simulations.ts` — configuración de simulaciones por industria/modelo (KPIs, tablas, insights)
- `simulation-cases.ts` — casos de demo de las simulaciones
- `simulation-prompts.ts` — system prompts por industria para el chat
- `agent-graph.ts` — configuración de grafos de agentes (orquestador + 3 agentes por industria)
- `real-cases.ts` — casos reales citables por industria/modelo (respaldados por `research/`)
- `policyGenerator.ts` — genera el documento de política de uso de IA a partir del diagnóstico
- `contact.ts` — integración Calendly (`CALENDLY_URL`) y resumen del diagnóstico para la reserva

### `components/` — UI

- Flujo de diagnóstico: `CountrySelector`, `IndustrySelector`, `QuestionCard`, `QuestionsTable`, `ProgressBar`, `ResultCard`, `RecommendationMatrix`
- Roadmap: `RoadmapBoard` (columnas por fase), `RoadmapFlowBoard` (vista flujo), `RoadmapPhase`, `RoadmapItemCard`, `RoadmapItemForm`
- Simulaciones: `SimulationApp`, `SimulationChat`, `IndustryVisualization`, `BankingWidgets`, `AgentGraph`
- Otros: `Hero`, `ExploreFlow`, `AIPolicyGenerator`, `ConsultationModal` (Calendly), `PrivacyPolicy`, `ActivityClassifier`, `ActivityInput`, `ActivityListInput`

### `types/assessment.ts`

Todos los tipos compartidos: `DimensionKey`, `DimensionScore`, `InteractionModel`, `ImplementationType`, `AssessmentResult`, `Roadmap`, `RoadmapItem`, `WorkActivity`, etc.

### `research/`

Documentos markdown con investigación de casos reales de IA por industria (salud, logística, manufactura, retail, telecom). Son la fuente de los casos citados en `lib/real-cases.ts` — al agregar casos, mantener la trazabilidad con estos documentos.

## Lógica de negocio crítica

### Scoring (`lib/scoring.ts`)

Calcula dos recomendaciones independientes a partir de las 13 dimensiones (escala 1-5):

**Modelos de interacción** (shift +8 para evitar negativos, luego normalizar a %):
```
automation   = taskRepetitiveness + operationalVolume - decisionComplexity - humanJudgment
agency       = autonomousExecution + systemsIntegration + decisionComplexity - taskRepetitiveness
augmentation = humanJudgment + creativityRequired + decisionComplexity - taskRepetitiveness
```

**Tipos de implementación** (normalizar a %):
```
localGenAI    = dataPrivacy + regulatorySensitivity + operationalVolume
apiGenAI      = creativityRequired + teamTechMaturity + (6 - dataPrivacy) + innovationAdvantage
traditionalML = forecastingNeed + dataMaturity - teamTechMaturity + operationalVolume  [shift +5]
```

### Roadmap (`lib/roadmap.ts`)

`generateDefaultRoadmap(result)` combina:
1. Items universales (siempre generados)
2. Items específicos del `interactionModel` ganador
3. Items específicos del `implementationType` ganador

Los items del sistema tienen `source: 'system'` e IDs determinísticos (`sys-*`).
Los items del usuario tienen `source: 'user'` e IDs generados con `crypto.randomUUID()`.

### Recomendaciones (`lib/recommendations.ts`)

9 entradas indexadas por `${interactionModel}_${implementationType}`.
Cada entrada tiene: título, resumen, racional, casos de uso, victorias rápidas y riesgos.

## Flujo de datos entre páginas

```
/assessment
  → calculateScores() → buildAssessmentResult()
  → localStorage.setItem('afl_result', JSON)
  → router.push('/results')

/results (useEffect al montar)
  → localStorage.getItem('afl_result')
  → si no existe → router.replace('/assessment')
  → loadOrGenerateRoadmap(result) → carga o genera y guarda 'afl_roadmap'
  → RoadmapBoard.onUpdateRoadmap → saveRoadmap() actualiza 'afl_roadmap'
```

`/explore` sigue un flujo autocontenido similar dentro de `ExploreFlow.tsx` (scoring → simulación → roadmap → política).

**localStorage keys:** `afl_result` (`AssessmentResult`), `afl_roadmap` (`Roadmap`).

## Estilos y tema

El tema actual es **claro**: fondo `bg-slate-50`, superficies blancas, texto `slate-900`/`slate-500` (la paleta oscura anterior ya no aplica). Colores de acento por modelo:

```
automation:     indigo
agency:         violet
augmentation:   cyan
localGenAI:     emerald
apiGenAI:       amber
traditionalML:  blue
```

## Seguridad

- `next.config.ts` aplica headers de seguridad en todas las rutas: `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, HSTS, `Permissions-Policy`.
- En producción se añade CSP estricta que solo permite scripts/estilos propios + Calendly, imágenes `data:` + `*.calendly.com`, frames de Calendly, y `frame-ancestors` para `huggingface.co` (embed en HF Spaces). Si se integra un servicio externo nuevo, hay que ampliar la CSP.
- El token `HF_TOKEN` solo se usa server-side en la API route; nunca exponerlo al cliente.
- `/api/chat` valida y limita el input para evitar abuso de créditos de inference.

## Despliegue

- **Hugging Face Spaces (Docker)** — el front-matter de `README.md` configura el Space (`sdk: docker`, `app_port: 7860`).
- `Dockerfile` multi-stage (node:22-slim): deps → build → runner con usuario no-root `nextjs`, usando el output `standalone` de Next.js en el puerto 7860.
- Recordar configurar `HF_TOKEN` como secret del Space.
- El `README.md` menciona Vercel como opción histórica, pero el deploy vigente es el contenedor Docker.

## Extensiones futuras sugeridas

- Autenticación y guardado de resultados en base de datos (Supabase o PlanetScale)
- Múltiples diagnósticos por organización con historial comparativo
- Exportar roadmap como PDF
- Compartir resultados vía URL con hash
- Integración con calendarios para fechas del roadmap
- Sistema de seguimiento de hitos del roadmap
