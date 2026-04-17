import { useEffect, useMemo, useState } from "react";
import { ChevronDown, Clock3, ExternalLink, FileText, PenLine, Plus, Search, Trash2 } from "lucide-react";
import type { FormEvent } from "react";

import { Badge } from "@/src/components/ui/badge";
import { Checkbox } from "@/src/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/ui/tabs";
import { attendanceHistory, type AttendanceStatus } from "../data/attendance";
import { getClassOptions, statusOptions, type ClassFilter, type ModuleFilter, type StatusFilter } from "../data/filters";
import { students } from "../data/students";
import { StudentAttendanceHistoryView, type StudentAttendanceHistoryRecordView } from "./StudentAttendanceHistoryView";

type FilterButtonProps = {
  label: string;
};
type StudentSortKey = "name" | "status" | "contact" | "module" | "className";

type StudentStatus = "Ativo" | "Inativo" | "Trancamento";
type StudentTone = "violet" | "orange" | "blue" | "pink";
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

function FilterButton({ label }: FilterButtonProps) {
  return (
    <button className="filter-button" type="button">
      <span>{label}</span>
      <ChevronDown aria-hidden="true" />
    </button>
  );
}

function StatusBadge({ status }: { status: StudentStatus }) {
  const tone = status === "Ativo" ? "success" : "error";

  return (
    <Badge className={`status-badge status-badge--${tone}`} variant={tone}>
      <span className="status-badge__dot" aria-hidden="true" />
      {status}
    </Badge>
  );
}

function Pill({ label, tone }: { label: string; tone: StudentTone }) {
  return (
    <Badge className={`pill pill--${tone}`} variant={tone}>
      {label}
    </Badge>
  );
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
    <section className="student-card student-card--address">
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
    </section>
  );
}

