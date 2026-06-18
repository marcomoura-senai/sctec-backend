-- 1. Quantos pedidos cada cliente fez e quanto cada um gastou no total?
-- 2. Quais clientes fizeram mais de 2 pedidos?
-- 3. Liste os pedidos com o nome do cliente e o nome de cada produto.

SELECT u.id, u.login, p.id as id_pedido, p.status FROM usuario u
LEFT JOIN pedido p ON u.id = p.usuario_id
WHERE p.usuario_id IS NULL