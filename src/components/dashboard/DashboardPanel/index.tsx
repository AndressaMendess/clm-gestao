import type { ReactNode } from "react";

type DashboardPanelProps = {
  title: string;
  action?: ReactNode;
  compactHeader?: boolean;
  className?: string;
  children: ReactNode;
};

export function DashboardPanel({ title, action, compactHeader = false, className = "", children }: DashboardPanelProps) {
  return (
    <section className={`dashboard-panel ${className}`.trim()}>
      <header className={`dashboard-panel__header ${compactHeader ? "dashboard-panel__header--compact" : ""}`.trim()}>
        <h2>{title}</h2>
        {action}
      </header>
      {children}
    </section>
  );
}
