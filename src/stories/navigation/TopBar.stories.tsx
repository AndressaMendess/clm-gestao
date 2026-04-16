import type { Meta, StoryObj } from "@storybook/react-vite";

import { TopBar } from "@/src/components/TopBar";
import { StorySurface, storyAction } from "../storybook-utils";

const meta = {
  title: "Navigation/TopBar",
  component: TopBar,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <StorySurface padding="0">
        <Story />
      </StorySurface>
    ),
  ],
  args: {
    onMenuToggle: storyAction("toggle menu"),
  },
} satisfies Meta<typeof TopBar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
