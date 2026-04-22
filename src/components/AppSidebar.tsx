import type { ReactNode } from "react";

import {
  ClipboardList,
  GraduationCap,
  Home,
  LogOut,
  Music2,
  PanelLeftClose,
  PanelLeftOpen,
  Settings,
  ShieldPlus,
  Users,
  UserRound
} from "lucide-react";

import { assetUrls } from "../data/assets";

type SidebarItemId =
  | "overview"
  | "students"
  | "attendance"
  | "classes"
  | "modules"
  | "admins"
  | "teachers"
  | "settings";

type SidebarProps = {
  activeItem?: SidebarItemId;
  collapsed: boolean;
  onToggleCollapsed: () => void;
};

type SidebarItem = {
  id: SidebarItemId;
  label: string;
  icon: ReactNode;
};

const primaryItems: SidebarItem[] = [
  {
    id: "overview",
    label: "Visão Geral",
    icon: <Home className="nav-item__vector-icon" size={20} strokeWidth={1.9} aria-hidden="true" />
  },
  {
    id: "students",
    label: "Alunos",
    icon: <Users className="nav-item__vector-icon" size={20} strokeWidth={1.9} aria-hidden="true" />
  },
  {
    id: "attendance",
    label: "Presenças",
    icon: <ClipboardList className="nav-item__vector-icon" size={20} strokeWidth={1.9} aria-hidden="true" />
  }
];

const secondaryItems: SidebarItem[] = [
  {
    id: "classes",
    label: "Turmas",
    icon: <GraduationCap className="nav-item__vector-icon" size={20} strokeWidth={1.9} aria-hidden="true" />
  },
  {
    id: "modules",
    label: "Módulos",
    icon: <Music2 className="nav-item__vector-icon" size={20} strokeWidth={1.9} aria-hidden="true" />
  },
  {
    id: "admins",
    label: "Administradores",
    icon: <ShieldPlus className="nav-item__vector-icon" size={20} strokeWidth={1.9} aria-hidden="true" />
  },
  {
    id: "teachers",
    label: "Professores",
    icon: <UserRound className="nav-item__vector-icon" size={20} strokeWidth={1.9} aria-hidden="true" />
  },
  {
    id: "settings",
    label: "Configurações",
    icon: <Settings className="nav-item__vector-icon" size={20} strokeWidth={1.9} aria-hidden="true" />
  }
];

function SidebarNavItem({
  item,
  active,
  collapsed
}: {
  item: SidebarItem;
  active: boolean;
  collapsed: boolean;
}) {
  return (
    <button
      className={`nav-item ${active ? "nav-item--active" : ""} ${collapsed ? "nav-item--collapsed" : ""}`}
      type="button"
      aria-current={active ? "page" : undefined}
      aria-label={collapsed ? item.label : undefined}
    >
      {item.icon}
      <span className="nav-item__label">{item.label}</span>
      {collapsed ? <span className="nav-item__tooltip">{item.label}</span> : null}
    </button>
  );
}

export function AppSidebar({
  activeItem = "students",
  collapsed,
  onToggleCollapsed
}: SidebarProps) {
  const ToggleIcon = collapsed ? PanelLeftOpen : PanelLeftClose;

  return (
    <aside className={`sidebar ${collapsed ? "sidebar--collapsed" : ""}`}>
      <div className="sidebar__brand">
        <div className="sidebar__brand-row">
          <img className="sidebar__logo" src={assetUrls.logo} alt="Escola de Música" />
          <button
            className="sidebar__toggle"
            type="button"
            onClick={onToggleCollapsed}
            aria-label={collapsed ? "Abrir sidebar" : "Colapsar sidebar"}
            aria-expanded={!collapsed}
          >
            <ToggleIcon size={18} strokeWidth={2.2} />
          </button>
        </div>
        <span className="sidebar__brand-badge" aria-hidden={!collapsed}>
          CLM
        </span>
      </div>

      <div className="sidebar__content">
        <nav className="sidebar__nav" aria-label="Navegação principal">
          {primaryItems.map((item) => (
            <SidebarNavItem
              key={item.id}
              item={item}
              active={activeItem === item.id}
              collapsed={collapsed}
            />
          ))}
        </nav>

        <div className="sidebar__divider" />

        <nav className="sidebar__nav" aria-label="Navegação secundária">
          {secondaryItems.map((item) => (
            <SidebarNavItem
              key={item.id}
              item={item}
              active={activeItem === item.id}
              collapsed={collapsed}
            />
          ))}
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
          <LogOut className="nav-item__vector-icon" size={18} strokeWidth={2} aria-hidden="true" />
          <span>Sair</span>
          {collapsed ? <span className="nav-item__tooltip">Sair</span> : null}
        </button>
      </div>
    </aside>
  );
}
