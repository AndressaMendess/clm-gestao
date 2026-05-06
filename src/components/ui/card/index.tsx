import { cn } from "@/src/lib/utils";
import { cardStyles } from "./card.styles";
import type { CardProps } from "./card.types";
export type { CardProps } from "./card.types";

export function Card({ children, className, ...props }: CardProps) {
  return (
    <section className={cn(cardStyles, className)} {...props}>
      {children}
    </section>
  );
}
