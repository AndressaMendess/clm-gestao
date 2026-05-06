import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronDown, Copy, Plus, Trash2, X } from "lucide-react";

import { AttachmentIcon } from "@/src/components/ui/attachment-icon";
import { Button, IconButton } from "@/src/components/ui/button";
import { Checkbox } from "@/src/components/ui/checkbox";
import { CollapsibleCard } from "@/src/components/ui/collapsible-card";
import { Pill } from "@/src/components/ui/pill";
import { SearchInput } from "@/src/components/ui/search-input";
import { SecondaryButton } from "@/src/components/ui/secondary-button";
import { SelectField } from "@/src/components/ui/select-field";
import { StatusBadge } from "@/src/components/ui/status-badge";
import { DataTable, type DataTableColumn } from "@/src/components/ui/data-table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/ui/tabs";
import { statusOptions, type StatusFilter } from "../data/filters";
import { teachers } from "../data/teachers";

type TeacherSortKey = "name" | "status" | "contact" | "specialty";
type DrawerTab = "personal" | "contact" | "attachments";

type TeacherRecord = (typeof teachers)[number] & {
  details: {
    rg: string;
    birthDate: string;
    sex: string;
    maritalStatus: string;
    nationality: string;
    schoolEmail: string;
    attachmentsCount: number;
  };
};

type PersonalAttachmentRecord = {
  id: string;
  fileName: string;
  fileSizeLabel: string;
  createdAtLabel: string;
  file?: File;
};

const drawerTabs: Array<{ id: DrawerTab; label: string }> = [
  { id: "personal", label: "Dados pessoais" },
  { id: "contact", label: "Contato" },
  { id: "attachments", label: "Anexos" }
];

const teacherDetailsById: Record<number, TeacherRecord["details"]> = {
  1: { rg: "12.345.678-9", birthDate: "10/01/1987", sex: "Feminino", maritalStatus: "Casada", nationality: "Brasileira", schoolEmail: "mariana.almeida@escolaclm.com", attachmentsCount: 2 },
  2: { rg: "23.456.789-0", birthDate: "18/04/1984", sex: "Masculino", maritalStatus: "Casado", nationality: "Brasileira", schoolEmail: "ricardo.nunes@escolaclm.com", attachmentsCount: 1 },
  3: { rg: "34.567.890-1", birthDate: "07/09/1990", sex: "Feminino", maritalStatus: "Solteira", nationality: "Brasileira", schoolEmail: "fernanda.costa@escolaclm.com", attachmentsCount: 2 },
  4: { rg: "45.678.901-2", birthDate: "22/11/1982", sex: "Masculino", maritalStatus: "Casado", nationality: "Brasileira", schoolEmail: "eduardo.martins@escolaclm.com", attachmentsCount: 1 },
  5: { rg: "56.789.012-3", birthDate: "30/06/1989", sex: "Feminino", maritalStatus: "Solteira", nationality: "Brasileira", schoolEmail: "juliana.farias@escolaclm.com", attachmentsCount: 2 },
  6: { rg: "67.890.123-4", birthDate: "14/12/1985", sex: "Masculino", maritalStatus: "Casado", nationality: "Brasileira", schoolEmail: "gustavo.ribeiro@escolaclm.com", attachmentsCount: 1 },
  7: { rg: "78.901.234-5", birthDate: "02/02/1991", sex: "Feminino", maritalStatus: "Solteira", nationality: "Brasileira", schoolEmail: "tatiane.moura@escolaclm.com", attachmentsCount: 1 },
  8: { rg: "89.012.345-6", birthDate: "25/08/1986", sex: "Masculino", maritalStatus: "Casado", nationality: "Brasileira", schoolEmail: "paulo.henrique@escolaclm.com", attachmentsCount: 1 }
};

