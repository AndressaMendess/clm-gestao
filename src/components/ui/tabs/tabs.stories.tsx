import type { Meta, StoryObj } from "@storybook/react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/ui/tabs";

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
        <TabsTrigger value="config">ConfiguraÃ§Ãµes</TabsTrigger>
      </TabsList>
      <TabsContent value="geral">Resumo da turma e indicadores principais.</TabsContent>
      <TabsContent value="alunos">Lista e filtros de alunos.</TabsContent>
      <TabsContent value="config">ParÃ¢metros da escola e do sistema.</TabsContent>
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
          EndereÃ§o
        </TabsTrigger>
        <TabsTrigger value="anexos" variant="drawer">
          Anexos
        </TabsTrigger>
      </TabsList>
      <TabsContent value="dados">ConteÃºdo da aba de dados pessoais.</TabsContent>
      <TabsContent value="contato">ConteÃºdo da aba de contato.</TabsContent>
      <TabsContent value="endereco">ConteÃºdo da aba de endereÃ§o.</TabsContent>
      <TabsContent value="anexos">ConteÃºdo da aba de anexos.</TabsContent>
    </Tabs>
  )
};

