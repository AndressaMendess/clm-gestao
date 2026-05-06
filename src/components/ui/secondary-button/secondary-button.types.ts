import type { ButtonHTMLAttributes, ReactNode } from "react";

export type SecondaryButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> & {
  children: ReactNode;
  icon?: ReactNode;
};

