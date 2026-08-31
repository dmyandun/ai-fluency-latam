import Link from 'next/link'

export default function FinalCta() {
  return (
    <section className="px-6 py-20 lg:py-24 bg-white border-t border-slate-200">
      <div className="max-w-4xl mx-auto relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 px-8 py-14 sm:px-14 text-center">
        <div className="absolute -top-24 -right-16 w-72 h-72 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="absolute -bottom-24 -left-16 w-72 h-72 rounded-full bg-indigo-500/20 blur-3xl" />

        <div className="relative">
          <h2 className="text-3xl sm:text-4xl font-semibold text-white tracking-tight mb-4">
            ¿Listo para saber por dónde empezar?
          </h2>
          <p className="text-slate-300 max-w-xl mx-auto leading-relaxed mb-8">
            Menos de 8 minutos para pasar de una idea vaga de &ldquo;implementar IA&rdquo; a un plan de
            12 meses con fases, responsables y riesgos identificados.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/assessment"
              className="bg-white hover:bg-slate-100 text-slate-900 font-semibold px-8 py-4 rounded-xl text-base transition-all shadow-lg hover:-translate-y-0.5"
            >
              Iniciar diagnóstico gratis →
            </Link>
            <Link
              href="/explore"
              className="border border-white/25 hover:border-white/50 text-white font-medium px-8 py-4 rounded-xl text-base transition-colors"
            >
              Ver simulaciones primero
            </Link>
          </div>
          <p className="text-xs text-slate-400 mt-6">
            Sin registro · Sin tarjeta · Tus respuestas no salen de tu navegador
          </p>
        </div>
      </div>
    </section>
  )
}
