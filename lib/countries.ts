import type { Country } from '@/types/assessment'

export const LATAM_COUNTRIES: Country[] = [
  { code: 'AR', name: 'Argentina' },
  { code: 'BO', name: 'Bolivia' },
  { code: 'BR', name: 'Brasil' },
  { code: 'CL', name: 'Chile' },
  { code: 'CO', name: 'Colombia' },
  { code: 'CR', name: 'Costa Rica' },
  { code: 'CU', name: 'Cuba' },
  { code: 'DO', name: 'República Dominicana' },
  { code: 'EC', name: 'Ecuador' },
  { code: 'SV', name: 'El Salvador' },
  { code: 'GT', name: 'Guatemala' },
  { code: 'HN', name: 'Honduras' },
  { code: 'MX', name: 'México' },
  { code: 'NI', name: 'Nicaragua' },
  { code: 'PA', name: 'Panamá' },
  { code: 'PY', name: 'Paraguay' },
  { code: 'PE', name: 'Perú' },
  { code: 'PR', name: 'Puerto Rico' },
  { code: 'UY', name: 'Uruguay' },
  { code: 'VE', name: 'Venezuela' },
]

/**
 * Los casos de las simulaciones aplican a toda la región, así que el diagnóstico
 * ya no pregunta el país. El campo se conserva en AssessmentResult con este
 * valor para no invalidar los resultados guardados antes en el navegador.
 */
export const DEFAULT_REGION = 'LATAM'
export const DEFAULT_REGION_NAME = 'Latinoamérica'

/** Nombre legible de un país guardado, o de la región cuando no hay país. */
export function resolveLocationName(code: string): string {
  if (!code || code === DEFAULT_REGION) return DEFAULT_REGION_NAME
  return LATAM_COUNTRIES.find((c) => c.code === code)?.name ?? code
}
