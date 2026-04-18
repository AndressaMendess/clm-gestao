import { useId, type SelectHTMLAttributes } from "react";
import { ChevronDown } from "lucide-react";

import { cn } from "@/src/lib/utils";

export type SelectFieldOption = {
  value: string;
  label: string;
};

type SelectFieldProps = {
  value: string;
  ariaLabel: string;
  options: SelectFieldOption[];
  onChange: SelectHTMLAttributes<HTMLSelectElement>["onChange"];
  variant?: "filter" | "form";
  className?: string;
  label?: string;
  showLabel?: boolean;
  helperText?: string;
  helperTone?: "default" | "error" | "success";
  fieldClassName?: string;
} & Omit<SelectHTMLAttributes<HTMLSelectElement>, "value" | "onChange" | "aria-label">;

export function SelectField({
  value,
  ariaLabel,
  options,
  onChange,
  variant = "filter",
  className,
  label,
  showLabel = true,
  helperText,
  helperTone = "default",
  fieldClassName,
  id,
  ...props
}: SelectFieldProps) {
  const generatedId = useId();
  const selectId = id ?? generatedId;

  const selectControl = (
    <div className={cn("select-field", `select-field--${variant}`, className)}>
      <select
        id={selectId}
        aria-label={ariaLabel}
        className={cn("select-field__select", variant === "filter" && "filter-button__select")}
        value={value}
        onChange={onChange}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDown className="select-field__chevron" aria-hidden="true" />
    </div>
  );

  if (!label && !helperText) {
    return selectControl;
  }

  return (
    <div className={cn("select-field-wrapper", fieldClassName)}>
      {showLabel && label ? <label htmlFor={selectId} className="select-field-wrapper__label">{label}</label> : null}
      {selectControl}
      {helperText ? <small className={cn("select-field-wrapper__helper", `is-${helperTone}`)}>{helperText}</small> : null}
    </div>
  );
}
