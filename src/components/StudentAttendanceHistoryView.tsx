import { useMemo, useState } from "react";
import { AlertCircle, ArrowLeft, CalendarDays, CheckCircle2, ChevronDown } from "lucide-react";

import { Badge } from "@/src/components/ui/badge";
import { DatePicker } from "@/src/components/ui/date-picker";
import { SelectField } from "@/src/components/ui/select-field";
import { TableCard } from "@/src/components/ui/table-card";

type AttendanceHistoryStatus = "Presente" | "Ausente";
type AttendanceHistorySortKey = "date" | "moduleClass" | "status" | "note";

export type StudentAttendanceHistoryRecordView = {
  id: string;
  date: string;
  moduleLabel: string;
  moduleTone: "violet" | "orange" | "blue";
  className: string;
  classTone: "blue" | "pink";
  status: AttendanceHistoryStatus;
  note?: string;
};

function parseBrazilianDate(value: string) {
  const [day, month, year] = value.split("/").map(Number);
  return new Date(year, month - 1, day);
}

function toInputDate(value: string) {
  const parsedDate = parseBrazilianDate(value);
  const month = `${parsedDate.getMonth() + 1}`.padStart(2, "0");
  const day = `${parsedDate.getDate()}`.padStart(2, "0");

  return `${parsedDate.getFullYear()}-${month}-${day}`;
}

function formatRecordCount(count: number) {
  return `${count} ${count === 1 ? "registro" : "registros"}`;
}

function compareStatus(left: AttendanceHistoryStatus, right: AttendanceHistoryStatus) {
  const order = { Presente: 0, Ausente: 1 };
  return order[left] - order[right];
}

function AttendanceStatusBadge({ status }: { status: AttendanceHistoryStatus }) {
  const tone = status === "Presente" ? "success" : "error";

  return (
    <Badge
      className={`student-attendance-history__status-badge student-attendance-history__status-badge--${
        status === "Presente" ? "present" : "absent"
      }`}
      variant={tone}
      appearance="icon"
      icon={status === "Presente" ? <CheckCircle2 /> : <AlertCircle />}
    >
      {status}
    </Badge>
  );
}

