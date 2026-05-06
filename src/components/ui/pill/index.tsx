import { Badge } from "@/src/components/ui/badge";
import { pillStyles } from "./pill.styles";
import type { PillProps, PillTone } from "./pill.types";
export type { PillProps, PillTone } from "./pill.types";

export function Pill({ label, tone }: PillProps) {
  return (
    <Badge className={pillStyles({ tone })} variant={tone}>
      {label}
    </Badge>
  );
}
