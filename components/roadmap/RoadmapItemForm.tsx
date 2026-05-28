"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SCALE_OPTIONS } from "@/components/roadmap/meta";
import { PHASES } from "@/lib/roadmap";
import type {
  Effort,
  Impact,
  Priority,
  RoadmapItem,
  RoadmapPhaseId,
} from "@/types/assessment";

/** Editable fields of a roadmap item. */
export type RoadmapItemDraft = Pick<
  RoadmapItem,
  "title" | "description" | "phase" | "priority" | "impact" | "effort"
>;

interface RoadmapItemFormProps {
  initial?: Partial<RoadmapItemDraft>;
  /** Lock the phase selector (used when adding within a known phase). */
  lockedPhase?: RoadmapPhaseId;
  onSubmit: (draft: RoadmapItemDraft) => void;
  onCancel: () => void;
}

export function RoadmapItemForm({
  initial,
  lockedPhase,
  onSubmit,
  onCancel,
}: RoadmapItemFormProps) {
  const [title, setTitle] = useState(initial?.title ?? "");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [phase, setPhase] = useState<RoadmapPhaseId>(
    lockedPhase ?? initial?.phase ?? "d30",
  );
  const [priority, setPriority] = useState<Priority>(
    initial?.priority ?? "medium",
  );
  const [impact, setImpact] = useState<Impact>(initial?.impact ?? "medium");
  const [effort, setEffort] = useState<Effort>(initial?.effort ?? "medium");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) return;
    onSubmit({ title: trimmed, description: description.trim(), phase, priority, impact, effort });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-lg border bg-card p-4"
    >
      <div className="space-y-2">
        <Label htmlFor="title">Título</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Ej. Automatizar conciliación de facturas"
          autoFocus
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Descripción</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Detalle de la iniciativa y resultado esperado"
        />
      </div>

      {!lockedPhase && (
        <div className="space-y-2">
          <Label>Etapa</Label>
          <Select
            value={phase}
            onValueChange={(v) => setPhase(v as RoadmapPhaseId)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {PHASES.map((p) => (
                <SelectItem key={p.id} value={p.id}>
                  {p.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-3">
        <ScaleSelect
          label="Prioridad"
          value={priority}
          onChange={(v) => setPriority(v)}
        />
        <ScaleSelect
          label="Impacto"
          value={impact}
          onChange={(v) => setImpact(v)}
        />
        <ScaleSelect
          label="Esfuerzo"
          value={effort}
          onChange={(v) => setEffort(v)}
        />
      </div>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="ghost" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit">Guardar</Button>
      </div>
    </form>
  );
}

interface ScaleSelectProps {
  label: string;
  value: Priority;
  onChange: (value: Priority) => void;
}

function ScaleSelect({ label, value, onChange }: ScaleSelectProps) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <Select value={value} onValueChange={(v) => onChange(v as Priority)}>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {SCALE_OPTIONS.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
