import {
  ClipboardList,
  GraduationCap,
  Home,
  LogOut,
  Music2,
  PanelLeftClose,
  PanelLeftOpen,
  Settings,
  ShieldCheck,
  UserRound,
  Users,
  X
} from "lucide-react";

import { assetUrls } from "../data/assets";

export type DashboardPage = "overview" | "students" | "attendance";

type DashboardSidebarProps = {
  activePage: DashboardPage;
  collapsed?: boolean;
  isOpen?: boolean;
  onClose?: () => void;
  onToggleCollapsed?: () => void;
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
  collapsed = false,
  isOpen = false,
  onClose,
  onToggleCollapsed,
  onNavigate
}: DashboardSidebarProps) {
  const ToggleIcon = collapsed ? PanelLeftOpen : PanelLeftClose;

  return (
    <>
      <div className={`dashboard-sidebar-overlay ${isOpen ? "is-open" : ""}`} aria-hidden={!isOpen} onClick={onClose} />
      <aside className={`sidebar dashboard-sidebar ${collapsed ? "sidebar--collapsed" : ""} ${isOpen ? "is-open" : ""}`}>
        <div className="sidebar__brand">
          <div className="sidebar__brand-row">
            <img className="sidebar__logo" src={assetUrls.logo} alt="Escola de Musica" />
            <button
              className="sidebar__toggle dashboard-sidebar__collapse-button"
              type="button"
              onClick={onToggleCollapsed}
              aria-label={collapsed ? "Expandir sidebar" : "Colapsar sidebar"}
              aria-expanded={!collapsed}
            >
              <ToggleIcon aria-hidden="true" />
            </button>
            <button className="sidebar__close" type="button" aria-label="Fechar menu" onClick={onClose}>
              <X aria-hidden="true" />
            </button>
          </div>
          <span className="sidebar__brand-badge" aria-hidden={!collapsed}>
            CLM
          </span>
        </div>

        <div className="sidebar__content">
          <nav className="sidebar__nav" aria-label="Navegacao principal">
            {primaryItems.map((item) => {
              const isActive = item.id === activePage;
              const Icon = item.icon;

              return (
                <button
                  key={item.label}
                  className={`nav-item ${isActive ? "nav-item--active" : ""} ${collapsed ? "nav-item--collapsed" : ""}`}
                  type="button"
                  aria-label={collapsed ? item.label : undefined}
                  onClick={() => {
                    onNavigate(item.id);
                  }}
                >
                  <Icon className="nav-item__icon" aria-hidden="true" />
                  <span className="nav-item__label">{item.label}</span>
                  {collapsed ? <span className="nav-item__tooltip">{item.label}</span> : null}
                </button>
              );
            })}
          </nav>

          <div className="sidebar__divider" />

          <nav className="sidebar__nav" aria-label="Navegacao secundaria">
            {secondaryItems.map((item) => {
              const Icon = item.icon;

              return (
                <button
                  key={item.label}
                  className={`nav-item ${collapsed ? "nav-item--collapsed" : ""}`}
                  type="button"
                  aria-label={collapsed ? item.label : undefined}
                >
                  <Icon className="nav-item__icon" aria-hidden="true" />
                  <span className="nav-item__label">{item.label}</span>
                  {collapsed ? <span className="nav-item__tooltip">{item.label}</span> : null}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="sidebar__footer">
          <div className="sidebar-user">
            <img className="sidebar-user__avatar" src={assetUrls.userAvatar} alt="Andressa" />
            <div className="sidebar-user__meta">
              <p className="sidebar-user__name">Andressa</p>
              <p className="sidebar-user__email">andressa.clm@gmail.com</p>
            </div>
          </div>

          <button className={`logout-button ${collapsed ? "logout-button--collapsed" : ""}`} type="button" aria-label="Sair">
            <LogOut aria-hidden="true" />
            <span>Sair</span>
            {collapsed ? <span className="nav-item__tooltip">Sair</span> : null}
          </button>
        </div>
      </aside>
    </>
  );
}
