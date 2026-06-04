'use client'

import { useState, useEffect } from 'react'
import type { InteractionModel } from '@/types/assessment'
import type { SimulationConfig, SimImpact, SimAIInsight } from '@/lib/simulations'

type SimState = 'idle' | 'analyzing' | 'results' | 'applied'

interface SimulationAppProps {
  config: SimulationConfig
  interactionModel: InteractionModel
}

const STATUS_STYLES = {
  ok:       'bg-emerald-50 text-emerald-700',
  warning:  'bg-amber-50 text-amber-700',
  critical: 'bg-red-50 text-red-700',
}

const INSIGHT_STYLES: Record<SimAIInsight['type'], string> = {
  prediction:     'border-l-blue-400 bg-blue-50',
  alert:          'border-l-red-400 bg-red-50',
  recommendation: 'border-l-indigo-400 bg-indigo-50',
  automation:     'border-l-emerald-400 bg-emerald-50',
  insight:        'border-l-violet-400 bg-violet-50',
}

function ImpactRow({ item }: { item: SimImpact }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0">
      <span className="text-xs text-slate-600 flex-1">{item.label}</span>
      <div className="flex items-center gap-3 shrink-0">
        <span className="text-xs text-slate-400 line-through">{item.before}</span>
        <span className="text-xs">→</span>
        <span className="text-xs font-semibold text-emerald-700">{item.after}</span>
      </div>
    </div>
  )
}

