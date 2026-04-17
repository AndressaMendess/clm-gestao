import type { LucideIcon } from "lucide-react";

type DashboardNavItemProps = {
  icon: LucideIcon;
  label: string;
  isCollapsed?: boolean;
  isActive?: boolean;
  onClick?: () => void;
};

export function DashboardNavItem({
  icon: Icon,
  label,
  isCollapsed = false,
  isActive = false,
  onClick
}: DashboardNavItemProps) {
  return (
    <button
      className={`dashboard-nav-item ${isActive ? "dashboard-nav-item--active" : ""}`}
      type="button"
      aria-label={isCollapsed ? label : undefined}
      onClick={onClick}
    >
      <Icon className="dashboard-nav-item__icon" aria-hidden="true" />
      <span className="dashboard-nav-item__label">{label}</span>
      <span className="dashboard-nav-item__tooltip" role="tooltip">
        {label}
      </span>
    </button>
  );
}
