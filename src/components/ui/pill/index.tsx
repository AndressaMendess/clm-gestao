import { Badge } from "@/src/components/ui/badge";

export type PillTone = "violet" | "orange" | "blue" | "pink";

export function Pill({ label, tone }: { label: string; tone: PillTone }) {
  return (
    <Badge className={`pill pill--${tone}`} variant={tone}>
      {label}
    </Badge>
  );
}
