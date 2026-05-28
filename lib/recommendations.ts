import type {
  ImplementationType,
  InteractionModel,
  ScoringResult,
} from "@/types/assessment";
import { getCountry } from "@/lib/countries";
import { getIndustry } from "@/lib/industries";

export interface ModelInfo {
  id: InteractionModel;
  name: string;
  tagline: string;
  description: string;
}

export interface ImplementationInfo {
  id: ImplementationType;
  name: string;
  tagline: string;
  description: string;
}

export const MODEL_INFO: Record<InteractionModel, ModelInfo> = {
  automation: {
    id: "automation",
    name: "Automation",
    tagline: "Automatizar lo repetitivo",
    description:
      "IA utilizada para automatizar tareas repetitivas, basadas en reglas, operativas, administrativas o transaccionales. Ideal para reducir costos y errores en procesos de alto volumen.",
  },
  agency: {
    id: "agency",
    name: "Agency",
    tagline: "Agentes que ejecutan",
    description:
      "Agentes de IA que razonan, planifican, usan herramientas, interactúan con sistemas, activan flujos de trabajo y ejecutan acciones semi-autónomas. Ideal cuando se requiere orquestación entre sistemas.",
  },
  augmentation: {
    id: "augmentation",
    name: "Augmentation",
    tagline: "Potenciar al experto",
    description:
      "IA utilizada para potenciar la toma de decisiones humana, la creatividad, el análisis, la estrategia, la planificación y el trabajo experto. Ideal para equipos de alto valor y decisiones complejas.",
  },
};

export const IMPLEMENTATION_INFO: Record<ImplementationType, ImplementationInfo> = {
  localGenAI: {
    id: "localGenAI",
    name: "IA generativa local",
    tagline: "Control y privacidad",
    description:
      "Recomendada cuando hay datos sensibles, alto volumen de procesamiento, restricciones de privacidad o regulatorias, cargas documentales pesadas, o necesidad de mayor control sobre infraestructura y costos.",
  },
  apiGenAI: {
    id: "apiGenAI",
    name: "IA generativa vía API",
    tagline: "Velocidad y creatividad",
    description:
      "Recomendada cuando se necesita creatividad, implementación rápida, interfaces conversacionales, generación de contenido, resumen de información, ideación, asistentes para clientes o experimentación flexible.",
  },
  traditionalML: {
    id: "traditionalML",
    name: "IA tradicional / Python ML",
    tagline: "Predicción sobre datos",
    description:
      "Recomendada cuando se necesita forecasting, clasificación, detección de anomalías, optimización, scoring, segmentación, modelos estadísticos o predicciones basadas en datos estructurados.",
  },
};

/**
 * Build a narrative explanation tying the primary model and implementation
 * together, grounded in the strongest dimensions detected.
 */
export function buildExplanation(scoring: ScoringResult): string {
  const model = MODEL_INFO[scoring.primaryModel];
  const impl = IMPLEMENTATION_INFO[scoring.primaryImplementation];
  return (
    `Tu organización muestra el perfil más fuerte hacia ${model.name}: ${model.tagline.toLowerCase()}. ` +
    `Para llevarlo a la práctica, la implementación más apropiada es ${impl.name} (${impl.tagline.toLowerCase()}). ` +
    `Esta combinación maximiza el retorno reduciendo el riesgo de adopción en tu contexto actual.`
  );
}

/** Suggested first pilot project tailored to country and industry. */
export function buildPilotProject(
  countryId: string,
  industryId: string,
  model: InteractionModel,
): { title: string; description: string } {
  const country = getCountry(countryId);
  const industry = getIndustry(industryId);
  const focus = industry?.pilotFocus ?? "un proceso de alto impacto";
  const place = country ? ` en ${country.name}` : "";

  const lens: Record<InteractionModel, string> = {
    automation: "automatizando el flujo de extremo a extremo",
    agency: "con un agente que orqueste sistemas y ejecute acciones",
    augmentation: "como copiloto que asista a tu equipo experto",
  };

  return {
    title: `Piloto sugerido: ${industry?.name ?? "tu industria"}${place}`,
    description: `Iniciar con ${focus}, ${lens[model]}. Acotar a un caso medible en 90 días, con una métrica de negocio clara y un dueño responsable.`,
  };
}
