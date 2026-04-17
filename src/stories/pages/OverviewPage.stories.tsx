import type { Meta, StoryObj } from "@storybook/react-vite";

import { OverviewPage } from "@/src/components/OverviewPage";
import { fullscreenParameters, StorySurface, storyAction } from "../storybook-utils";

const meta = {
  title: "Pages/OverviewPage",
  component: OverviewPage,
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
    onOpenAttendanceStart: storyAction("open attendance start"),
    onOpenStudents: storyAction("open students"),
    onOpenAttendanceHistory: storyAction("open attendance history"),
  },
} satisfies Meta<typeof OverviewPage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
