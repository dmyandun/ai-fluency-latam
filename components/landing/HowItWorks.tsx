const STEPS = [
  {
    number: '01',
    title: 'Contextualiza tu organización',
    description:
      'Elige tu país e industria. El diagnóstico ajusta el vocabulario, los casos y los benchmarks al mercado en el que operas.',
    accent: 'from-blue-500 to-blue-600',
  },
  {
    number: '02',
    title: 'Explora simulaciones reales',
    description:
      'Ve cómo se comportan la automatización, la agencia y la aumentación sobre un caso de tu propia industria antes de decidir nada.',
    accent: 'from-indigo-500 to-indigo-600',
  },
  {
    number: '03',
    title: 'Responde el diagnóstico',
    description:
      '13 preguntas sobre volumen, complejidad, datos, privacidad y madurez del equipo. Sin registro y sin dejar datos en un servidor.',
    accent: 'from-violet-500 to-violet-600',
  },
  {
    number: '04',
    title: 'Recibe recomendación y roadmap',
    description:
      'Un modelo de interacción, un tipo de implementación y un plan editable de 0-3, 3-6 y 6-12 meses con victorias rápidas y riesgos.',
    accent: 'from-cyan-500 to-cyan-600',
  },
]

export default function HowItWorks() {
  return (
    <section id="como-funciona" className="px-6 py-20 lg:py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-2xl mb-14">
          <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-3">
            Cómo funciona
          </p>
          <h2 className="text-3xl sm:text-4xl font-semibold text-slate-900 tracking-tight mb-4">
            De la duda a un plan concreto en cuatro pasos
          </h2>
          <p className="text-slate-600 leading-relaxed">
            No es un test genérico de madurez digital. Cada respuesta mueve el resultado hacia una
            combinación específica de modelo y tecnología.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {STEPS.map((step) => (
            <div
              key={step.number}
              className="relative bg-white border border-slate-200 rounded-2xl p-6 hover:border-slate-300 hover:shadow-md transition-all"
            >
              <span
                className={`inline-flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br ${step.accent} text-white text-sm font-semibold mb-4 shadow-sm`}
              >
                {step.number}
              </span>
              <h3 className="text-base font-semibold text-slate-900 mb-2">{step.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
