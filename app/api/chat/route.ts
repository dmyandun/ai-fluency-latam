// Modelo con razonamiento fuerte, no-gated (Apache 2.0) y 10 providers.
// El sufijo :cheapest hace que HF enrute al provider más barato que lo sirva
// (mejor precio + redundancia si un provider falla).
const HF_MODEL = 'openai/gpt-oss-120b:cheapest'
// Endpoint OpenAI-compatible con selección automática de provider.
// hf-inference ya no sirve LLMs de chat; el router enruta al provider disponible.
const HF_URL = 'https://router.huggingface.co/v1/chat/completions'

// Rate limiter en memoria (suficiente para deploy single-instance / standalone).
// Evita que un abusador agote los créditos de Inference Providers.
const rateLimitStore = new Map<string, { count: number; resetAt: number }>()
const RATE_WINDOW_MS = 60_000
const RATE_MAX = 15

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const entry = rateLimitStore.get(ip)
  if (!entry || entry.resetAt < now) {
    rateLimitStore.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS })
    return false
  }
  if (entry.count >= RATE_MAX) return true
  entry.count++
  return false
}

export async function POST(req: Request) {
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    req.headers.get('x-real-ip') ??
    'unknown'

  if (isRateLimited(ip)) {
    return Response.json(
      { error: 'Demasiadas solicitudes. Intenta en un momento.' },
      { status: 429 }
    )
  }

  const hfToken = process.env.HF_TOKEN
  if (!hfToken) {
    return Response.json({ error: 'HF_TOKEN no configurado' }, { status: 500 })
  }

  let messages: { role: string; content: string }[]
  try {
    const body = await req.json()
    messages = body.messages
    if (!Array.isArray(messages)) throw new Error('messages inválido')
  } catch {
    return Response.json({ error: 'Body inválido' }, { status: 400 })
  }

  // Validación estricta de input: limita tamaño y formato para evitar abuso.
  if (messages.length === 0 || messages.length > 10) {
    return Response.json({ error: 'Solicitud inválida.' }, { status: 400 })
  }
  for (const msg of messages) {
    if (!msg || typeof msg !== 'object' || Array.isArray(msg)) {
      return Response.json({ error: 'Solicitud inválida.' }, { status: 400 })
    }
    if (!['system', 'user', 'assistant'].includes(msg.role)) {
      return Response.json({ error: 'Solicitud inválida.' }, { status: 400 })
    }
    if (typeof msg.content !== 'string' || msg.content.length === 0 || msg.content.length > 4000) {
      return Response.json({ error: 'Solicitud inválida.' }, { status: 400 })
    }
  }

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 45_000)

  let hfRes: Response
  try {
    hfRes = await fetch(HF_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${hfToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: HF_MODEL,
        messages,
        stream: true,
        reasoning_effort: 'low',
        max_tokens: 800,
        temperature: 0.4,
      }),
      signal: controller.signal,
    })
  } catch (err) {
    clearTimeout(timeout)
    const msg = err instanceof Error ? err.message : 'Error de red'
    return Response.json({ error: msg }, { status: 502 })
  }

  clearTimeout(timeout)

  if (!hfRes.ok) {
    const text = await hfRes.text()
    return Response.json({ error: `HF error ${hfRes.status}: ${text}` }, { status: hfRes.status })
  }

  return new Response(hfRes.body, {
    headers: { 'Content-Type': 'text/event-stream; charset=utf-8' },
  })
}
