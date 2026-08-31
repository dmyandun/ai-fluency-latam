# CLAUDE.md — AI Fluency LATAM

## Comandos de desarrollo

```bash
npm run dev       # Servidor local en http://localhost:3000
npm run build     # Build de producción (verificar antes de deploy)
npm run lint      # ESLint (flat config en eslint.config.mjs)
npm run lint:fix  # ESLint con autofix
npm run test:e2e  # Playwright: hace el build y prueba los dos caminos al roadmap
```

`npm run test:e2e` levanta su propio servidor sobre un build de producción, así
que no hace falta tener `npm run dev` corriendo. `next start` avisa de que no
soporta `output: 'standalone'`; sirve la app igual y el aviso es esperado.

## Arquitectura

**Next.js 16 App Router** con estas rutas:
- `/` → landing (`app/page.tsx`, compone las secciones de `components/landing/`)
- `/explore` → recorrido completo en una sola página (`components/ExploreFlow.tsx`):
  industria → simulación → diagnóstico → resultados → Roadmap 4D → política de IA
- `/assessment` → el mismo diagnóstico sin simulación, en 2 pasos (`app/assessment/page.tsx`)
- `/results` → resultados + roadmap; sólo alcanzable desde `/assessment`
- `/privacy` → política de privacidad (`components/PrivacyPolicy.tsx`)
- `/api/chat` → única ruta dinámica; proxy del chat de simulación

**Hay dos caminos al roadmap y la landing ofrece ambos.** `/explore` usa las
simulaciones como gancho, pero son saltables ("Saltar al diagnóstico").
`/assessment` es la vía directa. Al tocar uno, comprueba que el otro sigue
coherente — la suite E2E cubre los dos.

**Sin base de datos.** Todo el estado persiste en `localStorage`:
- `afl_result` → `AssessmentResult` (resultado del diagnóstico)
- `afl_roadmap` → `Roadmap` (roadmap con ediciones del usuario)

Ambos flujos escriben `afl_result` y borran `afl_roadmap` al recalcular, para
que un diagnóstico nuevo no arrastre el roadmap del anterior.

**El diagnóstico ya no pregunta el país**: los casos de las simulaciones aplican
a toda la región. `AssessmentResult.country` sigue existiendo y se rellena con
`DEFAULT_REGION` (`'LATAM'`) para no invalidar los resultados que los usuarios ya
tengan guardados; `resolveLocationName()` en `lib/countries.ts` traduce tanto ese
valor como los códigos de país antiguos.

**Variables de entorno.** `/api/chat` necesita `HF_TOKEN` (inferencia en Hugging
Face). Sin él, el chat de simulación falla; el resto de la app funciona igual.

## Convenciones

- **Texto visible** siempre en **español**
- **Variables, funciones y archivos** siempre en **inglés**
- No poner lógica de negocio en `page.tsx` — solo composición de componentes
- TypeScript strict: no usar `any`, no ignorar errores de tipos
- Comentarios solo cuando el WHY no es obvio
- Antes de editar un componente, comprueba que alguien lo importa. ESLint no
  detecta archivos huérfanos completos, así que es posible trabajar durante un
  rato sobre código que no se renderiza. Las preguntas, por ejemplo, se dibujan
  siempre con `QuestionsTable`, en ambos flujos
- `react-hooks/set-state-in-effect` está activa: no derives estado de otro estado
  en un `useEffect`. Si el `setState` es inevitable (medir el DOM, hidratar desde
  `localStorage`), suprime la regla con un comentario que explique por qué

## Lógica de negocio crítica

### Scoring (`lib/scoring.ts`)

Calcula dos recomendaciones independientes a partir de 13 dimensiones (escala 1-5).

**Sólo 10 se preguntan al usuario** (`lib/questions.ts`). Las otras tres —
`taskRepetitiveness`, `humanJudgment` y `autonomousExecution` — se derivan de la
clasificación de actividades vía `deriveFromActivities()`.

⚠️ **Hoy esas tres valen siempre 3.** Las tres llamadas a `buildAssessmentResult()`
pasan `[]` como actividades (las tareas se recogen en el flujo de consultoría, no
en el diagnóstico), así que `deriveFromActivities([])` devuelve el neutro. En la
práctica se anulan entre sí en las fórmulas de abajo: `automation` depende sólo de
`operationalVolume - decisionComplexity`, y `agency`/`augmentation` de sus otras
dos dimensiones. Tenlo en cuenta antes de afinar pesos.

Nunca cuentes las 13 dimensiones como preguntas en textos de cara al usuario: son
10 preguntas.

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

