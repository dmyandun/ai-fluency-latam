'use client'

import { LATAM_COUNTRIES } from '@/lib/countries'

interface CountrySelectorProps {
  value: string
  onChange: (country: string) => void
}

export default function CountrySelector({ value, onChange }: CountrySelectorProps) {
  return (
    <div className="w-full">
      <label
        htmlFor="country-select"
        className="block text-sm font-medium text-gray-300 mb-2"
      >
        Selecciona tu país
      </label>
      <select
        id="country-select"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-gray-800 border border-gray-700 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all appearance-none cursor-pointer"
      >
        <option value="" disabled>
          — Elige un país —
        </option>
        {LATAM_COUNTRIES.map((country) => (
          <option key={country.code} value={country.code}>
            {country.name}
          </option>
        ))}
      </select>
    </div>
  )
}
