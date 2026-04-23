import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { SearchInput } from "@/src/components/ui/search-input";

const meta = {
  title: "Design System/Components/Search Input",
  component: SearchInput,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Campo de busca padronizado para listagens, com icone de pesquisa e estilo alinhado ao layout da dashboard.",
      },
    },
  },
} satisfies Meta<typeof SearchInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    value: "",
    placeholder: "Buscar por nome, telefone ou email...",
    ariaLabel: "Buscar alunos",
    onChange: () => undefined,
  },
  render: (args) => {
    const [value, setValue] = useState("");

    return (
      <div style={{ minWidth: 420 }}>
        <SearchInput
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder={args.placeholder}
          ariaLabel={args.ariaLabel}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      source: {
        code: `<SearchInput
  value={value}
  onChange={(event) => setValue(event.target.value)}
  placeholder="Buscar por nome, telefone ou email..."
  ariaLabel="Buscar alunos"
/>`,
      },
    },
  },
};

