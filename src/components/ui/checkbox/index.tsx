import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";

import { cn } from "@/src/lib/utils";

type CheckboxVariant = "default" | "success";

type CheckboxProps = React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> & {
  variant?: CheckboxVariant;
};

const checkedStateClassesByVariant: Record<CheckboxVariant, string> = {
  default:
    "data-[state=checked]:!border-primary data-[state=checked]:!bg-primary data-[state=checked]:!text-primary-foreground",
  success:
    "data-[state=checked]:!border-[var(--color-feedback-success-content)] data-[state=checked]:!bg-[var(--color-feedback-success-content)] data-[state=checked]:!text-[var(--color-content-always-light)]",
};

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(({ className, variant = "default", ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "peer h-4 w-4 shrink-0 rounded-[4px] border border-[var(--color-border-secondary)] !bg-white shadow-xs outline-none transition-colors transition-shadow hover:border-[var(--color-border-tertiary)] focus-visible:ring-2 focus-visible:ring-ring/30 disabled:cursor-not-allowed disabled:opacity-50",
      checkedStateClassesByVariant[variant],
      className,
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator className="flex items-center justify-center text-current">
      <Check className="size-3.5" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));

Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
