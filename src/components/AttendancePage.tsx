import { useState } from "react";

import { attendanceHistory, type AttendanceHistoryEntry } from "../data/attendance";
import { AttendanceCallPage } from "./AttendanceCallPage";
import { AttendanceHistoryPage } from "./AttendanceHistoryPage";
import { AttendanceStartPage } from "./AttendanceStartPage";

type AttendanceView = "history" | "start" | "call";

export function AttendancePage() {
  const [historyEntries, setHistoryEntries] = useState<AttendanceHistoryEntry[]>(attendanceHistory);
  const [view, setView] = useState<AttendanceView>("history");
  const [selectedClassId, setSelectedClassId] = useState<number | null>(null);

  if (view === "history") {
    return <AttendanceHistoryPage entries={historyEntries} onStartAttendance={() => setView("start")} />;
  }

  if (view === "start") {
    return (
      <AttendanceStartPage
        onBack={() => setView("history")}
        onSelectClass={(classId) => {
          setSelectedClassId(classId);
          setView("call");
        }}
      />
    );
  }

  return selectedClassId ? (
    <AttendanceCallPage
      classId={selectedClassId}
      onBack={() => setView("start")}
      onFinish={(entry) => {
        setHistoryEntries((current) => [entry, ...current]);
        setSelectedClassId(null);
        setView("history");
      }}
    />
  ) : (
    <AttendanceStartPage
      onBack={() => setView("history")}
      onSelectClass={(classId) => {
        setSelectedClassId(classId);
        setView("call");
      }}
    />
  );
}
