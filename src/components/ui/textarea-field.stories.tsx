import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { TextareaField } from "./textarea-field";

const meta = {
  title: "Design System/Components/Textarea Field",
  component: TextareaField,
  tags: ["autodocs"],
  args: {
    label: "Observação",
    placeholder: "Adicione observações sobre a justificativa...",
    rows: 4
  }
} satisfies Meta<typeof TextareaField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => {
    const [value, setValue] = useState("");
    return (
      <div style={{ maxWidth: 640 }}>
        <TextareaField {...args} value={value} onChange={(event) => setValue(event.target.value)} />
      </div>
    );
  }
};
