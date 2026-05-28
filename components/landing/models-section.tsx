import { Bot, Cog, Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";
import { MODEL_INFO } from "@/lib/recommendations";

const ICONS = {
  automation: Cog,
  agency: Bot,
  augmentation: Lightbulb,
} as const;

const ACCENTS = {
  automation: "text-automation",
  agency: "text-agency",
  augmentation: "text-augmentation",
} as const;

export function ModelsSection() {
  const models = ["automation", "agency", "augmentation"] as const;
  return (
    <section id="modelos" className="border-y bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight">
            Tres modelos de interacción con IA
          </h2>
          <p className="mt-4 text-muted-foreground">
            Cada organización necesita un balance distinto. El diagnóstico
            identifica cuál domina tu contexto actual.
          </p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {models.map((id) => {
            const info = MODEL_INFO[id];
            const Icon = ICONS[id];
            return (
              <div
                key={id}
                className="flex flex-col rounded-xl border bg-card p-6 shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <Icon className={cn("h-6 w-6", ACCENTS[id])} />
                  <h3 className="text-xl font-semibold">{info.name}</h3>
                </div>
                <p className={cn("mt-1 text-sm font-medium", ACCENTS[id])}>
                  {info.tagline}
                </p>
                <p className="mt-3 text-sm text-muted-foreground">
                  {info.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
