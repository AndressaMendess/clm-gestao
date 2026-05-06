import { ArrowRight } from "lucide-react";
import {
  dashboardActionCardArrowStyles,
  dashboardActionCardCopyStyles,
  dashboardActionCardDescriptionStyles,
  dashboardActionCardIconStyles,
  dashboardActionCardStyles,
  dashboardActionCardTitleStyles,
  dashboardActionCardTopStyles
} from "./dashboard-action-card.styles";
import type { DashboardActionCardProps } from "./dashboard-action-card.types";

export type { DashboardActionCardProps, DashboardActionCardTone } from "./dashboard-action-card.types";

export function DashboardActionCard({
  title,
  description,
  icon: Icon,
  tone,
  onClick
}: DashboardActionCardProps) {
  return (
    <button className={dashboardActionCardStyles({ tone })} type="button" onClick={onClick}>
      <div className={dashboardActionCardTopStyles}>
        <span className={dashboardActionCardIconStyles({ tone })} aria-hidden="true">
          <Icon />
        </span>
        <ArrowRight className={dashboardActionCardArrowStyles({ tone })} aria-hidden="true" />
      </div>

      <div className={dashboardActionCardCopyStyles}>
        <strong className={dashboardActionCardTitleStyles({ tone })}>{title}</strong>
        <p className={dashboardActionCardDescriptionStyles({ tone })}>{description}</p>
      </div>
    </button>
  );
}
