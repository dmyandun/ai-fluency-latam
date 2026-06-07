import { NextRequest } from 'next/server'
import type { InteractionModel } from '@/types/assessment'

export const runtime = 'edge'

const MODEL = 'meta-llama/Llama-3.1-8B-Instruct'

const INDUSTRY_CONTEXT: Record<string, { role: string; focus: string }> = {
  manufacturing: {
    role: 'sistema de gestión de inventario y producción industrial',
    focus: 'niveles de stock, rotación, reposición, proveedores, eficiencia operativa y costos de producción',
  },
  banking: {
    role: 'motor de análisis de riesgo crediticio y decisiones financieras',
    focus: 'perfil crediticio, score de riesgo, ratios financieros, historial, garantías y política de crédito',
  },
  retail: {
    role: 'plataforma de demand forecasting y gestión comercial',
    focus: 'demanda, stock, márgenes, tendencias de categoría, comportamiento de clientes y pricing',
  },
  health: {
    role: 'sistema de soporte clínico y gestión de pacientes',
    focus: 'síntomas, diagnósticos diferenciales, protocolos clínicos, interacciones y priorización de atención',
  },
  logistics: {
    role: 'optimizador de rutas, flota y operaciones de entrega',
    focus: 'rutas, tiempos, costos de combustible, disponibilidad de flota, SLAs y gestión de incidentes',
  },
  legal: {
    role: 'analizador de contratos y riesgo jurídico',
    focus: 'cláusulas de riesgo, precedentes, inconsistencias contractuales, protecciones legales y jurisdicción',
  },
  government: {
    role: 'procesador de trámites y atención ciudadana',
    focus: 'requisitos documentales, tiempos de resolución, normativa aplicable y flujo de aprobación',
  },
  education: {
    role: 'sistema de gestión educativa y análisis de aprendizaje',
    focus: 'rendimiento académico, patrones de aprendizaje, personalización curricular y eficiencia pedagógica',
  },
  agro: {
    role: 'plataforma de agricultura de precisión y gestión agrícola',
    focus: 'rendimiento de cultivos, condiciones del suelo, clima, insumos, cosecha y trazabilidad',
  },
  telecom: {
    role: 'sistema de gestión de red y experiencia de cliente',
    focus: 'calidad de red, churn de clientes, incidencias, capacidad de infraestructura y planes de servicio',
  },
  insurance: {
    role: 'motor de suscripción y gestión de siniestros',
    focus: 'perfil de riesgo del asegurado, probabilidad de siniestro, pricing de póliza y gestión de reclamaciones',
  },
  media: {
    role: 'plataforma de análisis de contenido y audiencias',
    focus: 'engagement, distribución de contenido, métricas de audiencia, tendencias y monetización',
  },
  construction: {
    role: 'sistema de gestión de proyectos de construcción',
    focus: 'cronograma de obra, costos, materiales, subcontratistas, riesgos de proyecto y control de calidad',
  },
  energy: {
    role: 'sistema de gestión energética y eficiencia operativa',
    focus: 'consumo energético, eficiencia de activos, predicción de demanda y optimización de costos',
  },
}

const MODEL_BEHAVIOR: Record<InteractionModel, string> = {
  automation: `Actúas como un sistema de automatización que ya está procesando la solicitud. Reporta en tiempo real qué acciones tomaste o tomarías: qué datos analizaste, qué decisiones ejecutaste automáticamente y qué resultados obtuviste. Usa verbos en pasado ("analicé", "generé", "detecté") como si ya lo hubieras procesado.`,
  agency: `Actúas como un agente autónomo que tomó acciones concretas. Reporta qué hiciste de forma independiente: qué fuentes consultaste, qué decisiones tomaste dentro de los parámetros autorizados y qué escalaste al humano. Sé específico sobre cada paso que ejecutaste.`,
  augmentation: `Actúas como un copiloto que asiste al profesional humano. Entrega análisis, contexto y opciones, pero deja la decisión final al usuario. Señala los puntos clave que debe revisar, las opciones disponibles y los riesgos a considerar. Cierra con una pregunta o acción sugerida.`,
}

function buildSystemPrompt(industry: string, interactionModel: InteractionModel, appName: string): string {
  const ctx = INDUSTRY_CONTEXT[industry] ?? {
    role: 'sistema de gestión de procesos con IA',
    focus: 'eficiencia operativa, automatización de tareas y toma de decisiones basada en datos',
  }

  return `Eres ${appName}, un ${ctx.role} potenciado con IA para organizaciones latinoamericanas.

Modo de operación — ${interactionModel}:
${MODEL_BEHAVIOR[interactionModel]}

Área de análisis: ${ctx.focus}.

Instrucciones:
- Responde SIEMPRE en español
- Analiza la situación específica que describe el usuario
- Usa métricas estimadas y datos concretos donde sea posible (porcentajes, tiempos, costos)
- Estructura la respuesta con bullets o numeración para facilitar la lectura
- Sé específico: menciona detalles de lo que describió el usuario
- Máximo 180 palabras — sé conciso e impactante
- No digas que eres un LLM ni menciones Hugging Face o Meta`
}

export async function POST(req: NextRequest) {
  const { industry, interactionModel, appName, message } = await req.json() as {
    industry: string
    interactionModel: InteractionModel
    appName: string
    message: string
  }

  if (!process.env.HF_TOKEN) {
    return new Response('HF_TOKEN no configurado', { status: 500 })
  }

  const systemPrompt = buildSystemPrompt(industry, interactionModel, appName)

  const hfResponse = await fetch(
    `https://api-inference.huggingface.co/models/${MODEL}/v1/chat/completions`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.HF_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: message },
        ],
        stream: true,
        max_tokens: 350,
        temperature: 0.6,
      }),
    }
  )

  if (!hfResponse.ok) {
    const err = await hfResponse.text()
    return new Response(`Error HF: ${err}`, { status: hfResponse.status })
  }

  const reader = hfResponse.body!.getReader()
  const encoder = new TextEncoder()
  const decoder = new TextDecoder()

  const stream = new ReadableStream({
    async start(controller) {
      let buffer = ''
      try {
        while (true) {
          const { done, value } = await reader.read()
          if (done) break
          buffer += decoder.decode(value, { stream: true })
          const lines = buffer.split('\n')
          buffer = lines.pop() ?? ''
          for (const line of lines) {
            if (!line.startsWith('data: ')) continue
            const data = line.slice(6).trim()
            if (data === '[DONE]') continue
            try {
              const parsed = JSON.parse(data)
              const content = parsed.choices?.[0]?.delta?.content
              if (content) controller.enqueue(encoder.encode(content))
            } catch { /* chunk incompleto */ }
          }
        }
      } finally {
        controller.close()
        reader.releaseLock()
      }
    },
  })

  return new Response(stream, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
