import { ItemPedido } from "./itemPedido";

export type StatusPedido = "pendente" | "entregue" | "cancelado";

export interface Pedido {
    id: number;
    usuarioId: number
    data: Date;
    status: StatusPedido;
    cep: string;
    bairro: string;
    uf: string;
    cidade: string;
    estado: string;
    logradouro: string;
    itemPedido: ItemPedido[]
}