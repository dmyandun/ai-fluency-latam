import type { ImplementationType, InteractionModel } from '@/types/assessment'

/**
 * Referencias públicas para situar el diagnóstico frente a la región.
 *
 * Regla de la sección: aquí sólo entran cifras publicadas y citables. Ninguna
 * fuente mide la adopción por modelo de interacción — automatización, agencia y
 * aumentación son el marco de esta app, no una categoría de la industria — así
 * que el eje de interacción se compara contra el dato global de agentes y se
 * etiqueta como tal. Antes de añadir un número aquí, comprueba que la fuente
 * lo publica: la sección pierde todo su valor si mezcla medición con estimación.
 */

export interface BenchmarkSource {
  id: string
  /** Cómo se cita en el pie de la tarjeta. */
  label: string
  publisher: string
  year: string
  url: string
  /** Qué mide y con qué muestra. Se enseña: cambia cómo se lee el dato. */
  method: string
}

export const BENCHMARK_SOURCES: Record<string, BenchmarkSource> = {
  ilia: {
    id: 'ilia',
    label: 'Índice Latinoamericano de IA (ILIA) 2025',
    publisher: 'CENIA y CEPAL',
    year: '2025',
    url: 'https://indicelatam.cl/',
    method: 'Más de 100 subindicadores en 19 países de América Latina y el Caribe.',
  },
  cepalUse: {
    id: 'cepalUse',
    label: 'Uso de soluciones de IA en América Latina y el Caribe',
    publisher: 'Observatorio de Desarrollo Digital, CEPAL',
    year: 'abril 2025',
    url: 'https://desarrollodigital.cepal.org/es/datos-y-hechos/uso-de-soluciones-de-ia-en-america-latina-y-el-caribe-2025',
    method:
      'Tráfico web a unos 260 sitios de soluciones de IA en 18 países (Similarweb y RankMyAI). No ve las implementaciones internas de las empresas grandes.',
  },
  nttData: {
    id: 'nttData',
    label: 'Estudio de adopción de IA en Latinoamérica',
    publisher: 'NTT DATA',
    year: '2025',
    url: 'https://www.trendtic.cl/2025/04/se-acelera-la-adopcion-de-ia-en-latinoamerica-mas-de-86-de-las-empresas-ya-han-implementado-ia-generativa-para-mejorar-sus-negocios/',
    method: '92 líderes empresariales de Argentina, Brasil, Chile, Colombia, México y Perú.',
  },
  mckinsey: {
    id: 'mckinsey',
    label: 'The state of AI 2025: agents, innovation, and transformation',
    publisher: 'McKinsey',
    year: 'noviembre 2025',
    url: 'https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai',
    method: '1.993 encuestados en 105 países, encuestados entre junio y julio de 2025. Dato global, no regional.',
  },
}

/**
 * Quién encabeza la región, por subdimensión del ILIA y no en general.
 *
 * El ranking global del ILIA (Chile 70.5, Brasil 67.3, Uruguay 62.3) puntúa el
 * ecosistema completo de cada país, así que sale igual para todo el mundo y no
 * dice nada sobre la tecnología que el diagnóstico recomienda. Las
 * subdimensiones sí cambian el orden — en infraestructura manda Brasil, no
 * Chile — y cada tecnología depende de una distinta. Esa es la comparación que
 * de verdad informa la decisión.
 *
 * Sólo se listan los países cuya cifra publica el informe: el ILIA no tabula
 * las 19 fichas en la web, y rellenar los huecos sería inventar el ranking.
 */
export interface RegionalLeaderboard {
  /** Subdimensión medida. Se enseña: sin ella el puntaje no significa nada. */
  dimension: string
  /** Por qué esa subdimensión condiciona justamente esta tecnología. */
  why: string
  leaders: { country: string; score: number }[]
  /** Promedio de los 19 países, cuando el informe lo publica. */
  regionalAverage?: number
  /** Matiz que el puntaje no captura por sí solo. */
  note?: string
}

