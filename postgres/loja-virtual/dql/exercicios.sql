-- 1. Quantos pedidos cada usuário fez e quanto cada um gastou no total?



SELECT u.id, u.login, p.id as id_pedido, p.status, ip.produto_id, ip.quantidade, ip.preco_unitario FROM usuario u
JOIN pedido p ON u.id = p.usuario_id
JOIN item_pedido ip ON ip.pedido_id = p.id
ORDER BY id_pedido;

--1
-- p.id as id_pedido, p.status, ip.produto_id, ip.quantidade, ip.preco_unitario
-- TODO: Filtrar somente os pedidos com status = 'entregue'
-- TODO: O COUNT está ERRADO. Só vi depois que parei de gravar :p como fizemos o join de pedido para item_pedido ele aumenta a cardinalidade -> aumenta linhas. Ou seja, o group by vai "comer" mais linhas e o COUNT vai contar o total de itens do pedido, e não o total de pedidos que o usuário fez. Dá para resolver com DISTINCT mas isso é exatamente o cenário que eu comentei. A maneira "correta" seria com subquery. Mas isso fica para a próxima aula
SELECT u.id, u.login , COUNT(p.id) as total_pedidos, SUM(ip.preco_unitario * ip.quantidade) as total_gasto  FROM usuario u
JOIN pedido p ON u.id = p.usuario_id
JOIN item_pedido ip ON ip.pedido_id = p.id
GROUP BY u.id
ORDER BY u.id


-- 2. Quais usuário  fizeram mais de 2 pedidos?

-- 3. Liste os pedidos com o nome do usuário e o nome de cada produto.