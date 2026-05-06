import { cva } from "class-variance-authority";

export const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-full border text-xs font-medium whitespace-nowrap",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary/10 text-primary",
        success: "border-transparent bg-emerald-50 text-emerald-700",
        error: "border-transparent bg-rose-50 text-rose-700",
        warning: "border-transparent bg-amber-50 text-amber-700",
        violet: "border-transparent bg-violet-50 text-violet-700",
        orange: "border-transparent bg-orange-50 text-orange-600",
        blue: "border-transparent bg-sky-50 text-sky-700",
        pink: "border-transparent bg-pink-50 text-pink-700",
        subtle: "border-transparent bg-secondary text-secondary-foreground"
      },
      appearance: {
        default: "px-2 py-0.5",
        dot: "gap-1.5 py-0.5 pl-1.5 pr-2",
        icon: "gap-1.5 py-0.5 pl-1.5 pr-2"
      }
    },
    defaultVariants: {
      variant: "default",
      appearance: "default"
    }
  }
);

export const badgeDotStyles = "badge__dot";
export const badgeIconStyles = "badge__icon";
