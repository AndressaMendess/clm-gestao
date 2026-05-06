import type { InputHTMLAttributes } from "react";

export type InputHelperTone = "default" | "error" | "success";

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  showLabel?: boolean;
  helperText?: string;
  helperTone?: InputHelperTone;
  fieldClassName?: string;
};
