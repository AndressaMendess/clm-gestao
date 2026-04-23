import type { ButtonHTMLAttributes, ReactNode } from "react";

import { cn } from "@/src/lib/utils";
import { Button } from "@/src/components/ui/button";

type SecondaryButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> & {
  children: ReactNode;
  icon?: ReactNode;
};

export function SecondaryButton({ children, icon, className, ...props }: SecondaryButtonProps) {
  return (
    <Button className={cn("secondary-button", className)} icon={icon} size="sm" variant="secondary" {...props}>
      {children}
    </Button>
  );
}

