import type { TextareaHTMLAttributes } from "react";

import { cn } from "@/src/lib/utils";

type TextareaFieldProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  helperText?: string;
  wrapperClassName?: string;
};

export function TextareaField({ label, helperText, className, wrapperClassName, ...props }: TextareaFieldProps) {
  return (
    <label className={cn("textarea-field", wrapperClassName)}>
      <span>{label}</span>
      <textarea className={cn("textarea-field__input", className)} {...props} />
      {helperText ? <small className="textarea-field__helper">{helperText}</small> : null}
    </label>
  );
}
