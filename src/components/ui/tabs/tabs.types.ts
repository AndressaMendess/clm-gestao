import type * as TabsPrimitive from "@radix-ui/react-tabs";
import type React from "react";

export type TabsVariant = "default" | "drawer" | "pill";

export type TabsListProps = React.ComponentPropsWithoutRef<typeof TabsPrimitive.List> & {
  variant?: TabsVariant;
};

export type TabsTriggerProps = React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> & {
  variant?: TabsVariant;
};

export type TabsContentProps = React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>;
