import FrameworkExplorer from './FrameworkExplorer'

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
      </div>
    </section>
  )
}
