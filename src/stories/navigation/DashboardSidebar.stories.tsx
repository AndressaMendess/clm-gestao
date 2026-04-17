import type { Meta, StoryObj } from "@storybook/react-vite";

import { DashboardSidebar } from "@/src/components/DashboardSidebar";
import { SidebarSurface, storyAction } from "../storybook-utils";

const meta = {
  title: "Navigation/DashboardSidebar",
  component: DashboardSidebar,
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
    activePage: "overview",
    collapsed: false,
    isOpen: true,
    onClose: storyAction("close sidebar"),
    onToggleCollapsed: storyAction("toggle collapsed"),
    onNavigate: storyAction("navigate"),
  },
} satisfies Meta<typeof DashboardSidebar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DesktopExpanded: Story = {
  args: {
    isOpen: false,
  },
};

export const MobileOpen: Story = {};

export const DesktopCollapsed: Story = {
  args: {
    collapsed: true,
    isOpen: false,
  },
};
