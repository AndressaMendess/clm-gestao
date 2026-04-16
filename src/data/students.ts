import { assetUrls } from "./assets";

export type StudentStatus = "Ativo" | "Inativo" | "Trancamento";

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
  {
    id: 1,
    name: "Ana Carolina Souza",
    phone: "(11) 98765-4321",
    email: "ana.souza@email.com",
    status: "Ativo",
    module: "Módulo I",
    moduleTone: "violet",
    className: "Classe 1",
    classTone: "blue",
    avatar: assetUrls.rowAvatars[0]
  },
  {
    id: 2,
    name: "Bruno Henrique Costa",
    phone: "(11) 97654-3210",
    email: "bruno.costa@email.com",
    status: "Inativo",
    module: "Módulo I",
    moduleTone: "violet",
    className: "Classe 1",
    classTone: "blue",
    avatar: assetUrls.rowAvatars[1]
  },
  {
    id: 3,
    name: "Carla Fernandes Lima",
    phone: "(11) 96543-2109",
    email: "carla.lima@email.com",
    status: "Ativo",
    module: "Módulo II",
    moduleTone: "orange",
    className: "Teoria Musical",
    classTone: "blue",
    avatar: assetUrls.rowAvatars[2]
  },
  {
    id: 4,
    name: "Daniel Ribeiro Alves",
    phone: "(11) 95432-1098",
    email: "daniel.alves@email.com",
    status: "Ativo",
    module: "Módulo I",
    moduleTone: "violet",
    className: "Classe 2",
    classTone: "pink",
    avatar: assetUrls.rowAvatars[3]
  },
  {
    id: 5,
    name: "Eduarda Martins Pereira",
    phone: "(11) 94321-0987",
    email: "eduarda.pereira@email.com",
    status: "Ativo",
    module: "Módulo III",
    moduleTone: "orange",
    className: "Solfejo",
    classTone: "blue",
    avatar: assetUrls.rowAvatars[4]
  }
];
