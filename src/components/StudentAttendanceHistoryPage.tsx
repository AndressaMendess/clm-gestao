import { useMemo, useState } from "react";
import { ArrowLeft, CalendarDays, ChevronDown } from "lucide-react";

type AttendanceHistoryStatus = "Presente" | "Ausente";

export type StudentAttendanceHistoryRecord = {
  id: string;
  date: string;
  className: string;
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

function AttendanceStatusBadge({ status }: { status: AttendanceHistoryStatus }) {
  return (
    <span className={`student-attendance-history__status-badge student-attendance-history__status-badge--${status === "Presente" ? "present" : "absent"}`}>
      <span className="student-attendance-history__status-icon" aria-hidden="true">
        {status === "Presente" ? (
          <svg viewBox="0 0 20 20" fill="none">
            <path
              d="M18.333 9.233v.767A8.333 8.333 0 1 1 13.392 2.39"
              stroke="currentColor"
              strokeWidth="1.67"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path d="m18.333 3.333-8.333 8.342-2.5-2.5" stroke="currentColor" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ) : (
          <svg viewBox="0 0 20 20" fill="none">
            <path
              d="M10 6.667V10m0 3.333h.008M18.333 10A8.333 8.333 0 1 1 1.667 10a8.333 8.333 0 0 1 16.666 0Z"
              stroke="currentColor"
              strokeWidth="1.67"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </span>
      <span>{status}</span>
    </span>
  );
}

export function StudentAttendanceHistoryPage({
  studentName,
  records,
  onBack
}: {
  studentName: string;
  records: StudentAttendanceHistoryRecord[];
  onBack: () => void;
}) {
  const [startDate, setStartDate] = useState(records[0] ? toInputDate(records[records.length - 1].date) : "");
  const [endDate, setEndDate] = useState(records[0] ? toInputDate(records[0].date) : "");
  const [statusFilter, setStatusFilter] = useState<"Todos" | AttendanceHistoryStatus>("Todos");

  const filteredRecords = useMemo(() => {
    return records.filter((record) => {
      const recordDate = parseBrazilianDate(record.date).getTime();
      const matchesStart = !startDate || recordDate >= new Date(`${startDate}T00:00:00`).getTime();
      const matchesEnd = !endDate || recordDate <= new Date(`${endDate}T23:59:59`).getTime();
      const matchesStatus = statusFilter === "Todos" || record.status === statusFilter;

      return matchesStart && matchesEnd && matchesStatus;
    });
  }, [endDate, records, startDate, statusFilter]);

  return (
    <main className="students-page student-attendance-history-page">
      <section className="student-attendance-history-page__header">
        <button className="student-attendance-history-page__back" type="button" aria-label="Voltar para o perfil do aluno" onClick={onBack}>
          <ArrowLeft aria-hidden="true" />
        </button>

        <div className="student-attendance-history-page__copy">
          <h1>Histórico Completo de Frequência</h1>
          <p>{studentName}</p>
        </div>
      </section>

      <section className="student-attendance-history-page__filters" aria-label="Filtros do histórico de frequência">
        <label className="student-attendance-history-page__field">
          <span>Data inicial</span>
          <input type="date" value={startDate} onChange={(event) => setStartDate(event.target.value)} />
        </label>

        <label className="student-attendance-history-page__field">
          <span>Data final</span>
          <input type="date" value={endDate} onChange={(event) => setEndDate(event.target.value)} />
        </label>

        <label className="student-attendance-history-page__field student-attendance-history-page__field--select">
          <span>Status</span>
          <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value as "Todos" | AttendanceHistoryStatus)}>
            <option value="Todos">Todos</option>
            <option value="Presente">Presente</option>
            <option value="Ausente">Ausente</option>
          </select>
          <ChevronDown aria-hidden="true" />
        </label>
      </section>

      <section className="student-attendance-history-table-card" aria-labelledby="student-attendance-history-title">
        <h2 id="student-attendance-history-title" className="sr-only">
          Registros de frequência de {studentName}
        </h2>

        <div className="student-attendance-history-table">
          <div className="student-attendance-history-table__head">
            <span>Data</span>
            <span>Turma</span>
            <span>Status</span>
            <span>Observação</span>
          </div>

          {filteredRecords.length ? (
            filteredRecords.map((record) => (
              <article key={record.id} className="student-attendance-history-table__row">
                <div className="student-attendance-history-table__date">
                  <CalendarDays aria-hidden="true" />
                  <strong>{record.date}</strong>
                </div>
                <span className="student-attendance-history-table__class">{record.className}</span>
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
      </section>
    </main>
  );
}
