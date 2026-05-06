import {
  dashboardNavItemLabelStyles,
  dashboardNavItemStyles
} from "./dashboard-nav-item.styles";
import { Tooltip } from "@/src/components/ui/tooltip";
import type { DashboardNavItemProps } from "./dashboard-nav-item.types";
export type { DashboardNavItemProps } from "./dashboard-nav-item.types";

export function DashboardNavItem({
  icon: Icon,
  label,
  isCollapsed = false,
  isActive = false,
  onClick
}: DashboardNavItemProps) {
  return (
    <button
      className={dashboardNavItemStyles({ collapsed: isCollapsed, active: isActive })}
      type="button"
      aria-label={isCollapsed ? label : undefined}
      onClick={onClick}
    >
      <Icon className="h-5 w-5 shrink-0" aria-hidden="true" />
      <span className={dashboardNavItemLabelStyles({ collapsed: isCollapsed })}>
        {label}
      </span>
      <Tooltip label={label} visible={isCollapsed} />
    </button>
  );
}
