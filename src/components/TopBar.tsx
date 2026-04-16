import { Menu } from "lucide-react";

import { assetUrls } from "../data/assets";

export function TopBar({ onMenuToggle }: { onMenuToggle: () => void }) {
  return (
    <header className="topbar">
      <button className="topbar__menu-button" type="button" aria-label="Abrir menu" onClick={onMenuToggle}>
        <Menu aria-hidden="true" />
      </button>
      <p className="topbar__quote">
        "A musica e a linguagem universal da humanidade." - Henry Wadsworth Longfellow
      </p>
      <img className="topbar__logo" src={assetUrls.logo} alt="Escola de Musica" />
    </header>
  );
}
