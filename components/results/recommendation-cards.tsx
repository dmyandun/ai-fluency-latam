import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  IMPLEMENTATION_INFO,
  MODEL_INFO,
} from "@/lib/recommendations";
import type {
  ImplementationType,
  InteractionModel,
} from "@/types/assessment";

interface RecommendationCardsProps {
  model: InteractionModel;
  implementation: ImplementationType;
}

export function RecommendationCards({
  model,
  implementation,
}: RecommendationCardsProps) {
  const modelInfo = MODEL_INFO[model];
  const implInfo = IMPLEMENTATION_INFO[implementation];

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card className="border-primary/40 bg-accent/30">
        <CardHeader>
          <Badge className="w-fit">Recomendación principal</Badge>
          <CardTitle className="text-2xl">{modelInfo.name}</CardTitle>
          <p className="text-sm font-medium text-primary">
            {modelInfo.tagline}
          </p>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            {modelInfo.description}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <Badge variant="secondary" className="w-fit">
            Implementación recomendada
          </Badge>
          <CardTitle className="text-2xl">{implInfo.name}</CardTitle>
          <p className="text-sm font-medium text-muted-foreground">
            {implInfo.tagline}
          </p>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            {implInfo.description}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
