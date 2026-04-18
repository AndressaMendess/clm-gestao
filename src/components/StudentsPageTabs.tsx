import { useEffect, useState } from "react";

import { assetUrls } from "../data/assets";
import { students } from "../data/students";
import { StatusBadge } from "./ui/status-badge";
import { TableCard } from "./ui/table-card";

type FilterButtonProps = {
  label: string;
};

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
  return value.replace("Módulo", "Módulo").replace("Violão", "Violão");
}

function FilterButton({ label }: FilterButtonProps) {
  return (
    <button className="filter-button" type="button">
      <span>{label}</span>
      <img src={assetUrls.icons.caretDown} alt="" aria-hidden="true" />
    </button>
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
    return (
      <section className="student-card student-card--placeholder">
        <h3 className="student-card__title">Endereço</h3>
        <p className="student-card__placeholder-text">Conteúdo desta aba em breve.</p>
      </section>
    );
  }

  if (activeTab === "attachments") {
    return (
      <section className="student-card student-card--placeholder">
        <h3 className="student-card__title">Anexos</h3>
        <p className="student-card__placeholder-text">
          Este aluno possui {student.details.attachmentsCount} anexo(s).
        </p>
      </section>
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
            X
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

export function StudentsPageTabs() {
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

        <TableCard
          title="Alunos"
          titleId="students-title"
          countLabel={`${studentsWithDetails.length} alunos`}
        >

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

          <footer className="pagination">
            <button className="pagination__button" type="button">
              <img src={assetUrls.icons.arrowLeft} alt="" aria-hidden="true" />
              <span>Anterior</span>
            </button>

            <div className="pagination__numbers" aria-label="Paginação">
              {["1", "2", "3", "...", "8", "9", "10"].map((item, index) => (
                <button
                  key={item}
                  className={`pagination__number ${index === 0 ? "is-active" : ""}`}
                  type="button"
                >
                  {item}
                </button>
              ))}
            </div>

            <button className="pagination__button" type="button">
              <span>Próxima</span>
              <img src={assetUrls.icons.arrowRight} alt="" aria-hidden="true" />
            </button>
          </footer>
        </TableCard>
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
