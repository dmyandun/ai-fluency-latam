'use client'

import { useState, useRef, useEffect } from 'react'
import Script from 'next/script'
import type { AssessmentResult, WorkActivity } from '@/types/assessment'
import { CALENDLY_URL, buildDiagnosisSummary } from '@/lib/contact'
import ActivityListInput from './ActivityListInput'
import { LATAM_COUNTRIES } from '@/lib/countries'

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
  const [country, setCountry] = useState('')
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
        customAnswers: { a1: buildDiagnosisSummary(result, activities, country) },
      },
    })
  }, [step, scriptReady, name, email, country, activities, result])

  // El país es obligatorio: define la zona horaria y el contexto de la reunión.
  const canContinue = activities.length > 0 && country !== ''

  function handleClose() {
    onClose()
    setStep('form')
    setActivities([])
    setName('')
    setEmail('')
    setCountry('')
    setCalendarLoaded(false)
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
                industria. Para cada una, marca según tu criterio cómo crees que se podría automatizar
                (<span className="text-violet-700">🤖 Solo IA</span>, <span className="text-blue-700">🤝 Humano + IA</span> o
                {' '}<span className="text-emerald-700">👤 Solo humano</span>) y dale a Agregar.
              </p>
              <ActivityListInput activities={activities} onChange={setActivities} />
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
              <div>
                <label htmlFor="consultation-country" className="text-xs font-medium text-slate-600 mb-1 block">
                  Tu país <span className="text-red-500" aria-hidden="true">*</span>
                </label>
                <select
                  id="consultation-country"
                  value={country}
                  required
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full bg-white border border-slate-300 text-slate-900 text-sm rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                >
                  <option value="">— Elige tu país —</option>
                  {LATAM_COUNTRIES.map((option) => (
                    <option key={option.code} value={option.code}>
                      {option.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setStep('schedule')}
              disabled={!canContinue}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-200 disabled:text-slate-400 text-white font-semibold py-3 rounded-xl text-sm transition-all shadow-sm"
            >
              Continuar a agendar →
            </button>
            {!canContinue && (
              <p className="text-xs text-slate-400 text-center">
                {activities.length === 0
                  ? 'Agrega al menos una actividad y elige tu país para continuar.'
                  : 'Elige tu país para continuar.'}
              </p>
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
