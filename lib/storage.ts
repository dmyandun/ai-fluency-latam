import type { DiagnosticResult, Roadmap } from "@/types/assessment";

const RESULT_KEY = "ai-fluency:result";
const ROADMAP_KEY = "ai-fluency:roadmap";

function read<T>(key: string): T | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

function write<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage unavailable; degrade silently */
  }
}

export function saveResult(result: DiagnosticResult): void {
  write(RESULT_KEY, result);
}

export function loadResult(): DiagnosticResult | null {
  return read<DiagnosticResult>(RESULT_KEY);
}

export function saveRoadmap(roadmap: Roadmap): void {
  write(ROADMAP_KEY, roadmap);
}

export function loadRoadmap(): Roadmap | null {
  return read<Roadmap>(ROADMAP_KEY);
}

export function clearAll(): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(RESULT_KEY);
  window.localStorage.removeItem(ROADMAP_KEY);
}
