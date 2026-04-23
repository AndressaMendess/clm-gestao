import { useMemo, useState } from "react";
import { CalendarDays, Plus } from "lucide-react";

import { Button } from "@/src/components/ui/button";
import { CollapsibleCard } from "@/src/components/ui/collapsible-card";
import { SelectField, type SelectFieldOption } from "@/src/components/ui/select-field";
import { attendanceHistory, type AttendanceHistoryEntry } from "../data/attendance";
import { getClassOptions, moduleOptions, type ClassFilter, type ModuleFilter } from "../data/filters";

function AttendanceBadge({ status }: { status: "Presente" | "Ausente" }) {
  return (
    <span className={`attendance-row-badge attendance-row-badge--${status === "Presente" ? "present" : "absent"}`}>
      {status}
    </span>
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
  const classOptions = useMemo(() => getClassOptions(moduleFilter), [moduleFilter]);
  const moduleSelectOptions = useMemo<SelectFieldOption[]>(
    () =>
      moduleOptions.map((option) => ({
        value: option,
        label: option === "Todos" ? "Filtrar por Módulos" : option
      })),
    []
  );
  const classSelectOptions = useMemo<SelectFieldOption[]>(
    () =>
      classOptions.map((option) => ({
        value: option,
        label: option === "Todas" ? "Filtrar por Turmas" : option
      })),
    [classOptions]
  );
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

        <Button icon={<Plus aria-hidden="true" />} onClick={onStartAttendance}>
          Iniciar chamada
        </Button>
      </section>

      <section className="dashboard-filters" aria-label="Filtros de presenças">
        <SelectField
          ariaLabel="Filtrar por Módulos"
          value={moduleFilter}
          options={moduleSelectOptions}
          onChange={(event) => {
            const value = event.target.value as ModuleFilter;
            setModuleFilter(value);
            setClassFilter("Todas");
          }}
        />
        <SelectField
          ariaLabel="Filtrar por Turmas"
          value={classFilter}
          options={classSelectOptions}
          onChange={(event) => setClassFilter(event.target.value as ClassFilter)}
        />
      </section>

      <section className="attendance-history-list-card" aria-labelledby="attendance-history-title">
        <h2 id="attendance-history-title" className="sr-only">
          Histórico de presenças
        </h2>

        <div className="attendance-history-list">
          {filteredHistory.map((entry, index) => (
            <CollapsibleCard
              key={entry.id}
              title={entry.title}
              icon={<CalendarDays aria-hidden="true" />}
              description={
                <span className="attendance-history-item-card__meta">
                  <span>Registrado em {entry.date}</span>
                  <span>{entry.time}</span>
                  <span className="attendance-history-item-card__dot">|</span>
                  <span>por {entry.createdBy}</span>
                </span>
              }
              defaultOpen={index === 0}
            >
              <div className="attendance-history-item-card__content">
                {entry.students.map((student, studentIndex) => (
                  <div
                    key={student.id}
                    className={`attendance-history-student-row ${
                      studentIndex < entry.students.length - 1 ? "attendance-history-student-row--bordered" : ""
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
            </CollapsibleCard>
          ))}

          {!filteredHistory.length ? (
            <div className="attendance-history-empty-state">Nenhum registro encontrado para os filtros selecionados.</div>
          ) : null}
        </div>
      </section>
    </main>
  );
}

