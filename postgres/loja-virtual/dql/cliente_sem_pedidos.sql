
SELECT u.id, u.login, p.id as id_pedido, p.status FROM usuario u
LEFT JOIN pedido p ON u.id = p.usuario_id
WHERE p.usuario_id IS NULL