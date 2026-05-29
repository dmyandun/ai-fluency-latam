import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-6xl font-bold text-indigo-400 mb-4">404</h1>
      <p className="text-xl text-gray-300 mb-8">Página no encontrada</p>
      <Link
        href="/"
        className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-colors"
      >
        Volver al inicio
      </Link>
    </main>
  )
}
