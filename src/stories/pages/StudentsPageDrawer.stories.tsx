import type { Meta, StoryObj } from "@storybook/react-vite";

import { StudentsPageDrawer } from "@/src/components/StudentsPageDrawer";
import { fullscreenParameters, StorySurface } from "../storybook-utils";

const meta = {
  title: "Pages/StudentsPageDrawer",
  component: StudentsPageDrawer,
  tags: ["autodocs"],
  parameters: fullscreenParameters,
  decorators: [
    (Story) => (
      <StorySurface minHeight="100vh">
        <Story />
      </StorySurface>
    ),
  ],
} satisfies Meta<typeof StudentsPageDrawer>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
