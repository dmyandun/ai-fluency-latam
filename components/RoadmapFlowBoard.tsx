'use client'

import { useState, useCallback, useEffect } from 'react'
import type { Roadmap, RoadmapItem, RoadmapPhaseId } from '@/types/assessment'
import { ROADMAP_PHASES, saveRoadmap, downloadRoadmap, buildMailtoLink } from '@/lib/roadmap'
import RoadmapItemForm from './RoadmapItemForm'

interface RoadmapFlowBoardProps {
  roadmap: Roadmap
  onUpdateRoadmap: (updated: Roadmap) => void
}

// Asigna cada item a uno de los 3 tracks del flujo
function getTrack(item: RoadmapItem): 'base' | 'model' | 'impl' {
  const id = item.id
  if (id.startsWith('sys-d1') || id.startsWith('sys-d2') ||
      id.startsWith('sys-d3') || id.startsWith('sys-d4')) return 'base'
  if (id.startsWith('sys-auto') || id.startsWith('sys-agency') ||
      id.startsWith('sys-augment')) return 'model'
  if (id.startsWith('sys-local') || id.startsWith('sys-api') ||
      id.startsWith('sys-ml')) return 'impl'
  // Items de usuario → base track
  return 'base'
}

const TRACKS = [
  {
    id: 'base' as const,
    label: 'Framework 4D',
    sublabel: 'Fundamentos universales',
    color: 'blue',
    headerBg: 'bg-blue-600',
    headerText: 'text-white',
    cardBorder: 'border-blue-200',
    cardBg: 'bg-blue-50/60',
    badge: 'bg-blue-100 text-blue-700',
    line: 'bg-blue-300',
  },
  {
    id: 'model' as const,
    label: 'Modelo de interacción',
    sublabel: 'Automation · Agency · Augmentation',
    color: 'violet',
    headerBg: 'bg-violet-600',
    headerText: 'text-white',
    cardBorder: 'border-violet-200',
    cardBg: 'bg-violet-50/60',
    badge: 'bg-violet-100 text-violet-700',
    line: 'bg-violet-300',
  },
  {
    id: 'impl' as const,
    label: 'Tipo de implementación',
    sublabel: 'Local · API · ML',
    color: 'emerald',
    headerBg: 'bg-emerald-600',
    headerText: 'text-white',
    cardBorder: 'border-emerald-200',
    cardBg: 'bg-emerald-50/60',
    badge: 'bg-emerald-100 text-emerald-700',
    line: 'bg-emerald-300',
  },
]

const PRIORITY_STYLES = {
  high:   'bg-amber-100 text-amber-700',
  medium: 'bg-blue-100 text-blue-700',
  low:    'bg-slate-100 text-slate-500',
}
const PRIORITY_LABELS = { high: 'Alta', medium: 'Media', low: 'Baja' }

