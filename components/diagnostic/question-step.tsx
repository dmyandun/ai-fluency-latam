"use client";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import type { Question } from "@/types/assessment";

interface QuestionStepProps {
  question: Question;
  /** Selected option value (0..1) or undefined when unanswered. */
  value: number | undefined;
  onChange: (value: number) => void;
}

export function QuestionStep({ question, value, onChange }: QuestionStepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">
          {question.title}
        </h2>
        <p className="mt-1 text-muted-foreground">{question.description}</p>
      </div>

      <RadioGroup
        value={value !== undefined ? String(value) : undefined}
        onValueChange={(v) => onChange(Number(v))}
        className="gap-3"
      >
        {question.options.map((option, index) => {
          const id = `${question.id}-${index}`;
          const selected = value === option.value;
          return (
            <Label
              key={id}
              htmlFor={id}
              className={cn(
                "flex cursor-pointer items-center gap-3 rounded-lg border p-4 text-base font-normal transition-colors",
                selected
                  ? "border-primary bg-accent/60 ring-1 ring-primary"
                  : "hover:bg-accent/40",
              )}
            >
              <RadioGroupItem id={id} value={String(option.value)} />
              {option.label}
            </Label>
          );
        })}
      </RadioGroup>
    </div>
  );
}
