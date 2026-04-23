import { Menu } from "lucide-react";

import { assetUrls } from "../../data/assets";
import {
  topBarLogoStyles,
  topBarMenuButtonStyles,
  topBarQuoteStyles,
  topBarStyles
} from "./topbar.styles";
import type { TopBarProps } from "./topbar.types";

export function TopBar({ onMenuToggle }: TopBarProps) {
  return (
    <header className={topBarStyles}>
      <button className={topBarMenuButtonStyles} type="button" aria-label="Abrir menu" onClick={onMenuToggle}>
        <Menu className="h-5 w-5" aria-hidden="true" />
      </button>
      <p className={topBarQuoteStyles}>
        {"\"A m\u00FAsica \u00E9 a linguagem universal da humanidade.\" \u2014 Henry Wadsworth Longfellow"}
      </p>
      <img className={topBarLogoStyles} src={assetUrls.logo} alt="Escola de Musica" />
    </header>
  );
}
