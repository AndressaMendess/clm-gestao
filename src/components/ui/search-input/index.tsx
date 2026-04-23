import type { ChangeEventHandler } from "react";
import { Search } from "lucide-react";

type SearchInputProps = {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  placeholder: string;
  ariaLabel: string;
};

export function SearchInput({ value, onChange, placeholder, ariaLabel }: SearchInputProps) {
  return (
    <label className="search-field">
      <Search aria-hidden="true" />
      <input
        type="text"
        className="search-field__input"
        placeholder={placeholder}
        aria-label={ariaLabel}
        value={value}
        onChange={onChange}
      />
    </label>
  );
}
