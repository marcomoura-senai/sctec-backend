## 9. Tipos de dados

`[PG]`

### Numéricos

| Tipo | Tamanho | Uso recomendado |
|------|---------|-----------------|
| `SMALLINT` | 2 bytes | Counters pequenos |
| `INTEGER` / `INT` | 4 bytes | Uso geral |
| `BIGINT` | 8 bytes | IDs, contadores grandes |
| `NUMERIC(p, s)` | Variável | Dinheiro — exato |
| `FLOAT8` / `REAL` | 4–8 bytes | Científico — evite para moeda |

### Texto

| Tipo | Descrição |
|------|-----------|
| `TEXT` | Ilimitado — **preferido no PG** |
| `VARCHAR(n)` | Com limite de caracteres |
| `CHAR(n)` | Tamanho fixo, padding com espaços |

### Datas e horários

| Tipo | Descrição |
|------|-----------|
| `DATE` | Apenas data |
| `TIME` | Apenas hora |
| `TIMESTAMP` | Sem timezone |
| `TIMESTAMPTZ` | **Com timezone — use em produção** |
| `INTERVAL` | Duração: `'2 hours'`, `'30 days'` |

### Tipos específicos do PostgreSQL

```sql
UUID            -- identificador único universal
BOOLEAN         -- TRUE / FALSE / NULL
BYTEA           -- dados binários
JSONB           -- JSON binário indexável (prefira sobre JSON)
JSON            -- texto JSON sem indexação eficiente
TEXT[]          -- array de texto (INTEGER[], etc.)
HSTORE          -- chave-valor simples (extensão)
INET / CIDR     -- endereços IP e redes
TSVECTOR        -- full-text search
TSQUERY         -- query de full-text
INT4RANGE       -- range de inteiros
TSTZRANGE       -- range de timestamps com tz
DATERANGE       -- range de datas
```

### ENUM customizado

```sql
CREATE TYPE status_pedido AS ENUM (
  'pendente', 'pago', 'enviado', 'cancelado'
);

CREATE TABLE pedidos (
  status status_pedido DEFAULT 'pendente'
);
```