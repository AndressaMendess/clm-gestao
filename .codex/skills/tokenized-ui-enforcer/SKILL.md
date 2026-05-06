---
name: tokenized-ui-enforcer
description: Enforce design-token usage and component reuse in React/CSS codebases. Use when Codex needs to review or refactor hardcoded styles (hex/rgb/hsl colors, fixed font styles, ad-hoc spacing/radius/shadows), replace them with existing color/typography tokens, and prefer existing shared UI components instead of creating new components from scratch.
---

# Tokenized UI Enforcer

Follow this workflow to keep UI code consistent with project tokens and shared components.

## 1) Map the existing design system first

Inspect these sources before editing:

- `src/styles/tokens.css`
- `src/styles/global.css`
- `src/styles/dashboard.css`
- `src/components/ui/`

Use existing tokens and aliases already defined in `tokens.css` before proposing new token names.

## 2) Audit for hardcoded style values

Run:

```powershell
$skillDir = Join-Path $env:USERPROFILE ".codex\skills\tokenized-ui-enforcer"
powershell -ExecutionPolicy Bypass -File (Join-Path $skillDir "scripts\find-hardcoded-styles.ps1") -Root "src"
```

Focus on:

- Color literals: `#xxxxxx`, `rgb(...)`, `rgba(...)`, `hsl(...)`
- Hardcoded text styles: `font-size`, `font-weight`, `line-height`, `letter-spacing`
- Hardcoded visual system values: `border-radius`, `box-shadow`, spacing literals

Ignore false positives in:

- `src/styles/tokens.css`
- Storybook-only files (`*.stories.tsx`)

## 3) Reuse existing components before creating anything new

Run:

```powershell
$skillDir = Join-Path $env:USERPROFILE ".codex\skills\tokenized-ui-enforcer"
powershell -ExecutionPolicy Bypass -File (Join-Path $skillDir "scripts\list-shared-ui-components.ps1") -UiPath "src/components/ui"
```

Before adding a new component:

- Search `src/components/ui/` for an equivalent (`Button`, `Input`, `SelectField`, `Tabs`, `TableCard`, etc.)
- Compose existing components with props and class names
- Only create a new shared component when no existing option can satisfy the use case

If a new shared component is unavoidable, keep API compatible with current naming and styling conventions.

## 4) Refactor strategy

Apply this order:

1. Replace hardcoded colors with semantic tokens first (prefer `--color-*`, fallback to compatibility aliases).
2. Replace hardcoded typography with text tokens (`--text-*`, `--font-weight-*`, tracking tokens).
3. Replace repeated visual primitives with spacing/radius/shadow tokens.
4. Migrate duplicated local markup to existing `src/components/ui` components.

Keep behavior and layout unchanged while refactoring.

## 5) Validate after changes

- Verify no regression in component states (default, hover, focus-visible, disabled, error/success).
- Confirm mobile breakpoints still match existing responsive behavior.
- Re-run hardcoded audit script and ensure new violations are not introduced.

## 6) Output format

When reporting work:

- List files changed.
- List which hardcoded values were replaced and which token each one now uses.
- List which existing shared component replaced custom markup.
- Explicitly justify any remaining hardcoded values.
