'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
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

const LANE_COLORS = [
  { bg: 'bg-blue-50',    border: 'border-blue-200',   label: 'bg-blue-600',   dot: 'bg-blue-500'   },
  { bg: 'bg-violet-50',  border: 'border-violet-200', label: 'bg-violet-600', dot: 'bg-violet-500' },
  { bg: 'bg-amber-50',   border: 'border-amber-200',  label: 'bg-amber-500',  dot: 'bg-amber-400'  },
  { bg: 'bg-emerald-50', border: 'border-emerald-200',label: 'bg-emerald-600',dot: 'bg-emerald-500'},
  { bg: 'bg-slate-50',   border: 'border-slate-200',  label: 'bg-slate-700',  dot: 'bg-slate-500'  },
]

// Tarjeta de tarea individual dentro del carril
function FlowNode({
  item,
  color,
  onToggle,
  onEdit,
  onDelete,
}: {
  item: RoadmapItem
  color: (typeof LANE_COLORS)[0]
  onToggle: (id: string) => void
  onEdit: (item: RoadmapItem) => void
  onDelete: (id: string) => void
}) {
  const [showDetail, setShowDetail] = useState(false)

  return (
    <div className="relative flex-shrink-0">
      {/* Card */}
      <div
        className={`relative w-44 rounded-xl border-2 p-3 cursor-pointer transition-all group shadow-sm ${
          item.completed
            ? 'bg-white border-slate-200 opacity-50'
            : `bg-white ${color.border} hover:shadow-md`
        }`}
        onClick={() => setShowDetail(!showDetail)}
      >
        {/* Barra de color superior */}
        <div className={`absolute top-0 left-0 right-0 h-1 rounded-t-xl ${item.completed ? 'bg-slate-300' : color.label}`} />

        {/* Contenido */}
        <div className="flex items-start gap-1.5 mt-1">
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); onToggle(item.id) }}
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
          <p className={`text-xs font-semibold leading-tight line-clamp-2 flex-1 ${item.completed ? 'line-through text-slate-400' : 'text-slate-800'}`}>
            {item.title}
          </p>
        </div>

        {/* Metadata */}
        <div className="flex items-center gap-1.5 mt-2 pl-5">
          <div className={`w-1.5 h-1.5 rounded-full ${PRIORITY_DOT[item.priority]}`} />
          {item.source === 'system' && (
            <span className="text-xs text-slate-400">Sistema</span>
          )}
        </div>

        {/* Botones edición */}
        <div
          className="absolute -top-2 -right-2 hidden group-hover:flex gap-1"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            type="button"
            onClick={() => onEdit(item)}
            className="w-5 h-5 bg-blue-600 text-white rounded-full flex items-center justify-center shadow hover:bg-blue-700"
          >
            <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => onDelete(item.id)}
            className="w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center shadow hover:bg-red-600"
          >
            <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* Tooltip con descripción */}
      {showDetail && item.description && (
        <div
          className="absolute z-20 top-full left-0 mt-2 w-64 bg-white border border-slate-200 rounded-xl shadow-xl p-3"
          onClick={(e) => e.stopPropagation()}
        >
          <p className="text-xs font-semibold text-slate-800 mb-1">{item.title}</p>
          <p className="text-xs text-slate-600 leading-relaxed">{item.description}</p>
          <button
            type="button"
            onClick={() => setShowDetail(false)}
            className="mt-2 text-xs text-slate-400 hover:text-slate-600"
          >
            Cerrar ×
          </button>
        </div>
      )}
    </div>
  )
}

// Flecha horizontal entre nodos
function Arrow({ long = false }: { long?: boolean }) {
  return (
    <div className={`flex items-center flex-shrink-0 ${long ? 'w-12' : 'w-6'}`}>
      <div className="flex-1 h-px bg-slate-300" />
      <svg className="w-3 h-3 text-slate-400 -ml-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
      </svg>
    </div>
  )
}