const personalAttachmentsByTeacherId: Record<number, PersonalAttachmentRecord[]> = {
  1: [
    { id: "1-doc-1", fileName: "RG - Mariana Almeida.pdf", fileSizeLabel: "310 KB", createdAtLabel: "Enviado em 12/03/2026" },
    { id: "1-doc-2", fileName: "Comprovante de Residência.pdf", fileSizeLabel: "210 KB", createdAtLabel: "Enviado em 12/03/2026" }
  ],
  2: [{ id: "2-doc-1", fileName: "RG - Ricardo Nunes.pdf", fileSizeLabel: "248 KB", createdAtLabel: "Enviado em 15/03/2026" }],
  3: [
    { id: "3-doc-1", fileName: "RG - Fernanda Costa.pdf", fileSizeLabel: "196 KB", createdAtLabel: "Enviado em 20/03/2026" },
    { id: "3-doc-2", fileName: "CPF - Fernanda Costa.pdf", fileSizeLabel: "121 KB", createdAtLabel: "Enviado em 20/03/2026" }
  ],
  4: [{ id: "4-doc-1", fileName: "RG - Eduardo Martins.pdf", fileSizeLabel: "182 KB", createdAtLabel: "Enviado em 22/03/2026" }],
  5: [
    { id: "5-doc-1", fileName: "RG - Juliana Farias.pdf", fileSizeLabel: "204 KB", createdAtLabel: "Enviado em 27/03/2026" },
    { id: "5-doc-2", fileName: "Diploma Licenciatura.pdf", fileSizeLabel: "420 KB", createdAtLabel: "Enviado em 27/03/2026" }
  ],
  6: [{ id: "6-doc-1", fileName: "RG - Gustavo Ribeiro.pdf", fileSizeLabel: "240 KB", createdAtLabel: "Enviado em 30/03/2026" }],
  7: [{ id: "7-doc-1", fileName: "RG - Tatiane Moura.pdf", fileSizeLabel: "198 KB", createdAtLabel: "Enviado em 04/04/2026" }],
  8: [{ id: "8-doc-1", fileName: "RG - Paulo Henrique.pdf", fileSizeLabel: "201 KB", createdAtLabel: "Enviado em 09/04/2026" }]
};

const defaultTeacherDetails: TeacherRecord["details"] = {
  rg: "-",
  birthDate: "-",
  sex: "-",
  maritalStatus: "-",
  nationality: "Brasileira",
  schoolEmail: "-",
  attachmentsCount: 0
};

const personalDocumentAcceptedExtensions = [".pdf", ".doc", ".docx", ".jpg", ".jpeg", ".png"];
const personalDocumentAcceptedMimeTypes = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "image/jpeg",
  "image/png"
];

function compareTeacherStatus(left: StatusFilter, right: StatusFilter) {
  const order = { Ativo: 0, Inativo: 1, Trancamento: 2, Todos: 3 };
  return order[left] - order[right];
}

function hasSupportedPersonalDocumentExtension(fileName: string) {
  const normalizedName = fileName.toLowerCase();
  return personalDocumentAcceptedExtensions.some((extension) => normalizedName.endsWith(extension));
}

function DrawerField({ label, value }: { label: string; value: string }) {
  return (
    <div className="student-field">
      <span className="student-field__label">{label}</span>
      <span className="student-field__value">{value}</span>
    </div>
  );
}

function ContactLinkRow({ label, value, href }: { label: string; value: string; href: string }) {
  const handleCopyValue = async () => {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      // No-op fallback: if clipboard permission fails, keep UI stable.
    }
  };

  return (
    <div className="flex flex-col gap-1">
      <span className="student-field__label">{label}</span>
      <div className="flex items-center justify-between gap-3 px-0 py-0">
        <a className="min-w-0 truncate text-sm font-medium text-[var(--color-brand-primary-main)] hover:underline" href={href}>
          {value}
        </a>
        <IconButton
          className="h-8 w-8 min-h-8 rounded-full border-transparent bg-transparent text-[var(--color-neutral-500)] hover:bg-[var(--color-neutral-100)]"
          icon={<Copy aria-hidden="true" size={16} />}
          label={`Copiar ${label}`}
          onClick={handleCopyValue}
        />
      </div>
    </div>
  );
}

