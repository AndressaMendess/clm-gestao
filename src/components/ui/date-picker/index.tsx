import { cn } from "@/src/lib/utils";
import {
  datePickerFieldInputStyles,
  datePickerFieldLabelStyles,
  datePickerFieldWrapperStyles
} from "./date-picker.styles";
import type { DatePickerProps } from "./date-picker.types";
export type { DatePickerProps } from "./date-picker.types";

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
      className={cn(datePickerFieldInputStyles, className)}
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
    <label className={cn(datePickerFieldWrapperStyles, wrapperClassName)}>
      <span className={datePickerFieldLabelStyles}>{label}</span>
      {content}
    </label>
  );
}