export default function RoadmapFlowBoard({ roadmap, onUpdateRoadmap }: RoadmapFlowBoardProps) {
  const [editingItem, setEditingItem] = useState<RoadmapItem | null>(null)
  const [addingPhase, setAddingPhase] = useState<RoadmapPhaseId | null>(null)
  const [emailModal, setEmailModal]   = useState(false)
  const [emailInput, setEmailInput]   = useState('')
  const canvasRef = useRef<HTMLDivElement>(null)

  useEffect(() => { saveRoadmap(roadmap) }, [roadmap])

  const update = useCallback(
    (newItems: RoadmapItem[]) => onUpdateRoadmap({ ...roadmap, items: newItems }),
    [roadmap, onUpdateRoadmap]
  )

  function handleAdd(phaseId: RoadmapPhaseId, data: Omit<RoadmapItem, 'id' | 'createdAt' | 'source'>) {
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
            4D Framework for AI Fluency — Roadmap
          </h2>
          <p className="text-sm text-slate-500 mt-0.5">
            Haz clic en una tarea para ver su descripción. Hover para editar o eliminar.
          </p>
        </div>
        <div className="flex items-center gap-3">
          {/* Progreso */}
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
      <div className="flex items-center gap-4 mb-5 text-xs text-slate-500">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-amber-400" /> Prioridad alta
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-blue-400" /> Prioridad media
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-slate-300" /> Prioridad baja
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500" /> Completado
        </span>
      </div>

      {/* Canvas del diagrama de swim lanes */}
      <div ref={canvasRef} className="overflow-x-auto overflow-y-visible pb-8">
        <div className="relative" style={{ minWidth: '900px' }}>

          {ROADMAP_PHASES.map((phase, laneIdx) => {
            const items  = roadmap.items.filter((i) => i.phaseId === phase.id)
            const color  = LANE_COLORS[laneIdx % LANE_COLORS.length]
            const isLast = laneIdx === ROADMAP_PHASES.length - 1

            return (
              <div key={phase.id}>
                {/* Carril (swim lane) */}
                <div className={`flex items-stretch border-b-2 border-dashed ${color.border} ${laneIdx === 0 ? 'border-t-2 rounded-t-2xl' : ''} ${isLast ? 'rounded-b-2xl border-b-2 border-solid' : ''}`}>

                  {/* Etiqueta del carril — izquierda */}
                  <div className={`flex-shrink-0 w-28 flex flex-col items-center justify-center py-4 px-2 gap-1.5 ${color.bg} ${laneIdx === 0 ? 'rounded-tl-2xl' : ''} ${isLast ? 'rounded-bl-2xl' : ''}`}>
                    <div className={`${color.label} text-white text-xs font-bold px-2 py-1 rounded-lg text-center leading-tight`}>
                      {phase.label}
                    </div>
                    <p className="text-xs text-slate-500 text-center leading-tight">
                      {phase.description}
                    </p>
                  </div>

                  {/* Separador vertical */}
                  <div className={`w-px ${color.border} bg-current opacity-30`} />

                  {/* Contenido del carril — flujo horizontal */}
                  <div className="flex-1 flex items-center flex-wrap gap-0 py-5 px-5 overflow-x-auto">
                    <div className="flex items-center flex-wrap gap-0">
                      {items.length === 0 ? (
                        <p className="text-xs text-slate-400 italic">Sin iniciativas en esta fase</p>
                      ) : (
                        items.map((item, itemIdx) => (
                          <div key={item.id} className="flex items-center">
                            <FlowNode
                              item={item}
                              color={color}
                              onToggle={handleToggle}
                              onEdit={setEditingItem}
                              onDelete={handleDelete}
                            />
                            {itemIdx < items.length - 1 && <Arrow />}
                          </div>
                        ))
                      )}

                      {/* Botón agregar */}
                      {items.length > 0 && <Arrow />}
                      <button
                        type="button"
                        onClick={() => setAddingPhase(addingPhase === phase.id ? null : phase.id)}
                        className={`flex-shrink-0 w-9 h-9 rounded-xl border-2 border-dashed ${color.border} flex items-center justify-center text-slate-400 hover:text-slate-600 hover:border-slate-400 transition-all text-lg leading-none`}
                        title="Agregar iniciativa"
                      >
                        +
                      </button>
                    </div>

                    {/* Formulario inline */}
                    {addingPhase === phase.id && (
                      <div className="w-full mt-4 max-w-sm">
                        <RoadmapItemForm
                          phaseId={phase.id}
                          onSubmit={(data) => handleAdd(phase.id, data)}
                          onCancel={() => setAddingPhase(null)}
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Conector vertical entre carriles */}
                {!isLast && (
                  <div className="flex items-center justify-start pl-14 py-0">
                    <div className="flex flex-col items-center">
                      <div className="w-px h-4 bg-slate-300" />
                      <svg className="w-3 h-3 text-slate-400 -mt-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                )}
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
