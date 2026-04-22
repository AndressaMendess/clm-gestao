import type { Meta, StoryObj } from "@storybook/react";

import { Stepper } from "./stepper";

const meta = {
  title: "Design System/Components/Stepper",
  component: Stepper,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Componente de progresso por etapas com estados visuais de concluído, atual e próximo.",
      },
    },
  },
  args: {
    currentStep: 2,
    steps: [
      { id: "dados", label: "Dados pessoais" },
      { id: "documentos", label: "Documentos" },
      { id: "matricula", label: "Matrícula" },
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
