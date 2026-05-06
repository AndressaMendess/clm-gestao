import type { VariantProps } from "class-variance-authority";
import type * as React from "react";
import type { badgeVariants } from "./badge.styles";

export type BadgeProps = React.HTMLAttributes<HTMLSpanElement> &
  VariantProps<typeof badgeVariants> & {
    icon?: React.ReactNode;
  };
