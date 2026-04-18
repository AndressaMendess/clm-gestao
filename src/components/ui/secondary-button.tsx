import type { ButtonHTMLAttributes, ReactNode } from "react";

import { Button } from "./button";

type SecondaryButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> & {
  children: ReactNode;
  icon?: ReactNode;
};

export function SecondaryButton({ children, icon, className, ...props }: SecondaryButtonProps) {
  return (
    <Button className={["secondary-button", className].filter(Boolean).join(" ")} icon={icon} size="sm" variant="secondary" {...props}>
      {children}
    </Button>
  );
}
