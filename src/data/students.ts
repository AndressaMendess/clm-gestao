import { assetUrls } from "./assets";

export type StudentStatus = "Ativo" | "Inativo";

export type Student = {
  id: number;
  name: string;
  phone: string;
  email: string;
  status: StudentStatus;
  module: string;
  moduleTone: "violet" | "orange" | "blue";
  className: string;
  classTone: "blue" | "pink";
  avatar?: string;
  initials?: string;
};

export const students: Student[] = [
  { id: 1, name: "Olivia Rhye", phone: "(11) 91234-5678", email: "olivia@untitledui.com", status: "Ativo", module: "Módulo I", moduleTone: "violet", className: "Classe 1", classTone: "blue", avatar: assetUrls.rowAvatars[0] },
  { id: 2, name: "Phoenix Baker", phone: "(11) 91234-5678", email: "olivia@untitledui.com", status: "Ativo", module: "Módulo II", moduleTone: "orange", className: "Clarinete", classTone: "blue", avatar: assetUrls.rowAvatars[1] },
  { id: 3, name: "Lana Steiner", phone: "(11) 91234-5678", email: "olivia@untitledui.com", status: "Ativo", module: "Módulo II", moduleTone: "orange", className: "Violoncelo", classTone: "blue", avatar: assetUrls.rowAvatars[2] },
  { id: 4, name: "Demi Wilkinson", phone: "(11) 91234-5678", email: "olivia@untitledui.com", status: "Ativo", module: "Módulo I", moduleTone: "violet", className: "Classe 2", classTone: "pink", avatar: assetUrls.rowAvatars[3] },
  { id: 5, name: "Candice Wu", phone: "(11) 91234-5678", email: "olivia@untitledui.com", status: "Ativo", module: "Módulo III", moduleTone: "blue", className: "Classe 2", classTone: "pink", initials: "CW" },
  { id: 6, name: "Natali Craig", phone: "(11) 91234-5678", email: "olivia@untitledui.com", status: "Ativo", module: "Módulo II", moduleTone: "orange", className: "Violoncelo", classTone: "blue", avatar: assetUrls.rowAvatars[4] },
  { id: 7, name: "Drew Cano", phone: "(11) 91234-5678", email: "olivia@untitledui.com", status: "Ativo", module: "Módulo I", moduleTone: "violet", className: "Saxofone alto", classTone: "blue", avatar: assetUrls.rowAvatars[5] },
  { id: 8, name: "Orlando Diggs", phone: "(11) 91234-5678", email: "olivia@untitledui.com", status: "Ativo", module: "Módulo III", moduleTone: "blue", className: "Classe 1", classTone: "blue", avatar: assetUrls.rowAvatars[6] },
  { id: 9, name: "Andi Lane", phone: "(11) 91234-5678", email: "olivia@untitledui.com", status: "Ativo", module: "Módulo II", moduleTone: "orange", className: "Violão", classTone: "blue", initials: "AL" },
  { id: 10, name: "Kate Morrison", phone: "(11) 91234-5678", email: "olivia@untitledui.com", status: "Inativo", module: "Módulo I", moduleTone: "violet", className: "Piano", classTone: "pink", avatar: assetUrls.rowAvatars[7] }
];
