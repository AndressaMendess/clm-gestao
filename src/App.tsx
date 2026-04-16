import { useState } from "react";

import { AppSidebar } from "./components/AppSidebar";
import { StudentsPageDrawer } from "./components/StudentsPageDrawer";
import { TopBar } from "./components/TopBar";

export default function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className={`app-shell ${sidebarCollapsed ? "app-shell--sidebar-collapsed" : ""}`}>
      <AppSidebar
        activeItem="students"
        collapsed={sidebarCollapsed}
        onToggleCollapsed={() => setSidebarCollapsed((current) => !current)}
      />
      <div className="app-content">
        <TopBar />
        <StudentsPageDrawer />
      </div>
    </div>
  );
}
