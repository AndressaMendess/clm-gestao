import type { Meta, StoryObj } from "@storybook/react-vite";

import { Checkbox } from "@/src/components/ui/checkbox";
import { StorySurface } from "../storybook-utils";

const meta = {
  title: "UI/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <StorySurface padding="32px">
        <Story />
      </StorySurface>
    ),
  ],
} satisfies Meta<typeof Checkbox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const States: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 16 }}>
      <label style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <Checkbox defaultChecked />
        <span>Selecionado</span>
      </label>
      <label style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <Checkbox />
        <span>Não selecionado</span>
      </label>
      <label style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <Checkbox disabled />
        <span>Desabilitado</span>
      </label>
    </div>
  ),
};
