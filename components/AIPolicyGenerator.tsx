'use client'

import { useState } from 'react'
import type { AssessmentResult } from '@/types/assessment'
import { generateAIPolicy, formatPolicyAsText } from '@/lib/policyGenerator'

interface AIPolicyGeneratorProps {
  result: AssessmentResult
}

export default function AIPolicyGenerator({ result }: AIPolicyGeneratorProps) {
  const [companyName, setCompanyName] = useState('')
  const [policy, setPolicy] = useState<ReturnType<typeof generateAIPolicy> | null>(null)
  const [emailInput, setEmailInput] = useState('')
  const [showEmailModal, setShowEmailModal] = useState(false)

  function handleGenerate() {
    if (!companyName.trim()) return
    setPolicy(generateAIPolicy(result, companyName.trim()))
  }

  function handleDownload() {
    if (!policy) return
    const text   = formatPolicyAsText(policy)
    const blob   = new Blob([text], { type: 'text/plain;charset=utf-8' })
    const url    = URL.createObjectURL(blob)
    const anchor = document.createElement('a')
    anchor.href     = url
    anchor.download = `politica-ia-${companyName.toLowerCase().replace(/\s+/g, '-')}.txt`
    anchor.click()
    URL.revokeObjectURL(url)
  }

  function handleSendEmail() {
    if (!policy || !emailInput.trim()) return
    const subject = encodeURIComponent(`Política de Uso de IA — ${policy.companyName}`)
    const body    = encodeURIComponent(formatPolicyAsText(policy))
    window.open(`mailto:${emailInput.trim()}?subject=${subject}&body=${body}`, '_blank')
    setShowEmailModal(false)
    setEmailInput('')
  }

  return (
    <div className="space-y-6">
      {/* Intro */}
      <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6">
        <div className="flex items-start gap-3">
          <span className="text-2xl">📋</span>
          <div>
            <h3 className="text-base font-semibold text-slate-900 mb-1">
              Generador de Política de IA para tu empresa
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Basado en tu diagnóstico y en el <strong>AI Fluency Framework (Delegation · Description · Discernment · Diligence)</strong> de Anthropic,
              generamos un borrador de política de uso de IA personalizado para tu organización.
              Descárgalo y revísalo con tu área legal antes de implementarlo.
            </p>
          </div>
        </div>
      </div>

      {/* Formulario de nombre */}
      {!policy && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Nombre de tu organización
          </label>
          <div className="flex gap-3">
            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
              placeholder="Ej: Empresa ABC S.A."
              className="flex-1 bg-white border border-slate-300 text-slate-900 text-sm rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-slate-400 shadow-sm"
              autoFocus
            />
            <button
              type="button"
              onClick={handleGenerate}
              disabled={!companyName.trim()}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-200 disabled:text-slate-400 text-white font-semibold text-sm rounded-xl transition-all shadow-sm"
            >
              Generar política →
            </button>
          </div>
        </div>
      )}

      {/* Política generada */}
      {policy && (
        <>
          {/* Acciones */}
          <div className="flex flex-wrap gap-3 items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-700">
                Política generada para <strong>{policy.companyName}</strong>
              </p>
              <p className="text-xs text-slate-400">{policy.date} · {policy.sections.length} secciones</p>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setPolicy(null)}
                className="px-3 py-2 bg-white border border-slate-200 text-slate-500 hover:text-slate-700 text-xs rounded-lg transition-all"
              >
                Cambiar nombre
              </button>
              <button
                type="button"
                onClick={() => setShowEmailModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 hover:border-blue-400 text-slate-600 hover:text-blue-700 text-sm font-medium rounded-xl transition-all shadow-sm"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Enviar por email
              </button>
              <button
                type="button"
                onClick={handleDownload}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-xl transition-all shadow-sm"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Descargar .txt
              </button>
            </div>
          </div>

          {/* Contenido de la política */}
          <div className="space-y-4">
            {policy.sections.map((section) => (
              <div key={section.id} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                <div className="bg-slate-50 border-b border-slate-100 px-6 py-3">
                  <h4 className="text-sm font-semibold text-slate-800">{section.title}</h4>
                </div>
                <ul className="px-6 py-4 space-y-2.5">
                  {section.content.map((item, i) => (
                    <li key={i} className="flex gap-3 text-sm text-slate-600 leading-relaxed">
                      <span className="text-blue-400 mt-0.5 shrink-0">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Disclaimer */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl px-5 py-4 flex gap-3">
            <span className="text-amber-500 shrink-0">⚠️</span>
            <p className="text-xs text-amber-700 leading-relaxed">
              <strong>Este es un borrador de referencia</strong> generado automáticamente a partir de tu diagnóstico.
              Debe ser revisado y adaptado por el área legal o de cumplimiento de tu organización antes de implementarlo formalmente.
            </p>
          </div>
        </>
      )}

      {/* Modal email */}
      {showEmailModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 w-full max-w-sm shadow-2xl">
            <h3 className="text-base font-semibold text-slate-900 mb-1">Enviar política por email</h3>
            <p className="text-sm text-slate-500 mb-4">
              Se abrirá tu cliente de correo con la política completa lista para enviar.
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
                className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-200 disabled:text-slate-400 text-white text-sm font-semibold py-2.5 rounded-xl transition-all"
              >
                Abrir en mi email →
              </button>
              <button
                type="button"
                onClick={() => { setShowEmailModal(false); setEmailInput('') }}
                className="px-4 bg-white border border-slate-200 text-slate-600 hover:text-slate-900 text-sm rounded-xl"
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
