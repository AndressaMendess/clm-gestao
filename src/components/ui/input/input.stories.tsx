import type { Meta, StoryObj } from "@storybook/react";

import { Input } from "@/src/components/ui/input";

const meta = {
  title: "Design System/Components/Input",
  component: Input,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Campo de entrada para textos curtos e dados estruturados. Mantem consistencia de espaco, borda e foco em todo o sistema.",
      }
    }
  },
  args: {
    placeholder: "Digite aqui..."
  }
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  parameters: {
    docs: {
      description: {
        story: "Configuracao padrao para entrada de dados com suporte a placeholder."
      },
      source: {
        code: `<Input placeholder="Digite aqui..." />`
      }
    }
  }
};

export const Disabled: Story = {
  args: {
    value: "Campo bloqueado",
    disabled: true
  },
  parameters: {
    docs: {
      source: {
        code: `<Input value="Campo bloqueado" disabled />`
      }
    }
  }
};

export const WithLabel: Story = {
  args: {
    label: "Nome completo",
    placeholder: "Digite o nome do aluno..."
  }
};

export const WithoutLabel: Story = {
  args: {
    label: "Email",
    showLabel: false,
    placeholder: "Digite o email"
  }
};

export const WithHelperError: Story = {
  args: {
    label: "Documento",
    placeholder: "Digite o nÃºmero do documento",
    helperText: "Documento invÃ¡lido.",
    helperTone: "error"
  }
};

