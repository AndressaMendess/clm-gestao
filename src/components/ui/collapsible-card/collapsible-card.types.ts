import type { HTMLAttributes, ReactNode } from "react";

export type CollapsibleCardProps = HTMLAttributes<HTMLElement> & {
  title: string;
  icon?: ReactNode;
  badge?: ReactNode;
  description?: ReactNode;
  children: ReactNode;
  defaultOpen?: boolean;
};

