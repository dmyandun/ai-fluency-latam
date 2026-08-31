'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

const NAV_LINKS = [
  { href: '#como-funciona', label: 'Cómo funciona' },
  { href: '#modelos', label: 'Modelos' },
  { href: '#industrias', label: 'Industrias' },
  { href: '#preguntas', label: 'Preguntas' },
]

// Las dos entradas al producto: el diagnóstico directo y el recorrido guiado.
const PRIMARY_CTA = { href: '/assessment', label: 'Empezar' }
const SECONDARY_CTA = { href: '/explore', label: 'Simulaciones' }

export default function LandingNav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={`sticky top-0 z-30 transition-all ${
        scrolled
          ? 'bg-white/85 backdrop-blur-md border-b border-slate-200 shadow-sm'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white text-sm font-bold shadow-sm transition-transform group-hover:scale-105">
            AI
          </span>
          <span className="text-lg font-semibold text-slate-900 tracking-tight">
            AI Fluency <span className="text-blue-600">LATAM</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-slate-600 hover:text-slate-900 font-medium px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Link
            href={SECONDARY_CTA.href}
            className="hidden sm:inline-flex text-sm text-slate-600 hover:text-slate-900 font-medium px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors"
          >
            {SECONDARY_CTA.label}
          </Link>
          <Link
            href={PRIMARY_CTA.href}
            className="text-sm bg-slate-900 hover:bg-slate-800 text-white font-medium px-4 py-2 rounded-lg transition-colors shadow-sm"
          >
            {PRIMARY_CTA.label}
          </Link>
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label="Abrir menú"
            aria-expanded={menuOpen}
            className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600"
          >
            <span className="text-base leading-none">{menuOpen ? '✕' : '☰'}</span>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-white border-t border-slate-200 px-6 py-3 flex flex-col">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-sm text-slate-600 hover:text-blue-700 font-medium py-2.5"
            >
              {link.label}
            </a>
          ))}
          <Link
            href={SECONDARY_CTA.href}
            onClick={() => setMenuOpen(false)}
            className="text-sm text-slate-600 hover:text-blue-700 font-medium py-2.5"
          >
            {SECONDARY_CTA.label}
          </Link>
        </div>
      )}
    </nav>
  )
}
