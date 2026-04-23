import type { LucideIcon } from "lucide-react";

export type SidebarPage = "overview" | "students" | "attendance";

export type SidebarProps = {
  activePage: SidebarPage;
  isOpen?: boolean;
  isCollapsed?: boolean;
  onClose?: () => void;
  onToggleCollapse: () => void;
  onNavigate: (page: SidebarPage) => void;
};

export type SidebarNavItem = {
  page?: SidebarPage;
  label: string;
  icon: LucideIcon;
};

