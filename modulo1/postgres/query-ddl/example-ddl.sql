CREATE TABLE usuarios (
  id          BIGINT        PRIMARY KEY,
  nome        VARCHAR(150)  NOT NULL,
  email       TEXT          UNIQUE NOT NULL,
  criado_em   TIMESTAMPTZ   DEFAULT NOW(),
  ativo       BOOLEAN       DEFAULT TRUE
);

-- Chave estrangeira
CREATE TABLE pedidos (
  id          BIGINT  PRIMARY KEY,
  usuario_id  BIGINT  NOT NULL
                      REFERENCES usuarios(id)
                      ON DELETE CASCADE,
  total       NUMERIC(12, 2)
);

-- Alterar tabela
ALTER TABLE usuarios
  ADD COLUMN    telefone  TEXT,
  ALTER COLUMN  nome      SET NOT NULL,
  DROP COLUMN   ativo;

-- Constraints nomeadas
ALTER TABLE pedidos
  ADD CONSTRAINT chk_total CHECK (total >= 0);

DROP TABLE IF EXISTS pedidos CASCADE;
TRUNCATE TABLE usuarios RESTART IDENTITY CASCADE;