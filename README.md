# BOOTCAMP AWS AI FDE FULLLSTACK DESAFIO 01

## Minha experiência com o projeto

Eu realizei esse desafio após finalizar o P1 da universidade, durante as férias antes do P2, então tudo ainda era bem novo para mim — foi meu primeiro contato com todas as tecnologias utilizadas no projeto.

A experiência foi bastante empolgante. Recebi orientações dos instrutores do estágio, Jailson e William, além da minha scrum master Ana Clara, que me ajudaram a melhorar tanto a minha arquitetura quanto a forma de organizar tarefas e planejamento de tempo. Um dos principais pontos foi concentrar todas as regras de negócio dentro dos services, o que facilitou bastante a escrita de testes unitários.

Também separei toda a validação de dados em middlewares, que interceptam a requisição antes de chegar ao controller (conselho do Jailson que ajudou demais na desaclopação do meu projeto 😄), garantindo que apenas dados consistentes cheguem à camada de serviço. Além disso, implementei um handler global para tratar os erros lançados no service.

A criação do ambiente com Docker Compose e a utilização de um Dev Container para desenvolvimento foi algo transformador (acabou aquele clássico “na minha máquina funciona” 😄). Sinceramente, não tenho adjetivos suficientes para descrever o quanto isso expandiu minha visão sobre ambientes de desenvolvimento. Foi tipo ganhar um brinquedo novo quando criança — só que eu não queria parar de brincar com ele. Usei dois Docker Compose nesse projeto, um para desenvolvimento e outro para produção, de tanto que gostei desse negócio 😄.

Sou muito entusiasmado em aprender, estudar e principalmente em lidar com coisas novas. Estou feliz por ter conseguido concluir tudo e satisfeito com o resultado final.

Por fim, gostaria de comentar sobre minha experiência com o Prisma e LLMs. Em alguns momentos, tentei usar LLMs para configurar o Prisma 7.7, o que acabou me fazendo perder um bom tempo. O modelo entrou em um loop de respostas erradas logo no início do projeto, o que gerou bastante frustração (isso inclusive aparece nos primeiros commits, pela quantidade de alterações na estrutura e nas dependências 🥲).

No final, desisti das “soluções mágicas” e fui direto na documentação oficial do Prisma (como um bom programador raiz 😄). Em menos de 20 minutos consegui configurar tudo corretamente. A partir daí, o resto do projeto fluiu muito bem — não tive dificuldade em nada, apenas me diverti codando ao som de Kiss - I Was Made For Lovin' You 😎.

PS: o restante da documentação está totalmente formalizado, sem mais brincadeirinhas.

## Descrição e go to

REST API para gerenciamento de filmes e diretores, desenvolvida com Node.js, TypeScript, Express e Prisma ORM com banco de dados PostgreSQL.

