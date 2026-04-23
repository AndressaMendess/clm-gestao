import type { ChangeEventHandler, InputHTMLAttributes } from "react";

import { cn } from "@/src/lib/utils";

type DatePickerProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "onChange" | "value"> & {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  label?: string;
  wrapperClassName?: string;
};

export function DatePicker({ value, onChange, label, className, wrapperClassName, onKeyDown, ...props }: DatePickerProps) {
  const openNativePicker = (event: { currentTarget: HTMLInputElement }) => {
    const input = event.currentTarget as HTMLInputElement & { showPicker?: () => void };

    if (typeof input.showPicker === "function") {
      try {
        input.showPicker();
      } catch {
        // Keep native behavior when showPicker is blocked by browser policy.
      }
    }
  };

  const content = (
    <input
      {...props}
      type="date"
      value={value}
      onChange={onChange}
      className={cn("input-field date-picker-field__input", className)}
      onFocus={openNativePicker}
      onClick={openNativePicker}
      onKeyDown={(event) => {
        onKeyDown?.(event);
        if (event.key === "Enter" || event.key === " " || event.key === "ArrowDown") {
          openNativePicker(event);
        }
      }}
    />
  );

  if (!label) {
    return content;
  }

  return (
    <label className={cn("date-picker-field", wrapperClassName)}>
      <span>{label}</span>
      {content}
    </label>
  );
}
