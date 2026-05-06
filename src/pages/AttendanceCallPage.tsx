import { AlertCircle, ArrowLeft, CheckCircle2, Clock3, MessageCircleMore } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import {
  createAttendanceHistoryEntry,
  getAttendanceSessionByClassId,
  getCurrentTimeLabel,
  type AttendanceHistoryEntry
} from "../data/attendance";
import { Button } from "@/src/components/ui/button";
import { Card } from "@/src/components/ui/card";
import { Checkbox } from "@/src/components/ui/checkbox";
import { IconButton } from "@/src/components/ui/button";
import { Pill } from "@/src/components/ui/pill";

type AttendanceCallPageProps = {
  classId: number;
  onBack: () => void;
  onFinish: (entry: AttendanceHistoryEntry) => void;
};

export function AttendanceCallPage({ classId, onBack, onFinish }: AttendanceCallPageProps) {
  const [session, setSession] = useState(() => getAttendanceSessionByClassId(classId));
  const [editingNoteId, setEditingNoteId] = useState<number | null>(null);
  const [isConfirmFinishOpen, setIsConfirmFinishOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const summary = useMemo(() => {
    if (!session) {
      return { presentCount: 0, pendingCount: 0 };
    }

    return session.students.reduce(
      (accumulator, student) => {
        if (student.status === "presente") {
          accumulator.presentCount += 1;
        } else {
          accumulator.pendingCount += 1;
        }

        return accumulator;
      },
      { presentCount: 0, pendingCount: 0 }
    );
  }, [session]);

  useEffect(() => {
    if (!isConfirmFinishOpen && !isSuccessModalOpen) {
      return undefined;
    }

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isConfirmFinishOpen, isSuccessModalOpen]);

  if (!session) {
    return (
      <main className="flex w-full flex-col gap-6 px-4 py-6 sm:px-6 md:px-8">
        <section className="flex flex-col gap-2">
          <Button className="self-start" icon={<ArrowLeft aria-hidden="true" />} size="sm" variant="ghost" onClick={onBack}>
            Voltar
          </Button>
        </section>

        <div className="rounded-xl border border-dashed border-[var(--color-surface-border)] px-4 py-6 text-center text-sm text-[var(--color-content-tertiary)]">
          Turma não encontrada para iniciar a chamada.
        </div>
      </main>
    );
  }

  function handleTogglePresence(studentId: number) {
    setSession((current) => {
      if (!current) {
        return current;
      }

      return {
        ...current,
        students: current.students.map((student) =>
          student.id === studentId
            ? {
                ...student,
                status: student.status === "presente" ? "nao_registrado" : "presente",
                recordedAt: student.status === "presente" ? null : getCurrentTimeLabel()
              }
            : student
        )
      };
    });
  }

  function handleNoteChange(studentId: number, note: string) {
    setSession((current) => {
      if (!current) {
        return current;
      }

      return {
        ...current,
        students: current.students.map((student) => (student.id === studentId ? { ...student, note } : student))
      };
    });
  }

  function handleFinishRequest() {
    setIsConfirmFinishOpen(true);
  }

  function handleConfirmFinish() {
    setIsConfirmFinishOpen(false);
    setIsSuccessModalOpen(true);
  }

  function handleBackToPanel() {
    if (!session) {
      return;
    }

    onFinish(createAttendanceHistoryEntry(session));
  }

  const successMessage =
    summary.presentCount === 1
      ? "A presença foi registrada com sucesso para 1 aluno."
      : `A presença foi registrada com sucesso para ${summary.presentCount} alunos.`;

  return (
    <main className="flex w-full flex-col gap-6 px-4 py-6 sm:px-6 md:px-8">
      <section className="flex flex-col gap-4">
        <Button className="self-start" icon={<ArrowLeft aria-hidden="true" />} size="sm" variant="ghost" onClick={onBack}>
          Voltar
        </Button>

        <div className="flex flex-col gap-1">
          <h1 className="m-0 text-xl font-semibold leading-[1.3] text-[var(--color-content-primary)]">{session.title}</h1>
          <p className="m-0 text-sm text-[var(--color-content-tertiary)]">{session.dateLabel}</p>
        </div>
      </section>

      <section className="flex flex-wrap items-center gap-4 sm:gap-6" aria-label="Resumo da chamada">
        <div className="flex items-center gap-2 px-1 py-1">
          <span className="h-2.5 w-2.5 rounded-full bg-[var(--color-feedback-success-content)]" />
          <strong className="text-[var(--text-body-large-size)] leading-[var(--text-body-line-height)] text-[var(--color-feedback-success-content)]">{summary.presentCount}</strong>
          <span className="text-[var(--text-body-medium-size)] leading-[var(--text-body-line-height)] text-[var(--color-content-primary)]">presentes</span>
        </div>

        <div className="flex items-center gap-2 px-1 py-1">
          <span className="h-2.5 w-2.5 rounded-full bg-[var(--color-content-tertiary)]" />
          <strong className="text-[var(--text-body-large-size)] leading-[var(--text-body-line-height)] text-[var(--color-content-primary)]">{summary.pendingCount}</strong>
          <span className="text-[var(--text-body-medium-size)] leading-[var(--text-body-line-height)] text-[var(--color-content-primary)]">não registrados</span>
        </div>
      </section>

      <Card className="overflow-hidden p-0" aria-labelledby="attendance-call-title">
        <h2 id="attendance-call-title" className="sr-only">
          Lista de chamada da turma
        </h2>

        <div className="w-full">
          <div className="hidden grid-cols-[88px_minmax(200px,2fr)_minmax(130px,1fr)_minmax(130px,1fr)_110px] items-center gap-3 bg-[var(--color-background-secondary)] px-6 py-3 md:grid">
            <span className="text-[var(--text-body-medium-size)] font-medium leading-[var(--text-body-line-height)] text-[var(--color-content-secondary)]">Status</span>
            <span className="text-[var(--text-body-medium-size)] font-medium leading-[var(--text-body-line-height)] text-[var(--color-content-secondary)]">Nome</span>
            <span className="text-[var(--text-body-medium-size)] font-medium leading-[var(--text-body-line-height)] text-[var(--color-content-secondary)]">Módulo</span>
            <span className="text-[var(--text-body-medium-size)] font-medium leading-[var(--text-body-line-height)] text-[var(--color-content-secondary)]">Horário</span>
            <span className="text-[var(--text-body-medium-size)] font-medium leading-[var(--text-body-line-height)] text-[var(--color-content-secondary)]">Observação</span>
          </div>

          {session.students.map((student) => {
            const isPresent = student.status === "presente";
            const isEditing = editingNoteId === student.id;

            return (
              <div key={student.id} className="border-t border-[var(--color-surface-border)] first:border-t-0">
                <div
                  className={`grid grid-cols-1 gap-3 px-4 py-4 transition-colors duration-200 sm:px-6 md:grid-cols-[88px_minmax(200px,2fr)_minmax(130px,1fr)_minmax(130px,1fr)_110px] md:items-center ${
                    isPresent ? "bg-[var(--color-feedback-success-background)]" : "bg-[var(--color-surface-card)]"
                  }`}
                >
                  <div className="flex items-center gap-2 md:gap-0">
                    <Checkbox
                      className="[&_svg]:h-5 [&_svg]:w-5"
                      checked={isPresent}
                      variant="attendance"
                      aria-label={isPresent ? `Desmarcar presença de ${student.name}` : `Marcar presença de ${student.name}`}
                      onCheckedChange={() => handleTogglePresence(student.id)}
                    />
                  </div>

                  <div className="flex items-center gap-3">
                    <div
                      className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border border-[var(--color-surface-border)] bg-[var(--color-background-secondary)] text-sm font-semibold text-[var(--color-content-secondary)]"
                      style={student.avatarColor ? { background: student.avatarColor } : undefined}
                    >
                      {student.avatarImage ? <img src={student.avatarImage} alt="" /> : <span>{student.avatarInitials}</span>}
                    </div>

                    <strong className="text-[var(--text-body-large-size)] leading-[var(--text-body-line-height)] text-[var(--color-content-primary)]">{student.name}</strong>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-[var(--color-content-secondary)] md:hidden">Módulo:</span>
                    <Pill label={student.moduleLabel} tone="violet" />
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-[var(--color-content-secondary)] md:hidden">Horário:</span>
                    {student.recordedAt ? (
                      <span className="inline-flex items-center gap-1.5 text-[var(--text-body-medium-size)] leading-[var(--text-body-line-height)] text-[var(--color-content-primary)]">
                        <Clock3 className="h-4 w-4 text-[var(--color-content-secondary)]" aria-hidden="true" />
                        {student.recordedAt}
                      </span>
                    ) : (
                      <span className="text-[var(--text-body-medium-size)] leading-[var(--text-body-line-height)] text-[var(--color-content-secondary)]">-</span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-[var(--color-content-secondary)] md:hidden">Observação:</span>
                    <IconButton
                      className={student.note ? "text-[var(--color-brand-primary-main)]" : undefined}
                      aria-expanded={isEditing}
                      label={student.note ? `Editar observação de ${student.name}` : `Adicionar observação para ${student.name}`}
                      icon={<MessageCircleMore aria-hidden="true" />}
                      onClick={() => setEditingNoteId((current) => (current === student.id ? null : student.id))}
                    />
                  </div>
                </div>

                <div className={`grid overflow-hidden transition-all duration-200 ease-out ${isEditing ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                  <div
                    className={`min-h-0 border-t border-[var(--color-surface-border)] px-4 py-3 sm:px-6 ${
                      isPresent ? "bg-[var(--color-feedback-success-background)]" : "bg-[var(--color-surface-card)]"
                    }`}
                  >
                    <label className="sr-only" htmlFor={`attendance-note-${student.id}`}>
                      Observação para {student.name}
                    </label>
                    <textarea
                      id={`attendance-note-${student.id}`}
                      className="w-full rounded-[20px] border border-[var(--color-input-default-border)] bg-[var(--color-input-default-background)] px-4 py-3 text-[var(--text-body-medium-size)] leading-[var(--text-body-line-height)] text-[var(--color-content-primary)] outline-none transition-colors placeholder:text-[var(--color-content-tertiary)] hover:border-[var(--color-input-default-border-hover)] focus-visible:border-[var(--color-input-default-border-focus)] focus-visible:ring-2 focus-visible:ring-[var(--color-focus-outline-mix)]"
                      placeholder="Adicionar observação"
                      value={student.note ?? ""}
                      onChange={(event) => handleNoteChange(student.id, event.target.value)}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      <Button className="self-end" onClick={handleFinishRequest}>
        Finalizar chamada
      </Button>

      {isConfirmFinishOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[color-mix(in_srgb,var(--color-content-primary)_52%,transparent)] p-4" role="presentation">
          <section
            className="w-full max-w-[520px] rounded-3xl bg-[var(--color-surface-card)] p-6 shadow-[var(--shadow-modal)]"
            role="dialog"
            aria-modal="true"
            aria-labelledby="attendance-confirm-title"
            aria-describedby="attendance-confirm-description"
          >
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--color-feedback-warning-background)] text-[var(--color-feedback-warning-content)]" aria-hidden="true">
                <AlertCircle className="h-5 w-5" />
              </div>

              <div className="flex min-w-0 flex-col gap-1">
                <h2 id="attendance-confirm-title" className="m-0 text-[var(--text-title-h5-size)] font-semibold leading-[var(--text-title-h5-line-height)] text-[var(--color-content-primary)]">Finalizar Chamada</h2>
                <p id="attendance-confirm-description" className="m-0 text-[var(--text-body-medium-size)] leading-[var(--text-body-line-height)] text-[var(--color-content-secondary)]">
                  Todos os alunos foram registrados. Confirma a finalização da chamada?
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-end">
              <Button className="sm:min-w-[148px]" onClick={handleConfirmFinish}>
                Confirmar
              </Button>
              <Button className="sm:min-w-[148px]" variant="ghost" onClick={() => setIsConfirmFinishOpen(false)}>
                Voltar
              </Button>
            </div>
          </section>
        </div>
      ) : null}

      {isSuccessModalOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[color-mix(in_srgb,var(--color-content-primary)_52%,transparent)] p-4" role="presentation">
          <section
            className="w-full max-w-[520px] rounded-3xl bg-[var(--color-surface-card)] p-6 shadow-[var(--shadow-modal)]"
            role="dialog"
            aria-modal="true"
            aria-labelledby="attendance-success-title"
            aria-describedby="attendance-success-description"
          >
            <div className="flex flex-col items-center gap-4 text-center">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--color-feedback-success-background)] text-[var(--color-feedback-success-content)]" aria-hidden="true">
                <CheckCircle2 className="h-5 w-5" />
              </div>

              <div className="flex min-w-0 flex-col gap-1">
                <h2 id="attendance-success-title" className="m-0 text-[var(--text-title-h5-size)] font-semibold leading-[var(--text-title-h5-line-height)] text-[var(--color-content-primary)]">Chamada Finalizada!</h2>
                <p id="attendance-success-description" className="m-0 text-[var(--text-body-medium-size)] leading-[var(--text-body-line-height)] text-[var(--color-content-secondary)]">{successMessage}</p>
              </div>
            </div>

            <div className="mt-6 flex justify-center">
              <Button className="min-w-[220px]" onClick={handleBackToPanel}>
                Voltar para o painel
              </Button>
            </div>
          </section>
        </div>
      ) : null}
    </main>
  );
}


