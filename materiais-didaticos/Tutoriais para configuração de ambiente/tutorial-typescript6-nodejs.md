# Tutorial: Instalação e Configuração do TypeScript 6 com Node.js

> **Público-alvo:** Alunos de desenvolvimento backend  
> **Versão do TypeScript:** 6.0 (lançada em março de 2026)  
> **Versões do Node.js suportadas:** 18.x, 20.x e 22.x

---

## O que é o TypeScript 6?

O TypeScript 6.0 é uma versão de transição entre a era JavaScript do compilador e a futura versão 7.0, que será reescrita em Go para ganhos massivos de performance. Esta versão traz mudanças importantes nos **valores padrão** do compilador, refletindo o ecossistema JavaScript moderno, e elimina opções legadas que não existirão mais na versão 7.0.

As principais mudanças que afetam projetos backend incluem:

- `strict` agora é `true` por padrão
- `target` padrão passou para `ES2025`
- `module` padrão agora é `es2022`
- `moduleResolution` padrão agora é `bundler`
- `types` agora é um array vazio (sem auto-descoberta de pacotes `@types`)
- `rootDir` não é mais inferido automaticamente dos arquivos-fonte
- Suporte ao `using` para gerenciamento automático de recursos
- Sistemas de módulo legados (`AMD`, `UMD`, `ES5`) foram depreciados

---

## Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js 20.x ou 22.x** (recomendado). Verifique com:

```bash
node -v
npm -v
```

- Um editor de código com suporte a TypeScript (VS Code é altamente recomendado).

---

## Passo 1 — Criando o projeto

Crie uma pasta para o projeto e inicialize o `package.json`:

```bash
mkdir meu-projeto-backend
cd meu-projeto-backend
npm init -y
```

Crie a estrutura de pastas do projeto:

```bash
mkdir src
```

Sua estrutura inicial ficará assim:

```
meu-projeto-backend/
├── src/
└── package.json
```

---

## Passo 2 — Instalando o TypeScript 6

Instale o TypeScript como dependência de desenvolvimento:

```bash
npm install typescript --save-dev
```

Verifique se a versão 6 foi instalada corretamente:

```bash
npx tsc --version
# Saída esperada: Version 6.x.x
```

---

## Passo 3 — Instalando os tipos do Node.js

No TypeScript 6, os pacotes `@types` **não são mais descobertos automaticamente**. Isso significa que você precisa instalá-los explicitamente e declará-los no `tsconfig.json`.

Instale os tipos do Node.js:

```bash
npm install @types/node --save-dev
```

> **Por quê essa mudança?** A auto-descoberta de pacotes `@types` causava conflitos e poluía o escopo de tipos em muitos projetos. Agora você tem controle total sobre quais tipos globais estão disponíveis. Isso também melhorou os tempos de build em 20-50% nos projetos testados pela equipe do TypeScript.

---

## Passo 4 — Gerando e configurando o `tsconfig.json`

Gere o arquivo de configuração base:

```bash
npx tsc --init
```

Agora substitua o conteúdo do `tsconfig.json` gerado pela configuração abaixo, que é otimizada para projetos backend com Node.js 20/22 e TypeScript 6:

