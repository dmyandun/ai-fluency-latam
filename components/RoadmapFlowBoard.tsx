'use client'

import { useState, useCallback, useEffect } from 'react'
import type { Roadmap, RoadmapItem, RoadmapPhaseId, RoadmapPriority } from '@/types/assessment'
import { ROADMAP_PHASES, saveRoadmap, downloadRoadmap, buildMailtoLink } from '@/lib/roadmap'
import RoadmapItemForm from './RoadmapItemForm'

interface RoadmapFlowBoardProps {
  roadmap: Roadmap
  onUpdateRoadmap: (updated: Roadmap) => void
}

const PRIORITY_LABEL: Record<RoadmapPriority, string> = {
  high: 'Alta',
  medium: 'Media',
  low: 'Baja',
}

// Acento de color por fase (alineado al orden de ROADMAP_PHASES)
const PHASE_COLORS = [
  { dot: 'bg-blue-600',    ring: 'ring-blue-200',    soft: 'bg-blue-50',    border: 'border-blue-200',    text: 'text-blue-700'    },
  { dot: 'bg-violet-600',  ring: 'ring-violet-200',  soft: 'bg-violet-50',  border: 'border-violet-200',  text: 'text-violet-700'  },
  { dot: 'bg-amber-500',   ring: 'ring-amber-200',   soft: 'bg-amber-50',   border: 'border-amber-200',   text: 'text-amber-700'   },
  { dot: 'bg-emerald-600', ring: 'ring-emerald-200', soft: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-700' },
  { dot: 'bg-slate-700',   ring: 'ring-slate-200',   soft: 'bg-slate-50',   border: 'border-slate-300',   text: 'text-slate-700'   },
]

const TIMEFRAME: Record<RoadmapPhaseId, string> = {
  '30d': '30 días',
  '60d': '60 días',
  '90d': '90 días',
  '6m':  '6 meses',
  '12m': '12 meses',
}

/** Una fila de la ficha. El rótulo va a la izquierda y el campo ocupa el resto. */
function FieldRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-[140px_1fr] border-b border-slate-100 last:border-0">
      <div className="px-4 py-3 bg-slate-50 text-xs font-medium text-slate-500 uppercase tracking-wider flex items-center">
        {label}
      </div>
      <div className="px-4 py-3">{children}</div>
    </div>
  )
}

