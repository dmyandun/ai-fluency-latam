'use client'

import { useState, useRef, useEffect } from 'react'
import Script from 'next/script'
import type { AssessmentResult, WorkActivity } from '@/types/assessment'
import { CALENDLY_URL, buildDiagnosisSummary } from '@/lib/contact'
import ActivityInput from './ActivityInput'
import ActivityClassifier from './ActivityClassifier'

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
  const [calendarLoaded, setCalendarLoaded] = useState(false)
  const widgetRef = useRef<HTMLDivElement>(null)

  // Detectar cuando el calendario de Calendly terminó de cargar
  useEffect(() => {
    function onMessage(e: MessageEvent) {
      if (typeof e.data === 'object' && e.data?.event === 'calendly.event_type_viewed') {
        setCalendarLoaded(true)
      }
    }
    window.addEventListener('message', onMessage)
    return () => window.removeEventListener('message', onMessage)
  }, [])

  // Inicializar el widget de Calendly cuando llegamos al paso de agendar
  useEffect(() => {
    if (step !== 'schedule' || !scriptReady || !widgetRef.current || !window.Calendly) return
    setCalendarLoaded(false)
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
    setStep('form')
    setActivities([])
    setName('')
    setEmail('')
    setCalendarLoaded(false)
  }

  if (!open) return null

  const allClassified = activities.length > 0 && activities.every((a) => a.category !== null)

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
                ? 'Cuéntanos sobre tu operación para preparar una reunión enfocada en tu caso'
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

        {/* Paso 1: tareas + clasificación + contacto */}
        {step === 'form' && (
          <div className="px-6 py-5 space-y-5">
            <div>
              <p className="text-sm font-semibold text-slate-800 mb-1">
                ¿Cuáles son las 5 actividades clave de tu trabajo?
              </p>
              <p className="text-xs text-slate-500 mb-3 leading-relaxed">
                Pueden ser las tareas que <strong className="text-slate-600">más tiempo te consumen</strong> en tu día a día,
                o los <strong className="text-slate-600">procesos que más problemas o cuellos de botella</strong> generan en tu
                industria. Escríbelas como las vivas tú — esto nos permite enfocar la consultoría en lo que de verdad te importa.
              </p>
              <ActivityInput activities={activities} onChange={setActivities} />
            </div>

            {/* Clasificación de cada actividad */}
            {activities.length > 0 && (
              <div>
                <p className="text-sm font-semibold text-slate-800 mb-1">
                  Según tu criterio, ¿cómo se podría resolver cada una con IA?
                </p>
                <p className="text-xs text-slate-500 mb-3 leading-relaxed">
                  No te preocupes por acertar — es tu intuición. Esto nos da contexto sobre dónde ves
                  más espacio para la automatización.
                </p>
                <div className="flex flex-wrap gap-3 mb-4">
                  {[
                    { icon: '🤖', label: 'Solo IA — la IA puede hacerlo sola',         color: 'text-violet-700 bg-violet-50 border-violet-200' },
                    { icon: '🤝', label: 'Humano + IA — mejor en conjunto',            color: 'text-blue-700 bg-blue-50 border-blue-200' },
                    { icon: '👤', label: 'Solo humano — requiere criterio humano',     color: 'text-emerald-700 bg-emerald-50 border-emerald-200' },
                  ].map((item) => (
                    <span key={item.label} className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full border ${item.color}`}>
                      {item.icon} {item.label}
                    </span>
                  ))}
                </div>
                <ActivityClassifier activities={activities} onChange={setActivities} />
              </div>
            )}

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
            {activities.length === 0 ? (
              <p className="text-xs text-slate-400 text-center">Agrega al menos una actividad para continuar.</p>
            ) : !allClassified ? (
              <p className="text-xs text-slate-400 text-center">Tip: clasifica tus actividades para una reunión más precisa (opcional).</p>
            ) : null}
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
              ← Volver a editar actividades
            </button>
            <div className="relative" style={{ minHeight: '640px' }}>
              {/* Overlay de carga mientras el calendario aparece */}
              {!calendarLoaded && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-white z-10">
                  <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                  <p className="text-sm font-medium text-slate-600">Cargando tu calendario…</p>
                  <p className="text-xs text-slate-400">Esto toma unos segundos, no cierres la ventana</p>
                </div>
              )}
              <div ref={widgetRef} style={{ minWidth: '320px', height: '640px' }} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
