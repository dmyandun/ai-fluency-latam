import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CtaSection() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20">
      <div className="rounded-2xl bg-primary px-8 py-14 text-center text-primary-foreground">
        <h2 className="text-balance text-3xl font-bold tracking-tight">
          Da el primer paso hacia una adopción de IA con propósito
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-balance text-primary-foreground/80">
          En 5 minutos obtienes una recomendación estratégica y un roadmap
          editable, pensados para tu país e industria en Latinoamérica.
        </p>
        <Button
          asChild
          size="lg"
          variant="secondary"
          className="mt-8"
        >
          <Link href="/diagnostico">
            Comenzar diagnóstico
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </section>
  );
}
