'use client'

import { useState, useRef, useEffect } from 'react'
import Script from 'next/script'
import type { AssessmentResult, WorkActivity } from '@/types/assessment'
import { CALENDLY_URL, buildDiagnosisSummary } from '@/lib/contact'
import ActivityInput from './ActivityInput'

interface ConsultationModalProps {
  result: AssessmentResult
  open: boolean
  onClose: () => void
}

interface CalendlyApi {
  initInlineWidget: (opts: {
    url: string
    parentElement: HTMLElement
    prefill?: { name?: string; email?: string; customAnswers?: Record<string, string> }
  }) => void
}

declare global {
  interface Window {
    Calendly?: CalendlyApi
  }
}

type Step = 'form' | 'schedule'

export default function ConsultationModal({ result, open, onClose }: ConsultationModalProps) {
  const [step, setStep] = useState<Step>('form')
  const [activities, setActivities] = useState<WorkActivity[]>([])
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [scriptReady, setScriptReady] = useState(false)
  const widgetRef = useRef<HTMLDivElement>(null)

  // Inicializar el widget de Calendly cuando llegamos al paso de agendar
  useEffect(() => {
    if (step !== 'schedule' || !scriptReady || !widgetRef.current || !window.Calendly) return
    widgetRef.current.innerHTML = ''
    window.Calendly.initInlineWidget({
      url: CALENDLY_URL,
      parentElement: widgetRef.current,
      prefill: {
        name: name.trim() || undefined,
        email: email.trim() || undefined,
        customAnswers: { a1: buildDiagnosisSummary(result, activities) },
      },
    })
  }, [step, scriptReady, name, email, activities, result])

  function handleClose() {
    onClose()
    // Reset al cerrar
    setStep('form')
    setActivities([])
    setName('')
    setEmail('')
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="afterInteractive"
        onLoad={() => setScriptReady(true)}
      />
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 sticky top-0 bg-white z-10">
          <div>
            <h3 className="text-base font-semibold text-slate-900">Agenda tu consultoría de IA</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              {step === 'form'
                ? 'Cuéntanos qué tareas te consumen más tiempo para preparar la reunión'
                : 'Elige el horario que mejor te funcione'}
            </p>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="w-8 h-8 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 flex items-center justify-center transition-all"
            aria-label="Cerrar"
          >
            ✕
          </button>
        </div>

        {/* Paso 1: tareas + contacto */}
        {step === 'form' && (
          <div className="px-6 py-5 space-y-5">
            <div>
              <p className="text-sm font-medium text-slate-800 mb-1">
                ¿Cuáles son las 5 tareas que más tiempo te consumen?
              </p>
              <p className="text-xs text-slate-500 mb-3">
                Sé específico — esto nos ayuda a identificar dónde la IA puede tener mayor impacto en tu caso.
              </p>
              <ActivityInput activities={activities} onChange={setActivities} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-medium text-slate-600 mb-1 block">Tu nombre</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nombre y apellido"
                  className="w-full bg-white border border-slate-300 text-slate-900 text-sm rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-slate-400"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-slate-600 mb-1 block">Tu email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nombre@empresa.com"
                  className="w-full bg-white border border-slate-300 text-slate-900 text-sm rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-slate-400"
                />
              </div>
            </div>

            <button
              type="button"
              onClick={() => setStep('schedule')}
              disabled={activities.length === 0}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-200 disabled:text-slate-400 text-white font-semibold py-3 rounded-xl text-sm transition-all shadow-sm"
            >
              Continuar a agendar →
            </button>
            {activities.length === 0 && (
              <p className="text-xs text-slate-400 text-center">Agrega al menos una tarea para continuar.</p>
            )}
          </div>
        )}

        {/* Paso 2: Calendly inline embed */}
        {step === 'schedule' && (
          <div className="px-2 py-2">
            <button
              type="button"
              onClick={() => setStep('form')}
              className="text-xs text-slate-500 hover:text-slate-700 px-4 py-2"
            >
              ← Volver a editar tareas
            </button>
            <div ref={widgetRef} style={{ minWidth: '320px', height: '640px' }} />
            {!scriptReady && (
              <p className="text-center text-sm text-slate-400 py-8">Cargando calendario…</p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
