import type * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import type React from "react";

export type CheckboxVariant = "default" | "success" | "attendance";

export type CheckboxProps = React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> & {
  variant?: CheckboxVariant;
};
