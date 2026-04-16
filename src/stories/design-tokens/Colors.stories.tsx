import type { Meta, StoryObj } from "@storybook/react-vite";

import { StorySurface } from "../storybook-utils";

const colorGroups = [
  {
    name: "Brand",
    tokens: [
      "--color-brand-primary-subtle",
      "--color-brand-primary-main",
      "--color-brand-primary-strong",
      "--color-brand-secondary-subtle",
      "--color-brand-secondary-main",
      "--color-brand-secondary-strong",
    ],
  },
  {
    name: "Background",
    tokens: [
      "--color-background-primary",
      "--color-background-secondary",
      "--color-background-tertiary",
      "--color-surface-card",
      "--color-surface-header",
    ],
  },
  {
    name: "Content",
    tokens: [
      "--color-content-primary",
      "--color-content-secondary",
      "--color-content-tertiary",
      "--color-content-inverse",
    ],
  },
  {
    name: "Feedback",
    tokens: [
      "--color-feedback-success-background",
      "--color-feedback-warning-background",
      "--color-feedback-error-background",
      "--color-feedback-info-background",
    ],
  },
];

function ColorsShowcase() {
  return (
    <StorySurface maxWidth={1200} minHeight="100vh">
      <div style={{ display: "grid", gap: 24 }}>
        {colorGroups.map((group) => (
          <section key={group.name} style={{ display: "grid", gap: 12 }}>
            <h2 style={{ margin: 0, fontSize: "1.25rem" }}>{group.name}</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16 }}>
              {group.tokens.map((token) => (
                <article
                  key={token}
                  style={{
                    border: "1px solid var(--color-border-primary)",
                    borderRadius: 16,
                    overflow: "hidden",
                    background: "var(--color-surface-card)",
                    boxShadow: "var(--color-page-shadow)",
                  }}
                >
                  <div style={{ height: 112, background: `var(${token})` }} />
                  <div style={{ padding: 14, display: "grid", gap: 4 }}>
                    <strong style={{ fontSize: "0.95rem" }}>{token.replace("--", "")}</strong>
                    <span style={{ color: "var(--color-content-secondary)", fontSize: "0.85rem" }}>
                      {`var(${token})`}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>
    </StorySurface>
  );
}

const meta = {
  title: "Design Tokens/Colors",
  component: ColorsShowcase,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof ColorsShowcase>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Palette: Story = {};
