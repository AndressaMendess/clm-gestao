import { Badge } from "@/src/components/ui/badge";
import {
  tableCardClassName,
  tableCardCountBadgeStyles,
  tableCardHeaderStyles,
  tableCardHeadingStyles,
  tableCardTitleStyles
} from "./table-card.styles";
import type { TableCardProps } from "./table-card.types";
export type { TableCardProps } from "./table-card.types";

export function TableCard({ title, countLabel, children, titleId, className }: TableCardProps) {
  return (
    <section className={tableCardClassName(className)} aria-labelledby={titleId}>
      <header className={tableCardHeaderStyles}>
        <div className={tableCardTitleStyles}>
          <h2 id={titleId} className={tableCardHeadingStyles}>
            {title}
          </h2>
          <Badge className={tableCardCountBadgeStyles} variant="violet">
            {countLabel}
          </Badge>
        </div>
      </header>
      {children}
    </section>
  );
}
