-- Total R$ vendido por categoria onde TOTAL > 1000

-- Sem subquery
SELECT
	sum(ip.preco_unitario * ip.quantidade ) AS total,
	p.categoria_id
FROM
	item_pedido ip
JOIN produto p ON
	p.id = ip.produto_id
GROUP BY
	p.categoria_id
HAVING
	(sum(ip.preco_unitario * ip.quantidade ) ) > 1000



-- Com CTE
WITH faturamento_categoria AS ( -- View não materializada
SELECT
	sum(ip.preco_unitario * ip.quantidade) AS total,
	p.categoria_id 
FROM
	item_pedido ip
JOIN produto p ON
	p.id = ip.produto_id
GROUP BY
	p.categoria_id 
	)
SELECT * FROM faturamento_categoria WHERE total > 1000

-- Com Subquery
SELECT * FROM (
    SELECT
	sum(ip.preco_unitario * ip.quantidade) AS total,
	p.categoria_id 
FROM
	item_pedido ip
JOIN produto p ON
	p.id = ip.produto_id
GROUP BY
	p.categoria_id 
	
) as faturamento_categoria WHERE total > 1000