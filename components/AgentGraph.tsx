'use client'

import { useEffect, useRef, useState } from 'react'
import { getAgentGraph, type AgentNode } from '@/lib/agent-graph'

interface AgentGraphProps {
  industryId: string
  caseIndex: number
  genericFindings: boolean
  onComplete: () => void
}

type AgentState = 'pending' | 'loading' | 'done'

const T1 = 3000 // agente 1 completa a los 3s
const T2 = 6000 // agente 2 completa 3s después del agente 1
const T3 = 9000 // agente 3 y orquestador completan 3s después del agente 2

// Findings neutros cuando el usuario escribe su propio caso (no inventar datos).
const GENERIC_FINDINGS = [
  'Datos de tu caso procesados',
  'Variables clave identificadas',
  'Recomendación personalizada lista',
]

export default function AgentGraph({ industryId, caseIndex, genericFindings, onComplete }: AgentGraphProps) {
  const config = getAgentGraph(industryId)
  // La cascada arranca en 'loading' desde el primer render: fijarlo aquí en vez de
  // dentro del efecto evita un frame en 'pending' y un render en cascada.
  const [orchestratorState, setOrchestratorState] = useState<AgentState>('loading')
  const [agentStates, setAgentStates] = useState<AgentState[]>(['loading', 'loading', 'loading'])

  const completedRef = useRef(false)
  const timersRef = useRef<NodeJS.Timeout[]>([])
  const onCompleteRef = useRef(onComplete)
  useEffect(() => {
    onCompleteRef.current = onComplete
  })

  function markAgentDone(idx: number) {
    setAgentStates((prev) => {
      const next = [...prev]
      next[idx] = 'done'
      return next
    })
  }

  function completeGraph() {
    if (completedRef.current) return
    completedRef.current = true
    setAgentStates(['done', 'done', 'done'])
    setOrchestratorState('done')
    onCompleteRef.current()
  }

  // Animación por tiempos fijos. Se programa al montar el grafo y es deliberadamente
  // independiente del estado del stream: si éste termina antes, el grafo conserva su
  // ritmo visual y completa igual en T3.
  useEffect(() => {
    timersRef.current.forEach(clearTimeout)
    timersRef.current = []
    completedRef.current = false

    timersRef.current = [
      setTimeout(() => markAgentDone(0), T1),
      setTimeout(() => markAgentDone(1), T2),
      setTimeout(() => completeGraph(), T3),
    ]
    return () => {
      timersRef.current.forEach(clearTimeout)
      timersRef.current = []
    }
  }, [])

  return (
    <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-6">
      {/* Orchestrator Node */}
      <div className="flex flex-col items-center gap-2 mb-6">
        <div className={`flex items-center justify-center w-14 h-14 rounded-lg text-white shadow-md transition-colors ${
          orchestratorState === 'done' ? 'bg-emerald-600' : 'bg-indigo-600'
        }`}>
          <span className="text-xl">🧠</span>
        </div>
        <div className="text-center">
          <h4 className={`text-sm font-bold transition-colors ${
            orchestratorState === 'done' ? 'text-emerald-700' : 'text-slate-900'
          }`}>
            {config.orchestrator}
          </h4>
          <p className={`text-xs mt-0.5 transition-colors ${
            orchestratorState === 'done' ? 'text-emerald-700 font-semibold' : 'text-slate-500'
          }`}>
            {orchestratorState === 'done' ? '✓ Análisis completado' : 'Distribuyendo análisis...'}
          </p>
        </div>
      </div>

      {/* Vertical Line from Orchestrator */}
      <div className="flex justify-center mb-4">
        <div className="w-0.5 h-6 bg-slate-300" />
      </div>

      {/* Horizontal Connector Line */}
      <div className="flex justify-around mb-6 relative h-0.5 bg-slate-300">
        <div className="absolute left-1/4 -translate-x-1/2 top-1/2 w-0.5 h-3 bg-slate-300 -translate-y-1/2" />
        <div className="absolute left-1/2 -translate-x-1/2 top-1/2 w-0.5 h-3 bg-slate-300 -translate-y-1/2" />
        <div className="absolute right-1/4 -translate-x-1/2 top-1/2 w-0.5 h-3 bg-slate-300 -translate-y-1/2" />
      </div>

      {/* Agent Nodes */}
      <div className="flex justify-around gap-4">
        {config.agents.map((agent, idx) => (
          <AgentCard
            key={idx}
            agent={agent}
            state={agentStates[idx]}
            finding={genericFindings ? GENERIC_FINDINGS[idx] : (agent.findings[caseIndex] ?? agent.findings[0])}
          />
        ))}
      </div>
    </div>
  )
}

interface AgentCardProps {
  agent: AgentNode
  state: AgentState
  finding: string
}

function AgentCard({ agent, state, finding }: AgentCardProps) {
  return (
    <div className="flex-1 max-w-xs">
      <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
        {/* Header with icon and name */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-2xl">{agent.icon}</span>
          <h5 className="text-sm font-semibold text-slate-900">{agent.name}</h5>
        </div>

        {/* Tool name */}
        <p className="text-xs text-slate-500 mb-3 font-mono">{agent.tool}</p>

        {/* Status */}
        <div className="flex items-center justify-center gap-2 py-2">
          {state === 'loading' && (
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-pulse" />
              <div className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
              <div className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
            </div>
          )}
          {state === 'done' && (
            <div className="flex items-center gap-2">
              <span className="text-green-600 text-lg">✓</span>
              <span className="text-xs font-medium text-green-600">Completado</span>
            </div>
          )}
          {state === 'pending' && <span className="text-xs text-slate-400">Pendiente</span>}
        </div>

        {/* Finding (only show when done) */}
        {state === 'done' && (
          <p className="text-xs text-slate-700 mt-3 pt-3 border-t border-slate-200 italic">{finding}</p>
        )}
      </div>
    </div>
  )
}
