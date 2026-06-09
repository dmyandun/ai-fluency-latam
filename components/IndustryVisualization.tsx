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

// Posiciones distribuidas de las bodegas dentro del país (centro + 4 alrededor)
const NODE_POS = [
  { fx: 0.50, fy: 0.48 }, // hub central
  { fx: 0.34, fy: 0.26 }, // noroeste
  { fx: 0.66, fy: 0.28 }, // noreste
  { fx: 0.32, fy: 0.70 }, // suroeste
  { fx: 0.68, fy: 0.70 }, // sureste
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

  const pad = bbox ? Math.max(bbox.w, bbox.h) * 0.08 : 0
  const vb = bbox ? `${bbox.x - pad} ${bbox.y - pad} ${bbox.w + pad * 2} ${bbox.h + pad * 2}` : '0 0 1010 666'
  const span = bbox ? Math.max(bbox.w, bbox.h) : 200
  const vbW = bbox ? bbox.w + pad * 2 : 1010
  const vbH = bbox ? bbox.h + pad * 2 : 666
  const vbX = bbox ? bbox.x - pad : 0
  const vbY = bbox ? bbox.y - pad : 0

  const pts = bbox ? NODE_POS.map((c) => ({ x: bbox.x + c.fx * bbox.w, y: bbox.y + c.fy * bbox.h })) : []
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
        <Header title={`Red de distribución — ${countryName(country)}`} subtitle="Pasa el cursor para ver el agente IA · haz clic en una bodega para ver su picking" noMargin />
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
                  {(i === 0 || hover === i || selected === i) && <circle cx={p.x} cy={p.y} r={span * 0.028} className={`${colorText} ${hover === i ? 'opacity-30' : 'opacity-20'}`} fill="currentColor" />}
                  {selected === i && <circle cx={p.x} cy={p.y} r={span * 0.024} fill="none" stroke="currentColor" strokeWidth={span * 0.005} className={colorText} />}
                  <circle cx={p.x} cy={p.y} r={i === 0 ? span * 0.017 : span * 0.012} fill="currentColor" className={colorText}>
                    {i === 0 && <animate attributeName="r" values={`${span * 0.017};${span * 0.023};${span * 0.017}`} dur="1.8s" repeatCount="indefinite" />}
                  </circle>
                  {/* área de hover ampliada */}
                  <circle cx={p.x} cy={p.y} r={span * 0.045} fill="transparent" />
                </g>
              ))}
            </svg>

            {/* Tarjeta del agente IA — solo la del nodo con hover */}
            {ready && hover !== null && nodePx[hover] && (() => {
              const p = nodePx[hover]
              const below = p.y < (layout!.contH * 0.42) // si está arriba, mostrar la tarjeta debajo
              return (
                <div
                  className="absolute pointer-events-none z-10"
                  style={{ left: p.x, top: p.y, transform: below ? 'translate(-50%, 14px)' : 'translate(-50%, calc(-100% - 10px))' }}
                >
                  <div className="bg-white/90 backdrop-blur-sm border border-slate-200 rounded-lg px-2.5 py-1.5 shadow-md text-center whitespace-nowrap">
                    <div className="flex items-center gap-1 justify-center">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      <span className="text-[11px] font-bold text-slate-700">🤖 {LOGI_AGENTS[hover % LOGI_AGENTS.length]}</span>
                    </div>
                    <div className="text-[10px] text-slate-500 leading-tight">Bodega {hover + 1}</div>
                    <div className="text-[10px] font-semibold text-emerald-600 leading-tight">{LOGI_KPIS[hover % LOGI_KPIS.length]}</div>
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
  const categories = ['Abrigos', 'Calzado', 'Accesorios', 'Deportiva']
  const weeks = ['S1', 'S2', 'S3', 'S4', 'S5', 'S6']
  const data = [
    [4, 4, 3, 2, 1, 1],
    [2, 3, 3, 4, 4, 3],
    [1, 2, 2, 3, 4, 4],
    [3, 3, 4, 4, 3, 2],
  ]
  const shade = ['bg-slate-100', 'bg-amber-100', 'bg-amber-300', 'bg-amber-500', 'bg-amber-600']
  // Planograma: niveles de stock por producto en la estantería
  const shelf = [
    { sku: 'Abrigo XL', stock: 82 }, { sku: 'Bota cuero', stock: 22 }, { sku: 'Bufanda', stock: 64 },
    { sku: 'Gorro', stock: 12 }, { sku: 'Guante', stock: 70 }, { sku: 'Media térm.', stock: 40 },
  ]

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
        <Header title="Demanda y reposición inteligente" subtitle="Pronóstico de demanda y alertas de reposición por producto" noMargin />
        <SupervisorBadge name="ShelfBot · Supervisor IA" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Heatmap de demanda */}
        <div className="bg-white/70 rounded-xl border border-slate-200 p-4 overflow-x-auto">
          <p className="text-xs font-semibold text-slate-700 mb-3">Mapa de calor de demanda</p>
          <div className="inline-block min-w-full">
            <div className="flex gap-1 mb-1 pl-16">
              {weeks.map((w) => <span key={w} className="w-9 text-center text-[10px] text-slate-400">{w}</span>)}
            </div>
            {categories.map((cat, r) => (
              <div key={cat} className="flex items-center gap-1 mb-1">
                <span className="w-16 text-[10px] text-slate-600 text-right pr-2">{cat}</span>
                {data[r].map((v, c) => (
                  <span key={c} className={`w-9 h-7 rounded ${shade[v]} flex items-center justify-center text-[9px] font-semibold ${v >= 3 ? 'text-white' : 'text-slate-500'}`}>
                    {v >= 4 ? '●' : ''}
                  </span>
                ))}
              </div>
            ))}
            <div className="flex items-center gap-2 mt-3 pl-16">
              <span className="text-[10px] text-slate-400">Baja</span>
              {shade.map((s, i) => <span key={i} className={`w-5 h-3 rounded-sm ${s}`} />)}
              <span className="text-[10px] text-slate-400">Alta</span>
            </div>
          </div>
        </div>

        {/* Planograma con niveles de stock y alertas */}
        <div className="bg-white/70 rounded-xl border border-slate-200 p-4">
          <p className="text-xs font-semibold text-slate-700 mb-3">Planograma · nivel de stock</p>
          <div className="grid grid-cols-3 gap-2">
            {shelf.map((s) => {
              const low = s.stock < 25
              const color = s.stock < 25 ? 'bg-red-500' : s.stock < 55 ? 'bg-amber-400' : 'bg-emerald-500'
              return (
                <div key={s.sku} className="border border-slate-200 rounded-lg p-2">
                  <p className="text-[10px] font-medium text-slate-600 truncate mb-1">{s.sku}</p>
                  <div className="h-14 bg-slate-100 rounded relative overflow-hidden flex items-end">
                    <div className={`w-full ${color} transition-all`} style={{ height: `${s.stock}%` }} />
                    {low && <span className="absolute inset-0 flex items-center justify-center text-[8px] font-bold text-red-600 animate-pulse">REPONER</span>}
                  </div>
                  <p className="text-[9px] text-slate-400 text-center mt-1">{s.stock}%</p>
                </div>
              )
            })}
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
      <div className="bg-white/70 rounded-xl border border-slate-200 p-4">
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
    </div>
  )
}

/* ─────────────────────────── Manufactura ─────────────────────────── */

function ManufacturingViz(_: IndustryVisualizationProps) {
  // Estaciones de la línea: estado activa / cuello de botella / parada
  const stations = [
    { label: 'Corte', occ: 88, state: 'ok' as const },
    { label: 'Soldadura', occ: 96, state: 'bottleneck' as const },
    { label: 'Ensamble', occ: 72, state: 'ok' as const },
    { label: 'Pintura', occ: 0, state: 'down' as const },
    { label: 'Empaque', occ: 64, state: 'ok' as const },
  ]
  const stColor = { ok: '#10b981', bottleneck: '#f59e0b', down: '#ef4444' }
  const stLabel = { ok: 'Activa', bottleneck: 'Cuello de botella', down: 'Parada' }
  const beltY = 70, x0 = 18, gap = 58
  const oee = 71
  const oeeR = 54, oeeCx = 70, oeeCy = 70

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
        <Header title="Línea de producción y OEE" subtitle="Ocupación de estaciones y eficiencia general supervisadas por IA" noMargin />
        <SupervisorBadge name="LineBot · Supervisor IA" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Línea de producción animada */}
        <div className="lg:col-span-2 bg-white/70 rounded-xl border border-slate-200 p-4">
          <p className="text-xs font-semibold text-slate-700 mb-3">Línea de ensamblaje · ocupación por estación</p>
          <svg viewBox="0 0 310 130" className="w-full h-auto">
            {/* cinta transportadora */}
            <line x1={x0} y1={beltY} x2={x0 + gap * (stations.length - 1) + 28} y2={beltY} stroke="#cbd5e1" strokeWidth="6" strokeLinecap="round" strokeDasharray="6 5">
              <animate attributeName="stroke-dashoffset" values="11;0" dur="0.7s" repeatCount="indefinite" />
            </line>
            {/* producto avanzando */}
            <circle r="4" fill="#4f46e5">
              <animateMotion dur="5s" repeatCount="indefinite" path={`M${x0} ${beltY} L${x0 + gap * (stations.length - 1) + 28} ${beltY}`} />
            </circle>
            {/* estaciones */}
            {stations.map((s, i) => {
              const x = x0 + i * gap
              return (
                <g key={i}>
                  <rect x={x} y={beltY - 30} width="28" height="22" rx="3" fill="white" stroke={stColor[s.state]} strokeWidth="2">
                    {s.state === 'down' && <animate attributeName="opacity" values="1;0.5;1" dur="1s" repeatCount="indefinite" />}
                  </rect>
                  {/* relleno de ocupación */}
                  <rect x={x} y={beltY - 30 + 22 - (22 * s.occ / 100)} width="28" height={22 * s.occ / 100} rx="0" fill={stColor[s.state]} opacity="0.35" />
                  <circle cx={x + 14} cy={beltY} r="3.5" fill={stColor[s.state]} />
                  <text x={x + 14} y={beltY - 34} textAnchor="middle" className="fill-slate-600 text-[7px] font-semibold">{s.label}</text>
                  <text x={x + 14} y={beltY + 16} textAnchor="middle" className="fill-slate-400 text-[7px]">{s.state === 'down' ? '—' : `${s.occ}%`}</text>
                </g>
              )
            })}
          </svg>
          <div className="flex flex-wrap items-center gap-3 mt-1 text-[10px] text-slate-500">
            {(['ok', 'bottleneck', 'down'] as const).map((k) => (
              <span key={k} className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: stColor[k] }} /> {stLabel[k]}</span>
            ))}
          </div>
        </div>

        {/* Medidor OEE */}
        <div className="bg-white/70 rounded-xl border border-slate-200 p-4 flex flex-col items-center">
          <p className="text-xs font-semibold text-slate-700 mb-1 self-start">OEE global</p>
          <svg viewBox="0 0 140 88" className="w-full max-w-[180px]">
            <path d={`M16 ${oeeCy} A${oeeR} ${oeeR} 0 0 1 124 ${oeeCy}`} fill="none" stroke="#e2e8f0" strokeWidth="12" strokeLinecap="round" />
            <path d={`M16 ${oeeCy} A${oeeR} ${oeeR} 0 0 1 124 ${oeeCy}`} fill="none" stroke="url(#oeeG)" strokeWidth="12" strokeLinecap="round"
              strokeDasharray={`${(oee / 100) * 170} 400`} />
            <defs>
              <linearGradient id="oeeG" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#ef4444" /><stop offset="50%" stopColor="#f59e0b" /><stop offset="100%" stopColor="#10b981" />
              </linearGradient>
            </defs>
            <text x={oeeCx} y={oeeCy - 4} textAnchor="middle" className="fill-slate-800 text-[18px] font-bold">{oee}%</text>
            <text x={oeeCx} y={oeeCy + 10} textAnchor="middle" className="fill-slate-400 text-[8px]">objetivo 85%</text>
          </svg>
          <div className="w-full mt-2 space-y-1.5">
            {[{ l: 'Disponibilidad', v: 82 }, { l: 'Rendimiento', v: 88 }, { l: 'Calidad', v: 98 }].map((d) => (
              <div key={d.l}>
                <div className="flex justify-between text-[10px] text-slate-500"><span>{d.l}</span><span className="font-semibold tabular-nums">{d.v}%</span></div>
                <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden"><div className="h-full bg-blue-500 rounded-full" style={{ width: `${d.v}%` }} /></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────── Banca ─────────────────────────── */

function BankingViz(_: IndustryVisualizationProps) {
  const score = 68
  const r = 70, cx = 90, cy = 90
  const rad = (deg: number) => (deg - 180) * (Math.PI / 180)
  const angle = (score / 100) * 180
  const needleX = cx + r * 0.8 * Math.cos(rad(angle))
  const needleY = cy + r * 0.8 * Math.sin(rad(angle))

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
        <Header title="Motor de scoring y decisión de crédito" subtitle="Evaluación de riesgo y recorrido de la decisión en vivo" noMargin />
        <SupervisorBadge name="CreditBot · Supervisor IA" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Gauge de score */}
        <div className="bg-white/70 rounded-xl border border-slate-200 p-4 flex flex-col items-center justify-center">
          <p className="text-xs font-semibold text-slate-700 mb-1 self-start">Score de riesgo</p>
          <svg viewBox="0 0 180 110" className="w-full max-w-[220px]">
            <path d={`M20 90 A${r} ${r} 0 0 1 160 90`} fill="none" stroke="#e2e8f0" strokeWidth="14" strokeLinecap="round" />
            <path d={`M20 90 A${r} ${r} 0 0 1 160 90`} fill="none" stroke="url(#g)" strokeWidth="14" strokeLinecap="round"
              strokeDasharray={`${(score / 100) * 220} 400`} />
            <defs>
              <linearGradient id="g" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#10b981" /><stop offset="60%" stopColor="#f59e0b" /><stop offset="100%" stopColor="#ef4444" />
              </linearGradient>
            </defs>
            <line x1={cx} y1={cy} x2={needleX} y2={needleY} stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx={cx} cy={cy} r="4" fill="#334155" />
            <text x={cx} y={cy + 18} textAnchor="middle" className="fill-slate-800 text-[16px] font-bold">{score}</text>
          </svg>
          <p className="text-xs font-semibold text-amber-600">Riesgo moderado</p>
        </div>

        {/* Flujo de decisión en vivo */}
        <div className="bg-white/70 rounded-xl border border-slate-200 p-4">
          <p className="text-xs font-semibold text-slate-700 mb-3">Flujo de decisión</p>
          <div className="space-y-0">
            {steps.map((s, i) => (
              <div key={i} className="flex gap-2.5">
                {/* columna del timeline */}
                <div className="flex flex-col items-center">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] shrink-0 ${
                    s.state === 'done' ? 'bg-emerald-100' : 'bg-amber-100'
                  }`}>
                    {s.state === 'done' ? <span className="text-emerald-600 font-bold">✓</span> : <span className="relative flex h-2.5 w-2.5"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" /><span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500" /></span>}
                  </div>
                  {i < steps.length - 1 && <div className="w-0.5 flex-1 bg-slate-200 my-0.5" style={{ minHeight: 14 }} />}
                </div>
                {/* contenido */}
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
