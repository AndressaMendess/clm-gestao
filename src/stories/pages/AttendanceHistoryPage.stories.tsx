import type { Meta, StoryObj } from "@storybook/react-vite";

import { AttendanceHistoryPage } from "@/src/components/AttendanceHistoryPage";
import { attendanceHistory } from "@/src/data/attendance";
import { fullscreenParameters, StorySurface, storyAction } from "../storybook-utils";

const meta = {
  title: "Pages/AttendanceHistoryPage",
  component: AttendanceHistoryPage,
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
    entries: attendanceHistory,
    onStartAttendance: storyAction("start attendance"),
  },
} satisfies Meta<typeof AttendanceHistoryPage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
