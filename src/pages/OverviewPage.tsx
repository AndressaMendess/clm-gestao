import { useMemo } from "react";
import { CalendarDays, CheckCircle2, ClipboardCheck, ClipboardList, Users } from "lucide-react";

import { attendanceHistory } from "../data/attendance";
import { students } from "../data/students";
import { DashboardActionCard } from "../components/dashboard/DashboardActionCard";
import { DashboardPanel } from "../components/dashboard/DashboardPanel";
import { Button } from "../components/ui/button";

type OverviewPageProps = {
  onOpenAttendanceStart: () => void;
  onOpenStudents: () => void;
  onOpenAttendanceHistory: () => void;
};

type OverviewAction = {
  id: "start-attendance" | "students" | "attendance";
  title: string;
  description: string;
  icon: typeof ClipboardCheck;
  tone: "primary" | "purple" | "green";
  onClick: () => void;
};

function capitalize(value: string) {
  if (!value) {
    return value;
  }

  return value.charAt(0).toUpperCase() + value.slice(1);
}

function parseEntryDate(date: string, time: string) {
  const [day, month, year] = date.split("/").map(Number);
  const [hours, minutes] = time.split(":").map(Number);

  return new Date(year, month - 1, day, hours, minutes);
}

function formatTodayLabel(date = new Date()) {
  const formatted = new Intl.DateTimeFormat("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long"
  }).format(date);

  return capitalize(formatted) + ".";
}

function formatDaysAgoLabel(date: Date, now = new Date()) {
  const diffInMs = now.getTime() - date.getTime();
  const diffInDays = Math.max(0, Math.floor(diffInMs / (1000 * 60 * 60 * 24)));

  return `${diffInDays}d atr\u00E1s`;
}

