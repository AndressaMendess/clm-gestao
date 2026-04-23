import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { SelectField } from "@/src/components/ui/select-field";

const meta = {
  title: "Design System/Components/Select Field",
  component: SelectField,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Select padronizado para filtros da dashboard, com largura flexivel e icone de dropdown alinhado ao sistema.",
      },
    },
  },
} satisfies Meta<typeof SelectField>;

export default meta;
type Story = StoryObj<typeof meta>;

const moduleOptions = [
  { value: "Todos", label: "Filtrar por MÃ³dulos" },
  { value: "MÃ³dulo I", label: "MÃ³dulo I" },
  { value: "MÃ³dulo II", label: "MÃ³dulo II" },
  { value: "MÃ³dulo III", label: "MÃ³dulo III" },
];

export const Playground: Story = {
  args: {
    value: "Todos",
    ariaLabel: "Filtrar por mÃ³dulos",
    options: moduleOptions,
    onChange: () => undefined,
  },
  render: (args) => {
    const [value, setValue] = useState("Todos");

    return (
      <div style={{ minWidth: 420 }}>
        <SelectField
          value={value}
          ariaLabel={args.ariaLabel}
          options={args.options}
          onChange={(event) => setValue(event.target.value)}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      source: {
        code: `<SelectField
  value={value}
  ariaLabel="Filtrar por modulos"
  options={[
    { value: "Todos", label: "Filtrar por Modulos" },
    { value: "Modulo I", label: "Modulo I" }
  ]}
  onChange={(event) => setValue(event.target.value)}
/>`,
      },
    },
  },
};

export const FormVariant: Story = {
  args: {
    value: "Pendente",
    ariaLabel: "Status",
    options: [
      { value: "Pendente", label: "Pendente" },
      { value: "Aprovada", label: "Aprovada" },
      { value: "Rejeitada", label: "Rejeitada" }
    ],
    onChange: () => undefined
  },
  render: (args) => {
    const [value, setValue] = useState("Pendente");

    return (
      <div style={{ maxWidth: 340 }}>
        <SelectField
          variant="form"
          value={value}
          ariaLabel={args.ariaLabel}
          options={args.options}
          onChange={(event) => setValue(event.target.value)}
        />
      </div>
    );
  }
};

export const FormWithLabelAndHelper: Story = {
  args: {
    value: "Pendente",
    ariaLabel: "Status",
    options: [
      { value: "Pendente", label: "Pendente" },
      { value: "Aprovada", label: "Aprovada" },
      { value: "Rejeitada", label: "Rejeitada" }
    ],
    onChange: () => undefined
  },
  render: (args) => {
    const [value, setValue] = useState("Pendente");

    return (
      <div style={{ maxWidth: 340 }}>
        <SelectField
          label="Status"
          helperText="Selecione um status para continuar."
          variant="form"
          value={value}
          ariaLabel={args.ariaLabel}
          options={args.options}
          onChange={(event) => setValue(event.target.value)}
        />
      </div>
    );
  }
};

export const FormWithoutLabel: Story = {
  args: {
    value: "Todos",
    ariaLabel: "Status",
    options: [
      { value: "Todos", label: "Todos" },
      { value: "Presente", label: "Presente" },
      { value: "Ausente", label: "Ausente" }
    ],
    onChange: () => undefined
  },
  render: (args) => {
    const [value, setValue] = useState("Todos");

    return (
      <div style={{ maxWidth: 340 }}>
        <SelectField
          label="Status"
          showLabel={false}
          variant="form"
          value={value}
          ariaLabel={args.ariaLabel}
          options={args.options}
          onChange={(event) => setValue(event.target.value)}
        />
      </div>
    );
  }
};

