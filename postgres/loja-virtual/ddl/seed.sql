-- ============================================================
-- SEED — Loja Virtual (v2)
-- Dados de exemplo para todas as tabelas
-- ⚠️  Apenas para desenvolvimento/teste
-- ============================================================

-- Limpa todos os dados e reinicia as sequências
TRUNCATE TABLE
    pagamento,
    item_pedido,
    pedido,
    endereco,
    produto,
    categoria,
    usuario
RESTART IDENTITY CASCADE;

-- ──────────────────────────────────────────────
-- CATEGORIAS (6 registros)
-- ──────────────────────────────────────────────
INSERT INTO categoria (id, name) OVERRIDING SYSTEM VALUE VALUES
    (1, 'Eletrônicos'),
    (2, 'Roupas'),
    (3, 'Calçados'),
    (4, 'Livros'),
    (5, 'Casa e Jardim'),
    (6, 'Esportes');

-- ──────────────────────────────────────────────
-- USUARIOS (6 registros)
-- Senhas em bcrypt — plaintext: "senha@123"
-- ──────────────────────────────────────────────
INSERT INTO usuario (id, login, senha, cpf) OVERRIDING SYSTEM VALUE VALUES
    (1, 'joao.silva',      '$2b$12$KIXt5J9P7Ye3aN/xLQZ1U.dL2sRkHm8vMqN0wPjCtYeB5oFgAsITu', '12345678901'),
    (2, 'maria.oliveira',  '$2b$12$KIXt5J9P7Ye3aN/xLQZ1U.dL2sRkHm8vMqN0wPjCtYeB5oFgAsITu', '23456789012'),
    (3, 'carlos.pereira',  '$2b$12$KIXt5J9P7Ye3aN/xLQZ1U.dL2sRkHm8vMqN0wPjCtYeB5oFgAsITu', '34567890123'),
    (4, 'ana.fernandes',   '$2b$12$KIXt5J9P7Ye3aN/xLQZ1U.dL2sRkHm8vMqN0wPjCtYeB5oFgAsITu', '45678901234'),
    (5, 'lucas.tavares',   '$2b$12$KIXt5J9P7Ye3aN/xLQZ1U.dL2sRkHm8vMqN0wPjCtYeB5oFgAsITu', '56789012345'),
    (6, 'beatriz.lima',    '$2b$12$KIXt5J9P7Ye3aN/xLQZ1U.dL2sRkHm8vMqN0wPjCtYeB5oFgAsITu', '67890123456');

-- ──────────────────────────────────────────────
-- PRODUTOS (15 registros — 2 a 3 por categoria)
-- ──────────────────────────────────────────────
INSERT INTO produto (id, categoria_id, name, descricao, preco_base) OVERRIDING SYSTEM VALUE VALUES
    -- Eletrônicos
    (1,  1, 'Smartphone Samsung Galaxy A54',
            'Tela AMOLED 6.4", 128 GB, câmera tripla 50 MP, Android 13',          1899.99),
    (2,  1, 'Notebook Dell Inspiron 15',
            'Intel Core i5-1235U, 8 GB RAM, SSD 256 GB, Windows 11',              3499.00),
    (3,  1, 'Fone de Ouvido Sony WH-1000XM5',
            'Cancelamento de ruído ativo, Bluetooth 5.2, até 30 h de bateria',    1299.90),
    (4,  1, 'Smartwatch Xiaomi Mi Band 8',
            'Monitor cardíaco e SpO2, GPS, 16 dias de bateria',                    299.90),
    -- Roupas
    (5,  2, 'Camiseta Polo Masculina',
            'Algodão pima 100%, disponível em P/M/G/GG, 6 cores',                   89.90),
    (6,  2, 'Jaqueta Jeans Feminina',
            'Lavagem estonada, corte slim, botões de metal',                        249.90),
    (7,  2, 'Moletom Canguru Básico',
            'Fleece interno macio, capuz ajustável, bolso canguru',                 139.90),
    -- Calçados
    (8,  3, 'Tênis Nike Air Max 270',
            'Amortecimento Air no calcanhar, solado de borracha durável',           749.90),
    (9,  3, 'Sandália Havaianas Slim',
            'Borracha natural, palmilha texturizada antiderrapante',                 59.90),
    -- Livros
    (10, 4, 'Clean Code — Robert C. Martin',
            'Boas práticas para escrever código limpo e sustentável',                89.90),
    (11, 4, 'O Hobbit — J.R.R. Tolkien',
            'Edição especial capa dura com ilustrações de Alan Lee',                 69.90),
    -- Casa e Jardim
    (12, 5, 'Churrasqueira a Carvão 50 cm',
            'Aço inox 304, grelha cromada removível, pés reguláveis',              349.90),
    (13, 5, 'Conjunto de Ferramentas 110 pc',
            'Aço cromo-vanádio, caixa organizadora com travamento',                399.90),
    -- Esportes
    (14, 6, 'Bicicleta MTB 29" Caloi Explorer',
            '21 marchas Shimano, freio a disco mecânico, quadro alumínio',        1899.00),
    (15, 6, 'Tapete de Yoga 6 mm',
            'Superfície antiderrapante dupla face, alça de transporte incluída',     79.90);

