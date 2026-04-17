import { Menu, PanelLeftClose, PanelLeftOpen } from "lucide-react";

import { assetUrls } from "../data/assets";

export function TopBar({
  isSidebarCollapsed,
  onMenuToggle,
  onSidebarToggle
}: {
  isSidebarCollapsed: boolean;
  onMenuToggle: () => void;
  onSidebarToggle: () => void;
}) {
  return (
    <header className="topbar">
      <button
        className="topbar__sidebar-toggle"
        type="button"
        aria-label={isSidebarCollapsed ? "Expandir sidebar" : "Colapsar sidebar"}
        onClick={onSidebarToggle}
      >
        {isSidebarCollapsed ? <PanelLeftOpen aria-hidden="true" /> : <PanelLeftClose aria-hidden="true" />}
      </button>
      <button className="topbar__menu-button" type="button" aria-label="Abrir menu" onClick={onMenuToggle}>
        <Menu aria-hidden="true" />
      </button>
      <p className="topbar__quote">
        {"\"A m\u00FAsica \u00E9 a linguagem universal da humanidade.\" \u2014 Henry Wadsworth Longfellow"}
      </p>
      <img className="topbar__logo" src={assetUrls.logo} alt="Escola de Musica" />
    </header>
  );
}
