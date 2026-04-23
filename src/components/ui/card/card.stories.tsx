import type { Meta, StoryObj } from "@storybook/react";

import { Card } from "@/src/components/ui/card";

const meta = {
  title: "Design System/Components/Card",
  component: Card,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "SuperfÃ­cie base para blocos de conteÃºdo. O estilo visual Ã© fixo e apenas o conteÃºdo interno muda.",
      },
    },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    children: "ConteÃºdo do card"
  },
  render: () => (
    <Card style={{ maxWidth: 520 }}>
      <h3 className="student-card__title">InformaÃ§Ãµes Familiares</h3>
      <div className="student-card__stack">
        <div className="student-field">
          <span className="student-field__label">Nome do pai</span>
          <span className="student-field__value">-</span>
        </div>
        <div className="student-field">
          <span className="student-field__label">Nome da mÃ£e</span>
          <span className="student-field__value">-</span>
        </div>
      </div>
    </Card>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Card>
  <h3>InformaÃ§Ãµes Familiares</h3>
  {/* conteÃºdo interno */}
</Card>`,
      },
    },
  },
};

