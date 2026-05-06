import type { SelectHTMLAttributes } from "react";

export type SelectFieldOption = {
  value: string;
  label: string;
};

export type SelectFieldHelperTone = "default" | "error" | "success";
export type SelectFieldVariant = "filter" | "form";

export type SelectFieldProps = {
  value: string;
  ariaLabel: string;
  options: SelectFieldOption[];
  onChange: SelectHTMLAttributes<HTMLSelectElement>["onChange"];
  variant?: SelectFieldVariant;
  className?: string;
  label?: string;
  showLabel?: boolean;
  helperText?: string;
  helperTone?: SelectFieldHelperTone;
  fieldClassName?: string;
} & Omit<SelectHTMLAttributes<HTMLSelectElement>, "value" | "onChange" | "aria-label">;
