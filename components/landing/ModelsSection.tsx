import FrameworkExplorer from './FrameworkExplorer'
import { INTERACTION_MODELS } from '@/lib/framework-matrix'

export default function ModelsSection() {
  return (
    <section id="modelos" className="px-6 py-20 lg:py-24 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-2xl mb-10">
          <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-3">
            El marco
          </p>
          <h2 className="text-3xl sm:text-4xl font-semibold text-slate-900 tracking-tight mb-4">
            Tres formas de trabajar con IA, tres tecnologías para sostenerlas
          </h2>
          <p className="text-slate-600 leading-relaxed">
            No toda la IA es igual, y no hay que elegir una sola tecnología. Combina un modelo de
            interacción con las capas que tengan sentido para tu contexto y mira qué aporta cada
            una.
          </p>
        </div>

        <FrameworkExplorer />

        {/* Señales que empujan hacia cada modelo: el resumen que el explorador no muestra. */}
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {INTERACTION_MODELS.map((model) => (
            <div key={model.id} className="rounded-2xl border border-slate-200 bg-slate-50/60 p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className={`w-2 h-2 rounded-full ${model.dot}`} />
                <span className="text-sm font-semibold text-slate-900">{model.name}</span>
                <span className="text-xs text-slate-400">se ajusta si…</span>
              </div>
              <ul className="space-y-1.5">
                {model.signals.map((signal) => (
                  <li key={signal} className="text-xs text-slate-500 flex items-start gap-2">
                    <span className="text-slate-300 mt-0.5">▸</span>
                    {signal}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