export function OverviewPage({
  onOpenAttendanceStart,
  onOpenStudents,
  onOpenAttendanceHistory
}: OverviewPageProps) {
  const overviewActions: OverviewAction[] = [
    {
      id: "start-attendance",
      title: "Iniciar Chamada",
      description: "Registre a presen\u00E7a dos alunos de forma r\u00E1pida e organizada.",
      icon: ClipboardCheck,
      tone: "primary",
      onClick: onOpenAttendanceStart
    },
    {
      id: "students",
      title: "Alunos",
      description: "Gerencie o cadastro completo de alunos.",
      icon: Users,
      tone: "purple",
      onClick: onOpenStudents
    },
    {
      id: "attendance",
      title: "Presen\u00E7as",
      description: "Consulte o hist\u00F3rico de registros de presen\u00E7a.",
      icon: ClipboardList,
      tone: "green",
      onClick: onOpenAttendanceHistory
    }
  ];

  const recentEntries = useMemo(
    () =>
      [...attendanceHistory]
        .sort((first, second) => parseEntryDate(second.date, second.time).getTime() - parseEntryDate(first.date, first.time).getTime())
        .slice(0, 2),
    []
  );

  const presentStudentsCount = useMemo(
    () =>
      attendanceHistory.reduce(
        (count, entry) => count + entry.students.filter((student) => student.status === "Presente").length,
        0
      ),
    []
  );

  const stats = useMemo(
    () =>
      [
        {
          label: "Alunos Presentes",
          value: presentStudentsCount,
          tone: "orange"
        },
        {
          label: "Turmas Ativas",
          value: new Set(students.map((student) => student.className)).size,
          tone: "blue"
        },
        {
          label: "Alunos Ativos",
          value: students.length,
          tone: "purple"
        }
      ] as const,
    [presentStudentsCount]
  );

  return (
    <main className="flex flex-1 flex-col gap-6 px-4 pb-8 max-[960px]:gap-5 max-[960px]:pt-5 max-[960px]:pb-7 max-[640px]:px-3">
      <section className="pt-4">
        <div>
          <h1 className="m-0 text-[var(--text-heading-h6-size)] font-semibold leading-[var(--text-heading-6-line-height)] tracking-[var(--text-heading-6-letter-spacing)] text-[var(--color-content-primary)] max-[640px]:flex max-[640px]:flex-col max-[640px]:gap-0.5">
            {"Ol\u00E1 - "}
            <span className="text-[var(--text-body-x-large-size)] font-medium leading-[var(--text-body-line-height)] tracking-[var(--text-body-letter-spacing)] text-[var(--color-content-tertiary)]">
              {formatTodayLabel()}
            </span>
          </h1>
        </div>
      </section>

      <section
        className="grid grid-cols-3 gap-4 max-[960px]:grid-cols-1"
        aria-label={"A\u00E7\u00F5es r\u00E1pidas"}
      >
        {overviewActions.map((action) => {
          return (
            <DashboardActionCard
              key={action.id}
              title={action.title}
              description={action.description}
              icon={action.icon}
              tone={action.tone}
              onClick={action.onClick}
            />
          );
        })}
      </section>

      <section className="grid grid-cols-[minmax(0,2.1fr)_minmax(280px,1fr)] gap-4 max-[960px]:grid-cols-1" aria-label={"Resumo da opera\u00E7\u00E3o"}>
        <DashboardPanel
          title="Atividade Recente"
          action={
            <Button
              className="min-h-0 rounded-xl px-2 py-1 text-[length:var(--text-body-x-large-size)] !text-[var(--color-brand-primary-main)]"
              size="sm"
              variant="ghost"
              onClick={onOpenAttendanceHistory}
            >
              Ver tudo
            </Button>
          }
        >
          <div className="flex flex-col gap-2 px-2 pb-2">
            {recentEntries.length > 0 ? (
              recentEntries.map((entry) => {
                const entryDate = parseEntryDate(entry.date, entry.time);

                return (
                  <article
                    key={entry.id}
                    className="grid grid-cols-[40px_minmax(0,1fr)] gap-4 px-6 py-4 max-[640px]:grid-cols-1 max-[640px]:px-4"
                  >
                    <div
                      className="inline-flex h-10 w-10 items-center justify-center rounded-[10px] bg-[var(--color-accent-blue-background)] text-[var(--color-accent-blue-content)] [&>svg]:h-4 [&>svg]:w-4 [&>svg]:shrink-0"
                      aria-hidden="true"
                    >
                      <CheckCircle2 />
                    </div>

                    <div className="flex min-w-0 flex-col gap-2">
                      <div className="flex items-start justify-between gap-4 max-[640px]:flex-col max-[640px]:gap-1">
                        <div>
                          <strong className="block text-[var(--text-body-medium-size)] font-medium leading-[var(--text-body-line-height)] tracking-[var(--text-body-letter-spacing)] text-[var(--color-content-primary)]">
                            {`Chamada registrada - ${entry.title}`}
                          </strong>
                          <p className="m-0 text-[var(--text-body-medium-size)] leading-[var(--text-body-line-height)] tracking-[var(--text-body-letter-spacing)] text-[var(--color-content-tertiary)]">
                            {`${entry.students.length} aluno${entry.students.length > 1 ? "s" : ""}`}
                          </p>
                        </div>
                        <span className="whitespace-nowrap text-[var(--text-body-medium-size)] leading-[var(--text-body-line-height)] tracking-[var(--text-body-letter-spacing)] text-[var(--color-content-tertiary)]">
                          {formatDaysAgoLabel(entryDate)}
                        </span>
                      </div>

                      <div className="inline-flex items-center gap-1.5 text-[var(--text-body-small-size)] leading-[var(--text-body-line-height)] tracking-[var(--text-body-letter-spacing)] text-[var(--color-content-tertiary)] [&>svg]:h-4 [&>svg]:w-4 [&>svg]:shrink-0">
                        <CalendarDays aria-hidden="true" />
                        <span>{`${entry.date} \u00E0s ${entry.time}`}</span>
                      </div>
                    </div>
                  </article>
                );
              })
            ) : (
              <p className="m-0 px-6 py-4 text-[var(--text-body-medium-size)] leading-[var(--text-body-line-height)] tracking-[var(--text-body-letter-spacing)] text-[var(--color-content-tertiary)]">
                Nenhuma atividade recente registrada.
              </p>
            )}
          </div>
        </DashboardPanel>

        <DashboardPanel title={"Estat\u00EDsticas R\u00E1pidas"} className="flex min-h-0 flex-col px-6 pb-6" compactHeader>
          <div className="flex flex-1 flex-col justify-center gap-4">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-[var(--text-body-medium-size)] leading-[var(--text-body-line-height)] tracking-[var(--text-body-letter-spacing)] text-[var(--color-content-tertiary)]">
                    {stat.label}
                  </span>
                  <strong className="text-[var(--text-body-x-large-size)] font-bold leading-[var(--text-body-line-height)] tracking-[var(--text-body-letter-spacing)] text-[var(--color-content-primary)]">
                    {stat.value}
                  </strong>
                </div>
                <div className="h-1 w-full overflow-hidden rounded-full bg-[var(--color-background-secondary)]" aria-hidden="true">
                  <span
                    className={
                      stat.tone === "orange"
                        ? "block h-full w-full rounded-[inherit] bg-[linear-gradient(90deg,var(--color-brand-primary-main),var(--color-brand-primary-gradient-end))]"
                        : stat.tone === "blue"
                          ? "block h-full w-full rounded-[inherit] bg-[linear-gradient(90deg,var(--color-brand-secondary-main),var(--primitive-iblue-500))]"
                          : "block h-full w-full rounded-[inherit] bg-[var(--primitive-purple-500)]"
                    }
                  />
                </div>
              </div>
            ))}
          </div>
        </DashboardPanel>
      </section>
    </main>
  );
}
