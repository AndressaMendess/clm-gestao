import type { LucideIcon } from "lucide-react";
import type { ModuleSlug } from "@/src/data/modules";

export type SidebarPage = "overview" | "students" | "teachers" | "attendance" | "modules";

export type SidebarProps = {
  activePage: SidebarPage;
  activeModule?: ModuleSlug | null;
  isOpen?: boolean;
  isCollapsed?: boolean;
  onClose?: () => void;
  onToggleCollapse: () => void;
  onNavigate: (page: SidebarPage) => void;
  onNavigateModule?: (moduleSlug: ModuleSlug) => void;
};

export type SidebarNavItem = {
  page?: SidebarPage;
  label: string;
  icon: LucideIcon;
};

