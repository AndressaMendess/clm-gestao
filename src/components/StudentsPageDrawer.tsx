import { useEffect, useState } from "react";

import { assetUrls } from "../data/assets";
import { students } from "../data/students";

type FilterButtonProps = {
  label: string;
};

type StudentStatus = "Ativo" | "Inativo";
type StudentTone = "violet" | "orange" | "blue" | "pink";
type DrawerTab = "personal" | "contact" | "address" | "attachments";

type StudentRecord = (typeof students)[number] & {
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
    motherName: "Patrícia Cano",
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
    fatherName: "João Diggs",
    motherName: "Célia Diggs",
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
  { id: "attachments", label: "Anexos" }
];

function normalizeStudentText(value: string) {
  return value
    .replace("Módulo", "Módulo")
    .replace("ViolÃ£o", "Violão");
}

function FilterButton({ label }: FilterButtonProps) {
  return (
    <button className="filter-button" type="button">
      <span>{label}</span>
      <img src={assetUrls.icons.caretDown} alt="" aria-hidden="true" />
    </button>
  );
}

function StatusBadge({ status }: { status: StudentStatus }) {
  const tone = status === "Ativo" ? "success" : "error";

  return (
    <span className={`status-badge status-badge--${tone}`}>
      <span className="status-badge__dot" aria-hidden="true" />
      {status}
    </span>
  );
}

function Pill({ label, tone }: { label: string; tone: StudentTone }) {
  return <span className={`pill pill--${tone}`}>{label}</span>;
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
  iconName
}: {
  label: string;
  iconName: "upload" | "plus";
}) {
  return (
    <button className="attachment-action-button" type="button">
      <AttachmentIcon name={iconName} className="attachment-symbol attachment-symbol--action" />
      <span>{label}</span>
    </button>
  );
}

function AttachmentFileItem() {
  return (
    <div className="attachment-file">
      <div className="attachment-file__meta">
        <AttachmentIcon name="file" className="attachment-symbol attachment-symbol--file-item" />
        <div className="attachment-file__text">
          <strong>RG_Ana_Carolina_Souza.pdf</strong>
          <span>1.0 KB • 18/01/2024</span>
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

function DrawerTabContent({ student, activeTab }: { student: StudentRecord; activeTab: DrawerTab }) {
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
            <AttachmentActionButton label="Adicionar justificativa" iconName="plus" />
            <EmptyAttachmentState />
          </div>
        </section>
      </>
    );
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
  onClose
}: {
  student: StudentRecord;
  activeTab: DrawerTab;
  onTabChange: (tab: DrawerTab) => void;
  onClose: () => void;
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
            <img src={assetUrls.icons.trash} alt="" aria-hidden="true" />
          </button>
        </div>

        <nav className="student-drawer__tabs" aria-label="Seções do aluno">
          {drawerTabs.map((tab) => (
            <button
              key={tab.id}
              className={`student-drawer__tab ${activeTab === tab.id ? "is-active" : ""}`}
              type="button"
              onClick={() => onTabChange(tab.id)}
            >
              {tab.label}
              {tab.id === "attachments" ? (
                <span className="student-drawer__tab-badge">{student.details.attachmentsCount}</span>
              ) : null}
            </button>
          ))}
        </nav>

        <div className="student-drawer__content">
          <DrawerTabContent student={student} activeTab={activeTab} />
        </div>
      </aside>
    </div>
  );
}

export function StudentsPageDrawer() {
  const [selectedStudent, setSelectedStudent] = useState<StudentRecord | null>(null);
  const [activeTab, setActiveTab] = useState<DrawerTab>("personal");
  const [isDrawerClosing, setIsDrawerClosing] = useState(false);

  const closeDrawer = () => {
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

  const studentsWithDetails = students.map((student) => ({
    ...student,
    module: normalizeStudentText(student.module),
    className: normalizeStudentText(student.className),
    details: studentDetailsById[student.id]
  }));

  return (
    <>
      <main className={`students-page ${selectedStudent ? "students-page--drawer-open" : ""}`}>
        <section className="page-header">
          <div className="page-header__copy">
            <h1>Alunos -</h1>
            <p>Gerencie o cadastro completo de alunos.</p>
          </div>

          <button className="primary-button" type="button">
            <img src={assetUrls.icons.plus} alt="" aria-hidden="true" />
            <span>Adicionar aluno</span>
          </button>
        </section>

        <section className="filters" aria-label="Busca e filtros">
          <label className="search-field">
            <img src={assetUrls.icons.search} alt="" aria-hidden="true" />
            <input
              type="text"
              placeholder="Buscar por nome, telefone ou email..."
              aria-label="Buscar por nome, telefone ou email"
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
              <span className="count-badge">{studentsWithDetails.length} alunos</span>
            </div>
          </header>

          <div className="table-scroll">
            <table className="students-table">
              <thead>
                <tr>
                  <th>
                    <div className="header-with-checkbox">
                      <input type="checkbox" aria-label="Selecionar todos" />
                      <span>Nome</span>
                    </div>
                  </th>
                  <th>
                    <div className="header-sort">
                      <span>Status</span>
                      <img src={assetUrls.icons.arrowDown} alt="" aria-hidden="true" />
                    </div>
                  </th>
                  <th>Contato</th>
                  <th>Módulo</th>
                  <th>Turma</th>
                </tr>
              </thead>

              <tbody>
                {studentsWithDetails.map((student) => (
                  <tr key={student.id}>
                    <td>
                      <div className="student-cell">
                        <input type="checkbox" aria-label={`Selecionar ${student.name}`} />

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

        </section>
      </main>

      {selectedStudent ? (
        <div className={`student-drawer-shell ${isDrawerClosing ? "is-closing" : ""}`}>
          <StudentDrawer
            student={selectedStudent}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            onClose={closeDrawer}
          />
        </div>
      ) : null}
    </>
  );
}
