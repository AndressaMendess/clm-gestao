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
  },
  {
    id: 6,
    name: "Felipe Andrade Rocha",
    phone: "(11) 93210-8876",
    email: "felipe.rocha@email.com",
    status: "Ativo",
    module: "Módulo I",
    moduleTone: "violet",
    className: "Classe 3",
    classTone: "pink",
    initials: "FR"
  },
  {
    id: 7,
    name: "Gabriela Nunes Martins",
    phone: "(11) 92134-7788",
    email: "gabriela.martins@email.com",
    status: "Ativo",
    module: "Módulo II",
    moduleTone: "orange",
    className: "Violino",
    classTone: "blue",
    initials: "GM"
  },
  {
    id: 8,
    name: "Henrique Silva Melo",
    phone: "(11) 91987-3344",
    email: "henrique.melo@email.com",
    status: "Inativo",
    module: "Módulo I",
    moduleTone: "violet",
    className: "Classe 2",
    classTone: "pink",
    initials: "HM"
  },
  {
    id: 9,
    name: "Isabela Costa Freitas",
    phone: "(11) 91800-1122",
    email: "isabela.freitas@email.com",
    status: "Ativo",
    module: "Módulo III",
    moduleTone: "orange",
    className: "Canto Coral",
    classTone: "blue",
    initials: "IF"
  },
  {
    id: 10,
    name: "João Pedro Almeida",
    phone: "(11) 91776-5544",
    email: "joao.almeida@email.com",
    status: "Trancamento",
    module: "Módulo II",
    moduleTone: "orange",
    className: "Teoria Musical",
    classTone: "blue",
    initials: "JA"
  },
  {
    id: 11,
    name: "Larissa Moreira Campos",
    phone: "(11) 91654-2233",
    email: "larissa.campos@email.com",
    status: "Ativo",
    module: "Módulo I",
    moduleTone: "violet",
    className: "Classe 1",
    classTone: "blue",
    initials: "LC"
  },
  {
    id: 12,
    name: "Marcos Vinicius Prado",
    phone: "(11) 91543-8899",
    email: "marcos.prado@email.com",
    status: "Ativo",
    module: "Módulo III",
    moduleTone: "orange",
    className: "Solfejo",
    classTone: "blue",
    initials: "MP"
  },
  {
    id: 13,
    name: "Natália Gomes Duarte",
    phone: "(11) 91432-4455",
    email: "natalia.duarte@email.com",
    status: "Inativo",
    module: "Módulo II",
    moduleTone: "orange",
    className: "Violão",
    classTone: "pink",
    initials: "ND"
  },
  {
    id: 14,
    name: "Otávio Ribeiro Santos",
    phone: "(11) 91321-5566",
    email: "otavio.santos@email.com",
    status: "Ativo",
    module: "Módulo I",
    moduleTone: "violet",
    className: "Classe 4",
    classTone: "pink",
    initials: "OS"
  },
  {
    id: 15,
    name: "Patrícia Lima Sousa",
    phone: "(11) 91210-6677",
    email: "patricia.sousa@email.com",
    status: "Ativo",
    module: "Módulo III",
    moduleTone: "orange",
    className: "Coral Avançado",
    classTone: "blue",
    initials: "PS"
  },
  {
    id: 16,
    name: "Rafael Teixeira Pinto",
    phone: "(11) 91109-7788",
    email: "rafael.pinto@email.com",
    status: "Trancamento",
    module: "Módulo II",
    moduleTone: "orange",
    className: "Teclado",
    classTone: "pink",
    initials: "RP"
  },
  {
    id: 17,
    name: "Sofia Barbosa Oliveira",
    phone: "(11) 91098-8890",
    email: "sofia.oliveira@email.com",
    status: "Ativo",
    module: "Módulo I",
    moduleTone: "violet",
    className: "Classe 2",
    classTone: "pink",
    initials: "SO"
  },
  {
    id: 18,
    name: "Thiago Fernandes Luz",
    phone: "(11) 90987-9900",
    email: "thiago.luz@email.com",
    status: "Ativo",
    module: "Módulo II",
    moduleTone: "orange",
    className: "Percussão",
    classTone: "blue",
    initials: "TL"
  }
];
