'use client'

import { useState, useEffect, useCallback } from 'react'
import type { Roadmap, RoadmapItem, RoadmapPhaseId } from '@/types/assessment'
import { ROADMAP_PHASES, saveRoadmap, downloadRoadmap, buildMailtoLink } from '@/lib/roadmap'
import RoadmapPhase from './RoadmapPhase'
import RoadmapItemForm from './RoadmapItemForm'

interface RoadmapBoardProps {
  roadmap: Roadmap
  onUpdateRoadmap: (updated: Roadmap) => void
}

export default function RoadmapBoard({ roadmap, onUpdateRoadmap }: RoadmapBoardProps) {
  const [editingItem, setEditingItem]   = useState<RoadmapItem | null>(null)
  const [emailModal, setEmailModal]     = useState(false)
  const [emailInput, setEmailInput]     = useState('')
  const [emailSent, setEmailSent]       = useState(false)

  useEffect(() => { saveRoadmap(roadmap) }, [roadmap])

  const update = useCallback(
    (newItems: RoadmapItem[]) => onUpdateRoadmap({ ...roadmap, items: newItems }),
    [roadmap, onUpdateRoadmap]
  )

  function handleAddItem(phaseId: RoadmapPhaseId, data: Omit<RoadmapItem, 'id' | 'createdAt' | 'source'>) {
    update([...roadmap.items, { ...data, id: crypto.randomUUID(), source: 'user', createdAt: new Date().toISOString() }])
  }
  function handleToggleComplete(id: string) {
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
    const mailto = buildMailtoLink(emailInput.trim(), roadmap)
    window.open(mailto, '_blank')
    setEmailSent(true)
    setTimeout(() => { setEmailSent(false); setEmailModal(false); setEmailInput('') }, 2000)
  }

  const completedTotal = roadmap.items.filter((i) => i.completed).length
  const totalItems     = roadmap.items.length

  return (
    <div>
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
        <div className="flex-1 min-w-0">
          <h2 className="text-xl font-semibold text-slate-900">
            4D Framework for AI Fluency — Roadmap
          </h2>
          <p className="text-sm text-slate-500 mt-0.5">
            {completedTotal} de {totalItems} iniciativas completadas
          </p>
          {/* Barra de progreso global */}
          <div className="flex items-center gap-3 mt-3 max-w-xs">
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

        {/* Acciones: Descargar + Email */}
        <div className="flex gap-2 shrink-0">
          <button
            type="button"
            onClick={() => downloadRoadmap(roadmap)}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 hover:border-blue-400 text-slate-600 hover:text-blue-700 text-sm font-medium rounded-xl transition-all shadow-sm"
            title="Descargar roadmap como archivo de texto"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Descargar
          </button>
          <button
            type="button"
            onClick={() => setEmailModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-xl transition-all shadow-sm"
            title="Enviar roadmap por correo electrónico"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Enviar por email
          </button>
        </div>
      </div>

      {/* Leyenda 4D */}
      <div className="flex flex-wrap gap-2 mb-5">
        {[
          { label: 'D1 · Discover', color: 'bg-blue-50 text-blue-700 border-blue-200' },
          { label: 'D2 · Design',   color: 'bg-violet-50 text-violet-700 border-violet-200' },
          { label: 'D3 · Deploy',   color: 'bg-amber-50 text-amber-700 border-amber-200' },
          { label: 'D4 · Direct',   color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
        ].map((d) => (
          <span key={d.label} className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${d.color}`}>
            {d.label}
          </span>
        ))}
        <span className="text-xs text-slate-400 self-center ml-1">
          Framework de AI Fluency · Anthropic
        </span>
      </div>

      {/* Leyenda de fuente */}
      <div className="flex gap-3 text-xs text-slate-400 mb-5">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 bg-blue-500 rounded-full" /> Recomendado por el sistema
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 bg-slate-300 rounded-full" /> Agregado por ti
        </span>
      </div>

      {/* Board de fases */}
      <div className="overflow-x-auto pb-4">
        <div className="flex gap-4" style={{ minWidth: 'max-content' }}>
          {ROADMAP_PHASES.map((phase) => (
            <RoadmapPhase
              key={phase.id}
              phase={phase}
              items={roadmap.items.filter((item) => item.phaseId === phase.id)}
              onAddItem={handleAddItem}
              onToggleComplete={handleToggleComplete}
              onEdit={setEditingItem}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </div>

      {/* Modal: edición de item */}
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

      {/* Modal: envío por email */}
      {emailModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 w-full max-w-sm shadow-2xl">
            <h3 className="text-base font-semibold text-slate-900 mb-1">Enviar roadmap por email</h3>
            <p className="text-sm text-slate-500 mb-5">
              Ingresa la dirección de correo y se abrirá tu cliente de email con el roadmap listo para enviar.
            </p>
            <input
              type="email"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendEmail()}
              placeholder="nombre@empresa.com"
              className="w-full bg-white border border-slate-300 text-slate-900 text-sm rounded-xl px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-slate-400 shadow-sm"
              autoFocus
            />
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleSendEmail}
                disabled={!emailInput.trim() || emailSent}
                className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-200 disabled:text-slate-400 text-white text-sm font-semibold py-2.5 rounded-xl transition-all shadow-sm"
              >
                {emailSent ? '✓ Abriendo tu email...' : 'Abrir en mi email →'}
              </button>
              <button
                type="button"
                onClick={() => { setEmailModal(false); setEmailInput('') }}
                className="px-4 bg-white border border-slate-200 text-slate-600 hover:text-slate-900 text-sm rounded-xl transition-all"
              >
                Cancelar
              </button>
            </div>
            <p className="text-xs text-slate-400 mt-3 text-center">
              Abre tu cliente de correo (Outlook, Gmail, etc.) con el roadmap en el cuerpo del mensaje.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
