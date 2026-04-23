import { Upload } from "lucide-react";
import type { Meta, StoryObj } from "@storybook/react";

import { SecondaryButton } from "@/src/components/ui/secondary-button";

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
          "BotÃ£o secundÃ¡rio para aÃ§Ãµes complementares dentro de cards e blocos colapsÃ¡veis.",
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

