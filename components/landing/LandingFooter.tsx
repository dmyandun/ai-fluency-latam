import Link from 'next/link'

export default function LandingFooter() {
  return (
    <footer className="bg-white border-t border-slate-200 px-6 py-10">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="text-center sm:text-left">
          <span className="text-sm font-semibold text-slate-900">
            AI Fluency <span className="text-blue-600">LATAM</span>
          </span>
          <p className="text-xs text-slate-400 mt-1">
            Diagnóstico de adopción de IA para organizaciones de Latinoamérica
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-slate-500">
          <a href="#como-funciona" className="hover:text-slate-800 transition-colors">
            Cómo funciona
          </a>
          <a href="#modelos" className="hover:text-slate-800 transition-colors">
            Modelos
          </a>
          <Link href="/explore" className="hover:text-slate-800 transition-colors">
            Simulaciones
          </Link>
          <Link
            href="/privacy"
            className="hover:text-slate-800 transition-colors underline underline-offset-2"
          >
            Política de privacidad
          </Link>
        </div>
      </div>
    </footer>
  )
}
