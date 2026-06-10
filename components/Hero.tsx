'use client'

import Link from 'next/link'

const MODELS = [
  {
    name: 'Automatización',
    icon: '⚙️',
    description: 'IA para automatizar tareas repetitivas, basadas en reglas, operativas y transaccionales.',
    cardClass: 'border-indigo-200 bg-indigo-50/50',
    badgeClass: 'bg-indigo-100 text-indigo-700',
  },
  {
    name: 'Agencia',
    icon: '🤖',
    description: 'Agentes que razonan, planifican, usan herramientas y ejecutan acciones semi-autónomas.',
    cardClass: 'border-violet-200 bg-violet-50/50',
    badgeClass: 'bg-violet-100 text-violet-700',
  },
  {
    name: 'Aumentación',
    icon: '🧠',
    description: 'IA para potenciar el criterio humano, la creatividad, el análisis experto y la toma de decisiones complejas.',
    cardClass: 'border-cyan-200 bg-cyan-50/50',
    badgeClass: 'bg-cyan-100 text-cyan-700',
  },
]

export default function Hero() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Navbar */}
      <nav className="bg-white border-b border-slate-200 px-6 py-4 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <span className="text-lg font-semibold text-slate-900 tracking-tight">
            AI Fluency <span className="text-blue-600">LATAM</span>
          </span>
          <Link
            href="/explore"
            className="text-sm bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg transition-colors shadow-sm"
          >
            Ver simulaciones
          </Link>
        </div>
      </nav>

      {/* Hero principal */}
      <section className="flex-1 flex flex-col items-center justify-center px-6 py-20 text-center max-w-5xl mx-auto w-full">
        <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 text-blue-700 text-xs font-medium px-3 py-1.5 rounded-full mb-6">
          <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
          Diagnóstico gratuito para organizaciones de Latinoamérica
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-slate-900 leading-tight tracking-tight mb-6">
          Descubre qué tipo de IA{' '}
          <span className="text-blue-600">
            necesita tu organización
          </span>
        </h1>

        <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed mb-10">
          AI Fluency LATAM analiza tu industria, madurez operativa y contexto para recomendarte el
          modelo de IA y tipo de implementación más adecuados para tu empresa.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
          <Link
            href="/explore"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-xl text-base transition-all shadow-md hover:shadow-lg"
          >
            Ver simulaciones →
          </Link>
          <a
            href="#modelos"
            className="bg-white border border-slate-300 hover:border-blue-300 text-slate-700 hover:text-blue-700 font-medium px-8 py-4 rounded-xl text-base transition-all shadow-sm"
          >
            Conocer los modelos
          </a>
        </div>

        <div className="flex flex-wrap gap-8 justify-center text-sm text-slate-400">
          <span>✓ Sin registro requerido</span>
          <span>✓ Diagnóstico en 5 minutos</span>
          <span>✓ Resultados instantáneos</span>
          <span>✓ Roadmap personalizado incluido</span>
        </div>
      </section>

      {/* Sección de modelos */}
      <section id="modelos" className="px-6 py-20 border-t border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900 mb-4">
              Tres modelos de interacción con IA
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto">
              No toda la IA es igual. Dependiendo de tu contexto, uno de estos tres enfoques será
              significativamente más efectivo para tu organización.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {MODELS.map((model) => (
              <div
                key={model.name}
                className={`border rounded-xl p-6 transition-all ${model.cardClass}`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">{model.icon}</span>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${model.badgeClass}`}>
                    {model.name}
                  </span>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed">{model.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sección de implementación */}
      <section className="px-6 py-20 border-t border-slate-200 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900 mb-4">
              Y tres tipos de implementación
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto">
              El mejor modelo de interacción con la tecnología correcta: local, en la nube o ML clásico.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: '🔒',
                title: 'IA Generativa Local',
                desc: 'Para datos sensibles, privacidad regulatoria o necesidad de control total sobre la infraestructura.',
                cardClass: 'border-emerald-200 bg-emerald-50/50',
                badgeClass: 'bg-emerald-100 text-emerald-700',
              },
              {
                icon: '⚡',
                title: 'IA Generativa vía API',
                desc: 'Para creatividad, prototipado rápido, asistentes conversacionales y generación de contenido.',
                cardClass: 'border-amber-200 bg-amber-50/50',
                badgeClass: 'bg-amber-100 text-amber-700',
              },
              {
                icon: '📊',
                title: 'IA Tradicional / ML Python',
                desc: 'Para forecasting, clasificación, scoring, detección de anomalías y predicciones con datos estructurados.',
                cardClass: 'border-blue-200 bg-blue-50/50',
                badgeClass: 'bg-blue-100 text-blue-700',
              },
            ].map((item) => (
              <div key={item.title} className={`border rounded-xl p-6 transition-all ${item.cardClass}`}>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">{item.icon}</span>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${item.badgeClass}`}>
                    {item.title}
                  </span>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="px-6 py-20 border-t border-slate-200 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900 mb-4">
            ¿Listo para descubrir tu camino hacia la IA?
          </h2>
          <p className="text-slate-500 mb-8">
            El diagnóstico toma menos de 5 minutos y te entrega un roadmap concreto para los próximos 12 meses.
          </p>
          <Link
            href="/explore"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-10 py-4 rounded-xl text-base transition-all shadow-md hover:shadow-lg"
          >
            Ver simulaciones →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 px-6 py-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-400">
          <span>
            AI Fluency <span className="text-blue-600">LATAM</span> — Diagnóstico de adopción de IA
          </span>
          <div className="flex items-center gap-4">
            <span>Diseñado para organizaciones de Latinoamérica</span>
            <Link href="/privacy" className="hover:text-slate-600 transition-colors underline underline-offset-2">
              Política de privacidad
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
