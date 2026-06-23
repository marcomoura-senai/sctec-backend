SELECT ip.preco_unitario
FROM item_pedido ip
WHERE
    ip.preco_unitario > (
        SELECT AVG(ip2.preco_unitario)
        FROM item_pedido ip2
    ) -- PRECISA RETORNAR UMA LINHA