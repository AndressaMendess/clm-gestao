import { Plus } from "lucide-react";
import type { Meta, StoryObj } from "@storybook/react";

import { Button, IconButton } from "@/src/components/ui/button";

const meta = {
  title: "Design System/Components/Button",
  component: Button,
  parameters: {
    layout: "centered"
  },
  args: {
    children: "Adicionar aluno",
    variant: "primary",
    size: "md",
    disabled: false
  },
  argTypes: {
    onClick: { action: "clicked" },
    variant: {
      control: "select",
      options: ["primary", "secondary", "ghost", "danger", "icon"]
    },
    size: {
      control: "select",
      options: ["sm", "md", "icon"]
    },
    icon: {
      control: false
    }
  }
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => <Button {...args} icon={<Plus aria-hidden="true" />} />
};

export const WithoutIcon: Story = {
  args: {
    children: "Salvar",
    variant: "primary"
  }
};

export const Secondary: Story = {
  args: {
    children: "Filtrar",
    variant: "secondary"
  }
};

export const Danger: Story = {
  args: {
    children: "Excluir aluno",
    variant: "danger"
  }
};

export const Disabled: Story = {
  args: {
    children: "Salvar alteracoes",
    disabled: true
  }
};

export const IconOnly: Story = {
  render: () => <IconButton icon={<Plus aria-hidden="true" />} label="Adicionar aluno" />
};

export const InEnrollmentFlow: Story = {
  parameters: {
    layout: "padded"
  },
  render: () => (
    <div className="w-full max-w-[560px] rounded-3xl border border-[var(--color-border-primary,#eceff2)] bg-[var(--color-surface-card,#fafafa)] p-6 shadow-[var(--shadow-card-soft,0_4px_20px_rgba(0,0,0,0.04))]">
      <h3 className="mb-2 text-lg font-semibold text-[var(--color-content-heading,#113a52)]">Cadastro de aluno</h3>
      <p className="mb-6 text-sm text-[var(--color-content-subtle,#667085)]">Conferiu os dados? Continue para salvar o cadastro.</p>
      <div className="flex flex-wrap gap-3">
        <Button variant="secondary">Voltar</Button>
        <Button icon={<Plus aria-hidden="true" />}>Salvar e adicionar responsavel</Button>
      </div>
    </div>
  )
};
