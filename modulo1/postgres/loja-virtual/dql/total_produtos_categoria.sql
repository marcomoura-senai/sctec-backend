SELECT categoria_id, AVG(preco_Base) as preco_medio, COUNT(*) as total_produtos FROM produto
GROUP BY categoria_id
HAVING COUNT(*) > 2
ORDER BY total_produtos DESC;

