export type SettingsUserStatus = "Ativo" | "Inativo";
export type SettingsUserRole = "Administrador" | "Professor";

export type SettingsUser = {
  id: number;
  name: string;
  role: SettingsUserRole;
  status: SettingsUserStatus;
};

export const settingsUsers: SettingsUser[] = [
  { id: 1, name: "Ana Silva", role: "Administrador", status: "Ativo" },
  { id: 2, name: "Carlos Santos", role: "Professor", status: "Ativo" },
  { id: 3, name: "Marina Costa", role: "Professor", status: "Inativo" }
];
