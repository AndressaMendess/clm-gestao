import { AlertCircle, ArrowLeft, Check, CheckCircle2, Clock3, MessageCircleMore } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import {
  createAttendanceHistoryEntry,
  getAttendanceSessionByClassId,
  getCurrentTimeLabel,
  type AttendanceHistoryEntry
} from "../data/attendance";

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
      <main className="students-page dashboard-page dashboard-page--attendance-call">
        <section className="attendance-call-header">
          <button className="attendance-start-back-button" type="button" onClick={onBack}>
            <ArrowLeft aria-hidden="true" />
            <span>Voltar</span>
          </button>
        </section>

        <div className="attendance-history-empty-state">Turma não encontrada para iniciar a chamada.</div>
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
    <main className="students-page dashboard-page dashboard-page--attendance-call">
      <section className="attendance-call-header">
        <button className="attendance-start-back-button" type="button" onClick={onBack}>
          <ArrowLeft aria-hidden="true" />
          <span>Voltar</span>
        </button>

        <div className="attendance-call-header__row">
          <div className="page-header__copy dashboard-page__copy attendance-call-header__copy">
            <h1>{session.title}</h1>
            <p>{session.dateLabel}</p>
          </div>
        </div>
      </section>

      <section className="attendance-call-summary" aria-label="Resumo da chamada">
        <div className="attendance-call-summary__item attendance-call-summary__item--present">
          <span className="attendance-call-summary__dot" />
          <strong>{summary.presentCount}</strong>
          <span>presentes</span>
        </div>

        <div className="attendance-call-summary__item attendance-call-summary__item--pending">
          <span className="attendance-call-summary__dot" />
          <strong>{summary.pendingCount}</strong>
          <span>não registrados</span>
        </div>
      </section>

      <section className="attendance-call-table-card" aria-labelledby="attendance-call-title">
        <h2 id="attendance-call-title" className="sr-only">
          Lista de chamada da turma
        </h2>

        <div className="attendance-call-table">
          <div className="attendance-call-table__header attendance-call-table__row">
            <span>Status</span>
            <span>Nome</span>
            <span>Módulo</span>
            <span>Horário</span>
            <span>Observação</span>
          </div>

          {session.students.map((student) => {
            const isPresent = student.status === "presente";
            const isEditing = editingNoteId === student.id;

            return (
              <div key={student.id} className={`attendance-call-table__row-shell ${isPresent ? "is-present" : ""}`}>
                <div className="attendance-call-table__row">
                  <div className="attendance-call-table__cell attendance-call-table__cell--status">
                    <button
                      className={`attendance-status-toggle ${isPresent ? "is-checked" : ""}`}
                      type="button"
                      aria-pressed={isPresent}
                      aria-label={isPresent ? `Desmarcar presença de ${student.name}` : `Marcar presença de ${student.name}`}
                      onClick={() => handleTogglePresence(student.id)}
                    >
                      <Check aria-hidden="true" />
                    </button>
                  </div>

                  <div className="attendance-call-table__cell attendance-call-table__cell--name">
                    <div
                      className={`attendance-student-avatar ${student.avatarImage ? "has-image" : "has-initials"}`}
                      style={student.avatarColor ? { background: student.avatarColor } : undefined}
                    >
                      {student.avatarImage ? <img src={student.avatarImage} alt="" /> : <span>{student.avatarInitials}</span>}
                    </div>

                    <strong>{student.name}</strong>
                  </div>

                  <div className="attendance-call-table__cell">
                    <span className="attendance-module-badge">{student.moduleLabel}</span>
                  </div>

                  <div className="attendance-call-table__cell">
                    {student.recordedAt ? (
                      <span className="attendance-time-value">
                        <Clock3 aria-hidden="true" />
                        {student.recordedAt}
                      </span>
                    ) : (
                      <span className="attendance-time-value attendance-time-value--empty">-</span>
                    )}
                  </div>

                  <div className="attendance-call-table__cell attendance-call-table__cell--note">
                    <button
                      className={`attendance-note-button ${student.note ? "has-note" : ""}`}
                      type="button"
                      aria-expanded={isEditing}
                      aria-label={student.note ? `Editar observação de ${student.name}` : `Adicionar observação para ${student.name}`}
                      onClick={() => setEditingNoteId((current) => (current === student.id ? null : student.id))}
                    >
                      <MessageCircleMore aria-hidden="true" />
                    </button>
                  </div>
                </div>

                {isEditing ? (
                  <div className="attendance-note-editor">
                    <label className="sr-only" htmlFor={`attendance-note-${student.id}`}>
                      Observação para {student.name}
                    </label>
                    <textarea
                      id={`attendance-note-${student.id}`}
                      className="attendance-note-editor__field"
                      placeholder="Adicionar observação"
                      value={student.note ?? ""}
                      onChange={(event) => handleNoteChange(student.id, event.target.value)}
                    />
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </section>

      <button
        className="dashboard-cta-button attendance-call-finish-button attendance-call-finish-button--mobile"
        type="button"
        onClick={handleFinishRequest}
      >
        <span>Finalizar chamada</span>
      </button>

      {isConfirmFinishOpen ? (
        <div className="attendance-modal-overlay" role="presentation">
          <section
            className="attendance-modal attendance-modal--confirm"
            role="dialog"
            aria-modal="true"
            aria-labelledby="attendance-confirm-title"
            aria-describedby="attendance-confirm-description"
          >
            <div className="attendance-modal__header attendance-modal__header--row">
              <div className="attendance-modal__icon attendance-modal__icon--alert" aria-hidden="true">
                <AlertCircle />
              </div>

              <div className="attendance-modal__copy attendance-modal__copy--left">
                <h2 id="attendance-confirm-title">Finalizar Chamada</h2>
                <p id="attendance-confirm-description">
                  Todos os alunos foram registrados. Confirma a finalização da chamada?
                </p>
              </div>
            </div>

            <div className="attendance-modal__actions">
              <button className="attendance-modal__primary" type="button" onClick={handleConfirmFinish}>
                Confirmar
              </button>
              <button className="attendance-modal__secondary" type="button" onClick={() => setIsConfirmFinishOpen(false)}>
                Voltar
              </button>
            </div>
          </section>
        </div>
      ) : null}

      {isSuccessModalOpen ? (
        <div className="attendance-modal-overlay" role="presentation">
          <section
            className="attendance-modal attendance-modal--success"
            role="dialog"
            aria-modal="true"
            aria-labelledby="attendance-success-title"
            aria-describedby="attendance-success-description"
          >
            <div className="attendance-modal__header attendance-modal__header--center">
              <div className="attendance-modal__icon attendance-modal__icon--success" aria-hidden="true">
                <CheckCircle2 />
              </div>

              <div className="attendance-modal__copy attendance-modal__copy--center">
                <h2 id="attendance-success-title">Chamada Finalizada!</h2>
                <p id="attendance-success-description">{successMessage}</p>
              </div>
            </div>

            <div className="attendance-modal__actions">
              <button className="attendance-modal__primary" type="button" onClick={handleBackToPanel}>
                Voltar para o painel
              </button>
            </div>
          </section>
        </div>
      ) : null}
    </main>
  );
}

