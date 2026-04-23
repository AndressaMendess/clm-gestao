import * as React from "react";

import { cn } from "@/src/lib/utils";

type InputHelperTone = "default" | "error" | "success";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  showLabel?: boolean;
  helperText?: string;
  helperTone?: InputHelperTone;
  fieldClassName?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      label,
      showLabel = true,
      helperText,
      helperTone = "default",
      fieldClassName,
      id,
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId();
    const inputId = id ?? generatedId;

    const input = (
    <input
        id={inputId}
      type={type}
      className={cn("input-field", className)}
      ref={ref}
      {...props}
    />
    );

    if (!label && !helperText) {
      return input;
    }

    return (
      <label className={cn("input-field-wrapper", fieldClassName)} htmlFor={inputId}>
        {showLabel && label ? <span className="input-field-wrapper__label">{label}</span> : null}
        {input}
        {helperText ? (
          <small className={cn("input-field-wrapper__helper", `is-${helperTone}`)}>{helperText}</small>
        ) : null}
      </label>
    );
  }
);

Input.displayName = "Input";

export { Input };
