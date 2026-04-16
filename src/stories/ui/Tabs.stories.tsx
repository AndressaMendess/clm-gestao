import type { Meta, StoryObj } from "@storybook/react-vite";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/ui/tabs";
import { StorySurface } from "../storybook-utils";

function TabsExample() {
  return (
    <Tabs defaultValue="personal" style={{ display: "grid", gap: 16 }}>
      <TabsList style={{ gap: 20 }}>
        <TabsTrigger value="personal">Dados pessoais</TabsTrigger>
        <TabsTrigger value="contact">Contato</TabsTrigger>
        <TabsTrigger value="attachments">Anexos</TabsTrigger>
      </TabsList>
      <TabsContent value="personal">Conteúdo principal do aluno.</TabsContent>
      <TabsContent value="contact">Telefone, email e contatos institucionais.</TabsContent>
      <TabsContent value="attachments">Documentos e comprovantes anexados.</TabsContent>
    </Tabs>
  );
}

const meta = {
  title: "UI/Tabs",
  component: TabsExample,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <StorySurface padding="32px" maxWidth={720}>
        <Story />
      </StorySurface>
    ),
  ],
} satisfies Meta<typeof TabsExample>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