function AttachmentIcon({
  name,
  className
}: {
  name: "file" | "calendar" | "upload" | "plus" | "view" | "download" | "trash" | "chevron";
  className?: string;
}) {
  const sharedProps = {
    className,
    viewBox: "0 0 20 20",
    fill: "none",
    "aria-hidden": true as const
  };

  switch (name) {
    case "file":
      return (
        <svg {...sharedProps}>
          <path
            d="M11.667 1.667H5.833A1.667 1.667 0 0 0 4.167 3.333v13.334a1.667 1.667 0 0 0 1.666 1.666h8.334a1.667 1.667 0 0 0 1.666-1.666V6.667l-4.166-5Z"
            stroke="currentColor"
            strokeWidth="1.67"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M11.667 1.667v5h4.166" stroke="currentColor" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
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
    case "upload":
      return (
        <svg {...sharedProps}>
          <path d="M10 12.5v-7.5M10 5 6.667 8.333M10 5l3.333 3.333M3.333 15.833h13.334" stroke="currentColor" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "plus":
      return (
        <svg {...sharedProps}>
          <path d="M10 4.167v11.666M4.167 10h11.666" stroke="currentColor" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "view":
      return (
        <svg {...sharedProps}>
          <path
            d="M1.667 10s3.03-5 8.333-5c5.304 0 8.333 5 8.333 5s-3.03 5-8.333 5c-5.304 0-8.333-5-8.333-5Z"
            stroke="currentColor"
            strokeWidth="1.67"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M10 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" stroke="currentColor" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "download":
      return (
        <svg {...sharedProps}>
          <path d="M10 4.167v7.5M10 11.667l3.333-3.334M10 11.667 6.667 8.333M3.333 15.833h13.334" stroke="currentColor" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "trash":
      return (
        <svg {...sharedProps}>
          <path
            d="M2.5 5h15M7.5 1.667h5l.833 1.666h3.334v1.667H3.333V3.333h3.334L7.5 1.667Zm.833 6.666v5M10 8.333v5m1.667-5v5M5.833 5h8.334l-.834 11.667H6.667L5.833 5Z"
            stroke="currentColor"
            strokeWidth="1.67"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "chevron":
      return (
        <svg {...sharedProps}>
          <path d="m7.5 5 5 5-5 5" stroke="currentColor" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    default:
      return null;
  }
}

function AttachmentSectionHeader({
  title,
  badge,
  iconName
}: {
  title: string;
  badge?: number;
  iconName: "file" | "calendar";
}) {
  return (
    <div className="attachment-section__header">
      <div className="attachment-section__title-group">
        <AttachmentIcon name={iconName} className="attachment-symbol attachment-symbol--section" />
        <h3 className="attachment-section__title">{title}</h3>
        {typeof badge === "number" ? <span className="attachment-section__badge">{badge}</span> : null}
      </div>
      <AttachmentIcon name="chevron" className="attachment-chevron" />
    </div>
  );
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
    <button className="attachment-action-button" type="button" onClick={onClick}>
      <AttachmentIcon name={iconName} className="attachment-symbol attachment-symbol--action" />
      <span>{label}</span>
    </button>
  );
}

function FrequencyStatusBadge({ status }: { status: AttendanceStatus }) {
  const tone = status === "Presente" ? "success" : "error";

  return (
    <span className={`frequency-status-badge frequency-status-badge--${tone}`}>
      <FrequencyIcon name={tone === "success" ? "check-circle" : "alert-circle"} />
      <span>{status}</span>
    </span>
  );
}

function FrequencyIcon({ name }: { name: "calendar" | "check-circle" | "alert-circle" | "chevron-down" }) {
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
    case "check-circle":
      return (
        <svg {...sharedProps}>
          <path
            d="M18.333 9.233v.767A8.333 8.333 0 1 1 13.392 2.39"
            stroke="currentColor"
            strokeWidth="1.67"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="m18.333 3.333-8.333 8.342-2.5-2.5" stroke="currentColor" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "alert-circle":
      return (
        <svg {...sharedProps}>
          <path
            d="M10 6.667V10m0 3.333h.008M18.333 10A8.333 8.333 0 1 1 1.667 10a8.333 8.333 0 0 1 16.666 0Z"
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
    <section className="student-card student-card--frequency">
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
    </section>
  );
}

function AttachmentFileItem() {
  return (
    <div className="attachment-file">
      <div className="attachment-file__meta">
        <AttachmentIcon name="file" className="attachment-symbol attachment-symbol--file-item" />
        <div className="attachment-file__text">
          <strong>RG_Ana_Carolina_Souza.pdf</strong>
          <span>1.0 KB Ã¢â‚¬Â¢ 18/01/2024</span>
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
  return (
    <span className={`justification-status-badge justification-status-badge--${justificationStatusTone[status]}`}>
      <Clock3 aria-hidden="true" />
      {status}
    </span>
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
            <label className="justification-modal__field">
              <span>Data da aula *</span>
              <input
                type="date"
                value={form.classDate}
                onChange={(event) => onFieldChange("classDate", event.target.value)}
                required
              />
            </label>

            <label className="justification-modal__field justification-modal__field--select">
              <span>Tipo de justificativa</span>
              <select value={form.type} onChange={(event) => onFieldChange("type", event.target.value)} required>
                {justificationTypeOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <ChevronDown aria-hidden="true" />
            </label>

            <label className="justification-modal__field justification-modal__field--select">
              <span>Status</span>
              <select value={form.status} onChange={(event) => onFieldChange("status", event.target.value)} required>
                {justificationStatusOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <ChevronDown aria-hidden="true" />
            </label>

            <label className="justification-modal__field">
              <span>Observação</span>
              <textarea
                rows={4}
                placeholder="Adicione observações sobre a justificativa..."
                value={form.note}
                onChange={(event) => onFieldChange("note", event.target.value)}
              />
            </label>

            <div className="justification-modal__field">
              <span>Documento (opcional)</span>
              {selectedFile ? (
                <div className="justification-modal__upload justification-modal__upload--attached">
                  <span className="justification-modal__upload-file-icon" aria-hidden="true">
                    <FileText />
                  </span>
                  <strong>{selectedFile.name}</strong>
                  <span>{formatBytesToReadableSize(selectedFile.size)}</span>
                  <button
                    className="justification-modal__upload-remove"
                    type="button"
                    aria-label="Remover documento"
                    onClick={onFileRemove}
                  >
                    <Trash2 aria-hidden="true" />
                  </button>
                </div>
              ) : (
                <label className="justification-modal__upload">
                  <input
                    type="file"
                    accept=".pdf,.png,.jpg,.jpeg,application/pdf,image/png,image/jpeg"
                    onChange={(event) => onFileChange(event.target.files?.[0] ?? null)}
                  />
                  <span className="justification-modal__upload-icon" aria-hidden="true">
                    <AttachmentIcon name="upload" className="attachment-symbol attachment-symbol--action" />
                  </span>
                  <strong>Clique ou arraste para enviar</strong>
                  <span>PDF, PNG, JPG até 10MB</span>
                </label>
              )}
              {fileError ? <small className="justification-modal__field-error">{fileError}</small> : null}
            </div>
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
      <section className="student-card student-card--contact">
        <ContactLinkRow label="Telefone" value={student.details.contact.phone} href={`tel:${student.details.contact.phone}`} />
        <ContactLinkRow label="E-mail" value={student.details.contact.email} href={`mailto:${student.details.contact.email}`} />
        <ContactLinkRow
          label="Email Escolar"
          value={student.details.contact.schoolEmail}
          href={`mailto:${student.details.contact.schoolEmail}`}
        />
      </section>
    );
  }

  if (activeTab === "address") {
    return <AddressContent student={student} />;
  }

  if (activeTab === "attachments") {
    return (
      <>
        <section className="student-card student-card--attachments">
          <AttachmentSectionHeader title="Documentos Pessoais" badge={1} iconName="file" />
          <div className="attachment-section__body">
            <AttachmentActionButton label="Adicionar documento" iconName="upload" />
            <AttachmentFileItem />
          </div>
        </section>

        <section className="student-card student-card--attachments">
          <AttachmentSectionHeader title="Justificativas de Faltas" iconName="calendar" />
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
        </section>
      </>
    );
  }

  if (activeTab === "frequency") {
    return <FrequencyTabContent student={student} onOpenFullHistory={onOpenFullHistory} />;
  }

  return (
    <>
      <section className="student-card">
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
      </section>

      <section className="student-card">
        <h3 className="student-card__title">Informações Familiares</h3>
        <div className="student-card__stack">
          <DrawerField label="Nome do pai" value={student.details.fatherName} />
          <DrawerField label="Nome da mãe" value={student.details.motherName} />
        </div>
      </section>

      <section className="student-card">
        <h3 className="student-card__title">Módulo e Turma</h3>
        <div className="student-card__stack">
          <div className="student-field">
            <span className="student-field__label">Módulo</span>
            <Pill label={student.module} tone={student.moduleTone as StudentTone} />
          </div>
          <div className="student-field">
            <span className="student-field__label">Turma</span>
            <Pill label={student.className} tone={student.classTone as StudentTone} />
          </div>
        </div>
      </section>
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

          <button className="student-drawer__close" type="button" aria-label="Fechar painel" onClick={onClose}>
            ×
          </button>
        </header>

        <div className="student-drawer__actions">
          <button className="student-drawer__edit" type="button">
            Editar aluno
          </button>

          <button className="student-drawer__delete" type="button" aria-label={`Excluir ${student.name}`}>
            <Trash2 aria-hidden="true" />
          </button>
        </div>
        <Tabs
          className="student-drawer__tabs-shell"
          value={activeTab}
          onValueChange={(value) => onTabChange(value as DrawerTab)}
        >
          <TabsList className="student-drawer__tabs" aria-label="Seções do aluno">
            {drawerTabs.map((tab) => (
              <TabsTrigger key={tab.id} className="student-drawer__tab" value={tab.id}>
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

  const FilterButton = ({ label }: FilterButtonProps) => {
    if (label.includes("Status")) {
      return (
        <label className="filter-button">
          <select
            aria-label="Filtrar por status"
            className="filter-button__select"
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value as StatusFilter)}
          >
            {statusOptions.map((option) => (
              <option key={option} value={option}>
                {option === "Todos" ? "Filtrar por Status" : option}
              </option>
            ))}
          </select>
          <ChevronDown aria-hidden="true" />
        </label>
      );
    }

    if (label.includes("Turmas")) {
      return (
        <label className="filter-button">
          <select
            aria-label="Filtrar por turmas"
            className="filter-button__select"
            value={classFilter}
            onChange={(event) => setClassFilter(event.target.value as ClassFilter)}
          >
            {classOptions.map((option) => (
              <option key={option} value={option}>
                {option === "Todas" ? "Filtrar por Turmas" : option}
              </option>
            ))}
          </select>
          <ChevronDown aria-hidden="true" />
        </label>
      );
    }

    return (
      <label className="filter-button">
        <select
          aria-label="Filtrar por módulos"
          className="filter-button__select"
          value={moduleFilter}
          onChange={(event) => {
            setModuleFilter(event.target.value as ModuleFilter);
            setClassFilter("Todas");
          }}
        >
          <option value="Todos">Filtrar por Módulos</option>
          <option value="Módulo I">Módulo I</option>
          <option value="Módulo II">Módulo II</option>
          <option value="Módulo III">Módulo III</option>
        </select>
        <ChevronDown aria-hidden="true" />
      </label>
    );
  };

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

          <button className="primary-button" type="button">
            <Plus aria-hidden="true" />
            <span>Adicionar aluno</span>
          </button>
        </section>

        <section className="filters" aria-label="Busca e filtros">
          <label className="search-field">
            <Search aria-hidden="true" />
            <input
              type="text"
              className="search-field__input"
              placeholder="Buscar por nome, telefone ou email..."
              aria-label="Buscar por nome, telefone ou email"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </label>

          <div className="filters__group">
            <FilterButton label="Filtrar por Módulos" />
            <FilterButton label="Filtrar por Turmas" />
            <FilterButton label="Filtrar por Status" />
          </div>
        </section>

        <section className="table-card" aria-labelledby="students-title">
          <header className="table-card__header">
            <div className="table-card__title">
              <h2 id="students-title">Alunos</h2>
              <Badge className="count-badge" variant="violet">
                {filteredStudents.length} alunos
              </Badge>
            </div>
          </header>

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
                      <Pill label={student.module} tone={student.moduleTone as StudentTone} />
                    </td>
                    <td>
                      <Pill label={student.className} tone={student.classTone as StudentTone} />
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
                    <Pill label={student.module} tone={student.moduleTone as StudentTone} />
                  </div>

                  <div className="students-mobile-card__field">
                    <span>Turma</span>
                    <Pill label={student.className} tone={student.classTone as StudentTone} />
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

        </section>
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




