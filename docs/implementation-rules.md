# Regras de Implementacao

Este documento define as regras operacionais para implementacao de telas e funcionalidades no projeto.

Ele complementa [guidelines.md](/C:/Users/andre/OneDrive/Documentos/clm-gestao/docs/guidelines.md), que continua sendo a referencia principal para cores, tipografia e tokens.

## Objetivo

Garantir que toda nova implementacao:

- siga o design enviado via Figma
- mantenha consistencia com Tailwind CSS e shadcn/ui
- reutilize os tokens e estilos definidos no projeto
- venha preparada para futura integracao com banco de dados
- funcione bem em mobile, tablet e desktop

## Regras Fixas

### 1. Figma sempre vira codigo

Sempre que um link de frame do Figma for enviado para implementacao:

- o design deve ser implementado no codigo
- a estrutura visual deve seguir o frame solicitado
- a traducao para codigo deve respeitar o estilo tecnico do projeto, e nao copiar assets ou markup de forma literal quando houver solucao melhor com componentes

### 2. Seguir o estilo do projeto

Toda implementacao nova deve seguir:

- Tailwind CSS para composicao visual e responsividade
- shadcn/ui como base para componentes de interface quando fizer sentido
- personalizacao usando os tokens, variaveis e convencoes do projeto

Nao devemos:

- introduzir uma biblioteca visual paralela sem necessidade real
- usar estilos inline como padrao
- criar uma linguagem visual desconectada do restante da plataforma

### 3. Tokens e guidelines sao obrigatorios

Toda tela deve usar as variaveis de cor, espacamento e tipografia ja definidas.

Fonte oficial de referencia:

- [guidelines.md](/C:/Users/andre/OneDrive/Documentos/clm-gestao/docs/guidelines.md)
- `src/styles/tokens.css`
- estilos globais e componentes ja consolidados no projeto

Boas praticas:

- priorizar classes e variaveis semanticas em vez de valores hardcoded
- reaproveitar padroes visuais ja existentes antes de criar novos
- manter consistencia de tipografia, estados, bordas, sombras e espacamentos

### 4. Funcionalidade deve funcionar por padrao

Toda tela implementada deve ser funcional por padrao, mesmo antes da integracao com backend.

Isso significa:

- interacoes principais funcionando no front-end
- estados de loading, empty, error e disabled previstos quando fizer sentido
- filtros, busca, tabs, drawers, accordions e formularios com comportamento real
- estrutura pronta para substituir mocks por dados reais no futuro

### 5. Preparar para futura integracao com banco

Mesmo quando os dados ainda forem mockados, o codigo deve ser organizado para futura conexao com base real.

Padrao esperado:

- separar dados de interface de dados mockados sempre que possivel
- preferir arquivos de dados, tipos e mapeadores em vez de arrays inline grandes dentro do componente
- modelar types e interfaces pensando em entidades reais da plataforma
- evitar acoplamento entre renderizacao e mock
- deixar componentes prontos para receber props, hooks de fetch ou dados vindos de servicos

Sempre que possivel, pensar nas entidades reais:

- aluno
- turma
- modulo
- presenca
- anexo
- justificativa
- usuario

### 6. Mobile-first e responsividade obrigatoria

Toda implementacao deve nascer mobile-first.

Isso inclui:

- layout pensado primeiro para telas pequenas
- adaptacao progressiva para tablet e desktop
- controles faceis de tocar
- hierarquia visual clara em telas menores
- sem dependencia de hover para a acao principal
- textos e espacamentos legiveis em diferentes breakpoints

Antes de considerar uma tela pronta, verificar:

- mobile
- tablet
- desktop

### 7. Acessibilidade e clareza

Como a plataforma pode ser usada por usuarios com baixa familiaridade tecnologica:

- priorizar interfaces simples e diretas
- evitar excesso de passos
- deixar a acao principal evidente
- usar labels claros
- manter contraste e tamanho de toque adequados
- usar feedback visual para sucesso, erro e estado atual

### 8. Animacao com moderacao

Animacoes podem ser usadas, mas devem ser leves e funcionais.

Padrao:

- transicoes curtas
- feedback de abertura e fechamento
- nada que atrapalhe velocidade de uso

Evitar:

- efeitos pesados
- animacoes longas
- movimento decorativo sem funcao

### 9. Componentes interativos devem ter estados completos

Todo componente interativo deve ser implementado com seus estados visuais e comportamentais necessarios.

Exemplos comuns:

- button
- input
- select
- tabs
- checkbox
- textarea
- radio
- switch
- accordion
- card clicavel

Sempre que aplicavel, considerar:

- default
- hover
- focus
- focus-visible
- pressed ou active
- selected
- checked
- open
- disabled
- error

Regra de implementacao:

- os estados devem seguir as variaveis semanticas do projeto
- evitar cores e sombras hardcoded quando houver token equivalente
- o comportamento deve ser consistente entre mobile, tablet e desktop
- o estado principal nao pode depender apenas de hover
- componentes de formulario devem comunicar claramente foco, erro e indisponibilidade

Para componentes baseados em shadcn/ui:

- manter a estrutura do componente reutilizavel
- customizar os estados via tokens, classes e variaveis do projeto
- evitar sobrescrever o componente de forma que perca consistencia com a base reutilizavel

## Fluxo Padrao de Implementacao

Ao receber um frame do Figma:

1. identificar a estrutura da tela e os componentes principais
2. mapear os tokens e estilos necessarios com base no `guidelines.md`
3. implementar seguindo Tailwind e shadcn/ui
4. fazer a funcionalidade principal funcionar no front-end
5. estruturar os dados para futura integracao com backend
6. ajustar responsividade mobile, tablet e desktop
7. validar estados e interacoes

## Checklist Antes de Finalizar

- o layout segue o frame do Figma solicitado
- o estilo esta consistente com Tailwind e shadcn/ui
- as cores e tipografias seguem os guidelines
- a funcionalidade principal funciona de verdade
- a estrutura facilita integracao futura com banco
- a tela esta responsiva em mobile, tablet e desktop
- os componentes interativos possuem estados visuais completos
- os estados de interface relevantes foram considerados
- os componentes estao consistentes com o restante da app

## Decisao Padrao Para Proximas Tarefas

Salvo instrucao contraria do usuario, a partir de agora vamos considerar estas regras como padrao para toda implementacao nova no projeto.
