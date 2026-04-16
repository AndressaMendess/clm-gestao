import type { Meta, StoryObj } from "@storybook/react-vite";

import { AttendancePage } from "@/src/components/AttendancePage";
import { fullscreenParameters, StorySurface } from "../storybook-utils";

const meta = {
  title: "Pages/AttendancePage",
  component: AttendancePage,
  tags: ["autodocs"],
  parameters: fullscreenParameters,
  decorators: [
    (Story) => (
      <StorySurface minHeight="100vh">
        <Story />
      </StorySurface>
    ),
  ],
  args: {
    initialView: "history",
  },
} satisfies Meta<typeof AttendancePage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const History: Story = {};

export const Start: Story = {
  args: {
    initialView: "start",
  },
};
