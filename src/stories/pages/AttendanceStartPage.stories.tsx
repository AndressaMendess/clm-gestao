import type { Meta, StoryObj } from "@storybook/react-vite";

import { AttendanceStartPage } from "@/src/components/AttendanceStartPage";
import { fullscreenParameters, StorySurface, storyAction } from "../storybook-utils";

const meta = {
  title: "Pages/AttendanceStartPage",
  component: AttendanceStartPage,
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
    onBack: storyAction("back"),
    onSelectClass: storyAction("select class"),
  },
} satisfies Meta<typeof AttendanceStartPage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