```json
{
  "compilerOptions": {
    /* --- Módulos e Destino --- */
    "target": "ES2025",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",

    /* --- Diretórios --- */
    "rootDir": "./src",
    "outDir": "./dist",

    /* --- Tipos (obrigatório no TypeScript 6) --- */
    "types": ["node"],

    /* --- Qualidade de Código (agora true por padrão) --- */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,

    /* --- Interoperabilidade ESM / CJS --- */
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,

    /* --- Qualidade de Build --- */
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,

    /* --- Source Maps (útil para debug) --- */
    "sourceMap": true,
    "declaration": true,
    "declarationMap": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

### Entendendo as opções mais importantes

| Opção | O que faz |
|---|---|
| `"target": "ES2025"` | Define a versão do JavaScript gerada. É o novo padrão do TS 6. |
| `"module": "NodeNext"` | Usa o sistema de módulos moderno do Node.js (ESM com suporte a CJS). |
| `"moduleResolution": "NodeNext"` | Resolve módulos seguindo as regras do Node.js moderno. |
| `"rootDir": "./src"` | **Obrigatório no TS 6.** Define onde ficam os arquivos-fonte. |
| `"outDir": "./dist"` | Define onde os arquivos compilados serão gerados. |
| `"types": ["node"]` | **Obrigatório no TS 6.** Declara os tipos globais disponíveis. |
| `"strict": true` | Ativa todas as verificações de tipo estritas (agora é o padrão). |

---

## Passo 5 — Configurando o `package.json`

Atualize o `package.json` para suportar o sistema de módulos ESM e adicionar os scripts de build e execução:

```json
{
  "name": "meu-projeto-backend",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "build": "tsc",
    "build:watch": "tsc --watch",
    "start": "node dist/index.js",
    "dev": "node --watch dist/index.js"
  },
  "devDependencies": {
    "@types/node": "^22.0.0",
    "typescript": "^6.0.0"
  }
}
```

> **Atenção:** A propriedade `"type": "module"` instrui o Node.js a tratar todos os arquivos `.js` como ESM. Isso é necessário para alinhar com o padrão do TypeScript 6.

---

## Passo 6 — Criando o primeiro arquivo TypeScript

Crie o arquivo `src/index.ts`:

```typescript
// src/index.ts

// Tipagem explícita — boa prática com strict: true
const saudacao = (nome: string): string => {
  return `Olá, ${nome}! Bem-vindo ao TypeScript 6 com Node.js.`;
};

// Interface tipada
interface Usuario {
  id: number;
  nome: string;
  email: string;
  ativo: boolean;
}

// Função assíncrona com tipagem
const buscarUsuario = async (id: number): Promise<Usuario> => {
  // Simulação de uma chamada assíncrona
  return {
    id,
    nome: "Maria Silva",
    email: "maria@exemplo.com",
    ativo: true,
  };
};

// Novidade do TypeScript 6: using para gerenciamento de recursos
// O recurso é limpo automaticamente quando sai do escopo
class ConexaoDB {
  constructor(private url: string) {
    console.log(`Conectando ao banco: ${url}`);
  }

  [Symbol.dispose](): void {
    console.log("Conexão com o banco encerrada automaticamente.");
  }
}

// Função principal
const main = async (): Promise<void> => {
  console.log(saudacao("Desenvolvedor"));

  const usuario = await buscarUsuario(1);
  console.log("Usuário encontrado:", usuario);

  // O using garante que dispose() seja chamado ao sair do bloco
  {
    using conexao = new ConexaoDB("mongodb://localhost:27017/meubanco");
    console.log("Realizando operações no banco...");
    // "conexao" será descartada automaticamente aqui
  }
};

main().catch(console.error);
```

---

## Passo 7 — Compilando e executando o projeto

Compile o projeto:

```bash
npm run build
```

Você verá a pasta `dist/` criada com os arquivos JavaScript gerados. Execute o projeto:

```bash
npm start
```

A saída esperada no terminal:

```
Olá, Desenvolvedor! Bem-vindo ao TypeScript 6 com Node.js.
Usuário encontrado: { id: 1, nome: 'Maria Silva', email: 'maria@exemplo.com', ativo: true }
Conectando ao banco: mongodb://localhost:27017/meubanco
Realizando operações no banco...
Conexão com o banco encerrada automaticamente.
```

---

## Passo 8 — Modo de desenvolvimento com recompilação automática

Durante o desenvolvimento, use dois terminais:

**Terminal 1** — recompila o TypeScript ao salvar:

```bash
npm run build:watch
```

**Terminal 2** — reinicia o Node.js ao detectar mudanças no `dist/`:

```bash
npm run dev
```

---

## Novidades do TypeScript 6 que você deve conhecer

### `using` — Gerenciamento Explícito de Recursos

A declaração `using` garante que o método `[Symbol.dispose]()` seja chamado automaticamente quando o recurso sair do escopo. Isso elimina o padrão de `try/finally` para limpeza de recursos:

```typescript
// Antes (TypeScript 5)
const conexao = abrirConexao();
try {
  // usar conexao...
} finally {
  conexao.fechar(); // fácil de esquecer!
}

