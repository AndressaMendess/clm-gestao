import type { LucideIcon } from "lucide-react";
import { ArrowRight } from "lucide-react";

type DashboardActionCardTone = "primary" | "purple" | "green";

type DashboardActionCardProps = {
  title: string;
  description: string;
  icon: LucideIcon;
  tone: DashboardActionCardTone;
  onClick: () => void;
};

export function DashboardActionCard({
  title,
  description,
  icon: Icon,
  tone,
  onClick
}: DashboardActionCardProps) {
  return (
    <button className={`dashboard-action-card dashboard-action-card--${tone}`} type="button" onClick={onClick}>
      <div className="dashboard-action-card__top">
        <span className="dashboard-action-card__icon" aria-hidden="true">
          <Icon />
        </span>
        <ArrowRight className="dashboard-action-card__arrow" aria-hidden="true" />
      </div>

      <div className="dashboard-action-card__copy">
        <strong>{title}</strong>
        <p>{description}</p>
      </div>
    </button>
  );
}
