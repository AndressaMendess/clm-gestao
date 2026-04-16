import { useEffect, useState } from "react";

import { AttendancePage } from "./components/AttendancePage";
import { DashboardSidebar, type DashboardPage } from "./components/DashboardSidebar";
import { StudentsPageDrawer } from "./components/StudentsPageDrawer";
import { TopBar } from "./components/TopBar";

export default function App() {
  const [activePage, setActivePage] = useState<DashboardPage>("attendance");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
    <div className="app-shell">
      <DashboardSidebar
        activePage={activePage}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onNavigate={(page) => {
          setActivePage(page);
          setIsSidebarOpen(false);
        }}
      />
      <div className="app-content dashboard-app-content">
        <div className="dashboard-surface">
          <TopBar onMenuToggle={() => setIsSidebarOpen((current) => !current)} />
          {activePage === "students" ? <StudentsPageDrawer /> : <AttendancePage />}
        </div>
      </div>
    </div>
  );
}