// Agora (TypeScript 6)
using conexao = abrirConexao();
// fechar() é chamado automaticamente ao sair do escopo
```

Funciona também com recursos assíncronos usando `await using`:

```typescript
async function processarArquivo(): Promise<void> {
  await using arquivo = await abrirArquivo("dados.txt");
  // arquivo.close() é chamado automaticamente, mesmo se houver erro
}
```

### `strict: true` por Padrão

Todos os projetos novos agora têm modo estrito ativo automaticamente. Isso inclui `strictNullChecks`, `noImplicitAny` e outras verificações. Se precisar desativar temporariamente em projetos antigos:

```json
{
  "compilerOptions": {
    "strict": false
  }
}
```

### `#/` — Importações de Subcaminho (Subpath Imports)

O TypeScript 6 suporta nativamente o campo `imports` do `package.json` para criar aliases de importação internos ao projeto:

```json
// package.json
{
  "imports": {
    "#/utils": "./src/utils/index.js",
    "#/config": "./src/config/index.js"
  }
}
```

```typescript
// Usando o alias no código
import { formatarData } from "#/utils";
import { configuracoes } from "#/config";
```

### `require()` de Módulos ESM (Node.js 22)

Com o flag `--module nodenext`, o TypeScript 6 suporta a capacidade do Node.js 22 de importar módulos ESM via `require()`, facilitando a interoperabilidade entre código legado CJS e módulos modernos.

---

## Opções Depreciadas no TypeScript 6

Evite usar as seguintes opções, pois serão **removidas no TypeScript 7**:

| Opção depreciada | Substituto |
|---|---|
| `"target": "ES5"` ou `"ES3"` | Use `"ES2015"` ou superior |
| `"module": "AMD"` | Use `"ESNext"` ou `"NodeNext"` |
| `"module": "UMD"` | Use `"ESNext"` ou `"NodeNext"` |
| `baseUrl` (sozinho) | Configure `paths` com mapeamentos explícitos |
| `outFile` | Use bundlers como esbuild ou Rollup |
| `assert {}` em imports | Substitua por `with {}` |

Se precisar usar opções depreciadas temporariamente, adicione ao `tsconfig.json`:

```json
{
  "compilerOptions": {
    "ignoreDeprecations": "6.0"
  }
}
```

> **Atenção:** Isso funcionará apenas no TypeScript 6. Na versão 7, as opções depreciadas serão completamente removidas.

---

## Estrutura Final do Projeto

Após seguir todos os passos, a estrutura do seu projeto ficará assim:

```
meu-projeto-backend/
├── src/
│   └── index.ts
├── dist/              ← gerado pelo tsc
│   ├── index.js
│   ├── index.js.map
│   └── index.d.ts
├── node_modules/
├── package.json
└── tsconfig.json
```

---

## Checklist de Configuração

Use esta lista para verificar se tudo está correto no seu projeto:

- [ ] TypeScript 6 instalado como devDependency
- [ ] `@types/node` instalado como devDependency
- [ ] `"rootDir": "./src"` definido no `tsconfig.json`
- [ ] `"types": ["node"]` definido no `tsconfig.json`
- [ ] `"outDir": "./dist"` definido no `tsconfig.json`
- [ ] `"type": "module"` no `package.json`
- [ ] Scripts `build` e `start` configurados no `package.json`
- [ ] Pasta `src/` criada com pelo menos um arquivo `.ts`
- [ ] `.gitignore` com `node_modules/` e `dist/` (opcional, mas recomendado)

---

## Resumo

O TypeScript 6 representa uma mudança de paradigma em direção ao ecossistema JavaScript moderno. Os pontos mais críticos para projetos backend são:

**Sempre defina explicitamente no `tsconfig.json`:**
- `rootDir` — o TypeScript 6 não o infere mais automaticamente
- `types` — os pacotes `@types` não são mais descobertos automaticamente

**Aproveite as novidades:**
- `using` / `await using` para gerenciamento seguro de recursos (conexões de banco, arquivos, etc.)
- Imports de subcaminho com `#/` para organizar melhor o código

**Evite opções legadas** como `ES5`, `AMD`, `UMD` e `outFile`, que serão removidas na próxima versão.

---

*Tutorial elaborado com base na documentação oficial do TypeScript 6.0, lançada em março de 2026.*
