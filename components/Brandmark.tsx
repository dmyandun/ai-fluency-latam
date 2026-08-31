import Link from 'next/link'

interface BrandmarkProps {
  /** Destino del enlace. Por defecto, la landing. */
  href?: string
}

/**
 * Marca de la app: el recuadro azul lleva el "AI", así que el texto continúa en
 * "Fluency LATAM" — repetirlo daría "AI AI Fluency LATAM".
 */
export default function Brandmark({ href = '/' }: BrandmarkProps) {
  return (
    <Link href={href} className="flex items-center gap-2.5 group">
      <span className="w-8 h-8 shrink-0 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white text-sm font-bold shadow-sm transition-transform group-hover:scale-105">
        AI
      </span>
      <span className="text-lg font-semibold text-slate-900 tracking-tight">
        Fluency <span className="text-blue-600">LATAM</span>
      </span>
    </Link>
  )
}
