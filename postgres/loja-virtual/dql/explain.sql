EXPLAIN
SELECT u.login, p.id, p.status
FROM pedido p
JOIN usuario u ON u.id = p.usuario_id
WHERE p.status = 'pendente';
-- ESTIMATIVA


EXPLAIN ANALYZE
SELECT u.login, p.id, p.status
FROM pedido p
JOIN usuario u ON u.id = p.usuario_id
WHERE p.status = 'pendente';


SET enable_seqscan = OFF;
EXPLAIN ANALYZE SELECT
	*
FROM
	produto p
WHERE p.categoria_id = 3;
SET enable_seqscan = ON;
-- Sem índice em produto.categoria_id (antes do CREATE INDEX)
EXPLAIN ANALYZE SELECT * FROM produto WHERE categoria_id = 3;
-- → Seq Scan, Filter

-- Depois do índice que vocês criaram
EXPLAIN ANALYZE SELECT * FROM produto WHERE categoria_id = 3;
-- → Index Scan using idx_produto_categoria_id

-- O índice parcial de pedidos pendentes
EXPLAIN ANALYZE SELECT * FROM pedido WHERE status = 'pendente';
-- → Bitmap Index Scan on idx_pedido_pendentes (sem Filter!)

-- Sem o índice parcial (status diferente)
EXPLAIN ANALYZE SELECT * FROM pedido WHERE status = 'entregue';
-- → Seq Scan (índice parcial não se aplica), com Filter