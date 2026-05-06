import type { LucideIcon } from "lucide-react";

export type DashboardActionCardTone = "primary" | "purple" | "green";

export type DashboardActionCardProps = {
  title: string;
  description: string;
  icon: LucideIcon;
  tone: DashboardActionCardTone;
  onClick: () => void;
};
