---
title: AI Fluency LATAM
emoji: 🤖
colorFrom: indigo
colorTo: purple
sdk: docker
app_port: 7860
pinned: false
---

# AI Fluency LATAM

Herramienta de diagnóstico B2B para organizaciones de Latinoamérica que necesitan identificar qué tipo de adopción de inteligencia artificial les corresponde.

## ¿Qué hace?

El sistema evalúa 13 dimensiones organizacionales y recomienda:

**Modelo de interacción:**
- **Automatización** — para tareas repetitivas, operativas y transaccionales
- **Agencia** — para agentes que razonan, planifican y ejecutan acciones semi-autónomas
- **Aumentación** — para potenciar el criterio humano, creatividad y trabajo experto

**Tipo de implementación:**
- **IA Generativa Local** — para datos sensibles, privacidad y control regulatorio
- **IA Generativa vía API** — para creatividad, prototipado rápido y asistentes conversacionales
- **IA Tradicional / ML Python** — para forecasting, clasificación, scoring y datos estructurados

## Stack tecnológico

- **Framework:** Next.js 15 (App Router)
- **Lenguaje:** TypeScript (strict mode)
- **Estilos:** Tailwind CSS
- **Estado:** useState local + localStorage
- **Base de datos:** Ninguna (MVP sin persistencia en servidor)
- **Despliegue:** Vercel

## Estructura del proyecto

```
app/
  page.tsx              # Landing page
  assessment/page.tsx   # Diagnóstico multi-step
  results/page.tsx      # Resultados + roadmap editable
  layout.tsx            # Root layout con fuente Inter
  globals.css           # Estilos globales y animaciones

components/
  Hero.tsx              # Landing page completa
  CountrySelector.tsx   # Selector de país LATAM
  IndustrySelector.tsx  # Grid de selección de industria
  QuestionCard.tsx      # Tarjeta de pregunta con escala Likert
  ProgressBar.tsx       # Barra de progreso del cuestionario
  ResultCard.tsx        # Card de resultado con barras comparativas
  RecommendationMatrix.tsx  # Panel detallado de recomendación
  RoadmapBoard.tsx      # Board principal del roadmap
  RoadmapPhase.tsx      # Columna de una fase del roadmap
  RoadmapItemCard.tsx   # Tarjeta individual de iniciativa
  RoadmapItemForm.tsx   # Formulario de creación/edición

lib/
  questions.ts          # 13 preguntas del diagnóstico
  scoring.ts            # Algoritmo de puntuación
  recommendations.ts    # 9 combinaciones de recomendación
  roadmap.ts            # Generador de roadmap dinámico
  countries.ts          # 20 países LATAM
  industries.ts         # 14 industrias

types/
  assessment.ts         # Todos los tipos TypeScript
```

## Desarrollo local

```bash
npm install
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000)

## Despliegue en Vercel

```bash
npm run build
vercel deploy
```

## Flujo de usuario

1. **Landing** → propuesta de valor + explicación de los 3 modelos
2. **Diagnóstico** → selector de país → selector de industria → 13 preguntas
3. **Resultados** → recomendación principal + desglose de scores
4. **Roadmap** → plan de 12 meses editable con CRUD completo

## localStorage keys

| Key | Descripción |
|-----|-------------|
| `afl_result` | Resultado del último diagnóstico (AssessmentResult) |
| `afl_roadmap` | Estado del roadmap editado por el usuario (Roadmap) |
