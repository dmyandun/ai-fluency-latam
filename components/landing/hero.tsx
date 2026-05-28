import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b bg-gradient-to-b from-accent/40 to-background">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <Badge variant="secondary" className="mb-4 gap-1">
            <MapPin className="h-3 w-3" />
            Diseñado para Latinoamérica
          </Badge>
          <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-6xl">
            Descubre qué adopción de IA necesita realmente tu organización
          </h1>
          <p className="mt-6 text-balance text-lg text-muted-foreground">
            Un diagnóstico estratégico que traduce tu contexto operativo en una
            recomendación clara: <strong>Automation</strong>,{" "}
            <strong>Agency</strong> o <strong>Augmentation</strong>, con la
            implementación técnica adecuada y un roadmap accionable.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/diagnostico">
                Iniciar diagnóstico gratis
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="#modelos">Conocer los modelos</Link>
            </Button>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            12 preguntas · 5 minutos · sin registro
          </p>
        </div>
      </div>
    </section>
  );
}
