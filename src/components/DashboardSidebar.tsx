import {
  ClipboardList,
  GraduationCap,
  Home,
  LogOut,
  Music2,
  PanelLeftClose,
  Settings,
  ShieldCheck,
  UserRound,
  Users,
  X
} from "lucide-react";

import { assetUrls } from "../data/assets";
import { DashboardNavItem } from "./dashboard/DashboardNavItem";

export type DashboardPage = "overview" | "students" | "attendance";

type DashboardSidebarProps = {
  activePage: DashboardPage;
  isOpen?: boolean;
  isCollapsed?: boolean;
  onClose?: () => void;
  onToggleCollapse: () => void;
  onNavigate: (page: DashboardPage) => void;
};

const primaryItems: Array<{
  id: DashboardPage;
  label: string;
  icon: typeof Home;
}> = [
  { id: "overview", label: "Vis\u00E3o Geral", icon: Home },
  { id: "students", label: "Alunos", icon: Users },
  { id: "attendance", label: "Presen\u00E7as", icon: ClipboardList }
];

const secondaryItems = [
  { label: "Turmas", icon: GraduationCap },
  { label: "M\u00F3dulos", icon: Music2 },
  { label: "Administradores", icon: ShieldCheck },
  { label: "Professores", icon: UserRound },
  { label: "Configura\u00E7\u00F5es", icon: Settings }
];

export function DashboardSidebar({
  activePage,
  isOpen = false,
  isCollapsed = false,
  onClose,
  onToggleCollapse,
  onNavigate
}: DashboardSidebarProps) {
  return (
    <>
      <div className={`dashboard-sidebar-overlay ${isOpen ? "is-open" : ""}`} aria-hidden={!isOpen} onClick={onClose} />
      <aside className={`sidebar dashboard-sidebar ${isOpen ? "is-open" : ""} ${isCollapsed ? "is-collapsed" : ""}`}>
        <div className="sidebar__brand">
          <img className="sidebar__logo" src={assetUrls.logo} alt="Escola de Musica" />
          <button
            className="sidebar__collapse"
            type="button"
            aria-label={isCollapsed ? "Expandir sidebar" : "Colapsar sidebar"}
            onClick={onToggleCollapse}
          >
            <PanelLeftClose aria-hidden="true" />
          </button>
          <button className="sidebar__close" type="button" aria-label="Fechar menu" onClick={onClose}>
            <X aria-hidden="true" />
          </button>
        </div>

        <div className="sidebar__content">
          <nav className="sidebar__nav" aria-label="Navegacao principal">
            {primaryItems.map((item) => {
              return (
                <DashboardNavItem
                  key={item.label}
                  icon={item.icon}
                  label={item.label}
                  isCollapsed={isCollapsed}
                  isActive={item.id === activePage}
                  onClick={() => onNavigate(item.id)}
                />
              );
            })}
          </nav>

          <div className="sidebar__divider" />

          <nav className="sidebar__nav" aria-label="Navegacao secundaria">
            {secondaryItems.map((item) => {
              return <DashboardNavItem key={item.label} icon={item.icon} label={item.label} isCollapsed={isCollapsed} />;
            })}
          </nav>
        </div>

        <div className="sidebar__footer">
          <div className="sidebar-user">
            <img className="sidebar-user__avatar" src={assetUrls.userAvatar} alt="Andressa" />
            <div>
              <p className="sidebar-user__name">Andressa Mendes</p>
              <p className="sidebar-user__email">andressa.clm@gmail.com</p>
            </div>
          </div>

          <button className="logout-button" type="button">
            <LogOut aria-hidden="true" />
            <span>Sair</span>
          </button>
        </div>
      </aside>
    </>
  );
}
