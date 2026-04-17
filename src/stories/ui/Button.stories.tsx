import type { Meta, StoryObj } from "@storybook/react-vite";
import { Plus } from "lucide-react";

import { Button } from "@/src/components/ui/button";
import { StorySurface } from "../storybook-utils";

const meta = {
  title: "UI/Button",
  component: Button,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <StorySurface padding="32px">
        <Story />
      </StorySurface>
    ),
  ],
  args: {
    children: "Salvar alterações",
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const Outline: Story = {
  args: {
    variant: "outline",
    children: "Editar cadastro",
  },
};

export const Ghost: Story = {
  args: {
    variant: "ghost",
    children: "Cancelar",
  },
};

export const WithIcon: Story = {
  args: {
    children: (
      <>
        <Plus />
        Adicionar aluno
      </>
    ),
  },
};
