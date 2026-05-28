import type {
  DiagnosticResult,
  ImplementationType,
  InteractionModel,
  Roadmap,
  RoadmapItem,
  RoadmapPhaseId,
} from "@/types/assessment";
import { getIndustry } from "@/lib/industries";

export interface PhaseMeta {
  id: RoadmapPhaseId;
  label: string;
  horizon: string;
}

/** Ordered roadmap phases with display metadata. */
export const PHASES: PhaseMeta[] = [
  { id: "d30", label: "Primeros 30 días", horizon: "Fundamentos" },
  { id: "d60", label: "60 días", horizon: "Validación" },
  { id: "d90", label: "90 días", horizon: "Piloto" },
  { id: "m6", label: "6 meses", horizon: "Escalamiento" },
  { id: "m12", label: "12 meses", horizon: "Madurez" },
];

let idCounter = 0;
/** Stable-ish id generator; crypto.randomUUID when available. */
export function newId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  idCounter += 1;
  return `item-${Date.now()}-${idCounter}`;
}

type Seed = Omit<RoadmapItem, "id" | "completed" | "source">;

/** Baseline initiatives common to every adoption journey. */
function baseSeeds(): Seed[] {
  return [
    {
      phase: "d30",
      title: "Definir caso de uso y métrica de éxito",
      description:
        "Seleccionar un proceso concreto, su línea base y la métrica de negocio a mover.",
      priority: "high",
      impact: "high",
      effort: "low",
    },
    {
      phase: "d30",
      title: "Inventario de datos y accesos",
      description:
        "Mapear fuentes de datos, calidad, permisos y restricciones de privacidad.",
      priority: "high",
      impact: "medium",
      effort: "medium",
    },
    {
      phase: "d60",
      title: "Prueba de concepto técnica",
      description:
        "Construir un prototipo acotado y validar factibilidad con datos reales.",
      priority: "high",
      impact: "medium",
      effort: "medium",
    },
    {
      phase: "d90",
      title: "Piloto con usuarios reales",
      description:
        "Desplegar a un grupo controlado, medir adopción e iterar sobre feedback.",
      priority: "high",
      impact: "high",
      effort: "medium",
    },
    {
      phase: "m6",
      title: "Gobernanza y monitoreo",
      description:
        "Definir políticas de uso responsable, métricas de calidad y supervisión continua.",
      priority: "medium",
      impact: "high",
      effort: "medium",
    },
    {
      phase: "m12",
      title: "Escalar a nuevos procesos",
      description:
        "Replicar el modelo probado en otras áreas y consolidar un centro de excelencia de IA.",
      priority: "medium",
      impact: "high",
      effort: "high",
    },
  ];
}

/** Initiatives specific to the recommended interaction model. */
function modelSeeds(model: InteractionModel): Seed[] {
  switch (model) {
    case "automation":
      return [
        {
          phase: "d60",
          title: "Mapear reglas y excepciones del proceso",
          description:
            "Documentar el flujo, sus reglas de negocio y los casos de excepción a manejar.",
          priority: "high",
          impact: "medium",
          effort: "medium",
        },
        {
          phase: "m6",
          title: "Automatizar procesos adyacentes",
          description:
            "Extender la automatización a tareas conectadas de alto volumen.",
          priority: "medium",
          impact: "medium",
          effort: "medium",
        },
      ];
    case "agency":
      return [
        {
          phase: "d60",
          title: "Diseñar el grafo de herramientas del agente",
          description:
            "Definir qué sistemas y APIs podrá usar el agente y con qué límites.",
          priority: "high",
          impact: "high",
          effort: "high",
        },
        {
          phase: "d90",
          title: "Definir guardrails y human-in-the-loop",
          description:
            "Establecer puntos de aprobación humana para acciones críticas del agente.",
          priority: "high",
          impact: "high",
          effort: "medium",
        },
      ];
    case "augmentation":
      return [
        {
          phase: "d60",
          title: "Co-diseñar el copiloto con el equipo experto",
          description:
            "Trabajar con los usuarios expertos para definir cómo la IA asiste sus decisiones.",
          priority: "high",
          impact: "high",
          effort: "medium",
        },
        {
          phase: "m6",
          title: "Programa de capacitación y adopción",
          description:
            "Formar a los equipos para integrar la IA en su flujo de trabajo diario.",
          priority: "medium",
          impact: "high",
          effort: "medium",
        },
      ];
  }
}

/** Initiatives specific to the recommended implementation strategy. */
function implementationSeeds(impl: ImplementationType): Seed[] {
  switch (impl) {
    case "localGenAI":
      return [
        {
          phase: "d90",
          title: "Provisionar infraestructura para modelos locales",
          description:
            "Dimensionar GPU/CPU, seguridad y aislamiento de datos sensibles on-premise o nube privada.",
          priority: "high",
          impact: "high",
          effort: "high",
        },
      ];
    case "apiGenAI":
      return [
        {
          phase: "d30",
          title: "Evaluar proveedores de IA generativa",
          description:
            "Comparar APIs por costo, latencia, calidad y cláusulas de tratamiento de datos.",
          priority: "high",
          impact: "medium",
          effort: "low",
        },
      ];
    case "traditionalML":
      return [
        {
          phase: "d90",
          title: "Construir pipeline de features y modelo base",
          description:
            "Preparar datos estructurados, entrenar un modelo de referencia y validar métricas.",
          priority: "high",
          impact: "high",
          effort: "high",
        },
      ];
  }
}

/**
 * Generate the initial, system-recommended roadmap from a diagnostic result.
 * Every produced item is marked `source: "generated"`.
 */
export function generateRoadmap(result: DiagnosticResult): Roadmap {
  const { primaryModel, primaryImplementation } = result.scoring;
  const industry = getIndustry(result.input.industryId);

  const seeds: Seed[] = [
    ...baseSeeds(),
    ...modelSeeds(primaryModel),
    ...implementationSeeds(primaryImplementation),
  ];

  if (industry) {
    seeds.push({
      phase: "d90",
      title: `Caso de uso en ${industry.name}`,
      description: `Enfocar el piloto en ${industry.pilotFocus}.`,
      priority: "high",
      impact: "high",
      effort: "medium",
    });
  }

  const items: RoadmapItem[] = seeds.map((seed) => ({
    ...seed,
    id: newId(),
    completed: false,
    source: "generated",
  }));

  return { items };
}

export function getPhaseMeta(id: RoadmapPhaseId): PhaseMeta {
  return PHASES.find((p) => p.id === id) ?? PHASES[0];
}
