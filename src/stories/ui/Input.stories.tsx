import type { Meta, StoryObj } from "@storybook/react-vite";

import { Input } from "@/src/components/ui/input";
import { StorySurface } from "../storybook-utils";

const meta = {
  title: "UI/Input",
  component: Input,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <StorySurface padding="32px" maxWidth={520}>
        <Story />
      </StorySurface>
    ),
  ],
  args: {
    placeholder: "Buscar por nome, telefone ou email...",
  },
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Filled: Story = {
  args: {
    defaultValue: "Ana Carolina Souza",
  },
};

export const Disabled: Story = {
  args: {
    defaultValue: "Campo bloqueado",
    disabled: true,
  },
};
