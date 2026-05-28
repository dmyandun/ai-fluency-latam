"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Map, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RecommendationCards } from "@/components/results/recommendation-cards";
import { ScoreBreakdown } from "@/components/results/score-breakdown";
import { PilotCard } from "@/components/results/pilot-card";
import { loadResult } from "@/lib/storage";
import { buildExplanation, buildPilotProject } from "@/lib/recommendations";
import { getCountry } from "@/lib/countries";
import { getIndustry } from "@/lib/industries";
import type { DiagnosticResult } from "@/types/assessment";

export function ResultsView() {
  const [result, setResult] = useState<DiagnosticResult | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setResult(loadResult());
    setLoaded(true);
  }, []);

  if (!loaded) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center text-muted-foreground">
        Cargando resultados…
      </div>
    );
  }

  if (!result) {
    return (
      <div className="mx-auto max-w-xl px-4 py-20 text-center">
        <h1 className="text-2xl font-semibold">Aún no hay resultados</h1>
        <p className="mt-2 text-muted-foreground">
          Completa el diagnóstico para ver tu recomendación personalizada.
        </p>
        <Button asChild className="mt-6">
          <Link href="/diagnostico">
            Iniciar diagnóstico
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    );
  }

  const { scoring, input } = result;
  const country = getCountry(input.countryId);
  const industry = getIndustry(input.industryId);
  const pilot = buildPilotProject(
    input.countryId,
    input.industryId,
    scoring.primaryModel,
  );

  return (
    <div className="mx-auto max-w-4xl space-y-8 px-4 py-10">
      <header className="space-y-2">
        <div className="flex flex-wrap gap-2">
          {country && (
            <Badge variant="outline">
              {country.flag} {country.name}
            </Badge>
          )}
          {industry && <Badge variant="outline">{industry.name}</Badge>}
        </div>
        <h1 className="text-3xl font-bold tracking-tight">
          Tu diagnóstico de adopción de IA
        </h1>
      </header>

      <RecommendationCards
        model={scoring.primaryModel}
        implementation={scoring.primaryImplementation}
      />

      <Card>
        <CardHeader>
          <CardTitle>Explicación del resultado</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">{buildExplanation(scoring)}</p>
        </CardContent>
      </Card>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold tracking-tight">
          Desglose de puntajes
        </h2>
        <ScoreBreakdown scoring={scoring} />
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold tracking-tight">
          Primer proyecto piloto
        </h2>
        <PilotCard title={pilot.title} description={pilot.description} />
      </section>

      <Card className="bg-primary text-primary-foreground">
        <CardContent className="flex flex-col items-start gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold">
              Construye tu roadmap de adopción
            </h2>
            <p className="mt-1 text-sm text-primary-foreground/80">
              Generamos un plan inicial por etapas que puedes editar y priorizar.
            </p>
          </div>
          <Button asChild variant="secondary" className="shrink-0">
            <Link href="/roadmap">
              <Map className="h-4 w-4" />
              Ver roadmap
            </Link>
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="flex flex-col items-start gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold">
              ¿Quieres acompañamiento experto?
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Agenda una consultoría para llevar este diagnóstico a producción.
            </p>
          </div>
          <Button asChild variant="outline" className="shrink-0">
            <a href="mailto:contacto@aifluencylatam.com?subject=Consultor%C3%ADa%20AI%20Fluency%20LATAM">
              <MessageSquare className="h-4 w-4" />
              Contactar
            </a>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
