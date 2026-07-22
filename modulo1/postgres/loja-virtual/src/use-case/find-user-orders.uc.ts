import { Pedido } from "../domain/pedido";
import { PedidoRepository } from "../infra/repositories/pedido/pedido.repository";

export class FindUserOrdersUseCase {
    constructor(private readonly repository: PedidoRepository) {}

    async execute(id: number): Promise<Pedido[]> {
        return this.repository.listByUserId(id);
    }
}