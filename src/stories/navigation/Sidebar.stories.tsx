import type { Meta, StoryObj } from "@storybook/react-vite";

import { Sidebar } from "@/src/components/Sidebar";
import { SidebarSurface } from "../storybook-utils";

const meta = {
  title: "Navigation/Sidebar",
  component: Sidebar,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <SidebarSurface>
        <Story />
      </SidebarSurface>
    ),
  ],
} satisfies Meta<typeof Sidebar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
