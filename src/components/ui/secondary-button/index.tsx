import { Button } from "@/src/components/ui/button";
import { cn } from "@/src/lib/utils";
import { secondaryButtonStyles } from "./secondary-button.styles";
import type { SecondaryButtonProps } from "./secondary-button.types";

export type { SecondaryButtonProps } from "./secondary-button.types";

export function SecondaryButton({ children, icon, className, ...props }: SecondaryButtonProps) {
  return (
    <Button className={cn(secondaryButtonStyles(), className)} icon={icon} size="sm" variant="secondary" {...props}>
      {children}
    </Button>
  );
}

