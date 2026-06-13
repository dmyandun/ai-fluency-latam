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
    case 'agro':      viz = <AgroViz {...props} />; break
    case 'telecom':   viz = <TelecomViz {...props} />; break
    case 'construction': viz = <ConstructionViz {...props} />; break
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

const HEALTH_STAGES = ['Admisión', 'Triaje', 'Diagnóstico', 'Hospitalización', 'Alta']
const HEALTH_STAGE_ICON = ['🚑', '🩺', '🔬', '🛏️', '🏠']
const HEALTH_STAGE_DETAIL = ['Registro y cobertura', 'Clasificación de la cola', 'Estudios e imágenes', 'Asignación de cama', 'Plan y liberación de cama']

// Pacientes ubicados en el plano. stage 0-4. kind 'marker' (zonas) o 'bed' (hospitalización).
// times[]: minutos transcurridos por etapa hasta la actual ('' = aún no llega).
type HPatient = { id: string; stage: number; kind: 'marker' | 'bed'; x: number; y: number; st?: 'crit' | 'occ'; times: string[] }
const HEALTH_PATIENTS: HPatient[] = [
  // Admisión: centrado sobre el mostrador (rect 20,78,60,6)
  { id: 'P-07', stage: 0, kind: 'marker', x: 50, y: 70, times: ['en curso', '', '', '', ''] },
  // Triaje: centrados en las dos cajas (20,130,28,22) y (56,130,28,22)
  { id: 'P-05', stage: 1, kind: 'marker', x: 34, y: 137, times: ['6 min', 'en curso', '', '', ''] },
  { id: 'P-06', stage: 1, kind: 'marker', x: 70, y: 137, times: ['9 min', 'en curso', '', '', ''] },
  // Imagenología: centrado en el anillo del escáner (135,66)
  { id: 'P-04', stage: 2, kind: 'marker', x: 135, y: 62, times: ['5 min', '18 min', 'en curso', '', ''] },
  { id: 'P-01', stage: 3, kind: 'bed', x: 184, y: 44, st: 'crit', times: ['4 min', '12 min', '40 min', 'en curso', ''] },
  { id: 'P-02', stage: 3, kind: 'bed', x: 252, y: 44, st: 'occ', times: ['7 min', '22 min', '35 min', '6 h', ''] },
  { id: 'P-03', stage: 3, kind: 'bed', x: 184, y: 80, st: 'occ', times: ['5 min', '15 min', '50 min', '3 h', ''] },
  { id: 'P-08', stage: 4, kind: 'bed', x: 252, y: 116, st: 'occ', times: ['6 min', '20 min', '30 min', '8 h', 'alta 14:00'] },
]
const HEALTH_FREE_BEDS = [{ x: 252, y: 80 }, { x: 184, y: 116 }, { x: 184, y: 152 }, { x: 252, y: 152 }]

// Recomendaciones de reasignación del agente de camas (prioridad 1-3, 3 = más alta).
const HEALTH_RECS: { patientIdx: number; priority: 1 | 2 | 3; action: string }[] = [
  { patientIdx: 0, priority: 3, action: 'Admitir P-07 a cama libre #6 — URGENTE por saturación de admisión' },
  { patientIdx: 1, priority: 2, action: 'Mover P-05 a cama #2 dentro de 1 h tras estudios' },
  { patientIdx: 4, priority: 1, action: 'Mantener P-01 en UCI · reevaluar en 2 h' },
]