export function StudentAttendanceHistoryView({
  studentName,
  records,
  onBack
}: {
  studentName: string;
  records: StudentAttendanceHistoryRecordView[];
  onBack: () => void;
}) {
  const [startDate, setStartDate] = useState(records[0] ? toInputDate(records[records.length - 1].date) : "");
  const [endDate, setEndDate] = useState(records[0] ? toInputDate(records[0].date) : "");
  const [statusFilter, setStatusFilter] = useState<"Todos" | AttendanceHistoryStatus>("Todos");
  const [sortKey, setSortKey] = useState<AttendanceHistorySortKey>("date");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  const filteredRecords = useMemo(() => {
    const visibleRecords = records.filter((record) => {
      const recordDate = parseBrazilianDate(record.date).getTime();
      const matchesStart = !startDate || recordDate >= new Date(`${startDate}T00:00:00`).getTime();
      const matchesEnd = !endDate || recordDate <= new Date(`${endDate}T23:59:59`).getTime();
      const matchesStatus = statusFilter === "Todos" || record.status === statusFilter;

      return matchesStart && matchesEnd && matchesStatus;
    });

    return [...visibleRecords].sort((left, right) => {
      let comparison = 0;

      if (sortKey === "date") {
        comparison = parseBrazilianDate(left.date).getTime() - parseBrazilianDate(right.date).getTime();
      }

      if (sortKey === "moduleClass") {
        comparison = `${left.moduleLabel} ${left.className}`.localeCompare(
          `${right.moduleLabel} ${right.className}`,
          "pt-BR",
          { numeric: true }
        );
      }

      if (sortKey === "status") {
        comparison = compareStatus(left.status, right.status);
      }

      if (sortKey === "note") {
        comparison = (left.note?.trim() || "-").localeCompare(right.note?.trim() || "-", "pt-BR", {
          numeric: true
        });
      }

      return sortDirection === "asc" ? comparison : comparison * -1;
    });
  }, [endDate, records, sortDirection, sortKey, startDate, statusFilter]);

  function handleSort(nextKey: AttendanceHistorySortKey) {
    if (nextKey === sortKey) {
      setSortDirection((current) => (current === "asc" ? "desc" : "asc"));
      return;
    }

    setSortKey(nextKey);
    setSortDirection(nextKey === "date" ? "desc" : "asc");
  }

  const statusOptions = [
    { value: "Todos", label: "Todos" },
    { value: "Presente", label: "Presente" },
    { value: "Ausente", label: "Ausente" }
  ];

  return (
    <main className="students-page student-attendance-history-page">
      <section className="student-attendance-history-page__header">
        <button
          className="student-attendance-history-page__back"
          type="button"
          aria-label="Voltar para o perfil do aluno"
          onClick={onBack}
        >
          <ArrowLeft aria-hidden="true" />
        </button>

        <div className="student-attendance-history-page__copy">
          <h1>Histórico Completo de Frequência</h1>
          <p>{studentName}</p>
        </div>
      </section>

      <section className="student-attendance-history-page__filters" aria-label="Filtros do histórico de frequência">
        <DatePicker
          label="Data inicial"
          value={startDate}
          onChange={(event) => setStartDate(event.target.value)}
          wrapperClassName="student-attendance-history-page__field"
        />

        <DatePicker
          label="Data final"
          value={endDate}
          onChange={(event) => setEndDate(event.target.value)}
          wrapperClassName="student-attendance-history-page__field"
        />

        <SelectField
          label="Status"
          variant="form"
          ariaLabel="Filtrar por status"
          value={statusFilter}
          options={statusOptions}
          onChange={(event) => setStatusFilter(event.target.value as "Todos" | AttendanceHistoryStatus)}
          fieldClassName="student-attendance-history-page__field"
        />
      </section>

      <TableCard
        title="Registros de frequência"
        titleId="student-attendance-history-title"
        countLabel={formatRecordCount(filteredRecords.length)}
        className="student-attendance-history-table-card"
      >
        <div className="student-attendance-history-table">
          <div className="student-attendance-history-table__head">
            <button
              className={`table-header-button ${sortKey === "date" ? "is-active" : ""}`}
              type="button"
              onClick={() => handleSort("date")}
            >
              <span>Data</span>
              <ChevronDown
                className={`table-header-button__icon ${
                  sortKey === "date" && sortDirection === "asc" ? "is-ascending" : ""
                }`}
                aria-hidden="true"
              />
            </button>
            <span className="table-header-label">Módulo e turma</span>
            <button
              className={`table-header-button ${sortKey === "status" ? "is-active" : ""}`}
              type="button"
              onClick={() => handleSort("status")}
            >
              <span>Status</span>
              <ChevronDown
                className={`table-header-button__icon ${
                  sortKey === "status" && sortDirection === "asc" ? "is-ascending" : ""
                }`}
                aria-hidden="true"
              />
            </button>
            <span className="table-header-label">Observação</span>
          </div>

          {filteredRecords.length ? (
            filteredRecords.map((record) => (
              <article key={record.id} className="student-attendance-history-table__row">
                <div className="student-attendance-history-table__date">
                  <CalendarDays aria-hidden="true" />
                  <strong>{record.date}</strong>
                </div>
                <div className="student-attendance-history-table__module-class">
                  <span className={`pill pill--${record.moduleTone}`}>{record.moduleLabel}</span>
                  <span className={`pill pill--${record.classTone}`}>{record.className}</span>
                </div>
                <AttendanceStatusBadge status={record.status} />
                <span className="student-attendance-history-table__note">{record.note?.trim() || "-"}</span>
              </article>
            ))
          ) : (
            <div className="student-attendance-history-table__empty">
              Nenhum registro encontrado para os filtros selecionados.
              <span>{formatRecordCount(records.length)} no histórico do aluno.</span>
            </div>
          )}
        </div>
      </TableCard>
    </main>
  );
}



