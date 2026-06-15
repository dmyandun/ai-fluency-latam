'use client'

import type { InteractionModel } from '@/types/assessment'
import type { SimulationConfig, SimVariant } from '@/lib/simulations'
import SimulationChat from '@/components/SimulationChat'
import IndustryVisualization from '@/components/IndustryVisualization'
import BankingWidget, { BANKING_CASES_BY_MODEL } from '@/components/BankingWidgets'

const STATUS_STYLES = {
  ok:       'bg-emerald-50 text-emerald-700',
  warning:  'bg-amber-50 text-amber-700',
  critical: 'bg-red-50 text-red-700',
}

const INTERACTION_MODEL_META: Record<InteractionModel, {
  icon: string; label: string
  pill: string
}> = {
  automation:   { icon: '⚙️', label: 'Automation',   pill: 'bg-indigo-100 text-indigo-700 border-indigo-200' },
  agency:       { icon: '🤖', label: 'Agency',       pill: 'bg-violet-100 text-violet-700 border-violet-200' },
  augmentation: { icon: '🧠', label: 'Augmentation', pill: 'bg-cyan-100   text-cyan-700   border-cyan-200'   },
}

function BibliographyParagraph({ variants }: { variants: InteractionModel[] }) {
  const parts = variants
    .map((m) => {
      const entry = BANKING_CASES_BY_MODEL[m]
      const meta = INTERACTION_MODEL_META[m]
      if (!entry || entry.cases.length === 0) return null
      return `${meta.label}: ${entry.cases.join('; ')}`
    })
    .filter(Boolean)
    .join('. ')

  return (
    <div className="border-t border-slate-100 bg-slate-50/40 px-6 py-4">
      <p className="text-[11px] leading-relaxed text-slate-400">
        <span className="font-semibold text-slate-500">Bibliografía — </span>
        casos reales que inspiraron las simulaciones. {parts}.
      </p>
    </div>
  )
}

interface VariantBodyProps {
  variant: SimVariant
  config: SimulationConfig
  modelMeta?: { icon: string; label: string; pill: string }
  patternIndex?: number
  patternTotal?: number
}

function VariantBody({ variant, config, modelMeta, patternIndex, patternTotal }: VariantBodyProps) {
  return (
    <div className="grid grid-cols-1 gap-0 divide-y divide-slate-100 border-t border-slate-100">

      {/* Tabla de datos o widget visual */}
      <div className="p-5">
        <div className="mb-3 flex items-center gap-2 flex-wrap">
          <h3 className="text-sm font-semibold text-slate-700">{config.tableTitle}</h3>
          {modelMeta && (
            <>
              <span className="text-slate-300">·</span>
              <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full border text-[11px] font-semibold ${modelMeta.pill}`}>
                <span>{modelMeta.icon}</span>
                <span>{modelMeta.label}</span>
              </span>
              {patternIndex !== undefined && patternTotal !== undefined && patternTotal > 1 && (
                <span className="ml-auto text-[10px] uppercase tracking-wide text-slate-400 font-semibold">
                  Patrón {patternIndex + 1} / {patternTotal}
                </span>
              )}
            </>
          )}
        </div>
        {variant.visualWidget ? (
          <BankingWidget widget={variant.visualWidget} />
        ) : (
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
        )}
      </div>

      
    </div>
  )
}

interface SimulationAppProps {
  config: SimulationConfig
  interactionModel: InteractionModel
  industryId: string
  country?: string
  onSchedule?: () => void
  variants?: InteractionModel[]
}

export default function SimulationApp({ config, interactionModel, industryId, country, onSchedule, variants }: SimulationAppProps) {
  const isMulti = Boolean(variants && variants.length > 1)
  const variantsToRender = variants && variants.length > 0 ? variants : [interactionModel]

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
        {!isMulti && <span className="text-slate-500 text-xs">↺ Reiniciar por sección</span>}
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

      {/* Visualización por industria (null para banking) */}
      <IndustryVisualization
        industryId={industryId}
        country={country}
        colorAccent={config.colorAccent}
        colorLight={config.colorLight}
        colorText={config.colorText}
        colorBorder={config.colorBorder}
      />

      {/* Secciones por variante (1 o N) */}
      {variantsToRender.map((m, idx) => {
        const variant = config.variants[m] ?? config.variants['augmentation'] ?? Object.values(config.variants)[0]
        const meta = INTERACTION_MODEL_META[m]
        return (
          <VariantBody
            key={m}
            variant={variant}
            config={config}
            modelMeta={isMulti ? meta : undefined}
            patternIndex={idx}
            patternTotal={variantsToRender.length}
          />
        )
      })}

      {/* Chat con IA real — una sola vez, debajo de todas las secciones */}
      <SimulationChat
        industryId={industryId}
        interactionModel={interactionModel}
        appName={config.appName}
        colorAccent={config.colorAccent}
        colorLight={config.colorLight}
        colorText={config.colorText}
        onSchedule={onSchedule}
      />

      {/* Bibliografía — al final de todo, en párrafo gris pequeño */}
      {industryId === 'banking' && (
        <BibliographyParagraph variants={variantsToRender} />
      )}

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
