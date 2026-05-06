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
    name: "Wendel Freitas",
    phone: "(11) 98877-6601",
    email: "wendel.freitas@escolaclm.com",
    status: "Ativo",
    specialty: "Classe 1",
    specialtyTone: "violet",
    avatar: assetUrls.rowAvatars[0]
  },
  {
    id: 2,
    name: "Guilherme Costa",
    phone: "(11) 97766-5502",
    email: "guilherme.costa@escolaclm.com",
    status: "Ativo",
    specialty: "Classe 2",
    specialtyTone: "blue",
    avatar: assetUrls.rowAvatars[1]
  },
  {
    id: 3,
    name: "Henrique Sidério",
    phone: "(11) 96655-4403",
    email: "henrique.siderio@escolaclm.com",
    status: "Ativo",
    specialty: "Teorial",
    specialtyTone: "pink",
    avatar: assetUrls.rowAvatars[2]
  },
  {
    id: 4,
    name: "Jean",
    phone: "(11) 95544-3304",
    email: "jean@escolaclm.com",
    status: "Ativo",
    specialty: "Solfejo",
    specialtyTone: "orange",
    avatar: assetUrls.rowAvatars[3]
  },
  {
    id: 5,
    name: "Erick Henrique",
    phone: "(11) 94433-2205",
    email: "erick.henrique@escolaclm.com",
    status: "Ativo",
    specialty: "Violino",
    specialtyTone: "violet",
    avatar: assetUrls.rowAvatars[4]
  },
  {
    id: 6,
    name: "Luciane Paiva",
    phone: "(11) 93322-1106",
    email: "luciane.paiva@escolaclm.com",
    status: "Ativo",
    specialty: "Flauta",
    specialtyTone: "orange",
    initials: "LP"
  },
  {
    id: 7,
    name: "Rogério Oliveira",
    phone: "(11) 92211-0007",
    email: "rogerio.oliveira@escolaclm.com",
    status: "Ativo",
    specialty: "Clarinete",
    specialtyTone: "blue",
    initials: "RO"
  },
  {
    id: 8,
    name: "Edilson Santos",
    phone: "(11) 91100-9908",
    email: "edilson.santos@escolaclm.com",
    status: "Ativo",
    specialty: "Saxofone",
    specialtyTone: "pink",
    initials: "ES"
  },
  {
    id: 9,
    name: "Daniel Gomes",
    phone: "(11) 90099-9909",
    email: "daniel.gomes@escolaclm.com",
    status: "Ativo",
    specialty: "Trompa",
    specialtyTone: "blue",
    initials: "DG"
  },
  {
    id: 10,
    name: "Davi Pereira",
    phone: "(11) 90088-9910",
    email: "davi.pereira@escolaclm.com",
    status: "Ativo",
    specialty: "Trompete",
    specialtyTone: "orange",
    initials: "DP"
  },
  {
    id: 11,
    name: "Henrique Siderio",
    phone: "(11) 90077-9911",
    email: "henrique.siderio.tuba@escolaclm.com",
    status: "Ativo",
    specialty: "Eufônio e Tuba",
    specialtyTone: "violet",
    initials: "HS"
  },
  {
    id: 12,
    name: "Olívia Gama",
    phone: "(11) 90066-9912",
    email: "olivia.gama@escolaclm.com",
    status: "Ativo",
    specialty: "Canto / Coral",
    specialtyTone: "pink",
    initials: "OG"
  },
  {
    id: 13,
    name: "Wellington Pericinotto",
    phone: "(11) 90055-9913",
    email: "wellington.pericinotto@escolaclm.com",
    status: "Ativo",
    specialty: "Bateria",
    specialtyTone: "orange",
    initials: "WP"
  },
  {
    id: 14,
    name: "Emerson de Souza",
    phone: "(11) 90044-9914",
    email: "emerson.souza@escolaclm.com",
    status: "Ativo",
    specialty: "Percussão",
    specialtyTone: "blue",
    initials: "ES"
  },
  {
    id: 15,
    name: "Robson Farage",
    phone: "(11) 90033-9915",
    email: "robson.farage@escolaclm.com",
    status: "Ativo",
    specialty: "Violão, Guitarra e Contrabaixo",
    specialtyTone: "violet",
    initials: "RF"
  },
  {
    id: 16,
    name: "Josué Carlos",
    phone: "(11) 90022-9916",
    email: "josue.carlos@escolaclm.com",
    status: "Ativo",
    specialty: "Violoncelo",
    specialtyTone: "blue",
    initials: "JC"
  }
];



