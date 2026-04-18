import { useEffect, useMemo, useState } from "react";
import { AlertCircle, CalendarDays, CheckCircle2, ChevronDown, Clock3, Download, ExternalLink, Eye, FileText, PenLine, Plus, Trash2, Upload, X } from "lucide-react";
import type { FormEvent } from "react";

import { Badge } from "@/src/components/ui/badge";
import { Button, IconButton } from "@/src/components/ui/button";
import { Card } from "@/src/components/ui/card";
import { Checkbox } from "@/src/components/ui/checkbox";
import { CollapsibleCard } from "@/src/components/ui/collapsible-card";
import { DatePicker } from "@/src/components/ui/date-picker";
import { DocumentUploadField } from "@/src/components/ui/document-upload-field";
import { Pill, type PillTone } from "@/src/components/ui/pill";
import { SearchInput } from "@/src/components/ui/search-input";
import { SecondaryButton } from "@/src/components/ui/secondary-button";
import { SelectField } from "@/src/components/ui/select-field";
import { StatusBadge } from "@/src/components/ui/status-badge";
import { TableCard } from "@/src/components/ui/table-card";
import { TextareaField } from "@/src/components/ui/textarea-field";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/ui/tabs";
import { attendanceHistory, type AttendanceStatus } from "../data/attendance";
import { getClassOptions, statusOptions, type ClassFilter, type ModuleFilter, type StatusFilter } from "../data/filters";
import { students } from "../data/students";
import { StudentAttendanceHistoryView, type StudentAttendanceHistoryRecordView } from "./StudentAttendanceHistoryView";

type StudentSortKey = "name" | "status" | "contact" | "module" | "className";

type StudentStatus = "Ativo" | "Inativo" | "Trancamento";
type DrawerTab = "personal" | "contact" | "address" | "attachments" | "frequency";
type FrequencyRecord = StudentAttendanceHistoryRecordView;
type JustificationType = "Atestado médico" | "Declaração" | "Outro";
type JustificationStatus = "Pendente" | "Aprovada" | "Rejeitada";

type JustificationRecord = {
  id: string;
  classDate: string;
  type: JustificationType;
  status: JustificationStatus;
  note: string;
  fileName?: string;
  fileSizeLabel?: string;
  createdAtLabel: string;
};

type StudentRecord = (typeof students)[number] & {
  attendance: FrequencyRecord[];
  details: {
    rg: string;
    birthDate: string;
    sex: string;
    maritalStatus: string;
    nationality: string;
    fatherName: string;
    motherName: string;
    attachmentsCount: number;
    contact: {
      phone: string;
      email: string;
      schoolEmail: string;
    };
    address: {
      zipCode: string;
      number: string;
      street: string;
      complement: string;
      neighborhood: string;
      city: string;
      state: string;
    };
  };
};

