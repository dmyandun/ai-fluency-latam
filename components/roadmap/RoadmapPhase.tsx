"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RoadmapItemCard } from "@/components/roadmap/RoadmapItemCard";
import {
  RoadmapItemForm,
  type RoadmapItemDraft,
} from "@/components/roadmap/RoadmapItemForm";
import type { PhaseMeta } from "@/lib/roadmap";
import type { RoadmapItem } from "@/types/assessment";

interface RoadmapPhaseProps {
  phase: PhaseMeta;
  items: RoadmapItem[];
  onAdd: (draft: RoadmapItemDraft) => void;
  onUpdate: (id: string, draft: RoadmapItemDraft) => void;
  onDelete: (id: string) => void;
  onToggleComplete: (id: string) => void;
}

export function RoadmapPhase({
  phase,
  items,
  onAdd,
  onUpdate,
  onDelete,
  onToggleComplete,
}: RoadmapPhaseProps) {
  const [adding, setAdding] = useState(false);
  const completed = items.filter((i) => i.completed).length;

  return (
    <section className="flex w-80 shrink-0 flex-col gap-3">
      <header className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold">{phase.label}</h3>
          <p className="text-xs uppercase tracking-wide text-muted-foreground">
            {phase.horizon}
          </p>
        </div>
        <Badge variant="secondary">
          {completed}/{items.length}
        </Badge>
      </header>

      <div className="flex flex-col gap-3">
        {items.map((item) => (
          <RoadmapItemCard
            key={item.id}
            item={item}
            onUpdate={onUpdate}
            onDelete={onDelete}
            onToggleComplete={onToggleComplete}
          />
        ))}

        {adding ? (
          <RoadmapItemForm
            lockedPhase={phase.id}
            onSubmit={(draft) => {
              onAdd(draft);
              setAdding(false);
            }}
            onCancel={() => setAdding(false)}
          />
        ) : (
          <Button
            variant="outline"
            className="w-full border-dashed"
            onClick={() => setAdding(true)}
          >
            <Plus className="h-4 w-4" />
            Agregar iniciativa
          </Button>
        )}
      </div>
    </section>
  );
}
