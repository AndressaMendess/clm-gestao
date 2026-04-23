import { ChevronDown } from "lucide-react";
import { useState, type HTMLAttributes, type ReactNode } from "react";

import { Card } from "@/src/components/ui/card";
import { cn } from "@/src/lib/utils";

type CollapsibleCardProps = HTMLAttributes<HTMLElement> & {
  title: string;
  icon?: ReactNode;
  badge?: ReactNode;
  description?: ReactNode;
  children: ReactNode;
  defaultOpen?: boolean;
};

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
    <Card className={cn("collapsible-card", className)} {...props}>
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
        <ChevronDown className={cn("collapsible-card__chevron", isOpen && "is-open")} aria-hidden="true" />
      </button>
      <div className={cn("collapsible-card__content", !isOpen && "is-collapsed")}>
        <div className="collapsible-card__content-inner">{children}</div>
      </div>
    </Card>
  );
}
