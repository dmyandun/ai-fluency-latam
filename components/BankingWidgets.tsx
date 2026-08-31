'use client'

import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import type { SimVisualWidget } from '@/lib/simulations'
import type { InteractionModel } from '@/types/assessment'

// Arranca la animación solo cuando el elemento entra al viewport — y solo una vez.
function useStartOnVisible<T extends Element>(): [React.RefObject<T | null>, boolean] {
  const ref = useRef<T | null>(null)
  const [started, setStarted] = useState(false)
  useEffect(() => {
    if (started) return
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setStarted(true)
            obs.disconnect()
            break
          }
        }
      },
      { threshold: 0.15 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [started])
  return [ref, started]
}

// ════════════════════════════════════════════════════════════════════════════
// Bibliografía consolidada por patrón — consumida por SimulationApp
// ════════════════════════════════════════════════════════════════════════════

export const BANKING_CASES_BY_MODEL: Record<InteractionModel, { cases: string[] }> = {
  automation: {
    cases: [
      'HSBC — Dynamic Risk Assessment AML (con Google Cloud)',
      'JPMorgan Chase — fraud & AML detection',
      'Commonwealth Bank of Australia — scam prevention',
      'FinCEN — graph analytics patterns',
    ],
  },
  agency: {
    cases: [
      'JPMorgan Chase — COiN (revisión de contratos)',
      'Nubank — nuFormer (foundation model crediticio)',
      'Goldman Sachs — GS AI Assistant',
      'McKinsey — agentic underwriting patterns 2025',
      'Nubank — cobranza autónoma vía WhatsApp',
      'Mercado Pago — recuperación de cartera',
      'BBVA — chatbot de cobranza',
      'Klarna — agentic recovery 2025',
    ],
  },
  augmentation: {
    cases: [
      'Bradesco — BIA con GenAI',
      'Wells Fargo — Fargo AI Assistant',
      'DBS Bank — nudges personalizados',
      'NatWest — Cora+',
      'Capital One — Eno',
    ],
  },
}

// ════════════════════════════════════════════════════════════════════════════
// HoverExplainer — tarjeta flotante que aparece al pasar el cursor
// ════════════════════════════════════════════════════════════════════════════

interface HoverExplainerProps {
  title: string
  body: string
  position?: 'top' | 'bottom' | 'right'
  children: ReactNode
  className?: string
}

function HoverExplainer({ title, body, position = 'top', children, className = '' }: HoverExplainerProps) {
  const posClasses =
    position === 'top'    ? 'bottom-full mb-2 left-1/2 -translate-x-1/2' :
    position === 'right'  ? 'left-full ml-2 top-1/2 -translate-y-1/2' :
                            'top-full mt-2 left-1/2 -translate-x-1/2'
  return (
    <div className={`relative group ${className}`}>
      {children}
      <div className={`pointer-events-none absolute z-30 w-64 ${posClasses} opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200`}>
        <div className="bg-slate-900 text-white rounded-lg shadow-2xl p-3 border border-slate-700">
          <p className="text-[11px] font-bold mb-1 flex items-center gap-1.5">
            <span className="text-emerald-400">💡</span> {title}
          </p>
          <p className="text-[11px] text-slate-300 leading-relaxed">{body}</p>
        </div>
      </div>
    </div>
  )
}

interface BankingWidgetProps {
  widget: SimVisualWidget
}

export default function BankingWidget({ widget }: BankingWidgetProps) {
  if (widget.kind === 'amlInvestigationGraph') return <AmlInvestigationGraph />
  if (widget.kind === 'agencyShowcase')        return <AgencyShowcase />
  if (widget.kind === 'clientCopilotSplit')    return <ClientCopilotSplit />
  return null
}

// ════════════════════════════════════════════════════════════════════════════
// WIDGET 1 — Grafo de investigación AML (variante automation)
// ════════════════════════════════════════════════════════════════════════════

interface GraphNode {
  id: string
  x: number
  y: number
  label: string
  kind: 'central' | 'first' | 'cluster' | 'normal'
  revealAt: number
}

interface GraphEdge {
  from: string
  to: string
  amount: string
  revealAt: number
}

const NODES: GraphNode[] = [
  { id: 'C',  x: 50, y: 48, label: 'Cuenta-001',  kind: 'central', revealAt: 0 },
  { id: 'A1', x: 22, y: 22, label: 'Cuenta-217',  kind: 'first',   revealAt: 1 },
  { id: 'A2', x: 78, y: 22, label: 'Cuenta-844',  kind: 'first',   revealAt: 1 },
  { id: 'A3', x: 22, y: 76, label: 'Cuenta-301',  kind: 'first',   revealAt: 1 },
  { id: 'A4', x: 78, y: 76, label: 'Cuenta-559',  kind: 'first',   revealAt: 1 },
  { id: 'B1', x: 8,  y: 8,  label: 'Cuenta-918',  kind: 'cluster', revealAt: 2 },
  { id: 'B2', x: 92, y: 8,  label: 'Cuenta-104',  kind: 'cluster', revealAt: 2 },
  { id: 'B3', x: 8,  y: 92, label: 'Cuenta-672',  kind: 'cluster', revealAt: 2 },
  { id: 'B4', x: 92, y: 92, label: 'Cuenta-238',  kind: 'cluster', revealAt: 2 },
  { id: 'N1', x: 50, y: 8,  label: 'Cuenta-456',  kind: 'normal',  revealAt: 3 },
  { id: 'N2', x: 50, y: 92, label: 'Cuenta-789',  kind: 'normal',  revealAt: 3 },
]

