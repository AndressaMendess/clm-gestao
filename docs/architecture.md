# Arquitetura do Projeto

## Visão Geral

Este projeto é uma plataforma de gestão escolar com características de CRM, focada em cadastro de alunos, turmas, módulos, presença, anexos e rotinas administrativas.

## Stack Definido

| Camada | Tecnologia |
|---|---|
| Front-end | React + Vite |
| Linguagem front-end | TypeScript |
| Estilo | Tailwind CSS + shadcn/ui |
| Back-end | Supabase |
| Banco de dados | PostgreSQL |
| Autenticação | Supabase Auth |
| Armazenamento de arquivos | Supabase Storage |
| Permissões | PostgreSQL + Row Level Security |
| Validação | Zod |
| Design | Figma |
| Gerenciador de pacotes | npm |

## Direção de Arquitetura

- O front-end será construído em `React` com `Vite`, priorizando velocidade de desenvolvimento e organização por componentes.
- O código será escrito em `TypeScript` para melhorar segurança, manutenção e escalabilidade.
- A interface utilizará `Tailwind CSS` com `shadcn/ui`, mantendo liberdade para personalização visual com base no Figma.
- O back-end será centralizado no `Supabase`, reduzindo a necessidade de uma API customizada no início do projeto.
- O banco principal será `PostgreSQL`, por ser mais adequado para dados relacionais como alunos, responsáveis, turmas, módulos e matrículas.
- A autenticação será feita com `Supabase Auth`.
- Documentos e anexos serão armazenados no `Supabase Storage`.
- As regras de acesso serão controladas com `Row Level Security`.

## Estrutura Funcional Esperada

- Gestão de alunos
- Gestão de turmas
- Gestão de módulos
- Controle de presença
- Upload de documentos
- Justificativas de falta
- Perfis administrativos
- Controle de permissões por tipo de usuário

## Observações

- O projeto atualmente já usa `React + TypeScript + Vite`.
- A adoção de `shadcn/ui` e `Tailwind CSS` é uma decisão de arquitetura definida para a evolução da interface.
- O Figma será a referência principal para implementação visual das telas.
