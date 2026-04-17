import type { Meta, StoryObj } from "@storybook/react-vite";

import { StudentsPage } from "@/src/components/StudentsPage";
import { fullscreenParameters, StorySurface } from "../storybook-utils";

const meta = {
  title: "Pages/StudentsPage",
  component: StudentsPage,
  tags: ["autodocs"],
  parameters: fullscreenParameters,
  decorators: [
    (Story) => (
      <StorySurface minHeight="100vh">
        <Story />
      </StorySurface>
    ),
  ],
} satisfies Meta<typeof StudentsPage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
