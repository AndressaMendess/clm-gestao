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
    <main className="dashboard-page">
      <Card aria-labelledby="module-title" className="gap-6">
        <header className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <h1 id="module-title" className="m-0 inline-flex items-baseline gap-2">
            <span className="text-[var(--text-heading-h5-size)] font-semibold leading-[var(--text-heading-5-line-height)] tracking-[var(--text-heading-letter-spacing)] text-[var(--color-content-primary)]">
              {`${moduleConfig.label} -`}
            </span>
            <span className="text-[var(--text-body-x-large-size)] font-medium leading-[var(--text-body-line-height)] tracking-[var(--text-body-letter-spacing)] text-[var(--color-content-tertiary)]">
              {moduleConfig.subtitle}
            </span>
          </h1>

          <Button className="text-[var(--color-brand-primary-main)]" icon={<Plus aria-hidden="true" />} size="sm" variant="ghost">
            Nova turma
          </Button>
        </header>

        <section className="grid grid-cols-1 gap-4 lg:grid-cols-2" aria-label={`Turmas de ${moduleConfig.label}`}>
          {moduleCards.map((moduleCard) => {
            const ClassIcon = moduleCard.icon;

            return (
              <Button
                key={moduleCard.classId}
                className="w-full justify-start rounded-3xl border-0 bg-[var(--color-background-primary)] p-4 text-left text-[var(--color-content-primary)] shadow-[var(--shadow-card-soft)] transition-[transform,box-shadow] duration-150 hover:-translate-y-px hover:shadow-[var(--shadow-surface-soft)] sm:p-6 [&_.button__label]:flex [&_.button__label]:w-full"
                variant="secondary"
                onClick={() => onOpenClass(moduleCard.classId)}
              >
                <div className="flex w-full flex-col gap-3">
                  <div className="inline-flex items-center gap-2">
                    <span
                      className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-[var(--color-brand-primary-subtle)] text-[var(--color-brand-primary-main)] [&>svg]:h-5 [&>svg]:w-5 [&>svg]:shrink-0"
                      aria-hidden="true"
                    >
                      <ClassIcon />
                    </span>
                    <strong className="text-[var(--text-body-x-large-size)] font-semibold leading-[var(--text-body-line-height)] tracking-[var(--text-body-letter-spacing)] text-[var(--color-content-primary)]">
                      {moduleCard.className}
                    </strong>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <span className="inline-flex w-full items-center gap-2 whitespace-nowrap text-[var(--text-body-medium-size)] font-normal leading-[var(--text-body-line-height)] tracking-[var(--text-body-letter-spacing)] text-[var(--color-content-tertiary)] sm:w-auto">
                      <UserRound aria-hidden="true" className="h-4 w-4 shrink-0" />
                      <span>{`Professor: ${moduleCard.teacherName}`}</span>
                    </span>
                    <span className="inline-flex w-full items-center gap-2 whitespace-nowrap text-[var(--text-body-medium-size)] font-normal leading-[var(--text-body-line-height)] tracking-[var(--text-body-letter-spacing)] text-[var(--color-content-tertiary)] sm:w-auto">
                      <Users aria-hidden="true" className="h-4 w-4 shrink-0" />
                      <span>{`${moduleCard.studentCount} alunos`}</span>
                    </span>
                    <span className="inline-flex w-full items-center gap-2 whitespace-nowrap text-[var(--text-body-medium-size)] font-normal leading-[var(--text-body-line-height)] tracking-[var(--text-body-letter-spacing)] text-[var(--color-content-tertiary)] lg:w-full xl:w-auto">
                      <Clock3 aria-hidden="true" className="h-4 w-4 shrink-0" />
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
