-- SQLBook: Code
-- ============================================================
-- DDL — Loja Virtual  (v2 — alinhado ao diagrama ER)
-- Compatível com: PostgreSQL 14+
-- Aula 5 — Banco de Dados com PostgreSQL
-- ============================================================

-- DROP em ordem inversa à criação (filhos antes dos pais)
DROP TABLE IF EXISTS pagamento    CASCADE;
DROP TABLE IF EXISTS item_pedido CASCADE;
DROP TABLE IF EXISTS pedido       CASCADE;
DROP TABLE IF EXISTS endereco     CASCADE;
DROP TABLE IF EXISTS produto      CASCADE;
DROP TABLE IF EXISTS categoria    CASCADE;
DROP TABLE IF EXISTS usuario      CASCADE;

-- ──────────────────────────────────────────────
-- NÍVEL 0: tabelas sem FK
-- ──────────────────────────────────────────────

CREATE TABLE categoria (
    id   INTEGER      GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE usuario (
    id    INTEGER      GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    login VARCHAR(100) NOT NULL UNIQUE, -- UNIQUE CRIA ÍNDICE SOZINHO
    senha VARCHAR(255) NOT NULL,
    cpf   VARCHAR(11)  NOT NULL UNIQUE
);

-- ──────────────────────────────────────────────
-- NÍVEL 1: FK → nível 0
-- ──────────────────────────────────────────────

CREATE TABLE produto (
    id           INTEGER       GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    categoria_id INTEGER       NOT NULL
                     REFERENCES categoria(id) ON DELETE RESTRICT,
    name         VARCHAR(255)  NOT NULL, -- Candidato a índice de fuzzy scan
    descricao    TEXT,
    preco_base   NUMERIC(10,2) NOT NULL CHECK (preco_base >= 0)
);

CREATE TABLE endereco (
    id         INTEGER      GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    usuario_id INTEGER      NOT NULL
                   REFERENCES usuario(id) ON DELETE CASCADE,
    logradouro VARCHAR(200) NOT NULL,
    cep        CHAR(8)   NOT NULL,
    bairro     VARCHAR(100),
    estado     VARCHAR(100)   NOT NULL,
    cidade     VARCHAR(100) NOT NULL,
    numero     VARCHAR(10),
    uf         CHAR(2)   NOT NULL
);

-- ──────────────────────────────────────────────
-- NÍVEL 2: FK → nível 1
-- ──────────────────────────────────────────────

CREATE TABLE pedido (
    id         INTEGER      GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    usuario_id INTEGER      NOT NULL -- FK
                   REFERENCES usuario(id) ON DELETE RESTRICT,
    data       DATE         NOT NULL DEFAULT CURRENT_DATE,
    status     VARCHAR(20)  NOT NULL DEFAULT 'pendente'
                   CHECK (status IN ('pendente', 'entregue', 'cancelado')),
    logradouro VARCHAR(200) NOT NULL,
    cep        VARCHAR(8)   NOT NULL,
    bairro     VARCHAR(100),
    uf         VARCHAR(2)   NOT NULL
);

-- ──────────────────────────────────────────────
-- NÍVEL 3: FK → nível 2
-- ──────────────────────────────────────────────

CREATE TABLE item_pedido (
    pedido_id      INTEGER       NOT NULL REFERENCES pedido(id)   ON DELETE CASCADE,
    produto_id     INTEGER       NOT NULL REFERENCES produto(id)  ON DELETE RESTRICT,
    quantidade     INTEGER       NOT NULL CHECK (quantidade > 0),
    preco_unitario NUMERIC(10,2) NOT NULL CHECK (preco_unitario >= 0),
    PRIMARY KEY (pedido_id, produto_id)
);

CREATE TABLE pagamento (
    id             INTEGER      GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    pedido_id      INTEGER      NOT NULL
                       REFERENCES pedido(id) ON DELETE RESTRICT,
    created_at     DATE         NOT NULL DEFAULT CURRENT_DATE,
    link_pagamento TEXT,
    status         VARCHAR(20)  NOT NULL DEFAULT 'pendente'
                       CHECK (status IN ('pendente', 'confirmado', 'cancelado', 'reembolsado')),
    updated_at     DATE,
    transaction_id VARCHAR(100) -- ÍNDICE
);