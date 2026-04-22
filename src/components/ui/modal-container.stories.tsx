import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "./button";
import { ModalContainer } from "./modal-container";

const meta = {
  title: "Design System/Components/ModalContainer",
  component: ModalContainer,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Container base para modais com estrutura padronizada: header (titulo/subtitulo/fechar), corpo flexível e footer com ações.",
      },
    },
  },
  args: {
    isOpen: true,
    titleId: "storybook-modal-container",
    title: "Adicionar Aluno",
    subtitle: "Preencha os dados para continuar",
    children: (
      <div style={{ padding: "24px", display: "grid", gap: "8px" }}>
        <strong>Conteúdo dinâmico</strong>
        <span>Esse espaço representa o conteúdo variável de cada modal.</span>
      </div>
    ),
    footer: (
      <>
        <Button variant="ghost">Cancelar</Button>
        <Button variant="primary">Continuar</Button>
      </>
    ),
    onClose: () => undefined,
  },
  argTypes: {
    onClose: { action: "closed" },
  },
} satisfies Meta<typeof ModalContainer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    className: "manual-student-modal",
    overlayClassName: "manual-student-modal-overlay",
  },
};

export const WithoutFooter: Story = {
  args: {
    footer: undefined,
  },
};
