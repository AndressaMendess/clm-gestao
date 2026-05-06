import { ArrowLeft, ArrowRight } from "lucide-react";
import { useMemo } from "react";

import { Button } from "@/src/components/ui/button";
import { Card } from "@/src/components/ui/card";
import { attendanceClassOptions } from "../data/attendance";

type AttendanceStartPageProps = {
  onBack: () => void;
  onSelectClass?: (classId: number) => void;
};

export function AttendanceStartPage({ onBack, onSelectClass }: AttendanceStartPageProps) {
  const groupedClasses = useMemo(() => {
    return attendanceClassOptions.reduce<Record<string, typeof attendanceClassOptions>>((groups, item) => {
      if (!groups[item.moduleLabel]) {
        groups[item.moduleLabel] = [];
      }

      groups[item.moduleLabel].push(item);
      return groups;
    }, {});
  }, []);

  return (
    <main className="flex w-full flex-col gap-6 px-4 py-6 sm:px-6 md:px-8">
      <section className="flex flex-col gap-2">
        <Button className="self-start" icon={<ArrowLeft aria-hidden="true" />} size="sm" variant="ghost" onClick={onBack}>
          Voltar
        </Button>

        <div className="flex flex-wrap items-center gap-2">
          <h1 className="m-0 text-xl font-semibold leading-[1.3] text-[var(--color-content-primary)]">Iniciar a chamada -</h1>
          <p className="m-0 text-sm text-[var(--color-content-tertiary)]">Selecione a turma para registrar a presença</p>
        </div>
      </section>

      <Card aria-labelledby="attendance-start-title">
        <h2 id="attendance-start-title" className="sr-only">
          Seleção de turma para iniciar chamada
        </h2>

        <div className="flex flex-col gap-4">
          {Object.entries(groupedClasses).map(([moduleLabel, classes]) => (
            <section key={moduleLabel} className="flex flex-col gap-3" aria-label={moduleLabel}>
              <h3 className="m-0 text-[var(--text-body-x-large-size)] font-semibold leading-[var(--text-body-line-height)] text-[var(--color-content-primary)]">
                {moduleLabel}
              </h3>

              <div className="flex flex-col gap-3">
                {classes.map((classOption) => (
                  <Button
                    key={classOption.id}
                    className="w-full justify-start text-left text-[var(--color-content-primary)] [&_.button__label]:w-full"
                    variant="secondary"
                    onClick={() => onSelectClass?.(classOption.id)}
                  >
                    <div className="flex w-full items-center justify-between gap-4 max-sm:items-end">
                      <div className="flex min-w-0 flex-col gap-1">
                        <strong className="text-[var(--color-content-primary)] text-[var(--text-body-x-large-size)] font-semibold leading-[var(--text-body-line-height)]">
                          {classOption.title}
                        </strong>
                        <div className="flex flex-wrap items-center gap-2 text-[var(--color-content-tertiary)] text-[var(--text-body-medium-size)] leading-[var(--text-body-line-height)]">
                          <span>{classOption.teacherName}</span>
                          <span className="text-[var(--color-border-tertiary)]">•</span>
                          <span>{classOption.studentCount} alunos</span>
                        </div>
                      </div>

                      <ArrowRight className="h-[18px] w-[18px] shrink-0 text-[var(--color-border-tertiary)] max-sm:mt-0.5" aria-hidden="true" />
                    </div>
                  </Button>
                ))}
              </div>
            </section>
          ))}
        </div>
      </Card>
    </main>
  );
}