function PersonalAttachmentCard({
  records,
  onOpenDocumentUploadModal,
  onView,
  onDownload,
  onRequestDelete
}: {
  records: PersonalAttachmentRecord[];
  onOpenDocumentUploadModal: () => void;
  onView: (record: PersonalAttachmentRecord) => void;
  onDownload: (record: PersonalAttachmentRecord) => void;
  onRequestDelete: (record: PersonalAttachmentRecord) => void;
}) {
  return (
    <CollapsibleCard
      className="student-card student-card--attachments"
      title="Documentos Pessoais"
      icon={<AttachmentIcon name="file" className="attachment-symbol attachment-symbol--section" />}
      badge={records.length}
    >
      <div className="flex flex-col gap-3 p-0">
        <SecondaryButton
          className="min-h-[42px] rounded-[10px] border border-[#d0d5dd] bg-[var(--color-surface-card)] text-sm font-medium text-[#344054] shadow-none"
          icon={<AttachmentIcon name="upload" className="attachment-symbol attachment-symbol--action" />}
          onClick={onOpenDocumentUploadModal}
        >
          Adicionar documento
        </SecondaryButton>
        {records.length > 0 ? (
          <div className="flex flex-col gap-3">
            {records.map((record) => (
              <article key={record.id} className="flex items-center justify-between gap-3 rounded-[10px] border border-[var(--color-surface-border)] bg-[#f9fafb] p-4">
                <div className="flex min-w-0 items-center gap-3">
                  <AttachmentIcon name="file" className="attachment-symbol attachment-symbol--file-item" />
                  <div className="flex min-w-0 flex-col gap-0.5">
                    <Button
                      className="h-auto min-h-0 w-fit justify-start p-0 text-left text-sm font-semibold tracking-[-0.28px] text-[var(--color-neutral-850)] underline"
                      size="sm"
                      type="button"
                      variant="ghost"
                      onClick={() => onView(record)}
                    >
                      {record.fileName}
                    </Button>
                    <span className="text-xs tracking-[-0.24px] text-[#667085]">{`${record.fileSizeLabel} · ${record.createdAtLabel}`}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <IconButton
                    className="h-7 w-7 min-h-7 rounded border-transparent"
                    icon={<AttachmentIcon name="view" className="attachment-symbol attachment-symbol--action" />}
                    label={`Visualizar ${record.fileName}`}
                    onClick={() => onView(record)}
                  />
                  <IconButton
                    className="h-7 w-7 min-h-7 rounded border-transparent"
                    icon={<AttachmentIcon name="download" className="attachment-symbol attachment-symbol--action" />}
                    label={`Baixar ${record.fileName}`}
                    onClick={() => onDownload(record)}
                  />
                  <IconButton
                    className="h-7 w-7 min-h-7 rounded border-transparent"
                    icon={<AttachmentIcon name="trash" className="attachment-symbol attachment-symbol--action" />}
                    label={`Excluir ${record.fileName}`}
                    onClick={() => onRequestDelete(record)}
                  />
                </div>
              </article>
            ))}
          </div>
        ) : null}
      </div>
    </CollapsibleCard>
  );
}

function TeacherDocumentUploadModal({
  isOpen,
  fileError,
  onClose,
  onFileSelected
}: {
  isOpen: boolean;
  fileError: string;
  onClose: () => void;
  onFileSelected: (file: File | null) => void;
}) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  if (!isOpen) {
    return null;
  }

  const acceptedFilesHint = "PDF, DOC, DOCX, JPG ou PNG (max. 10MB)";
  const acceptedInput = ".pdf,.doc,.docx,.jpg,.jpeg,.png,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,image/jpeg,image/png";

  return (
    <div className="justification-modal-overlay" role="presentation" onClick={onClose}>
      <div
        className="justification-modal w-full max-w-[440px]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="teacher-document-upload-modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="justification-modal__header">
          <div className="justification-modal__copy">
            <h2 id="teacher-document-upload-modal-title">Adicionar anexo</h2>
          </div>

          <button className="justification-modal__close" type="button" aria-label="Fechar modal" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="px-6 pb-6">
          <div
            className="relative flex min-h-[212px] flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-[#c2c5c8] bg-[#fafafb] px-8 py-4 text-center"
            onDragOver={(event) => {
              event.preventDefault();
            }}
            onDrop={(event) => {
              event.preventDefault();
              onFileSelected(event.dataTransfer.files?.[0] ?? null);
            }}
          >
            <input
              ref={inputRef}
              type="file"
              className="sr-only"
              accept={acceptedInput}
              onChange={(event) => {
                onFileSelected(event.target.files?.[0] ?? null);
                event.target.value = "";
              }}
            />
            <span className="inline-flex h-10 w-10 items-center justify-center text-[#4a4f57]" aria-hidden="true">
              <AttachmentIcon name="upload" className="attachment-symbol attachment-symbol--action" />
            </span>
            <p className="m-0 text-[var(--text-body-medium)] font-medium leading-6 tracking-[-0.28px] text-[var(--color-content-primary)]">Clique para fazer upload ou arraste e solte</p>
            <p className="m-0 mb-1.5 text-[var(--text-body-small)] leading-6 tracking-[-0.24px] text-[#44484d]">{acceptedFilesHint}</p>
            <Button
              className="min-h-11"
              type="button"
              variant="primary"
              onClick={() => {
                inputRef.current?.click();
              }}
            >
              Selecionar arquivos
            </Button>
          </div>
          {fileError ? <small className="mt-2 block text-xs leading-4 text-[#b42318]">{fileError}</small> : null}
        </div>
      </div>
    </div>
  );
}

