import { AlertCircle, CheckCircle2, Clock3 } from "lucide-react";

import { Badge } from "@/src/components/ui/badge";
import { justificationStatusBadgeStyles } from "./justification-status-badge.styles";
import type { JustificationStatusBadgeProps } from "./justification-status-badge.types";

const justificationStatusTone = {
  Pendente: "warning",
  Aprovada: "success",
  Rejeitada: "error"
} as const;

export type { JustificationStatus, JustificationStatusBadgeProps } from "./justification-status-badge.types";

export function JustificationStatusBadge({ status }: JustificationStatusBadgeProps) {
  const tone = justificationStatusTone[status];
  const icon = status === "Aprovada" ? <CheckCircle2 /> : status === "Rejeitada" ? <AlertCircle /> : <Clock3 />;

  return (
    <Badge className={justificationStatusBadgeStyles({ tone })} variant={tone} appearance="icon" icon={icon}>
      {status}
    </Badge>
  );
}

