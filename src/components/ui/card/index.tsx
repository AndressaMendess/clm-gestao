import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "@/src/lib/utils";

type CardProps = HTMLAttributes<HTMLElement> & {
  children: ReactNode;
};

export function Card({ children, className, ...props }: CardProps) {
  return (
    <section className={cn("surface-card", className)} {...props}>
      {children}
    </section>
  );
}
