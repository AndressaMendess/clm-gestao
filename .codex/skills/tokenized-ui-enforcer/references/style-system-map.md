# Style System Map

Use this reference to make consistent replacements.

## Source of truth

- `src/styles/tokens.css` (colors, typography, spacing, radius, shadows)
- `src/styles/global.css` and `src/styles/dashboard.css` (current usage patterns)

## Preferred token families

- Colors: `--color-*` (semantic), `--primitive-*` (raw scale), and compatibility aliases
- Typography:
- Size: `--text-*`
- Weight: `--font-weight-*`
- Tracking/line-height aliases from tokens file
- Layout primitives:
- Spacing: `--spacing-*`
- Radius: `--radius-*`
- Shadows: `--shadow-*` / `--color-*shadow*` aliases

## Shared component inventory

Primary location: `src/components/ui`

Current reusable components include:

- `button.tsx`
- `secondary-button.tsx`
- `input.tsx`
- `select-field.tsx`
- `textarea-field.tsx`
- `search-input.tsx`
- `date-picker.tsx`
- `checkbox.tsx`
- `badge.tsx`
- `status-badge.tsx`
- `pill.tsx`
- `card.tsx`
- `collapsible-card.tsx`
- `table-card.tsx`
- `tabs.tsx`
- `document-upload-field.tsx`

## Replacement guidance

- Prefer semantic tokens over literal values.
- Keep compatibility aliases only when required by existing CSS architecture.
- Prefer component composition (props + className) over duplicating markup and styles.
- If no shared component matches, add one in `src/components/ui` and migrate call sites incrementally.

