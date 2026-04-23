import { useEffect, useState } from "react";

import { attendanceHistory, type AttendanceHistoryEntry } from "../data/attendance";
import { AttendanceCallPage } from "./AttendanceCallPage";
import { AttendanceHistoryPage } from "./AttendanceHistoryPage";
import { AttendanceStartPage } from "./AttendanceStartPage";

type AttendanceView = "history" | "start" | "call";

type AttendancePageProps = {
  initialView?: AttendanceView;
  initialClassId?: number | null;
  onOpenHistory?: () => void;
  onOpenStart?: () => void;
  onOpenCall?: (classId: number) => void;
};

export function AttendancePage({
  initialView = "history",
  initialClassId = null,
  onOpenHistory,
  onOpenStart,
  onOpenCall
}: AttendancePageProps) {
  const [historyEntries, setHistoryEntries] = useState<AttendanceHistoryEntry[]>(attendanceHistory);
  const [view, setView] = useState<AttendanceView>(initialView);
  const [selectedClassId, setSelectedClassId] = useState<number | null>(initialClassId);

  useEffect(() => {
    setSelectedClassId(initialClassId ?? null);
    setView(initialView);
  }, [initialClassId, initialView]);

  if (view === "history") {
    return (
      <AttendanceHistoryPage
        entries={historyEntries}
        onStartAttendance={() => {
          if (onOpenStart) {
            onOpenStart();
            return;
          }

          setView("start");
        }}
      />
    );
  }

  if (view === "start") {
    return (
      <AttendanceStartPage
        onBack={() => {
          if (onOpenHistory) {
            onOpenHistory();
            return;
          }

          setView("history");
        }}
        onSelectClass={(classId) => {
          if (onOpenCall) {
            onOpenCall(classId);
            return;
          }

          setSelectedClassId(classId);
          setView("call");
        }}
      />
    );
  }

  return selectedClassId ? (
    <AttendanceCallPage
      classId={selectedClassId}
      onBack={() => {
        if (onOpenStart) {
          onOpenStart();
          return;
        }

        setView("start");
      }}
      onFinish={(entry) => {
        setHistoryEntries((current) => [entry, ...current]);

        if (onOpenHistory) {
          onOpenHistory();
          return;
        }

        setSelectedClassId(null);
        setView("history");
      }}
    />
  ) : (
    <AttendanceStartPage
      onBack={() => {
        if (onOpenHistory) {
          onOpenHistory();
          return;
        }

        setView("history");
      }}
      onSelectClass={(classId) => {
        if (onOpenCall) {
          onOpenCall(classId);
          return;
        }

        setSelectedClassId(classId);
        setView("call");
      }}
    />
  );
}
