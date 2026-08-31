# CLAUDE.md — AI Fluency LATAM

## Comandos de desarrollo

```bash
npm run dev       # Servidor local en http://localhost:3000
npm run build     # Build de producción (verificar antes de deploy)
npm run lint      # ESLint (flat config en eslint.config.mjs)
npm run lint:fix  # ESLint con autofix
```

## Arquitectura

**Next.js 16 App Router** con estas rutas:
- `/` → landing (`app/page.tsx`, compone las secciones de `components/landing/`)
- `/explore` → flujo guiado país → industria → simulación → diagnóstico (`components/ExploreFlow.tsx`)
- `/assessment` → diagnóstico multi-step (`app/assessment/page.tsx`)
- `/results` → resultados + roadmap (`app/results/page.tsx`)
- `/privacy` → política de privacidad (`components/PrivacyPolicy.tsx`)
- `/api/chat` → única ruta dinámica; proxy del chat de simulación

**Sin base de datos.** Todo el estado persiste en `localStorage`:
- `afl_result` → `AssessmentResult` (resultado del diagnóstico)
- `afl_roadmap` → `Roadmap` (roadmap con ediciones del usuario)

## Convenciones

- **Texto visible** siempre en **español**
- **Variables, funciones y archivos** siempre en **inglés**
- No poner lógica de negocio en `page.tsx` — solo composición de componentes
- TypeScript strict: no usar `any`, no ignorar errores de tipos
- Comentarios solo cuando el WHY no es obvio
- `react-hooks/set-state-in-effect` está activa: no derives estado de otro estado
  en un `useEffect`. Si el `setState` es inevitable (medir el DOM, hidratar desde
  `localStorage`), suprime la regla con un comentario que explique por qué

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

## Extensiones futuras sugeridas

- Autenticación y guardado de resultados en base de datos (Supabase o PlanetScale)
- Múltiples diagnósticos por organización con historial comparativo
- Exportar roadmap como PDF
- Compartir resultados vía URL con hash
- Integración con calendarios para fechas del roadmap
- Sistema de seguimiento de hitos del roadmap
