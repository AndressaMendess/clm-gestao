import { type Dispatch, type SetStateAction, useEffect, useState } from "react";

import { attendanceHistory, type AttendanceHistoryEntry } from "../data/attendance";
import { AttendanceCallPage } from "./AttendanceCallPage";
import { AttendanceHistoryPage } from "./AttendanceHistoryPage";
import { AttendanceStartPage } from "./AttendanceStartPage";

type AttendanceView = "history" | "start" | "call";

type AttendancePageProps = {
  initialView?: AttendanceView;
  initialClassId?: number | null;
  entries?: AttendanceHistoryEntry[];
  onEntriesChange?: Dispatch<SetStateAction<AttendanceHistoryEntry[]>>;
  onOpenHistory?: () => void;
  onOpenStart?: () => void;
  onOpenCall?: (classId: number) => void;
};

export function AttendancePage({
  initialView = "history",
  initialClassId = null,
  entries,
  onEntriesChange,
  onOpenHistory,
  onOpenStart,
  onOpenCall
}: AttendancePageProps) {
  const [internalHistoryEntries, setInternalHistoryEntries] = useState<AttendanceHistoryEntry[]>(attendanceHistory);
  const historyEntries = entries ?? internalHistoryEntries;
  const setHistoryEntries = onEntriesChange ?? setInternalHistoryEntries;
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
