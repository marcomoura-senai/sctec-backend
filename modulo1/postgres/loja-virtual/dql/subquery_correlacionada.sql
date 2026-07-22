SELECT
	p."name" ,
	(
	SELECT
		COUNT(*)
	FROM
		item_pedido ip
	WHERE
		ip.produto_id = p.id) AS vezes_vendido
FROM
	produto p
	
-- VIEW / TABELA TEMPORARIA
	
SELECT COUNT(ip.produto_id ), p."name"  AS vezes_vendido  
FROM item_pedido ip
JOIN produto p ON p.id = ip.produto_id 
GROUP BY ip.produto_id, p.name 
