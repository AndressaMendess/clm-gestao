import { useEffect, useState } from "react";

import { assetUrls } from "../data/assets";
import { students } from "../data/students";

type FilterButtonProps = {
  label: string;
};

type StudentStatus = "Ativo" | "Inativo";
type StudentTone = "violet" | "orange" | "blue" | "pink";

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
  };
};

const studentDetailsById: Record<number, StudentRecord["details"]> = {
  1: { rg: "12.345.678-9", birthDate: "14/03/2005", sex: "-", maritalStatus: "-", nationality: "-", fatherName: "-", motherName: "-", attachmentsCount: 1 },
  2: { rg: "23.456.789-0", birthDate: "02/07/2006", sex: "Masculino", maritalStatus: "Solteiro", nationality: "Brasileira", fatherName: "Marcos Baker", motherName: "Elaine Baker", attachmentsCount: 2 },
  3: { rg: "34.567.890-1", birthDate: "21/11/2004", sex: "Feminino", maritalStatus: "Solteira", nationality: "Brasileira", fatherName: "-", motherName: "Helena Steiner", attachmentsCount: 0 },
  4: { rg: "45.678.901-2", birthDate: "08/01/2007", sex: "-", maritalStatus: "-", nationality: "Brasileira", fatherName: "Carlos Wilkinson", motherName: "-", attachmentsCount: 3 },
  5: { rg: "56.789.012-3", birthDate: "18/09/2003", sex: "Feminino", maritalStatus: "Solteira", nationality: "Brasileira", fatherName: "-", motherName: "-", attachmentsCount: 1 },
  6: { rg: "67.890.123-4", birthDate: "12/12/2005", sex: "Feminino", maritalStatus: "-", nationality: "Brasileira", fatherName: "Roberto Craig", motherName: "Ana Craig", attachmentsCount: 0 },
  7: { rg: "78.901.234-5", birthDate: "29/05/2006", sex: "Masculino", maritalStatus: "-", nationality: "Brasileira", fatherName: "-", motherName: "Patrícia Cano", attachmentsCount: 2 },
  8: { rg: "89.012.345-6", birthDate: "15/10/2004", sex: "Masculino", maritalStatus: "Solteiro", nationality: "Brasileira", fatherName: "João Diggs", motherName: "Célia Diggs", attachmentsCount: 1 },
  9: { rg: "90.123.456-7", birthDate: "03/02/2005", sex: "-", maritalStatus: "-", nationality: "-", fatherName: "-", motherName: "-", attachmentsCount: 4 },
  10: { rg: "01.234.567-8", birthDate: "27/08/2003", sex: "Feminino", maritalStatus: "Solteira", nationality: "Brasileira", fatherName: "-", motherName: "Clara Morrison", attachmentsCount: 1 }
};

function normalizeStudentText(value: string) {
  return value
    .replace(/M(?:ÃƒÂ|Ã)³dulo/g, "M\u00f3dulo")
    .replace(/Viol(?:ÃƒÂ|Ã)£o/g, "Viol\u00e3o");
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

function StudentDrawer({
  student,
  onClose
}: {
  student: StudentRecord;
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
          <button className="student-drawer__tab is-active" type="button">Dados pessoais</button>
          <button className="student-drawer__tab" type="button">Contato</button>
          <button className="student-drawer__tab" type="button">Endereço</button>
          <button className="student-drawer__tab" type="button">
            Anexos
            <span className="student-drawer__tab-badge">{student.details.attachmentsCount}</span>
          </button>
        </nav>

        <div className="student-drawer__content">
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
        </div>
      </aside>
    </div>
  );
}

/**
 * Página de listagem de alunos baseada no frame do Figma, com drawer lateral.
 */
export function StudentsPageEnhanced() {
  const [selectedStudent, setSelectedStudent] = useState<StudentRecord | null>(null);
  const [isDrawerClosing, setIsDrawerClosing] = useState(false);

  const closeDrawer = () => {
    setIsDrawerClosing(true);
    window.setTimeout(() => {
      setSelectedStudent(null);
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
    module: student.module.replace("MÃ³dulo", "Módulo").replace("ViolÃ£o", "Violão"),
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
                  <th aria-label="Ações" />
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

                        <button className="student-name-button" type="button" onClick={() => setSelectedStudent(student)}>
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
                    <td>
                      <div className="row-actions">
                        <button className="icon-button" type="button" aria-label={`Excluir ${student.name}`}>
                          <img src={assetUrls.icons.trash} alt="" aria-hidden="true" />
                        </button>
                        <button className="icon-button" type="button" aria-label={`Editar ${student.name}`}>
                          <img src={assetUrls.icons.edit} alt="" aria-hidden="true" />
                        </button>
                      </div>
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
        </section>
      </main>

      {selectedStudent ? (
        <div className={`student-drawer-shell ${isDrawerClosing ? "is-closing" : ""}`}>
          <StudentDrawer student={selectedStudent} onClose={closeDrawer} />
        </div>
      ) : null}
    </>
  );
}
