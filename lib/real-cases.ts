import type { InteractionModel } from '@/types/assessment'

// Casos reales que inspiraron las simulaciones, documentados en research/*.md.
// Mismo formato que BANKING_CASES_BY_MODEL (components/BankingWidgets.tsx).
export const REAL_CASES_BY_INDUSTRY: Record<string, Record<InteractionModel, { cases: string[] }>> = {
  retail: {
    automation: {
      cases: [
        'Walmart, reposición automática con forecasting, -15-25% quiebres (Franz Edelman Award 2023)',
        'Inditex/Zara, forecasting hiperlocal, -20% sobrestock y -40% lead times',
        'Mercado Libre, moderación de anuncios: 98% detectados por IA sin reporte humano (LATAM)',
      ],
    },
    agency: {
      cases: [
        'Amazon Rufus, agente de compras conversacional, ~3.5x conversión',
        'Magalu "Lu", agente de ventas por WhatsApp, ~3x conversión vs app (Brasil)',
        'Alibaba Accio, flota de agentes de sourcing y negociación con proveedores',
      ],
    },
    augmentation: {
      cases: [
        'Sephora Visual Artist, try-on con AR: +90% conversión, -30% devoluciones',
        'Walmart "My Assistant", copiloto para 50,000 asociados',
        'Carrefour "Hopla", copiloto de compra: +55% retención a 7 días',
      ],
    },
  },

  health: {
    automation: {
      cases: [
        'Google/Verily, detección de retinopatía diabética: AUC 0.991 (JAMA 2016)',
        'Codificación ICD-10 con NLP, concordancia κ≈0.87 en hospital real (JMIR 2024)',
        'Mayo Clinic, detección de fibrilación auricular subclínica con ECG + IA (The Lancet 2019)',
      ],
    },
    agency: {
      cases: [
        'Google AMIE, agente conversacional de historia clínica pre-consulta (Nature 2025)',
        'MASH, coordinación de cuidado crónico: reingresos -15-30% en pilotos (Nature Biomed Eng 2025)',
        'Prior authorization con IA, eficiencia con riesgo documentado de denegaciones automatizadas (Health Affairs 2025)',
      ],
    },
    augmentation: {
      cases: [
        'DAX/Nabla, documentación ambiental: -9.5% verificado en RCT vs -50% auto-reportado (NEJM AI 2025)',
        'Aidoc, triage radiológico de emergencias con FDA clearance',
        'Epic Sepsis Model, advertencia: desempeño real menor al declarado (JAMA Internal Medicine 2021)',
      ],
    },
  },

  telecom: {
    automation: {
      cases: [
        'Vodafone UK + Ericsson, Cell Sleep AI: -33% consumo energético en 5G (2025)',
        'Bharti Airtel, antifraude en red: -68.7% pérdidas, 48B+ llamadas bloqueadas',
        'Churn con ML, 99% accuracy en laboratorio; 80-92% esperable en producción (arXiv:2408.16284)',
      ],
    },
    agency: {
      cases: [
        'DNB + Ericsson, primera validación TM Forum Level 4 del mundo (2025)',
        'Amdocs aOS, >90% resolución autónoma de billing (auto-reporte del vendor)',
        'NTT DOCOMO + StarHub, resolución autónoma de roaming inter-carrier: de horas a minutos',
      ],
    },
    augmentation: {
      cases: [
        'Telefônica Brasil (Vivo), copiloto I.Ajuda para 23,000 agentes: -9% AHT (LATAM)',
        'Vodafone SuperTOBi, primera resolución de 15% a 60%',
        'Deutsche Telekom "Ask Magenta", 5M diálogos/año, NPS >40',
      ],
    },
  },

  manufacturing: {
    automation: {
      cases: [
        'BMW AIQX, inspección visual del 100% de unidades en 30+ plantas',
        'Foxconn, lights-out manufacturing: -30% costos (WEF Lighthouse)',
        'Klabin: Industry 4.0 sobre SAP Digital Manufacturing (Brasil)',
      ],
    },
    agency: {
      cases: [
        'Siemens Amberg, fábrica autoadaptativa con gemelo digital',
        'Unilever, planificación autónoma de supply chain: -1-2% costo total',
        'Ternium: IA operacional predictiva en siderurgia (LATAM)',
      ],
    },
    augmentation: {
      cases: [
        'GM + Autodesk, diseño generativo de piezas',
        'Siemens Industrial Copilot, ~30% menos tiempo de diagnóstico y código',
        'Embraer: IA generativa asistiendo ingeniería aeronáutica (Brasil)',
      ],
    },
  },

  logistics: {
    automation: {
      cases: [
        'UPS ORION, -6-8 millas/conductor/día, 100M millas/año ahorradas (USD 300-400M)',
        'Amazon Sparrow, bin-picking con visión computacional: >200M SKUs',
        'DHL: ML en smart warehouses, slotting y staffing',
      ],
    },
    agency: {
      cases: [
        'Maersk + Pactum, agentes negociadores autónomos con miles de carriers',
        'Flexport Convoy, freight marketplace con ejecución end-to-end',
        'Rappi, orquestación last-mile con ML en 9 países (LATAM)',
      ],
    },
    augmentation: {
      cases: [
        'Flexport, copiloto GenAI para brokers y planners',
        'Maersk: GenAI asistiendo a planners de supply chain',
        'DHL, skills graphs y asistentes generativos para la fuerza laboral',
      ],
    },
  },
}
