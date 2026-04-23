import type { Meta, StoryObj } from "@storybook/react";
import { AlertCircle, CheckCircle2 } from "lucide-react";

import { Badge } from "@/src/components/ui/badge";

const meta = {
  title: "Design System/Components/Badge",
  component: Badge,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Badge para status, tags e metadados de baixa densidade. Use para reforcar contexto sem competir com a acao principal.",
      }
    }
  },
  args: {
    children: "Ativo",
    variant: "success",
    appearance: "default"
  }
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  parameters: {
    docs: {
      source: {
        code: `<Badge variant="success">Ativo</Badge>`
      }
    }
  }
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
      <Badge variant="default">Default</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="error">Error</Badge>
      <Badge variant="violet">Violet</Badge>
      <Badge variant="orange">Orange</Badge>
      <Badge variant="blue">Blue</Badge>
      <Badge variant="pink">Pink</Badge>
      <Badge variant="subtle">Subtle</Badge>
      <Badge variant="warning">Warning</Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Matriz de variacoes para diferentes contextos semanticos."
      },
      source: {
        code: `<Badge variant="default">Default</Badge>
<Badge variant="success">Success</Badge>
<Badge variant="error">Error</Badge>
<Badge variant="violet">Violet</Badge>
<Badge variant="orange">Orange</Badge>
<Badge variant="blue">Blue</Badge>
<Badge variant="pink">Pink</Badge>
<Badge variant="subtle">Subtle</Badge>
<Badge variant="warning">Warning</Badge>`
      }
    }
  }
};

export const WithDot: Story = {
  args: {
    variant: "success",
    appearance: "dot",
    children: "Ativo"
  }
};

export const WithIcon: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
      <Badge variant="success" appearance="icon" icon={<CheckCircle2 />}>
        Presente
      </Badge>
      <Badge variant="error" appearance="icon" icon={<AlertCircle />}>
        Ausente
      </Badge>
    </div>
  )
};