function TeacherAttachmentDeleteModal({
  isOpen,
  attachmentName,
  onClose,
  onConfirm
}: {
  isOpen: boolean;
  attachmentName: string;
  onClose: () => void;
  onConfirm: () => void;
}) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="justification-modal-overlay" role="presentation" onClick={onClose}>
      <div
        className="justification-modal max-w-[448px]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="teacher-attachment-delete-modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex flex-col gap-4 p-6">
          <h2 id="teacher-attachment-delete-modal-title">Remover anexo</h2>
          <p>Tem certeza que deseja remover este anexo? Esta ação não pode ser desfeita.</p>
          <div className="flex w-full gap-2">
            <Button className="min-h-11 flex-1 border border-[#d9dbdd]" type="button" variant="ghost" onClick={onClose}>
              Cancelar
            </Button>
            <Button className="min-h-11 flex-1" type="button" variant="danger" onClick={onConfirm} aria-label={`Remover ${attachmentName}`}>
              Remover
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function TeacherDrawerTabContent({
  teacher,
  activeTab,
  personalAttachments,
  onOpenDocumentUploadModal,
  onViewPersonalAttachment,
  onDownloadPersonalAttachment,
  onRequestDeletePersonalAttachment
}: {
  teacher: TeacherRecord;
  activeTab: DrawerTab;
  personalAttachments: PersonalAttachmentRecord[];
  onOpenDocumentUploadModal: () => void;
  onViewPersonalAttachment: (record: PersonalAttachmentRecord) => void;
  onDownloadPersonalAttachment: (record: PersonalAttachmentRecord) => void;
  onRequestDeletePersonalAttachment: (record: PersonalAttachmentRecord) => void;
}) {
  if (activeTab === "contact") {
    return (
      <div className="student-card gap-6">
        <ContactLinkRow label="Telefone" value={teacher.phone} href={`tel:${teacher.phone}`} />
        <ContactLinkRow label="E-mail" value={teacher.email} href={`mailto:${teacher.email}`} />
        <ContactLinkRow label="Email Escolar" value={teacher.details.schoolEmail} href={`mailto:${teacher.details.schoolEmail}`} />
      </div>
    );
  }

  if (activeTab === "attachments") {
    return (
      <PersonalAttachmentCard
        records={personalAttachments}
        onOpenDocumentUploadModal={onOpenDocumentUploadModal}
        onView={onViewPersonalAttachment}
        onDownload={onDownloadPersonalAttachment}
        onRequestDelete={onRequestDeletePersonalAttachment}
      />
    );
  }

  return (
    <>
      <div className="student-card">
        <div className="student-card__grid student-card__grid--personal">
          <div className="student-field student-field--full">
            <span className="student-field__label">Nome completo</span>
            <strong className="student-field__value">{teacher.name}</strong>
          </div>
          <DrawerField label="RG" value={teacher.details.rg} />
          <DrawerField label="Data de nascimento" value={teacher.details.birthDate} />
          <DrawerField label="Sexo" value={teacher.details.sex} />
          <DrawerField label="Estado civil" value={teacher.details.maritalStatus} />
          <DrawerField label="Nacionalidade" value={teacher.details.nationality} />
        </div>
      </div>

      <div className="student-card">
        <h3 className="student-card__title">Especialidade</h3>
        <div className="student-card__stack">
          <div className="student-field">
            <span className="student-field__label">Área principal</span>
            <Pill label={teacher.specialty} tone={teacher.specialtyTone} />
          </div>
        </div>
      </div>
    </>
  );
}

