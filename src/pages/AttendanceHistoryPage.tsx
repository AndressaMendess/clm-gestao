import { useMemo, useState } from "react";
import { CalendarDays, Plus } from "lucide-react";

import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import { CollapsibleCard } from "@/src/components/ui/collapsible-card";
import { SelectField, type SelectFieldOption } from "@/src/components/ui/select-field";
import { attendanceHistory, type AttendanceHistoryEntry } from "../data/attendance";
import { getClassOptions, moduleOptions, type ClassFilter, type ModuleFilter } from "../data/filters";

function AttendanceBadge({ status }: { status: "Presente" | "Ausente" }) {
  return (
    <Badge appearance="icon" icon={<span className="h-2 w-2 rounded-full bg-current" aria-hidden="true" />} variant={status === "Presente" ? "success" : "error"}>
      {status}
    </Badge>
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
    <main className="flex w-full flex-col gap-6 px-5 py-6 sm:px-8 md:px-10">
      <section className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div className="flex flex-col gap-1">
          <h1 className="m-0 text-xl font-semibold leading-[1.3] text-[var(--color-content-primary)]">Presenças -</h1>
          <p className="m-0 text-sm text-[var(--color-content-tertiary)]">Histórico e gerenciamento de registros de presença</p>
        </div>

        <Button icon={<Plus aria-hidden="true" />} onClick={onStartAttendance}>
          Iniciar chamada
        </Button>
      </section>

      <section className="grid grid-cols-1 gap-3 md:grid-cols-2" aria-label="Filtros de presenças">
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
        <SelectField ariaLabel="Filtrar por Turmas" value={classFilter} options={classSelectOptions} onChange={(event) => setClassFilter(event.target.value as ClassFilter)} />
      </section>

      <section className="rounded-3xl border border-[var(--color-surface-border)] bg-[var(--color-surface-card)] p-4 sm:p-6" aria-labelledby="attendance-history-title">
        <h2 id="attendance-history-title" className="sr-only">
          Histórico de presenças
        </h2>

        <div className="flex flex-col gap-4">
          {filteredHistory.map((entry, index) => (
            <CollapsibleCard
              key={entry.id}
              title={entry.title}
              icon={<CalendarDays aria-hidden="true" />}
              description={
                <span className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-[var(--color-content-tertiary)]">
                  <span>Registrado em {entry.date}</span>
                  <span>{entry.time}</span>
                  <span>· por {entry.createdBy}</span>
                </span>
              }
              defaultOpen={index === 0}
            >
              <div className="flex flex-col gap-0">
                {entry.students.map((student, studentIndex) => (
                  <div key={student.id} className={`flex items-start justify-between gap-3 py-3 ${studentIndex < entry.students.length - 1 ? "border-b border-[var(--color-surface-border)]" : ""}`}>
                    <div className="flex min-w-0 flex-col gap-1">
                      <span className="text-sm font-medium text-[var(--color-content-primary)]">{student.name}</span>
                      {student.note ? <p className="m-0 text-sm text-[var(--color-content-tertiary)]">{student.note}</p> : null}
                    </div>
                    <AttendanceBadge status={student.status} />
                  </div>
                ))}
              </div>
            </CollapsibleCard>
          ))}

          {!filteredHistory.length ? (
            <div className="rounded-xl border border-dashed border-[var(--color-surface-border)] px-4 py-6 text-center text-sm text-[var(--color-content-tertiary)]">Nenhum registro encontrado para os filtros selecionados.</div>
          ) : null}
        </div>
      </section>
    </main>
  );
}

