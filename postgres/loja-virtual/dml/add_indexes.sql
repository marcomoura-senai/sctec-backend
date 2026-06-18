CREATE INDEX idx_produto_categoria_id ON produto(categoria_id);


-- Exemplo de índice parcial
CREATE INDEX idx_pedido_pendentes ON pedido (status) WHERE status = 'pendente';