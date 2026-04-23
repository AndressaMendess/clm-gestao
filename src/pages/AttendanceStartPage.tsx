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
    <main className="students-page dashboard-page dashboard-page--attendance-start">
      <section className="attendance-start-header">
        <Button className="attendance-start-back-button" icon={<ArrowLeft aria-hidden="true" />} size="sm" variant="ghost" onClick={onBack}>
          Voltar
        </Button>

        <div className="page-header__copy dashboard-page__copy">
          <h1>Iniciar a chamada -</h1>
          <p>Selecione a turma para registrar a presença</p>
        </div>
      </section>

      <Card aria-labelledby="attendance-start-title">
        <h2 id="attendance-start-title" className="sr-only">
          Seleção de turma para iniciar chamada
        </h2>

        <div className="attendance-start-groups">
          {Object.entries(groupedClasses).map(([moduleLabel, classes]) => (
            <section key={moduleLabel} className="attendance-start-group" aria-label={moduleLabel}>
              <h3 className="attendance-start-group__title">{moduleLabel}</h3>

              <div className="attendance-start-group__list">
                {classes.map((classOption) => (
                  <Button
                    key={classOption.id}
                    className="attendance-start-card"
                    variant="secondary"
                    onClick={() => onSelectClass?.(classOption.id)}
                  >
                    <div className="attendance-start-card__content">
                      <strong>{classOption.title}</strong>
                      <div className="attendance-start-card__meta">
                        <span>{classOption.teacherName}</span>
                        <span className="attendance-start-card__dot">•</span>
                        <span>{classOption.studentCount} alunos</span>
                      </div>
                    </div>

                    <ArrowRight className="attendance-start-card__icon" aria-hidden="true" />
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
