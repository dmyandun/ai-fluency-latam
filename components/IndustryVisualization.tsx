'use client'

import { useRef, useState, useEffect } from 'react'
import { LATAM_COUNTRIES } from '@/lib/countries'
import { getCountryShape } from '@/lib/country-shapes'

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

// Tarjeta de agente IA reutilizable (usada en hovers y paneles de alertas)
function AgentCard({ agent, lines, status = 'green', className = '' }: {
  agent: string
  lines: string[]
  status?: 'green' | 'amber' | 'red'
  className?: string
}) {
  const dot = status === 'red' ? 'bg-red-500' : status === 'amber' ? 'bg-amber-500' : 'bg-emerald-500'
  const accent = status === 'red' ? 'text-red-600' : status === 'amber' ? 'text-amber-600' : 'text-emerald-600'
  return (
    <div className={`bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 shadow-sm ${className}`}>
      <div className="flex items-center gap-1.5">
        <span className="relative flex h-2 w-2">
          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${dot} opacity-75`} />
          <span className={`relative inline-flex rounded-full h-2 w-2 ${dot}`} />
        </span>
        <span className="text-[11px] font-bold text-slate-700">🤖 {agent}</span>
      </div>
      {lines.map((l, i) => (
        <p key={i} className={`text-[10px] leading-tight mt-0.5 ${i === lines.length - 1 ? accent + ' font-semibold' : 'text-slate-500'}`}>{l}</p>
      ))}
    </div>
  )
}

// Insignia del agente de IA supervisor, presente en todas las visualizaciones.
function SupervisorBadge({ name = 'AFIA · Supervisor IA' }: { name?: string }) {
  return (
    <div className="inline-flex items-center gap-2 bg-white border border-slate-200 rounded-full pl-1.5 pr-3 py-1 shadow-sm">
      <span className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs">🤖</span>
      <span className="text-xs font-semibold text-slate-700">{name}</span>
      <span className="flex items-center gap-1">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
        </span>
        <span className="text-[10px] font-medium text-emerald-600">En línea</span>
      </span>
    </div>
  )
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
    case 'health':    viz = <HealthViz {...props} />; break
    case 'insurance': viz = <InsuranceViz {...props} />; break
    case 'legal':     viz = <LegalViz {...props} />; break
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

// Agentes IA ficticios y KPIs por bodega (asignados por índice de nodo)
const LOGI_AGENTS = ['Atlas-Hub', 'Boreal', 'Andino', 'Litoral', 'Austral']
const LOGI_KPIS = [
  '98% a tiempo · 1.2k env/día',
  '96% · 840 env/día',
  '94% · 610 env/día',
  '97% · 520 env/día',
  '95% · 430 env/día',
]

// Datos de picking por bodega (para la vista de bodega seleccionada)
const PICK_AGENTS = ['PickBot-A', 'PickBot-B', 'PickBot-C', 'PickBot-D', 'PickBot-E']
const PICK_INFO = [
  { sku: 'SKU-4471 · Repuestos', opt: '32% menos recorrido' },
  { sku: 'SKU-8820 · Consumibles', opt: '27% menos recorrido' },
  { sku: 'SKU-1290 · Empaques', opt: '21% menos recorrido' },
  { sku: 'SKU-6605 · Electrónica', opt: '29% menos recorrido' },
  { sku: 'SKU-3370 · Textil', opt: '24% menos recorrido' },
]

// Estantería: rect con zona ABC y orientación (h=horizontal, v=vertical)
type Rack = { x: number; y: number; w: number; h: number; z: 'A' | 'B' | 'C' }

// 5 layouts de bodega ESTRUCTURALMENTE distintos (viewBox 0 0 220 150)
const RACK_LAYOUTS: Rack[][] = [
  // Bodega 1 — 3 columnas verticales
  [
    { x: 24, y: 28, w: 30, h: 16, z: 'A' }, { x: 24, y: 52, w: 30, h: 16, z: 'A' }, { x: 24, y: 76, w: 30, h: 16, z: 'B' },
    { x: 95, y: 28, w: 30, h: 16, z: 'A' }, { x: 95, y: 52, w: 30, h: 16, z: 'B' }, { x: 95, y: 76, w: 30, h: 16, z: 'C' },
    { x: 166, y: 28, w: 30, h: 16, z: 'B' }, { x: 166, y: 52, w: 30, h: 16, z: 'C' }, { x: 166, y: 76, w: 30, h: 16, z: 'C' },
  ],
  // Bodega 2 — 2 bloques con pasillo central ancho
  [
    { x: 30, y: 26, w: 46, h: 14, z: 'A' }, { x: 30, y: 48, w: 46, h: 14, z: 'A' }, { x: 30, y: 70, w: 46, h: 14, z: 'B' }, { x: 30, y: 92, w: 46, h: 14, z: 'C' },
    { x: 144, y: 26, w: 46, h: 14, z: 'B' }, { x: 144, y: 48, w: 46, h: 14, z: 'A' }, { x: 144, y: 70, w: 46, h: 14, z: 'C' }, { x: 144, y: 92, w: 46, h: 14, z: 'C' },
  ],
  // Bodega 3 — filas horizontales largas
  [
    { x: 26, y: 30, w: 168, h: 12, z: 'A' },
    { x: 26, y: 52, w: 168, h: 12, z: 'B' },
    { x: 26, y: 74, w: 168, h: 12, z: 'C' },
    { x: 26, y: 96, w: 168, h: 12, z: 'C' },
  ],
  // Bodega 4 — compacta, pocas estanterías grandes
  [
    { x: 28, y: 30, w: 70, h: 32, z: 'A' }, { x: 122, y: 30, w: 70, h: 32, z: 'B' },
    { x: 28, y: 76, w: 70, h: 30, z: 'B' }, { x: 122, y: 76, w: 70, h: 30, z: 'C' },
  ],
  // Bodega 5 — disposición en U alrededor del cross-dock
  [
    { x: 24, y: 26, w: 16, h: 80, z: 'A' },
    { x: 196 - 16, y: 26, w: 16, h: 80, z: 'B' },
    { x: 56, y: 26, w: 34, h: 14, z: 'A' }, { x: 96, y: 26, w: 34, h: 14, z: 'B' }, { x: 136, y: 26, w: 24, h: 14, z: 'C' },
    { x: 56, y: 92, w: 34, h: 14, z: 'C' }, { x: 96, y: 92, w: 34, h: 14, z: 'C' }, { x: 136, y: 92, w: 24, h: 14, z: 'B' },
  ],
]

// Ruta de picking coherente con cada layout
const PICK_ROUTES = [
  'M12 130 L39 130 L39 36 L69 36 L69 84 L110 84 L110 36 L181 36 L181 130 L208 130',
  'M12 130 L53 130 L53 33 L110 33 L110 99 L167 99 L167 33 L208 33 L208 130',
  'M12 130 L20 130 L20 36 L200 36 L200 58 L20 58 L20 80 L200 80 L200 130 L208 130',
  'M12 130 L63 130 L63 46 L157 46 L157 91 L63 91 L63 130 L208 130',
  'M12 130 L32 130 L32 33 L110 33 L188 33 L188 130 L208 130',
]

function LogisticsViz({ country, colorText }: IndustryVisualizationProps) {
  const shape = getCountryShape(country)
  const pathRef = useRef<SVGPathElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [bbox, setBbox] = useState(shape?.bboxOverride ?? null)
  const [layout, setLayout] = useState<{ w: number; h: number; offX: number; offY: number; scale: number; contW: number; contH: number } | null>(null)
  const [hover, setHover] = useState<number | null>(null)
  const [selected, setSelected] = useState(0)
  const [nodes, setNodes] = useState<{ x: number; y: number }[]>([])

  // Encuadre robusto: override si existe, si no getBBox() del path renderizado.
  useEffect(() => {
    if (shape?.bboxOverride) { setBbox(shape.bboxOverride); return }
    if (pathRef.current) {
      const b = pathRef.current.getBBox()
      setBbox({ x: b.x, y: b.y, w: b.width, h: b.height })
    } else {
      setBbox(null)
    }
  }, [country, shape])

  // Genera hasta 5 nodos DENTRO del polígono del país (test point-in-polygon del DOM),
  // distribuidos por regiones (centro + 4 cuadrantes).
  useEffect(() => {
    const path = pathRef.current
    if (!bbox || !path || typeof path.isPointInFill !== 'function') { setNodes([]); return }
    const inside: { gx: number; gy: number; x: number; y: number }[] = []
    for (let gx = 0.08; gx <= 0.92; gx += 0.06) {
      for (let gy = 0.08; gy <= 0.92; gy += 0.06) {
        const x = bbox.x + gx * bbox.w, y = bbox.y + gy * bbox.h
        try {
          if (path.isPointInFill(new DOMPoint(x, y))) inside.push({ gx, gy, x, y })
        } catch { /* DOMPoint no disponible */ }
      }
    }
    const targets = [[0.5, 0.5], [0.3, 0.3], [0.7, 0.3], [0.3, 0.7], [0.7, 0.7]]
    const used = new Set<number>()
    const chosen: { x: number; y: number }[] = []
    for (const [tx, ty] of targets) {
      let bestIdx = -1, bestD = Infinity
      inside.forEach((p, idx) => {
        if (used.has(idx)) return
        const d = (p.gx - tx) ** 2 + (p.gy - ty) ** 2
        if (d < bestD) { bestD = d; bestIdx = idx }
      })
      if (bestIdx >= 0) { used.add(bestIdx); chosen.push({ x: inside[bestIdx].x, y: inside[bestIdx].y }) }
    }
    // Fallback: si el test falla por completo, usar el centro del bbox
    if (chosen.length === 0) chosen.push({ x: bbox.x + bbox.w / 2, y: bbox.y + bbox.h / 2 })
    setNodes(chosen)
  }, [bbox])

  const pad = bbox ? Math.max(bbox.w, bbox.h) * 0.08 : 0
  const vb = bbox ? `${bbox.x - pad} ${bbox.y - pad} ${bbox.w + pad * 2} ${bbox.h + pad * 2}` : '0 0 1010 666'
  const span = bbox ? Math.max(bbox.w, bbox.h) : 200
  const vbW = bbox ? bbox.w + pad * 2 : 1010
  const vbH = bbox ? bbox.h + pad * 2 : 666
  const vbX = bbox ? bbox.x - pad : 0
  const vbY = bbox ? bbox.y - pad : 0

  const pts = nodes
  const hub = pts[0]

  // Dimensiona el SVG al mayor tamaño que llene el contenedor manteniendo el aspect del país.
  useEffect(() => {
    if (!bbox || !containerRef.current) { setLayout(null); return }
    const recompute = () => {
      const rect = containerRef.current!.getBoundingClientRect()
      const scale = Math.min(rect.width / vbW, rect.height / vbH)
      const w = vbW * scale, h = vbH * scale
      setLayout({ w, h, offX: (rect.width - w) / 2, offY: (rect.height - h) / 2, scale, contW: rect.width, contH: rect.height })
    }
    recompute()
    const ro = new ResizeObserver(recompute)
    ro.observe(containerRef.current)
    return () => ro.disconnect()
  }, [bbox]) // eslint-disable-line react-hooks/exhaustive-deps

  const ready = !!bbox && !!layout
  const nodePx = layout ? pts.map((p) => ({ x: layout.offX + (p.x - vbX) * layout.scale, y: layout.offY + (p.y - vbY) * layout.scale })) : []

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
        <Header title={`Red de distribución — ${countryName(country)}`} subtitle="Haz clic en una bodega para ver su agente IA y su picking" noMargin />
        <SupervisorBadge />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 items-start">
        {/* Mapa político del país — ocupa el alto, ancho proporcional */}
        <div className="lg:col-span-3 bg-white/70 rounded-xl border border-slate-200 p-3">
          <div ref={containerRef} className="relative w-full" style={{ height: 'min(64vh, 560px)', minHeight: 340 }}>
            <svg
              viewBox={vb}
              width={layout?.w ?? '100%'}
              height={layout?.h ?? '100%'}
              className={`absolute transition-opacity duration-300 ${ready ? 'opacity-100' : 'opacity-0'}`}
              style={{ left: layout?.offX ?? 0, top: layout?.offY ?? 0 }}
            >
              {shape && (
                <path ref={pathRef} d={shape.path} className="fill-slate-100 stroke-slate-300" strokeWidth={span * 0.003} strokeLinejoin="round" />
              )}
              {hub && pts.slice(1).map((p, i) => (
                <line key={i} x1={hub.x} y1={hub.y} x2={p.x} y2={p.y}
                  stroke="currentColor" strokeWidth={span * 0.006}
                  strokeDasharray={`${span * 0.02} ${span * 0.02}`}
                  className={`${colorText} opacity-60`}>
                  <animate attributeName="stroke-dashoffset" values={`${span * 0.04};0`} dur="1.2s" repeatCount="indefinite" begin={`${i * 0.15}s`} />
                </line>
              ))}
              {pts.map((p, i) => (
                <g key={i} style={{ cursor: 'pointer' }}
                  onMouseEnter={() => setHover(i)}
                  onMouseLeave={() => setHover((h) => (h === i ? null : h))}
                  onClick={() => setSelected(i)}>
                  {(i === 0 || hover === i || selected === i) && <circle cx={p.x} cy={p.y} r={span * 0.028} className={`${colorText} ${hover === i || selected === i ? 'opacity-30' : 'opacity-20'}`} fill="currentColor" />}
                  {selected === i && <circle cx={p.x} cy={p.y} r={span * 0.024} fill="none" stroke="currentColor" strokeWidth={span * 0.005} className={colorText} />}
                  <circle cx={p.x} cy={p.y} r={i === 0 ? span * 0.017 : span * 0.012} fill="currentColor" className={colorText}>
                    {i === 0 && <animate attributeName="r" values={`${span * 0.017};${span * 0.023};${span * 0.017}`} dur="1.8s" repeatCount="indefinite" />}
                  </circle>
                  {/* área de hover ampliada */}
                  <circle cx={p.x} cy={p.y} r={span * 0.045} fill="transparent" />
                </g>
              ))}
            </svg>

            {/* Tarjeta del agente IA — una queda abierta como indicador de interacción */}
            {ready && nodePx[hover ?? selected] && (() => {
              const active = hover ?? selected
              const p = nodePx[active]
              const below = p.y < (layout!.contH * 0.42) // si está arriba, mostrar la tarjeta debajo
              return (
                <div
                  className="absolute pointer-events-none z-10"
                  style={{ left: p.x, top: p.y, transform: below ? 'translate(-50%, 14px)' : 'translate(-50%, calc(-100% - 10px))' }}
                >
                  <div className="bg-white/90 backdrop-blur-sm border border-slate-200 rounded-lg px-2.5 py-1.5 shadow-md text-center whitespace-nowrap">
                    <div className="flex items-center gap-1 justify-center">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      <span className="text-[11px] font-bold text-slate-700">🤖 {LOGI_AGENTS[active % LOGI_AGENTS.length]}</span>
                    </div>
                    <div className="text-[10px] text-slate-500 leading-tight">Bodega {active + 1}</div>
                    <div className="text-[10px] font-semibold text-emerald-600 leading-tight">{LOGI_KPIS[active % LOGI_KPIS.length]}</div>
                  </div>
                </div>
              )
            })()}
          </div>
        </div>

        {/* Plano de bodega top-down con ruta de picking (de la bodega seleccionada) */}
        <div className="lg:col-span-2 bg-white/70 rounded-xl border border-slate-200 p-3">
          <p className="text-xs font-semibold text-slate-700 mb-2">Bodega {selected + 1} · plano de picking optimizado</p>

          {/* Tarjeta del agente IA de picking */}
          <div className="mb-2 inline-flex flex-col bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 shadow-sm">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span className="text-[11px] font-bold text-slate-700">🤖 {PICK_AGENTS[selected % PICK_AGENTS.length]}</span>
              <span className="text-[9px] text-emerald-600 font-medium">En línea</span>
            </div>
            <div className="text-[10px] text-slate-500 leading-tight mt-0.5">Ruta de picking · {PICK_INFO[selected % PICK_INFO.length].sku}</div>
            <div className="text-[10px] font-semibold text-emerald-600 leading-tight">Optimización: {PICK_INFO[selected % PICK_INFO.length].opt}</div>
          </div>

          <WarehouseLayout routeIndex={selected % PICK_ROUTES.length} />
          <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] text-slate-500">
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm bg-orange-500" /> A · alta</span>
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm bg-amber-400" /> B · media</span>
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm bg-emerald-400" /> C · baja</span>
            <span className="flex items-center gap-1"><span className="px-1 rounded bg-blue-600 text-white text-[8px] font-bold">CD</span> cross-dock</span>
          </div>
        </div>
      </div>
    </div>
  )
}

// Plano cenital de bodega: estanterías ABC + ruta de picking animada + cross-dock
function WarehouseLayout({ routeIndex = 0 }: { routeIndex?: number }) {
  // Estanterías con su zona ABC, distintas por bodega (viewBox 0 0 220 150)
  const racks = RACK_LAYOUTS[routeIndex % RACK_LAYOUTS.length]
  const color: Record<string, string> = { A: '#f97316', B: '#fbbf24', C: '#34d399' }
  // Ruta de picking de la bodega seleccionada
  const route = PICK_ROUTES[routeIndex % PICK_ROUTES.length]

  return (
    <svg viewBox="0 0 220 150" className="w-full h-auto" key={routeIndex}>
      {/* Muelle / cross-dock */}
      <rect x="2" y="120" width="20" height="24" rx="2" className="fill-blue-600" />
      <text x="12" y="135" textAnchor="middle" className="fill-white text-[6px] font-bold">CD</text>
      <rect x="198" y="120" width="20" height="24" rx="2" className="fill-blue-600" />
      <text x="208" y="135" textAnchor="middle" className="fill-white text-[6px] font-bold">OUT</text>
      {/* Estanterías */}
      {racks.map((r, i) => (
        <g key={i}>
          <rect x={r.x} y={r.y} width={r.w} height={r.h} rx="2" fill={color[r.z]} opacity="0.85" />
          {r.w >= 18 && r.h >= 12 && (
            <text x={r.x + r.w / 2} y={r.y + r.h / 2 + 2.5} textAnchor="middle" className="fill-white text-[7px] font-bold">{r.z}</text>
          )}
        </g>
      ))}
      {/* Ruta de picking animada */}
      <path d={route} fill="none" stroke="#4f46e5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="3 3">
        <animate attributeName="stroke-dashoffset" values="12;0" dur="1s" repeatCount="indefinite" />
      </path>
      {/* Operario/AGV recorriendo la ruta */}
      <circle r="3.5" fill="#4f46e5">
        <animateMotion dur="4s" repeatCount="indefinite" path={route} />
      </circle>
    </svg>
  )
}

/* ─────────────────────────── Retail ─────────────────────────── */

function RetailViz(_: IndustryVisualizationProps) {
  const [hov, setHov] = useState(0)
  const categories = ['Abrigos', 'Calzado', 'Accesorios', 'Deportiva']
  const weeks = ['S1', 'S2', 'S3', 'S4', 'S5', 'S6']
  const data = [
    [4, 4, 3, 2, 1, 1],
    [2, 3, 3, 4, 4, 3],
    [1, 2, 2, 3, 4, 4],
    [3, 3, 4, 4, 3, 2],
  ]
  const shadeHex = ['#f1f5f9', '#fef3c7', '#fcd34d', '#f59e0b', '#d97706']

  // Plano del piso de tienda: secciones clasificadas ABC por valor de ticket
  type Sec = { name: string; x: number; y: number; w: number; h: number; z: 'A' | 'B' | 'C'; rec: string[] }
  const sections: Sec[] = [
    { name: 'Electrónica', x: 14, y: 16, w: 58, h: 32, z: 'A', rec: ['Mover cerca de la entrada', '+12% ticket promedio'] },
    { name: 'Electrodom.', x: 80, y: 16, w: 58, h: 32, z: 'A', rec: ['Demo interactiva en pasillo', '+9% conversión'] },
    { name: 'Ropa', x: 146, y: 16, w: 60, h: 32, z: 'B', rec: ['Probadores accesibles', '+8% conversión'] },
    { name: 'Hogar', x: 14, y: 56, w: 58, h: 28, z: 'B', rec: ['Cross-merch con Electrónica', '+6% unidades/ticket'] },
    { name: 'Abarrotes', x: 80, y: 56, w: 58, h: 28, z: 'C', rec: ['Al fondo → aumenta recorrido', 'mayor exposición'] },
    { name: 'Limpieza', x: 146, y: 56, w: 60, h: 28, z: 'C', rec: ['Reponer góndola baja', 'evitar quiebres'] },
  ]
  const zColor = { A: '#f97316', B: '#fbbf24', C: '#34d399' }
  const zStatus = { A: 'amber' as const, B: 'amber' as const, C: 'green' as const }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
        <Header title="Demanda y layout inteligente de tienda" subtitle="Mapa de calor de demanda y plano de piso optimizado por IA" noMargin />
        <SupervisorBadge name="ShelfBot · Supervisor IA" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-stretch">
        {/* Heatmap de demanda — llena el contenedor */}
        <div className="bg-white/70 rounded-xl border border-slate-200 p-4 flex flex-col" style={{ minHeight: 260 }}>
          <p className="text-xs font-semibold text-slate-700 mb-3">Mapa de calor de demanda</p>
          <div className="flex-1 min-h-0">
            <svg viewBox="0 0 184 122" preserveAspectRatio="xMidYMid meet" className="w-full h-full">
              {/* etiquetas de semanas */}
              {weeks.map((w, j) => (
                <text key={w} x={40 + j * 24 + 12} y={9} textAnchor="middle" className="fill-slate-400 text-[7px]">{w}</text>
              ))}
              {/* filas */}
              {categories.map((cat, r) => (
                <g key={cat}>
                  <text x={36} y={14 + r * 24 + 14} textAnchor="end" className="fill-slate-600 text-[7px]">{cat}</text>
                  {data[r].map((v, c) => (
                    <g key={c}>
                      <rect x={40 + c * 24 + 1} y={14 + r * 24 + 1} width={22} height={22} rx={2} fill={shadeHex[v]} />
                      {v >= 4 && <circle cx={40 + c * 24 + 12} cy={14 + r * 24 + 12} r={2} fill="#fff" />}
                    </g>
                  ))}
                </g>
              ))}
              {/* leyenda */}
              <text x={40} y={120} className="fill-slate-400 text-[7px]">Baja</text>
              {shadeHex.map((s, i) => <rect key={i} x={62 + i * 12} y={114} width={11} height={7} rx={1} fill={s} />)}
              <text x={62 + shadeHex.length * 12 + 4} y={120} className="fill-slate-400 text-[7px]">Alta</text>
            </svg>
          </div>
        </div>

        {/* Plano de piso de tienda — estilo plano arquitectónico */}
        <div className="bg-white/70 rounded-xl border border-slate-200 p-4 flex flex-col" style={{ minHeight: 260 }}>
          <p className="text-xs font-semibold text-slate-700 mb-2">Plano de tienda · clasificación ABC por valor de ticket</p>
          <div className="relative flex-1 min-h-0">
            <svg viewBox="0 0 220 116" preserveAspectRatio="xMidYMid meet" className="w-full h-full">
              <defs>
                <pattern id="floorgrid" width="11" height="11" patternUnits="userSpaceOnUse">
                  <path d="M11 0 L0 0 0 11" fill="none" stroke="#e2e8f0" strokeWidth="0.4" />
                </pattern>
              </defs>
              {/* piso con grid de plano */}
              <rect x="6" y="6" width="208" height="104" fill="url(#floorgrid)" />
              {/* paredes exteriores */}
              <rect x="6" y="6" width="208" height="104" fill="none" stroke="#475569" strokeWidth="2" />
              {/* apertura de entrada (gap en pared inferior) */}
              <rect x="150" y="107" width="42" height="6" fill="white" />
              {/* secciones como zonas de plano */}
              {sections.map((s, i) => {
                const active = hov === i
                return (
                  <g key={i} style={{ cursor: 'pointer' }} onMouseEnter={() => setHov(i)} onClick={() => setHov(i)}>
                    <rect x={s.x} y={s.y} width={s.w} height={s.h} rx={1.5}
                      fill={zColor[s.z]} fillOpacity={active ? 0.22 : 0.12}
                      stroke={zColor[s.z]} strokeWidth={active ? 1.8 : 1} />
                    {/* góndolas (estanterías en planta) */}
                    {[0, 1].map((g) => (
                      <rect key={g} x={s.x + 4} y={s.y + 6 + g * 9} width={s.w - 8} height={3} rx={0.5}
                        fill="none" stroke={zColor[s.z]} strokeWidth={0.7} strokeOpacity={0.7} />
                    ))}
                    {/* etiqueta de sección */}
                    <text x={s.x + s.w / 2} y={s.y + s.h - 3} textAnchor="middle" className="fill-slate-700 text-[6.5px] font-semibold">{s.name}</text>
                    {/* tag ABC */}
                    <circle cx={s.x + 6} cy={s.y + 6} r={4} fill={zColor[s.z]} />
                    <text x={s.x + 6} y={s.y + 8} textAnchor="middle" className="fill-white text-[5px] font-bold">{s.z}</text>
                  </g>
                )
              })}
              {/* cajas */}
              {[0, 1, 2].map((c) => (
                <g key={c}>
                  <rect x={16 + c * 13} y={96} width={9} height={10} rx={1} fill="none" stroke="#3b82f6" strokeWidth={1} />
                  <line x1={16 + c * 13} y1={101} x2={25 + c * 13} y2={101} stroke="#3b82f6" strokeWidth={0.6} />
                </g>
              ))}
              <text x={29} y={94} className="fill-blue-500 text-[6px] font-semibold">Cajas</text>
              {/* entrada */}
              <text x={171} y={104} textAnchor="middle" className="fill-slate-500 text-[6px] font-semibold">▼ Entrada</text>
            </svg>

            {/* tarjeta del agente al hover */}
            <div
              className="absolute z-20 pointer-events-none"
              style={{ left: `${((sections[hov].x + sections[hov].w / 2) / 220) * 100}%`, top: `${(sections[hov].y / 116) * 100}%`, transform: 'translate(-50%, calc(-100% - 4px))' }}
            >
              <AgentCard agent="LayoutBot" status={zStatus[sections[hov].z]} lines={[sections[hov].name, ...sections[hov].rec]} className="whitespace-nowrap" />
            </div>
          </div>
          <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] text-slate-500">
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm bg-orange-500" /> A · ticket alto</span>
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm bg-amber-400" /> B · medio</span>
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm bg-emerald-400" /> C · bajo</span>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────── Energía ─────────────────────────── */

function EnergyViz({ colorText }: IndustryVisualizationProps) {
  // Nodos de la red: generación → subestación → consumos
  const gens = [
    { x: 30, y: 40, label: 'Solar', val: '4.2 MW', kind: 'gen' },
    { x: 30, y: 110, label: 'Red', val: '6.0 MW', kind: 'gen' },
  ]
  const sub = { x: 150, y: 75, label: 'Subestación', val: '10.2 MW' }
  const loads = [
    { x: 280, y: 30, label: 'Planta A', val: '85%', warn: false },
    { x: 280, y: 75, label: 'Planta B', val: '112%', warn: true },
    { x: 280, y: 120, label: 'Oficinas', val: '47%', warn: false },
  ]

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
        <Header title="Red energética en tiempo real" subtitle="Flujo entre generación, subestación y puntos de consumo monitoreado por IA" noMargin />
        <SupervisorBadge name="GridBot · Supervisor IA" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div className="lg:col-span-2 bg-white/70 rounded-xl border border-slate-200 p-4">
        <svg viewBox="0 0 320 155" className="w-full h-auto" style={{ maxHeight: 280 }}>
          {/* Flujos generación → subestación */}
          {gens.map((g, i) => (
            <line key={i} x1={g.x + 14} y1={g.y} x2={sub.x - 16} y2={sub.y} stroke="currentColor" strokeWidth="2" strokeDasharray="5 4" className={`${colorText} opacity-60`}>
              <animate attributeName="stroke-dashoffset" values="9;0" dur="0.9s" repeatCount="indefinite" />
            </line>
          ))}
          {/* Flujos subestación → consumos */}
          {loads.map((l, i) => (
            <line key={i} x1={sub.x + 16} y1={sub.y} x2={l.x - 14} y2={l.y} stroke={l.warn ? '#ef4444' : 'currentColor'} strokeWidth="2" strokeDasharray="5 4" className={l.warn ? '' : `${colorText} opacity-60`}>
              <animate attributeName="stroke-dashoffset" values="9;0" dur="0.9s" repeatCount="indefinite" begin={`${i * 0.2}s`} />
            </line>
          ))}
          {/* Nodos de generación */}
          {gens.map((g, i) => (
            <g key={i}>
              <circle cx={g.x} cy={g.y} r="13" fill="white" stroke="#10b981" strokeWidth="2" />
              <text x={g.x} y={g.y + 3} textAnchor="middle" className="text-[10px]">⚡</text>
              <text x={g.x} y={g.y - 17} textAnchor="middle" className="fill-slate-600 text-[8px] font-semibold">{g.label}</text>
              <text x={g.x} y={g.y + 24} textAnchor="middle" className="fill-slate-400 text-[8px]">{g.val}</text>
            </g>
          ))}
          {/* Subestación */}
          <g>
            <rect x={sub.x - 18} y={sub.y - 14} width="36" height="28" rx="4" fill="currentColor" className={colorText} />
            <text x={sub.x} y={sub.y + 3} textAnchor="middle" className="fill-white text-[9px] font-bold">🔌</text>
            <text x={sub.x} y={sub.y - 19} textAnchor="middle" className="fill-slate-600 text-[8px] font-semibold">{sub.label}</text>
            <text x={sub.x} y={sub.y + 26} textAnchor="middle" className="fill-slate-400 text-[8px]">{sub.val}</text>
          </g>
          {/* Consumos */}
          {loads.map((l, i) => (
            <g key={i}>
              <circle cx={l.x} cy={l.y} r="12" fill="white" stroke={l.warn ? '#ef4444' : '#94a3b8'} strokeWidth="2">
                {l.warn && <animate attributeName="stroke-width" values="2;3.5;2" dur="1.2s" repeatCount="indefinite" />}
              </circle>
              <text x={l.x} y={l.y + 3} textAnchor="middle" className="text-[9px]">🏭</text>
              <text x={l.x} y={l.y - 16} textAnchor="middle" className="fill-slate-600 text-[8px] font-semibold">{l.label}</text>
              <text x={l.x} y={l.y + 22} textAnchor="middle" className={`text-[8px] font-bold ${l.warn ? 'fill-red-500' : 'fill-slate-400'}`}>{l.val}</text>
            </g>
          ))}
        </svg>
        <div className="flex flex-wrap items-center gap-4 mt-2 text-[10px] text-slate-500">
          <span className="flex items-center gap-1"><span className="w-3 h-0.5 bg-red-500" /> Sobre el límite contratado</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full border-2 border-emerald-500" /> Generación</span>
          <span className="flex items-center gap-1">🏭 Consumo</span>
        </div>
      </div>

      {/* Panel de alertas de agentes IA */}
      <div className="lg:col-span-1 bg-white/70 rounded-xl border border-slate-200 p-4">
        <p className="text-xs font-semibold text-slate-700 mb-3">Alertas de agentes IA</p>
        <div className="space-y-2">
          <AgentCard agent="GridBot-A" status="green" lines={['Subestación A · compuertas cerradas', 'Operación normal']} />
          <AgentCard agent="GridBot-B" status="amber" lines={['Subestación B · trabajando al 50%', 'Últ. mant. hace 15 días · próx. en 15 días']} />
          <AgentCard agent="GridBot-P" status="red" lines={['Planta B · carga 112% sobre límite', 'Desplazar carga flexible 14:00-16:00']} />
          <AgentCard agent="GridBot-Z" status="green" lines={['Subestación Z · 3 turbinas activas', 'Generación estable']} />
        </div>
      </div>
      </div>
    </div>
  )
}

/* ─────────────────────────── Manufactura ─────────────────────────── */

function ManufacturingViz(_: IndustryVisualizationProps) {
  const [hov, setHov] = useState(0)
  const stations = [
    { label: 'Corte', occ: 88, state: 'ok' as const },
    { label: 'Soldadura', occ: 96, state: 'bottleneck' as const },
    { label: 'Ensamble', occ: 72, state: 'ok' as const },
    { label: 'Pintura', occ: 0, state: 'down' as const },
    { label: 'Empaque', occ: 64, state: 'ok' as const },
  ]
  const stColor = { ok: '#10b981', bottleneck: '#f59e0b', down: '#ef4444' }
  const stLabel = { ok: 'Activa', bottleneck: 'Cuello de botella', down: 'Parada' }
  const stStatus = { ok: 'green' as const, bottleneck: 'amber' as const, down: 'red' as const }
  const AGENT: { agent: string; lines: string[] }[] = [
    { agent: 'LineBot-1', lines: ['Throughput 88%', 'Ritmo nominal'] },
    { agent: 'LineBot-2', lines: ['Cuello de botella · 96%', 'WIP acumulándose — balanceo sugerido'] },
    { agent: 'LineBot-3', lines: ['Throughput 72%', 'Operación normal'] },
    { agent: 'MantBot', lines: ['Línea parada desde 14:20', 'Equipo M-3 despachado · 3 repuestos solicitados', 'Arranque estimado ~16:30 (2h)'] },
    { agent: 'LineBot-5', lines: ['Throughput 64%', 'Operación normal'] },
  ]
  const beltY = 88, x0 = 18, gap = 58
  const centerPct = (i: number) => Math.min(Math.max(((x0 + i * gap + 14) / 310) * 100, 18), 82)
  const oee = 71, oeeR = 54, oeeCx = 70, oeeCy = 70
  // Pareto de causas de paradas (minutos)
  const pareto = [
    { c: 'Avería mecánica', m: 120 }, { c: 'Cambio de molde', m: 80 },
    { c: 'Falta de material', m: 50 }, { c: 'Ajustes', m: 30 }, { c: 'Otros', m: 20 },
  ]
  const paretoMax = pareto[0].m

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
        <Header title="Línea de producción y OEE" subtitle="Haz clic en una estación para ver su agente IA" noMargin />
        <SupervisorBadge name="LineBot · Supervisor IA" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Línea de producción animada */}
        <div className="lg:col-span-2 bg-white/70 rounded-xl border border-slate-200 p-4">
          <p className="text-xs font-semibold text-slate-700 mb-2">Línea de ensamblaje · ocupación por estación</p>
          <div className="relative pt-16">
            {/* tarjeta del agente al hover */}
            <div className="absolute top-0 z-20 pointer-events-none" style={{ left: `${centerPct(hov)}%`, transform: 'translate(-50%, 0)' }}>
              <AgentCard agent={AGENT[hov].agent} lines={AGENT[hov].lines} status={stStatus[stations[hov].state]} className="whitespace-nowrap" />
            </div>
            <svg viewBox="0 0 310 120" className="w-full h-auto">
              <line x1={x0} y1={beltY} x2={x0 + gap * (stations.length - 1) + 28} y2={beltY} stroke="#cbd5e1" strokeWidth="6" strokeLinecap="round" strokeDasharray="6 5">
                <animate attributeName="stroke-dashoffset" values="11;0" dur="0.7s" repeatCount="indefinite" />
              </line>
              <circle r="4" fill="#4f46e5">
                <animateMotion dur="5s" repeatCount="indefinite" path={`M${x0} ${beltY} L${x0 + gap * (stations.length - 1) + 28} ${beltY}`} />
              </circle>
              {stations.map((s, i) => {
                const x = x0 + i * gap
                return (
                  <g key={i} style={{ cursor: 'pointer' }} onMouseEnter={() => setHov(i)} onClick={() => setHov(i)}>
                    <rect x={x} y={beltY - 34} width="28" height="24" rx="3" fill="white" stroke={stColor[s.state]} strokeWidth={hov === i ? 3 : 2}>
                      {s.state === 'down' && <animate attributeName="opacity" values="1;0.5;1" dur="1s" repeatCount="indefinite" />}
                    </rect>
                    <rect x={x} y={beltY - 34 + 24 - (24 * s.occ / 100)} width="28" height={24 * s.occ / 100} fill={stColor[s.state]} opacity="0.35" />
                    <circle cx={x + 14} cy={beltY} r="3.5" fill={stColor[s.state]} />
                    <text x={x + 14} y={beltY - 38} textAnchor="middle" className="fill-slate-600 text-[7px] font-semibold">{s.label}</text>
                    <text x={x + 14} y={beltY + 16} textAnchor="middle" className="fill-slate-400 text-[7px]">{s.state === 'down' ? '⚠' : `${s.occ}%`}</text>
                    {/* hit-area */}
                    <rect x={x - 6} y={beltY - 42} width="40" height="58" fill="transparent" />
                  </g>
                )
              })}
            </svg>
          </div>
          <div className="flex flex-wrap items-center gap-3 mt-1 text-[10px] text-slate-500">
            {(['ok', 'bottleneck', 'down'] as const).map((k) => (
              <span key={k} className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: stColor[k] }} /> {stLabel[k]}</span>
            ))}
          </div>
        </div>

        {/* OEE + Pareto + plan */}
        <div className="bg-white/70 rounded-xl border border-slate-200 p-4">
          <p className="text-xs font-semibold text-slate-700 mb-1">OEE global</p>
          <svg viewBox="0 0 140 80" className="w-full max-w-[170px] mx-auto">
            <path d={`M16 ${oeeCy} A${oeeR} ${oeeR} 0 0 1 124 ${oeeCy}`} fill="none" stroke="#e2e8f0" strokeWidth="12" strokeLinecap="round" />
            <path d={`M16 ${oeeCy} A${oeeR} ${oeeR} 0 0 1 124 ${oeeCy}`} fill="none" stroke="url(#oeeG)" strokeWidth="12" strokeLinecap="round" strokeDasharray={`${(oee / 100) * 170} 400`} />
            <defs><linearGradient id="oeeG" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#ef4444" /><stop offset="50%" stopColor="#f59e0b" /><stop offset="100%" stopColor="#10b981" /></linearGradient></defs>
            <text x={oeeCx} y={oeeCy - 4} textAnchor="middle" className="fill-slate-800 text-[18px] font-bold">{oee}%</text>
            <text x={oeeCx} y={oeeCy + 10} textAnchor="middle" className="fill-slate-400 text-[8px]">objetivo 85%</text>
          </svg>

          {/* Pareto de paradas */}
          <p className="text-[11px] font-semibold text-slate-700 mt-2 mb-1.5">Pareto de paradas (min)</p>
          <div className="space-y-1">
            {pareto.map((p) => (
              <div key={p.c} className="flex items-center gap-2">
                <span className="w-24 text-[9px] text-slate-500 truncate">{p.c}</span>
                <div className="flex-1 h-2.5 bg-slate-100 rounded-sm overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-sm" style={{ width: `${(p.m / paretoMax) * 100}%` }} />
                </div>
                <span className="text-[9px] tabular-nums text-slate-400 w-6 text-right">{p.m}</span>
              </div>
            ))}
          </div>

          {/* Plan de mejora del agente */}
          <div className="mt-3">
            <AgentCard agent="OEEBot · plan de mejora" status="green" lines={[
              '1. Kit SMED → cambios de molde -40%',
              '2. Stock mínimo de repuestos críticos',
              '3. Mantenimiento predictivo en soldadura',
            ]} />
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────── Banca ─────────────────────────── */

function BankingViz(_: IndustryVisualizationProps) {
  const [hov, setHov] = useState(0)
  // Centro de riesgo: 3 agentes especializados
  const agents = [
    { name: 'FraudBot', icon: '🛡️', metric: '3 transacciones bloqueadas hoy', status: 'red' as const, detail: ['Patrón de layering en cuenta ****8821', 'Reporte enviado a cumplimiento'] },
    { name: 'MoraBot', icon: '📨', metric: '$320K en mora priorizada', status: 'amber' as const, detail: ['47 cuentas > 60 días', 'Plan de recuperación · prob. de cobro 64%'] },
    { name: 'RiskBot', icon: '📉', metric: '12 créditos en deterioro', status: 'amber' as const, detail: ['DSCR < 1.2 en 12 clientes', 'Alerta temprana de default activada'] },
  ]
  // Flujo de decisión de crédito en vivo
  const steps = [
    { icon: '📥', label: 'Solicitud recibida', detail: 'PYME · $120K · 24 meses', state: 'done' as const },
    { icon: '📊', label: 'Scoring automático', detail: 'Score 68 / 100', state: 'done' as const },
    { icon: '🧮', label: 'Análisis de ratios', detail: 'DSCR 1.3 · Leverage 46%', state: 'done' as const },
    { icon: '✅', label: 'Decisión', detail: 'Aprobar con garantía', state: 'active' as const },
  ]

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
        <Header title="Centro de riesgo y decisión de crédito" subtitle="Agentes IA monitoreando fraude, mora y riesgo · haz clic para ver el detalle" noMargin />
        <SupervisorBadge name="CreditBot · Supervisor IA" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Centro de riesgo: agentes IA */}
        <div className="bg-white/70 rounded-xl border border-slate-200 p-4">
          <p className="text-xs font-semibold text-slate-700 mb-3">Centro de riesgo IA</p>
          <div className="space-y-2">
            {agents.map((a, i) => {
              const dot = a.status === 'red' ? 'bg-red-500' : a.status === 'amber' ? 'bg-amber-500' : 'bg-emerald-500'
              return (
                <div
                  key={i}
                  className="border border-slate-200 rounded-lg p-2.5 cursor-pointer transition-all hover:border-blue-300 hover:bg-blue-50/40"
                  onMouseEnter={() => setHov(i)}
                  onClick={() => setHov(i)}
                >
                  <div className="flex items-center gap-1.5">
                    <span className="relative flex h-2 w-2"><span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${dot} opacity-75`} /><span className={`relative inline-flex rounded-full h-2 w-2 ${dot}`} /></span>
                    <span className="text-[11px] font-bold text-slate-700">{a.icon} {a.name}</span>
                  </div>
                  <p className="text-[11px] text-slate-600 mt-0.5">{a.metric}</p>
                  {hov === i && (
                    <div className="mt-1.5 pt-1.5 border-t border-slate-100">
                      {a.detail.map((d, j) => (
                        <p key={j} className={`text-[10px] leading-tight ${j === a.detail.length - 1 ? 'text-blue-600 font-semibold' : 'text-slate-500'}`}>{d}</p>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Flujo de decisión en vivo */}
        <div className="bg-white/70 rounded-xl border border-slate-200 p-4">
          <p className="text-xs font-semibold text-slate-700 mb-3">Flujo de decisión</p>
          <div className="space-y-0">
            {steps.map((s, i) => (
              <div key={i} className="flex gap-2.5">
                <div className="flex flex-col items-center">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] shrink-0 ${s.state === 'done' ? 'bg-emerald-100' : 'bg-amber-100'}`}>
                    {s.state === 'done' ? <span className="text-emerald-600 font-bold">✓</span> : <span className="relative flex h-2.5 w-2.5"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" /><span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500" /></span>}
                  </div>
                  {i < steps.length - 1 && <div className="w-0.5 flex-1 bg-slate-200 my-0.5" style={{ minHeight: 14 }} />}
                </div>
                <div className="pb-3">
                  <p className="text-xs font-semibold text-slate-700 leading-tight">{s.icon} {s.label}</p>
                  <p className="text-[10px] text-slate-500 leading-tight">{s.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─────────────────── Helpers compartidos (flujo, gauge, KPIs) ─────────────────── */

type StepState = 'done' | 'active' | 'pending'
type Step = { icon: string; label: string; detail: string; state: StepState }

function StepFlow({ title, steps }: { title: string; steps: Step[] }) {
  return (
    <div className="bg-white/70 rounded-xl border border-slate-200 p-4">
      <p className="text-xs font-semibold text-slate-700 mb-3">{title}</p>
      <div className="space-y-0">
        {steps.map((s, i) => (
          <div key={i} className="flex gap-2.5">
            <div className="flex flex-col items-center">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] shrink-0 ${
                s.state === 'done' ? 'bg-emerald-100' : s.state === 'active' ? 'bg-amber-100' : 'bg-slate-100'
              }`}>
                {s.state === 'done'
                  ? <span className="text-emerald-600 font-bold">✓</span>
                  : s.state === 'active'
                    ? <span className="relative flex h-2.5 w-2.5"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" /><span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500" /></span>
                    : <span className="w-2 h-2 rounded-full bg-slate-300" />}
              </div>
              {i < steps.length - 1 && <div className="w-0.5 flex-1 bg-slate-200 my-0.5" style={{ minHeight: 14 }} />}
            </div>
            <div className="pb-3">
              <p className={`text-xs font-semibold leading-tight ${s.state === 'pending' ? 'text-slate-400' : 'text-slate-700'}`}>{s.icon} {s.label}</p>
              <p className="text-[10px] text-slate-500 leading-tight">{s.detail}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Gauge semicircular reutilizable. gradId debe ser único por instancia visible.
function Gauge({ value, label, gradId }: { value: number; label: string; gradId: string }) {
  const pct = Math.min(Math.max(value, 0), 100) / 100
  return (
    <svg viewBox="0 0 140 84" className="w-full max-w-[170px] mx-auto">
      <path d="M16 70 A54 54 0 0 1 124 70" fill="none" stroke="#e2e8f0" strokeWidth="12" strokeLinecap="round" />
      <path d="M16 70 A54 54 0 0 1 124 70" fill="none" stroke={`url(#${gradId})`} strokeWidth="12" strokeLinecap="round" strokeDasharray={`${pct * 170} 400`} />
      <defs><linearGradient id={gradId} x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#10b981" /><stop offset="50%" stopColor="#f59e0b" /><stop offset="100%" stopColor="#ef4444" /></linearGradient></defs>
      <text x="70" y="64" textAnchor="middle" className="fill-slate-800 text-[18px] font-bold">{value}%</text>
      <text x="70" y="80" textAnchor="middle" className="fill-slate-400 text-[8px]">{label}</text>
    </svg>
  )
}

function KpiRow({ items }: { items: { label: string; value: string; tone?: 'good' | 'warn' | 'bad' }[] }) {
  const tone = { good: 'text-emerald-600', warn: 'text-amber-600', bad: 'text-red-600' }
  return (
    <div className="grid grid-cols-3 gap-2 mt-3">
      {items.map((k, i) => (
        <div key={i} className="bg-white/70 rounded-lg border border-slate-200 px-2 py-1.5 text-center">
          <p className={`text-sm font-bold ${k.tone ? tone[k.tone] : 'text-slate-800'}`}>{k.value}</p>
          <p className="text-[9px] text-slate-500 leading-tight mt-0.5">{k.label}</p>
        </div>
      ))}
    </div>
  )
}

// Lista de agentes con hover/clic para revelar detalle (patrón de BankingViz)
function AgentList({ agents, hov, setHov }: {
  agents: { name: string; icon: string; metric: string; status: 'green' | 'amber' | 'red'; detail: string[] }[]
  hov: number
  setHov: (i: number) => void
}) {
  return (
    <div className="space-y-2">
      {agents.map((a, i) => {
        const dot = a.status === 'red' ? 'bg-red-500' : a.status === 'amber' ? 'bg-amber-500' : 'bg-emerald-500'
        return (
          <div
            key={i}
            className={`border rounded-lg p-2.5 cursor-pointer transition-all ${hov === i ? 'border-blue-300 bg-blue-50/40' : 'border-slate-200 hover:border-blue-300 hover:bg-blue-50/40'}`}
            onMouseEnter={() => setHov(i)}
            onClick={() => setHov(i)}
          >
            <div className="flex items-center gap-1.5">
              <span className="relative flex h-2 w-2"><span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${dot} opacity-75`} /><span className={`relative inline-flex rounded-full h-2 w-2 ${dot}`} /></span>
              <span className="text-[11px] font-bold text-slate-700">{a.icon} {a.name}</span>
            </div>
            <p className="text-[11px] text-slate-600 mt-0.5">{a.metric}</p>
            {hov === i && (
              <div className="mt-1.5 pt-1.5 border-t border-slate-100">
                {a.detail.map((d, j) => (
                  <p key={j} className={`text-[10px] leading-tight ${j === a.detail.length - 1 ? 'text-blue-600 font-semibold' : 'text-slate-500'}`}>{d}</p>
                ))}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

/* ─────────────────────────── Salud ─────────────────────────── */

const HEALTH_AGENTS = [
  { name: 'TriageBot', status: 'amber' as const, lines: ['18 pacientes en espera', '3 de prioridad alta · reordenando cola'] },
  { name: 'CamaBot', status: 'red' as const, lines: ['UCI al 92% de ocupación', '2 altas sugeridas para liberar camas críticas'] },
  { name: 'DiagBot', status: 'green' as const, lines: ['7 estudios analizados hoy', 'Hallazgo crítico priorizado al radiólogo'] },
  { name: 'FarmaBot', status: 'green' as const, lines: ['142 órdenes validadas', '1 interacción medicamentosa bloqueada'] },
]

function HealthViz({ colorText }: IndustryVisualizationProps) {
  void colorText
  const [sel, setSel] = useState(0)
  // Áreas del plano (idx → agente). El plano es un piso hospitalario estilo CAD.
  const areas = [
    { idx: 0, label: 'Urgencias / Triaje', x: 12, y: 20, w: 124, h: 62, emoji: '🚑', note: '18 en espera' },
    { idx: 2, label: 'Imagenología', x: 140, y: 20, w: 74, h: 62, emoji: '🩻', note: '3 en estudio' },
    { idx: 3, label: 'Farmacia', x: 218, y: 20, w: 90, h: 62, emoji: '💊', note: '142 órdenes' },
    { idx: 1, label: 'Hospitalización · UCI', x: 12, y: 88, w: 296, h: 80, emoji: '🛏️', note: '' },
  ]
  // 18 camas (2 filas × 9). Las 3 primeras son UCI (críticas/ocupadas).
  const beds = ['crit', 'occ', 'crit', 'occ', 'occ', 'free', 'occ', 'occ', 'free', 'occ', 'free', 'occ', 'occ', 'occ', 'occ', 'free', 'occ', 'occ']
  const bedColor = (s: string) => (s === 'crit' ? '#ef4444' : s === 'occ' ? '#f59e0b' : '#10b981')
  const bedTint = (s: string) => (s === 'crit' ? '#fef2f2' : s === 'occ' ? '#fffbeb' : '#ecfdf5')
  const steps: Step[] = [
    { icon: '🚑', label: 'Admisión', detail: 'Registro · 24 hoy', state: 'done' },
    { icon: '🩺', label: 'Triaje', detail: 'Clasificación de severidad', state: 'done' },
    { icon: '🔬', label: 'Diagnóstico', detail: 'Labs + imágenes en curso', state: 'active' },
    { icon: '🛏️', label: 'Hospitalización', detail: 'Asignación de cama', state: 'pending' },
    { icon: '🏠', label: 'Alta', detail: 'Plan de seguimiento', state: 'pending' },
  ]
  const selArea = areas.find((a) => a.idx === sel) ?? areas[0]

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
        <Header title="Centro de operaciones clínicas" subtitle="Plano del hospital y flujo de pacientes · haz clic en un área para ver su agente IA" noMargin />
        <SupervisorBadge name="MedBot · Supervisor IA" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Plano hospitalario CAD */}
        <div className="lg:col-span-2 bg-white/70 rounded-xl border border-slate-200 p-4">
          <p className="text-xs font-semibold text-slate-700 mb-2">Planta hospitalaria · estado en tiempo real</p>
          <svg viewBox="0 0 320 180" className="w-full h-auto" style={{ maxHeight: 320 }}>
            <defs>
              <pattern id="hfloor" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M10 0 L0 0 0 10" fill="none" stroke="#eef2f7" strokeWidth="0.6" />
              </pattern>
            </defs>
            <rect x="8" y="14" width="304" height="160" rx="3" fill="url(#hfloor)" stroke="#475569" strokeWidth="1.6" />
            {areas.map((a) => (
              <g key={a.idx} style={{ cursor: 'pointer' }} onMouseEnter={() => setSel(a.idx)} onClick={() => setSel(a.idx)}>
                <rect x={a.x} y={a.y} width={a.w} height={a.h} rx="2.5"
                  fill={sel === a.idx ? '#eef2ff' : '#f8fafc'} stroke={sel === a.idx ? '#6366f1' : '#cbd5e1'} strokeWidth={sel === a.idx ? 2 : 1.2} />
                <text x={a.x + 6} y={a.y + 12} className="fill-slate-600 text-[8px] font-semibold">{a.emoji} {a.label}</text>
                {a.note && <text x={a.x + 6} y={a.y + 24} className="fill-slate-400 text-[8px]">{a.note}</text>}
              </g>
            ))}
            {/* Camas en hospitalización · UCI */}
            <text x="22" y="108" className="fill-red-500 text-[7px] font-bold">UCI</text>
            {beds.map((s, i) => {
              const col = i % 9, row = Math.floor(i / 9)
              const x = 24 + col * 31, y = row === 0 ? 112 : 140
              return (
                <g key={i}>
                  <rect x={x} y={y} width="24" height="18" rx="2" fill={bedTint(s)} stroke={bedColor(s)} strokeWidth="1.2">
                    {s === 'crit' && <animate attributeName="stroke-width" values="1.2;2.6;1.2" dur="1.2s" repeatCount="indefinite" />}
                  </rect>
                  <rect x={x + 2.5} y={y + 2.5} width="9" height="4" rx="1" fill={bedColor(s)} opacity="0.75" />
                </g>
              )
            })}
          </svg>
          <div className="flex flex-wrap items-center gap-3 mt-2 text-[10px] text-slate-500">
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm border-2 border-emerald-500" /> Libre</span>
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm border-2 border-amber-500" /> Ocupada</span>
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm border-2 border-red-500" /> Crítica</span>
          </div>
          <KpiRow items={[
            { label: 'Ocupación UCI', value: '92%', tone: 'bad' },
            { label: 'Espera urgencias', value: '34 min', tone: 'warn' },
            { label: 'Readmisión 30d', value: '8.4%', tone: 'good' },
          ]} />
        </div>

        {/* Agente del área + flujo del paciente */}
        <div className="flex flex-col gap-4">
          <div className="bg-white/70 rounded-xl border border-slate-200 p-4">
            <p className="text-xs font-semibold text-slate-700 mb-2">Agente de {selArea.label}</p>
            <AgentCard agent={HEALTH_AGENTS[sel].name} status={HEALTH_AGENTS[sel].status} lines={HEALTH_AGENTS[sel].lines} />
          </div>
          <StepFlow title="Flujo del paciente" steps={steps} />
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────── Seguros ─────────────────────────── */

function InsuranceViz(_: IndustryVisualizationProps) {
  const [hov, setHov] = useState(0)
  const agents = [
    { name: 'ClaimBot', icon: '📋', metric: '128 siniestros en cola', status: 'amber' as const, detail: ['38 listos para pago automático', 'Tiempo medio 2.4 días (-31%)'] },
    { name: 'FraudBot', icon: '🛡️', metric: '6 reclamos sospechosos', status: 'red' as const, detail: ['Siniestros repetidos · póliza ****4471', 'Derivado a investigación especial'] },
    { name: 'PricingBot', icon: '📊', metric: 'Prima recalculada por segmento', status: 'green' as const, detail: ['Auto joven · +8% de ajuste técnico', 'Retención proyectada 91%'] },
  ]
  const steps: Step[] = [
    { icon: '📥', label: 'FNOL recibido', detail: 'Aviso de siniestro · auto', state: 'done' },
    { icon: '📷', label: 'Evaluación de daños', detail: 'Fotos analizadas por IA', state: 'done' },
    { icon: '🛡️', label: 'Chequeo de fraude', detail: 'Score 0.18 · riesgo bajo', state: 'done' },
    { icon: '🧮', label: 'Ajuste', detail: 'Liquidación $4,200', state: 'active' },
    { icon: '💸', label: 'Pago', detail: 'Transferencia programada', state: 'pending' },
  ]

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
        <Header title="Centro de siniestros y suscripción" subtitle="Agentes IA gestionando reclamos, fraude y pricing · haz clic para ver el detalle" noMargin />
        <SupervisorBadge name="PólizaBot · Supervisor IA" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Centro de siniestros IA */}
        <div className="bg-white/70 rounded-xl border border-slate-200 p-4">
          <p className="text-xs font-semibold text-slate-700 mb-3">Centro de siniestros IA</p>
          <AgentList agents={agents} hov={hov} setHov={setHov} />
          <KpiRow items={[
            { label: 'Loss ratio', value: '62%', tone: 'warn' },
            { label: 'Liquidación', value: '2.4 d', tone: 'good' },
            { label: 'Fraude detect.', value: '6', tone: 'bad' },
          ]} />
        </div>

        {/* Gauge loss ratio + flujo de reclamo */}
        <div className="flex flex-col gap-4">
          <div className="bg-white/70 rounded-xl border border-slate-200 p-4">
            <p className="text-xs font-semibold text-slate-700 mb-1">Loss ratio (siniestralidad)</p>
            <Gauge value={62} label="objetivo < 60%" gradId="lossG" />
          </div>
          <StepFlow title="Flujo de reclamo en vivo" steps={steps} />
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────── Legal ─────────────────────────── */

const LEGAL_CLAUSES = [
  { name: 'Objeto del contrato', risk: 'low' as const, agent: 'ClauseBot', lines: ['Cláusula estándar', 'Sin observaciones'] },
  { name: 'Limitación de responsabilidad', risk: 'med' as const, agent: 'RiskBot', lines: ['Falta tope de responsabilidad', 'Sugerir cap a 12 meses de honorarios'] },
  { name: 'Penalización y rescisión', risk: 'high' as const, agent: 'ComplianceBot', lines: ['Penalidad desproporcionada (40%)', 'Posible cláusula abusiva — revisar'] },
  { name: 'Confidencialidad', risk: 'low' as const, agent: 'JurisBot', lines: ['Alineada a jurisprudencia reciente', 'Vigencia de 3 años · OK'] },
]

function LegalViz(_: IndustryVisualizationProps) {
  const [sel, setSel] = useState(2)
  const riskColor = (r: string) => (r === 'high' ? '#ef4444' : r === 'med' ? '#f59e0b' : '#10b981')
  const riskTint = (r: string) => (r === 'high' ? '#fef2f2' : r === 'med' ? '#fffbeb' : '#ecfdf5')
  const riskStatus = (r: string): 'green' | 'amber' | 'red' => (r === 'high' ? 'red' : r === 'med' ? 'amber' : 'green')
  const steps: Step[] = [
    { icon: '📄', label: 'Ingesta', detail: 'Contrato cargado · 14 págs', state: 'done' },
    { icon: '🔎', label: 'Extracción de cláusulas', detail: '23 cláusulas identificadas', state: 'done' },
    { icon: '⚖️', label: 'Análisis de riesgo', detail: '5 de alto riesgo', state: 'active' },
    { icon: '📋', label: 'Comparación con políticas', detail: 'Plantilla corporativa', state: 'pending' },
    { icon: '📝', label: 'Resumen ejecutivo', detail: 'Borrador para abogado', state: 'pending' },
  ]
  const cy = 30, ch = 36, cgap = 4 // geometría de cada cláusula en la hoja

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
        <Header title="Revisión inteligente de contratos" subtitle="Cláusulas resaltadas por nivel de riesgo · haz clic para ver el agente IA" noMargin />
        <SupervisorBadge name="LexBot · Supervisor IA" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Hoja de contrato */}
        <div className="bg-white/70 rounded-xl border border-slate-200 p-4">
          <p className="text-xs font-semibold text-slate-700 mb-2">Contrato de servicios · análisis de cláusulas</p>
          <svg viewBox="0 0 236 210" className="w-full h-auto" style={{ maxHeight: 340 }}>
            {/* sombra + página */}
            <rect x="36" y="10" width="166" height="194" rx="3" fill="#0f172a" opacity="0.06" />
            <rect x="32" y="6" width="166" height="194" rx="3" fill="white" stroke="#e2e8f0" strokeWidth="1.2" />
            {/* encabezado del documento */}
            <rect x="48" y="16" width="86" height="6" rx="2" fill="#334155" />
            <rect x="48" y="26" width="134" height="3" rx="1.5" fill="#cbd5e1" />
            {/* cláusulas */}
            {LEGAL_CLAUSES.map((c, i) => {
              const y = cy + i * (ch + cgap)
              const active = sel === i
              return (
                <g key={i} style={{ cursor: 'pointer' }} onMouseEnter={() => setSel(i)} onClick={() => setSel(i)}>
                  <rect x="44" y={y} width="142" height={ch} rx="2.5" fill={riskTint(c.risk)} stroke={active ? riskColor(c.risk) : 'transparent'} strokeWidth={active ? 1.8 : 0} />
                  <rect x="44" y={y} width="3.5" height={ch} fill={riskColor(c.risk)} />
                  {/* texto simulado */}
                  <rect x="54" y={y + 6} width="70" height="4" rx="2" fill="#475569" />
                  <rect x="54" y={y + 15} width="124" height="2.6" rx="1.3" fill="#cbd5e1" />
                  <rect x="54" y={y + 21} width="124" height="2.6" rx="1.3" fill="#cbd5e1" />
                  <rect x="54" y={y + 27} width="92" height="2.6" rx="1.3" fill="#cbd5e1" />
                  {/* dot de riesgo */}
                  <circle cx="180" cy={y + 8} r="3" fill={riskColor(c.risk)}>
                    {c.risk === 'high' && <animate attributeName="opacity" values="1;0.4;1" dur="1.2s" repeatCount="indefinite" />}
                  </circle>
                </g>
              )
            })}
          </svg>
          <div className="flex flex-wrap items-center gap-3 mt-2 text-[10px] text-slate-500">
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm bg-emerald-500" /> Bajo</span>
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm bg-amber-500" /> Medio</span>
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm bg-red-500" /> Alto</span>
          </div>
        </div>

        {/* Observación del agente + flujo de revisión */}
        <div className="flex flex-col gap-4">
          <div className="bg-white/70 rounded-xl border border-slate-200 p-4">
            <p className="text-xs font-semibold text-slate-700 mb-2">Observación de {LEGAL_CLAUSES[sel].agent}</p>
            <AgentCard agent={`${LEGAL_CLAUSES[sel].agent} · ${LEGAL_CLAUSES[sel].name}`} status={riskStatus(LEGAL_CLAUSES[sel].risk)} lines={LEGAL_CLAUSES[sel].lines} />
            <KpiRow items={[
              { label: 'Contratos hoy', value: '47' },
              { label: 'Alto riesgo', value: '5', tone: 'bad' },
              { label: 'T. revisión', value: '6 min', tone: 'good' },
            ]} />
          </div>
          <StepFlow title="Flujo de revisión" steps={steps} />
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
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
        <Header title="Panel de inteligencia operativa" subtitle="Métricas clave y tendencias detectadas por IA" noMargin />
        <SupervisorBadge />
      </div>
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

function Header({ title, subtitle, noMargin = false }: { title: string; subtitle: string; noMargin?: boolean }) {
  return (
    <div className={noMargin ? '' : 'mb-4'}>
      <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
      <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>
    </div>
  )
}
