import { useEffect, useState } from "react";
import { Navigate, Route, Routes, useLocation, useNavigate, useParams } from "react-router-dom";

import { Sidebar, type SidebarPage } from "./components/Sidebar";
import { TopBar } from "./components/TopBar";
import { AttendancePage } from "./pages/AttendancePage";
import { OverviewPage } from "./pages/OverviewPage";
import { StudentsPageDrawer } from "./pages/StudentsPageDrawer";

function getActivePage(pathname: string): SidebarPage {
  if (pathname.startsWith("/alunos")) {
    return "students";
  }

  if (pathname.startsWith("/presencas")) {
    return "attendance";
  }

  return "overview";
}

function AttendanceCallRoute({
  onOpenHistory,
  onOpenStart,
  onOpenCall
}: {
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
      onOpenHistory={onOpenHistory}
      onOpenStart={onOpenStart}
      onOpenCall={onOpenCall}
    />
  );
}

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const activePage = getActivePage(location.pathname);
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

  return (
    <div className={`app-shell ${isSidebarCollapsed ? "app-shell--sidebar-collapsed" : ""}`}>
      <Sidebar
        activePage={activePage}
        isOpen={isSidebarOpen}
        isCollapsed={isSidebarCollapsed}
        onClose={() => setIsSidebarOpen(false)}
        onToggleCollapse={() => setIsSidebarCollapsed((current) => !current)}
        onNavigate={(page) => {
          const routeByPage: Record<SidebarPage, string> = {
            overview: "/",
            students: "/alunos",
            attendance: "/presencas"
          };

          navigate(routeByPage[page]);
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
            <Route path="/alunos" element={<StudentsPageDrawer />} />
            <Route
              path="/presencas"
              element={
                <AttendancePage
                  initialView="history"
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
