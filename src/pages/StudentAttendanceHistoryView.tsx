import { useMemo, useState } from "react";
import { AlertCircle, ArrowLeft, CalendarDays, CheckCircle2, ChevronDown, Eye, Plus } from "lucide-react";

import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import { DataTable, type DataTableColumn } from "@/src/components/ui/data-table";
import { DatePicker } from "@/src/components/ui/date-picker";
import { DocumentUploadField } from "@/src/components/ui/document-upload-field";
import { ModalContainer } from "@/src/components/ui/modal-container";
import { Pill } from "@/src/components/ui/pill";
import { SelectField } from "@/src/components/ui/select-field";
import { TextareaField } from "@/src/components/ui/textarea-field";

type AttendanceHistoryStatus = "Presente" | "Ausente" | "Justificado";
type AttendanceHistorySortKey = "date" | "moduleClass" | "status" | "note";

type JustificationType = "Atestado médico" | "Declaração" | "Outro";

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

type AttendanceHistoryJustification = {
  classDate: string;
  attendanceStatus: AttendanceHistoryStatus;
  type: JustificationType;
  note: string;
  file?: File;
  persistedFile?: {
    name: string;
    sizeLabel?: string;
  };
};

type RowRecord = StudentAttendanceHistoryRecordView & {
  effectiveStatus: AttendanceHistoryStatus;
};

type JustificationModalState = {
  mode: "create" | "view";
  recordId: string;
} | null;

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
  const order = { Presente: 0, Justificado: 1, Ausente: 2 };
  return order[left] - order[right];
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

function formatBrazilianDateToIso(value: string) {
  if (!value) {
    return "";
  }
  const [day, month, year] = value.split("/");
  if (!day || !month || !year) {
    return "";
  }
  return `${year}-${month}-${day}`;
}

