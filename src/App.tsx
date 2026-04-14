import { Sidebar } from "./components/Sidebar";
import { StudentsPageDrawer } from "./components/StudentsPageDrawer";
import { TopBar } from "./components/TopBar";

export default function App() {
  return (
    <div className="app-shell">
      <Sidebar />
      <div className="app-content">
        <TopBar />
        <StudentsPageDrawer />
      </div>
    </div>
  );
}
