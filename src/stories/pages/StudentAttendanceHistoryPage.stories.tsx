import type { Meta, StoryObj } from "@storybook/react-vite";

import {
  StudentAttendanceHistoryPage,
  type StudentAttendanceHistoryRecord,
} from "@/src/components/StudentAttendanceHistoryPage";
import { fullscreenParameters, StorySurface, storyAction } from "../storybook-utils";

const records: StudentAttendanceHistoryRecord[] = [
  {
    id: "1",
    date: "14/04/2026",
    className: "Módulo I - Classe 1",
    status: "Presente",
    note: "Chegou no horário.",
  },
  {
    id: "2",
    date: "10/04/2026",
    className: "Módulo I - Classe 1",
    status: "Ausente",
    note: "Falta justificada.",
  },
];

const meta = {
  title: "Pages/StudentAttendanceHistoryPage",
  component: StudentAttendanceHistoryPage,
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
    studentName: "Ana Carolina Souza",
    records,
    onBack: storyAction("back"),
  },
} satisfies Meta<typeof StudentAttendanceHistoryPage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
