import { useEffect, useMemo, useRef, useState } from "react";
import {
  AlertCircle,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  ClipboardCheck,
  Clock3,
  Download,
  ExternalLink,
  Eye,
  FileImage,
  FileText,
  Home,
  LoaderCircle,
  PenLine,
  Plus,
  Trash2,
  Upload,
  X
} from "lucide-react";
import type { FormEvent, ReactNode } from "react";

import { Badge } from "@/src/components/ui/badge";
import { Button, IconButton } from "@/src/components/ui/button";
import { Card } from "@/src/components/ui/card";
import { Checkbox } from "@/src/components/ui/checkbox";
import { CollapsibleCard } from "@/src/components/ui/collapsible-card";
import { DatePicker } from "@/src/components/ui/date-picker";
import { DocumentUploadField } from "@/src/components/ui/document-upload-field";
import { Input } from "@/src/components/ui/input";
import { ModalContainer } from "@/src/components/ui/modal-container";
import { Pill, type PillTone } from "@/src/components/ui/pill";
import { SearchInput } from "@/src/components/ui/search-input";
import { SecondaryButton } from "@/src/components/ui/secondary-button";
import { SelectField } from "@/src/components/ui/select-field";
import { Stepper } from "@/src/components/ui/stepper";
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

type PersonalAttachmentRecord = {
  id: string;
  file: File;
  createdAtLabel: string;
};

type ScannedUploadFiles = {
  enrollmentForm: File | null;
  identityDocument: File | null;
  residenceProof: File | null;
  photo: File | null;
};

type ScannedReviewDocumentId = keyof ScannedUploadFiles;
type ScannedEnrollmentForm = {
  module: string;
  className: string;
};

const emptyScannedUploadFiles: ScannedUploadFiles = {
  enrollmentForm: null,
  identityDocument: null,
  residenceProof: null,
  photo: null
};

const emptyScannedEnrollmentForm: ScannedEnrollmentForm = {
  module: "",
  className: ""
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
const personalDocumentAcceptedExtensions = [".pdf", ".doc", ".docx", ".jpg", ".jpeg", ".png"];
const personalDocumentAcceptedMimeTypes = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "image/jpeg",
  "image/png"
];

const manualRegistrationSteps = [
  { id: "personal", label: "Dados pessoais" },
  { id: "documents", label: "Documentos" },
  { id: "enrollment", label: "Matrícula" },
  { id: "attachments", label: "Anexos" }
];

const scannedRegistrationSteps = [
  { id: "instructions", label: "Instruções" },
  { id: "upload", label: "Upload" },
  { id: "review", label: "Revisão" },
  { id: "module", label: "Módulo" },
  { id: "confirm", label: "Confirmar" }
];

type ExtractionConfidence = "high" | "medium" | "low";

const confidenceBadgeByLevel: Record<ExtractionConfidence, { label: string; variant: "success" | "warning" | "error" }> = {
  high: { label: "Alta confiança", variant: "success" },
  medium: { label: "Confiança média", variant: "warning" },
  low: { label: "Confiança baixa", variant: "error" }
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

function formatBrazilianDateToIso(value: string) {
  if (!value) {
    return "";
  }

  const [day, month, year] = value.split("/");

  if (!day || !month || !year) {
    return value;
  }

  return `${year}-${month}-${day}`;
}

function formatBytesToReadableSize(bytes: number) {
  if (bytes < 1024 * 1024) {
    return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  }

  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function onlyDigits(value: string) {
  return value.replace(/\D/g, "");
}

function applyPhoneMask(value: string) {
  const digits = onlyDigits(value).slice(0, 11);
  if (digits.length === 0) {
    return "";
  }
  if (digits.length <= 2) {
    return `(${digits}`;
  }
  if (digits.length <= 6) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  }
  if (digits.length <= 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  }
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

function applyRgMask(value: string) {
  const digits = onlyDigits(value).slice(0, 9);
  if (digits.length <= 2) {
    return digits;
  }
  if (digits.length <= 5) {
    return `${digits.slice(0, 2)}.${digits.slice(2)}`;
  }
  if (digits.length <= 8) {
    return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5)}`;
  }
  return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5, 8)}-${digits.slice(8)}`;
}

function applyCpfMask(value: string) {
  const digits = onlyDigits(value).slice(0, 11);
  if (digits.length <= 3) {
    return digits;
  }
  if (digits.length <= 6) {
    return `${digits.slice(0, 3)}.${digits.slice(3)}`;
  }
  if (digits.length <= 9) {
    return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6)}`;
  }
  return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6, 9)}-${digits.slice(9)}`;
}

