import type { Meta, StoryObj } from "@storybook/react-vite";

import { StudentsPageEnhanced } from "@/src/components/StudentsPageEnhanced";
import { fullscreenParameters, StorySurface } from "../storybook-utils";

const meta = {
  title: "Pages/StudentsPageEnhanced",
  component: StudentsPageEnhanced,
  tags: ["autodocs"],
  parameters: fullscreenParameters,
  decorators: [
    (Story) => (
      <StorySurface minHeight="100vh">
        <Story />
      </StorySurface>
    ),
  ],
} satisfies Meta<typeof StudentsPageEnhanced>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
