import { useMemo, useState } from "react";
import { CalendarDays, ChevronDown, ChevronUp, Plus } from "lucide-react";

import { attendanceHistory, type AttendanceHistoryEntry } from "../data/attendance";
import { getClassOptions, moduleOptions, type ClassFilter, type ModuleFilter } from "../data/filters";

function AttendanceBadge({ status }: { status: "Presente" | "Ausente" }) {
  return (
    <span className={`attendance-row-badge attendance-row-badge--${status === "Presente" ? "present" : "absent"}`}>
      {status}
    </span>
  );
}

function FilterSelect({
  label,
  value,
  options,
  onChange
}: {
  label: string;
  value: string;
  options: readonly string[];
  onChange: (value: string) => void;
}) {
  return (
    <label className="dashboard-filter-button">
      <select value={value} onChange={(event) => onChange(event.target.value)} aria-label={label}>
        {options.map((option) => (
          <option key={option} value={option}>
            {option === "Todos" || option === "Todas" ? label : option}
          </option>
        ))}
      </select>
      <ChevronDown aria-hidden="true" />
    </label>
  );
}

export function AttendanceHistoryPage({
  entries = attendanceHistory,
  onStartAttendance
}: {
  entries?: AttendanceHistoryEntry[];
  onStartAttendance: () => void;
}) {
  const [moduleFilter, setModuleFilter] = useState<ModuleFilter>("Todos");
  const [classFilter, setClassFilter] = useState<ClassFilter>("Todas");
  const [openIds, setOpenIds] = useState<number[]>(entries.length ? [entries[0].id] : []);
  const classOptions = useMemo(() => getClassOptions(moduleFilter), [moduleFilter]);
  const filteredHistory = useMemo(
    () =>
      entries.filter((entry) => {
        const matchesModule = moduleFilter === "Todos" || entry.module === moduleFilter;
        const matchesClass = classFilter === "Todas" || entry.className === classFilter;
        return matchesModule && matchesClass;
      }),
    [classFilter, entries, moduleFilter]
  );

  return (
    <main className="students-page dashboard-page dashboard-page--attendance">
      <section className="page-header dashboard-page__header">
        <div className="page-header__copy dashboard-page__copy">
          <h1>Presenças -</h1>
          <p>Histórico e gerenciamento de registros de presença</p>
        </div>

        <button className="dashboard-cta-button" type="button" onClick={onStartAttendance}>
          <Plus aria-hidden="true" />
          <span>Iniciar chamada</span>
        </button>
      </section>

      <section className="dashboard-filters" aria-label="Filtros de presenças">
        <FilterSelect
          label="Filtrar por Módulos"
          value={moduleFilter}
          options={moduleOptions}
          onChange={(value) => {
            setModuleFilter(value as ModuleFilter);
            setClassFilter("Todas");
          }}
        />
        <FilterSelect
          label="Filtrar por Turmas"
          value={classFilter}
          options={classOptions}
          onChange={(value) => setClassFilter(value as ClassFilter)}
        />
      </section>

      <section className="attendance-history-list-card" aria-labelledby="attendance-history-title">
        <h2 id="attendance-history-title" className="sr-only">
          Histórico de presenças
        </h2>

        <div className="attendance-history-list">
          {filteredHistory.map((entry) => (
            <article
              key={entry.id}
              className={`attendance-history-item-card ${openIds.includes(entry.id) ? "is-open" : ""}`}
            >
              <button
                className="attendance-history-item-card__trigger"
                type="button"
                onClick={() =>
                  setOpenIds((current) =>
                    current.includes(entry.id) ? current.filter((id) => id !== entry.id) : [...current, entry.id]
                  )
                }
              >
                <div className="attendance-history-item-card__copy">
                  <strong>{entry.title}</strong>
                  <div className="attendance-history-item-card__meta">
                    <span className="attendance-history-item-card__date">
                      <CalendarDays aria-hidden="true" />
                      {entry.date}
                    </span>
                    <span>Registrado às {entry.time}</span>
                    <span className="attendance-history-item-card__dot">|</span>
                    <span>por {entry.createdBy}</span>
                  </div>
                </div>

                <ChevronUp className="attendance-history-item-card__chevron" aria-hidden="true" />
              </button>

              <div className="attendance-history-item-card__content-shell">
                <div className="attendance-history-item-card__content">
                  {entry.students.map((student, index) => (
                    <div
                      key={student.id}
                      className={`attendance-history-student-row ${
                        index < entry.students.length - 1 ? "attendance-history-student-row--bordered" : ""
                      }`}
                    >
                      <div className="attendance-history-student-row__copy">
                        <span>{student.name}</span>
                        {student.note ? <p>{student.note}</p> : null}
                      </div>
                      <AttendanceBadge status={student.status} />
                    </div>
                  ))}
                </div>
              </div>
            </article>
          ))}

          {!filteredHistory.length ? (
            <div className="attendance-history-empty-state">Nenhum registro encontrado para os filtros selecionados.</div>
          ) : null}
        </div>
      </section>
    </main>
  );
}
