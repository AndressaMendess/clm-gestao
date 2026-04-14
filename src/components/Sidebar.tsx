import { assetUrls } from "../data/assets";

const primaryItems = [
  { label: "Visão Geral", icon: assetUrls.icons.overview, active: false },
  { label: "Alunos", icon: assetUrls.icons.students, active: true },
  { label: "Presenças", icon: assetUrls.icons.attendance, active: false }
];

const secondaryItems = [
  { label: "Turmas", icon: assetUrls.icons.classes },
  { label: "Módulos", icon: assetUrls.icons.modules },
  { label: "Administradores", icon: assetUrls.icons.admins },
  { label: "Configurações", icon: assetUrls.icons.settings }
];

/**
 * Sidebar principal da aplicação CLM.
 */
export function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar__brand">
        <img className="sidebar__logo" src={assetUrls.logo} alt="Escola de Música" />
      </div>

      <div className="sidebar__content">
        <nav className="sidebar__nav" aria-label="Navegação principal">
          {primaryItems.map((item) => (
            <button
              key={item.label}
              className={`nav-item ${item.active ? "nav-item--active" : ""}`}
              type="button"
            >
              <img className="nav-item__icon" src={item.icon} alt="" aria-hidden="true" />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar__divider" />

        <nav className="sidebar__nav" aria-label="Navegação secundária">
          {secondaryItems.map((item) => (
            <button key={item.label} className="nav-item" type="button">
              <img className="nav-item__icon" src={item.icon} alt="" aria-hidden="true" />
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
          <img src={assetUrls.icons.logout} alt="" aria-hidden="true" />
          <span>Sair</span>
        </button>
      </div>
    </aside>
  );
}
