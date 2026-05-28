import type { Effort, Impact, Priority } from "@/types/assessment";

type BadgeVariant = "default" | "secondary" | "outline" | "success" | "warning" | "danger";

export const PRIORITY_LABELS: Record<Priority, string> = {
  low: "Prioridad baja",
  medium: "Prioridad media",
  high: "Prioridad alta",
};

export const IMPACT_LABELS: Record<Impact, string> = {
  low: "Impacto bajo",
  medium: "Impacto medio",
  high: "Impacto alto",
};

export const EFFORT_LABELS: Record<Effort, string> = {
  low: "Esfuerzo bajo",
  medium: "Esfuerzo medio",
  high: "Esfuerzo alto",
};

/** Higher priority/impact reads as more urgent (warmer). */
export const LEVEL_VARIANT: Record<Priority, BadgeVariant> = {
  low: "secondary",
  medium: "warning",
  high: "danger",
};

/** For effort, high effort is the cautionary case. */
export const EFFORT_VARIANT: Record<Effort, BadgeVariant> = {
  low: "success",
  medium: "warning",
  high: "danger",
};

export const SCALE_OPTIONS: { value: Priority; label: string }[] = [
  { value: "low", label: "Bajo" },
  { value: "medium", label: "Medio" },
  { value: "high", label: "Alto" },
];
