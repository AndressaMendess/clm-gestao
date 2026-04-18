import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { DocumentUploadField } from "./document-upload-field";

const meta = {
  title: "Design System/Components/Document Upload Field",
  component: DocumentUploadField,
  tags: ["autodocs"],
  args: {
    label: "Documento (opcional)",
    hint: "PDF, PNG, JPG até 10MB",
    selectedFile: null,
    onFileChange: () => undefined
  }
} satisfies Meta<typeof DocumentUploadField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    selectedFile: null,
    onFileChange: () => undefined
  },
  render: (args) => {
    const [file, setFile] = useState<File | null>(null);
    return (
      <div style={{ maxWidth: 640 }}>
        <DocumentUploadField {...args} selectedFile={file} onFileChange={setFile} onFileRemove={() => setFile(null)} />
      </div>
    );
  }
};

export const Error: Story = {
  args: {
    selectedFile: null,
    onFileChange: () => undefined
  },
  render: (args) => (
    <div style={{ maxWidth: 640 }}>
      <DocumentUploadField
        {...args}
        selectedFile={null}
        errorMessage="Envie um arquivo PDF, PNG ou JPG."
        onFileChange={() => {}}
      />
    </div>
  )
};
