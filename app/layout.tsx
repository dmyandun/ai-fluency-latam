import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'AI Fluency LATAM — Diagnóstico de Adopción de IA',
  description:
    'Descubre qué tipo de IA necesita tu organización. Diagnóstico B2B para empresas latinoamericanas: Automatización, Agencia o Aumentación.',
  keywords: [
    'inteligencia artificial',
    'adopción de IA',
    'transformación digital',
    'LATAM',
    'Latinoamérica',
    'diagnóstico empresarial',
    'automatización',
    'agentes de IA',
  ],
  openGraph: {
    title: 'AI Fluency LATAM',
    description: 'Diagnóstico de adopción de IA para organizaciones de Latinoamérica',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={inter.variable}>
      <body className="min-h-screen bg-slate-50">
        {children}
      </body>
    </html>
  )
}
