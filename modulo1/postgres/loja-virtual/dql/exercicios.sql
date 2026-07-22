



SELECT u.id, u.login, p.id as id_pedido, p.status, ip.produto_id, ip.quantidade, ip.preco_unitario FROM usuario u
JOIN pedido p ON u.id = p.usuario_id
JOIN item_pedido ip ON ip.pedido_id = p.id
ORDER BY id_pedido;

-- 1. Quantos pedidos cada usuário fez e quanto cada um gastou no total?
SELECT u.id, u.login , COUNT(DISTINCT p.id) as total_pedidos, SUM(ip.preco_unitario * ip.quantidade) as total_gasto  
FROM usuario u
JOIN pedido p ON u.id = p.usuario_id
JOIN item_pedido ip ON ip.pedido_id = p.id
WHERE p.status = 'entregue'
GROUP BY u.id
ORDER BY u.id

SELECT u.id,
 u.login,
 (SELECT COUNT(p.id) FROM pedido p WHERE p.usuario_id = u.id) as total_pedidos,
 SUM(ip.preco_unitario * ip.quantidade) as total_gasto  
FROM usuario u
JOIN pedido p ON u.id = p.usuario_id
JOIN item_pedido ip ON ip.pedido_id = p.id
WHERE p.status = 'entregue'
GROUP BY u.id
ORDER BY u.id

WITH usuario_pedidos AS (
    SELECT COUNT(p.id) AS total_pedidos, p.usuario_id
    FROM pedido p
    GROUP by p.usuario_id
)
SELECT u.id,
 u.login,
 up.total_pedidos,
 SUM(ip.preco_unitario * ip.quantidade) as total_gasto  
FROM usuario u
JOIN pedido p ON u.id = p.usuario_id
JOIN usuario_pedidos up ON up.usuario_id = u.id
JOIN item_pedido ip ON ip.pedido_id = p.id
WHERE p.status = 'entregue'
GROUP BY u.id, up.total_pedidos
ORDER BY u.id


-- 2. Quais usuários fizeram mais de 1 pedidos?

WITH pedidos_por_usuario AS (
    SELECT usuario_id, COUNT(*) AS num_pedidos
    FROM pedido
    GROUP BY usuario_id
)
SELECT u.login, ppu.num_pedidos
FROM pedidos_por_usuario ppu
JOIN usuario u ON u.id = ppu.usuario_id
WHERE ppu.num_pedidos > 1;

-- 3. Liste os pedidos com o nome do usuário e o nome de cada produto.

SELECT p.id, u.login , ip.preco_unitario, ip.quantidade, pr.name
FROM item_pedido ip
JOIN pedido p ON p.id = ip.pedido_id
JOIN usuario u ON u.id = p.usuario_id
JOIN produto pr ON pr.id = ip.produto_id;