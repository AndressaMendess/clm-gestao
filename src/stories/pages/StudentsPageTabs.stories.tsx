import type { Meta, StoryObj } from "@storybook/react-vite";

import { StudentsPageTabs } from "@/src/components/StudentsPageTabs";
import { fullscreenParameters, StorySurface } from "../storybook-utils";

const meta = {
  title: "Pages/StudentsPageTabs",
  component: StudentsPageTabs,
  tags: ["autodocs"],
  parameters: fullscreenParameters,
  decorators: [
    (Story) => (
      <StorySurface minHeight="100vh">
        <Story />
      </StorySurface>
    ),
  ],
} satisfies Meta<typeof StudentsPageTabs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