function applyCepMask(value: string) {
  const digits = onlyDigits(value).slice(0, 8);
  if (digits.length <= 5) {
    return digits;
  }
  return `${digits.slice(0, 5)}-${digits.slice(5)}`;
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

function AttachmentFileItem({
  record,
  onView,
  onDownload,
  onRequestDelete
}: {
  record: PersonalAttachmentRecord;
  onView: (record: PersonalAttachmentRecord) => void;
  onDownload: (record: PersonalAttachmentRecord) => void;
  onRequestDelete: (record: PersonalAttachmentRecord) => void;
}) {
  return (
    <div className="attachment-file">
      <div className="attachment-file__meta">
        <AttachmentIcon name="file" className="attachment-symbol attachment-symbol--file-item" />
        <div className="attachment-file__text">
          <button className="attachment-file__name-button" type="button" onClick={() => onView(record)}>
            {record.file.name}
          </button>
          <span>
            {formatBytesToReadableSize(record.file.size)} - {record.createdAtLabel}
          </span>
        </div>
      </div>

      <div className="attachment-file__actions">
        <button className="attachment-icon-button" type="button" aria-label={`Visualizar ${record.file.name}`} onClick={() => onView(record)}>
          <AttachmentIcon name="view" className="attachment-symbol attachment-symbol--icon-button" />
        </button>
        <button className="attachment-icon-button" type="button" aria-label={`Baixar ${record.file.name}`} onClick={() => onDownload(record)}>
          <AttachmentIcon name="download" className="attachment-symbol attachment-symbol--icon-button" />
        </button>
        <button className="attachment-icon-button" type="button" aria-label={`Excluir ${record.file.name}`} onClick={() => onRequestDelete(record)}>
          <AttachmentIcon name="trash" className="attachment-symbol attachment-symbol--icon-button" />
        </button>
      </div>
    </div>
  );
}

function EmptyPersonalAttachmentState() {
  return (
    <div className="attachment-empty-state">
      <AttachmentIcon name="file" className="attachment-symbol attachment-symbol--empty-state" />
      <p>Nenhum documento anexado</p>
    </div>
  );
}

function StudentDocumentUploadModal({
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
        className="justification-modal attachment-upload-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="document-upload-modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="justification-modal__header">
          <div className="justification-modal__copy">
            <h2 id="document-upload-modal-title">Adicionar anexo</h2>
          </div>

          <button className="justification-modal__close" type="button" aria-label="Fechar modal" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="attachment-upload-modal__body">
          <div
            className="attachment-upload-modal__dropzone"
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
              accept={acceptedInput}
              onChange={(event) => {
                onFileSelected(event.target.files?.[0] ?? null);
                event.target.value = "";
              }}
            />
            <span className="attachment-upload-modal__icon" aria-hidden="true">
              <Upload />
            </span>
            <p className="attachment-upload-modal__title">Clique para fazer upload ou arraste e solte</p>
            <p className="attachment-upload-modal__hint">{acceptedFilesHint}</p>
            <Button
              type="button"
              variant="primary"
              onClick={() => {
                inputRef.current?.click();
              }}
            >
              Selecionar arquivos
            </Button>
          </div>
          {fileError ? <small className="attachment-upload-modal__error">{fileError}</small> : null}
        </div>
      </div>
    </div>
  );
}

function StudentAttachmentDeleteModal({
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
        className="justification-modal attachment-delete-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="attachment-delete-modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="attachment-delete-modal__body">
          <h2 id="attachment-delete-modal-title">Remover anexo</h2>
          <p>
            Tem certeza que deseja remover este anexo? Esta ação não pode ser desfeita.
          </p>
          <div className="attachment-delete-modal__actions">
            <Button type="button" variant="ghost" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="button" variant="danger" onClick={onConfirm} aria-label={`Remover ${attachmentName}`}>
              Remover
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function RegistrationTypeModal({
  isOpen,
  onClose,
  onSelectManual,
  onSelectOcr
}: {
  isOpen: boolean;
  onClose: () => void;
  onSelectManual: () => void;
  onSelectOcr: () => void;
}) {
  if (!isOpen) {
    return null;
  }

  return (
    <ModalContainer
      isOpen={isOpen}
      onClose={onClose}
      titleId="registration-choice-modal-title"
      title="Adicionar Aluno"
      subtitle="Escolha como deseja realizar o cadastro"
      overlayClassName="registration-choice-modal-overlay"
      className="registration-choice-modal"
      headerClassName="registration-choice-modal__header"
      copyClassName="registration-choice-modal__copy"
      closeButtonClassName="registration-choice-modal__close"
      bodyClassName="registration-choice-modal__body"
    >
      <div className="registration-choice-modal__options">
        <button className="registration-choice-option registration-choice-option--manual" type="button" onClick={onSelectManual}>
          <span className="registration-choice-option__icon registration-choice-option__icon--manual" aria-hidden="true">
            <FileText />
          </span>
          <span className="registration-choice-option__title">Cadastro Manual</span>
          <span className="registration-choice-option__description">
            Preencha todos os dados do aluno manualmente através de um formulário completo
          </span>
          <span className="registration-choice-option__tag">Modo tradicional</span>
        </button>

        <button className="registration-choice-option registration-choice-option--ocr" type="button" onClick={onSelectOcr}>
          <span className="registration-choice-option__recommended">Recomendado</span>
          <span className="registration-choice-option__icon registration-choice-option__icon--ocr" aria-hidden="true">
            <Upload />
          </span>
          <span className="registration-choice-option__title">Escaneamento de Documentos</span>
          <span className="registration-choice-option__description">
            Envie fotos dos documentos e deixe o sistema preencher os dados automaticamente
          </span>
          <span className="registration-choice-option__chip-group">
            <span className="registration-choice-option__chip">⚡ Mais rápido</span>
            <span className="registration-choice-option__chip">✓ Menos erros</span>
          </span>
        </button>
      </div>

      <div className="registration-choice-modal__tip">
        <p>
          <span>💡</span>
          <strong>Dica:</strong> O escaneamento de documentos reduz o tempo de cadastro em até 70% e minimiza erros de digitação.
        </p>
      </div>
    </ModalContainer>
  );
}

function ManualStudentRegistrationModal({
  isOpen,
  onClose
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const contentRef = useRef<HTMLDivElement>(null);
  const applyBirthDateMask = (value: string) => {
    const digits = onlyDigits(value).slice(0, 8);
    if (digits.length <= 2) {
      return digits;
    }
    if (digits.length <= 4) {
      return `${digits.slice(0, 2)}/${digits.slice(2)}`;
    }
    return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`;
  };

  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);
  const [personalFormValues, setPersonalFormValues] = useState({
    fullName: "",
    birthDate: "",
    sex: "",
    maritalStatus: "",
    nationality: "",
    email: "",
    schoolEmail: "",
    phone: ""
  });
  const [documentsFormValues, setDocumentsFormValues] = useState({
    rg: "",
    cpf: "",
    street: "",
    number: "",
    neighborhood: "",
    city: "",
    state: "",
    zipCode: ""
  });
  const [enrollmentFormValues, setEnrollmentFormValues] = useState({
    module: "",
    className: "",
    status: "",
    fatherName: "",
    motherName: ""
  });
  const [attachmentsFormValues, setAttachmentsFormValues] = useState({
    photo: null as File | null,
    rg: null as File | null,
    cnh: null as File | null,
    residenceProof: null as File | null
  });

  const selectPlaceholder = { value: "", label: "Selecione" };
  const sexOptions = [selectPlaceholder, { value: "feminino", label: "Feminino" }, { value: "masculino", label: "Masculino" }];
  const maritalStatusOptions = [
    selectPlaceholder,
    { value: "solteiro", label: "Solteiro(a)" },
    { value: "casado", label: "Casado(a)" },
    { value: "divorciado", label: "Divorciado(a)" },
    { value: "viuvo", label: "Viúvo(a)" }
  ];
  const stateOptions = [
    { value: "", label: "" },
    { value: "SP", label: "SP" },
    { value: "RJ", label: "RJ" },
    { value: "MG", label: "MG" },
    { value: "BA", label: "BA" }
  ];
  const moduleOptions = [
    { value: "", label: "Selecione" },
    { value: "Módulo I", label: "Módulo I" },
    { value: "Módulo II", label: "Módulo II" },
    { value: "Módulo III", label: "Módulo III" }
  ];
  const enrollmentStatusOptions = [
    { value: "", label: "Selecione" },
    { value: "Ativo", label: "Ativo" },
    { value: "Inativo", label: "Inativo" },
    { value: "Trancamento", label: "Trancamento" }
  ];

  const classOptions = useMemo(() => {
    if (!enrollmentFormValues.module) {
      return [{ value: "", label: "Selecione" }];
    }

    return [
      { value: "", label: "Selecione" },
      ...getClassOptions(enrollmentFormValues.module as ModuleFilter)
        .filter((option) => option !== "Todas")
        .map((option) => ({ value: option, label: option }))
    ];
  }, [enrollmentFormValues.module]);

  const isStep1Valid =
    personalFormValues.fullName.trim() !== "" &&
    personalFormValues.birthDate.trim() !== "" &&
    personalFormValues.email.trim() !== "" &&
    personalFormValues.phone.trim() !== "";
  const isStep2Valid = documentsFormValues.rg.trim() !== "";
  const isStep3Valid =
    enrollmentFormValues.module.trim() !== "" &&
    enrollmentFormValues.className.trim() !== "" &&
    enrollmentFormValues.status.trim() !== "";
  const isStep4Valid = Boolean(attachmentsFormValues.rg || attachmentsFormValues.cnh);
  const isContinueDisabled =
    (currentStep === 1 && !isStep1Valid) ||
    (currentStep === 2 && !isStep2Valid) ||
    (currentStep === 3 && !isStep3Valid) ||
    (currentStep === 4 && !isStep4Valid);

  useEffect(() => {
    if (isOpen) {
      setCurrentStep(1);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    contentRef.current?.scrollTo({ top: 0, behavior: "auto" });
  }, [currentStep, isOpen]);

  useEffect(() => {
    if (!enrollmentFormValues.module) {
      setEnrollmentFormValues((current) => ({
        ...current,
        className: ""
      }));
      return;
    }

    const availableClasses = getClassOptions(enrollmentFormValues.module as ModuleFilter).filter((option) => option !== "Todas");
    if (!availableClasses.includes(enrollmentFormValues.className)) {
      setEnrollmentFormValues((current) => ({
        ...current,
        className: ""
      }));
    }
  }, [enrollmentFormValues.className, enrollmentFormValues.module]);

  function updatePersonalField(field: keyof typeof personalFormValues, value: string) {
    const nextValue =
      field === "birthDate"
        ? applyBirthDateMask(value)
        : field === "phone"
          ? applyPhoneMask(value)
          : value;

    setPersonalFormValues((current) => ({
      ...current,
      [field]: nextValue
    }));
  }

  function updateDocumentsField(field: keyof typeof documentsFormValues, value: string) {
    const nextValue =
      field === "rg"
        ? applyRgMask(value)
        : field === "cpf"
          ? applyCpfMask(value)
          : field === "zipCode"
            ? applyCepMask(value)
            : value;

    setDocumentsFormValues((current) => ({
      ...current,
      [field]: nextValue
    }));
  }

  function updateEnrollmentField(field: keyof typeof enrollmentFormValues, value: string) {
    setEnrollmentFormValues((current) => ({
      ...current,
      [field]: value
    }));
  }

  function updateAttachmentField(field: keyof typeof attachmentsFormValues, value: File | null) {
    setAttachmentsFormValues((current) => ({
      ...current,
      [field]: value
    }));
  }

  if (!isOpen) {
    return null;
  }

  return (
    <ModalContainer
      isOpen={isOpen}
      onClose={onClose}
      titleId="manual-student-modal-title"
      title="Adicionar Aluno"
      subtitle="Preencha os dados do novo aluno"
      overlayClassName="manual-student-modal-overlay"
      className="manual-student-modal"
      headerClassName="manual-student-modal__header"
      copyClassName="manual-student-modal__copy"
      closeButtonClassName="manual-student-modal__close"
      bodyClassName="manual-student-modal__body"
      footerClassName="manual-student-modal__footer"
      footer={
        <>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="manual-student-modal__cancel"
            onClick={() => {
              if (currentStep === 1) {
                onClose();
                return;
              }

              setCurrentStep((current) => (current === 4 ? 3 : current === 3 ? 2 : 1));
            }}
          >
            {currentStep === 1 ? "Cancelar" : "Voltar"}
          </Button>
          <Button
            type="button"
            variant="primary"
            size="sm"
            className="manual-student-modal__continue"
            disabled={isContinueDisabled}
            onClick={() => {
              if (currentStep === 1) {
                setCurrentStep(2);
                return;
              }

              if (currentStep === 2) {
                setCurrentStep(3);
                return;
              }

              if (currentStep === 3) {
                setCurrentStep(4);
                return;
              }

              onClose();
            }}
          >
            {currentStep === 4 ? "Finalizar cadastro" : "Continuar"}
          </Button>
        </>
      }
    >
      <div className="manual-student-modal__stepper">
          <Stepper steps={manualRegistrationSteps} currentStep={currentStep} ariaLabel="Etapas do cadastro de aluno" />
      </div>

      <div ref={contentRef} className="manual-student-modal__content">
          {currentStep === 1 ? (
            <div className="manual-student-modal__form">
              <label className="manual-student-modal__field manual-student-modal__field--full">
                <span>
                  Nome completo <strong>*</strong>
                </span>
                <Input
                  value={personalFormValues.fullName}
                  showLabel={false}
                  required
                  placeholder="Digite o nome completo"
                  onChange={(event) => updatePersonalField("fullName", event.target.value)}
                />
              </label>

              <label className="manual-student-modal__field">
                <span>
                  Data de nascimento <strong>*</strong>
                </span>
                <Input
                  value={personalFormValues.birthDate}
                  showLabel={false}
                  inputMode="numeric"
                  maxLength={10}
                  required
                  placeholder="dd/mm/aaaa"
                  onChange={(event) => updatePersonalField("birthDate", event.target.value)}
                />
              </label>

              <div className="manual-student-modal__field">
                <span>Sexo</span>
                <SelectField
                  ariaLabel="Selecione o sexo"
                  value={personalFormValues.sex}
                  variant="form"
                  options={sexOptions}
                  onChange={(event) => updatePersonalField("sex", event.target.value)}
                />
              </div>

              <div className="manual-student-modal__field">
                <span>Estado civil</span>
                <SelectField
                  ariaLabel="Selecione o estado civil"
                  value={personalFormValues.maritalStatus}
                  variant="form"
                  options={maritalStatusOptions}
                  onChange={(event) => updatePersonalField("maritalStatus", event.target.value)}
                />
              </div>

              <label className="manual-student-modal__field">
                <span>Nacionalidade</span>
                <Input
                  value={personalFormValues.nationality}
                  showLabel={false}
                  placeholder="Ex: Brasileira"
                  onChange={(event) => updatePersonalField("nationality", event.target.value)}
                />
              </label>

              <label className="manual-student-modal__field manual-student-modal__field--full">
                <span>
                  E-mail <strong>*</strong>
                </span>
                <Input
                  type="email"
                  value={personalFormValues.email}
                  showLabel={false}
                  required
                  placeholder="exemplo@email.com"
                  onChange={(event) => updatePersonalField("email", event.target.value)}
                />
              </label>

              <label className="manual-student-modal__field manual-student-modal__field--full">
                <span>E-mail escolar</span>
                <Input
                  type="email"
                  value={personalFormValues.schoolEmail}
                  showLabel={false}
                  placeholder="exemplo@email.com"
                  onChange={(event) => updatePersonalField("schoolEmail", event.target.value)}
                />
              </label>

              <label className="manual-student-modal__field manual-student-modal__field--full">
                <span>
                  Telefone <strong>*</strong>
                </span>
                <Input
                  value={personalFormValues.phone}
                  showLabel={false}
                  inputMode="numeric"
                  maxLength={15}
                  required
                  placeholder="(00) 00000-0000"
                  onChange={(event) => updatePersonalField("phone", event.target.value)}
                />
              </label>
            </div>
          ) : currentStep === 2 ? (
            <div className="manual-student-modal__documents-content">
              <section className="manual-student-modal__section">
                <h3 className="manual-student-modal__section-title">Documentos</h3>
                <div className="manual-student-modal__row">
                  <label className="manual-student-modal__field">
                    <span>
                      RG <strong>*</strong>
                    </span>
                    <Input
                      value={documentsFormValues.rg}
                      showLabel={false}
                      inputMode="numeric"
                      maxLength={12}
                      required
                      placeholder="00.000.000-0"
                      onChange={(event) => updateDocumentsField("rg", event.target.value)}
                    />
                  </label>
                  <label className="manual-student-modal__field">
                    <span>CPF</span>
                    <Input
                      value={documentsFormValues.cpf}
                      showLabel={false}
                      inputMode="numeric"
                      maxLength={14}
                      placeholder="000.000.000-00"
                      onChange={(event) => updateDocumentsField("cpf", event.target.value)}
                    />
                  </label>
                </div>
              </section>

              <section className="manual-student-modal__section">
                <h3 className="manual-student-modal__section-title">Endereço</h3>
                <div className="manual-student-modal__row manual-student-modal__row--wide-narrow">
                  <label className="manual-student-modal__field">
                    <span>Rua</span>
                    <Input
                      value={documentsFormValues.street}
                      showLabel={false}
                      placeholder="Nome da rua"
                      onChange={(event) => updateDocumentsField("street", event.target.value)}
                    />
                  </label>
                  <label className="manual-student-modal__field">
                    <span>Número</span>
                    <Input
                      value={documentsFormValues.number}
                      showLabel={false}
                      placeholder="Nº"
                      onChange={(event) => updateDocumentsField("number", event.target.value)}
                    />
                  </label>
                </div>
                <label className="manual-student-modal__field">
                  <span>Bairro</span>
                  <Input
                    value={documentsFormValues.neighborhood}
                    showLabel={false}
                    placeholder="Nome do bairro"
                    onChange={(event) => updateDocumentsField("neighborhood", event.target.value)}
                  />
                </label>
                <div className="manual-student-modal__row manual-student-modal__row--wide-narrow">
                  <label className="manual-student-modal__field">
                    <span>Cidade</span>
                    <Input
                      value={documentsFormValues.city}
                      showLabel={false}
                      placeholder="Nome da cidade"
                      onChange={(event) => updateDocumentsField("city", event.target.value)}
                    />
                  </label>
                  <div className="manual-student-modal__field">
                    <span>UF</span>
                    <SelectField
                      ariaLabel="Selecione a UF"
                      value={documentsFormValues.state}
                      variant="form"
                      options={stateOptions}
                      onChange={(event) => updateDocumentsField("state", event.target.value)}
                    />
                  </div>
                </div>
                <label className="manual-student-modal__field">
                  <span>CEP</span>
                  <Input
                    value={documentsFormValues.zipCode}
                    showLabel={false}
                    inputMode="numeric"
                    maxLength={9}
                    placeholder="00000-000"
                    onChange={(event) => updateDocumentsField("zipCode", event.target.value)}
                  />
                </label>
              </section>
            </div>
          ) : currentStep === 3 ? (
            <div className="manual-student-modal__documents-content">
              <section className="manual-student-modal__section">
                <h3 className="manual-student-modal__section-title">
                  Matrícula <strong>*</strong>
                </h3>
                <div className="manual-student-modal__field">
                  <span>
                    Módulo <strong>*</strong>
                  </span>
                  <SelectField
                    ariaLabel="Selecione o módulo"
                    value={enrollmentFormValues.module}
                    variant="form"
                    required
                    options={moduleOptions}
                    onChange={(event) => updateEnrollmentField("module", event.target.value)}
                  />
                </div>
                <div className="manual-student-modal__field">
                  <span>
                    Turma <strong>*</strong>
                  </span>
                  <SelectField
                    ariaLabel="Selecione a turma"
                    value={enrollmentFormValues.className}
                    variant="form"
                    required
                    options={classOptions}
                    disabled={!enrollmentFormValues.module}
                    onChange={(event) => updateEnrollmentField("className", event.target.value)}
                  />
                  <small className="manual-student-modal__hint">Selecione um módulo primeiro</small>
                </div>
                <div className="manual-student-modal__field">
                  <span>
                    Status <strong>*</strong>
                  </span>
                  <SelectField
                    ariaLabel="Selecione o status da matrícula"
                    value={enrollmentFormValues.status}
                    variant="form"
                    required
                    options={enrollmentStatusOptions}
                    onChange={(event) => updateEnrollmentField("status", event.target.value)}
                  />
                </div>
              </section>

              <section className="manual-student-modal__section">
                <h3 className="manual-student-modal__section-title">Informações familiares</h3>
                <label className="manual-student-modal__field">
                  <span>Nome do pai</span>
                  <Input
                    value={enrollmentFormValues.fatherName}
                    showLabel={false}
                    placeholder="Nome completo do pai"
                    onChange={(event) => updateEnrollmentField("fatherName", event.target.value)}
                  />
                </label>
                <label className="manual-student-modal__field">
                  <span>Nome da mãe</span>
                  <Input
                    value={enrollmentFormValues.motherName}
                    showLabel={false}
                    placeholder="Nome completo da mãe"
                    onChange={(event) => updateEnrollmentField("motherName", event.target.value)}
                  />
                </label>
              </section>
            </div>
          ) : (
            <div className="manual-student-modal__documents-content">
              <section className="manual-student-modal__section">
                <h3 className="manual-student-modal__section-title">
                  Documentos necessários <strong>*</strong>
                </h3>
                <p className="manual-student-modal__hint manual-student-modal__hint--intro">
                  É necessário anexar pelo menos um documento de identificação (RG ou CNH)
                </p>

                <div className="manual-student-modal__upload-grid">
                  <DocumentUploadField
                    label="Foto 3x4"
                    hint=""
                    selectedFile={attachmentsFormValues.photo}
                    onFileChange={(file) => updateAttachmentField("photo", file)}
                    onFileRemove={() => updateAttachmentField("photo", null)}
                  />
                  <DocumentUploadField
                    label="RG"
                    hint=""
                    selectedFile={attachmentsFormValues.rg}
                    onFileChange={(file) => updateAttachmentField("rg", file)}
                    onFileRemove={() => updateAttachmentField("rg", null)}
                  />
                  <DocumentUploadField
                    label="CNH"
                    hint=""
                    selectedFile={attachmentsFormValues.cnh}
                    onFileChange={(file) => updateAttachmentField("cnh", file)}
                    onFileRemove={() => updateAttachmentField("cnh", null)}
                  />
                  <DocumentUploadField
                    label="Comprovante de residência"
                    hint=""
                    selectedFile={attachmentsFormValues.residenceProof}
                    onFileChange={(file) => updateAttachmentField("residenceProof", file)}
                    onFileRemove={() => updateAttachmentField("residenceProof", null)}
                  />
                </div>
              </section>
            </div>
          )}
      </div>
    </ModalContainer>
  );
}

function ScannedStudentRegistrationModal({
  isOpen,
  onClose,
  onOpenProcessing,
  initialUploadFiles = emptyScannedUploadFiles,
  onUploadFilesChange = () => undefined
}: {
  isOpen: boolean;
  onClose: () => void;
  onOpenProcessing: (files: ScannedUploadFiles) => void;
  initialUploadFiles?: ScannedUploadFiles;
  onUploadFilesChange?: (files: ScannedUploadFiles) => void;
}) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [currentStep, setCurrentStep] = useState<1 | 2>(1);
  const [uploadFiles, setUploadFiles] = useState<ScannedUploadFiles>(initialUploadFiles ?? emptyScannedUploadFiles);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    setCurrentStep(1);
    setUploadFiles(initialUploadFiles ?? emptyScannedUploadFiles);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    onUploadFilesChange(uploadFiles);
  }, [isOpen, onUploadFilesChange, uploadFiles]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    contentRef.current?.scrollTo({ top: 0, behavior: "auto" });
  }, [currentStep, isOpen]);

  function updateUploadFile(field: keyof typeof uploadFiles, file: File | null) {
    setUploadFiles((current) => ({
      ...current,
      [field]: file
    }));
  }

  function UploadCard({
    field,
    title,
    description,
    icon
  }: {
    field: keyof typeof uploadFiles;
    title: string;
    description: string;
    icon: ReactNode;
  }) {
    return (
      <article className="scanned-student-modal__upload-card">
        <div className="scanned-student-modal__upload-card-header">
          <span className="scanned-student-modal__document-icon" aria-hidden="true">
            {icon}
          </span>
          <div>
            <strong>{title}</strong>
            <span>{description}</span>
          </div>
        </div>
        <DocumentUploadField
          className="scanned-student-modal__upload-field"
          showLabel={false}
          uploadTitle="Clique para enviar"
          hint="ou arraste aqui"
          attachedHint="Clique para alterar ou arraste aqui"
          statusLabel="Enviado"
          showImagePreview
          selectedFile={uploadFiles[field]}
          onFileChange={(file) => updateUploadFile(field, file)}
          onFileRemove={() => updateUploadFile(field, null)}
        />
      </article>
    );
  }

  const isStep2Valid = Boolean(
    uploadFiles.enrollmentForm ||
      uploadFiles.identityDocument ||
      uploadFiles.residenceProof ||
      uploadFiles.photo
  );

  if (!isOpen) {
    return null;
  }

  return (
    <ModalContainer
      isOpen={isOpen}
      onClose={onClose}
      titleId="scanned-student-modal-title"
      title="Cadastro via Escaneamento"
      subtitle={currentStep === 1 ? "Prepare os documentos para melhor leitura" : "Envie os documentos do aluno"}
      overlayClassName="scanned-student-modal-overlay"
      className="scanned-student-modal"
      headerClassName="scanned-student-modal__header"
      copyClassName="scanned-student-modal__copy"
      closeButtonClassName="scanned-student-modal__close"
      bodyClassName="scanned-student-modal__body"
      footerClassName="scanned-student-modal__footer"
      footer={
        <>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="scanned-student-modal__cancel"
            onClick={() => {
              if (currentStep === 1) {
                onClose();
                return;
              }

              setCurrentStep(1);
            }}
          >
            {currentStep === 1 ? "Cancelar" : "Voltar"}
          </Button>
          <Button
            type="button"
            variant="primary"
            size="sm"
            className="scanned-student-modal__continue"
            disabled={currentStep === 2 && !isStep2Valid}
            onClick={() => {
              if (currentStep === 1) {
                setCurrentStep(2);
                return;
              }

              onOpenProcessing(uploadFiles);
            }}
          >
            Continuar
          </Button>
        </>
      }
    >
      <div className="scanned-student-modal__stepper">
        <Stepper
          steps={scannedRegistrationSteps}
          currentStep={currentStep}
          ariaLabel="Etapas do cadastro via escaneamento"
          className="scanned-student-modal__stepper-content"
        />
      </div>

      <div ref={contentRef} className="scanned-student-modal__content">
        {currentStep === 1 ? (
          <>
            <section className="scanned-student-modal__intro">
              <span className="scanned-student-modal__intro-icon" aria-hidden="true">
                <Upload />
              </span>
              <h3>Prepare os Documentos</h3>
              <p>Siga estas orientações para obter os melhores resultados</p>
            </section>

            <section className="scanned-student-modal__tips-grid">
              <article className="scanned-student-modal__tip-card">
                <h4>✓ Faça</h4>
                <ul>
                  <li>
                    <CheckCircle2 aria-hidden="true" />
                    <span>Use boa iluminação</span>
                  </li>
                  <li>
                    <CheckCircle2 aria-hidden="true" />
                    <span>Mantenha o documento inteiro visível</span>
                  </li>
                  <li>
                    <CheckCircle2 aria-hidden="true" />
                    <span>Coloque sobre fundo neutro</span>
                  </li>
                  <li>
                    <CheckCircle2 aria-hidden="true" />
                    <span>Tire fotos nítidas e focadas</span>
                  </li>
                </ul>
              </article>

              <article className="scanned-student-modal__tip-card">
                <h4>✗ Evite</h4>
                <ul>
                  <li>
                    <AlertCircle aria-hidden="true" />
                    <span>Sombras sobre o documento</span>
                  </li>
                  <li>
                    <AlertCircle aria-hidden="true" />
                    <span>Fotos borradas ou tremidas</span>
                  </li>
                  <li>
                    <AlertCircle aria-hidden="true" />
                    <span>Reflexos de luz ou flash</span>
                  </li>
                  <li>
                    <AlertCircle aria-hidden="true" />
                    <span>Partes cortadas do documento</span>
                  </li>
                </ul>
              </article>
            </section>

            <section className="scanned-student-modal__documents">
              <h4>Documentos Aceitos</h4>
              <div className="scanned-student-modal__documents-grid">
                <article className="scanned-student-modal__document-card">
                  <span className="scanned-student-modal__document-icon" aria-hidden="true">
                    <FileText />
                  </span>
                  <div>
                    <strong>Documento de Identidade</strong>
                    <span>RG ou CNH</span>
                  </div>
                </article>

                <article className="scanned-student-modal__document-card">
                  <span className="scanned-student-modal__document-icon" aria-hidden="true">
                    <Home />
                  </span>
                  <div>
                    <strong>Comprovante de Residência</strong>
                    <span>Conta de luz, água ou telefone</span>
                  </div>
                </article>

                <article className="scanned-student-modal__document-card">
                  <span className="scanned-student-modal__document-icon" aria-hidden="true">
                    <ClipboardCheck />
                  </span>
                  <div>
                    <strong>Formulário de Matrícula</strong>
                    <span>Formulário preenchido</span>
                  </div>
                </article>

                <article className="scanned-student-modal__document-card">
                  <span className="scanned-student-modal__document-icon" aria-hidden="true">
                    <FileImage />
                  </span>
                  <div>
                    <strong>Foto 3x4</strong>
                    <span>Foto do aluno</span>
                  </div>
                </article>
              </div>
            </section>
          </>
        ) : (
          <>
            <section className="scanned-student-modal__intro scanned-student-modal__intro--upload">
              <h3>Envie os Documentos</h3>
              <p>Você pode enviar um ou mais documentos. O sistema irá extrair os dados automaticamente.</p>
            </section>

            <section className="scanned-student-modal__upload-grid">
              <UploadCard
                field="enrollmentForm"
                title="Formulário de Matrícula"
                description="Formulário preenchido"
                icon={<ClipboardCheck />}
              />
              <UploadCard
                field="identityDocument"
                title="Documento de Identidade"
                description="RG ou CNH"
                icon={<FileText />}
              />
              <UploadCard
                field="residenceProof"
                title="Comprovante de Residência"
                description="Conta de luz, água ou telefone"
                icon={<Home />}
              />
              <UploadCard
                field="photo"
                title="Foto 3x4"
                description="Foto do aluno"
                icon={<FileImage />}
              />
            </section>
          </>
        )}
      </div>
    </ModalContainer>
  );
}

function ScannedDocumentsProcessingModal({
  isOpen,
  onClose,
  onComplete
}: {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
}) {
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const timer = window.setTimeout(() => {
      onComplete();
    }, 2200);

    return () => {
      window.clearTimeout(timer);
    };
  }, [isOpen, onComplete]);

  if (!isOpen) {
    return null;
  }

  const processedDocuments = [
    "Formulário de Matrícula",
    "Documento de Identidade",
    "Comprovante de Residência",
    "Foto 3x4"
  ];

  return (
    <ModalContainer
      isOpen={isOpen}
      onClose={onClose}
      titleId="scanned-processing-modal-title"
      title="Cadastro via Escaneamento"
      subtitle="Processando documentos..."
      overlayClassName="scanned-processing-modal-overlay"
      className="scanned-processing-modal"
      headerClassName="scanned-processing-modal__header"
      copyClassName="scanned-processing-modal__copy"
      closeButtonClassName="scanned-processing-modal__close"
      bodyClassName="scanned-processing-modal__body"
    >
      <section className="scanned-processing-modal__content">
        <span className="scanned-processing-modal__spinner-shell" aria-hidden="true">
          <LoaderCircle className="scanned-processing-modal__spinner" />
        </span>

        <h3>Analisando Documentos</h3>
        <p>Estamos processando as imagens e extraindo as informações. Isso pode levar alguns segundos.</p>

        <div className="scanned-processing-modal__list">
          {processedDocuments.map((document) => (
            <article key={document} className="scanned-processing-modal__item">
              <div className="scanned-processing-modal__item-info">
                <CheckCircle2 aria-hidden="true" />
                <span>{document}</span>
              </div>
              <span className="scanned-processing-modal__item-status">Lido com sucesso</span>
            </article>
          ))}
        </div>
      </section>
    </ModalContainer>
  );
}

function ScannedExtractedDataReviewModal({
  isOpen,
  onClose,
  onContinue,
  onBack,
  uploadedFiles
}: {
  isOpen: boolean;
  onClose: () => void;
  onContinue: () => void;
  onBack: () => void;
  uploadedFiles: ScannedUploadFiles;
}) {
  const [selectedDocumentId, setSelectedDocumentId] = useState<ScannedReviewDocumentId>("photo");
  const [previewImageUrl, setPreviewImageUrl] = useState<string | null>(null);
  const [reviewFormValues, setReviewFormValues] = useState({
    fullName: "Marina Santos Silva",
    rg: "12.345.678-9",
    cpf: "123.456.789-01",
    maritalStatus: "solteiro",
    birthDate: "2005-03-14",
    sex: "feminino",
    nationality: "Brasileira",
    phone: "(11) 98765-4321",
    email: "marina.silva@email.com",
    street: "Rua das Flores",
    number: "123",
    zipCode: "01310-100",
    neighborhood: "Jardim Paulista",
    city: "sao-paulo",
    state: "SP",
    fatherName: "José Silva",
    motherName: "Maria Santos Silva"
  });

  const documents: Array<{ id: ScannedReviewDocumentId; title: string; fallbackFileName: string; icon: ReactNode }> = [
    { id: "enrollmentForm", title: "Formulário de Matrícula", fallbackFileName: "Sem arquivo anexado", icon: <ClipboardCheck /> },
    { id: "identityDocument", title: "Documento de Identidade", fallbackFileName: "Sem arquivo anexado", icon: <FileText /> },
    { id: "residenceProof", title: "Comprovante de Residência", fallbackFileName: "Sem arquivo anexado", icon: <Home /> },
    { id: "photo", title: "Foto 3x4", fallbackFileName: "Sem arquivo anexado", icon: <FileImage /> }
  ];
  const attachedDocuments = useMemo(
    () => documents.filter((document) => Boolean(uploadedFiles[document.id])),
    [uploadedFiles]
  );

  const selectPlaceholder = { value: "", label: "Selecione" };
  const maritalStatusOptions = [
    selectPlaceholder,
    { value: "solteiro", label: "Solteiro(a)" },
    { value: "casado", label: "Casado(a)" },
    { value: "divorciado", label: "Divorciado(a)" },
    { value: "viuvo", label: "Viúvo(a)" }
  ];
  const sexOptions = [selectPlaceholder, { value: "feminino", label: "Feminino" }, { value: "masculino", label: "Masculino" }];
  const cityOptions = [
    selectPlaceholder,
    { value: "sao-paulo", label: "São Paulo" },
    { value: "campinas", label: "Campinas" },
    { value: "santos", label: "Santos" }
  ];
  const stateOptions = [
    { value: "", label: "Selecione" },
    { value: "SP", label: "SP" },
    { value: "RJ", label: "RJ" },
    { value: "MG", label: "MG" },
    { value: "BA", label: "BA" }
  ];

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    if (attachedDocuments.length === 0) {
      return;
    }

    const hasSelectedAttachedDocument = attachedDocuments.some((document) => document.id === selectedDocumentId);
    if (!hasSelectedAttachedDocument) {
      setSelectedDocumentId(attachedDocuments[0].id);
    }
  }, [attachedDocuments, isOpen, selectedDocumentId]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const selectedFile = uploadedFiles[selectedDocumentId];
    if (!selectedFile || !selectedFile.type.startsWith("image/")) {
      setPreviewImageUrl(null);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreviewImageUrl(objectUrl);

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [isOpen, selectedDocumentId, uploadedFiles]);

  function updateField(field: keyof typeof reviewFormValues, value: string) {
    setReviewFormValues((current) => ({
      ...current,
      [field]: value
    }));
  }

  function updateMaskedField(field: keyof typeof reviewFormValues, value: string) {
    if (field === "rg") {
      updateField(field, applyRgMask(value));
      return;
    }

    if (field === "cpf") {
      updateField(field, applyCpfMask(value));
      return;
    }

    if (field === "phone") {
      updateField(field, applyPhoneMask(value));
      return;
    }

    if (field === "zipCode") {
      updateField(field, applyCepMask(value));
      return;
    }

    updateField(field, value);
  }

  function ConfidenceBadge({
    level,
    source
  }: {
    level: ExtractionConfidence;
    source?: string;
  }) {
    const { label, variant } = confidenceBadgeByLevel[level];

    return (
      <div className="scanned-review-modal__confidence">
        <Badge variant={variant}>{label}</Badge>
        {source ? <span>{source}</span> : null}
      </div>
    );
  }

  if (!isOpen) {
    return null;
  }

  return (
    <ModalContainer
      isOpen={isOpen}
      onClose={onClose}
      titleId="scanned-review-modal-title"
      title="Cadastro via Escaneamento"
      subtitle="Revise e confirme os dados extraídos"
      overlayClassName="scanned-review-modal-overlay"
      className="scanned-review-modal"
      headerClassName="scanned-review-modal__header"
      copyClassName="scanned-review-modal__copy"
      closeButtonClassName="scanned-review-modal__close"
      bodyClassName="scanned-review-modal__body"
      footerClassName="scanned-review-modal__footer"
      footer={
        <>
          <Button type="button" variant="ghost" size="sm" className="scanned-review-modal__back" onClick={onBack}>
            Voltar
          </Button>
          <Button type="button" variant="primary" size="sm" className="scanned-review-modal__continue" onClick={onContinue}>
            Continuar
          </Button>
        </>
      }
    >
      <div className="scanned-review-modal__stepper">
        <Stepper
          steps={scannedRegistrationSteps}
          currentStep={3}
          ariaLabel="Etapas do cadastro via escaneamento"
          className="scanned-student-modal__stepper-content"
        />
      </div>

      <div className="scanned-review-modal__content">
        <aside className="scanned-review-modal__sidebar">
          <h4>Documentos</h4>
          <div className="scanned-review-modal__document-list">
            {attachedDocuments.length > 0 ? (
              attachedDocuments.map((document) => (
                <button
                  key={document.id}
                  type="button"
                  className={`scanned-review-modal__document-item ${selectedDocumentId === document.id ? "is-active" : ""}`}
                  onClick={() => setSelectedDocumentId(document.id)}
                >
                  <span className="scanned-review-modal__document-item-icon" aria-hidden="true">
                    {document.icon}
                  </span>
                  <span className="scanned-review-modal__document-item-copy">
                    <strong>{document.title}</strong>
                    <small>{uploadedFiles[document.id]?.name ?? document.fallbackFileName}</small>
                  </span>
                </button>
              ))
            ) : (
              <p className="scanned-review-modal__empty-list">Nenhum documento anexado</p>
            )}
          </div>

          <h4>Visualização</h4>
          <div className="scanned-review-modal__preview">
            {previewImageUrl ? (
              <img src={previewImageUrl} alt="Prévia do documento selecionado" />
            ) : (
              <div className="scanned-review-modal__preview-empty">
                <FileText aria-hidden="true" />
                <p>Sem visualização disponível para este arquivo</p>
              </div>
            )}
          </div>
        </aside>

        <section className="scanned-review-modal__panel">
          <div className="scanned-review-modal__panel-heading">
            <h3>Revise os Dados Extraídos</h3>
            <p>Confirme se os dados estão corretos. Você pode editar qualquer informação.</p>
          </div>

          <div className="scanned-review-modal__section">
            <h4>Dados Pessoais</h4>
            <div className="scanned-review-modal__grid scanned-review-modal__grid--single">
              <div className="scanned-review-modal__field">
                <label>Nome completo</label>
                <Input value={reviewFormValues.fullName} showLabel={false} onChange={(event) => updateField("fullName", event.target.value)} />
                <ConfidenceBadge level="high" source="de Documento de Identidade" />
              </div>
            </div>

            <div className="scanned-review-modal__grid scanned-review-modal__grid--two">
              <div className="scanned-review-modal__field">
                <label>RG</label>
                <Input value={reviewFormValues.rg} showLabel={false} onChange={(event) => updateMaskedField("rg", event.target.value)} />
                <ConfidenceBadge level="high" source="de Documento de Identidade" />
              </div>
              <div className="scanned-review-modal__field">
                <label>CPF</label>
                <Input value={reviewFormValues.cpf} showLabel={false} onChange={(event) => updateMaskedField("cpf", event.target.value)} />
                <ConfidenceBadge level="high" source="de Documento de Identidade" />
              </div>
            </div>

            <div className="scanned-review-modal__grid scanned-review-modal__grid--two">
              <div className="scanned-review-modal__field">
                <label>Estado civil</label>
                <SelectField
                  variant="form"
                  ariaLabel="Estado civil"
                  value={reviewFormValues.maritalStatus}
                  options={maritalStatusOptions}
                  onChange={(event) => updateField("maritalStatus", event.target.value)}
                />
                <ConfidenceBadge level="medium" source="de Formulário de Matrícula" />
              </div>
              <div className="scanned-review-modal__field">
                <label>Data de nascimento</label>
                <DatePicker
                  value={reviewFormValues.birthDate}
                  onChange={(event) => updateField("birthDate", event.target.value)}
                  aria-label="Data de nascimento"
                />
                <ConfidenceBadge level="high" source="de Documento de Identidade" />
              </div>
            </div>

            <div className="scanned-review-modal__grid scanned-review-modal__grid--two">
              <div className="scanned-review-modal__field">
                <label>Sexo</label>
                <SelectField
                  variant="form"
                  ariaLabel="Sexo"
                  value={reviewFormValues.sex}
                  options={sexOptions}
                  onChange={(event) => updateField("sex", event.target.value)}
                />
                <ConfidenceBadge level="high" source="de Formulário de Matrícula" />
              </div>
              <div className="scanned-review-modal__field">
                <label>Nacionalidade</label>
                <Input value={reviewFormValues.nationality} showLabel={false} onChange={(event) => updateField("nationality", event.target.value)} />
                <ConfidenceBadge level="high" source="de Formulário de Matrícula" />
              </div>
            </div>
          </div>

          <div className="scanned-review-modal__section">
            <h4>Contato</h4>
            <div className="scanned-review-modal__grid scanned-review-modal__grid--two">
              <div className="scanned-review-modal__field">
                <label>Telefone</label>
                <Input value={reviewFormValues.phone} showLabel={false} onChange={(event) => updateMaskedField("phone", event.target.value)} />
                <ConfidenceBadge level="medium" source="de Formulário de Matrícula" />
              </div>
              <div className="scanned-review-modal__field">
                <label>E-mail</label>
                <Input value={reviewFormValues.email} showLabel={false} onChange={(event) => updateField("email", event.target.value)} />
                <ConfidenceBadge level="medium" source="de Formulário de Matrícula" />
              </div>
            </div>
          </div>

          <div className="scanned-review-modal__section">
            <h4>Endereço</h4>
            <div className="scanned-review-modal__grid scanned-review-modal__grid--three-compact">
              <div className="scanned-review-modal__field">
                <label>Rua</label>
                <Input value={reviewFormValues.street} showLabel={false} onChange={(event) => updateField("street", event.target.value)} />
                <ConfidenceBadge level="high" />
              </div>
              <div className="scanned-review-modal__field">
                <label>Número</label>
                <Input value={reviewFormValues.number} showLabel={false} onChange={(event) => updateField("number", event.target.value)} />
              </div>
              <div className="scanned-review-modal__field">
                <label>CEP</label>
                <Input
                  className="scanned-review-modal__input--warning"
                  value={reviewFormValues.zipCode}
                  showLabel={false}
                  onChange={(event) => updateMaskedField("zipCode", event.target.value)}
                />
                <ConfidenceBadge level="low" />
              </div>
            </div>

            <div className="scanned-review-modal__grid scanned-review-modal__grid--three">
              <div className="scanned-review-modal__field">
                <label>Bairro</label>
                <Input value={reviewFormValues.neighborhood} showLabel={false} onChange={(event) => updateField("neighborhood", event.target.value)} />
                <ConfidenceBadge level="medium" />
              </div>
              <div className="scanned-review-modal__field">
                <label>Cidade</label>
                <SelectField
                  variant="form"
                  ariaLabel="Cidade"
                  value={reviewFormValues.city}
                  options={cityOptions}
                  onChange={(event) => updateField("city", event.target.value)}
                />
                <ConfidenceBadge level="high" />
              </div>
              <div className="scanned-review-modal__field">
                <label>Estado</label>
                <SelectField
                  variant="form"
                  ariaLabel="UF"
                  value={reviewFormValues.state}
                  options={stateOptions}
                  onChange={(event) => updateField("state", event.target.value)}
                />
                <ConfidenceBadge level="high" />
              </div>
            </div>
          </div>

          <div className="scanned-review-modal__section">
            <h4>Informações Familiares</h4>
            <div className="scanned-review-modal__grid scanned-review-modal__grid--two">
              <div className="scanned-review-modal__field">
                <label>Nome do pai</label>
                <Input value={reviewFormValues.fatherName} showLabel={false} onChange={(event) => updateField("fatherName", event.target.value)} />
                <ConfidenceBadge level="medium" />
              </div>
              <div className="scanned-review-modal__field">
                <label>Nome da mãe</label>
                <Input value={reviewFormValues.motherName} showLabel={false} onChange={(event) => updateField("motherName", event.target.value)} />
                <ConfidenceBadge level="high" />
              </div>
            </div>
          </div>

          <div className="scanned-review-modal__warning">
            <AlertCircle aria-hidden="true" />
            <div>
              <strong>Alguns campos têm confiança baixa</strong>
              <p>Revise com atenção os campos destacados em amarelo. Eles podem conter erros de leitura.</p>
            </div>
          </div>
        </section>
      </div>
    </ModalContainer>
  );
}

function ScannedEnrollmentModal({
  isOpen,
  onClose,
  onBack,
  onContinue,
  values,
  onChange
}: {
  isOpen: boolean;
  onClose: () => void;
  onBack: () => void;
  onContinue: () => void;
  values: ScannedEnrollmentForm;
  onChange: (nextValues: ScannedEnrollmentForm) => void;
}) {
  const moduleOptions = [
    { value: "", label: "Selecione" },
    { value: "Módulo I", label: "Módulo I" },
    { value: "Módulo II", label: "Módulo II" },
    { value: "Módulo III", label: "Módulo III" }
  ];

  const classOptions = [
    { value: "", label: "Selecione" },
    ...getClassOptions((values.module || "Todos") as ModuleFilter)
      .filter((option) => option !== "Todas")
      .map((option) => ({ value: option, label: option }))
  ];

  const isContinueDisabled = values.module.trim() === "" || values.className.trim() === "";

  function updateField(field: keyof ScannedEnrollmentForm, value: string) {
    if (field === "module") {
      onChange({
        module: value,
        className: ""
      });
      return;
    }

    onChange({
      ...values,
      [field]: value
    });
  }

  if (!isOpen) {
    return null;
  }

  return (
    <ModalContainer
      isOpen={isOpen}
      onClose={onClose}
      titleId="scanned-enrollment-modal-title"
      title="Cadastro via Escaneamento"
      subtitle="Selecione o módulo e a turma"
      overlayClassName="scanned-enrollment-modal-overlay"
      className="scanned-enrollment-modal"
      headerClassName="scanned-enrollment-modal__header"
      copyClassName="scanned-enrollment-modal__copy"
      closeButtonClassName="scanned-enrollment-modal__close"
      bodyClassName="scanned-enrollment-modal__body"
      footerClassName="scanned-enrollment-modal__footer"
      footer={
        <>
          <Button type="button" variant="ghost" size="sm" className="scanned-enrollment-modal__back" onClick={onBack}>
            Voltar
          </Button>
          <Button
            type="button"
            variant="primary"
            size="sm"
            className="scanned-enrollment-modal__continue"
            disabled={isContinueDisabled}
            onClick={onContinue}
          >
            Continuar
          </Button>
        </>
      }
    >
      <div className="scanned-enrollment-modal__stepper">
        <Stepper
          steps={scannedRegistrationSteps}
          currentStep={4}
          ariaLabel="Etapas do cadastro via escaneamento"
          className="scanned-student-modal__stepper-content"
        />
      </div>

      <section className="scanned-enrollment-modal__content">
        <h3>
          Matrícula <strong>*</strong>
        </h3>
        <div className="scanned-enrollment-modal__fields">
          <div className="scanned-enrollment-modal__field">
            <label>
              Módulo <strong>*</strong>
            </label>
            <SelectField
              variant="form"
              ariaLabel="Módulo"
              value={values.module}
              options={moduleOptions}
              onChange={(event) => updateField("module", event.target.value)}
            />
          </div>
          <div className="scanned-enrollment-modal__field">
            <label>
              Turma <strong>*</strong>
            </label>
            <SelectField
              variant="form"
              ariaLabel="Turma"
              value={values.className}
              options={classOptions}
              onChange={(event) => updateField("className", event.target.value)}
            />
          </div>
        </div>
      </section>
    </ModalContainer>
  );
}

function ScannedConfirmModal({
  isOpen,
  onClose,
  onBack,
  onSave,
  uploadedFiles,
  enrollment
}: {
  isOpen: boolean;
  onClose: () => void;
  onBack: () => void;
  onSave: () => void;
  uploadedFiles: ScannedUploadFiles;
  enrollment: ScannedEnrollmentForm;
}) {
  const [photoPreviewUrl, setPhotoPreviewUrl] = useState<string | null>(null);

  const extractedFields = [
    "Nome completo",
    "RG",
    "Data de nascimento",
    "Sexo",
    "Estado civil",
    "Nacionalidade",
    "Telefone",
    "E-mail",
    "Rua",
    "Número",
    "Bairro",
    "Cidade",
    "Estado",
    "CEP",
    "Nome do pai",
    "Nome da mãe"
  ];

  const attachedDocuments = [
    { id: "enrollmentForm", label: "Formulário de Matrícula" },
    { id: "identityDocument", label: "Documento de Identidade" },
    { id: "residenceProof", label: "Comprovante de Residência" },
    { id: "photo", label: "Foto 3x4" }
  ].filter((document) => uploadedFiles[document.id as keyof ScannedUploadFiles]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const selectedFile = uploadedFiles.photo;
    if (!selectedFile || !selectedFile.type.startsWith("image/")) {
      setPhotoPreviewUrl(null);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPhotoPreviewUrl(objectUrl);

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [isOpen, uploadedFiles.photo]);

  if (!isOpen) {
    return null;
  }

  return (
    <ModalContainer
      isOpen={isOpen}
      onClose={onClose}
      titleId="scanned-confirm-modal-title"
      title="Cadastro via Escaneamento"
      subtitle="Confirme os dados antes de salvar"
      overlayClassName="scanned-confirm-modal-overlay"
      className="scanned-confirm-modal"
      headerClassName="scanned-confirm-modal__header"
      copyClassName="scanned-confirm-modal__copy"
      closeButtonClassName="scanned-confirm-modal__close"
      bodyClassName="scanned-confirm-modal__body"
      footerClassName="scanned-confirm-modal__footer"
      footer={
        <>
          <Button type="button" variant="ghost" size="sm" className="scanned-confirm-modal__back" onClick={onBack}>
            Voltar
          </Button>
          <Button type="button" variant="primary" size="sm" className="scanned-confirm-modal__save" onClick={onSave}>
            Salvar Aluno
          </Button>
        </>
      }
    >
      <div className="scanned-confirm-modal__stepper">
        <Stepper
          steps={scannedRegistrationSteps}
          currentStep={5}
          ariaLabel="Etapas do cadastro via escaneamento"
          className="scanned-student-modal__stepper-content"
        />
      </div>

      <section className="scanned-confirm-modal__content">
        <div className="scanned-confirm-modal__heading">
          <h3>Revisão Final</h3>
          <p>Confirme todas as informações antes de salvar o cadastro</p>
        </div>

        <article className="scanned-confirm-modal__summary-card">
          <div className="scanned-confirm-modal__avatar" aria-hidden="true">
            {photoPreviewUrl ? <img src={photoPreviewUrl} alt="" /> : <FileImage />}
          </div>
          <div className="scanned-confirm-modal__student-info">
            <h4>Marina Santos Silva</h4>
            <div className="scanned-confirm-modal__info-grid">
              <p>
                RG: <strong>12.345.678-9</strong>
              </p>
              <p>
                Telefone: <strong>(11) 98765-4321</strong>
              </p>
              <p>
                Data de nascimento: <strong>1998-05-15</strong>
              </p>
              <p>
                E-mail: <strong>marina.silva@email.com</strong>
              </p>
            </div>
            <div className="scanned-confirm-modal__tags">
              <Pill tone="violet" label={enrollment.module || "Módulo"} />
              <Pill tone="blue" label={enrollment.className || "Turma"} />
            </div>
          </div>
        </article>

        <div className="scanned-confirm-modal__lists">
          <article className="scanned-confirm-modal__list-card">
            <h4>Dados Extraídos</h4>
            <ul>
              {extractedFields.map((field) => (
                <li key={field}>
                  <CheckCircle2 aria-hidden="true" />
                  <span>{field}</span>
                </li>
              ))}
            </ul>
          </article>

          <article className="scanned-confirm-modal__list-card">
            <h4>Documentos Anexados</h4>
            <ul>
              {attachedDocuments.map((document) => (
                <li key={document.id}>
                  <CheckCircle2 aria-hidden="true" />
                  <span>{document.label}</span>
                </li>
              ))}
            </ul>
          </article>
        </div>

        <div className="scanned-confirm-modal__success">
          <CheckCircle2 aria-hidden="true" />
          <div>
            <strong>Tudo pronto para salvar!</strong>
            <p>Todos os dados foram revisados e estão prontos para serem salvos no sistema.</p>
          </div>
        </div>
      </section>
    </ModalContainer>
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

function JustificationRecordItem({
  record,
  onEdit
}: {
  record: JustificationRecord;
  onEdit: (record: JustificationRecord) => void;
}) {
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
        <button className="justification-record__button justification-record__button--secondary" type="button" onClick={() => onEdit(record)}>
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
  persistedFile,
  fileError,
  mode,
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
  persistedFile: {
    name: string;
    sizeLabel?: string;
  } | null;
  fileError: string;
  mode: "create" | "edit";
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
            <h2 id="justification-modal-title">{mode === "edit" ? "Editar justificativa" : "Adicionar justificativa"}</h2>
            <p>
              {mode === "edit"
                ? `Atualize os dados da justificativa de falta de ${studentName}.`
                : `Registre uma justificativa de falta para o aluno ${studentName}.`}
            </p>
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
              persistedFile={persistedFile}
              errorMessage={fileError}
              onFileChange={onFileChange}
              onFileRemove={onFileRemove}
            />
          </div>

          <div className="justification-modal__footer">
            <Button type="button" variant="ghost" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" variant="primary">
              {mode === "edit" ? "Salvar alterações" : "Salvar justificativa"}
            </Button>
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
  onOpenDocumentUploadModal,
  personalAttachments,
  onViewPersonalAttachment,
  onDownloadPersonalAttachment,
  onRequestDeletePersonalAttachment,
  onOpenJustificationModal,
  onEditJustification,
  justificationRecords
}: {
  student: StudentRecord;
  activeTab: DrawerTab;
  onOpenFullHistory: () => void;
  onOpenDocumentUploadModal: () => void;
  personalAttachments: PersonalAttachmentRecord[];
  onViewPersonalAttachment: (record: PersonalAttachmentRecord) => void;
  onDownloadPersonalAttachment: (record: PersonalAttachmentRecord) => void;
  onRequestDeletePersonalAttachment: (record: PersonalAttachmentRecord) => void;
  onOpenJustificationModal: () => void;
  onEditJustification: (record: JustificationRecord) => void;
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
          badge={personalAttachments.length}
        >
          <div className="attachment-section__body">
            <AttachmentActionButton label="Adicionar documento" iconName="upload" onClick={onOpenDocumentUploadModal} />
            {personalAttachments.length > 0 ? (
              <div className="attachment-files">
                {personalAttachments.map((record) => (
                  <AttachmentFileItem
                    key={record.id}
                    record={record}
                    onView={onViewPersonalAttachment}
                    onDownload={onDownloadPersonalAttachment}
                    onRequestDelete={onRequestDeletePersonalAttachment}
                  />
                ))}
              </div>
            ) : (
              <EmptyPersonalAttachmentState />
            )}
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
                  <JustificationRecordItem key={record.id} record={record} onEdit={onEditJustification} />
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
  onOpenDocumentUploadModal,
  personalAttachments,
  onViewPersonalAttachment,
  onDownloadPersonalAttachment,
  onRequestDeletePersonalAttachment,
  onOpenJustificationModal,
  onEditJustification,
  justificationRecords
}: {
  student: StudentRecord;
  activeTab: DrawerTab;
  onTabChange: (tab: DrawerTab) => void;
  onClose: () => void;
  onOpenFullHistory: () => void;
  onOpenDocumentUploadModal: () => void;
  personalAttachments: PersonalAttachmentRecord[];
  onViewPersonalAttachment: (record: PersonalAttachmentRecord) => void;
  onDownloadPersonalAttachment: (record: PersonalAttachmentRecord) => void;
  onRequestDeletePersonalAttachment: (record: PersonalAttachmentRecord) => void;
  onOpenJustificationModal: () => void;
  onEditJustification: (record: JustificationRecord) => void;
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
                  onOpenDocumentUploadModal={onOpenDocumentUploadModal}
                  personalAttachments={personalAttachments}
                  onViewPersonalAttachment={onViewPersonalAttachment}
                  onDownloadPersonalAttachment={onDownloadPersonalAttachment}
                  onRequestDeletePersonalAttachment={onRequestDeletePersonalAttachment}
                  onOpenJustificationModal={onOpenJustificationModal}
                  onEditJustification={onEditJustification}
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
  const [isRegistrationTypeModalOpen, setIsRegistrationTypeModalOpen] = useState(false);
  const [isManualStudentModalOpen, setIsManualStudentModalOpen] = useState(false);
  const [isScannedStudentModalOpen, setIsScannedStudentModalOpen] = useState(false);
  const [isScannedProcessingModalOpen, setIsScannedProcessingModalOpen] = useState(false);
  const [isScannedReviewModalOpen, setIsScannedReviewModalOpen] = useState(false);
  const [isScannedEnrollmentModalOpen, setIsScannedEnrollmentModalOpen] = useState(false);
  const [isScannedConfirmModalOpen, setIsScannedConfirmModalOpen] = useState(false);
  const [scannedUploadFiles, setScannedUploadFiles] = useState<ScannedUploadFiles>(emptyScannedUploadFiles);
  const [scannedEnrollmentForm, setScannedEnrollmentForm] = useState<ScannedEnrollmentForm>(emptyScannedEnrollmentForm);
  const [isDocumentUploadModalOpen, setIsDocumentUploadModalOpen] = useState(false);
  const [documentUploadError, setDocumentUploadError] = useState("");
  const [personalAttachmentsByStudent, setPersonalAttachmentsByStudent] = useState<Record<number, PersonalAttachmentRecord[]>>({});
  const [attachmentPendingDelete, setAttachmentPendingDelete] = useState<PersonalAttachmentRecord | null>(null);
  const [isJustificationModalOpen, setIsJustificationModalOpen] = useState(false);
  const [justificationModalMode, setJustificationModalMode] = useState<"create" | "edit">("create");
  const [editingJustificationId, setEditingJustificationId] = useState<string | null>(null);
  const [selectedJustificationFile, setSelectedJustificationFile] = useState<File | null>(null);
  const [persistedJustificationFile, setPersistedJustificationFile] = useState<{ name: string; sizeLabel?: string } | null>(null);
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
    setIsRegistrationTypeModalOpen(false);
    setIsManualStudentModalOpen(false);
    setIsScannedStudentModalOpen(false);
    setIsScannedProcessingModalOpen(false);
    setIsScannedReviewModalOpen(false);
    setIsScannedEnrollmentModalOpen(false);
    setIsScannedConfirmModalOpen(false);
    setScannedUploadFiles(emptyScannedUploadFiles);
    setScannedEnrollmentForm(emptyScannedEnrollmentForm);
    closeAttachmentDeleteModal();
    closeDocumentUploadModal();
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
    const isAnyModalOpen =
      isRegistrationTypeModalOpen ||
      isManualStudentModalOpen ||
      isScannedStudentModalOpen ||
      isScannedProcessingModalOpen ||
      isScannedReviewModalOpen ||
      isScannedEnrollmentModalOpen ||
      isScannedConfirmModalOpen ||
      Boolean(attachmentPendingDelete) ||
      isDocumentUploadModalOpen ||
      isJustificationModalOpen;
    if (!isAnyModalOpen) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (isRegistrationTypeModalOpen) {
          setIsRegistrationTypeModalOpen(false);
          return;
        }

        if (isManualStudentModalOpen) {
          setIsManualStudentModalOpen(false);
          return;
        }

        if (isScannedStudentModalOpen) {
          setIsScannedStudentModalOpen(false);
          return;
        }

        if (isScannedProcessingModalOpen) {
          setIsScannedProcessingModalOpen(false);
          return;
        }

        if (isScannedReviewModalOpen) {
          setIsScannedReviewModalOpen(false);
          return;
        }

        if (isScannedEnrollmentModalOpen) {
          setIsScannedEnrollmentModalOpen(false);
          return;
        }

        if (isScannedConfirmModalOpen) {
          setIsScannedConfirmModalOpen(false);
          return;
        }

        if (attachmentPendingDelete) {
          closeAttachmentDeleteModal();
          return;
        }

        if (isDocumentUploadModalOpen) {
          closeDocumentUploadModal();
          return;
        }

        closeJustificationModal();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [
    attachmentPendingDelete,
    isDocumentUploadModalOpen,
    isJustificationModalOpen,
    isManualStudentModalOpen,
    isRegistrationTypeModalOpen,
    isScannedStudentModalOpen,
    isScannedProcessingModalOpen,
    isScannedReviewModalOpen,
    isScannedEnrollmentModalOpen,
    isScannedConfirmModalOpen
  ]);

  const classOptions = useMemo(() => getClassOptions(moduleFilter), [moduleFilter]);
  const selectedStudentAttachments = selectedStudent ? personalAttachmentsByStudent[selectedStudent.id] ?? [] : [];
  const selectedStudentJustifications = selectedStudent ? justificationRecordsByStudent[selectedStudent.id] ?? [] : [];

  function closeDocumentUploadModal() {
    setIsDocumentUploadModalOpen(false);
    setDocumentUploadError("");
  }

  function closeAttachmentDeleteModal() {
    setAttachmentPendingDelete(null);
  }

  function handleDocumentFileSelected(file: File | null) {
    if (!selectedStudent || !file) {
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

    const nextRecord: PersonalAttachmentRecord = {
      id: `${selectedStudent.id}-${Date.now()}`,
      file,
      createdAtLabel: new Intl.DateTimeFormat("pt-BR").format(new Date())
    };

    setPersonalAttachmentsByStudent((current) => ({
      ...current,
      [selectedStudent.id]: [nextRecord, ...(current[selectedStudent.id] ?? [])]
    }));
    closeDocumentUploadModal();
  }

  function handleViewPersonalAttachment(record: PersonalAttachmentRecord) {
    const fileUrl = URL.createObjectURL(record.file);
    window.open(fileUrl, "_blank", "noopener,noreferrer");
    window.setTimeout(() => URL.revokeObjectURL(fileUrl), 1000);
  }

  function handleDownloadPersonalAttachment(record: PersonalAttachmentRecord) {
    const fileUrl = URL.createObjectURL(record.file);
    const anchor = document.createElement("a");
    anchor.href = fileUrl;
    anchor.download = record.file.name;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    URL.revokeObjectURL(fileUrl);
  }

  function handleRequestDeletePersonalAttachment(record: PersonalAttachmentRecord) {
    setAttachmentPendingDelete(record);
  }

  function handleConfirmDeletePersonalAttachment() {
    if (!selectedStudent || !attachmentPendingDelete) {
      return;
    }

    setPersonalAttachmentsByStudent((current) => ({
      ...current,
      [selectedStudent.id]: (current[selectedStudent.id] ?? []).filter((record) => record.id !== attachmentPendingDelete.id)
    }));
    closeAttachmentDeleteModal();
  }

  function resetJustificationForm() {
    setJustificationForm({
      classDate: "",
      type: "Atestado médico",
      status: "Pendente",
      note: ""
    });
    setJustificationModalMode("create");
    setEditingJustificationId(null);
    setSelectedJustificationFile(null);
    setPersistedJustificationFile(null);
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

  function handleOpenJustificationEditModal(record: JustificationRecord) {
    setJustificationModalMode("edit");
    setEditingJustificationId(record.id);
    setJustificationForm({
      classDate: formatBrazilianDateToIso(record.classDate),
      type: record.type,
      status: record.status,
      note: record.note
    });
    setSelectedJustificationFile(null);
    setPersistedJustificationFile(
      record.fileName
        ? {
            name: record.fileName,
            sizeLabel: record.fileSizeLabel
          }
        : null
    );
    setJustificationFileError("");
    setIsJustificationModalOpen(true);
  }

  function handleJustificationSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!selectedStudent || !justificationForm.classDate || justificationFileError) {
      return;
    }

    if (justificationModalMode === "edit" && editingJustificationId) {
      const nextFileName = selectedJustificationFile?.name ?? persistedJustificationFile?.name;
      const nextFileSizeLabel = selectedJustificationFile
        ? formatBytesToReadableSize(selectedJustificationFile.size)
        : persistedJustificationFile?.sizeLabel;

      setJustificationRecordsByStudent((current) => ({
        ...current,
        [selectedStudent.id]: (current[selectedStudent.id] ?? []).map((record) =>
          record.id === editingJustificationId
            ? {
                ...record,
                classDate: formatIsoDateToBrazilianDate(justificationForm.classDate),
                type: justificationForm.type,
                status: justificationForm.status,
                note: justificationForm.note.trim(),
                fileName: nextFileName,
                fileSizeLabel: nextFileSizeLabel
              }
            : record
        )
      }));

      closeJustificationModal();
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
    setPersistedJustificationFile(null);
    setJustificationFileError("");
  }

  function handleJustificationFileRemove() {
    setSelectedJustificationFile(null);
    setPersistedJustificationFile(null);
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

          <Button icon={<Plus aria-hidden="true" />} onClick={() => setIsRegistrationTypeModalOpen(true)}>
            Adicionar aluno
          </Button>
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
            onOpenDocumentUploadModal={() => {
              setDocumentUploadError("");
              setIsDocumentUploadModalOpen(true);
            }}
            personalAttachments={selectedStudentAttachments}
            onViewPersonalAttachment={handleViewPersonalAttachment}
            onDownloadPersonalAttachment={handleDownloadPersonalAttachment}
            onRequestDeletePersonalAttachment={handleRequestDeletePersonalAttachment}
            onOpenJustificationModal={() => {
              resetJustificationForm();
              setIsJustificationModalOpen(true);
            }}
            onEditJustification={handleOpenJustificationEditModal}
            justificationRecords={selectedStudentJustifications}
          />
        </div>
      ) : null}
      <RegistrationTypeModal
        isOpen={isRegistrationTypeModalOpen}
        onClose={() => setIsRegistrationTypeModalOpen(false)}
        onSelectManual={() => {
          setIsRegistrationTypeModalOpen(false);
          setIsManualStudentModalOpen(true);
        }}
        onSelectOcr={() => {
          setIsRegistrationTypeModalOpen(false);
          setScannedUploadFiles(emptyScannedUploadFiles);
          setScannedEnrollmentForm(emptyScannedEnrollmentForm);
          setIsScannedStudentModalOpen(true);
        }}
      />
      <ManualStudentRegistrationModal
        isOpen={isManualStudentModalOpen}
        onClose={() => setIsManualStudentModalOpen(false)}
      />
      <ScannedStudentRegistrationModal
        isOpen={isScannedStudentModalOpen}
        onClose={() => {
          setIsScannedStudentModalOpen(false);
        }}
        initialUploadFiles={scannedUploadFiles}
        onUploadFilesChange={setScannedUploadFiles}
        onOpenProcessing={(files) => {
          setScannedUploadFiles(files);
          setIsScannedStudentModalOpen(false);
          setIsScannedProcessingModalOpen(true);
        }}
      />
      <ScannedDocumentsProcessingModal
        isOpen={isScannedProcessingModalOpen}
        onClose={() => setIsScannedProcessingModalOpen(false)}
        onComplete={() => {
          setIsScannedProcessingModalOpen(false);
          setIsScannedReviewModalOpen(true);
        }}
      />
      <ScannedExtractedDataReviewModal
        isOpen={isScannedReviewModalOpen}
        onClose={() => setIsScannedReviewModalOpen(false)}
        onContinue={() => {
          setIsScannedReviewModalOpen(false);
          setIsScannedEnrollmentModalOpen(true);
        }}
        uploadedFiles={scannedUploadFiles}
        onBack={() => {
          setIsScannedReviewModalOpen(false);
          setIsScannedStudentModalOpen(true);
        }}
      />
      <ScannedEnrollmentModal
        isOpen={isScannedEnrollmentModalOpen}
        onClose={() => setIsScannedEnrollmentModalOpen(false)}
        values={scannedEnrollmentForm}
        onChange={setScannedEnrollmentForm}
        onBack={() => {
          setIsScannedEnrollmentModalOpen(false);
          setIsScannedReviewModalOpen(true);
        }}
        onContinue={() => {
          setIsScannedEnrollmentModalOpen(false);
          setIsScannedConfirmModalOpen(true);
        }}
      />
      <ScannedConfirmModal
        isOpen={isScannedConfirmModalOpen}
        onClose={() => setIsScannedConfirmModalOpen(false)}
        onBack={() => {
          setIsScannedConfirmModalOpen(false);
          setIsScannedEnrollmentModalOpen(true);
        }}
        onSave={() => {
          setIsScannedConfirmModalOpen(false);
          setScannedUploadFiles(emptyScannedUploadFiles);
          setScannedEnrollmentForm(emptyScannedEnrollmentForm);
        }}
        uploadedFiles={scannedUploadFiles}
        enrollment={scannedEnrollmentForm}
      />
      {selectedStudent ? (
        <StudentAttachmentDeleteModal
          isOpen={Boolean(attachmentPendingDelete)}
          attachmentName={attachmentPendingDelete?.file.name ?? "anexo"}
          onClose={closeAttachmentDeleteModal}
          onConfirm={handleConfirmDeletePersonalAttachment}
        />
      ) : null}
      {selectedStudent ? (
        <StudentDocumentUploadModal
          isOpen={isDocumentUploadModalOpen}
          fileError={documentUploadError}
          onClose={closeDocumentUploadModal}
          onFileSelected={handleDocumentFileSelected}
        />
      ) : null}
      {selectedStudent ? (
        <StudentJustificationModal
          isOpen={isJustificationModalOpen}
          studentName={selectedStudent.name}
          form={justificationForm}
          selectedFile={selectedJustificationFile}
          persistedFile={persistedJustificationFile}
          fileError={justificationFileError}
          mode={justificationModalMode}
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






