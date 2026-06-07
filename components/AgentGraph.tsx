'use client'

import { useEffect, useState } from 'react'
import { getAgentGraph, type AgentNode } from '@/lib/agent-graph'

interface AgentGraphProps {
  industryId: string
  loading: boolean
  streamDone: boolean
}

type AgentState = 'pending' | 'loading' | 'done'

export default function AgentGraph({ industryId, loading, streamDone }: AgentGraphProps) {
  const config = getAgentGraph(industryId)
  const [orchestratorState, setOrchestratorState] = useState<AgentState>('pending')
  const [agentStates, setAgentStates] = useState<AgentState[]>(['pending', 'pending', 'pending'])

  // Al iniciar la carga: poner todos en 'loading' y agendar los timers escalonados.
  useEffect(() => {
    if (!loading) return

    setOrchestratorState('loading')
    setAgentStates(['loading', 'loading', 'loading'])

    const timers: NodeJS.Timeout[] = []
    config.agents.forEach((agent, idx) => {
      if (agent.completionMs > 0) {
        const t = setTimeout(() => {
          setAgentStates((prev) => {
            const next = [...prev]
            next[idx] = 'done'
            return next
          })
        }, agent.completionMs)
        timers.push(t)
      }
    })

    return () => timers.forEach(clearTimeout)
  }, [loading, config.agents])

  // Cuando el stream termina: marcar TODOS como 'done' (no se borra nada).
  useEffect(() => {
    if (!streamDone) return
    setAgentStates(['done', 'done', 'done'])
    setOrchestratorState('done')
  }, [streamDone])

  return (
    <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-6">
      {/* Orchestrator Node */}
      <div className="flex flex-col items-center gap-2 mb-6">
        <div className="flex items-center justify-center w-14 h-14 rounded-lg bg-indigo-600 text-white shadow-md">
          <span className="text-xl">🧠</span>
        </div>
        <div className="text-center">
          <h4 className="text-sm font-semibold text-slate-900">{config.orchestrator}</h4>
          <p className="text-xs text-slate-500 mt-0.5">
            {orchestratorState === 'loading' ? 'Distribuyendo análisis...' : 'Análisis completado'}
          </p>
        </div>
      </div>

      {/* Vertical Line from Orchestrator */}
      <div className="flex justify-center mb-4">
        <div className="w-0.5 h-6 bg-slate-300" />
      </div>

      {/* Horizontal Connector Line */}
      <div className="flex justify-around mb-6 relative h-0.5 bg-slate-300">
        {/* Three vertical drops */}
        <div className="absolute left-1/4 -translate-x-1/2 top-1/2 w-0.5 h-3 bg-slate-300 -translate-y-1/2" />
        <div className="absolute left-1/2 -translate-x-1/2 top-1/2 w-0.5 h-3 bg-slate-300 -translate-y-1/2" />
        <div className="absolute right-1/4 -translate-x-1/2 top-1/2 w-0.5 h-3 bg-slate-300 -translate-y-1/2" />
      </div>

      {/* Agent Nodes */}
      <div className="flex justify-around gap-4">
        {config.agents.map((agent, idx) => (
          <AgentCard key={idx} agent={agent} state={agentStates[idx]} />
        ))}
      </div>
    </div>
  )
}

interface AgentCardProps {
  agent: AgentNode
  state: AgentState
}

function AgentCard({ agent, state }: AgentCardProps) {
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
          <p className="text-xs text-slate-700 mt-3 pt-3 border-t border-slate-200 italic">{agent.finding}</p>
        )}
      </div>
    </div>
  )
}