function FlowCard({
  item,
  trackColor,
  onToggle,
  onEdit,
  onDelete,
}: {
  item: RoadmapItem
  trackColor: string
  onToggle: (id: string) => void
  onEdit: (item: RoadmapItem) => void
  onDelete: (id: string) => void
}) {
  return (
    <div
      className={`relative group rounded-xl border p-3 transition-all text-left w-full ${
        item.completed
          ? 'opacity-50 bg-white border-slate-200'
          : `bg-white border-${trackColor}-200 hover:shadow-md hover:border-${trackColor}-300`
      }`}
    >
      {/* Checkbox */}
      <div className="flex items-start gap-2 mb-2">
        <button
          type="button"
          onClick={() => onToggle(item.id)}
          className={`mt-0.5 w-3.5 h-3.5 rounded border-2 shrink-0 flex items-center justify-center transition-all ${
            item.completed ? 'bg-emerald-500 border-emerald-500' : 'border-slate-300 hover:border-emerald-400'
          }`}
        >
          {item.completed && (
            <svg className="w-2 h-2 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          )}
        </button>
        <p className={`text-xs font-semibold leading-tight flex-1 ${item.completed ? 'line-through text-slate-400' : 'text-slate-800'}`}>
          {item.title}
        </p>
      </div>

      {item.description && (
        <p className="text-xs text-slate-500 leading-relaxed mb-2 pl-5 line-clamp-2">{item.description}</p>
      )}

      <div className="flex items-center gap-1.5 pl-5 flex-wrap">
        <span className={`text-xs px-1.5 py-0.5 rounded-full font-medium ${PRIORITY_STYLES[item.priority]}`}>
          {PRIORITY_LABELS[item.priority]}
        </span>
        {item.source === 'system' && (
          <span className="text-xs bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded-full">Sistema</span>
        )}
      </div>

      {/* Acciones al hover */}
      <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          type="button"
          onClick={() => onEdit(item)}
          className="p-1 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
        >
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => onDelete(item.id)}
          className="p-1 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg"
        >
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  )
}

// Conector de flecha entre fases
function PhaseArrow() {
  return (
    <div className="flex flex-col items-center justify-center px-1 self-stretch">
      <div className="flex-1 w-px bg-slate-200" />
      <div className="my-1 flex items-center gap-0.5">
        <div className="h-px w-8 bg-slate-300" />
        <svg className="w-3 h-3 text-slate-400 -ml-1" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
        </svg>
      </div>
      <div className="flex-1 w-px bg-slate-200" />
    </div>
  )
}

// Fork indicator — muestra que los tracks corren en paralelo
function ForkIndicator() {
  return (
    <div className="flex items-center gap-1 mb-2 px-1">
      <div className="h-px flex-1 bg-slate-200" />
      <span className="text-xs text-slate-400 font-medium whitespace-nowrap">⫘ paralelo</span>
      <div className="h-px flex-1 bg-slate-200" />
    </div>
  )
}

export default function RoadmapFlowBoard({ roadmap, onUpdateRoadmap }: RoadmapFlowBoardProps) {
  const [editingItem, setEditingItem]   = useState<RoadmapItem | null>(null)
  const [addingPhase, setAddingPhase]   = useState<RoadmapPhaseId | null>(null)
  const [emailModal, setEmailModal]     = useState(false)
  const [emailInput, setEmailInput]     = useState('')

  useEffect(() => { saveRoadmap(roadmap) }, [roadmap])

  const update = useCallback(
    (newItems: RoadmapItem[]) => onUpdateRoadmap({ ...roadmap, items: newItems }),
    [roadmap, onUpdateRoadmap]
  )

  function handleAddItem(phaseId: RoadmapPhaseId, data: Omit<RoadmapItem, 'id' | 'createdAt' | 'source'>) {
    update([...roadmap.items, { ...data, id: crypto.randomUUID(), source: 'user', createdAt: new Date().toISOString() }])
    setAddingPhase(null)
  }

  function handleToggle(id: string) {
    update(roadmap.items.map((item) => item.id === id ? { ...item, completed: !item.completed } : item))
  }

  function handleEditSubmit(data: Omit<RoadmapItem, 'id' | 'createdAt' | 'source'>) {
    if (!editingItem) return
    update(roadmap.items.map((item) => item.id === editingItem.id ? { ...item, ...data } : item))
    setEditingItem(null)
  }

  function handleDelete(id: string) {
    update(roadmap.items.filter((item) => item.id !== id))
  }

  function handleSendEmail() {
    if (!emailInput.trim()) return
    window.open(buildMailtoLink(emailInput.trim(), roadmap), '_blank')
    setEmailModal(false)
    setEmailInput('')
  }

  const completedTotal = roadmap.items.filter((i) => i.completed).length
  const totalItems     = roadmap.items.length

  // Agrupa items por fase + track
  function getItems(phaseId: string, trackId: 'base' | 'model' | 'impl'): RoadmapItem[] {
    return roadmap.items.filter(
      (item) => item.phaseId === phaseId && getTrack(item) === trackId
    )
  }

  return (
    <div>
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">
            4D Framework for AI Fluency — Roadmap
          </h2>
          <p className="text-sm text-slate-500 mt-0.5">
            {completedTotal} de {totalItems} iniciativas completadas
          </p>
          <div className="flex items-center gap-3 mt-2 max-w-xs">
            <div className="flex-1 h-1.5 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-500 rounded-full transition-all duration-700"
                style={{ width: totalItems > 0 ? `${Math.round((completedTotal / totalItems) * 100)}%` : '0%' }}
              />
            </div>
            <span className="text-xs text-slate-400 tabular-nums shrink-0">
              {totalItems > 0 ? Math.round((completedTotal / totalItems) * 100) : 0}%
            </span>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => downloadRoadmap(roadmap)}
            className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-300 hover:border-blue-400 text-slate-600 hover:text-blue-700 text-xs font-medium rounded-xl transition-all shadow-sm"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Descargar
          </button>
          <button
            type="button"
            onClick={() => setEmailModal(true)}
            className="flex items-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded-xl shadow-sm transition-all"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Email
          </button>
        </div>
      </div>

      {/* Leyenda de tracks */}
      <div className="flex flex-wrap gap-3 mb-5">
        {TRACKS.map((t) => (
          <div key={t.id} className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-sm ${t.headerBg}`} />
            <span className="text-xs text-slate-600 font-medium">{t.label}</span>
            <span className="text-xs text-slate-400">— {t.sublabel}</span>
          </div>
        ))}
        <span className="text-xs text-slate-400 self-center ml-auto">
          ⫘ Las 3 pistas se ejecutan en paralelo dentro de cada fase
        </span>
      </div>

      {/* Flow board — scrollable horizontal */}
      <div className="overflow-x-auto pb-6">
        <div className="flex items-start gap-0" style={{ minWidth: 'max-content' }}>

          {ROADMAP_PHASES.map((phase, phaseIdx) => {
            const isLast = phaseIdx === ROADMAP_PHASES.length - 1

            return (
              <div key={phase.id} className="flex items-start gap-0">
                {/* Columna de fase */}
                <div className="w-[280px] flex flex-col gap-0">
                  {/* Header de fase */}
                  <div className="bg-slate-900 rounded-t-2xl px-4 py-3 mb-0">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-white font-semibold text-sm">{phase.label}</p>
                        <p className="text-slate-400 text-xs mt-0.5">{phase.description}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setAddingPhase(addingPhase === phase.id ? null : phase.id)}
                        className="text-slate-400 hover:text-white text-lg leading-none transition-colors"
                        title="Agregar iniciativa"
                      >
                        +
                      </button>
                    </div>
                    {/* Items count por track */}
                    <div className="flex gap-2 mt-2">
                      {TRACKS.map((t) => {
                        const count = getItems(phase.id, t.id).length
                        if (count === 0) return null
                        return (
                          <span key={t.id} className={`text-xs px-1.5 py-0.5 rounded-full font-medium ${t.badge}`}>
                            {count}
                          </span>
                        )
                      })}
                    </div>
                  </div>

                  {/* Fork indicator */}
                  <div className="bg-slate-50 border-x border-slate-200 px-3 py-1.5">
                    <ForkIndicator />
                  </div>

                  {/* Tracks paralelas */}
                  <div className="flex flex-col border border-t-0 border-slate-200 rounded-b-2xl overflow-hidden divide-y divide-slate-200">
                    {TRACKS.map((track) => {
                      const items = getItems(phase.id, track.id)
                      if (items.length === 0) return null
                      return (
                        <div key={track.id} className={`p-3 space-y-2 ${track.cardBg}`}>
                          {/* Track label */}
                          <div className="flex items-center gap-1.5 mb-1">
                            <div className={`w-2 h-2 rounded-sm ${track.headerBg}`} />
                            <span className="text-xs font-semibold text-slate-500">{track.label}</span>
                          </div>
                          {/* Items */}
                          {items.map((item) => (
                            <FlowCard
                              key={item.id}
                              item={item}
                              trackColor={track.color}
                              onToggle={handleToggle}
                              onEdit={setEditingItem}
                              onDelete={handleDelete}
                            />
                          ))}
                        </div>
                      )
                    })}

                    {/* Formulario de nuevo item */}
                    {addingPhase === phase.id && (
                      <div className="p-3 bg-white">
                        <RoadmapItemForm
                          phaseId={phase.id}
                          onSubmit={(data) => handleAddItem(phase.id, data)}
                          onCancel={() => setAddingPhase(null)}
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Flecha entre fases */}
                {!isLast && <PhaseArrow />}
              </div>
            )
          })}
        </div>
      </div>

      {/* Modal edición */}
      {editingItem && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <h3 className="text-base font-semibold text-slate-900 mb-4">Editar iniciativa</h3>
            <RoadmapItemForm
              phaseId={editingItem.phaseId}
              initialData={editingItem}
              onSubmit={handleEditSubmit}
              onCancel={() => setEditingItem(null)}
            />
          </div>
        </div>
      )}

      {/* Modal email */}
      {emailModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 w-full max-w-sm shadow-2xl">
            <h3 className="text-base font-semibold text-slate-900 mb-1">Enviar roadmap por email</h3>
            <p className="text-sm text-slate-500 mb-4">
              Se abrirá tu cliente de email con el roadmap completo listo para enviar.
            </p>
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
              <button
                type="button"
                onClick={() => { setEmailModal(false); setEmailInput('') }}
                className="px-4 bg-white border border-slate-200 text-slate-600 text-sm rounded-xl"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