export default function SimulationApp({ config, interactionModel }: SimulationAppProps) {
  const [simState, setSimState] = useState<SimState>('idle')
  const [dotCount, setDotCount] = useState(0)
  const variant = config.variants[interactionModel]

  useEffect(() => {
    if (simState !== 'analyzing') return
    const interval = setInterval(() => setDotCount((d) => (d + 1) % 4), 400)
    const timeout  = setTimeout(() => setSimState('results'), 2200)
    return () => { clearInterval(interval); clearTimeout(timeout) }
  }, [simState])

  function handleReset() {
    setSimState('idle')
    setDotCount(0)
  }

  return (
    <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-xl bg-white">

      {/* Barra de simulación */}
      <div className="bg-slate-800 px-4 py-1.5 flex items-center gap-2">
        <div className="flex gap-1.5">
          <span className="w-3 h-3 rounded-full bg-red-400" />
          <span className="w-3 h-3 rounded-full bg-amber-400" />
          <span className="w-3 h-3 rounded-full bg-emerald-400" />
        </div>
        <span className="text-slate-400 text-xs font-mono flex-1 text-center">
          app.{config.appName.toLowerCase().replace(/\s/g, '')}.ai — simulación interactiva
        </span>
        <button
          type="button"
          onClick={handleReset}
          className="text-slate-500 hover:text-slate-300 text-xs transition-colors"
        >
          ↺ Reiniciar
        </button>
      </div>

      {/* Navbar de la app simulada */}
      <div className={`${config.colorAccent} px-6 py-3 flex items-center justify-between`}>
        <div className="flex items-center gap-3">
          <span className="text-2xl">{config.appIcon}</span>
          <div>
            <p className="text-white font-bold text-sm leading-none">{config.appName}</p>
            <p className="text-white/70 text-xs">{config.tagline}</p>
          </div>
        </div>
        <nav className="hidden md:flex gap-1">
          {config.navItems.map((item, i) => (
            <button
              key={item}
              type="button"
              className={`text-xs px-3 py-1.5 rounded-lg transition-all ${
                i === config.navItems.length - 1
                  ? 'bg-white/20 text-white font-semibold'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              {item}
            </button>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white text-xs font-bold">
            AD
          </div>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 px-6 py-4 border-b border-slate-100 bg-slate-50/50">
        {config.kpis.map((kpi) => (
          <div key={kpi.label} className="bg-white rounded-xl border border-slate-200 p-3 shadow-sm">
            <p className="text-xs text-slate-400 mb-1">{kpi.label}</p>
            <p className="text-lg font-bold text-slate-900">{kpi.value}</p>
            <p className={`text-xs font-medium mt-0.5 ${kpi.positive ? 'text-emerald-600' : 'text-red-500'}`}>
              {kpi.change}
            </p>
          </div>
        ))}
      </div>

      {/* Contenido principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 divide-y lg:divide-y-0 lg:divide-x divide-slate-100">

        {/* Tabla de datos — 2/3 */}
        <div className="lg:col-span-2 p-5">
          <h3 className="text-sm font-semibold text-slate-700 mb-3">{config.tableTitle}</h3>
          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  {config.tableHeaders.map((h) => (
                    <th key={h} className="text-left px-3 py-2.5 text-slate-500 font-semibold whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {config.tableRows.map((row, i) => (
                  <tr
                    key={i}
                    className={`border-b border-slate-100 last:border-0 transition-colors ${
                      row.highlight ? 'bg-amber-50/40' : 'hover:bg-slate-50'
                    }`}
                  >
                    {row.cells.map((cell, j) => (
                      <td
                        key={j}
                        className={`px-3 py-2.5 whitespace-nowrap ${
                          j === row.cells.length - 1 && row.status
                            ? `font-semibold text-xs px-2 py-1 rounded-full ${STATUS_STYLES[row.status] ?? ''}`
                            : 'text-slate-700'
                        }`}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Panel de IA — 1/3 */}
        <div className="p-5 flex flex-col">
          <div className="flex items-center gap-2 mb-2">
            <div className={`w-2 h-2 rounded-full ${simState === 'analyzing' ? 'bg-amber-400 animate-pulse' : simState === 'results' || simState === 'applied' ? 'bg-emerald-400' : 'bg-slate-300'}`} />
            <h3 className="text-sm font-semibold text-slate-700">{variant.panelTitle}</h3>
          </div>

          {simState === 'idle' && (
            <div className="flex-1 flex flex-col">
              <p className="text-xs text-slate-500 leading-relaxed mb-5">{variant.panelIntro}</p>
              <button
                type="button"
                onClick={() => setSimState('analyzing')}
                className={`w-full py-3 px-4 rounded-xl text-sm font-semibold text-white transition-all shadow-md hover:shadow-lg ${config.colorAccent} hover:opacity-90`}
              >
                {variant.actionLabel}
              </button>
            </div>
          )}

          {simState === 'analyzing' && (
            <div className="flex-1 flex flex-col items-center justify-center gap-4 py-6">
              <div className={`w-12 h-12 rounded-full ${config.colorLight} flex items-center justify-center`}>
                <span className="text-2xl animate-spin">⚙️</span>
              </div>
              <div className="text-center">
                <p className={`text-sm font-semibold ${config.colorText} mb-2`}>
                  Procesando{'.'.repeat(dotCount + 1)}
                </p>
                <p className="text-xs text-slate-400 leading-relaxed max-w-[200px] text-center">
                  {variant.processingMessage}
                </p>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                <div className={`h-full ${config.colorAccent} rounded-full animate-pulse`} style={{ width: '75%' }} />
              </div>
            </div>
          )}

          {simState === 'results' && (
            <div className="flex-1 flex flex-col gap-3 overflow-y-auto max-h-[340px] pr-1">
              {variant.insights.map((insight, i) => (
                <div
                  key={i}
                  className={`border-l-4 rounded-r-xl px-3 py-2.5 animate-fade-in ${INSIGHT_STYLES[insight.type]}`}
                  style={{ animationDelay: `${i * 150}ms` }}
                >
                  <p className="text-xs font-semibold text-slate-800 mb-0.5 flex items-center gap-1.5">
                    <span>{insight.icon}</span>
                    {insight.title}
                  </p>
                  <p className="text-xs text-slate-600 leading-relaxed">{insight.description}</p>
                </div>
              ))}
              <button
                type="button"
                onClick={() => setSimState('applied')}
                className="w-full mt-2 py-2.5 rounded-xl text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 transition-all shadow-sm"
              >
                ✓ Aplicar recomendaciones
              </button>
            </div>
          )}

          {simState === 'applied' && (
            <div className="flex-1 flex flex-col gap-2 animate-fade-in">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-emerald-500 text-lg">✓</span>
                <p className="text-sm font-semibold text-emerald-700">Impacto proyectado</p>
              </div>
              <p className="text-xs text-slate-500 mb-2">Con IA implementada vs. proceso actual:</p>
              <div className="flex-1">
                {variant.impacts.map((impact, i) => (
                  <ImpactRow key={i} item={impact} />
                ))}
              </div>
              <div className={`mt-3 rounded-xl px-3 py-2.5 text-center ${config.colorLight}`}>
                <p className={`text-xs font-semibold ${config.colorText}`}>
                  🎯 Esto es lo que la IA puede lograr en tu organización
                </p>
              </div>
              <button
                type="button"
                onClick={handleReset}
                className="w-full mt-1 py-2 text-xs text-slate-500 hover:text-slate-700 border border-slate-200 rounded-xl transition-all"
              >
                ↺ Ver de nuevo
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Footer de la app simulada */}
      <div className="border-t border-slate-100 px-6 py-2.5 bg-slate-50 flex items-center justify-between">
        <span className="text-xs text-slate-400">{config.appName} v2.4 · Powered by AI</span>
        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${config.colorLight} ${config.colorText}`}>
          ✓ Sistema activo
        </span>
      </div>
    </div>
  )
}
