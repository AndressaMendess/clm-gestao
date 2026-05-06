import { useEffect, useId, useMemo, useRef, useState, type ChangeEvent } from "react";
import { ChevronDown } from "lucide-react";

import { cn } from "@/src/lib/utils";
import {
  selectFieldChevronStyles,
  selectFieldHelperStyles,
  selectFieldLabelStyles,
  selectFieldMenuStyles,
  selectFieldNativeStyles,
  selectFieldOptionStyles,
  selectFieldRootStyles,
  selectFieldTriggerStyles,
  selectFieldValueStyles,
  selectFieldWrapperStyles
} from "./select-field.styles";
import type { SelectFieldProps } from "./select-field.types";
export type {
  SelectFieldHelperTone,
  SelectFieldOption,
  SelectFieldProps,
  SelectFieldVariant
} from "./select-field.types";

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
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);

  const selectedOption = useMemo(
    () => options.find((option) => option.value === value) ?? options[0],
    [options, value]
  );

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handlePointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    window.addEventListener("mousedown", handlePointerDown);
    return () => window.removeEventListener("mousedown", handlePointerDown);
  }, [isOpen]);

  const handleOptionSelect = (nextValue: string) => {
    setIsOpen(false);

    onChange?.({
      target: { value: nextValue },
      currentTarget: { value: nextValue }
    } as unknown as ChangeEvent<HTMLSelectElement>);
  };

  const selectControl = (
    <div ref={rootRef} className={cn(selectFieldRootStyles({ variant, open: isOpen }), className)}>
      <button
        id={selectId}
        type="button"
        aria-label={ariaLabel}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className={selectFieldTriggerStyles({ variant })}
        onClick={() => setIsOpen((current) => !current)}
        disabled={props.disabled}
      >
        <span className={selectFieldValueStyles}>{selectedOption?.label ?? ""}</span>
      </button>
      <ChevronDown className={selectFieldChevronStyles} aria-hidden="true" />

      <select
        aria-hidden="true"
        tabIndex={-1}
        className={selectFieldNativeStyles}
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

      {isOpen ? (
        <ul className={selectFieldMenuStyles} role="listbox" aria-labelledby={selectId}>
          {options.map((option) => {
            const isSelected = option.value === value;

            return (
              <li key={option.value} role="option" aria-selected={isSelected}>
                <button
                  type="button"
                  className={selectFieldOptionStyles({ selected: isSelected })}
                  onClick={() => handleOptionSelect(option.value)}
                >
                  {option.label}
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );

  if (!label && !helperText) {
    return selectControl;
  }

  return (
    <div className={cn(selectFieldWrapperStyles, fieldClassName)}>
      {showLabel && label ? <label htmlFor={selectId} className={selectFieldLabelStyles}>{label}</label> : null}
      {selectControl}
      {helperText ? <small className={selectFieldHelperStyles({ tone: helperTone })}>{helperText}</small> : null}
    </div>
  );
}