- [Tecnologias](#tecnologias)
- [Estrutura do projeto](#estrutura-do-projeto)
- [Modelos de dados](#modelos-de-dados)
- [Endpoints](#endpoints)
  - [Directors](#directors)
  - [Movies](#movies)
- [Executando o projeto](#executando-o-projeto)
  - [Variáveis de ambiente](#variáveis-de-ambiente)
  - [Rodando em produção](#rodando-em-produção)
  - [Rodando com DevContainer](#rodando-com-devcontainer-recomendado-para-desenvolvimento)
  - [Testes](#testes)

## Tecnologias

- **Node.js** com **TypeScript**
- **Express 5**
- **Prisma ORM** (client customizado gerado em `src/generated/prisma`)
- **PostgreSQL 16**
- **Vitest** para testes unitários
- **Docker** + **Docker Compose**
- **DevContainer** (VS Code)

## Estrutura do projeto

```
├── src/
│   ├── controller/          # Camada de controle HTTP
│   ├── service/             # Regras de negócio
│   ├── repository/          # Acesso ao banco de dados via Prisma
│   ├── model/               # Interfaces e DTOs
│   ├── middlewares/         # Validações e tratamento de erros
│   ├── routes/              # Definição das rotas
│   └── database/
│       ├── schema/          # Schema Prisma
│       └── migrations/      # Histórico de migrations
├── test/
│   └── unit/                # Testes unitários dos services
├── .devcontainer/           # Configuração do DevContainer
├── docker-compose.yml       # Ambiente de desenvolvimento
└── docker-compose.prod.yml  # Ambiente de produção
```

## Modelos de dados

> Todos os dados de entrada são validados por middlewares antes de chegarem ao service.

### Director
| Campo | Tipo   | Descrição              |
|-------|--------|------------------------|
| id    | String | UUID gerado automaticamente |
| name  | String | Nome único do diretor  |

**Validações — `name`:**
- Obrigatório
- Deve ser uma string
- Entre 3 e 50 caracteres
- Deve ser único

### Movie
| Campo       | Tipo   | Descrição                        |
|-------------|--------|----------------------------------|
| id          | String | UUID gerado automaticamente      |
| title       | String | Título do filme                  |
| description | String | Descrição (máx. 255 caracteres)  |
| releaseYear | Int    | Ano de lançamento                |
| genre       | String | Gênero do filme                  |
| directorId  | String | Referência ao diretor            |

**Validações:**
- `title`: obrigatório, deve ser uma string
- `releaseYear`: obrigatório, deve ser um número, não pode ser no futuro
- `description`: opcional, máximo de 255 caracteres
- `genre`: obrigatório, deve ser uma string
- `directorId`: obrigatório, deve ser uma string, o diretor informado deve existir
- Um filme com mesmo título, diretor e ano de lançamento não pode ser duplicado
- Não é possível atualizar um filme com todos os mesmos campos iguais

## Endpoints

### Directors

| Método | Rota                        | Descrição                          |
|--------|-----------------------------|------------------------------------|
| GET    | `/directors`                | Lista todos os diretores           |
| GET    | `/directors/:id`            | Busca diretor por ID               |
| GET    | `/directors/:id/movies`     | Lista filmes de um diretor         |
| POST   | `/directors`                | Cria um novo diretor               |
| PUT    | `/directors/:id`            | Atualiza um diretor                |
| DELETE | `/directors/:id`            | Remove um diretor                  |

---

GET /directors

**Resposta**
```json
[
  {
    "id": "uuid-do-diretor",
    "name": "João Victor"
  }
]
```
---

GET /directors/`uuid-do-diretor`

**Resposta**
```json
{
  "id": "uuid-do-diretor",
  "name": "João Victor"
}
```
---

GET /directors/`uuid-do-diretor`/movies

**Resposta**
```json
[
  {
    "id": "uuid-do-filme",
    "title": "Filme de João",
    "description": "",
    "releaseYear": 1999,
    "genre": "Programação",
    "directorId": "uuid-do-diretor"
  }
]
```
---
POST `/directors`

**Requisição**
```json
{
  "name": "João Victor"
}
```
**Resposta**
```json
{
  "id": "uuid-do-diretor",
  "name": "João Victor"
}
```
---

PUT /directors/`uuid-do-diretor`

**Requisição**
```json
{
  "name": "João Victor Atualizado"
}
```
**Resposta**
```json
{
  "id": "uuid-do-diretor",
  "name": "João Victor Atualizado"
}
```
---

### Movies

| Método | Rota          | Descrição                                      |
|--------|---------------|------------------------------------------------|
| GET    | `/movies`     | Lista todos os filmes (suporta filtros)        |
| GET    | `/movies/:id` | Busca filme por ID                             |
| POST   | `/movies`     | Cria um novo filme                             |
| PUT    | `/movies/:id` | Atualiza um filme                              |
| DELETE | `/movies/:id` | Remove um filme                                |

---

GET /movies

**Resposta**
```json
[
  {
    "id": "uuid-do-filme",
    "title": "Filme de João",
    "description": "",
    "releaseYear": 1999,
    "genre": "Programação",
    "directorId": "uuid-do-diretor"
  }
]
```
---

GET /movies/`uuid-do-filme`

**Resposta**
```json
{
  "id": "uuid-do-filme",
  "title": "Filme de João",
  "description": "",
  "releaseYear": 1999,
  "genre": "Programação",
  "directorId": "uuid-do-diretor"
}
```
**Query params**
| Param       | Tipo   | Descrição                  |
|-------------|--------|----------------------------|
| title       | string | Filtra por título          |
| genre       | string | Filtra por gênero          |
| releaseYear | number | Filtra por ano de lançamento |

Exemplo de rota: /movies/`uuid-do-filme`?title=Filme%20de%João

---
POST /movies

**Requisição**
```json
{
  "title": "Filme de João",
  "description": "",
  "releaseYear": 1999,
  "genre": "Programação",
  "directorId": "uuid-do-diretor"
}
```
**Resposta**
```json
{
  "id": "uuid-do-filme",
  "title": "Filme de João",
  "description": "",
  "releaseYear": 1999,
  "genre": "Programação",
  "directorId": "uuid-do-diretor"
}
```
---
PUT /movies/`uuid-do-filme`

**Requisição**
```json
{
  "title": "Filme de Victor",
  "description": "",
  "releaseYear": 1999,
  "genre": "Programação",
  "directorId": "uuid-do-diretor"
}
```
**Resposta**
```json
{
  "id": "uuid-do-filme",
  "title": "Filme de Victor",
  "description": "",
  "releaseYear": 1999,
  "genre": "Programação",
  "directorId": "uuid-do-diretor"
}
```
---

# Executando o projeto

## Variáveis de ambiente

Crie um arquivo `.env` na raiz baseado no `.env.exemple`:

```env
DATABASE_URL="postgresql://postgres:root@db:5432/api_db"
DATABASE_URL_PROD="postgresql://postgres:root@db_prod:5432/api_db"

DB_USER="postgres"
DB_PASSWORD="root"
DB_NAME="api_db"
```

## Rodando em produção

Pré-requisitos: **Docker** e **Git**.

1. Clone o repositório:
   ```bash
   git clone <url-do-repositorio> <nome_da_pasta>
   cd <nome_da_pasta>
   ```
2. Crie o arquivo `.env` na raiz baseado no `.env.exemple`.
3. Suba os containers:
   ```bash
   docker compose -f docker-compose.prod.yml up -d
   ```

A API estará disponível em `http://localhost:3000`.

## Rodando com DevContainer (recomendado para desenvolvimento)

Pré-requisitos: **Docker** e extensão **Dev Containers** no VS Code.

1. Abra o projeto no VS Code
2. Clique em **Reopen in Container** quando solicitado (ou `Ctrl+Shift+P` → `Dev Containers: Reopen in Container`)
3. No terminal dentro do container, instale as dependências:
   ```bash
   npm install
   ```
4. Execute as migrations:
   ```bash
   npx prisma migrate deploy --config prisma.config.ts
   npx prisma generate
   ```
5. Inicie o servidor:
   ```bash
   npm run dev
   ```

A API estará disponível em `http://localhost:3000`.  
O Adminer (gerenciador do banco) estará em `http://localhost:8080`.

## Testes

Os testes unitários cobrem as regras de negócio dos services com mocks dos repositórios.

```bash
# Testes de diretores
npm run directorTest

# Testes de filmes
npm run movieTest
```
**Note**: Testes não são copiados para produção!
