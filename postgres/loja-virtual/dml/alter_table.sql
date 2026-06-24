-- ============================================================
-- DDL de ajuste — Loja Virtual
-- ============================================================
BEGIN;

-- ──────────────────────────────────────────────────────────
-- BLOCO 1 ▸ Padronização de idioma (mistura PT / EN)
-- ──────────────────────────────────────────────────────────

-- categoria e produto têm "name" em inglês; resto do schema usa PT
ALTER TABLE categoria RENAME COLUMN name TO nome;
ALTER TABLE produto   RENAME COLUMN name TO nome;



-- ──────────────────────────────────────────────────────────
-- BLOCO 2 ▸ Campos ausentes
-- ──────────────────────────────────────────────────────────

-- usuario: sem nome completo nem e-mail (identificação mínima de qualquer sistema)
-- PASSO 1 ▸ Adiciona as colunas nullable e sem constraints
ALTER TABLE usuario
    ADD COLUMN nome  VARCHAR(150),
    ADD COLUMN email VARCHAR(255);

-- PASSO 2 ▸ Popula os existentes
UPDATE usuario SET
    email = login || '@gmail.com',
    nome  = INITCAP(REPLACE(login, '.', ' '));

-- PASSO 3 ▸ Aplica as constraints
ALTER TABLE usuario
    ALTER COLUMN email SET NOT NULL,
    ALTER COLUMN nome  SET NOT NULL,
    ADD CONSTRAINT uq_usuario_email UNIQUE (email);

-- produto: sem controle de estoque nem flag de disponibilidade
ALTER TABLE produto
    ADD COLUMN estoque INTEGER NOT NULL DEFAULT 0 CHECK (estoque >= 0),
    ADD COLUMN ativo   BOOLEAN NOT NULL DEFAULT TRUE;

-- categoria: sem descrição (útil para listagens de loja)
ALTER TABLE categoria
    ADD COLUMN descricao TEXT;


-- ──────────────────────────────────────────────────────────
-- BLOCO 3 ▸ Inconsistências de tipo e estrutura
-- ──────────────────────────────────────────────────────────

-- 3a. pedido faz snapshot do endereço de entrega, mas esqueceu cidade e estado
--     (presentes em endereco); endereço incompleto não serve para entrega/NF
ALTER TABLE pedido
    ADD COLUMN cidade VARCHAR(100),
    ADD COLUMN estado VARCHAR(100);

-- 3b. pedido.cep é VARCHAR(8), mas endereco.cep é CHAR(8)
--     CEP tem sempre 8 dígitos → CHAR é o tipo correto nos dois
ALTER TABLE pedido ALTER COLUMN cep TYPE CHAR(8);

-- 3c. mesmo problema com uf: VARCHAR(2) em pedido vs CHAR(2) em endereco
ALTER TABLE pedido ALTER COLUMN uf TYPE CHAR(2);

-- 3d. usuario.cpf declarado como VARCHAR(11); CPF tem sempre 11 dígitos → CHAR
ALTER TABLE usuario ALTER COLUMN cpf TYPE CHAR(11);

-- 3e. pagamento.created_at / atualizado_em são DATE, mas auditoria de pagamento
--     precisa de hora (chargeback, conciliação); converter para TIMESTAMP
ALTER TABLE pagamento
    ALTER COLUMN created_at     TYPE TIMESTAMP USING created_at::TIMESTAMP,
    ALTER COLUMN updated_at TYPE TIMESTAMP USING updated_at::TIMESTAMP;


-- ──────────────────────────────────────────────────────────
-- BLOCO 4 ▸ Índice prometido no DDL mas nunca criado
-- ──────────────────────────────────────────────────────────

CREATE INDEX idx_pagamento_transaction_id ON pagamento(transaction_id);

COMMIT;