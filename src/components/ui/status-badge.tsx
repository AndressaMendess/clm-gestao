import { Badge } from "@/src/components/ui/badge";

export type Status = "Ativo" | "Inativo" | "Trancamento";

export function StatusBadge({ status }: { status: Status }) {
  const tone = status === "Ativo" ? "success" : status === "Trancamento" ? "warning" : "error";

  return (
    <Badge className={`status-badge status-badge--${tone}`} variant={tone} appearance="dot">
      {status}
    </Badge>
  );
}
