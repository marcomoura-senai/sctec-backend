SELECT u.id, u.login, p.id as id_pedido, p.status FROM usuario u
JOIN pedido p ON u.id = p.usuario_id;

SELECT u.id, u.login, p.id as id_pedido, p.status FROM usuario u
LEFT JOIN pedido p ON u.id = p.usuario_id;

SELECT u.id, u.login, p.id as id_pedido, p.status FROM usuario u
RIGHT JOIN pedido p ON u.id = p.usuario_id;

SELECT u.id, u.login, p.id as id_pedido, p.status FROM usuario u
FULL OUTER JOIN pedido p ON u.id = p.usuario_id;


-- "Desduplicando"

SELECT u.id, u.login FROM usuario u
JOIN pedido p ON u.id = p.usuario_id -- Você precisa de JOIN??
GROUP BY u.id

-- Com sub-query
SELECT u.id, u.login FROM usuario u
WHERE EXISTS (SELECT 1 FROM pedido p WHERE u.id = p.usuario_id)
