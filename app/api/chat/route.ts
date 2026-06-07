const HF_MODEL = 'meta-llama/Llama-3.1-8B-Instruct'
const HF_URL = `https://api-inference.huggingface.co/models/${HF_MODEL}/v1/chat/completions`

export async function POST(req: Request) {
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

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 30_000)

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
        max_tokens: 350,
        temperature: 0.6,
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
