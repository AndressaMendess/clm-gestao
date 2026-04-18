import type { Meta, StoryObj } from "@storybook/react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs";

const meta = {
  title: "Design System/Components/Tabs",
  component: Tabs,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Componente de navegacao local para alternar entre grupos de conteudo relacionados sem trocar de pagina.",
      }
    }
  }
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: () => (
    <Tabs defaultValue="geral" style={{ width: 420 }}>
      <TabsList>
        <TabsTrigger value="geral">Geral</TabsTrigger>
        <TabsTrigger value="alunos">Alunos</TabsTrigger>
        <TabsTrigger value="config">Configurações</TabsTrigger>
      </TabsList>
      <TabsContent value="geral">Resumo da turma e indicadores principais.</TabsContent>
      <TabsContent value="alunos">Lista e filtros de alunos.</TabsContent>
      <TabsContent value="config">Parâmetros da escola e do sistema.</TabsContent>
    </Tabs>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Tabs defaultValue="geral">
  <TabsList>
    <TabsTrigger value="geral">Geral</TabsTrigger>
    <TabsTrigger value="alunos">Alunos</TabsTrigger>
    <TabsTrigger value="config">Configuracoes</TabsTrigger>
  </TabsList>
  <TabsContent value="geral">Resumo da turma e indicadores principais.</TabsContent>
  <TabsContent value="alunos">Lista e filtros de alunos.</TabsContent>
  <TabsContent value="config">Parametros da escola e do sistema.</TabsContent>
</Tabs>`
      }
    }
  }
};

export const DrawerVariant: Story = {
  render: () => (
    <Tabs defaultValue="dados" style={{ width: 520 }}>
      <TabsList variant="drawer">
        <TabsTrigger value="dados" variant="drawer">
          Dados pessoais
        </TabsTrigger>
        <TabsTrigger value="contato" variant="drawer">
          Contato
        </TabsTrigger>
        <TabsTrigger value="endereco" variant="drawer">
          Endereço
        </TabsTrigger>
        <TabsTrigger value="anexos" variant="drawer">
          Anexos
        </TabsTrigger>
      </TabsList>
      <TabsContent value="dados">Conteúdo da aba de dados pessoais.</TabsContent>
      <TabsContent value="contato">Conteúdo da aba de contato.</TabsContent>
      <TabsContent value="endereco">Conteúdo da aba de endereço.</TabsContent>
      <TabsContent value="anexos">Conteúdo da aba de anexos.</TabsContent>
    </Tabs>
  )
};
