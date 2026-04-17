import type { Meta, StoryObj } from "@storybook/react-vite";

import { Badge } from "@/src/components/ui/badge";
import { StorySurface } from "../storybook-utils";

const meta = {
  title: "UI/Badge",
  component: Badge,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <StorySurface padding="32px">
        <Story />
      </StorySurface>
    ),
  ],
} satisfies Meta<typeof Badge>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Variants: Story = {
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
      <Badge variant="default">Default</Badge>
      <Badge variant="success">Ativo</Badge>
      <Badge variant="error">Inativo</Badge>
      <Badge variant="violet">Módulo I</Badge>
      <Badge variant="orange">Módulo II</Badge>
      <Badge variant="blue">Classe 1</Badge>
      <Badge variant="pink">Classe 2</Badge>
      <Badge variant="subtle">Neutro</Badge>
    </div>
  ),
};