const studentDetailsById: Record<number, StudentRecord["details"]> = {
  1: {
    rg: "12.345.678-9",
    birthDate: "14/03/2005",
    sex: "-",
    maritalStatus: "-",
    nationality: "-",
    fatherName: "-",
    motherName: "-",
    attachmentsCount: 1,
    contact: {
      phone: "(11) 98765-4321",
      email: "ana.souza@email.com",
      schoolEmail: "ana.souza@escolaclm.com"
    },
    address: {
      zipCode: "01310-100",
      number: "1578",
      street: "Avenida Paulista",
      complement: "Apto 42",
      neighborhood: "Bela Vista",
      city: "São Paulo",
      state: "SP"
    }
  },
  2: {
    rg: "23.456.789-0",
    birthDate: "02/07/2006",
    sex: "Masculino",
    maritalStatus: "Solteiro",
    nationality: "Brasileira",
    fatherName: "Marcos Baker",
    motherName: "Elaine Baker",
    attachmentsCount: 2,
    contact: {
      phone: "(11) 99876-4321",
      email: "phoenix@untitledui.com",
      schoolEmail: "phoenix@escolaclm.com"
    },
    address: {
      zipCode: "04538-132",
      number: "250",
      street: "Rua Gomes de Carvalho",
      complement: "Sala 14",
      neighborhood: "Vila Olímpia",
      city: "São Paulo",
      state: "SP"
    }
  },
  3: {
    rg: "34.567.890-1",
    birthDate: "21/11/2004",
    sex: "Feminino",
    maritalStatus: "Solteira",
    nationality: "Brasileira",
    fatherName: "-",
    motherName: "Helena Steiner",
    attachmentsCount: 0,
    contact: {
      phone: "(11) 94567-1221",
      email: "lana@untitledui.com",
      schoolEmail: "lana@escolaclm.com"
    },
    address: {
      zipCode: "05407-000",
      number: "98",
      street: "Rua dos Pinheiros",
      complement: "Casa",
      neighborhood: "Pinheiros",
      city: "São Paulo",
      state: "SP"
    }
  },
  4: {
    rg: "45.678.901-2",
    birthDate: "08/01/2007",
    sex: "-",
    maritalStatus: "-",
    nationality: "Brasileira",
    fatherName: "Carlos Wilkinson",
    motherName: "-",
    attachmentsCount: 3,
    contact: {
      phone: "(11) 93456-8800",
      email: "demi@untitledui.com",
      schoolEmail: "demi@escolaclm.com"
    },
    address: {
      zipCode: "04038-002",
      number: "412",
      street: "Rua Domingos de Morais",
      complement: "Bloco B",
      neighborhood: "Vila Mariana",
      city: "São Paulo",
      state: "SP"
    }
  },
  5: {
    rg: "56.789.012-3",
    birthDate: "18/09/2003",
    sex: "Feminino",
    maritalStatus: "Solteira",
    nationality: "Brasileira",
    fatherName: "-",
    motherName: "-",
    attachmentsCount: 1,
    contact: {
      phone: "(11) 92345-9012",
      email: "candice@untitledui.com",
      schoolEmail: "candice@escolaclm.com"
    },
    address: {
      zipCode: "01414-001",
      number: "81",
      street: "Rua Augusta",
      complement: "Fundos",
      neighborhood: "Consolação",
      city: "São Paulo",
      state: "SP"
    }
  },
  6: {
    rg: "67.890.123-4",
    birthDate: "12/12/2005",
    sex: "Feminino",
    maritalStatus: "-",
    nationality: "Brasileira",
    fatherName: "Roberto Craig",
    motherName: "Ana Craig",
    attachmentsCount: 0,
    contact: {
      phone: "(11) 91122-3344",
      email: "natali@untitledui.com",
      schoolEmail: "natali@escolaclm.com"
    },
    address: {
      zipCode: "05016-000",
      number: "560",
      street: "Rua Tito",
      complement: "Casa 2",
      neighborhood: "Lapa",
      city: "São Paulo",
      state: "SP"
    }
  },
  7: {
    rg: "78.901.234-5",
    birthDate: "29/05/2006",
    sex: "Masculino",
    maritalStatus: "-",
    nationality: "Brasileira",
    fatherName: "-",
    motherName: "PatrÃ­cia Cano",
    attachmentsCount: 2,
    contact: {
      phone: "(11) 98765-2211",
      email: "drew@untitledui.com",
      schoolEmail: "drew@escolaclm.com"
    },
    address: {
      zipCode: "03178-200",
      number: "210",
      street: "Rua do Oratório",
      complement: "Sobrado",
      neighborhood: "Mooca",
      city: "São Paulo",
      state: "SP"
    }
  },
  8: {
    rg: "89.012.345-6",
    birthDate: "15/10/2004",
    sex: "Masculino",
    maritalStatus: "Solteiro",
    nationality: "Brasileira",
    fatherName: "JoÃ£o Diggs",
    motherName: "CÃ©lia Diggs",
    attachmentsCount: 1,
    contact: {
      phone: "(11) 97654-9988",
      email: "orlando@untitledui.com",
      schoolEmail: "orlando@escolaclm.com"
    },
    address: {
      zipCode: "01153-000",
      number: "19",
      street: "Alameda Barão de Limeira",
      complement: "Ap 11",
      neighborhood: "Campos Elíseos",
      city: "São Paulo",
      state: "SP"
    }
  },
  9: {
    rg: "90.123.456-7",
    birthDate: "03/02/2005",
    sex: "-",
    maritalStatus: "-",
    nationality: "-",
    fatherName: "-",
    motherName: "-",
    attachmentsCount: 4,
    contact: {
      phone: "(11) 96543-8877",
      email: "andi@untitledui.com",
      schoolEmail: "andi@escolaclm.com"
    },
    address: {
      zipCode: "02022-011",
      number: "330",
      street: "Rua Voluntários da Pátria",
      complement: "Sala 5",
      neighborhood: "Santana",
      city: "São Paulo",
      state: "SP"
    }
  },
  10: {
    rg: "01.234.567-8",
    birthDate: "27/08/2003",
    sex: "Feminino",
    maritalStatus: "Solteira",
    nationality: "Brasileira",
    fatherName: "-",
    motherName: "Clara Morrison",
    attachmentsCount: 1,
    contact: {
      phone: "(11) 95432-7766",
      email: "kate@untitledui.com",
      schoolEmail: "kate@escolaclm.com"
    },
    address: {
      zipCode: "01509-001",
      number: "144",
      street: "Rua Vergueiro",
      complement: "Cobertura",
      neighborhood: "Liberdade",
      city: "São Paulo",
      state: "SP"
    }
  }
};

const drawerTabs: Array<{ id: DrawerTab; label: string }> = [
  { id: "personal", label: "Dados pessoais" },
  { id: "contact", label: "Contato" },
  { id: "address", label: "Endereço" },
  { id: "attachments", label: "Anexos" },
  { id: "frequency", label: "Frequência" }
];

const frequencyFallbackByStudentId: Partial<Record<number, FrequencyRecord[]>> = {
  1: [
    {
      id: "1-2024-01-24",
      date: "24/01/2024",
      moduleLabel: "Módulo I",
      moduleTone: "violet",
      className: "Classe 1",
      classTone: "blue",
      status: "Presente"
    }
  ]
};

const justificationTypeOptions: JustificationType[] = ["Atestado médico", "Declaração", "Outro"];
const justificationStatusOptions: JustificationStatus[] = ["Pendente", "Aprovada", "Rejeitada"];
const justificationStatusTone: Record<JustificationStatus, "warning" | "success" | "error"> = {
  Pendente: "warning",
  Aprovada: "success",
  Rejeitada: "error"
};

function parseBrazilianDate(value: string) {
  const [day, month, year] = value.split("/").map(Number);

  return new Date(year, month - 1, day).getTime();
}

function getStudentFrequencyRecords(
  studentId: number,
  moduleLabel: string,
  moduleTone: FrequencyRecord["moduleTone"],
  className: string,
  classTone: FrequencyRecord["classTone"]
) {
  const fallback = frequencyFallbackByStudentId[studentId];

  if (fallback) {
    return fallback;
  }

  return attendanceHistory
    .flatMap((entry) =>
      entry.students
        .filter((student) => student.id === studentId)
        .map((student) => ({
          id: `${entry.id}-${student.id}`,
          date: entry.date,
          moduleLabel,
          moduleTone,
          className,
          classTone,
          status: student.status,
          note: student.note
        }))
    )
    .sort((left, right) => parseBrazilianDate(right.date) - parseBrazilianDate(left.date));
}

