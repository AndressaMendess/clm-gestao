import { assetUrls } from "./assets";
import type { StudentStatus } from "./students";
import type { PillTone } from "@/src/components/ui/pill";

export type Teacher = {
  id: number;
  name: string;
  phone: string;
  email: string;
  status: StudentStatus;
  specialty: string;
  specialtyTone: PillTone;
  avatar?: string;
  initials?: string;
};

export const teachers: Teacher[] = [
  {
    id: 1,
    name: "Mariana Almeida",
    phone: "(11) 98877-6655",
    email: "mariana.almeida@escolaclm.com",
    status: "Ativo",
    specialty: "Violino",
    specialtyTone: "violet",
    avatar: assetUrls.rowAvatars[0]
  },
  {
    id: 2,
    name: "Ricardo Nunes",
    phone: "(11) 97766-5544",
    email: "ricardo.nunes@escolaclm.com",
    status: "Ativo",
    specialty: "Teoria Musical",
    specialtyTone: "blue",
    avatar: assetUrls.rowAvatars[1]
  },
  {
    id: 3,
    name: "Fernanda Costa",
    phone: "(11) 96655-4433",
    email: "fernanda.costa@escolaclm.com",
    status: "Inativo",
    specialty: "Canto Coral",
    specialtyTone: "pink",
    avatar: assetUrls.rowAvatars[2]
  },
  {
    id: 4,
    name: "Eduardo Martins",
    phone: "(11) 95544-3322",
    email: "eduardo.martins@escolaclm.com",
    status: "Ativo",
    specialty: "Percussão",
    specialtyTone: "orange",
    avatar: assetUrls.rowAvatars[3]
  },
  {
    id: 5,
    name: "Juliana Farias",
    phone: "(11) 94433-2211",
    email: "juliana.farias@escolaclm.com",
    status: "Ativo",
    specialty: "Piano",
    specialtyTone: "violet",
    avatar: assetUrls.rowAvatars[4]
  },
  {
    id: 6,
    name: "Gustavo Ribeiro",
    phone: "(11) 93322-1100",
    email: "gustavo.ribeiro@escolaclm.com",
    status: "Trancamento",
    specialty: "Violão",
    specialtyTone: "orange",
    initials: "GR"
  },
  {
    id: 7,
    name: "Tatiane Moura",
    phone: "(11) 92211-0099",
    email: "tatiane.moura@escolaclm.com",
    status: "Ativo",
    specialty: "Flauta",
    specialtyTone: "blue",
    initials: "TM"
  },
  {
    id: 8,
    name: "Paulo Henrique",
    phone: "(11) 91100-9988",
    email: "paulo.henrique@escolaclm.com",
    status: "Inativo",
    specialty: "Saxofone",
    specialtyTone: "pink",
    initials: "PH"
  }
];



