export const moduleOptions = ["Todos", "Modulo I", "Modulo II", "Modulo III"] as const;

export const classOptionsByModule = {
  "Modulo I": ["Classe 1", "Classe 2"],
  "Modulo II": [
    "Canto coral",
    "Violoncelo",
    "Violino",
    "Trompete",
    "Trompa",
    "Saxofone",
    "Teclado",
    "Clarinete",
    "Violao",
    "Guitarra",
    "Contrabaixo",
    "Flauta"
  ],
  "Modulo III": [
    "Canto coral",
    "Violoncelo",
    "Violino",
    "Trompete",
    "Trompa",
    "Saxofone",
    "Teclado",
    "Clarinete",
    "Violao",
    "Guitarra",
    "Contrabaixo",
    "Flauta"
  ]
} as const;

export const statusOptions = ["Todos", "Ativo", "Inativo", "Trancamento"] as const;

export type ModuleFilter = (typeof moduleOptions)[number];
export type StatusFilter = (typeof statusOptions)[number];
export type ClassFilter = "Todas" | (typeof classOptionsByModule)["Modulo I"][number] | (typeof classOptionsByModule)["Modulo II"][number];

export function getClassOptions(moduleFilter: ModuleFilter) {
  if (moduleFilter === "Modulo I") {
    return ["Todas", ...classOptionsByModule["Modulo I"]];
  }

  if (moduleFilter === "Modulo II" || moduleFilter === "Modulo III") {
    return ["Todas", ...classOptionsByModule[moduleFilter]];
  }

  return [
    "Todas",
    ...classOptionsByModule["Modulo I"],
    ...classOptionsByModule["Modulo II"]
  ];
}
