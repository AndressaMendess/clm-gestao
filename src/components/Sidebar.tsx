import type { ReactNode } from "react";
import { ClipboardList, GraduationCap, Home, LogOut, Music2, Settings, ShieldPlus, Users } from "lucide-react";

import { assetUrls } from "../data/assets";

type SidebarItem = {
  label: string;
  icon: ReactNode;
  active?: boolean;
};

const primaryItems: SidebarItem[] = [
  { label: "Visão Geral", icon: <Home className="nav-item__vector-icon" size={20} strokeWidth={1.9} aria-hidden="true" /> },
  { label: "Alunos", icon: <Users className="nav-item__vector-icon" size={20} strokeWidth={1.9} aria-hidden="true" />, active: true },
  { label: "Presenças", icon: <ClipboardList className="nav-item__vector-icon" size={20} strokeWidth={1.9} aria-hidden="true" /> }
];

const secondaryItems: SidebarItem[] = [
  { label: "Turmas", icon: <GraduationCap className="nav-item__vector-icon" size={20} strokeWidth={1.9} aria-hidden="true" /> },
  { label: "Módulos", icon: <Music2 className="nav-item__vector-icon" size={20} strokeWidth={1.9} aria-hidden="true" /> },
  { label: "Administradores", icon: <ShieldPlus className="nav-item__vector-icon" size={20} strokeWidth={1.9} aria-hidden="true" /> },
  { label: "Configurações", icon: <Settings className="nav-item__vector-icon" size={20} strokeWidth={1.9} aria-hidden="true" /> }
];

export function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar__brand">
        <img className="sidebar__logo" src={assetUrls.logo} alt="Escola de Música" />
      </div>

      <div className="sidebar__content">
        <nav className="sidebar__nav" aria-label="Navegação principal">
          {primaryItems.map((item) => (
            <button key={item.label} className={`nav-item ${item.active ? "nav-item--active" : ""}`} type="button">
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar__divider" />

        <nav className="sidebar__nav" aria-label="Navegação secundária">
          {secondaryItems.map((item) => (
            <button key={item.label} className="nav-item" type="button">
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </div>

      <div className="sidebar__footer">
        <div className="sidebar-user">
          <img className="sidebar-user__avatar" src={assetUrls.userAvatar} alt="Andressa" />
          <div>
            <p className="sidebar-user__name">Andressa</p>
            <p className="sidebar-user__email">andressa.clm@gmail.com</p>
          </div>
        </div>

        <button className="logout-button" type="button">
          <LogOut className="nav-item__vector-icon" size={18} strokeWidth={2} aria-hidden="true" />
          <span>Sair</span>
        </button>
      </div>
    </aside>
  );
}