function HealthViz({ colorText }: IndustryVisualizationProps) {
  void colorText
  // null = sin paciente seleccionado → no se muestra el flujo (aparece solo al hacer clic)
  const [selIdx, setSelIdx] = useState<number | null>(null)
  const sel = selIdx !== null ? HEALTH_PATIENTS[selIdx] : null
  const steps: Step[] = sel
    ? HEALTH_STAGES.map((label, i) => {
        const t = sel.times[i]
        const timeTag = i < sel.stage ? ` · ${t || '—'}` : i === sel.stage ? ` · ${t || 'en curso'}` : ''
        return {
          icon: HEALTH_STAGE_ICON[i],
          label,
          detail: HEALTH_STAGE_DETAIL[i] + timeTag,
          state: i < sel.stage ? 'done' : i === sel.stage ? 'active' : 'pending',
        }
      })
    : []
  const recColor = (p: 1 | 2 | 3): 'green' | 'amber' | 'red' => (p === 3 ? 'red' : p === 2 ? 'amber' : 'green')
  const stageColor = ['#64748b', '#f59e0b', '#6366f1', '#ef4444', '#10b981']
  const bedColor = (s?: string) => (s === 'crit' ? '#ef4444' : '#f59e0b')

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
        <Header title="Centro de operaciones clínicas" subtitle="Plano del hospital y flujo de pacientes · haz clic en un paciente para ver su etapa" noMargin />
        <SupervisorBadge name="MedBot · Supervisor IA" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Plano hospitalario CAD */}
        <div className="lg:col-span-2 bg-white/70 rounded-xl border border-slate-200 p-4">
          <p className="text-xs font-semibold text-slate-700 mb-2">Planta hospitalaria · pacientes en tiempo real</p>
          <svg viewBox="0 0 340 200" className="w-full h-auto" style={{ maxHeight: 330 }}>
            {/* ── Capa CAD estática (no interactiva) ── */}
            <g style={{ pointerEvents: 'none' }}>
              <defs>
                <pattern id="hfloor" width="9" height="9" patternUnits="userSpaceOnUse">
                  <path d="M9 0 L0 0 0 9" fill="none" stroke="#eef2f7" strokeWidth="0.5" />
                </pattern>
              </defs>
              {/* piso + muro exterior con grosor */}
              <rect x="10" y="16" width="320" height="176" fill="url(#hfloor)" />
              <rect x="10" y="16" width="320" height="176" fill="none" stroke="#64748b" strokeWidth="3" />
              <rect x="12.5" y="18.5" width="315" height="171" fill="none" stroke="#cbd5e1" strokeWidth="0.6" />
              {/* particiones internas */}
              <line x1="96" y1="16" x2="96" y2="192" stroke="#94a3b8" strokeWidth="1.6" />
              <line x1="176" y1="16" x2="176" y2="192" stroke="#94a3b8" strokeWidth="1.6" />
              <line x1="10" y1="104" x2="176" y2="104" stroke="#94a3b8" strokeWidth="1.6" />
              {/* puertas: vano (corta el muro) + arco de barrido */}
              {[
                { x: 96, y: 60, dir: 1 }, { x: 96, y: 140, dir: 1 }, { x: 176, y: 70, dir: 1 },
                { x: 53, y: 104, dir: 0 }, { x: 135, y: 104, dir: 0 },
              ].map((d, i) => d.dir === 1 ? (
                <g key={i}>
                  <rect x={d.x - 1.5} y={d.y} width="3" height="16" fill="#f8fafc" />
                  <path d={`M${d.x} ${d.y} A16 16 0 0 1 ${d.x + 16} ${d.y + 16}`} fill="none" stroke="#cbd5e1" strokeWidth="0.7" />
                </g>
              ) : (
                <g key={i}>
                  <rect x={d.x} y={d.y - 1.5} width="16" height="3" fill="#f8fafc" />
                  <path d={`M${d.x} ${d.y} A16 16 0 0 1 ${d.x + 16} ${d.y + 16}`} fill="none" stroke="#cbd5e1" strokeWidth="0.7" />
                </g>
              ))}
              {/* etiquetas de sala (tipografía técnica) */}
              <text x="18" y="30" className="fill-slate-500 text-[7px] font-semibold tracking-wider">ADMISIÓN</text>
              <text x="18" y="118" className="fill-slate-500 text-[7px] font-semibold tracking-wider">TRIAJE</text>
              <text x="102" y="30" className="fill-slate-500 text-[7px] font-semibold tracking-wider">IMAGENOLOGÍA</text>
              <text x="102" y="118" className="fill-slate-500 text-[7px] font-semibold tracking-wider">QUIRÓFANO</text>
              <text x="182" y="30" className="fill-slate-500 text-[7px] font-semibold tracking-wider">HOSPITALIZACIÓN · UCI</text>
              {/* mobiliario simbólico (líneas finas) */}
              {/* admisión: mostrador + sillas */}
              <rect x="20" y="78" width="60" height="6" rx="1" fill="none" stroke="#cbd5e1" strokeWidth="0.9" />
              <rect x="24" y="40" width="10" height="8" rx="1" fill="none" stroke="#cbd5e1" strokeWidth="0.8" />
              <rect x="40" y="40" width="10" height="8" rx="1" fill="none" stroke="#cbd5e1" strokeWidth="0.8" />
              {/* triaje: 2 boxes */}
              <rect x="20" y="130" width="28" height="22" rx="1.5" fill="none" stroke="#cbd5e1" strokeWidth="0.8" />
              <rect x="56" y="130" width="28" height="22" rx="1.5" fill="none" stroke="#cbd5e1" strokeWidth="0.8" />
              {/* imagenología: anillo de escáner */}
              <circle cx="135" cy="66" r="16" fill="none" stroke="#cbd5e1" strokeWidth="1.2" />
              <circle cx="135" cy="66" r="9" fill="none" stroke="#cbd5e1" strokeWidth="0.8" />
              {/* quirófano: mesa + equipos */}
              <rect x="120" y="135" width="32" height="14" rx="3" fill="none" stroke="#cbd5e1" strokeWidth="1" />
              <rect x="108" y="158" width="56" height="6" rx="1" fill="none" stroke="#cbd5e1" strokeWidth="0.8" />
              {/* hospitalización: pasillo central */}
              <line x1="240" y1="40" x2="240" y2="180" stroke="#e2e8f0" strokeWidth="6" strokeLinecap="round" />
              {/* cota tenue superior */}
              <line x1="10" y1="10" x2="330" y2="10" stroke="#cbd5e1" strokeWidth="0.5" />
              <line x1="10" y1="7" x2="10" y2="13" stroke="#cbd5e1" strokeWidth="0.5" />
              <line x1="330" y1="7" x2="330" y2="13" stroke="#cbd5e1" strokeWidth="0.5" />
              <text x="170" y="8" textAnchor="middle" className="fill-slate-300 text-[6px]">≈ 24 m</text>
            </g>

            {/* ── Capa interactiva: camas libres + pacientes ── */}
            {HEALTH_FREE_BEDS.map((b, i) => (
              <g key={`f${i}`}>
                <rect x={b.x} y={b.y} width="56" height="24" rx="2.5" fill="#ecfdf5" stroke="#10b981" strokeWidth="1.2" />
                <rect x={b.x + 3} y={b.y + 3} width="12" height="5" rx="1" fill="#10b981" opacity="0.6" />
                <text x={b.x + 28} y={b.y + 16} textAnchor="middle" className="fill-emerald-600 text-[6px]">libre</text>
              </g>
            ))}
            {HEALTH_PATIENTS.map((p, i) => {
              const active = selIdx === i
              if (p.kind === 'bed') {
                const c = bedColor(p.st)
                return (
                  <g key={p.id} style={{ cursor: 'pointer' }} onMouseEnter={() => setSelIdx(i)} onClick={() => setSelIdx(i)}>
                    <rect x={p.x} y={p.y} width="56" height="24" rx="2.5" fill={p.stage === 4 ? '#ecfdf5' : p.st === 'crit' ? '#fef2f2' : '#fffbeb'}
                      stroke={p.stage === 4 ? '#10b981' : c} strokeWidth={active ? 2.6 : 1.4}>
                      {p.st === 'crit' && <animate attributeName="stroke-width" values="1.4;2.8;1.4" dur="1.2s" repeatCount="indefinite" />}
                    </rect>
                    <rect x={p.x + 3} y={p.y + 3} width="12" height="5" rx="1" fill={p.stage === 4 ? '#10b981' : c} opacity="0.8" />
                    <text x={p.x + 30} y={p.y + 11} textAnchor="middle" className="fill-slate-600 text-[6.5px] font-bold">{p.id}</text>
                    <text x={p.x + 30} y={p.y + 19} textAnchor="middle" className="text-[6px]" fill={p.stage === 4 ? '#059669' : c}>{p.stage === 4 ? 'alta' : p.st === 'crit' ? 'UCI' : 'estable'}</text>
                    {active && <rect x={p.x - 2} y={p.y - 2} width="60" height="28" rx="3.5" fill="none" stroke="#6366f1" strokeWidth="1.4" strokeDasharray="3 2" />}
                  </g>
                )
              }
              const c = stageColor[p.stage]
              return (
                <g key={p.id} style={{ cursor: 'pointer' }} onMouseEnter={() => setSelIdx(i)} onClick={() => setSelIdx(i)}>
                  {active && <circle cx={p.x} cy={p.y} r="11" fill="none" stroke="#6366f1" strokeWidth="1.4" strokeDasharray="3 2" />}
                  <circle cx={p.x} cy={p.y - 3.5} r="3" fill={c} />
                  <path d={`M${p.x - 4} ${p.y + 5} Q${p.x} ${p.y - 0.5} ${p.x + 4} ${p.y + 5} Z`} fill={c} />
                  <text x={p.x} y={p.y + 14} textAnchor="middle" className="fill-slate-500 text-[6px] font-semibold">{p.id}</text>
                </g>
              )
            })}
          </svg>
          <div className="flex flex-wrap items-center gap-3 mt-2 text-[10px] text-slate-500">
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm border-2 border-emerald-500" /> Libre / Alta</span>
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm border-2 border-amber-500" /> Estable</span>
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm border-2 border-red-500" /> Crítica (UCI)</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-indigo-500" /> Paciente seleccionado</span>
          </div>
          <KpiRow items={[
            { label: 'Ocupación UCI', value: '92%', tone: 'bad' },
            { label: 'Espera urgencias', value: '2h40', tone: 'warn' },
            { label: 'Altas hoy', value: '18', tone: 'good' },
          ]} />
        </div>

        {/* Recomendaciones del agente de camas + flujo bajo demanda */}
        <div className="flex flex-col gap-4">
          <div className="bg-white/70 rounded-xl border border-slate-200 p-4">
            <div className="flex items-center gap-1.5 mb-1">
              <span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-500 opacity-75" /><span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500" /></span>
              <span className="text-[11px] font-bold text-slate-700">🤖 CamaBot · Reasignación</span>
            </div>
            <p className="text-[10px] text-slate-500 mb-2.5">Prioridad 1–3 (3 = más alta) · haz clic en una tarjeta para ver el flujo del paciente</p>
            <div className="space-y-2">
              {HEALTH_RECS.map((r, i) => {
                const p = HEALTH_PATIENTS[r.patientIdx]
                const active = selIdx === r.patientIdx
                const tone = recColor(r.priority)
                const badge = tone === 'red' ? 'bg-red-100 text-red-700' : tone === 'amber' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'
                const dot = tone === 'red' ? 'bg-red-500' : tone === 'amber' ? 'bg-amber-500' : 'bg-emerald-500'
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setSelIdx(r.patientIdx)}
                    className={`w-full text-left border rounded-lg px-2.5 py-2 transition-all ${active ? 'border-indigo-300 bg-indigo-50/50 ring-1 ring-indigo-200' : 'border-slate-200 bg-white hover:border-indigo-300 hover:bg-indigo-50/40'}`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-0.5">
                      <span className="flex items-center gap-1.5 text-[11px] font-bold text-slate-700">
                        <span className={`w-1.5 h-1.5 rounded-full ${dot}`} /> {p.id}
                      </span>
                      <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded-full ${badge}`}>Prioridad {r.priority}</span>
                    </div>
                    <p className="text-[10px] text-slate-600 leading-tight">{r.action}</p>
                  </button>
                )
              })}
            </div>
          </div>
          {sel ? (
            <StepFlow title={`Flujo de ${sel.id} · tiempo por etapa`} steps={steps} />
          ) : (
            <div className="bg-white/70 rounded-xl border border-dashed border-slate-300 p-4 text-center">
              <p className="text-[11px] text-slate-400">Selecciona una recomendación o un paciente del plano para ver su recorrido y tiempos por etapa.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────── Seguros ─────────────────────────── */

// Etapas del embudo de siniestros (volumen y SLA) + su agente
const INS_FUNNEL = [
  { label: 'FNOL', vol: 412, sla: 'auto', bottleneck: false },
  { label: 'Triaje', vol: 380, sla: '2 h', bottleneck: false },
  { label: 'Peritaje', vol: 128, sla: '1.8 d', bottleneck: true },
  { label: 'Liquidación', vol: 96, sla: '6 h', bottleneck: false },
  { label: 'Pago', vol: 88, sla: '24 h', bottleneck: false },
]
const INS_STAGE_BOT: { agent: string; status: 'green' | 'amber' | 'red'; lines: string[] }[] = [
  { agent: 'FNOLBot', status: 'green', lines: ['Registra el aviso y valida la póliza', '92% automatizado · sin espera manual'] },
  { agent: 'TriageBot', status: 'green', lines: ['Clasifica la complejidad del siniestro', 'Casos simples → pago exprés'] },
  { agent: 'PeritoBot', status: 'amber', lines: ['Peritaje por fotos · cuello de botella', '128 en cola · prioriza por monto y antigüedad'] },
  { agent: 'AjusteBot', status: 'green', lines: ['Calcula liquidación y deducible', 'Estimación $4,200 · confianza 92%'] },
  { agent: 'PagoBot', status: 'green', lines: ['Programa la transferencia', 'SLA 24 h · 88 pagos emitidos hoy'] },
]

// Zonas de daño sobre el auto (vista superior, viewBox 0 0 210 96). El frente está a la izquierda.
type InsZoneKey = 'frente' | 'capo' | 'puerta-der' | 'puerta-izq' | 'trasera' | 'techo'
const INS_ZONE_RECT: Record<InsZoneKey, { x: number; y: number; w: number; h: number }> = {
  frente: { x: 38, y: 22, w: 16, h: 52 },
  capo: { x: 56, y: 26, w: 22, h: 44 },
  'puerta-der': { x: 80, y: 24, w: 46, h: 8 },
  'puerta-izq': { x: 80, y: 66, w: 46, h: 8 },
  trasera: { x: 146, y: 22, w: 16, h: 52 },
  techo: { x: 82, y: 34, w: 46, h: 28 },
}
const INS_ZONE_LABEL: Record<InsZoneKey, string> = {
  frente: 'parachoques frontal', capo: 'capó', 'puerta-der': 'puerta derecha',
  'puerta-izq': 'puerta izquierda', trasera: 'parte trasera', techo: 'techo',
}

type InsStatus = 'aprobado' | 'revisión' | 'fraude'
type InsCase = {
  id: string; vehiculo: string; tipo: string; status: InsStatus
  estimacion: string; confianza: string
  zones: { key: InsZoneKey; sev: 'alta' | 'media' }[]
  resumen: string[]
}
const INS_CASES: InsCase[] = [
  {
    id: 'SIN-2041', vehiculo: 'Sedán · placa ABC-123', tipo: 'Colisión frontal', status: 'revisión',
    estimacion: '$4,200', confianza: '92%',
    zones: [{ key: 'frente', sev: 'alta' }, { key: 'puerta-izq', sev: 'media' }],
    resumen: ['Daño alto en parachoques frontal + puerta izq.', 'Repuestos y mano de obra estimados', 'Liquidación $4,200 · confianza 92%'],
  },
  {
    id: 'SIN-2038', vehiculo: 'SUV · placa XYZ-998', tipo: 'Alcance trasero', status: 'aprobado',
    estimacion: '$1,850', confianza: '96%',
    zones: [{ key: 'trasera', sev: 'media' }],
    resumen: ['Daño medio en parte trasera', 'Sin afectación estructural', 'Aprobado automático $1,850 · confianza 96%'],
  },
  {
    id: 'SIN-2033', vehiculo: 'Hatchback · placa JKL-540', tipo: 'Daño múltiple', status: 'fraude',
    estimacion: '$7,600', confianza: '54%',
    zones: [{ key: 'frente', sev: 'alta' }, { key: 'capo', sev: 'alta' }, { key: 'techo', sev: 'media' }],
    resumen: ['Daños inconsistentes con el relato del parte', 'FraudBot: fechas de fotos no coinciden', 'Derivado a investigación · confianza 54%'],
  },
  {
    id: 'SIN-2029', vehiculo: 'Pickup · placa MNO-310', tipo: 'Raspón lateral', status: 'aprobado',
    estimacion: '$640', confianza: '98%',
    zones: [{ key: 'puerta-der', sev: 'media' }],
    resumen: ['Raspón superficial en puerta derecha', 'Solo pintura y pulido', 'Pago exprés $640 · confianza 98%'],
  },
]

function InsuranceViz(_: IndustryVisualizationProps) {
  const [selStage, setSelStage] = useState(2) // Peritaje (cuello de botella)
  const [selCase, setSelCase] = useState(0)
  const maxVol = INS_FUNNEL[0].vol
  const bot = INS_STAGE_BOT[selStage]
  const c = INS_CASES[selCase]
  const sevColor = (s: 'alta' | 'media') => (s === 'alta' ? '#ef4444' : '#f59e0b')
  const statusStyle: Record<InsStatus, { badge: string; agent: 'green' | 'amber' | 'red' }> = {
    aprobado: { badge: 'bg-emerald-100 text-emerald-700', agent: 'green' },
    'revisión': { badge: 'bg-amber-100 text-amber-700', agent: 'amber' },
    fraude: { badge: 'bg-red-100 text-red-700', agent: 'red' },
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
        <Header title="Centro de operaciones de siniestros y suscripción" subtitle="Embudo de siniestros y reporte de peritaje · haz clic en un caso para ver su reporte" noMargin />
        <SupervisorBadge name="PólizaBot · Supervisor IA" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Embudo + reporte de peritaje */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          {/* Embudo de siniestros */}
          <div className="bg-white/70 rounded-xl border border-slate-200 p-4">
            <p className="text-xs font-semibold text-slate-700 mb-2">Embudo de siniestros · volumen y SLA por etapa</p>
            <svg viewBox="0 0 320 96" className="w-full h-auto" style={{ maxHeight: 150 }}>
              {/* polígono de embudo de fondo */}
              <polygon
                points={INS_FUNNEL.map((s, i) => `${14 + i * 62 + 24},${70 - (s.vol / maxVol) * 56}`).join(' ') + ' ' +
                  INS_FUNNEL.map((s, i) => `${14 + (INS_FUNNEL.length - 1 - i) * 62 + 24},70`).join(' ')}
                fill="#eef2ff" opacity="0.5"
              />
              {INS_FUNNEL.map((s, i) => {
                const h = Math.max((s.vol / maxVol) * 56, 12)
                const x = 14 + i * 62, y = 70 - h
                const active = selStage === i
                const fill = s.bottleneck ? '#fde68a' : '#c7d2fe'
                const stroke = s.bottleneck ? '#f59e0b' : '#6366f1'
                return (
                  <g key={i} style={{ cursor: 'pointer' }} onMouseEnter={() => setSelStage(i)} onClick={() => setSelStage(i)}>
                    <rect x={x} y={y} width="48" height={h} rx="2.5" fill={fill} stroke={stroke} strokeWidth={active ? 2.4 : 1.2}>
                      {s.bottleneck && <animate attributeName="opacity" values="1;0.6;1" dur="1.3s" repeatCount="indefinite" />}
                    </rect>
                    <text x={x + 24} y={y + h / 2 + 3} textAnchor="middle" className="fill-slate-700 text-[9px] font-bold">{s.vol}</text>
                    <text x={x + 24} y="82" textAnchor="middle" className="fill-slate-600 text-[7.5px] font-semibold">{s.label}</text>
                    <text x={x + 24} y="91" textAnchor="middle" className="fill-slate-400 text-[7px]">SLA {s.sla}</text>
                  </g>
                )
              })}
            </svg>
            <div className="mt-2">
              <AgentCard agent={bot.agent} status={bot.status} lines={bot.lines} />
            </div>
          </div>

          {/* Reporte de peritaje del caso seleccionado */}
          <div className="bg-white/70 rounded-xl border border-slate-200 p-4">
            <div className="flex items-center justify-between gap-2 mb-2">
              <p className="text-xs font-semibold text-slate-700">Reporte de peritaje · {c.id}</p>
              <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${statusStyle[c.status].badge}`}>{c.status.toUpperCase()}</span>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <svg viewBox="0 0 210 96" className="w-full sm:w-1/2 h-auto" style={{ maxHeight: 130 }}>
                {/* carrocería vista superior */}
                <rect x="40" y="22" width="120" height="52" rx="16" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1.4" />
                <rect x="78" y="30" width="50" height="36" rx="7" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1" />
                {/* ruedas */}
                {[[52, 16], [140, 16], [52, 74], [140, 74]].map(([wx, wy], i) => (
                  <rect key={i} x={wx} y={wy} width="16" height="8" rx="2" fill="#475569" />
                ))}
                {/* faros (frente a la izquierda) */}
                <rect x="36" y="28" width="5" height="8" rx="2" fill="#fcd34d" />
                <rect x="36" y="60" width="5" height="8" rx="2" fill="#fcd34d" />
                {/* zonas de daño del caso seleccionado */}
                {c.zones.map((z, i) => {
                  const r = INS_ZONE_RECT[z.key]
                  return (
                    <rect key={i} x={r.x} y={r.y} width={r.w} height={r.h} rx="3" fill={sevColor(z.sev)} opacity={z.sev === 'alta' ? 0.4 : 0.32}>
                      {z.sev === 'alta' && <animate attributeName="opacity" values="0.4;0.65;0.4" dur="1.2s" repeatCount="indefinite" />}
                    </rect>
                  )
                })}
              </svg>
              <div className="w-full sm:w-1/2">
                <p className="text-[11px] font-semibold text-slate-700">{c.vehiculo}</p>
                <p className="text-[10px] text-slate-500 mb-2">{c.tipo}</p>
                <div className="flex flex-wrap gap-1 mb-2">
                  {c.zones.map((z, i) => (
                    <span key={i} className={`text-[8px] font-semibold px-1.5 py-0.5 rounded-full ${z.sev === 'alta' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'}`}>
                      {INS_ZONE_LABEL[z.key]}
                    </span>
                  ))}
                </div>
                <AgentCard agent="PeritoBot · reporte" status={statusStyle[c.status].agent} lines={c.resumen} />
              </div>
            </div>
          </div>
        </div>

        {/* Lista de casos + KPIs */}
        <div className="bg-white/70 rounded-xl border border-slate-200 p-4">
          <p className="text-xs font-semibold text-slate-700 mb-3">Casos en peritaje · clasificados por IA</p>
          <div className="space-y-2">
            {INS_CASES.map((cs, i) => {
              const active = selCase === i
              const dot = cs.status === 'fraude' ? 'bg-red-500' : cs.status === 'revisión' ? 'bg-amber-500' : 'bg-emerald-500'
              return (
                <button
                  key={cs.id}
                  type="button"
                  onClick={() => setSelCase(i)}
                  className={`w-full text-left border rounded-lg px-2.5 py-2 transition-all ${active ? 'border-indigo-300 bg-indigo-50/50 ring-1 ring-indigo-200' : 'border-slate-200 bg-white hover:border-indigo-300 hover:bg-indigo-50/40'}`}
                >
                  <div className="flex items-center justify-between gap-2 mb-0.5">
                    <span className="flex items-center gap-1.5 text-[11px] font-bold text-slate-700">
                      <span className={`w-1.5 h-1.5 rounded-full ${dot}`} /> {cs.id}
                    </span>
                    <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded-full ${statusStyle[cs.status].badge}`}>{cs.status}</span>
                  </div>
                  <p className="text-[10px] text-slate-600 leading-tight">{cs.vehiculo}</p>
                  <p className="text-[10px] text-slate-400 leading-tight">{cs.tipo} · {cs.estimacion}</p>
                </button>
              )
            })}
          </div>
          <KpiRow items={[
            { label: 'Loss ratio', value: '62%', tone: 'warn' },
            { label: 'Liquidación', value: '2.4 d', tone: 'good' },
            { label: 'Automatizado', value: '71%', tone: 'good' },
          ]} />
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────── Legal ─────────────────────────── */

type LegalEstado = 'urgente' | 'pendiente' | 'cerrado'
type LegalCase = {
  id: string; title: string; estado: LegalEstado; date: string
  obs: string[]; status: 'green' | 'amber' | 'red'
  kpis: { label: string; value: string; tone?: 'good' | 'warn' | 'bad' }[]
}
const LEGAL_TYPES: { key: string; label: string; icon: string; count: number }[] = [
  { key: 'civil', label: 'Civil', icon: '⚖️', count: 48 },
  { key: 'familiar', label: 'Familiar', icon: '👪', count: 31 },
  { key: 'penal', label: 'Penal', icon: '🔒', count: 22 },
  { key: 'laboral', label: 'Laboral', icon: '💼', count: 27 },
  { key: 'mercantil', label: 'Mercantil', icon: '📈', count: 19 },
]
const LEGAL_CASES: Record<string, LegalCase[]> = {
  civil: [
    { id: 'C-1042', title: 'Incumplimiento de contrato · Distribuidora Sur', estado: 'urgente', date: 'Audiencia 17 jun', status: 'red',
      obs: ['Audiencia en 4 días · faltan 2 pruebas documentales', 'LexBot generó el escrito de alegatos (borrador)', 'Priorizar: riesgo de preclusión'],
      kpis: [{ label: 'Plazo', value: '4 d', tone: 'bad' }, { label: 'Docs', value: '6/8', tone: 'warn' }, { label: 'Cuantía', value: '$120K' }] },
    { id: 'C-1031', title: 'Reivindicación de inmueble · Familia Ortega', estado: 'pendiente', date: 'Resolución 9 jul', status: 'amber',
      obs: ['Pendiente de resolución del juzgado', 'LexBot vigila el expediente a diario', 'Sin acciones requeridas esta semana'],
      kpis: [{ label: 'Plazo', value: '26 d', tone: 'good' }, { label: 'Docs', value: '8/8', tone: 'good' }, { label: 'Cuantía', value: '$85K' }] },
    { id: 'C-0998', title: 'Cobro de pagaré · Comercial Andina', estado: 'cerrado', date: 'Sentencia 2 jun', status: 'green',
      obs: ['Caso cerrado con sentencia favorable', 'Honorarios facturados y cobrados', 'Archivado por LexBot'],
      kpis: [{ label: 'Resultado', value: 'Favorable', tone: 'good' }, { label: 'Duración', value: '7 m' }, { label: 'Cuantía', value: '$40K' }] },
  ],
  familiar: [
    { id: 'F-0521', title: 'Pensión alimenticia · caso Rivas', estado: 'urgente', date: 'Audiencia 16 jun', status: 'red',
      obs: ['Audiencia en 3 días', 'LexBot detectó actualización de tabla de pensiones', 'Recalcular monto antes de la diligencia'],
      kpis: [{ label: 'Plazo', value: '3 d', tone: 'bad' }, { label: 'Docs', value: '5/5', tone: 'good' }, { label: 'Etapa', value: 'Audiencia' }] },
    { id: 'F-0498', title: 'Régimen de visitas · caso Mora', estado: 'pendiente', date: 'Mediación 28 jun', status: 'amber',
      obs: ['Mediación agendada · propuesta en preparación', 'LexBot redactó el acuerdo tentativo', 'Esperando confirmación del cliente'],
      kpis: [{ label: 'Plazo', value: '15 d', tone: 'good' }, { label: 'Docs', value: '4/6', tone: 'warn' }, { label: 'Etapa', value: 'Mediación' }] },
  ],
  penal: [
    { id: 'P-0233', title: 'Defensa por estafa · cliente Núñez', estado: 'urgente', date: 'Formulación 15 jun', status: 'red',
      obs: ['Formulación de cargos en 2 días', 'LexBot preparó la teoría del caso (borrador)', 'Revisar cadena de custodia de evidencia'],
      kpis: [{ label: 'Plazo', value: '2 d', tone: 'bad' }, { label: 'Docs', value: '9/12', tone: 'warn' }, { label: 'Etapa', value: 'Instrucción' }] },
    { id: 'P-0210', title: 'Querella por injurias · medio digital', estado: 'cerrado', date: 'Acuerdo 30 may', status: 'green',
      obs: ['Resuelto por acuerdo reparatorio', 'LexBot archivó el expediente', 'Sin pendientes'],
      kpis: [{ label: 'Resultado', value: 'Acuerdo', tone: 'good' }, { label: 'Duración', value: '4 m' }, { label: 'Etapa', value: 'Cerrado' }] },
  ],
  laboral: [
    { id: 'L-0712', title: 'Despido injustificado · 5 trabajadores', estado: 'pendiente', date: 'Audiencia 5 jul', status: 'amber',
      obs: ['Demanda colectiva en trámite', 'LexBot consolidó los 5 expedientes', 'Liquidaciones calculadas automáticamente'],
      kpis: [{ label: 'Plazo', value: '22 d', tone: 'good' }, { label: 'Docs', value: '18/20', tone: 'warn' }, { label: 'Cuantía', value: '$64K' }] },
    { id: 'L-0689', title: 'Acoso laboral · caso interno', estado: 'urgente', date: 'Inspección 18 jun', status: 'red',
      obs: ['Inspección del Ministerio en 5 días', 'LexBot detectó documentación faltante', 'Solicitar declaraciones esta semana'],
      kpis: [{ label: 'Plazo', value: '5 d', tone: 'bad' }, { label: 'Docs', value: '3/7', tone: 'bad' }, { label: 'Etapa', value: 'Inspección' }] },
  ],
  mercantil: [
    { id: 'M-0344', title: 'Constitución de sociedad · TechCo', estado: 'pendiente', date: 'Registro 1 jul', status: 'amber',
      obs: ['Estatutos en revisión registral', 'LexBot validó cláusulas contra la ley vigente', 'Sin observaciones de fondo'],
      kpis: [{ label: 'Plazo', value: '18 d', tone: 'good' }, { label: 'Docs', value: '10/10', tone: 'good' }, { label: 'Etapa', value: 'Registro' }] },
    { id: 'M-0321', title: 'Conflicto entre socios · Inversiones LM', estado: 'cerrado', date: 'Arbitraje 24 may', status: 'green',
      obs: ['Resuelto en arbitraje', 'Laudo favorable al cliente', 'Archivado por LexBot'],
      kpis: [{ label: 'Resultado', value: 'Favorable', tone: 'good' }, { label: 'Duración', value: '9 m' }, { label: 'Cuantía', value: '$210K' }] },
  ],
}
const LEGAL_ESTADO_GROUPS: { key: LegalEstado; label: string; badge: string }[] = [
  { key: 'urgente', label: 'Urgentes', badge: 'bg-red-100 text-red-700' },
  { key: 'pendiente', label: 'Pendientes', badge: 'bg-amber-100 text-amber-700' },
  { key: 'cerrado', label: 'Cerrados', badge: 'bg-emerald-100 text-emerald-700' },
]

function LegalViz(_: IndustryVisualizationProps) {
  const [selType, setSelType] = useState('civil')
  const [selCaseId, setSelCaseId] = useState('C-1042')
  const cases = LEGAL_CASES[selType] ?? []
  const sel = cases.find((c) => c.id === selCaseId) ?? cases[0]

  function pickType(key: string) {
    setSelType(key)
    const first = LEGAL_CASES[key]?.[0]
    if (first) setSelCaseId(first.id)
  }

  const steps: Step[] = sel
    ? [
        { icon: '📄', label: 'Ingesta del expediente', detail: `Caso ${sel.id} digitalizado`, state: 'done' },
        { icon: '🔎', label: 'Extracción de datos clave', detail: 'Partes, fechas y plazos', state: 'done' },
        { icon: '⚖️', label: 'Análisis de riesgo y plazos', detail: sel.date, state: 'active' },
        { icon: '📋', label: 'Comparación con jurisprudencia', detail: 'Precedentes relevantes', state: 'pending' },
        { icon: '📝', label: 'Resumen para el abogado', detail: 'Borrador de escrito', state: 'pending' },
      ]
    : []

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
        <Header title="Agenda jurídica inteligente" subtitle="Cartera del bufete por materia · la IA clasifica y vigila plazos · haz clic en un caso" noMargin />
        <SupervisorBadge name="LexBot · Supervisor IA" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Cartera de casos por tipo */}
        <div className="bg-white/70 rounded-xl border border-slate-200 p-4">
          <p className="text-xs font-semibold text-slate-700 mb-2">Casos por materia · gestionados por el bufete</p>
          <div className="flex flex-wrap gap-1.5 mb-3">
            {LEGAL_TYPES.map((t) => {
              const active = selType === t.key
              return (
                <button
                  key={t.key}
                  type="button"
                  onClick={() => pickType(t.key)}
                  className={`flex items-center gap-1.5 rounded-full border px-2.5 py-1 transition-all ${active ? 'border-indigo-400 bg-indigo-50 text-indigo-700' : 'border-slate-200 bg-white text-slate-600 hover:border-indigo-300'}`}
                >
                  <span className="text-[11px]">{t.icon}</span>
                  <span className="text-[10px] font-semibold">{t.label}</span>
                  <span className={`text-[9px] font-bold rounded-full px-1.5 ${active ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-100 text-slate-500'}`}>{t.count}</span>
                </button>
              )
            })}
          </div>
          <div className="rounded-lg border border-slate-200 bg-white shadow-sm p-3 max-h-[320px] overflow-y-auto space-y-3">
            {LEGAL_ESTADO_GROUPS.map((g) => {
              const list = cases.filter((c) => c.estado === g.key)
              if (list.length === 0) return null
              return (
                <div key={g.key}>
                  <p className="flex items-center gap-1.5 mb-1.5">
                    <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded-full ${g.badge}`}>{g.label}</span>
                    <span className="text-[9px] text-slate-400">{list.length}</span>
                  </p>
                  <div className="space-y-1.5">
                    {list.map((c) => {
                      const active = selCaseId === c.id
                      return (
                        <button
                          key={c.id}
                          type="button"
                          onClick={() => setSelCaseId(c.id)}
                          className={`w-full text-left rounded-md px-2.5 py-1.5 transition-all ${active ? 'bg-slate-100 ring-1 ring-slate-300' : 'bg-slate-50/60 hover:bg-slate-100'}`}
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-[11px] font-semibold text-slate-700">{c.id}</span>
                            <span className="text-[9px] text-slate-400 shrink-0">{c.date}</span>
                          </div>
                          <p className="text-[10px] text-slate-500 leading-snug mt-0.5">{c.title}</p>
                        </button>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Observación de LexBot del caso + flujo documental */}
        <div className="bg-white/70 rounded-xl border border-slate-200 p-4">
          {sel && (
            <>
              <p className="text-xs font-semibold text-slate-700 mb-2">LexBot · caso {sel.id}</p>
              <AgentCard agent={`LexBot · ${sel.title}`} status={sel.status} lines={sel.obs} />
              <KpiRow items={sel.kpis} />
              <div className="mt-4">
                <StepFlow title="Revisión documental del caso" steps={steps} />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────── Agroindustria ─────────────────────────── */

// Lotes del campo (grilla 3x2) con rinde y zona de manejo
type AgroStatus = 'alto' | 'medio' | 'bajo'
const AGRO_ZONES: { id: string; rinde: number; status: AgroStatus; rec: string[] }[] = [
  { id: 'L-1', rinde: 12, status: 'alto', rec: ['Rinde 12 ton/ha · sin estrés', 'Mantener dosis · sin acción'] },
  { id: 'L-2', rinde: 9, status: 'medio', rec: ['Rinde 9 ton/ha · leve déficit hídrico', 'Riego dirigido +15% esta semana'] },
  { id: 'L-3', rinde: 6, status: 'bajo', rec: ['Rinde 6 ton/ha · suelo pobre en N', 'Fertilización variable +40 kg N/ha'] },
  { id: 'L-4', rinde: 8, status: 'medio', rec: ['Rinde 8 ton/ha · compactación parcial', 'Descompactar y ajustar densidad'] },
  { id: 'L-5', rinde: 11, status: 'alto', rec: ['Rinde 11 ton/ha · óptimo', 'Solo monitoreo satelital'] },
  { id: 'L-6', rinde: 6, status: 'bajo', rec: ['Rinde 6 ton/ha · borde con sombra', 'Aplicación variable de insumos'] },
]
const AGRO_FILL: Record<AgroStatus, string> = { alto: '#16a34a', medio: '#facc15', bajo: '#f97316' }

// Grupos del hato lechero (establo)
type CowStatus = 'sana' | 'mastitis' | 'seguim'
const AGRO_HERD: { group: string; vacas: number; litros: number; status: CowStatus; lines: string[] }[] = [
  { group: 'Ordeño A', vacas: 160, litros: 26, status: 'sana', lines: ['160 vacas · 26 L/día promedio', 'Dieta y sanidad al día · sin acción'] },
  { group: 'Ordeño B', vacas: 150, litros: 22, status: 'seguim', lines: ['150 vacas · 22 L/día (bajo potencial)', 'Ajuste de dieta +20% concentrado'] },
  { group: 'Enfermería', vacas: 90, litros: 16, status: 'mastitis', lines: ['90 vacas · 15% con mastitis subclínica', 'Protocolo sanitario · recuperar a ~26 L'] },
]
const COW_FILL: Record<CowStatus, string> = { sana: '#16a34a', seguim: '#facc15', mastitis: '#ef4444' }

function AgroViz(_: IndustryVisualizationProps) {
  const [selZone, setSelZone] = useState(2) // L-3 (bajo rinde)
  const [selGroup, setSelGroup] = useState(2) // Enfermería (mastitis)
  const z = AGRO_ZONES[selZone]
  const g = AGRO_HERD[selGroup]
  const zStatus = (s: AgroStatus): 'green' | 'amber' | 'red' => (s === 'alto' ? 'green' : s === 'medio' ? 'amber' : 'red')
  const gStatus = (s: CowStatus): 'green' | 'amber' | 'red' => (s === 'sana' ? 'green' : s === 'seguim' ? 'amber' : 'red')

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
        <Header title="Agricultura de precisión y hato lechero" subtitle="Mapa de lotes por rinde y estado del establo · haz clic para ver la recomendación" noMargin />
        <SupervisorBadge name="AgroBot · Supervisor IA" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Mapa de lotes (cultivos de precisión) */}
        <div className="bg-white/70 rounded-xl border border-slate-200 p-4">
          <p className="text-xs font-semibold text-slate-700 mb-2">Mapa de lotes · rinde y zonas de manejo</p>
          <svg viewBox="0 0 300 200" className="w-full h-auto" style={{ maxHeight: 260 }}>
            {AGRO_ZONES.map((zone, i) => {
              const col = i % 3, row = Math.floor(i / 3)
              const x = 8 + col * 96, y = 8 + row * 94
              const active = selZone === i
              return (
                <g key={zone.id} style={{ cursor: 'pointer' }} onMouseEnter={() => setSelZone(i)} onClick={() => setSelZone(i)}>
                  <rect x={x} y={y} width="92" height="90" rx="4" fill={AGRO_FILL[zone.status]} fillOpacity={active ? 0.85 : 0.6} stroke={active ? '#1e293b' : '#ffffff'} strokeWidth={active ? 2.5 : 1.5} />
                  {/* surcos del cultivo */}
                  {[0, 1, 2, 3].map((s) => (
                    <line key={s} x1={x + 8} y1={y + 18 + s * 16} x2={x + 84} y2={y + 18 + s * 16} stroke="#ffffff" strokeOpacity="0.35" strokeWidth="1.2" />
                  ))}
                  <text x={x + 8} y={y + 16} className="fill-white text-[8px] font-bold">{zone.id}</text>
                  <text x={x + 84} y={y + 84} textAnchor="end" className="fill-white text-[8px] font-semibold">{zone.rinde} t/ha</text>
                  {active && <circle cx={x + 84} cy={y + 10} r="3.5" fill="#fff" />}
                </g>
              )
            })}
          </svg>
          <div className="flex flex-wrap items-center gap-3 mt-2 text-[10px] text-slate-500">
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm" style={{ background: AGRO_FILL.alto }} /> Alto rinde</span>
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm" style={{ background: AGRO_FILL.medio }} /> Medio</span>
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm" style={{ background: AGRO_FILL.bajo }} /> Bajo · acción</span>
          </div>
          <div className="mt-2">
            <AgentCard agent={`RindeBot · ${z.id}`} status={zStatus(z.status)} lines={z.rec} />
          </div>
          <KpiRow items={[
            { label: 'Rinde promedio', value: '8.7 t/ha' },
            { label: 'Déficit hídrico', value: '+4°C', tone: 'warn' },
            { label: 'Ahorro insumos', value: '$90K', tone: 'good' },
          ]} />
        </div>

        {/* Establo (hato lechero) */}
        <div className="bg-white/70 rounded-xl border border-slate-200 p-4">
          <p className="text-xs font-semibold text-slate-700 mb-2">Establo · hato lechero por grupo</p>
          <div className="space-y-2">
            {AGRO_HERD.map((grp, i) => {
              const active = selGroup === i
              return (
                <button
                  key={grp.group}
                  type="button"
                  onClick={() => setSelGroup(i)}
                  className={`w-full text-left border rounded-lg px-2.5 py-2 transition-all ${active ? 'border-indigo-300 bg-indigo-50/50 ring-1 ring-indigo-200' : 'border-slate-200 bg-white hover:border-indigo-300 hover:bg-indigo-50/40'}`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="flex items-center gap-1.5 text-[11px] font-bold text-slate-700">
                      <span className="w-1.5 h-1.5 rounded-full" style={{ background: COW_FILL[grp.status] }} /> {grp.group}
                    </span>
                    <span className="text-[10px] text-slate-500">{grp.vacas} vacas · {grp.litros} L/día</span>
                  </div>
                  {/* muestra del grupo: íconos de vaca por estado */}
                  <div className="flex flex-wrap gap-0.5">
                    {Array.from({ length: 10 }).map((_, k) => {
                      const sick = grp.status === 'mastitis' && k < 2
                      const watch = grp.status === 'seguim' && k < 3
                      const col = sick ? COW_FILL.mastitis : watch ? COW_FILL.seguim : COW_FILL.sana
                      return <span key={k} className="text-[11px] leading-none" style={{ color: col, filter: 'saturate(1.4)' }}>🐄</span>
                    })}
                  </div>
                </button>
              )
            })}
          </div>
          <div className="mt-2">
            <AgentCard agent={`SanidadBot · ${g.group}`} status={gStatus(g.status)} lines={g.lines} />
          </div>
          <KpiRow items={[
            { label: 'Producción', value: '22 L/día', tone: 'warn' },
            { label: 'Mastitis', value: '15%', tone: 'bad' },
            { label: 'Potencial', value: '28 L/día', tone: 'good' },
          ]} />
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────── Telecomunicaciones ─────────────────────────── */

// Celdas/torres de la red de acceso (coordenadas en viewBox 0 0 300 220)
type CellStatus = 'ok' | 'warn' | 'crit'
type CellKpi = { label: string; value: string; tone?: 'good' | 'warn' | 'bad' }
const TELECOM_CELLS: {
  id: string; zona: string; load: number; status: CellStatus; x: number; y: number
  lines: string[]; kpis: CellKpi[]
}[] = [
  {
    id: 'N-01', zona: 'Norte', load: 85, status: 'crit', x: 150, y: 38,
    lines: ['Carga 85% en hora pico · congestión', 'Reasignar portadora y ampliar capacidad · prioridad alta'],
    kpis: [{ label: 'Carga pico', value: '85%', tone: 'bad' }, { label: 'Disponibilidad', value: '99.2%', tone: 'warn' }, { label: 'Reintentos', value: '4.1%', tone: 'bad' }],
  },
  {
    id: 'E-02', zona: 'Este', load: 71, status: 'warn', x: 244, y: 96,
    lines: ['Carga 71% · al límite en hora pico', 'Balancear tráfico con celda vecina N-01'],
    kpis: [{ label: 'Carga pico', value: '71%', tone: 'warn' }, { label: 'Disponibilidad', value: '99.7%', tone: 'good' }, { label: 'Reintentos', value: '1.8%', tone: 'warn' }],
  },
  {
    id: 'S-03', zona: 'Sur', load: 48, status: 'ok', x: 196, y: 178,
    lines: ['Carga 48% · estable con capacidad holgada', 'Sin acción requerida'],
    kpis: [{ label: 'Carga pico', value: '48%', tone: 'good' }, { label: 'Disponibilidad', value: '99.9%', tone: 'good' }, { label: 'Reintentos', value: '0.6%', tone: 'good' }],
  },
  {
    id: 'O-04', zona: 'Oeste', load: 62, status: 'ok', x: 60, y: 150,
    lines: ['Carga 62% · estable', 'Monitoreo continuo · sin riesgo a 30 días'],
    kpis: [{ label: 'Carga pico', value: '62%', tone: 'good' }, { label: 'Disponibilidad', value: '99.8%', tone: 'good' }, { label: 'Reintentos', value: '0.9%', tone: 'good' }],
  },
  {
    id: 'C-05', zona: 'Centro', load: 74, status: 'warn', x: 92, y: 70,
    lines: ['Carga 74% · tendencia creciente', 'Programar upgrade de capacidad en 30 días'],
    kpis: [{ label: 'Carga pico', value: '74%', tone: 'warn' }, { label: 'Disponibilidad', value: '99.6%', tone: 'warn' }, { label: 'Reintentos', value: '2.2%', tone: 'warn' }],
  },
]
const CELL_COLOR: Record<CellStatus, string> = { ok: '#16a34a', warn: '#f59e0b', crit: '#ef4444' }

function TelecomViz(_: IndustryVisualizationProps) {
  const [selCell, setSelCell] = useState(0)                     // celda fijada (clic) → KPIs de la derecha
  const [hovCell, setHovCell] = useState<number | null>(null)   // celda en hover → tarjeta de la izquierda
  const core = { x: 150, y: 110 }
  const cell = TELECOM_CELLS[selCell]
  const hovered = hovCell !== null ? TELECOM_CELLS[hovCell] : null
  const cellStatus = (s: CellStatus): 'green' | 'amber' | 'red' => (s === 'ok' ? 'green' : s === 'warn' ? 'amber' : 'red')

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
        <Header title="Centro de operaciones de red (NOC)" subtitle="Pasa el cursor sobre una celda para ver su agente · haz clic para fijar sus KPIs" noMargin />
        <SupervisorBadge name="RedBot · Supervisor IA" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Topología de red */}
        <div className="lg:col-span-2 bg-white/70 rounded-xl border border-slate-200 p-4">
          <p className="text-xs font-semibold text-slate-700 mb-2">Red de acceso · carga por celda</p>
          <svg viewBox="0 0 300 220" className="w-full h-auto" style={{ maxHeight: 300 }}>
            {/* enlaces core → celdas */}
            {TELECOM_CELLS.map((c, i) => (
              <line key={`l${i}`} x1={core.x} y1={core.y} x2={c.x} y2={c.y} stroke={CELL_COLOR[c.status]} strokeOpacity="0.4" strokeWidth="1.6" strokeDasharray="4 4">
                <animate attributeName="stroke-dashoffset" values="8;0" dur="1.2s" repeatCount="indefinite" begin={`${i * 0.15}s`} />
              </line>
            ))}
            {/* core */}
            <circle cx={core.x} cy={core.y} r="14" fill="#1e293b" />
            <text x={core.x} y={core.y + 3} textAnchor="middle" className="fill-white text-[8px] font-bold">CORE</text>
            {/* celdas */}
            {TELECOM_CELLS.map((c, i) => {
              const active = selCell === i
              const isHov = hovCell === i
              const col = CELL_COLOR[c.status]
              return (
                <g
                  key={c.id}
                  style={{ cursor: 'pointer' }}
                  onMouseEnter={() => setHovCell(i)}
                  onMouseLeave={() => setHovCell(null)}
                  onClick={() => setSelCell(i)}
                >
                  {/* cobertura */}
                  <circle cx={c.x} cy={c.y} r="26" fill={col} fillOpacity={active || isHov ? 0.18 : 0.08} stroke={col} strokeOpacity="0.3" strokeWidth="1">
                    {c.status === 'crit' && <animate attributeName="r" values="24;30;24" dur="1.4s" repeatCount="indefinite" />}
                  </circle>
                  {/* torre */}
                  <circle cx={c.x} cy={c.y} r={active || isHov ? 9 : 7.5} fill={col} stroke="#fff" strokeWidth="1.5" />
                  <text x={c.x} y={c.y + 2.5} textAnchor="middle" className="fill-white text-[7px] font-bold">{c.load}</text>
                  <text x={c.x} y={c.y + 22} textAnchor="middle" className="fill-slate-600 text-[7px] font-semibold">{c.id} · {c.zona}</text>
                  {active && <circle cx={c.x} cy={c.y} r="13" fill="none" stroke="#6366f1" strokeWidth="1.4" strokeDasharray="3 2" />}
                </g>
              )
            })}
          </svg>
          <div className="flex flex-wrap items-center gap-3 mt-1 text-[10px] text-slate-500">
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full" style={{ background: CELL_COLOR.ok }} /> Estable</span>
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full" style={{ background: CELL_COLOR.warn }} /> Al límite</span>
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full" style={{ background: CELL_COLOR.crit }} /> Congestión</span>
          </div>
          {/* Tarjeta hover: aparece al pasar el cursor sobre una celda */}
          <div className="mt-2 min-h-[60px]">
            {hovered ? (
              <AgentCard
                agent={`RedBot · ${hovered.id} (${hovered.zona})`}
                status={cellStatus(hovered.status)}
                lines={hovered.lines}
                className="animate-fade-in"
              />
            ) : (
              <div className="flex items-center gap-2 rounded-lg border border-dashed border-slate-200 px-2.5 py-3 text-[10px] text-slate-400">
                <span>👆</span> Pasa el cursor sobre una celda para ver el análisis de RedBot
              </div>
            )}
          </div>
        </div>

        {/* Clientes y soporte — tarjetas auto-desplegadas + KPIs por celda */}
        <div className="bg-white/70 rounded-xl border border-slate-200 p-4">
          <p className="text-xs font-semibold text-slate-700 mb-1">
            Indicadores · {cell.zona} <span className="text-slate-400">({cell.id})</span>
          </p>
          <KpiRow items={cell.kpis} />
          <p className="text-xs font-semibold text-slate-700 mt-4 mb-2">Clientes y soporte</p>
          <div className="space-y-2">
            <AgentCard agent="ChurnBot" status="red" lines={['Churn 6% concentrado en zona norte', 'Clientes con 2+ tickets y consumo a la baja', 'Retención proactiva antes del 3er ticket']} />
            <AgentCard agent="TicketBot" status="amber" lines={['12K tickets/semana · 55% repetitivos', 'IA conversacional resolvería el 55% sin agente', 'Ahorro estimado: 6.6K gestiones/semana']} />
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────── Construcción ─────────────────────────── */

const CONSTRUCTION_STAGES = ['Cimentación', 'Estructura', 'Instalaciones', 'Acabados', 'Entrega']
type ConStatus = 'obra' | 'atrasado' | 'entregado'
type Project = {
  id: string; name: string; location: string; inversion: string
  estado: ConStatus; avance: number; presupuesto: number; etapaIdx: number
  cuadrillas: { name: string; personas: number; status: 'green' | 'amber' | 'red' }[]
  obs: string[]; status: 'green' | 'amber' | 'red'
  kpis: { label: string; value: string; tone?: 'good' | 'warn' | 'bad' }[]
}
const CONSTRUCTION_PROJECTS: Project[] = [
  {
    id: 'OBR-01', name: 'Torre Norte · 18 pisos', location: 'Zona financiera', inversion: '$12.4M',
    estado: 'atrasado', avance: 45, presupuesto: 62, etapaIdx: 1,
    cuadrillas: [
      { name: 'Estructura (subcontrato)', personas: 42, status: 'red' },
      { name: 'Encofrado', personas: 18, status: 'amber' },
      { name: 'Eléctricos', personas: 12, status: 'green' },
    ],
    obs: ['Presupuesto 62% vs avance físico 45% — sobrecosto proyectado', '3 subcontratistas con retraso · riesgo de overrun', 'Acción correctiva inmediata recomendada'],
    status: 'red',
    kpis: [{ label: 'Presupuesto', value: '62%', tone: 'bad' }, { label: 'Accidentes', value: '3.2', tone: 'warn' }, { label: 'Desperdicio', value: '14%', tone: 'bad' }],
  },
  {
    id: 'OBR-02', name: 'Centro Comercial Sur', location: 'Av. Circunvalación', inversion: '$8.1M',
    estado: 'obra', avance: 70, presupuesto: 68, etapaIdx: 2,
    cuadrillas: [
      { name: 'Instalaciones MEP', personas: 30, status: 'green' },
      { name: 'Albañilería', personas: 24, status: 'green' },
      { name: 'Seguridad', personas: 6, status: 'green' },
    ],
    obs: ['Avance 70% alineado al presupuesto · en plazo', 'Pedidos de materiales planificados por IA', 'Sin riesgos críticos esta semana'],
    status: 'green',
    kpis: [{ label: 'Presupuesto', value: '68%', tone: 'good' }, { label: 'Accidentes', value: '1.1', tone: 'good' }, { label: 'Desperdicio', value: '6%', tone: 'good' }],
  },
  {
    id: 'OBR-03', name: 'Hospital Regional', location: 'Distrito Este', inversion: '$21.0M',
    estado: 'obra', avance: 28, presupuesto: 25, etapaIdx: 0,
    cuadrillas: [
      { name: 'Movimiento de tierras', personas: 36, status: 'green' },
      { name: 'Cimentación', personas: 28, status: 'amber' },
    ],
    obs: ['Etapa de cimentación · 28% de avance', 'Clima retrasó 4 días el vaciado de concreto', 'Replanificar cronograma con holgura'],
    status: 'amber',
    kpis: [{ label: 'Presupuesto', value: '25%', tone: 'good' }, { label: 'Accidentes', value: '0.8', tone: 'good' }, { label: 'Desperdicio', value: '9%', tone: 'warn' }],
  },
  {
    id: 'OBR-04', name: 'Condominio Las Lomas', location: 'Zona residencial', inversion: '$5.6M',
    estado: 'entregado', avance: 100, presupuesto: 97, etapaIdx: 4,
    cuadrillas: [
      { name: 'Acabados', personas: 0, status: 'green' },
    ],
    obs: ['Obra entregada bajo presupuesto (97%)', 'Cero accidentes en los últimos 3 meses', 'Archivado por ObraBot'],
    status: 'green',
    kpis: [{ label: 'Presupuesto', value: '97%', tone: 'good' }, { label: 'Accidentes', value: '0', tone: 'good' }, { label: 'Desperdicio', value: '4%', tone: 'good' }],
  },
]
const CON_BADGE: Record<ConStatus, string> = {
  obra: 'bg-amber-100 text-amber-700', atrasado: 'bg-red-100 text-red-700', entregado: 'bg-emerald-100 text-emerald-700',
}
const CON_LABEL: Record<ConStatus, string> = { obra: 'En obra', atrasado: 'Atrasado', entregado: 'Entregado' }

function ConstructionViz(_: IndustryVisualizationProps) {
  const [sel, setSel] = useState(0) // Torre Norte (atrasado)
  const p = CONSTRUCTION_PROJECTS[sel]
  const steps: Step[] = CONSTRUCTION_STAGES.map((label, i) => ({
    icon: ['🏗️', '🧱', '🔌', '🎨', '🔑'][i],
    label,
    detail: i < p.etapaIdx ? 'Completada' : i === p.etapaIdx ? 'En ejecución' : 'Pendiente',
    state: i < p.etapaIdx ? 'done' : i === p.etapaIdx ? 'active' : 'pending',
  }))
  const totalInv = '$47.1M'

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
        <Header title="Portafolio de obras · project manager IA" subtitle="Proyectos, inversión, etapas y cuadrillas · haz clic en una obra para ver el detalle" noMargin />
        <SupervisorBadge name="ObraBot · Supervisor IA" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Cartera de proyectos */}
        <div className="bg-white/70 rounded-xl border border-slate-200 p-4">
          <KpiRow items={[
            { label: 'Proyectos', value: '4' },
            { label: 'Inversión total', value: totalInv },
            { label: 'En plazo', value: '75%', tone: 'warn' },
          ]} />
          <p className="text-xs font-semibold text-slate-700 mt-3 mb-2">Obras gestionadas</p>
          <div className="space-y-2">
            {CONSTRUCTION_PROJECTS.map((pr, i) => {
              const active = sel === i
              return (
                <button
                  key={pr.id}
                  type="button"
                  onClick={() => setSel(i)}
                  className={`w-full text-left border rounded-lg px-2.5 py-2 transition-all ${active ? 'border-indigo-300 bg-indigo-50/50 ring-1 ring-indigo-200' : 'border-slate-200 bg-white hover:border-indigo-300 hover:bg-indigo-50/40'}`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-[11px] font-bold text-slate-700">{pr.name}</span>
                    <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded-full shrink-0 ${CON_BADGE[pr.estado]}`}>{CON_LABEL[pr.estado]}</span>
                  </div>
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-[10px] text-slate-400">{pr.location} · {pr.inversion}</span>
                    <span className="text-[10px] text-slate-500 font-semibold">{pr.avance}%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-slate-200 overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${pr.avance}%`, background: pr.estado === 'atrasado' ? '#ef4444' : pr.estado === 'entregado' ? '#10b981' : '#6366f1' }} />
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Detalle del proyecto seleccionado */}
        <div className="bg-white/70 rounded-xl border border-slate-200 p-4">
          <div className="flex items-center justify-between gap-2 mb-1">
            <p className="text-xs font-semibold text-slate-700">{p.name}</p>
            <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${CON_BADGE[p.estado]}`}>{CON_LABEL[p.estado]}</span>
          </div>
          <p className="text-[10px] text-slate-400 mb-3">{p.location} · inversión {p.inversion}</p>

          {/* Avance físico vs presupuesto ejecutado */}
          <div className="space-y-2 mb-3">
            {[
              { label: 'Avance físico', val: p.avance, color: '#6366f1' },
              { label: 'Presupuesto ejecutado', val: p.presupuesto, color: p.presupuesto > p.avance + 8 ? '#ef4444' : '#10b981' },
            ].map((bar) => (
              <div key={bar.label}>
                <div className="flex justify-between text-[10px] text-slate-500 mb-0.5">
                  <span>{bar.label}</span><span className="font-semibold">{bar.val}%</span>
                </div>
                <div className="h-2 rounded-full bg-slate-200 overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${bar.val}%`, background: bar.color }} />
                </div>
              </div>
            ))}
            {p.presupuesto > p.avance + 8 && (
              <p className="text-[10px] text-red-600 font-semibold">⚠ Gasto adelantado al avance · riesgo de sobrecosto</p>
            )}
          </div>

          {/* Cuadrillas */}
          <p className="text-[11px] font-semibold text-slate-700 mb-1.5">Cuadrillas · personal contratado</p>
          <div className="space-y-1 mb-3">
            {p.cuadrillas.map((cu, i) => {
              const dot = cu.status === 'red' ? 'bg-red-500' : cu.status === 'amber' ? 'bg-amber-500' : 'bg-emerald-500'
              return (
                <div key={i} className="flex items-center justify-between gap-2 text-[10px]">
                  <span className="flex items-center gap-1.5 text-slate-600"><span className={`w-1.5 h-1.5 rounded-full ${dot}`} /> {cu.name}</span>
                  <span className="text-slate-500 font-semibold">{cu.personas} pers.</span>
                </div>
              )
            })}
          </div>

          <AgentCard agent={`ObraBot · ${p.id}`} status={p.status} lines={p.obs} />
          <KpiRow items={p.kpis} />
          <div className="mt-3">
            <StepFlow title="Etapa del proyecto" steps={steps} />
          </div>
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
