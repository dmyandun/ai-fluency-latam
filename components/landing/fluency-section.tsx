import { Compass, Layers, Target } from "lucide-react";

const PILLARS = [
  {
    icon: Compass,
    title: "Entender",
    text: "Saber qué puede y qué no puede hacer la IA hoy, y dónde genera valor real en tu industria.",
  },
  {
    icon: Layers,
    title: "Elegir",
    text: "Seleccionar el modelo de interacción y la implementación técnica correcta para cada caso de uso.",
  },
  {
    icon: Target,
    title: "Adoptar",
    text: "Llevar la IA a producción con un roadmap medible, gobernanza y resultados de negocio claros.",
  },
];

export function FluencySection() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight">
          ¿Qué es AI Fluency?
        </h2>
        <p className="mt-4 text-muted-foreground">
          AI Fluency es la capacidad de una organización para entender, elegir y
          adoptar inteligencia artificial de forma efectiva y responsable. No se
          trata de usar IA por moda, sino de aplicarla donde realmente mueve el
          negocio.
        </p>
      </div>
      <div className="mt-12 grid gap-6 sm:grid-cols-3">
        {PILLARS.map((pillar) => (
          <div
            key={pillar.title}
            className="rounded-xl border bg-card p-6 shadow-sm"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent text-accent-foreground">
              <pillar.icon className="h-5 w-5" />
            </div>
            <h3 className="mt-4 font-semibold">{pillar.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{pillar.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
