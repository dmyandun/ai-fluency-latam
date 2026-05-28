export interface Industry {
  id: string;
  name: string;
  /** Short context used to tailor the suggested pilot project. */
  pilotFocus: string;
}

/** Target LATAM industries for the diagnostic. */
export const INDUSTRIES: Industry[] = [
  {
    id: "manufacturing",
    name: "Manufactura",
    pilotFocus: "control de calidad y mantenimiento predictivo en planta",
  },
  {
    id: "agribusiness",
    name: "Agroindustria",
    pilotFocus: "predicción de rendimiento de cultivos y optimización de cosecha",
  },
  {
    id: "retail",
    name: "Retail",
    pilotFocus: "previsión de demanda y personalización de surtido por tienda",
  },
  {
    id: "logistics",
    name: "Logística",
    pilotFocus: "optimización de rutas y predicción de tiempos de entrega",
  },
  {
    id: "banking",
    name: "Banca",
    pilotFocus: "scoring crediticio y detección de fraude transaccional",
  },
  {
    id: "insurance",
    name: "Seguros",
    pilotFocus: "evaluación de riesgo y automatización de siniestros",
  },
  {
    id: "health",
    name: "Salud",
    pilotFocus: "triaje asistido y procesamiento de historias clínicas",
  },
  {
    id: "education",
    name: "Educación",
    pilotFocus: "tutores virtuales y analítica de deserción estudiantil",
  },
  {
    id: "construction",
    name: "Construcción",
    pilotFocus: "estimación de costos y seguimiento de avance de obra",
  },
  {
    id: "tourism",
    name: "Turismo",
    pilotFocus: "asistentes de reservas y previsión de ocupación",
  },
  {
    id: "publicSector",
    name: "Sector Público",
    pilotFocus: "atención ciudadana automatizada y análisis de trámites",
  },
  {
    id: "energy",
    name: "Energía",
    pilotFocus: "predicción de demanda energética y mantenimiento de activos",
  },
  {
    id: "foodBeverage",
    name: "Alimentos y Bebidas",
    pilotFocus: "previsión de demanda y control de inventario perecedero",
  },
  {
    id: "fishing",
    name: "Pesca / Acuicultura",
    pilotFocus: "monitoreo de producción y predicción de variables ambientales",
  },
  {
    id: "foreignTrade",
    name: "Comercio Exterior",
    pilotFocus: "automatización documental aduanera y clasificación arancelaria",
  },
  {
    id: "professionalServices",
    name: "Servicios Profesionales",
    pilotFocus: "asistentes de conocimiento y generación de documentos",
  },
  {
    id: "telecom",
    name: "Telecomunicaciones",
    pilotFocus: "predicción de churn y atención al cliente automatizada",
  },
  {
    id: "mining",
    name: "Minería",
    pilotFocus: "mantenimiento predictivo y optimización de procesos",
  },
  {
    id: "oilGas",
    name: "Oil & Gas",
    pilotFocus: "monitoreo de activos y detección de anomalías operativas",
  },
];

export function getIndustry(id: string): Industry | undefined {
  return INDUSTRIES.find((i) => i.id === id);
}
