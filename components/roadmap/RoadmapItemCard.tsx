"use client";

import { useState } from "react";
import { Check, Pencil, Sparkles, Trash2, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  EFFORT_LABELS,
  EFFORT_VARIANT,
  IMPACT_LABELS,
  LEVEL_VARIANT,
  PRIORITY_LABELS,
} from "@/components/roadmap/meta";
import {
  RoadmapItemForm,
  type RoadmapItemDraft,
} from "@/components/roadmap/RoadmapItemForm";
import type { RoadmapItem } from "@/types/assessment";

interface RoadmapItemCardProps {
  item: RoadmapItem;
  onUpdate: (id: string, draft: RoadmapItemDraft) => void;
  onDelete: (id: string) => void;
  onToggleComplete: (id: string) => void;
}

export function RoadmapItemCard({
  item,
  onUpdate,
  onDelete,
  onToggleComplete,
}: RoadmapItemCardProps) {
  const [editing, setEditing] = useState(false);

  if (editing) {
    return (
      <RoadmapItemForm
        initial={item}
        lockedPhase={item.phase}
        onSubmit={(draft) => {
          onUpdate(item.id, draft);
          setEditing(false);
        }}
        onCancel={() => setEditing(false)}
      />
    );
  }

  const isGenerated = item.source === "generated";

  return (
    <div
      className={cn(
        "rounded-lg border bg-card p-4 shadow-sm transition-colors",
        item.completed && "opacity-60",
        isGenerated ? "border-l-4 border-l-primary" : "border-l-4 border-l-emerald-500",
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <h4
          className={cn(
            "font-medium leading-snug",
            item.completed && "line-through",
          )}
        >
          {item.title}
        </h4>
        <Badge
          variant="outline"
          className="shrink-0 gap-1 text-[10px] uppercase tracking-wide"
        >
          {isGenerated ? (
            <>
              <Sparkles className="h-3 w-3" /> Auto
            </>
          ) : (
            <>
              <User className="h-3 w-3" /> Tú
            </>
          )}
        </Badge>
      </div>

      {item.description && (
        <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
      )}

      <div className="mt-3 flex flex-wrap gap-1.5">
        <Badge variant={LEVEL_VARIANT[item.priority]}>
          {PRIORITY_LABELS[item.priority]}
        </Badge>
        <Badge variant={LEVEL_VARIANT[item.impact]}>
          {IMPACT_LABELS[item.impact]}
        </Badge>
        <Badge variant={EFFORT_VARIANT[item.effort]}>
          {EFFORT_LABELS[item.effort]}
        </Badge>
      </div>

      <div className="mt-4 flex items-center gap-1">
        <Button
          size="sm"
          variant={item.completed ? "secondary" : "outline"}
          onClick={() => onToggleComplete(item.id)}
        >
          <Check className="h-4 w-4" />
          {item.completed ? "Completada" : "Completar"}
        </Button>
        <Button
          size="icon"
          variant="ghost"
          aria-label="Editar"
          onClick={() => setEditing(true)}
        >
          <Pencil className="h-4 w-4" />
        </Button>
        <Button
          size="icon"
          variant="ghost"
          aria-label="Eliminar"
          onClick={() => onDelete(item.id)}
        >
          <Trash2 className="h-4 w-4 text-destructive" />
        </Button>
      </div>
    </div>
  );
}
