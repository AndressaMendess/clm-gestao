import type { Meta, StoryObj } from "@storybook/react-vite";

import { AppSidebar } from "@/src/components/AppSidebar";
import { SidebarSurface, storyAction } from "../storybook-utils";

const meta = {
  title: "Navigation/AppSidebar",
  component: AppSidebar,
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
  args: {
    activeItem: "students",
    collapsed: false,
    onToggleCollapsed: storyAction("toggle collapsed"),
  },
} satisfies Meta<typeof AppSidebar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Expanded: Story = {};

export const Collapsed: Story = {
  args: {
    collapsed: true,
  },
};
