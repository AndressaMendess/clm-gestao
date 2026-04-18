import { Upload } from "lucide-react";
import type { Meta, StoryObj } from "@storybook/react";

import { SecondaryButton } from "./secondary-button";

const meta = {
  title: "Design System/Components/Secondary Button",
  component: SecondaryButton,
  tags: ["autodocs"],
  args: {
    children: "Adicionar documento"
  },
  parameters: {
    docs: {
      description: {
        component:
          "Botão secundário para ações complementares dentro de cards e blocos colapsáveis.",
      },
    },
  },
} satisfies Meta<typeof SecondaryButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => (
    <SecondaryButton {...args} icon={<Upload aria-hidden="true" />}>
      Adicionar documento
    </SecondaryButton>
  ),
};
