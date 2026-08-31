const STATS = [
  { value: '14', label: 'industrias con simulaciones propias' },
  { value: '13', label: 'dimensiones evaluadas de tu operación' },
  { value: '9', label: 'combinaciones de recomendación posibles' },
  { value: '3', label: 'fases de roadmap a 12 meses' },
]

export default function StatsBand() {
  return (
    <section className="border-y border-slate-200 bg-white">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-2 lg:grid-cols-4 gap-8">
        {STATS.map((stat) => (
          <div key={stat.label} className="text-center">
            <p className="text-3xl font-semibold text-slate-900 tracking-tight">{stat.value}</p>
            <p className="text-sm text-slate-500 mt-1 leading-snug">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
