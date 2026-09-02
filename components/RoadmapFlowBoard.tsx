'use client'

import { useState, useCallback, useEffect } from 'react'
import type { Roadmap, RoadmapItem, RoadmapPhaseId } from '@/types/assessment'
import { ROADMAP_PHASES, saveRoadmap, downloadRoadmap, buildMailtoLink } from '@/lib/roadmap'
import RoadmapItemForm from './RoadmapItemForm'

interface RoadmapFlowBoardProps {
  roadmap: Roadmap
  onUpdateRoadmap: (updated: Roadmap) => void
}

const PRIORITY_DOT: Record<string, string> = {
  high:   'bg-amber-400',
  medium: 'bg-blue-400',
  low:    'bg-slate-300',
}

const PRIORITY_LABEL: Record<string, string> = {
  high:   'Alta',
  medium: 'Media',
  low:    'Baja',
}

// Acento de color por fase (alineado al orden de ROADMAP_PHASES)
const PHASE_COLORS = [
  { ring: 'bg-blue-600',    soft: 'bg-blue-50',    border: 'border-blue-200',    text: 'text-blue-700'    },
  { ring: 'bg-violet-600',  soft: 'bg-violet-50',  border: 'border-violet-200',  text: 'text-violet-700'  },
  { ring: 'bg-amber-500',   soft: 'bg-amber-50',   border: 'border-amber-200',   text: 'text-amber-700'   },
  { ring: 'bg-emerald-600', soft: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-700' },
  { ring: 'bg-slate-700',   soft: 'bg-slate-50',   border: 'border-slate-300',   text: 'text-slate-700'   },
]

const TIMEFRAME: Record<RoadmapPhaseId, string> = {
  '30d': '30 días',
  '60d': '60 días',
  '90d': '90 días',
  '6m':  '6 meses',
  '12m': '12 meses',
}

// Tarjeta de iniciativa dentro del grid de una fase
function ItemCard({
  item,
  color,
  onToggle,
  onEdit,
  onDelete,
}: {
  item: RoadmapItem
  color: (typeof PHASE_COLORS)[0]
  onToggle: (id: string) => void
  onEdit: (item: RoadmapItem) => void
  onDelete: (id: string) => void
}) {
  return (
    <div
      className={`group relative rounded-xl border bg-white p-4 shadow-sm transition-all hover:shadow-md ${
        item.completed ? 'border-slate-200 opacity-60' : color.border
      }`}
    >
      {/* Barra de color superior */}
      <div className={`absolute top-0 left-0 right-0 h-1 rounded-t-xl ${item.completed ? 'bg-slate-300' : color.ring}`} />

      <div className="flex items-start gap-2 mt-1">
        <button
          type="button"
          onClick={() => onToggle(item.id)}
          className={`mt-0.5 w-4 h-4 rounded border-2 shrink-0 flex items-center justify-center transition-all ${
            item.completed ? 'bg-emerald-500 border-emerald-500' : 'border-slate-300 hover:border-emerald-400'
          }`}
          aria-label={item.completed ? 'Marcar como pendiente' : 'Marcar como completado'}
        >
          {item.completed && (
            <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          )}
        </button>
        <p className={`text-sm font-semibold leading-snug flex-1 ${item.completed ? 'line-through text-slate-400' : 'text-slate-800'}`}>
          {item.title}
        </p>
      </div>

      {item.description && (
        <p className={`text-xs leading-relaxed mt-2 pl-6 ${item.completed ? 'text-slate-400' : 'text-slate-500'}`}>
          {item.description}
        </p>
      )}

      <div className="flex items-center gap-2 mt-3 pl-6">
        <span className="flex items-center gap-1 text-xs text-slate-500">
          <span className={`w-1.5 h-1.5 rounded-full ${PRIORITY_DOT[item.priority]}`} />
          {PRIORITY_LABEL[item.priority]}
        </span>
        <span className="text-xs text-slate-300">·</span>
        <span className="text-xs text-slate-400">
          {item.source === 'system' ? 'Sistema' : 'Tú'}
        </span>
      </div>

      {/* Botones edición (hover) */}
      <div className="absolute top-2 right-2 hidden group-hover:flex gap-1">
        <button
          type="button"
          onClick={() => onEdit(item)}
          className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center shadow hover:bg-blue-700"
          aria-label="Editar"
        >
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => onDelete(item.id)}
          className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center shadow hover:bg-red-600"
          aria-label="Eliminar"
        >
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default function RoadmapFlowBoard({ roadmap, onUpdateRoadmap }: RoadmapFlowBoardProps) {
  const [editingItem, setEditingItem] = useState<RoadmapItem | null>(null)
  const [addingPhase, setAddingPhase] = useState<RoadmapPhaseId | null>(null)
  const [emailModal, setEmailModal]   = useState(false)
  const [emailInput, setEmailInput]   = useState('')

  useEffect(() => { saveRoadmap(roadmap) }, [roadmap])

  const update = useCallback(
    (newItems: RoadmapItem[]) => onUpdateRoadmap({ ...roadmap, items: newItems }),
    [roadmap, onUpdateRoadmap]
  )

  function handleAdd(data: Omit<RoadmapItem, 'id' | 'createdAt' | 'source'>) {
    update([...roadmap.items, { ...data, id: crypto.randomUUID(), source: 'user', createdAt: new Date().toISOString() }])
    setAddingPhase(null)
  }
  function handleToggle(id: string) {
    update(roadmap.items.map((i) => i.id === id ? { ...i, completed: !i.completed } : i))
  }
  function handleEditSubmit(data: Omit<RoadmapItem, 'id' | 'createdAt' | 'source'>) {
    if (!editingItem) return
    update(roadmap.items.map((i) => i.id === editingItem.id ? { ...i, ...data } : i))
    setEditingItem(null)
  }
  function handleDelete(id: string) {
    update(roadmap.items.filter((i) => i.id !== id))
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

      {/* Leyenda */}
      <div className="flex flex-wrap items-center gap-4 mb-6 text-xs text-slate-500">
        <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-amber-400" /> Prioridad alta</span>
        <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-blue-400" /> Prioridad media</span>
        <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-slate-300" /> Prioridad baja</span>
        <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-500" /> Completado</span>
      </div>

      {/* Timeline vertical de fases */}
      <div className="space-y-8">
        {ROADMAP_PHASES.map((phase, idx) => {
          const items = roadmap.items.filter((i) => i.phaseId === phase.id)
          const color = PHASE_COLORS[idx % PHASE_COLORS.length]
          const isLast = idx === ROADMAP_PHASES.length - 1
          const done = items.filter((i) => i.completed).length

          return (
            <div key={phase.id} className="relative">
              {/* Línea conectora vertical */}
              {!isLast && (
                <div className="hidden sm:block absolute left-4 top-10 bottom-[-2rem] w-px bg-slate-200" />
              )}

              {/* Encabezado de fase */}
              <div className="flex items-start gap-3 mb-4">
                <div className={`relative z-10 shrink-0 w-8 h-8 rounded-full ${color.ring} text-white flex items-center justify-center text-sm font-bold shadow-sm`}>
                  {idx + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-base font-semibold text-slate-900">{phase.label}</h3>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${color.soft} ${color.text}`}>
                      {TIMEFRAME[phase.id]}
                    </span>
                    {items.length > 0 && (
                      <span className="text-xs text-slate-400 tabular-nums">{done}/{items.length}</span>
                    )}
                  </div>
                  <p className="text-sm text-slate-500 mt-0.5">{phase.description}</p>
                </div>
              </div>

              {/* Grid de iniciativas */}
              <div className="sm:pl-11">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {items.map((item) => (
                    <ItemCard
                      key={item.id}
                      item={item}
                      color={color}
                      onToggle={handleToggle}
                      onEdit={setEditingItem}
                      onDelete={handleDelete}
                    />
                  ))}

                  {/* Botón agregar */}
                  <button
                    type="button"
                    onClick={() => setAddingPhase(addingPhase === phase.id ? null : phase.id)}
                    className={`min-h-[88px] rounded-xl border-2 border-dashed ${color.border} flex items-center justify-center gap-2 text-slate-400 hover:text-slate-600 hover:border-slate-400 transition-all`}
                  >
                    <span className="text-lg leading-none">+</span>
                    <span className="text-xs font-medium">Agregar iniciativa</span>
                  </button>
                </div>

                {/* Formulario inline */}
                {addingPhase === phase.id && (
                  <div className="mt-4 max-w-md">
                    <RoadmapItemForm
                      phaseId={phase.id}
                      onSubmit={(data) => handleAdd(data)}
                      onCancel={() => setAddingPhase(null)}
                    />
                  </div>
                )}
              </div>
            </div>
          )
        })}
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
