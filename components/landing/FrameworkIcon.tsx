import type { FrameworkIconName } from '@/lib/framework-matrix'

/**
 * Iconos del explorador del marco. Son trazos monocromos que heredan
 * `currentColor`, para que el mismo icono funcione sobre el panel oscuro del
 * flujograma y sobre el panel claro de la explicación. Los emoji de colores
 * que había antes competían con los acentos del degradado.
 */
const PATHS: Record<FrameworkIconName, React.ReactNode> = {
  // Ciclo: el proceso corre solo. Dos arcos sobre r=7 con su punta de flecha
  automation: (
    <>
      <path d="M5.4 9.6A7 7 0 0118.6 9.6" />
      <path d="M15.4 8.9l3.2.7.7-3.2" />
      <path d="M18.6 14.4a7 7 0 01-13.2 0" />
      <path d="M8.6 15.1l-3.2-.7-.7 3.2" />
    </>
  ),
  // Agente: un nodo que se ramifica y actúa sobre dos sistemas
  agency: (
    <>
      <circle cx="12" cy="5" r="2" />
      <circle cx="6" cy="18" r="2" />
      <circle cx="18" cy="18" r="2" />
      <path d="M11 6.8L7 16.2M13 6.8l4 9.4" />
    </>
  ),
  // Destello: el criterio humano potenciado
  augmentation: (
    <>
      <path d="M10.5 4l1.7 4.8L17 10.5l-4.8 1.7L10.5 17l-1.7-4.8L4 10.5l4.8-1.7z" />
      <path d="M18 14.5l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8z" />
    </>
  ),
  // Candado: el dato no sale de casa
  localGenAI: (
    <>
      <rect x="5" y="10.5" width="14" height="9.5" rx="2" />
      <path d="M8.5 10.5V7.5a3.5 3.5 0 017 0v3" />
    </>
  ),
  // Rayo: capacidad inmediata, sin infraestructura propia
  apiGenAI: <path d="M13 3L6 13.5h5L11 21l7-10.5h-5z" />,
  // Barras ascendentes: predicción sobre datos estructurados
  traditionalML: (
    <>
      <path d="M4.5 19h15" />
      <path d="M6.5 19v-5.5M12 19v-10M17.5 19v-13.5" />
    </>
  ),
}

interface FrameworkIconProps {
  name: FrameworkIconName
  className?: string
}

export default function FrameworkIcon({ name, className = 'w-5 h-5' }: FrameworkIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {PATHS[name]}
    </svg>
  )
}
