import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";

import { cn } from "@/src/lib/utils";
import { checkboxIconStyles, checkboxIndicatorStyles, checkboxStyles } from "./checkbox.styles";
import type { CheckboxProps } from "./checkbox.types";
export type { CheckboxProps, CheckboxVariant } from "./checkbox.types";

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(({ className, variant = "default", ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(checkboxStyles({ variant }), className)}
    {...props}
  >
    <CheckboxPrimitive.Indicator className={checkboxIndicatorStyles}>
      <Check className={checkboxIconStyles} />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));

Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
