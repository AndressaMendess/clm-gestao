import { Badge } from "@/src/components/ui/badge";
import { statusBadgeStyles } from "./status-badge.styles";
import type { Status } from "./status-badge.types";
export type { Status } from "./status-badge.types";

export function StatusBadge({ status }: { status: Status }) {
  const tone = status === "Ativo" ? "success" : status === "Trancamento" ? "warning" : "error";

  return (
    <Badge className={statusBadgeStyles({ tone })} variant={tone} appearance="dot">
      {status}
    </Badge>
  );
}