export const IMPLEMENTATION_LEADERBOARD: Record<ImplementationType, RegionalLeaderboard> = {
  localGenAI: {
    dimension: 'Infraestructura digital',
    why: 'Correr modelos dentro de tu perímetro depende de cómputo disponible en el país, y ahí el orden regional se invierte respecto del ranking general.',
    leaders: [
      { country: 'Brasil', score: 71.4 },
      { country: 'Uruguay', score: 70.5 },
      { country: 'Chile', score: 63.8 },
    ],
    note: 'Brasil concentra más del 90% de la capacidad de cómputo de la región; Uruguay, Costa Rica y Colombia salen mejor en GPU por habitante.',
  },
  apiGenAI: {
    dimension: 'Talento humano',
    why: 'Consumir modelos por API se monta rápido, así que la diferencia la marca quién sabe usarlos y con qué criterio, no la infraestructura.',
    leaders: [{ country: 'Chile', score: 66.8 }],
    regionalAverage: 43.0,
    note: 'Chile es el único país con preparación alta y lidera en alfabetización en IA (84.7). Costa Rica encabeza las habilidades profesionales de IA y Colombia el aprendizaje autodirigido.',
  },
  traditionalML: {
    dimension: 'Disponibilidad y uso de datos',
    why: 'Un modelo predictivo vale lo que valen los datos con que se entrena, así que aquí pesa la madurez de datos del entorno.',
    leaders: [
      { country: 'Chile', score: 66.0 },
      { country: 'México', score: 56.3 },
    ],
    regionalAverage: 47.7,
    note: '15 de los 19 países medidos siguen por debajo de 50 puntos, aunque el promedio regional subió desde 35.7 el año anterior.',
  },
}

export interface BenchmarkStat {
  /** Cifra destacada, ya formateada. */
  value: string
  label: string
  sourceId: keyof typeof BENCHMARK_SOURCES
  /** 'region' pinta el dato como latinoamericano; 'global' avisa de que no lo es. */
  scope: 'region' | 'global'
}

/**
 * Cómo se compara con la región la tecnología recomendada. La lectura dice si
 * el usuario va con la corriente del mercado o por delante de ella, que es la
 * decisión que el dato debería informar.
 */
export const IMPLEMENTATION_BENCHMARK: Record<
  ImplementationType,
  { stat: BenchmarkStat; reading: string }
> = {
  apiGenAI: {
    stat: {
      value: '78%',
      label: 'del consumo de soluciones de IA en la región es IA generativa (74% global)',
      sourceId: 'cepalUse',
      scope: 'region',
    },
    reading:
      'Es por donde entra casi toda la región, y por eso arrancas rápido y con talento disponible. La contrapartida: lo mismo está al alcance de tus competidores, así que la ventaja vendrá de tus datos y tus procesos, no del modelo.',
  },
  localGenAI: {
    stat: {
      value: '22%',
      label:
        'del consumo regional llega a capas avanzadas (modelos y APIs, plataformas de desarrollo y código abierto), frente al 26% global',
      sourceId: 'cepalUse',
      scope: 'region',
    },
    reading:
      'Es justo la capa donde la región va por detrás del promedio mundial. Montar modelos dentro de tu perímetro te pone por delante del estándar regional, a cambio de exigir un equipo técnico que la mayoría todavía no tiene.',
  },
  traditionalML: {
    stat: {
      value: '24%',
      label: 'de las empresas encuestadas alcanzó implementación avanzada en IA tradicional en 2024',
      sourceId: 'nttData',
      scope: 'region',
    },
    reading:
      'La conversación pública se la lleva la IA generativa, pero es en la IA tradicional donde hay casos maduros y retorno medido. Si tu operación tiene historia de datos, aquí compites contra una cuarta parte del mercado, no contra todo el mundo.',
  },
}

/**
 * El eje de interacción no tiene medición regional. Se compara contra el dato
 * global de agentes, que es el que marca hasta dónde ha llegado el mercado.
 */
export const INTERACTION_BENCHMARK: Record<
  InteractionModel,
  { stat: BenchmarkStat; reading: string }
> = {
  automation: {
    stat: {
      value: '88%',
      label: 'de las organizaciones ya usa IA en al menos una función de negocio',
      sourceId: 'mckinsey',
      scope: 'global',
    },
    reading:
      'Automatizar es la puerta de entrada y ya casi nadie se queda fuera. Tu diferencia no estará en tenerlo, sino en cuánto del proceso llega a producción y con qué trazabilidad.',
  },
  agency: {
    stat: {
      value: '23%',
      label: 'escala sistemas agénticos en alguna parte, y en ninguna función superan el 10%',
      sourceId: 'mckinsey',
      scope: 'global',
    },
    reading:
      'El 62% experimenta con agentes, pero llevarlos a escala sigue siendo raro en todo el mundo. Es el terreno donde más ventaja hay por ganar y donde más gobernanza hace falta: permisos, credenciales y límites de ejecución.',
  },
  augmentation: {
    stat: {
      value: '62%',
      label: 'ya experimenta con agentes de IA, y el resto del mercado sigue en asistencia al experto',
      sourceId: 'mckinsey',
      scope: 'global',
    },
    reading:
      'Apoyar a quien decide es el uso más extendido y el de adopción más rápida, porque no exige rediseñar el proceso. El control se juega en qué contexto sensible sale de tu organización al pedir esa ayuda.',
  },
}
