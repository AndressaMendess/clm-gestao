import type { ReactNode } from "react";

export type TableCardProps = {
  title: string;
  countLabel: string;
  children: ReactNode;
  titleId?: string;
  className?: string;
};
