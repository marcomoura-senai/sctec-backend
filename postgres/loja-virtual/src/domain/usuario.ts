import { Endereco } from "./endereco";
import { Pedido } from "./pedido";

export interface Usuario {
    id: number;
    login: string;
    nome: string;
    email: string;
    cpf: string;
    endereco?: Endereco[]
    password: string;
}


// Projection
export interface UsuarioWithPedidos extends Usuario {
    pedidos: Pedido[];
}