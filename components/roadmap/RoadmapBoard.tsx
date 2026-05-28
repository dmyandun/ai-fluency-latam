"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RoadmapPhase } from "@/components/roadmap/RoadmapPhase";
import type { RoadmapItemDraft } from "@/components/roadmap/RoadmapItemForm";
import { PHASES, generateRoadmap, newId } from "@/lib/roadmap";
import { loadResult, loadRoadmap, saveRoadmap } from "@/lib/storage";
import type {
  Roadmap,
  RoadmapItem,
  RoadmapPhaseId,
} from "@/types/assessment";

export function RoadmapBoard() {
  const [roadmap, setRoadmap] = useState<Roadmap | null>(null);
  const [loaded, setLoaded] = useState(false);

  // Hydrate from storage; fall back to generating from a stored result.
  useEffect(() => {
    const stored = loadRoadmap();
    if (stored) {
      setRoadmap(stored);
    } else {
      const result = loadResult();
      if (result) setRoadmap(generateRoadmap(result));
    }
    setLoaded(true);
  }, []);

  // Persist on every change.
  useEffect(() => {
    if (roadmap) saveRoadmap(roadmap);
  }, [roadmap]);

  function mutate(next: RoadmapItem[]) {
    setRoadmap({ items: next });
  }

  function addItem(phase: RoadmapPhaseId, draft: RoadmapItemDraft) {
    if (!roadmap) return;
    const item: RoadmapItem = {
      ...draft,
      phase,
      id: newId(),
      completed: false,
      source: "user",
    };
    mutate([...roadmap.items, item]);
  }

  function updateItem(id: string, draft: RoadmapItemDraft) {
    if (!roadmap) return;
    mutate(
      roadmap.items.map((item) =>
        item.id === id ? { ...item, ...draft } : item,
      ),
    );
  }

  function deleteItem(id: string) {
    if (!roadmap) return;
    mutate(roadmap.items.filter((item) => item.id !== id));
  }

  function toggleComplete(id: string) {
    if (!roadmap) return;
    mutate(
      roadmap.items.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item,
      ),
    );
  }

  if (!loaded) {
    return (
      <div className="px-4 py-20 text-center text-muted-foreground">
        Cargando roadmap…
      </div>
    );
  }

  if (!roadmap) {
    return (
      <div className="mx-auto max-w-xl px-4 py-20 text-center">
        <h1 className="text-2xl font-semibold">Aún no hay roadmap</h1>
        <p className="mt-2 text-muted-foreground">
          Completa el diagnóstico y generaremos un roadmap inicial de adopción
          que podrás editar.
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

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <header className="mb-6 space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">
          Roadmap de adopción de IA
        </h1>
        <p className="text-muted-foreground">
          Plan inicial por etapas. Edítalo, prioriza y agrega tus propias
          iniciativas.
        </p>
        <div className="flex flex-wrap gap-4 pt-1 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-3 w-1 rounded bg-primary" />
            <Sparkles className="h-3.5 w-3.5" /> Generada por el sistema
          </span>
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-3 w-1 rounded bg-emerald-500" />
            <User className="h-3.5 w-3.5" /> Agregada por ti
          </span>
        </div>
      </header>

      <div className="flex gap-5 overflow-x-auto pb-4">
        {PHASES.map((phase) => (
          <RoadmapPhase
            key={phase.id}
            phase={phase}
            items={roadmap.items.filter((item) => item.phase === phase.id)}
            onAdd={(draft) => addItem(phase.id, draft)}
            onUpdate={updateItem}
            onDelete={deleteItem}
            onToggleComplete={toggleComplete}
          />
        ))}
      </div>
    </div>
  );
}
