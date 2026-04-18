import { CalendarDays, FileText } from "lucide-react";
import type { Meta, StoryObj } from "@storybook/react";

import { CollapsibleCard } from "./collapsible-card";

const meta = {
  title: "Design System/Components/Collapsible Card",
  component: CollapsibleCard,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Card colapsável com cabeçalho clicável e seta para expandir/recolher conteúdo, usado em seções do drawer.",
      },
    },
  },
} satisfies Meta<typeof CollapsibleCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DocumentsSection: Story = {
  args: {
    title: "Documentos Pessoais",
    children: "Conteúdo"
  },
  render: () => (
    <div style={{ maxWidth: 520 }}>
      <CollapsibleCard title="Documentos Pessoais" icon={<FileText />} badge={1}>
        <div className="attachment-section__body">
          <button className="attachment-action-button" type="button">
            <span>Adicionar documento</span>
          </button>
          <div className="attachment-file">
            <div className="attachment-file__text">
              <strong>RG_Ana_Carolina_Souza.pdf</strong>
              <span>1.0 KB • 18/01/2024</span>
            </div>
          </div>
        </div>
      </CollapsibleCard>
    </div>
  ),
};

export const ClosedByDefault: Story = {
  args: {
    title: "Justificativas de Faltas",
    children: "Conteúdo"
  },
  render: () => (
    <div style={{ maxWidth: 520 }}>
      <CollapsibleCard title="Justificativas de Faltas" icon={<CalendarDays />} defaultOpen={false}>
        <div className="attachment-section__body">
          <p className="student-card__placeholder-text">Sem justificativas no momento.</p>
        </div>
      </CollapsibleCard>
    </div>
  ),
};