const EDGES: GraphEdge[] = [
  { from: 'C',  to: 'A1', amount: '$9.8K', revealAt: 1 },
  { from: 'C',  to: 'A2', amount: '$9.9K', revealAt: 1 },
  { from: 'C',  to: 'A3', amount: '$9.7K', revealAt: 1 },
  { from: 'C',  to: 'A4', amount: '$9.9K', revealAt: 1 },
  { from: 'A1', to: 'B1', amount: '$9.6K', revealAt: 2 },
  { from: 'A2', to: 'B2', amount: '$9.8K', revealAt: 2 },
  { from: 'A3', to: 'B3', amount: '$9.7K', revealAt: 2 },
  { from: 'A4', to: 'B4', amount: '$9.9K', revealAt: 2 },
  { from: 'A1', to: 'A2', amount: '$2K',   revealAt: 3 },
  { from: 'C',  to: 'N1', amount: '$240',  revealAt: 3 },
  { from: 'C',  to: 'N2', amount: '$180',  revealAt: 3 },
]

const FINDINGS = [
  { tick: 1, text: 'Cuenta-001: 4 transferencias de $9.8K en 12 minutos',     tone: 'amber' },
  { tick: 1, text: 'Patrón structuring — montos justo bajo el umbral $10K',  tone: 'red'   },
  { tick: 2, text: 'Expansión 2do grado: 4 cuentas receptoras descubiertas', tone: 'amber' },
  { tick: 2, text: 'Cluster identificado — 9 cuentas vinculadas',             tone: 'red'   },
  { tick: 3, text: 'Reporte UAF generado · caso #AML-8829 abierto',           tone: 'green' },
]

