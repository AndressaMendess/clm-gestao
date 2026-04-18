import type { Meta, StoryObj } from "@storybook/react";

import { Card } from "./card";

const meta = {
  title: "Design System/Components/Card",
  component: Card,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Superfície base para blocos de conteúdo. O estilo visual é fixo e apenas o conteúdo interno muda.",
      },
    },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    children: "Conteúdo do card"
  },
  render: () => (
    <Card style={{ maxWidth: 520 }}>
      <h3 className="student-card__title">Informações Familiares</h3>
      <div className="student-card__stack">
        <div className="student-field">
          <span className="student-field__label">Nome do pai</span>
          <span className="student-field__value">-</span>
        </div>
        <div className="student-field">
          <span className="student-field__label">Nome da mãe</span>
          <span className="student-field__value">-</span>
        </div>
      </div>
    </Card>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Card>
  <h3>Informações Familiares</h3>
  {/* conteúdo interno */}
</Card>`,
      },
    },
  },
};
