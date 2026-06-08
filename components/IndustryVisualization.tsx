'use client'

import { LATAM_COUNTRIES } from '@/lib/countries'

interface IndustryVisualizationProps {
  industryId: string
  country?: string
  colorAccent: string
  colorLight: string
  colorText: string
  colorBorder: string
}

function countryName(code?: string): string {
  if (!code) return 'tu país'
  return LATAM_COUNTRIES.find((c) => c.code === code)?.name ?? code
}

export default function IndustryVisualization(props: IndustryVisualizationProps) {
  const { industryId } = props

  let viz: React.ReactNode
  switch (industryId) {
    case 'logistics': viz = <LogisticsViz {...props} />; break
    case 'retail':    viz = <RetailViz {...props} />; break
    case 'energy':    viz = <EnergyViz {...props} />; break
    case 'manufacturing': viz = <ManufacturingViz {...props} />; break
    case 'banking':   viz = <BankingViz {...props} />; break
    default:          viz = <GenericViz {...props} />
  }

  return (
    <div className="px-5 pt-5">
      <div className={`rounded-2xl border ${props.colorBorder} ${props.colorLight} p-5 ${props.colorText}`}>
        {viz}
      </div>
    </div>
  )
}

/* ─────────────────────────── Logística ─────────────────────────── */

