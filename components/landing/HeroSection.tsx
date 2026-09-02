import Link from 'next/link'

const TRUST_POINTS = [
  'Sin registro',
  '5 minutos',
  'Resultados instantáneos',
  'Roadmap a 12 meses',
]

const PREVIEW_SCORES = [
  { label: 'Automatización', value: 78, barClass: 'bg-indigo-500', textClass: 'text-indigo-600' },
  { label: 'Agencia', value: 54, barClass: 'bg-violet-500', textClass: 'text-violet-600' },
  { label: 'Aumentación', value: 41, barClass: 'bg-cyan-500', textClass: 'text-cyan-600' },
]

export default function HeroSection() {
  return (
    <section id="inicio" className="relative overflow-hidden">
      {/* Fondo decorativo */}
      <div className="absolute inset-0 -z-10 bg-grid-slate [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)]" />
      <div className="absolute -z-10 top-[-12rem] left-1/2 -translate-x-1/2 w-[46rem] h-[46rem] rounded-full bg-blue-200/35 blur-3xl" />
      <div className="absolute -z-10 top-[6rem] right-[-10rem] w-[30rem] h-[30rem] rounded-full bg-indigo-200/30 blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 pt-16 pb-20 lg:pt-24 lg:pb-28 grid lg:grid-cols-[1.05fr_1fr] gap-14 items-center">
        {/* Columna de texto */}
        <div className="text-center lg:text-left">
          <div className="inline-flex items-center gap-2 bg-white border border-slate-200 text-slate-600 text-xs font-medium px-3 py-1.5 rounded-full mb-6 shadow-sm animate-fade-up">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
            Diagnóstico gratuito
          </div>

          <h1
            className="text-4xl sm:text-5xl lg:text-[3.4rem] font-semibold text-slate-900 leading-[1.08] tracking-tight mb-6 animate-fade-up"
            style={{ animationDelay: '60ms' }}
          >
            <span className="relative inline-block">
              <span className="relative z-10 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Cómo empezar
              </span>
              <span className="absolute inset-x-0 bottom-1 h-3 bg-blue-100 -z-0 rounded" />
            </span>{' '}
            con IA en tu organización
          </h1>

          <p
            className="text-lg text-slate-600 max-w-xl mx-auto lg:mx-0 leading-relaxed mb-3 lg:text-justify animate-fade-up"
            style={{ animationDelay: '120ms' }}
          >
            Responde 10 preguntas sobre tu operación y obtén una recomendación personalizada: el
            modelo de interacción más adecuado, la tecnología a utilizar y un roadmap concreto para
            los próximos 12 meses.
          </p>

          {/* El reparto de márgenes deja los botones a la misma altura que con un solo párrafo. */}
          <p
            className="text-base text-slate-500 max-w-xl mx-auto lg:mx-0 leading-relaxed mb-8 lg:text-justify animate-fade-up"
            style={{ animationDelay: '150ms' }}
          >
            ¿Quieres verlo en acción antes de empezar? Explora una simulación de IA aplicada a tu
            industria.
          </p>

          <div
            className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-8 animate-fade-up"
            style={{ animationDelay: '180ms' }}
          >
            <Link
              href="/assessment"
              className="group bg-blue-600 hover:bg-blue-700 text-white font-semibold px-7 py-3.5 rounded-xl text-base transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
            >
              Iniciar diagnóstico
              <span className="inline-block ml-2 transition-transform group-hover:translate-x-0.5">→</span>
            </Link>
            <Link
              href="/explore"
              className="bg-white border border-slate-300 hover:border-blue-300 text-slate-700 hover:text-blue-700 font-medium px-7 py-3.5 rounded-xl text-base transition-all shadow-sm"
            >
              Ver simulaciones primero
            </Link>
          </div>

          <ul
            className="flex flex-wrap gap-x-6 gap-y-2 justify-center lg:justify-start text-sm text-slate-500 animate-fade-up"
            style={{ animationDelay: '240ms' }}
          >
            {TRUST_POINTS.map((point) => (
              <li key={point} className="flex items-center gap-1.5">
                <span className="text-emerald-500">✓</span>
                {point}
              </li>
            ))}
          </ul>
        </div>

        {/* Vista previa del resultado */}
        <div className="animate-fade-up" style={{ animationDelay: '300ms' }}>
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-tr from-blue-100/60 to-indigo-100/60 rounded-3xl blur-2xl -z-10" />
            <div className="bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden">
              <div className="flex items-center gap-1.5 px-4 py-3 border-b border-slate-100 bg-slate-50">
                <span className="w-2.5 h-2.5 rounded-full bg-red-300" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-300" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-300" />
                <span className="ml-3 text-xs text-slate-400">Resultado del diagnóstico</span>
              </div>

              <div className="p-6 pb-16">
                <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-1">
                  Modelo recomendado
                </p>
                <p className="text-xl font-semibold text-slate-900 mb-5">
                  Automatización + IA Generativa Local
                </p>

                <div className="space-y-3.5 mb-6">
                  {PREVIEW_SCORES.map((score) => (
                    <div key={score.label}>
                      <div className="flex justify-between text-sm mb-1.5">
                        <span className="text-slate-600">{score.label}</span>
                        <span className={`font-semibold ${score.textClass}`}>{score.value}%</span>
                      </div>
                      <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                        <div
                          className={`h-full rounded-full ${score.barClass}`}
                          style={{ width: `${score.value}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-slate-100 pt-4 grid grid-cols-3 gap-3 text-center">
                  {[
                    { label: 'Fase 1', value: '0-3 meses' },
                    { label: 'Fase 2', value: '3-6 meses' },
                    { label: 'Fase 3', value: '6-12 meses' },
                  ].map((phase) => (
                    <div key={phase.label} className="bg-slate-50 rounded-lg py-2.5">
                      <p className="text-[11px] text-slate-400">{phase.label}</p>
                      <p className="text-xs font-medium text-slate-700">{phase.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="hidden sm:block absolute -bottom-5 -left-5 bg-white border border-slate-200 rounded-xl shadow-lg px-4 py-3 animate-float-slow">
              <p className="text-[11px] text-slate-400">Roadmap generado</p>
              <p className="text-sm font-semibold text-slate-800">20+ iniciativas priorizadas</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
