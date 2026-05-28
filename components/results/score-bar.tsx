import { cn } from "@/lib/utils";

interface ScoreBarProps {
  label: string;
  /** 0..100 */
  score: number;
  highlight?: boolean;
  /** Optional Tailwind bg class for the fill. */
  fillClassName?: string;
}

export function ScoreBar({
  label,
  score,
  highlight,
  fillClassName,
}: ScoreBarProps) {
  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-sm">
        <span className={cn(highlight && "font-semibold")}>{label}</span>
        <span className="tabular-nums text-muted-foreground">{score}%</span>
      </div>
      <div className="h-2.5 w-full overflow-hidden rounded-full bg-secondary">
        <div
          className={cn(
            "h-full rounded-full transition-all",
            fillClassName ?? (highlight ? "bg-primary" : "bg-muted-foreground/40"),
          )}
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );
}