function LogisticsViz({ country, colorText }: IndustryVisualizationProps) {
  // Nodos del mapa (coordenadas en el viewBox 0 0 320 220)
  const hubs = [
    { x: 80,  y: 60,  label: 'CD Central', main: true },
    { x: 200, y: 40,  label: 'Bodega N' },
    { x: 250, y: 130, label: 'Bodega E' },
    { x: 150, y: 170, label: 'Bodega S' },
    { x: 50,  y: 150, label: 'Bodega O' },
  ]
  const routes = [
    [hubs[0], hubs[1]], [hubs[0], hubs[2]], [hubs[0], hubs[3]], [hubs[0], hubs[4]], [hubs[1], hubs[2]],
  ]

  return (
    <div>
      <Header title={`Red de distribución — ${countryName(country)}`} subtitle="Rutas optimizadas entre centros de distribución en tiempo real" />
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {/* Mapa */}
        <div className="lg:col-span-3 bg-white/70 rounded-xl border border-slate-200 p-3">
          <svg viewBox="0 0 320 220" className="w-full h-auto">
            {/* Contorno esquemático del territorio */}
            <path
              d="M60 30 Q110 15 170 28 Q230 18 275 55 Q300 95 270 150 Q250 195 180 200 Q110 205 70 175 Q35 140 45 95 Q40 55 60 30 Z"
              className="fill-slate-100 stroke-slate-300"
              strokeWidth="1.5"
            />
            {/* Rutas animadas */}
            {routes.map(([a, b], i) => (
              <line
                key={i}
                x1={a.x} y1={a.y} x2={b.x} y2={b.y}
                stroke="currentColor"
                strokeWidth="1.5"
                strokeDasharray="4 4"
                className={`${colorText} opacity-60`}
              >
                <animate attributeName="stroke-dashoffset" values="8;0" dur="1.2s" repeatCount="indefinite" begin={`${i * 0.15}s`} />
              </line>
            ))}
            {/* Nodos */}
            {hubs.map((h, i) => (
              <g key={i}>
                {h.main && <circle cx={h.x} cy={h.y} r="11" className={`${colorText} opacity-20`} fill="currentColor" />}
                <circle cx={h.x} cy={h.y} r={h.main ? 6 : 4} fill="currentColor" className={colorText}>
                  {h.main && <animate attributeName="r" values="6;8;6" dur="1.8s" repeatCount="indefinite" />}
                </circle>
                <text x={h.x} y={h.y - 10} textAnchor="middle" className="fill-slate-600 text-[7px] font-semibold">{h.label}</text>
              </g>
            ))}
          </svg>
        </div>

        {/* Bodega ABC + crossdocking */}
        <div className="lg:col-span-2 bg-white/70 rounded-xl border border-slate-200 p-3">
          <p className="text-xs font-semibold text-slate-700 mb-2">Layout de bodega — clasificación ABC</p>
          <div className="space-y-2">
            {[
              { zone: 'A', label: 'Alta rotación', color: 'bg-orange-500', pct: '70% de los picks' },
              { zone: 'B', label: 'Media rotación', color: 'bg-amber-400', pct: '20% de los picks' },
              { zone: 'C', label: 'Baja rotación', color: 'bg-emerald-400', pct: '10% de los picks' },
            ].map((z) => (
              <div key={z.zone} className="flex items-center gap-2">
                <span className={`w-7 h-7 rounded-md ${z.color} text-white text-xs font-bold flex items-center justify-center shrink-0`}>{z.zone}</span>
                <div className="flex-1">
                  <div className="flex gap-0.5">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <div key={i} className={`h-3 flex-1 rounded-sm ${z.color} ${i > (z.zone === 'A' ? 5 : z.zone === 'B' ? 3 : 1) ? 'opacity-20' : 'opacity-90'}`} />
                    ))}
                  </div>
                  <p className="text-[10px] text-slate-500 mt-0.5">{z.label} · {z.pct}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-3 pt-3 border-t border-slate-200">
            <div className="flex items-center gap-2">
              <span className="px-2 py-1 rounded-md bg-blue-600 text-white text-[10px] font-bold animate-pulse">CROSS-DOCK</span>
              <span className="text-[10px] text-slate-500">Flujo directo entrada → salida, sin almacenaje</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────── Retail ─────────────────────────── */

function RetailViz(_: IndustryVisualizationProps) {
  const categories = ['Abrigos', 'Calzado', 'Accesorios', 'Deportiva']
  const weeks = ['S1', 'S2', 'S3', 'S4', 'S5', 'S6']
  // Intensidad 0-4 de demanda por celda
  const data = [
    [4, 4, 3, 2, 1, 1],
    [2, 3, 3, 4, 4, 3],
    [1, 2, 2, 3, 4, 4],
    [3, 3, 4, 4, 3, 2],
  ]
  const shade = ['bg-slate-100', 'bg-amber-100', 'bg-amber-300', 'bg-amber-500', 'bg-amber-600']

  return (
    <div>
      <Header title="Mapa de calor de demanda" subtitle="Predicción de demanda por categoría y semana — planeación de inventario" />
      <div className="bg-white/70 rounded-xl border border-slate-200 p-4 overflow-x-auto">
        <div className="inline-block min-w-full">
          <div className="flex gap-1 mb-1 pl-20">
            {weeks.map((w) => <span key={w} className="w-10 text-center text-[10px] text-slate-400">{w}</span>)}
          </div>
          {categories.map((cat, r) => (
            <div key={cat} className="flex items-center gap-1 mb-1">
              <span className="w-20 text-[11px] text-slate-600 text-right pr-2">{cat}</span>
              {data[r].map((v, c) => (
                <span key={c} className={`w-10 h-8 rounded ${shade[v]} flex items-center justify-center text-[9px] font-semibold ${v >= 3 ? 'text-white' : 'text-slate-500'}`}>
                  {v >= 4 ? '●' : ''}
                </span>
              ))}
            </div>
          ))}
          <div className="flex items-center gap-2 mt-3 pl-20">
            <span className="text-[10px] text-slate-400">Baja</span>
            {shade.map((s, i) => <span key={i} className={`w-5 h-3 rounded-sm ${s}`} />)}
            <span className="text-[10px] text-slate-400">Alta</span>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────── Energía ─────────────────────────── */

function EnergyViz({ colorText }: IndustryVisualizationProps) {
  // Curva de consumo (24 puntos), con pico que supera el límite
  const pts = [20, 18, 16, 15, 16, 22, 35, 48, 55, 58, 60, 62, 70, 88, 92, 78, 60, 55, 58, 52, 44, 36, 28, 22]
  const limit = 75
  const w = 320, h = 120, max = 100
  const toX = (i: number) => (i / (pts.length - 1)) * w
  const toY = (v: number) => h - (v / max) * h
  const line = pts.map((v, i) => `${i === 0 ? 'M' : 'L'}${toX(i).toFixed(1)} ${toY(v).toFixed(1)}`).join(' ')
  const area = `${line} L${w} ${h} L0 ${h} Z`
  const limitY = toY(limit)

  return (
    <div>
      <Header title="Curva de demanda energética — 24h" subtitle="Detección de picos que superan el límite contratado y generan penalizaciones" />
      <div className="bg-white/70 rounded-xl border border-slate-200 p-4">
        <svg viewBox={`0 0 ${w} ${h + 16}`} className="w-full h-auto">
          {/* Límite contratado */}
          <line x1="0" y1={limitY} x2={w} y2={limitY} stroke="#ef4444" strokeWidth="1" strokeDasharray="4 3" />
          <text x="2" y={limitY - 3} className="fill-red-500 text-[8px] font-semibold">Límite contratado</text>
          {/* Área de consumo */}
          <path d={area} fill="currentColor" className={`${colorText} opacity-15`} />
          <path d={line} fill="none" stroke="currentColor" strokeWidth="2" className={colorText} />
          {/* Zona de exceso resaltada */}
          {pts.map((v, i) => v > limit && i > 0 && pts[i - 1] > limit ? (
            <line key={i} x1={toX(i - 1)} y1={toY(pts[i - 1])} x2={toX(i)} y2={toY(v)} stroke="#ef4444" strokeWidth="2.5" />
          ) : null)}
          {/* Marcador del pico */}
          <circle cx={toX(14)} cy={toY(92)} r="4" fill="#ef4444">
            <animate attributeName="r" values="4;6;4" dur="1.4s" repeatCount="indefinite" />
          </circle>
        </svg>
        <div className="flex items-center gap-4 mt-2 text-[10px] text-slate-500">
          <span className="flex items-center gap-1"><span className="w-3 h-0.5 bg-red-500" /> Exceso (penalización)</span>
          <span className="flex items-center gap-1"><span className={`w-3 h-0.5 ${colorText}`} style={{ backgroundColor: 'currentColor' }} /> Consumo</span>
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────── Manufactura ─────────────────────────── */

function ManufacturingViz(_: IndustryVisualizationProps) {
  const racks = [
    { id: 'A1', rot: 'A', fill: 90 }, { id: 'A2', rot: 'A', fill: 75 }, { id: 'B1', rot: 'B', fill: 55 },
    { id: 'B2', rot: 'B', fill: 40 }, { id: 'C1', rot: 'C', fill: 20 }, { id: 'C2', rot: 'C', fill: 15 },
    { id: 'A3', rot: 'A', fill: 60 }, { id: 'B3', rot: 'B', fill: 80 }, { id: 'C3', rot: 'C', fill: 8 },
  ]
  const color: Record<string, string> = { A: 'bg-orange-500', B: 'bg-amber-400', C: 'bg-emerald-400' }

  return (
    <div>
      <Header title="Almacén inteligente — clasificación ABC" subtitle="Ubicación óptima por rotación y alertas de reorden automáticas" />
      <div className="bg-white/70 rounded-xl border border-slate-200 p-4">
        <div className="grid grid-cols-3 gap-3">
          {racks.map((r) => (
            <div key={r.id} className="border border-slate-200 rounded-lg p-2">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[11px] font-semibold text-slate-600">{r.id}</span>
                <span className={`w-4 h-4 rounded ${color[r.rot]} text-white text-[9px] font-bold flex items-center justify-center`}>{r.rot}</span>
              </div>
              <div className="h-12 bg-slate-100 rounded relative overflow-hidden flex items-end">
                <div className={`w-full ${color[r.rot]} transition-all`} style={{ height: `${r.fill}%` }} />
                {r.fill < 25 && (
                  <span className="absolute inset-0 flex items-center justify-center text-[8px] font-bold text-red-600 animate-pulse">REORDEN</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────── Banca ─────────────────────────── */

function BankingViz(_: IndustryVisualizationProps) {
  const score = 68 // 0-100
  const angle = (score / 100) * 180
  const r = 70, cx = 90, cy = 90
  const rad = (deg: number) => (deg - 180) * (Math.PI / 180)
  const needleX = cx + r * 0.8 * Math.cos(rad(angle))
  const needleY = cy + r * 0.8 * Math.sin(rad(angle))

  return (
    <div>
      <Header title="Motor de scoring crediticio" subtitle="Evaluación de riesgo en tiempo real y composición de cartera" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Gauge */}
        <div className="bg-white/70 rounded-xl border border-slate-200 p-4 flex flex-col items-center">
          <svg viewBox="0 0 180 110" className="w-full max-w-[220px]">
            <path d={`M20 90 A${r} ${r} 0 0 1 160 90`} fill="none" stroke="#e2e8f0" strokeWidth="14" strokeLinecap="round" />
            <path d={`M20 90 A${r} ${r} 0 0 1 160 90`} fill="none" stroke="url(#g)" strokeWidth="14" strokeLinecap="round"
              strokeDasharray={`${(score / 100) * 220} 400`} />
            <defs>
              <linearGradient id="g" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="60%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#ef4444" />
              </linearGradient>
            </defs>
            <line x1={cx} y1={cy} x2={needleX} y2={needleY} stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx={cx} cy={cy} r="4" fill="#334155" />
            <text x={cx} y={cy + 18} textAnchor="middle" className="fill-slate-800 text-[16px] font-bold">{score}</text>
          </svg>
          <p className="text-xs font-semibold text-amber-600">Riesgo moderado</p>
        </div>
        {/* Composición de cartera */}
        <div className="bg-white/70 rounded-xl border border-slate-200 p-4">
          <p className="text-xs font-semibold text-slate-700 mb-3">Composición de cartera</p>
          {[
            { label: 'Bajo riesgo', pct: 52, color: 'bg-emerald-500' },
            { label: 'Riesgo medio', pct: 33, color: 'bg-amber-400' },
            { label: 'Alto riesgo', pct: 15, color: 'bg-red-500' },
          ].map((s) => (
            <div key={s.label} className="mb-2.5">
              <div className="flex justify-between text-[11px] text-slate-600 mb-1">
                <span>{s.label}</span><span className="font-semibold tabular-nums">{s.pct}%</span>
              </div>
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className={`h-full ${s.color} rounded-full transition-all`} style={{ width: `${s.pct}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────── Genérico ─────────────────────────── */

function GenericViz({ colorText }: IndustryVisualizationProps) {
  const bars = [45, 70, 55, 85, 60, 95, 75]
  const spark = [30, 45, 40, 60, 55, 75, 70, 88]
  const w = 200, h = 50
  const line = spark.map((v, i) => `${i === 0 ? 'M' : 'L'}${(i / (spark.length - 1)) * w} ${h - (v / 100) * h}`).join(' ')

  return (
    <div>
      <Header title="Panel de inteligencia operativa" subtitle="Métricas clave y tendencias detectadas por IA" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white/70 rounded-xl border border-slate-200 p-4">
          <p className="text-xs font-semibold text-slate-700 mb-3">Indicadores por área</p>
          <div className="flex items-end gap-2 h-28">
            {bars.map((b, i) => (
              <div key={i} className="flex-1 flex flex-col items-center justify-end">
                <div className="w-full rounded-t" style={{ height: `${b}%`, backgroundColor: 'currentColor' }} />
              </div>
            ))}
          </div>
          <div className={`flex gap-2 mt-1 ${colorText} opacity-60`}>
            {bars.map((_, i) => <span key={i} className="flex-1 text-center text-[8px] text-slate-400">Q{i + 1}</span>)}
          </div>
        </div>
        <div className="bg-white/70 rounded-xl border border-slate-200 p-4">
          <p className="text-xs font-semibold text-slate-700 mb-3">Tendencia (últimos 8 periodos)</p>
          <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-auto">
            <path d={line} fill="none" stroke="currentColor" strokeWidth="2.5" className={colorText} />
            {spark.map((v, i) => (
              <circle key={i} cx={(i / (spark.length - 1)) * w} cy={h - (v / 100) * h} r="2" fill="currentColor" className={colorText} />
            ))}
          </svg>
          <p className="text-[11px] text-emerald-600 font-medium mt-2">↗ +24% de eficiencia proyectada con IA</p>
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────── Compartido ─────────────────────────── */

function Header({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="mb-4">
      <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
      <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>
    </div>
  )
}
