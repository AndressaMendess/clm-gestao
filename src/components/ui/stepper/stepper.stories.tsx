import type { Meta, StoryObj } from "@storybook/react";

import { Stepper } from "@/src/components/ui/stepper";

const meta = {
  title: "Design System/Components/Stepper",
  component: Stepper,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Componente de progresso por etapas com estados visuais de concluÃ­do, atual e prÃ³ximo.",
      },
    },
  },
  args: {
    currentStep: 2,
    steps: [
      { id: "dados", label: "Dados pessoais" },
      { id: "documentos", label: "Documentos" },
      { id: "matricula", label: "MatrÃ­cula" },
      { id: "anexos", label: "Anexos" },
    ],
  },
} satisfies Meta<typeof Stepper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const FirstStep: Story = {
  args: {
    currentStep: 1,
  },
};

export const CompletedFlow: Story = {
  args: {
    currentStep: 4,
  },
};

