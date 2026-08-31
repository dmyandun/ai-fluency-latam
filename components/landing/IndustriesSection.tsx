import Link from 'next/link'
import { INDUSTRIES } from '@/lib/industries'

export default function IndustriesSection() {
  return (
    <section id="industrias" className="px-6 py-20 lg:py-24 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-2xl mb-12">
          <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-3">
            Industrias
          </p>
          <h2 className="text-3xl sm:text-4xl font-semibold text-slate-900 tracking-tight mb-4">
            Simulaciones ancladas a tu sector
          </h2>
          <p className="text-slate-600 leading-relaxed">
            Cada industria trae su propio tablero, sus KPIs y sus casos documentados. Antes de
            responder el diagnóstico puedes ver la IA operando sobre un escenario reconocible.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-10">
          {INDUSTRIES.map((industry) => (
            <Link
              key={industry.id}
              href="/explore"
              className="flex items-center gap-3 bg-white border border-slate-200 rounded-xl px-4 py-3.5 hover:border-blue-300 hover:shadow-sm transition-all group"
            >
              <span className="text-xl">{industry.icon}</span>
              <span className="text-sm font-medium text-slate-700 group-hover:text-blue-700 leading-tight">
                {industry.label}
              </span>
            </Link>
          ))}
        </div>

        <p className="text-sm text-slate-500">
          ¿Tu sector no está en la lista?{' '}
          <Link href="/assessment" className="text-blue-600 hover:text-blue-700 underline underline-offset-2">
            El diagnóstico funciona igual
          </Link>{' '}
          — las dimensiones que evalúa son transversales a cualquier operación.
        </p>
      </div>
    </section>
  )
}
