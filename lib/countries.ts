export interface Country {
  id: string;
  name: string;
  /** Emoji flag used in selectors. */
  flag: string;
}

/** Latin American markets supported by the diagnostic. */
export const COUNTRIES: Country[] = [
  { id: "ar", name: "Argentina", flag: "🇦🇷" },
  { id: "bo", name: "Bolivia", flag: "🇧🇴" },
  { id: "br", name: "Brasil", flag: "🇧🇷" },
  { id: "cl", name: "Chile", flag: "🇨🇱" },
  { id: "co", name: "Colombia", flag: "🇨🇴" },
  { id: "cr", name: "Costa Rica", flag: "🇨🇷" },
  { id: "ec", name: "Ecuador", flag: "🇪🇨" },
  { id: "sv", name: "El Salvador", flag: "🇸🇻" },
  { id: "gt", name: "Guatemala", flag: "🇬🇹" },
  { id: "hn", name: "Honduras", flag: "🇭🇳" },
  { id: "mx", name: "México", flag: "🇲🇽" },
  { id: "ni", name: "Nicaragua", flag: "🇳🇮" },
  { id: "pa", name: "Panamá", flag: "🇵🇦" },
  { id: "py", name: "Paraguay", flag: "🇵🇾" },
  { id: "pe", name: "Perú", flag: "🇵🇪" },
  { id: "do", name: "República Dominicana", flag: "🇩🇴" },
  { id: "uy", name: "Uruguay", flag: "🇺🇾" },
  { id: "ve", name: "Venezuela", flag: "🇻🇪" },
];

export function getCountry(id: string): Country | undefined {
  return COUNTRIES.find((c) => c.id === id);
}
