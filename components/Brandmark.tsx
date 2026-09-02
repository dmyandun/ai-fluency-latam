import Link from 'next/link'
import type { MouseEventHandler } from 'react'

interface BrandmarkProps {
  /** Destino del enlace. Por defecto, la landing. */
  href?: string
  /** 'sm' para pies de página, donde la marca no debe competir con el contenido. */
  size?: 'md' | 'sm'
  /** Permite interceptar el clic; ver `HomeBrandmark`. */
  onClick?: MouseEventHandler<HTMLAnchorElement>
}

/**
 * Marca de la app: el recuadro azul lleva el "AI", así que el texto continúa en
 * "Fluency LATAM" — repetirlo daría "AI AI Fluency LATAM".
 */
export default function Brandmark({ href = '/', size = 'md', onClick }: BrandmarkProps) {
  const isSmall = size === 'sm'

  return (
    <Link
      href={href}
      onClick={onClick}
      className={`inline-flex items-center group ${isSmall ? 'gap-2' : 'gap-2.5'}`}
    >
      <span
        className={`shrink-0 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold shadow-sm transition-transform group-hover:scale-105 ${
          isSmall ? 'w-6 h-6 text-[11px]' : 'w-8 h-8 text-sm'
        }`}
      >
        AI
      </span>
      <span
        className={`font-semibold text-slate-900 tracking-tight ${isSmall ? 'text-sm' : 'text-lg'}`}
      >
        Fluency <span className="text-blue-600">LATAM</span>
      </span>
    </Link>
  )
}
