import { Badge } from "@/src/components/ui/badge";
import { confidenceBadgeContainerStyles } from "./confidence-badge.styles";
import type { ConfidenceBadgeProps, ExtractionConfidence } from "./confidence-badge.types";

const confidenceBadgeByLevel: Record<ExtractionConfidence, { label: string; variant: "success" | "warning" | "error" }> = {
  high: { label: "Alta confiança", variant: "success" },
  medium: { label: "Confiança média", variant: "warning" },
  low: { label: "Confiança baixa", variant: "error" }
};

export type { ConfidenceBadgeProps, ExtractionConfidence } from "./confidence-badge.types";

export function ConfidenceBadge({ level, source }: ConfidenceBadgeProps) {
  const { label, variant } = confidenceBadgeByLevel[level];

  return (
    <div className={confidenceBadgeContainerStyles()}>
      <Badge variant={variant}>{label}</Badge>
      {source ? <span>{source}</span> : null}
    </div>
  );
}

