import type { ReactNode } from "react";

export type DashboardPanelProps = {
  title: string;
  action?: ReactNode;
  compactHeader?: boolean;
  className?: string;
  children: ReactNode;
};