-- ──────────────────────────────────────────────
-- ENDERECOS (8 registros — alguns usuarios têm 2)
-- ──────────────────────────────────────────────
INSERT INTO endereco (id, usuario_id, logradouro, cep, bairro, estado, cidade, numero, uf)
OVERRIDING SYSTEM VALUE VALUES
    (1, 1, 'Rua das Flores',       '01310100', 'Bela Vista',   'São Paulo',        'São Paulo',       '42',   'SP'),
    (2, 1, 'Av. Paulista',         '01311200', 'Bela Vista',   'São Paulo',        'São Paulo',       '1500', 'SP'),
    (3, 2, 'Rua Copacabana',       '22020001', 'Copacabana',   'Rio de Janeiro',   'Rio de Janeiro',  '300',  'RJ'),
    (4, 3, 'Av. Afonso Pena',      '30130009', 'Centro',       'Minas Gerais',     'Belo Horizonte',  '1000', 'MG'),
    (5, 4, 'Rua XV de Novembro',   '80020310', 'Centro',       'Paraná',           'Curitiba',        '887',  'PR'),
    (6, 4, 'Rua Marechal Deodoro', '80010010', 'Centro',       'Paraná',           'Curitiba',        '200',  'PR'),
    (7, 5, 'Av. Beira Mar Norte',  '88036001', 'Agronômica',   'Santa Catarina',   'Florianópolis',   '500',  'SC'),
    (8, 6, 'Rua Augusta',          '01305001', 'Consolação',   'São Paulo',        'São Paulo',       '750',  'SP');

-- ──────────────────────────────────────────────
-- PEDIDOS (10 registros — 3 status diferentes)
-- Endereço de entrega é snapshot: copiado do endereço cadastrado
-- ──────────────────────────────────────────────
INSERT INTO pedido (id, usuario_id, data, status, logradouro, cep, bairro, uf)
OVERRIDING SYSTEM VALUE VALUES
    (1,  1, '2025-01-10', 'entregue',  'Rua das Flores',       '01310100', 'Bela Vista',  'SP'),
    (2,  1, '2025-02-14', 'entregue',  'Av. Paulista',         '01311200', 'Bela Vista',  'SP'),
    (3,  2, '2025-03-05', 'entregue',  'Rua Copacabana',       '22020001', 'Copacabana',  'RJ'),
    (4,  2, '2025-04-20', 'cancelado', 'Rua Copacabana',       '22020001', 'Copacabana',  'RJ'),
    (5,  3, '2025-05-08', 'entregue',  'Av. Afonso Pena',      '30130009', 'Centro',      'MG'),
    (6,  4, '2025-06-12', 'pendente',  'Rua XV de Novembro',   '80020310', 'Centro',      'PR'),
    (7,  4, '2025-06-18', 'pendente',  'Rua Marechal Deodoro', '80010010', 'Centro',      'PR'),
    (8,  5, '2025-06-20', 'pendente',  'Av. Beira Mar Norte',  '88036001', 'Agronômica',  'SC'),
    (9,  6, '2025-01-25', 'entregue',  'Rua Augusta',          '01305001', 'Consolação',  'SP'),
    (10, 3, '2025-06-22', 'pendente',  'Av. Afonso Pena',      '30130009', 'Centro',      'MG');

