import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScoreBar } from "@/components/results/score-bar";
import { DIMENSION_LABELS } from "@/lib/questions";
import { IMPLEMENTATION_INFO, MODEL_INFO } from "@/lib/recommendations";
import type { ScoringResult } from "@/types/assessment";

interface ScoreBreakdownProps {
  scoring: ScoringResult;
}

export function ScoreBreakdown({ scoring }: ScoreBreakdownProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Modelos de interacción</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {scoring.models.map((entry) => (
            <ScoreBar
              key={entry.id}
              label={MODEL_INFO[entry.id].name}
              score={entry.score}
              highlight={entry.id === scoring.primaryModel}
            />
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Estrategias de implementación</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {scoring.implementations.map((entry) => (
            <ScoreBar
              key={entry.id}
              label={IMPLEMENTATION_INFO[entry.id].name}
              score={entry.score}
              highlight={entry.id === scoring.primaryImplementation}
            />
          ))}
        </CardContent>
      </Card>

      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Perfil por dimensión</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          {Object.entries(scoring.dimensions).map(([dimension, score]) => (
            <ScoreBar
              key={dimension}
              label={DIMENSION_LABELS[dimension as keyof typeof DIMENSION_LABELS]}
              score={score ?? 0}
            />
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