function TeacherDrawer({
  teacher,
  activeTab,
  onTabChange,
  onClose,
  personalAttachments,
  onOpenDocumentUploadModal,
  onViewPersonalAttachment,
  onDownloadPersonalAttachment,
  onRequestDeletePersonalAttachment
}: {
  teacher: TeacherRecord;
  activeTab: DrawerTab;
  onTabChange: (tab: DrawerTab) => void;
  onClose: () => void;
  personalAttachments: PersonalAttachmentRecord[];
  onOpenDocumentUploadModal: () => void;
  onViewPersonalAttachment: (record: PersonalAttachmentRecord) => void;
  onDownloadPersonalAttachment: (record: PersonalAttachmentRecord) => void;
  onRequestDeletePersonalAttachment: (record: PersonalAttachmentRecord) => void;
}) {
  const initials =
    teacher.initials ??
    teacher.name
      .split(" ")
      .slice(0, 2)
      .map((part) => part[0])
      .join("")
      .toUpperCase();

  return (
    <div className="student-drawer-overlay" role="presentation" onClick={onClose}>
      <aside
        className="student-drawer"
        role="dialog"
        aria-modal="true"
        aria-labelledby="teacher-drawer-title"
        onClick={(event) => event.stopPropagation()}
      >
        <header className="student-drawer__header">
          <div className="student-drawer__summary">
            {teacher.avatar ? (
              <img className="student-drawer__avatar" src={teacher.avatar} alt="" aria-hidden="true" />
            ) : (
              <span className="student-drawer__avatar student-drawer__avatar--initials">{initials}</span>
            )}

            <div className="student-drawer__identity">
              <h2 id="teacher-drawer-title">{teacher.name}</h2>
              <StatusBadge status={teacher.status} />
            </div>
          </div>

          <IconButton className="student-drawer__close" icon={<X aria-hidden="true" />} label="Fechar painel" onClick={onClose} />
        </header>

        <div className="student-drawer__actions">
          <Button className="student-drawer__edit">Editar professor</Button>
          <IconButton className="student-drawer__delete" icon={<Trash2 aria-hidden="true" />} label={`Excluir ${teacher.name}`} />
        </div>

        <Tabs className="student-drawer__tabs-shell" value={activeTab} onValueChange={(value) => onTabChange(value as DrawerTab)}>
          <TabsList className="student-drawer__tabs" variant="drawer" aria-label="Seções do professor">
            {drawerTabs.map((tab) => (
              <TabsTrigger key={tab.id} className="student-drawer__tab" value={tab.id} variant="drawer">
                {tab.label}
                {tab.id === "attachments" ? <span className="student-drawer__tab-badge">{personalAttachments.length}</span> : null}
              </TabsTrigger>
            ))}
          </TabsList>

          <div className="student-drawer__content">
            {drawerTabs.map((tab) => (
              <TabsContent key={tab.id} value={tab.id}>
                <TeacherDrawerTabContent
                  teacher={teacher}
                  activeTab={tab.id}
                  personalAttachments={personalAttachments}
                  onOpenDocumentUploadModal={onOpenDocumentUploadModal}
                  onViewPersonalAttachment={onViewPersonalAttachment}
                  onDownloadPersonalAttachment={onDownloadPersonalAttachment}
                  onRequestDeletePersonalAttachment={onRequestDeletePersonalAttachment}
                />
              </TabsContent>
            ))}
          </div>
        </Tabs>
      </aside>
    </div>
  );
}

