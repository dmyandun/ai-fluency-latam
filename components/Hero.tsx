'use client'

import Link from 'next/link'

const MODELS = [
  {
    name: 'Automatización',
    color: 'indigo',
    icon: '⚙️',
    description:
      'IA para automatizar tareas repetitivas, operativas y transaccionales con reglas bien definidas.',
    borderClass: 'border-indigo-500/30 hover:border-indigo-500/60',
    badgeClass: 'bg-indigo-500/10 text-indigo-400',
  },
  {
    name: 'Agencia',
    color: 'violet',
    icon: '🤖',
    description:
      'Agentes que razonan, planifican, usan herramientas y ejecutan acciones de forma semi-autónoma.',
    borderClass: 'border-violet-500/30 hover:border-violet-500/60',
    badgeClass: 'bg-violet-500/10 text-violet-400',
  },
  {
    name: 'Aumentación',
    color: 'cyan',
    icon: '🧠',
    description:
      'IA para potenciar el criterio humano, la creatividad, el análisis experto y la toma de decisiones complejas.',
    borderClass: 'border-cyan-500/30 hover:border-cyan-500/60',
    badgeClass: 'bg-cyan-500/10 text-cyan-400',
  },
]

export default function Hero() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="border-b border-gray-800 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg font-semibold text-white tracking-tight">
              AI Fluency <span className="text-indigo-400">LATAM</span>
            </span>
          </div>
          <Link
            href="/assessment"
            className="text-sm bg-indigo-600 hover:bg-indigo-500 text-white font-medium px-4 py-2 rounded-lg transition-colors"
          >
            Iniciar diagnóstico
          </Link>
        </div>
      </nav>

      {/* Hero principal */}
      <section className="flex-1 flex flex-col items-center justify-center px-6 py-20 text-center max-w-5xl mx-auto w-full">
        <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-medium px-3 py-1.5 rounded-full mb-6">
          <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-pulse" />
          Diagnóstico gratuito para organizaciones de Latinoamérica
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-white leading-tight tracking-tight mb-6">
          Descubre qué tipo de IA{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">
            necesita tu organización
          </span>
        </h1>

        <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed mb-10">
          AI Fluency LATAM analiza tu industria, madurez operativa y contexto para recomendarte el
          modelo de IA y tipo de implementación más adecuados para tu empresa.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
          <Link
            href="/assessment"
            className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-8 py-4 rounded-xl text-base transition-all hover:shadow-lg hover:shadow-indigo-500/20"
          >
            Iniciar diagnóstico gratuito →
          </Link>
          <a
            href="#modelos"
            className="border border-gray-700 hover:border-indigo-500/50 text-gray-300 hover:text-white font-medium px-8 py-4 rounded-xl text-base transition-all"
          >
            Conocer los modelos
          </a>
        </div>

        {/* Indicadores de confianza */}
        <div className="flex flex-wrap gap-8 justify-center text-sm text-gray-500">
          <span>✓ Sin registro requerido</span>
          <span>✓ Diagnóstico en 5 minutos</span>
          <span>✓ Resultados instantáneos</span>
          <span>✓ Roadmap personalizado incluido</span>
        </div>
      </section>

      {/* Sección de modelos */}
      <section id="modelos" className="px-6 py-20 border-t border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-4">
              Tres modelos de interacción con IA
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              No toda la IA es igual. Dependiendo de tu contexto, uno de estos tres enfoques será
              significativamente más efectivo para tu organización.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {MODELS.map((model) => (
              <div
                key={model.name}
                className={`bg-gray-900 border rounded-xl p-6 transition-all ${model.borderClass}`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">{model.icon}</span>
                  <span
                    className={`text-xs font-medium px-2.5 py-1 rounded-full ${model.badgeClass}`}
                  >
                    {model.name}
                  </span>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">{model.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sección de implementación */}
      <section className="px-6 py-20 border-t border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-4">
              Y tres tipos de implementación
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              El mejor modelo de interacción con la tecnología correcta: local, en la nube o ML
              clásico.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: '🔒',
                title: 'IA Generativa Local',
                desc: 'Para datos sensibles, privacidad regulatoria o necesidad de control total sobre la infraestructura.',
                color: 'emerald',
                borderClass: 'border-emerald-500/30',
                badgeClass: 'bg-emerald-500/10 text-emerald-400',
              },
              {
                icon: '⚡',
                title: 'IA Generativa vía API',
                desc: 'Para creatividad, prototipado rápido, asistentes conversacionales y generación de contenido.',
                color: 'amber',
                borderClass: 'border-amber-500/30',
                badgeClass: 'bg-amber-500/10 text-amber-400',
              },
              {
                icon: '📊',
                title: 'IA Tradicional / ML Python',
                desc: 'Para forecasting, clasificación, scoring, detección de anomalías y predicciones con datos estructurados.',
                color: 'blue',
                borderClass: 'border-blue-500/30',
                badgeClass: 'bg-blue-500/10 text-blue-400',
              },
            ].map((item) => (
              <div
                key={item.title}
                className={`bg-gray-900 border rounded-xl p-6 ${item.borderClass}`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">{item.icon}</span>
                  <span
                    className={`text-xs font-medium px-2.5 py-1 rounded-full ${item.badgeClass}`}
                  >
                    {item.title}
                  </span>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="px-6 py-20 border-t border-gray-800">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-4">
            ¿Listo para descubrir tu camino hacia la IA?
          </h2>
          <p className="text-gray-400 mb-8">
            El diagnóstico toma menos de 5 minutos y te entrega un roadmap concreto para los
            próximos 12 meses.
          </p>
          <Link
            href="/assessment"
            className="inline-block bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-10 py-4 rounded-xl text-base transition-all hover:shadow-lg hover:shadow-indigo-500/20"
          >
            Iniciar diagnóstico gratuito →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 px-6 py-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <span>
            AI Fluency <span className="text-indigo-400">LATAM</span> — Diagnóstico de adopción de IA
          </span>
          <div className="flex items-center gap-4">
            <span>Diseñado para organizaciones de Latinoamérica</span>
            <Link href="/privacy" className="hover:text-gray-300 transition-colors underline underline-offset-2">
              Política de privacidad
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
