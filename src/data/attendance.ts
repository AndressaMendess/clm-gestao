export type AttendanceStatus = "Presente" | "Ausente";
export type AttendanceSessionStatus = "presente" | "nao_registrado";

export type AttendanceStudentRecord = {
  id: number;
  name: string;
  status: AttendanceStatus;
  note?: string;
};

export type AttendanceSessionStudent = {
  id: number;
  name: string;
  moduleLabel: string;
  status: AttendanceSessionStatus;
  recordedAt: string | null;
  note?: string;
  avatarImage?: string;
  avatarColor?: string;
  avatarInitials?: string;
};

export type AttendanceHistoryEntry = {
  id: number;
  title: string;
  module: "Módulo I" | "Módulo II" | "Módulo III";
  className: string;
  date: string;
  time: string;
  createdBy: string;
  students: AttendanceStudentRecord[];
};

export type AttendanceClassOption = {
  id: number;
  module: "Módulo I" | "Módulo II" | "Módulo III";
  moduleLabel: string;
  title: string;
  teacherName: string;
  studentCount: number;
};

export type AttendanceSession = {
  classId: number;
  title: string;
  module: "Módulo I" | "Módulo II" | "Módulo III";
  moduleLabel: string;
  className: string;
  teacherName: string;
  dateLabel: string;
  students: AttendanceSessionStudent[];
};

export const attendanceHistory: AttendanceHistoryEntry[] = [
  {
    id: 1,
    title: "Módulo I - Classe 1",
    module: "Módulo I",
    className: "Classe 1",
    date: "14/04/2026",
    time: "19:40",
    createdBy: "Admin",
    students: [
      { id: 1, name: "Ana Carolina Souza", status: "Ausente" },
      { id: 2, name: "Bruno Henrique Costa", status: "Presente" }
    ]
  },
  {
    id: 2,
    title: "Módulo II - Canto coral",
    module: "Módulo II",
    className: "Canto coral",
    date: "24/01/2024",
    time: "19:30",
    createdBy: "Admin",
    students: [{ id: 3, name: "Carla Fernandes Lima", status: "Presente" }]
  },
  {
    id: 3,
    title: "Módulo I - Classe 2",
    module: "Módulo I",
    className: "Classe 2",
    date: "25/01/2024",
    time: "14:10",
    createdBy: "Admin",
    students: [{ id: 4, name: "Daniel Ribeiro Alves", status: "Presente" }]
  }
];

export const attendanceClassOptions: AttendanceClassOption[] = [
  {
    id: 101,
    module: "Módulo I",
    moduleLabel: "Módulo I",
    title: "Módulo I - Classe 1",
    teacherName: "Prof. Maria Silva",
    studentCount: 40
  },
  {
    id: 102,
    module: "Módulo I",
    moduleLabel: "Módulo I",
    title: "Módulo I - Classe 2",
    teacherName: "Prof. Maria Silva",
    studentCount: 40
  },
  {
    id: 201,
    module: "Módulo II",
    moduleLabel: "Módulo II",
    title: "Módulo II - Teoria",
    teacherName: "Prof. Maria Silva",
    studentCount: 40
  },
  {
    id: 202,
    module: "Módulo II",
    moduleLabel: "Módulo II",
    title: "Módulo II - Violino",
    teacherName: "Prof. Maria Silva",
    studentCount: 40
  },
  {
    id: 301,
    module: "Módulo III",
    moduleLabel: "Módulo III",
    title: "Módulo III - Teoria",
    teacherName: "Prof. Maria Silva",
    studentCount: 40
  },
  {
    id: 302,
    module: "Módulo III",
    moduleLabel: "Módulo III",
    title: "Módulo III - Violino",
    teacherName: "Prof. Maria Silva",
    studentCount: 40
  }
];

const attendanceSessionTemplates: Record<number, AttendanceSession> = {
  101: {
    classId: 101,
    title: "Módulo I - Classe 1",
    module: "Módulo I",
    moduleLabel: "Módulo I",
    className: "Classe 1",
    teacherName: "Prof. Maria Silva",
    dateLabel: "12/01/2025, quarta-feira.",
    students: [
      {
        id: 1001,
        name: "Olivia Rhye",
        moduleLabel: "Módulo I",
        status: "nao_registrado",
        recordedAt: null,
        avatarImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80"
      },
      {
        id: 1002,
        name: "Phoenix Baker",
        moduleLabel: "Módulo I",
        status: "nao_registrado",
        recordedAt: null,
        avatarImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&q=80"
      },
      {
        id: 1003,
        name: "Lana Steiner",
        moduleLabel: "Módulo I",
        status: "nao_registrado",
        recordedAt: null,
        avatarImage: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=80&q=80"
      },
      {
        id: 1004,
        name: "Demi Wilkinson",
        moduleLabel: "Módulo I",
        status: "nao_registrado",
        recordedAt: null,
        avatarImage: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=80&q=80"
      },
      {
        id: 1005,
        name: "Candice Wu",
        moduleLabel: "Módulo I",
        status: "nao_registrado",
        recordedAt: null,
        avatarInitials: "CW",
        avatarColor: "#F4EBFF"
      }
    ]
  }
};

function formatCurrentDateLabel(date = new Date()) {
  const datePart = new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  }).format(date);
  const weekday = new Intl.DateTimeFormat("pt-BR", { weekday: "long" }).format(date);

  return `${datePart}, ${weekday}.`;
}

export function getCurrentTimeLabel(date = new Date()) {
  return new Intl.DateTimeFormat("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  }).format(date);
}

export function getAttendanceSessionByClassId(classId: number): AttendanceSession | null {
  const template = attendanceSessionTemplates[classId];

  if (template) {
    return {
      ...template,
      students: template.students.map((student) => ({ ...student }))
    };
  }

  const classOption = attendanceClassOptions.find((item) => item.id === classId);

  if (!classOption) {
    return null;
  }

  return {
    classId: classOption.id,
    title: classOption.title,
    module: classOption.module,
    moduleLabel: classOption.moduleLabel,
    className: classOption.title.replace(`${classOption.moduleLabel} - `, ""),
    teacherName: classOption.teacherName,
    dateLabel: formatCurrentDateLabel(),
    students: Array.from({ length: 5 }, (_, index) => ({
      id: classOption.id * 10 + index + 1,
      name: `Aluno ${index + 1}`,
      moduleLabel: classOption.moduleLabel,
      status: "nao_registrado",
      recordedAt: null,
      avatarInitials: `A${index + 1}`
    }))
  };
}

export function createAttendanceHistoryEntry(session: AttendanceSession): AttendanceHistoryEntry {
  const now = new Date();

  return {
    id: now.getTime(),
    title: session.title,
    module: session.module,
    className: session.className,
    date: new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    }).format(now),
    time: getCurrentTimeLabel(now),
    createdBy: "Andressa",
    students: session.students.map((student) => ({
      id: student.id,
      name: student.name,
      status: student.status === "presente" ? "Presente" : "Ausente",
      note: student.note
    }))
  };
}
