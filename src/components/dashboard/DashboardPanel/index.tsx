import { cn } from "@/src/lib/utils";
import {
  dashboardPanelHeaderStyles,
  dashboardPanelStyles,
  dashboardPanelTitleStyles
} from "./dashboard-panel.styles";
import type { DashboardPanelProps } from "./dashboard-panel.types";
export type { DashboardPanelProps } from "./dashboard-panel.types";

export function DashboardPanel({ title, action, compactHeader = false, className = "", children }: DashboardPanelProps) {
  return (
    <section className={cn(dashboardPanelStyles, className)}>
      <header className={dashboardPanelHeaderStyles({ compact: compactHeader })}>
        <h2 className={dashboardPanelTitleStyles}>{title}</h2>
        {action}
      </header>
      {children}
    </section>
  );
}
