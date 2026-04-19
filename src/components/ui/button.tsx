import type { ButtonHTMLAttributes, ReactNode } from "react";

import { cn } from "@/src/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger" | "icon";
type ButtonSize = "sm" | "md" | "icon";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children?: ReactNode;
  icon?: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
};

export function Button({
  children,
  icon,
  className,
  type = "button",
  variant = "primary",
  size = variant === "icon" ? "icon" : "md",
  ...props
}: ButtonProps) {
  const isIconOnly = variant === "icon" || size === "icon";

  return (
    <button
      className={cn("button", `button--${variant}`, `button--${size}`, isIconOnly && "button--icon-only", className)}
      type={type}
      {...props}
    >
      {icon ? <span className="button__icon">{icon}</span> : null}
      {!isIconOnly && children ? <span className="button__label">{children}</span> : null}
    </button>
  );
}

type IconButtonProps = Omit<ButtonProps, "children" | "size" | "variant"> & {
  icon: ReactNode;
  label: string;
};

export function IconButton({ icon, label, className, ...props }: IconButtonProps) {
  return (
    <Button
      aria-label={label}
      className={cn("icon-button", className)}
      icon={icon}
      size="icon"
      variant="icon"
      {...props}
    />
  );
}
