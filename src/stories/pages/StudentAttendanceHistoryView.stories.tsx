import type { Meta, StoryObj } from "@storybook/react-vite";

import {
  StudentAttendanceHistoryView,
  type StudentAttendanceHistoryRecordView,
} from "@/src/components/StudentAttendanceHistoryView";
import { fullscreenParameters, StorySurface, storyAction } from "../storybook-utils";

const records: StudentAttendanceHistoryRecordView[] = [
  {
    id: "1",
    date: "14/04/2026",
    moduleLabel: "Módulo I",
    moduleTone: "violet",
    className: "Classe 1",
    classTone: "blue",
    status: "Presente",
    note: "Chegou no horário.",
  },
  {
    id: "2",
    date: "10/04/2026",
    moduleLabel: "Módulo I",
    moduleTone: "violet",
    className: "Classe 1",
    classTone: "blue",
    status: "Ausente",
    note: "Falta justificada.",
  },
  {
    id: "3",
    date: "03/04/2026",
    moduleLabel: "Módulo II",
    moduleTone: "orange",
    className: "Teoria",
    classTone: "pink",
    status: "Presente",
  },
];

const meta = {
  title: "Pages/StudentAttendanceHistoryView",
  component: StudentAttendanceHistoryView,
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
} satisfies Meta<typeof StudentAttendanceHistoryView>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
