import { ClipboardList, GraduationCap, Home, LogOut, Music2, Settings, ShieldCheck, Users, X } from "lucide-react";

import { assetUrls } from "../data/assets";

export type DashboardPage = "students" | "attendance";

type DashboardSidebarProps = {
  activePage: DashboardPage;
  isOpen?: boolean;
  onClose?: () => void;
  onNavigate: (page: DashboardPage) => void;
};

const primaryItems: Array<{
  id: DashboardPage | "overview";
  label: string;
  icon: typeof Home;
}> = [
  { id: "overview", label: "Visao Geral", icon: Home },
  { id: "students", label: "Alunos", icon: Users },
  { id: "attendance", label: "Presencas", icon: ClipboardList }
];

const secondaryItems = [
  { label: "Turmas", icon: GraduationCap },
  { label: "Modulos", icon: Music2 },
  { label: "Administradores", icon: ShieldCheck },
  { label: "Configuracoes", icon: Settings }
];

export function DashboardSidebar({ activePage, isOpen = false, onClose, onNavigate }: DashboardSidebarProps) {
  return (
    <>
      <div className={`dashboard-sidebar-overlay ${isOpen ? "is-open" : ""}`} aria-hidden={!isOpen} onClick={onClose} />
      <aside className={`sidebar dashboard-sidebar ${isOpen ? "is-open" : ""}`}>
        <div className="sidebar__brand">
          <img className="sidebar__logo" src={assetUrls.logo} alt="Escola de Musica" />
          <button className="sidebar__close" type="button" aria-label="Fechar menu" onClick={onClose}>
            <X aria-hidden="true" />
          </button>
        </div>

        <div className="sidebar__content">
          <nav className="sidebar__nav" aria-label="Navegacao principal">
            {primaryItems.map((item) => {
              const isActive = item.id === activePage;
              const Icon = item.icon;

              return (
                <button
                  key={item.label}
                  className={`nav-item ${isActive ? "nav-item--active" : ""}`}
                  type="button"
                  onClick={() => {
                    if (item.id === "students" || item.id === "attendance") {
                      onNavigate(item.id);
                    }
                  }}
                >
                  <Icon className="nav-item__icon" aria-hidden="true" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          <div className="sidebar__divider" />

          <nav className="sidebar__nav" aria-label="Navegacao secundaria">
            {secondaryItems.map((item) => {
              const Icon = item.icon;

              return (
                <button key={item.label} className="nav-item" type="button">
                  <Icon className="nav-item__icon" aria-hidden="true" />
                  <span>{item.label}</span>
                </button>
              );
            })}
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
            <LogOut aria-hidden="true" />
            <span>Sair</span>
          </button>
        </div>
      </aside>
    </>
  );
}
