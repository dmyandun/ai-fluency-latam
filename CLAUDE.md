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
- `/explore` → escaparate de simulaciones (`components/ExploreFlow.tsx`):
  industria → simulación → salida al diagnóstico. **No contiene el diagnóstico.**
- `/assessment` → el diagnóstico, en 2 pasos (`components/AssessmentFlow.tsx`;
  `page.tsx` sólo lo envuelve en `<Suspense>`, que `useSearchParams` exige)
- `/results` → resultados + roadmap + política; sólo alcanzable desde `/assessment`
- `/privacy` → política de privacidad (`components/PrivacyPolicy.tsx`)
- `/api/chat` → única ruta dinámica; proxy del chat de simulación

**Hay dos entradas y la landing ofrece ambas**, pero el diagnóstico está en un
solo sitio. `/explore` usa las simulaciones como gancho y de ahí sale a
`/assessment`; `/assessment` es también la vía directa. El diagnóstico nunca se
renderiza junto a una simulación: fue una decisión explícita, no la revierta
nadie por comodidad. Al tocar una entrada, comprueba que la otra sigue coherente
— la suite E2E cubre las dos.

`/explore` pasa la industria elegida en la query (`/assessment?industry=banking`)
para no volver a preguntarla; `AssessmentFlow` la valida contra `INDUSTRIES` y,
si es válida, arranca directamente en las preguntas.

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

El tablero que se renderiza es **`RoadmapFlowBoard`**, en `/results`.

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

### Benchmark regional (`lib/regional-benchmark.ts`)

Alimenta `components/RegionalBenchmark.tsx`, que sitúa la recomendación frente
al mercado en la pestaña de diagnóstico de `/results`.

⚠️ **Aquí sólo entran cifras publicadas y citables.** Cada dato viaja con su
`BenchmarkSource`: publicador, año, URL y `method` — qué mide y con qué muestra.
Los tres se enseñan en la UI porque cambian cómo se lee el número. Antes de
tocar un valor, comprueba que la fuente lo publica: una estimación presentada
como medición arruina la sección entera y, con ella, la credibilidad del
diagnóstico.

Ninguna fuente mide la adopción **por modelo de interacción**: automatización,
agencia y aumentación son el marco de esta app, no una categoría que la
industria reporte. Por eso ese eje se compara contra el dato global de agentes
y cada panel lleva un chip `scope` que distingue `region` de `global`. No lo
quites para “igualar” los dos ejes.

Tampoco existe un ranking de países **por industria**, así que el panel de
países usa `IMPLEMENTATION_LEADERBOARD`: la subdimensión del ILIA de la que
depende la tecnología recomendada (infraestructura para IA local, talento para
API, datos para ML tradicional). El ranking general del ILIA no sirve aquí
porque sale idéntico para todos. Sólo se listan los países con cifra publicada
—a veces uno solo, con el promedio regional al lado— y ese hueco es
deliberado: completarlo requeriría inventar el orden.

La variación por industria la aporta `REAL_CASES_BY_INDUSTRY`
(`lib/real-cases.ts`), con casos documentados por industria y modelo. Cubre 6
de las 14 industrias; en las demás el bloque simplemente no se pinta.

Las cifras están **embebidas como constantes**: se compilan en el bundle y no
cuestan ninguna llamada en runtime. La contrapartida es que envejecen en
silencio, así que el `year` de cada fuente se muestra al visitante y conviene
revisar el archivo cuando salga una edición nueva del ILIA o del State of AI.

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

**Camino guiado** (entra por la simulación y desemboca en el mismo diagnóstico):

```
/explore  (ExploreFlow sólo mantiene la industria en estado local)
  industria → simulación → "Hacer el diagnóstico"
  → <Link href="/assessment?industry=<id>">
  → desde aquí continúa el camino directo de arriba
```

`/explore` no guarda nada en `localStorage` ni calcula ningún resultado.

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

## Pestaña de diagnóstico

El resultado se renderiza sólo en `/results`, con estos componentes:

- `ResultSummary` — fila de KPIs: modelo, tecnología, claridad del diagnóstico
  (margen del ganador sobre el segundo) y contexto evaluado
- `ResultCard` × 2 — afinidad de cada eje
- `RegionalBenchmark` — comparación con la región (ver arriba)
- `RecommendationMatrix` — el par recomendado en detalle
- `DimensionsPanel` — separa las **10 dimensiones respondidas** de las 3
  derivadas de actividades, que sin actividades quedan en el neutro y por eso
  no se pintan junto a las respuestas reales

## Extensiones futuras sugeridas

- Autenticación y guardado de resultados en base de datos (Supabase o PlanetScale)
- Múltiples diagnósticos por organización con historial comparativo
- Exportar roadmap como PDF (hoy sólo se descarga como texto plano)
- Compartir resultados vía URL con hash
- Integración con calendarios para fechas del roadmap
- Sistema de seguimiento de hitos del roadmap
