import { assetUrls } from "../data/assets";
import { students } from "../data/students";

type FilterButtonProps = {
  label: string;
};

function FilterButton({ label }: FilterButtonProps) {
  return (
    <button className="filter-button" type="button">
      <span>{label}</span>
      <img src={assetUrls.icons.caretDown} alt="" aria-hidden="true" />
    </button>
  );
}

type StatusBadgeProps = {
  status: "Ativo" | "Inativo";
};

function StatusBadge({ status }: StatusBadgeProps) {
  const tone = status === "Ativo" ? "success" : "error";

  return (
    <span className={`status-badge status-badge--${tone}`}>
      <span className="status-badge__dot" aria-hidden="true" />
      {status}
    </span>
  );
}

type PillProps = {
  label: string;
  tone: "violet" | "orange" | "blue" | "pink";
};

function Pill({ label, tone }: PillProps) {
  return <span className={`pill pill--${tone}`}>{label}</span>;
}

/**
 * Página de listagem de alunos baseada no frame do Figma.
 */
export function StudentsPage() {
  return (
    <main className="students-page">
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
            <span className="count-badge">200 alunos</span>
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
              {students.map((student) => (
                <tr key={student.id}>
                  <td>
                    <div className="student-cell">
                      <input type="checkbox" aria-label={`Selecionar ${student.name}`} />

                      {student.avatar ? (
                        <img
                          className="student-avatar"
                          src={student.avatar}
                          alt=""
                          aria-hidden="true"
                        />
                      ) : (
                        <span className="student-avatar student-avatar--initials">
                          {student.initials}
                        </span>
                      )}

                      <span className="student-name">{student.name}</span>
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
                    <Pill label={student.module} tone={student.moduleTone} />
                  </td>
                  <td>
                    <Pill label={student.className} tone={student.classTone} />
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
            <span>Previous</span>
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
            <span>Next</span>
            <img src={assetUrls.icons.arrowRight} alt="" aria-hidden="true" />
          </button>
        </footer>
      </section>
    </main>
  );
}
