import { cn } from "@/src/lib/utils";
import { buttonStyles, iconButtonStyles } from "./button.styles";
import type { ButtonProps, IconButtonProps } from "./button.types";

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
      className={cn(buttonStyles({ variant, size }), isIconOnly && "button--icon-only", className)}
      type={type}
      {...props}
    >
      {icon ? <span className="button__icon inline-flex h-5 w-5 shrink-0 items-center justify-center">{icon}</span> : null}
      {!isIconOnly && children ? <div className="button__label inline-flex items-center">{children}</div> : null}
    </button>
  );
}

export function IconButton({ icon, label, className, ...props }: IconButtonProps) {
  return (
    <Button
      aria-label={label}
      className={cn(iconButtonStyles, className)}
      icon={icon}
      size="icon"
      variant="icon"
      {...props}
    />
  );
}