export default function RoadmapFlowBoard({ roadmap, onUpdateRoadmap }: RoadmapFlowBoardProps) {
  /** Sólo un hito abierto a la vez: la ficha de abajo siempre habla de uno. */
  const [openId, setOpenId] = useState<string | null>(null)
  const [addingPhase, setAddingPhase] = useState<RoadmapPhaseId | null>(null)
  const [emailModal, setEmailModal]   = useState(false)
  const [emailInput, setEmailInput]   = useState('')

  useEffect(() => { saveRoadmap(roadmap) }, [roadmap])

  const update = useCallback(
    (newItems: RoadmapItem[]) => onUpdateRoadmap({ ...roadmap, items: newItems }),
    [roadmap, onUpdateRoadmap]
  )

  const openItem = roadmap.items.find((i) => i.id === openId) ?? null

  function patchOpen(patch: Partial<RoadmapItem>) {
    if (!openItem) return
    update(roadmap.items.map((i) => (i.id === openItem.id ? { ...i, ...patch } : i)))
  }

  function handleAdd(data: Omit<RoadmapItem, 'id' | 'createdAt' | 'source'>) {
    const item: RoadmapItem = {
      ...data,
      id: crypto.randomUUID(),
      source: 'user',
      createdAt: new Date().toISOString(),
    }
    update([...roadmap.items, item])
    setAddingPhase(null)
    setOpenId(item.id)
  }

  function handleDelete(id: string) {
    update(roadmap.items.filter((i) => i.id !== id))
    setOpenId(null)
  }

  function handleSendEmail() {
    if (!emailInput.trim()) return
    window.open(buildMailtoLink(emailInput.trim(), roadmap), '_blank')
    setEmailModal(false); setEmailInput('')
  }

  const completedTotal = roadmap.items.filter((i) => i.completed).length
  const totalItems     = roadmap.items.length

  return (
    <div>
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">
            Roadmap 4D Framework for AI Fluency
          </h2>
          <p className="text-sm text-slate-500 mt-0.5">
            Tu plan de 12 meses organizado en las 4 competencias de fluidez en IA de Anthropic.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-24 h-1.5 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-500 rounded-full transition-all"
                style={{ width: totalItems > 0 ? `${Math.round((completedTotal / totalItems) * 100)}%` : '0%' }}
              />
            </div>
            <span className="text-xs text-slate-500 tabular-nums">
              {completedTotal}/{totalItems}
            </span>
          </div>
          <button
            type="button"
            onClick={() => downloadRoadmap(roadmap)}
            className="flex items-center gap-1.5 px-3 py-2 bg-white border border-slate-300 hover:border-blue-400 text-slate-600 hover:text-blue-700 text-xs font-medium rounded-xl shadow-sm transition-all"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Descargar
          </button>
          <button
            type="button"
            onClick={() => setEmailModal(true)}
            className="flex items-center gap-1.5 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded-xl shadow-sm transition-all"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Email
          </button>
        </div>
      </div>

      {/*
        Itinerario vertical: un hito por actividad. En horizontal los 25 hitos
        obligaban a un scroll lateral que escondía la fase en la que estabas.
      */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm px-6 py-6">
        <div className="relative">
          {/* Hilo continuo que atraviesa las cinco fases */}
          <div className="absolute left-[9px] top-2 bottom-2 w-0.5 bg-slate-200" aria-hidden="true" />

          {ROADMAP_PHASES.map((phase, idx) => {
            const items = roadmap.items.filter((i) => i.phaseId === phase.id)
            const color = PHASE_COLORS[idx % PHASE_COLORS.length]
            const done = items.filter((i) => i.completed).length

            return (
              <div key={phase.id} className={idx === 0 ? '' : 'mt-7'}>
                {/* Cabecera de fase, anclada al mismo hilo */}
                <div className="relative pl-9">
                  <span
                    className={`absolute left-[1px] top-1 w-4 h-4 rounded-md ${color.dot} shadow-sm`}
                    aria-hidden="true"
                  />
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`text-sm font-semibold ${color.text}`}>{phase.label}</span>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${color.soft} ${color.text}`}>
                      {TIMEFRAME[phase.id]}
                    </span>
                    {items.length > 0 && (
                      <span className="text-xs text-slate-400 tabular-nums">{done}/{items.length}</span>
                    )}
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">{phase.description}</p>
                </div>

                <div className="mt-2">
                  {items.map((item) => {
                    const isOpen = item.id === openId
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setOpenId(isOpen ? null : item.id)}
                        aria-expanded={isOpen}
                        className={`group relative block w-full pl-9 pr-3 py-2 text-left rounded-lg transition-colors ${
                          isOpen ? 'bg-slate-50' : 'hover:bg-slate-50'
                        }`}
                      >
                        <span
                          className={`absolute left-[3px] top-[13px] w-3 h-3 rounded-full border-2 border-white transition-all ${
                            item.completed ? 'bg-emerald-500' : color.dot
                          } ${isOpen ? `ring-4 ${color.ring}` : ''}`}
                          aria-hidden="true"
                        />
                        <span
                          className={`block text-sm leading-snug ${
                            item.completed
                              ? 'text-slate-400 line-through'
                              : isOpen
                                ? 'text-slate-900 font-semibold'
                                : 'text-slate-600 group-hover:text-slate-900'
                          }`}
                        >
                          {item.title}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Alta de hitos, fuera de la línea para no competir con los títulos */}
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <span className="text-xs text-slate-400">Agregar hito en</span>
        {ROADMAP_PHASES.map((phase) => (
          <button
            key={phase.id}
            type="button"
            onClick={() => {
              setAddingPhase(addingPhase === phase.id ? null : phase.id)
              setOpenId(null)
            }}
            className={`px-2.5 py-1 text-xs font-medium rounded-lg border transition-all ${
              addingPhase === phase.id
                ? 'bg-blue-50 border-blue-300 text-blue-700'
                : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300'
            }`}
          >
            {phase.label}
          </button>
        ))}
      </div>

      {addingPhase && (
        <div className="mt-4 max-w-md">
          <RoadmapItemForm
            phaseId={addingPhase}
            onSubmit={handleAdd}
            onCancel={() => setAddingPhase(null)}
          />
        </div>
      )}

      {/* Ficha del hito abierto: tabla editable, siempre de uno solo */}
      {openItem && (
        <div className="mt-4 bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden animate-fade-in">
          <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                {ROADMAP_PHASES.find((p) => p.id === openItem.phaseId)?.label}
              </span>
              <span className="text-xs text-slate-400">· {TIMEFRAME[openItem.phaseId]}</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleDelete(openItem.id)}
                className="text-xs font-medium text-slate-400 hover:text-red-600 transition-colors"
              >
                Eliminar
              </button>
              <button
                type="button"
                onClick={() => setOpenId(null)}
                className="text-xs font-medium text-slate-500 hover:text-slate-900 transition-colors"
              >
                Cerrar
              </button>
            </div>
          </div>

          <FieldRow label="Título">
            <input
              type="text"
              value={openItem.title}
              onChange={(e) => patchOpen({ title: e.target.value })}
              className="w-full bg-white border border-slate-300 text-slate-900 text-sm rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
            />
          </FieldRow>

          <FieldRow label="Detalle">
            <textarea
              value={openItem.description}
              onChange={(e) => patchOpen({ description: e.target.value })}
              rows={3}
              placeholder="Qué implica este hito en tu organización"
              className="w-full bg-white border border-slate-300 text-slate-900 text-sm rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-slate-400 resize-none shadow-sm"
            />
          </FieldRow>

          <FieldRow label="Prioridad">
            <div className="flex flex-wrap gap-2">
              {(Object.keys(PRIORITY_LABEL) as RoadmapPriority[]).map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => patchOpen({ priority: value })}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all ${
                    openItem.priority === value
                      ? 'bg-blue-50 border-blue-300 text-blue-700'
                      : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300'
                  }`}
                >
                  {PRIORITY_LABEL[value]}
                </button>
              ))}
            </div>
          </FieldRow>

          <FieldRow label="Estado">
            <button
              type="button"
              onClick={() => patchOpen({ completed: !openItem.completed })}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all ${
                openItem.completed
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-700'
                  : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300'
              }`}
            >
              {openItem.completed ? '✓ Completado' : 'Pendiente'}
            </button>
          </FieldRow>
        </div>
      )}

      {/* Modal email */}
      {emailModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 w-full max-w-sm shadow-2xl">
            <h3 className="text-base font-semibold text-slate-900 mb-1">Enviar roadmap por email</h3>
            <p className="text-sm text-slate-500 mb-4">Se abrirá tu cliente de correo con el roadmap completo.</p>
            <input
              type="email"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendEmail()}
              placeholder="nombre@empresa.com"
              className="w-full bg-white border border-slate-300 text-slate-900 text-sm rounded-xl px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-slate-400 shadow-sm"
              autoFocus
            />
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleSendEmail}
                disabled={!emailInput.trim()}
                className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-200 disabled:text-slate-400 text-white text-sm font-semibold py-2.5 rounded-xl"
              >
                Abrir en mi email →
              </button>
              <button type="button" onClick={() => { setEmailModal(false); setEmailInput('') }}
                className="px-4 bg-white border border-slate-200 text-slate-600 text-sm rounded-xl">
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
