import { Plus } from "lucide-react";
import type { Meta, StoryObj } from "@storybook/react";

import { Button, IconButton } from "@/src/components/ui/button";

const meta = {
  title: "Design System/Components/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Botao primario laranja usado para a principal acao de cada contexto da dashboard.",
      },
    },
  },
  args: {
    children: "Adicionar aluno",
  },
  argTypes: {
    onClick: { action: "clicked" },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  parameters: {
    docs: {
      source: {
        code: `<Button icon={<Plus aria-hidden="true" />}>Adicionar aluno</Button>`,
      },
    },
  },
  render: (args) => <Button {...args} icon={<Plus aria-hidden="true" />} />,
};

export const WithoutIcon: Story = {
  args: {
    children: "Salvar",
  },
  parameters: {
    docs: {
      source: {
        code: `<Button>Salvar</Button>`,
      },
    },
  },
};

export const IconOnly: Story = {
  render: () => <IconButton icon={<Plus aria-hidden="true" />} label="Adicionar aluno" />
};

