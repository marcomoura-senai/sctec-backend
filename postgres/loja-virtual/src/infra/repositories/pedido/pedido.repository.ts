import { Pedido } from "../../../domain/pedido";

export interface PedidoRepository {
  listByUserId(userId: number): Promise<Pedido[]>;
}
