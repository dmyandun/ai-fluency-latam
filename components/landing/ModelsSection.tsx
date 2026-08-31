const INTERACTION_MODELS = [
  {
    name: 'Automatización',
    icon: '⚙️',
    tagline: 'La máquina ejecuta, tú supervisas',
    description:
      'IA para tareas repetitivas, basadas en reglas, de alto volumen y con criterio humano acotado.',
    signals: ['Alto volumen transaccional', 'Reglas estables', 'Decisiones de baja complejidad'],
    ring: 'hover:border-indigo-300',
    badge: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    bar: 'bg-indigo-500',
  },
  {
    name: 'Agencia',
    icon: '🤖',
    tagline: 'La IA planifica y actúa con límites',
    description:
      'Agentes que razonan, usan herramientas, se conectan a tus sistemas y ejecutan acciones semi-autónomas.',
    signals: ['Integración con sistemas', 'Procesos multi-paso', 'Ejecución autónoma acotada'],
    ring: 'hover:border-violet-300',
    badge: 'bg-violet-50 text-violet-700 border-violet-200',
    bar: 'bg-violet-500',
  },
  {
    name: 'Aumentación',
    icon: '🧠',
    tagline: 'El experto decide mejor y más rápido',
    description:
      'IA que potencia el criterio humano, la creatividad y el análisis en decisiones complejas y poco repetitivas.',
    signals: ['Criterio experto alto', 'Trabajo creativo', 'Casos poco estandarizados'],
    ring: 'hover:border-cyan-300',
    badge: 'bg-cyan-50 text-cyan-700 border-cyan-200',
    bar: 'bg-cyan-500',
  },
]

const IMPLEMENTATION_TYPES = [
  {
    title: 'IA Generativa Local',
    icon: '🔒',
    desc: 'Datos sensibles, exigencias regulatorias o necesidad de control total sobre la infraestructura.',
    badge: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  },
  {
    title: 'IA Generativa vía API',
    icon: '⚡',
    desc: 'Creatividad, prototipado rápido, asistentes conversacionales y generación de contenido.',
    badge: 'bg-amber-50 text-amber-700 border-amber-200',
  },
  {
    title: 'IA Tradicional / ML',
    icon: '📊',
    desc: 'Forecasting, clasificación, scoring y detección de anomalías sobre datos estructurados.',
    badge: 'bg-blue-50 text-blue-700 border-blue-200',
  },
]

export default function ModelsSection() {
  return (
    <section id="modelos" className="px-6 py-20 lg:py-24 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-2xl mb-14">
          <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-3">
            El marco
          </p>
          <h2 className="text-3xl sm:text-4xl font-semibold text-slate-900 tracking-tight mb-4">
            Tres formas de trabajar con IA, tres formas de implementarla
          </h2>
          <p className="text-slate-600 leading-relaxed">
            No toda la IA es igual. La combinación correcta depende de tu volumen, tu complejidad de
            decisión, tu sensibilidad de datos y la madurez técnica de tu equipo.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5 mb-16">
          {INTERACTION_MODELS.map((model) => (
            <article
              key={model.name}
              className={`group border border-slate-200 rounded-2xl p-6 bg-white transition-all hover:shadow-lg hover:-translate-y-0.5 ${model.ring}`}
            >
              <div className={`h-1 w-10 rounded-full mb-5 ${model.bar}`} />
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">{model.icon}</span>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${model.badge}`}>
                  {model.name}
                </span>
              </div>
              <p className="text-base font-medium text-slate-900 mb-2">{model.tagline}</p>
              <p className="text-sm text-slate-600 leading-relaxed mb-5">{model.description}</p>
              <ul className="space-y-1.5 border-t border-slate-100 pt-4">
                {model.signals.map((signal) => (
                  <li key={signal} className="text-xs text-slate-500 flex items-start gap-2">
                    <span className="text-slate-300 mt-0.5">▸</span>
                    {signal}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8">
          <h3 className="text-lg font-semibold text-slate-900 mb-1">Y la tecnología detrás</h3>
          <p className="text-sm text-slate-500 mb-6">
            El modelo correcto con la implementación equivocada no llega a producción.
          </p>
          <div className="grid md:grid-cols-3 gap-5">
            {IMPLEMENTATION_TYPES.map((item) => (
              <div
                key={item.title}
                className="bg-white border border-slate-200 rounded-xl p-5 hover:shadow-sm transition-all"
              >
                <div className="flex items-center gap-2.5 mb-3">
                  <span className="text-xl">{item.icon}</span>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${item.badge}`}>
                    {item.title}
                  </span>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
