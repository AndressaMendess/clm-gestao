import { ChevronDown } from "lucide-react";
import { useState } from "react";

import { Card } from "@/src/components/ui/card";
import { cn } from "@/src/lib/utils";
import { collapsibleCardChevronStyles, collapsibleCardContentStyles, collapsibleCardStyles } from "./collapsible-card.styles";
import type { CollapsibleCardProps } from "./collapsible-card.types";

export type { CollapsibleCardProps } from "./collapsible-card.types";

export function CollapsibleCard({
  title,
  icon,
  badge,
  description,
  children,
  className,
  defaultOpen = true,
  ...props
}: CollapsibleCardProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <Card className={cn(collapsibleCardStyles(), className)} {...props}>
      <button
        type="button"
        className="collapsible-card__trigger"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((current) => !current)}
      >
        <span className="collapsible-card__title-group">
          {icon ? <span className="collapsible-card__icon">{icon}</span> : null}
          <span className="collapsible-card__title-block">
            <span className="collapsible-card__title">{title}</span>
            {description ? <span className="collapsible-card__description">{description}</span> : null}
          </span>
          {badge ? <span className="collapsible-card__badge">{badge}</span> : null}
        </span>
        <ChevronDown className={collapsibleCardChevronStyles({ open: isOpen })} aria-hidden="true" />
      </button>
      <div className={collapsibleCardContentStyles({ collapsed: !isOpen })}>
        <div className="collapsible-card__content-inner">{children}</div>
      </div>
    </Card>
  );
}
