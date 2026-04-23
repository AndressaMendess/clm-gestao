import {
  ClipboardList,
  Home,
  LogOut,
  Music2,
  PanelLeftClose,
  PanelLeftOpen,
  Settings,
  UserRound,
  Users,
  X
} from "lucide-react";
import { cn } from "@/src/lib/utils";

import { assetUrls } from "../../data/assets";
import { DashboardNavItem } from "../dashboard/DashboardNavItem";
import {
  sidebarBrandBadgeStyles,
  sidebarBrandRowStyles,
  sidebarBrandStyles,
  sidebarCloseStyles,
  sidebarContentStyles,
  sidebarDividerStyles,
  sidebarFooterStyles,
  sidebarLogoStyles,
  sidebarLogoutButtonStyles,
  sidebarNavStyles,
  sidebarOverlayStyles,
  sidebarShellStyles,
  sidebarToggleStyles,
  sidebarUserMetaStyles,
  sidebarUserStyles
} from "./sidebar.styles";
import type { SidebarNavItem, SidebarPage, SidebarProps } from "./sidebar.types";
export type { SidebarPage, SidebarProps } from "./sidebar.types";

const primaryItems: SidebarNavItem[] = [
  { page: "overview", label: "Vis\u00E3o Geral", icon: Home },
  { page: "students", label: "Alunos", icon: Users },
  { page: "attendance", label: "Presen\u00E7as", icon: ClipboardList }
];

const secondaryItems: SidebarNavItem[] = [
  { label: "M\u00F3dulos", icon: Music2 },
  { label: "Professores", icon: UserRound },
  { label: "Configura\u00E7\u00F5es", icon: Settings }
];

export function Sidebar({
  activePage,
  isOpen = false,
  isCollapsed = false,
  onClose,
  onToggleCollapse,
  onNavigate
}: SidebarProps) {
  const ToggleIcon = isCollapsed ? PanelLeftOpen : PanelLeftClose;
  const renderNavItem = (item: SidebarNavItem) => {
    const onClick = item.page ? () => onNavigate(item.page as SidebarPage) : undefined;

    return (
      <DashboardNavItem
        key={item.label}
        icon={item.icon}
        label={item.label}
        isCollapsed={isCollapsed}
        isActive={item.page === activePage}
        onClick={onClick}
      />
    );
  };

  return (
    <>
      <div className={sidebarOverlayStyles({ open: isOpen })} aria-hidden={!isOpen} onClick={onClose} />
      <aside className={sidebarShellStyles({ open: isOpen, collapsed: isCollapsed })}>
        <div className={sidebarBrandStyles({ collapsed: isCollapsed })}>
          <div className={sidebarBrandRowStyles({ collapsed: isCollapsed })}>
            <img className={sidebarLogoStyles({ collapsed: isCollapsed })} src={assetUrls.logo} alt="Escola de Musica" />
            <button
              className={sidebarToggleStyles({ collapsed: isCollapsed })}
              type="button"
              onClick={onToggleCollapse}
              aria-label={isCollapsed ? "Expandir sidebar" : "Colapsar sidebar"}
              aria-expanded={!isCollapsed}
            >
              <ToggleIcon aria-hidden="true" />
            </button>
            <button className={sidebarCloseStyles} type="button" aria-label="Fechar menu" onClick={onClose}>
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
          <span className={sidebarBrandBadgeStyles({ collapsed: isCollapsed })} aria-hidden={!isCollapsed}>
            CLM
          </span>
        </div>

        <div className={sidebarContentStyles({ collapsed: isCollapsed })}>
          <nav className={sidebarNavStyles} aria-label="Navegacao principal">
            {primaryItems.map(renderNavItem)}
          </nav>

          <div className={sidebarDividerStyles({ collapsed: isCollapsed })} />

          <nav className={sidebarNavStyles} aria-label="Navegacao secundaria">
            {secondaryItems.map(renderNavItem)}
          </nav>
        </div>

        <div className={sidebarFooterStyles({ collapsed: isCollapsed })}>
          <div className={sidebarUserStyles({ collapsed: isCollapsed })}>
            <img className="h-10 w-10 rounded-full object-cover" src={assetUrls.userAvatar} alt="Andressa" />
            <div className={sidebarUserMetaStyles({ collapsed: isCollapsed })}>
              <p className="m-0 text-base leading-6 tracking-[-0.4px] text-[var(--color-content-primary)]">Andressa Mendes</p>
              <p className="m-0 text-sm leading-5 tracking-[-0.35px] text-[var(--color-neutral-600)]">andressa.clm@gmail.com</p>
            </div>
          </div>

          <button className={sidebarLogoutButtonStyles({ collapsed: isCollapsed })} type="button" aria-label="Sair">
            <LogOut className="h-[18px] w-[18px] shrink-0" aria-hidden="true" />
            <span className={cn(isCollapsed ? "hidden max-[960px]:inline" : "inline")}>Sair</span>
          </button>
        </div>
      </aside>
    </>
  );
}
