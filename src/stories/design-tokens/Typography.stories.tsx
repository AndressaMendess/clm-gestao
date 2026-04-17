import type { Meta, StoryObj } from "@storybook/react-vite";

import { StorySurface } from "../storybook-utils";

const textStyles = [
  { label: "Display", size: "var(--text-display-s-size)", lineHeight: "var(--text-display-line-height)", weight: "var(--font-weight-bold)" },
  { label: "Heading H1", size: "var(--text-heading-h1-size)", lineHeight: "var(--text-heading-1-line-height)", weight: "var(--font-weight-semibold)" },
  { label: "Heading H3", size: "var(--text-heading-h3-size)", lineHeight: "var(--text-heading-3-line-height)", weight: "var(--font-weight-semibold)" },
  { label: "Heading H5", size: "var(--text-heading-h5-size)", lineHeight: "var(--text-heading-5-line-height)", weight: "var(--font-weight-semibold)" },
  { label: "Body Large", size: "var(--text-body-large-size)", lineHeight: "var(--text-body-line-height)", weight: "var(--font-weight-regular)" },
  { label: "Body Medium", size: "var(--text-body-medium-size)", lineHeight: "var(--text-body-line-height)", weight: "var(--font-weight-regular)" },
  { label: "Body Small", size: "var(--text-body-small-size)", lineHeight: "var(--text-body-line-height)", weight: "var(--font-weight-medium)" },
];

function TypographyShowcase() {
  return (
    <StorySurface maxWidth={1100} minHeight="100vh">
      <div style={{ display: "grid", gap: 16 }}>
        {textStyles.map((style) => (
          <section
            key={style.label}
            style={{
              border: "1px solid var(--color-border-primary)",
              borderRadius: 16,
              background: "var(--color-surface-card)",
              padding: 20,
              boxShadow: "var(--color-page-shadow)",
            }}
          >
            <div style={{ display: "grid", gap: 8 }}>
              <span style={{ color: "var(--color-content-secondary)", fontSize: "0.85rem" }}>{style.label}</span>
              <p
                style={{
                  margin: 0,
                  fontSize: style.size,
                  lineHeight: style.lineHeight,
                  fontWeight: style.weight,
                  letterSpacing: "var(--tracking-heading)",
                }}
              >
                Escola Livre de Música CLM
              </p>
            </div>
          </section>
        ))}
      </div>
    </StorySurface>
  );
}

const meta = {
  title: "Design Tokens/Typography",
  component: TypographyShowcase,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof TypographyShowcase>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Scale: Story = {};