function compareStudentStatus(left: StudentStatus, right: StudentStatus) {
  const order = { Ativo: 0, Inativo: 1, Trancamento: 2 };
  return order[left] - order[right];
}

function normalizeStudentText(value: string) {
  return value;
}

function formatIsoDateToBrazilianDate(value: string) {
  if (!value) {
    return "";
  }

  const [year, month, day] = value.split("-");

  if (!year || !month || !day) {
    return value;
  }

  return `${day}/${month}/${year}`;
}

function formatBytesToReadableSize(bytes: number) {
  if (bytes < 1024 * 1024) {
    return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  }

  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
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
  return (
    <div className="contact-link-row">
      <span className="student-field__label">{label}</span>
      <div className="contact-link-row__content">
        <a className="contact-link-row__link" href={href}>
          {value}
        </a>
        <button className="copy-icon-button" type="button" aria-label={`Copiar ${label}`}>
          <span className="copy-icon-button__back" aria-hidden="true" />
          <span className="copy-icon-button__front" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}

function AddressContent({ student }: { student: StudentRecord }) {
  return (
    <Card className="student-card student-card--address">
      <div className="address-grid address-grid--split">
        <DrawerField label="CEP" value={student.details.address.zipCode} />
        <DrawerField label="Número" value={student.details.address.number} />
      </div>
      <DrawerField label="Rua" value={student.details.address.street} />
      <DrawerField label="Complemento" value={student.details.address.complement} />
      <DrawerField label="Bairro" value={student.details.address.neighborhood} />
      <div className="address-grid address-grid--split">
        <DrawerField label="Cidade" value={student.details.address.city} />
        <DrawerField label="Estado" value={student.details.address.state} />
      </div>
    </Card>
  );
}

function AttachmentIcon({
  name,
  className
}: {
  name: "file" | "calendar" | "upload" | "plus" | "view" | "download" | "trash";
  className?: string;
}) {
  switch (name) {
    case "file":
      return <FileText className={className} aria-hidden="true" />;
    case "calendar":
      return <CalendarDays className={className} aria-hidden="true" />;
    case "upload":
      return <Upload className={className} aria-hidden="true" />;
    case "plus":
      return <Plus className={className} aria-hidden="true" />;
    case "view":
      return <Eye className={className} aria-hidden="true" />;
    case "download":
      return <Download className={className} aria-hidden="true" />;
    case "trash":
      return <Trash2 className={className} aria-hidden="true" />;
    default:
      return null;
  }
}

function AttachmentActionButton({
  label,
  iconName,
  onClick
}: {
  label: string;
  iconName: "upload" | "plus";
  onClick?: () => void;
}) {
  return (
    <SecondaryButton className="attachment-action-button" icon={<AttachmentIcon name={iconName} className="attachment-symbol attachment-symbol--action" />} onClick={onClick}>
      {label}
    </SecondaryButton>
  );
}

function FrequencyStatusBadge({ status }: { status: AttendanceStatus }) {
  const tone = status === "Presente" ? "success" : "error";

  return (
    <Badge
      className={`frequency-status-badge frequency-status-badge--${tone}`}
      variant={tone}
      appearance="icon"
      icon={tone === "success" ? <CheckCircle2 /> : <AlertCircle />}
    >
      {status}
    </Badge>
  );
}

function FrequencyIcon({ name }: { name: "calendar" | "chevron-down" }) {
  const sharedProps = {
    viewBox: "0 0 20 20",
    fill: "none",
    "aria-hidden": true as const
  };

  switch (name) {
    case "calendar":
      return (
        <svg {...sharedProps}>
          <path
            d="M6.667 1.667v3.333M13.333 1.667v3.333M2.917 8.333h14.166M4.583 3.333h10.834a1.667 1.667 0 0 1 1.666 1.667v10.833a1.667 1.667 0 0 1-1.666 1.667H4.583a1.667 1.667 0 0 1-1.666-1.667V5A1.667 1.667 0 0 1 4.583 3.333Z"
            stroke="currentColor"
            strokeWidth="1.67"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "chevron-down":
      return (
        <svg {...sharedProps}>
          <path d="m5 7.5 5 5 5-5" stroke="currentColor" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    default:
      return null;
  }
}

function FrequencyTabContent({
  student,
  onOpenFullHistory
}: {
  student: StudentRecord;
  onOpenFullHistory: () => void;
}) {
  const recentRecords = student.attendance.slice(0, 1);

  return (
    <Card className="student-card student-card--frequency">
      <div className="frequency-card__header">
        <h3 className="student-card__title">Histórico Recente</h3>
        <p className="frequency-card__description">Últimas {student.attendance.length} ocorrências de presença</p>
      </div>

      {recentRecords.length > 0 ? (
        <div className="frequency-card__list">
          {recentRecords.map((record) => (
            <article key={record.id} className="frequency-entry">
              <div className="frequency-entry__meta">
                <div className="frequency-entry__date-row">
                  <span className="frequency-entry__icon" aria-hidden="true">
                    <FrequencyIcon name="calendar" />
                  </span>
                  <strong>{record.date}</strong>
                </div>
                <span className="frequency-entry__class">{record.className}</span>
              </div>

              <div className="frequency-entry__status">
                <FrequencyStatusBadge status={record.status} />
                <button className="frequency-entry__toggle" type="button" aria-label={`Ver detalhes da presença de ${record.date}`}>
                  <FrequencyIcon name="chevron-down" />
                </button>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="frequency-empty-state">
          <p>Nenhuma ocorrência de frequência registrada.</p>
        </div>
      )}

      <div className="frequency-card__footer">
        <button className="frequency-card__button" type="button" onClick={onOpenFullHistory}>
          Ver histórico completo ({student.attendance.length} {student.attendance.length === 1 ? "registro" : "registros"})
        </button>
      </div>
    </Card>
  );
}

function AttachmentFileItem() {
  return (
    <div className="attachment-file">
      <div className="attachment-file__meta">
        <AttachmentIcon name="file" className="attachment-symbol attachment-symbol--file-item" />
        <div className="attachment-file__text">
          <strong>RG_Ana_Carolina_Souza.pdf</strong>
          <span>1.0 KB - 18/01/2024</span>
        </div>
      </div>

      <div className="attachment-file__actions">
        <button className="attachment-icon-button" type="button" aria-label="Visualizar documento">
          <AttachmentIcon name="view" className="attachment-symbol attachment-symbol--icon-button" />
        </button>
        <button className="attachment-icon-button" type="button" aria-label="Baixar documento">
          <AttachmentIcon name="download" className="attachment-symbol attachment-symbol--icon-button" />
        </button>
        <button className="attachment-icon-button" type="button" aria-label="Excluir documento">
          <AttachmentIcon name="trash" className="attachment-symbol attachment-symbol--icon-button" />
        </button>
      </div>
    </div>
  );
}

function EmptyAttachmentState() {
  return (
    <div className="attachment-empty-state">
      <AttachmentIcon name="calendar" className="attachment-symbol attachment-symbol--empty-state" />
      <p>Nenhuma justificativa registrada</p>
    </div>
  );
}

function JustificationStatusBadge({ status }: { status: JustificationStatus }) {
  const tone = justificationStatusTone[status];
  const icon =
    status === "Aprovada" ? <CheckCircle2 /> : status === "Rejeitada" ? <AlertCircle /> : <Clock3 />;

  return (
    <Badge className={`justification-status-badge justification-status-badge--${tone}`} variant={tone} appearance="icon" icon={icon}>
      {status}
    </Badge>
  );
}

function JustificationRecordItem({ record }: { record: JustificationRecord }) {
  return (
    <article className="justification-record">
      <div className="justification-record__header">
        <div className="justification-record__date-group">
          <span className="justification-record__date-icon" aria-hidden="true">
            <AttachmentIcon name="calendar" className="attachment-symbol attachment-symbol--action" />
          </span>
          <strong>{record.classDate}</strong>
        </div>
        <div className="justification-record__header-actions">
          <JustificationStatusBadge status={record.status} />
          <button className="justification-record__icon-button" type="button" aria-label="Excluir justificativa">
            <Trash2 aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className="justification-record__content">
        <span className="justification-record__label">Motivo</span>
        <p className="justification-record__value">{record.type}</p>
        {record.note ? (
          <>
            <span className="justification-record__label">Observação</span>
            <p className="justification-record__note">{record.note}</p>
          </>
        ) : null}
      </div>

      <div className="justification-record__footer">
        <button className="justification-record__button justification-record__button--secondary" type="button">
          <PenLine aria-hidden="true" />
          <span>Editar</span>
        </button>
        <button className="justification-record__button justification-record__button--link" type="button">
          <ExternalLink aria-hidden="true" />
          <span>Ver chamada</span>
        </button>
      </div>
    </article>
  );
}

function StudentJustificationModal({
  isOpen,
  studentName,
  form,
  selectedFile,
  fileError,
  onClose,
  onSubmit,
  onFieldChange,
  onFileChange,
  onFileRemove
}: {
  isOpen: boolean;
  studentName: string;
  form: {
    classDate: string;
    type: JustificationType;
    status: JustificationStatus;
    note: string;
  };
  selectedFile: File | null;
  fileError: string;
  onClose: () => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onFieldChange: (field: "classDate" | "type" | "status" | "note", value: string) => void;
  onFileChange: (file: File | null) => void;
  onFileRemove: () => void;
}) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="justification-modal-overlay" role="presentation" onClick={onClose}>
      <div
        className="justification-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="justification-modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="justification-modal__header">
          <div className="justification-modal__copy">
            <h2 id="justification-modal-title">Adicionar justificativa</h2>
            <p>Registre uma justificativa de falta para o aluno {studentName}.</p>
          </div>

          <button className="justification-modal__close" type="button" aria-label="Fechar modal" onClick={onClose}>
            ×
          </button>
        </div>

        <form className="justification-modal__form" onSubmit={onSubmit}>
          <div className="justification-modal__fields">
            <DatePicker
              label="Data da aula *"
              value={form.classDate}
              onChange={(event) => onFieldChange("classDate", event.target.value)}
              required
              wrapperClassName="justification-modal__field"
            />

            <SelectField
              label="Tipo de justificativa"
              variant="form"
              ariaLabel="Tipo de justificativa"
              value={form.type}
              options={justificationTypeOptions.map((option) => ({ value: option, label: option }))}
              onChange={(event) => onFieldChange("type", event.target.value)}
              fieldClassName="justification-modal__field"
              required
            />

            <SelectField
              label="Status"
              variant="form"
              ariaLabel="Status"
              value={form.status}
              options={justificationStatusOptions.map((option) => ({ value: option, label: option }))}
              onChange={(event) => onFieldChange("status", event.target.value)}
              fieldClassName="justification-modal__field"
              required
            />

            <TextareaField
              label="Observação"
              rows={4}
              placeholder="Adicione observações sobre a justificativa..."
              value={form.note}
              onChange={(event) => onFieldChange("note", event.target.value)}
              wrapperClassName="justification-modal__field"
            />

            <DocumentUploadField
              label="Documento (opcional)"
              selectedFile={selectedFile}
              errorMessage={fileError}
              onFileChange={onFileChange}
              onFileRemove={onFileRemove}
            />
          </div>

          <div className="justification-modal__footer">
            <button className="justification-modal__button justification-modal__button--ghost" type="button" onClick={onClose}>
              Cancelar
            </button>
            <button className="justification-modal__button justification-modal__button--primary" type="submit">
              Salvar justificativa
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function DrawerTabContent({
  student,
  activeTab,
  onOpenFullHistory,
  onOpenJustificationModal,
  justificationRecords
}: {
  student: StudentRecord;
  activeTab: DrawerTab;
  onOpenFullHistory: () => void;
  onOpenJustificationModal: () => void;
  justificationRecords: JustificationRecord[];
}) {
  if (activeTab === "contact") {
    return (
      <Card className="student-card student-card--contact">
        <ContactLinkRow label="Telefone" value={student.details.contact.phone} href={`tel:${student.details.contact.phone}`} />
        <ContactLinkRow label="E-mail" value={student.details.contact.email} href={`mailto:${student.details.contact.email}`} />
        <ContactLinkRow
          label="Email Escolar"
          value={student.details.contact.schoolEmail}
          href={`mailto:${student.details.contact.schoolEmail}`}
        />
      </Card>
    );
  }

  if (activeTab === "address") {
    return <AddressContent student={student} />;
  }

  if (activeTab === "attachments") {
    return (
      <>
        <CollapsibleCard
          className="student-card student-card--attachments"
          title="Documentos Pessoais"
          icon={<AttachmentIcon name="file" className="attachment-symbol attachment-symbol--section" />}
          badge={1}
        >
          <div className="attachment-section__body">
            <AttachmentActionButton label="Adicionar documento" iconName="upload" />
            <AttachmentFileItem />
          </div>
        </CollapsibleCard>

        <CollapsibleCard
          className="student-card student-card--attachments"
          title="Justificativas de Faltas"
          icon={<AttachmentIcon name="calendar" className="attachment-symbol attachment-symbol--section" />}
        >
          <div className="attachment-section__body">
            <AttachmentActionButton label="Adicionar justificativa" iconName="plus" onClick={onOpenJustificationModal} />
            {justificationRecords.length > 0 ? (
              <div className="justification-records">
                {justificationRecords.map((record) => (
                  <JustificationRecordItem key={record.id} record={record} />
                ))}
              </div>
            ) : (
              <EmptyAttachmentState />
            )}
          </div>
        </CollapsibleCard>
      </>
    );
  }

  if (activeTab === "frequency") {
    return <FrequencyTabContent student={student} onOpenFullHistory={onOpenFullHistory} />;
  }

  return (
    <>
      <Card className="student-card">
        <div className="student-card__grid student-card__grid--personal">
          <div className="student-field student-field--full">
            <span className="student-field__label">Nome completo</span>
            <strong className="student-field__value">{student.name}</strong>
          </div>
          <DrawerField label="RG" value={student.details.rg} />
          <DrawerField label="Data de nascimento" value={student.details.birthDate} />
          <DrawerField label="Sexo" value={student.details.sex} />
          <DrawerField label="Estado civil" value={student.details.maritalStatus} />
          <DrawerField label="Nacionalidade" value={student.details.nationality} />
        </div>
      </Card>

      <Card className="student-card">
        <h3 className="student-card__title">Informações Familiares</h3>
        <div className="student-card__stack">
          <DrawerField label="Nome do pai" value={student.details.fatherName} />
          <DrawerField label="Nome da mãe" value={student.details.motherName} />
        </div>
      </Card>

      <Card className="student-card">
        <h3 className="student-card__title">Módulo e Turma</h3>
        <div className="student-card__stack">
          <div className="student-field">
            <span className="student-field__label">Módulo</span>
            <Pill label={student.module} tone={student.moduleTone as PillTone} />
          </div>
          <div className="student-field">
            <span className="student-field__label">Turma</span>
            <Pill label={student.className} tone={student.classTone as PillTone} />
          </div>
        </div>
      </Card>
    </>
  );
}

function StudentDrawer({
  student,
  activeTab,
  onTabChange,
  onClose,
  onOpenFullHistory,
  onOpenJustificationModal,
  justificationRecords
}: {
  student: StudentRecord;
  activeTab: DrawerTab;
  onTabChange: (tab: DrawerTab) => void;
  onClose: () => void;
  onOpenFullHistory: () => void;
  onOpenJustificationModal: () => void;
  justificationRecords: JustificationRecord[];
}) {
  const initials =
    student.initials ??
    student.name
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
        aria-labelledby="student-drawer-title"
        onClick={(event) => event.stopPropagation()}
      >
        <header className="student-drawer__header">
          <div className="student-drawer__summary">
            {student.avatar ? (
              <img className="student-drawer__avatar" src={student.avatar} alt="" aria-hidden="true" />
            ) : (
              <span className="student-drawer__avatar student-drawer__avatar--initials">{initials}</span>
            )}

            <div className="student-drawer__identity">
              <h2 id="student-drawer-title">{student.name}</h2>
              <StatusBadge status={student.status} />
            </div>
          </div>

          <IconButton className="student-drawer__close" icon={<X aria-hidden="true" />} label="Fechar painel" onClick={onClose} />
        </header>

        <div className="student-drawer__actions">
          <Button className="student-drawer__edit">Editar aluno</Button>

          <IconButton
            className="student-drawer__delete"
            icon={<Trash2 aria-hidden="true" />}
            label={`Excluir ${student.name}`}
          />
        </div>
        <Tabs
          className="student-drawer__tabs-shell"
          value={activeTab}
          onValueChange={(value) => onTabChange(value as DrawerTab)}
        >
          <TabsList className="student-drawer__tabs" variant="drawer" aria-label="Seções do aluno">
            {drawerTabs.map((tab) => (
              <TabsTrigger key={tab.id} className="student-drawer__tab" value={tab.id} variant="drawer">
                {tab.label}
                {tab.id === "attachments" ? (
                  <span className="student-drawer__tab-badge">{student.details.attachmentsCount}</span>
                ) : null}
              </TabsTrigger>
            ))}
          </TabsList>

          <div className="student-drawer__content">
            {drawerTabs.map((tab) => (
              <TabsContent key={tab.id} value={tab.id}>
                <DrawerTabContent
                  student={student}
                  activeTab={tab.id}
                  onOpenFullHistory={onOpenFullHistory}
                  onOpenJustificationModal={onOpenJustificationModal}
                  justificationRecords={justificationRecords}
                />
              </TabsContent>
            ))}
          </div>
        </Tabs>
      </aside>
    </div>
  );
}

export function StudentsPageDrawer() {
  const studentsPerPage = 8;
  const [query, setQuery] = useState("");
  const [moduleFilter, setModuleFilter] = useState<ModuleFilter>("Todos");
  const [classFilter, setClassFilter] = useState<ClassFilter>("Todas");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("Todos");
  const [selectedStudent, setSelectedStudent] = useState<StudentRecord | null>(null);
  const [historyStudent, setHistoryStudent] = useState<StudentRecord | null>(null);
  const [activeTab, setActiveTab] = useState<DrawerTab>("personal");
  const [studentSortKey, setStudentSortKey] = useState<StudentSortKey>("name");
  const [studentSortDirection, setStudentSortDirection] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [isDrawerClosing, setIsDrawerClosing] = useState(false);
  const [isJustificationModalOpen, setIsJustificationModalOpen] = useState(false);
  const [selectedJustificationFile, setSelectedJustificationFile] = useState<File | null>(null);
  const [justificationFileError, setJustificationFileError] = useState("");
  const [justificationRecordsByStudent, setJustificationRecordsByStudent] = useState<Record<number, JustificationRecord[]>>({});
  const [justificationForm, setJustificationForm] = useState<{
    classDate: string;
    type: JustificationType;
    status: JustificationStatus;
    note: string;
  }>({
    classDate: "",
    type: "Atestado médico",
    status: "Pendente",
    note: ""
  });

  const closeDrawer = () => {
    closeJustificationModal();
    setIsDrawerClosing(true);
    window.setTimeout(() => {
      setSelectedStudent(null);
      setActiveTab("personal");
      setIsDrawerClosing(false);
    }, 220);
  };

  useEffect(() => {
    if (!selectedStudent) {
      return undefined;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeDrawer();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedStudent]);

  useEffect(() => {
    if (!isJustificationModalOpen) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeJustificationModal();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isJustificationModalOpen]);

  const classOptions = useMemo(() => getClassOptions(moduleFilter), [moduleFilter]);
  const selectedStudentJustifications = selectedStudent ? justificationRecordsByStudent[selectedStudent.id] ?? [] : [];

  function resetJustificationForm() {
    setJustificationForm({
      classDate: "",
      type: "Atestado médico",
      status: "Pendente",
      note: ""
    });
    setSelectedJustificationFile(null);
    setJustificationFileError("");
  }

  function closeJustificationModal() {
    setIsJustificationModalOpen(false);
    resetJustificationForm();
  }

  function handleJustificationFieldChange(field: "classDate" | "type" | "status" | "note", value: string) {
    setJustificationForm((current) => {
      if (field === "type") {
        return {
          ...current,
          type: value as JustificationType
        };
      }

      if (field === "status") {
        return {
          ...current,
          status: value as JustificationStatus
        };
      }

      if (field === "note") {
        return {
          ...current,
          note: value
        };
      }

      return {
        ...current,
        classDate: value
      };
    });
  }

  function handleJustificationSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!selectedStudent || !justificationForm.classDate || justificationFileError) {
      return;
    }

    const nextRecord: JustificationRecord = {
      id: `${selectedStudent.id}-${Date.now()}`,
      classDate: formatIsoDateToBrazilianDate(justificationForm.classDate),
      type: justificationForm.type,
      status: justificationForm.status,
      note: justificationForm.note.trim(),
      fileName: selectedJustificationFile?.name,
      fileSizeLabel: selectedJustificationFile ? formatBytesToReadableSize(selectedJustificationFile.size) : undefined,
      createdAtLabel: new Intl.DateTimeFormat("pt-BR").format(new Date())
    };

    setJustificationRecordsByStudent((current) => ({
      ...current,
      [selectedStudent.id]: [nextRecord, ...(current[selectedStudent.id] ?? [])]
    }));

    closeJustificationModal();
  }

  function handleJustificationFileChange(file: File | null) {
    if (!file) {
      setSelectedJustificationFile(null);
      setJustificationFileError("");
      return;
    }

    const isValidType = ["application/pdf", "image/png", "image/jpeg"].includes(file.type);
    if (!isValidType) {
      setSelectedJustificationFile(null);
      setJustificationFileError("Envie um arquivo PDF, PNG ou JPG.");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setSelectedJustificationFile(null);
      setJustificationFileError("O arquivo precisa ter no máximo 10MB.");
      return;
    }

    setSelectedJustificationFile(file);
    setJustificationFileError("");
  }

  function handleJustificationFileRemove() {
    setSelectedJustificationFile(null);
    setJustificationFileError("");
  }

  const studentsWithDetails = useMemo(
    () =>
      students.map((student) => {
        const normalizedModule = normalizeStudentText(student.module)
          .replace("Módulo", "Módulo")
          .replace("Módulo", "Módulo");
        const normalizedClassName = normalizeStudentText(student.className)
          .replace("Teoria Musical", "Canto coral")
          .replace("Solfejo", "Violão");
        const normalizedStatus =
          student.id === 2 ? "Inativo" : student.id === 5 ? "Trancamento" : student.status;

        return {
          ...student,
          status: normalizedStatus,
          module: normalizedModule,
          className: normalizedClassName,
          attendance: getStudentFrequencyRecords(
            student.id,
            normalizedModule,
            student.moduleTone,
            normalizedClassName,
            student.classTone
          ),
          details: studentDetailsById[student.id]
        };
      }),
    []
  );

  const filteredStudents = useMemo(
    () => {
      const visibleStudents = studentsWithDetails.filter((student) => {
        const search = query.trim().toLowerCase();
        const matchesQuery =
          search === "" ||
          [student.name, student.phone, student.email].some((value) => value.toLowerCase().includes(search));
        const matchesModule = moduleFilter === "Todos" || student.module === moduleFilter;
        const matchesClass = classFilter === "Todas" || student.className === classFilter;
        const matchesStatus = statusFilter === "Todos" || student.status === statusFilter;

        return matchesQuery && matchesModule && matchesClass && matchesStatus;
      });

      return [...visibleStudents].sort((left, right) => {
        let comparison = 0;

        if (studentSortKey === "name") {
          comparison = left.name.localeCompare(right.name, "pt-BR");
        }

        if (studentSortKey === "status") {
          comparison = compareStudentStatus(left.status, right.status);
        }

        if (studentSortKey === "contact") {
          comparison = left.email.localeCompare(right.email, "pt-BR");
        }

        if (studentSortKey === "module") {
          comparison = left.module.localeCompare(right.module, "pt-BR", { numeric: true });
        }

        if (studentSortKey === "className") {
          comparison = left.className.localeCompare(right.className, "pt-BR", { numeric: true });
        }

        return studentSortDirection === "asc" ? comparison : comparison * -1;
      });
    },
    [classFilter, moduleFilter, query, statusFilter, studentSortDirection, studentSortKey, studentsWithDetails]
  );

  function handleStudentSort(nextKey: StudentSortKey) {
    if (nextKey === studentSortKey) {
      setStudentSortDirection((current) => (current === "asc" ? "desc" : "asc"));
      return;
    }

    setStudentSortKey(nextKey);
    setStudentSortDirection(nextKey === "status" ? "asc" : "asc");
  }

  const totalPages = Math.max(1, Math.ceil(filteredStudents.length / studentsPerPage));
  const paginatedStudents = useMemo(
    () => filteredStudents.slice((currentPage - 1) * studentsPerPage, currentPage * studentsPerPage),
    [currentPage, filteredStudents]
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [classFilter, moduleFilter, query, statusFilter]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const moduleFilterOptions = [
    { value: "Todos", label: "Filtrar por Módulos" },
    { value: "Módulo I", label: "Módulo I" },
    { value: "Módulo II", label: "Módulo II" },
    { value: "Módulo III", label: "Módulo III" }
  ];
  const classFilterOptions = classOptions.map((option) => ({
    value: option,
    label: option === "Todas" ? "Filtrar por Turmas" : option
  }));
  const statusFilterOptions = statusOptions.map((option) => ({
    value: option,
    label: option === "Todos" ? "Filtrar por Status" : option
  }));

  return (
    <>
      {historyStudent ? (
        <StudentAttendanceHistoryView
          studentName={historyStudent.name}
          records={historyStudent.attendance}
          onBack={() => {
            setHistoryStudent(null);
            setSelectedStudent(historyStudent);
            setActiveTab("frequency");
          }}
        />
      ) : (
        <>
      <main className={`students-page ${selectedStudent ? "students-page--drawer-open" : ""}`}>
        <section className="page-header">
          <div className="page-header__copy">
            <h1>Alunos -</h1>
            <p>Gerencie o cadastro completo de alunos.</p>
          </div>

          <Button icon={<Plus aria-hidden="true" />}>Adicionar aluno</Button>
        </section>

        <section className="filters" aria-label="Busca e filtros">
          <SearchInput
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Buscar por nome, telefone ou email..."
            ariaLabel="Buscar por nome, telefone ou email"
          />

          <div className="filters__group">
            <SelectField
              ariaLabel="Filtrar por módulos"
              value={moduleFilter}
              options={moduleFilterOptions}
              onChange={(event) => {
                setModuleFilter(event.target.value as ModuleFilter);
                setClassFilter("Todas");
              }}
            />
            <SelectField
              ariaLabel="Filtrar por turmas"
              value={classFilter}
              options={classFilterOptions}
              onChange={(event) => setClassFilter(event.target.value as ClassFilter)}
            />
            <SelectField
              ariaLabel="Filtrar por status"
              value={statusFilter}
              options={statusFilterOptions}
              onChange={(event) => setStatusFilter(event.target.value as StatusFilter)}
            />
          </div>
        </section>

        <TableCard title="Alunos" titleId="students-title" countLabel={`${filteredStudents.length} alunos`}>

          <div className="table-scroll students-table-shell">
            <table className="students-table">
              <thead>
                <tr>
                  <th>
                    <div className="header-with-checkbox">
                      <Checkbox aria-label="Selecionar todos" />
                      <button
                        className={`table-header-button ${studentSortKey === "name" ? "is-active" : ""}`}
                        type="button"
                        onClick={() => handleStudentSort("name")}
                      >
                        <span>Nome</span>
                        <ChevronDown
                          className={`table-header-button__icon ${
                            studentSortKey === "name" && studentSortDirection === "asc" ? "is-ascending" : ""
                          }`}
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </th>
                  <th>
                    <button
                      className={`table-header-button ${studentSortKey === "status" ? "is-active" : ""}`}
                      type="button"
                      onClick={() => handleStudentSort("status")}
                    >
                      <span>Status</span>
                      <ChevronDown
                        className={`table-header-button__icon ${
                          studentSortKey === "status" && studentSortDirection === "asc" ? "is-ascending" : ""
                        }`}
                        aria-hidden="true"
                      />
                    </button>
                  </th>
                  <th>
                    <span className="table-header-label">Contato</span>
                  </th>
                  <th>
                    <button
                      className={`table-header-button ${studentSortKey === "module" ? "is-active" : ""}`}
                      type="button"
                      onClick={() => handleStudentSort("module")}
                    >
                      <span>Módulo</span>
                      <ChevronDown
                        className={`table-header-button__icon ${
                          studentSortKey === "module" && studentSortDirection === "asc" ? "is-ascending" : ""
                        }`}
                        aria-hidden="true"
                      />
                    </button>
                  </th>
                  <th>
                    <button
                      className={`table-header-button ${studentSortKey === "className" ? "is-active" : ""}`}
                      type="button"
                      onClick={() => handleStudentSort("className")}
                    >
                      <span>Turma</span>
                      <ChevronDown
                        className={`table-header-button__icon ${
                          studentSortKey === "className" && studentSortDirection === "asc" ? "is-ascending" : ""
                        }`}
                        aria-hidden="true"
                      />
                    </button>
                  </th>
                </tr>
              </thead>

              <tbody>
                {paginatedStudents.map((student) => (
                  <tr key={student.id}>
                    <td>
                      <div className="student-cell">
                        <Checkbox aria-label={`Selecionar ${student.name}`} />

                        {student.avatar ? (
                          <img className="student-avatar" src={student.avatar} alt="" aria-hidden="true" />
                        ) : (
                          <span className="student-avatar student-avatar--initials">{student.initials}</span>
                        )}

                        <button
                          className="student-name-button"
                          type="button"
                          onClick={() => {
                            setSelectedStudent(student);
                            setActiveTab("personal");
                          }}
                        >
                          <span className="student-name">{student.name}</span>
                        </button>
                      </div>
                    </td>
                    <td>
                      <StatusBadge status={student.status} />
                    </td>
                    <td>
                      <div className="contact-cell">
                        <span>{student.phone}</span>
                        <span>{student.email}</span>
                      </div>
                    </td>
                    <td>
                      <Pill label={student.module} tone={student.moduleTone as PillTone} />
                    </td>
                    <td>
                      <Pill label={student.className} tone={student.classTone as PillTone} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="students-mobile-list">
            {paginatedStudents.map((student) => (
              <article key={student.id} className="students-mobile-card">
                <div className="students-mobile-card__header">
                  <div className="student-cell">
                    <Checkbox aria-label={`Selecionar ${student.name}`} />

                    {student.avatar ? (
                      <img className="student-avatar" src={student.avatar} alt="" aria-hidden="true" />
                    ) : (
                      <span className="student-avatar student-avatar--initials">{student.initials}</span>
                    )}

                    <button
                      className="student-name-button"
                      type="button"
                      onClick={() => {
                        setSelectedStudent(student);
                        setActiveTab("personal");
                      }}
                    >
                      <span className="student-name">{student.name}</span>
                    </button>
                  </div>
                  <StatusBadge status={student.status} />
                </div>

                <div className="students-mobile-card__body">
                  <div className="students-mobile-card__field">
                    <span>Contato</span>
                    <div className="contact-cell">
                      <span>{student.phone}</span>
                      <span>{student.email}</span>
                    </div>
                  </div>

                  <div className="students-mobile-card__field">
                    <span>Módulo</span>
                    <Pill label={student.module} tone={student.moduleTone as PillTone} />
                  </div>

                  <div className="students-mobile-card__field">
                    <span>Turma</span>
                    <Pill label={student.className} tone={student.classTone as PillTone} />
                  </div>
                </div>
              </article>
            ))}
          </div>

          {totalPages > 1 ? (
            <footer className="pagination">
              <button
                className="pagination__button"
                type="button"
                onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
                disabled={currentPage === 1}
              >
                <span>Anterior</span>
              </button>

              <div className="pagination__numbers" aria-label="Paginação da tabela de alunos">
                {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                  <button
                    key={page}
                    className={`pagination__number ${page === currentPage ? "is-active" : ""}`}
                    type="button"
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </button>
                ))}
              </div>

              <button
                className="pagination__button"
                type="button"
                onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
                disabled={currentPage === totalPages}
              >
                <span>Próxima</span>
              </button>
            </footer>
          ) : null}

        </TableCard>
      </main>

      {selectedStudent ? (
        <div className={`student-drawer-shell ${isDrawerClosing ? "is-closing" : ""}`}>
          <StudentDrawer
            student={selectedStudent}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            onOpenFullHistory={() => {
              setHistoryStudent(selectedStudent);
              setSelectedStudent(null);
              setIsDrawerClosing(false);
            }}
            onClose={closeDrawer}
            onOpenJustificationModal={() => {
              resetJustificationForm();
              setIsJustificationModalOpen(true);
            }}
            justificationRecords={selectedStudentJustifications}
          />
        </div>
      ) : null}
      {selectedStudent ? (
        <StudentJustificationModal
          isOpen={isJustificationModalOpen}
          studentName={selectedStudent.name}
          form={justificationForm}
          selectedFile={selectedJustificationFile}
          fileError={justificationFileError}
          onClose={closeJustificationModal}
          onSubmit={handleJustificationSubmit}
          onFieldChange={handleJustificationFieldChange}
          onFileChange={handleJustificationFileChange}
          onFileRemove={handleJustificationFileRemove}
        />
      ) : null}
        </>
      )}
    </>
  );
}




