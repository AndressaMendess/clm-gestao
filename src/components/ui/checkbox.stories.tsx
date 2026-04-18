import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { Checkbox } from "./checkbox";

const meta = {
  title: "Design System/Components/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Controle de selecao binaria para listas e preferencias. Use quando a pessoa usuaria puder marcar uma ou varias opcoes.",
      }
    }
  }
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);

    return (
      <label style={{ display: "inline-flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
        <Checkbox checked={checked} onCheckedChange={(value) => setChecked(value === true)} />
        <span>{checked ? "Selecionado" : "Não selecionado"}</span>
      </label>
    );
  },
  parameters: {
    docs: {
      source: {
        code: `<Checkbox checked={checked} onCheckedChange={(value) => setChecked(value === true)} />`
      }
    }
  }
};

export const Disabled: Story = {
  args: {
    disabled: true
  },
  parameters: {
    docs: {
      source: {
        code: `<Checkbox disabled />`
      }
    }
  }
};
