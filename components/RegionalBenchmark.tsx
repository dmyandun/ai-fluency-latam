import type { AssessmentResult } from '@/types/assessment'
import { MODEL_LABELS } from '@/lib/recommendations'
import {
  BENCHMARK_SOURCES,
  IMPLEMENTATION_BENCHMARK,
  IMPLEMENTATION_LEADERBOARD,
  INTERACTION_BENCHMARK,
  type BenchmarkStat,
} from '@/lib/regional-benchmark'
import { REAL_CASES_BY_INDUSTRY } from '@/lib/real-cases'
import { INDUSTRIES } from '@/lib/industries'

function ScopeChip({ scope }: { scope: BenchmarkStat['scope'] }) {
  const isRegion = scope === 'region'
  return (
    <span
      className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full border ${
        isRegion
          ? 'bg-blue-50 text-blue-700 border-blue-200'
          : 'bg-slate-100 text-slate-500 border-slate-200'
      }`}
    >
      {isRegion ? 'América Latina' : 'Dato global'}
    </span>
  )
}

function BenchmarkPanel({
  axis,
  pick,
  stat,
  reading,
}: {
  axis: string
  pick: string
  stat: BenchmarkStat
  reading: string
}) {
  const source = BENCHMARK_SOURCES[stat.sourceId]
  return (
    <div className="px-6 py-5">
      <div className="flex items-center justify-between gap-3 mb-4">
        <div className="min-w-0">
          <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">{axis}</p>
          <p className="text-sm font-semibold text-slate-900 truncate">{pick}</p>
        </div>
        <ScopeChip scope={stat.scope} />
      </div>

      <div className="flex items-baseline gap-3">
        <span className="text-3xl font-semibold text-slate-900 tabular-nums shrink-0">
          {stat.value}
        </span>
        <span className="text-sm text-slate-500 leading-snug">{stat.label}</span>
      </div>

      <p className="mt-4 text-sm text-slate-600 leading-relaxed">{reading}</p>

      <p className="mt-4 text-xs text-slate-400">
        {source.publisher} · {source.label}
      </p>
    </div>
  )
}

export default function RegionalBenchmark({ result }: { result: AssessmentResult }) {
  const interaction = INTERACTION_BENCHMARK[result.interactionModel]
  const implementation = IMPLEMENTATION_BENCHMARK[result.implementationType]
  const leaderboard = IMPLEMENTATION_LEADERBOARD[result.implementationType]
  const industryLabel =
    INDUSTRIES.find((i) => i.id === result.industry)?.label ?? result.industry
  /* Sólo seis industrias tienen casos documentados; el resto no pinta el bloque. */
  const industryCases =
    REAL_CASES_BY_INDUSTRY[result.industry]?.[result.interactionModel]?.cases ?? []
  const used = [interaction.stat.sourceId, implementation.stat.sourceId, 'ilia' as const]
  const sources = Object.values(BENCHMARK_SOURCES).filter((s) => used.includes(s.id))

  return (
    <section className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm animate-fade-in">
      <div className="border-b border-slate-100 px-6 py-5">
        <h3 className="text-base font-semibold text-slate-900">Tu diagnóstico frente a la región</h3>
        <p className="text-sm text-slate-500 mt-1 leading-relaxed">
          Dónde queda tu recomendación respecto de lo que ya hace el mercado. Cada cifra viene de un
          informe público y se cita abajo con su método.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-slate-100">
        <BenchmarkPanel
          axis="Modelo de interacción"
          pick={MODEL_LABELS[result.interactionModel] ?? result.interactionModel}
          stat={interaction.stat}
          reading={interaction.reading}
        />
        <BenchmarkPanel
          axis="Tipo de implementación"
          pick={MODEL_LABELS[result.implementationType] ?? result.implementationType}
          stat={implementation.stat}
          reading={implementation.reading}
        />
      </div>

      {/* Quién encabeza la subdimensión de la que depende la tecnología recomendada */}
      <div className="border-t border-slate-100 px-6 py-5 bg-slate-50">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 mb-2">
          <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Quién encabeza la región en {leaderboard.dimension.toLowerCase()}
          </h4>
          <p className="text-xs text-slate-400">ILIA 2025 · sobre 100</p>
        </div>
        <p className="text-sm text-slate-600 leading-relaxed mb-4">{leaderboard.why}</p>

        <div className="space-y-2.5">
          {leaderboard.leaders.map((leader, index) => (
            <div key={leader.country} className="flex items-center gap-3">
              <span className="w-4 text-xs font-semibold text-slate-400 tabular-nums shrink-0">
                {index + 1}
              </span>
              <span className="w-20 text-sm text-slate-700 shrink-0">{leader.country}</span>
              <div className="h-1.5 flex-1 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500 rounded-full transition-all duration-700"
                  style={{ width: `${leader.score}%` }}
                />
              </div>
              <span className="w-12 text-right text-xs font-semibold text-slate-900 tabular-nums shrink-0">
                {leader.score}
              </span>
            </div>
          ))}

          {leaderboard.regionalAverage !== undefined && (
            <div className="flex items-center gap-3 pt-1">
              <span className="w-4 shrink-0" />
              <span className="w-20 text-sm text-slate-400 shrink-0">Promedio</span>
              <div className="h-1.5 flex-1 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-slate-300 rounded-full"
                  style={{ width: `${leaderboard.regionalAverage}%` }}
                />
              </div>
              <span className="w-12 text-right text-xs font-medium text-slate-400 tabular-nums shrink-0">
                {leaderboard.regionalAverage}
              </span>
            </div>
          )}
        </div>

        {leaderboard.note && (
          <p className="mt-4 text-xs text-slate-500 leading-relaxed">{leaderboard.note}</p>
        )}
      </div>

      {/* Casos documentados de la industria: sólo se pintan si existen para ella */}
      {industryCases.length > 0 && (
        <div className="border-t border-slate-100 px-6 py-5">
          <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
            Quién ya lo hace en {industryLabel}
          </h4>
          <p className="text-sm text-slate-500 leading-relaxed mb-4">
            Implementaciones documentadas del mismo modelo de interacción que te recomienda el
            diagnóstico.
          </p>
          <ul className="space-y-2">
            {industryCases.map((useCase) => (
              <li key={useCase} className="text-sm text-slate-600 flex gap-2 leading-relaxed">
                <span className="text-blue-400 mt-0.5 shrink-0">→</span>
                <span>{useCase}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="border-t border-slate-100 px-6 py-4">
        <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
          Fuentes
        </h4>
        <ul className="space-y-1.5">
          {sources.map((source) => (
            <li key={source.id} className="text-xs text-slate-500 leading-relaxed">
              <a
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700 underline underline-offset-2"
              >
                {source.publisher}, {source.label} ({source.year})
              </a>{' '}
              · {source.method}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
