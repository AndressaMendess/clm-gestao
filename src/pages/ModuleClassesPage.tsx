import { Clock3, Plus, UserRound, Users } from "lucide-react";

import { Button } from "@/src/components/ui/button";
import { Card } from "@/src/components/ui/card";
import { getModuleCards, getModuleConfigBySlug, type ModuleSlug } from "../data/modules";

type ModuleClassesPageProps = {
  moduleSlug: ModuleSlug;
  onOpenClass: (classId: number) => void;
};

export function ModuleClassesPage({ moduleSlug, onOpenClass }: ModuleClassesPageProps) {
  const moduleConfig = getModuleConfigBySlug(moduleSlug);

  if (!moduleConfig) {
    return null;
  }

  const moduleCards = getModuleCards(moduleSlug);

  return (
    <main className="dashboard-page modules-page">
      <Card aria-labelledby="module-title">
        <header className="modules-board__header">
          <h1 id="module-title" className="modules-board__title">
            <span>{`${moduleConfig.label} -`}</span>
            <span>{moduleConfig.subtitle}</span>
          </h1>

          <Button className="modules-board__cta" icon={<Plus aria-hidden="true" />} size="sm" variant="ghost">
            Nova turma
          </Button>
        </header>

        <section className="modules-cards-grid" aria-label={`Turmas de ${moduleConfig.label}`}>
          {moduleCards.map((moduleCard) => {
            const ClassIcon = moduleCard.icon;

            return (
              <Button
                key={moduleCard.classId}
                className="module-class-card"
                variant="secondary"
                onClick={() => onOpenClass(moduleCard.classId)}
              >
                <div className="module-class-card__content">
                  <div className="module-class-card__top">
                    <span className="module-class-card__icon" aria-hidden="true">
                      <ClassIcon />
                    </span>
                    <strong>{moduleCard.className}</strong>
                  </div>

                  <div className="module-class-card__meta">
                    <span>
                      <UserRound aria-hidden="true" />
                      <span>{`Professor: ${moduleCard.teacherName}`}</span>
                    </span>
                    <span>
                      <Users aria-hidden="true" />
                      <span>{`${moduleCard.studentCount} alunos`}</span>
                    </span>
                    <span>
                      <Clock3 aria-hidden="true" />
                      <span>{moduleCard.scheduleLabel}</span>
                    </span>
                  </div>
                </div>
              </Button>
            );
          })}
        </section>
      </Card>
    </main>
  );
}
