export const moduleOptions = ["Todos", "Módulo I", "Módulo II", "Módulo III"] as const;

export const classOptionsByModule = {
  "Módulo I": ["Classe 1", "Classe 2"],
  "Módulo II": [
    "Canto coral",
    "Violoncelo",
    "Violino",
    "Trompete",
    "Trompa",
    "Saxofone",
    "Teclado",
    "Clarinete",
    "Violão",
    "Guitarra",
    "Contrabaixo",
    "Flauta"
  ],
  "Módulo III": [
    "Canto coral",
    "Violoncelo",
    "Violino",
    "Trompete",
    "Trompa",
    "Saxofone",
    "Teclado",
    "Clarinete",
    "Violão",
    "Guitarra",
    "Contrabaixo",
    "Flauta"
  ]
} as const;

export const statusOptions = ["Todos", "Ativo", "Inativo", "Trancamento"] as const;

export type ModuleFilter = (typeof moduleOptions)[number];
export type StatusFilter = (typeof statusOptions)[number];
export type ClassFilter =
  | "Todas"
  | (typeof classOptionsByModule)["Módulo I"][number]
  | (typeof classOptionsByModule)["Módulo II"][number];

export function getClassOptions(moduleFilter: ModuleFilter) {
  if (moduleFilter === "Módulo I") {
    return ["Todas", ...classOptionsByModule["Módulo I"]];
  }

  if (moduleFilter === "Módulo II" || moduleFilter === "Módulo III") {
    return ["Todas", ...classOptionsByModule[moduleFilter]];
  }

  return ["Todas", ...classOptionsByModule["Módulo I"], ...classOptionsByModule["Módulo II"]];
}