function AmlInvestigationGraph() {
  const [containerRef, started] = useStartOnVisible<HTMLDivElement>()
  const [tick, setTick] = useState(0)
  const [accounts, setAccounts] = useState(284_140)
  const [cases, setCases] = useState(17)

  useEffect(() => {
    if (!started || tick >= 4) return
    const id = setTimeout(() => {
      setTick((t) => t + 1)
      setAccounts((a) => a + Math.floor(Math.random() * 80) + 20)
      // El caso extra se suma en el mismo tick que cierra la animación: derivarlo
      // en otro efecto lo duplicaba bajo StrictMode.
      if (tick + 1 === 4) setCases((c) => c + 1)
    }, 2400)
    return () => clearTimeout(id)
  }, [started, tick])

  const nodeById = (id: string) => NODES.find((n) => n.id === id)!
  const nodeColor = (kind: GraphNode['kind']) => {
    if (kind === 'central') return { fill: '#dc2626', stroke: '#991b1b' }
    if (kind === 'cluster') return { fill: '#f97316', stroke: '#c2410c' }
    if (kind === 'first')   return { fill: '#fb923c', stroke: '#ea580c' }
    return { fill: '#cbd5e1', stroke: '#94a3b8' }
  }

  return (
    <div ref={containerRef} className="space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between bg-slate-900 text-white rounded-xl px-4 py-2.5">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
          <span className="text-xs font-semibold">Investigador AML autónomo</span>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <span><b className="text-red-300">{accounts.toLocaleString()}</b> cuentas monitoreadas</span>
          <span><b className="text-red-300">{cases}</b> casos hoy</span>
        </div>
      </div>

      {/* Grafo + panel de hallazgos */}
      <div className="grid grid-cols-5 gap-3">
        {/* SVG Graph */}
        <div className="col-span-3 bg-slate-50 rounded-xl border border-slate-200 p-3 relative">
          <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
            <p className="text-[10px] uppercase tracking-wide text-slate-400">Red de cuentas relacionadas</p>
            <div className="flex gap-1.5">
              <HoverExplainer
                title="Cuenta sospechosa central"
                body="Aquí empieza la investigación. La IA detectó múltiples transferencias de $9.8K en pocos minutos — justo bajo el umbral de reporte de $10K. Es el patrón clásico de structuring (fraccionamiento) para evadir detección."
                position="bottom"
              >
                <span className="inline-flex items-center gap-1 bg-red-100 text-red-700 px-2 py-0.5 rounded-full text-[10px] font-semibold border border-red-200 cursor-help">
                  <span className="w-2 h-2 rounded-full bg-red-600" /> Sospechosa
                </span>
              </HoverExplainer>
              <HoverExplainer
                title="Primer grado de conexión"
                body="Cuentas que reciben directamente de la sospechosa. La IA expande automáticamente la red sin intervención humana — antes esto tomaba semanas de investigación manual cruzando datos de varios sistemas."
                position="bottom"
              >
                <span className="inline-flex items-center gap-1 bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full text-[10px] font-semibold border border-orange-200 cursor-help">
                  <span className="w-2 h-2 rounded-full bg-orange-500" /> 1er grado
                </span>
              </HoverExplainer>
              <HoverExplainer
                title="Cluster (red de lavado)"
                body="Segundo grado de conexión. Cuando la IA ve $9.6K-$9.9K saliendo de varias cuentas hacia un mismo grupo, identifica el cluster como red de lavado y dispara el reporte UAF (Unidad de Análisis Financiero) automáticamente."
                position="bottom"
              >
                <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full text-[10px] font-semibold border border-amber-200 cursor-help">
                  <span className="w-2 h-2 rounded-full bg-orange-700" /> Cluster
                </span>
              </HoverExplainer>
            </div>
          </div>
          <svg viewBox="0 0 100 100" className="w-full h-[320px]" preserveAspectRatio="xMidYMid meet">
            {/* Edges — se "dibujan" desde el origen al destino cuando aparecen */}
            {EDGES.map((e, i) => {
              if (e.revealAt > tick) return null
              const from = nodeById(e.from)
              const to = nodeById(e.to)
              const isHighlighted = e.revealAt <= 2
              const length = Math.hypot(to.x - from.x, to.y - from.y)
              const justAppeared = e.revealAt === tick
              return (
                <g key={`${i}-${tick}`}>
                  <line
                    x1={from.x} y1={from.y} x2={to.x} y2={to.y}
                    stroke={isHighlighted ? '#dc2626' : '#cbd5e1'}
                    strokeWidth={isHighlighted ? '0.55' : '0.3'}
                    strokeDasharray={length}
                    strokeDashoffset={length}
                  >
                    {justAppeared ? (
                      <animate
                        attributeName="stroke-dashoffset"
                        from={length} to="0"
                        dur="1.2s"
                        fill="freeze"
                      />
                    ) : (
                      <animate
                        attributeName="stroke-dashoffset"
                        from="0" to="0"
                        dur="0.01s"
                        fill="freeze"
                      />
                    )}
                  </line>
                  {isHighlighted && (
                    <text
                      x={(from.x + to.x) / 2} y={(from.y + to.y) / 2 - 1}
                      fill="#991b1b" fontSize="2.2" fontWeight="bold"
                      textAnchor="middle"
                      opacity={justAppeared ? '0' : '1'}
                    >
                      {justAppeared && (
                        <animate attributeName="opacity" from="0" to="1" begin="1.0s" dur="0.4s" fill="freeze" />
                      )}
                      {e.amount}
                    </text>
                  )}
                </g>
              )
            })}
            {/* Nodes */}
            {NODES.map((n) => {
              if (n.revealAt > tick) return null
              const { fill, stroke } = nodeColor(n.kind)
              const radius = n.kind === 'central' ? 4 : 3
              const justAppeared = n.revealAt === tick && n.kind !== 'central'
              return (
                <g key={`${n.id}-${tick}`}>
                  {n.kind !== 'normal' && (
                    <circle cx={n.x} cy={n.y} r={radius + 1.5} fill={fill} opacity="0.3" className="animate-pulse" />
                  )}
                  <circle cx={n.x} cy={n.y} r={radius} fill={fill} stroke={stroke} strokeWidth="0.5" opacity={justAppeared ? '0' : '1'}>
                    {justAppeared && (
                      <animate attributeName="opacity" from="0" to="1" begin="1.0s" dur="0.3s" fill="freeze" />
                    )}
                    {justAppeared && (
                      <animate attributeName="r" from="0" to={radius} begin="1.0s" dur="0.3s" fill="freeze" />
                    )}
                  </circle>
                  <text x={n.x} y={n.y + radius + 3} fill="#475569" fontSize="2.2" textAnchor="middle" opacity={justAppeared ? '0' : '1'}>
                    {justAppeared && (
                      <animate attributeName="opacity" from="0" to="1" begin="1.2s" dur="0.3s" fill="freeze" />
                    )}
                    {n.label}
                  </text>
                </g>
              )
            })}
            {/* Cluster boundary */}
            {tick >= 3 && (
              <rect
                x="3" y="3" width="94" height="94"
                fill="none" stroke="#dc2626" strokeWidth="0.4" strokeDasharray="2 2"
                rx="3" className="animate-pulse"
              />
            )}
          </svg>
          {tick >= 4 && (
            <div className="absolute bottom-3 left-3 right-3 bg-emerald-600 text-white rounded-lg px-3 py-2 text-xs font-bold animate-fade-in flex items-center gap-2">
              <span>📤</span>
              <span>Reporte UAF generado · Caso #AML-8829</span>
            </div>
          )}
        </div>

        {/* Hallazgos del agente */}
        <div className="col-span-2 bg-slate-900 rounded-xl p-3 font-mono text-[11px] h-[300px] overflow-hidden">
          <p className="text-[9px] uppercase tracking-wide text-slate-400 mb-2">Hallazgos del agente</p>
          <div className="space-y-1.5">
            {FINDINGS.map((f, i) => {
              const visible = f.tick <= tick
              const color = f.tone === 'red' ? 'text-red-300' : f.tone === 'amber' ? 'text-amber-300' : 'text-emerald-300'
              return (
                <div
                  key={i}
                  className={`flex gap-2 transition-opacity duration-500 ${visible ? 'opacity-100 animate-fade-in' : 'opacity-0'}`}
                >
                  <span className="text-slate-500 shrink-0">›</span>
                  <span className={color}>{f.text}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Métricas de impacto */}
      <div className="grid grid-cols-3 gap-3">
        <ImpactPill label="Falsos positivos AML" value="-60%" tone="emerald" />
        <ImpactPill label="Tiempo de detección" value="semanas → 8 días" tone="emerald" />
        <ImpactPill label="Transacciones sospechosas" value="+50% interceptadas" tone="emerald" />
      </div>

    </div>
  )
}

// ════════════════════════════════════════════════════════════════════════════
// WIDGET 2 — Showcase agency (tabs: Underwriting + Cobranza)
// ════════════════════════════════════════════════════════════════════════════

function AgencyShowcase() {
  return (
    <div className="space-y-6">
      <section>
        <h4 className="text-xs font-bold uppercase tracking-wide text-violet-700 mb-2 flex items-center gap-2">
          <span className="text-base">🕸️</span> Escenario 1 — Underwriting multi-agente
        </h4>
        <MultiAgentUnderwriting />
      </section>
      <section>
        <h4 className="text-xs font-bold uppercase tracking-wide text-emerald-700 mb-2 flex items-center gap-2">
          <span className="text-base">💬</span> Escenario 2 — Cobranza autónoma
        </h4>
        <AutonomousCollectionChat />
      </section>
    </div>
  )
}

// ──────── 2a · Multi-agente para underwriting ─────────────────────────────

interface SubAgent {
  id: string
  icon: string
  name: string
  job: string
  color: string
}

const SUB_AGENTS: Array<SubAgent & { explain: string }> = [
  { id: 'data',       icon: '📊', name: 'Datos',      job: 'Buró + estados financieros',      color: 'blue',    explain: 'Este agente reemplaza al analista junior que pasaba 2 horas recopilando datos de buró, estados financieros y consultas externas. La IA cruza 11 fuentes en 8 segundos y entrega un dataset limpio al siguiente agente.' },
  { id: 'risk',       icon: '⚖️', name: 'Riesgo',     job: 'Ratios + simulación de estrés',  color: 'amber',   explain: 'Calcula ratios financieros (DSCR, deuda/EBITDA) y simula escenarios de estrés (subidas de tasa, recesión). Antes lo hacía un analista senior con Excel — ahora se hace en segundos con backtesting sobre miles de empresas similares.' },
  { id: 'compliance', icon: '🛡️', name: 'Compliance', job: 'AML + SBS + sanciones',           color: 'emerald', explain: 'Verifica listas PEP, OFAC y normativas locales (SBS, CNBV, Superfinanciera). La IA detecta riesgos ocultos como deudas vencidas de directores en otras instituciones — algo que un humano tardaría días en cruzar.' },
  { id: 'decision',   icon: '🎯', name: 'Decisión',   job: 'Tasa + plazo + garantía',         color: 'violet',  explain: 'Agrega las señales de los 3 agentes anteriores y propone condiciones óptimas (tasa, plazo, garantía). Optimiza el riesgo-retorno contra la política del banco. La decisión final puede aprobarse automáticamente o escalarse al comité.' },
]

const AGENT_LOG = [
  { from: 'Datos',      text: 'Buró consultado — score 720, sin atrasos' },
  { from: 'Datos',      text: 'EBITDA +18% YoY · 11 fuentes consolidadas' },
  { from: 'Datos',      text: '→ handoff a Riesgo' },
  { from: 'Riesgo',     text: 'DSCR 1.42 · deuda/EBITDA 2.1x dentro de política' },
  { from: 'Riesgo',     text: 'Sobrevive a +400 bps en simulación de estrés' },
  { from: 'Riesgo',     text: '→ handoff a Compliance' },
  { from: 'Compliance', text: 'AML/OFAC limpio para empresa y representantes' },
  { from: 'Compliance', text: '⚠ Director X con deuda vencida en otra institución' },
  { from: 'Compliance', text: '→ handoff a Decisión con advertencia' },
  { from: 'Decisión',   text: 'Score compuesto 762 · riesgo BAJO' },
  { from: 'Decisión',   text: 'Aprobado · 9.8% · 48m · garantía hipotecaria' },
]

function MultiAgentUnderwriting() {
  const [containerRef, started] = useStartOnVisible<HTMLDivElement>()
  const [step, setStep] = useState(0)
  const MAX_STEP = SUB_AGENTS.length + 3

  useEffect(() => {
    if (!started || step >= MAX_STEP) return
    const id = setTimeout(() => setStep((s) => s + 1), 2200)
    return () => clearTimeout(id)
  }, [started, step, MAX_STEP])

  const agentStatus = (i: number): 'idle' | 'working' | 'done' => {
    if (step > i + 1) return 'done'
    if (step === i + 1 || step === i) return 'working'
    return 'idle'
  }

  const completed = step >= SUB_AGENTS.length + 1

  return (
    <div ref={containerRef} className="space-y-3">
      <div className="flex items-center justify-between bg-violet-900 text-white rounded-xl px-4 py-2 text-xs">
        <span className="font-semibold">🕸️ Orquestación · 4 agentes</span>
        <span>90 s end-to-end · <b className="text-violet-200">vs 4.5 h humano</b></span>
      </div>

      <div className="bg-slate-50 rounded-xl border border-slate-200 p-3 flex items-center justify-between text-xs">
        <span className="font-semibold text-slate-700">
          <span className="font-mono text-violet-700">#CR-4821</span> · Constructora DEF · $1.2M · 48m
        </span>
        <span className="bg-violet-100 text-violet-700 px-2 py-0.5 rounded-full font-semibold">
          Crédito comercial
        </span>
      </div>

      {/* Flujo de agentes */}
      <div className="bg-white rounded-xl border border-slate-200 p-3">
        <div className="flex items-center gap-1.5">
          {SUB_AGENTS.map((agent, i) => {
            const status = agentStatus(i)
            const colorMap: Record<string, { border: string; bg: string; dot: string }> = {
              blue:    { border: 'border-blue-400',    bg: 'bg-blue-50',    dot: 'bg-blue-500'    },
              amber:   { border: 'border-amber-400',   bg: 'bg-amber-50',   dot: 'bg-amber-500'   },
              emerald: { border: 'border-emerald-400', bg: 'bg-emerald-50', dot: 'bg-emerald-500' },
              violet:  { border: 'border-violet-400',  bg: 'bg-violet-50',  dot: 'bg-violet-500'  },
            }
            const c = colorMap[agent.color]
            return (
              <div key={agent.id} className="flex-1 flex items-center">
                <HoverExplainer
                  title={`Agente ${agent.name} — ¿qué resuelve?`}
                  body={agent.explain}
                  position="bottom"
                  className="flex-1"
                >
                  <div
                    className={`rounded-lg border-2 transition-all duration-500 px-2 py-2 text-center cursor-help ${
                      status === 'done'    ? `${c.border} ${c.bg}` :
                      status === 'working' ? `${c.border} ${c.bg} shadow-md scale-105 ring-2 ring-violet-200` :
                      'border-slate-200 bg-white opacity-50'
                    }`}
                  >
                    <div className="text-lg leading-none mb-0.5">{agent.icon}</div>
                    <p className="text-[10px] font-bold text-slate-700 leading-tight">{agent.name}</p>
                    <p className="text-[9px] text-slate-500 leading-tight">{agent.job}</p>
                    <div className="flex items-center justify-center gap-1 mt-1">
                      {status === 'done'    && <span className="text-[9px] font-bold text-emerald-600">✓</span>}
                      {status === 'working' && <span className={`w-1.5 h-1.5 rounded-full ${c.dot} animate-pulse`} />}
                      {status === 'idle'    && <span className="text-[9px] text-slate-300">—</span>}
                    </div>
                  </div>
                </HoverExplainer>
                {i < SUB_AGENTS.length - 1 && (
                  <div className={`w-3 h-0.5 transition-colors duration-500 ${agentStatus(i) === 'done' ? 'bg-violet-400' : 'bg-slate-200'}`} />
                )}
              </div>
            )
          })}
        </div>

        <div className="mt-3 flex justify-center">
          <div className={`rounded-xl px-4 py-1.5 transition-all duration-500 ${
            completed ? 'bg-emerald-100 border-2 border-emerald-400' : 'bg-slate-100 border-2 border-dashed border-slate-300 opacity-60'
          }`}>
            <p className={`text-xs font-bold ${completed ? 'text-emerald-700' : 'text-slate-500 italic'}`}>
              {completed ? '✅ APROBADO · 9.8% · 48 meses · Hipotecaria' : 'esperando decisión final...'}
            </p>
          </div>
        </div>
      </div>

      {/* Bitácora — altura amplia para mostrar las 11 líneas sin scroll */}
      <div className="bg-slate-900 rounded-xl p-4 font-mono text-[11px] min-h-[320px]">
        <p className="text-[9px] uppercase tracking-wide text-slate-400 mb-3">Bitácora de orquestación</p>
        <div className="space-y-1.5">
          {AGENT_LOG.map((line, i) => {
            const visibleUpTo = Math.min(step * 2 + 1, AGENT_LOG.length)
            const visible = i < Math.max(visibleUpTo, 1)
            const colorByAgent: Record<string, string> = {
              Datos: 'text-blue-300', Riesgo: 'text-amber-300', Compliance: 'text-emerald-300', Decisión: 'text-violet-300',
            }
            return (
              <div key={i} className={`flex gap-2 transition-opacity duration-500 ${visible ? 'opacity-100 animate-fade-in' : 'opacity-0'}`}>
                <span className="text-slate-500">›</span>
                <span className={`font-semibold w-24 shrink-0 ${colorByAgent[line.from] ?? 'text-slate-300'}`}>{line.from}</span>
                <span className="text-slate-200">{line.text}</span>
              </div>
            )
          })}
        </div>
      </div>

    </div>
  )
}

// ──────── 2b · Chat de cobranza autónoma ──────────────────────────────────

interface ChatMessage {
  from: 'agent' | 'client'
  text: string
  showAt: number
}

const CHAT_SCRIPT: ChatMessage[] = [
  { from: 'agent',  text: 'Hola Juan 👋 Soy el asistente de Banco BankCore. Veo que tu cuota de junio quedó pendiente. ¿Puedo ayudarte?', showAt: 0 },
  { from: 'client', text: 'Hola. Perdí mi trabajo el mes pasado y no pude pagar 😔', showAt: 1 },
  { from: 'agent',  text: 'Entiendo, lamento la situación. Puedo ofrecerte 3 opciones flexibles, todas sin afectar tu historial:', showAt: 2 },
  { from: 'agent',  text: '1) Diferir 2 meses sin interés\n2) Refinanciar a 24 meses (-30% cuota)\n3) Acuerdo de pago mínimo este mes + revisión', showAt: 3 },
  { from: 'client', text: 'La opción 2 me serviría', showAt: 4 },
  { from: 'agent',  text: '✅ Listo. Tu nueva cuota será $182/mes por 24 meses. Te envío el contrato a tu correo ahora.', showAt: 5 },
  { from: 'client', text: '¡Gracias! Lo firmo ya mismo', showAt: 6 },
]

function AutonomousCollectionChat() {
  const [containerRef, started] = useStartOnVisible<HTMLDivElement>()
  const [tick, setTick] = useState(0)
  const [typing, setTyping] = useState(false)
  const closedToday = 187
  const recovered = 42_840

  useEffect(() => {
    if (!started || tick > CHAT_SCRIPT.length) return
    const id = setTimeout(() => {
      setTick((t) => t + 1)
      setTyping(true)
      setTimeout(() => setTyping(false), 800)
    }, 2400)
    return () => clearTimeout(id)
  }, [started, tick])

  return (
    <div ref={containerRef} className="space-y-3">
      <div className="flex items-center justify-between bg-emerald-900 text-white rounded-xl px-4 py-2 text-xs">
        <span className="font-semibold">💬 Agente de cobranza · 247 conversaciones paralelas</span>
        <span><b className="text-emerald-200">{closedToday}</b> acuerdos hoy</span>
      </div>

      <div className="grid grid-cols-5 gap-3">
        {/* Chat */}
        <div className="col-span-3 bg-emerald-50 rounded-xl border border-emerald-200 p-3">
          <HoverExplainer
            title="¿Qué resuelve este chatbot autónomo?"
            body="El agente de cobranza identifica clientes morosos, los contacta vía WhatsApp y negocia planes de pago dentro de la política del banco. Antes lo hacía un call center humano con $4.20/contacto y horario limitado. Ahora opera 24/7 a $0.38/contacto y recupera 254% más cartera con mejor experiencia al cliente."
            position="right"
            className="-mx-3 -mt-3 mb-3"
          >
            <div className="bg-emerald-700 text-white rounded-t-lg px-3 py-2 flex items-center gap-2 cursor-help">
              <div className="w-7 h-7 rounded-full bg-emerald-500 flex items-center justify-center text-xs font-bold">B</div>
              <div className="flex-1">
                <p className="text-xs font-semibold leading-tight">BankCore · Atención</p>
                <p className="text-[10px] text-emerald-200">en línea · responde al instante</p>
              </div>
              <span className="text-[10px] text-emerald-200">WhatsApp · pasa el cursor</span>
            </div>
          </HoverExplainer>
          <div className="space-y-2 h-[440px] overflow-hidden">
            {CHAT_SCRIPT.map((msg, i) => {
              const visible = msg.showAt < tick
              if (!visible) return null
              const isAgent = msg.from === 'agent'
              return (
                <div key={i} className={`flex ${isAgent ? 'justify-start' : 'justify-end'} animate-fade-in`}>
                  <div className={`max-w-[80%] rounded-2xl px-3 py-2 text-xs whitespace-pre-line shadow-sm ${
                    isAgent ? 'bg-white text-slate-700 rounded-bl-sm' : 'bg-emerald-500 text-white rounded-br-sm'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              )
            })}
            {typing && tick < CHAT_SCRIPT.length && (
              <div className="flex justify-start">
                <div className="bg-white rounded-2xl rounded-bl-sm px-3 py-2 shadow-sm flex gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '0ms'   }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="col-span-2 space-y-3">
          <div className="bg-white rounded-xl border border-slate-200 p-3">
            <p className="text-[10px] uppercase text-slate-400 mb-2">Cliente actual</p>
            <p className="text-sm font-bold text-slate-800">Juan Pérez</p>
            <p className="text-[11px] text-slate-500 mb-3">Cuota vencida · $260</p>
            <div className="space-y-1.5 text-[10px]">
              <Row label="Días de mora" value="14" />
              <Row label="Score interno" value="bajo riesgo" tone="emerald" />
              <Row label="Acuerdos previos" value="0" />
              <Row label="Probabilidad pago" value="78%" tone="emerald" />
            </div>
          </div>

          <div className="bg-emerald-100 border border-emerald-200 rounded-xl p-3">
            <p className="text-[10px] uppercase text-emerald-700 mb-1">Recuperado hoy</p>
            <p className="text-xl font-bold text-emerald-800">${recovered.toLocaleString()}</p>
            <p className="text-[10px] text-emerald-700 mt-1">vs $12K manual · <b>+254%</b></p>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-3">
            <p className="text-[10px] uppercase text-slate-400 mb-2">Cola paralela</p>
            <div className="space-y-1 text-[10px]">
              <QueueRow id="M. López"  status="negociando"   tone="amber" />
              <QueueRow id="P. Soto"   status="acuerdo OK"   tone="emerald" />
              <QueueRow id="A. Vega"   status="escalado 🟡"  tone="amber" />
              <QueueRow id="C. Ruiz"   status="acuerdo OK"   tone="emerald" />
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

function Row({ label, value, tone }: { label: string; value: string; tone?: 'emerald' }) {
  return (
    <div className="flex justify-between">
      <span className="text-slate-500">{label}</span>
      <span className={`font-semibold ${tone === 'emerald' ? 'text-emerald-700' : 'text-slate-700'}`}>{value}</span>
    </div>
  )
}

function QueueRow({ id, status, tone }: { id: string; status: string; tone: 'emerald' | 'amber' }) {
  return (
    <div className="flex justify-between">
      <span className="font-mono text-slate-600">{id}</span>
      <span className={`font-semibold ${tone === 'emerald' ? 'text-emerald-600' : 'text-amber-600'}`}>{status}</span>
    </div>
  )
}

// ════════════════════════════════════════════════════════════════════════════
// WIDGET 3 — Copiloto del asesor (variante augmentation)
// ════════════════════════════════════════════════════════════════════════════

const AI_CARDS = [
  {
    badge: '🎯 NEXT-BEST-PRODUCT',
    badgeColor: 'bg-blue-100 text-blue-700',
    title: 'Fondo conservador 6% anual',
    body: 'Match perfil cliente: 94%. Cliente sin productos de inversión en 8 años de relación.',
    cta: 'Proponer en llamada',
    ctaColor: 'bg-blue-600',
    explain: 'La IA analizó 200+ atributos del cliente y los cruzó con cohortes similares. El modelo aprende qué producto convierte más para qué perfil — antes el asesor adivinaba o usaba reglas estáticas. Ahora el copiloto sugiere el producto correcto y el asesor decide cuándo y cómo proponerlo.',
  },
  {
    badge: '⚠️ RIESGO DE CHURN 73%',
    badgeColor: 'bg-red-100 text-red-700',
    title: 'Transferencias salientes a competidor X',
    body: '3 transferencias en últimos 30 días por $8,400 a Banco rival. Sugerencia: llamada proactiva HOY.',
    cta: 'Llamada proactiva HOY',
    ctaColor: 'bg-red-600',
    explain: 'El modelo de churn analiza patrones en tiempo real: transferencias salientes, baja en frecuencia de uso, consultas externas. Detecta clientes a punto de irse 60 días antes que el ojo humano. El banco actúa proactivamente con ofertas o llamadas — recuperar al cliente cuesta 5x menos que adquirir uno nuevo.',
  },
  {
    badge: '💬 RESUMEN PRE-LLAMADA',
    badgeColor: 'bg-emerald-100 text-emerald-700',
    title: 'Briefing generado en 2.1s',
    body: '"Cliente premium 8 años, +18% depósitos, consultó hipoteca por WhatsApp el martes. Sin inversiones activas."',
    cta: 'Copiar al CRM',
    ctaColor: 'bg-emerald-600',
    explain: 'Antes el asesor llegaba a la llamada sin contexto o pasaba 10 minutos revisando 5 sistemas. La IA consolida historial, transacciones recientes, conversaciones por WhatsApp y CRM en un briefing de 2 segundos. El asesor entra a la llamada con contexto completo y máxima relevancia.',
  },
]

function ClientCopilotSplit() {
  const [containerRef, started] = useStartOnVisible<HTMLDivElement>()
  const [visibleCards, setVisibleCards] = useState(0)

  useEffect(() => {
    if (!started || visibleCards >= AI_CARDS.length) return
    const id = setTimeout(() => setVisibleCards((v) => v + 1), 700)
    return () => clearTimeout(id)
  }, [started, visibleCards])

  return (
    <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 gap-3">
      <div className="bg-white rounded-xl border border-slate-200 p-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-cyan-100 flex items-center justify-center text-cyan-700 font-bold">MS</div>
          <div>
            <p className="text-sm font-bold text-slate-800">M. Salazar</p>
            <p className="text-[10px] text-slate-500">Cliente hace 8 años · Premium</p>
          </div>
          <span className="ml-auto text-[10px] bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-semibold">● En línea</span>
        </div>

        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="bg-slate-50 rounded-lg p-2">
            <p className="text-[9px] uppercase text-slate-400">AUM</p>
            <p className="text-sm font-bold text-slate-800">$48,200</p>
            <p className="text-[10px] text-emerald-600 font-semibold">▲ +18%</p>
          </div>
          <div className="bg-slate-50 rounded-lg p-2">
            <p className="text-[9px] uppercase text-slate-400">NPS último</p>
            <p className="text-sm font-bold text-slate-800">9 / 10</p>
            <p className="text-[10px] text-slate-500">hace 47 días</p>
          </div>
        </div>

        <p className="text-[10px] uppercase text-slate-400 mb-2">Comportamiento 90 días</p>
        <div className="space-y-2 mb-4">
          <BarRow label="Depósitos" value={88} delta="+18%" positive />
          <BarRow label="Inversión" value={12} delta="2%"   positive={false} />
          <BarRow label="Tarjeta"   value={78} delta="78%"  positive />
        </div>

        <p className="text-[10px] uppercase text-slate-400 mb-2">🚨 Señales detectadas</p>
        <ul className="text-[11px] text-slate-600 space-y-1 leading-snug">
          <li>• 3 transferencias a banco rival</li>
          <li>• Consulta hipotecaria por WhatsApp</li>
          <li>• Sin producto de inversión activo</li>
        </ul>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <p className="text-xs font-semibold text-slate-700">Sugerencias IA priorizadas</p>
        </div>

        {AI_CARDS.map((card, i) => (
          <HoverExplainer
            key={i}
            title="¿Cómo te ayuda esta sugerencia?"
            body={card.explain}
            position="top"
          >
            <div
              className={`bg-white rounded-xl border border-slate-200 p-3 shadow-sm transition-all duration-500 cursor-help ${
                i < visibleCards ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
              }`}
            >
              <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full mb-2 ${card.badgeColor}`}>
                {card.badge}
              </span>
              <p className="text-xs font-semibold text-slate-800 mb-1">{card.title}</p>
              <p className="text-[11px] text-slate-600 leading-snug mb-2">{card.body}</p>
              <button
                type="button"
                className={`text-[10px] font-semibold text-white px-3 py-1.5 rounded-lg ${card.ctaColor} hover:opacity-90 transition-opacity`}
              >
                {card.cta}
              </button>
            </div>
          </HoverExplainer>
        ))}

      </div>
    </div>
  )
}

function BarRow({ label, value, delta, positive }: { label: string; value: number; delta: string; positive: boolean }) {
  return (
    <div className="flex items-center gap-2 text-[11px]">
      <span className="w-16 text-slate-600">{label}</span>
      <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${positive ? 'bg-emerald-500' : 'bg-amber-400'}`} style={{ width: `${value}%` }} />
      </div>
      <span className={`w-10 text-right font-semibold ${positive ? 'text-emerald-600' : 'text-amber-600'}`}>{delta}</span>
    </div>
  )
}

// ════════════════════════════════════════════════════════════════════════════
// Helpers compartidos
// ════════════════════════════════════════════════════════════════════════════

function ImpactPill({ label, value, tone }: { label: string; value: string; tone: 'emerald' }) {
  return (
    <div className={`rounded-xl px-3 py-2 border ${tone === 'emerald' ? 'bg-emerald-50 border-emerald-200' : ''}`}>
      <p className="text-[10px] uppercase text-emerald-600">{label}</p>
      <p className="text-sm font-bold text-emerald-800">{value}</p>
    </div>
  )
}

