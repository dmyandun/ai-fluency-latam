'use client'

import { useState, useRef, useEffect } from 'react'
import type { InteractionModel } from '@/types/assessment'

// Cambia esta URL a tu perfil de LinkedIn o página de contacto
const CONTACT_URL = 'https://www.linkedin.com/in/dyandun'

const PLACEHOLDERS: Record<string, string> = {
  manufacturing: 'Ej: "Tenemos 80 SKUs de repuestos con alta varianza en consumo y 4 proveedores. ¿Cómo optimizo el stock de seguridad sin sobreinvertir?"',
  banking:       'Ej: "Solicitud PYME tecnológica, 2 años operando, ingresos $200K/año, sin historial bancario previo, pide $90K a 36 meses."',
  retail:        'Ej: "Tengo 300 unidades de chaquetas de invierno, terminó la temporada y la demanda cayó 70%. ¿Qué estrategia recomiendas?"',
  health:        'Ej: "Paciente 62 años, HTA conocida, llega con cefalea intensa súbita 9/10 sin fiebre. PA 185/115. ¿Cómo priorizas?"',
  logistics:     'Ej: "Dos rutas se cruzan en la zona norte. Un conductor terminó temprano y otro lleva 50 min de retraso con 12 entregas pendientes."',
  legal:         'Ej: "Cláusula: El proveedor pagará 15% del valor del contrato por cada semana de retraso, sin límite máximo. ¿Qué riesgos ves?"',
  government:    'Ej: "Solicitud de habilitación sanitaria para restaurante. Tiene 7 de 9 documentos. Falta certificado de fumigación y planos actualizados."',
  education:     'Ej: "Tenemos 30% de reprobación en matemáticas en secundaria. Los docentes reportan baja motivación. ¿Qué patrones analizarías?"',
  agro:          'Ej: "Parcela de 50 hectáreas de soja. Última semana con déficit hídrico moderado y temperatura superior al promedio en 4°C."',
  telecom:       'Ej: "Zona residencial con 200 clientes activos muestra 40% de tickets de soporte por velocidad baja en las últimas 2 semanas."',
  insurance:     'Ej: "Solicitud de seguro de auto: conductor 24 años, primera póliza, vehículo deportivo 2022, zona urbana de alta siniestralidad."',
  media:         'Ej: "Artículo publicado hace 6 horas con 12K vistas pero solo 1.2% de tiempo de lectura. ¿Qué recomiendas para aumentar engagement?"',
  construction:  'Ej: "Proyecto de 18 meses lleva 9 meses ejecutados y ya consumió 62% del presupuesto. La estructura principal está al 45%."',
  energy:        'Ej: "Planta industrial con pico de consumo los martes entre 14:00-16:00 que supera el límite contratado y genera penalizaciones."',
}

const DEFAULT_PLACEHOLDER = 'Describe una situación real de tu organización y analízala con IA...'

interface SimulationChatProps {
  industryId: string
  interactionModel: InteractionModel
  appName: string
  colorAccent: string
  colorLight: string
  colorText: string
}

export default function SimulationChat({
  industryId,
  interactionModel,
  appName,
  colorAccent,
  colorLight,
  colorText,
}: SimulationChatProps) {
  const [input, setInput]           = useState('')
  const [response, setResponse]     = useState('')
  const [loading, setLoading]       = useState(false)
  const [done, setDone]             = useState(false)
  const [error, setError]           = useState('')
  const responseRef                 = useRef<HTMLDivElement>(null)
  const textareaRef                 = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (response && responseRef.current) {
      responseRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }
  }, [response])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!input.trim() || loading) return

    setLoading(true)
    setResponse('')
    setDone(false)
    setError('')

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          industry: industryId,
          interactionModel,
          appName,
          message: input.trim(),
        }),
      })

      if (!res.ok) {
        const text = await res.text()
        throw new Error(text || `Error ${res.status}`)
      }

      const reader = res.body!.getReader()
      const decoder = new TextDecoder()

      while (true) {
        const { done: streamDone, value } = await reader.read()
        if (streamDone) break
        setResponse((prev) => prev + decoder.decode(value, { stream: true }))
      }

      setDone(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al conectar con la IA')
    } finally {
      setLoading(false)
    }
  }

  function handleReset() {
    setInput('')
    setResponse('')
    setDone(false)
    setError('')
    textareaRef.current?.focus()
  }

  const placeholder = PLACEHOLDERS[industryId] ?? DEFAULT_PLACEHOLDER

  return (
    <div className="border-t border-slate-200 bg-gradient-to-b from-slate-50 to-white px-5 py-5">
      <div className="flex items-center gap-2 mb-3">
        <div className={`w-2 h-2 rounded-full animate-pulse ${loading ? 'bg-amber-400' : done ? 'bg-emerald-400' : 'bg-indigo-400'}`} />
        <h3 className="text-sm font-semibold text-slate-800">
          Prueba con un caso real tuyo
        </h3>
        <span className="text-xs text-slate-400 font-normal">— respuesta generada por IA en tiempo real</span>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={placeholder}
          rows={3}
          disabled={loading}
          className="w-full text-sm text-slate-700 placeholder:text-slate-400 bg-white border border-slate-200 rounded-xl px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition-all disabled:opacity-50"
          onKeyDown={(e) => {
            if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) handleSubmit(e as unknown as React.FormEvent)
          }}
        />

        <div className="flex items-center gap-2">
          <button
            type="submit"
            disabled={!input.trim() || loading}
            className={`flex-1 py-2.5 px-4 rounded-xl text-sm font-semibold text-white transition-all shadow-sm ${colorAccent} hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed`}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-3 h-3 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                Analizando...
              </span>
            ) : (
              '✦ Analizar con IA'
            )}
          </button>
          {(response || error) && (
            <button
              type="button"
              onClick={handleReset}
              className="py-2.5 px-3 rounded-xl text-xs text-slate-500 hover:text-slate-700 border border-slate-200 hover:border-slate-300 transition-all"
            >
              ↺ Nueva consulta
            </button>
          )}
          <span className="text-xs text-slate-400 hidden sm:block">⌘↵ para enviar</span>
        </div>
      </form>

      {error && (
        <div className="mt-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-xs text-red-700">
          ⚠ {error}
        </div>
      )}

      {(response || loading) && (
        <div
          ref={responseRef}
          className={`mt-4 rounded-xl border px-4 py-4 text-sm text-slate-700 leading-relaxed whitespace-pre-wrap ${colorLight} border-slate-200`}
        >
          <div className="flex items-center gap-1.5 mb-2.5">
            <span className="text-xs font-semibold text-slate-500">{appName}</span>
            <span className="text-xs text-slate-400">·</span>
            <span className={`text-xs font-medium ${colorText}`}>IA en tiempo real</span>
          </div>
          {response}
          {loading && (
            <span className="inline-block w-1.5 h-4 bg-indigo-400 animate-pulse ml-0.5 rounded-sm align-text-bottom" />
          )}
        </div>
      )}

      {done && (
        <div className="mt-4 rounded-xl border border-indigo-200 bg-indigo-50 px-4 py-3.5 flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <div className="flex-1">
            <p className="text-sm font-semibold text-indigo-900">
              ¿Quieres implementar esto en tu organización?
            </p>
            <p className="text-xs text-indigo-700 mt-0.5">
              Puedo ayudarte a diseñar e implementar soluciones de IA aplicada a tu contexto real.
            </p>
          </div>
          <a
            href={CONTACT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 py-2 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold transition-all shadow-sm whitespace-nowrap"
          >
            Agenda una consulta →
          </a>
        </div>
      )}
    </div>
  )
}
