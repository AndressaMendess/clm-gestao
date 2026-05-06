import * as React from "react";

import { cn } from "@/src/lib/utils";
import { badgeDotStyles, badgeIconStyles, badgeVariants } from "./badge.styles";
import type { BadgeProps } from "./badge.types";
export type { BadgeProps } from "./badge.types";

function Badge({ className, variant, appearance, icon, children, ...props }: BadgeProps) {
  const resolvedAppearance = appearance ?? (icon ? "icon" : "default");
  const shouldShowDot = resolvedAppearance === "dot";
  const shouldShowIcon = resolvedAppearance === "icon" && Boolean(icon);

  return (
    <span className={cn(badgeVariants({ variant, appearance: resolvedAppearance }), className)} {...props}>
      {shouldShowDot ? <span className={badgeDotStyles} aria-hidden="true" /> : null}
      {shouldShowIcon ? (
        <span className={badgeIconStyles} aria-hidden="true">
          {icon}
        </span>
      ) : null}
      {children}
    </span>
  );
}

export { Badge, badgeVariants };
