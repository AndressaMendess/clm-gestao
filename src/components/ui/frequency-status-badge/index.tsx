import { AlertCircle, CheckCircle2 } from "lucide-react";

import { Badge } from "@/src/components/ui/badge";
import { frequencyStatusBadgeStyles } from "./frequency-status-badge.styles";
import type { FrequencyStatusBadgeProps } from "./frequency-status-badge.types";

export type { FrequencyStatus, FrequencyStatusBadgeProps } from "./frequency-status-badge.types";

export function FrequencyStatusBadge({ status }: FrequencyStatusBadgeProps) {
  const tone = status === "Presente" ? "success" : status === "Justificado" ? "warning" : "error";

  return (
    <Badge
      className={frequencyStatusBadgeStyles({ tone })}
      variant={tone}
      appearance="icon"
      icon={tone === "success" ? <CheckCircle2 /> : <AlertCircle />}
    >
      {status}
    </Badge>
  );
}
