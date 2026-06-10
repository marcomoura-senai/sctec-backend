# Tutorial de Instalação do PostgreSQL

> **Para quem é este tutorial?**
> Este guia é voltado para alunos que podem já ter o PostgreSQL instalado localmente (com ou sem pgAdmin) ou que estão começando do zero. Leia as duas seções com atenção antes de escolher qual caminho seguir.

---

## Índice

- [Tutorial de Instalação do PostgreSQL](#tutorial-de-instalação-do-postgresql)
  - [Índice](#índice)
  - [⚠️ Aviso Importante: Conflito de Portas](#️-aviso-importante-conflito-de-portas)
  - [Comparativo Rápido](#comparativo-rápido)
  - [Seção 1 — Instalação Local (com pgAdmin)](#seção-1--instalação-local-com-pgadmin)
    - [1.1 Verificando se já está instalado](#11-verificando-se-já-está-instalado)
    - [1.2 Instalando no Windows](#12-instalando-no-windows)
    - [1.3 Instalando no macOS](#13-instalando-no-macos)
    - [1.4 Instalando no Linux (Ubuntu/Debian)](#14-instalando-no-linux-ubuntudebian)
  - [Seção 2 — Instalação via Docker](#seção-2--instalação-via-docker)
    - [2.1 Pré-requisito: Instalar o Docker](#21-pré-requisito-instalar-o-docker)
    - [2.2 Subindo o PostgreSQL com Docker](#22-subindo-o-postgresql-com-docker)
    - [2.3 Gerenciando o container](#23-gerenciando-o-container)
    - [2.4 Usando Docker Compose (recomendado para projetos)](#24-usando-docker-compose-recomendado-para-projetos)
  - [🔌 Conectando ao Banco de Dados](#-conectando-ao-banco-de-dados)
    - [As credenciais de conexão](#as-credenciais-de-conexão)
    - [pgAdmin 4](#pgadmin-4)
    - [DBeaver](#dbeaver)
    - [VS Code (extensão SQLTools)](#vs-code-extensão-sqltools)
  - [🔧 Resolvendo Conflitos Entre as Duas Instalações](#-resolvendo-conflitos-entre-as-duas-instalações)
    - [Como identificar o conflito](#como-identificar-o-conflito)
    - [Opção A — Desligar o PostgreSQL local para usar o Docker](#opção-a--desligar-o-postgresql-local-para-usar-o-docker)
    - [Opção B — Mudar a porta do container Docker (sem desligar o local)](#opção-b--mudar-a-porta-do-container-docker-sem-desligar-o-local)
    - [Opção C — Desligar o container Docker para usar o local](#opção-c--desligar-o-container-docker-para-usar-o-local)
  - [Checklist de Verificação Final](#checklist-de-verificação-final)
  - [Resumo de Comandos Essenciais](#resumo-de-comandos-essenciais)

---

## ⚠️ Aviso Importante: Conflito de Portas

O PostgreSQL — seja instalado localmente ou via Docker — roda por padrão na **porta 5432**. Isso significa que **não é possível ter os dois rodando ao mesmo tempo** sem configuração adicional. Tentar subir o container Docker com o PostgreSQL local ativo resultará em erro:

```
Error starting userland proxy: listen tcp 0.0.0.0:5432: bind: address already in use
```

Escolha **um dos dois métodos** para o seu ambiente de desenvolvimento, ou aprenda a alternar entre eles conforme descrito na [seção de resolução de conflitos](#-resolvendo-conflitos-entre-as-duas-instalações).

> **O Recomendado é usar sempre pelo Docker**. Manter o ambiente local "limpo" é o padrão de desenvolvimento de software moderno. A instalação local fica como auxílio caso alguém tenha impossibilidade de instalar o Docker devido a limitações de hardware ou sistema operacional.

---

## Comparativo Rápido

| Característica | Instalação Local | Docker |
|---|---|---|
| Persiste após reiniciar o PC | ✅ Sim | ✅ Sim (com volume) |
| Fácil de ligar/desligar | ❌ Requer serviço do SO | ✅ `docker start` / `docker stop` |
| Versão isolada por projeto | ❌ Não | ✅ Sim |
| Remoção limpa | ❌ Trabalhosa | ✅ `docker rm` |
| pgAdmin incluído | ✅ Pode instalar junto | ✅ Pode rodar em outro container |
| Porta padrão | 5432 | 5432 (mapeável) |
| Recomendado para | Uso geral / cursos presenciais | Desenvolvimento moderno / múltiplos projetos |

---

## Seção 1 — Instalação Local (com pgAdmin)

> Se você já seguiu um tutorial anterior de instalação com pgAdmin, **provavelmente já tem esta configuração**. Verifique antes de reinstalar.

### 1.1 Verificando se já está instalado

**Windows:**
```
Win + R → services.msc → procure por "postgresql"
```
Se o serviço aparecer com status **Em execução**, o PostgreSQL já está instalado e ativo.

**macOS:**
```bash
brew services list | grep postgresql
# ou
pg_isready
```

**Linux:**
```bash
sudo systemctl status postgresql
```

---

### 1.2 Instalando no Windows

1. Acesse [postgresql.org/download/windows](https://www.postgresql.org/download/windows/)
2. Clique em **Download the installer**
3. Escolha a versão mais recente (ex: 16.x) e o instalador para Windows x86-64
4. Execute o instalador e siga os passos:
   - Marque: **PostgreSQL Server**, **pgAdmin 4**, **Command Line Tools**
   - Defina uma senha para o usuário `postgres` (anote essa senha!)
   - Mantenha a porta padrão: **5432**
5. Finalize a instalação. O serviço será iniciado automaticamente.

---

### 1.3 Instalando no macOS

```bash
# Instale via Homebrew
brew install postgresql@16

# Inicie o serviço
brew services start postgresql@16

# Verifique
psql --version
```

Para o pgAdmin no macOS, baixe o instalador em [pgadmin.org/download](https://www.pgadmin.org/download/).

---

### 1.4 Instalando no Linux (Ubuntu/Debian)

```bash
# Adicione o repositório oficial
sudo apt install -y postgresql postgresql-contrib

# Inicie e habilite o serviço
sudo systemctl start postgresql
sudo systemctl enable postgresql

# Verifique
sudo -u postgres psql -c "SELECT version();"
```

---

## Seção 2 — Instalação via Docker

> Esta é a abordagem recomendada para novos projetos. O Docker mantém o banco de dados isolado, sem interferir com o sistema operacional.

### 2.1 Pré-requisito: Instalar o Docker

Se você ainda não tem o Docker instalado:

- **Windows / macOS:** Baixe o [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- **Linux:**
  ```bash
  sudo apt update
  sudo apt install -y docker.io docker-compose
  sudo usermod -aG docker $USER
  # Faça logout e login novamente para aplicar
  ```

Verifique a instalação:
```bash
docker --version
docker run hello-world
```

---

### 2.2 Subindo o PostgreSQL com Docker

```bash
docker run --name meu-postgres \
  -e POSTGRES_PASSWORD=minhasenha \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_DB=meu_banco \
  -p 5432:5432 \
  -v pgdata:/var/lib/postgresql/data \
  -d postgres:16
```

**O que cada parâmetro faz:**

| Parâmetro | Descrição |
|---|---|
| `--name meu-postgres` | Nome do container |
| `-e POSTGRES_PASSWORD` | Senha do usuário principal |
| `-e POSTGRES_USER` | Usuário principal |
| `-e POSTGRES_DB` | Banco de dados criado automaticamente |
| `-p 5432:5432` | Mapeia a porta do container para o host |
| `-v pgdata:/...` | Volume para persistir os dados |
| `-d` | Roda em segundo plano (modo detached) |

---

### 2.3 Gerenciando o container

```bash
# Ver containers em execução
docker ps

# Parar o PostgreSQL
docker stop meu-postgres

# Iniciar novamente
docker start meu-postgres

# Remover o container (dados persistem no volume)
docker rm meu-postgres

# Ver logs
docker logs meu-postgres

# Acessar o terminal do banco
docker exec -it meu-postgres psql -U postgres
```

---

### 2.4 Usando Docker Compose (recomendado para projetos)

Crie um arquivo `docker-compose.yml` na raiz do seu projeto:

```yaml
version: '3.8'

services:
  postgres:
    image: postgres:16
    container_name: meu-postgres
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: minhasenha
      POSTGRES_DB: meu_banco
    ports:
      - "5432:5432"
    volumes:
      - pgdata:/var/lib/postgresql/data
    restart: unless-stopped

volumes:
  pgdata:
```

```bash
# Subir os serviços
docker compose up -d

# Derrubar os serviços
docker compose down
```

---

---

## 🔌 Conectando ao Banco de Dados

### As credenciais de conexão

Independentemente do software que você usar — pgAdmin, DBeaver, extensão do VS Code, ou qualquer outro cliente — **a forma de conectar é sempre a mesma**. Qualquer ferramenta que tenha o driver do PostgreSQL vai pedir as mesmas informações:

| Campo | Descrição | Valor padrão (local ou Docker) |
|---|---|---|
| **Host** | Endereço do servidor | `localhost` |
| **Porta** | Porta de conexão | `5432` |
| **Banco de dados** | Nome do banco | `postgres` (ou o que você criou) |
| **Usuário** | Nome do usuário | `postgres` |
| **Senha** | Senha do usuário | (a que você definiu na instalação) |

> **Importante:** quando o banco está no Docker, ele continua sendo acessado via `localhost` porque a porta do container é mapeada para a sua máquina. Do ponto de vista do cliente, não há diferença entre conectar em um banco local ou em um container.

---

### pgAdmin 4

O pgAdmin é um cliente completo com interface gráfica, ideal para visualizar estrutura de tabelas, executar queries e gerenciar o banco visualmente.

**Download:** [pgadmin.org/download](https://www.pgadmin.org/download/)

1. Abra o pgAdmin 4
2. No painel esquerdo, clique com o botão direito em **Servers → Register → Server**
3. Na aba **General**, defina um nome qualquer para a conexão (ex: `Local` ou `Docker`)
4. Na aba **Connection**, preencha:
   - **Host:** `localhost`
   - **Port:** `5432`
   - **Maintenance database:** `postgres`
   - **Username:** `postgres`
   - **Password:** sua senha
5. Clique em **Save**

---

### DBeaver

O DBeaver é um cliente universal que suporta dezenas de bancos de dados. É uma ótima opção se você trabalha com mais de um tipo de banco.

**Download:** [dbeaver.io/download](https://dbeaver.io/download/) (versão Community é gratuita)

1. Abra o DBeaver e clique em **Nova Conexão** (ícone de plug no canto superior esquerdo)
2. Selecione **PostgreSQL** e clique em **Próximo**
3. Preencha os campos:
   - **Host:** `localhost`
   - **Port:** `5432`
   - **Database:** nome do banco (ex: `postgres` ou `meu_banco`)
   - **Username:** `postgres`
   - **Password:** sua senha
4. Clique em **Testar Conexão** — o DBeaver baixará o driver automaticamente se necessário
5. Clique em **Finalizar**

---

### VS Code (extensão SQLTools)

Para quem prefere não sair do editor, a extensão **SQLTools** com o driver PostgreSQL permite executar queries diretamente no VS Code.

**Instalação:**

1. No VS Code, vá em **Extensões** (`Ctrl+Shift+X`)
2. Instale **SQLTools** (por Matheus Teixeira)
3. Instale também **SQLTools PostgreSQL/Cockroach Driver**

**Configurando a conexão:**

1. Na barra lateral, clique no ícone do SQLTools (banco de dados)
2. Clique em **Add New Connection**
3. Selecione **PostgreSQL**
4. Preencha:
   - **Connection Name:** nome livre (ex: `Local Postgres`)
   - **Server:** `localhost`
   - **Port:** `5432`
   - **Database:** nome do banco
   - **Username:** `postgres`
   - **Password:** sua senha
5. Clique em **Test Connection** e depois em **Save Connection**

Após conectar, você pode abrir um arquivo `.sql`, selecionar uma query e executar com `Ctrl+Enter` (ou `Cmd+Enter` no macOS).

---

## 🔧 Resolvendo Conflitos Entre as Duas Instalações

Se você tem o PostgreSQL local instalado **e** quer usar o Docker (ou vice-versa), é necessário que apenas um esteja ativo na porta 5432 por vez.

---

### Como identificar o conflito

```bash
# Verifica o que está usando a porta 5432
# Windows (PowerShell ou CMD):
netstat -ano | findstr :5432

# macOS / Linux:
lsof -i :5432
# ou
ss -tlnp | grep 5432
```

---

### Opção A — Desligar o PostgreSQL local para usar o Docker

**Windows:**
```
Win + R → services.msc → postgresql-x64-16 → clique com botão direito → Parar
```
Ou via PowerShell (como Administrador):
```powershell
Stop-Service -Name "postgresql-x64-16"
```

**macOS:**
```bash
brew services stop postgresql@16
```

**Linux:**
```bash
sudo systemctl stop postgresql
```

Depois disso, suba o container normalmente:
```bash
docker start meu-postgres
# ou
docker compose up -d
```

Para **impedir que o PostgreSQL local inicie automaticamente** com o sistema:

```bash
# Linux
sudo systemctl disable postgresql

# macOS
brew services stop postgresql@16  # já não reinicia automaticamente
```

**Windows:** No services.msc, clique com botão direito no serviço → Propriedades → Tipo de inicialização: **Manual**

---

### Opção B — Mudar a porta do container Docker (sem desligar o local)

Se você precisa dos dois ao mesmo tempo (ex: banco de produção local + banco de testes no Docker), altere o mapeamento de porta do container:

```bash
docker run --name postgres-docker \
  -e POSTGRES_PASSWORD=minhasenha \
  -p 5433:5432 \   # <-- porta externa 5433
  -d postgres:16
```

No pgAdmin, conecte na porta **5433** para o banco do Docker.

No Docker Compose:
```yaml
ports:
  - "5433:5432"
```

---

### Opção C — Desligar o container Docker para usar o local

```bash
docker stop meu-postgres
```

E reative o serviço local se necessário:

```bash
# Linux
sudo systemctl start postgresql

# macOS
brew services start postgresql@16
```

**Windows:** services.msc → postgresql → Iniciar

---

## Checklist de Verificação Final

Após a instalação, confirme que tudo está funcionando:

```bash
# Teste a conexão (local ou Docker)
psql -h localhost -U postgres -c "\l"

# Ou dentro do container:
docker exec -it meu-postgres psql -U postgres -c "\l"
```

Se a lista de bancos aparecer, a instalação está correta. ✅

---

## Resumo de Comandos Essenciais

| Ação | Instalação Local (Linux) | Docker |
|---|---|---|
| Iniciar | `sudo systemctl start postgresql` | `docker start meu-postgres` |
| Parar | `sudo systemctl stop postgresql` | `docker stop meu-postgres` |
| Status | `sudo systemctl status postgresql` | `docker ps` |
| Desabilitar auto-start | `sudo systemctl disable postgresql` | `docker update --restart=no meu-postgres` |
| Acessar terminal | `sudo -u postgres psql` | `docker exec -it meu-postgres psql -U postgres` |

---

> **Dúvidas?** Se o pgAdmin não conectar, verifique: (1) qual serviço está ativo, (2) a porta correta, (3) usuário e senha. A maioria dos problemas de conexão vem de conflito de porta ou senha incorreta.