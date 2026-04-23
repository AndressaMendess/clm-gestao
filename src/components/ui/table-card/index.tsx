import type { ReactNode } from "react";

import { Badge } from "@/src/components/ui/badge";

type TableCardProps = {
  title: string;
  countLabel: string;
  children: ReactNode;
  titleId?: string;
  className?: string;
};

export function TableCard({ title, countLabel, children, titleId, className }: TableCardProps) {
  return (
    <section className={["table-card", "dashboard-table-card", className].filter(Boolean).join(" ")} aria-labelledby={titleId}>
      <header className="table-card__header">
        <div className="table-card__title">
          <h2 id={titleId}>{title}</h2>
          <Badge className="count-badge" variant="violet">
            {countLabel}
          </Badge>
        </div>
      </header>
      {children}
    </section>
  );
}
