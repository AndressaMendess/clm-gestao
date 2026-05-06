import { cva } from "class-variance-authority";

export const pillStyles = cva("pill", {
  variants: {
    tone: {
      violet: "pill--violet",
      orange: "pill--orange",
      blue: "pill--blue",
      pink: "pill--pink"
    }
  },
  defaultVariants: {
    tone: "violet"
  }
});
