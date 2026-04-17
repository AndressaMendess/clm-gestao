import { CalendarDays, CheckCircle2, ClipboardCheck, ClipboardList, Users } from "lucide-react";

import { attendanceClassOptions, attendanceHistory } from "../data/attendance";
import { students } from "../data/students";
import { DashboardActionCard } from "./dashboard/DashboardActionCard";
import { DashboardPanel } from "./dashboard/DashboardPanel";

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

  const recentEntries = [...attendanceHistory]
    .sort((first, second) => parseEntryDate(second.date, second.time).getTime() - parseEntryDate(first.date, first.time).getTime())
    .slice(0, 2);

  const presentStudentsCount = attendanceHistory.reduce(
    (count, entry) => count + entry.students.filter((student) => student.status === "Presente").length,
    0
  );

  const stats = [
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
  ] as const;

  return (
    <main className="overview-page">
      <section className="overview-page__header">
        <div className="overview-page__greeting">
          <h1>
            {`Ol\u00E1, Andressa - `}
            <span>{formatTodayLabel()}</span>
          </h1>
        </div>
      </section>

      <section className="overview-actions" aria-label="A\u00E7\u00F5es r\u00E1pidas">
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

      <section className="overview-grid" aria-label="Resumo da opera\u00E7\u00E3o">
        <DashboardPanel
          title="Atividade Recente"
          className="dashboard-panel--activity"
          action={
            <button className="overview-panel__link" type="button" onClick={onOpenAttendanceHistory}>
              Ver tudo
            </button>
          }
        >
          <div className="overview-activity-list">
            {recentEntries.map((entry) => {
              const entryDate = parseEntryDate(entry.date, entry.time);

              return (
                <article key={entry.id} className="overview-activity-item">
                  <div className="overview-activity-item__icon" aria-hidden="true">
                    <CheckCircle2 />
                  </div>

                  <div className="overview-activity-item__content">
                    <div className="overview-activity-item__row">
                      <div>
                        <strong>{`Chamada registrada - ${entry.title}`}</strong>
                        <p>{`${entry.students.length} aluno${entry.students.length > 1 ? "s" : ""}`}</p>
                      </div>
                      <span className="overview-activity-item__age">{formatDaysAgoLabel(entryDate)}</span>
                    </div>

                    <div className="overview-activity-item__meta">
                      <CalendarDays aria-hidden="true" />
                      <span>{`${entry.date} \u00E0s ${entry.time}`}</span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </DashboardPanel>

        <DashboardPanel title="Estat\u00EDsticas R\u00E1pidas" className="dashboard-panel--stats" compactHeader>
          <div className="overview-stats-list">
            {stats.map((stat) => (
              <div key={stat.label} className="overview-stat">
                <div className="overview-stat__row">
                  <span>{stat.label}</span>
                  <strong>{stat.value}</strong>
                </div>
                <div className="overview-stat__track" aria-hidden="true">
                  <span className={`overview-stat__fill overview-stat__fill--${stat.tone}`} />
                </div>
              </div>
            ))}
          </div>
        </DashboardPanel>
      </section>
    </main>
  );
}
