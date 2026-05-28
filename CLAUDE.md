# CLAUDE.md

Contexto del proyecto y reglas de codificación para futuras sesiones de Claude
Code.

## Qué es este proyecto

**AI Fluency LATAM** es una app web de diagnóstico que recomienda a
organizaciones de Latinoamérica qué tipo de adopción de IA necesitan. El
usuario responde un cuestionario y obtiene:

1. Un **modelo de interacción**: Automation, Agency o Augmentation.
2. Una **estrategia de implementación**: IA generativa local, IA generativa vía
   API, o IA tradicional / Python ML.
3. Un **roadmap editable** de adopción por etapas (30/60/90 días, 6 y 12 meses).

## Stack

- Next.js 15 (App Router) + TypeScript
- Tailwind CSS v4 (configuración vía `app/globals.css`, sin `tailwind.config`)
- Componentes estilo shadcn/ui (`components/ui`) sobre Radix UI
- Sin base de datos: persistencia en `localStorage` (`lib/storage.ts`)

## Arquitectura y dónde vive cada cosa

- **Tipos del dominio**: `types/assessment.ts`. Toda nueva entidad o enum del
  dominio va aquí.
- **Datos y lógica de negocio**: en `lib/`, nunca dentro de `page.tsx`.
  - `lib/questions.ts` — preguntas del cuestionario (12 dimensiones).
  - `lib/scoring.ts` — motor de scoring (matriz de pesos, puro/determinista).
  - `lib/recommendations.ts` — textos y armado de recomendación + piloto.
  - `lib/roadmap.ts` — generación del roadmap inicial y metadata de fases.
  - `lib/countries.ts`, `lib/industries.ts` — catálogos.
  - `lib/storage.ts` — lectura/escritura en `localStorage`.
- **UI**: componentes en `components/`, agrupados por feature
  (`landing`, `diagnostic`, `results`, `roadmap`) y primitivas en `ui/`.
- **Páginas** (`app/*/page.tsx`): delgadas; solo componen componentes. La
  lógica interactiva vive en componentes cliente (`"use client"`).

## Reglas de codificación

1. **Idioma**: el texto visible para el usuario va en **español**; nombres de
   variables, funciones, archivos y comentarios en **inglés**.
2. **No metas lógica en `page.tsx`.** Las páginas componen; la lógica vive en
   `lib/` o en componentes dedicados.
3. **Componentes reutilizables y enfocados.** Un componente, una
   responsabilidad. Reusa las primitivas de `components/ui`.
4. **El scoring debe ser puro y determinista.** Sin efectos secundarios ni
   aleatoriedad. Si cambias pesos, mantén la suma de pesos > 0 por candidato.
5. **Tipado estricto.** Sin `any`. Usa los tipos de `types/assessment.ts`.
6. **Estado del cliente**: hidrata desde `localStorage` en `useEffect` y
   persiste en cada cambio. Evita acceder a `window` durante el render del
   servidor.
7. **Estilo**: usa `cn()` (de `lib/utils.ts`) para componer clases de Tailwind.
   Sigue la convención de tokens de color definida en `globals.css`.
8. **Roadmap**: diferencia visualmente iniciativas `source: "generated"` de
   `source: "user"`. No rompas esta distinción.

## Comandos

```bash
npm run dev     # desarrollo
npm run build   # build de producción (úsalo para verificar cambios)
npm run lint    # linting
```

## Al extender el diagnóstico

- Para una nueva pregunta: agrega su `DimensionId` en `types/assessment.ts`, la
  pregunta en `lib/questions.ts`, su etiqueta en `DIMENSION_LABELS`, y los pesos
  correspondientes en `lib/scoring.ts`. El wizard se adapta automáticamente al
  número de preguntas.
- Para un nuevo país/industria: agrégalo al catálogo en `lib/`.
