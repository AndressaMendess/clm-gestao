import type { LucideIcon } from "lucide-react";

export type DashboardNavItemProps = {
  icon: LucideIcon;
  label: string;
  isCollapsed?: boolean;
  isActive?: boolean;
  onClick?: () => void;
};