-- ──────────────────────────────────────────────
-- ITENS DO PEDIDO (20 registros)
-- PK composta (pedido_id, produto_id) — sem repetição de par
-- preco_unitario = snapshot do preco_base no momento da compra
-- ──────────────────────────────────────────────
INSERT INTO item_pedido (pedido_id, produto_id, quantidade, preco_unitario) VALUES
    -- Pedido 1 | joao.silva: smartphone + fone
    (1,  1, 1, 1899.99),
    (1,  3, 1, 1299.90),
    -- Pedido 2 | joao.silva: notebook + smartwatch
    (2,  2, 1, 3499.00),
    (2,  4, 2,  299.90),
    -- Pedido 3 | maria.oliveira: jaqueta (x2) + tênis
    (3,  6, 2,  249.90),
    (3,  8, 1,  749.90),
    -- Pedido 4 | maria.oliveira (cancelado): bicicleta
    (4, 14, 1, 1899.00),
    -- Pedido 5 | carlos.pereira: livros + tapete yoga
    (5, 10, 1,   89.90),
    (5, 11, 2,   69.90),
    (5, 15, 1,   79.90),
    -- Pedido 6 | ana.fernandes: camisetas (x3) + moletom
    (6,  5, 3,   89.90),
    (6,  7, 1,  139.90),
    -- Pedido 7 | ana.fernandes: sandálias (x2) + camiseta (x2)
    (7,  9, 2,   59.90),
    (7,  5, 2,   89.90),
    -- Pedido 8 | lucas.tavares: churrasqueira + ferramentas
    (8, 12, 1,  349.90),
    (8, 13, 1,  399.90),
    -- Pedido 9 | beatriz.lima: smartphone + smartwatch + livro
    (9,  1, 1, 1899.99),
    (9,  4, 1,  299.90),
    (9, 10, 1,   89.90),
    -- Pedido 10 | carlos.pereira: notebook
    (10, 2, 1, 3499.00);

-- ──────────────────────────────────────────────
-- PAGAMENTOS (12 registros)
-- Pedido 6 tem 2 tentativas — demonstra cardinalidade 1:N
-- ──────────────────────────────────────────────
INSERT INTO pagamento (id, pedido_id, created_at, link_pagamento, status, updated_at, transaction_id)
OVERRIDING SYSTEM VALUE VALUES
    (1,  1, '2025-01-10',
            'https://pay.lojavirtual.com.br/txn/TXN-2025-001',
            'confirmado', '2025-01-10', 'TXN-2025-001'),

    (2,  2, '2025-02-14',
            'https://pay.lojavirtual.com.br/txn/TXN-2025-002',
            'confirmado', '2025-02-14', 'TXN-2025-002'),

    (3,  3, '2025-03-05',
            'https://pay.lojavirtual.com.br/txn/TXN-2025-003',
            'confirmado', '2025-03-06', 'TXN-2025-003'),

    (4,  4, '2025-04-20',
            'https://pay.lojavirtual.com.br/txn/TXN-2025-004',
            'cancelado',  '2025-04-21', 'TXN-2025-004'),

    (5,  5, '2025-05-08',
            'https://pay.lojavirtual.com.br/txn/TXN-2025-005',
            'confirmado', '2025-05-08', 'TXN-2025-005'),

    (6,  6, '2025-06-12',
            'https://pay.lojavirtual.com.br/txn/TXN-2025-006',
            'cancelado',  '2025-06-12', 'TXN-2025-006'),
    (7,  6, '2025-06-13',
            'https://pay.lojavirtual.com.br/txn/TXN-2025-007',
            'pendente',   NULL,         'TXN-2025-007'),

    (8,  7, '2025-06-18',
            'https://pay.lojavirtual.com.br/txn/TXN-2025-008',
            'pendente',   NULL,         'TXN-2025-008'),

    (9,  8, '2025-06-20',
            'https://pay.lojavirtual.com.br/txn/TXN-2025-009',
            'pendente',   NULL,         'TXN-2025-009'),

    (10, 9, '2025-01-25',
            'https://pay.lojavirtual.com.br/txn/TXN-2025-010',
            'confirmado', '2025-01-25', 'TXN-2025-010'),

    (11,10, '2025-06-22',
            'https://pay.lojavirtual.com.br/txn/TXN-2025-011',
            'pendente',   NULL,         'TXN-2025-011'),

    (12, 9, '2025-02-01',
            'https://pay.lojavirtual.com.br/txn/TXN-2025-012',
            'reembolsado','2025-02-03', 'TXN-2025-012');