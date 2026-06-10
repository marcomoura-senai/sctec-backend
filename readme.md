# SCTEC Backend

Repositório compartilhado da turma de desenvolvimento backend do SENAI SCTEC.

Aqui ficam os [**materiais de apoio**](./materiais-didaticos/), os **exercícios práticos** e o **código produzido em aula**.

---

## Estrutura do Repositório

```
sctec-backend/
├── aula29-05/              ← código produzido em aula (TypeScript)
├── materiais-didaticos/
│   ├── Conteúdo de apoio/  ← PDFs de referência (algoritmos, fundamentos)
│   ├── Exercícios/         ← trilhas de exercícios práticos
│   └── Tutoriais para configuração de ambiente/
│       ├── tutorial-typescript6-nodejs.md
│       ├── configuracao-postgres.md
│       └── ...
└── postgres/
    └── docker-compose.yml  ← banco de dados da turma
```

---

## Configuração do Ambiente

### Pré-requisitos

- [Node.js](https://nodejs.org/) 20.x ou 22.x
- [Git](https://git-scm.com/)
- [Docker](https://www.docker.com/products/docker-desktop/) (recomendado para o PostgreSQL)
- [VS Code](https://code.visualstudio.com/)

### 1. Clonar o repositório

```bash
git clone <url-do-repositorio>
cd sctec-backend
```

### 2. Banco de dados (PostgreSQL via Docker)

```bash
cd postgres
docker compose up -d
```

Credenciais do banco:

| Campo    | Valor        |
|----------|--------------|
| Host     | `localhost`  |
| Porta    | `5432`       |
| Banco    | `sctec`      |
| Usuário  | `admin`      |
| Senha    | `password123`|

> Para detalhes sobre instalação local ou resolução de conflitos de porta, consulte `materiais-didaticos/Tutoriais para configuração de ambiente/configuracao-postgres.md`.

### 3. Projetos TypeScript

Cada pasta de aula é um projeto independente. Para instalar as dependências:

```bash
cd aula29-05
npm install
```

> Para criar um projeto TypeScript 6 do zero, siga o tutorial em `materiais-didaticos/Tutoriais para configuração de ambiente/tutorial-typescript6-nodejs.md`.

---

## Exercícios Práticos

Os exercícios ficam em `materiais-didaticos/Exercícios/`.

| Arquivo          | Tema                                                                   |
|------------------|------------------------------------------------------------------------|
| `trilha-base.js` | Carteira Bitcoin — precisão com inteiros (Satoshis)                    |
| `trilha-base2.js`| Carteira multi-moedas (BRL, BTC, ETH) — `BigInt` e fracionamento      |

**Como entregar:** copie o arquivo para a sua pasta pessoal dentro do repositório, implemente as funções e abra um Pull Request.

---

## Materiais de Apoio

| Material | Localização |
|---|---|
| Fundamentos de programação | [fundamentos-programacao.pdf](materiais-didaticos/Conteúdo%20de%20apoio/fundamentos-programacao.pdf) |
| Resumo de algoritmos | [resumo_algoritmos.pdf](materiais-didaticos/Conteúdo%20de%20apoio/resumo_algoritmos.pdf) |
| Álgebra booleana | [resumo_algebra_booleana.pdf](materiais-didaticos/Conteúdo%20de%20apoio/resumo_algebra_booleana.pdf) |
| Exercícios de algoritmos | [exercicios_algoritmos.pdf](materiais-didaticos/Exercícios/exercicios_algoritmos.pdf) |
| Gabarito dos exercícios | [exercicios_algoritmos_gabarito.pdf](materiais-didaticos/Exercícios/exercicios_algoritmos_gabarito.pdf) |
| Configuração do ambiente TypeScript | [tutorial-typescript6-nodejs.md](materiais-didaticos/Tutoriais%20para%20configuração%20de%20ambiente/tutorial-typescript6-nodejs.md) |
| Configuração do PostgreSQL | [configuracao-postgres.md](materiais-didaticos/Tutoriais%20para%20configuração%20de%20ambiente/configuracao-postgres.md) |
| Configuração da bancada de trabalho | [bancada-de-trabalho.pdf](materiais-didaticos/Tutoriais%20para%20configuração%20de%20ambiente/bancada-de-trabalho.pdf) |
| Primeiro commit no Git | [primeiro-commit.pdf](materiais-didaticos/Tutoriais%20para%20configuração%20de%20ambiente/primeiro-commit.pdf) |
| Chave SSH no Windows | [criar-chave-ssh-windows.pdf](materiais-didaticos/Tutoriais%20para%20configuração%20de%20ambiente/criar-chave-ssh-windows.pdf) |
| WSL (Windows Subsystem for Linux) | [tutorial-wsl.pdf](materiais-didaticos/Tutoriais%20para%20configuração%20de%20ambiente/tutorial-wsl.pdf) |

---
