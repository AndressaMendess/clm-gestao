import type { Meta, StoryObj } from "@storybook/react";

import { Pill } from "@/src/components/ui/pill";
import { StatusBadge } from "@/src/components/ui/status-badge";
import { TableCard } from "@/src/components/ui/table-card";

const meta = {
  title: "Design System/Components/Table Card",
  component: TableCard,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Container de tabela com titulo e badge de contagem. Deve ser usado como estrutura padrao de listagens no sistema.",
      },
    },
  },
} satisfies Meta<typeof TableCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    title: "Alunos",
    titleId: "alunos-demo",
    countLabel: "2 alunos",
    children: null,
  },
  render: (args) => (
    <div style={{ width: "100%", minWidth: 980 }}>
      <TableCard title={args.title} titleId={args.titleId} countLabel={args.countLabel}>
        <div className="table-scroll students-table-shell">
          <table className="students-table">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Status</th>
                <th>MÃ³dulo</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Ana Carolina Souza</td>
                <td>
                  <StatusBadge status="Ativo" />
                </td>
                <td>
                  <Pill label="MÃ³dulo I" tone="blue" />
                </td>
              </tr>
              <tr>
                <td>Bruno Henrique Costa</td>
                <td>
                  <StatusBadge status="Inativo" />
                </td>
                <td>
                  <Pill label="MÃ³dulo II" tone="orange" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </TableCard>
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `<TableCard title="Alunos" titleId="alunos-demo" countLabel="2 alunos">
  <table className="students-table">{/* ... */}</table>
</TableCard>`,
      },
    },
  },
};

