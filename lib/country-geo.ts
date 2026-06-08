// Ciudades principales por país (posición relativa al bbox del contorno:
// fx 0=oeste 1=este, fy 0=norte 1=sur). Aproximadas, fines ilustrativos.
// La primera ciudad de cada lista es el centro de distribución principal.

export interface City {
  name: string
  fx: number
  fy: number
}

export const COUNTRY_CITIES: Record<string, City[]> = {
  AR: [
    { name: 'Buenos Aires', fx: 0.78, fy: 0.32 },
    { name: 'Córdoba', fx: 0.55, fy: 0.28 },
    { name: 'Rosario', fx: 0.68, fy: 0.30 },
    { name: 'Mendoza', fx: 0.28, fy: 0.32 },
    { name: 'Mar del Plata', fx: 0.80, fy: 0.42 },
  ],
  BO: [
    { name: 'La Paz', fx: 0.30, fy: 0.35 },
    { name: 'Santa Cruz', fx: 0.72, fy: 0.50 },
    { name: 'Cochabamba', fx: 0.48, fy: 0.45 },
    { name: 'Sucre', fx: 0.50, fy: 0.55 },
  ],
  BR: [
    { name: 'São Paulo', fx: 0.68, fy: 0.80 },
    { name: 'Río de Janeiro', fx: 0.76, fy: 0.78 },
    { name: 'Brasília', fx: 0.58, fy: 0.62 },
    { name: 'Salvador', fx: 0.82, fy: 0.52 },
    { name: 'Manaus', fx: 0.32, fy: 0.30 },
  ],
  CL: [
    { name: 'Santiago', fx: 0.55, fy: 0.42 },
    { name: 'Valparaíso', fx: 0.48, fy: 0.42 },
    { name: 'Concepción', fx: 0.50, fy: 0.52 },
    { name: 'Antofagasta', fx: 0.55, fy: 0.18 },
  ],
  CO: [
    { name: 'Bogotá', fx: 0.55, fy: 0.55 },
    { name: 'Medellín', fx: 0.40, fy: 0.45 },
    { name: 'Cali', fx: 0.35, fy: 0.65 },
    { name: 'Barranquilla', fx: 0.45, fy: 0.15 },
  ],
  CR: [
    { name: 'San José', fx: 0.55, fy: 0.55 },
    { name: 'Alajuela', fx: 0.48, fy: 0.50 },
    { name: 'Limón', fx: 0.72, fy: 0.50 },
  ],
  CU: [
    { name: 'La Habana', fx: 0.20, fy: 0.30 },
    { name: 'Santiago de Cuba', fx: 0.82, fy: 0.70 },
    { name: 'Camagüey', fx: 0.55, fy: 0.55 },
  ],
  DO: [
    { name: 'Santo Domingo', fx: 0.55, fy: 0.70 },
    { name: 'Santiago', fx: 0.40, fy: 0.40 },
    { name: 'La Romana', fx: 0.70, fy: 0.65 },
  ],
  EC: [
    { name: 'Quito', fx: 0.78, fy: 0.35 },
    { name: 'Guayaquil', fx: 0.70, fy: 0.60 },
    { name: 'Cuenca', fx: 0.75, fy: 0.65 },
  ],
  SV: [
    { name: 'San Salvador', fx: 0.50, fy: 0.45 },
    { name: 'Santa Ana', fx: 0.30, fy: 0.40 },
    { name: 'San Miguel', fx: 0.72, fy: 0.55 },
  ],
  GT: [
    { name: 'Ciudad de Guatemala', fx: 0.45, fy: 0.62 },
    { name: 'Quetzaltenango', fx: 0.28, fy: 0.55 },
    { name: 'Escuintla', fx: 0.42, fy: 0.70 },
  ],
  HN: [
    { name: 'Tegucigalpa', fx: 0.48, fy: 0.62 },
    { name: 'San Pedro Sula', fx: 0.35, fy: 0.38 },
    { name: 'La Ceiba', fx: 0.50, fy: 0.30 },
  ],
  MX: [
    { name: 'Ciudad de México', fx: 0.62, fy: 0.66 },
    { name: 'Guadalajara', fx: 0.46, fy: 0.60 },
    { name: 'Monterrey', fx: 0.56, fy: 0.40 },
    { name: 'Tijuana', fx: 0.04, fy: 0.14 },
    { name: 'Cancún', fx: 0.92, fy: 0.55 },
  ],
  NI: [
    { name: 'Managua', fx: 0.42, fy: 0.62 },
    { name: 'León', fx: 0.38, fy: 0.55 },
    { name: 'Matagalpa', fx: 0.52, fy: 0.50 },
  ],
  PA: [
    { name: 'Ciudad de Panamá', fx: 0.60, fy: 0.55 },
    { name: 'Colón', fx: 0.55, fy: 0.45 },
    { name: 'David', fx: 0.25, fy: 0.55 },
  ],
  PY: [
    { name: 'Asunción', fx: 0.40, fy: 0.62 },
    { name: 'Ciudad del Este', fx: 0.72, fy: 0.60 },
    { name: 'Encarnación', fx: 0.60, fy: 0.78 },
  ],
  PE: [
    { name: 'Lima', fx: 0.40, fy: 0.55 },
    { name: 'Arequipa', fx: 0.55, fy: 0.78 },
    { name: 'Trujillo', fx: 0.32, fy: 0.38 },
    { name: 'Cusco', fx: 0.60, fy: 0.65 },
  ],
  PR: [
    { name: 'San Juan', fx: 0.62, fy: 0.30 },
    { name: 'Ponce', fx: 0.45, fy: 0.70 },
    { name: 'Mayagüez', fx: 0.15, fy: 0.55 },
  ],
  UY: [
    { name: 'Montevideo', fx: 0.62, fy: 0.82 },
    { name: 'Salto', fx: 0.30, fy: 0.20 },
    { name: 'Paysandú', fx: 0.28, fy: 0.40 },
  ],
  VE: [
    { name: 'Caracas', fx: 0.50, fy: 0.18 },
    { name: 'Maracaibo', fx: 0.22, fy: 0.18 },
    { name: 'Valencia', fx: 0.44, fy: 0.22 },
    { name: 'Barquisimeto', fx: 0.38, fy: 0.28 },
  ],
}

const FALLBACK_CITIES: City[] = [
  { name: 'Centro', fx: 0.50, fy: 0.45 },
  { name: 'Norte', fx: 0.50, fy: 0.18 },
  { name: 'Sur', fx: 0.50, fy: 0.78 },
  { name: 'Este', fx: 0.78, fy: 0.50 },
  { name: 'Oeste', fx: 0.22, fy: 0.50 },
]

export function getCities(code?: string): City[] {
  if (!code) return FALLBACK_CITIES
  return COUNTRY_CITIES[code.toUpperCase()] ?? FALLBACK_CITIES
}
