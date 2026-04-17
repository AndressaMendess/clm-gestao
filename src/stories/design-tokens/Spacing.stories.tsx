import type { Meta, StoryObj } from "@storybook/react-vite";

import { StorySurface } from "../storybook-utils";

const spacingTokens = [
  "--spacing-2",
  "--spacing-4",
  "--spacing-6",
  "--spacing-8",
  "--spacing-12",
  "--spacing-16",
  "--spacing-20",
  "--spacing-24",
  "--spacing-32",
];

function SpacingShowcase() {
  return (
    <StorySurface maxWidth={1000} minHeight="100vh">
      <div style={{ display: "grid", gap: 16 }}>
        {spacingTokens.map((token) => (
          <article
            key={token}
            style={{
              display: "grid",
              gridTemplateColumns: "180px minmax(0, 1fr)",
              alignItems: "center",
              gap: 16,
              border: "1px solid var(--color-border-primary)",
              borderRadius: 16,
              padding: 18,
              background: "var(--color-surface-card)",
              boxShadow: "var(--color-page-shadow)",
            }}
          >
            <strong>{token.replace("--", "")}</strong>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div
                style={{
                  width: `var(${token})`,
                  minWidth: `var(${token})`,
                  height: 16,
                  borderRadius: 999,
                  background: "var(--color-brand-primary-main)",
                }}
              />
              <span style={{ color: "var(--color-content-secondary)" }}>{`var(${token})`}</span>
            </div>
          </article>
        ))}
      </div>
    </StorySurface>
  );
}

const meta = {
  title: "Design Tokens/Spacing",
  component: SpacingShowcase,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof SpacingShowcase>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Scale: Story = {};
