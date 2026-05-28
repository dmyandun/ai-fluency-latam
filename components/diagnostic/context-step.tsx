"use client";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { COUNTRIES } from "@/lib/countries";
import { INDUSTRIES } from "@/lib/industries";

interface ContextStepProps {
  countryId: string;
  industryId: string;
  onCountryChange: (value: string) => void;
  onIndustryChange: (value: string) => void;
}

export function ContextStep({
  countryId,
  industryId,
  onCountryChange,
  onIndustryChange,
}: ContextStepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">
          Contexto de tu organización
        </h2>
        <p className="mt-1 text-muted-foreground">
          Usamos tu país e industria para personalizar la recomendación y el
          proyecto piloto.
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="country">País</Label>
        <Select value={countryId} onValueChange={onCountryChange}>
          <SelectTrigger id="country">
            <SelectValue placeholder="Selecciona tu país" />
          </SelectTrigger>
          <SelectContent>
            {COUNTRIES.map((country) => (
              <SelectItem key={country.id} value={country.id}>
                {country.flag} {country.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="industry">Industria</Label>
        <Select value={industryId} onValueChange={onIndustryChange}>
          <SelectTrigger id="industry">
            <SelectValue placeholder="Selecciona tu industria" />
          </SelectTrigger>
          <SelectContent>
            {INDUSTRIES.map((industry) => (
              <SelectItem key={industry.id} value={industry.id}>
                {industry.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
