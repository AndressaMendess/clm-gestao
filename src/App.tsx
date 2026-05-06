import { type Dispatch, type SetStateAction, useEffect, useState } from "react";
import { Navigate, Route, Routes, useLocation, useNavigate, useParams } from "react-router-dom";

import { Sidebar, type SidebarPage } from "./components/Sidebar";
import { attendanceHistory, type AttendanceHistoryEntry } from "./data/attendance";
import { getModuleConfigBySlug, type ModuleSlug } from "./data/modules";
import { TopBar } from "./components/TopBar";
import { AttendancePage } from "./pages/AttendancePage";
import { ModuleClassesPage } from "./pages/ModuleClassesPage";
import { OverviewPage } from "./pages/OverviewPage";
import { SettingsPage } from "./pages/SettingsPage";
import { StudentsPage } from "./pages/StudentsPage";
import { TeachersPage } from "./pages/TeachersPage";

function getActivePage(pathname: string): SidebarPage {
  if (pathname.startsWith("/alunos")) {
    return "students";
  }

  if (pathname.startsWith("/professores")) {
    return "teachers";
  }

  if (pathname.startsWith("/presencas")) {
    return "attendance";
  }

  if (pathname.startsWith("/modulos/")) {
    return "modules";
  }

  if (pathname.startsWith("/configuracoes")) {
    return "settings";
  }

  return "overview";
}

function getActiveModule(pathname: string): ModuleSlug | null {
  if (!pathname.startsWith("/modulos/")) {
    return null;
  }

  const slug = pathname.replace("/modulos/", "").split("/")[0];
  const moduleConfig = getModuleConfigBySlug(slug);

  return (moduleConfig?.slug as ModuleSlug | undefined) ?? null;
}

function AttendanceCallRoute({
  entries,
  onEntriesChange,
  onOpenHistory,
  onOpenStart,
  onOpenCall
}: {
  entries: AttendanceHistoryEntry[];
  onEntriesChange: Dispatch<SetStateAction<AttendanceHistoryEntry[]>>;
  onOpenHistory: () => void;
  onOpenStart: () => void;
  onOpenCall: (classId: number) => void;
}) {
  const { classId } = useParams<{ classId: string }>();
  const parsedClassId = Number(classId);

  if (!Number.isInteger(parsedClassId) || parsedClassId <= 0) {
    return <Navigate to="/presencas/iniciar" replace />;
  }

  return (
    <AttendancePage
      initialView="call"
      initialClassId={parsedClassId}
      entries={entries}
      onEntriesChange={onEntriesChange}
      onOpenHistory={onOpenHistory}
      onOpenStart={onOpenStart}
      onOpenCall={onOpenCall}
    />
  );
}

function ModuleClassesRoute({ onOpenClass }: { onOpenClass: (classId: number) => void }) {
  const { moduleSlug } = useParams<{ moduleSlug: string }>();
  const moduleConfig = moduleSlug ? getModuleConfigBySlug(moduleSlug) : undefined;

  if (!moduleConfig) {
    return <Navigate to="/" replace />;
  }

  return <ModuleClassesPage moduleSlug={moduleConfig.slug} onOpenClass={onOpenClass} />;
}

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const activePage = getActivePage(location.pathname);
  const activeModule = getActiveModule(location.pathname);
  const [attendanceEntries, setAttendanceEntries] = useState<AttendanceHistoryEntry[]>(attendanceHistory);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const openAttendanceHistory = () => navigate("/presencas");
  const openAttendanceStart = () => navigate("/presencas/iniciar");
  const openAttendanceCall = (classId: number) => navigate(`/presencas/chamada/${classId}`);

  useEffect(() => {
    if (!isSidebarOpen) {
      return undefined;
    }

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isSidebarOpen]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });

    const scrollContainers = document.querySelectorAll<HTMLElement>(".dashboard-surface, .app-content");
    scrollContainers.forEach((container) => {
      container.scrollTo({ top: 0, left: 0, behavior: "auto" });
    });
  }, [location.pathname]);

  return (
    <div className={`app-shell ${isSidebarCollapsed ? "app-shell--sidebar-collapsed" : ""}`}>
      <Sidebar
        activePage={activePage}
        activeModule={activeModule}
        isOpen={isSidebarOpen}
        isCollapsed={isSidebarCollapsed}
        onClose={() => setIsSidebarOpen(false)}
        onToggleCollapse={() => setIsSidebarCollapsed((current) => !current)}
        onNavigate={(page) => {
          const routeByPage: Record<SidebarPage, string> = {
            overview: "/",
            students: "/alunos",
            teachers: "/professores",
            attendance: "/presencas",
            modules: "/modulos/modulo-i",
            settings: "/configuracoes"
          };

          navigate(routeByPage[page]);
          setIsSidebarOpen(false);
        }}
        onNavigateModule={(moduleSlug) => {
          navigate(`/modulos/${moduleSlug}`);
          setIsSidebarOpen(false);
        }}
      />
      <div className="app-content dashboard-app-content">
        <div className="dashboard-surface">
          <TopBar
            onMenuToggle={() => setIsSidebarOpen((current) => !current)}
          />
          <Routes>
            <Route
              path="/"
              element={
                <OverviewPage
                  onOpenAttendanceStart={openAttendanceStart}
                  onOpenStudents={() => navigate("/alunos")}
                  onOpenAttendanceHistory={openAttendanceHistory}
                />
              }
            />
            <Route path="/alunos" element={<StudentsPage attendanceEntries={attendanceEntries} />} />
            <Route path="/professores" element={<TeachersPage />} />
            <Route path="/configuracoes" element={<SettingsPage />} />
            <Route path="/modulos/:moduleSlug" element={<ModuleClassesRoute onOpenClass={openAttendanceCall} />} />
            <Route
              path="/presencas"
              element={
                <AttendancePage
                  initialView="history"
                  entries={attendanceEntries}
                  onEntriesChange={setAttendanceEntries}
                  onOpenHistory={openAttendanceHistory}
                  onOpenStart={openAttendanceStart}
                  onOpenCall={openAttendanceCall}
                />
              }
            />
            <Route
              path="/presencas/iniciar"
              element={
                <AttendancePage
                  initialView="start"
                  entries={attendanceEntries}
                  onEntriesChange={setAttendanceEntries}
                  onOpenHistory={openAttendanceHistory}
                  onOpenStart={openAttendanceStart}
                  onOpenCall={openAttendanceCall}
                />
              }
            />
            <Route
              path="/presencas/chamada/:classId"
              element={
                <AttendanceCallRoute
                  entries={attendanceEntries}
                  onEntriesChange={setAttendanceEntries}
                  onOpenHistory={openAttendanceHistory}
                  onOpenStart={openAttendanceStart}
                  onOpenCall={openAttendanceCall}
                />
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}


