import type { Meta, StoryObj } from "@storybook/react-vite";

import { AttendanceCallPage } from "@/src/components/AttendanceCallPage";
import { fullscreenParameters, StorySurface, storyAction } from "../storybook-utils";

const meta = {
  title: "Pages/AttendanceCallPage",
  component: AttendanceCallPage,
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
    classId: 101,
    onBack: storyAction("back"),
    onFinish: storyAction("finish attendance"),
  },
} satisfies Meta<typeof AttendanceCallPage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
