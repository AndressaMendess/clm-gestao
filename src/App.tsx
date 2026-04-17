import { useEffect, useState } from "react";

import { AttendancePage } from "./components/AttendancePage";
import { DashboardSidebar, type DashboardPage } from "./components/DashboardSidebar";
import { OverviewPage } from "./components/OverviewPage";
import { StudentsPageDrawer } from "./components/StudentsPageDrawer";
import { TopBar } from "./components/TopBar";

export default function App() {
  const [activePage, setActivePage] = useState<DashboardPage>("overview");
  const [attendanceEntryPoint, setAttendanceEntryPoint] = useState<"history" | "start">("history");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

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
      <DashboardSidebar
        activePage={activePage}
        isOpen={isSidebarOpen}
        isCollapsed={isSidebarCollapsed}
        onClose={() => setIsSidebarOpen(false)}
        onToggleCollapse={() => setIsSidebarCollapsed((current) => !current)}
        onNavigate={(page) => {
          setActivePage(page);
          if (page !== "attendance") {
            setAttendanceEntryPoint("history");
          }
          setIsSidebarOpen(false);
        }}
      />
      <div className="app-content dashboard-app-content">
        <div className="dashboard-surface">
          <TopBar
            isSidebarCollapsed={isSidebarCollapsed}
            onMenuToggle={() => setIsSidebarOpen((current) => !current)}
            onSidebarToggle={() => setIsSidebarCollapsed((current) => !current)}
          />
          {activePage === "overview" ? (
            <OverviewPage
              onOpenAttendanceStart={() => {
                setAttendanceEntryPoint("start");
                setActivePage("attendance");
              }}
              onOpenStudents={() => {
                setAttendanceEntryPoint("history");
                setActivePage("students");
              }}
              onOpenAttendanceHistory={() => {
                setAttendanceEntryPoint("history");
                setActivePage("attendance");
              }}
            />
          ) : null}
          {activePage === "students" ? <StudentsPageDrawer /> : null}
          {activePage === "attendance" ? <AttendancePage initialView={attendanceEntryPoint} /> : null}
        </div>
      </div>
    </div>
  );
}
