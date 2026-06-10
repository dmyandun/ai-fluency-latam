# AGENTS.md — AI Fluency LATAM

## Comandos de desarrollo

```bash
npm run dev      # Servidor local en http://localhost:3000
npm run build    # Build de producción (verificar antes de deploy)
npm run lint     # ESLint
```

## Arquitectura

**Next.js 15 App Router** con tres rutas:
- `/` → landing page (`app/page.tsx` + `components/Hero.tsx`)
- `/assessment` → diagnóstico multi-step (`app/assessment/page.tsx`)
- `/results` → resultados + roadmap (`app/results/page.tsx`)

**Sin base de datos.** Todo el estado persiste en `localStorage`:
- `afl_result` → `AssessmentResult` (resultado del diagnóstico)
- `afl_roadmap` → `Roadmap` (roadmap con ediciones del usuario)

## Convenciones

- **Texto visible** siempre en **español**
- **Variables, funciones y archivos** siempre en **inglés**
- No poner lógica de negocio en `page.tsx` — solo composición de componentes
- TypeScript strict: no usar `any`, no ignorar errores de tipos
- Comentarios solo cuando el WHY no es obvio

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

```
Background: #0A0F1E    Surface: #111827 (gray-900)    Surface-2: #1F2937
Accent: #6366F1 (indigo-500)    Text: #F9FAFB    Muted: #9CA3AF

Por modelo:
  automation:     indigo  (#6366F1)
  agency:         violet  (#8B5CF6)
  augmentation:   cyan    (#06B6D4)
  localGenAI:     emerald (#10B981)
  apiGenAI:       amber   (#F59E0B)
  traditionalML:  blue    (#3B82F6)
```

## Extensiones futuras sugeridas

- Autenticación y guardado de resultados en base de datos (Supabase o PlanetScale)
- Múltiples diagnósticos por organización con historial comparativo
- Exportar roadmap como PDF
- Compartir resultados vía URL con hash
- Integración con calendarios para fechas del roadmap
- Sistema de seguimiento de hitos del roadmap
