import { Produto } from "./produto";

export interface ItemPedido {
    pedidoId: number;
    produtoId: number;
    quantidade: number;
    precoUnitario: number;
    produto: Produto;
}