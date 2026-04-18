import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { DatePicker } from "./date-picker";

const meta = {
  title: "Design System/Components/Date Picker",
  component: DatePicker,
  tags: ["autodocs"],
  args: {
    label: "Data inicial",
    value: "",
    onChange: () => undefined
  }
} satisfies Meta<typeof DatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    value: "",
    onChange: () => undefined
  },
  render: (args) => {
    const [value, setValue] = useState(args.value);

    return (
      <div style={{ maxWidth: 320 }}>
        <DatePicker {...args} value={value} onChange={(event) => setValue(event.target.value)} />
      </div>
    );
  }
};
