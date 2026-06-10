'use client'

import { useState, useRef, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import type { InteractionModel } from '@/types/assessment'
import { buildSystemPrompt } from '@/lib/simulation-prompts'
import { getCases } from '@/lib/simulation-cases'
import AgentGraph from './AgentGraph'

const TEXTAREA_PLACEHOLDER = 'Describe una situación real de tu organización y analízala con IA...'

function normalizeMarkdownTables(text: string): string {
  return text
    .split('\n')
    .map((line) => {
      if (!line.includes('|')) return line
      const cells = line
        .split('|')
        .map((cell) => cell.trim())
        .filter((cell) => cell && !/^-+$/.test(cell.replace(/\s/g, '')))

      if (cells.length < 2) return line.replace(/\|/g, ' · ')
      return `- ${cells.join(' · ')}`
    })
    .join('\n')
}

interface SimulationChatProps {
  industryId: string
  interactionModel: InteractionModel
  appName: string
  colorAccent: string
  colorLight: string
  colorText: string
  onSchedule?: () => void
}

export default function SimulationChat({
  industryId,
  interactionModel,
  appName,
  colorAccent,
  colorLight,
  colorText,
  onSchedule,
}: SimulationChatProps) {
  const cases = getCases(industryId)
  const [caseIndex, setCaseIndex] = useState(0)
  const [input, setInput]       = useState(cases[0])
  const [response, setResponse] = useState('')
  const [loading, setLoading]   = useState(false)
  const [done, setDone]         = useState(false)
  const [agentsComplete, setAgentsComplete] = useState(false)
  const [responseVisible, setResponseVisible] = useState(false)
  const [isCustomCase, setIsCustomCase] = useState(false)
  const [runId, setRunId]       = useState(0)
  const [error, setError]       = useState('')
  const responseRef             = useRef<HTMLDivElement>(null)
  const graphRef                = useRef<HTMLDivElement>(null)
  const textareaRef             = useRef<HTMLTextAreaElement>(null)
  const displayedResponse       = normalizeMarkdownTables(response)

  // Al iniciar el análisis, llevar la vista hacia el grafo de agentes.
  useEffect(() => {
    if (loading && graphRef.current) {
      graphRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [loading])

  // Cuando el orquestador termina, esperar ~1s antes de revelar la respuesta.
  useEffect(() => {
    if (agentsComplete && response) {
      const t = setTimeout(() => {
        setResponseVisible(true)
      }, 1000)
      return () => clearTimeout(t)
    }
  }, [agentsComplete, response])

  // La respuesta aparece y el scroll ocurre en el mismo ciclo visual.
  useEffect(() => {
    if (!responseVisible) return
    requestAnimationFrame(() => {
      responseRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }, [responseVisible])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!input.trim() || loading) return

    // Si el usuario editó el caso predefinido, los agentes usan findings genéricos.
    setIsCustomCase(input.trim() !== cases[caseIndex]?.trim())
    setRunId((r) => r + 1) // fuerza remount del grafo para reiniciar la animación
    setLoading(true)
    setResponse('')
    setDone(false)
    setAgentsComplete(false)
    setResponseVisible(false)
    setError('')

    try {
      const systemPrompt = buildSystemPrompt(industryId, interactionModel, appName)

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: input.trim() },
          ],
        }),
      })

      if (!res.ok) {
        const text = await res.text()
        throw new Error(`Error ${res.status}: ${text}`)
      }

      const reader = res.body!.getReader()
      const decoder = new TextDecoder()
      let buffer = ''

      while (true) {
        const { done: streamDone, value } = await reader.read()
        if (streamDone) break
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
            if (content) setResponse((prev) => prev + content)
          } catch { /* chunk parcial */ }
        }
      }

      setDone(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al conectar con la IA')
    } finally {
      setLoading(false)
    }
  }

  function handleReset() {
    const nextIndex = (caseIndex + 1) % cases.length
    setCaseIndex(nextIndex)
    setInput(cases[nextIndex])
    setResponse('')
    setDone(false)
    setAgentsComplete(false)
    setResponseVisible(false)
    setError('')
    textareaRef.current?.focus()
  }

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
          placeholder={TEXTAREA_PLACEHOLDER}
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
          {(responseVisible || error) && (
            <button
              type="button"
              onClick={handleReset}
              className="py-2.5 px-3 rounded-xl text-xs text-slate-500 hover:text-slate-700 border border-slate-200 hover:border-slate-300 transition-all"
            >
              ↺ Nueva consulta
            </button>
          )}
        </div>
      </form>

      {error && (
        <div className="mt-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-xs text-red-700">
          ⚠ {error}
        </div>
      )}

      {(loading || done) && (
        <div ref={graphRef} className="scroll-mt-20">
          <AgentGraph
            key={runId}
            industryId={industryId}
            loading={loading}
            streamDone={done}
            caseIndex={caseIndex}
            genericFindings={isCustomCase}
            onComplete={() => setAgentsComplete(true)}
          />
        </div>
      )}

      {responseVisible && response && (
        <div
          ref={responseRef}
          className={`mt-4 scroll-mt-20 rounded-xl border px-4 py-4 text-sm text-slate-700 leading-relaxed ${colorLight} border-slate-200`}
        >
          <div className="flex items-center gap-1.5 mb-2.5">
            <span className="text-xs font-semibold text-slate-500">{appName}</span>
            <span className="text-xs text-slate-400">·</span>
            <span className={`text-xs font-medium ${colorText}`}>Síntesis del orquestador</span>
          </div>
          <div className="space-y-2">
            <ReactMarkdown
              components={{
                p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                strong: ({ children }) => <strong className="font-semibold text-slate-900">{children}</strong>,
                ul: ({ children }) => <ul className="list-disc pl-5 space-y-1 mb-2">{children}</ul>,
                ol: ({ children }) => <ol className="list-decimal pl-5 space-y-1 mb-2">{children}</ol>,
                li: ({ children }) => <li className="text-slate-700">{children}</li>,
                h1: ({ children }) => <h4 className="font-semibold text-slate-900 mt-3 mb-1">{children}</h4>,
                h2: ({ children }) => <h4 className="font-semibold text-slate-900 mt-3 mb-1">{children}</h4>,
                h3: ({ children }) => <h4 className="font-semibold text-slate-900 mt-3 mb-1">{children}</h4>,
              }}
            >
              {displayedResponse}
            </ReactMarkdown>
          </div>
        </div>
      )}

      {responseVisible && (
        <div className="mt-4 rounded-xl border border-indigo-200 bg-indigo-50 px-4 py-3.5 flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <div className="flex-1">
            <p className="text-sm font-semibold text-indigo-900">
              ¿Quieres implementar esto en tu organización?
            </p>
            <p className="text-xs text-indigo-700 mt-0.5">
              Puedo ayudarte a diseñar e implementar soluciones de IA aplicada a tu contexto real.
            </p>
          </div>
          <button
            type="button"
            onClick={onSchedule}
            className="shrink-0 py-2 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold transition-all shadow-sm whitespace-nowrap"
          >
            Agenda una consulta →
          </button>
        </div>
      )}
    </div>
  )
}
