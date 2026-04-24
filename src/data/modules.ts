import type { LucideIcon } from "lucide-react";
import { Drum, Guitar, Mic2, Music2, Piano, Sparkles, WandSparkles } from "lucide-react";

import { attendanceClassOptions } from "./attendance";
import { classOptionsByModule } from "./filters";

export type ModuleLabel = "Módulo I" | "Módulo II" | "Módulo III";
export type ModuleSlug = "modulo-i" | "modulo-ii" | "modulo-iii";

export type ModuleConfig = {
  slug: ModuleSlug;
  label: ModuleLabel;
  subtitle: string;
};

export type ModuleClassCard = {
  classId: number;
  className: string;
  teacherName: string;
  studentCount: number;
  scheduleLabel: string;
  icon: LucideIcon;
};

const moduleConfigs: ModuleConfig[] = [
  { slug: "modulo-i", label: "Módulo I", subtitle: "Básico" },
  { slug: "modulo-ii", label: "Módulo II", subtitle: "Específico" },
  { slug: "modulo-iii", label: "Módulo III", subtitle: "Aperfeiçoamento" }
];

const schedules = ["Seg / Qua - 14:00", "Ter / Qui - 15:30", "Qua / Sex - 16:30", "Sab - 10:00"] as const;

function getClassIcon(className: string) {
  const normalized = className.toLowerCase();

  if (normalized.includes("canto")) {
    return Mic2;
  }

  if (normalized.includes("violino") || normalized.includes("violoncelo")) {
    return Sparkles;
  }

  if (normalized.includes("violao") || normalized.includes("violão") || normalized.includes("guitarra") || normalized.includes("contrabaixo")) {
    return Guitar;
  }

  if (normalized.includes("teclado")) {
    return Piano;
  }

  if (
    normalized.includes("flauta") ||
    normalized.includes("clarinete") ||
    normalized.includes("saxofone") ||
    normalized.includes("trompete") ||
    normalized.includes("trompa")
  ) {
    return Music2;
  }

  if (normalized.includes("percussao") || normalized.includes("percussão")) {
    return Drum;
  }

  return WandSparkles;
}

export function getModuleConfigBySlug(slug: string) {
  return moduleConfigs.find((moduleConfig) => moduleConfig.slug === slug);
}

export function getAllModuleConfigs() {
  return moduleConfigs;
}

export function getModuleCards(moduleSlug: ModuleSlug): ModuleClassCard[] {
  const moduleConfig = getModuleConfigBySlug(moduleSlug);

  if (!moduleConfig) {
    return [];
  }

  const classesInModule = classOptionsByModule[moduleConfig.label];
  const classOptions = attendanceClassOptions.filter((classOption) => classOption.module === moduleConfig.label);

  return classesInModule.map((className, index) => {
    const matchedClass = classOptions.find((classOption) => classOption.title.endsWith(className));

    return {
      classId: matchedClass?.id ?? Number(`${moduleSlug.replace("modulo-", "")}${index + 1}`),
      className,
      teacherName: matchedClass?.teacherName ?? "Prof. Maria Silva",
      studentCount: matchedClass?.studentCount ?? 0,
      scheduleLabel: schedules[index % schedules.length],
      icon: getClassIcon(className)
    };
  });
}



