# pass.in

O pass.in é uma aplicação de **gestão de participantes em eventos presenciais**.

A ferramenta permite que o organizador cadastre um evento e abra uma página pública de inscrição.

Os participantes inscritos podem emitir uma credencial para check-in no dia do evento.

O sistema fará um scan da credencial do participante para permitir a entrada no evento.
 
## A milha extra

No sistema original, o app web foi desenvolvido somente para a página de pasticipantes. No projeto feito acrescentei a listagem dos eventos e o reoteamento entre as páginas.

- Para isto foi necessária a criação de uma rota adicional na api para a listagem dos eventos.

- No app web foi necessário usar um sistema de roteamento para direcionar da página de eventos para a página de participantes. Para isso foi utitlizado o Tanstack Router.

## Tecnologias utilizadas

## monorepo

O repositório é um monorepo feito com [turborepo](https://turbo.build/repo) e [npm workspaces](https://docs.npmjs.com/cli/v7/using-npm/workspaces). 

A api está em `apps/api` e a aplicação web em `apps/web`.

O pacote de configuração do typescript é compartilhado e fica em `packages/tsconfig`.

## apps/api

A api é feita em [Typescript](https://www.typescriptlang.org/) usando [Node.js](https://nodejs.org/en) com [fastify](https://fastify.dev/), ORM [Prisma](https://www.prisma.io/), validação com [Zod](https://zod.dev/) e um banco de dados [PostgreSQL](https://www.postgresql.org/) em um container [Docker](https://www.docker.com/). A documentação da api é feita com o [plugin do Swagger para o fastify](https://github.com/fastify/fastify-swagger).

### Requisitos funcionais

- [x] O organizador deve poder cadastrar um novo evento;
- [x] O organizador deve poder visualizar dados de um evento;
- [x] O organizador deve poser visualizar a lista de participantes;
- [x] O participante deve poder se inscrever em um evento;
- [x] O participante deve poder visualizar seu crachá de inscrição;
- [x] O participante deve poder realizar check-in no evento;

### Regras de negócio

- [x] O participante só pode se inscrever em um evento uma única vez;
- [x] O participante só pode se inscrever em eventos com vagas disponíveis;
- [x] O participante só pode realizar check-in em um evento uma única vez;

### Requisitos não-funcionais

- [x] O check-in no evento será realizado através de um QRCode;

## apps/web

O app web é feito em React.JS usando Vite como servidor de desenvolvimento e builder-bundler e Tanstack Router para roteamento no lado cliente.

### Requisitos funcionais

- [x] A página inicial deve listar os eventos;
- [x] Ao clicar em um evento o usuário é direcionados para a lista de participantes;
- [x] Tanto a página de eventos como participantes devem ter paginação. 
- [x] Deve ser possível realizar uma busca pelo nome do evento e participante em suas respectivas páginas.

## Como rodar o projeto

## A fazer

- [ ] Publicar o app mobile feito em react-native
