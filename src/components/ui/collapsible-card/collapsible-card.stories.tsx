import { CalendarDays, FileText } from "lucide-react";
import type { Meta, StoryObj } from "@storybook/react";

import { CollapsibleCard } from "@/src/components/ui/collapsible-card";

const meta = {
  title: "Design System/Components/Collapsible Card",
  component: CollapsibleCard,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Card colapsÃ¡vel com cabeÃ§alho clicÃ¡vel e seta para expandir/recolher conteÃºdo, usado em seÃ§Ãµes do drawer.",
      },
    },
  },
} satisfies Meta<typeof CollapsibleCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DocumentsSection: Story = {
  args: {
    title: "Documentos Pessoais",
    children: "ConteÃºdo"
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
              <span>1.0 KB â€¢ 18/01/2024</span>
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
    children: "ConteÃºdo"
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