export function TeachersPage() {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("Todos");
  const [specialtyFilter, setSpecialtyFilter] = useState("Todas");
  const [teacherSortKey, setTeacherSortKey] = useState<TeacherSortKey>("name");
  const [teacherSortDirection, setTeacherSortDirection] = useState<"asc" | "desc">("asc");
  const [selectedTeacherIds, setSelectedTeacherIds] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTeacher, setSelectedTeacher] = useState<TeacherRecord | null>(null);
  const [activeTab, setActiveTab] = useState<DrawerTab>("personal");
  const [isDrawerClosing, setIsDrawerClosing] = useState(false);
  const [personalAttachmentsByTeacher, setPersonalAttachmentsByTeacher] = useState<Record<number, PersonalAttachmentRecord[]>>(personalAttachmentsByTeacherId);
  const [isDocumentUploadModalOpen, setIsDocumentUploadModalOpen] = useState(false);
  const [documentUploadError, setDocumentUploadError] = useState("");
  const [attachmentPendingDelete, setAttachmentPendingDelete] = useState<PersonalAttachmentRecord | null>(null);

  const teachersWithDetails = useMemo(
    () =>
      teachers.map((teacher) => ({
        ...teacher,
        details: teacherDetailsById[teacher.id] ?? {
          ...defaultTeacherDetails,
          schoolEmail: teacher.email
        }
      })),
    []
  );

  const closeDrawer = () => {
    setIsDrawerClosing(true);
    window.setTimeout(() => {
      setSelectedTeacher(null);
      setActiveTab("personal");
      setIsDrawerClosing(false);
    }, 220);
  };

  function closeDocumentUploadModal() {
    setIsDocumentUploadModalOpen(false);
    setDocumentUploadError("");
  }

  function closeAttachmentDeleteModal() {
    setAttachmentPendingDelete(null);
  }

  useEffect(() => {
    if (!selectedTeacher) {
      return undefined;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeDrawer();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedTeacher]);

  function handleAddTeacherDocument(file: File | null) {
    if (!file || !selectedTeacher) {
      return;
    }

    const isValidType = personalDocumentAcceptedMimeTypes.includes(file.type) || hasSupportedPersonalDocumentExtension(file.name);
    if (!isValidType) {
      setDocumentUploadError("Envie um arquivo PDF, DOC, DOCX, JPG ou PNG.");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setDocumentUploadError("O arquivo precisa ter no máximo 10MB.");
      return;
    }

    const createdAt = new Date();
    const createdAtLabel = `Enviado em ${createdAt.toLocaleDateString("pt-BR")}`;
    const fileSizeLabel = `${Math.max(1, Math.round(file.size / 1024))} KB`;

    setPersonalAttachmentsByTeacher((current) => {
      const currentRecords = current[selectedTeacher.id] ?? [];
      const nextRecord: PersonalAttachmentRecord = {
        id: `${selectedTeacher.id}-doc-${createdAt.getTime()}`,
        fileName: file.name,
        fileSizeLabel,
        createdAtLabel,
        file
      };

      return {
        ...current,
        [selectedTeacher.id]: [nextRecord, ...currentRecords]
      };
    });
    closeDocumentUploadModal();
  }

  function handleViewTeacherAttachment(record: PersonalAttachmentRecord) {
    if (!record.file) {
      return;
    }

    const fileUrl = URL.createObjectURL(record.file);
    window.open(fileUrl, "_blank", "noopener,noreferrer");
    window.setTimeout(() => URL.revokeObjectURL(fileUrl), 1000);
  }

  function handleDownloadTeacherAttachment(record: PersonalAttachmentRecord) {
    if (!record.file) {
      return;
    }

    const fileUrl = URL.createObjectURL(record.file);
    const anchor = document.createElement("a");
    anchor.href = fileUrl;
    anchor.download = record.file.name;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    URL.revokeObjectURL(fileUrl);
  }

  function handleRequestDeleteTeacherAttachment(record: PersonalAttachmentRecord) {
    setAttachmentPendingDelete(record);
  }

  function handleConfirmDeleteTeacherAttachment() {
    if (!selectedTeacher || !attachmentPendingDelete) {
      return;
    }

    setPersonalAttachmentsByTeacher((current) => ({
      ...current,
      [selectedTeacher.id]: (current[selectedTeacher.id] ?? []).filter((record) => record.id !== attachmentPendingDelete.id)
    }));
    closeAttachmentDeleteModal();
  }

  const specialtyOptions = useMemo(() => {
    const uniqueSpecialties = [...new Set(teachersWithDetails.map((teacher) => teacher.specialty).sort((a, b) => a.localeCompare(b, "pt-BR")))];
    return [{ value: "Todas", label: "Filtrar por especialidade" }, ...uniqueSpecialties.map((specialty) => ({ value: specialty, label: specialty }))];
  }, [teachersWithDetails]);

  const filteredTeachers = useMemo(() => {
    const visibleTeachers = teachersWithDetails.filter((teacher) => {
      const search = query.trim().toLowerCase();
      const matchesQuery =
        search === "" ||
        [teacher.name, teacher.phone, teacher.email].some((value) => value.toLowerCase().includes(search));
      const matchesSpecialty = specialtyFilter === "Todas" || teacher.specialty === specialtyFilter;
      const matchesStatus = statusFilter === "Todos" || teacher.status === statusFilter;

      return matchesQuery && matchesSpecialty && matchesStatus;
    });

    return [...visibleTeachers].sort((left, right) => {
      let comparison = 0;

      if (teacherSortKey === "name") {
        comparison = left.name.localeCompare(right.name, "pt-BR");
      }

      if (teacherSortKey === "status") {
        comparison = compareTeacherStatus(left.status, right.status);
      }

      if (teacherSortKey === "contact") {
        comparison = left.email.localeCompare(right.email, "pt-BR");
      }

      if (teacherSortKey === "specialty") {
        comparison = left.specialty.localeCompare(right.specialty, "pt-BR");
      }

      return teacherSortDirection === "asc" ? comparison : comparison * -1;
    });
  }, [query, specialtyFilter, statusFilter, teacherSortDirection, teacherSortKey, teachersWithDetails]);

  function handleTeacherSort(nextKey: TeacherSortKey) {
    if (nextKey === teacherSortKey) {
      setTeacherSortDirection((current) => (current === "asc" ? "desc" : "asc"));
      return;
    }

    setTeacherSortKey(nextKey);
    setTeacherSortDirection("asc");
  }

  const teachersPerPage = 10;
  const totalPages = Math.max(1, Math.ceil(filteredTeachers.length / teachersPerPage));
  const paginatedTeachers = useMemo(
    () => filteredTeachers.slice((currentPage - 1) * teachersPerPage, currentPage * teachersPerPage),
    [currentPage, filteredTeachers]
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [query, specialtyFilter, statusFilter]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const statusFilterOptions = statusOptions.map((option) => ({
    value: option,
    label: option === "Todos" ? "Filtrar por status" : option
  }));

  const teacherColumns: DataTableColumn<TeacherRecord>[] = [
    {
      id: "name",
      header: (
        <button
          className={[
            "inline-flex w-full items-center justify-start gap-1 p-0 text-left font-medium leading-[1.33]",
            teacherSortKey === "name" ? "text-[var(--color-brand-secondary-main)]" : "text-inherit"
          ].join(" ")}
          type="button"
          onClick={() => handleTeacherSort("name")}
        >
          <span className="text-[var(--text-body-small-size)] leading-4">Nome</span>
          <ChevronDown
            className={[
              "h-4 w-4 shrink-0 transition-[transform,color] duration-150",
              teacherSortKey === "name" ? "text-current" : "text-[#98a2b3]",
              teacherSortKey === "name" && teacherSortDirection === "asc" ? "rotate-180" : "rotate-0"
            ].join(" ")}
            aria-hidden="true"
          />
        </button>
      ),
      cell: (teacher) => (
        <div className="flex items-center gap-3">
          {teacher.avatar ? (
            <img className="h-10 w-10 rounded-full bg-[#f4ebff] object-cover" src={teacher.avatar} alt="" aria-hidden="true" />
          ) : (
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#f4ebff] text-[var(--text-body-medium)] font-medium text-[#7f56d9]">
              {teacher.initials}
            </span>
          )}
          <button
            className="cursor-pointer p-0 text-left transition-colors duration-150 hover:text-[var(--color-brand-primary-main)] focus-visible:text-[var(--color-brand-primary-main)]"
            type="button"
            onClick={() => {
              setSelectedTeacher(teacher);
              setActiveTab("personal");
            }}
          >
            <span className="text-sm font-semibold leading-5 tracking-[-0.35px] text-[var(--color-content-primary)]">{teacher.name}</span>
          </button>
        </div>
      )
    },
    {
      id: "status",
      header: (
        <button
          className={[
            "inline-flex w-full items-center justify-start gap-1 p-0 text-left font-medium leading-[1.33]",
            teacherSortKey === "status" ? "text-[var(--color-brand-secondary-main)]" : "text-inherit"
          ].join(" ")}
          type="button"
          onClick={() => handleTeacherSort("status")}
        >
          <span className="text-[var(--text-body-small-size)] leading-4">Status</span>
          <ChevronDown
            className={[
              "h-4 w-4 shrink-0 transition-[transform,color] duration-150",
              teacherSortKey === "status" ? "text-current" : "text-[#98a2b3]",
              teacherSortKey === "status" && teacherSortDirection === "asc" ? "rotate-180" : "rotate-0"
            ].join(" ")}
            aria-hidden="true"
          />
        </button>
      ),
      cell: (teacher) => <StatusBadge status={teacher.status} />
    },
    {
      id: "contact",
      header: (
        <span className="inline-flex w-full items-center text-[var(--text-body-small-size)] font-medium leading-4 text-inherit">
          Contato
        </span>
      ),
      cell: (teacher) => (
        <div className="flex flex-col gap-1">
          <span className="text-sm leading-5 text-[var(--color-content-tertiary)]">{teacher.phone}</span>
          <span className="text-sm leading-5 text-[var(--color-content-tertiary)]">{teacher.email}</span>
        </div>
      )
    },
    {
      id: "specialty",
      header: (
        <button
          className={[
            "inline-flex w-full items-center justify-start gap-1 p-0 text-left font-medium leading-[1.33]",
            teacherSortKey === "specialty" ? "text-[var(--color-brand-secondary-main)]" : "text-inherit"
          ].join(" ")}
          type="button"
          onClick={() => handleTeacherSort("specialty")}
        >
          <span className="text-[var(--text-body-small-size)] leading-4">Especialidade</span>
          <ChevronDown
            className={[
              "h-4 w-4 shrink-0 transition-[transform,color] duration-150",
              teacherSortKey === "specialty" ? "text-current" : "text-[#98a2b3]",
              teacherSortKey === "specialty" && teacherSortDirection === "asc" ? "rotate-180" : "rotate-0"
            ].join(" ")}
            aria-hidden="true"
          />
        </button>
      ),
      cell: (teacher) => <Pill label={teacher.specialty} tone={teacher.specialtyTone} />
    }
  ];

  return (
    <>
      <main
        className={[
          "flex flex-1 flex-col gap-6 px-3 pb-6 sm:px-4 lg:px-6",
          selectedTeacher ? "pointer-events-none select-none" : ""
        ].join(" ")}
      >
        <section className="flex flex-col items-start justify-between gap-4 pt-6 xl:flex-row xl:items-center">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="m-0 text-[20px] font-semibold leading-[1.4] tracking-[-0.5px] text-[var(--color-content-primary)]">Professores -</h1>
            <p className="m-0 text-[20px] leading-[1.4] tracking-[-0.5px] text-[var(--color-content-tertiary)]">Gerencie o cadastro completo de professores.</p>
          </div>

          <Button icon={<Plus aria-hidden="true" />} variant="ghost">
            Novo professor
          </Button>
        </section>

        <section className="flex flex-wrap gap-2" aria-label="Busca e filtros de professores">
          <SearchInput
            className="w-full xl:flex-[1.35]"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Buscar por nome, telefone ou email..."
            ariaLabel="Buscar por nome, telefone ou email"
          />

          <div className="flex w-full flex-1 flex-wrap gap-2 sm:w-auto xl:flex-[1]">
            <SelectField
              ariaLabel="Filtrar por especialidade"
              value={specialtyFilter}
              options={specialtyOptions}
              onChange={(event) => setSpecialtyFilter(event.target.value)}
            />
            <SelectField
              ariaLabel="Filtrar por status"
              value={statusFilter}
              options={statusFilterOptions}
              onChange={(event) => setStatusFilter(event.target.value as StatusFilter)}
            />
          </div>
        </section>

        <DataTable
          title="Professores"
          titleId="teachers-title"
          countLabel={`${filteredTeachers.length} professores`}
          columns={teacherColumns}
          rows={paginatedTeachers}
          rowKey={(teacher) => teacher.id}
          selection={{
            selectedRowKeys: selectedTeacherIds,
            onSelectionChange: (keys) => setSelectedTeacherIds(keys.map((key) => Number(key))),
            rowAriaLabel: (teacher) => `Selecionar ${teacher.name}`,
            selectAllAriaLabel: "Selecionar todos"
          }}
          mobileCard={(teacher) => (
            <div className="flex flex-col gap-4 rounded-xl border border-[var(--color-surface-border)] bg-[var(--color-surface-card)] p-4">
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2.5">
                  {teacher.avatar ? (
                    <img className="h-10 w-10 rounded-full bg-[#f4ebff] object-cover" src={teacher.avatar} alt="" aria-hidden="true" />
                  ) : (
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#f4ebff] text-[var(--text-body-medium)] font-medium text-[#7f56d9]">
                      {teacher.initials}
                    </span>
                  )}
                  <button
                    className="p-0 text-left"
                    type="button"
                    onClick={() => {
                      setSelectedTeacher(teacher);
                      setActiveTab("personal");
                    }}
                  >
                    <span className="text-sm font-semibold leading-5 tracking-[-0.35px] text-[var(--color-content-primary)]">{teacher.name}</span>
                  </button>
                </div>
                <StatusBadge status={teacher.status} />
              </div>

              <div className="grid gap-3">
                <div className="flex flex-col gap-1.5">
                  <span className="text-[var(--text-body-small)] font-medium leading-[1.33]">Contato</span>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-sm leading-5 text-[var(--color-neutral-500)]">{teacher.phone}</span>
                    <span className="text-sm leading-5 text-[var(--color-neutral-600)]">{teacher.email}</span>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <span className="text-[var(--text-body-small)] font-medium leading-[1.33]">Especialidade</span>
                  <Pill label={teacher.specialty} tone={teacher.specialtyTone} />
                </div>
              </div>
            </div>
          )}
          pagination={{
            currentPage,
            totalPages,
            onPageChange: setCurrentPage,
            ariaLabel: "Paginação da tabela de professores"
          }}
        />
      </main>

      {selectedTeacher ? (
        <div className={`student-drawer-shell ${isDrawerClosing ? "is-closing" : ""}`}>
          <TeacherDrawer
            teacher={selectedTeacher}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            onClose={closeDrawer}
            personalAttachments={personalAttachmentsByTeacher[selectedTeacher.id] ?? []}
            onOpenDocumentUploadModal={() => setIsDocumentUploadModalOpen(true)}
            onViewPersonalAttachment={handleViewTeacherAttachment}
            onDownloadPersonalAttachment={handleDownloadTeacherAttachment}
            onRequestDeletePersonalAttachment={handleRequestDeleteTeacherAttachment}
          />
        </div>
      ) : null}

      <TeacherDocumentUploadModal
        isOpen={isDocumentUploadModalOpen}
        fileError={documentUploadError}
        onClose={closeDocumentUploadModal}
        onFileSelected={handleAddTeacherDocument}
      />
      <TeacherAttachmentDeleteModal
        isOpen={attachmentPendingDelete !== null}
        attachmentName={attachmentPendingDelete?.fileName ?? ""}
        onClose={closeAttachmentDeleteModal}
        onConfirm={handleConfirmDeleteTeacherAttachment}
      />
    </>
  );
}