Cinco fases (`ROADMAP_PHASES`), que son el framework 4D más la consolidación:
`30d` Delegation · `60d` Description · `90d` Discernment · `6m` Diligence ·
`12m` AI Fluency. Todo roadmap trae 25 items: 18 universales + 4 del modelo de
interacción ganador + 3 del tipo de implementación ganador.

El tablero que se renderiza es **`RoadmapFlowBoard`**, tanto en `/results` como
en `/explore`.

El roadmap ya se puede sacar de la app sin backend: `downloadRoadmap()` lo baja
como texto plano y `buildMailtoLink()` arma un `mailto:` con el contenido; ambos
salen de `formatRoadmapAsText()`.

### Recomendaciones (`lib/recommendations.ts`)

9 entradas indexadas por `${interactionModel}_${implementationType}`.
Cada entrada tiene: título, resumen, racional, casos de uso, victorias rápidas y riesgos.
**Esta es la fuente del diagnóstico**, que siempre devuelve un par 1:1.

No la confundas con `lib/framework-matrix.ts`, que sólo alimenta el explorador
del marco en la landing (`components/landing/FrameworkExplorer.tsx`). Ahí el
visitante combina un modelo con varias capas a la vez, y el texto se ensambla
desde 9 fragmentos por par para cubrir las 21 combinaciones sin duplicar
contenido. Es material divulgativo, no entra en el scoring.

## Flujo de datos entre páginas

**Camino directo** (dos páginas):

```
/assessment  (industria → 10 preguntas)
  → buildAssessmentResult()  [llama a calculateScores() por dentro]
  → localStorage.setItem('afl_result', JSON) + removeItem('afl_roadmap')
  → router.push('/results')

/results (useEffect al montar)
  → localStorage.getItem('afl_result')
  → si no existe → router.replace('/assessment')
  → loadOrGenerateRoadmap(result) → carga o genera y guarda 'afl_roadmap'
  → RoadmapFlowBoard.onUpdateRoadmap → saveRoadmap() actualiza 'afl_roadmap'
```

**Camino guiado** (una sola página, sin navegación):

```
/explore  (ExploreFlow mantiene todo en estado local)
  industria → simulación (saltable) → 10 preguntas
  → buildAssessmentResult() → setResult() + guarda 'afl_result'
  → "Generar Roadmap 4D" → generateDefaultRoadmap() → saveRoadmap()
  → "Preparar generador de política" → AIPolicyGenerator
```

`/explore` no navega a `/results`: renderiza sus propios resultados, roadmap y
política en la misma página.

## Paleta de colores

La app usa **tema claro** sobre la escala `slate` de Tailwind, con azul como acento.

```
Fondo de página: slate-50 (#F8FAFC)   Superficies: white
Bordes: slate-200   Texto: slate-900   Texto atenuado: slate-500 / slate-400
Acento: blue-600 (#2563EB)   Acento hover: blue-700
Superficies oscuras (solo CTA final): slate-900 → slate-800
```

Colores semánticos por modelo y tipo de implementación — se usan en badges,
barras y bordes de tarjeta:

```
Por modelo de interacción:
  automation:     indigo  (#6366F1)
  agency:         violet  (#8B5CF6)
  augmentation:   cyan    (#06B6D4)

Por tipo de implementación:
  localGenAI:     emerald (#10B981)
  apiGenAI:       amber   (#F59E0B)
  traditionalML:  blue    (#3B82F6)
```

Estos colores se escriben como strings en `lib/simulations.ts`, por lo que
`tailwind.config.ts` los protege del purge con un `safelist`.

## Despliegue

El proyecto vive en dos remotos y se despliega empujando a `main`:

```bash
git push origin main   # GitHub (código)
git push hf main       # Hugging Face Space (reconstruye y publica)
```

El Space construye con el `Dockerfile` del repo, que usa `output: 'standalone'`
(ver `next.config.ts`) y copia `.next/static` y `public` junto al servidor.
`HF_TOKEN` se configura como secret del Space, no en el repo.

**Convención de ramas:** merges siempre con `--no-ff`, y cada hallazgo nuevo va a
su propia rama en vez de acumularse en la que está en curso.

## Extensiones futuras sugeridas

- Autenticación y guardado de resultados en base de datos (Supabase o PlanetScale)
- Múltiples diagnósticos por organización con historial comparativo
- Exportar roadmap como PDF (hoy sólo se descarga como texto plano)
- Compartir resultados vía URL con hash
- Integración con calendarios para fechas del roadmap
- Sistema de seguimiento de hitos del roadmap
