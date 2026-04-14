import { Sidebar } from "./components/Sidebar";
import { StudentsPageTabs } from "./components/StudentsPageTabs";
import { TopBar } from "./components/TopBar";

export default function App() {
  return (
    <div className="app-shell">
      <Sidebar />
      <div className="app-content">
        <TopBar />
        <StudentsPageTabs />
      </div>
    </div>
  );
}
