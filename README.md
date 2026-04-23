# BOOTCAMP AWS AI FDE FULLLSTACK DESAFIO 01

REST API para gerenciamento de filmes e diretores, desenvolvida com Node.js, TypeScript, Express e Prisma ORM com banco de dados PostgreSQL.

- [Tecnologias](#tecnologias)
- [Estrutura do projeto](#estrutura-do-projeto)
- [Modelos de dados](#modelos-de-dados)
- [Endpoints](#endpoints)
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

**Body — POST `/directors`**
```json
{
  "name": "João Victor"
}
```

**Body — PUT `/directors`**
```json
{
  "Id": "1234" //Formato UUID passado como string
  "name": "João Victor"
}
```

### Movies

| Método | Rota          | Descrição                                      |
|--------|---------------|------------------------------------------------|
| GET    | `/movies`     | Lista todos os filmes (suporta filtros)        |
| GET    | `/movies/:id` | Busca filme por ID                             |
| POST   | `/movies`     | Cria um novo filme                             |
| PUT    | `/movies/:id` | Atualiza um filme                              |
| DELETE | `/movies/:id` | Remove um filme                                |

**Query params — GET `/movies`**
| Param       | Tipo   | Descrição                  |
|-------------|--------|----------------------------|
| title       | string | Filtra por título          |
| genre       | string | Filtra por gênero          |
| releaseYear | number | Filtra por ano de lançamento |

**Body — POST `/movies`**
```json
{
  "title": "Filme de João",
  "description": "",
  "releaseYear": 1999,
  "genre": "Programação",
  "directorId": "uuid-do-diretor"
}
```

**Body — PUT `/movies/:id`**
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
   git clone <url-do-repositorio>
   cd Desafio
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
