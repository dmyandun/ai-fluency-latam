'use client'

import { useState } from 'react'

const FAQS = [
  {
    question: '¿Necesito registrarme o dejar datos de mi empresa?',
    answer:
      'No. El diagnóstico corre completo en tu navegador y los resultados se guardan solo en el almacenamiento local de tu dispositivo. No hay cuenta, no hay base de datos y nadie más ve tus respuestas.',
  },
  {
    question: '¿Tengo que ver las simulaciones para obtener mi roadmap?',
    answer:
      'No. Hay dos caminos y ambos terminan en el mismo roadmap: puedes ir directo al diagnóstico, o pasar antes por las simulaciones de tu industria para ver cómo se comporta cada modelo de IA sobre un caso concreto. Si empiezas por las simulaciones, también puedes saltar al diagnóstico en cualquier momento.',
  },
  {
    question: '¿Cuánto tiempo toma?',
    answer:
      'Entre 5 y 8 minutos. Son 13 preguntas de escala sobre tu operación, más la selección de país e industria. Las simulaciones previas son opcionales y puedes saltarlas.',
  },
  {
    question: '¿En qué se basa la recomendación?',
    answer:
      'Cada respuesta alimenta un modelo de puntuación que compara tres modelos de interacción (automatización, agencia, aumentación) y tres tipos de implementación (generativa local, generativa vía API y ML tradicional). El resultado es la combinación con mayor puntaje, con su racional explícito.',
  },
  {
    question: '¿El roadmap es editable?',
    answer:
      'Sí. El sistema genera las iniciativas base por fase y tú puedes agregar, editar o eliminar cualquier ítem. Los cambios quedan guardados en tu navegador para que retomes el plan después.',
  },
  {
    question: '¿Sirve si mi organización ya usa IA?',
    answer:
      'Sí. Si ya tienes iniciativas en marcha, el diagnóstico ayuda a validar si el enfoque elegido corresponde a tu contexto real o si estás resolviendo con agentes algo que era automatización simple — un error caro y frecuente.',
  },
  {
    question: '¿Está pensado para Latinoamérica?',
    answer:
      'Sí. El contexto regulatorio, la madurez de datos y la disponibilidad de talento de la región están incorporados en los casos, los benchmarks y las recomendaciones.',
  },
]

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section id="preguntas" className="px-6 py-20 lg:py-24 bg-white border-t border-slate-200">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-3">
            Preguntas frecuentes
          </p>
          <h2 className="text-3xl sm:text-4xl font-semibold text-slate-900 tracking-tight">
            Lo que suelen preguntarnos
          </h2>
        </div>

        <div className="divide-y divide-slate-200 border-y border-slate-200">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index
            return (
              <div key={faq.question}>
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-4 py-5 text-left group"
                >
                  <span className="text-base font-medium text-slate-900 group-hover:text-blue-700 transition-colors">
                    {faq.question}
                  </span>
                  <span
                    className={`shrink-0 w-6 h-6 rounded-full border border-slate-300 flex items-center justify-center text-slate-500 text-sm transition-transform ${
                      isOpen ? 'rotate-45' : ''
                    }`}
                  >
                    +
                  </span>
                </button>
                {isOpen && (
                  <p className="text-sm text-slate-600 leading-relaxed pb-5 pr-10 animate-fade-in">
                    {faq.answer}
                  </p>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
