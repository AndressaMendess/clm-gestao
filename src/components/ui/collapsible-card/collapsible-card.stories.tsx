import { CalendarDays, FileText } from "lucide-react";
import type { Meta, StoryObj } from "@storybook/react";

import { SecondaryButton } from "@/src/components/ui/secondary-button";
import { CollapsibleCard } from "@/src/components/ui/collapsible-card";

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
        <div className="flex flex-col gap-3 p-0">
          <SecondaryButton className="min-h-[42px] rounded-[10px] border border-[#d0d5dd] bg-[var(--color-surface-card)] text-sm font-medium text-[#344054] shadow-none">
            Adicionar documento
          </SecondaryButton>
          <div className="flex items-center justify-between gap-3 rounded-[10px] border border-[var(--color-surface-border)] bg-[#f9fafb] p-4">
            <div className="flex min-w-0 flex-col gap-0.5">
              <strong className="text-sm font-semibold tracking-[-0.28px] text-[var(--color-neutral-850)]">RG_Ana_Carolina_Souza.pdf</strong>
              <span className="text-xs tracking-[-0.24px] text-[#667085]">1.0 KB • 18/01/2024</span>
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
        <div className="flex flex-col gap-3 p-0">
          <p className="student-card__placeholder-text">Sem justificativas no momento.</p>
        </div>
      </CollapsibleCard>
    </div>
  ),
};