function formatBytesToReadableSize(bytes: number) {
  if (bytes < 1024 * 1024) {
    return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  }
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function AttendanceStatusBadge({ status }: { status: AttendanceHistoryStatus }) {
  const tone = status === "Presente" ? "success" : status === "Justificado" ? "warning" : "error";
  const icon = status === "Presente" ? <CheckCircle2 /> : <AlertCircle />;

  return (
    <Badge className="whitespace-nowrap" variant={tone} appearance="icon" icon={icon}>
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
  const [filterDate, setFilterDate] = useState("");
  const [statusFilter, setStatusFilter] = useState<"Todos" | AttendanceHistoryStatus>("Todos");
  const [sortKey, setSortKey] = useState<AttendanceHistorySortKey>("date");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [justificationsByRecordId, setJustificationsByRecordId] = useState<Record<string, AttendanceHistoryJustification>>({});
  const [modalState, setModalState] = useState<JustificationModalState>(null);
  const [isViewEditing, setIsViewEditing] = useState(false);
  const [justificationDraft, setJustificationDraft] = useState<AttendanceHistoryJustification>({
    classDate: "",
    attendanceStatus: "Justificado",
    type: "Atestado médico",
    note: ""
  });

  const filteredRecords = useMemo(() => {
    const recordsWithStatus: RowRecord[] = records.map((record) => ({
      ...record,
      effectiveStatus: justificationsByRecordId[record.id]?.attendanceStatus ?? record.status
    }));

    const visibleRecords = recordsWithStatus.filter((record) => {
      const recordDate = parseBrazilianDate(record.date).getTime();
      const matchesDate =
        !filterDate ||
        (recordDate >= new Date(`${filterDate}T00:00:00`).getTime() &&
          recordDate <= new Date(`${filterDate}T23:59:59`).getTime());
      const matchesStatus = statusFilter === "Todos" || record.effectiveStatus === statusFilter;

      return matchesDate && matchesStatus;
    });

    return [...visibleRecords].sort((left, right) => {
      let comparison = 0;

      if (sortKey === "date") {
        comparison = parseBrazilianDate(left.date).getTime() - parseBrazilianDate(right.date).getTime();
      }

      if (sortKey === "moduleClass") {
        comparison = `${left.moduleLabel} ${left.className}`.localeCompare(`${right.moduleLabel} ${right.className}`, "pt-BR", {
          numeric: true
        });
      }

      if (sortKey === "status") {
        comparison = compareStatus(left.effectiveStatus, right.effectiveStatus);
      }

      if (sortKey === "note") {
        comparison = (left.note?.trim() || "-").localeCompare(right.note?.trim() || "-", "pt-BR", {
          numeric: true
        });
      }

      return sortDirection === "asc" ? comparison : comparison * -1;
    });
  }, [filterDate, justificationsByRecordId, records, sortDirection, sortKey, statusFilter]);

  const activeRecord = modalState ? filteredRecords.find((record) => record.id === modalState.recordId) ?? null : null;

  function handleSort(nextKey: AttendanceHistorySortKey) {
    if (nextKey === sortKey) {
      setSortDirection((current) => (current === "asc" ? "desc" : "asc"));
      return;
    }

    setSortKey(nextKey);
    setSortDirection(nextKey === "date" ? "desc" : "asc");
  }

  function openAddJustification(record: RowRecord) {
    setJustificationDraft({
      classDate: formatBrazilianDateToIso(record.date),
      attendanceStatus: "Justificado",
      type: "Atestado médico",
      note: record.note ?? ""
    });
    setIsViewEditing(false);
    setModalState({ mode: "create", recordId: record.id });
  }

  function openViewJustification(recordId: string) {
    const record = records.find((item) => item.id === recordId);
    const saved = justificationsByRecordId[recordId];
    if (!record || !saved) {
      return;
    }

    setJustificationDraft({
      classDate: formatBrazilianDateToIso(saved.classDate || record.date),
      attendanceStatus: saved.attendanceStatus,
      type: saved.type,
      note: saved.note,
      file: saved.file,
      persistedFile: saved.persistedFile
    });
    setIsViewEditing(false);
    setModalState({ mode: "view", recordId });
  }

  function handleSaveJustification() {
    if (!modalState) {
      return;
    }

    const normalizedDate = formatIsoDateToBrazilianDate(justificationDraft.classDate);

    setJustificationsByRecordId((current) => ({
      ...current,
      [modalState.recordId]: {
        ...justificationDraft,
        attendanceStatus: "Justificado",
        classDate: normalizedDate,
        persistedFile: justificationDraft.file
          ? {
              name: justificationDraft.file.name,
              sizeLabel: formatBytesToReadableSize(justificationDraft.file.size)
            }
          : justificationDraft.persistedFile
      }
    }));
    setIsViewEditing(false);
    setModalState(null);
  }

  const statusOptions = [
    { value: "Todos", label: "Todos" },
    { value: "Presente", label: "Presente" },
    { value: "Justificado", label: "Justificado" },
    { value: "Ausente", label: "Ausente" }
  ];

  const justificationTypeOptions = [
    { value: "Atestado médico", label: "Atestado médico" },
    { value: "Declaração", label: "Declaração" },
    { value: "Outro", label: "Outro" }
  ];

  const columns: DataTableColumn<RowRecord>[] = [
    {
      id: "date",
      header: (
        <Button className="h-auto min-h-0 w-full justify-start gap-1.5 p-0 text-left text-inherit hover:text-inherit" type="button" variant="ghost" onClick={() => handleSort("date")}>
          <span className="text-[var(--text-body-small-size)] leading-4">Data</span>
          <ChevronDown className={`h-4 w-4 ${sortKey === "date" && sortDirection === "asc" ? "rotate-180" : ""}`} aria-hidden="true" />
        </Button>
      ),
      cell: (record) => (
        <div className="flex items-center gap-2">
          <CalendarDays className="h-4 w-4 text-[var(--color-content-tertiary)]" aria-hidden="true" />
          <strong className="text-sm font-semibold text-[var(--color-content-primary)]">{record.date}</strong>
        </div>
      ),
      thClassName: "!px-4",
      tdClassName: "!px-4"
    },
    {
      id: "moduleClass",
      header: <span className="inline-flex w-full items-center text-[var(--text-body-small-size)] leading-4">Módulo e turma</span>,
      cell: (record) => (
        <div className="flex flex-wrap items-center gap-2">
          <Pill label={record.moduleLabel} tone={record.moduleTone} />
          <Pill label={record.className} tone={record.classTone} />
        </div>
      ),
      thClassName: "!px-4",
      tdClassName: "!px-4"
    },
    {
      id: "status",
      header: (
        <Button className="h-auto min-h-0 w-full justify-start gap-1.5 p-0 text-left text-inherit hover:text-inherit" type="button" variant="ghost" onClick={() => handleSort("status")}>
          <span className="text-[var(--text-body-small-size)] leading-4">Status</span>
          <ChevronDown className={`h-4 w-4 ${sortKey === "status" && sortDirection === "asc" ? "rotate-180" : ""}`} aria-hidden="true" />
        </Button>
      ),
      cell: (record) => <AttendanceStatusBadge status={record.effectiveStatus} />,
      thClassName: "!px-4",
      tdClassName: "!px-4"
    },
    {
      id: "note",
      header: <span className="inline-flex w-full items-center text-[var(--text-body-small-size)] leading-4">Observação</span>,
      cell: (record) => <span className="text-sm leading-5 text-[var(--color-content-tertiary)]">{record.note?.trim() || "-"}</span>,
      thClassName: "!px-4",
      tdClassName: "!px-4"
    },
    {
      id: "action",
      header: <span className="inline-flex w-full items-center text-[var(--text-body-small-size)] leading-4">Ação</span>,
      cell: (record) => {
        const hasJustification = Boolean(justificationsByRecordId[record.id]);
        const canAdd = record.effectiveStatus === "Ausente" && !hasJustification;

        if (!hasJustification && !canAdd) {
          return <span className="text-sm text-[var(--color-content-tertiary)]">-</span>;
        }

        return (
          <Button
            type="button"
            variant="ghost"
            icon={hasJustification ? <Eye aria-hidden="true" size={14} /> : <Plus aria-hidden="true" size={14} />}
            className={[
              "h-auto min-h-0 p-0 text-sm font-medium",
              hasJustification
                ? "text-[var(--color-content-tertiary)] hover:text-[var(--color-content-secondary)]"
                : "text-[var(--color-brand-primary-main)] hover:text-[var(--color-brand-orange)]"
            ].join(" ")}
            onClick={() => (hasJustification ? openViewJustification(record.id) : openAddJustification(record))}
          >
            {hasJustification ? "Ver justificativa" : "Adicionar justificativa"}
          </Button>
        );
      },
      thClassName: "!px-4",
      tdClassName: "!px-4"
    }
  ];

  return (
    <main className="flex w-full flex-col gap-6 px-5 py-6 sm:px-8 md:px-10">
      <section className="flex items-center gap-4">
        <button className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--color-surface-border)] bg-[var(--color-surface-card)] text-[var(--color-content-primary)]" type="button" aria-label="Voltar para o perfil do aluno" onClick={onBack}>
          <ArrowLeft aria-hidden="true" />
        </button>

        <div className="flex flex-col gap-1">
          <h1 className="m-0 text-xl font-semibold leading-[1.3] text-[var(--color-content-primary)]">Histórico Completo de Frequência</h1>
          <p className="m-0 text-sm text-[var(--color-content-tertiary)]">{studentName}</p>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-3 md:grid-cols-2" aria-label="Filtros do histórico de frequência">
        <DatePicker label="Data" value={filterDate} onChange={(event) => setFilterDate(event.target.value)} wrapperClassName="w-full" />

        <SelectField
          label="Status"
          variant="form"
          ariaLabel="Filtrar por status"
          value={statusFilter}
          options={statusOptions}
          onChange={(event) => setStatusFilter(event.target.value as "Todos" | AttendanceHistoryStatus)}
          fieldClassName="w-full"
        />
      </section>

      <DataTable
        title="Registros de frequência"
        titleId="student-attendance-history-title"
        countLabel={formatRecordCount(filteredRecords.length)}
        columns={columns}
        rows={filteredRecords}
        rowKey={(record) => record.id}
        tableMinWidthClassName="min-w-full"
        mobileCard={(record) => (
          <div className="flex flex-col gap-3 rounded-xl border border-[var(--color-surface-border)] bg-[var(--color-surface-card)] p-4">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4 text-[var(--color-content-tertiary)]" aria-hidden="true" />
                <strong className="text-sm font-semibold text-[var(--color-content-primary)]">{record.date}</strong>
              </div>
              <AttendanceStatusBadge status={record.effectiveStatus} />
            </div>
            <div className="flex flex-wrap gap-2">
              <Pill label={record.moduleLabel} tone={record.moduleTone} />
              <Pill label={record.className} tone={record.classTone} />
            </div>
            <p className="m-0 text-sm text-[var(--color-content-tertiary)]">{record.note?.trim() || "-"}</p>
            {justificationsByRecordId[record.id] || record.effectiveStatus === "Ausente" ? (
              <Button
                type="button"
                variant="ghost"
                icon={
                  justificationsByRecordId[record.id] ? (
                    <Eye aria-hidden="true" size={14} />
                  ) : (
                    <Plus aria-hidden="true" size={14} />
                  )
                }
                className={[
                  "h-auto min-h-0 justify-start p-0 text-sm font-medium",
                  justificationsByRecordId[record.id]
                    ? "text-[var(--color-content-tertiary)] hover:text-[var(--color-content-secondary)]"
                    : "text-[var(--color-brand-primary-main)] hover:text-[var(--color-brand-orange)]"
                ].join(" ")}
                onClick={() =>
                  justificationsByRecordId[record.id] ? openViewJustification(record.id) : openAddJustification(record)
                }
              >
                {justificationsByRecordId[record.id] ? "Ver justificativa" : "Adicionar justificativa"}
              </Button>
            ) : null}
          </div>
        )}
      />

      {!filteredRecords.length ? (
        <div className="rounded-xl border border-dashed border-[var(--color-surface-border)] px-4 py-6 text-center text-sm text-[var(--color-content-tertiary)]">
          Nenhum registro encontrado para os filtros selecionados. <span className="font-medium">{formatRecordCount(records.length)} no histórico do aluno.</span>
        </div>
      ) : null}

      <ModalContainer
        isOpen={Boolean(modalState)}
        onClose={() => {
          setModalState(null);
          setIsViewEditing(false);
        }}
        titleId="attendance-justification-modal-title"
        title={modalState?.mode === "view" ? "Visualizar justificativa" : "Adicionar justificativa"}
        subtitle={
          activeRecord
            ? `${modalState?.mode === "view" ? "Dados da justificativa" : "Registre uma justificativa"} de ${studentName} em ${activeRecord.date}.`
            : undefined
        }
        className="flex max-h-[85vh] w-[min(92vw,720px)] flex-col rounded-2xl"
        bodyClassName="overflow-y-auto px-6 pb-6"
        footerClassName="px-6 pb-6 pt-0"
        footer={
          modalState?.mode === "view" ? (
            isViewEditing ? (
              <>
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => {
                    if (!activeRecord) return;
                    const saved = justificationsByRecordId[activeRecord.id];
                    if (saved) {
                      setJustificationDraft({
                        classDate: formatBrazilianDateToIso(saved.classDate || activeRecord.date),
                        attendanceStatus: saved.attendanceStatus,
                        type: saved.type,
                        note: saved.note,
                        file: saved.file,
                        persistedFile: saved.persistedFile
                      });
                    }
                    setIsViewEditing(false);
                  }}
                >
                  Cancelar
                </Button>
                <Button type="button" variant="primary" onClick={handleSaveJustification}>
                  Salvar
                </Button>
              </>
            ) : (
              <>
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => {
                    setModalState(null);
                    setIsViewEditing(false);
                  }}
                >
                  Fechar
                </Button>
                <Button type="button" variant="primary" onClick={() => setIsViewEditing(true)}>
                  Editar justificativa
                </Button>
              </>
            )
          ) : (
            <>
              <Button type="button" variant="ghost" onClick={() => setModalState(null)}>
                Cancelar
              </Button>
              <Button type="button" variant="primary" onClick={handleSaveJustification}>
                Salvar justificativa
              </Button>
            </>
          )
        }
      >
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <DatePicker
            label="Data da aula *"
            value={justificationDraft.classDate}
            onChange={(event) => setJustificationDraft((current) => ({ ...current, classDate: event.target.value }))}
            disabled={modalState?.mode === "view" && !isViewEditing}
            wrapperClassName="w-full"
          />

          <div className="flex flex-col gap-1.5">
            <span className="text-[var(--text-body-small-size)] font-medium leading-4 text-[var(--color-content-primary)]">Status da frequência</span>
            <div className="inline-flex min-h-[46px] items-center rounded-[10px] border border-[var(--color-border-primary)] bg-[var(--color-background-secondary)] px-3 text-sm font-medium text-[var(--color-content-primary)]">
              Justificado
            </div>
          </div>

          <SelectField
            label="Tipo de justificativa"
            variant="form"
            ariaLabel="Tipo de justificativa"
            value={justificationDraft.type}
            options={justificationTypeOptions}
            onChange={(event) =>
              setJustificationDraft((current) => ({
                ...current,
                type: event.target.value as JustificationType
              }))
            }
            disabled={modalState?.mode === "view" && !isViewEditing}
            fieldClassName="w-full md:col-span-2"
          />

          <TextareaField
            label="Observação"
            rows={4}
            placeholder="Adicione observações sobre a justificativa..."
            value={justificationDraft.note}
            onChange={(event) => setJustificationDraft((current) => ({ ...current, note: event.target.value }))}
            disabled={modalState?.mode === "view" && !isViewEditing}
            wrapperClassName="w-full md:col-span-2"
          />

          {modalState?.mode === "view" && !justificationDraft.file && !justificationDraft.persistedFile ? (
            <div className="md:col-span-2 rounded-xl border border-dashed border-[var(--color-surface-border)] px-4 py-3 text-sm text-[var(--color-content-tertiary)]">
              Nenhum documento anexado.
            </div>
          ) : (
            <DocumentUploadField
              className="md:col-span-2"
              label="Documento (opcional)"
              selectedFile={modalState?.mode === "view" ? null : (justificationDraft.file ?? null)}
              persistedFile={justificationDraft.persistedFile}
              onFileChange={(file) => {
                if (modalState?.mode === "view" && !isViewEditing) {
                  return;
                }
                setJustificationDraft((current) => ({ ...current, file: file ?? undefined, persistedFile: undefined }));
              }}
              onFileRemove={
                modalState?.mode === "view" && !isViewEditing
                  ? undefined
                  : () => setJustificationDraft((current) => ({ ...current, file: undefined, persistedFile: undefined }))
              }
            />
          )}
        </div>
      </ModalContainer>
    </main>
  );
}
