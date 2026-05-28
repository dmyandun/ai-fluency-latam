# AI Fluency LATAM

Aplicación web de diagnóstico que ayuda a organizaciones de Latinoamérica a
entender qué tipo de adopción de inteligencia artificial necesitan. El usuario
responde un cuestionario y recibe una recomendación basada en tres modelos de
interacción con IA, una estrategia de implementación técnica y un roadmap
editable de adopción.

## Modelos de interacción

- **Automation** — IA para automatizar tareas repetitivas, basadas en reglas,
  operativas, administrativas o transaccionales.
- **Agency** — Agentes de IA que razonan, planifican, usan herramientas,
  interactúan con sistemas y ejecutan acciones semi-autónomas.
- **Augmentation** — IA para potenciar la toma de decisiones humana, la
  creatividad, el análisis, la estrategia y el trabajo experto.

## Estrategias de implementación

- **IA generativa local** — datos sensibles, alto volumen, privacidad,
  regulación, cargas documentales pesadas o control sobre infraestructura.
- **IA generativa vía API** — creatividad, implementación rápida, interfaces
  conversacionales, generación de contenido, asistentes y experimentación.
- **IA tradicional / Python ML** — forecasting, clasificación, detección de
  anomalías, optimización, scoring, segmentación y predicciones estructuradas.

## Stack técnico

- [Next.js 15](https://nextjs.org/) (App Router)
- TypeScript
- Tailwind CSS v4
- Componentes estilo [shadcn/ui](https://ui.shadcn.com/) sobre Radix UI
- Sin base de datos: el estado se persiste en `localStorage`
- Desplegable en [Vercel](https://vercel.com/)

## Setup local

Requisitos: Node.js 20+.

```bash
npm install
npm run dev
```

La app queda disponible en `http://localhost:3000`.

Scripts:

- `npm run dev` — servidor de desarrollo
- `npm run build` — build de producción
- `npm run start` — servir el build
- `npm run lint` — linting

## Estructura del proyecto

```
app/
  page.tsx              # Landing
  diagnostico/page.tsx  # Cuestionario multi-step
  resultados/page.tsx   # Recomendaciones y desglose
  roadmap/page.tsx      # Roadmap editable
components/
  landing/              # Secciones de la landing
  diagnostic/           # Wizard y pasos del cuestionario
  results/              # Tarjetas de recomendación y desglose
  roadmap/              # RoadmapBoard, RoadmapPhase, RoadmapItemCard, RoadmapItemForm
  ui/                   # Primitivas estilo shadcn/ui
lib/
  questions.ts          # Definición de las 12 preguntas
  scoring.ts            # Motor de scoring
  recommendations.ts    # Textos y lógica de recomendación
  roadmap.ts            # Generación del roadmap inicial
  countries.ts          # Países de LATAM
  industries.ts         # Industrias objetivo
  storage.ts            # Persistencia en localStorage
types/
  assessment.ts         # Tipos del dominio
```

## Modelo de scoring

El cuestionario evalúa 12 dimensiones (en `lib/questions.ts`), cada una
respondida en una escala Likert normalizada al rango `0..1`:

repetitividad, madurez de datos, creatividad, complejidad de decisión, volumen
operativo, sensibilidad de privacidad, integración con sistemas, dependencia
del criterio humano, ejecución autónoma, necesidad de predicción estructurada,
madurez tecnológica y sensibilidad regulatoria.

El motor (`lib/scoring.ts`) aplica una **matriz de pesos** por cada modelo e
implementación. Cada peso referencia una dimensión y puede invertirse
(`invert: true`) cuando "mientras más baja la dimensión, más fuerte la señal"
—por ejemplo, baja creatividad refuerza Automation—. El puntaje de cada
candidato es el **promedio ponderado** de los valores de dimensión (invertidos
cuando corresponde), expresado como porcentaje `0..100`:

```
score = Σ(valor_i × peso_i) / Σ(peso_i)
```

Se selecciona el modelo y la implementación con mayor puntaje; los empates se
resuelven por un orden de prioridad explícito. El resultado es **puro y
determinista**: las mismas respuestas siempre producen el mismo resultado, lo
que facilita las pruebas y la auditoría.

`lib/recommendations.ts` traduce el resultado en textos explicativos y un
proyecto piloto sugerido según país e industria.

## Funcionalidad del roadmap

Tras el diagnóstico, `lib/roadmap.ts` genera un roadmap inicial dividido en
etapas: **30 días, 60 días, 90 días, 6 meses y 12 meses**. Las iniciativas
combinan una base común con iniciativas específicas del modelo y la
implementación recomendados, más un caso de uso de la industria seleccionada.

En la página de roadmap (`/roadmap`) el usuario puede:

- Agregar nuevas iniciativas manualmente.
- Editar iniciativas existentes.
- Eliminar iniciativas.
- Marcar iniciativas como completadas.
- Asignar prioridad, impacto y esfuerzo.

Las iniciativas **generadas por el sistema** se distinguen visualmente
(borde azul, etiqueta "Auto") de las **agregadas por el usuario** (borde verde,
etiqueta "Tú"). En esta versión el roadmap se mantiene en `localStorage`; no se
usa base de datos.

## Despliegue en Vercel

Importar el repositorio en Vercel. No se requieren variables de entorno. El
framework Next.js se detecta automáticamente.
